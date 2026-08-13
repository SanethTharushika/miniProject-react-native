import { database } from "../config/firebaseAdmin.js";

let safetyInterval = null;

async function createSafetyAlert(device) {
  const alertsRef = database.ref("alerts");

  const newAlertRef = alertsRef.push();

  await newAlertRef.set({
    deviceId: device.id,
    deviceName: device.name,
    type: "SAFETY_SHUTDOWN",
    title: "Safety Shutdown",
    message: `${device.name} was automatically turned OFF because it exceeded the maximum allowed ON duration.`,
    timestamp: Date.now(),
    isRead: false,
  });
}

async function checkSafetyDevices() {
  try {
    const snapshot = await database
      .ref("devices")
      .once("value");

    const devices = snapshot.val();

    if (!devices) {
      return;
    }

    for (const [id, device] of Object.entries(devices)) {
      // Only safety-critical IRON devices
      if (device.type !== "IRON") {
        continue;
      }

      const deviceRef = database.ref(`devices/${id}`);

      // If iron is ON but has no start time,
      // store the current time.
      if (
        device.status === "ON" &&
        !device.turnedOnAt
      ) {
        await deviceRef.update({
          turnedOnAt: Date.now(),
        });

        console.log(
          `⏱ Timer started for ${device.name}`
        );

        continue;
      }

      // Check active duration
      if (
        device.status === "ON" &&
        device.turnedOnAt &&
        device.maxOnDuration
      ) {
        const currentTime = Date.now();

        const elapsedMilliseconds =
          currentTime - device.turnedOnAt;

        const elapsedSeconds =
          elapsedMilliseconds / 1000;

        console.log(
          `${device.name}: ${Math.floor(
            elapsedSeconds
          )}/${device.maxOnDuration} seconds`
        );

        if (
          elapsedSeconds >=
          device.maxOnDuration
        ) {
          console.log(
            `🚨 Safety timeout reached for ${device.name}`
          );

          await deviceRef.update({
            status: "OFF",
            turnedOnAt: null,
          });

          await createSafetyAlert({
            id,
            ...device,
          });

          console.log(
            `✅ ${device.name} automatically turned OFF`
          );
        }
      }

      // Clean timer if device is manually switched OFF
      if (
        device.status === "OFF" &&
        device.turnedOnAt
      ) {
        await deviceRef.update({
          turnedOnAt: null,
        });
      }
    }
  } catch (error) {
    console.error(
      "❌ Safety service error:",
      error
    );
  }
}

export function startSafetyService() {
  if (safetyInterval) {
    return;
  }

  console.log(
    "🛡 Smart Home Safety Service started"
  );

  // Check every 2 seconds
  safetyInterval = setInterval(
    checkSafetyDevices,
    2000
  );
}
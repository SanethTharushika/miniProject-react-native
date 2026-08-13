import { database } from "../config/firebaseAdmin.js";

let scheduleInterval = null;

function getCurrentTime() {
  const now = new Date();

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
}

async function createScheduleAlert(schedule, status) {
  const alertRef = database.ref("alerts").push();

  await alertRef.set({
    deviceId: schedule.deviceId,
    type: "SCHEDULE",
    title: "Schedule Executed",
    message: `${schedule.name} changed the device to ${status}.`,
    timestamp: Date.now(),
    isRead: false,
  });
}

async function executeSchedules() {
  try {
    const snapshot = await database
      .ref("schedules")
      .once("value");

    const schedules = snapshot.val();

    if (!schedules) {
      return;
    }

    const currentTime = getCurrentTime();

    console.log(
      `⏰ Checking schedules at ${currentTime}`
    );

    for (const [scheduleId, schedule] of Object.entries(schedules)) {
      if (!schedule.enabled) {
        continue;
      }

      const deviceRef = database.ref(
        `devices/${schedule.deviceId}`
      );

      const deviceSnapshot =
        await deviceRef.once("value");

      const device = deviceSnapshot.val();

      if (!device) {
        console.log(
          `⚠️ Device not found for ${scheduleId}`
        );

        continue;
      }

      if (
        currentTime === schedule.startTime &&
        device.status !== "ON"
      ) {
        await deviceRef.update({
          status: "ON",
        });

        await createScheduleAlert(
          schedule,
          "ON"
        );

        console.log(
          `✅ ${schedule.name} automatically turned ON`
        );
      }

      if (
        currentTime === schedule.endTime &&
        device.status !== "OFF"
      ) {
        await deviceRef.update({
          status: "OFF",
        });

        await createScheduleAlert(
          schedule,
          "OFF"
        );

        console.log(
          `✅ ${schedule.name} automatically turned OFF`
        );
      }
    }
  } catch (error) {
    console.error(
      "❌ Schedule service error:",
      error
    );
  }
}

export function startScheduleService() {
  if (scheduleInterval) {
    return;
  }

  console.log(
    "⏰ Smart Home Schedule Service started"
  );

  executeSchedules();

  scheduleInterval = setInterval(
    executeSchedules,
    15000
  );
}
import {
  onValue,
  ref,
  update,
} from "firebase/database";

import { database } from "../config/firebase";
import { Device } from "../types/Device";

export function subscribeToDevices(
  callback: (devices: Device[]) => void
) {
  const devicesRef = ref(
    database,
    "devices"
  );

  return onValue(
    devicesRef,
    (snapshot) => {
      const data = snapshot.val();

      console.log(
        "🔥 Devices from Firebase:",
        data
      );

      if (!data) {
        callback([]);
        return;
      }

      const devices: Device[] =
        Object.entries(data).map(
          ([firebaseId, value]) => ({
            ...(value as Device),

            // Firebase key must be the final id
            id: firebaseId,
          })
        );

      console.log(
        "📱 Converted mobile devices:",
        devices
      );

      callback(devices);
    },
    (error) => {
      console.error(
        "❌ Device Firebase error:",
        error
      );

      callback([]);
    }
  );
}

export async function toggleDevice(
  device: Device
) {
  const newStatus =
    device.status === "ON"
      ? "OFF"
      : "ON";

  console.log(
    "⚡ Updating device:",
    device.id,
    "to",
    newStatus
  );

  await update(
    ref(
      database,
      `devices/${device.id}`
    ),
    {
      status: newStatus,
    }
  );
}
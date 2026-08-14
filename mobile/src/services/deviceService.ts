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
  const devicesRef = ref(database, "devices");

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
          ([id, value]) => ({
            id,
            ...(value as Omit<Device, "id">),
          })
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
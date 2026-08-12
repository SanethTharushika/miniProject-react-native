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

  const unsubscribe = onValue(
    devicesRef,
    (snapshot) => {
      const data = snapshot.val();

      if (!data) {
        callback([]);
        return;
      }

      const devices: Device[] = Object.entries(
        data
      ).map(([id, value]) => ({
        id,
        ...(value as Omit<Device, "id">),
      }));

      callback(devices);
    }
  );

  return unsubscribe;
}

export async function toggleDevice(
  device: Device
) {
  const newStatus =
    device.status === "ON"
      ? "OFF"
      : "ON";

  const deviceRef = ref(
    database,
    `devices/${device.id}`
  );

  await update(deviceRef, {
    status: newStatus,
  });
}
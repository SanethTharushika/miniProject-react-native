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

  return onValue(devicesRef, (snapshot) => {
    const data = snapshot.val();

    if (!data) {
      callback([]);
      return;
    }

    const devices: Device[] = Object.entries(data).map(
      ([id, value]) => ({
        id,
        ...(value as Omit<Device, "id">),
      })
    );

    callback(devices);
  });
}

export async function setDeviceStatus(
  deviceId: string,
  status: Device["status"]
) {
  await update(
    ref(database, `devices/${deviceId}`),
    {
      status,
    }
  );
}
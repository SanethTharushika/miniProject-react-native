import { database } from "../config/firebaseAdmin.js";

export async function getAllDevices() {
  const snapshot = await database.ref("devices").once("value");

  const data = snapshot.val();

  if (!data) {
    return [];
  }

  return Object.entries(data).map(([id, device]) => ({
    id,
    ...device,
  }));
}

export async function getDeviceById(deviceId) {
  const snapshot = await database
    .ref(`devices/${deviceId}`)
    .once("value");

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: deviceId,
    ...snapshot.val(),
  };
}

export async function updateDeviceStatus(
  deviceId,
  status
) {
  await database
    .ref(`devices/${deviceId}`)
    .update({
      status,
    });

  return getDeviceById(deviceId);
}
export type DeviceStatus =
  | "ON"
  | "OFF"
  | "ERROR"
  | "DISCONNECTED";

export type DeviceType =
  | "LIGHT"
  | "OUTLET"
  | "IRON"
  | "MULTI_SWITCH"
  | "CAMERA";

export interface Device {
  id: string;
  name: string;
  floorId: string;
  type: DeviceType;
  status: DeviceStatus;
  power?: number;
}
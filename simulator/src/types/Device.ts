export type DeviceStatus =
  | "ON"
  | "OFF"
  | "ERROR"
  | "DISCONNECTED";

export interface Device {
  id: string;
  name: string;
  floorId: string;
  room?: string;
  type: string;
  status: DeviceStatus;
  power?: number;
}
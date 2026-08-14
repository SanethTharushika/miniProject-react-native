import { DeviceSimulatorCard } from "./DeviceSimulatorCard";
import type { Device } from "../types/Device";

interface FloorPanelProps {
  floor: number;
  devices: Device[];
  onToggle: (deviceId: string) => void;
}

export function FloorPanel({ floor, devices, onToggle }: FloorPanelProps) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h3 style={{ margin: "0 0 12px", color: "#bfdbfe" }}>Floor {floor}</h3>
      {devices.map((device) => (
        <DeviceSimulatorCard key={device.id} device={device} onToggle={onToggle} />
      ))}
    </div>
  );
}

import type { Device } from "../types/Device";
import { setDeviceStatus } from "../services/simulatorService";

type Props = {
  device: Device;
  className?: string;
};

export default function DeviceOverlay({
  device,
  className = "",
}: Props) {
  const isOn = device.status === "ON";

  const toggleDevice = async () => {
    await setDeviceStatus(
      device.id,
      isOn ? "OFF" : "ON"
    );
  };

  return (
    <div className={`device-overlay ${className}`}>
      <div className="device-info">
        <div className="device-icon">
          {getDeviceIcon(device.type)}
        </div>

        <div>
          <h4>{device.name}</h4>

          <span
            className={`device-status ${device.status.toLowerCase()}`}
          >
            {device.status}
          </span>
        </div>
      </div>

      <button
        className={`toggle ${isOn ? "active" : ""}`}
        onClick={toggleDevice}
      >
        <span />
      </button>
    </div>
  );
}

function getDeviceIcon(type: string) {
  switch (type) {
    case "LIGHT":
      return "💡";

    case "OUTLET":
      return "🔌";

    case "IRON":
      return "♨";

    case "CAMERA":
      return "📷";

    case "MULTI_SWITCH":
      return "🎛";

    default:
      return "⚡";
  }
}
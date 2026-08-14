import type { Device } from "../types/Device";

interface DeviceSimulatorCardProps {
  device: Device;
  onToggle: (deviceId: string) => void;
}

export function DeviceSimulatorCard({ device, onToggle }: DeviceSimulatorCardProps) {
  return (
    <button
      type="button"
      onClick={() => onToggle(device.id)}
      style={{
        width: "100%",
        textAlign: "left",
        background: "rgba(30, 41, 59, 0.8)",
        border: "1px solid rgba(148, 163, 184, 0.2)",
        borderRadius: "12px",
        color: "#e2e8f0",
        padding: "14px 16px",
        cursor: "pointer",
        marginBottom: "12px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontWeight: 700 }}>{device.name}</div>
          <div style={{ color: "#94a3b8", fontSize: "0.82rem", marginTop: 4 }}>
            {device.room} • Floor {device.floor}
          </div>
        </div>
        <span
          style={{
            padding: "6px 10px",
            borderRadius: 999,
            background: device.isOnline ? "rgba(34,197,94,0.18)" : "rgba(248,113,113,0.18)",
            color: device.isOnline ? "#86efac" : "#fca5a5",
            fontSize: "0.76rem",
            fontWeight: 700,
          }}
        >
          {device.isOnline ? "online" : "offline"}
        </span>
      </div>

      <div style={{ marginTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "#cbd5e1" }}>Status: {device.status}</span>
        {device.type === "light" && <span>{device.brightness ?? 0}%</span>}
        {device.type === "thermostat" && <span>{device.temperature ?? 0}°C</span>}
        {device.type === "lock" && <span>{device.battery ?? 0}% battery</span>}
      </div>
    </button>
  );
}

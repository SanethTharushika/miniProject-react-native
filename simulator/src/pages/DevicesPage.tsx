import { useEffect, useState } from "react";

import {
  subscribeToDevices,
  setDeviceStatus,
} from "../services/simulatorService";

import type { Device } from "../types/Device";

export default function DevicesPage() {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToDevices(setDevices);

    return () => unsubscribe();
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Devices</h1>
          <p>
            Monitor and control all smart home devices.
          </p>
        </div>

        <div className="page-badge">
          {devices.length} Devices
        </div>
      </div>

      <div className="device-page-grid">
        {devices.map((device) => (
          <div
            key={device.id}
            className="management-card"
          >
            <div className="management-card-header">
              <div>
                <h2>{device.name}</h2>

                <span className="device-type-label">
                  {device.type}
                </span>
              </div>

              <span
                className={`status-badge ${device.status.toLowerCase()}`}
              >
                {device.status}
              </span>
            </div>

            <div className="device-details">
              <p>
                <strong>Room:</strong>{" "}
                {device.room ?? "Not assigned"}
              </p>

              <p>
                <strong>Floor:</strong>{" "}
                {device.floorId}
              </p>

              {device.power !== undefined && (
                <p>
                  <strong>Power:</strong>{" "}
                  {device.power} W
                </p>
              )}
            </div>

            <div className="device-actions">
              <button
                className="action-button on-button"
                onClick={() =>
                  setDeviceStatus(
                    device.id,
                    "ON"
                  )
                }
              >
                ON
              </button>

              <button
                className="action-button off-button"
                onClick={() =>
                  setDeviceStatus(
                    device.id,
                    "OFF"
                  )
                }
              >
                OFF
              </button>

              <button
                className="action-button error-button"
                onClick={() =>
                  setDeviceStatus(
                    device.id,
                    "ERROR"
                  )
                }
              >
                ERROR
              </button>

              <button
                className="action-button disconnect-button"
                onClick={() =>
                  setDeviceStatus(
                    device.id,
                    "DISCONNECTED"
                  )
                }
              >
                DISCONNECT
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
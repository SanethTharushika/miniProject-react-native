import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  subscribeToDevices,
} from "../services/simulatorService";

import type { Device } from "../types/Device";

export default function EnergyPage() {
  const [devices, setDevices] =
    useState<Device[]>([]);

  useEffect(() => {
    const unsubscribe =
      subscribeToDevices(setDevices);

    return () => unsubscribe();
  }, []);

  const activeDevices = useMemo(
    () =>
      devices.filter(
        (device) =>
          device.status === "ON"
      ),
    [devices]
  );

  const currentPower = useMemo(
    () =>
      activeDevices.reduce(
        (total, device) =>
          total + (device.power ?? 0),
        0
      ),
    [activeDevices]
  );

  const highestDevice = useMemo(() => {
    if (devices.length === 0) {
      return null;
    }

    return [...devices].sort(
      (a, b) =>
        (b.power ?? 0) -
        (a.power ?? 0)
    )[0];
  }, [devices]);

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Energy</h1>

          <p>
            Monitor real-time smart home
            energy consumption.
          </p>
        </div>

        <div className="page-badge online">
          Live Monitoring
        </div>
      </div>

      <div className="energy-summary">
        <div className="energy-summary-card">
          <span>Current Load</span>

          <strong>
            {currentPower >= 1000
              ? `${(
                  currentPower / 1000
                ).toFixed(2)} kW`
              : `${currentPower} W`}
          </strong>

          <small>
            Real-time Firebase reading
          </small>
        </div>

        <div className="energy-summary-card">
          <span>Active Devices</span>

          <strong>
            {activeDevices.length}
          </strong>

          <small>
            Currently consuming power
          </small>
        </div>

        <div className="energy-summary-card">
          <span>Highest Rated Device</span>

          <strong>
            {highestDevice?.name ??
              "None"}
          </strong>

          <small>
            {highestDevice?.power ?? 0} W
          </small>
        </div>
      </div>

      <div className="energy-panel">
        <h2>Device Power Usage</h2>

        <div className="energy-list">
          {devices.map((device) => {
            const power =
              device.status === "ON"
                ? device.power ?? 0
                : 0;

            return (
              <div
                key={device.id}
                className="energy-row"
              >
                <div>
                  <strong>
                    {device.name}
                  </strong>

                  <span>
                    {device.room}
                  </span>
                </div>

                <div className="energy-row-right">
                  <span
                    className={`status-badge ${device.status.toLowerCase()}`}
                  >
                    {device.status}
                  </span>

                  <strong>
                    {power} W
                  </strong>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
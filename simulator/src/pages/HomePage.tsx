import { useEffect, useMemo, useState } from "react";

import DeviceOverlay from "../components/DeviceOverlay";

import {
  subscribeToDevices,
} from "../services/simulatorService";

import type { Device } from "../types/Device";

import "../App.css";

function App() {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    const unsubscribe =
      subscribeToDevices(setDevices);

    return () => unsubscribe();
  }, []);

  const getDevice = (id: string) =>
    devices.find((device) => device.id === id);

  const activeDevices = useMemo(
    () =>
      devices.filter(
        (device) => device.status === "ON"
      ).length,
    [devices]
  );

  const totalPower = useMemo(
    () =>
      devices.reduce((total, device) => {
        if (device.status !== "ON") {
          return total;
        }

        return total + (device.power ?? 0);
      }, 0),
    [devices]
  );

  return (
    <div className="simulator-app">
      {/* <header className="topbar">
        <div className="brand-section">
          <div className="brand-icon">⌂</div>

          <div>
            <h1>SMARTNEST</h1>
            <p>Hardware Simulator</p>
          </div>
        </div>

        <div className="top-actions">
          <div className="cloud-status">
            <span className="green-dot" />
            Simulator Mode
          </div>

          <div className="admin-avatar">
            ST
          </div>
        </div>
      </header> */}

      <div className="body-layout">
        {/* <aside className="sidebar">
          <div className="sidebar-item active">
            <span>⌂</span>
            <p>Home</p>
          </div>

          <div className="sidebar-item">
            <span>▣</span>
            <p>Devices</p>
          </div>

          <div className="sidebar-item">
            <span>▦</span>
            <p>Rooms</p>
          </div>

          <div className="sidebar-item">
            <span>⚙</span>
            <p>Automation</p>
          </div>

          <div className="sidebar-item">
            <span>⚡</span>
            <p>Energy</p>
          </div>

          <div className="sidebar-item">
            <span>◷</span>
            <p>Logs</p>
          </div>
        </aside> */}

        <main className="main-content">
          <section className="house-stage">
            <img
              src="/smart-home-house.jpg"
              className="house-image"
              alt="Smart home simulator"
            />

            {getDevice("device001") && (
              <DeviceOverlay
                device={getDevice("device001")!}
                className="living-room"
              />
            )}

            {getDevice("device002") && (
              <DeviceOverlay
                device={getDevice("device002")!}
                className="kitchen"
              />
            )}

            {getDevice("device003") && (
              <DeviceOverlay
                device={getDevice("device003")!}
                className="iron"
              />
            )}

            {getDevice("device004") && (
              <DeviceOverlay
                device={getDevice("device004")!}
                className="bedroom"
              />
            )}

            {getDevice("device005") && (
              <DeviceOverlay
                device={getDevice("device005")!}
                className="hall-switch"
              />
            )}

            {getDevice("device006") && (
              <DeviceOverlay
                device={getDevice("device006")!}
                className="camera"
              />
            )}
          </section>

          <section className="stats-grid">
            <div className="stat-card">
              <span>Total Devices</span>
              <strong>{devices.length}</strong>
              <small>
                <span className="green-dot" />
                Connected
              </small>
            </div>

            <div className="stat-card">
              <span>Active Devices</span>
              <strong>{activeDevices}</strong>
              <small>
                {devices.length > 0
                  ? Math.round(
                      (activeDevices /
                        devices.length) *
                        100
                    )
                  : 0}
                % active
              </small>
            </div>

            <div className="stat-card wide">
              <span>Power Usage</span>

              <strong>
                {totalPower >= 1000
                  ? `${(
                      totalPower / 1000
                    ).toFixed(2)} kW`
                  : `${totalPower} W`}
              </strong>

              <div className="fake-chart">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="stat-card">
              <span>Security</span>
              <strong>Armed</strong>
              <small>System protected</small>
            </div>

            <div className="stat-card">
              <span>Network</span>
              <strong className="online">
                Strong
              </strong>
              <small>Firebase online</small>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
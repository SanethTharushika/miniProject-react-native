import { useEffect, useMemo, useState } from "react";

import DeviceOverlay from "../components/DeviceOverlay";

import {
  subscribeToDevices,
} from "../services/simulatorService";

import type { Device } from "../types/Device";

import "../App.css";

type DevicePosition = {
  id: string;
  className: string;
};

const devicePositions: DevicePosition[] = [
  {
    id: "device001",
    className: "living-room",
  },
  {
    id: "device002",
    className: "kitchen-outlet",
  },
  {
    id: "device003",
    className: "iron",
  },
  {
    id: "device004",
    className: "bedroom",
  },
  {
    id: "device005",
    className: "hall-switch",
  },
  {
    id: "device006",
    className: "front-camera",
  },
  {
    id: "device007",
    className: "kitchen-light",
  },
  {
    id: "device008",
    className: "tv-outlet",
  },
  {
    id: "device009",
    className: "garden-light",
  },
  {
    id: "device010",
    className: "bedroom-outlet",
  },
  {
    id: "device011",
    className: "balcony-light",
  },
  {
    id: "device012",
    className: "hall-camera",
  },
  {
    id: "device013",
    className: "study-light",
  },
  {
    id: "device014",
    className: "study-outlet",
  },
  {
    id: "device015",
    className: "office-switch",
  },
];

export default function HomePage() {
  const [devices, setDevices] =
    useState<Device[]>([]);

  useEffect(() => {
    const unsubscribe =
      subscribeToDevices((data) => {
        setDevices(data);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  const activeDevices = useMemo(() => {
    return devices.filter(
      (device) =>
        device.status === "ON"
    ).length;
  }, [devices]);

  const disconnectedDevices =
    useMemo(() => {
      return devices.filter(
        (device) =>
          device.status ===
          "DISCONNECTED"
      ).length;
    }, [devices]);

  const totalPower = useMemo(() => {
    return devices.reduce(
      (total, device) => {
        if (
          device.status !== "ON"
        ) {
          return total;
        }

        return (
          total +
          (device.power ?? 0)
        );
      },
      0
    );
  }, [devices]);

  const cameraCount = useMemo(() => {
    return devices.filter(
      (device) =>
        device.type === "CAMERA"
    ).length;
  }, [devices]);

  const onlineDevices =
    devices.length -
    disconnectedDevices;

  const getDevice = (
    id: string
  ) => {
    return devices.find(
      (device) =>
        device.id === id
    );
  };

  return (
    <div className="home-page">
      <section className="house-stage">
        <img
          src="/smart-home-house.jpg"
          className="house-image"
          alt="Smart home hardware simulator"
        />

        {devicePositions.map(
          ({
            id,
            className,
          }) => {
            const device =
              getDevice(id);

            if (!device) {
              return null;
            }

            return (
              <DeviceOverlay
                key={device.id}
                device={device}
                className={
                  className
                }
              />
            );
          }
        )}
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <span>
            Total Devices
          </span>

          <strong>
            {devices.length}
          </strong>

          <small>
            <span className="green-dot" />
            {" "}
            {onlineDevices} online
          </small>
        </div>

        <div className="stat-card">
          <span>
            Active Devices
          </span>

          <strong>
            {activeDevices}
          </strong>

          <small>
            {devices.length > 0
              ? Math.round(
                  (
                    activeDevices /
                    devices.length
                  ) *
                    100
                )
              : 0}
            % active
          </small>
        </div>

        <div className="stat-card wide">
          <span>
            Power Usage
          </span>

          <strong>
            {totalPower >= 1000
              ? `${(
                  totalPower /
                  1000
                ).toFixed(
                  2
                )} kW`
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
          <span>
            Security
          </span>

          <strong>
            {cameraCount}
          </strong>

          <small>
            Security cameras
          </small>
        </div>

        <div className="stat-card">
          <span>
            Network
          </span>

          <strong
            className="online"
          >
            {disconnectedDevices ===
            0
              ? "Strong"
              : "Warning"}
          </strong>

          <small>
            {onlineDevices}/
            {devices.length} devices
            connected
          </small>
        </div>
      </section>
    </div>
  );
}
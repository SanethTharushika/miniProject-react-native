import { useEffect, useMemo, useState } from "react";

import {
  subscribeToDevices,
} from "../services/simulatorService";

import type { Device } from "../types/Device";

export default function RoomsPage() {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToDevices(setDevices);

    return () => unsubscribe();
  }, []);

  const rooms = useMemo(() => {
    const grouped: Record<string, Device[]> = {};

    devices.forEach((device) => {
      const room =
        device.room ?? "Unassigned Room";

      if (!grouped[room]) {
        grouped[room] = [];
      }

      grouped[room].push(device);
    });

    return grouped;
  }, [devices]);

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Rooms</h1>
          <p>
            View smart devices grouped by room.
          </p>
        </div>

        <div className="page-badge">
          {Object.keys(rooms).length} Rooms
        </div>
      </div>

      <div className="room-grid">
        {Object.entries(rooms).map(
          ([roomName, roomDevices]) => {
            const activeCount =
              roomDevices.filter(
                (device) =>
                  device.status === "ON"
              ).length;

            return (
              <div
                key={roomName}
                className="room-card"
              >
                <div className="room-card-header">
                  <div>
                    <h2>{roomName}</h2>

                    <p>
                      {roomDevices.length} devices
                    </p>
                  </div>

                  <div className="room-active-count">
                    {activeCount} active
                  </div>
                </div>

                <div className="room-device-list">
                  {roomDevices.map((device) => (
                    <div
                      key={device.id}
                      className="room-device-row"
                    >
                      <div>
                        <strong>
                          {device.name}
                        </strong>

                        <span>
                          {device.type}
                        </span>
                      </div>

                      <span
                        className={`status-badge ${device.status.toLowerCase()}`}
                      >
                        {device.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";

import {
  onValue,
  ref,
} from "firebase/database";

import { database } from "../config/firebase";

type AlertItem = {
  id: string;
  type?: string;
  message?: string;
  deviceId?: string;
  timestamp?: number;
  createdAt?: number;
};

export default function LogsPage() {
  const [logs, setLogs] =
    useState<AlertItem[]>([]);

  useEffect(() => {
    const alertsRef =
      ref(database, "alerts");

    const unsubscribe = onValue(
      alertsRef,
      (snapshot) => {
        const data = snapshot.val();

        if (!data) {
          setLogs([]);
          return;
        }

        const list: AlertItem[] =
          Object.entries(data).map(
            ([id, value]) => ({
              id,
              ...(value as Omit<
                AlertItem,
                "id"
              >),
            })
          );

        list.sort((a, b) => {
          const timeA =
            a.timestamp ??
            a.createdAt ??
            0;

          const timeB =
            b.timestamp ??
            b.createdAt ??
            0;

          return timeB - timeA;
        });

        setLogs(list);
      }
    );

    return () => unsubscribe();
  }, []);

  function formatTime(
    timestamp?: number
  ) {
    if (!timestamp) {
      return "Unknown time";
    }

    return new Date(
      timestamp
    ).toLocaleString();
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>System Logs</h1>

          <p>
            Safety alerts and smart home
            system activity.
          </p>
        </div>

        <div className="page-badge">
          {logs.length} Events
        </div>
      </div>

      <div className="logs-panel">
        {logs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              ◷
            </div>

            <h2>No activity yet</h2>

            <p>
              Safety alerts and system
              activity will appear here.
            </p>
          </div>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className="log-row"
            >
              <div className="log-icon">
                {log.type === "SAFETY"
                  ? "⚠"
                  : "●"}
              </div>

              <div className="log-content">
                <strong>
                  {log.message ??
                    "System event"}
                </strong>

                <span>
                  {log.deviceId &&
                    `Device: ${log.deviceId}`}
                </span>
              </div>

              <div className="log-time">
                {formatTime(
                  log.timestamp ??
                    log.createdAt
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
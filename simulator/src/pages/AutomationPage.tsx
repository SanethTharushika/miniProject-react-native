import { useEffect, useState } from "react";

import {
  onValue,
  ref,
  update,
} from "firebase/database";

import { database } from "../config/firebase";

type Schedule = {
  id: string;
  deviceId: string;
  name: string;
  startTime: string;
  endTime: string;
  enabled: boolean;
};

export default function AutomationPage() {
  const [schedules, setSchedules] =
    useState<Schedule[]>([]);

  useEffect(() => {
    const schedulesRef =
      ref(database, "schedules");

    const unsubscribe = onValue(
      schedulesRef,
      (snapshot) => {
        const data = snapshot.val();

        if (!data) {
          setSchedules([]);
          return;
        }

        const list: Schedule[] =
          Object.entries(data).map(
            ([id, value]) => ({
              id,
              ...(value as Omit<
                Schedule,
                "id"
              >),
            })
          );

        setSchedules(list);
      }
    );

    return () => unsubscribe();
  }, []);

  async function toggleSchedule(
    schedule: Schedule
  ) {
    await update(
      ref(
        database,
        `schedules/${schedule.id}`
      ),
      {
        enabled: !schedule.enabled,
      }
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Automation</h1>

          <p>
            Manage scheduled smart home
            actions.
          </p>
        </div>

        <div className="page-badge">
          {schedules.length} Rules
        </div>
      </div>

      <div className="automation-grid">
        {schedules.map((schedule) => (
          <div
            key={schedule.id}
            className="automation-card"
          >
            <div className="automation-card-top">
              <div>
                <span className="automation-icon">
                  ⚙
                </span>

                <h2>
                  {schedule.name}
                </h2>
              </div>

              <button
                className={`automation-toggle ${
                  schedule.enabled
                    ? "enabled"
                    : ""
                }`}
                onClick={() =>
                  toggleSchedule(schedule)
                }
              >
                <span />
              </button>
            </div>

            <div className="automation-info">
              <div>
                <span>Device</span>
                <strong>
                  {schedule.deviceId}
                </strong>
              </div>

              <div>
                <span>Start</span>
                <strong>
                  {schedule.startTime}
                </strong>
              </div>

              <div>
                <span>End</span>
                <strong>
                  {schedule.endTime}
                </strong>
              </div>
            </div>

            <div
              className={`automation-status ${
                schedule.enabled
                  ? "enabled"
                  : "disabled"
              }`}
            >
              {schedule.enabled
                ? "Automation Enabled"
                : "Automation Disabled"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
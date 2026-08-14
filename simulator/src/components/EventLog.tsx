interface EventLogProps {
  events: string[];
}

export function EventLog({ events }: EventLogProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {events.map((event, index) => (
        <div
          key={`${event}-${index}`}
          style={{
            background: "rgba(15, 23, 42, 0.9)",
            border: "1px solid rgba(148, 163, 184, 0.15)",
            borderRadius: "10px",
            padding: "10px 12px",
            color: "#dbeafe",
            fontSize: "0.9rem",
          }}
        >
          {event}
        </div>
      ))}
    </div>
  );
}

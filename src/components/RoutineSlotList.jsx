import React from "react";

export default function RoutineSlotList({ slots, busyMode, onToggleTask }) {
  const safeSlots = Array.isArray(slots) ? slots : [];
  const slotNames = ["Morning", "Work Break", "Evening / Night"];

  const slotLabelMap = {
    Morning: "સવારનું રૂટિન (Morning)",
    "Work Break": "કામના બ્રેક દરમિયાન (Work Break)",
    "Evening / Night": "સાંજ / રાતનું રૂટિન (Evening / Night)",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        marginBottom: "18px",
      }}
    >
      {slotNames.map((slotName) => {
        const slotTasks = safeSlots.filter((task) => task.slot === slotName);
        const completedInSlot = slotTasks.reduce(
          (acc, item) => acc + (item.completed ? 1 : 0),
          0
        );
        const slotPercent =
          slotTasks.length > 0
            ? Math.round((completedInSlot / slotTasks.length) * 100)
            : 0;

        return (
          <div
            key={slotName}
            style={{
              border: "1px solid #0f172a",
              backgroundColor: "#ffffff",
              padding: "16px",
              borderRadius: "0",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #cbd5e1",
                paddingBottom: "8px",
                marginBottom: "12px",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "clamp(15px, 1.8vw, 17px)",
                  color: "#0f172a",
                }}
              >
                {slotLabelMap[slotName]}
              </h3>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#0f172a",
                }}
              >
                {completedInSlot}/{slotTasks.length} ({slotPercent}%)
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {slotTasks.map((task) => {
                const displayTitle = busyMode ? task.busyTitle : task.title;
                const displayMins = busyMode
                  ? task.busyDurationMins
                  : task.durationMins;

                return (
                  <label
                    key={task.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "12px",
                      padding: "10px 12px",
                      border: "1px solid #cbd5e1",
                      backgroundColor: task.completed ? "#f1f5f9" : "#ffffff",
                      borderRadius: "0",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={Boolean(task.completed)}
                        onChange={() => onToggleTask(task.id)}
                      />
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#0f172a",
                          textDecoration: task.completed
                            ? "line-through"
                            : "none",
                        }}
                      >
                        {displayTitle}
                      </span>
                    </div>

                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        padding: "4px 8px",
                        border: "1px solid #0f172a",
                        backgroundColor: busyMode ? "#fef3c7" : "#f8fafc",
                        color: "#0f172a",
                        borderRadius: "0",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {displayMins} મિનિટ
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
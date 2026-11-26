import React from "react";

export default function RoutineSlotList({ slots, busyMode, onToggleTask, t }) {
  const safeSlots = Array.isArray(slots) ? slots : [];
  const slotNames = ["Morning", "Work Break", "Evening / Night"];

  const slotConfig = {
    Morning: {
      label: t.slotMorning,
      accent: "#d97706",
      headerBg: "#fffbeb",
      badgeBg: "#fef3c7",
    },
    "Work Break": {
      label: t.slotBreak,
      accent: "#0284c7",
      headerBg: "#f0f9ff",
      badgeBg: "#e0f2fe",
    },
    "Evening / Night": {
      label: t.slotEvening,
      accent: "#7c3aed",
      headerBg: "#f5f3ff",
      badgeBg: "#ede9fe",
    },
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        marginBottom: "20px",
      }}
    >
      {slotNames.map((slotName) => {
        const cfg = slotConfig[slotName];
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
          <section
            key={slotName}
            style={{
              border: "1px solid #0f172a",
              borderLeft: `5px solid ${cfg.accent}`,
              backgroundColor: "#ffffff",
              padding: "clamp(14px, 2vw, 18px)",
              borderRadius: "0",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "8px",
                backgroundColor: cfg.headerBg,
                border: "1px solid #e2e8f0",
                padding: "8px 12px",
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
                {cfg.label}
              </h3>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  padding: "3px 8px",
                  backgroundColor: cfg.badgeBg,
                  border: "1px solid #cbd5e1",
                  color: "#0f172a",
                  borderRadius: "0",
                }}
              >
                {completedInSlot}/{slotTasks.length} ({slotPercent}%)
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {slotTasks.map((task) => {
                const localized = t.taskText?.[task.id];
                const displayTitle = busyMode
                  ? localized?.busyTitle || task.busyTitle
                  : localized?.title || task.title;
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
                      backgroundColor: task.completed ? "#ecfdf5" : "#ffffff",
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
                        backgroundColor: busyMode ? "#fef3c7" : "#f1f5f9",
                        color: "#0f172a",
                        borderRadius: "0",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {displayMins} {t.mins}
                    </span>
                  </label>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
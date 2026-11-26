import React from "react";

export default function BusyModeBar({
  busyMode,
  onToggleBusyMode,
  completedCount,
  totalCount,
  t,
}) {
  const percent =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <section
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        padding: "clamp(14px, 2vw, 20px)",
        border: "1px solid #0f172a",
        borderLeft: busyMode ? "6px solid #f59e0b" : "6px solid #2563eb",
        backgroundColor: busyMode ? "#fffbeb" : "#ffffff",
        borderRadius: "0",
        marginBottom: "20px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ flex: "1 1 280px", minWidth: "220px" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontWeight: 700,
              fontSize: "clamp(15px, 1.8vw, 17px)",
              color: "#0f172a",
            }}
          >
            {busyMode ? t.busyActiveTitle : t.standardActiveTitle}
          </span>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              padding: "3px 8px",
              border: "1px solid #0f172a",
              backgroundColor: busyMode ? "#fde68a" : "#dbeafe",
              color: busyMode ? "#78350f" : "#1e3a8a",
              borderRadius: "0",
            }}
          >
            {busyMode ? t.busyActiveBadge : t.standardBadge} • {percent}%
          </span>
        </div>

        <p
          style={{
            margin: "6px 0 10px",
            fontSize: "13px",
            color: "#334155",
          }}
        >
          {t.completedPrefix}: <strong>{completedCount}</strong> /{" "}
          <strong>{totalCount}</strong> {t.tasksWord}
        </p>

        <div
          style={{
            width: "100%",
            height: "9px",
            backgroundColor: "#e2e8f0",
            border: "1px solid #0f172a",
            borderRadius: "0",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${percent}%`,
              height: "100%",
              backgroundColor: busyMode ? "#d97706" : "#10b981",
              transition: "width 0.25s ease",
            }}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={onToggleBusyMode}
        style={{
          padding: "11px 18px",
          border: "1px solid #0f172a",
          borderRadius: "0",
          backgroundColor: busyMode ? "#0f172a" : "#2563eb",
          color: "#ffffff",
          fontWeight: 700,
          fontSize: "13px",
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        {busyMode ? t.disableBusyBtn : t.enableBusyBtn}
      </button>
    </section>
  );
}
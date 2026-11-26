import React from "react";

export default function WeeklySummaryView({ weeklyHistory, t }) {
  const safeHistory = Array.isArray(weeklyHistory) ? weeklyHistory : [];

  const avgPercent =
    safeHistory.length > 0
      ? Math.round(
          safeHistory.reduce((sum, item) => sum + (item.completionPercent || 0), 0) /
            safeHistory.length
        )
      : 0;

  const consistentDays = safeHistory.filter(
    (item) => (item.completionPercent || 0) >= 75
  ).length;

  const missedSlots = safeHistory
    .filter((item) => item.missedSlot && item.missedSlot !== "None")
    .map((item) => item.missedSlot);

  const slotCounts = missedSlots.reduce((acc, slot) => {
    acc[slot] = (acc[slot] || 0) + 1;
    return acc;
  }, {});

  const formatSlotName = (slot) => {
    if (!slot || slot === "None") return t.missedNone;
    if (slot === "Morning") return t.slotMorning;
    if (slot === "Work Break") return t.slotBreak;
    if (slot === "Evening / Night") return t.slotEvening;
    return slot;
  };

  const topMissedSlot =
    Object.keys(slotCounts).length > 0
      ? formatSlotName(
          Object.entries(slotCounts).sort((a, b) => b[1] - a[1])[0][0]
        )
      : t.noMissedSlot;

  const statCardStyle = {
    border: "1px solid #cbd5e1",
    padding: "12px",
    backgroundColor: "#f8fafc",
    borderRadius: "0",
  };

  return (
    <section
      style={{
        border: "1px solid #0f172a",
        borderTop: "4px solid #7c3aed",
        backgroundColor: "#ffffff",
        padding: "clamp(16px, 2vw, 20px)",
        borderRadius: "0",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: "clamp(17px, 2vw, 20px)",
          color: "#4c1d95",
        }}
      >
        {t.weeklyTitle}
      </h2>
      <p style={{ margin: "6px 0 14px", fontSize: "13px", color: "#475569" }}>
        {t.weeklySubtitlePrefix} {safeHistory.length} {t.weeklySubtitleSuffix}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "10px",
          marginBottom: "16px",
        }}
      >
        <div style={{ ...statCardStyle, backgroundColor: "#eff6ff" }}>
          <div style={{ fontSize: "12px", color: "#1e3a8a", fontWeight: 700 }}>
            {t.avgCompletionLabel}
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#0f172a",
              marginTop: "4px",
            }}
          >
            {avgPercent}%
          </div>
        </div>

        <div style={{ ...statCardStyle, backgroundColor: "#ecfdf5" }}>
          <div style={{ fontSize: "12px", color: "#065f46", fontWeight: 700 }}>
            {t.consistentDaysLabel}
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#0f172a",
              marginTop: "4px",
            }}
          >
            {consistentDays}/{safeHistory.length}
          </div>
        </div>

        <div style={{ ...statCardStyle, backgroundColor: "#fffbeb" }}>
          <div style={{ fontSize: "12px", color: "#92400e", fontWeight: 700 }}>
            {t.topMissedLabel}
          </div>
          <div
            style={{
              fontSize: "14px",
              fontWeight: 700,
              color: "#0f172a",
              marginTop: "8px",
            }}
          >
            {topMissedSlot}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {safeHistory.map((item) => {
          const pct = item.completionPercent || 0;
          const dayLabel = t.days?.[item.day] || item.day;
          return (
            <div
              key={item.date}
              style={{
                padding: "10px 12px",
                border: "1px solid #cbd5e1",
                backgroundColor: "#ffffff",
                borderRadius: "0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13px",
                  marginBottom: "6px",
                }}
              >
                <span>
                  <strong>{dayLabel}</strong>{" "}
                  <span style={{ color: "#64748b" }}>({item.date})</span>
                </span>
                <span style={{ fontSize: "12px", color: "#475569" }}>
                  {t.missedPartLabel}: <strong>{formatSlotName(item.missedSlot)}</strong>
                </span>
                <strong style={{ color: "#0f172a" }}>{pct}%</strong>
              </div>

              <div
                style={{
                  width: "100%",
                  height: "6px",
                  backgroundColor: "#e2e8f0",
                  borderRadius: "0",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${pct}%`,
                    height: "100%",
                    backgroundColor: pct >= 75 ? "#10b981" : "#6366f1",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
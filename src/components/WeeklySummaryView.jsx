import React from "react";

export default function WeeklySummaryView({ weeklyHistory }) {
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

  const topMissedSlot =
    Object.keys(slotCounts).length > 0
      ? Object.entries(slotCounts).sort((a, b) => b[1] - a[1])[0][0]
      : "કોઈ નહીં";

  const statCardStyle = {
    border: "1px solid #0f172a",
    padding: "14px",
    backgroundColor: "#f8fafc",
    borderRadius: "0",
  };

  return (
    <div
      style={{
        border: "1px solid #0f172a",
        backgroundColor: "#ffffff",
        padding: "18px",
        borderRadius: "0",
        marginBottom: "18px",
      }}
    >
      <h2 style={{ margin: 0, fontSize: "clamp(17px, 2vw, 20px)", color: "#0f172a" }}>
        સાપ્તાહિક સારાંશ (Weekly Summary)
      </h2>
      <p style={{ margin: "6px 0 14px", fontSize: "13px", color: "#475569" }}>
        છેલ્લા {safeHistory.length} દિવસની રૂટિન પૂર્ણતા, સાતત્ય અને ચૂકાયેલા સમયગાળાનું વિશ્લેષણ.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        <div style={statCardStyle}>
          <div style={{ fontSize: "12px", color: "#475569", fontWeight: 600 }}>
            સરેરાશ પૂર્ણતા (%)
          </div>
          <div
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#0f172a",
              marginTop: "4px",
            }}
          >
            {avgPercent}%
          </div>
        </div>

        <div style={statCardStyle}>
          <div style={{ fontSize: "12px", color: "#475569", fontWeight: 600 }}>
            સતત જાળવેલા દિવસો (≥75%)
          </div>
          <div
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#0f172a",
              marginTop: "4px",
            }}
          >
            {consistentDays} / {safeHistory.length} દિવસ
          </div>
        </div>

        <div style={statCardStyle}>
          <div style={{ fontSize: "12px", color: "#475569", fontWeight: 600 }}>
            સૌથી વધુ ચૂકાયેલો સમય
          </div>
          <div
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#0f172a",
              marginTop: "8px",
            }}
          >
            {topMissedSlot}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {safeHistory.map((item) => (
          <div
            key={item.date}
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "8px",
              padding: "10px 12px",
              border: "1px solid #cbd5e1",
              backgroundColor: "#ffffff",
              borderRadius: "0",
              fontSize: "13px",
              color: "#0f172a",
            }}
          >
            <span>
              <strong>{item.day}</strong> ({item.date})
            </span>
            <span style={{ color: "#334155" }}>
              ચૂકાયેલો ભાગ: <strong>{item.missedSlot || "None"}</strong>
            </span>
            <strong>{item.completionPercent || 0}%</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
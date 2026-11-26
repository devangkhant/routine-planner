import React from "react";

export default function MealGuideCard({ schedule, t }) {
  const safeSchedule = schedule || {};
  const rules = Array.isArray(t.mealRules) ? t.mealRules : [];
  const accents = ["#059669", "#ea580c", "#4f46e5"];
  const bgTints = ["#ecfdf5", "#fff7ed", "#eef2ff"];

  return (
    <section
      style={{
        border: "1px solid #0f172a",
        borderTop: "4px solid #059669",
        backgroundColor: "#ffffff",
        padding: "clamp(16px, 2vw, 20px)",
        borderRadius: "0",
        marginBottom: "20px",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: "clamp(17px, 2vw, 20px)",
          color: "#064e3b",
        }}
      >
        {t.mealGuideTitle}
      </h2>
      <p style={{ margin: "6px 0 14px", fontSize: "13px", color: "#475569" }}>
        {t.mealGuideSubtitlePrefix}{" "}
        <strong>{safeSchedule.workStart || "10:00"}</strong>{" "}
        {t.mealGuideSubtitleMid}{" "}
        <strong>{safeSchedule.workEnd || "20:30"}</strong>{" "}
        {t.mealGuideSubtitleEnd}{" "}
        <strong>{safeSchedule.dinner || "21:00"}</strong>.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "12px",
        }}
      >
        {rules.map((rule, index) => (
          <div
            key={rule.id}
            style={{
              border: "1px solid #cbd5e1",
              borderLeft: `4px solid ${accents[index % accents.length]}`,
              backgroundColor: bgTints[index % bgTints.length],
              padding: "14px",
              borderRadius: "0",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: "14px",
                color: "#0f172a",
                marginBottom: "8px",
              }}
            >
              {rule.situation}
            </div>
            <div style={{ fontSize: "13px", color: "#1e293b", marginBottom: "6px" }}>
              <strong>{t.portionLabel}:</strong> {rule.portion}
            </div>
            <div style={{ fontSize: "13px", color: "#1e293b", marginBottom: "6px" }}>
              <strong>{t.timingLabel}:</strong> {rule.timing}
            </div>
            <div style={{ fontSize: "13px", color: "#334155" }}>
              <strong>{t.alternativeLabel}:</strong> {rule.alternative}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
import React from "react";

export default function MealGuideCard({ mealRules, schedule }) {
  const safeRules = Array.isArray(mealRules) ? mealRules : [];
  const safeSchedule = schedule || {};

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
        મીલ ગાઈડ અને અવેજી વિકલ્પો (Meal Guide)
      </h2>
      <p style={{ margin: "6px 0 14px", fontSize: "13px", color: "#475569" }}>
        તમારો કામનો સમય <strong>{safeSchedule.workStart || "10:00"}</strong> થી{" "}
        <strong>{safeSchedule.workEnd || "20:30"}</strong> અને ડિનર{" "}
        <strong>{safeSchedule.dinner || "21:00"}</strong> મુજબ લંચ સ્કિપ થાય કે મોડું થાય ત્યારે સરળ વિકલ્પો:
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "12px",
        }}
      >
        {safeRules.map((rule) => (
          <div
            key={rule.id}
            style={{
              border: "1px solid #cbd5e1",
              backgroundColor: "#f8fafc",
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
              <strong>પોર્શન:</strong> {rule.portion}
            </div>
            <div style={{ fontSize: "13px", color: "#1e293b", marginBottom: "6px" }}>
              <strong>સમય:</strong> {rule.timing}
            </div>
            <div style={{ fontSize: "13px", color: "#334155" }}>
              <strong>અવેજી:</strong> {rule.alternative}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
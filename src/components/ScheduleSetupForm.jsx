import React, { useState, useEffect } from "react";

export default function ScheduleSetupForm({
  workStart,
  workEnd,
  morningMeal,
  afternoonSnack,
  dinner,
  goal,
  onSaveSchedule,
  t,
}) {
  const [formData, setFormData] = useState({
    workStart: workStart || "10:00",
    workEnd: workEnd || "20:30",
    morningMeal: morningMeal || "08:45",
    afternoonSnack: afternoonSnack || "15:00",
    dinner: dinner || "21:00",
    goal: goal || "bellyFat",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      workStart: workStart ?? prev.workStart,
      workEnd: workEnd ?? prev.workEnd,
      morningMeal: morningMeal ?? prev.morningMeal,
      afternoonSnack: afternoonSnack ?? prev.afternoonSnack,
      dinner: dinner ?? prev.dinner,
      goal: goal ?? prev.goal,
    }));
  }, [workStart, workEnd, morningMeal, afternoonSnack, dinner, goal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveSchedule(formData);
  };

  const cardStyle = {
    border: "1px solid #0f172a",
    borderTop: "4px solid #4f46e5",
    backgroundColor: "#ffffff",
    padding: "clamp(16px, 2vw, 20px)",
    borderRadius: "0",
    marginBottom: "20px",
    boxSizing: "border-box",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(175px, 1fr))",
    gap: "12px",
    marginTop: "14px",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px 10px",
    border: "1px solid #64748b",
    borderRadius: "0",
    fontSize: "13px",
    marginTop: "6px",
    boxSizing: "border-box",
    backgroundColor: "#f8fafc",
    color: "#0f172a",
  };

  return (
    <form onSubmit={handleSubmit} style={cardStyle}>
      <h2
        style={{
          margin: 0,
          fontSize: "clamp(17px, 2vw, 20px)",
          color: "#1e1b4b",
        }}
      >
        {t.setupTitle}
      </h2>
      <p style={{ margin: "6px 0 0", fontSize: "13px", color: "#475569" }}>
        {t.setupSubtitle}
      </p>

      <div style={gridStyle}>
        <label style={{ fontSize: "12px", fontWeight: 700, color: "#1e293b" }}>
          {t.workStartLabel}
          <input
            type="time"
            name="workStart"
            value={formData.workStart}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <label style={{ fontSize: "12px", fontWeight: 700, color: "#1e293b" }}>
          {t.workEndLabel}
          <input
            type="time"
            name="workEnd"
            value={formData.workEnd}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <label style={{ fontSize: "12px", fontWeight: 700, color: "#1e293b" }}>
          {t.morningMealLabel}
          <input
            type="time"
            name="morningMeal"
            value={formData.morningMeal}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <label style={{ fontSize: "12px", fontWeight: 700, color: "#1e293b" }}>
          {t.afternoonSnackLabel}
          <input
            type="time"
            name="afternoonSnack"
            value={formData.afternoonSnack}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <label style={{ fontSize: "12px", fontWeight: 700, color: "#1e293b" }}>
          {t.dinnerLabel}
          <input
            type="time"
            name="dinner"
            value={formData.dinner}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <label style={{ fontSize: "12px", fontWeight: 700, color: "#1e293b" }}>
          {t.goalLabel}
          <select
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="bellyFat">{t.goalBellyFat}</option>
            <option value="energy">{t.goalEnergy}</option>
            <option value="deskFatigue">{t.goalDeskFatigue}</option>
          </select>
        </label>
      </div>

      <div style={{ marginTop: "16px", display: "flex", justifyContent: "flex-end" }}>
        <button
          type="submit"
          style={{
            padding: "10px 18px",
            backgroundColor: "#0d9488",
            color: "#ffffff",
            border: "1px solid #0f172a",
            borderRadius: "0",
            fontWeight: 700,
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          {t.saveRoutineBtn}
        </button>
      </div>
    </form>
  );
}
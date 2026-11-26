import React, { useState, useEffect } from "react";

export default function ScheduleSetupForm({
  workStart,
  workEnd,
  goal,
  onSaveSchedule,
}) {
  const [formData, setFormData] = useState({
    workStart: workStart || "10:00",
    workEnd: workEnd || "20:30",
    morningMeal: "08:45",
    afternoonSnack: "15:00",
    dinner: "21:00",
    goal: goal || "bellyFat",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      workStart: workStart || prev.workStart,
      workEnd: workEnd || prev.workEnd,
      goal: goal || prev.goal,
    }));
  }, [workStart, workEnd, goal]);

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
    backgroundColor: "#ffffff",
    padding: "18px",
    borderRadius: "0",
    marginBottom: "18px",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
    gap: "12px",
    marginTop: "14px",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px 10px",
    border: "1px solid #64748b",
    borderRadius: "0",
    fontSize: "14px",
    marginTop: "6px",
    boxSizing: "border-box",
    backgroundColor: "#ffffff",
    color: "#0f172a",
  };

  return (
    <form onSubmit={handleSubmit} style={cardStyle}>
      <h2 style={{ margin: 0, fontSize: "clamp(17px, 2vw, 20px)", color: "#0f172a" }}>
        શેડ્યૂલ અને લક્ષ્ય સેટઅપ
      </h2>
      <p style={{ margin: "6px 0 0", fontSize: "13px", color: "#475569" }}>
        તમારો કામનો સમય, ભોજન/નાસ્તાનો સમય અને મુખ્ય લક્ષ્ય પસંદ કરીને આજનું રૂટિન જનરેટ કરો.
      </p>

      <div style={gridStyle}>
        <label style={{ fontSize: "13px", fontWeight: 600, color: "#1e293b" }}>
          કામ શરૂ થવાનો સમય
          <input
            type="time"
            name="workStart"
            value={formData.workStart}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <label style={{ fontSize: "13px", fontWeight: 600, color: "#1e293b" }}>
          કામ પૂરું થવાનો સમય
          <input
            type="time"
            name="workEnd"
            value={formData.workEnd}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <label style={{ fontSize: "13px", fontWeight: 600, color: "#1e293b" }}>
          સવારનો નાસ્તો / ભોજન
          <input
            type="time"
            name="morningMeal"
            value={formData.morningMeal}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <label style={{ fontSize: "13px", fontWeight: 600, color: "#1e293b" }}>
          બપોરનો નાસ્તો
          <input
            type="time"
            name="afternoonSnack"
            value={formData.afternoonSnack}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <label style={{ fontSize: "13px", fontWeight: 600, color: "#1e293b" }}>
          રાત્રિનું ભોજન (Dinner)
          <input
            type="time"
            name="dinner"
            value={formData.dinner}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <label style={{ fontSize: "13px", fontWeight: 600, color: "#1e293b" }}>
          મુખ્ય લક્ષ્ય (Goal)
          <select
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="bellyFat">કમર / પેટની ચરબી ઘટાડવી (bellyFat)</option>
            <option value="energy">દિવસભર એનર્જી વધારવી (energy)</option>
            <option value="deskFatigue">બેઠાડુ કામનો થાક ઘટાડવો (deskFatigue)</option>
          </select>
        </label>
      </div>

      <div style={{ marginTop: "16px", display: "flex", justifyContent: "flex-end" }}>
        <button
          type="submit"
          style={{
            padding: "10px 18px",
            backgroundColor: "#0f172a",
            color: "#ffffff",
            border: "1px solid #0f172a",
            borderRadius: "0",
            fontWeight: 700,
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          રૂટિન જનરેટ / સેવ કરો
        </button>
      </div>
    </form>
  );
}
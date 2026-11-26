import React, { useState, useEffect } from "react";
import {
  initialRoutineData,
  translations,
  generateTasksFromSchedule,
} from "./data/defaultRoutineData";
import ScheduleSetupForm from "./components/ScheduleSetupForm";
import BusyModeBar from "./components/BusyModeBar";
import RoutineSlotList from "./components/RoutineSlotList";
import MealGuideCard from "./components/MealGuideCard";
import WeeklySummaryView from "./components/WeeklySummaryView";

const STORAGE_KEY = "health_routine_planner_v1";

function loadInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialRoutineData;
    const parsed = JSON.parse(raw);
    return {
      ...initialRoutineData,
      ...parsed,
      language: ["en", "gu", "hi"].includes(parsed?.language)
        ? parsed.language
        : "en",
      schedule: {
        ...initialRoutineData.schedule,
        ...(parsed?.schedule || {}),
      },
      tasks: Array.isArray(parsed?.tasks) ? parsed.tasks : initialRoutineData.tasks,
      weeklyHistory: Array.isArray(parsed?.weeklyHistory)
        ? parsed.weeklyHistory
        : initialRoutineData.weeklyHistory,
    };
  } catch {
    return initialRoutineData;
  }
}

export default function App() {
  const [appData, setAppData] = useState(loadInitialState);
  const [statusMessage, setStatusMessage] = useState("");

  const lang = appData.language || "en";
  const t = translations[lang] || translations.en;

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
    } catch {
      // Ignore storage quota errors
    }
  }, [appData]);

  const showNotice = (msg) => {
    setStatusMessage(msg);
    setTimeout(() => {
      setStatusMessage("");
    }, 3000);
  };

  const handleLanguageChange = (nextLang) => {
    setAppData((prev) => ({
      ...prev,
      language: nextLang,
    }));
  };

  const handleSaveSchedule = (newSchedule) => {
    setAppData((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        ...newSchedule,
      },
      tasks: generateTasksFromSchedule(prev.tasks, {
        ...prev.schedule,
        ...newSchedule,
      }),
    }));
    showNotice(t.noticeScheduleSaved);
  };

  const handleToggleBusyMode = () => {
    setAppData((prev) => {
      const nextBusy = !prev.schedule.busyMode;
      showNotice(nextBusy ? t.noticeBusyOn : t.noticeBusyOff);
      return {
        ...prev,
        schedule: {
          ...prev.schedule,
          busyMode: nextBusy,
        },
      };
    });
  };

  const handleToggleTask = (taskId) => {
    setAppData((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    }));
  };

  const handleResetRoutine = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAppData(initialRoutineData);
    showNotice(translations.en.noticeReset);
  };

  const completedCount = appData.tasks.filter((task) => task.completed).length;
  const totalCount = appData.tasks.length;
  const totalMinutes = appData.tasks.reduce(
    (sum, task) =>
      sum + (appData.schedule.busyMode ? task.busyDurationMins : task.durationMins),
    0
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#eef2ff",
        color: "#0f172a",
        fontFamily:
          "'Segoe UI', 'Noto Sans Gujarati', 'Noto Sans Devanagari', system-ui, sans-serif",
        boxSizing: "border-box",
      }}
    >
      {/* Vibrant Colorful Top Header */}
      <header
        style={{
          background: "linear-gradient(120deg, #1d4ed8 0%, #4338ca 55%, #0f766e 100%)",
          color: "#ffffff",
          borderBottom: "3px solid #0f172a",
        }}
      >
        <div
          style={{
            maxWidth: "1140px",
            margin: "0 auto",
            padding: "clamp(16px, 2.5vw, 26px) clamp(14px, 3vw, 28px)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "18px",
          }}
        >
          <div style={{ maxWidth: "680px" }}>
            <div
              style={{
                display: "inline-block",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "4px 10px",
                border: "1px solid rgba(255,255,255,0.45)",
                backgroundColor: "rgba(15, 23, 42, 0.35)",
                color: "#fef08a",
                borderRadius: "0",
                marginBottom: "10px",
              }}
            >
              {t.badge}
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: "clamp(22px, 3.2vw, 32px)",
                lineHeight: 1.2,
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              {t.heroTitle}
            </h1>

            <p
              style={{
                margin: "8px 0 0",
                fontSize: "clamp(13px, 1.6vw, 15px)",
                lineHeight: 1.55,
                color: "#e0e7ff",
              }}
            >
              {t.heroSubtitle}
            </p>
          </div>

          {/* Language Switcher + Time Stat + Reset */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ffffff",
                backgroundColor: "#0f172a",
                borderRadius: "0",
                padding: "4px",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#93c5fd",
                  padding: "0 8px",
                }}
              >
                {t.languageLabel}:
              </span>
              {[
                { code: "en", label: "English" },
                { code: "gu", label: "ગુજરાતી" },
                { code: "hi", label: "हिन्दी" },
              ].map((item) => {
                const active = lang === item.code;
                return (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => handleLanguageChange(item.code)}
                    style={{
                      padding: "6px 10px",
                      border: "none",
                      borderRadius: "0",
                      backgroundColor: active ? "#f59e0b" : "transparent",
                      color: active ? "#0f172a" : "#ffffff",
                      fontWeight: 700,
                      fontSize: "12px",
                      cursor: "pointer",
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div
              style={{
                padding: "9px 14px",
                border: "1px solid #99f6e4",
                backgroundColor: "#115e59",
                borderRadius: "0",
                minWidth: "125px",
              }}
            >
              <div style={{ fontSize: "11px", color: "#ccfbf1" }}>
                {t.totalRoutineTime}
              </div>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "#ffffff" }}>
                {totalMinutes} {t.mins}
              </div>
            </div>

            <button
              type="button"
              onClick={handleResetRoutine}
              style={{
                padding: "11px 14px",
                border: "1px solid #ffffff",
                backgroundColor: "#be123c",
                color: "#ffffff",
                borderRadius: "0",
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {t.resetDefault}
            </button>
          </div>
        </div>
      </header>

      {/* Status Toast */}
      {statusMessage && (
        <div
          style={{
            maxWidth: "1140px",
            margin: "14px auto 0",
            padding: "0 clamp(14px, 3vw, 28px)",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              padding: "10px 14px",
              border: "1px solid #047857",
              borderLeft: "5px solid #10b981",
              backgroundColor: "#ecfdf5",
              color: "#064e3b",
              fontSize: "13px",
              fontWeight: 700,
              borderRadius: "0",
            }}
          >
            {statusMessage}
          </div>
        </div>
      )}

      {/* Responsive Main Grid */}
      <main
        style={{
          maxWidth: "1140px",
          margin: "0 auto",
          padding: "clamp(16px, 2.5vw, 28px) clamp(14px, 3vw, 28px) 36px",
          boxSizing: "border-box",
        }}
      >
        <BusyModeBar
          busyMode={appData.schedule.busyMode}
          onToggleBusyMode={handleToggleBusyMode}
          completedCount={completedCount}
          totalCount={totalCount}
          t={t}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px",
            alignItems: "start",
          }}
        >
          <div>
            <ScheduleSetupForm
              workStart={appData.schedule.workStart}
              workEnd={appData.schedule.workEnd}
              morningMeal={appData.schedule.morningMeal}
              afternoonSnack={appData.schedule.afternoonSnack}
              dinner={appData.schedule.dinner}
              goal={appData.schedule.goal}
              onSaveSchedule={handleSaveSchedule}
              t={t}
            />
            <MealGuideCard schedule={appData.schedule} t={t} />
          </div>

          <div>
            <RoutineSlotList
              slots={appData.tasks}
              busyMode={appData.schedule.busyMode}
              onToggleTask={handleToggleTask}
              t={t}
            />
            <WeeklySummaryView weeklyHistory={appData.weeklyHistory} t={t} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: "2px solid #c7d2fe",
          backgroundColor: "#ffffff",
          padding: "16px clamp(14px, 3vw, 28px)",
        }}
      >
        <div
          style={{
            maxWidth: "1140px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
            fontSize: "12px",
            color: "#334155",
          }}
        >
          <span>
            <strong>{t.footerLeft}</strong>
          </span>
          <span>
            {t.footerRightPrefix} <code>{STORAGE_KEY}</code>
          </span>
        </div>
      </footer>
    </div>
  );
}
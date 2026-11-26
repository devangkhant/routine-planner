import React, { useState, useEffect } from "react";
import {
  initialRoutineData,
  mealRulesData,
  generateTasksFromSchedule,
} from "./data/defaultRoutineData";
import ScheduleSetupForm from "./components/ScheduleSetupForm";
import BusyModeBar from "./components/BusyModeBar";
import RoutineSlotList from "./components/RoutineSlotList";
import MealGuideCard from "./components/MealGuideCard";
import WeeklySummaryView from "./components/WeeklySummaryView";

const STORAGE_KEY = "health_routine_planner_v1";
const SLOT_ORDER = ["Morning", "Work Break", "Evening / Night"];

function getTodayDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function buildTodaySummary(tasks, dateStr) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.reduce(
    (sum, task) => sum + (task.completed ? 1 : 0),
    0
  );
  const completionPercent =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  let missedSlot = "None";
  let lowestRatio = 1;

  SLOT_ORDER.forEach((slotName) => {
    const slotTasks = tasks.filter((task) => task.slot === slotName);
    if (slotTasks.length > 0) {
      const slotCompleted = slotTasks.filter((task) => task.completed).length;
      const ratio = slotCompleted / slotTasks.length;
      if (ratio < 1 && ratio < lowestRatio) {
        lowestRatio = ratio;
        missedSlot = slotName;
      }
    }
  });

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const parsedDate = new Date(`${dateStr}T00:00:00`);
  const dayLabel = Number.isNaN(parsedDate.getTime())
    ? "Today"
    : dayNames[parsedDate.getDay()];

  return {
    day: dayLabel,
    date: dateStr,
    completionPercent,
    missedSlot,
  };
}

function upsertWeeklyHistory(history, todaySummary) {
  const safeHistory = Array.isArray(history) ? history : [];
  const exists = safeHistory.some((entry) => entry.date === todaySummary.date);
  const updated = exists
    ? safeHistory.map((entry) =>
        entry.date === todaySummary.date ? { ...entry, ...todaySummary } : entry
      )
    : [...safeHistory, todaySummary];

  return updated.slice(-7);
}

export default function App() {
  const [routineData, setRoutineData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return initialRoutineData;
      const parsed = JSON.parse(saved);
      return {
        ...initialRoutineData,
        ...parsed,
        schedule: {
          ...initialRoutineData.schedule,
          ...(parsed.schedule || {}),
        },
        tasks:
          Array.isArray(parsed.tasks) && parsed.tasks.length > 0
            ? parsed.tasks
            : initialRoutineData.tasks,
        weeklyHistory:
          Array.isArray(parsed.weeklyHistory) && parsed.weeklyHistory.length > 0
            ? parsed.weeklyHistory
            : initialRoutineData.weeklyHistory,
      };
    } catch {
      return initialRoutineData;
    }
  });

  const [activeTab, setActiveTab] = useState("today"); // "today" | "setup" | "weekly"
  const todayStr = getTodayDateString();

  // Save full routine state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(routineData));
    } catch {
      // Ignore storage quota or private mode errors
    }
  }, [routineData]);

  // Automatically sync today's task completion into weeklyHistory whenever tasks change
  useEffect(() => {
    const todaySummary = buildTodaySummary(routineData.tasks, todayStr);
    setRoutineData((prev) => {
      const nextHistory = upsertWeeklyHistory(prev.weeklyHistory, todaySummary);
      const isUnchanged =
        JSON.stringify(prev.weeklyHistory) === JSON.stringify(nextHistory);
      return isUnchanged ? prev : { ...prev, weeklyHistory: nextHistory };
    });
  }, [routineData.tasks, todayStr]);

  const updateTask = (taskId) => {
    setRoutineData((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    }));
  };

  const toggleBusyMode = () => {
    setRoutineData((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        busyMode: !prev.schedule.busyMode,
      },
    }));
  };

  const handleSaveSchedule = (newScheduleValues) => {
    setRoutineData((prev) => {
      const updatedSchedule = {
        ...prev.schedule,
        ...newScheduleValues,
      };
      return {
        ...prev,
        schedule: updatedSchedule,
        tasks: generateTasksFromSchedule(prev.tasks, updatedSchedule),
      };
    });
    setActiveTab("today");
  };

  const syncTodayToWeeklyHistory = () => {
    const todaySummary = buildTodaySummary(routineData.tasks, todayStr);
    setRoutineData((prev) => ({
      ...prev,
      weeklyHistory: upsertWeeklyHistory(prev.weeklyHistory, todaySummary),
    }));
    setActiveTab("weekly");
  };

  const resetDay = () => {
    setRoutineData((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task) => ({ ...task, completed: false })),
    }));
  };

  const completedCount = routineData.tasks.reduce(
    (acc, item) => acc + (item.completed ? 1 : 0),
    0
  );
  const totalCount = routineData.tasks.length;

  const tabBtnStyle = (isActive) => ({
    padding: "10px 16px",
    border: "1px solid #0f172a",
    borderRadius: "0",
    backgroundColor: isActive ? "#0f172a" : "#ffffff",
    color: isActive ? "#ffffff" : "#0f172a",
    fontWeight: 700,
    fontSize: "14px",
    cursor: "pointer",
  });

  const actionBtnStyle = {
    padding: "10px 14px",
    border: "1px solid #0f172a",
    borderRadius: "0",
    backgroundColor: "#ffffff",
    color: "#0f172a",
    fontWeight: 600,
    fontSize: "13px",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f1f5f9",
        padding: "24px 16px",
        boxSizing: "border-box",
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
      }}
    >
      <div
        style={{
          width: "min(92%, 960px)",
          margin: "0 auto",
        }}
      >
        <header
          style={{
            border: "1px solid #0f172a",
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "0",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: "8px",
            }}
          >
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(22px, 3vw, 30px)",
                color: "#0f172a",
              }}
            >
              RoutineFlow
            </h1>
            <span style={{ fontSize: "13px", color: "#475569", fontWeight: 600 }}>
              તારીખ: {todayStr}
            </span>
          </div>

          <p
            style={{
              margin: "6px 0 16px",
              fontSize: "14px",
              color: "#334155",
            }}
          >
            વ્યસ્ત સમયપત્રક માટે સ્માર્ટ હેલ્થ અને રૂટિન પ્લાનર — ૧૫-મિનિટ રૂટિન, બિઝી ડે મોડ, મીલ ગાઈડ અને સાપ્તાહિક ટ્રેકર.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              <button
                type="button"
                style={tabBtnStyle(activeTab === "today")}
                onClick={() => setActiveTab("today")}
              >
                આજનું રૂટિન (Today)
              </button>
              <button
                type="button"
                style={tabBtnStyle(activeTab === "setup")}
                onClick={() => setActiveTab("setup")}
              >
                શેડ્યૂલ સેટઅપ
              </button>
              <button
                type="button"
                style={tabBtnStyle(activeTab === "weekly")}
                onClick={() => setActiveTab("weekly")}
              >
                સાપ્તાહિક સારાંશ
              </button>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              <button
                type="button"
                style={actionBtnStyle}
                onClick={syncTodayToWeeklyHistory}
              >
                Weekly લોગ સેવ કરો
              </button>
              <button
                type="button"
                style={actionBtnStyle}
                onClick={resetDay}
              >
                આજનો દિવસ રીસેટ કરો
              </button>
            </div>
          </div>
        </header>

        <BusyModeBar
          busyMode={routineData.schedule.busyMode}
          onToggleBusyMode={toggleBusyMode}
          completedCount={completedCount}
          totalCount={totalCount}
        />

        {activeTab === "setup" && (
          <ScheduleSetupForm
            workStart={routineData.schedule.workStart}
            workEnd={routineData.schedule.workEnd}
            goal={routineData.schedule.goal}
            onSaveSchedule={handleSaveSchedule}
          />
        )}

        {activeTab === "today" && (
          <>
            <RoutineSlotList
              slots={routineData.tasks}
              busyMode={routineData.schedule.busyMode}
              onToggleTask={updateTask}
            />
            <MealGuideCard
              mealRules={mealRulesData}
              schedule={routineData.schedule}
            />cd C:\Users\Jaypal\Desktop\RoutineFlow\routine-planner
          </>
        )}

        {activeTab === "weekly" && (
          <WeeklySummaryView weeklyHistory={routineData.weeklyHistory} />
        )}
      </div>
    </div>
  );
}
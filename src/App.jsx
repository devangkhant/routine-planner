const handleLogTodayToHistory = () => {
    const total = appData.tasks.length;
    const done = appData.tasks.filter((task) => task.completed).length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;

    const slotOrder = ["Morning", "Work Break", "Evening / Night"];
    const slotStats = slotOrder.map((slotName) => {
      const items = appData.tasks.filter((item) => item.slot === slotName);
      const incomplete = items.filter((item) => !item.completed).length;
      return { slotName, incomplete };
    });

    const worstSlot = [...slotStats].sort((a, b) => b.incomplete - a.incomplete)[0];
    const missedSlot = worstSlot && worstSlot.incomplete > 0 ? worstSlot.slotName : "None";

    const todayDate = new Date().toISOString().slice(0, 10);
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayLabel = dayNames[new Date().getDay()];

    const newEntry = {
      day: dayLabel,
      date: todayDate,
      completionPercent: pct,
      missedSlot,
    };

    setAppData((prev) => {
      const withoutToday = prev.weeklyHistory.filter((entry) => entry.date !== todayDate);
      const updatedHistory = [...withoutToday, newEntry].slice(-7);
      return {
        ...prev,
        weeklyHistory: updatedHistory,
      };
    });

    showNotice(t.noticeLoggedToday);
  };
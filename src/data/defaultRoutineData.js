export const initialRoutineData = {
  version: "1.0",
  schedule: {
    goal: "bellyFat",
    workStart: "10:00",
    workEnd: "20:30",
    morningMeal: "08:45",
    afternoonSnack: "15:00",
    dinner: "21:00",
    busyMode: false,
  },
  tasks: [
    {
      id: "t1",
      slot: "Morning",
      title: "૧૫ મિનિટ મોબિલિટી, સ્ટ્રેચિંગ અને કોર એક્ટિવેશન",
      busyTitle: "૮ મિનિટ ક્વિક વોર્મ-અપ અને સ્ટ્રેચિંગ",
      durationMins: 15,
      busyDurationMins: 8,
      completed: false,
    },
    {
      id: "t2",
      slot: "Morning",
      title: "નક્કી સમયે સવારનો નાસ્તો / ફળ અને પૂરતું પાણી",
      busyTitle: "૫ મિનિટમાં ફળ + પાણીનો નિયમ",
      durationMins: 10,
      busyDurationMins: 5,
      completed: false,
    },
    {
      id: "t3",
      slot: "Work Break",
      title: "કામના બ્રેકમાં ૧૦ મિનિટ વોકિંગ અને પોશ્ચર ચેક",
      busyTitle: "૫ મિનિટ ડેસ્ક સ્ટ્રેચ અને આંખોને આરામ",
      durationMins: 10,
      busyDurationMins: 5,
      completed: false,
    },
    {
      id: "t4",
      slot: "Work Break",
      title: "બપોરના સમયે હળવો નાસ્તો / હાઇડ્રેશન ચેક",
      busyTitle: "૫ મિનિટમાં હાથવગો નાસ્તો અને પાણી",
      durationMins: 10,
      busyDurationMins: 5,
      completed: false,
    },
    {
      id: "t5",
      slot: "Evening / Night",
      title: "સમયસર હળવું ડિનર અને પોર્શન કંટ્રોલ",
      busyTitle: "૧૦ મિનિટમાં સરળ પોર્શન ડિનર",
      durationMins: 15,
      busyDurationMins: 10,
      completed: false,
    },
    {
      id: "t6",
      slot: "Evening / Night",
      title: "સૂતા પહેલા ૧૦ મિનિટ રિલેક્સેશન અને સ્ક્રીન ઓફ",
      busyTitle: "૭ મિનિટ ડીપ બ્રીથિંગ અને રૂટિન લોગ",
      durationMins: 10,
      busyDurationMins: 7,
      completed: false,
    },
  ],
  weeklyHistory: [
    { day: "Mon", date: "2026-11-19", completionPercent: 83, missedSlot: "Evening / Night" },
    { day: "Tue", date: "2026-11-20", completionPercent: 67, missedSlot: "Work Break" },
    { day: "Wed", date: "2026-11-21", completionPercent: 100, missedSlot: "None" },
    { day: "Thu", date: "2026-11-22", completionPercent: 50, missedSlot: "Evening / Night" },
    { day: "Fri", date: "2026-11-23", completionPercent: 83, missedSlot: "Work Break" },
    { day: "Sat", date: "2026-11-24", completionPercent: 100, missedSlot: "None" },
    { day: "Sun", date: "2026-11-25", completionPercent: 67, missedSlot: "Morning" },
  ],
};

export const mealRulesData = [
  {
    id: "m1",
    situation: "બપોરે લંચ સ્કિપ થાય ત્યારે",
    portion: "૧ મુઠ્ઠી રોસ્ટેડ ચણા/મમરા અથવા ૧ ફળ + ૫–૬ બદામ/અખરોટ",
    timing: "કામના બ્રેકમાં (14:30 – 16:00 વચ્ચે)",
    alternative: "ઓફિસ/બહાર હોવ તો છાશ અથવા દહીં + સાદો નાસ્તો; એકસાથે વધુ પડતું ખાવાનું ટાળો.",
  },
  {
    id: "m2",
    situation: "રાત્રે ડિનર મોડું થાય ત્યારે",
    portion: "અડધો પોર્શન (૧–૨ રોટલી/ભાખરી + શાક/દાળ અથવા સૂપ/સલાડ)",
    timing: "સૂવાના ઓછામાં ઓછા ૬૦–૯૦ મિનિટ પહેલા",
    alternative: "મોડા સમયે ભારે કે તળેલું ખોરાક ટાળી હળવું અને સુપાચ્ય ભોજન લો.",
  },
  {
    id: "m3",
    situation: "સવારનો નાસ્તો/ભોજન ઉતાવળમાં હોય ત્યારે",
    portion: "તૈયાર ફળ (સફરજન/પપૈયું) + ઘરનો સાદો નાસ્તો",
    timing: "કામ શરૂ કરતા પહેલા (08:00 – 09:30 વચ્ચે)",
    alternative: "ચા-કોફી પહેલા થોડું પાણી પીવો અને નાસ્તાને સંપૂર્ણપણે સ્કિપ ન કરો.",
  },
];

export function generateTasksFromSchedule(prevTasks, newSchedule) {
  const goalLabelMap = {
    bellyFat: "કમર/પેટની ચરબી અને એનર્જી માટે",
    energy: "દિવસભર એનર્જી જાળવવા માટે",
    deskFatigue: "બેઠાડુ કામનો થાક ઘટાડવા માટે",
  };
  const focusText = goalLabelMap[newSchedule.goal] || "દૈનિક ફિટનેસ માટે";

  return prevTasks.map((task, idx) => {
    if (idx === 0) {
      return {
        ...task,
        title: `૧૫ મિનિટ રૂટિન (${focusText}) - શરૂઆત ${newSchedule.morningMeal} આસપાસ`,
        busyTitle: `૮ મિનિટ ક્વિક રૂટિન (${focusText})`,
        completed: false,
      };
    }
    if (idx === 2) {
      return {
        ...task,
        title: `કામ (${newSchedule.workStart}–${newSchedule.workEnd}) વચ્ચે ૧૦ મિનિટ વોક/સ્ટ્રેચ`,
        busyTitle: `૫ મિનિટ બિઝી બ્રેક સ્ટ્રેચ (${newSchedule.workStart}–${newSchedule.workEnd})`,
        completed: false,
      };
    }
    if (idx === 4) {
      return {
        ...task,
        title: `ડિનર (${newSchedule.dinner} આસપાસ) અને હળવું પોર્શન કંટ્રોલ`,
        busyTitle: `૧૦ મિનિટ ક્વિક ડિનર રૂટિન (${newSchedule.dinner})`,
        completed: false,
      };
    }
    return { ...task, completed: false };
  });
}
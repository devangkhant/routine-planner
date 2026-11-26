import React from "react";

export default function BusyModeBar({
  busyMode,
  onToggleBusyMode,
  completedCount,
  totalCount,
}) {
  const percent =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        padding: "14px 18px",
        border: "1px solid #0f172a",
        backgroundColor: busyMode ? "#fef3c7" : "#ffffff",
        borderRadius: "0",
        marginBottom: "18px",
      }}
    >
      <div>
        <div style={{ fontWeight: 700, fontSize: "15px", color: "#0f172a" }}>
          {busyMode
            ? "બિઝી ડે મોડ ચાલુ છે (૧૦-મિનિટના ટૂંકા વિકલ્પો સક્રિય)"
            : "સ્ટાન્ડર્ડ રૂટિન મોડ ચાલુ છે"}
        </div>
        <div style={{ fontSize: "13px", color: "#334155", marginTop: "4px" }}>
          આજની પ્રગતિ:{" "}
          <strong>
            {completedCount} / {totalCount}
          </strong>{" "}
          ટાસ્ક પૂર્ણ ({percent}%)
        </div>
      </div>

      <button
        type="button"
        onClick={onToggleBusyMode}
        style={{
          padding: "10px 16px",
          border: "1px solid #0f172a",
          borderRadius: "0",
          backgroundColor: busyMode ? "#0f172a" : "#ffffff",
          color: busyMode ? "#ffffff" : "#0f172a",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        {busyMode ? "સ્ટાન્ડર્ડ મોડ પર જાઓ" : "બિઝી ડે મોડ ચાલુ કરો"}
      </button>
    </div>
  );
}
<div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
          marginBottom: "6px",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "clamp(17px, 2vw, 20px)",
            color: "#4c1d95",
          }}
        >
          {t.weeklyTitle}
        </h2>

        {typeof onLogToday === "function" && (
          <button
            type="button"
            onClick={onLogToday}
            style={{
              padding: "7px 12px",
              backgroundColor: "#4c1d95",
              color: "#ffffff",
              border: "1px solid #0f172a",
              borderRadius: "0",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {t.logTodayBtn}
          </button>
        )}
      </div>
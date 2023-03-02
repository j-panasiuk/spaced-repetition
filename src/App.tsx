import { type CSSProperties } from "react";
import { type Day, days } from "./days";
import { type Level, levels } from "./levels";
import { progression } from "./progression";
import "./App.css";

function App() {
  return (
    <main>
      <Grid />
    </main>
  );
}

function Grid() {
  return (
    <div className="Grid" style={gridStyle}>
      {levels.map((level) => (
        <div key={level} className="GridRow">
          {days.map((day) => (
            <div
              key={`${level}/${day}`}
              className="GridCell"
              style={getCellStyle(level, day)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

const gridStyle = {
  "--grid-rows": levels.length,
  "--grid-cols": days.length,
} as CSSProperties;

function getCellStyle(level: Level, day: Day): CSSProperties {
  return progression[level].includes(day)
    ? ({ "--cell-color": `var(--cell-color-${level})` } as CSSProperties)
    : {};
}

export default App;

import { type CSSProperties } from "react";
import { days } from "./days";
import { levels } from "./levels";
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
            <div key={`${level}/${day}`} className="GridCell">
              {progression[level].includes(day) ? level : null}
            </div>
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

export default App;

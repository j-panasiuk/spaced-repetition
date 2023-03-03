import { useState, type CSSProperties } from "react";
import { type Day, days } from "./days";
import { type Level, levels } from "./levels";
import { progression } from "./progression";
import "./App.css";

function App() {
  const [currentDay, setCurrentDay] = useState<Day>(days[0]);

  return (
    <main>
      <div className="Grid" style={gridStyle}>
        {levelsReversed.map((level) => (
          <div key={level} className="GridRow">
            {days.map((day) => (
              <div
                key={`${level}/${day}`}
                className="GridCell"
                style={{
                  ...getCellColors(level, day),
                  ...getGridCellVariant(day === currentDay),
                }}
              />
            ))}
          </div>
        ))}
      </div>

      <div>
        <input
          type="range"
          min={days.at(0)}
          max={days.at(-1)}
          value={currentDay}
          onChange={(ev) => {
            setCurrentDay(Number(ev.target.value));
          }}
          autoFocus
        />
      </div>

      <div>
        <h3>Repetitions - Day {currentDay}</h3>
        <div className="Reps">
          {levels.map((level) => (
            <div
              key={level}
              className="Rep"
              style={{
                ...getCellColors(level, currentDay),
                ...getDayRepsCellVariant(level, currentDay),
              }}
            >
              {level}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

const levelsReversed = [...levels].reverse();

// --- GRID STYLES ---

interface CustomCSSGridProperties
  extends CSSProperties,
    Partial<Record<CustomCSSGridProperty, number>> {}
type CustomCSSGridProperty = typeof customCSSGridProperties[number];
const customCSSGridProperties = [
  "--grid-rows",
  "--grid-cols",
] as const satisfies readonly `--grid-${string}`[];

const gridStyle: CustomCSSGridProperties = {
  "--grid-rows": levels.length,
  "--grid-cols": days.length,
};

// --- CELL STYLES ---

interface CustomCSSCellProperties
  extends CSSProperties,
    Partial<Record<CustomCSSCellProperty, CustomCSSCellVar>> {}
type CustomCSSCellProperty = typeof customCSSCellProperties[number];
const customCSSCellProperties = [
  "--cell-color",
  "--cell-outline",
  "--cell-text",
  "--cell-transform",
] as const satisfies readonly `--cell-${string}`[];
type CustomCSSCellVar =
  | `var(--cell-color-${Level})`
  | `var(${Exclude<CustomCSSCellProperty, "--cell-color">}-${
      | "default"
      | "selected"})`;

function getCellColors(level: Level, day: Day): CustomCSSCellProperties {
  return progression[level].includes(day)
    ? {
        "--cell-color": `var(--cell-color-${level})`,
        "--cell-text": `var(--cell-text-selected)`,
      }
    : {};
}

function getGridCellVariant(isCurrent: boolean): CustomCSSCellProperties {
  return isCurrent
    ? {
        "--cell-outline": "var(--cell-outline-selected)",
      }
    : {};
}

function getDayRepsCellVariant(
  level: Level,
  day: Day
): CustomCSSCellProperties {
  return progression[level].includes(day)
    ? {
        "--cell-transform": `var(--cell-transform-selected)`,
      }
    : {};
}

export default App;

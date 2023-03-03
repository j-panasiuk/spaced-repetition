import { type Day, days } from "./days";
import { type Level, levels, nextLevel } from "./levels";

export const progression: Record<Level, Day[]> = {
  1: days,
  2: days.filter((n) => n % 2 === 0),
  3: days.filter((n) => n % 4 === 3),
  4: days.filter((n) => n % 16 === 5 || n % 16 === 14),
  5: [13, 29, 45, 61],
  6: [25, 60],
  7: [57],
};

function getLevelsOnDay(day: Day): Level[] {
  let levelsOnDay: Level[] = [];
  for (const level of levels) {
    if (progression[level].includes(day)) {
      levelsOnDay.push(level);
    }
  }
  return levelsOnDay;
}

if (import.meta.vitest) {
  const { expect, it } = import.meta.vitest;

  it("has some repetitions every day", () => {
    const progressionDays = new Set<Day>();
    Object.values(progression).forEach((ds) => {
      ds.forEach((d) => progressionDays.add(d));
    });
    for (const day of days) {
      expect(progressionDays.has(day)).toBe(true);
    }
  });

  it("has some repetitions for every level", () => {
    for (const level of levels) {
      expect(progression[level].length).toBeGreaterThanOrEqual(1);
    }
  });

  it("has fewer repetitions on each consecutive level", () => {
    for (const current of levels) {
      const next = nextLevel(current);
      if (next) {
        const currentLevelReps = progression[current].length;
        const nextLevelReps = progression[next].length;
        expect(nextLevelReps).toBeLessThan(currentLevelReps);
      }
    }
  });

  it("has at most three repetitions on any single day", () => {
    for (const day of days) {
      expect(getLevelsOnDay(day).length).toBeLessThanOrEqual(3);
    }
  });

  it("has level 1 repetitions every day", () => {
    expect(progression[1]).toEqual(days);
  });

  it("has level 2 repetitions every other day", () => {
    expect(
      progression[2].every((dayAtLevel, i, daysAtLevel) => {
        let nextDayAtLevel = daysAtLevel.at(i + 1);
        return nextDayAtLevel ? nextDayAtLevel - dayAtLevel === 2 : true;
      })
    ).toBe(true);
  });
}

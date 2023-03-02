export type Level = typeof levels[number];
export const levels = [1, 2, 3, 4, 5, 6, 7] as const;

function toLevel(n: number | undefined): Level | undefined {
  return levels.includes(n as any) ? (n as Level) : undefined;
}

export function nextLevel(level: Level): Level | undefined {
  return toLevel(level + 1);
}

if (import.meta.vitest) {
  const { expect, it } = import.meta.vitest;

  it("has consecutive levels, starting from 1", () => {
    expect(levels[0]).toBe(1);

    for (const current of levels) {
      const next = nextLevel(current);
      if (next) {
        expect(next - current).toBe(1);
      }
    }
  });
}

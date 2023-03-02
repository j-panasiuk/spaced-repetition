export type Day = typeof days[number];
export const days = Array.from({ length: 64 }).map((_, i) => i + 1);

if (import.meta.vitest) {
  const { expect, it } = import.meta.vitest;

  it("has consecutive days, starting from 1", () => {
    expect(days[0]).toBe(1);

    for (let i = 0; i < days.length; i += 1) {
      if (days[i + 1]) {
        expect(days[i + 1] - days[i]).toBe(1);
      }
    }
  });
}

export type Day = typeof days[number];
export const days = Array.from({ length: 64 }).map((_, i) => i + 1);

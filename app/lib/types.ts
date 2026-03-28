export const categoryTypes = ["Feature", "UI", "UX", "Enhancement", "Bug"] as const;
export type CategoryTypes = typeof categoryTypes[number];
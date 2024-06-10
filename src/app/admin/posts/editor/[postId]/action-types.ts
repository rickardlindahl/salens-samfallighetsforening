export const actions = ["save", "publish", "unpublish"] as const;

export type Action = (typeof actions)[number];

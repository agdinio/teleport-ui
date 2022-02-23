export type AppState = {
  background: string;
};

export const defaultState: AppState = {
  background: "",
};
export const state: AppState = {
  ...defaultState,
};

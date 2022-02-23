import { Context } from "..";

export const setBackground = async ({ state }: Context, bg: string) => {
  state.app.background = bg;
};

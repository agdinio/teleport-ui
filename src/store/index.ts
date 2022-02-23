import { IContext } from "overmind";
import {
  createActionsHook,
  createStateHook,
  createEffectsHook,
} from "overmind-react";
import { namespaced } from "overmind/config";

import * as app from "./app";
import * as game from "./game";
import * as teleport from "./teleport";

export const config = namespaced({
  game: game.config,
  app: app.config,
  teleport: teleport.config,
});

export type Context = IContext<{
  state: typeof config.state;
  actions: typeof config.actions;
  effects: typeof config.effects;
}>;

export const useAppState = createStateHook<Context>();
export const useActions = createActionsHook<Context>();
export const useEffects = createEffectsHook<Context>();

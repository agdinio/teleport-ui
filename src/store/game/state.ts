import { WaxJS } from "@waxio/waxjs/dist";
import { ApiAsset } from "atomicassets/build/API/Explorer/Types";
import { derived } from "overmind";

import {
  getBagMiningParams,
  getLandMiningParams,
} from "../../util/game-mechanics";

const wax = new WaxJS("https://wax.greymass.com", null, null, false);

export enum Direction {
  NORTH = "NORTH",
  SOUTH = "SOUTH",
  WEST = "WEST",
  EAST = "EAST",
}

export enum AssetType {
  CREW = "crew.worlds",
  TOOL = "tool.worlds",
  FACES = "faces.worlds",
  LAND = "land.worlds",
  ARMS = "arms.worlds",
}

export type GameState = {
  wax: () => WaxJS;
  wallet: string | null;

  loading: {
    player: boolean;
    terms: boolean;
    tag: boolean;
    avatar: boolean;
    miner: boolean;
    bag: boolean;
    land: boolean;
    currency: boolean;
    waxCurrency: boolean;
    isMining: boolean;
    agreeTerms: boolean;
    staked: boolean;
    unstaked: boolean;
    miningDelay: boolean;
    claimingNFTs: boolean;

    assets: boolean;
    planets: boolean;
  };
  account: string | null;
  currency: number;
  waxCurrency: number;
  termsAccepted: boolean;
  tag: string | null;
  avatar: any | null;
  avatarId: string | null;
  planet: any | null;
  land: any | null;
  adjacentLands: {
    NORTH: any | null;
    WEST: any | null;
    SOUTH: any | null;
    EAST: any | null;
  };
  miner: any | null;
  bag: Array<any>;
  mineDelay: number | null;
  miningRandomString: string | null;
  staked: { staked: Array<any>; total: number };
  unstaked: Array<any>;

  assets: Array<any>;
  planets: Array<any>;

  isNewAccount: boolean;
  getAssetsByType: (type?: AssetType) => Array<any>;
  getAssetsById: (assetid: string) => any;
  getAssetsForBag: Array<any>;
  chargeTime: number | null;

  assetCache: Array<ApiAsset>;
  landsCache: any[];
};

export const defaultState: GameState = {
  wax: () => wax,
  wallet: null,

  loading: {
    player: false,
    terms: false,
    tag: false,
    avatar: false,
    miner: false,
    bag: false,
    land: false,
    currency: false,
    waxCurrency: false,
    isMining: false,
    agreeTerms: false,
    staked: false,
    unstaked: false,
    miningDelay: true,
    claimingNFTs: false,

    assets: false,
    planets: false,
  },
  account: null,
  currency: 0,
  waxCurrency: 0,
  termsAccepted: false,
  tag: null,
  avatar: null,
  avatarId: null,
  planet: derived((state: GameState) => {
    if (state.land) {
      return state.planets.find(
        (p) => p.planet_name === state.land.data.planet
      );
    }
    return state.planets[0];
  }),
  land: null,
  adjacentLands: {
    NORTH: null,
    WEST: null,
    SOUTH: null,
    EAST: null,
  },
  miner: null,
  bag: [],
  mineDelay: null,
  miningRandomString: null,
  staked: { staked: [], total: 0 },
  unstaked: [],

  assets: [],
  planets: [],

  isNewAccount: derived(
    (state: GameState) => state.account != null && state.miner != null
  ),
  getAssetsByType: derived(
    (state: GameState) => (type?: AssetType) =>
      type
        ? state.assets.filter((asset) => asset.schema_name === type)
        : state.assets
  ),
  getAssetsById: derived(
    (state: GameState) => (id: string) =>
      state.assets.find((item) => item.asset_id === id)
  ),
  getAssetsForBag: derived((state: GameState) => {
    const bagToolIds = state.bag.map((item) => item?.asset_id);

    return state.assets
      .filter((asset) => asset.schema_name === AssetType.TOOL)
      .filter((asset) => !bagToolIds.includes(asset.asset_id));
  }),
  chargeTime: derived((state: GameState) => {
    if (!state.bag || !state.land) return 0;
    const bagParams = getBagMiningParams(state.bag);
    const landParams = getLandMiningParams(state.land);

    return bagParams.delay * (landParams.delay / 10);
  }),

  assetCache: [],
  landsCache: [],
};
export const state: GameState = {
  ...defaultState,
};

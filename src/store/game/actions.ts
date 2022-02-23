import { ApiAsset } from "atomicassets/build/API/Explorer/Types";
import * as H from "history";
import { catchError, pipe } from "overmind";
import { toast } from "react-hot-toast";

import { Context } from "..";
import { fromHexString, nameToArray } from "../../util/api-util";
import {
  doProofOfWork,
  getBagMiningParams,
  getLandMiningParams,
} from "../../util/game-mechanics";
import { sleep } from "../../util/helpers";
import { Direction } from "./state";

export const loadTerms = async ({ effects, state }: Context) => {
  state.game.loading.terms = true;
  const terms = await effects.game.loadTerms(state.game.wax());
  state.game.termsAccepted = terms?.terms_id !== null;
  state.game.loading.terms = false;
};

export const loadPlayer = async ({ effects, state, actions }: Context) => {
  state.game.loading.player = true;
  state.game.loading.tag = true;
  const player = await effects.game.loadPlayer(state.game.wax());

  if (player?.account) {
    state.game.account = player.account;
  }
  if (player?.avatar) {
    state.game.avatarId = player.avatar;
    await actions.game.loadAvatar();
  }
  if (player?.tag) {
    state.game.tag = player.tag;
  }
  state.game.loading.player = false;
  state.game.loading.tag = false;
};

export const loadAvatar = async ({ effects, state }: Context) => {
  state.game.loading.avatar = true;
  if (state.game.avatarId) {
    state.game.avatar = await effects.game.loadAsset(state.game.avatarId);
  }
  state.game.loading.avatar = false;
};

export const loadMiner = async ({ effects, state }: Context) => {
  state.game.loading.miner = true;
  state.game.miner = await effects.game.loadMiner(state.game.wax());
  state.game.loading.miner = false;
};

export const loadBag = async ({ effects, state }: Context) => {
  state.game.loading.bag = true;
  state.game.bag = await effects.game.getBag(state.game.wax());
  state.game.loading.bag = false;
};

export const loadLand = async ({ effects, state }: Context) => {
  state.game.loading.land = true;
  state.game.land = await effects.game.getLand(state.game.wax());
  state.game.loading.land = false;
};

export const loadAssets = async ({ effects, state }: Context) => {
  state.game.loading.assets = true;
  state.game.assets = await effects.game.getAssets(
    // @ts-ignore
    state.game.wax().userAccount
  );
  state.game.loading.assets = false;
};

export const agreeTerms = async ({ effects, state }: Context) => {
  state.game.loading.agreeTerms = true;
  await effects.game.agreeTerms(state.game.wax());
  state.game.loading.agreeTerms = false;
};

export const loadPlayerData = async (
  { actions, state }: Context,
  { untilTagReady = false, untilMinerReady = false } = {}
) => {
  const dataActions = [
    actions.game.loadTerms(),
    actions.game.loadPlayer(),
    actions.game.loadAssets(),
    actions.game.loadMiner(),
    actions.game.loadCurrency(),
    actions.game.loadWaxCurrency(),
    actions.game.loadMineDelay(),
    actions.game.loadStaked(),
  ];
  await Promise.all(dataActions);

  console.log("untilTagReady", untilTagReady);
  console.log("untilMinerReady", untilMinerReady);
  if (untilTagReady) {
    while (state.game.tag === null) {
      await sleep(1000);
      await Promise.all(dataActions);
    }
  }
  if (untilMinerReady) {
    while (state.game.miner === null) {
      await sleep(1000);
      await Promise.all(dataActions);
    }
  }
};

export const loadUniverseData = async ({ actions }: Context) => {
  await actions.game.loadPlanets();
};

export const navigate = ({ state }: Context, history: H.History) => {
  // @ts-ignore
  if (!state.game.wax().userAccount) {
    history.push("/");
  } else if (state.game.tag && state.game.miner) {
    history.push("/inventory");
  } else if (state.game.tag && !state.game.miner) {
    history.push("/onboarding/planet");
  } else {
    history.push("/onboarding/terms");
  }
};

export const loadPlanets = async ({ effects, state }: Context) => {
  state.game.loading.planets = true;
  let planets = await effects.game.loadPlanets(state.game.wax());
  for (let i = 0; i < planets.length; i += 1) {
    const planet = await effects.game.loadPlanetDetails(
      state.game.wax(),
      planets[i].planet_name
    );
    const planetCurrency = await effects.game.loadPlanetCurrencyBalance(
      state.game.wax(),
      planets[i].planet_name
    );
    const planetMap = await effects.game.loadPlanetMap(
      state.game.wax(),
      planets[i].planet_name
    );
    let metadata = {};
    try {
      metadata = JSON.parse(planets[i].metadata);
    } catch (e) {
      console.log(e);
    }

    const [precision, symbol] = planets[i].dac_symbol.split(",");
    const totalStake = (
      planets[i].total_stake /
      10 ** parseInt(precision, 10)
    ).toFixed(precision);
    planets[i].total_stake = `${totalStake} ${symbol}`;

    planets[i].metadata = metadata;
    planets[i].details = planet;
    planets[i].planetCurrency = planetCurrency;
    planets[i].map = planetMap;
    planets[i].active = !!planets[i].active;
  }

  // filter new, still inactive planets, TODO check what the actual condition should be
  planets = planets.filter(
    (planet) => planet.map !== null && planet.map.length > 0
  );

  // if (planets && planets.length > 1) {
  //   [state.game.planet] = planets;
  // }

  console.log("loadPlanetsDetailed", planets);
  state.game.planets = planets;

  state.game.loading.planets = false;
};

export const selectPlanet = async (
  { state, actions }: Context,
  planetName: string
) => {
  console.log("Select planet", planetName);
  state.game.planet = {
    ...state.game.planets.find((p) => p.planet_name === planetName),
  };
  await actions.game.selectInitialLand();
};

export const selectLand = async (
  { effects, state, actions }: Context,
  landAssetId: string
) => {
  state.game.land = await effects.game.getLandbyId(
    state.game.wax(),
    landAssetId
  );
  state.game.adjacentLands = {
    EAST: actions.game.getLandIdInDirection(Direction.EAST),
    WEST: actions.game.getLandIdInDirection(Direction.WEST),
    NORTH: actions.game.getLandIdInDirection(Direction.NORTH),
    SOUTH: actions.game.getLandIdInDirection(Direction.SOUTH),
  };
};

export const setWallet = ({ state }: Context, wallet: string) => {
  state.game.wallet = wallet;
};

export const getLandIdInDirection = (
  { state }: Context,
  direction: Direction
) => {
  const { map } = state.game.planets.find(
    (p) => p.planet_name === state.game.land.data.planet
  );

  if (direction === "WEST") {
    return map.reduce((result, current) => {
      if (
        (result === null || current.x > result.x) &&
        current.x < state.game.land.data.x &&
        current.y === state.game.land.data.y
      ) {
        return current;
      }
      return result;
    }, null);
  }
  if (direction === "EAST") {
    return map.reduce((result, current) => {
      if (
        (result === null || current.x < result.x) &&
        current.x > state.game.land.data.x &&
        current.y === state.game.land.data.y
      ) {
        return current;
      }
      return result;
    }, null);
  }
  if (direction === "SOUTH") {
    return map.reduce((result, current) => {
      if (
        (result === null || current.y > result.y) &&
        current.y < state.game.land.data.y &&
        current.x === state.game.land.data.x
      ) {
        return current;
      }
      return result;
    }, null);
  }
  if (direction === "NORTH") {
    return map.reduce((result, current) => {
      if (
        (result === null || current.y < result.y) &&
        current.y > state.game.land.data.y &&
        current.x === state.game.land.data.x
      ) {
        return current;
      }
      return result;
    }, null);
  }
  return null;
};

export const loadCurrency = async ({ state, effects }: Context) => {
  state.game.loading.currency = true;
  state.game.currency = await effects.game.getCurrency(state.game.wax());
  state.game.loading.currency = false;
};

export const loadWaxCurrency = async ({ state, effects }: Context) => {
  state.game.loading.waxCurrency = true;
  state.game.waxCurrency = await effects.game.getWaxCurrency(state.game.wax());
  state.game.loading.waxCurrency = false;
};

export const loadStaked = async ({ state, effects }: Context) => {
  state.game.loading.staked = true;
  state.game.staked = await effects.game.getStaked(state.game.wax());
  state.game.loading.staked = false;
};

export const loadUnstaked = async ({ state, effects }: Context) => {
  state.game.loading.unstaked = true;
  state.game.unstaked = await effects.game.getUnStaked(state.game.wax());
  state.game.loading.unstaked = false;
};

export async function getMineDelay({ state, actions }: Context) {
  await Promise.all([
    actions.game.loadBag(),
    actions.game.loadLand(),
    actions.game.loadMiner(),
  ]);

  if (state.game.land === null) return null;
  const bagParams = getBagMiningParams(state.game.bag);
  const landParams = getLandMiningParams(state.game.land);

  const delay = bagParams.delay * (landParams.delay / 10);

  let mineDelay = -1;
  const now = new Date().getTime();
  console.log(`Equipment and land delay for mining: ${delay}`);

  if (
    state.game.miner &&
    state.game.miner.last_mine_tx !==
      "0000000000000000000000000000000000000000000000000000000000000000"
  ) {
    console.log(
      `Last mine was at ${state.game.miner.last_mine} and now is ${new Date()}`
    );
    const lastMineInMs = Date.parse(`${state.game.miner.last_mine}.000Z`);
    mineDelay = lastMineInMs + delay * 1000 - now;

    if (mineDelay < 0) {
      mineDelay = 0;
    }
  }
  console.log(`Time until next mine in ms: ${mineDelay}`);

  if (mineDelay === -1) {
    // first mine, set a random delay
    const tenMinutes = 60 * 10 * 1000;
    mineDelay = Math.floor(Math.random() * tenMinutes);
    console.log(
      `${state.game.account} Setting mine delay to random for first mine ${mineDelay}`
    );
  }
  return mineDelay;
}

export const setMineDelay = ({ state }: Context, delay: number) => {
  console.log("Setting mine delay", delay);
  state.game.mineDelay = new Date().getTime() + delay;
};

export const loadMineDelay = async ({ actions, state }: Context) => {
  state.game.loading.miningDelay = true;
  const mineDelay = await actions.game.getMineDelay();
  actions.game.setMineDelay(mineDelay);
  state.game.loading.miningDelay = false;
};

export const mine = pipe(
  async ({ state }: Context) => {
    state.game.loading.isMining = true;
  },
  getMineDelay,

  async ({ state }: Context, mineDelay) => {
    const bagDifficulty = getBagMiningParams(state.game.bag).difficulty;
    const landDifficulty = getLandMiningParams(state.game.land).difficulty;
    const difficulty = bagDifficulty + landDifficulty;

    console.log("Mining difficulty", difficulty);

    return { mineDelay, difficulty };
  },
  async ({ state }: Context, mineParams) => {
    let lastMineTransaction =
      state.game?.miner?.last_mine_tx ||
      "0000000000000000000000000000000000000000000000000000000000000000";
    lastMineTransaction = lastMineTransaction.substr(0, 16);
    const lastMineArr = fromHexString(lastMineTransaction);

    return {
      ...mineParams,
      accountName: state.game.account,
      account: nameToArray(state.game.account),
      lastMineTransaction,
      lastMineArr,
    };
  },
  async ({ state }: Context, mineParams) => {
    const hardMiningWork = await doProofOfWork(mineParams);

    state.game.miningRandomString = hardMiningWork.randomString;
    // // wait until our time to mine
    // console.log(
    //   `${state.game.account} Waiting to push mine results... ${
    //     mineParams.mineDelay / 1000
    //   } seconds`
    // );

    // await sleep(mineParams.mineDelay);

    console.log(`${state.game.account} Pushing mine results...`);
  },

  async ({ state }: Context) => {
    state.game.loading.isMining = false;
  },

  catchError(({ state }: Context, error) => {
    state.game.loading.isMining = false;
    console.error("Mining failed.", error);
  })
);

export const claimMine = pipe(
  ({ state }: Context) => {
    state.game.loading.isMining = true;
  },

  async ({ state, effects }: Context) => {
    console.log(`${state.game.account} Pushing mine results...`);

    return effects.game.executeMiningTransaction(
      state.game.wax(),
      state.game.miningRandomString
    );
  },

  async ({ state }: Context, amounts) => {
    if (amounts?.length > 0) alert(`Mined ${amounts[0]}`);

    state.game.miningRandomString = null;
  },

  loadCurrency,

  async function wait() {
    // loadMineDelay returns 0 just after a mine
    await sleep(2000);
  },

  loadMineDelay,

  ({ state }: Context) => {
    state.game.loading.isMining = false;
  },

  catchError(({ state }: Context, error) => {
    state.game.loading.isMining = false;
    toast.error(error.message);
    if (error.message.includes("MINE_TOO_SOON")) {
      state.game.miningRandomString = null;
    }
    console.error("Claiming failed.", error);
  })
);

export const selectInitialLand = async ({ state, actions }: Context) => {
  let landId = null;
  if (state.game.miner) {
    landId = state.game.miner.current_land;
  } else {
    const { planets } = state.game;
    if (planets && planets.length > 1) {
      landId = planets[0].map[0].asset_id;
    }
  }

  console.log("selectInitialLand", landId);
  if (landId) await actions.game.selectLand(landId);
};

export const init = pipe(
  loadPlanets,

  catchError(({ state }: Context, error) => {
    console.log("onInitializeOvermindError", error);
  })
);

export const addAssetCacheItem = ({ state }: Context, asset: ApiAsset) => {
  state.game.assetCache.push(asset);
};

export const setLandCache = ({ state }: Context, lands: any[]) => {
  state.game.landsCache = lands;
};

export const claimNFTs = async ({ state, effects, actions }: Context) => {
  state.game.loading.claimingNFTs = true;
  await effects.game.claimNFT(state.game.wax());
  actions.game.loadAssets();
  state.game.loading.claimingNFTs = false;
};

export const setBag = async (
  { effects, state, actions }: Context,
  items: string[]
) => {
  const wantedBagCount = items.length;

  await effects.game.setBag(state.game.wax(), items);
  await sleep(500);
  await actions.game.loadBag();

  const currentBagCount = Object.values(state.game.bag).length;

  if (currentBagCount !== wantedBagCount) {
    await sleep(1000);
    await actions.game.loadBag();
  }

  actions.game.loadMineDelay();
};

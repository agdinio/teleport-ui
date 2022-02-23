import { WaxJS } from "@waxio/waxjs/dist";

import { intToName } from "../../util/api-util";
import {
  getBagMiningParams,
  getLandMiningParams,
} from "../../util/game-mechanics";
import { sleep } from "../../util/helpers";

export const loadPlayer = async (wax: WaxJS) => {
  const result = await wax.api.rpc.get_table_rows({
    code: "federation",
    scope: "federation",
    table: "players",
    // @ts-ignore
    lower_bound: wax.userAccount,
    // @ts-ignore
    upper_bound: wax.userAccount,
    limit: 10,
  });
  console.log("loadPlayer", result);
  return result?.rows?.[0] || null;
};

export const loadTerms = async (wax: WaxJS) => {
  const result = await wax.api.rpc.get_table_rows({
    code: "federation",
    scope: "federation",
    table: "userterms",
    // @ts-ignore
    lower_bound: wax.userAccount,
    // @ts-ignore
    upper_bound: wax.userAccount,
    limit: 1,
  });
  console.log("loadTerms", result);
  return result?.rows?.[0] || null;
};

export const loadMiner = async (wax: WaxJS) => {
  const result = await wax.api.rpc.get_table_rows({
    code: "m.federation",
    scope: "m.federation",
    table: "miners",
    // @ts-ignore
    lower_bound: wax.userAccount,
    // @ts-ignore
    upper_bound: wax.userAccount,
  });
  console.log("loadMiner", result);
  return result?.rows?.[0] || null;
};

export const loadPlanets = async (wax: WaxJS) => {
  const result = await wax.api.rpc.get_table_rows({
    code: "federation",
    scope: "federation",
    table: "planets",
    key_type: "",
    limit: 100,
  });
  console.log("loadPlanets", result);
  return result?.rows || [];
};

export const loadPlanetDetails = async (wax: WaxJS, planet: string) => {
  const result = await wax.api.rpc.get_table_rows({
    code: "m.federation",
    scope: planet,
    table: "state3",
  });
  console.log(`loadPlanetDetails for ${planet}`, result);
  return result?.rows?.[0] || null;
};

export const loadPlanetMap = async (wax: WaxJS, planet: string) => {
  const result = await wax.api.rpc.get_table_rows({
    code: "federation",
    scope: planet,
    table: "maps",
    limit: 1000,
  });
  console.log(`loadPlanetMap for ${planet}`, result);
  return result?.rows || null;
};

export const loadPlanetCurrencyBalance = async (wax: WaxJS, planet: string) => {
  const result = await wax.api.rpc.get_currency_balance(
    "alien.worlds",
    planet,
    "TLM"
  );
  console.log(`loadPlanetCurrencyBalance for ${planet}`, result);
  return result?.[0] || null;
};

export const loadAsset = async (assetId: string) => {
  // @ts-ignore
  try {
    const result = await fetch(
      `https://api.alienworlds.io/v1/alienworlds/asset?id=${assetId}`
    );
    const asset = (await result.json())?.results?.[0];
    console.log(`loadAsset with id ${assetId}`, asset);
    return asset;
  } catch (ex) {
    console.error(`loadAsset with id ${assetId} failed`, ex);
  }
  return null;
};

export const getAssets = async (account: string) => {
  try {
    const result = await fetch(
      `https://api.alienworlds.io/v1/alienworlds/asset?owner=${account}`
    );
    const assets = (await result.json())?.results;
    console.log("Assets", assets);
    return assets;
  } catch (ex) {
    console.error(`Error loading assets`, ex);
  }
  return [];
};

export const getLandbyId = async (wax: WaxJS, landId: string) => {
  const result = await wax.api.rpc.get_table_rows({
    code: "federation",
    scope: "federation",
    table: "landregs",
    lower_bound: landId,
    upper_bound: landId,
  });
  console.log(`getLandbyId for ${landId}`, result);

  let landowner = "federation";
  if (result.rows.length) {
    landowner = result.rows[0].owner;
  }

  const asset = await loadAsset(landId);

  console.log("LAND ASSET", asset);

  asset.data.planet = intToName(asset.data.planet);

  // make sure these attributes are present
  asset.data.img = asset.data.img || "";
  asset.owner = asset.owner || landowner;

  return asset;
};

export const getLand = async (wax: WaxJS) => {
  const result = await wax.api.rpc.get_table_rows({
    code: "m.federation",
    scope: "m.federation",
    table: "miners",
    // @ts-ignore
    lower_bound: wax.userAccount,
    // @ts-ignore
    upper_bound: wax.userAccount,
  });
  // @ts-ignore
  console.log(`getLand for ${wax.userAccount}`, result);
  const id = result?.rows[0]?.current_land || null;
  if (id === null) return null;
  return getLandbyId(wax, id);
};

export const getBag = async (wax: WaxJS) => {
  const result = await wax.api.rpc.get_table_rows({
    code: "m.federation",
    scope: "m.federation",
    table: "bags",
    // @ts-ignore
    lower_bound: wax.userAccount,
    // @ts-ignore
    upper_bound: wax.userAccount,
  });
  const bag = [];
  if (result.rows.length) {
    const items = result.rows[0].items.map((item_id) => {
      return loadAsset(item_id);
    });
    return await Promise.all(items);
  }
  return bag;
};

export const setBag = (wax: WaxJS, items: string[]) => {
  const actions = [
    {
      account: "m.federation",
      name: "setbag",
      authorization: [
        {
          // @ts-ignore
          actor: wax.userAccount,
          permission: "active",
        },
      ],
      data: {
        // @ts-ignore
        account: wax.userAccount,
        items: items.slice(0, 3),
      },
    },
  ];
  return wax.api.transact(
    {
      actions,
    },
    {
      blocksBehind: 3,
      expireSeconds: 30,
    }
  );
};

export const getBagDifficulty = async (wax: WaxJS) => {
  try {
    const bag = await getBag(wax);
    const params = getBagMiningParams(bag);
    return params.difficulty;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getLandDifficulty = async (wax: WaxJS) => {
  try {
    const bag = await getLand(wax);
    const params = getLandMiningParams(bag);
    return params.difficulty;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getCurrency = async (wax: WaxJS) => {
  try {
    const result = await wax.api.rpc.get_table_rows({
      code: "alien.worlds",
      // @ts-ignore
      scope: wax.userAccount,
      table: "accounts",
    });
    console.log(`getCurrency:`, result);
    return result.rows[0]?.balance?.split(" ")[0] || 0;
  } catch (e) {
    console.error(e);
    return 0;
  }
};

export const getWaxCurrency = async (wax: WaxJS) => {
  try {
    // @ts-ignore
    const result = await wax.api.rpc.get_account(wax.userAccount);
    return result?.core_liquid_balance || 0;
  } catch (e) {
    console.error(e);
    return 0;
  }
};

export const executeMiningTransaction = async (
  wax: WaxJS,
  nonce
): Promise<Array<any> | null> => {
  // @ts-ignore
  const account = wax.userAccount;
  const mineData = {
    miner: account,
    nonce,
  };
  console.log("Mine data", mineData);
  const actions = [
    {
      account: "m.federation",
      name: "mine",
      authorization: [
        {
          actor: account,
          permission: "active",
        },
      ],
      data: mineData,
    },
  ];
  const result = await wax.api.transact(
    {
      actions,
    },
    {
      blocksBehind: 3,
      expireSeconds: 90,
    }
  );
  console.log("Mining result", result);

  if (result && result.processed) {
    const amounts = [];
    result.processed.action_traces[0].inline_traces.forEach((t) => {
      if (t.act.data.quantity) {
        const amount = t.act.data.quantity;
        console.log(`${account} Mined ${amount}`);
        amounts.push(amount);
      }
    });
    return amounts;
  }
  return null;
};

export const setComission = (wax: WaxJS, landId, commision) => {
  const actions = [
    {
      account: "federation",
      name: "setprofitshr",
      authorization: [
        {
          // @ts-ignore
          actor: wax.userAccount,
          permission: "active",
        },
      ],
      data: {
        // @ts-ignore
        owner: wax.userAccount,
        land_id: landId,
        profit_share: commision,
      },
    },
  ];

  return wax.api.transact(
    {
      actions,
    },
    {
      blocksBehind: 3,
      expireSeconds: 30,
    }
  );
};

export const agreeTerms = (wax: WaxJS) => {
  const actions = [
    {
      account: "federation",
      name: "agreeterms",
      authorization: [
        {
          // @ts-ignore
          actor: wax.userAccount,
          permission: "active",
        },
      ],
      data: {
        // @ts-ignore
        account: wax.userAccount,
        terms_id: 1,
        terms_hash:
          "e2e07b7d7ece0d5f95d0144b5886ff74272c9873d7dbbc79bc56f047098e43ad",
      },
    },
  ];
  return wax.api.transact(
    {
      actions,
    },
    {
      blocksBehind: 3,
      expireSeconds: 90,
    }
  );
};

export const setLand = (wax: WaxJS, landId: string) => {
  return wax.api.transact(
    {
      actions: [
        {
          account: "m.federation",
          name: "setland",
          authorization: [
            {
              // @ts-ignore
              actor: wax.userAccount,
              permission: "active",
            },
          ],
          data: {
            // @ts-ignore
            account: wax.userAccount,
            land_id: landId,
          },
        },
      ],
    },
    {
      blocksBehind: 3,
      expireSeconds: 1200,
    }
  );
};

export const setInitialBag = async (wax: WaxJS) => {
  let assets = [];
  while (assets.length === 0) {
    // @ts-ignore
    assets = (await getAssets(wax.userAccount)).filter(
      (asset) => asset.schema_name === "tool.worlds"
    );
    console.log(assets);
    await sleep(1500);
  }
  const item = assets[0]?.asset_id;
  console.log(`Setting item with asset_id: ${item}`);
  if (item) {
    return wax.api.transact(
      {
        actions: [
          {
            account: "m.federation",
            name: "setbag",
            authorization: [
              {
                // @ts-ignore
                actor: wax.userAccount,
                permission: "active",
              },
            ],
            data: {
              // @ts-ignore
              account: wax.userAccount,
              items: [item],
            },
          },
        ],
      },
      {
        blocksBehind: 3,
        expireSeconds: 1200,
      }
    );
  }
  return null;
};

export const setTagAndAvatar = (wax: WaxJS, { avatar, tag }) => {
  return wax.api.transact(
    {
      actions: [
        {
          account: "federation",
          name: "setavatar",
          authorization: [
            {
              // @ts-ignore
              actor: wax.userAccount,
              permission: "active",
            },
          ],
          data: {
            // @ts-ignore
            account: wax.userAccount,
            avatar_id: avatar,
          },
        },
        {
          account: "federation",
          name: "settag",
          authorization: [
            {
              // @ts-ignore
              actor: wax.userAccount,
              permission: "active",
            },
          ],
          data: {
            // @ts-ignore
            account: wax.userAccount,
            tag,
          },
        },
      ],
    },
    {
      blocksBehind: 3,
      expireSeconds: 90,
    }
  );
};

export const stake = (wax: WaxJS, planetName, quantity) => {
  // @ts-ignore
  const account = wax.userAccount;

  const actions = [
    {
      account: "alien.worlds",
      name: "transfer",
      authorization: [
        {
          actor: account,
          permission: "active",
        },
      ],
      data: {
        from: account,
        to: "federation",
        quantity,
        memo: "staking",
      },
    },
    {
      account: "federation",
      name: "stake",
      authorization: [
        {
          actor: account,
          permission: "active",
        },
      ],
      data: {
        account,
        planet_name: planetName,
        quantity,
      },
    },
  ];

  return wax.api.transact(
    {
      actions,
    },
    {
      blocksBehind: 3,
      expireSeconds: 30,
    }
  );
};

export const unstake = async (wax: WaxJS, planet, quantity) => {
  // @ts-ignore
  const account = wax.userAccount;

  // get planet symbol from federation account
  const planetResult = await wax.api.rpc.get_table_rows({
    code: "federation",
    scope: "federation",
    table: "planets",
    limit: 1,
    lower_bound: planet,
    upper_bound: planet,
  });
  //
  // if (!planet_res.rows.length) {
  //   throw new Error(`Could not find planet ${planet}`);
  // }

  const [precision, sym] = planetResult.rows[0].dac_symbol.split(",");
  // fix decimals
  quantity = parseFloat(quantity).toFixed(precision);
  quantity = `${quantity} ${sym}`;

  const actions = [
    {
      account: "alien.worlds",
      name: "transfer",
      authorization: [
        {
          actor: account,
          permission: "active",
        },
      ],
      data: {
        from: account,
        to: "federation",
        quantity,
        memo: "Unstaking",
      },
    },
  ];

  return wax.api.transact(
    {
      actions,
    },
    {
      blocksBehind: 3,
      expireSeconds: 30,
    }
  );
};

export const refund = (wax: WaxJS, refundId) => {
  // @ts-ignore
  const account = wax.userAccount;

  const actions = [
    {
      account: "federation",
      name: "refund",
      authorization: [
        {
          actor: account,
          permission: "active",
        },
      ],
      data: {
        id: refundId,
      },
    },
  ];

  return wax.api.transact(
    {
      actions,
    },
    {
      blocksBehind: 3,
      expireSeconds: 30,
    }
  );
};

export const getStaked = async (wax: WaxJS) => {
  // @ts-ignore
  const account = wax.userAccount;

  // Get a list of the planets and then get balance for each
  const planetResult = await wax.api.rpc.get_table_rows({
    code: "federation",
    scope: "federation",
    table: "planets",
    limit: 100,
  });

  const balanceResults = await wax.api.rpc.get_currency_balance(
    "token.worlds",
    account
  );

  const planetTokens = {};
  let total = 0;

  if (planetResult.rows.length) {
    planetResult.rows.forEach((p) => {
      if (p.active) {
        const planetSymbol = p.dac_symbol.split(",")[1];
        let planetBalance = `0.0000 ${planetSymbol}`;
        balanceResults.forEach((balanceStr) => {
          if (planetSymbol === balanceStr.split(" ")[1]) {
            planetBalance = balanceStr;
          }
        });
        const [amount, symbol] = planetBalance.split(" ");

        planetTokens[p.planet_name] = { amount, symbol };

        total += parseFloat(amount);
      }
    });
  }

  const planetTokensRes = [];
  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const p in planetTokens) {
    const pa = planetTokens[p];
    pa.planetName = p;
    planetTokensRes.push(pa);
  }

  return { staked: planetTokensRes, total };
};

export const getUnStaked = async (wax: WaxJS) => {
  // @ts-ignore
  const account = wax.userAccount;

  const result = await wax.api.rpc.get_table_rows({
    code: "federation",
    scope: "federation",
    table: "refunds",
    index_position: 2,
    key_type: "i64",
    upper_bound: account,
    lower_bound: account,
    limit: 100,
  });

  return result.rows;
};

export const claimNFT = (wax: WaxJS) => {
  const actions = [
    {
      account: "m.federation",
      name: "claimnfts",
      authorization: [
        {
          // @ts-ignore
          actor: wax.userAccount,
          permission: "active",
        },
      ],
      data: {
        // @ts-ignore
        miner: wax.userAccount,
      },
    },
  ];

  return wax.api.transact(
    {
      actions,
    },
    {
      blocksBehind: 3,
      expireSeconds: 30,
    }
  );
};

export const hasNFTClaims = async (wax: WaxJS) => {
  // @ts-ignore
  const account = wax.userAccount;

  const result = await wax.api.rpc.get_table_rows({
    code: "m.federation",
    scope: "m.federation",
    table: "claims",
    upper_bound: account,
    lower_bound: account,
    limit: 100,
  });

  return result?.rows?.length > 0;
};

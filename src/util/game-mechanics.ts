import { getRand, toHex } from "./api-util";

export const getBagMiningParams = (bag) => {
  const miningParams = {
    delay: 0,
    difficulty: 0,
    ease: 0,
  };

  let minDelay = 65535;

  for (let b = 0; b < bag.length; b += 1) {
    if (bag[b].data.delay < minDelay) {
      minDelay = bag[b].data.delay;
    }
    miningParams.delay += bag[b].data.delay;
    miningParams.difficulty += bag[b].data.difficulty;
    miningParams.ease += bag[b].data.ease / 10;
  }

  if (bag.length === 2) {
    miningParams.delay -= Math.floor(minDelay / 2);
  } else if (bag.length === 3) {
    miningParams.delay -= minDelay;
  }

  return miningParams;
};

export const getLandMiningParams = (land) => {
  const miningParams = {
    delay: 0,
    difficulty: 0,
    ease: 0,
  };

  miningParams.delay += land.data.delay;
  miningParams.difficulty += land.data.difficulty;
  miningParams.ease += land.data.ease;

  return miningParams;
};

export const doProofOfWork = async ({
  account,
  accountName,
  difficulty,
  lastMineTransaction,
  lastMineArr,
}) => {
  account = account.slice(0, 8);

  const isWamAccount = accountName.substr(-4) === ".wam";

  let good = false;
  let itr = 0;
  let hash;
  let hexDigest;
  let randomArr;
  let last;

  console.log(
    `Performing work with difficulty ${difficulty}, last tx is ${lastMineTransaction}...`
  );
  if (isWamAccount) {
    console.log(`Using WAM account`);
  }

  const start = new Date().getTime();

  while (!good) {
    randomArr = getRand();

    const combined = new Uint8Array(
      account.length + lastMineArr.length + randomArr.length
    );
    combined.set(account);
    combined.set(lastMineArr, account.length);
    combined.set(randomArr, account.length + lastMineArr.length);

    hash = await crypto.subtle.digest("SHA-256", combined.slice(0, 24));
    hexDigest = toHex(hash);
    if (isWamAccount) {
      // easier for .wam accounts
      good = hexDigest.substr(0, 4) === "0000";
    } else {
      // console.log(`non-wam account, mining is harder`)
      good = hexDigest.substr(0, 6) === "000000";
    }

    if (good) {
      if (isWamAccount) {
        last = parseInt(hexDigest.substr(4, 1), 16);
      } else {
        last = parseInt(hexDigest.substr(6, 1), 16);
      }
      good = good && last <= difficulty;
    }
    itr += 1;

    if (itr % 1000000 === 0) {
      console.log(`Still mining - tried ${itr} iterations`);
    }

    if (!good) {
      hash = null;
    }
  }
  const end = new Date().getTime();

  const randomString = toHex(randomArr);

  console.log(
    `Found hash in ${itr} iterations with ${account} ${randomString}, last = ${last}, hex_digest ${hexDigest} taking ${
      (end - start) / 1000
    }s`
  );
  return { randomString, hexDigest };
};

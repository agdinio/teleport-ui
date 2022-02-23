import { WaxJS } from "@waxio/waxjs/dist";

const activeAuthenticator = (ual) => {
  if (ual.activeAuthenticator.wax) {
    // @ts-ignore
    return ual.activeAuthenticator.wax;
  }
  return ual.activeAuthenticator;
};

export const getWaxTLMBalance = async (wax: WaxJS) => {
  // @ts-ignore
  const res = await wax.rpc.get_currency_balance(
    "alien.worlds",
    // @ts-ignore
    wax.userAccount
  );

  return Number(res[0].replace(" TLM", ""));
};

export const getUALTLMBalance = async (ual: Object) => {
  // @ts-ignore
  if (ual && ual.activeAuthenticator) {
    // @ts-ignore
    const res = await activeAuthenticator(ual).rpc.get_currency_balance(
      "alien.worlds",
      // @ts-ignore
      ual.activeUser.accountName
    );

    if (res && res[0]) {
      return Number(res[0].replace(" TLM", ""));
    }
    return 0;
  }
  return 0;
};

export const cancelTransferWaxEth = (wax: WaxJS) => {
  // @ts-ignore
  const account = wax.userAccount;

  return wax.api.transact(
    {
      account: "other.worlds",
      name: "delreceipts",
      authorization: [
        {
          actor: account,
          permission: "active",
        },
      ],
    },
    {
      blocksBehind: 3,
      expireSeconds: 30,
      broadcast: true,
    }
  );
};

export const transferWaxEth = async (
  user,
  quantity,
  destinationChainId,
  destinationAddress
) => {
  const account = user.accountName;

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
        to: "other.worlds",
        quantity: `${parseFloat(quantity).toFixed(4)} TLM`,
        memo: "Teleport",
      },
    },
    {
      account: "other.worlds",
      name: "teleport",
      authorization: [
        {
          actor: account,
          permission: "active",
        },
      ],
      data: {
        from: account,
        quantity: `${parseFloat(quantity).toFixed(4)} TLM`,
        chain_id: destinationChainId,
        eth_address: `${destinationAddress.replace(
          "0x",
          ""
        )}000000000000000000000000`,
      },
    },
  ];

  // if (user.wax && user.wax.api && user.wax.api.transact) {
  //   return user.api.transact(
  //     {
  //       actions,
  //     },
  //     {
  //       blocksBehind: 3,
  //       expireSeconds: 30,
  //       broadcast: true,
  //     }
  //   );
  // }

  return user.signTransaction(
    { actions },
    { blocksBehind: 3, expireSeconds: 30, broadcast: true }
  );
};

export const cancelTransferWaxtEth = async (user, teleportId) => {
  const account = user.accountName;
  const actions = [
    {
      account: "other.worlds",
      name: "cancel",
      authorization: [
        {
          actor: account,
          permission: "active",
        },
      ],
      data: {
        id: teleportId,
      },
    },
  ];

  return user.signTransaction(
    { actions },
    { blocksBehind: 3, expireSeconds: 30, broadcast: true }
  );
};

export const loadUALTeleports = async (ual: Object, otherWallet: object) => {
  // @ts-ignore
  if (!otherWallet || (otherWallet && !otherWallet.className)) {
    return [];
  }

  // @ts-ignore
  if (!ual || (ual && !ual.activeAuthenticator)) {
    return [];
  }

  const teleports = await [];

  // @ts-ignore
  const account = ual.activeUser.accountName;

  // @ts-ignore
  const resWax = await activeAuthenticator(ual).rpc.get_table_rows({
    code: "other.worlds",
    scope: "other.worlds",
    table: "teleports",
    index_position: 2,
    key_type: "i64",
    lower_bound: account,
    upper_bound: account,
    reverse: true,
    limit: 1000,
  });

  await resWax.rows.forEach((r) => {
    r.class = "fromwax";
    r.completed = r.claimed;
    r.claimable = r.oracles.length >= 3 && !r.completed;
    r.correct_login =
      // @ts-ignore
      `0x${r.eth_address.substr(0, 40)}` ===
      // @ts-ignore
      (otherWallet.name || "").toLowerCase();
    r.correct_chain = false;
    if (
      // @ts-ignore
      (otherWallet.chainId === 1 || otherWallet.chainId === "1") &&
      r.chain_id === 1
    ) {
      r.correct_chain = true;
    } else if (
      // @ts-ignore
      (otherWallet.chainId === 3 || otherWallet.chainId === "3") &&
      r.chain_id === 1
    ) {
      r.correct_chain = true;
    } else if (
      // @ts-ignore
      (otherWallet.chainId === 56 || otherWallet.chainId === "56") &&
      r.chain_id === 2
    ) {
      r.correct_chain = true;
    }
    const tmpQty = r.quantity.replace(/ TLM/g, "");
    r.quantity = `${Number(tmpQty.toString())} TLM`;
    teleports.push(r);
  });

  // @ts-ignore
  const resOtherWallet = await activeAuthenticator(ual).rpc.get_table_rows({
    code: "other.worlds",
    scope: "other.worlds",
    table: "receipts",
    index_position: 3,
    key_type: "i64",
    lower_bound: account,
    upper_bound: account,
    reverse: true,
    limit: 1000,
  });
  await resOtherWallet.rows.forEach((r) => {
    r.class = "towax";

    let ethApproversCount = 0;
    if (r.approvers && r.approvers.length > 0) {
      r.approvers.forEach((a) => {
        const ap = a.split(".");
        if (ap && ap.length > 0) {
          if (ap[0] === "o1" || ap[0] === "o2" || ap[0] === "o3") {
            ethApproversCount += 1;
          }
        }
      });
    }

    if (ethApproversCount >= 3) {
      r.isEth = true;
    } else {
      r.isEth = false;
    }

    const tmpQty = r.quantity.replace(/ TLM/g, "");
    r.quantity = `${Number(tmpQty.toString())} TLM`;
    teleports.push(r);
  });

  return teleports;
};

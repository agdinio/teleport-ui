import { config } from "util/teleportConfig";

import { Wax } from "@eosdacio/ual-wax";
import { Web3Provider } from "@ethersproject/providers";
import { Serialize } from "eosjs";
import { ethers, BigNumber } from "ethers";
import { Simulate } from "react-dom/test-utils";
import { Anchor } from "ual-anchor";
import Web3 from "web3";

import { Context } from "../index";

enum Messages {
  UNSUPPORTED_CHAIN = "The chain is not supported. Please select Ethereum Mainnet or Binance Smart Chain in Metamask.",
  INCORRECT_CHAIN = "Incorrect chain selected. Please select [chainName] in Metamask.",
  LOGIN_REQUIRED = "Please check if Metamask is unlocked.",
}

const activeAuthenticator = (ual) => {
  if (ual.activeAuthenticator.wax) {
    // @ts-ignore
    return ual.activeAuthenticator.wax;
  }
  return ual.activeAuthenticator;
};

export const setWeb3Obj = ({ state }: Context, web3Obj: Object) => {
  state.teleport.web3Obj = web3Obj;
};

export const setNetwork = async (
  { state, effects, actions }: Context,
  networkId: number
) => {
  /* eslint-disable */
  if (!state.teleport.isOtherWalletLoggedIn) {
    return;
  }

  const existing = await config.networks[networkId];
  if (existing) {
    //REMOVE ACTIVE METAMASK NAME BEFORE CHANGING INTO NEW ACTIVE
    state.teleport.account[state.teleport.selectedOtherWallet].name = await null;

    const _selectedNetwork = await config.networks[state.teleport.metamaskChainId];

    state.teleport.selectedOtherWallet = await _selectedNetwork.className;

    state.teleport.account[state.teleport.selectedOtherWallet].name = state.teleport.metamaskAccount;
    state.teleport.account[state.teleport.selectedOtherWallet].chainId = state.teleport.metamaskChainId;
    state.teleport.account[state.teleport.selectedOtherWallet].network = _selectedNetwork;
    state.teleport.account[state.teleport.selectedOtherWallet].className = _selectedNetwork.className;
    state.teleport.account[state.teleport.selectedOtherWallet].balance = await getEthTLMBalance(state);
    state.teleport.errorMessage = null;
    state.teleport.isMetamaskLocked = false;

    actions.teleport.loadTeleports();
  } else {
    state.teleport.isMetamaskLocked = true;
    state.teleport.errorMessage = Messages.UNSUPPORTED_CHAIN;
    state.teleport.transactions = [];
  }
}

export const setAccount= async ({state, effects, actions}: Context, accounts) => {
  // @ts-ignore
  if (!state.teleport.isOtherWalletLoggedIn) {
    return;
  }

  // actions.teleport.setWeb3Obj(state.teleport.web3);

  state.teleport.account[state.teleport.selectedOtherWallet].name = accounts[0];
  state.teleport.account[state.teleport.selectedOtherWallet].balance = await getEthTLMBalance(state);

  actions.teleport.loadTeleports();
}

export const setUAL = async ({state,effects}:Context, ual:Object) => {
  // @ts-ignore
  if (ual && ual.activeUser) {
    // @ts-ignore
    if (ual.activeAuthenticator) {
      // @ts-ignore
      if (ual.activeAuthenticator instanceof Wax) {
        state.teleport.account["wax"].activeAuthenticatorName = "WAX";
      }
      // @ts-ignore
      if (ual.activeAuthenticator instanceof Anchor) {
        state.teleport.account["wax"].activeAuthenticatorName = "Anchor";
      }
    }

    // @ts-ignore
    state.teleport.ual = await ual;
    // @ts-ignore
    state.teleport.account["wax"].name = await ual.activeUser.accountName;
    state.teleport.account["wax"].className = "wax";
    // @ts-ignore
    state.teleport.account["wax"].balance = await effects.teleport.getUALTLMBalance(ual);

    state.teleport.isWaxLoggedIn = true;
    state.teleport.isLocked = false;
  } else {
    state.teleport.ual = null;
    state.teleport.account["wax"] = {
      name: null,
      balance: 0,
      chainId: 0,
      className: null,
      activeAuthenticatorName: null,
    }
    state.teleport.isWaxLoggedIn = false;
  }

  return true;
}

export const loginMetamask = async ({ state, effects, actions }: Context, { network }) => {
  if (state.teleport.metamaskAccount && state.teleport.metamaskChainId && state.teleport.metamaskLibrary) {
    state.teleport.selectedOtherWallet = await network;
    const exists = await config.networks[state.teleport.metamaskChainId];
    if (exists) {
      state.teleport.account[network].name = state.teleport.metamaskAccount;
      state.teleport.account[network].chainId = state.teleport.metamaskChainId;
      state.teleport.account[network].network = config.networks[state.teleport.metamaskChainId];
      state.teleport.account[network].className = await config.networks[state.teleport.metamaskChainId].className;
      state.teleport.account[network].balance = await getEthTLMBalance(state);
      state.teleport.isMetamaskLocked = false;
    } else {
      state.teleport.isMetamaskLocked = true;
      state.teleport.errorMessage = Messages.UNSUPPORTED_CHAIN;
    }
  }

  if (state.teleport.isWaxLoggedIn && state.teleport.isOtherWalletLoggedIn) {
    actions.teleport.loadTeleports();
  }
}

export const transfer = async ({ state, effects, actions }: Context, {sourceWallet, destinationWallet, quantity, web3, ualRef}) => {
  if (!ualRef || (ualRef && !ualRef.current) || (ualRef && ualRef.current && !ualRef.current.activeUser)) {
    return false;
  }

  try {
    actions.teleport.setTransferring(true);
    if (sourceWallet.className === 'wax') {
      const destinationChainId = destinationWallet.network.destinationChainId;
      const destinationAddress = destinationWallet.name;

      await effects.teleport.transferWaxEth(ualRef.current.activeUser, quantity, destinationChainId, destinationAddress);
      state.teleport.account[sourceWallet.className].balance = await effects.teleport.getUALTLMBalance(ualRef.current);
      state.teleport.successModal = "Your Teleport has been sent. Please wait a few moments.";

      state.teleport.tempTransactionFromWax.chainId = await destinationWallet.chainId;
      state.teleport.tempTransactionFromWax.quantity = await quantity;
      state.teleport.tempTransactionFromWax.count = await state.teleport.transactions && state.teleport.transactions.length || 0;

      actions.teleport.setTransferring(false);
    } else {

      if (state.teleport.web3) {
        const address = sourceWallet.network.tlmContract;
        const ABI = sourceWallet.network.abi;

        // @ts-ignore
        // await window.ethereum.enable();
        // @ts-ignore
        // await window.ethereum.request({method: 'eth_requestAccounts'});
        // @ts-ignore
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        // const signer = provider.getSigner();

        /*
                const tlmInstance = new ethers.Contract(address, ABI, web3.current.library.getSigner());
                await tlmInstance.teleport(destinationWallet.name, quantity * 10000, 0, {gasPrice: ethers.utils.parseUnits('50', 'gwei'), gasLimit: 100000});
                state.teleport.account[sourceWallet.className].balance = await getEthTLMBalance(state);
        */

        // @ts-ignore
        const tlmInstance = new state.teleport.web3.eth.Contract(ABI, address);
        await tlmInstance.methods.teleport(destinationWallet.name, quantity * 10000, 0).send({from: state.teleport.metamaskAccount})
            .on("transactionHash", (hash) => {
              console.log('actions.transfer.transactionHash', hash);
              // @ts-ignore
              actions.teleport.setEthTLMBalance(sourceWallet.className);
              actions.teleport.setApproved(true);
              actions.teleport.setTransferring(false);
            })
            .on("confirmation", async (confirmationNumber, receipt) => {
              console.log('actions.transfer.confirmation', confirmationNumber, receipt);
            })
            .on("error", (error, receipt) => {
              actions.teleport.setTransferring(false);
              actions.teleport.setErrorModal(error.message);
            });
      }

    }
  } catch (e) {
    actions.teleport.setTransferring(false);
    state.teleport.errorModal = e.message;
  }
};

export const cancelTransferWaxEth = async({state,effects}:Context) => {
  try {
    await effects.teleport.cancelTransferWaxEth(state.teleport.wax());
  } catch (e) {
    console.log('Cancel Transfer Error', e)
  }
}

export const updateTLMsBalance = async ({state, effects}:Context, {web3,ualRef}) => {
  // @ts-ignore
  console.log('UPDATE TLMs BALANCE')
  state.teleport.account["wax"].balance = await effects.teleport.getUALTLMBalance(ualRef.current);
  state.teleport.account[state.teleport.selectedOtherWallet].balance = await getEthTLMBalance(state);
}

export const isCorrectNetwork = async ({state}:Context) => {
  const n = await config.networks[state.teleport.metamaskChainId];
  if (n) {
    if (n.className === state.teleport.selectedOtherWallet) {
      return true;
    }
  }
  return false;
}

export const getETHBalance = async ({state, effects}:Context, {sourceName, web3}) => {
  let bal = null;
  if (sourceName === "wax") {
    bal = await effects.teleport.getUALTLMBalance(state.teleport.ual);
  } else {
    bal = await getEthTLMBalance(state);
  }
  return bal || 0;
}

export const setErrorModal = ({ state, effects }: Context, val:string) => {
  state.teleport.errorModal = val;
}

export const setSuccessModal = ({ state, effects }: Context, val:string) => {
  state.teleport.successModal = val;
}

export const setErrorDashboardModal = ({ state, effects }: Context, val:string) => {
  state.teleport.errorDashboardModal = val;
}

export const setSuccessDashboardModal = ({ state, effects }: Context, val:string) => {
  state.teleport.successDashboardModal = val;
}

export const setLocked = ({ state, effects }: Context, val:boolean) => {
  state.teleport.isLocked = val;
}

export const setMetamaskLocked = ({ state, effects }: Context, val:boolean) => {
  state.teleport.isMetamaskLocked = val;
}

export const setSelectedOtherWallet = ({state}:Context, val:string) => {
  state.teleport.selectedOtherWallet = val;
}

export const setOtherWalletLoggedIn = async ({state}:Context, val:boolean) => {
  state.teleport.isOtherWalletLoggedIn = val;
}

export const setOtherWalletUnauthenticated = ({state}:Context) => {
  state.teleport.isLocked = false;
  state.teleport.isMetamaskLocked = false;
  state.teleport.isOtherWalletLoggedIn = false;
}

export const setWalletAdded = ({state}:Context, val:boolean) => {
  state.teleport.isWalletAdded = val;
}

export const setAmountToTransfer = ({ state }: Context, val: number) => {
  state.teleport.amountToTransfer = val;
};

export const setSelectedTransaction = ({state}:Context, val:Object) => {
  state.teleport.selectedTransaction = val;
}

export const resetLoadedTeleportCount = ({state}:Context) => {
  state.teleport.loadedTeleportCount = 0;
}

export const removeFromClaimings = ({state}:Context, val: number) => {
  const state_claimings_index = state.teleport.claimings.indexOf(val);
  if (state_claimings_index !== -1) {
    state.teleport.claimings.splice(state_claimings_index, 1);
  }
}

export const resetClaimings = ({state}:Context, val: number) => {
  state.teleport.claimings = [];
}

export const resetErrorSelectedItem = async ({state}:Context) => {
  state.teleport.errorSelectedItem = await null;
}

export const insertTempTransactionFromWax = async ({state}:Context, {indexAt, deleteCount, tmpPending}) => {
  await state.teleport.transactions.splice(indexAt, deleteCount, tmpPending);
}

export const resetTempTransactionFromWax = ({state}:Context) => {
  state.teleport.tempTransactionFromWax = {
    chainId: 0,
    count: 0,
    quantity: 0,
  }
}

export const setTempTransFromWaxPending = async ({state,actions}:Context) => {
  console.log("Temp Pending FromWax", state.teleport.tempTransactionFromWax);
  if (
      state.teleport.tempTransactionFromWax && state.teleport.tempTransactionFromWax.count === state.teleport.transactions.length
  ) {
    if (state.teleport.web3) {
      const activeNetwork = config.networks[state.teleport.tempTransactionFromWax.chainId];
      if (activeNetwork) {
        const tmpPending = {
          chain_id: activeNetwork.destinationChainId,
          claimable: false,
          claimed: 0,
          class: "fromwax",
          completed: 0,
          correct_chain: true,
          correct_login: true,
          cancelable: true,
          quantity: state.teleport.tempTransactionFromWax.quantity + " TLM",
        };
        await state.teleport.transactions.splice(0, 0, tmpPending);
      }
    }
  } else {
    actions.teleport.resetTempTransactionFromWax();
  }
}

export const loadTeleports = async ({effects, state}: Context) => {
  // @ts-ignore
  if (!state.teleport.ual || (state.teleport.ual && !state.teleport.ual.activeUser)) {
    return;
  }

  if (!state.teleport.isWaxLoggedIn || !state.teleport.isOtherWalletLoggedIn) {
    return;
  }

  try {
    state.teleport.isLoadingTeleports = true;
    state.teleport.loadedTeleportCount += 1;
    const ethWallet = await state.teleport.account[state.teleport.selectedOtherWallet];
    const trans = await effects.teleport.loadUALTeleports(state.teleport.ual, ethWallet);

    
    const transInOrder = await [];

/*
    for (let i = trans.length - 1; i >= 0; i--) {
      const t = trans[i];
      if (t.claimable && !t.claimed) {
        console.log('IIII', t.id)
        transInOrder.push(t);
        // trans.splice(t, 1);
      }
    }
*/

    //ERROR
    trans.forEach(async t => {
      if (!t.correct_chain && !t.completed && !t.claimed) {
        t.transactionDate = await new Date(t.time * 1000);
        await transInOrder.push(t);
      }
    })

    //PENDING
    trans.forEach(async t => {
      if (t.correct_chain && !t.claimable && !t.claimed) {
        t.transactionDate = await new Date(t.time * 1000);
        await transInOrder.push(t);
      }
    })

    //PENDING
    trans.forEach(async t => {
      if (t.correct_chain && t.claimable && !t.claimed) {
        t.transactionDate = await new Date(t.time * 1000);
        await transInOrder.push(t);
      }
    })

    //CLAIMED
    let claimedInOrder = [];
    trans.forEach(async t => {
      if (t.class === "fromwax" && t.completed) {
        t.transactionDate = await new Date(t.time * 1000);
        await claimedInOrder.push(t);
      }
      if (t.class === "towax" && t.completed) {
        t.transactionDate = await new Date(t.date);
        await claimedInOrder.push(t);
      }
    })

    claimedInOrder = await claimedInOrder.sort((a,b) => b.transactionDate - a.transactionDate);
    claimedInOrder = await claimedInOrder.sort((a,b) => b.transactionDate - a.transactionDate);

    state.teleport.transactions = await [];
    state.teleport.transactions = await [...transInOrder, ...claimedInOrder];

    state.teleport.isLoadingTeleports = false;
  } catch (e) {
    state.teleport.isLoadingTeleports = false;
  }
}

export const setLoadingTeleport = ({state}:Context, val:boolean) => {
  state.teleport.isLoadingTeleports = val;
}

const getEthTLMBalance = async (state) => {
  // @ts-ignore
  if (state.teleport.web3) {
/*
    // ACTUAL ETHER BALANCE
    // @ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const bal = await signer.getBalance()
    return ethers.utils.formatEther(bal.toString());
*/

    const chainData = await config.networks[state.teleport.metamaskChainId];
    const tlmInstance = await new state.teleport.web3.eth.Contract(chainData.abi, chainData.tlmContract);
    const bal = await tlmInstance.methods.balanceOf(state.teleport.metamaskAccount).call();
    return Number(bal / 10000).toString();
  }

  return 0;
}

export const setTransaction = async ({state}:Context, trans:Object) => {
  state.teleport.selectedTransaction = await trans;
}

export const claim = async ({effects, state, actions}: Context, {selectedItem}) => {
  // @ts-ignore
  state.teleport.selectedTransaction = await JSON.parse(JSON.stringify(selectedItem));
  const state_claiming = state.teleport.claimings.filter(o => o === selectedItem.id)[0];
  if (!state_claiming) {
    state.teleport.claimings.push(selectedItem.id);
  }

  try {
    const signData = await getSignData(state, selectedItem.id);
    console.log(JSON.stringify(signData));
    // @ts-ignore
    const chainData = await config.networks[state.teleport.metamaskChainId];

    // @ts-ignore
    const tlmInstance = new state.teleport.web3.eth.Contract(chainData.abi, chainData.tlmContract);
    const resp = tlmInstance.methods.claim(signData.data, signData.signatures).send({from: state.teleport.metamaskAccount})
        .on("transactionHash", (hash) => {
          console.log('actions.claim.transactionHash', hash)
        })
        .on("confirmation", (confirmationNumber, receipt) => {})
        .on("error", (error, receipt) => {
          const state_claiming_index = state.teleport.claimings.indexOf(selectedItem.id);
          if (state_claiming_index !== -1) {
            // @ts-ignore
            actions.teleport.updateClaimings(state_claiming_index);
          }
          actions.teleport.setErrorSelectedItem({selectedItemId:selectedItem.id, errorMessage:error.message});
        });
    actions.teleport.setSuccessDashboardModal("Your Trilium has been claimed and will show on the network after being confirmed in a block");
  } catch (e) {
    const state_claiming_index = state.teleport.claimings.indexOf(selectedItem.id);
    if (state_claiming_index !== -1) {
      state.teleport.claimings.splice(state_claiming_index, 1);
    }
    // state.teleport.errorDashboardModal =  e.message;
    if (e.error) {
      state.teleport.errorSelectedItem = {
        id: selectedItem.id,
        message: e.error.message
      }
    }
  }
}

export const cancelClaim = async ({effects, state, actions}:Context, {selectedItem, ualRef}) => {
  if (!ualRef || (ualRef && !ualRef.current) || (ualRef && ualRef.current && !ualRef.current.activeUser)) {
    return false;
  }

  try {
    effects.teleport.cancelTransferWaxtEth(ualRef.current.activeUser, selectedItem.id);
  } catch (e) {
    console.log('CANCEL CLAIM ERROR:', e);
  }
}

const getSignData = async (state, teleportId) => {
  // @ts-ignore
  const res = await activeAuthenticator(state.teleport.ual).rpc.get_table_rows({
    code: "other.worlds",
    scope: "other.worlds",
    table: "teleports",
    lower_bound: teleportId,
    upper_bound: teleportId,
    limit: 1,
  });

  if (!res.rows.length){
    state.teleport.errorModal = "Could not find teleport with ID " + teleportId;
    throw new Error("Could not find teleport with ID " + teleportId);
  }

  const teleportData = res.rows[0];

  const sb = new Serialize.SerialBuffer({
    textEncoder: new TextEncoder,
    textDecoder: new TextDecoder
  });

  sb.pushNumberAsUint64(teleportData.id);
  sb.pushUint32(teleportData.time);
  sb.pushName(teleportData.account);
  sb.pushAsset(teleportData.quantity);
  sb.push(teleportData.chain_id);
  sb.pushArray(fromHexString(teleportData.eth_address));

  return {
    claimAccount: '0x' + teleportData.eth_address,
    data: '0x' + toHexString(sb.array.slice(0, 69)),
    signatures: teleportData.signatures
  };
};


const fromHexString = hexString =>
    new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)))

const toHexString = bytes =>
    bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '')

const splitEndpoint = (endpoint) => {
  const [protocol, hostPort] = endpoint.split('://')
  const [host, portStr] = hostPort.split(':')
  let port = parseInt(portStr)
  if (isNaN(port)) {
    port = (protocol === 'https') ? 443 : 80
  }

  return {
    protocol,
    host,
    port
  }
}

export const setMetamaskLibrary = ({state}:Context, library: Web3Provider) => {
  state.teleport.metamaskLibrary = () => library;
}

export const setMetamaskAccount = ({state}:Context, account:string) => {
  state.teleport.metamaskAccount = account;
}

export const setMetamaskChainId = ({state}:Context, chainId:number) => {
  state.teleport.metamaskChainId = chainId;
}

export const setSelectedLoginWallet = ({state}:Context, value:string) => {
  state.teleport.selectedLoginWallet = value;
}

export const setWeb3 = ({state}:Context, value:Web3) => {
  // @ts-ignore
  state.teleport.web3 = value;
}

export const setApproved = ({state}:Context, value:boolean) => {
  state.teleport.isApproved = value;
}

export const updateClaimings = ({state}:Context, index) => {
  state.teleport.claimings.splice(index, 1);
}

export const setErrorSelectedItem = ({state}:Context, {selectedItemId, errorMessage}) => {
  state.teleport.errorSelectedItem = {
    id: selectedItemId,
    message: errorMessage
  }
}

export const setEthTLMBalance = async ({state}:Context, sourceWalletClassName) => {
  state.teleport.account[sourceWalletClassName].balance = await getEthTLMBalance(state);
}

export const setTransferring = ({state}:Context, value:boolean) => {
  state.teleport.isTransferring = value;
}

export const setSelectedBackgroundImage = ({state}:Context, value: string) => {
  state.teleport.selectedBackgroundImage = value;
}

export const setMetamaskActiveNetwork = ({state}:Context, value: Object) => {
  state.teleport.metamaskActiveNetwork = value;
}

export const setErrorMessage = ({state}:Context, value: string) => {
  state.teleport.errorMessage = value;
}

export const setShowMetamaskLoginMessage = ({state}:Context, value: boolean) => {
  state.teleport.isShowMetamaskLoginMessage = value;
}
import { config } from "util/teleportConfig";

import WalletConnectProvider from "@walletconnect/web3-provider";
import { useActions } from "store";
import Web3 from "web3";
import Web3Modal from "web3modal";

const modalProvider = {
  cacheProvider: false,
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          1: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
          56: "https://bsc-dataseed.binance.org/",
          97: "https://data-seed-prebsc-2-s1.binance.org:8545/",
        },
      },
    },
  },
};

const metamaskSigninModal = () => {
  const actions = useActions();

  async function updateCurrentActiveNetwork(networkId) {
    const currentActiveNetwork = await config.networks[networkId];
    console.log("Active Network", currentActiveNetwork);
    if (currentActiveNetwork) {
      await actions.teleport.setMetamaskActiveNetwork(currentActiveNetwork);
    }
  }

  async function signInToMetamask() {
    // @ts-ignore
    window?.ga4?.gtag("event", "bsc_login", {});

    const web3Modal = new Web3Modal(modalProvider);

    const provider = await web3Modal.connect();

    const web3 = new Web3(provider);
    await actions.teleport.setWeb3(web3);
    console.log("Init Web3:", web3);

    const accounts = await web3.eth.getAccounts();
    await actions.teleport.setMetamaskAccount(accounts[0]);
    console.log("Init Account:", accounts[0]);

    const networkId = await web3.eth.net.getId();
    await actions.teleport.setMetamaskChainId(networkId);
    console.log("Init Network", networkId);

    provider.on("accountsChanged", async (acc: string[]) => {
      await actions.teleport.setMetamaskAccount(acc[0]);
      console.log("Account:", acc[0]);
    });

    provider.on("chainChanged", (chainId: number) => {
      console.log("ChainId:", chainId);
    });

    provider.on("networkChanged", async (netId: number) => {
      console.log("Network", netId);
      await actions.teleport.setMetamaskChainId(netId);
      await updateCurrentActiveNetwork(netId);
    });

    // added 01-11-2022
    await updateCurrentActiveNetwork(networkId);
    await actions.teleport.setOtherWalletLoggedIn(true);
  }

  return { signInToMetamask };
};

export { metamaskSigninModal };

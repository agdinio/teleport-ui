import { useEffect } from "react";

import { Web3Provider } from "@ethersproject/providers";
import { useWallet } from "@gimmixorg/use-wallet";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useActions } from "store";

export const modalProviderOpts = {
  cacheProvider: true,
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

const useMetamaskSignin = () => {
  // const { account, activate, library, chainId } = useWeb3React<Web3Provider>();
  const { connect, account, network, provider, web3Modal } = useWallet();
  const actions = useActions();

  useEffect(() => {
    actions.teleport.setMetamaskAccount(account);
    console.log("Account:", account);
  }, [account]);

  useEffect(() => {
    actions.teleport.setMetamaskChainId(network?.chainId);
    actions.teleport.setNetwork(network?.chainId);
    console.log("ChainId:", network?.chainId);
  }, [network]);

  useEffect(() => {
    actions.teleport.setMetamaskLibrary(provider);
    console.log("Library:", provider);
  }, [provider]);

  // useEffect(() => {
  //   actions.missions.setChainId(chainId);
  //   console.log("ChainId:", chainId);
  // }, [chainId]);

  // useEffect(() => {
  //   actions.missions.setLibrary(library);
  //   console.log("Library:", library);
  // }, [library]);

  async function signInToMetamask() {
    connect(modalProviderOpts);
    // @ts-ignore
    window?.ga4?.gtag("event", "bsc_login", {});
    // activate(new InjectedConnector({}), (ex) => {
    //   console.error("Could not login to metamask", ex);
    //   window?.ga4?.gtag("event", "metamask_login_fail", {});
    //   actions.missions.setInfoMessage(
    //     "Could not login. Check that you have Metamask installed."
    //   );
    // }).then(() => {
    //   window?.ga4?.gtag("event", "metamask_login", {});
    // });
  }

  return signInToMetamask;
};

export { useMetamaskSignin };

import { Web3Provider } from "@ethersproject/providers";
import { WaxJS } from "@waxio/waxjs/dist";
import Web3 from "web3";

const wax = new WaxJS("https://wax.greymass.com", null, null, false);

export type WalletInfo = {
  id: number;
  name: string;
  balance: number;
};

export type TeleportState = {
  wax: () => WaxJS;
  web3Obj: Object;
  transactions: Array<Object>;
  selectedTransaction: Object;
  account: {
    wax: {
      name: string;
      balance: number;
      chainId: number;
      className: string;
      activeAuthenticatorName: string;
    };
    ethereum: {
      name: string;
      chainId: number;
      balance: number;
      network: object;
      className: string;
    };
    binance: {
      name: string;
      chainId: number;
      balance: number;
      network: object;
      className: string;
    };
  };
  isMetamaskLocked: boolean;
  unsupportedChain: boolean;
  incorrectChainSelected: boolean;
  isWaxLoggedIn: boolean;
  isOtherWalletLoggedIn: boolean;
  selectedOtherWallet: string;
  waxInfo: WalletInfo;
  otherInfo: WalletInfo;
  amountToTransfer: number;
  errorMessage: string;
  errorModal: string;
  successModal: string;
  successDashboardModal: string;
  errorDashboardModal: string;
  isLocked: boolean;
  claimings: Array<Object>;
  isLoadingTeleports: boolean;
  isWalletAdded: boolean;
  loadedTeleportCount: number;

  credential: {
    wallet: string;
    username: string;
    password: string;
  };

  tempTransactionFromWax: {
    chainId: number;
    count: number;
    quantity: number;
  };
  errorSelectedItem: Object;
  ual: Object;
  isLogout: boolean;

  metamaskLibrary: () => Web3Provider | null;
  metamaskAccount: string;
  metamaskChainId: number;
  metamaskActiveNetwork: Object;
  selectedLoginWallet: string;
  web3: () => Web3 | null;
  isApproved: boolean;
  isTransferring: boolean;
  selectedBackgroundImage: string;
  isShowMetamaskLoginMessage: boolean;
};

export const defaultState: TeleportState = {
  wax: () => wax,
  web3Obj: null,
  transactions: [],
  selectedTransaction: null,
  account: {
    wax: {
      name: null,
      balance: 0,
      chainId: 0,
      className: null,
      activeAuthenticatorName: null,
    },
    ethereum: {
      name: null,
      chainId: 0,
      balance: 0,
      network: null,
      className: null,
    },
    binance: {
      name: null,
      chainId: 0,
      balance: 0,
      network: null,
      className: null,
    },
  },
  isMetamaskLocked: false,
  unsupportedChain: false,
  incorrectChainSelected: false,
  isWaxLoggedIn: false,
  isOtherWalletLoggedIn: false,
  selectedOtherWallet: null,
  waxInfo: null,
  otherInfo: null,
  amountToTransfer: 0,
  errorMessage: null,
  errorModal: null,
  successModal: null,
  successDashboardModal: null,
  errorDashboardModal: null,
  isLocked: false,
  claimings: [],
  isLoadingTeleports: false,
  isWalletAdded: false,
  loadedTeleportCount: 0,

  credential: {
    wallet: null,
    username: null,
    password: null,
  },

  tempTransactionFromWax: {
    chainId: 0,
    count: 0,
    quantity: 0,
  },
  errorSelectedItem: null,
  ual: null,
  isLogout: false,

  metamaskLibrary: () => null,
  metamaskAccount: null,
  metamaskChainId: 0,
  metamaskActiveNetwork: null,
  selectedLoginWallet: null,
  web3: () => null,
  isApproved: false,
  isTransferring: false,
  selectedBackgroundImage: null,
  isShowMetamaskLoginMessage: false,
};

export const state: TeleportState = {
  ...defaultState,
};

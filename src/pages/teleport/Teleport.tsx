import { config } from "util/teleportConfig";

import React, { useState, useEffect, useRef, useCallback } from "react";

import { Flex, Box, Text, Button, keyframes } from "@chakra-ui/react";
import styled from "@emotion/styled/macro";
import { Wax } from "@eosdacio/ual-wax";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import TransferTwoWayIcon from "assets/images/alienworlds-teleport-switch-icon-outline.svg";
import { AnimatePresence, motion } from "framer-motion";
import _random from "lodash/random";
import { useHistory } from "react-router-dom";
import { useAppState, useActions } from "store";
import { Anchor } from "ual-anchor";
import { UALProvider, withUAL } from "ual-reactjs-renderer";

import { Background, Header, PageLoader } from "./components/Background";
import { LoginPanel, LoginPanelChooseMetamask } from "./components/LoginPanel";
import {
  TeleportModal,
  LoginWaxPrompt,
  LoginOtherPrompt,
  TransferPrompt,
  TransferPromptApproved,
  ErrorPrompt,
  SuccessPrompt,
  AddWalletPrompt,
  MetamaskLoginWarning,
} from "./components/TeleportModal";
import TransferPanel from "./components/TransferPanel";
import TeleportTransaction from "./TeleportTransaction";

const Title = (props) => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      marginBottom={props.marginBottom}
    >
      <Text
        color="#D9A555"
        textTransform="uppercase"
        fontSize="40px"
        fontFamily="Titillium Web"
        marginBottom="16px"
        fontWeight="400"
        letterSpacing="5px"
      >
        teleport
      </Text>
      <Text
        color="#ffffff"
        fontSize="22px"
        fontFamily="Titillium Web"
        fontWeight="500"
        marginBottom="1%"
        textAlign="center"
        whiteSpace={[
          "normal",
          "normal",
          "nowrap",
          "nowrap",
          "nowrap",
          "nowrap",
        ]}
      >
        Transfer your TLM between WAX & Metamask (on ETH or BSC chains)
      </Text>
      <Text
        color={props.isLoggedIn ? "#04D5A7" : "#E7384D"}
        fontSize="15px"
        fontFamily="Titillium Web"
        fontWeight="bold"
        textAlign="center"
      >
        {props.isLoggedIn
          ? "Next, select the chain from which to teleport"
          : "To begin with any teleports, both accounts must be logged in"}
      </Text>
    </Flex>
  );
};

const TwoWayArrowIcon = styled(Flex)<{}>`
  background-image: url(${(props) => TransferTwoWayIcon});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  height: 100px;
  width: 100px;
`;

const fadeIn = keyframes`
  0%{opacity: 0;}
  100%{opacity: 1;}
`;

const injected = new InjectedConnector({ supportedChainIds: [1, 56] });

const Teleport = () => {
  /* eslint-disable */
  const web3 = useRef();
  const ualRef = useRef();
  // @ts-ignore
  web3.current = useWeb3React<Web3Provider>();

  const {
    teleport: {
      isWaxLoggedIn,
      isOtherWalletLoggedIn,
      selectedOtherWallet,
      credential,
    },
  } = useAppState();

  const actions = useActions();
  const state = useAppState();

  const [isShowTransferPrompt, setShowTransferPrompt] = useState(false);
  const [sourceWallet, setSourceWallet] = useState(null);
  const [destinationWallet, setDestinationWallet] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [isShowAddWalletPrompt, setShowAddWalletPrompt] = useState(false);
  const [isPageLoading, setPageLoading] = useState(true);
  const LoginPanelWithUAL = withUAL(LoginPanel);
  const HeaderWithUAL = withUAL(Header);

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

  const chainWax = {
    chainId: config.waxChainId,
    rpcEndpoints: [splitEndpoint(config.waxEndpoint)]
  };
  // @ts-ignore
  const wax = new Wax([chainWax], {appName: "Alien Worlds"});
  const anchor = new Anchor([chainWax], {appName: "Alien Worlds"});

  const switchEthWallet = async (net) => {

    const activeNetwork = config.networks[state.teleport.metamaskChainId];
    if (activeNetwork) {
      if (net !== activeNetwork.className) {
        const {ethereum} = window as any;

        try {
          if (ethereum && ethereum.on) {
            await ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{chainId: net === "binance" ? "0x38" : "0x1"}]
            });
            updateAccountNames();
            animateOtherWallet();
            animateLines();
            actions.teleport.loadTeleports();
            setTimeout(() => changeBackgroundImage(), 1000);
          }
          actions.teleport.setOtherWalletLoggedIn(true)
        } catch (switchError) {
          if (switchError.code === 4902) {
            //IF WALLET DOES NOT EXISTS. SHOW ADD PROMPT.
            setShowAddWalletPrompt(true);
          } else {
            actions.teleport.setMetamaskLocked(false);
            if (!state.teleport.isOtherWalletLoggedIn) {
              actions.teleport.setOtherWalletUnauthenticated();
            }
          }
        }
      }
    }
  }

  const addWallet = async () => {
    const network = state.teleport.selectedOtherWallet;
    const {ethereum} = window as any;
    try {
      if (ethereum && ethereum.on) {
        actions.teleport.setWalletAdded(true);
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: network === "binance" ? "0x38" : "0x1",
            chainName: network === "binance" ? "Binance Smart Chain" : "Ethereum Mainnet",
            nativeCurrency: {
              name: "",
              symbol: network === "binance" ? "BNB" : "ETH",
              decimals: 18
            },
            "rpcUrls": network === "binance" ? ["https://bsc-dataseed.binance.org"] : ["https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
            blockExplorerUrls: network === "binance" ? ["https://bscscan.com"] : ["https://etherscan.io"],
          }]
        });
      }
      actions.teleport.setSelectedLoginWallet(null);
      setShowAddWalletPrompt(false);
    } catch (addError) {
      actions.teleport.setOtherWalletUnauthenticated();
      setShowAddWalletPrompt(false);
      actions.teleport.setWalletAdded(false);
      actions.teleport.setSelectedLoginWallet(null);
    }
  }

  const handleGoToDashboardClick = () => {
    setShowDashboard(true);
    actions.teleport.setApproved(false);

    animateGradientsForDashboard();
    animateLines();
    changeBackgroundImage("Transactions");
  }

  const handleGoToMain = () => {
    setShowDashboard(false);

    const gradwax1 = document.getElementsByClassName("gradwax1");
    if (gradwax1) {
      gradwax1[0].className = gradwax1[0].className.replace(" isdashboard", "");
    }
    const gradwax2 = document.getElementsByClassName("gradwax2");
    if (gradwax2) {
      gradwax2[0].className = gradwax2[0].className.replace(" isdashboard", "");
    }
    const gradother1 = document.getElementsByClassName("gradother1");
    if (gradother1) {
      gradother1[0].className = gradother1[0].className.replace(" isdashboard", "");
    }
    const gradother2 = document.getElementsByClassName("gradother2");
    if (gradother2) {
      gradother2[0].className = gradother2[0].className.replace(" isdashboard", "");
    }
    animateLines();
    changeBackgroundImage();
  }

  const updateAccountNames = () => {
    const xtruncate = (str, n) => {
      return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    };

    const truncate = (str) => {
      return str?.length > 10 ? str.substr(0, 6) + "..." + str.slice(-4) : str;
    }
  }

  const login = async (network) => {
    // @ts-ignore
    await actions.teleport.login({network, web3});

    actions.teleport.setSelectedLoginWallet(null);

    if (network === "wax") {
      actions.teleport.setSelectedLoginWallet(null);
      updateAccountNames();

      animateGradientsLoggedInWallet();
      animateLines();
    } else {

      // @ts-ignore
      actions.teleport.isCorrectNetwork(web3).then(next => {
        if (next) {
          actions.teleport.setOtherWalletLoggedIn(true);
          actions.teleport.loadTeleports();
          updateAccountNames();
          animateOtherWallet();
          animateLines();
          changeBackgroundImage();
        } else {
          switchEthWallet(network);
        }
      })
    }

    /*
        let tlm20 = null;
        if (network === "ethereum") {
          tlm20 = new ethers.Contract(erc20Address, erc20ABI, library);
          tlm20.balanceOf(account).then((res: BigNumber) => {
            console.log('ETHEREUM', ethers.utils.formatEther(res.toString()))
          })
        } else if (network === "binance") {
          tlm20 = new ethers.Contract(bep20Address, bep20ABI, library);
          tlm20.balanceOf(account).then((res: BigNumber) => {
            console.log('BINANCE', ethers.utils.formatEther(res.toString()))
          })
        }
    */

    /*
        // @ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const bal = await signer.getBalance()

        console.log('%%%%%%%%%%%%%%%%%%teleport 601',);
    */

  };

  const loginMetamask = async (network) => {
    // @ts-ignore
    await actions.teleport.loginMetamask({network});

    actions.teleport.setSelectedLoginWallet(null);

    // @ts-ignore
    actions.teleport.isCorrectNetwork().then(next => {
      if (next) {
        actions.teleport.setOtherWalletLoggedIn(true);
        actions.teleport.loadTeleports();
        updateAccountNames();
        animateOtherWallet();
        animateLines();
        changeBackgroundImage();
      } else {
        switchEthWallet(network);
      }
    })
  }

  const changeBackgroundImage = (page?) => {
    if (page === "Transactions") {
      actions.teleport.setSelectedBackgroundImage("alienworlds-ui-teleport-transactions.jpg");
      return;
    }

    if (state.teleport.account) {
      if (state.teleport.account["wax"] && state.teleport.account["wax"].name && state.teleport.account["wax"].activeAuthenticatorName === "WAX") {
        //wax
        if (state.teleport.account["binance"] && state.teleport.account["binance"].name) {
          actions.teleport.setSelectedBackgroundImage("alienworlds-ui-teleport-connected-wax-binance.jpg");
        } else if (state.teleport.account["ethereum"] && state.teleport.account["ethereum"].name) {
          actions.teleport.setSelectedBackgroundImage("alienworlds-ui-teleport-connected-wax-eth.jpg");
        }
      } else if (state.teleport.account["wax"] && state.teleport.account["wax"].name && state.teleport.account["wax"].activeAuthenticatorName === "Anchor") {
        //anchor
        if (state.teleport.account["binance"] && state.teleport.account["binance"].name) {
          actions.teleport.setSelectedBackgroundImage("alienworlds-ui-teleport-connected-anchor-binance.jpg");
        } else if (state.teleport.account["ethereum"] && state.teleport.account["ethereum"].name) {
          actions.teleport.setSelectedBackgroundImage("alienworlds-ui-teleport-connected-anchor-eth.jpg");
        }
      } else {
        actions.teleport.setSelectedBackgroundImage("alienworlds-ui-teleport-logins.jpg");
      }
    }
  }

  const animateGradientsLoggedInWallet = () => {
    const grad1 = document.getElementsByClassName("gradwax1");
    if (grad1) {
      grad1[0].className += " waxlog";
    }
    const grad2 = document.getElementsByClassName("gradwax2");
    if (grad2) {
      grad2[0].className += " waxlog";
    }
  }

  const animateGradientsForDashboard = () => {
    const gradwax1 = document.getElementsByClassName("gradwax1");
    if (gradwax1) {
      gradwax1[0].className += " isdashboard";
    }
    const gradwax2 = document.getElementsByClassName("gradwax2");
    if (gradwax2) {
      gradwax2[0].className += " isdashboard";
    }
    const gradother1 = document.getElementsByClassName("gradother1");
    if (gradother1) {
      gradother1[0].className += " isdashboard";
    }
    const gradother2 = document.getElementsByClassName("gradother2");
    if (gradother2) {
      gradother2[0].className += " isdashboard";
    }
  }

  const animateGradientsLoggedOutWallet = () => {
    const grad1 = document.querySelector(".gradwax1");
    if (grad1) {
      grad1.classList.remove("waxlog");
    }
    const grad2 = document.querySelector(".gradwax2");
    if (grad2) {
      grad2.classList.remove("waxlog");
    }
  }

  const animateLines = () => {
    const lineControls = document.getElementsByClassName("teleport-line-controls");
    if (lineControls && lineControls[0]) {
      // @ts-ignore
      lineControls[0].style.left = `${_random(-50, -20)}%`;
      // @ts-ignore
      lineControls[0].style.top = `${_random(-50, 0)}%`;
      // @ts-ignore
      lineControls[0].style.transitionDuration = `${_random(0.3, 1.0)}s`;
      // @ts-ignore
      lineControls[0].style.transitionDelay = "0.1s";
    }

    const rombControls = document.getElementsByClassName("teleport-romb-controls");
    if (rombControls && rombControls[0]) {
      // @ts-ignore
      rombControls[0].style.left = `${_random(-50, -20)}%`;
      // @ts-ignore
      rombControls[0].style.top = `${_random(-50, -10)}%`;
      // @ts-ignore
      rombControls[0].style.transitionDuration = `${_random(0.45, 1.0)}s`;
      // @ts-ignore
      rombControls[0].style.transitionDelay = "0.2s";
    }

  }

  const animateOtherWallet = () => {
    const grad1 = document.getElementsByClassName("gradother1");
    if (grad1 && grad1[0]) {
      grad1[0].className += " otherlog";
    }
    const grad2 = document.getElementsByClassName("gradother2");
    if (grad2 && grad2[0]) {
      grad2[0].className += " otherlog";
    }
  }

  const handleClaim = (selectedItem) => {
    // @ts-ignore
    actions.teleport.claim({selectedItem});
  }

  const handleCancelClaim = (selectedItem) => {
    actions.teleport.cancelClaim({selectedItem, ualRef});
  }

  const handleStake = (teleportId) => {
    //TODO
  }

  const handleEthereum = () => {
    // @ts-ignore
    const {ethereum} = window;

    if (ethereum && ethereum.isMetaMask) {
      const handleConnect = () => {
        console.log("= Teleport Handling 'connect' event");
      }
      const handleNetworkChanged = async (networkId: string | number) => {
        console.log("= Teleport Handling 'networkChanged' event with payload", networkId, state.teleport.isWalletAdded, state.teleport.isOtherWalletLoggedIn);
        // ORIG await actions.teleport.setNetwork({networkId, web3});
        await actions.teleport.resetLoadedTeleportCount();

        if (state.teleport.isWalletAdded && !state.teleport.isOtherWalletLoggedIn) {
          const selNet = await config.networks[networkId]
          if (selNet && selNet.className) {
            await loginMetamask(selNet.className);
            setShowAddWalletPrompt(null)
            actions.teleport.setWalletAdded(false);
            console.log('Login from network changed')
          }
        }
        updateAccountNames();
      }

      const handleAccountsChanged = async (accounts: string[]) => {
        console.log("= Teleport Handling 'accountsChanged' event with payload", accounts);
        if (accounts && accounts.length > 0) {
          // @ts-ignore
          await actions.teleport.setAccount(accounts);
        }
        ;
        updateAccountNames();
      }

      const handleChainChanged = (chainId: string | number) => {
        console.log("= Teleport Handling 'chainChanged' event with payload", chainId);
      }

      ethereum.on('connect', handleConnect);
      ethereum.on('networkChanged', handleNetworkChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('chainChanged', handleChainChanged);
    } else {
      // alert("Please install MetaMask!");
      //TODO
    }

  }

  useEffect(() => {
    animateLines();

    updateAccountNames();

    /**
     * Start of alienworlds Zendesk Widget script
     */
    const script = document.createElement("script");
    script.id = "ze-snippet";
    script.src = "https://static.zdassets.com/ekr/snippet.js?key=73b830be-500f-40a4-bc34-1439b79b3164";
    script.async = true;
    document.body.appendChild(script);
    /**
     * End of alienworlds Zendesk Widget script
     */
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setPageLoading(false);
      changeBackgroundImage();
    }, 3000);

    if (state.teleport.errorModal) {
      actions.teleport.setApproved(false);
    }
    if (state.teleport.successModal) {
      actions.teleport.setApproved(false);
    }
  }, [state.teleport.errorModal, state.teleport.successModal])

  const handleNavigation = () => {
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop || window.scrollY;
    const el = document.getElementById("teleport-header");
    if (scrollTop > 2) {
      if (el) {
        el.classList.add("scrolling")
      }
    } else {
      if (el) {
        el.classList.remove("scrolling");
      }
    }
  }

  useEffect(() => {
    const scrollTop = window.scrollY || document.body.scrollTop || document.documentElement.scrollTop;
    window.addEventListener("scroll", handleNavigation);

    return () => {
      window.removeEventListener("scroll", handleNavigation);
    };
  }, [handleNavigation]);

  useEffect(() => {
    (async () => {

      const { metamaskChainId } = state.teleport;
      if (metamaskChainId) {
        if (config.networks[metamaskChainId] && config.networks[metamaskChainId].className) {
          await actions.teleport.setSelectedOtherWallet(config.networks[metamaskChainId].className);
        }
      }

      await actions.teleport.setNetwork(state.teleport.metamaskChainId);
      await actions.teleport.resetLoadedTeleportCount();
      if (state.teleport.isWalletAdded && !state.teleport.isOtherWalletLoggedIn) {
        const selNet = await config.networks[state.teleport.metamaskChainId];
        if (selNet && selNet.className) {
          await loginMetamask(selNet.className);
          setShowAddWalletPrompt(null)
          actions.teleport.setWalletAdded(false);
          console.log('Login from network changed')
        }
      }

      updateAccountNames();
    })();
  }, [state.teleport.metamaskChainId]);

  useEffect(() => {
    (async () => {
      if (state.teleport.metamaskAccount && state.teleport.metamaskAccount.length > 0) {
        // @ts-ignore
        await actions.teleport.setAccount([state.teleport.metamaskAccount]);
      }
      ;
      updateAccountNames();
    })();
  }, [state.teleport.metamaskAccount]);

  useEffect(() => {
    // added 01-11-2022
    (async () => {
      if (state.teleport.isOtherWalletLoggedIn) {
        // @ts-ignore
        const networkName = await state.teleport.metamaskActiveNetwork && state.teleport.metamaskActiveNetwork.className;
        await loginMetamask(networkName);
      }
    })();
  }, [state.teleport.isOtherWalletLoggedIn])

  useEffect(() => {
    if (state.teleport.isApproved) {
      setShowTransferPrompt(false);
    }

  }, [state.teleport.isApproved, state.teleport.isTransferring]);

  return (
      <UALProvider
          appName='Alien Worlds WAX Authenticator'
          authenticators={[wax, anchor]}
          chains={[chainWax]}
          key={config.waxChainId}
      >
        <PageLoader isLoading={isPageLoading}/>
        <Background/>
        <HeaderWithUAL web3={web3} handleLogout={() => {
          actions.teleport.setUAL(null);
          ualRef.current = null;

          animateGradientsLoggedOutWallet();
          animateLines();
          changeBackgroundImage();
        }}
        />
        <motion.div
            initial={{y: -100, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            exit={{y: 100, opacity: 0, transition: {duration: 0.15}}}
            transition={{duration: 0.3, delay: 0.3}}
        >
          <AnimatePresence>
            {
              showDashboard && (
                  <motion.div
                      initial={{y: -100, opacity: 0}}
                      animate={{y: 0, opacity: 1}}
                      exit={{y: 100, opacity: 0, transition: {duration: 0.3}}}
                      transition={{duration: 0.3}}
                  >
                    <Flex>
                      <TeleportTransaction
                          web3={web3}
                          gotoMainClick={async () => {
                            handleGoToMain();
                            // @ts-ignore
                            await actions.teleport.updateTLMsBalance({web3, ualRef});
                          }}
                          claim={handleClaim}
                          stake={handleStake}
                          handleSwitchNetwork={switchEthWallet}
                          cancelClaim={handleCancelClaim}
                      />
                    </Flex>
                  </motion.div>
              )
            }
          </AnimatePresence>

          <AnimatePresence>
            {
              !isPageLoading && !showDashboard && (
                  <motion.div
                      initial={{y: -100, opacity: 0}}
                      animate={{y: 0, opacity: 1}}
                      exit={{y: 100, opacity: 0, transition: {duration: 0.3}}}
                      transition={{duration: 0.3, delay: 0.3}}
                  >
                    <Flex
                        direction="column"
                        zIndex={2}
                        height={["auto", "auto", "auto", "100vh", "100vh", "100vh"]}
                        justifyContent={'center'}
                        marginBottom={["3%", "3%", "3%", "0", "0", "0"]}
                    >
                      <Box className="teleport-alienworlds-logo-main"
                           marginBottom='2%'
                           marginTop={["15%", "15%", "15%", "1%", "1%", "1%"]}
                      />
                      <Title
                          marginBottom="20px"
                          isLoggedIn={isWaxLoggedIn && isOtherWalletLoggedIn}
                          display={["none", "none", "none", "block", "block", "block"]}
                      />
                      <Flex
                          direction={["column", "column", "column", "row", "row", "row"]}
                          justifyContent="center"
                          alignItems="center"
                      >
                        <Box width="278px">
                          {
                            isWaxLoggedIn ? (
                                <TransferPanel
                                    panel="wax"
                                    walletName={selectedOtherWallet}
                                    locked={!isWaxLoggedIn || !isOtherWalletLoggedIn || state.teleport.isLocked}
                                    otherWalletInfo={selectedOtherWallet}
                                    handleTransferClick={() => {
                                      setSourceWallet(state.teleport.account.wax);
                                      setDestinationWallet(state.teleport.account[state.teleport.selectedOtherWallet]);
                                      setShowTransferPrompt(true);
                                    }}
                                    isMobile={isMobile.any()}
                                />
                            ) : (
                                <LoginPanelWithUAL
                                    panel="wax"
                                    walletName="wax"
                                    handleOpenLoginPromptClick={(ual) => {
                                      ual.showModal();
                                    }}
                                    locked={state.teleport.isLocked}
                                    setUAL={async (ual) => {
                                      ualRef.current = ual;
                                      await actions.teleport.setUAL(ual);

                                      animateGradientsLoggedInWallet();
                                      animateLines();
                                      updateAccountNames();
                                      changeBackgroundImage();
                                    }}
                                    ualRef={ualRef}
                                />
                            )
                          }
                        </Box>
                        <Box width="231px" alignItems="center">
                          <Flex justifyContent="center" alignItems="center" width="100%">
                            <TwoWayArrowIcon
                                marginTop={["27px", "27px", "27px", "0", "0", "0"]}
                                marginBottom={["27px", "27px", "27px", "0", "0", "0"]}
                                transform={[
                                  "rotate(90deg)",
                                  "rotate(90deg)",
                                  "rotate(90deg)",
                                  "rotate(0deg)",
                                  "rotate(0deg)",
                                  "rotate(0deg)",
                                ]}
                            />
                          </Flex>
                        </Box>
                        <Box width="278px">
                          {
                            isOtherWalletLoggedIn ? state.teleport.errorMessage || !state.teleport.metamaskActiveNetwork ? <Text fontSize="15px" color="#E7384D" fontWeight="700">{state.teleport.errorMessage}</Text> : (
                                <TransferPanel
                                    panel={state.teleport.selectedOtherWallet}
                                    walletName={selectedOtherWallet}
                                    locked={!isWaxLoggedIn || !isOtherWalletLoggedIn || state.teleport.isMetamaskLocked}
                                    web3={web3.current}
                                    handleTransferClick={() => {
                                      setSourceWallet(state.teleport.account[state.teleport.selectedOtherWallet]);
                                      setDestinationWallet(state.teleport.account.wax);
                                      setShowTransferPrompt(true);
                                    }}
                                    switch={(network) => {
                                      switchEthWallet(network);
                                    }}
                                    marginTop="30px"
                                    isMobile={isMobile.any()}
                                />
                            ) : state.teleport.metamaskChainId ? (
                               <LoginPanelChooseMetamask
                                   panel="other"
                                   wallet="other"
                                   handleOpenLoginPromptClick={() => {
                                     actions.teleport.setSelectedLoginWallet("other");
                                   }}
                                   locked={state.teleport.isMetamaskLocked}
                               />
                            ) : (
                                <LoginPanel
                                    panel="other"
                                    wallet="other"
                                    locked={state.teleport.isMetamaskLocked}
                                />
                            )
                          }

                        </Box>
                      </Flex>

                      {isWaxLoggedIn && isOtherWalletLoggedIn ? (
                          <Flex justifyContent="center" marginTop="46px">
                            <Button
                                width="150px"
                                height="46px"
                                minWidth="139px"
                                minHeight="46px"
                                fontFamily="Orbitron"
                                fontSize="14px"
                                letterSpacing="1px"
                                color="#ffffff"
                                fontWeight="400"
                                borderRadius="0"
                                marginBottom="23px"
                                borderColor="#ffffff"
                                borderStyle="solid"
                                borderWidth="2px"
                                backgroundColor="transparent"
                                _focus={{outline: 0}}
                                _hover={{
                                  backgroundColor: "#ffffff",
                                  color: "#000000",
                                  transform: "scale(0.95)",
                                  transition: "0.3s",
                                }}
                                onClick={handleGoToDashboardClick}
                            >
                              Transactions
                            </Button>
                          </Flex>
                      ) : null}
                      {
                        state.teleport.selectedLoginWallet ?
                            state.teleport.selectedLoginWallet === "wax" ? (
                                null
                            ) : (
                                <TeleportModal>
                                  <LoginOtherPrompt
                                      selectedNetwork={state.teleport.selectedOtherWallet}
                                      handleCloseAddWalletPrompt={() => {
                                        setShowAddWalletPrompt(false);
                                        actions.teleport.setSelectedLoginWallet(null);
                                      }}
                                      handleAddWallet={addWallet}

                                      isShowWalletPrompt={isShowAddWalletPrompt}
                                      handleCancelClick={() => {
                                        actions.teleport.setSelectedLoginWallet(null);
                                      }}
                                      handleOkClick={(network) => {
                                        loginMetamask(network);
                                      }}
                                  />
                                </TeleportModal>
                            )
                            : null
                      }

                      {isWaxLoggedIn &&
                      isOtherWalletLoggedIn &&
                      sourceWallet &&
                      destinationWallet &&
                      isShowTransferPrompt ? (
                          <TeleportModal>
                            <Box>
                              <TransferPrompt
                                  source={sourceWallet}
                                  destination={destinationWallet}
                                  handleCancelClick={() => {
                                    setShowTransferPrompt(false);
                                  }}
                                  handleAmountToTransfer={(val) =>
                                      actions.teleport.setAmountToTransfer(val)
                                  }
                                  handleApproveClick={async (quantity) => {
                                    actions.teleport.transfer({sourceWallet, destinationWallet, quantity, web3, ualRef});
                                  }}
                                  locked={state.teleport.isTransferring}
                              />
                            </Box>
                          </TeleportModal>
                      ) : null}

                      {state.teleport.isApproved ? (
                          <TeleportModal>
                            <Box>
                              <TransferPromptApproved
                                  source={sourceWallet}
                                  destination={destinationWallet}
                                  amountToTransfer={state.teleport.amountToTransfer}
                                  refHandleGoToDashboardClick={handleGoToDashboardClick}
                                  web3={web3}
                              />
                            </Box>
                          </TeleportModal>
                      ) : null}

                      {
                        state.teleport.errorModal ? (
                            <TeleportModal>
                              <ErrorPrompt>
                                <Flex direction={'column'} alignItems={'center'}>
                                  <Text fontFamily={'Titillium Web'} fontSize={'23px'} textAlign={'center'}>{state.teleport.errorModal}</Text>
                                  <Button
                                      height="46px"
                                      width={'92px'}
                                      minWidth={'92px'}
                                      fontFamily="Orbitron"
                                      fontSize="14px"
                                      letterSpacing="1px"
                                      color="#ffffff"
                                      fontWeight="500"
                                      textTransform="uppercase"
                                      borderRadius="0"
                                      borderColor="#ffffff"
                                      borderStyle="solid"
                                      borderWidth="2px"
                                      backgroundColor="transparent"
                                      marginTop={'46px'}
                                      _focus={{outline: 0}}
                                      _hover={{
                                        backgroundColor: "#ffffff",
                                        color: "#000000",
                                        borderColor: "#ffffff",
                                        borderStyle: "solid",
                                        borderWidth: "2px",
                                        transform: "scale(0.95)",
                                        transition: "0.3s",
                                      }}
                                      onClick={() => {
                                        actions.teleport.setErrorModal(null);
                                      }}
                                  >
                                    OK
                                  </Button>
                                </Flex>
                              </ErrorPrompt>
                            </TeleportModal>
                        ) : null
                      }

                      {
                        state.teleport.successModal ? (
                            <TeleportModal>
                              <SuccessPrompt>
                                <Flex direction={'column'} alignItems={'center'}>
                                  <Text fontFamily={'Titillium Web'} fontSize={'23px'} textAlign={'center'}>{state.teleport.successModal}</Text>
                                  <Button
                                      height="46px"
                                      width={'92px'}
                                      minWidth={'92px'}
                                      fontFamily="Orbitron"
                                      fontSize="14px"
                                      letterSpacing="1px"
                                      color="#ffffff"
                                      fontWeight="500"
                                      textTransform="uppercase"
                                      borderRadius="0"
                                      borderColor="#ffffff"
                                      borderStyle="solid"
                                      borderWidth="2px"
                                      backgroundColor="transparent"
                                      marginTop={'46px'}
                                      _focus={{outline: 0}}
                                      _hover={{
                                        backgroundColor: "#ffffff",
                                        color: "#000000",
                                        borderColor: "#ffffff",
                                        borderStyle: "solid",
                                        borderWidth: "2px",
                                        transform: "scale(0.95)",
                                        transition: "0.3s",
                                      }}
                                      onClick={async () => {
                                        await setShowTransferPrompt(false);
                                        await actions.teleport.setSuccessModal(null);
                                        handleGoToDashboardClick();
                                      }}
                                  >
                                    OK
                                  </Button>
                                </Flex>
                              </SuccessPrompt>
                            </TeleportModal>
                        ) : null
                      }

                      {
                        isShowAddWalletPrompt ? (
                            <TeleportModal>
                              <AddWalletPrompt
                                  selectedNetwork={state.teleport.selectedOtherWallet}
                                  handleCloseClick={() => {
                                    setShowAddWalletPrompt(false);
                                  }}
                                  handleAddWalletClick={addWallet}
                              />
                            </TeleportModal>
                        ) : null
                      }

                      {
                        state.teleport.isShowMetamaskLoginMessage ? (
                            <TeleportModal>
                              <MetamaskLoginWarning/>
                            </TeleportModal>
                        ) : null
                      }
                    </Flex>
                  </motion.div>
              )
            }
          </AnimatePresence>
        </motion.div>
      </UALProvider>
  );
};

const isMobile = {
  Android: function() {
    return navigator.userAgent.match(/Android/i)
  },
  BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i)
  },
  iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i)
  },
  Opera: function() {
    return navigator.userAgent.match(/Opera Mini/i)
  },
  Windows: function() {
    return navigator.userAgent.match(/IEMobile/i)
  },
  any: function() {
    return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
    )
  },
}

export default Teleport;

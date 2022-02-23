import React, { useRef, useEffect } from "react";

import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { css } from "@emotion/react";
import AlienWorldLogoFull from "assets/images/alienworlds-db-logo_full_color.svg";
import { AnimatePresence, motion } from "framer-motion";
import { useAppState, useActions } from "store";
import { withUAL } from "ual-reactjs-renderer";

const MotionBox = motion(Box);

const Background = () => {
  const {
    teleport: { selectedBackgroundImage },
  } = useAppState();

  return (
    <Box position="fixed" overflow="hidden" width="100%" height="100%">
      <MotionBox
        key={selectedBackgroundImage}
        position="absolute"
        overflow="hidden"
        inset={0}
        pointerEvents="none"
        css={css`
          background-image: url(/images/bg/${selectedBackgroundImage});
          background-repeat: no-repeat;
          background-size: cover;
          height: 100vh;
          width: 100vw;
        `}
        initial={{ opacity: 0, translateY: 250, scale: 1.5 }}
        animate={{
          opacity: 1,
          translateY: 0,
          scale: 1,
          transition: { delay: 0.1, duration: 1.5 },
        }}
        exit={{ opacity: 0, transition: { duration: 1.5 } }}
      />
      <MotionBox
        className="teleport-romb-controls"
        position="fixed"
        overflow="hidden"
        pointerEvents="none"
        css={css`
          background-image: url("/images/bg/alienworlds-bg-grid.svg");
          background-position: 50%;
          background-repeat: no-repeat;
          background-size: cover;
          height: 175vw;
          left: -50%;
          top: -50%;
          width: 175vw;
        `}
      />
      <MotionBox
        className="teleport-line-controls"
        position="fixed"
        overflow="hidden"
        pointerEvents="none"
        css={css`
          background-image: url("/images/bg/alienworlds-bg-lines.svg");
          background-position: 50%;
          background-repeat: no-repeat;
          background-size: cover;
          height: 200%;
          left: -50%;
          top: -50%;
          width: 200%;
        `}
      />
      <div className="gradients grad1" />
      <div className="gradients grad2" />
      <div className="gradients gradwax1" />
      <div className="gradients gradwax2" />
      <div className="gradients gradother1" />
      <div className="gradients gradother2" />
    </Box>
  );
};

const Header = (props) => {
  /* eslint-disable */

  const state = useAppState();
  const actions = useActions();
  const refLogout = useRef();
  const refWaxIcon = useRef();
  const refWaxId = useRef();
  const refVertLineAllLoggedIn = useRef();
  const refMetamaskIcon = useRef();
  const refEthId = useRef();
  const refEthIcon = useRef();
  const activeAuthenticatorName = state.teleport.account && state.teleport.account["wax"] ? (state.teleport.account["wax"].activeAuthenticatorName || "") : "";

  const truncate = (str) => {
    return str?.length > 10 ? `${str.substr(0, 6)}...${str.slice(-4)}` : str;
  };

  useEffect(() => {
    if (props.ual && props.ual.activeUser) {
      if (refLogout) {
        // @ts-ignore
        refLogout.current.style.display = "flex";
      }
      if (refWaxIcon) {
        // @ts-ignore
        refWaxIcon.current.style.display = "block";
      }
      if (refWaxId) {
        // @ts-ignore
        refWaxId.current.innerHTML = state.teleport.account.wax.name || "";
      }
    } else {
      if (refLogout) {
        // @ts-ignore
        refLogout.current.style.display = "none";
      }
      if (refWaxIcon) {
        // @ts-ignore
        refWaxIcon.current.style.display = "none";
      }
      if (refWaxId) {
        // @ts-ignore
        refWaxId.current.innerHTML = "";
      }
    }

    if (
      state.teleport.metamaskChainId &&
      state.teleport.account[state.teleport.selectedOtherWallet]
    ) {
      if (refMetamaskIcon) {
        // @ts-ignore
        refMetamaskIcon.current.style.display = "block";
      }
      if (refEthId) {
          const ethId = state.teleport.metamaskAccount || null;
        // @ts-ignore
        refEthId.current.innerHTML = truncate(ethId);
      }
      if (refEthIcon) {
          if (state.teleport.selectedOtherWallet === "ethereum") {
              // @ts-ignore
              refEthIcon.current.classList.remove("teleport-binance-icon");
              // @ts-ignore
              refEthIcon.current.classList.add("teleport-ethereum-icon");
          } else if (state.teleport.selectedOtherWallet === "binance") {
              // @ts-ignore
              refEthIcon.current.classList.remove("teleport-ethereum-icon");
              // @ts-ignore
              refEthIcon.current.classList.add("teleport-binance-icon");
          } else {
              // @ts-ignore
              refEthIcon.current.classList.remove("teleport-ethereum-icon");
              // @ts-ignore
              refEthIcon.current.classList.remove("teleport-binance-icon");
          }
      }
    } else {
        if (refMetamaskIcon) {
            // @ts-ignore
            refMetamaskIcon.current.style.display = "none";
        }
        if (refEthId) {
            // @ts-ignore
            refEthId.current.innerHTML = "";
        }
        if (refEthIcon) {
            // @ts-ignore
            refEthIcon.current.classList.remove("teleport-binance-icon");
            // @ts-ignore
            refEthIcon.current.classList.remove("teleport-ethereum-icon");
        }
    }

      if (state.teleport.isWaxLoggedIn && state.teleport.isOtherWalletLoggedIn) {
          if (refVertLineAllLoggedIn) {
              // @ts-ignore
              refVertLineAllLoggedIn.current.style.display = "block";
          }
      } else {
          if (refVertLineAllLoggedIn) {
              // @ts-ignore
              refVertLineAllLoggedIn.current.style.display = "none";
          }
      }

  }, [state.teleport.metamaskAccount]);

    return (
    <Flex
      id="teleport-header"
      height="84px"
      direction={[
        // "column-reverse",
        // "column-reverse",
        // "column-reverse",
        "column",
        "column",
        "column",
        "row",
        "row",
        "row",
      ]}
    >
      <Flex
        width="100%"
        height="100%"
        alignItems="center"
        justifyContent={[
          "center",
          "center",
          "center",
          "flex-start",
          "flex-start",
          "flex-start",
        ]}
      >
        <Box
          ref={refLogout}
          className="teleport-logout"
          marginLeft="30px"
          onClick={() => {
            if (props.ual) {
              props.ual.logout();
              props.handleLogout();
            }
          }}
        />
          {
              activeAuthenticatorName.toLowerCase() === "wax"
                  ? <Box ref={refWaxIcon} className="teleport-wax-icon" marginLeft="20px" />
                  : <Box ref={refWaxIcon} className="teleport-anchor-icon" marginLeft="20px" />
          }
        <Box ref={refWaxId} className="teleport-wax-id" />
        <Box
          ref={refVertLineAllLoggedIn}
          className="teleport-header-vertical-line all-logged-in"
        />
        <Box ref={refMetamaskIcon} className="teleport-metamask-icon" />
        <Box ref={refEthId} className="teleport-eth-id" />
        <Box ref={refEthIcon} className="teleport-eth-icon" />
      </Flex>
      <Flex
        width="100%"
        height={["50%", "100%", "100%", "100%"]}
        justifyContent={[
          "center",
          "center",
          "center",
          "flex-end",
          "flex-end",
          "flex-end",
        ]}
        alignItems="center"
        display={["none", "none", "none", "flex", "flex", "flex"]}
      >
        <Box
          className="teleport-alienworlds-icon"
          display={["none", "none", "none", "block", "block", "block"]}
        />
        <Box
          className="teleport-header-vertical-line"
          display={["none", "none", "none", "block", "block", "block"]}
        />
        <Box
          fontSize="16px"
          fontWeight="700"
          letterSpacing="2px"
          marginRight="30px"
          display={["none", "none", "none", "block", "block", "block"]}
        >
          TELEPORT
        </Box>
      </Flex>
    </Flex>
  );
};

const PageLoader = ({ isLoading }) => (
  <AnimatePresence>
    {isLoading && (
      <motion.div
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#2c2c2c",
          zIndex: 100,
          position: "absolute",
        }}
      >
        <Flex
          width="100%"
          height="100%"
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Image
            src={AlienWorldLogoFull}
            height="80px"
            marginBottom="30px"
            pointerEvents="none"
          />
          <Text className="loading-text">LOADING TELEPORT</Text>
        </Flex>
      </motion.div>
    )}
  </AnimatePresence>
);

export { Background, Header, PageLoader };

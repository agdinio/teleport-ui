import React, { useEffect, useRef } from "react";

import { Flex, Text, Button, Image, Box } from "@chakra-ui/react";
import styled from "@emotion/styled/macro";
import { Wax } from "@eosdacio/ual-wax/dist";
import AnchorIconWhite from "assets/images/alienworlds-db-logo-anchor-white.svg";
import WaxIconWhite from "assets/images/alienworlds-db-logo-wax-white.svg";
import MetamaskIcon from "assets/images/alienworlds-logo-metamask.svg";
import BinanceIcon from "assets/images/alienworlds-teleport-logo-binance.svg";
import EthereumIcon from "assets/images/alienworlds-teleport-logo-ethereum.svg";
import { useActions } from "store";

import { metamaskSigninModal } from "../hooks/metamaskSigninModal";
import { useMetamaskSignin } from "../hooks/useMetamaskSignin";

const MetamaskLogo = styled(Flex)<{}>`
  background-image: url(${(props) => MetamaskIcon});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  height: 100%;
  width: 250px;
`;

const WaxLogo = styled(Flex)<{}>`
  background-image: url(${(props) => WaxIconWhite});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 80%;
  height: 100%;
  width: 250px;
`;

const WaxLogos = () => {
  return (
    <Flex
      direction={["column", "column", "column", "row", "row", "row"]}
      alignItems="center"
      width="100%"
      height="100%"
    >
      <Image
        src={WaxIconWhite}
        width="200px"
        height="100%"
        marginBottom={["-20px", "-20px", "-20px", "0", "0", "0"]}
      />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Image src={AnchorIconWhite} height="100%" />
    </Flex>
  );
};

const OtherLogo = styled(Flex)<{}>`
  height: 100%;
  justify-content: space-between;
  width: 100%;
  &:before {
    background-image: url(${(props) => EthereumIcon});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    content: "";
    height: 100%;
    width: 100%;
  }

  &:after {
    background-image: url(${(props) => BinanceIcon});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    content: "";
    height: 100%;
    width: 100%;
  }
`;
const LoginPanel = (props) => {
  const actions = useActions();
  const { signInToMetamask } = metamaskSigninModal();
  /* eslint-disable */
    const showWarningMessageClick = () => {
        actions.teleport.setShowMetamaskLoginMessage(true);
        setTimeout(() => actions.teleport.setShowMetamaskLoginMessage(false), 5000);
        signInToMetamask();
    }

    useEffect(() => {
        const mainbtncont = document.getElementsByClassName("mainbtncont");
        if (mainbtncont) {
            if (props.locked) {
                if (mainbtncont[0]) {
                    mainbtncont[0].className += " disabled";
                }
                if (mainbtncont[1]) {
                    mainbtncont[1].className += " disabled";
                }
            } else {
                if (mainbtncont[0]) {
                    mainbtncont[0].className = mainbtncont[0].className.replace(/ disabled/g,"");
                }
                if (mainbtncont[1]) {
                    mainbtncont[1].className = mainbtncont[1].className.replace(/ disabled/g,"");
                }
            }
        }

        try {
            if (props.ual.activeUser) {
                props.setUAL(props.ual);
            }
        } catch (e) {}

    }, [props.locked,props.ual])

    let bottomText = null;
    if (props.panel === 'wax') {
        bottomText = (
            <Flex direction="row">
                <Text fontSize="15px" color="#ffffff" fontWeight="700">
                    WAX&nbsp;
                </Text>
                <Text fontSize="15px" color="#ffffff" fontWeight="700" textDecoration="underline">
                    or
                </Text>
                <Text fontSize="15px" color="#ffffff" fontWeight="700">
                    &nbsp;Anchor
                </Text>
            </Flex>
        );
    } else {
        bottomText = (
            <Flex direction="row">
                <Text fontSize="15px" color="#ffffff" fontWeight="700">
                    Ethereum&nbsp;
                </Text>
                <Text
                    fontSize="15px"
                    color="#ffffff"
                    fontWeight="700"
                    textDecoration="underline"
                >
                    or
                </Text>
                <Text fontSize="15px" color="#ffffff" fontWeight="700">
                    &nbsp;Binance
                </Text>
            </Flex>
        );
    }

    if (props.panel !== "wax") {
        return (
            <Flex direction="column" alignItems="center" marginTop="40px">
                <Flex
                    width="100%"
                    height="83px"
                    position="relative"
                    justifyContent="center"
                    alignItems="center"
                    marginBottom="37px"
                >
                    <MetamaskLogo/>
                </Flex>

                <Box
                    marginBottom="10px"
                    className="mainbtncont orange"
                    // onClick={props.locked ? null : useMetamaskSignin()}
                    // onClick={props.locked ? null : metamaskSigninModal()}
                    onClick={showWarningMessageClick}
                >
                    <div className="mainbtnwrap">
                        <div className="mainbtn"><div style={{ zIndex: 3 }}>Connect to MetaMask</div></div>
                    </div>
                </Box>
                <Flex direction="row" alignItems="center" marginBottom="10px">
                    {bottomText}
                    <Image src={EthereumIcon} height={'35px'} marginLeft="10px"/>
                    <Image src={BinanceIcon} height={'35px'} marginLeft="5px"/>
                </Flex>
                <Flex direction="row">
                    <Text fontSize="15px" color="#999999" fontWeight="700">
                        Need help?&nbsp;
                    </Text>
                    <Text
                        fontSize="15px"
                        color="#999999"
                        fontWeight="700"
                        textDecoration="underline"
                        cursor="pointer"
                        onClick={() => {
                            window.open("https://alienworlds.zendesk.com/hc/en-us/articles/1500012387282-How-do-I-Teleport-Trilium-TLM-tokens-between-WAX-and-ETH-or-BSC-", "_blank");
                        }}
                    >
                        Click Here
                    </Text>
                </Flex>
            </Flex>
        )
    }

    return (
        <Flex
            direction="column"
            alignItems="center"
            width="100%"
        >
            <Flex
                width="100%"
                height="83px"
                position="relative"
                justifyContent="center"
                alignItems="center"
                marginBottom={["120px","120px","120px","37px","37px","37px"]}
            >
                {props.panel === "wax" ? <WaxLogos/> : <OtherLogo/>}
            </Flex>
                <Box
                    disabled={props.locked}
                    marginBottom="10px"
                    className="mainbtncont blue"
                    cursor={props.locked ? 'not-allowed' : 'pointer'}
                    onClick={() => {
                        if (!props.locked) {
                            props.handleOpenLoginPromptClick(props.ual);
                        }
                    }}
                >
                    <div className="mainbtnwrap">
                        <div className="mainbtn"><div style={{ zIndex: 3 }}>{props.panel === "wax" ? "Connect Wallet" : "Choose Chain"}</div></div>
                    </div>
                </Box>
            <Flex>
                {bottomText}
            </Flex>
        </Flex>
    );


};

const LoginPanelChooseMetamask = (props) => {

    let bottomText = null;
    if (props.panel === 'wax') {
        bottomText = (
            <Flex direction="row">
                <Text fontSize="15px" color="#ffffff" fontWeight="700">
                    WAX&nbsp;
                </Text>
                <Text fontSize="15px" color="#ffffff" fontWeight="700" textDecoration="underline">
                    or
                </Text>
                <Text fontSize="15px" color="#ffffff" fontWeight="700">
                    &nbsp;Anchor
                </Text>
            </Flex>
        );
    } else {
        bottomText = (
            <Flex direction="row">
                <Text fontSize="15px" color="#ffffff" fontWeight="700">
                    Ethereum&nbsp;
                </Text>
                <Text
                    fontSize="15px"
                    color="#ffffff"
                    fontWeight="700"
                    textDecoration="underline"
                >
                    or
                </Text>
                <Text fontSize="15px" color="#ffffff" fontWeight="700">
                    &nbsp;Binance
                </Text>
            </Flex>
        );
    }

    return (
        <Flex
            direction="column"
            alignItems="center"
            width="100%"
        >
            <Flex
                width="100%"
                height="83px"
                position="relative"
                justifyContent="center"
                alignItems="center"
                marginBottom={["120px","120px","120px","37px","37px","37px"]}
            >
                {props.panel === "wax" ? <WaxLogos/> : <OtherLogo/>}
            </Flex>
            <Box
                disabled={props.locked}
                marginBottom="10px"
                className="mainbtncont blue"
                cursor={props.locked ? 'not-allowed' : 'pointer'}
                onClick={() => {
                    if (!props.locked) {
                        props.handleOpenLoginPromptClick(props.ual);
                    }
                }}
            >
                <div className="mainbtnwrap">
                    <div className="mainbtn"><div style={{ zIndex: 3 }}>{props.panel === "wax" ? "Connect Wallet" : "Choose Chain"}</div></div>
                </div>
            </Box>
            <Flex>
                {bottomText}
            </Flex>
        </Flex>
    );
}

export {LoginPanel, LoginPanelChooseMetamask};

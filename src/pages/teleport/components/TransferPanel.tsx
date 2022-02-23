import { config } from "util/teleportConfig";

import React from "react";

import { Button, Flex, Text, Image, Box } from "@chakra-ui/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import SwitchIcon from "assets/images/alienworlds-teleport-switch-icon.svg";
import { useAppState } from "store";

import { WaxLogo, AnchorLogo, EthereumLogo, BinanceLogo } from "./Logo";

const TransferPanel = (props) => {
  /* eslint-disable */

    const state = useAppState();
    const account = props.panel === "wax" ? state.teleport.account["wax"] : state.teleport.account[state.teleport.selectedOtherWallet];

    let currentActiveNetwork = null;
    // if (props.web3 && props.web3.active && props.web3.chainId) {
    //     currentActiveNetwork = config.networks[props.web3.chainId];
    // }
    if (state.teleport.web3) {
        currentActiveNetwork = config.networks[state.teleport.metamaskChainId];
    }

    const activeAuthenticatorName = state.teleport.account && state.teleport.account["wax"] ? (state.teleport.account["wax"].activeAuthenticatorName || "") : "";

    let logo = null;

  if (props.panel === "wax") {
      logo = (activeAuthenticatorName || "").toLowerCase() === "wax" ? <WaxLogo/> : <AnchorLogo/>;
  } else {
      if (currentActiveNetwork) {
          switch (currentActiveNetwork.className) {
              case "ethereum":
                  logo = <EthereumLogo />;
                  break;
              case "binance":
                  logo = <BinanceLogo />;
                  break;
              default:
                  break;
          }
      } else {
          switch (props.walletName) {
              case "ethereum":
                  logo = <EthereumLogo />;
                  break;
              case "binance":
                  logo = <BinanceLogo />;
                  break;
              default:
                  break;
          }
      }
  }

  const toWallet_ = props.walletName
    ? props.walletName.charAt(0).toUpperCase() + props.walletName.slice(1)
    : null;

  const toWallet = props.walletName ? props.walletName === "binance" ? "BSC" : (props.walletName.charAt(0).toUpperCase() + props.walletName.slice(1)) : null;

  let correctChain = true;
  let liquidBalanceDesc = "{} Liquid Balance";
  let switchTo = props.panel === "ethereum" ? "binance" : "ethereum";
  const switchToLabel = props.panel === "ethereum" ? "BSC" : "ethereum";
    if (props.panel !== "wax" && currentActiveNetwork) {
        correctChain = false;
        liquidBalanceDesc = liquidBalanceDesc.replace(/{}/g, currentActiveNetwork.name);
    } else if (props.panel !== "wax" && account.network) {
        correctChain = true;
        liquidBalanceDesc = liquidBalanceDesc.replace(
            /{}/g,
            account.network.name
        );
    } else {
        liquidBalanceDesc = liquidBalanceDesc.replace(/{}/g, state.teleport.account["wax"].activeAuthenticatorName);
    }

    const truncate = (str) => {
        return str?.length > 10 ? `${str.substr(0, 6)}...${str.slice(-4)}` : str;
    };

    return (
    <Flex direction="column" alignItems="center" width="100%" marginTop={props.marginTop}>
        <Text fontSize="16px" fontWeight="700" marginBottom="15px" opacity={props.panel !== "wax" ? 1 : 0}>{state.teleport.metamaskAccount ? truncate(state.teleport.metamaskAccount) : null}</Text>
        <Flex
            width="100%"
            height="83px"
            position="relative"
            justifyContent="center"
            alignItems="center"
            marginBottom="37px"
        >
            {logo}
        </Flex>
      <Text fontWeight="700" color="#D9A555" marginBottom="13px">
        {liquidBalanceDesc}
      </Text>
      <Text
        fontFamily="Orbitron"
        fontSize="30px"
        fontWeight="500"
        color="#ffffff"
        marginBottom="27px"
      >
        {`${account && account.balance} TLM`}
      </Text>
      <Button
        disabled={props.locked}
        width="213px"
        height="46px"
        fontFamily="Orbitron"
        textTransform="uppercase"
        fontSize="21px"
        letterSpacing="3px"
        backgroundColor="transparent"
        color="#ffffff"
        fontWeight="400"
        borderRadius="0"
        borderColor="#ffffff"
        borderStyle="solid"
        borderWidth="2px"
        marginBottom="23px"
        opacity={props.locked ? 0.3 : 1}
        cursor={props.locked ? "default" : "pointer"}
        _focus={{ outline: 0 }}
        _hover={
          props.locked
            ? {}
            : {
                backgroundColor: "#00D6A7",
                borderColor: "#00D6A7",
                borderStyle: "solid",
                borderWidth: "2px",
                color: "#000000",
                transform: "scale(0.95)",
                transition: "0.3s",
              }
        }
        onClick={props.locked ? null : props.handleTransferClick}
      >
        transfer
      </Button>

        {props.panel === "wax" ? (
            <Flex direction="row">
                <Text
                    fontSize="15px"
                    color="#ffffff"
                    fontWeight="700"
                    opacity={props.locked ? 0.3 : 1}
                >
                    From {activeAuthenticatorName} to&nbsp;
                </Text>
                <Text
                    fontSize="15px"
                    color="#ffffff"
                    fontWeight="700"
                    textDecoration="underline"
                    opacity={props.locked ? 0.3 : 1}
                >
                    {toWallet}
                </Text>
            </Flex>
        ) : (
            <Flex direction={'column'}>
                {
                    !props.isMobile ? (
                        <Flex direction="column">
                            <Text
                                fontSize="15px"
                                color="#ffffff"
                                fontWeight="700"
                            >
                                Switch to {switchToLabel.charAt(0).toUpperCase() + switchToLabel.substring(1, switchToLabel.length)}
                            </Text>
                            <Image src={SwitchIcon} height={'30px'} cursor="pointer" _hover={{opacity: 0.5}} onClick={() => {
                                props.switch(switchTo)
                            }}/>
                        </Flex>
                    ) : (
                        <Text fontSize="15px" color="#ffffff" fontWeight="700">Switch Chain in your MetaMask APP</Text>
                    )
                }
            </Flex>
        )
        }
    </Flex>
  );
};

export default TransferPanel;

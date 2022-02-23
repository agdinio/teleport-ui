import React, { useState, useEffect } from "react";

import { Flex, Box, Text, Button, Image } from "@chakra-ui/react";
import AnchorIconWhite from "assets/images/alienworlds-db-logo-anchor-white.svg";
import SwitchIcon from "assets/images/alienworlds-teleport-switch-icon.svg";
import { WaxLogo } from "components/ui/Icons";
import { motion } from "framer-motion";
import moment from "moment-timezone";
import { useAppState, useActions } from "store";

import { OneWayArrow, EthereumLogo, BinanceLogo } from "./Logo";

const PlayButton = (props) => {
  return (
    <Button
      height="46px"
      minWidth="139px"
      minHeight="46"
      fontFamily="Orbitron"
      fontSize="14px"
      letterSpacing="1px"
      color="#ffffff"
      fontWeight="500"
      borderRadius="0"
      borderColor="#ffffff"
      borderStyle="solid"
      borderWidth="2px"
      backgroundColor="transparent"
      padding="0 18px 0 18px"
      _focus={{ outline: 0 }}
      _hover={{
        backgroundColor: "#ffffff",
        color: "#000000",
        borderColor: "#ffffff",
        borderStyle: "solid",
        borderWidth: "2px",
        transform: "scale(0.95)",
        transition: "0.3s",
      }}
      onClick={props.refOnClick}
    >
      Start Playing
    </Button>
  );
};

const CancelButton = (props) => {
  return (
    <Button
      height="46px"
      fontFamily="Orbitron"
      fontSize="15px"
      letterSpacing="1px"
      color="#000000"
      fontWeight="500"
      borderRadius="0"
      backgroundColor="#04D5A7"
      padding="0 18px 0 18px"
      _focus={{ outline: 0 }}
      _hover={{
        transform: `scale(${props.locked ? "1" : "0.95"})`,
        transition: "0.3s",
      }}
      cursor={props.locked ? "not-allowed" : "pointer"}
      filter={`grayscale(${props.locked ? 1 : 0})`}
      onClick={props.locked ? null : props.refOnClick}
    >
      Cancel
    </Button>
  );
};

const ClaimButton = (props) => {
  return (
    <Button
      height="46px"
      fontFamily="Orbitron"
      fontSize="15px"
      letterSpacing="1px"
      color="#000000"
      fontWeight="500"
      borderRadius="0"
      backgroundColor="#04D5A7"
      padding="0 18px 0 18px"
      _focus={{ outline: 0 }}
      _hover={{
        transform: `scale(${props.locked ? "1" : "0.95"})`,
        transition: "0.3s",
      }}
      cursor={props.locked ? "not-allowed" : "pointer"}
      filter={`grayscale(${props.locked ? 1 : 0})`}
      onClick={props.locked ? null : props.refOnClick}
    >
      Claim
    </Button>
  );
};

const CancelClaimButton = (props) => {
  return (
    <Button
      height="45px"
      fontFamily="Orbitron"
      fontSize="15px"
      letterSpacing="1px"
      color="#E8384D"
      fontWeight="500"
      borderRadius="0"
      backgroundColor="transparent"
      border="1px solid #E8384D"
      padding="0 18px 0 18px"
      _focus={{ outline: 0 }}
      _hover={{
        transform: `scale(${props.locked ? "1" : "0.95"})`,
        transition: "0.3s",
        backgroundColor: "#E8384D",
        color: "#fff",
      }}
      cursor={props.locked ? "not-allowed" : "pointer"}
      filter={`grayscale(${props.locked ? 1 : 0})`}
      onClick={props.locked ? null : props.refOnClick}
      marginLeft="10px"
    >
      Cancel
    </Button>
  );
};

const StakeButton = (props) => {
  return (
    <Button
      height="46px"
      // minWidth="139px"
      minHeight="46px"
      fontFamily="Orbitron"
      fontSize="15px"
      letterSpacing="1px"
      color="#ffffff"
      fontWeight="500"
      borderRadius="0"
      borderColor="#ffffff"
      borderStyle="solid"
      borderWidth="2px"
      backgroundColor="transparent"
      padding="0 20px 0 20px"
      _focus={{ outline: 0 }}
      _hover={{
        backgroundColor: "#ffffff",
        color: "#000000",
        borderColor: "#ffffff",
        borderStyle: "solid",
        borderWidth: "2px",
        transform: "scale(0.95)",
        transition: "0.3s",
      }}
      onClick={props.refOnClick}
    >
      Stake Tokens
    </Button>
  );
};

/**
 * MAIN COMPONENT HERE
 * @param item
 * @constructor
 */
const TeleportTransactionItem = ({
  item,
  claim,
  stake,
  locked,
  handleSwitch,
  cancelClaim,
}) => {
  /* eslint-disable */
    const state = useAppState();
    const actions = useActions();

    const [isClaiming, setClaiming] = useState(false);
    const [errorItemMessage, setErrorItemMessage] = useState(null)

    const activeAuthenticatorName = state.teleport.account && state.teleport.account["wax"] ? (state.teleport.account["wax"].activeAuthenticatorName || "") : "";

    useEffect(() => {
        // @ts-ignore
        if (state.teleport.selectedTransaction && state.teleport.selectedTransaction.id === item.id) {
            setClaiming(true);
        } else {
            setClaiming(false);
        }
        if (state.teleport.errorSelectedItem && Object.keys(state.teleport.errorSelectedItem).length >= 2) {
            // @ts-ignore
            if (state.teleport.errorSelectedItem.id === item.id) {
                // @ts-ignore
                setErrorItemMessage(state.teleport.errorSelectedItem.message);
            }
        }

    }, [item, state.teleport.errorSelectedItem])

    let state_claiming = state.teleport.claimings.filter(o => o === item.id)[0];

    const itemOpacity = item.status === "pending" ? 0.4 : 1;

    let leftArrowMaskColor = null;
    let isClaimableAndCompletedFromWax = true;
    if (item.class === "fromwax") {
        if (!item.claimable && !item.completed) {
            leftArrowMaskColor = "#FF3B52";
            isClaimableAndCompletedFromWax = false;
        }
    }

    // let rightArrowMaskColor = null;
    let isClaimableAndCompletedToWax = true;
    if (item.class === "towax") {
        if (!item.claimable && !item.completed) {
            isClaimableAndCompletedToWax = false;
        }
    }

    if (item.claimed) {
        if (state_claiming) {
            actions.teleport.removeFromClaimings(item.id);
            state_claiming = null;
        }
        // @ts-ignore
        if (state.teleport.selectedTransaction && state.teleport.selectedTransaction.id === item.id) {
            actions.teleport.setSelectedTransaction(null);
        }
    }

    const statusMessage = (!isClaimableAndCompletedFromWax || !isClaimableAndCompletedToWax) ? "pending..." : state_claiming ? "claim pending..." : "";

    const errorMaskColor = errorItemMessage ? "#FF3B52" : null;

    const switchTo = state.teleport.selectedOtherWallet ? state.teleport.selectedOtherWallet === "ethereum" ? {name:'binance', code:'BSC'} : {name:'ethereum', code:'ETH'} : null;

    const transDate = item.transactionDate
                        ? moment(item.transactionDate).format("MMM DD, YYYY HH:mm")
                            : item.date
                                ? moment(new Date(item.date)).format("MMM DD, YYYY HH:mm")
                                    : null;

    let isClaimExpired = false;
    if (item.transactionDate) {
        const diff = new Date().getTime() - new Date(item.transactionDate).getTime();
        isClaimExpired = (diff / (1000 * 3600 * 24)) > 30;
    }

    // const message =
    //   item.status === "error" ? "Error Message Reason" : "pending...";

    // const LeftButton = item.status === "play" ? PlayButton : Box;


    const handleClaimClick = async (teleportId) => {
        await setErrorItemMessage(null);
        await actions.teleport.resetErrorSelectedItem();
        claim(item);
    }
    
    const handleCancelClaimClick = async (teleportId) => {
        await setErrorItemMessage(null);
        cancelClaim(item);
    }

    const handleStakeClick = (teleportId) => {
        stake(teleportId);
    }

    return (
        <motion.div
            initial={{y: -20, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{duration: 0.3, delay: 0.3}}
        >
            <Flex
                marginTop={["20px", "20px", "20px", "20px", "0", "0"]}
            >

                {locked ? (
                    <Box
                        position="absolute"
                        width="100%"
                        height="100%"
                        zIndex={100}
                    />
                ) : null}

                <Flex
                    direction={["column", "column", "column", "column", "row", "row"]}
                    alignItems="center"
                    marginBottom="18px"
                    justifyContent="space-between"
                >

                    <Flex
                        width="200px"
                        minWidth="200px"
                        justifyContent={["center", "center", "center", "center", "flex-end", "flex-end"]}
                        paddingRight={["0", "0", "0", "0", "20px", "20px"]}
                        marginBottom={["27px", "27px", "27px", "27px", "0", "0"]}
                    >
                        {/*
            <PlayButton
                refOnClick={() => {
                    alert(item.status);
                }}
            />
*/}
                    </Flex>

                    <Flex alignItems="center" marginBottom={["27px", "27px", "27px", "27px", "0", "0"]}>
                        {
                            activeAuthenticatorName.toLowerCase() === "wax"
                                ? <WaxLogo
                                    width="130px"
                                    fill={'#ffffff'}
                                    opacity={!isClaimableAndCompletedFromWax ? 0.5 : 1}
                                />
                                : <Image src={AnchorIconWhite} width="130px" height="60px" opacity={!isClaimableAndCompletedFromWax ? 0.5 : 1} />

                        }
                    </Flex>

                    <Flex
                        alignItems="center"
                        marginBottom={["15px", "15px", "15px", "15px", "0", "0"]}
                    >
                        <OneWayArrow
                            width="150px"
                            height="46px"
                            transform={
                                item.class === "fromwax"
                                    ? [
                                        "rotate(90deg)",
                                        "rotate(90deg)",
                                        "rotate(90deg)",
                                        "rotate(90deg)",
                                        "rotate(0deg)",
                                        "rotate(0deg)",
                                    ]
                                    : [
                                        "rotate(270deg)",
                                        "rotate(270deg)",
                                        "rotate(270deg)",
                                        "rotate(270deg)",
                                        "rotate(180deg)",
                                        "rotate(180deg)",
                                    ]
                            }
                            opacity={!isClaimableAndCompletedFromWax ? 0.5 : 1}
                            isError={!isClaimableAndCompletedToWax || errorItemMessage}
                            filter={item.completed ? "grayscale(1)" : "grayscale(0)"}
                        />
                    </Flex>

                    <Flex
                        width="210px"
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        marginBottom={["15px", "15px", "15px", "15px", "0", "0"]}
                    >
                        <Text
                            fontFamily="Titillium Web"
                            fontSize="14px"
                            position="absolute"
                            marginBottom="20%"
                            color={errorMaskColor || "#ffffff"}
                            whiteSpace="nowrap"
                        >{transDate}</Text>
                        <Text
                            fontFamily="Orbitron"
                            fontSize="23px"
                            fontWeight="500"
                            color={errorMaskColor || "#ffffff"}
                            whiteSpace={'nowrap'}
                            opacity={!isClaimableAndCompletedFromWax || !isClaimableAndCompletedToWax ? 0.5 : 1}
                        >
                            {item.quantity}
                        </Text>
                        {
                            !isClaimableAndCompletedFromWax || !isClaimableAndCompletedToWax || state_claiming || errorItemMessage ?
                                <Text
                                    fontFamily="Titillium Web"
                                    fontSize="16px"
                                    fontWeight="bold"
                                    position="absolute"
                                    marginTop="3.5vh"
                                    color={errorMaskColor || "#ffffff"}
                                    whiteSpace="nowrap"
                                >{statusMessage || errorItemMessage}</Text> : null
                        }
                    </Flex>

                    <Flex
                        alignItems="center"
                        marginBottom={["15px", "15px", "15px", "15px", "0", "0"]}
                    >
                        <OneWayArrow
                            width="150px"
                            height="46px"
                            transform={
                                item.class === "fromwax"
                                    ? [
                                        "rotate(90deg)",
                                        "rotate(90deg)",
                                        "rotate(90deg)",
                                        "rotate(90deg)",
                                        "rotate(0deg)",
                                        "rotate(0deg)",
                                    ]
                                    : [
                                        "rotate(270deg)",
                                        "rotate(270deg)",
                                        "rotate(270deg)",
                                        "rotate(270deg)",
                                        "rotate(180deg)",
                                        "rotate(180deg)",
                                    ]
                            }
                            opacity={!isClaimableAndCompletedFromWax ? 0.5 : 1}
                            isError={!isClaimableAndCompletedFromWax || errorItemMessage}
                            filter={item.completed ? "grayscale(1)" : "grayscale(0)"}
                        />
                    </Flex>


                    <Flex
                        alignItems="center"
                        marginBottom={["27px", "27px", "27px", "27px", "0", "0"]}
                    >
                        {
                            item.chain_id === 1 ? (
                                <EthereumLogo
                                    width={'130px'}
                                    height={'60px'}
                                    opacity={!isClaimableAndCompletedFromWax ? 0.5 : 1}
                                />
                            ) : item.isEth ? (
                                <EthereumLogo
                                    width={'130px'}
                                    height={'60px'}
                                    opacity={!isClaimableAndCompletedFromWax ? 0.5 : 1}
                                />
                            ) : (
                                <BinanceLogo
                                    width={'130px'}
                                    height={'60px'}
                                    opacity={!isClaimableAndCompletedFromWax ? 0.5 : 1}
                                />
                            )
                        }
                    </Flex>

                    <Flex
                        width="200px"
                        minWidth="200px"
                        alignItems="center"
                        justifyContent={["center", "center", "center", "center", "flex-start", "flex-start"]}
                        marginBottom={["27px", "27px", "27px", "27px", "0", "0"]}
                    >
                        {
                            item.class !== "fromwax" && item.completed ? (
                                <Text
                                    fontFamily="Titillium Web"
                                    color="#999999"
                                    fontSize="20px"
                                    fontWeight="700"
                                    letterSpacing="1px"
                                >
                                    RECEIVED
                                </Text>
                            ) : item.class === "fromwax" && item.completed ? (
                                <Text
                                    fontFamily="Titillium Web"
                                    color="#999999"
                                    fontSize="20px"
                                    fontWeight="700"
                                    letterSpacing="1px"
                                >
                                    CLAIMED
                                </Text>
                            ) : item.correct_login && item.correct_chain ? (
                                <Flex direction="row" alignItems="center">
                                    <ClaimButton locked={!item.claimable || state_claiming} refOnClick={() => {
                                        handleClaimClick(item.id);
                                    }}/>
                                    {
                                        isClaimExpired ? (
                                            <CancelClaimButton Button locked={!item.claimable || state_claiming} refOnClick={() => {
                                                handleCancelClaimClick(item.id);
                                            }}/>
                                        ) : null
                                    }
                                </Flex>
                            ) : item.class === "fromwax" ? !item.correct_login ?
                                (<Text fontFamily="Titillium Web" fontSize={'16px'}>Login with the correct account {'0x' + (item.eth_address || '').substring(0, 20)}</Text>) : !item.correct_chain ?
                                    (
                                        <Flex direction="row" alignItems="center">
                                            {
                                                !isMobile.any() ? (
                                                    <Flex>
                                                        <Image src={SwitchIcon} height={'30px'} marginRight="5px" cursor="pointer" onClick={() => {
                                                            if (switchTo && switchTo.name) {
                                                                handleSwitch(switchTo.name)
                                                            }
                                                        }} />
                                                        <Text fontFamily="Titillium Web" fontSize={'16px'} color={'#ffffff'}>Switch {switchTo && switchTo.code} to claim</Text>
                                                    </Flex>
                                                ) : (
                                                    <Text fontFamily="Titillium Web" fontSize={'16px'} color={'#ffffff'}>Switch Chain in your MetaMask APP</Text>
                                                )
                                            }
                                        </Flex>
                                    )
                                    : null
                                : null
                        }

                    </Flex>

                </Flex>
            </Flex>
        </motion.div>
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

export { TeleportTransactionItem };

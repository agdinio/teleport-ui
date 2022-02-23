import { config } from "util/teleportConfig";

import React, { useEffect, useState } from "react";

import {
  ModalOverlay,
  Modal,
  ModalContent,
  ModalBody,
  UseDisclosureProps,
  Flex,
  Text,
  ButtonGroup,
  Button,
  Box,
  Input,
  Image,
  useDisclosure,
  keyframes,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import WaxIconWhite from "assets/images/alienworlds-db-logo-wax-white.svg";
import BinanceIcon from "assets/images/alienworlds-teleport-logo-binance.svg";
import EthereumIcon from "assets/images/alienworlds-teleport-logo-ethereum.svg";
import CloseIcon from "assets/images/alienworlds-teleport-x.svg";
import { ErrorIcon, SuccessIcon } from "components/ui/Icons";
import { motion } from "framer-motion";
import { useAppState, useActions } from "store";

import {
  WaxLogo,
  AnchorLogo,
  EthereumLogo,
  BinanceLogo,
  OneWayArrow,
} from "./Logo";

interface Props {
  name: string;
}

const isNumber = (e) => {
  const code = e.which ? e.which : e.keyCode;
  /* eslint-disable */
    if (code === 46 || code === 190) {
        if (e.target.value.split(".").length > 1) {
            e.preventDefault();
        }
    } else {
        if (code > 31 && (code < 48 || code > 57)) {
            e.preventDefault();
        }
    }
};

const TeleportModal: React.FC = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isChrome = /chrome/.test( (navigator.userAgent || "").toLowerCase());

    useEffect(() => onOpen(), []);

    return (
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} closeOnEsc={false}>
            <ModalOverlay backgroundColor={isChrome ? "rgba(0,0,0, 0.7)" : "rgba(0,0,0, 0.9)"} backdropFilter="blur(5px)" />
            <ModalContent backgroundColor="transparent" maxW="100vw">
                <ModalBody backgroundColor="transparent" maxW="100vw">
                    {children}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

const UALConsumer = (props) => {
    return (
        <Flex>
            <Button
                width="139px"
                height="46px"
                fontFamily="Orbitron"
                textTransform="uppercase"
                fontSize="14px"
                letterSpacing="2px"
                color="#ffffff"
                fontWeight="400"
                borderRadius="0"
                marginBottom="23px"
                borderColor="#ffffff"
                borderStyle="solid"
                borderWidth="2px"
                backgroundColor="transparent"
                _focus={{ outline: 0 }}
                _hover={{
                    backgroundColor: "#ffffff",
                    borderStyle: "solid",
                    borderWidth: "2px",
                    color: "#000000",
                    transform: "scale(0.95)",
                    transition: "0.3s",
                }}
                onClick={props.ual.showModal}
            >
                SHOW
            </Button>
        </Flex>
    )
}

const LoginWaxPrompt = (props) => {
    // setTimeout(() => {
    //     const card = document.querySelector('.multiple-login-container');
    //     if (card) {
    //         card.classList.add('flip');
    //     }
    // }, 0)

    return (
        <Flex
            height="100%"
            justifyContent="center"
            alignItems="center"
        >
            <div className="multiple-login-container">
                <Flex direction="column" width="350px" height="470px" backgroundColor="#fff" borderRadius="4px" overflow="hidden">
                    <Flex width="100%" height="30px" backgroundColor="#25A79A" alignItems="center" justifyContent="flex-end"  marginBottom="15px">
                        <Image
                            src={CloseIcon}
                            height="90%"
                            marginRight="10px"
                            padding="7px"
                            cursor="pointer"
                            _hover={{
                                backgroundColor: "rgba(255,255,255,0.1)",
                            }}
                            onClick={props.handleCancelClick}
                        />
                    </Flex>
                    <Flex width="100%" direction="column" alignItems="center">
                        {
                            props.locked ? <div className="blocker" /> : null
                        }
                        <Flex width="90%" height="50px" backgroundColor="#111111" borderRadius="4px" marginBottom="10px" cursor="pointer"
                              _hover={{opacity: 0.8}}
                              onClick={() => {props.handleAttemptLoginClick("wax")}}>
                            <Flex width="23%" justifyContent="center">
                                <Image src={WaxIconWhite} width="60%" />
                            </Flex>
                            <Flex width="77%" alignItems="center">
                                <Text fontSize="20px">WAX Cloud Wallet</Text>
                            </Flex>
                        </Flex>
                        <Flex width="90%" height="50px" backgroundColor="#058CE9" borderRadius="4px" marginBottom="10px" cursor="pointer"
                              _hover={{opacity: 0.8}}
                              onClick={() => {props.handleAttemptLoginClick("scatter")}}>
                            <Flex width="23%" justifyContent="center">
                                <Image src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzNHB4IiB2aWV3Qm94PSIxMyAyMCAyNiA1IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogIDx0aXRsZT5nc19idXR0b25fbG9naW53aXRoc2NhdHRlcl9ibHVlPC90aXRsZT4KICA8ZyBpZD0iZ3NfYnV0dG9uX2xvZ2lud2l0aHNjYXR0ZXJfYmx1ZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICA8ZyBpZD0iR3JvdXAtMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOS4wMDAwMDAsIDUuMDAwMDAwKSI+CiAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbCIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjIiIGN4PSIxNyIgY3k9IjE3IiByPSIxMiI+PC9jaXJjbGU+CiAgICAgICAgPHBhdGggZD0iTTE2LjM1MzYzNzQsMjYuMjQwMDE2NSBDMTUuODM3NTI2LDI2LjI0MDAxNjUgMTUuNDA4NzYzLDI2LjE4MTU0NzIgMTUuMDY3MzM1NSwyNi4wNjQ2MDY5IEMxNC43MjU5MDc5LDI1Ljk0NzY2NjUgMTQuNDU1OTQ2LDI1LjgxNjYxNDYgMTQuMjU3NDQxNywyNS42NzE0NDczIEMxNC4wNTg5MzczLDI1LjUyNjI3OTkgMTMuOTE5OTg2MywyNS4zODcxNjMzIDEzLjg0MDU4NDYsMjUuMjU0MDkzMiBDMTMuNzYxMTgyOCwyNS4xMjEwMjMyIDEzLjcyMTQ4MjUsMjUuMDM0MzI3MyAxMy43MjE0ODI1LDI0Ljk5NDAwMyBDMTMuNzIxNDgyNSwyNC44NDg4MzU3IDEzLjc1MzI0MjcsMjQuNjkzNTg5NiAxMy44MTY3NjQxLDI0LjUyODI2MDEgQzEzLjg4MDI4NTUsMjQuMzYyOTMwNiAxMy45NTk2ODYxLDI0LjIwOTcwMDcgMTQuMDU0OTY4MiwyNC4wNjg1NjU4IEMxNC4xNTAyNTAzLDIzLjkyNzQzMDkgMTQuMjUzNDcxLDIzLjgwODQ3NjEgMTQuMzY0NjMzNSwyMy43MTE2OTc5IEMxNC40NzU3OTU5LDIzLjYxNDkxOTYgMTQuNTc1MDQ2NiwyMy41NjY1MzEyIDE0LjY2MjM4ODYsMjMuNTY2NTMxMiBDMTQuNzczNTUxLDIzLjU2NjUzMTIgMTQuODY0ODYxNywyMy42MzkxMTM4IDE0LjkzNjMyMzIsMjMuNzg0MjgxMiBMMTUuMDU1NDI1MywyMy45MDUyNTM0IEMxNS4xMTg5NDY3LDIzLjk2OTc3MjIgMTUuMjA4MjcyMywyNC4wMzYzMDYyIDE1LjMyMzQwNDgsMjQuMTA0ODU3NSBDMTUuNDM4NTM3NCwyNC4xNzM0MDg3IDE1LjU4MTQ1ODQsMjQuMjM1OTEwNCAxNS43NTIxNzIxLDI0LjI5MjM2NDMgQzE1LjkyMjg4NTksMjQuMzQ4ODE4MyAxNi4xMjMzNzIzLDI0LjM3NzA0NDkgMTYuMzUzNjM3NCwyNC4zNzcwNDQ5IEMxNi44NTM4Njg0LDI0LjM3NzA0NDkgMTcuMjYyNzgxMywyNC4yMjE3OTg4IDE3LjU4MDM4ODMsMjMuOTExMzAyIEMxNy44OTc5OTUzLDIzLjYwMDgwNTEgMTguMDU2Nzk2NCwyMy4xNzk0MjI5IDE4LjA1Njc5NjQsMjIuNjQ3MTQyNiBDMTguMDU2Nzk2NCwyMi4yNzYxNTk0IDE3Ljk3MTQ0MDgsMjEuOTQ1NTA1NCAxNy44MDA3MjcsMjEuNjU1MTcwNyBDMTcuNjMwMDEzMywyMS4zNjQ4MzYgMTcuNDA1NzA2NywyMS4wOTQ2Njc1IDE3LjEyNzgwMDYsMjAuODQ0NjU3MSBDMTYuODQ5ODk0NSwyMC41OTQ2NDY2IDE2LjUzMjI5MjIsMjAuMzUwNjg4NSAxNi4xNzQ5ODQzLDIwLjExMjc3NTMgQzE1LjgxNzY3NjUsMTkuODc0ODYyMiAxNS40NTI0MzM5LDE5LjYyNjg3MTcgMTUuMDc5MjQ1NywxOS4zNjg3OTY0IEMxNC43MDYwNTc0LDE5LjExMDcyMTEgMTQuMzQwODE0OSwxOC44MzI0ODc5IDEzLjk4MzUwNywxOC41MzQwODgzIEMxMy42MjYxOTkxLDE4LjIzNTY4ODggMTMuMzA4NTk2OSwxNy44OTI5Mzc3IDEzLjAzMDY5MDcsMTcuNTA1ODI0NyBDMTIuNzUyNzg0NiwxNy4xMTg3MTE4IDEyLjUyODQ3OCwxNi42ODEyMDAxIDEyLjM1Nzc2NDMsMTYuMTkzMjc2NSBDMTIuMTg3MDUwNSwxNS43MDUzNTI5IDEyLjEwMTY5NDksMTUuMTQ2ODcwMyAxMi4xMDE2OTQ5LDE0LjUxNzgxMTggQzEyLjEwMTY5NDksMTMuOTc3NDY2NiAxMi4xOTMwMDU2LDEzLjQzMzA5NzIgMTIuMzc1NjI5NiwxMi44ODQ2ODcyIEMxMi41NTgyNTM2LDEyLjMzNjI3NzMgMTIuODEwMzUwNCwxMS44MTQwODU5IDEzLjEzMTkyNzUsMTEuMzE4MDk3NCBDMTMuNDUzNTA0NiwxMC44MjIxMDkgMTMuODMyNjQyMiwxMC4zNTgzODY5IDE0LjI2OTM1MTksOS45MjY5MTczMSBDMTQuNzA2MDYxNSw5LjQ5NTQ0NzY5IDE1LjE3ODQ5NDgsOS4xMjA0Mzc2NyAxNS42ODY2NjYsOC44MDE4NzU5OSBDMTYuMTk0ODM3Miw4LjQ4MzMxNDMgMTYuNzI0ODM2LDguMjMzMzA3NjIgMTcuMjc2Njc4MSw4LjA1MTg0ODQzIEMxNy44Mjg1MjAzLDcuODcwMzg5MjUgMTguMzgyMzM5Miw3Ljc3OTY2MTAyIDE4LjkzODE1MTQsNy43Nzk2NjEwMiBDMTkuNDE0NTYxOSw3Ljc3OTY2MTAyIDE5Ljg0MzMyNSw3Ljg1NjI3NTk3IDIwLjIyNDQ1MzQsOC4wMDk1MDgxNyBDMjAuNjA1NTgxOCw4LjE2Mjc0MDM3IDIwLjkyNzE1NCw4LjM3ODQ3MTk0IDIxLjE4OTE3OTgsOC42NTY3MDkzNiBDMjEuNDUxMjA1Niw4LjkzNDk0Njc4IDIxLjY1MzY3Nyw5LjI2OTYzMzE1IDIxLjc5NjYwMDIsOS42NjA3Nzg1IEMyMS45Mzk1MjMzLDEwLjA1MTkyMzkgMjIuMDEwOTgzOCwxMC40ODk0MzU2IDIyLjAxMDk4MzgsMTAuOTczMzI2NyBDMjIuMDEwOTgzOCwxMS40MzMwMjMzIDIxLjkzMTU4MzIsMTEuODg0NjQ4MyAyMS43NzI3Nzk3LDEyLjMyODIxNTIgQzIxLjYxMzk3NjIsMTIuNzcxNzgyMSAyMS40MDM1NjQ4LDEzLjE5MTE0ODEgMjEuMTQxNTM5LDEzLjU4NjMyNTkgQzIwLjg3OTUxMzIsMTMuOTgxNTAzNyAyMC41ODM3NDYxLDE0LjM0NjQzMjggMjAuMjU0MjI4OSwxNC42ODExMjQyIEMxOS45MjQ3MTE2LDE1LjAxNTgxNTYgMTkuNTg3MjU5MiwxNS4zMDYxNDU5IDE5LjI0MTg2MTYsMTUuNTUyMTIzOSBDMTguODk2NDY0LDE1Ljc5ODEwMTkgMTguNTYwOTk2NiwxNS45ODk2MzkzIDE4LjIzNTQ0OTUsMTYuMTI2NzQxOCBDMTcuOTA5OTAyMywxNi4yNjM4NDQzIDE3LjYyNDA2MDMsMTYuMzMyMzk0NSAxNy4zNzc5MTQ4LDE2LjMzMjM5NDUgQzE3LjE2MzUzMDEsMTYuMzMyMzk0NSAxNi45NzA5ODM4LDE2LjI4MTk5IDE2LjgwMDI3LDE2LjE4MTE3OTMgQzE2LjYyOTU1NjIsMTYuMDgwMzY4NiAxNi40ODY2MzUyLDE1Ljk1NTM2NTMgMTYuMzcxNTAyNywxNS44MDYxNjU1IEMxNi4yNTYzNzAyLDE1LjY1Njk2NTggMTYuMTY3MDQ0NSwxNS40OTk3MDM1IDE2LjEwMzUyMzEsMTUuMzM0Mzc0IEMxNi4wNDAwMDE3LDE1LjE2OTA0NDUgMTYuMDA4MjQxNSwxNS4wMjE4NjMyIDE2LjAwODI0MTUsMTQuODkyODI1NSBDMTYuMDA4MjQxNSwxNC43ODc5ODI0IDE2LjAyMjEzNjYsMTQuNzE5NDMyMiAxNi4wNDk5MjcyLDE0LjY4NzE3MjggQzE2LjA3NzcxNzgsMTQuNjU0OTEzNCAxNi4xMTc0MTgxLDE0LjY0MDgwMDEgMTYuMTY5MDI5MiwxNC42NDQ4MzI1IEMxNi4yMjA2NDA0LDE0LjY0ODg2NSAxNi4yODYxNDU4LDE0LjY2MDk2MjEgMTYuMzY1NTQ3NiwxNC42ODExMjQyIEMxNi40NDQ5NDkzLDE0LjcwMTI4NjMgMTYuNTM2MjYsMTQuNzExMzY3MyAxNi42Mzk0ODIzLDE0LjcxMTM2NzMgQzE2Ljk3Mjk2OTYsMTQuNzExMzY3MyAxNy4zNDIxODIyLDE0LjU5NDQyODYgMTcuNzQ3MTMxMSwxNC4zNjA1NDc5IEMxOC4xNTIwODAxLDE0LjEyNjY2NzIgMTguNTMzMjAyNywxMy44MjgyNzIxIDE4Ljg5MDUxMDYsMTMuNDY1MzUzNyBDMTkuMjQ3ODE4NSwxMy4xMDI0MzU0IDE5LjU0NzU1NTYsMTIuNzAzMjMxMSAxOS43ODk3MzA5LDEyLjI2NzcyOTEgQzIwLjAzMTkwNjMsMTEuODMyMjI3MSAyMC4xNTI5OTIxLDExLjQwODgyODYgMjAuMTUyOTkyMSwxMC45OTc1MjEyIEMyMC4xNTI5OTIxLDEwLjU3ODE0ODggMjAuMDUxNzU2NCwxMC4yNDc0OTQ4IDE5Ljg0OTI4MiwxMC4wMDU1NDkyIEMxOS42NDY4MDc1LDkuNzYzNjAzNjUgMTkuMzAzNDAwMSw5LjY0MjYzMjY3IDE4LjgxOTA0OTQsOS42NDI2MzI2NyBDMTguNTE3MzIyOCw5LjY0MjYzMjY3IDE4LjE4OTc5NTQsOS43MDExMDE5OCAxNy44MzY0NTc3LDkuODE4MDQyMzQgQzE3LjQ4MzExOTksOS45MzQ5ODI3MSAxNy4xMjc4MDI0LDEwLjA5ODI5MzUgMTYuNzcwNDk0NSwxMC4zMDc5Nzk3IEMxNi40MTMxODY2LDEwLjUxNzY2NTkgMTYuMDY3Nzk0MiwxMC43NzE3MDQ5IDE1LjczNDMwNjgsMTEuMDcwMTA0NSBDMTUuNDAwODE5NSwxMS4zNjg1MDQgMTUuMTA3MDM3NCwxMS42OTcxNDE4IDE0Ljg1Mjk1MTgsMTIuMDU2MDI3OCBDMTQuNTk4ODY2MiwxMi40MTQ5MTM3IDE0LjM5NDQwOTgsMTIuODAyMDIwOCAxNC4yMzk1NzY0LDEzLjIxNzM2MDggQzE0LjA4NDc0MjksMTMuNjMyNzAwNyAxNC4wMDczMjc0LDE0LjA2NjE4IDE0LjAwNzMyNzQsMTQuNTE3ODExOCBDMTQuMDA3MzI3NCwxNC45OTM2MzgxIDE0LjA5MjY4MywxNS40MTkwNTI3IDE0LjI2MzM5NjgsMTUuNzk0MDY4MyBDMTQuNDM0MTEwNSwxNi4xNjkwODQgMTQuNjYwNDAyMSwxNi41MDk4MTg5IDE0Ljk0MjI3ODMsMTYuODE2MjgzMyBDMTUuMjI0MTU0NSwxNy4xMjI3NDc3IDE1LjU0Mzc0MTgsMTcuNDA1MDEzMyAxNS45MDEwNDk3LDE3LjY2MzA4ODYgQzE2LjI1ODM1NzUsMTcuOTIxMTYzOSAxNi42MjM2MDAxLDE4LjE3NzIxOTEgMTYuOTk2Nzg4MywxOC40MzEyNjIgQzE3LjM2OTk3NjYsMTguNjg1MzA0OCAxNy43MzUyMTkxLDE4Ljk0NzQwODYgMTguMDkyNTI3LDE5LjIxNzU4MTIgQzE4LjQ0OTgzNDksMTkuNDg3NzUzNyAxOC43Njk0MjIyLDE5Ljc4NjE0ODggMTkuMDUxMjk4NCwyMC4xMTI3NzUzIEMxOS4zMzMxNzQ2LDIwLjQzOTQwMTkgMTkuNTU5NDY2MiwyMC44MDIzMTQ4IDE5LjczMDE3OTksMjEuMjAxNTI1IEMxOS45MDA4OTM3LDIxLjYwMDczNTIgMTkuOTg2MjQ5MywyMi4wNTg0MDg3IDE5Ljk4NjI0OTMsMjIuNTc0NTU5MyBDMTkuOTg2MjQ5MywyMy4wNzQ1ODAyIDE5Ljg5Mjk1MzYsMjMuNTQ4MzgzMiAxOS43MDYzNTk1LDIzLjk5NTk4MjUgQzE5LjUxOTc2NTQsMjQuNDQzNTgxOCAxOS4yNjM2OTg2LDI0LjgzMjcwNTEgMTguOTM4MTUxNCwyNS4xNjMzNjQxIEMxOC42MTI2MDQzLDI1LjQ5NDAyMyAxOC4yMjc1MTE1LDI1Ljc1NjEyNjggMTcuNzgyODYxNywyNS45NDk2ODMzIEMxNy4zMzgyMTE5LDI2LjE0MzIzOTggMTYuODYxODA4NiwyNi4yNDAwMTY1IDE2LjM1MzYzNzQsMjYuMjQwMDE2NSBaIiBpZD0iU2NhdHRlciIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgPC9nPgogIDwvZz4KPC9zdmc+Cg==" width="45%" />
                            </Flex>
                            <Flex width="77%" alignItems="center">
                                <Text fontSize="20px">Scatter</Text>
                            </Flex>
                        </Flex>
                        <Flex width="90%" height="50px" backgroundColor="#3750A2" borderRadius="4px" marginBottom="10px" cursor="pointer"
                              _hover={{opacity: 0.8}}
                              onClick={() => {props.handleAttemptLoginClick("anchor")}}>
                            <Flex width="23%" justifyContent="center">
                                <Image src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMS40NCwgMCwgMCwgMS40NCwgLTguNTAxOTI1LCAtNTcuMDc0NTcpIiBzdHlsZT0iIj4KICAgIDx0aXRsZT5XaGl0ZTwvdGl0bGU+CiAgICA8Y2lyY2xlIGN4PSI5NC43OTMiIGN5PSIxMjguNTI0IiByPSI4MCIgZmlsbD0iI0ZCRkRGRiIvPgogICAgPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0gOTQuNzk5IDc4LjUyNCBDIDk3LjA5OCA3OC41MjQgOTkuMTk1IDc5LjgzNyAxMDAuMTk4IDgxLjkwNiBMIDEyNC4yMDQgMTMxLjQwNiBMIDEyNC43NDYgMTMyLjUyNCBMIDExMS40MDkgMTMyLjUyNCBMIDEwNy41MyAxMjQuNTI0IEwgODIuMDY5IDEyNC41MjQgTCA3OC4xODkgMTMyLjUyNCBMIDY0Ljg1MyAxMzIuNTI0IEwgNjUuMzk1IDEzMS40MDYgTCA4OS40MDEgODEuOTA2IEMgOTAuNDA0IDc5LjgzNyA5Mi41MDEgNzguNTI0IDk0Ljc5OSA3OC41MjQgWiBNIDg2LjkxOSAxMTQuNTI0IEwgMTAyLjY4IDExNC41MjQgTCA5NC43OTkgOTguMjc0IEwgODYuOTE5IDExNC41MjQgWiBNIDExMi43OTMgMTQ5LjUyNCBMIDEyNC43OTggMTQ5LjUyNCBDIDEyNC40MzcgMTY1LjY3NiAxMTEuMDY3IDE3OC41MjQgOTQuNzk5IDE3OC41MjQgQyA3OC41MzIgMTc4LjUyNCA2NS4xNjIgMTY1LjY3NiA2NC44MDEgMTQ5LjUyNCBMIDc2LjgwNiAxNDkuNTI0IEMgNzcuMDg3IDE1Ni44NzggODEuOTc0IDE2My4xNTUgODguNzkzIDE2NS41MiBMIDg4Ljc5MyAxNDEuNTI0IEMgODguNzkzIDEzOC4yMSA5MS40OCAxMzUuNTI0IDk0Ljc5MyAxMzUuNTI0IEMgOTguMTA3IDEzNS41MjQgMTAwLjc5MyAxMzguMjEgMTAwLjc5MyAxNDEuNTI0IEwgMTAwLjc5MyAxNjUuNTI0IEMgMTA3LjYyIDE2My4xNjIgMTEyLjUxMSAxNTYuODgzIDExMi43OTMgMTQ5LjUyNCBaIiBmaWxsPSIjMzY1MEEyIi8+CiAgPC9nPgo8L3N2Zz4=" width="50%" />
                            </Flex>
                            <Flex width="77%" alignItems="center">
                                <Text fontSize="20px">Anchor</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </div>
        </Flex>
    )
}
const LoginWaxPromptOLD = (props) => {
    return (
        <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            height="788px"
        >
            <WaxLogo marginBottom="37px" />
            <Text
                fontFamily="Orbitron"
                fontSize="25px"
                color="#D9A555"
                letterSpacing="3px"
                marginBottom="27px"
            >
                Log into WAX Network
            </Text>
            <Text marginBottom="46px">-----login bars-----</Text>
            <ButtonGroup>
                <Button
                    width="139px"
                    height="46px"
                    fontFamily="Orbitron"
                    textTransform="uppercase"
                    fontSize="14px"
                    letterSpacing="2px"
                    color="#ffffff"
                    fontWeight="400"
                    borderRadius="0"
                    marginBottom="23px"
                    borderColor="#ffffff"
                    borderStyle="solid"
                    borderWidth="2px"
                    backgroundColor="transparent"
                    _focus={{ outline: 0 }}
                    _hover={{
                        backgroundColor: "#ffffff",
                        borderStyle: "solid",
                        borderWidth: "2px",
                        color: "#000000",
                        transform: "scale(0.95)",
                        transition: "0.3s",
                    }}
                    onClick={props.handleCancelClick}
                >
                    cancel
                </Button>
                <Button
                    width="111px"
                    height="46px"
                    fontFamily="Orbitron"
                    textTransform="uppercase"
                    fontSize="20px"
                    letterSpacing="2px"
                    color="#000000"
                    fontWeight="400"
                    borderRadius="0"
                    marginBottom="23px"
                    borderStyle="solid"
                    borderWidth="2px"
                    backgroundColor="#ffffff"
                    _focus={{ outline: 0 }}
                    _hover={{
                        backgroundColor: "transparent",
                        borderColor: "#ffffff",
                        borderStyle: "solid",
                        borderWidth: "2px",
                        color: "#ffffff",
                        transform: "scale(0.95)",
                        transition: "0.3s",
                    }}
                    onClick={() => {
                        props.handleOkClick("wax");
                    }}
                >
                    ok
                </Button>
            </ButtonGroup>
        </Flex>
    );
};

const LoginOtherPrompt = (props) => {
    return (
        <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            height="788px"
        >
            <Text
                fontFamily="Orbitron"
                fontSize="25px"
                color="#D9A555"
                letterSpacing="3px"
                marginBottom="9px"
                textAlign="center"
            >
                Choose Ethereum or Binance
            </Text>
            <Text
                fontFamily="Titillium Web"
                fontSize="15px"
                fontWeight="700"
                marginBottom="74px"
                textAlign="center"
            >
                You may only login into one
            </Text>

            <Flex
                direction={["column", "column", "row", "row", "row", "row"]}
                marginBottom="27px"
            >
                <Flex
                    direction="column"
                    width="241px"
                    marginBottom={["46", "46", "0", "0", "0", "0"]}
                    alignItems="center"
                >
                    <Box
                        backgroundImage={`url(${EthereumIcon})`}
                        backgroundPosition="center"
                        backgroundRepeat="no-repeat"
                        backgroundSize="contain"
                        width="102px"
                        height="102px"
                        marginBottom="74px"
                    />
                    <Button
                        width="167px"
                        height="46px"
                        fontFamily="Orbitron"
                        fontSize="21px"
                        letterSpacing="1px"
                        color="#000000"
                        fontWeight="400"
                        borderRadius="10px"
                        marginBottom="23px"
                        _focus={{ outline: 0 }}
                        _hover={{
                            backgroundColor: "transparent",
                            borderColor: "#ffffff",
                            borderStyle: "solid",
                            borderWidth: "2px",
                            color: "#ffffff",
                            transform: "scale(0.95)",
                            transition: "0.3s",
                        }}
                        onClick={() => {
                            props.handleOkClick("ethereum");
                        }}
                    >
                        Ethereum
                    </Button>
                </Flex>
                <Flex direction="column" width="241px" alignItems="center">
                    <Box
                        backgroundImage={`url(${BinanceIcon})`}
                        backgroundPosition="center"
                        backgroundRepeat="no-repeat"
                        backgroundSize="contain"
                        width="102px"
                        height="102px"
                        marginBottom="74px"
                    />
                    <Button
                        width="167px"
                        height="46px"
                        fontFamily="Orbitron"
                        fontSize="21px"
                        letterSpacing="1px"
                        color="#000000"
                        fontWeight="400"
                        borderRadius="10px"
                        marginBottom="23px"
                        _focus={{ outline: 0 }}
                        _hover={{
                            backgroundColor: "transparent",
                            borderColor: "#ffffff",
                            borderStyle: "solid",
                            borderWidth: "2px",
                            color: "#ffffff",
                            transform: "scale(0.95)",
                            transition: "0.3s",
                        }}
                        onClick={() => {
                            props.handleOkClick("binance");
                        }}
                    >
                        Binance
                    </Button>
                </Flex>
            </Flex>

            <Button
                width="139px"
                height="46px"
                minWidth="139px"
                minHeight="46px"
                fontFamily="Orbitron"
                fontSize="14px"
                letterSpacing="1px"
                color="#ffffff"
                fontWeight="400"
                borderRadius="10px"
                marginBottom="23px"
                textTransform="uppercase"
                backgroundColor="#E7384D"
                _focus={{ outline: 0 }}
                _hover={{
                    backgroundColor: "#000",
                    color: "#E7384D",
                    transform: "scale(0.95)",
                    transition: "0.3s",
                    borderColor: "#E7384D",
                    borderStyle: "solid",
                    borderWidth: "2px",
                }}
                onClick={props.handleCancelClick}
            >
                cancel
            </Button>
        </Flex>
    );
};

const TransferArrow = styled(Flex)<{}>`
  background-image: url(${(props) => WaxIconWhite});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 80%;
  height: 83px;
  margin-bottom: 27px;
  width: 250px;
`;

const TransferCondition = (props) => {
    const from = (props.from || "").toLowerCase() === "wax"
        ? props.activeAuthenticatorName : (props.from || "").charAt(0).toUpperCase() + (props.from || "").slice(1);
    const to = (props.to || "").toLowerCase() === "wax" ? props.activeAuthenticatorName : (props.to || "").charAt(0).toUpperCase() + (props.to || "").slice(1);

    const fromx =
        (props.from || "").toLowerCase() === "wax"
            ? (props.from || "").toUpperCase()
            : (props.from || "").charAt(0).toUpperCase() +
            (props.from || "").slice(1);
    const tox =
        (props.to || "").toLowerCase() === "wax"
            ? (props.to || "").toUpperCase()
            : (props.to || "").charAt(0).toUpperCase() + (props.to || "").slice(1);
    return (
        <Flex
            direction={["column", "column", "row", "row", "row", "row"]}
            fontFamily="Orbitron"
            fontSize="25px"
            letterSpacing="3px"
            marginBottom="27px"
            alignItems="center"
        >
            <Text>Transfer from&nbsp;</Text>
            <Text color="#E7384D">{from}&nbsp;</Text>
            <Text>to&nbsp;</Text>
            <Text color="#04D5A7">{to}</Text>
        </Flex>
    );
};

const TransferPrompt = (props) => {
    const state = useAppState();
    const activeAuthenticatorName = state.teleport.account && state.teleport.account["wax"] ? (state.teleport.account["wax"].activeAuthenticatorName || "") : "";

    const truncate = (str) => {
        return str?.length > 10 ? `${str.substr(0, 6)}...${str.slice(-4)}` : str;
    };

    const LogoFrom = () => {
        if (props.source.className === "ethereum") {
            return (
                <Flex direction="row" alignItems="center" justifyContent="flex-end" width="220px" paddingRight="40px">
                    <Text fontSize="16px" fontWeight="700" marginRight="20px">{truncate(props.source.name)}</Text>
                    <EthereumLogo height="40px" width="40px"/>
                </Flex>
            )
        }
        if (props.source.className === "binance") {
            return (
                <Flex direction="row" alignItems="center" justifyContent="flex-end" width="220px" paddingRight="40px">
                    <Text fontSize="16px" fontWeight="700" marginRight="20px">{truncate(props.source.name)}</Text>
                    <BinanceLogo height="40px" width="40px"/>
                </Flex>
            )
        }
        if (props.source.className === "wax") {
            return (
                <Flex justifyContent="flex-end" width="220px" paddingRight="40px">
                    {
                        activeAuthenticatorName.toLowerCase() === "wax" ? <WaxLogo  height="40px" width="130px"/> : <AnchorLogo  height="40px" width="130px"/>
                    }
                </Flex>
            )
        }

        return null;
    }

    const LogoTo = () => {
        if (props.destination.className === "ethereum") {
            return (
                <Flex direction="row" alignItems="center" justifyContent="flex-start" width="220px" paddingLeft="40px">
                    <Text fontSize="16px" fontWeight="700" marginRight="20px">{truncate(props.destination.name)}</Text>
                    <EthereumLogo height="40px" width="40px"/>
                </Flex>
            )
        }
        if (props.destination.className === "binance") {
            return (
                <Flex direction="row" alignItems="center" justifyContent="flex-start" width="220px" paddingLeft="40px">
                    <Text fontSize="16px" fontWeight="700" marginRight="20px">{truncate(props.destination.name)}</Text>
                    <BinanceLogo height="40px" width="40px"/>
                </Flex>
            )
        }
        if (props.destination.className === "wax") {
            return (
                <Flex justifyContent="flex-start" width="220px" paddingLeft="40px">
                    {
                        activeAuthenticatorName.toLowerCase() === "wax" ? <WaxLogo  height="40px" width="130px"/> : <AnchorLogo  height="40px" width="130px"/>
                    }
                </Flex>
            )
        }

        return null;
    }

    let Logo = null;
    switch (props.source.className) {
        case "ethereum":
            Logo = EthereumLogo;
            break;
        case "binance":
            Logo = BinanceLogo;
            break;
        default:
            Logo = activeAuthenticatorName.toLowerCase() === "wax" ? WaxLogo : AnchorLogo;
            break;
    }

    let LogoTox = null;
    switch (props.destination.className) {
        case "ethereum":
            LogoTox = EthereumLogo;
            break;
        case "binance":
            LogoTox = BinanceLogo;
            break;
        default:
            LogoTox = activeAuthenticatorName.toLowerCase() === "wax" ? WaxLogo : AnchorLogo;
            break;
    }

    const insufficientBalance = (props.source.className === "wax" && props.source.balance < 100) ? true
        : (props.source.className !== "wax" && props.source.balance < 1) ? true : false;

    const [amountToTransfer, setAmountToTransfer] = useState("");
    const handleAmountToTransferChange = (e) => {
        setAmountToTransfer(e.target.value);
        props.handleAmountToTransfer(e.target.value);
    };

    useEffect(() => {
        const el = document.getElementsByClassName('teleport-modal-transferprompt-balance');
        if (el && el[0]) {
            // @ts-ignore
            const elIns = document.getElementsByClassName("teleport-modal-transferprompt-insufficient-message");
            if (elIns && elIns[0]) {
                // @ts-ignore
                elIns[0].style.left = `${(el[0].offsetLeft + el[0].offsetWidth + 5)}px`;
            }
        }
    }, [])

    return (
        <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            height="788px"
        >
            {
                props.locked ? <Box position={'absolute'} width={'100%'} height={'100%'} zIndex={100}/> : null
            }
            <OneWayArrow
                marginBottom="27px"
                transform={[
                    "rotate(90deg)",
                    "rotate(90deg)",
                    "rotate(90deg)",
                    "rotate(90deg)",
                    "rotate(0deg)",
                    "rotate(0deg)",
                ]}
            />
            <TransferCondition
                from={props.source.className}
                to={props.destination.className}
                activeAuthenticatorName={activeAuthenticatorName}
            />
            <Flex justifyContent="space-between" alignItems="center" marginBottom="18px">
                <LogoFrom/>
                <Text
                    fontWeight="700"
                    color="#999999"
                    fontSize="18px"
                >to</Text>
                <LogoTo/>
            </Flex>
            <Text fontWeight="700" color="#D9A555" marginBottom="13px">
                {props.source.network ? props.source.network.name : activeAuthenticatorName} Liquid Balance
            </Text>
            <Flex direction="column" marginBottom="37px" alignItems="center">
                <Text
                    className="teleport-modal-transferprompt-balance"
                    fontFamily="Orbitron"
                    fontSize="28px"
                    fontWeight="500"
                    color={insufficientBalance ? "#E7384D" : "#ffffff"}
                    onClick={()=>{
                    }}
                >
                    {`${props.source.balance} TLM`}
                </Text>
                {
                    insufficientBalance ? (
                        <Text
                            className="teleport-modal-transferprompt-insufficient-message"
                            fontSize="15px"
                            fontWeight="500"
                            color="#999999"
                            whiteSpace="nowrap"
                        >
                            Minimum {props.source.className === "wax" ? 100 : 1} TLM
                        </Text>
                    ) : null

                }
            </Flex>
            <Text
                fontWeight="700"
                color="#999999"
                fontSize="15px"
                marginBottom="18px"
                display={insufficientBalance ? "none" : "block"}
            >
                input amount
            </Text>
            <Input
                display={insufficientBalance ? "none" : "block"}
                disabled={insufficientBalance || props.locked}
                fontFamily="Orbitron"
                fontSize="27px"
                color="#ffffff"
                borderRadius="0"
                width="380px"
                height="55px"
                textAlign="center"
                borderStyle="solid"
                borderWidth="2px"
                marginBottom="18px"
                _focus={{ outline: 0 }}
                placeholder="0"
                value={amountToTransfer}
                onChange={handleAmountToTransferChange}
                onKeyPress={isNumber}
            />
            <ButtonGroup>
                <Button
                    filter={props.locked ? "grayscale(1)" : "grayscale(0)"}
                    height="46px"
                    fontFamily="Orbitron"
                    textTransform="uppercase"
                    fontSize="20px"
                    letterSpacing="3px"
                    color="#ffffff"
                    fontWeight="400"
                    borderRadius="0"
                    borderStyle="solid"
                    borderWidth="2px"
                    borderColor="#E7384D"
                    backgroundColor="#E7384D"
                    padding="0 23px 0 23px"
                    _focus={{ outline: 0 }}
                    _hover={{
                        backgroundColor: "transparent",
                        borderStyle: "solid",
                        borderWidth: "2px",
                        borderColor: "#E7384D",
                        color: "#E7384D",
                        transform: "scale(0.95)",
                        transition: "200ms",
                    }}
                    onClick={props.locked ? null : props.handleCancelClick}
                >
                    cancel
                </Button>
                <Button
                    display={insufficientBalance ? "none" : "block"}
                    filter={props.locked ? "grayscale(1)" : "grayscale(0)"}
                    height="46px"
                    fontFamily="Orbitron"
                    textTransform="uppercase"
                    fontSize="20px"
                    letterSpacing="3px"
                    color="#000000"
                    fontWeight="400"
                    borderRadius="0"
                    borderStyle="solid"
                    borderWidth="2px"
                    borderColor="#04D5A7"
                    backgroundColor="#04D5A7"
                    padding="0 23px 0 23px"
                    cursor={
                        amountToTransfer && amountToTransfer.length > 0
                            ? "pointer"
                            : props.locked ? "not-allowed" : "not-allowed"
                    }
                    _focus={{ outline: 0 }}
                    _hover={{
                        backgroundColor: "#ffffff",
                        borderColor: "#ffffff",
                        borderStyle: "solid",
                        borderWidth: "2px",
                        color: "#04D5A7",
                        transform: "scale(0.95)",
                        transition: "200ms",
                    }}
                    onClick={props.locked ? null : () => {
                        if (amountToTransfer && amountToTransfer.length > 0) {
                            props.handleApproveClick(amountToTransfer);
                        }
                    }}
                >
                    approve
                </Button>
            </ButtonGroup>
            <Text
                display={insufficientBalance ? "none" : "block"}
                fontWeight="700"
                color="#999999"
                fontSize="15px"
                marginTop="18px"
            >
                {
                    props.source.className !== 'wax' ? 'Please confirm the GAS Fees on Metamask after approval.' : ''
                }
            </Text>
        </Flex>
    );
};

const TransferPromptApproved = ({
                                    source,
                                    destination,
                                    amountToTransfer,
                                    refHandleGoToDashboardClick,
                                    web3,
                                }) => {

    const actions = useActions();
    const state = useAppState();

    let _prevBalance = 0;
    if (state.teleport.account[source.className]) {
        _prevBalance = state.teleport.account[source.className].balance;
    }

    useEffect(() => {

        const balanceInterval = setInterval(() => {
            const sourceName = source.className;
            actions.teleport.getETHBalance({sourceName, web3}).then(responseBal => {
                if (_prevBalance !== responseBal) {
                    clearInterval(balanceInterval);
                    refHandleGoToDashboardClick();
                }
            });
        }, 5000);

        return () => {
            if (balanceInterval) {
                clearInterval(balanceInterval);
            }
        }
    }, [])

    let SrcLogo = null;
    switch (source.className) {
        case "ethereum":
            SrcLogo = EthereumLogo;
            break;
        case "binance":
            SrcLogo = BinanceLogo;
            break;
        default:
            SrcLogo = WaxLogo;
            break;
    }
    let DesLogo = null;
    switch (destination.className) {
        case "ethereum":
            DesLogo = EthereumLogo;
            break;
        case "binance":
            DesLogo = BinanceLogo;
            break;
        default:
            DesLogo = WaxLogo;
            break;
    }

    let ProcessingMessage = null;
    switch (source.className) {
        case "ethereum":
            ProcessingMessage = (
                <Flex direction="column" justifyContent="center" alignItems="center">
                    <Text
                        fontWeight="700"
                        color="#ffffff"
                        fontSize="15px"
                    >Confirm in Metamask this transaction.</Text>
                    <Text
                        fontWeight="700"
                        color="#999999"
                        fontSize="15px"
                        marginBottom="18px"
                    >After confirmation please allow a few minutes to see your transfer.</Text>
                </Flex>
            );
            break;
        case "binance":
            ProcessingMessage = (
                <Flex direction="column" justifyContent="center" alignItems="center">
                    <Text
                        fontWeight="700"
                        color="#ffffff"
                        fontSize="15px"
                    >Confirm in Metamask this transaction.</Text>
                    <Text
                        fontWeight="700"
                        color="#999999"
                        fontSize="15px"
                        marginBottom="18px"
                    >After confirmation please allow a few minutes to see your transfer.</Text>
                </Flex>
            );
            break;
        default:
            ProcessingMessage = (
                <Text
                    fontWeight="700"
                    color="#999999"
                    fontSize="15px"
                    marginBottom="18px"
                >this transaction will take a few minutes...</Text>
            )
            break;
    }

    return (
        <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            height="787px"
        >
            <Flex
                direction={["column", "column", "column", "row", "row", "row"]}
                marginBottom="27px"
            >
                <SrcLogo />
                <OneWayArrow
                    marginTop={["46px", "46px", "46px", "0", "0", "0"]}
                    marginBottom={["46px", "46px", "46px", "0", "0", "0"]}
                    transform={[
                        "rotate(90deg)",
                        "rotate(90deg)",
                        "rotate(90deg)",
                        "rotate(0deg)",
                        "rotate(0deg)",
                        "rotate(0deg)",
                    ]}
                />
                <DesLogo />
            </Flex>
            <Text
                fontFamily="Orbitron"
                fontSize="20px"
                color="#ffffff"
                letterSpacing="3px"
                marginBottom="28px"
            >
                processing...
            </Text>
            <Text
                fontFamily="Orbitron"
                fontSize="28px"
                fontWeight="500"
                color="#04d5a7"
                marginBottom="28px"
            >
                {`${amountToTransfer} TLM`}
            </Text>
            {ProcessingMessage}
            <Button
                height="46px"
                minWidth="140px"
                minHeight="46px"
                fontFamily="Orbitron"
                fontSize="14px"
                letterSpacing="1px"
                color="#ffffff"
                fontWeight="500"
                textTransform="uppercase"
                borderRadius="0"
                marginBottom="23px"
                borderColor="#ffffff"
                borderStyle="solid"
                borderWidth="2px"
                backgroundColor="transparent"
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
                onClick={refHandleGoToDashboardClick}
            >
                go to transactions
            </Button>
        </Flex>
    );
};

const ErrorPrompt: React.FC = ({ children }) => {
    return (
        <Flex
            direction="column"
            alignItems="center"
            height="787px"
            justifyContent="center"
        >
            <ErrorIcon height="74px" />
            <Text
                fontFamily="Orbitron"
                fontSize="23px"
                color="#E7384D"
                letterSpacing="2px"
                marginTop="37px"
            >
                Error
            </Text>
            <Flex marginTop="37px">{children}</Flex>
        </Flex>
    );
};

const SuccessPrompt: React.FC = ({ children }) => {
    return (
        <Flex
            direction="column"
            alignItems="center"
            height="787px"
            justifyContent="center"
        >
            <SuccessIcon height="74px" />
            <Text
                fontFamily="Orbitron"
                fontSize="23px"
                color="#04D5A7"
                letterSpacing="2px"
                marginTop="37px"
            >
                Success
            </Text>
            <Flex marginTop="37px">{children}</Flex>
        </Flex>
    );
};


const fadeIn = keyframes`
  0%{opacity:0;}
  100%{opacity:1;}
`

const fadeOut = keyframes`
  0%{opacity:1;}
  100%{opacity:0;}
`;

const AddWalletContainer = styled(Flex)<{}>`
  direction: column;
  align-items: center;
  justify-content: center;
  height: 788px;
  animation: ${props => fadeIn} 1s forwards;
`

const AddWalletPrompt = (props) => {
    let Logo = null;
    switch (props.selectedNetwork) {
        case "ethereum":
            Logo = EthereumIcon;
            break;
        case "binance":
            Logo = BinanceIcon;
            break;
        default:
            Logo = WaxIconWhite;
            break;
    }

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 1}}
        >

            <Flex direction="column" alignItems="center"
                  position={['relative', 'relative', 'fixed', 'fixed', 'fixed', 'fixed']}
                  top={['0', '0', '50%', '50%', '50%', '50%']}
                  left={['0', '0', '50%', '50%', '50%', '50%']}
                  transform={['translate(0,0)', 'translate(0,0)', 'translate(-50%, -50%)', 'translate(-50%, -50%)', 'translate(-50%, -50%)', 'translate(-50%, -50%)']}
            >
                <Image src={Logo} height="100px" marginBottom="20px"/>
                <Text
                    fontFamily="Titillium Web"
                    fontWeight="bold"
                    fontSize="17px"
                    letterSpacing="0.1em"
                    textAlign="center"
                >
                    We see you don't have the {props.selectedNetwork === "ethereum" ? "Ethereum Mainnet" : "Binance Smart Chain"}
                </Text>
                <Text
                    fontFamily="Titillium Web"
                    fontWeight="bold"
                    fontSize="17px"
                    letterSpacing="0.1em"
                    textAlign="center"
                >
                    on your Metamask Network, would you like to add it?
                </Text>
                <Flex direction={['column', 'column', 'column', 'column', 'column', 'row']} alignItems="center" marginTop="20px">
                    <Box
                        className="mainbtncont gold"
                        onClick={props.handleAddWalletClick}
                    >
                        <div className="mainbtnwrap">
                            <div className="mainbtn">Yes, add {props.selectedNetwork === "ethereum" ? "ETH" : "BSC"} to my Network</div>
                        </div>
                    </Box>

                    <Button
                        marginLeft="15px"
                        fontFamily="Orbitron"
                        textTransform="uppercase"
                        fontSize="16px"
                        letterSpacing="3px"
                        backgroundColor="transparent"
                        color="#ffffff"
                        fontWeight="400"
                        borderRadius="8px"
                        borderColor="#ffffff"
                        borderStyle="solid"
                        borderWidth="2px"
                        padding="20px 20px 20px 20px"
                        cursor="pointer"
                        _focus={{outline: 0}}
                        _hover={{
                            backgroundColor: "#ffffff",
                            borderColor: "#ffffff",
                            borderStyle: "solid",
                            borderWidth: "2px",
                            color: "#000000",
                            transform: "scale(0.95)",
                            transition: "0.3s",
                        }}
                        onClick={props.handleCloseClick}
                    >
                        no thank you
                    </Button>

                </Flex>
            </Flex>
        </motion.div>
    );
};

const MetamaskLoginWarning = () => {
    return (
        <Flex justifyContent="center" marginTop="8%">
            <Text
                fontSize="20px"
                color="#ff0000"
                fontWeight="bold"
            >Please use MetaMask Wallet when using "WalletConnect"</Text>
        </Flex>
    )
}

export {
    TeleportModal,
    LoginWaxPrompt,
    LoginOtherPrompt,
    TransferPrompt,
    TransferPromptApproved,
    ErrorPrompt,
    SuccessPrompt,
    AddWalletPrompt,
    MetamaskLoginWarning
};

import React, { useEffect, useState } from "react";

import { Flex, Box, Image } from "@chakra-ui/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import DashboardLogo from "assets/images/alienworlds-teleport-logo-icon-thin.svg";
import LazyLoad from "react-lazyload";
import { useAppState, useActions } from "store";

import { TeleportTransactionItem } from "./components/TeleportTransactionItem";

import "styles/teleport.css";

const Container = styled(Flex)<{ closing }>`
  align-items: center;
  ${(props) =>
    props.closing === "true" &&
    css`
      opacity: 0;
      transform: translateY(100vh);
      transition: all 1.5s ease-out;
    `}
  flex-direction: column;
  width: 100%;
`;

const TeleportTransaction = (props) => {
  const actions = useActions();
  const state = useAppState();
  const [isClosing, setClosing] = useState(false);

  const handleGoToMainClick = () => {
    setClosing(true);
    props.gotoMainClick();
  };

  useEffect(() => {
    actions.teleport.loadTeleports();
    const loadTeleportInterval = setInterval(
      () => actions.teleport.loadTeleports(),
      30000
    );
    return () => {
      if (loadTeleportInterval) {
        clearInterval(loadTeleportInterval);
      }

      actions.teleport.resetLoadedTeleportCount();
      actions.teleport.resetClaimings();
      actions.teleport.resetErrorSelectedItem();
    };
  }, [isClosing]);

  useEffect(() => {
    if (!state.teleport.isLoadingTeleports) {
      console.log(
        "Teleport List: ",
        JSON.parse(JSON.stringify(state.teleport.transactions))
      );

      actions.teleport.setTempTransFromWaxPending();
    }
  }, [state.teleport.isLoadingTeleports]);

  return (
    <Container closing="false">
      <Image
        src={DashboardLogo}
        height="70px"
        marginTop={["200px", "200px", "200px", "80px", "80px", "80px"]}
        marginBottom="20px"
      />
      <Box
        marginBottom="20px"
        className="mainbtncont teal"
        onClick={handleGoToMainClick}
      >
        <div className="mainbtnwrap">
          <div className="mainbtn">
            <div style={{ zIndex: 3 }}>New Transfer</div>
          </div>
        </div>
      </Box>

      <Flex direction="column">
        {state.teleport.transactions.map((trans, idx) => {
          return (
            <LazyLoad
              // @ts-ignore
              key={`transitem-${state.teleport.metamaskChainId}-${trans.id}-${idx}`}
              height="10vh"
            >
              <Flex
                borderTopStyle="solid"
                borderTopColor="#d3d3d3"
                borderTopWidth={["1px", "1px", "1px", "1px", "0", "0"]}
              >
                <TeleportTransactionItem
                  item={trans}
                  claim={(selectedItem) => {
                    props.claim(selectedItem);
                  }}
                  stake={(teleportId) => {
                    props.stake(teleportId);
                  }}
                  locked={false}
                  handleSwitch={props.handleSwitchNetwork}
                  cancelClaim={(selectedItem) => {
                    props.cancelClaim(selectedItem);
                  }}
                />
              </Flex>
            </LazyLoad>
          );
        })}
      </Flex>
    </Container>
  );
};

export default TeleportTransaction;

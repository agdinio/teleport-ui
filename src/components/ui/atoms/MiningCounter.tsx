import React, { useEffect, useState } from "react";

import { Box, chakra, Flex, Text } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import { useActions, useAppState } from "../../../store";
import { msToTime, padTimeWithZero } from "../../../util/helpers";
import { BoltIcon, BoltOutlineIcon } from "../Icons";
import { MainButton } from "../MainButton";
import { MenuButton } from "../MenuButton";

const CounterText = ({ time }) => {
  return (
    <Text fontFamily="Orbitron" fontSize="2xl" color="white" lineHeight={1}>
      <chakra.span color={time.hours <= 0 ? "gray.600" : "white"}>
        {padTimeWithZero(time.hours)}
      </chakra.span>
      :
      <chakra.span
        color={time.hours <= 0 && time.minutes <= 0 ? "gray.600" : "white"}
      >
        {padTimeWithZero(time.minutes)}
      </chakra.span>
      :<chakra.span>{padTimeWithZero(time.seconds)}</chakra.span>
    </Text>
  );
};
const MiningCounter = () => {
  const {
    game: {
      mineDelay,
      miningRandomString,
      loading: { isMining },
    },
  } = useAppState();
  const actions = useActions();
  const history = useHistory();

  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    isZero: false,
  });

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(msToTime(mineDelay - new Date().getTime()));
    }, 1000);
    return () => {
      clearInterval(timerID);
    };
  }, [mineDelay]);

  function mine() {
    actions.game.mine();
  }

  function claimMine() {
    actions.game.claimMine();
  }

  async function changeLand() {
    history.push("/onboarding/landchooser");
  }

  // @ts-ignore
  return (
    <Flex alignItems="center" color="#07a3dd">
      <Box w="24px" h="40px" mr={2} position="relative">
        {time.isZero && (
          <Box
            position="absolute"
            display="flex"
            w="full"
            left={0}
            top={0}
            bottom={0}
          >
            <BoltIcon fill="#fff" width="100%" />
          </Box>
        )}
        <Box
          position="absolute"
          display="flex"
          w="26px"
          left="-1px"
          top={0}
          bottom={0}
        >
          <BoltOutlineIcon fill="#07a3dd" width="100%" />
        </Box>
      </Box>
      <Flex direction="column" ml={2}>
        {!time.isZero ? (
          <>
            {/* {miningDelay ? <Spinner /> : <CounterText time={time} />} */}
            <CounterText time={time} />
            <Text
              fontFamily="Titillium Web"
              fontWeight="bold"
              letterSpacing="0.1em"
              fontSize="sm"
              whiteSpace="nowrap"
            >
              Next Mine Attempt
            </Text>
          </>
        ) : (
          <Flex alignItems="center">
            {miningRandomString ? (
              <MainButton
                // @ts-ignore
                alignSelf="stretch"
                variant="mine"
                onClick={claimMine}
                isLoading={isMining}
              >
                Claim mine
              </MainButton>
            ) : (
              <Flex alignItems="center">
                <MainButton // @ts-ignore
                  alignSelf="stretch"
                  variant="mine"
                  onClick={mine}
                  isLoading={isMining}
                >
                  Mine
                </MainButton>
                <MenuButton
                  display={{ base: "none", sm: "flex" }}
                  ml={3}
                  leftIcon={null}
                  alignSelf="stretch"
                  size="sm"
                  fontSize="md"
                  borderColor="#d9a555"
                  borderWidth="2px"
                  fontFamily="Titillium Web"
                  fontWeight="bold"
                  color="white"
                  lineHeight={1}
                  _hover={{
                    bg: "#d9a555",
                  }}
                  onClick={changeLand}
                >
                  Change
                </MenuButton>
              </Flex>
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export { MiningCounter };

import React, { useEffect, useState } from "react";

import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { WaxLogo, TelegramIcon, DiscordIcon } from "components/ui/Icons";
import { useHistory } from "react-router-dom";

import { MainButton } from "../components/ui/MainButton";
import { NakedButton } from "../components/ui/NakedButton";
import { useActions, useAppState } from "../store";

function App() {
  const history = useHistory();
  const [loading, setIsLoading] = useState(false);
  const {
    game: { wax },
  } = useAppState();
  const actions = useActions();

  async function login() {
    setIsLoading(true);
    try {
      const wallet = await wax().login();
      console.log("WALLET", wallet);
      actions.game.setWallet(wallet as string);
      await actions.game.loadUniverseData();
      await actions.game.selectInitialLand();
      await actions.game.loadPlayerData();
      actions.game.navigate(history);
    } catch (ex) {
      console.log(ex);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      const l = await fetch("/data/lands.json");
      const json = await l.json();
      actions.game.setLandCache(json);
    })();
  }, []);

  return (
    <Flex
      p={{ base: 4, md: 16 }}
      flexDirection="column"
      mx="auto"
      textAlign="center"
      position="relative"
      alignItems="center"
      justifyContent="center"
      flexGrow={1}
      w="full"
      color="#e0e0e0"
    >
      <Flex
        flexDirection="column"
        flexGrow={1}
        alignItems="center"
        justifyContent="center"
        w="full"
        mx="auto"
        fontFamily="Titillium Web"
      >
        <Image
          src="/images/alienworlds-db-logo_full_color.svg"
          alt="Alien Workds Logo"
          w="full"
          maxW="250px"
          mb={{ base: 12, md: 20 }}
        />

        <Text
          mb={2}
          color="#77bdff"
          fontFamily="Titillium Web"
          fontWeight="bold"
          fontSize="xl"
          letterSpacing="0.2em"
        >
          BEGIN WITH
        </Text>
        <Box maxW="210px" w="full" mb={2}>
          <WaxLogo fill="#fff" />
        </Box>
        <Text
          mb={{ base: 12, md: 20 }}
          fontFamily="Orbitron"
          fontSize="xl"
          color="#fff"
          letterSpacing="0.1em"
        >
          Cloud Wallet
        </Text>

        <MainButton onClick={login} size="xl" isLoading={loading}>
          Start Now
        </MainButton>
        <Text mt={1}>Register, OAuth or login</Text>
      </Flex>

      <Flex
        color="white"
        mt={8}
        alignItems="center"
        justify="center"
        flexWrap="wrap"
      >
        <Text mt={4}>Join the community</Text>
        <Flex ml={8} alignItems="center" justify="center" flexWrap="wrap">
          <a
            href="https://t.me/AlienWorldsSupport"
            target="_blank"
            rel="noreferrer"
          >
            <NakedButton
              color="white"
              fill="white"
              leftIcon={
                <Box w="29px">
                  <TelegramIcon />
                </Box>
              }
              mt={4}
            >
              Telegram
            </NakedButton>
          </a>

          <a
            href="https://discord.com/invite/QHPJxuq"
            target="_blank"
            rel="noreferrer"
          >
            <NakedButton
              leftIcon={
                <Box w="29px">
                  <DiscordIcon />
                </Box>
              }
              ml={4}
              mt={4}
            >
              Discord
            </NakedButton>
          </a>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default App;

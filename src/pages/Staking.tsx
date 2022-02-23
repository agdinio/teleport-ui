import React from "react";

import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { MetamaskLogo, BinanceLogo } from "components/ui/Icons";

import { MainButton } from "../components/ui/MainButton";

const Staking = () => {
  const { chainId, account, activate, active } = useWeb3React<Web3Provider>();
  function signInToMetamask() {
    activate(
      new InjectedConnector({
        // supportedChainIds: [
        //   1, // Mainet
        //   3, // Ropsten
        //   4, // Rinkeby
        //   5, // Goerli
        //   42, // Kovan
        // ],
      })
    );
  }
  return (
    <Flex alignItems="center" direction="column" mx="auto" textAlign="center">
      <Heading as="h1" color="#d9a555" size="3xl" fontWeight="thin" mb={4}>
        Planet Binance Missions {chainId}, {account}
      </Heading>
      <Text fontSize="xl">
        Lease Spacecrafts to send on missions across the Metaverse
      </Text>
      <Box maxW={100} w="full" my={6}>
        <MetamaskLogo />
      </Box>
      <Box my={12}>
        <MainButton onClick={signInToMetamask} size="xl">
          Connect to Metamask
        </MainButton>
      </Box>
      <Text color="#f0b90a">
        Make sure you are connected to the{" "}
        <span>Binance Smart Chain Network</span>
        <Box maxW={8} mx="auto">
          <BinanceLogo />
        </Box>
      </Text>
    </Flex>
  );
};

export default Staking;

import React from "react";

import { Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";

import { useActions, useAppState, useEffects } from "../store";
import { InventoryGrid } from "./Inventory";

function Profile() {
  const history = useHistory();
  const {
    game: { wax, wallet, tag, currency, waxCurrency, getAssetsByType },
  } = useAppState();
  const actions = useActions();
  const effects = useEffects();

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.3 }}
    >
      <Heading as="h2" size="xl" fontFamily="'Sigmar One', cursive" mb={4}>
        ACCOUNT
      </Heading>
      <Flex
        flexWrap="wrap"
        justify="space-between"
        mb={4}
        textAlign="left"
        fontWeight="semibold"
        fontFamily="Titillium Web"
      >
        <VStack align="flex-start" mb={2}>
          <Text fontSize="2xl">{tag}</Text>
          <Text fontSize="2xl">{wallet}</Text>
        </VStack>
        <VStack align="flex-start" mb={2}>
          <Text fontSize="2xl">{waxCurrency}</Text>
          <Text fontSize="2xl">{currency} TLM</Text>
        </VStack>
      </Flex>
      {/* <Heading as="h2" size="xl" fontFamily="'Sigmar One', cursive" mb={4}> */}
      {/*  ACTIONS */}
      {/* </Heading> */}
      {/* <ButtonGroup spacing={4} mb={4} flexWrap="wrap" color="black"> */}
      {/*  {miningRandomString ? ( */}
      {/*    <Button */}
      {/*      mt={4} */}
      {/*      onClick={claimMine} */}
      {/*      disabled={mineDelayInMs > 0 || isMining} */}
      {/*      isLoading={isMining} */}
      {/*    > */}
      {/*      Claim mine result */}
      {/*    </Button> */}
      {/*  ) : ( */}
      {/*    <Button */}
      {/*      mt={4} */}
      {/*      onClick={mine} */}
      {/*      disabled={mineDelayInMs > 0 || isMining} */}
      {/*      isLoading={isMining} */}
      {/*    > */}
      {/*      Mine */}
      {/*    </Button> */}
      {/*  )} */}

      {/*  <Button mt={4} onClick={changeLand}> */}
      {/*    Change land */}
      {/*  </Button> */}
      {/*  <Button mt={4} onClick={reloadTLM}> */}
      {/*    Reload TLM */}
      {/*  </Button> */}
      {/*  <Button mt={4} onClick={getStaked}> */}
      {/*    Get Staked */}
      {/*  </Button> */}
      {/*  <Button mt={4} onClick={getUnStaked}> */}
      {/*    Get UnStaked */}
      {/*  </Button> */}
      {/* </ButtonGroup> */}

      <Heading as="h2" size="xl" fontFamily="Titillium Web" mb={4}>
        YOUR ASSETS
      </Heading>
      <InventoryGrid assets={getAssetsByType()} />
    </motion.div>
  );
}

export default Profile;

import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { FillRate } from "components/ui/atoms/FillRate";
import { MiningPot } from "components/ui/atoms/MiningPot";
import { PlanetImage } from "components/ui/planets/PlanetImage";
import { motion } from "framer-motion";
import { useAppState } from "store";

import { ChargeTime } from "../components/ui/atoms/ChargeTime";
import { MiningPower } from "../components/ui/atoms/MiningPower";
import { NFTLuck } from "../components/ui/atoms/NFTLuck";
import { POWReduction } from "../components/ui/atoms/POWReduction";
import { BagItemChooser } from "../components/ui/BagItemChooser";

const Title = () => {
  return (
    <Box w={{ base: "full", md: 3 / 4 }} textAlign="start">
      <Heading
        as="h2"
        fontFamily="Orbitron"
        size="lg"
        color="white"
        fontWeight="normal"
      >
        Choose your Inventory to Mine
      </Heading>
      <Text fontFamily="Titillium Web" fontWeight="thin" color="#e0e0e0">
        Description about inventory, multipliers, etc.
      </Text>
    </Box>
  );
};

const Mining = () => {
  const {
    game: { planet, bag },
  } = useAppState();

  function getEmptySlots() {
    const result = [];
    for (let i = 0; i < 3 - Object.values(bag)?.slice(0, 3)?.length; i += 1) {
      result.push(null);
    }
    return result;
  }

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.3 }}
    >
      <VStack spacing={4} w="full" px={6}>
        <Flex
          mt={{ base: 12, lg: 32 }}
          direction={{ base: "column", lg: "row" }}
          w="full"
          justifyContent="center"
          sx={{
            gap: "30px",
          }}
        >
          <Box display={{ lg: "none" }}>
            <Title />
          </Box>
          <Flex
            direction={{ base: "row", lg: "column" }}
            alignItems={{ base: "center" }}
            gridGap={8}
            w={{ base: "full", lg: 1 / 4 }}
          >
            {planet && (
              <Box maxW={{ base: 24, lg: 48 }}>
                <PlanetImage
                  planet={planet}
                  titleDisplay={{ base: "none", lg: "unset" }}
                />
              </Box>
            )}
            <Box>
              <Flex
                direction="column"
                alignItems="flex-start"
                textAlign="start"
                w="full"
                gridGap={4}
              >
                <MiningPot />
                <FillRate />
                <ChargeTime />
                <MiningPower />
                <NFTLuck />
                <POWReduction />
              </Flex>
            </Box>
          </Flex>
          <Flex flexWrap="wrap" gridGap={6} position="relative">
            <Flex
              textAlign="left"
              w="full"
              justifyContent="flex-start"
              mb={12}
              position="absolute"
              top={-32}
              left={0}
              display={{ base: "none", lg: "flex" }}
            >
              <Title />
            </Flex>
            {Object.values(bag).map((item) => (
              <BagItemChooser key={item.asset_id} assetId={item.asset_id} />
            ))}
            {getEmptySlots().map((item, index) => (
              <BagItemChooser
                key={`emptytool-${index}`}
                assetId={null}
                noRemove
              />
            ))}
          </Flex>
        </Flex>
      </VStack>
    </motion.div>
  );
};

export default Mining;

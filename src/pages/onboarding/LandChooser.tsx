import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Center,
  chakra,
  Flex,
  Heading,
  Spinner,
  Text,
  VStack,
  Img,
  Grid,
  SimpleGrid,
  Icon,
} from "@chakra-ui/react";
import { ExplorerApi } from "atomicassets";
import { toast } from "react-hot-toast";
import { Link, useHistory } from "react-router-dom";

import { ReactComponent as FillrateIcon } from "../../assets/images/alienworlds-db-icon-fillrate.svg";
import { ReactComponent as TriliumIcon } from "../../assets/images/alienworlds-db-icon-trilium.svg";
import { ScreenActionButtons } from "../../components/ui/atoms/ScreenActionButtons";
import { NFTCard } from "../../components/ui/NFTCard";
import { PlanetImage } from "../../components/ui/planets/PlanetImage";
import { ScreenActionButton } from "../../components/ui/ScreenActionButton";
import { useActions, useAppState, useEffects } from "../../store";
import { setLand } from "../../store/game/effects";

const MiningPot = ({ number }) => {
  return (
    <Flex alignItems="flex-start" color="#0ed4a8">
      <Box w="31px" position="relative" fill="#0ed4a8">
        <TriliumIcon />
      </Box>
      <Flex direction="column" alignItems="flex-start" ml={4}>
        <Text fontSize="lg" lineHeight={1} fontFamily="Orbitron" color="white">
          {number}
        </Text>
        <Text
          fontFamily="Titillium Web"
          fontWeight="bold"
          fontSize="sm"
          letterSpacing="0.1em"
        >
          Current Mining Pot
        </Text>
      </Flex>
    </Flex>
  );
};

const FillRate = ({ number }) => {
  return (
    <Flex alignItems="flex-start" color="#00baff">
      <Box w="31px" position="relative" fill="#00baff">
        <FillrateIcon />
      </Box>
      <Flex direction="column" ml={4} alignItems="flex-start">
        <Text fontSize="lg" lineHeight={1} fontFamily="Orbitron" color="white">
          {`${number.split(".")[0]}.${number.split(".")[1].substring(0, 4)}`}
        </Text>
        <Text
          fontFamily="Titillium Web"
          fontWeight="bold"
          fontSize="sm"
          letterSpacing="0.1em"
        >
          Fillrate
        </Text>
      </Flex>
    </Flex>
  );
};

const Title = ({ title }: { title: string }) => {
  return (
    <Box w={{ base: "full", md: 3 / 4 }} textAlign="start">
      <Heading
        as="h2"
        fontFamily="Orbitron"
        size="lg"
        color="white"
        fontWeight="normal"
      >
        Choose Land to Mine on {title}
      </Heading>
      <Text fontFamily="Titillium Web" fontWeight="thin" color="#e0e0e0">
        Sub Description about Land/Mining
      </Text>
    </Box>
  );
};

const api = new ExplorerApi("https://wax.api.atomicassets.io", "atomicassets", {
  fetch,
});

const LandChooser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [landAssets, setLandAssets] = useState(null);

  const [selectedLand, setSelectedLand] = useState(null);
  const {
    game: { wax, planet, account, miner },
  } = useAppState();
  const actions = useActions();
  const effects = useEffects();
  const history = useHistory();

  useEffect(() => {
    if (account && miner) {
      actions.game.loadMineDelay();
    }
  }, []);

  useEffect(() => {
    setLandAssets(null);
    (async () => {
      const result = await api.getAssets({
        ids: planet.map
          .slice(0, 30)
          .reduce((prev, item) => `${prev},${item.asset_id}`, "")
          .substr(1),
      });
      setLandAssets(result);
      console.log("landassets", result);
    })();
  }, [planet]);

  async function ready() {
    try {
      setIsLoading(true);
      const newAccount = !(account && miner);
      await effects.game.setLand(wax(), selectedLand.asset_id);
      if (newAccount) {
        await effects.game.setInitialBag(wax());
      }
      await actions.game.loadPlayerData({ untilMinerReady: true });
      actions.game.navigate(history);
    } catch (ex) {
      console.log("ERROR");
      toast.error(ex.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <VStack spacing={4} w="full" px={{ base: 6, lg: 16 }}>
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
            <Title title={planet?.title} />
          </Box>
          <Flex
            direction={{ base: "column", sm: "row", lg: "column" }}
            alignItems={{ base: "center" }}
            gridGap={8}
            w={{ base: "full", lg: 1 / 4 }}
          >
            {planet && (
              <Box>
                <PlanetImage
                  planet={planet}
                  titleDisplay={{ sm: "none", lg: "unset" }}
                  flexDirection={{ base: "row", md: "column" }}
                  imageBoxSize={{ base: 24, sm: 36, lg: 48 }}
                />
              </Box>
            )}
            <Flex
              direction="column"
              alignItems="flex-start"
              textAlign="start"
              gridGap={4}
            >
              <MiningPot number={planet.details.bucket_total} />
              <FillRate number={planet.details.fill_rate} />
            </Flex>
          </Flex>
          <Flex
            gridGap={8}
            flexWrap="wrap"
            justifyContent={{ base: "center", lg: "flex-start" }}
            alignItems="flex-start"
            w="full"
            position="relative"
          >
            <Flex
              textAlign="left"
              w="full"
              justifyContent="flex-start"
              mb={12}
              position="absolute"
              top={-28}
              left={0}
              display={{ base: "none", lg: "flex" }}
            >
              <Title title={planet?.title} />
            </Flex>
            {landAssets &&
              landAssets.map((item) => {
                return (
                  <Box cursor="pointer" onClick={() => setSelectedLand(item)}>
                    <NFTCard
                      asset={item}
                      // assetId={item.asset_id}
                      key={item.asset_id}
                      selected={selectedLand?.asset_id === item.asset_id}
                    />
                  </Box>
                );
              })}
          </Flex>
        </Flex>
      </VStack>

      <ScreenActionButtons
        nextAction={ready}
        isNextDisabled={isLoading || !selectedLand}
        previousAction={() => history.push("/onboarding/planet")}
      />
    </>
  );
};

export default LandChooser;

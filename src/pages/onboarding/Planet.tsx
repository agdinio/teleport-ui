import React, { useState } from "react";

import { Box, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import { MainButton } from "../../components/ui/MainButton";
import { PlanetImage } from "../../components/ui/planets/PlanetImage";
import { useActions, useAppState } from "../../store";

function getPlanetMargin(name: string): number {
  name = name.toLowerCase().trim();
  if (name === "eyeke" || name === "veles") {
    return 24;
  }
  if (name === "neri" || name === "kavian") {
    return 12;
  }
  return 0;
}

const Planet = () => {
  const {
    game: { planets },
  } = useAppState();
  const actions = useActions();
  const history = useHistory();
  const [selectedPlanet, setSelectedPlanet] = useState(0);

  function selectPlanet() {
    actions.game.selectPlanet(planets[selectedPlanet].planet_name);
    history.push("/onboarding/landchooser");
  }

  return (
    <>
      <Flex direction="column" alignItems="center" px={6}>
        <Heading
          fontFamily="Orbitron"
          letterSpacing="0.2em"
          fontSize="lg"
          mb={12}
          mt={8}
          color="#eb9502"
        >
          Choose a Planet to Mine
        </Heading>
        <SimpleGrid columns={{ base: 2, md: 3, lg: 6 }} spacing={6}>
          {planets.length > 0 &&
            planets
              .filter((planet) => planet.map !== null)
              .map((planet, i) => (
                <Box
                  key={planet.title}
                  mt={{ lg: getPlanetMargin(planet.title) }}
                >
                  <PlanetImage
                    key={planet.title}
                    planet={planet}
                    isSelected={i === selectedPlanet}
                    onClick={() => setSelectedPlanet(i)}
                    interactive
                  />
                </Box>
              ))}
        </SimpleGrid>
        {planets[selectedPlanet] && (
          <>
            <Box mt={{ base: 10, lg: -10 }} mb={10}>
              <Heading
                as="h3"
                fontFamily="Titillium Web"
                letterSpacing="0.05em"
                fontSize="xl"
                fontWeight={400}
                color="#eb9502"
                mb={2}
              >
                About {planets[selectedPlanet].title}
              </Heading>
              <Text
                maxW={350}
                textAlign="center"
                mx="auto"
                fontFamily="Titillium Web"
                lineHeight={1.7}
              >
                Sunt nomenes magicae ferox, superbus uriaes. Parss observare!
                Ubi est emeritis adelphis? Rumor, olla, et adiurator.Pol, a bene
                nixus.
              </Text>
            </Box>
            <Box mb={16}>
              <MainButton size="xl" variant="mine" onClick={selectPlanet}>
                Mine {planets[selectedPlanet].title}
              </MainButton>
            </Box>
          </>
        )}
      </Flex>
    </>
  );
};

export default Planet;

import {
  Box,
  Center,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { Img } from "react-image";
import { useHistory } from "react-router-dom";

import { useActions, useAppState } from "../../store";

const PlanetChooser = () => {
  const {
    game: { planets },
  } = useAppState();
  const actions = useActions();
  const history = useHistory();

  async function selectPlanet(name: string) {
    actions.game.selectPlanet(name);
    history.push("/onboarding/planet");
  }

  return (
    <>
      <VStack align="flex-start" spacing={4}>
        <Heading as="h2">
          Here ae the planets currently in the federation
        </Heading>
        <Heading as="h3" fontSize="xl" color="blackAlpha.700" mb={6}>
          After you have selected your planet you can change planets anytime you
          like
        </Heading>
        <Box alignSelf="center">
          <SimpleGrid columns={[1, 2, 3]} spacing={6}>
            {planets.length > 0 &&
              planets
                .filter((planet) => planet.map !== null)
                .map((planet) => (
                  <Flex
                    key={planet.title}
                    as="button"
                    onClick={() => selectPlanet(planet.planet_name)}
                    wrap="wrap"
                    p={8}
                    bg="whiteAlpha.800"
                    borderRadius={20}
                    mb={4}
                    cursor="pointer"
                  >
                    <Box maxW={150}>
                      <Heading as="h3" textAlign="center" mb={4} fontSize="md">
                        {planet.title}
                      </Heading>
                      <Img
                        src={`https://alienworlds.mypinata.cloud/ipfs/${planet.metadata.img}`}
                        alt="Male avatar"
                        loader={
                          <Center h="full">
                            <Spinner size="lg" />
                          </Center>
                        }
                      />
                    </Box>
                  </Flex>
                ))}{" "}
          </SimpleGrid>
        </Box>
      </VStack>
    </>
  );
};

export default PlanetChooser;

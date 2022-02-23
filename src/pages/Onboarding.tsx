import React from "react";

import { Flex } from "@chakra-ui/react";
import { Switch } from "react-router-dom";

import GuardedRoute from "../components/layout/GuardedRoute";
import { useAppState } from "../store";
import LandChooser from "./onboarding/LandChooser";
import Planet from "./onboarding/Planet";
import PlanetChooser from "./onboarding/PlanetChooser";
import Terms from "./onboarding/Terms";

const Onboarding = () => {
  const {
    game: { account, wallet },
  } = useAppState();

  return (
    <>
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
          {/* <Link to={"/onboarding/planet"}>planet</Link> */}
          <Switch>
            <GuardedRoute
              condition={() => {
                return wallet !== null && account === null;
              }}
              path="/onboarding/terms"
              component={Terms}
            />
            <GuardedRoute
              condition={() => {
                return wallet !== null && account !== null;
              }}
              path="/onboarding/planet"
              component={Planet}
            />
            <GuardedRoute
              condition={() => {
                return wallet !== null && account !== null;
              }}
              path="/onboarding/planetchooser"
              component={PlanetChooser}
            />
            <GuardedRoute
              condition={() => {
                return wallet !== null && account !== null;
              }}
              path="/onboarding/landchooser"
              component={LandChooser}
            />
          </Switch>
        </Flex>
      </Flex>
    </>
  );
};

export default Onboarding;

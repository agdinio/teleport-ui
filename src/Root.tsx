import React, { useState } from "react";

import { ChakraProvider } from "@chakra-ui/react";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import { AnimatePresence } from "framer-motion";
import { createOvermind, Overmind } from "overmind";
import { Provider } from "overmind-react";
import { MissionDetails } from "pages/missions/MissionDetails";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import GuardedRoute from "./components/layout/GuardedRoute";
import { Layout } from "./components/layout/Layout";
import { BackgroundLayer } from "./components/ui/atoms/BackgroundLayer";
import Governance from "./pages/Governance";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Management from "./pages/Management";
import Mining from "./pages/Mining";
import Missions from "./pages/missions/Missions";
import Onboarding from "./pages/Onboarding";
import Profile from "./pages/Profile";
import Staking from "./pages/Staking";
import Teleport from "./pages/teleport/Teleport";
import { config, useAppState } from "./store";
import { theme } from "./styles/theme";

const RouterConfig = () => {
  const {
    game: { account, wallet, miner },
  } = useAppState();
  return (
    <>
      <Router>
        <BackgroundLayer />

        {/*
        <Layout>
          <Route
            render={({ location }) => (
              <AnimatePresence exitBeforeEnter initial={false}>
                <Switch location={location} key={location.pathname}>
                   <Route path="/onboarding">
                    <Onboarding />
                   </Route>
                   <GuardedRoute
                    condition={() => {
                      return (
                        wallet !== null && account !== null && miner !== null
                      );
                    }}
                    path="/profile"
                    component={Profile}
                   />
                   <GuardedRoute
                    condition={() => {
                      return (
                        wallet !== null && account !== null && miner !== null
                      );
                    }}
                    path="/inventory"
                    component={Inventory}
                   />
                   <GuardedRoute
                    condition={() => {
                      return (
                        wallet !== null && account !== null && miner !== null
                      );
                    }}
                    path="/missions/details"
                    component={MissionDetails}
                   />
                   <GuardedRoute
                    condition={() => {
                      return (
                        wallet !== null && account !== null && miner !== null
                      );
                    }}
                    path="/missions"
                    component={Missions}
                   />
                   <GuardedRoute
                    condition={() => {
                      return (
                        wallet !== null && account !== null && miner !== null
                      );
                    }}
                    path="/staking"
                    component={Staking}
                   />
                   <GuardedRoute
                    condition={() => {
                      return (
                        wallet !== null && account !== null && miner !== null
                      );
                    }}
                    path="/governance"
                    component={Governance}
                   />
                   <GuardedRoute
                    condition={() => {
                      return (
                        wallet !== null && account !== null && miner !== null
                      );
                    }}
                    path="/management"
                    component={Management}
                   />
                   <GuardedRoute
                    condition={() => {
                      return (
                        wallet !== null && account !== null && miner !== null
                      );
                    }}
                    path="/mining"
                    component={Mining}
                   />
                  <GuardedRoute
                    condition={() => {
                      return true;
                    }}
                    exact
                    path="/teleport"
                    component={Teleport}
                  />
                  <GuardedRoute
                    condition={() => {
                      return true;
                    }}
                    path="/teleport/dashboard"
                    component={TeleportDashboard}
                  />
                  <Redirect push to="/teleport" />

                   <Route path="/" component={Home} />
                </Switch>
              </AnimatePresence>
            )}
          />
        </Layout>
*/}

        <Switch>
          <Route path="/" component={Teleport} />
        </Switch>
      </Router>
    </>
  );
};

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const Root = () => {
  const [overmind] = useState<Overmind<typeof config>>(createOvermind(config));

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider value={overmind}>
        <ChakraProvider theme={theme}>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <Toaster position="bottom-right" />
          <RouterConfig />
        </ChakraProvider>
      </Provider>
    </Web3ReactProvider>
  );
};

export default Root;

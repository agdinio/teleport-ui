import React from "react";

import { Box, Container, Flex, useMediaQuery } from "@chakra-ui/react";
import { useCycle } from "framer-motion";
import { useRouteMatch } from "react-router-dom";

import SimpleLayout from "./SimpleLayout";
import SlidingMenu from "./SlidingMenu";
import TopBar from "./TopBar";

const Layout = ({ children }) => {
  const home = useRouteMatch("/")?.isExact;
  const onboarding = useRouteMatch("/onboarding");
  const teleport = useRouteMatch("/teleport");

  const [menuState, cycleMenu] = useCycle("closed", "open");
  const [isLargerThanMobile] = useMediaQuery("(min-width: 640px)");

  const isSimpleLayout = home || onboarding || teleport;
  if (isSimpleLayout) return <SimpleLayout>{children}</SimpleLayout>;
  return (
    <Box w="full" position="relative">
      <TopBar controls={cycleMenu} />
      <Flex position="relative" w="full" pt="77px">
        <SlidingMenu controls={menuState} />

        <Flex
          flexGrow={1}
          maxW="full"
          display={
            isLargerThanMobile || menuState === "closed" ? "visible" : "none"
          }
        >
          <Box minH={800} position="relative" pb={16} w="full" pr={12}>
            <Container
              maxW="full"
              mx={6}
              top={6}
              position="relative"
              py={8}
              px={4}
            >
              {children}
            </Container>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Layout;
export { Layout };

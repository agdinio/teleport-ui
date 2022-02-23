import React, { useEffect } from "react";

import { Box } from "@chakra-ui/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import TeleportBG from "assets/images/alienworlds-teleport-bg-stars.jpg";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import _random from "lodash/random";
import { BrowserRouter as Router, useRouteMatch } from "react-router-dom";
import { useLocation } from "react-use";

const images = [
  "alienworlds-db-bg-login.jpg",
  "alienworlds-db-bg-inventory.jpg",
  "alienworlds-db-bg-land.jpg",
  "alienworlds-db-bg-register.jpg",
];

const MotionBox = motion(Box);

const BackgroundLayer = () => {
  const location = useLocation();
  const lineControls = useAnimation();
  const dotControls = useAnimation();
  const rombControls = useAnimation();

  const home = useRouteMatch("/")?.isExact;
  const governance = useRouteMatch("/governance")?.isExact;
  const staking = useRouteMatch("/staking")?.isExact;
  const onboarding = useRouteMatch("/governance")?.isExact;
  const profile = useRouteMatch("/profile")?.isExact;
  const missions = useRouteMatch("/missions")?.isExact;
  // preload background images
  // eslint-disable-next-line no-new
  new Promise((resolve, reject) => {
    images.forEach((image) => {
      new Image().src = `/images/bg/${image}`;
    });
  });

  useEffect(() => {
    lineControls.start({
      left: `${_random(-50, -20)}%`,
      top: `${_random(-50, 0)}%`,
      transition: { delay: 0.1, duration: _random(0.3, 1.0) },
    });

    rombControls.start({
      left: `${_random(-50, -20)}%`,
      top: `${_random(-50, -10)}%`,
      transition: { delay: 0.2, duration: _random(0.45, 1.0) },
    });

    dotControls.start({
      left: `${_random(-50, -15)}%`,
      top: `${_random(-50, -20)}%`,
      transition: { delay: 0.3, duration: _random(0.6, 1.0) },
    });
  }, [location]);

  let background = "alienworlds-db-bg-login.jpg";
  if (home) {
    background = "alienworlds-db-bg-inventory.jpg";
  }
  if (onboarding) {
    background = "alienworlds-db-bg-land.jpg";
  }
  if (profile) {
    background = "alienworlds-db-bg-register.jpg";
  }
  if (governance) {
    background = "alienworlds-db-bg-land.jpg";
  }
  if (staking) {
    background = "alienworlds-db-bg-register.jpg";
  }
  if (missions) {
    background = "alienworlds-db-bg-inventory.jpg";
  }

  return (
    <>
      <Box
        position="fixed"
        overflow="hidden"
        h="100vh"
        w="100vw"
        top={0}
        left={0}
        bg="gray.600"
        zIndex={-1000}
      />
      <MotionBox
        position="fixed"
        overflow="hidden"
        zIndex={-999}
        top={0}
        left={0}
        pointerEvents="none"
        css={css`
          background-image: url(/images/bg/alienworlds-db-bg-login.jpg);
          background-repeat: no-repeat;
          background-size: cover;
          height: 100vh;
          width: 100vw;
        `}
      />
      <AnimatePresence>
        <MotionBox
          key={background}
          position="fixed"
          overflow="hidden"
          zIndex={-998}
          pointerEvents="none"
          css={css`
            background-image: url(/images/bg/${background});
            background-repeat: no-repeat;
            background-size: cover;
            height: 100vh;
            width: 100vw;
          `}
          initial={{ opacity: 0, y: 0, scale: 1.3 }}
          animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 1 } }}
          exit={{ opacity: 0, transition: { duration: 1 } }}
        />
      </AnimatePresence>
      <MotionBox
        animate={rombControls}
        position="fixed"
        overflow="hidden"
        zIndex={-997}
        pointerEvents="none"
        css={css`
          background-image: url("/images/bg/alienworlds-bg-grid.svg");
          background-position: 50%;
          background-repeat: no-repeat;
          background-size: cover;
          height: 175vw;
          left: -50%;
          top: -50%;
          width: 175vw;
        `}
      />
      <MotionBox
        animate={lineControls}
        position="fixed"
        overflow="hidden"
        zIndex={-996}
        pointerEvents="none"
        css={css`
          background-image: url("/images/bg/alienworlds-bg-lines.svg");
          background-position: 50%;
          background-repeat: no-repeat;
          background-size: cover;
          height: 200%;
          left: -50%;
          top: -50%;
          width: 200%;
        `}
      />
      <MotionBox
        animate={dotControls}
        position="fixed"
        overflow="hidden"
        zIndex={-995}
        pointerEvents="none"
        css={css`
          background-image: url("/images/bg/alienworlds-bg-dots.svg");
          background-position: 50%;
          background-repeat: no-repeat;
          background-size: cover;
          height: 250%;
          left: -50%;
          top: -50%;
          width: 250%;
        `}
      />
      <Box
        position="fixed"
        bg="linear-gradient(133deg, rgb(0,82,158, 0.7) 50%, rgb(167,0,122, 0.7) 100%)"
        opacity={0.3}
        zIndex={-994}
        top={0}
        left={0}
        pointerEvents="none"
        height="100vh"
        width="100vw"
      />
    </>
  );
};

export { BackgroundLayer };

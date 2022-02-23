import React from "react";

import { Flex } from "@chakra-ui/react";

import { ScreenActionButton } from "../ScreenActionButton";

interface ScreenActionButtonProps {
  previousAction: () => void;
  nextAction: () => void;
  isPreviousDisabled?: boolean;
  isNextDisabled?: boolean;
}

const ScreenActionButtons: React.FC<ScreenActionButtonProps> = ({
  isPreviousDisabled,
  isNextDisabled,
  previousAction,
  nextAction,
}) => {
  return (
    <>
      <Flex
        display={{ base: "flex", md: "none" }}
        zIndex={1000}
        backgroundColor="blackAlpha.700"
        position="fixed"
        px={6}
        left={0}
        w="100vw"
        bottom={0}
        height={24}
        alignItems="center"
        justifyContent="space-between"
      >
        <ScreenActionButton
          opacity={isPreviousDisabled ? 0.2 : 1}
          onClick={() => {
            if (!isPreviousDisabled) {
              previousAction();
            }
          }}
        />
        <ScreenActionButton
          isNext
          opacity={isNextDisabled ? 0.2 : 1}
          onClick={() => {
            if (!isNextDisabled) {
              nextAction();
            }
          }}
        />
      </Flex>
      <Flex
        display={{ base: "none", md: "flex" }}
        position="fixed"
        left={0}
        top={0}
        pl={12}
        pr={4}
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <ScreenActionButton
          opacity={isPreviousDisabled ? 0.2 : 1}
          onClick={() => {
            if (!isPreviousDisabled) {
              previousAction();
            }
          }}
        />
      </Flex>

      <Flex
        display={{ base: "none", md: "flex" }}
        position="fixed"
        right={0}
        top={0}
        pl={4}
        pr={12}
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <ScreenActionButton
          isNext
          opacity={isNextDisabled ? 0.2 : 1}
          onClick={() => {
            if (!isNextDisabled) {
              nextAction();
            }
          }}
        />
      </Flex>
    </>
  );
};

export { ScreenActionButtons };

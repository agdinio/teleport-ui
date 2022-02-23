import { Box, Flex, Text } from "@chakra-ui/react";
import { TriliumIcon } from "components/ui/Icons";

import { useAppState } from "../../../store";

const UnstakedTrilium = () => {
  const {
    game: { currency },
  } = useAppState();

  return (
    <Flex
      alignItems="center"
      color="#d9a555"
      alignSelf="center"
      position="relative"
      height="100%"
    >
      <Box w="35px">
        <TriliumIcon fill="#d9a555" />
      </Box>

      <Flex direction="column" ml={3}>
        <Text fontFamily="Orbitron" fontSize="2xl" color="white" lineHeight={1}>
          {currency}
        </Text>
        <Text
          fontFamily="Titillium Web"
          fontWeight="bold"
          letterSpacing="0.1em"
          fontSize="sm"
          whiteSpace="nowrap"
        >
          Trilium Unstaked
        </Text>
      </Flex>
    </Flex>
  );
};

export { UnstakedTrilium };

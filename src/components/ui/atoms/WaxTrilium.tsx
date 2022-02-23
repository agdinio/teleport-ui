import { LockIcon } from "@chakra-ui/icons";
import { Flex, Box, Icon, Text } from "@chakra-ui/react";
import { TriliumIcon } from "components/ui/Icons";
import { useAppState } from "store";

const WaxTrilium = () => {
  const {
    game: { currency },
  } = useAppState();

  return (
    <Flex alignItems="flex-start" color="#ff3b52">
      <Box w="41px" position="relative" fill="#d9a555">
        <TriliumIcon />
      </Box>
      <Flex direction="column" ml={4}>
        <Text
          fontSize="2xl"
          lineHeight={1}
          fontFamily="Orbitron"
          color="#d9a555"
        >
          {currency}
        </Text>
        <Text
          fontFamily="Titillium Web"
          fontWeight="bold"
          fontSize="sm"
          color="#989898"
          letterSpacing="0.1em"
        >
          WAX Trilium
        </Text>
      </Flex>
    </Flex>
  );
};

export { WaxTrilium };

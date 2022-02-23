import { Box, Flex, Text } from "@chakra-ui/react";
import { TriliumIcon } from "components/ui/Icons";

import { useAppState } from "../../../store";

const MiningPot = () => {
  const {
    game: { planet },
  } = useAppState();

  return (
    <Flex alignItems="flex-start" color="#d9a555">
      <Box w="31px" position="relative" fill="#d9a555">
        <TriliumIcon />
      </Box>
      <Flex direction="column" alignItems="flex-start" ml={4}>
        <Text fontSize="lg" lineHeight={1} fontFamily="Orbitron" color="white">
          {planet?.details?.bucket_total}
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

export { MiningPot };

import { Flex, Box, Text } from "@chakra-ui/react";
import { BoltOutlineIcon, FillrateIcon } from "components/ui/Icons";

import { useAppState } from "../../../store";

const ChargeTime = () => {
  const {
    game: { chargeTime },
  } = useAppState();
  return (
    <Flex alignItems="flex-start" color="#00baff">
      <Box w="31px" position="relative" fill="#00baff">
        <BoltOutlineIcon />
      </Box>
      <Flex direction="column" ml={4} alignItems="flex-start">
        <Text fontSize="lg" lineHeight={1} fontFamily="Orbitron" color="white">
          {chargeTime}s
        </Text>
        <Text
          fontFamily="Titillium Web"
          fontWeight="bold"
          fontSize="sm"
          letterSpacing="0.1em"
          color="#00baff"
        >
          Charge Time
        </Text>
      </Flex>
    </Flex>
  );
};

export { ChargeTime };

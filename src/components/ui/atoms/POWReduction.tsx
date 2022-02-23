import { Flex, Box, Text } from "@chakra-ui/react";
import { BoltOutlineIcon, FillrateIcon, ValIcon } from "components/ui/Icons";

import { useAppState } from "../../../store";

const POWReduction = () => {
  const {
    game: { chargeTime },
  } = useAppState();
  return (
    <Flex alignItems="flex-start" color="#0ed4a8">
      <Text fontFamily="Orbitron" fontSize="3xl" letterSpacing="0.1em">
        3
      </Text>
      <Flex direction="column" ml={4} alignItems="flex-start">
        <Text
          fontFamily="Titillium Web"
          fontWeight="bold"
          fontSize="sm"
          letterSpacing="0.1em"
          color="white"
        >
          POW Reduction
        </Text>
        <Text
          fontFamily="Titillium Web"
          fontWeight="bold"
          fontSize="sm"
          letterSpacing="0.1em"
        >
          (Proof of Work)
        </Text>
      </Flex>
    </Flex>
  );
};

export { POWReduction };

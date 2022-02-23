import { Flex, Box, Text } from "@chakra-ui/react";
import { BoltOutlineIcon, FillrateIcon, MineIcon } from "components/ui/Icons";

import { useAppState } from "../../../store";

const MiningPower = () => {
  const {
    game: { chargeTime },
  } = useAppState();
  return (
    <Flex alignItems="flex-start" color="#f6a800">
      <Box w="31px" position="relative" fill="#f6a800">
        <MineIcon />
      </Box>
      <Flex direction="column" ml={4} alignItems="flex-start">
        <Text fontSize="lg" lineHeight={1} fontFamily="Orbitron" color="white">
          0.00%
        </Text>
        <Text
          fontFamily="Titillium Web"
          fontWeight="bold"
          fontSize="sm"
          letterSpacing="0.1em"
        >
          Mining Power
        </Text>
      </Flex>
    </Flex>
  );
};

export { MiningPower };

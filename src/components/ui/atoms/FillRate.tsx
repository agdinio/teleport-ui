import { Flex, Box, Text } from "@chakra-ui/react";
import { FillrateIcon } from "components/ui/Icons";

import { useAppState } from "../../../store";

const FillRate = () => {
  const {
    game: { planet },
  } = useAppState();
  return (
    <Flex alignItems="flex-start" color="#0ed4a8">
      <Box w="31px" position="relative" fill="#0ed4a8">
        <FillrateIcon />
      </Box>
      <Flex direction="column" ml={4} alignItems="flex-start">
        <Text fontSize="lg" lineHeight={1} fontFamily="Orbitron" color="white">
          {`${
            planet?.details?.fill_rate.split(".")[0]
          }.${planet?.details?.fill_rate.split(".")[1].substring(0, 4)}`}
        </Text>
        <Text
          fontFamily="Titillium Web"
          fontWeight="bold"
          fontSize="sm"
          letterSpacing="0.1em"
        >
          Fillrate
        </Text>
      </Flex>
    </Flex>
  );
};

export { FillRate };

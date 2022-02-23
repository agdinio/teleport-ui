import { Box, Flex, Text } from "@chakra-ui/react";
import { BoltOutlineIcon, LandIcon } from "components/ui/Icons";

import { useAppState } from "../../../store";

const NFTLuck = () => {
  const {
    game: { chargeTime },
  } = useAppState();
  return (
    <Flex alignItems="flex-start" color="#f6a800">
      <Box w="31px" position="relative" fill="#f6a800">
        <LandIcon />
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
          NFT Luck
        </Text>
      </Flex>
    </Flex>
  );
};

export { NFTLuck };

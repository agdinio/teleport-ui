import { LockIcon } from "@chakra-ui/icons";
import { Flex, Box, Icon, Text } from "@chakra-ui/react";
import { TriliumIcon } from "components/ui/Icons";
import { useAppState } from "store";

const StakedTrillium = () => {
  const {
    game: { staked },
  } = useAppState();

  return (
    <Flex alignItems="flex-start" color="#ff3b52">
      <Box w="41px" position="relative" fill="#ff3b52">
        <Icon
          as={LockIcon}
          w="18px"
          height="auto"
          position="absolute"
          right={-1}
          top={0}
          zIndex={2}
        />
        <TriliumIcon />
      </Box>
      <Flex direction="column" ml={4}>
        <Text fontSize="2xl" lineHeight={1} fontFamily="Orbitron">
          {staked.total}
        </Text>
        <Text
          fontFamily="Titillium Web"
          fontWeight="bold"
          fontSize="sm"
          color="#989898"
          letterSpacing="0.1em"
        >
          Staked Trilium
        </Text>
      </Flex>
    </Flex>
  );
};

export { StakedTrillium };

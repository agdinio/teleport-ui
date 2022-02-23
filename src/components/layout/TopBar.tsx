import { Avatar, Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { MiningCounter } from "components/ui/atoms/MiningCounter";
import { UnstakedTrilium } from "components/ui/atoms/UnstakedTrilium";
import { MessagesIcon, AlienWorldLogo, MenuIcon } from "components/ui/Icons";
import { useAppState } from "store";

const TopBar = ({ controls }) => {
  const {
    game: { wallet, tag, avatar },
  } = useAppState();
  return (
    <Flex zIndex={1000} h="77px" w="full" position="fixed" top={0}>
      <Flex position="relative" alignItems="center" w="full" px={14} h="77px">
        <Box
          position="absolute"
          w="full"
          height="full"
          left={0}
          top={0}
          bg="#0f0f0f"
          opacity={0.6}
          z={-1}
        />
        <Flex alignItems="center" zIndex={1}>
          <IconButton
            mr={2}
            aria-label="Menu"
            bg="transparent"
            fill="#fff"
            icon={
              <Box w="36px">
                <MenuIcon />
              </Box>
            }
            onClick={() => {
              controls();
            }}
            _focus={{
              border: 0,
            }}
            _hover={{
              fill: "whiteAlpha.700",
              bg: "transparent",
            }}
            _active={{
              bg: "transparent",
            }}
          >
            Menu
          </IconButton>
          <Avatar
            w="54px"
            h="54px"
            name="Player"
            src={`https://alienworlds.mypinata.cloud/ipfs/${avatar?.template?.immutable_data?.img}`}
            mx={4}
            position="relative"
          >
            <Box w="22px" position="absolute" top="-3px" left="-7px">
              <MessagesIcon fill="#ff3b52" />
            </Box>
            <Flex
              justifyContent="center"
              position="absolute"
              top={-1}
              left={-1}
              fontFamily="Orbitron"
            >
              <Text fontSize="xs">12</Text>
            </Flex>
          </Avatar>
          <Flex
            direction="column"
            fontFamily="Titillium Web"
            color="#e0e0e0"
            display={{ base: "none", xl: "inline-block" }}
          >
            <Text fontSize="22px" lineHeight={1}>
              {tag}
            </Text>
            <Text fontSize="sm" fontWeight="bold">
              {wallet}
            </Text>
          </Flex>
        </Flex>

        <Flex
          position="absolute"
          mx="auto"
          left={0}
          right={0}
          width="fit-content"
          // mr={{ base: 0, md: "auto" }}
          zIndex={1}
          display={{ base: "none", sm: "flex" }}
        >
          <Box display={{ base: "none", lg: "flex" }}>
            <UnstakedTrilium />
          </Box>
          <Box w={14} />
          <MiningCounter />
        </Flex>
        <Box maxW="90px" w="full" zIndex={1} ml="auto">
          <AlienWorldLogo fill="#e0e0e0" />
        </Box>
      </Flex>
    </Flex>
  );
};

export default TopBar;

import React from "react";

import { LockIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Icon,
  Flex,
  Text,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import { MiningCounter } from "components/ui/atoms/MiningCounter";
import { StakedTrillium } from "components/ui/atoms/StakedTrillium";
import { UnstakedTrilium } from "components/ui/atoms/UnstakedTrilium";
import {
  MineIcon,
  TriliumIcon,
  InventoryIcon,
  MissionsIcon,
  GovernanceIcon,
  TeleportIcon,
  ProfileIcon,
  MessagesIcon,
  LogoutIcon,
  TelegramIcon,
  DiscordIcon,
  BinanceLogo,
  MetamaskLogo,
  FillrateIcon,
} from "components/ui/Icons";
import { MenuButton } from "components/ui/MenuButton";
import { NakedButton } from "components/ui/NakedButton";
import { motion } from "framer-motion";
import {
  useHistory,
  Link as RouterLink,
  useRouteMatch,
} from "react-router-dom";
import { useCookie } from "react-use";
import { useAppState } from "store";

import { BinanceTrilium } from "../ui/atoms/BinanceTrilium";
import { WaxTrilium } from "../ui/atoms/WaxTrilium";

const MotionBox = motion(Box);

const Divider = (props) => {
  return <Box height="2px" w="full" bg="rgb(95, 95, 95)" my={8} {...props} />;
};

const SlidingMenu = ({ controls }) => {
  const isInventoryRoute = useRouteMatch("/inventory")?.isExact;
  const isDaoRoute = useRouteMatch("/governance")?.isExact;
  const isMissionsRoute = useRouteMatch("/missions")?.isExact;
  const isTeleportRoute = useRouteMatch("/teleport")?.isExact;

  const deleteCookie = useCookie("session_token")[2];
  const history = useHistory();
  const {
    game: { land, planet },
  } = useAppState();
  const [isLargerThanMobile] = useMediaQuery("(min-width: 640px)");

  async function changeLand() {
    history.push("/mining");
  }

  function logout() {
    deleteCookie();
    document.cookie = `session_token=; Max-Age=0; path=/; domain=${window.location.host}`;
    window.location.href = "/";
  }

  return (
    <MotionBox
      animate={controls}
      w={{ base: "full", sm: "340px" }}
      minW={{ base: "full", sm: "340px" }}
      maxW={{ base: "full", sm: "340px" }}
      position="relative"
      transition={{
        type: "spring",
        bounce: 0.5,
        duration: 0.4,
      }}
      variants={{
        open: {
          marginLeft: isLargerThanMobile ? "0px" : "0%",
          display: "inline-block",
        },
        closed: {
          marginLeft: isLargerThanMobile ? "-340px" : "-100%",
          transitionEnd: {
            display: "none",
          },
        },
      }}
      zIndex={100}
      bg="transparent"
      // overflow="auto"
    >
      <Box
        m={4}
        ml={isLargerThanMobile ? 4 : 0}
        mr={0}
        p={10}
        position="relative"
      >
        <Box
          position="absolute"
          w="full"
          height="full"
          bg="#141414"
          left={0}
          top={0}
          opacity={0.9}
          z={-10}
        />
        <Box w="full" maxW="310px" mx="auto" position="relative">
          <Box>
            <Box position="relative">
              <Flex alignItems="center" color="white" mb={4} z={1}>
                <Box w="17px" mr={1}>
                  <MineIcon fill="#fff" />
                </Box>
                <Text ml={2} fontSize="xl" fontFamily="Orbitron">
                  Mining
                </Text>
                <MenuButton
                  ml="auto"
                  leftIcon={null}
                  size="sm"
                  fontSize="sm"
                  borderColor="#d9a555"
                  borderWidth="2px"
                  fontFamily="Titillium Web"
                  fontWeight="bold"
                  color="white"
                  lineHeight={1}
                  _hover={{
                    bg: "#d9a555",
                  }}
                  onClick={changeLand}
                >
                  Change
                </MenuButton>
              </Flex>
              {/* <MenuButton */}
              {/*  ml="auto" */}
              {/*  leftIcon={null} */}
              {/*  size="sm" */}
              {/*  fontSize="sm" */}
              {/*  borderColor="#d9a555" */}
              {/*  borderWidth="2px" */}
              {/*  fontFamily="Titillium Web" */}
              {/*  fontWeight="bold" */}
              {/*  color="white" */}
              {/*  lineHeight={1} */}
              {/*  _hover={{ */}
              {/*    bg: "#d9a555", */}
              {/*  }} */}
              {/*  onClick={() => actions.game.claimNFTs()} */}
              {/* > */}
              {/*  Claim NFTs */}
              {/* </MenuButton> */}
              <Flex alignItems="center" color="white">
                <Box w={16} h={16} position="relative">
                  <Avatar
                    w="47px"
                    borderColor="white"
                    borderWidth="2px"
                    top={-1}
                    position="absolute"
                    src={`https://alienworlds.mypinata.cloud/ipfs/${planet?.metadata?.img}`}
                  />
                  <Avatar
                    w="37px"
                    h="37px"
                    borderColor="white"
                    borderWidth="2px"
                    left={5}
                    top={7}
                    position="absolute"
                    src={`https://alienworlds.mypinata.cloud/ipfs/${land?.template?.immutable_data?.img}`}
                  />
                </Box>

                <Flex
                  direction="column"
                  pl={2}
                  letterSpacing="0.05em"
                  fontWeight={500}
                >
                  <Text fontFamily="Orbitron" lineHeight={1}>
                    {planet?.title}
                  </Text>
                  <Text
                    fontSize="sm"
                    fontFamily="Titillium Web"
                    color="whiteAlpha.800"
                    fontWeight={600}
                  >
                    {land?.name}
                  </Text>
                  <Flex alignItems="center" color="#d9a555">
                    <Box w="17px">
                      <TriliumIcon fill="#d9a555" />
                    </Box>
                    <Text ml={1} fontFamily="Orbitron">
                      {`${planet?.details?.bucket_total.split(".")[0]}`}
                    </Text>
                  </Flex>
                  <Flex alignItems="center" color="#0ed4a8">
                    <Box w="17px">
                      <FillrateIcon fill="#0ed4a8" />
                    </Box>
                    <Text ml={1} fontFamily="Orbitron">
                      {`${planet?.details?.fill_rate.split(".")[0]}`}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>

              <Box display={{ base: "block", lg: "none" }}>
                <Divider />
                <UnstakedTrilium />
                <Box display={{ base: "block", sm: "none" }}>
                  <Box h={6} />
                  <MiningCounter />
                </Box>
              </Box>

              <Divider />
              <VStack spacing={4} alignItems="stretch">
                <RouterLink to="/inventory">
                  <MenuButton
                    active={isInventoryRoute}
                    w="full"
                    leftIcon={
                      <Icon as={InventoryIcon} w="24px" height="auto" />
                    }
                  >
                    Inventory
                  </MenuButton>
                </RouterLink>
                <RouterLink to="/missions">
                  <MenuButton
                    active={isMissionsRoute}
                    w="full"
                    leftIcon={<Icon as={MissionsIcon} w="24px" height="auto" />}
                  >
                    Missions
                  </MenuButton>
                </RouterLink>
                {/* <RouterLink to="/staking"> */}
                {/*  <MenuButton */}
                {/*    w="full" */}
                {/*    leftIcon={<Icon as={StakingIcon} w="24px" height="auto" />} */}
                {/*  > */}
                {/*    Staking */}
                {/*  </MenuButton> */}
                {/* </RouterLink> */}
                <RouterLink to="/governance">
                  <MenuButton
                    active={isDaoRoute}
                    w="full"
                    leftIcon={
                      <Icon as={GovernanceIcon} w="24px" height="auto" />
                    }
                  >
                    DAOs
                  </MenuButton>
                </RouterLink>
                {/* <RouterLink to="/management"> */}
                {/*  <MenuButton */}
                {/*    w="full" */}
                {/*    leftIcon={ */}
                {/*      <Icon as={ManagementIcon} w="24px" height="auto" /> */}
                {/*    } */}
                {/*  > */}
                {/*    Management */}
                {/*  </MenuButton> */}
                {/* </RouterLink> */}
                <RouterLink to="/teleport">
                  <MenuButton
                    active={isTeleportRoute}
                    w="full"
                    leftIcon={<Icon as={TeleportIcon} w="24px" height="auto" />}
                    position="relative"
                  >
                    {/* <Icon */}
                    {/*  as={LockIcon} */}
                    {/*  w="18px" */}
                    {/*  height="auto" */}
                    {/*  position="absolute" */}
                    {/*  left={2} */}
                    {/*  bottom={-3} */}
                    {/*  zIndex={2} */}
                    {/* /> */}
                    Teleport
                  </MenuButton>
                </RouterLink>
              </VStack>
              <Divider />
              <VStack alignItems="stretch" spacing={4}>
                <WaxTrilium />
                <Flex alignItems="center" justifyContent="space-between">
                  <BinanceTrilium />
                  <Box as="button" w="50px">
                    <MetamaskLogo />
                  </Box>
                </Flex>
                <StakedTrillium />
              </VStack>

              <Divider />
              <VStack spacing={2} alignItems="flex-start">
                <NakedButton
                  leftIcon={
                    <Box w="20px">
                      <SettingsIcon />
                    </Box>
                  }
                  color="#dadada"
                  fontWeight={700}
                  letterSpacing="0.1em"
                >
                  Settings
                </NakedButton>
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  w="full"
                >
                  <NakedButton
                    leftIcon={
                      <Box w="20px">
                        <ProfileIcon />
                      </Box>
                    }
                    color="#dadada"
                    fontWeight={700}
                    letterSpacing="0.1em"
                  >
                    Profile
                  </NakedButton>
                  <MenuButton
                    size="sm"
                    leftIcon={null}
                    fontFamily="Titillium Web"
                    fontWeight={700}
                    borderWidth="2px"
                    position="relative"
                  >
                    <Box w="22px" position="absolute" top="-12px" left="-12px">
                      <MessagesIcon fill="#ff3b52" />
                    </Box>
                    <Flex
                      justifyContent="center"
                      w={6}
                      position="absolute"
                      top="-11px"
                      left="-13px"
                      fontFamily="Orbitron"
                    >
                      <Text fontSize="xs">12</Text>
                    </Flex>
                    Notices
                  </MenuButton>
                </Flex>

                <NakedButton
                  onClick={logout}
                  leftIcon={
                    <Box w="20px">
                      <LogoutIcon />
                    </Box>
                  }
                  color="#dadada"
                  fontWeight={700}
                  letterSpacing="0.1em"
                >
                  Logout
                </NakedButton>
                <NakedButton
                  leftIcon={
                    <Box w="20px">
                      <SettingsIcon />
                    </Box>
                  }
                  color="#dadada"
                  fontWeight={700}
                  letterSpacing="0.1em"
                >
                  Resources
                </NakedButton>
              </VStack>
              <Divider mb={4} />
              <Flex justifyContent="space-between" alignItems="center" w="full">
                <a
                  href="https://t.me/AlienWorldsSupport"
                  target="_blank"
                  rel="noreferrer"
                >
                  <NakedButton
                    color="white"
                    fill="white"
                    leftIcon={
                      <Box w="29px">
                        <TelegramIcon />
                      </Box>
                    }
                    mt={4}
                  >
                    Telegram
                  </NakedButton>
                </a>
                <a
                  href="https://discord.com/invite/QHPJxuq"
                  target="_blank"
                  rel="noreferrer"
                >
                  <NakedButton
                    leftIcon={
                      <Box w="29px">
                        <DiscordIcon />
                      </Box>
                    }
                    ml={4}
                    mt={4}
                  >
                    Discord
                  </NakedButton>
                </a>
              </Flex>
            </Box>
          </Box>
        </Box>
      </Box>
    </MotionBox>
  );
};

export default SlidingMenu;

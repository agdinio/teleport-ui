import {
  Flex,
  Image,
  Box,
  Text,
  chakra,
  Container,
  useDisclosure,
} from "@chakra-ui/react";
import { AppModal } from "components/layout/AppModal";
import {
  MissionCraftIcon,
  MissionNftIcon,
  TriliumIcon,
} from "components/ui/Icons";
import { MainButton } from "components/ui/MainButton";
import { MenuButton } from "components/ui/MenuButton";
import { motion } from "framer-motion";
import {
  Mission,
  MissionType,
  MissionRarity,
  MissionStatus,
  MissionTypeIcon,
  getColorForRarity,
  getColorForStatus,
} from "pages/missions/missionsUtils";
import { Link } from "react-router-dom";

const m: Mission = {
  type: MissionType.ARTIFACT,
  title: "Mission title",
  duration: 1,
  rewards: 100,
  rarity: MissionRarity.EPIC,
  craftsLeased: {
    total: 100,
    available: 20,
  },
  departure: 8450,
  status: MissionStatus.AVAILABLE,
};

const JoinMissionModal = () => {
  return (
    <Container maxW="1000px">
      <Flex direction="column" alignItems="center" textAlign="center">
        <Box w="60px" fill={getColorForRarity(m.rarity)} mr={6}>
          <MissionTypeIcon type={m.type} />
        </Box>
        <Flex>
          <Text fontFamily="Titillium Web" fontSize="3xl" mr={2}>
            Starts In:
          </Text>
          <Text color="#959595" fontSize="3xl">
            2
            <chakra.span mr={2} fontWeight="bold">
              d
            </chakra.span>
            6
            <chakra.span mr={2} fontWeight="bold">
              h
            </chakra.span>
            2<chakra.span fontWeight="bold">m</chakra.span>
          </Text>
        </Flex>
        <Text
          fontFamily="Orbitron"
          letterSpacing="6px"
          fontSize="36px"
          lineHeight={1}
          mt={8}
          mb={1}
        >
          Mission Title Area
        </Text>
        <Text
          textTransform="uppercase"
          fontWeight="bold"
          fontSize="2xl"
          letterSpacing="4px"
          mb={4}
          color={getColorForRarity(m.rarity)}
        >
          MISSION TYPE{" "}
          <chakra.span
            fontSize="3xl"
            color="white"
            ml={3}
            textTransform="none"
            fontWeight="normal"
          >
            X Week/Month
          </chakra.span>
        </Text>
      </Flex>
    </Container>
  );
};

const MissionDetails = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.3 }}
    >
      <AppModal onClose={onClose} isOpen={isOpen}>
        <JoinMissionModal />
      </AppModal>

      <Container maxW="1000px">
        <Flex
          direction={{ base: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ base: "flex-start", md: "center" }}
          gridGap={8}
          color="white"
        >
          <Flex direction="column" maxW="600px">
            <Flex alignItems="flex-end">
              <Box w="120px" fill={getColorForRarity(m.rarity)} mr={6}>
                <MissionTypeIcon type={m.type} />
              </Box>
              <Flex>
                <Text fontFamily="Titillium Web" fontSize="3xl" mr={2}>
                  Starts In:
                </Text>
                <Text color="#959595" fontSize="3xl">
                  2
                  <chakra.span mr={2} fontWeight="bold">
                    d
                  </chakra.span>
                  6
                  <chakra.span mr={2} fontWeight="bold">
                    h
                  </chakra.span>
                  2<chakra.span fontWeight="bold">m</chakra.span>
                </Text>
              </Flex>
            </Flex>

            <Text
              fontFamily="Orbitron"
              letterSpacing="6px"
              fontSize="36px"
              lineHeight={1}
              mt={8}
              mb={1}
            >
              Mission Title Area
            </Text>
            <Text
              textTransform="uppercase"
              fontWeight="bold"
              fontSize="2xl"
              letterSpacing="4px"
              mb={4}
              color={getColorForRarity(m.rarity)}
            >
              MISSION TYPE{" "}
              <chakra.span
                fontSize="3xl"
                color="white"
                ml={3}
                textTransform="none"
                fontWeight="normal"
              >
                X Week/Month
              </chakra.span>
            </Text>
            <Text mb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              sed varius arcu, a facilisis justo. Aliquam elit ipsum, blandit
              nec lobortis ut, feugiat quis lorem. Nulla facilisi. Nullam dolor
              magna.
            </Text>

            <Flex textAlign="left" alignItems="center">
              <Box pr="10px">
                <Box w="50px" fill={getColorForStatus(m.status)}>
                  <TriliumIcon />
                </Box>
              </Box>

              <Text
                fontWeight="bold"
                fontSize="4xl"
                color={getColorForStatus(m.status)}
              >
                00000
              </Text>
              <Text fontWeight="light" color="#959595" ml={4}>
                current Trilium per craft going
              </Text>
            </Flex>
            <Text fontWeight="semibold" color="#ff3b52" mb={8}>
              Warning: Rewards are Shared between all Leased Spacecraft
            </Text>

            <Flex alignItems="center" whiteSpace="nowrap" color="white">
              <Box w="50px" mr={3}>
                <MissionCraftIcon />
              </Box>
              <Text
                fontFamily="Orbitron"
                fontWeight="light"
                fontSize="3xl"
                mr={4}
              >
                {m.craftsLeased.total}
              </Text>
              <Text fontFamily="Titillium Web" fontWeight="light">
                Crafts Leased on this Mission
              </Text>
            </Flex>
          </Flex>
          <Flex direction="column">
            <Flex alignItems="center" mb={4}>
              <Box
                w="40px"
                transform="rotate(45deg)"
                background="linear-gradient(135deg, rgba(231, 231, 231, 1) 0%, rgba(106, 106, 106, 1) 100%)"
                mr={4}
              >
                <Box transform="rotate(-45deg)">
                  <MissionNftIcon />
                </Box>
              </Box>
              <Text fontFamily="Titillium Web" fontWeight="bold" fontSize="3xl">
                1x <chakra.span color="#c6c6c6">Rarity</chakra.span> NFT
              </Text>
            </Flex>
            <Box w="220px">
              <Image
                src="https://andrecm.com/clients/alienworlds/missions/images/alienworlds-missions-nft_placeholder.png"
                alt="NFT prize"
              />
            </Box>
          </Flex>
        </Flex>
        <Flex alignItems="center" mt={20} flexWrap="wrap" gridGap={6}>
          <Box>
            <MainButton onClick={onOpen} variant="mine" size="xl">
              Join Mission
            </MainButton>
          </Box>
          <Link to="/missions">
            <MenuButton>Back to missions</MenuButton>
          </Link>
        </Flex>
      </Container>
    </motion.div>
  );
};

export { MissionDetails };

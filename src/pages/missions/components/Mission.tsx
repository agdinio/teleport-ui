import React, { useContext } from "react";

import { Box, Flex, Text } from "@chakra-ui/react";
import {
  MissionCraftIcon,
  MissionNftIcon,
  TriliumIcon,
} from "components/ui/Icons";
import { MainButton } from "components/ui/MainButton";
import { motion } from "framer-motion";
import {
  Mission,
  getColorForStatus,
  MissionTypeIcon,
  MissionRarity,
} from "pages/missions/missionsUtils";

const MotionFlex = motion(Flex);

const MissionContext = React.createContext<Mission | null>(null);

const MissionTypeField: React.FC = () => {
  const mission = useContext(MissionContext);

  return (
    <Flex flex="1 1" w="full" px="1vh">
      <Box w="46px" mx="auto" fill={getColorForStatus(mission.status)}>
        <MissionTypeIcon type={mission.type} />
      </Box>
    </Flex>
  );
};

const MissionTitleField: React.FC = () => {
  const mission = useContext(MissionContext);

  return (
    <Flex flex="3 1" px="1vh">
      <Text textAlign="left" fontFamily="Orbitron">
        {mission.title}
      </Text>
    </Flex>
  );
};

const MissionDurationField: React.FC = () => {
  const mission = useContext(MissionContext);

  return (
    <Flex flex="1 1" px="1vh">
      <Text fontWeight={400}>{mission.duration} Week</Text>
    </Flex>
  );
};

const MissionRewardsField: React.FC = () => {
  const mission = useContext(MissionContext);

  return (
    <Flex flex="2 1" textAlign="left" px="1vh">
      <Box px="10px">
        <Box h="30px" w="30px" fill={getColorForStatus(mission.status)}>
          <TriliumIcon />
        </Box>
      </Box>

      <Text fontWeight={700} fontSize="22px">
        00000
      </Text>
    </Flex>
  );
};

const MissionRarityField: React.FC = () => {
  const mission = useContext(MissionContext);

  let iconColor =
    "linear-gradient(135deg, rgba(231, 231, 231, 1) 0%, rgba(106, 106, 106, 1) 100%)";
  switch (mission.rarity) {
    case MissionRarity.EPIC:
      iconColor =
        "linear-gradient(135deg, rgba(208,197,216,1) 0%,rgba(137,40,217,1) 100%)";
      break;
    case MissionRarity.LEGENDARY:
      iconColor =
        "linear-gradient(135deg, rgba(213,204,179,1) 1%,rgba(178,90,16,1) 100%)";
      break;
    case MissionRarity.RARE:
      iconColor =
        "linear-gradient(135deg, rgba(152,195,230,1) 0%,rgba(6,154,209,1) 100%)";
      break;
    default:
      break;
  }

  return (
    <Flex flex="1 1" px="1vh">
      <Box
        w="35px"
        h="35px"
        transform="rotate(45deg)"
        background={iconColor}
        mx="auto"
      >
        <Box transform="rotate(-45deg)">
          <MissionNftIcon />
        </Box>
      </Box>
    </Flex>
  );
};

const MissionCraftsField: React.FC = () => {
  const mission = useContext(MissionContext);

  return (
    <Flex flex="2 1" alignItems="center" whiteSpace="nowrap" px="1vh">
      <Box w="35px" mr={2} color="white">
        <MissionCraftIcon />
      </Box>
      <Text textAlign="left" fontFamily="Orbitron" fontSize="22px">
        {mission.craftsLeased.total}
      </Text>
    </Flex>
  );
};

const MissionDepartureField: React.FC = () => {
  const mission = useContext(MissionContext);

  return (
    <Flex flex="1 1" px="1vh">
      <Text color="#959595">2d 6h 2m</Text>
    </Flex>
  );
};

const MissionActionsField: React.FC = () => {
  const mission = useContext(MissionContext);

  return (
    <Flex flex="1 1" px="1vh">
      <MainButton onClick={() => {}}>Info</MainButton>
    </Flex>
  );
};

const MissionRow: React.FC<{ mission: Mission }> = ({ mission }) => {
  let hoverColor = "rgba(170, 170, 170, .3)";
  switch (mission.rarity) {
    case MissionRarity.EPIC:
      hoverColor = "rgba(135, 35, 217, .3)";
      break;
    case MissionRarity.LEGENDARY:
      hoverColor = "rgba(179, 92, 18, .3)";
      break;
    case MissionRarity.RARE:
      hoverColor = "rgba(8, 163, 221, .3)";
      break;
    default:
      break;
  }
  return (
    <MissionContext.Provider value={mission}>
      <MotionFlex
        fontFamily="Titillium Web"
        alignItems="center"
        whiteSpace="nowrap"
        cursor="pointer"
        mb="1vh"
        p={3}
        whileHover={{
          backgroundColor: hoverColor,
          transition: {
            duration: 0.3,
          },
        }}
      >
        <MissionTypeField />
        <MissionTitleField />
        <MissionDurationField />
        <MissionRewardsField />
        <MissionRarityField />
        <MissionCraftsField />
        <MissionDepartureField />
        <MissionActionsField />
      </MotionFlex>
    </MissionContext.Provider>
  );
};

export { MissionRow };

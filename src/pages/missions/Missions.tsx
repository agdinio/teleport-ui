import React from "react";

import { Flex, Box, Text } from "@chakra-ui/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { MissionsThinIcon } from "components/ui/Icons";
import { motion } from "framer-motion";
import { MissionRow } from "pages/missions/components/Mission";
import {
  Mission,
  MissionType,
  MissionRarity,
  MissionStatus,
} from "pages/missions/missionsUtils";
import { Link } from "react-router-dom";

const MissionHeader = styled(Flex)<{
  rarity?: "common" | "rare" | "epic" | "legendary";
  isHeader?: boolean;
}>`
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-flow: row;
  line-height: 18px;
  margin-bottom: 1vh;
  padding: 5px;

  ${(props) =>
    props.isHeader &&
    css`
      color: #959595;
      cursor: default;
      font-size: 14px;
      letter-spacing: 1px;
      margin-bottom: 2vh;
      text-transform: lowercase;
    `}

  &:hover {
    background-color: rgba(170, 170, 170, 0.3);
    ${(props) =>
      props.rarity === "common" &&
      css`
        background-color: rgba(170, 170, 170, 0.3);
      `};
    ${(props) =>
      props.rarity === "rare" &&
      css`
        background-color: rgba(8, 163, 221, 0.3);
      `};
    ${(props) =>
      props.rarity === "epic" &&
      css`
        background-color: rgba(135, 35, 217, 0.3);
      `};
    ${(props) =>
      props.rarity === "legendary" &&
      css`
        background-color: rgba(179, 92, 18, 0.3);
      `};
    ${(props) =>
      props.isHeader &&
      css`
        background: transparent;
      `}
`;

const HeaderText = styled(Box)<{
  type?:
    | "type"
    | "mission"
    | "duration"
    | "rewards"
    | "rarity"
    | "crafts"
    | "departure"
    | "action";
}>`
  cursor: pointer;
  flex: 1 1;
  font-weight: 700 !important;
  padding: 0 1vh;
  text-align: center;
  white-space: nowrap;

  ${(props) =>
    props.type === "mission" &&
    css`
      flex: 3 1;
      font-family: "Orbitron";
      line-height: 18px;
      text-align: left;
    `}

  ${(props) =>
    props.type === "rewards" &&
    css`
      display: inline-block;
      flex: 2 1;
      font-size: 22px;
      font-weight: 700;
      text-align: left;
      vertical-align: middle;
      white-space: normal;
    `}

  ${(props) =>
    props.type === "crafts" &&
    css`
      flex: 2 1;
      text-align: left;
    `}
`;

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

const Missions = () => {
  // @ts-ignore
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.3 }}
    >
      <Flex alignItems="flex-start" mb={12}>
        <Box w="80px" fill="#36c9ff" mr={4}>
          <MissionsThinIcon />
        </Box>
        <Flex direction="column" fontWeight={300}>
          <Text
            fontFamily="Orbitron"
            letterSpacing="6px"
            fontSize="36px"
            mb={2}
            lineHeight={1}
          >
            Mission Centre
          </Text>
          <Text>Explore Missions, Discover NFTs</Text>
          <Text color="#36c9ff" fontWeight={600}>
            Rarity = NFT Card (Common, Rare, Epic, Legendary)
          </Text>
        </Flex>
      </Flex>
      <MissionHeader isHeader>
        <HeaderText type="type">Type</HeaderText>
        <HeaderText type="mission">Mission</HeaderText>
        <HeaderText type="duration">Duration</HeaderText>
        <HeaderText type="rewards">Rewards</HeaderText>
        <HeaderText type="rarity">Rarity</HeaderText>
        <HeaderText type="crafts">Crafts Leased</HeaderText>
        <HeaderText type="departure">Departure</HeaderText>
        <HeaderText type="action" />
      </MissionHeader>
      <Link to="/missions/details">
        <MissionRow mission={m} />
      </Link>
      <MissionRow mission={m} />
      <MissionRow mission={m} />
      <MissionRow mission={m} />
      <MissionRow mission={m} />
      <MissionRow mission={m} />
      {/* <div className="background">
        <div className="gradients grad1"></div>
        <div className="gradients grad2"></div>
        <div className="gradients graddiag1"></div>
        <div className="gradients graddiag2"></div>
        <div className="objects">
          <div className="grid"></div>
          <div className="lines"></div>
          <div className="dots"></div>
        </div>
        <div className="sky login"></div>
        <div className="sky centre active"></div>
        <div className="sky mission"></div>
        <div className="sky dashboard"></div>
        <div className="fade"></div>
      </div> */}
    </motion.div>
  );
};

export default Missions;

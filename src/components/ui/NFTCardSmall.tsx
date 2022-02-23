import React from "react";

import {
  AspectRatio,
  Box,
  Center,
  Flex,
  Spinner,
  Text,
  Image,
  chakra,
  VStack,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { ApiAsset } from "atomicassets/build/API/Explorer/Types";
import {
  MineIcon,
  LandIcon,
  ValIcon,
  BoltIcon,
  BoltOutlineIcon,
} from "components/ui/Icons";

import { useAppState } from "../../store";
import { AssetType } from "../../store/game/state";

const CardIconscont = styled(Box)`
  align-items: center;
  bottom: 0;
  color: #fff;
  display: flex;
  fill: #f6a800;
  font-size: 0;
  justify-content: space-between;
  left: 0;
  padding: 0 15px 15px;
  position: absolute;
  white-space: nowrap;
  width: 100%;
`;

const CardIcon = styled(Box)`
  align-items: center;
  display: flex;
  font-family: "Orbitron";
  font-size: 14px;
  font-weight: 700;
  vertical-align: middle;
  white-space: normal;
  width: 33.33%;
`;

const CardIco = styled(Box)`
  display: inline-block;
  margin-right: 5px;
  width: 20px;
`;

function getType(type: any) {
  const mappings = {
    [AssetType.TOOL]: "Tool",
    [AssetType.FACES]: "Avatar",
    [AssetType.LAND]: "Land",
    [AssetType.ARMS]: "Weapon",
    [AssetType.CREW]: "Crew",
  };
  return mappings[type];
}

function getTitle(asset: any) {
  const mappings = {
    [AssetType.TOOL]: asset.data.name,
    [AssetType.FACES]: asset.data.name,
    [AssetType.LAND]: asset.data.name
      .split(" ")
      .splice(0, asset.data.name.split(" ").length - 2)
      .join(" "),
    [AssetType.ARMS]: asset.data.name,
    [AssetType.CREW]: asset.data.name,
  };
  return mappings[asset.schema_name];
}

function getMod(asset: any) {
  const mappings = {
    [AssetType.TOOL]: "",
    [AssetType.FACES]: "",
    [AssetType.LAND]: `${asset.data.x}/${asset.data.y}`,
    [AssetType.ARMS]: "",
    [AssetType.CREW]: "",
  };
  return mappings[asset.schema_name];
}

function getSubtitle(asset: any) {
  const mappings = {
    [AssetType.TOOL]: asset.data.type,
    [AssetType.FACES]: asset.data.description,
    [AssetType.LAND]: asset.data.name.split(" ")[
      asset.data.name.split(" ").length - 1
    ],
    [AssetType.ARMS]: asset.data.description,
    [AssetType.CREW]: asset.data.description,
  };
  return mappings[asset.schema_name];
}

function CardIcons({ asset }: { asset: any }) {
  return (
    <>
      {asset.schema_name === AssetType.TOOL && (
        <>
          <CardIcon justifyContent="flex-start">
            <CardIco>
              <MineIcon />
            </CardIco>
            {asset.data.ease / 10}
          </CardIcon>
          <CardIcon justifyContent="center">
            <CardIco>
              <LandIcon />
            </CardIco>
            {asset.data.difficulty}
          </CardIcon>
          <CardIcon justifyContent="flex-end">
            {asset.data.luck / 10}
            <CardIco mr={0} ml="5px">
              <ValIcon />
            </CardIco>
          </CardIcon>
        </>
      )}
      {asset.schema_name === AssetType.ARMS && (
        <>
          <CardIcon justifyContent="flex-start">
            <CardIco>
              <MineIcon />
            </CardIco>
            {asset.data.attack}
          </CardIcon>

          <CardIcon justifyContent="flex-end">
            {asset.data.defense}
            <CardIco mr={0} ml="5px">
              <ValIcon />
            </CardIco>
          </CardIcon>
        </>
      )}
      {asset.schema_name === AssetType.CREW && (
        <>
          <CardIcon justifyContent="flex-start">
            <CardIco>
              <MineIcon />
            </CardIco>
            {asset.data.attack}
          </CardIcon>
          <CardIcon justifyContent="center">
            <CardIco>
              <LandIcon />
            </CardIco>
            {asset.data.movecost}
          </CardIcon>
          <CardIcon justifyContent="flex-end">
            {asset.data.defense}
            <CardIco mr={0} ml="5px">
              <ValIcon />
            </CardIco>
          </CardIcon>
        </>
      )}
      {asset.schema_name === AssetType.LAND && (
        <>
          <CardIcon justifyContent="flex-start">
            <CardIco>
              <MineIcon />
            </CardIco>
            {asset.data.ease / 10}
          </CardIcon>
          <CardIcon justifyContent="center">
            <CardIco>
              <LandIcon />
            </CardIco>
            {asset.data.commission / 100}%
          </CardIcon>
          <CardIcon justifyContent="flex-end">
            {asset.data.luck / 10}
            <CardIco mr={0} ml="5px">
              <ValIcon />
            </CardIco>
          </CardIcon>
        </>
      )}
    </>
  );
}

function CardCharge({ asset }: { asset: any }) {
  if (
    asset.schema_name !== AssetType.TOOL &&
    asset.schema_name !== AssetType.LAND
  ) {
    return null;
  }
  return (
    <Flex alignItems="center">
      <Box position="absolute" display="flex" w="12px" mb="-1px">
        <BoltIcon fill="#fff" />
      </Box>
      <Box position="absolute" display="flex" w="14px" left="-1px">
        <BoltOutlineIcon fill="#07a3dd" />
      </Box>
      <Text pl={4} color="#07a3dd" fontSize="xs">
        {asset.schema_name === AssetType.LAND
          ? asset.data.delay / 10
          : asset.data.delay}
        <chakra.span color="white">s</chakra.span>
      </Text>
    </Flex>
  );
}

const NFTCardSmall: React.FC<{
  selected?: boolean;
  assetId?: string;
  asset?: any;
  prefilled?: {
    type?: string;
    title?: string;
    subtitle?: string;
    image?: string;
    mod?: string;
  };
}> = ({ selected, assetId, prefilled, asset }) => {
  const {
    game: { getAssetsById },
  } = useAppState();
  const nftAsset: any = asset || getAssetsById(assetId);

  return (
    <VStack
      position="relative"
      w="full"
      alignItems="flex-start"
      spacing={3}
      borderRadius={20}
      backgroundColor="blackAlpha.800"
      fontFamily="Orbitron"
      fontWeight={400}
      userSelect="none"
      p={3}
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        w="full"
        letterSpacing="0.1em"
      >
        <Text fontSize="xs">
          {prefilled
            ? prefilled.type
            : getType(nftAsset.schema_name as AssetType)}
        </Text>
        <CardCharge asset={nftAsset} />
      </Flex>
      <Flex alignItems="center" w="full">
        <Image
          w="45px"
          h="45px"
          borderRadius="full"
          overflow="hidden"
          src={
            // eslint-disable-next-line no-nested-ternary
            prefilled
              ? prefilled.image
              : nftAsset?.data?.img
              ? `https://alienworlds.mypinata.cloud/ipfs/${nftAsset?.data?.img}`
              : "/images/alienworlds-profile-sample01.jpg"
          }
        />
        <Box ml={2} letterSpacing="0.05em">
          <Text fontSize="14px">
            {prefilled ? prefilled.title : getTitle(nftAsset)}
          </Text>
          <Text fontSize="14px">
            {prefilled ? prefilled.subtitle : getSubtitle(nftAsset)}
          </Text>
        </Box>
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        w="full"
        fill="#f6a800"
        color="white"
      >
        {!prefilled && <CardIcons asset={nftAsset} />}
      </Flex>
    </VStack>
  );
};

export { NFTCardSmall };

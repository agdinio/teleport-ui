import React from "react";

import {
  AspectRatio,
  Box,
  Center,
  Flex,
  Spinner,
  Text,
  Image,
  VStack,
  chakra,
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
import { Img } from "react-image";

import { useAppState } from "../../store";
import { AssetType } from "../../store/game/state";

const CardWrap = styled(Box)`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;

  & > div {
    position: absolute;
  }
`;

const CardBorder = styled(Box)`
  border: 30px solid;
  border-image: url("/images/alienworlds-db-card-border.svg");
  border-image-repeat: stretch;
  border-image-slice: 50 40 40;
  border-image-width: 40px 30px 30px;
  height: 100%;
  left: 0;
  opacity: 0.2;
  position: absolute;
  top: 0;
  width: 100%;
`;

const CardInner = styled(Box)`
  height: 100%;
  left: 0;
  padding: 40px 15px 15px;
  position: absolute;
  top: 0;
  width: 100%;
`;

const CardCont = styled(Box)`
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  display: inline-block;
  height: 400px;
  min-height: 400px;
  overflow: hidden;
  position: relative;
  width: 270px;
  box-sizing: border-box;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  ${(props) =>
    props.selected &&
    css`
      box-shadow: 0 0 0 5px #0ed4a8;
    `} 
}
`;

const CardType = styled(Box)`
  color: #fff;
  font-family: "Orbitron";
  font-size: 12px;
  font-weight: 700;
  left: 12px;
  letter-spacing: 2px;
  text-align: left;
  top: 10px;
  width: 50%;
`;

const CardMod = styled(Box)`
  color: #fff;
  font-family: "Orbitron";
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 2px;
  right: 12px;
  text-align: right;
  top: 10px;
  width: 50%;
`;

const CardImage = styled(Box)`
  background-color: #212121;
  overflow: hidden;
  pointer-events: none;
  // background-position: center;
  // background-repeat: no-repeat;
  // background-size: cover;
  border-radius: 100%;
  height: 200px;
  left: 50%;
  position: absolute;
  top: 38%;
  transform: translate(-50%, -50%);
  width: 200px;

  img {
    margin-left: -28%;
    margin-top: -20%;
    max-width: 160%;
  }
`;

const CardInfo = styled(Box)`
  color: #fff;
  left: 0;
  padding: 0 15px;
  position: absolute;
  text-align: center;
  top: 68%;
  width: 100%;
`;

const CardTitle = styled(Box)`
  font-family: "Orbitron";
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 1px;
`;

const CardSub = styled(Box)`
  font-family: "Titillium Web";
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 2px;
`;

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
    [AssetType.LAND]: `${asset.data.x || 0}/${asset.data.y || 0}`,
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
    <Flex
      w="24px"
      h="40px"
      mr={2}
      position="absolute"
      left="60%"
      top="60%"
      transform="translate(-50%, -50%)"
      alignItems="flex-end"
    >
      <Box
        position="absolute"
        display="flex"
        w="full"
        left={0}
        top={0}
        bottom={0}
      >
        <BoltIcon fill="#fff" />
      </Box>
      <Box
        position="absolute"
        display="flex"
        w="26px"
        left="-1px"
        top={0}
        bottom={0}
      >
        <BoltOutlineIcon fill="#07a3dd" />
      </Box>
      <Text
        top="full"
        pl={8}
        fontFamily="Orbitron"
        fontWeight={400}
        color="#07a3dd"
        fontSize="xl"
      >
        {asset.schema_name === AssetType.LAND
          ? asset.data.delay / 10
          : asset.data.delay}
      </Text>
    </Flex>
  );
}

const DetailsOnHover: React.FC<{ asset: any }> = ({ asset }) => {
  return (
    <Box
      position="absolute"
      inset={0}
      backgroundColor="blackAlpha.800"
      display="none"
      _groupHover={{
        display: "block",
      }}
    >
      <VStack
        px={6}
        py={6}
        spacing={4}
        alignItems="stretch"
        fontSize="sm"
        fontWeight={500}
      >
        <Flex alignItems="center" fontFamily="Titillium Web">
          <Box w="20px" mr={2} fill="#f6a800">
            <MineIcon />
          </Box>
          <Text>Rarity</Text>
          <Text
            ml="auto"
            letterSpacing="0.1em"
            textTransform="uppercase"
            fontFamily="Orbitron"
          >
            Legendary
          </Text>
        </Flex>
        <Flex alignItems="center">
          <Box w="20px" mr={2} fill="#f6a800">
            <MineIcon />
          </Box>
          <Text>Shine</Text>
          <Text
            ml="auto"
            letterSpacing="0.1em"
            textTransform="uppercase"
            fontFamily="Orbitron"
          >
            Stone
          </Text>
        </Flex>
        <Flex alignItems="center">
          <Box w="20px" mr={2} fill="#ffffff">
            <MineIcon />
          </Box>
          <Text>Type</Text>
          <Text
            ml="auto"
            letterSpacing="0.1em"
            textTransform="uppercase"
            fontFamily="Orbitron"
          >
            Extractor
          </Text>
        </Flex>
        <Flex alignItems="center">
          <Box w="20px" mr={2} fill="#07a3dd">
            <MineIcon />
          </Box>
          <Text>Charge Time</Text>
          <Text
            ml="auto"
            letterSpacing="0.1em"
            color="#07a3dd"
            fontFamily="Orbitron"
          >
            1200<chakra.span color="white">s</chakra.span>
          </Text>
        </Flex>
        <Flex alignItems="center">
          <Box w="20px" mr={2} fill="#f6a800">
            <MineIcon />
          </Box>
          <Text>Mining Power</Text>
          <Text
            ml="auto"
            letterSpacing="0.1em"
            color="#f6a800"
            fontFamily="Orbitron"
          >
            1.4
          </Text>
        </Flex>
        <Flex alignItems="center">
          <Box w="20px" mr={2} fill="#f6a800">
            <MineIcon />
          </Box>
          <Text>PWR</Text>
          <Text
            ml="auto"
            letterSpacing="0.1em"
            color="#f6a800"
            fontFamily="Orbitron"
          >
            1
          </Text>
        </Flex>
        <Flex alignItems="center">
          <Box w="20px" mr={2} fill="#f6a800">
            <MineIcon />
          </Box>
          <Text>NFT Luck</Text>
          <Text
            ml="auto"
            letterSpacing="0.1em"
            color="#f6a800"
            fontFamily="Orbitron"
          >
            0.5
          </Text>
        </Flex>
      </VStack>
    </Box>
  );
};

const NFTCard: React.FC<{
  selected?: boolean;
  assetId?: string;
  asset?: any;
  detailsOnHover?: boolean;
  prefilled?: {
    type?: string;
    title?: string;
    subtitle?: string;
    image?: string;
    mod?: string;
  };
}> = ({ selected, assetId, prefilled, asset, detailsOnHover }) => {
  const {
    game: { getAssetsById },
  } = useAppState();
  const nftAsset: any = asset || getAssetsById(assetId);

  return (
    <CardCont selected={selected} role="group">
      <>
        <CardWrap>
          <CardBorder />

          <CardType>
            {prefilled ? prefilled.type : getType(nftAsset.schema_name)}
          </CardType>
          <CardMod> {prefilled ? prefilled.mod : getMod(nftAsset)}</CardMod>
          <CardInner>
            <CardImage>
              <Image
                src={
                  // eslint-disable-next-line no-nested-ternary
                  prefilled
                    ? prefilled.image
                    : nftAsset?.data?.img
                    ? `https://alienworlds.mypinata.cloud/ipfs/${nftAsset?.data?.img}`
                    : "/images/alienworlds-profile-sample01.jpg"
                }
                // loader={
                //   <Center h="full">
                //     <Spinner size="lg" />
                //   </Center>
                // }
              />
            </CardImage>

            {!prefilled && <CardCharge asset={nftAsset} />}

            <CardInfo>
              <CardTitle>
                <Text
                  fontFamily="Orbitron"
                  fontSize="18px"
                  fontWeight={500}
                  letterSpacing="0.05em"
                  color="white"
                  mb={1}
                >
                  {prefilled ? prefilled.title : getTitle(nftAsset)}
                </Text>
              </CardTitle>
              <CardSub>
                <Text
                  fontFamily="Titillium Web"
                  fontSize="15px"
                  fontWeight={400}
                  letterSpacing="0px"
                  color="white"
                >
                  {prefilled ? prefilled.subtitle : getSubtitle(nftAsset)}
                </Text>
              </CardSub>
            </CardInfo>
            <CardIconscont>
              {!prefilled && <CardIcons asset={nftAsset} />}
            </CardIconscont>
          </CardInner>
        </CardWrap>

        {detailsOnHover && <DetailsOnHover asset={nftAsset} />}
      </>
    </CardCont>
  );
};

export { NFTCard };

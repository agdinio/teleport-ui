import React, { useRef, useState, useEffect } from "react";

import { AspectRatioProps, Box, Flex, Text, VStack } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { ChangeIcon } from "components/ui/Icons";
import { motion } from "framer-motion";
import { useClickAway } from "react-use";

import { useActions, useAppState } from "../../store";
import { useSortNFTs } from "../../util/useSortNFTs";
import { NFTCard } from "./NFTCard";
import { NFTCardEmpty } from "./NFTCardEmpty";
import { NFTCardSmall } from "./NFTCardSmall";
import { NFTSort } from "./NFTSort";

const AnimatedVStack = motion(VStack);
const AnimatedBox = motion(Box);
const AnimatedFlex = motion(Flex);

interface ItemListProps extends AspectRatioProps {
  assetId?: string;
  setShowCard: (show: boolean) => void;
  visible: boolean;
  noRemove?: boolean;
}
const ItemList: React.FC<ItemListProps> = ({
  setShowCard,
  visible,
  assetId,
  noRemove,
  ...props
}) => {
  const ref = useRef(null);
  useClickAway(ref, () => {
    setShowCard(true);
  });
  const {
    game: { getAssetsForBag, bag },
  } = useAppState();
  const actions = useActions();
  const { sortedAssets, setSortedBy, sortedBy, setSortedAssets } = useSortNFTs(
    getAssetsForBag
  );

  useEffect(() => {
    setSortedAssets(getAssetsForBag);
  }, [getAssetsForBag]);

  function setNewTool(id: string) {
    const newBag = bag.map((tool) => tool.asset_id);
    if (assetId !== null) {
      newBag[newBag.indexOf(assetId)] = id;
    } else {
      newBag.push(id);
    }

    actions.game.setBag(newBag);
  }

  function removeTool() {
    const newBag = bag
      .filter((tool) => tool.asset_id !== assetId)
      .map((tool) => tool.asset_id);
    actions.game.setBag(newBag);
  }

  return (
    <AnimatedBox
      ref={ref}
      initial="hidden"
      top={0}
      left={0}
      animate={visible ? "visible" : "hidden"}
      position={visible ? "relative" : "absolute"}
      pointerEvents={visible ? "unset" : "none"}
      zIndex={1000}
      {...props}
    >
      <Flex
        position="absolute"
        zIndex={1000}
        top={0}
        left={0}
        w="full"
        transform="translateY(-120%)"
        justifyContent="space-between"
        letterSpacing="0.1em"
      >
        <AnimatedFlex
          variants={{
            visible: {
              opacity: 1,
              transition: {
                delay: 0.2,
              },
            },
            hidden: {
              opacity: 0,
            },
          }}
        >
          <NFTSort setSortedBy={setSortedBy} sortedBy={sortedBy} />
        </AnimatedFlex>

        {!noRemove && (
          <AnimatedFlex
            align="center"
            fontFamily="Titillium Web"
            fontWeight="semibold"
            cursor="pointer"
            onClick={removeTool}
            variants={{
              visible: {
                opacity: 1,
                transition: {
                  delay: 0.5,
                },
              },
              hidden: {
                opacity: 0,
              },
            }}
          >
            <Text fontSize="lg" color="#ff3a52" mr={2}>
              Remove
            </Text>
            <Text fontSize="xl" color="#ff3a52">
              X
            </Text>
          </AnimatedFlex>
        )}
      </Flex>
      {sortedAssets?.length && (
        <AnimatedVStack
          w="270px"
          h="500px"
          maxH="500px"
          backgroundColor="whiteAlpha.800"
          p={3}
          borderRadius={20}
          spacing={3}
          overflow="scroll"
          css={css`
            ::-webkit-scrollbar {
              background: transparent;
              width: 0; /* make scrollbar transparent */
            }
          `}
          variants={{
            visible: {
              opacity: 1,
              height: "500px",
              transition: {
                staggerChildren: 0.07,
                delayChildren: 0.4,
                duration: 0.5,
              },
            },
            hidden: {
              opacity: 0,
              height: "0px",
              transition: { staggerChildren: 0.05, staggerDirection: -1 },
            },
          }}
        >
          {sortedAssets.map((asset) => (
            <AnimatedBox
              onClick={() => setNewTool(asset.asset_id)}
              cursor="pointer"
              key={asset.asset_id}
              w="full"
              layout
              variants={{
                visible: {
                  translateY: 0,
                  opacity: 1,
                  transition: {
                    y: { stiffness: 1000, velocity: -100 },
                  },
                },
                hidden: {
                  translateY: 70,
                  opacity: 0,
                  transition: {
                    y: { stiffness: 1000 },
                  },
                },
              }}
            >
              <NFTCardSmall asset={asset} />
            </AnimatedBox>
          ))}
        </AnimatedVStack>
      )}
    </AnimatedBox>
  );
};

const BagItemChooser: React.FC<{ assetId?: string; noRemove?: boolean }> = ({
  assetId,
  noRemove,
}) => {
  const [showCard, setShowCard] = useState(true);
  return (
    <Box
      w="270px"
      zIndex={0}
      position="relative"
      userSelect="none"
      mt={!showCard ? 12 : 0}
    >
      <AnimatedFlex
        left={0}
        top={0}
        w="270px"
        h="400px"
        minH="400px"
        cursor="pointer"
        position={showCard ? "relative" : "absolute"}
        role="group"
        onClick={() => setShowCard(false)}
        zIndex={0}
        initial="visible"
        animate={showCard ? "visible" : "hidden"}
        variants={{
          visible: {
            opacity: 1,
          },
          hidden: { opacity: 0.2 },
        }}
      >
        {assetId ? <NFTCard assetId={assetId} /> : <NFTCardEmpty />}
        <Box
          position="absolute"
          display="none"
          top={0}
          left={0}
          width="100%"
          h="100%"
          opacity={0.92}
          bg="rgb(33, 33, 33)"
          borderRadius={20}
          _groupHover={{
            display: "block",
          }}
        />

        <Flex
          w="full"
          h="full"
          direction="column"
          justifyContent="center"
          alignItems="center"
          position="absolute"
          display="none"
          right={0}
          left={0}
          _groupHover={{
            display: "flex",
          }}
          onClick={() => setShowCard(false)}
        >
          <Text
            fontFamily="Orbitron"
            fontSize="2xl"
            color="#fbb100"
            textAlign="center"
            letterSpacing="0.1em"
          >
            {noRemove ? "Set" : "Change"}
          </Text>
          <Box w={16} mt={4} mx="auto">
            <ChangeIcon />
          </Box>
        </Flex>
      </AnimatedFlex>

      <ItemList
        noRemove={noRemove}
        assetId={assetId}
        visible={!showCard}
        setShowCard={setShowCard}
      />
    </Box>
  );
};

export { BagItemChooser };

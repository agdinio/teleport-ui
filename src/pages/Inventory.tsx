import React, { useEffect, useState } from "react";

import { Box, css, Flex, Tab, TabList, Tabs, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import cloneDeep from "lodash/cloneDeep";
import _random from "lodash/random";
import { useFirstMountState } from "react-use";

import { NFTCard } from "../components/ui/NFTCard";
import { NFTSort } from "../components/ui/NFTSort";
import { useAppState } from "../store";
import { AssetType } from "../store/game/state";
import { useSortNFTs } from "../util/useSortNFTs";

const tabStyles = {
  fontFamily: "Titillium Web",
  color: "#afafaf",
  fontWeight: "bold",
  letterSpacing: "0.1em",
  borderRadius: 17.5,
  _selected: {
    backgroundColor: "whiteAlpha.500",
    color: "white",
  },
  _focus: {
    outline: 0,
  },
};
const tabContainerStyles = {
  borderWidth: "2px",
  borderColor: "whiteAlpha.500",
  borderRadius: 20,
};
const AnimatedFlex = motion(Flex);
const AnimatedBox = motion(Box);

export const InventoryGrid = ({ assets }: { assets: any[] }) => {
  return (
    <Flex
      // style={{ gap: "20px" }}
      gridGap={8}
      flexWrap="wrap"
      justifyContent="flex-start"
      alignItems="flex-start"
      w="full"
    >
      {assets.map((asset, i) => (
        // <Box overflow="hidden" w="140px">
        <AnimatedBox
          key={asset.asset_id}
          // key={_random(-50000, 2000000)}
          layout
          initial={{ y: -50, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              delay: i * 0.05 + 0.05,
            },
          }}
          // exit={{ y: 50, opacity: 0, transition: { duration: 0.15 } }}
          // transform="scale(0.5)"
          // transformOrigin="left top"
        >
          <NFTCard asset={asset} detailsOnHover />
        </AnimatedBox>
        // </Box>
      ))}
    </Flex>
  );
};

const Inventory = () => {
  const {
    game: { getAssetsByType },
  } = useAppState();

  const [assetsByType, setAssetsByType] = useState(
    cloneDeep(getAssetsByType())
  );

  const { sortedAssets, setSortedBy, setSortedAssets, sortedBy } =
    useSortNFTs(assetsByType);

  useEffect(() => {
    setSortedAssets(assetsByType);
  }, [assetsByType]);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0.1 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.3 }}
    >
      <Tabs variant="soft-rounded" colorScheme="gray" alignSelf="flex-start">
        <Flex>
          <TabList
            {...tabContainerStyles}
            overflowX="auto"
            w="fit-content"
            css={css({
              scrollbarWidth: "none",
              "::-webkit-scrollbar": { display: "none" },
              // "-webkit-overflow-scrolling": "touch",
              overflowScrolling: "touch",
              boxShadow: "inset 0 -2px 0 rgba(0, 0, 0, 0.1)",
            })}
          >
            <Tab
              {...tabStyles}
              onClick={() => setAssetsByType(getAssetsByType())}
            >
              All
            </Tab>
            <Tab
              {...tabStyles}
              onClick={() => setAssetsByType(getAssetsByType(AssetType.TOOL))}
            >
              Equipment
            </Tab>
            <Tab
              {...tabStyles}
              onClick={() => setAssetsByType(getAssetsByType(AssetType.FACES))}
            >
              Avatars
            </Tab>
            <Tab
              {...tabStyles}
              onClick={() => setAssetsByType(getAssetsByType(AssetType.ARMS))}
            >
              Weapons
            </Tab>
            <Tab
              {...tabStyles}
              onClick={() => setAssetsByType(getAssetsByType(AssetType.LAND))}
            >
              Land
            </Tab>
            <Tab
              {...tabStyles}
              onClick={() => setAssetsByType(getAssetsByType(AssetType.CREW))}
            >
              Minions
            </Tab>
          </TabList>

          <Flex alignItems="center" ml="auto" position="relative" zIndex={1000}>
            <Text
              mr={4}
              fontFamily="Titillium Web"
              letterSpacing="0.1em"
              color="#fff"
            >
              Sort by
            </Text>
            <NFTSort setSortedBy={setSortedBy} sortedBy={sortedBy} />
          </Flex>
        </Flex>
        <Box mt={10}>
          <InventoryGrid assets={sortedAssets} />
        </Box>
      </Tabs>
    </motion.div>
  );
};

export default Inventory;

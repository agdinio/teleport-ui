import { useEffect, useState } from "react";

import cloneDeep from "lodash/cloneDeep";
import orderBy from "lodash/sortBy";

enum SortNFTsBy {
  NAME = "Name",
  RARITY = "Rarity",
  SHINE = "Shine",
  CHARGE = "Charge",
  MINE = "Mine",
  POW = "POW",
  LUCK = "Luck",
}

const useSortNFTs = (assets) => {
  const [sortedAssets, setSortedAssets] = useState(cloneDeep(assets));
  const [sortedBy, setSortedBy] = useState(SortNFTsBy.NAME);

  useEffect(() => {
    if (sortedBy === SortNFTsBy.NAME) {
      setSortedAssets(orderBy(sortedAssets, (asset) => asset.data.name));
    }
    if (sortedBy === SortNFTsBy.RARITY) {
      setSortedAssets(orderBy(sortedAssets, (asset) => asset.data.rarity));
    }
    if (sortedBy === SortNFTsBy.SHINE) {
      setSortedAssets(orderBy(sortedAssets, (asset) => asset.data.shine));
    }
    if (sortedBy === SortNFTsBy.CHARGE) {
      setSortedAssets(orderBy(sortedAssets, (asset) => asset.data.delay));
    }
    if (sortedBy === SortNFTsBy.MINE) {
      setSortedAssets(orderBy(sortedAssets, (asset) => asset.data.ease));
    }
    if (sortedBy === SortNFTsBy.POW) {
      setSortedAssets(orderBy(sortedAssets, (asset) => asset.data.difficulty));
    }
    if (sortedBy === SortNFTsBy.LUCK) {
      setSortedAssets(orderBy(sortedAssets, (asset) => asset.data.luck));
    }
  }, [sortedBy]);

  return { sortedAssets, setSortedBy, sortedBy, setSortedAssets };
};

export { useSortNFTs, SortNFTsBy };

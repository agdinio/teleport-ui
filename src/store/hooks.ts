import { useState } from "react";

import { ExplorerApi } from "atomicassets";
import { ApiAsset } from "atomicassets/build/API/Explorer/Types";

import { useActions, useAppState } from "./index";

const api = new ExplorerApi("https://wax.api.atomicassets.io", "atomicassets", {
  fetch,
});

export const useAssetLoad = (assetId: string): [ApiAsset, boolean] => {
  const [isLoading, setIsLoading] = useState(true);
  const [asset, setAsset] = useState<ApiAsset>();
  const {
    game: { assetCache },
  } = useAppState();
  const actions = useActions();

  const alreadyLoaded = assetCache.find((item) => item.asset_id === assetId);
  if (alreadyLoaded) {
    setAsset(alreadyLoaded);
  } else if (isLoading) {
    api
      .getAsset(assetId)
      .then((newAsset) => {
        // actions.game.addAssetCacheItem(newAsset);
        setAsset(newAsset);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return [asset, isLoading];
};

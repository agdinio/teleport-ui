import React, { useRef, useState } from "react";

import { Box, Flex } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { BiChevronDown } from "react-icons/bi";
import { useClickAway } from "react-use";

import { SortNFTsBy } from "../../util/useSortNFTs";

const AnimatedFlex = motion(Flex);

const SortButton: React.FC<{ onClick: () => void }> = ({
  children,
  ...props
}) => {
  return (
    <Box
      as="button"
      px={4}
      backgroundColor="#fff"
      color="#212121"
      fontWeight="semibold"
      fontFamily="Titillium Web"
      letterSpacing="0.1em"
      userSelect="none"
      _hover={{ backgroundColor: "#212121", color: "white" }}
      {...props}
    >
      {children}
    </Box>
  );
};
const NFTSort: React.FC<{
  sortedBy: SortNFTsBy;
  setSortedBy: (by: SortNFTsBy) => void;
}> = ({ setSortedBy, sortedBy }) => {
  const [menuShow, setMenuShown] = useState(false);
  const ref = useRef(null);
  useClickAway(ref, () => {
    setMenuShown(false);
  });
  return (
    <Flex ref={ref} direction="column" position="relative" width="110px">
      <AnimatedFlex
        w="full"
        backgroundColor="#fff"
        color="#212121"
        fontFamily="Titillium Web"
        justifyContent="space-between"
        fontWeight="semibold"
        letterSpacing="0.1em"
        cursor="pointer"
        py={2}
        px={4}
        borderRadius={20}
        onClick={() => setMenuShown(!menuShow)}
      >
        {sortedBy}{" "}
        <AnimatedFlex
          alignItems="center"
          w="20px"
          pt="1px"
          animate={menuShow ? { rotateZ: 180 } : { rotateZ: 0 }}
        >
          <BiChevronDown />
        </AnimatedFlex>
      </AnimatedFlex>
      <AnimatePresence>
        {menuShow && (
          <AnimatedFlex
            w="full"
            flexDirection="column"
            overflow="hidden"
            cursor="pointer"
            backgroundColor="#fff"
            py={2}
            borderRadius={20}
            position="absolute"
            top={12}
            sx={{
              gap: 5,
            }}
            initial={{ opacity: 0, height: "0%" }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: "0%" }}
          >
            <SortButton
              onClick={() => {
                setSortedBy(SortNFTsBy.RARITY);
                setMenuShown(false);
              }}
            >
              Rarity
            </SortButton>
            <SortButton
              onClick={() => {
                setSortedBy(SortNFTsBy.SHINE);
                setMenuShown(false);
              }}
            >
              Shine
            </SortButton>
            <SortButton
              onClick={() => {
                setSortedBy(SortNFTsBy.CHARGE);
                setMenuShown(false);
              }}
            >
              Charge
            </SortButton>
            <SortButton
              onClick={() => {
                setSortedBy(SortNFTsBy.MINE);
                setMenuShown(false);
              }}
            >
              Mine
            </SortButton>
            <SortButton
              onClick={() => {
                setSortedBy(SortNFTsBy.POW);
                setMenuShown(false);
              }}
            >
              POW
            </SortButton>
            <SortButton
              onClick={() => {
                setSortedBy(SortNFTsBy.LUCK);
                setMenuShown(false);
              }}
            >
              Luck
            </SortButton>
            <SortButton
              onClick={() => {
                setSortedBy(SortNFTsBy.NAME);
                setMenuShown(false);
              }}
            >
              Name
            </SortButton>
          </AnimatedFlex>
        )}
      </AnimatePresence>
    </Flex>
  );
};

export { NFTSort };

import React from "react";

import { AspectRatio, Box, Center } from "@chakra-ui/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled/macro";

import { AddIcon } from "./Icons";

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

const CardCont = styled(AspectRatio)`
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  display: inline-block;
  height: 400px;
  min-height: 400px;
  overflow: hidden;
  position: relative;
  width: 270px;
  box-sizing: border-box;
  ${(props) =>
    props.selected &&
    css`
      box-shadow: 0 0 0 5px #0ed4a8;
    `}
}
`;

const NFTCardEmpty: React.FC<{
  selected?: boolean;
}> = ({ selected }) => {
  return (
    <CardCont selected={selected}>
      <CardWrap>
        <CardBorder />
        <Center position="absolute">
          <Box w="80px" fill="#f6a800">
            <AddIcon />
          </Box>
        </Center>
      </CardWrap>
    </CardCont>
  );
};

export { NFTCardEmpty };

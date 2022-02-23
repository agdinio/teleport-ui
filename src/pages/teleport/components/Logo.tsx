import { Flex, Image } from "@chakra-ui/react";
import styled from "@emotion/styled/macro";
import AnchorIconWhite from "assets/images/alienworlds-db-logo-anchor-white.svg";
import WaxIconWhite from "assets/images/alienworlds-db-logo-wax-white.svg";
import BinanceIcon from "assets/images/alienworlds-teleport-logo-binance.svg";
import EthereumIcon from "assets/images/alienworlds-teleport-logo-ethereum.svg";
import TransferArrowError from "assets/images/alienworlds-teleport-transfer_arrow-icon-error.svg";
import TransferArrowSuccess from "assets/images/alienworlds-teleport-transfer_arrow-icon-success.svg";

export const WaxLogo = styled(Flex)`
  background-image: url(${(props) => WaxIconWhite});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  height: ${(props) => props.height || "64px"};
  width: ${(props) => props.width || "250px"};
`;

export const AnchorLogo = styled(Flex)`
  background-image: url(${(props) => AnchorIconWhite});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  height: ${(props) => props.height || "82px"};
  width: ${(props) => props.width || "150px"};
`;

export const EthereumLogo = styled(Flex)<{}>`
  background-image: url(${(props) => EthereumIcon});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  height: ${(props) => props.height || "83px"};
  width: ${(props) => props.width || "150px"};
`;

export const BinanceLogo = styled(Flex)<{}>`
  background-image: url(${(props) => BinanceIcon});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  height: ${(props) => props.height || "83px"};
  width: ${(props) => props.width || "150px"};
`;

export const OneWayArrowXXX = styled(Flex)<{ isError?: boolean }>`
  height: ${(props) => props.height || "64px"};
  width: ${(props) => props.width || "250px"};
  &:after {
    background-image: url(${(props) =>
      props.isError ? TransferArrowError : TransferArrowSuccess});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 30%;
    content: "";
    height: 100%;
    width: 100%;
  }
`;

export const OneWayArrow = styled(Flex)<{ isError?: boolean }>`
  height: 50px;
  width: 140px;
  &:after {
    background-image: url(${(props) =>
      props.isError ? TransferArrowError : TransferArrowSuccess});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 30%;
    content: "";
    height: 100%;
    width: 100%;
  }
`;

import React from "react";

import { Box, Spinner, chakra } from "@chakra-ui/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled/macro";

const fasterAnim = css`
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
`;
const slowerAnim = css`
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
`;

const MainBtn = styled(Box)`
  border-radius: ${(props) => (props.size === "xl" ? "21px" : "22px")};
  color: ${(props) =>
    props.variant?.textColor ? props.variant.textColor : "#fff"};
  font-family: "Orbitron", serif;
  font-weight: 700;
  letter-spacing: 1px;
  line-height: 1.22;

  overflow: hidden;
  padding: ${(props) =>
    props.size === "xl" ? "0.4333em 1.111em" : "0.4333em 1.111em"};

  position: relative;
  text-shadow: -1px -1px 0 rgba(33, 33, 33, 0.5);
  z-index: 5;
  ${slowerAnim};

  :after {
    background: linear-gradient(
      to bottom,
      rgba(33, 33, 33, 1) 0%,
      rgba(33, 33, 33, 0) 100%
    );
    content: "";
    height: 50%;
    left: 0;
    opacity: 0.25;
    position: absolute;
    top: 50%;
    transform: rotate(-2deg);
    width: 100%;

    z-index: 2;

    ${slowerAnim};
  }
`;

const MainButtonWrap = styled(Box)`
  background: rgb(156, 51, 182);
  ${(props) => props.variant.mainGradient};
  background-clip: padding-box;
  background-position: center center;
  background-size: auto 110%;
  border: solid 0 transparent;
  border-radius: ${(props) => (props.size === "xl" ? "21px" : "22px")};
  color: #fff;
  display: inline-block;
  position: relative;
  transform-origin: center;
  ${fasterAnim};

  :before {
    background: rgb(200, 200, 200);
    ${(props) => props.variant.borderGradient};
    background-position: center center;
    background-size: auto 110%;
    border-radius: ${(props) => (props.size === "xl" ? "21px" : "22px")};
    bottom: 0;
    content: "";
    left: 0;
    margin: -2px;
    position: absolute;
    right: 0;
    top: 0;
    z-index: -1;

    ${slowerAnim};
  }

  :after {
    background-color: #212121;
    border-radius: ${(props) => (props.size === "xl" ? "21px" : "22px")};
    bottom: 0;
    content: "";
    left: 0;
    margin: -2px;
    position: absolute;
    right: 0;
    top: 0;
    transform: translateY(3px) scale(1.01);
    z-index: -2;
    ${fasterAnim};
  }
`;

const MainButtonContent = styled(Box)`
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  font-size: ${(props) => (props.size === "xl" ? "25px" : "16px")};

  position: relative;
  transform-origin: center;
  user-select: none;
  z-index: 2;

  ${slowerAnim};

  ${(props) =>
    !props.isLoading && !props.isDisabled
      ? css`
          &:hover {
            transform: scale(1.05);

            ${MainBtn}:after {
              background: linear-gradient(
                to bottom,
                rgba(255, 255, 255, 1) 0%,
                rgba(255, 255, 255, 0) 100%
              );
              top: 20%;

              transform: rotate(2deg);
            }

            ${MainButtonWrap} {
              background: linear-gradient(
                  to bottom,
                  rgba(156, 51, 182, 1) 0%,
                  rgba(0, 155, 212, 1) 50%
                )
                bottom 10% center;
              background-size: auto 200%;
            }

            ${MainButtonWrap}:before {
              background: linear-gradient(
                to bottom,
                rgba(180, 180, 180, 1) 20%,
                rgba(255, 255, 255, 1) 40%
              );
            }

            ${MainButtonWrap}:after {
              opacity: 0;
              transform: translateY(0px) scale(1.01);
            }
          }

          &:active {
            transform: scale(0.98);

            ${MainBtn} {
              color: #212121;
              text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.5);
            }

            ${MainBtn}:after {
              background: linear-gradient(
                to bottom,
                rgba(33, 33, 33, 1) 0%,
                rgba(33, 33, 33, 0) 100%
              );
              top: 0;
              transform: rotate(0deg);
            }

            ${MainButtonWrap} {
              background: linear-gradient(
                  to bottom,
                  rgba(255, 255, 255, 1) 45%,
                  rgba(220, 220, 220, 1) 30%
                )
                center center;
              background-size: auto 110%;
            }

            ${MainButtonWrap}:before {
              background: linear-gradient(
                to bottom,
                rgba(50, 50, 50, 1) 0%,
                rgba(7, 163, 221, 1) 100%
              );
            }

            ${MainButtonWrap}:after {
              opacity: 0;
              transform: translateY(0px) scale(1.01);
            }
          }
        `
      : null}
`;

const MainButtonText = styled(Box)`
  position: relative;
  z-index: 4;
`;

const variants = {
  default: {
    mainGradient: css`
      background: linear-gradient(
        to bottom,
        rgba(156, 51, 182, 1) 0%,
        rgba(0, 155, 212, 1) 100%
      );
    `,
    borderGradient: css`
      background: linear-gradient(
        to bottom,
        rgba(200, 200, 200, 1) 0%,
        rgba(49, 64, 182, 1) 100%
      );
    `,
  },
  green: {
    mainGradient: css`
      background: linear-gradient(
          to bottom,
          rgba(14, 212, 16, 1) 0%,
          rgba(0, 174, 238, 1) 50%
        )
        bottom 10% center;
    `,
    borderGradient: css`
      background: linear-gradient(
        to bottom,
        rgba(200, 200, 200, 1) 20%,
        rgba(108, 74, 204, 1) 40%
      );
    `,
  },
  disabled: {
    mainGradient: css`
      background: linear-gradient(
          to bottom,
          rgba(152, 152, 152, 1) 0%,
          rgba(101, 101, 101, 1) 50%
        )
        bottom 10% center;
    `,
    borderGradient: css`
      background: linear-gradient(
        to bottom,
        rgba(152, 152, 152, 1) 20%,
        rgba(101, 101, 101, 1) 40%
      );
    `,
    textColor: "#c7c4c4",
  },
  mine: {
    mainGradient: css`
      background: linear-gradient(
          to bottom,
          rgba(14, 212, 168, 1) 0%,
          rgba(0, 174, 238, 1) 50%
        )
        bottom 10% center;
    `,
    borderGradient: css`
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 1) 20%,
        rgba(0, 252, 255, 1) 40%
      );
    `,
  },
};

const MainButton = ({
  children,
  onClick,
  isLoading,
  size,
  variant,
  isDisabled,
  ...props
}: {
  children: React.ReactNode;
  onClick: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  size?: string;
  variant?: string;
  props?: any;
}) => {
  const selectedVariant = variant ? variants[variant] : variants.default;
  return (
    <MainButtonContent
      onClick={isLoading || isDisabled ? () => {} : onClick}
      isLoading={isLoading}
      isDisabled={isDisabled}
      size={size}
      {...props}
    >
      <MainButtonWrap size={size} variant={selectedVariant}>
        <MainBtn size={size} variant={selectedVariant}>
          <MainButtonText>
            <chakra.span visibility={isLoading ? "hidden" : "visible"}>
              {children}
            </chakra.span>
            {isLoading && (
              <Spinner
                size="sm"
                mx="auto"
                position="absolute"
                zIndex={10}
                left={0}
                right={0}
                top="calc(50% - 0.5rem)"
              />
            )}
          </MainButtonText>
        </MainBtn>
      </MainButtonWrap>
    </MainButtonContent>
  );
};

export { MainButton };

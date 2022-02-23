import React from "react";

import {
  Box,
  Center,
  Flex,
  Heading,
  ResponsiveValue,
  Spinner,
  FlexProps,
} from "@chakra-ui/react";
import { Img } from "react-image";

function getPlanetGradient(name: string): string {
  name = name.toLowerCase().trim();
  if (name === "eyeke") {
    return "linear-gradient(133deg, rgb(15,85,129) 50%, rgb(211,192,3) 100%)";
  }
  if (name === "veles") {
    return "linear-gradient(133deg, rgb(45,38,189) 50%, rgb(65,149,31) 100%)";
  }
  if (name === "neri") {
    return "linear-gradient(133deg, rgb(236,184,82) 50%, rgb(171,196,30) 100%)";
  }
  if (name === "kavian") {
    return "linear-gradient(133deg, rgb(230,184,118) 50%, rgb(179,65,16) 100%)";
  }
  if (name === "magor") {
    return "linear-gradient(133deg, rgb(133,56,17) 50%, rgb(246,133,25) 100%)";
  }
  if (name === "naron") {
    return "linear-gradient(133deg, rgb(180,187,231) 50%, rgb(76,122,32) 100%)";
  }

  return "";
}

interface PlanetImageProps {
  planet: any;
  interactive?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
  imageBoxSize?: ResponsiveValue<number>;
  titleDisplay?: ResponsiveValue<string>;
}
const PlanetImage: React.FC<PlanetImageProps & FlexProps> = ({
  planet,
  isSelected,
  onClick,
  interactive,
  titleDisplay,
  imageBoxSize,
  ...props
}) => {
  return (
    <Flex
      key={planet.title}
      onClick={onClick}
      flexDirection="column"
      alignItems="center"
      role="group"
      w="full"
      {...(onClick && { as: "button", onClick, cursor: "pointer" })}
      {...props}
    >
      <Box position="relative" maxW={imageBoxSize} zIndex={0}>
        <Box
          zIndex={-2}
          position="absolute"
          w="calc(100% + 12px)"
          h="calc(100% + 12px)"
          left="-6px"
          top="-6px"
          borderRadius="full"
          backgroundColor="red.500"
          bg="blackAlpha.400"
        />
        <Box
          zIndex={-1}
          position="absolute"
          w="calc(100%)"
          h="calc(100%)"
          borderRadius="full"
          backgroundColor="red.500"
          bg={isSelected ? "#0ed4a8" : getPlanetGradient(planet.title)}
          {...(interactive && {
            _groupHover: {
              bg: "#0ed4a8",
              backgroundColor: "#0ed4a8",
            },
          })}
        />
        <Img
          src={`https://alienworlds.mypinata.cloud/ipfs/${planet.metadata.img}`}
          alt="Male avatar"
          loader={
            <Center h="full">
              <Spinner size="lg" />
            </Center>
          }
        />
      </Box>
      <Heading
        as="h3"
        fontFamily="Orbitron"
        textAlign="center"
        letterSpacing="0.1em"
        fontWeight={400}
        color={isSelected ? "#0ed4a8" : "white"}
        my={4}
        mx={4}
        fontSize="2xl"
        display={titleDisplay}
        {...(interactive && {
          _groupHover: {
            color: "#0ed4a8",
          },
        })}
      >
        {planet.title}
      </Heading>
    </Flex>
  );
};

export { PlanetImage };

import { Box, Button, ButtonProps } from "@chakra-ui/react";
import { ArrowIcon } from "components/ui/Icons";

const ScreenActionButton: React.FC<ButtonProps & { isNext?: boolean }> = ({
  isNext,
  ...props
}) => {
  return (
    <Button
      position="relative"
      h={16}
      w={16}
      minH={16}
      minW={16}
      borderRadius="full"
      bg="transparent"
      borderWidth="2px"
      borderColor="whiteAlpha.400"
      fill="whiteAlpha.400"
      _hover={{
        fill: "#f6a800",
        bg: "whiteAlpha.200",
        borderColor: "#c7c7c7",
      }}
      _active={{
        fill: "#f6a800",
        bg: "whiteAlpha.400",
        borderColor: "#c7c7c7",
      }}
      {...props}
    >
      <Box
        w={4}
        position="absolute"
        {...(!isNext && { transform: "rotateZ(180deg)", ml: -2 })}
      >
        <ArrowIcon />
      </Box>
    </Button>
  );
};

export { ScreenActionButton };

import { Button, ButtonProps } from "@chakra-ui/react";

const NakedButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
      justifyContent="flex-start"
      borderRadius={20}
      bg="transparent"
      color="white"
      fill="white"
      fontSize="md"
      fontFamily="Titillium Web"
      fontWeight={500}
      pl={0}
      _focus={{
        boxShadow: "none",
        fill: "whiteAlpha.800",
        color: "whiteAlpha.800",
      }}
      _hover={{
        bg: "transparent",
        fill: "whiteAlpha.600",
        color: "whiteAlpha.600",
      }}
      _active={{
        bg: "transparent",
        fill: "whiteAlpha.400",
        color: "whiteAlpha.400",
      }}
      _disabled={{
        _hover: {
          bg: "transparent",
          fill: "whiteAlpha.600",
          color: "whiteAlpha.600",
        },
      }}
      {...(props.color && { fill: props.color })}
      {...props}
    >
      {children}
    </Button>
  );
};

export { NakedButton };

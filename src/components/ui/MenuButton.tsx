import React from "react";

import { Button, ButtonProps } from "@chakra-ui/react";

interface MenuButtonProps extends ButtonProps {
  active?: boolean;
}

const activeProps = {
  bg: "white",
  fill: "#212121",
  color: "#212121",
};
const MenuButton: React.FC<MenuButtonProps> = ({
  active,
  children,
  ...props
}: MenuButtonProps) => {
  return (
    <Button
      justifyContent="flex-start"
      color="#dadada"
      fill="#dadada"
      size="lg"
      px={4}
      borderRadius={20}
      borderWidth="1.8px"
      borderColor="#c8c8c8"
      bg="transparent"
      fontFamily="Orbitron"
      letterSpacing="0.1em"
      position="relative"
      {...(active && activeProps)}
      _focus={{
        boxShadow: "none",
      }}
      _hover={{
        bg: "#07a3dd",
        color: "#dadada",
        fill: "#dadada",
      }}
      _active={activeProps}
      _disabled={{
        cursor: "not-allowed",
        borderColor: "#5f5f5f",
        color: "#5f5f5f",
        fill: "#5f5f5f",
        _hover: {
          bg: "transparent",
          fill: "#5f5f5f",
          color: "#5f5f5f",
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export { MenuButton };

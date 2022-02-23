import { Flex } from "@chakra-ui/react";

const SimpleLayout = ({ children }) => {
  return (
    <Flex position="relative" flexDirection="column" minH="100vh">
      {children}
    </Flex>
  );
};

export default SimpleLayout;

import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

export const theme = extendTheme({
  breakpoints: createBreakpoints({
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  }),
  styles: {
    global: () => ({
      "#root": {
        minHeight: "100vh",
      },
      body: {
        fontFamily: "Titillium Web",
        color: "white",
        backgroundColor: "blackAlpha.800",
        minHeight: "100vh",
        "overscroll-behavior-y": "none",
      },
    }),
  },
});

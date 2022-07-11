import { extendTheme } from "@chakra-ui/react";

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    tomato: {
      50: "#ffe6ed",
      100: "#fabac9",
      200: "#f18ea6",
      300: "#ea6282",
      400: "#e3375e",
      500: "#e85578",
      600: "#9d1536",
      700: "#710d26",
      800: "#450516",
      900: "#1d0008",
    },
  },
  components: {
    Button: {
      baseStyle: {
        _hover: {
          color: "#e85578"
        }
      }
    }
  }
});
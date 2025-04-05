// src/theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Poppins', sans-serif",
  },
  colors: {
    brand: {
      50: "#ebf8ff",
      100: "#bee3f8",
      200: "#90cdf4",
      300: "#63b3ed",
      400: "#4299e1",
      500: "#3182ce",
      600: "#2b6cb0",
      700: "#2c5282",
      800: "#2a4365",
      900: "#1A365D",
    },
    success: {
      500: "#48BB78"
    },
    error: {
      500: "#C53030"
    },
  },
  styles: {
    global: {
      body: {
        bg: "gray.50",
        color: "gray.800",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "xl",
        fontWeight: "semibold",
      },
      defaultProps: {
        colorScheme: "brand",
      },
    },
    Input: {
      baseStyle: {
        borderRadius: "md",
      },
    },
    Box: {
      baseStyle: {
        borderRadius: "md",
      },
    },
  },
});

export default theme;

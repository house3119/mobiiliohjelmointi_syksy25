import React from "react";
import { createTheme, ThemeProvider } from "@rneui/themed";
import Component from "./components/MyComponent";
import OstoslistaComponent from "./components/OstoslistaComponent";

const theme = createTheme({
  lightColors: {},
  darkColors: {},
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <OstoslistaComponent />
    </ThemeProvider>
  );
}

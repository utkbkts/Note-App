import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import Theme from "./theme/Theme.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={Theme}>
    <ColorModeScript initialColorMode="dark" />
    <BrowserRouter>
          <App />
    </BrowserRouter>
  </ChakraProvider>
);

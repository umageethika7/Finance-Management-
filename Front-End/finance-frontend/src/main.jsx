import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MantineProvider withNormalizeCSS withGlobalStyles>
    <App />
  </MantineProvider>
);
import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "./i18n";

import App from "./App";
import { theme } from "./theme";
import type { Config } from "./namespaces";

// If you have __BUILD_INFO__ available globally, keep this:
window.__BUILD_INFO__ = Object.freeze(
  __BUILD_INFO__ as (typeof window)["__BUILD_INFO__"],
);

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("Unable to find root element");
}

async function bootstrap() {
  // Load runtime env config
  const response = await fetch("/env.json", { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to load /env.json (${response.status})`);
  }

  window.__env__ = (await response.json()) as Config.Env;

  ReactDOM.createRoot(rootEl!).render(
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </StrictMode>,
  );
}

void bootstrap();

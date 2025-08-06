import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { routerConfig } from "./router";
import { MutationsProvider } from "./context/mutations.context";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";

const router = { router: createBrowserRouter(routerConfig) };

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <MutationsProvider>
        <RouterProvider {...router} />
      </MutationsProvider>
    </QueryClientProvider>
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/theme-transitions.css";
import App from "./App.tsx";

import { registerServiceWorker } from "./lib/pwa";

const initApp = () => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );

  if (import.meta.env.PROD) {
    registerServiceWorker();
  }
};

initApp();

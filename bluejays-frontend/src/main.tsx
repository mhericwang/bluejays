import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { TeamsProvider } from "./contexts/TeamsContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <TeamsProvider>
        <App />
      </TeamsProvider>
    </BrowserRouter>
  </StrictMode>,
);

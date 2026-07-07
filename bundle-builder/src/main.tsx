import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App.tsx";
import { AppProvider } from "./providers/AppProvider.tsx";
import { Navbar } from "./components/shared/Navbar.tsx";
import { ErrorBoundary } from "./components/shared/ErrorBoundry.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <Navbar />
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </AppProvider>
  </StrictMode>,
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./app.css";
import App from "./App.tsx";
import { AppProvider } from "./providers/AppProvider.tsx";
import { Navbar } from "./components/shared/Navbar.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <Navbar />
      <App />
    </AppProvider>
  </StrictMode>,
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./src/App.jsx";
import { ThemeProvider } from "./src/components/themecontent/themeProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);

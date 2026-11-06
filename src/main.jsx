import React from "react";
import ReactDOM from "react-dom/client";
import App, { preloadCurrentPage } from "./App.jsx";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const initializeTheme = () => {
  try {
    const savedTheme = localStorage.getItem("theme-storage");
    if (savedTheme && JSON.parse(savedTheme)?.state?.theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  } catch {
    // storage blocked or corrupted: fall back to light theme
  }
};
initializeTheme();

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1 } }
});

const start = () =>
  ReactDOM.createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </QueryClientProvider>
  );

// The page HTML is prerendered, so keep it on screen until this page's code
// has loaded, then let React take over with identical content.
const path = import.meta.env.VITE_PREVIEW
  ? window.location.hash.replace(/^#/, "") || "/"
  : window.location.pathname;
preloadCurrentPage(path).then(start, start);
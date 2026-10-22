import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
</QueryClientProvider>
);
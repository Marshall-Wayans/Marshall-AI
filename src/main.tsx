import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "@/app/App";
import { initAccentFromStorage } from "@/utils/accent";
import "./index.css";

initAccentFromStorage();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
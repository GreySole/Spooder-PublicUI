import React from "react";
import ReactDOM from "react-dom/client";
import InitLayer from "./app/InitLayer";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <InitLayer />
  </React.StrictMode>
);

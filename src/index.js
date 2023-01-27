import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client'

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>,
);

import {StrictMode} from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

console.log('App starting...');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App/>
  </StrictMode>
);

console.log('App ready');


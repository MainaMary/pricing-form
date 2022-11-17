import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Store } from "./store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={Store}>
        <Navbar />
        <div
          className="pt-6 h-screen-height pb-12"
          style={{ background: "#ECF0F3" }}
        >
          <App />
        </div>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

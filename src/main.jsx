import React from "react";
import ReactDOM from "react-dom/client";
import App from "~/App.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "~/theme.js";

// Cau hinh react toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Experimental_CssVarsProvider as CssVarProvider } from "@mui/material/styles";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CssVarProvider theme={theme}>
    <CssBaseline>
      <App />
      <ToastContainer position="bottom-right" theme="colored" />
    </CssBaseline>
  </CssVarProvider>
);

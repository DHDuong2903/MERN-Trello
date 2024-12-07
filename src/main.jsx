import React from "react";
import ReactDOM from "react-dom/client";
import App from "~/App.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "~/theme.js";

import { Experimental_CssVarsProvider as CssVarProvider } from "@mui/material/styles";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssVarProvider theme={theme}>
      <CssBaseline>
        <App />
      </CssBaseline>
    </CssVarProvider>
  </React.StrictMode>
);

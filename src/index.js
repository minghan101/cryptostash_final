import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import CryptoProvider from "./CryptoContext";
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a root element
const root = ReactDOM.createRoot(document.getElementById("root"));

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

// Render the app
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CryptoProvider>
        <App />
      </CryptoProvider>
    </ThemeProvider>
  </React.StrictMode>
);

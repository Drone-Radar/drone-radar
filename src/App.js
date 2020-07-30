import React from "react";
import "./App.css";
import Routes from "./routes";
import GlobalStyle from './styles/global';

import { AppProvider } from "./contexts/app";

function App() {
  return (
    <>
      <AppProvider>
        <Routes />
        <GlobalStyle />
      </AppProvider>
    </>

  );
}

export default App;

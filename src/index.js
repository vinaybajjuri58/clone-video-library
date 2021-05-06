import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DataProvider, AuthProvider } from "./Context";
import { BrowserRouter as Router } from "react-router-dom";
import { Navbar } from "./Components";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Navbar />
        <DataProvider>
          <App />
        </DataProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

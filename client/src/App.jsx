import React from "react";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "./styles/global.css";
import { BrowserRouter as Router } from "react-router-dom";


import MainLayout from "./components/common_components/MainLayout";

import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <>
            <Router>
              <MainLayout />
            </Router>
      
    </>
  );
}

export default App;

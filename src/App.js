import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Test from "./components/Test";
import { PdfTextProvider } from "./context/PdfTextContext";

const App = () => {
  return (
    <PdfTextProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/test" Component={Test} />
        </Routes>
      </BrowserRouter>
    </PdfTextProvider>
  );
};

export default App;

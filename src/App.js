import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Test from "./components/Test";
import { PdfTextProvider, TextContext } from "./context/PdfTextContext";

const App = () => {
  return (
    <PdfTextProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            path="/test"
            element={<PrivateRoute path="/test" element={<Test />} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </PdfTextProvider>
  );
};

// Protecting /test route
const PrivateRoute = ({ element }) => {
  const { pdfText } = useContext(TextContext);
  if (!pdfText) {
    return <Navigate to="/" />;
  } else {
    return element;
  }
};

export default App;

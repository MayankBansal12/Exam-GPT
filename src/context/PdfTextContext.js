import React, { createContext, useState } from "react";

const TextContext = createContext();

const PdfTextProvider = ({ children }) => {
  const [pdfText, setPdfText] = useState("");
  const setTextValue = (value) => {
    setPdfText(value);
  };

  return (
    <TextContext.Provider value={{ pdfText, setTextValue }}>
      {children}
    </TextContext.Provider>
  );
};

export { TextContext, PdfTextProvider };

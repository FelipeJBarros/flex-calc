import { useState, createContext } from "react";

export const ThemeContext = createContext({});

function ThemeProvider({ children, theme }) {
  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
}

export default ThemeProvider;

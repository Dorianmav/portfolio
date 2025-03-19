import { useContext } from "react";
import { ThemeContext } from "./ThemeContext.context";
import { ThemeContextType } from "../types/Theme";

// Hook personnalisé pour utiliser le contexte de thème
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

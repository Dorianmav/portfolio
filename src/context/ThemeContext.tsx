// src/context/ThemeContext.tsx
import React, { useState, useEffect, useMemo } from "react";
import { ThemeType, themes } from "../theme/themes";
import { ThemeContext } from "./ThemeContext.context";

// Composant Provider pour le contexte de thème
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Récupérer le thème depuis le localStorage ou utiliser 'light' par défaut
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(() => {
    const savedTheme = localStorage.getItem("theme");
    return (savedTheme as ThemeType) || "light";
  });

  // Mettre à jour le localStorage quand le thème change
  useEffect(() => {
    localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const themeColors = themes[currentTheme];
  const isDarkMode = currentTheme === "dark";

  // Utilisation de useMemo pour optimiser les performances
  const contextValue = useMemo(
    () => ({
      currentTheme,
      themeColors,
      toggleTheme,
      isDarkMode,
    }),
    [currentTheme, themeColors, isDarkMode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

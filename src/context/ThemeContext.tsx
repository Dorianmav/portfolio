// src/context/ThemeContext.tsx
import React, { useState, useEffect, useMemo } from "react";
import { ThemeType, themes, themes2 } from "../theme/themes";
import { ThemeContext } from "./ThemeContext.context";

// Fonction pour déterminer si c'est la nuit en fonction de l'heure actuelle
const isNightTime = (): boolean => {
  const currentHour = new Date().getHours();
  // Considérer la nuit entre 19h (19:00) et 7h (07:00)
  return currentHour >= 19 || currentHour < 7;
};

// Composant Provider pour le contexte de thème
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Récupérer le thème depuis le localStorage ou utiliser un thème basé sur l'heure
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme as ThemeType;
    }
    // Si pas de thème sauvegardé, utiliser le thème sombre la nuit et clair le jour
    return isNightTime() ? "dark" : "light";
  });

  // État pour gérer la palette de couleurs actuelle (1 pour themes, 2 pour themes2)
  const [currentPalette, setCurrentPalette] = useState<number>(() => {
    const savedPalette = localStorage.getItem("palette");
    return savedPalette ? parseInt(savedPalette) : 1;
  });

  // Mettre à jour le localStorage quand le thème change
  useEffect(() => {
    localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  // Mettre à jour le localStorage quand la palette change
  useEffect(() => {
    localStorage.setItem("palette", currentPalette.toString());
  }, [currentPalette]);

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const togglePalette = () => {
    setCurrentPalette((prevPalette) => (prevPalette === 1 ? 2 : 1));
  };

  // Sélectionner la palette de couleurs appropriée
  const themeColors = currentPalette === 1 
    ? themes[currentTheme] 
    : themes2[currentTheme];
    
  const isDarkMode = currentTheme === "dark";

  // Utilisation de useMemo pour optimiser les performances
  const contextValue = useMemo(
    () => ({
      currentTheme,
      themeColors,
      toggleTheme,
      isDarkMode,
      currentPalette,
      togglePalette,
    }),
    [currentTheme, themeColors, isDarkMode, currentPalette]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

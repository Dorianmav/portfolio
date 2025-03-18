// src/context/ThemeContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import { ThemeType, themes } from "../theme/themes";

interface ThemeContextType {
  currentTheme: ThemeType;
  themeColors: typeof themes.light;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
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

  return (
    <ThemeContext.Provider
      value={useMemo(
        () => ({
          currentTheme,
          themeColors,
          toggleTheme,
        }),
        [currentTheme, themeColors]
      )}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

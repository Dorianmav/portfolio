import { createContext } from "react";
import { ThemeContextType } from "../types/Theme";

// Création du contexte de thème
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

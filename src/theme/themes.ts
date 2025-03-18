// src/theme/themes.ts
export type ThemeType = "light" | "dark";

export interface ThemeColors {
  background: string;
  primary: string;
  secondary: string;
  accent: string;
  highlight: string;
  text: string;
  textLight: string;
  textSecondary: string;
  border: string;
  card: string;
}

export const themes: Record<ThemeType, ThemeColors> = {
  light: {
    background: "#F5F5DC", // Blanc cassé
    primary: "#A7C7E7", // Bleu pastel
    secondary: "#B5C99A", // Vert sauge
    accent: "#FCE38A", // Jaune doux
    highlight: "#FFD3B5", // Pêche clair
    text: "#333333", // Texte foncé
    textLight: "#ffffff", // Texte clair
    textSecondary: "#666666", // Texte secondaire
    border: "#E0E0E0", // Couleur de la bordure
    card: "#ffffff", // Couleur de la carte
  },
  dark: {
    background: "#1A1A2E", // Bleu très foncé
    primary: "#4B7BE5", // Bleu vif
    secondary: "#6A8D73", // Vert foncé
    accent: "#FFC857", // Jaune doré
    highlight: "#E05263", // Rouge-rose
    text: "#F2F2F2", // Texte clair
    textLight: "#F2F2F2", // Texte clair
    textSecondary: "#666666", // Texte secondaire
    border: "#E0E0E0", // Couleur de la bordure
    card: "#262639", // Couleur de la carte
  },
};

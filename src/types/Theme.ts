import { ThemeType, themes } from "../theme/themes";

export interface ThemeContextType {
  currentTheme: ThemeType;
  themeColors: typeof themes.light;
  toggleTheme: () => void;
  isDarkMode: boolean;
  currentPalette: number;
  togglePalette: () => void;
}

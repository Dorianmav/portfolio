import { ReactNode } from 'react';
import { ThemeColors as ThemeColorsFromTheme } from '../theme/themes';

export interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
}

export type ThemeColors = ThemeColorsFromTheme;

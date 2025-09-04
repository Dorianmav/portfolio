// src/components/ThemeToggle.tsx
import React from 'react';
import { useTheme } from '../context/useTheme';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle: React.FC = () => {
  const { currentTheme, toggleTheme, themeColors } = useTheme();
  const { t } = useTranslation();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="flex items-center justify-center p-2 rounded-full"
      style={{ 
        backgroundColor: themeColors.secondary,
        color: themeColors.textLight
      }}
      aria-label={t('theme.toggle')}
    >
      {currentTheme === 'light' ? (
        <FaMoon className="text-xl" />
      ) : (
        <FaSun className="text-xl" />
      )}
    </motion.button>
  );
};

export default ThemeToggle;
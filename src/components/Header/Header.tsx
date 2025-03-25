import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/useTheme";
import { FaHome, FaHistory, FaCode, FaStar } from "react-icons/fa";
import { MdDarkMode, MdLightMode, MdEmail } from "react-icons/md";
import { IoColorPalette } from "react-icons/io5";
import LanguageSwitcher from "../LanguageSwitcher";
import { NavItem, ThemeColors } from "../../types/Navigation";

// Fonction utilitaire pour convertir une couleur hex en rgba avec opacité
const getHighlightWithOpacity = (hexColor: string, opacity: number): string => {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// Composant du menu de navigation pour mobile
const MobileNavigation: React.FC<{
  navItems: NavItem[];
  scrollToSection: (id: string) => void;
  isOpen: boolean;
  themeColors: ThemeColors;
  closeMenu: () => void;
}> = ({ navItems, scrollToSection, isOpen, themeColors, closeMenu }) => {
  // Référence pour accéder à l'élément de menu
  const menuRef = React.useRef<HTMLDivElement>(null);

  // Effet pour gérer l'affichage/masquage du menu
  React.useEffect(() => {
    // Rien à faire ici, l'affichage est géré par les styles CSS
  }, [isOpen]);

  // Gestionnaire pour la touche Escape
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeMenu]);

  // Gestionnaires d'événements pour les éléments de navigation mobile
  const handleItemHover = (e: React.MouseEvent<HTMLButtonElement> | React.FocusEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = getHighlightWithOpacity(themeColors.highlight, 0.1);
    e.currentTarget.style.color = themeColors.highlight;
  };

  const handleItemLeave = (e: React.MouseEvent<HTMLButtonElement> | React.FocusEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = "transparent";
    e.currentTarget.style.color = themeColors.text;
  };

  // Fonction pour gérer la navigation et fermer le menu
  const handleNavigation = (id: string) => {
    scrollToSection(id);
    closeMenu();
  };

  return (
    <>
      {/* Utiliser un élément button accessible pour gérer les clics en dehors du menu */}
      {isOpen && (
        <button
          className="fixed inset-0 w-full h-full bg-transparent z-30"
          onClick={closeMenu}
          aria-label="Fermer le menu"
          style={{ top: "60px" }}
        />
      )}
      <div 
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        className="md:hidden overflow-hidden transition-all duration-300 fixed left-0 right-0 m-0 p-0 w-full"
        style={{ 
          backgroundColor: themeColors.background,
          borderTop: `1px solid ${themeColors.border}`,
          maxHeight: isOpen ? "100vh" : "0",
          top: "60px", // Hauteur du header
          zIndex: 40,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? "visible" : "hidden",
          transition: "opacity 300ms ease-in-out, max-height 300ms ease-in-out"
        }}
        aria-label="Menu de navigation mobile"
        id="mobile-navigation"
      >
        <div className="dialog-content">
          <nav>
            <ul className="py-2">
              {navItems.map((item) => (
                <li key={item.id} className="mb-1">
                  <button
                    onClick={() => handleNavigation(item.id)}
                    className="w-full flex items-center px-6 py-5 transition-colors duration-300 active:bg-opacity-20 text-left"
                    style={{ color: themeColors.text }}
                    onMouseOver={handleItemHover}
                    onFocus={handleItemHover}
                    onMouseOut={handleItemLeave}
                    onBlur={handleItemLeave}
                    aria-label={`Naviguer vers ${item.label}`}
                    // Désactiver le focus quand le menu est fermé
                    tabIndex={isOpen ? 0 : -1}
                  >
                    <span className="mr-3 text-xl">{item.icon}</span>
                    <span className="text-lg">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

// Composant principal du header
const Header: React.FC = () => {
  const { t } = useTranslation();
  const { themeColors, toggleTheme, isDarkMode, togglePalette, currentPalette } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Déterminer la section active en fonction du défilement
      const sections = ["home", "timeline", "stack", "recommendations", "contact"];
      const scrollPosition = window.scrollY + 100; // Ajouter un décalage pour une meilleure détection
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Effet pour fermer le menu mobile lors du clic en dehors - plus nécessaire avec dialog
  useEffect(() => {
    // Bloquer le défilement quand le menu mobile est ouvert
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Fermer le menu avant de faire défiler pour éviter les problèmes
      closeMobileMenu();
      
      // Petit délai pour permettre au menu de se fermer avant de défiler
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const navItems: NavItem[] = [
    { id: "home", label: t("nav.home"), icon: <FaHome className="mr-2" /> },
    { id: "timeline", label: t("nav.timeline"), icon: <FaHistory className="mr-2" /> },
    { id: "stack", label: t("nav.stack"), icon: <FaCode className="mr-2" /> },
    { id: "recommendations", label: t("nav.recommendations"), icon: <FaStar className="mr-2" /> },
    { id: "contact", label: t("nav.contact"), icon: <MdEmail className="mr-2" /> },
  ];

  // Gestionnaires d'événements pour les éléments de navigation desktop
  const handleDesktopItemHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = themeColors.highlight;
  };

  const handleDesktopItemLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = activeSection === e.currentTarget.getAttribute('data-section') 
      ? themeColors.highlight 
      : themeColors.text;
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: isScrolled ? themeColors.background : "transparent",
        boxShadow: isScrolled ? "0 2px 10px rgba(0, 0, 0, 0.1)" : "none",
        backdropFilter: isScrolled ? "blur(10px)" : "none",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("home");
              }}
              className="text-xl font-bold transition-colors duration-300"
              style={{ color: themeColors.primary }}
            >
              Portfolio
            </a>
          </div>

          {/* Navigation pour desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                data-section={item.id}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className="flex items-center text-sm font-medium transition-colors duration-300"
                style={{
                  color: activeSection === item.id ? themeColors.highlight : themeColors.text,
                }}
                onMouseEnter={handleDesktopItemHover}
                onMouseLeave={handleDesktopItemLeave}
                aria-current={activeSection === item.id ? "page" : undefined}
              >
                {item.icon}
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Bouton de changement de palette */}
            <button
              onClick={togglePalette}
              className="flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                backgroundColor: getHighlightWithOpacity(themeColors.highlight, 0.2),
                color: themeColors.highlight,
                borderColor: themeColors.highlight,
                borderWidth: "1px"
              }}
              aria-label={currentPalette === 1 ? "Changer vers la palette 2" : "Changer vers la palette 1"}
              title={currentPalette === 1 ? "Changer vers la palette 2" : "Changer vers la palette 1"}
            >
              <IoColorPalette size={18} />
              <span className="ml-1 text-xs">{currentPalette}</span>
            </button>
            
            {/* Bouton de changement de thème */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                backgroundColor: getHighlightWithOpacity(themeColors.highlight, 0.2),
                color: themeColors.highlight,
                borderColor: themeColors.highlight,
                borderWidth: "1px"
              }}
              aria-label={isDarkMode ? "Passer au mode clair" : "Passer au mode sombre"}
              title={isDarkMode ? "Passer au mode clair" : "Passer au mode sombre"}
            >
              {isDarkMode ? <MdLightMode size={18} /> : <MdDarkMode size={18} />}
            </button>

            {/* Sélecteur de langue */}
            <LanguageSwitcher />

            {/* Bouton du menu mobile */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                backgroundColor: getHighlightWithOpacity(themeColors.highlight, 0.2),
                borderColor: themeColors.highlight,
                borderWidth: "1px"
              }}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              <div
                className={`w-5 h-0.5 rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? "transform rotate-45 translate-y-1.5" : "mb-1"
                }`}
                style={{ backgroundColor: themeColors.highlight }}
              ></div>
              <div
                className={`w-5 h-0.5 rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
                style={{ backgroundColor: themeColors.highlight }}
              ></div>
              <div
                className={`w-5 h-0.5 rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? "transform -rotate-45 -translate-y-1.5" : "mt-1"
                }`}
                style={{ backgroundColor: themeColors.highlight }}
              ></div>
            </button>
          </div>
        </div>
      </div>

      {/* Menu de navigation mobile */}
      <MobileNavigation
        navItems={navItems}
        scrollToSection={scrollToSection}
        isOpen={isMobileMenuOpen}
        themeColors={themeColors}
        closeMenu={closeMobileMenu}
      />
    </header>
  );
};

export default Header;

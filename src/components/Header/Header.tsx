import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/useTheme";
import { FaHome, FaHistory, FaCode, FaStar } from "react-icons/fa";
import { MdDarkMode, MdLightMode, MdEmail } from "react-icons/md";
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
  const { themeColors, toggleTheme, isDarkMode } = useTheme();
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
  const handleItemHover = (e: React.MouseEvent<HTMLButtonElement> | React.FocusEvent<HTMLButtonElement>) => {
    e.currentTarget.style.color = themeColors.highlight;
    e.currentTarget.style.borderColor = themeColors.highlight;
  };

  const handleItemLeave = (e: React.MouseEvent<HTMLButtonElement> | React.FocusEvent<HTMLButtonElement>, id: string) => {
    if (id !== activeSection) {
      e.currentTarget.style.color = themeColors.text;
      e.currentTarget.style.borderColor = "transparent";
    }
  };

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ 
        backgroundColor: isScrolled ? themeColors.background : "transparent",
        color: themeColors.text,
        borderBottom: isScrolled ? `1px solid ${themeColors.border}` : "none",
        boxShadow: isScrolled ? "0 4px 20px rgba(0, 0, 0, 0.1)" : "none",
        backdropFilter: isScrolled ? "blur(10px)" : "none"
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        <button 
          className="flex items-center transition-transform duration-300 hover:scale-105"
          onClick={() => scrollToSection("home")}
          aria-label={t("accessibility.backToTop")}
        >
          <h1 className="text-2xl font-bold flex items-center">
            <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent pr-1">
              Portfolio
            </span>
            <span style={{ color: themeColors.highlight }}>Dev</span>
          </h1>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-6">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center font-medium py-2 px-1 border-b-2 transition-all duration-300"
                  style={{ 
                    color: activeSection === item.id ? themeColors.highlight : themeColors.text,
                    borderColor: activeSection === item.id ? themeColors.highlight : "transparent"
                  }}
                  onMouseOver={handleItemHover}
                  onFocus={handleItemHover}
                  onMouseOut={(e) => handleItemLeave(e, item.id)}
                  onBlur={(e) => handleItemLeave(e, item.id)}
                >
                  {item.icon}
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full transition-colors duration-300"
              style={{ 
                backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)"
              }}
              aria-label={isDarkMode ? t("accessibility.lightMode") : t("accessibility.darkMode")}
            >
              {isDarkMode ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
            </button>
            
            <LanguageSwitcher />
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-3 pr-1">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full transition-colors duration-300 touch-manipulation"
            style={{ 
              backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)"
            }}
            aria-label={isDarkMode ? t("accessibility.lightMode") : t("accessibility.darkMode")}
          >
            {isDarkMode ? <MdLightMode size={22} /> : <MdDarkMode size={22} />}
          </button>
          
          <LanguageSwitcher />
            
          <button
            className="relative w-10 h-10 flex justify-center items-center mobile-menu-button touch-manipulation ml-1"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? t("accessibility.closeMenu") : t("accessibility.openMenu")}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <div className="w-6 h-0.5 absolute transition-all duration-300" 
              style={{ 
                backgroundColor: themeColors.text,
                transform: isMobileMenuOpen ? "rotate(45deg)" : "translateY(-6px)"
              }}
            ></div>
            <div className="w-6 h-0.5 absolute transition-opacity duration-300" 
              style={{ 
                backgroundColor: themeColors.text,
                opacity: isMobileMenuOpen ? 0 : 1
              }}
            ></div>
            <div className="w-6 h-0.5 absolute transition-all duration-300" 
              style={{ 
                backgroundColor: themeColors.text,
                transform: isMobileMenuOpen ? "rotate(-45deg)" : "translateY(6px)"
              }}
            ></div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
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

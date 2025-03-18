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
}> = ({ navItems, scrollToSection, isOpen, themeColors }) => {
  // Gestionnaires d'événements pour les éléments de navigation mobile
  const handleItemHover = (e: React.MouseEvent<HTMLButtonElement> | React.FocusEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = getHighlightWithOpacity(themeColors.highlight, 0.1);
    e.currentTarget.style.color = themeColors.highlight;
  };

  const handleItemLeave = (e: React.MouseEvent<HTMLButtonElement> | React.FocusEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = "transparent";
    e.currentTarget.style.color = themeColors.text;
  };

  return (
    <div 
      className="md:hidden overflow-hidden transition-all duration-300"
      style={{ 
        backgroundColor: themeColors.background,
        borderTop: isOpen ? `1px solid ${themeColors.border}` : "none",
        maxHeight: isOpen ? "500px" : "0",
        opacity: isOpen ? 1 : 0
      }}
    >
      <ul className="py-4">
        {navItems.map((item) => (
          <li key={item.id} className="mb-1">
            <button
              onClick={() => scrollToSection(item.id)}
              className="w-full flex items-center px-6 py-3 transition-colors duration-300"
              style={{ color: themeColors.text }}
              onMouseOver={handleItemHover}
              onFocus={handleItemHover}
              onMouseOut={handleItemLeave}
              onBlur={handleItemLeave}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      closeMobileMenu();
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
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
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
        <div className="md:hidden flex items-center space-x-3">
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
            
          <button
            className="relative w-10 h-10 flex justify-center items-center"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? t("accessibility.closeMenu") : t("accessibility.openMenu")}
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
      />
    </header>
  );
};

export default Header;

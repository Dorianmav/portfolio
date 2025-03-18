import React from "react";
import { useTranslation } from "react-i18next";
import { FaGithub, FaLinkedin, FaHeart, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import { useTheme } from "../../context/useTheme";
import { socialMedia, contactInfo } from "../../data/contactData";

/**
 * Composant Footer pour le bas de page du portfolio
 */
const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { themeColors } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="py-8 mt-16"
      style={{ 
        backgroundColor: themeColors.card,
        borderTop: `1px solid ${themeColors.border}`
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo et copyright */}
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2" style={{ color: themeColors.primary }}>
              PortfolioDev
            </h2>
            <p className="text-sm" style={{ color: themeColors.textSecondary }}>
              {t("footer.copyright")} © {currentYear}
            </p>
          </div>

          {/* Liens rapides */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-3" style={{ color: themeColors.text }}>
              {t("nav.links")}
            </h3>
            <ul className="flex flex-wrap justify-center gap-4">
              <li>
                <a 
                  href="#home" 
                  className="hover:underline transition-all"
                  style={{ color: themeColors.textSecondary }}
                >
                  {t("nav.home")}
                </a>
              </li>
              <li>
                <a 
                  href="#timeline" 
                  className="hover:underline transition-all"
                  style={{ color: themeColors.textSecondary }}
                >
                  {t("nav.timeline")}
                </a>
              </li>
              <li>
                <a 
                  href="#stack" 
                  className="hover:underline transition-all"
                  style={{ color: themeColors.textSecondary }}
                >
                  {t("nav.stack")}
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="hover:underline transition-all"
                  style={{ color: themeColors.textSecondary }}
                >
                  {t("nav.contact")}
                </a>
              </li>
            </ul>
          </div>

          {/* Réseaux sociaux */}
          <div>
            <h3 className="text-lg font-semibold mb-3" style={{ color: themeColors.text }}>
              {t("contact.socialTitle")}
            </h3>
            <div className="flex justify-center gap-4">
              <motion.a
                href={socialMedia.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 flex items-center justify-center rounded-full"
                style={{ 
                  backgroundColor: themeColors.primary,
                  color: themeColors.textLight
                }}
              >
                <FaGithub size={20} />
              </motion.a>
              <motion.a
                href={socialMedia.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 flex items-center justify-center rounded-full"
                style={{ 
                  backgroundColor: themeColors.primary,
                  color: themeColors.textLight
                }}
              >
                <FaLinkedin size={20} />
              </motion.a>
              <motion.a
                href={`mailto:${contactInfo.email}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 flex items-center justify-center rounded-full"
                style={{ 
                  backgroundColor: themeColors.primary,
                  color: themeColors.textLight
                }}
              >
                <FaEnvelope size={20} />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Signature */}
        <div 
          className="text-center mt-8 pt-6"
          style={{ borderTop: `1px solid ${themeColors.border}` }}
        >
          <p className="text-sm flex items-center justify-center gap-1" style={{ color: themeColors.textSecondary }}>
            {t("footer.designed")} Dorian Mavoungoud 
            <FaHeart className="text-red-500" size={14} />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

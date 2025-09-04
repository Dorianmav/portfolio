import React, { useState, useRef } from "react";
import emailjs from '@emailjs/browser';
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/useTheme";
import { contactInfo, socialMedia } from "../../data/contactData";
import { FiAtSign, FiPhone, FiSend, FiCheckCircle } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaGithub, FaLinkedinIn, FaTwitter, FaMediumM, FaInstagram } from "react-icons/fa";

// Fonction utilitaire pour convertir une couleur hex en rgba avec opacité
const getHighlightWithOpacity = (hexColor: string, opacity: number): string => {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const { themeColors, isDarkMode } = useTheme();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Référence au formulaire pour EmailJS
  const form = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Validation basique
    if (!name || !email || !message) {
      setError(t("contact.errorAllFields", "Veuillez remplir tous les champs"));
      return;
    }

    if (!validateEmail(email)) {
      setError(t("contact.errorEmail", "Veuillez entrer une adresse email valide"));
      return;
    }

    setIsSubmitting(true);

    try {
      // Envoi d'email avec EmailJS en utilisant les variables d'environnement
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      
      if (form.current) {
        await emailjs.sendForm(serviceId, templateId, form.current, publicKey);
        
        // Réinitialiser le formulaire après succès
        setName("");
        setEmail("");
        setMessage("");
        setSuccess(true);
        
        // Réinitialiser l'état de succès après 3 secondes
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      setError(t("contact.errorSubmit", "Une erreur est survenue. Veuillez réessayer."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full py-12 sm:py-16" style={{ backgroundColor: themeColors.background }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center mb-8 sm:mb-12">
          <h2 
            className="text-3xl sm:text-4xl font-bold text-center relative inline-block"
            style={{ color: themeColors.primary }}
          >
            <span className="relative z-10">{t("contact.title", "Contact")}</span>
            <span 
              className="absolute bottom-0 left-0 w-full h-3 -z-10 transform -translate-y-2"
              style={{ backgroundColor: themeColors.accent, opacity: 0.3 }}
            ></span>
          </h2>
          <p 
            className="text-center mt-4 max-w-2xl px-4"
            style={{ color: themeColors.textSecondary }}
          >
            {t("contact.subtitle", "N'hésitez pas à me contacter pour discuter de vos projets")}
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
          {/* Formulaire de contact */}
          <div className="w-full md:w-1/2">
            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
              {/* Champ caché pour le titre */}
              <input type="hidden" name="title" value="Contact depuis le portfolio" />
              <div className="relative">
                <label 
                  htmlFor="name" 
                  className="absolute -top-2.5 left-4 px-2 text-sm font-medium"
                  style={{ 
                    backgroundColor: themeColors.background, 
                    color: themeColors.primary 
                  }}
                >
                  {t("contact.name", "Nom")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-4 sm:py-3 rounded-lg transition-all duration-300 text-base sm:text-sm"
                  style={{ 
                    backgroundColor: themeColors.card,
                    color: themeColors.text,
                    border: `2px solid ${themeColors.primary}`,
                    outline: "none"
                  }}
                  placeholder={t("contact.namePlaceholder", "Votre nom")}
                  aria-required="true"
                />
              </div>
              
              <div className="relative">
                <label 
                  htmlFor="email" 
                  className="absolute -top-2.5 left-4 px-2 text-sm font-medium"
                  style={{ 
                    backgroundColor: themeColors.background, 
                    color: themeColors.primary 
                  }}
                >
                  {t("contact.email", "Email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-4 sm:py-3 rounded-lg transition-all duration-300 text-base sm:text-sm"
                  style={{ 
                    backgroundColor: themeColors.card,
                    color: themeColors.text,
                    border: `2px solid ${themeColors.primary}`,
                    outline: "none"
                  }}
                  placeholder={t("contact.emailPlaceholder", "votre.email@exemple.com")}
                  aria-required="true"
                  inputMode="email"
                  autoComplete="email"
                />
              </div>
              
              <div className="relative">
                <label 
                  htmlFor="message" 
                  className="absolute -top-2.5 left-4 px-2 text-sm font-medium"
                  style={{ 
                    backgroundColor: themeColors.background, 
                    color: themeColors.primary 
                  }}
                >
                  {t("contact.message", "Message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-4 sm:py-3 rounded-lg resize-none transition-all duration-300 text-base sm:text-sm"
                  style={{ 
                    backgroundColor: themeColors.card,
                    color: themeColors.text,
                    border: `2px solid ${themeColors.primary}`,
                    outline: "none"
                  }}
                  placeholder={t("contact.messagePlaceholder", "Votre message...")}
                  aria-required="true"
                />
              </div>
              
              {error && (
                <div 
                  className="p-4 rounded-lg text-center"
                  style={{ 
                    backgroundColor: isDarkMode ? "rgba(220, 38, 38, 0.2)" : "rgba(254, 226, 226, 1)",
                    color: isDarkMode ? "#f87171" : "#dc2626"
                  }}
                  role="alert"
                  aria-live="assertive"
                >
                  {error}
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 px-8 py-4 sm:py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:hover:scale-100 w-full sm:w-auto active:scale-95 text-base"
                style={{ 
                  backgroundColor: themeColors.primary,
                  color: themeColors.textLight
                }}
                aria-busy={isSubmitting}
              >
                <span>{success ? t("contact.sent", "Envoyé !") : t("contact.send", "Envoyer")}</span>
                <div className="relative w-5 h-5">
                  {!success ? (
                    <FiSend className={`absolute inset-0 ${isSubmitting ? 'animate-spin' : ''}`} />
                  ) : (
                    <FiCheckCircle className="absolute inset-0 animate-scale-in" />
                  )}
                </div>
              </button>
            </form>
          </div>
          
          {/* Informations de contact */}
          <div className="w-full md:w-1/2 mt-10 md:mt-0">
            <div className="space-y-8 sm:space-y-6">
              <div className="flex items-start gap-5 sm:gap-4">
                <div 
                  className="w-14 h-14 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-110"
                  style={{ 
                    backgroundColor: themeColors.primary,
                    color: themeColors.textLight
                  }}
                >
                  <FiAtSign size={24} className="sm:text-xl" />
                </div>
                <div>
                  <h3 
                    className="text-xl sm:text-lg font-medium mb-2 sm:mb-1"
                    style={{ color: themeColors.primary }}
                  >
                    {t("contact.emailTitle", "Email")}
                  </h3>
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    className="transition-colors duration-300 hover:underline text-base"
                    style={{ color: themeColors.text }}
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-5 sm:gap-4">
                <div 
                  className="w-14 h-14 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-110"
                  style={{ 
                    backgroundColor: themeColors.primary,
                    color: themeColors.textLight
                  }}
                >
                  <FiPhone size={24} className="sm:text-xl" />
                </div>
                <div>
                  <h3 
                    className="text-xl sm:text-lg font-medium mb-2 sm:mb-1"
                    style={{ color: themeColors.primary }}
                  >
                    {t("contact.phoneTitle", "Téléphone")}
                  </h3>
                  <a 
                    href={`tel:${contactInfo.phone}`}
                    className="transition-colors duration-300 hover:underline text-base"
                    style={{ color: themeColors.text }}
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-5 sm:gap-4">
                <div 
                  className="w-14 h-14 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-110"
                  style={{ 
                    backgroundColor: themeColors.primary,
                    color: themeColors.textLight
                  }}
                >
                  <HiOutlineLocationMarker size={24} className="sm:text-xl" />
                </div>
                <div>
                  <h3 
                    className="text-xl sm:text-lg font-medium mb-2 sm:mb-1"
                    style={{ color: themeColors.primary }}
                  >
                    {t("contact.addressTitle", "Adresse")}
                  </h3>
                  <p style={{ color: themeColors.text }} className="text-base">
                    {contactInfo.address}
                  </p>
                </div>
              </div>
              
              {/* Réseaux sociaux */}
              <div className="mt-14 sm:mt-12">
                <h3 
                  className="text-xl sm:text-lg font-medium mb-6 sm:mb-4"
                  style={{ color: themeColors.primary }}
                >
                  {t("contact.socialTitle", "Réseaux sociaux")}
                </h3>
                <div className="flex flex-wrap gap-5 sm:gap-4">
                  {socialMedia.github && (
                    <a 
                      href={socialMedia.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 touch-manipulation"
                      style={{ 
                        backgroundColor: themeColors.primary,
                        color: themeColors.textLight
                      }}
                      aria-label="GitHub"
                    >
                      <FaGithub size={24} className="sm:text-xl" />
                    </a>
                  )}
                  
                  {socialMedia.linkedin && (
                    <a 
                      href={socialMedia.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 touch-manipulation"
                      style={{ 
                        backgroundColor: themeColors.primary,
                        color: themeColors.textLight
                      }}
                      aria-label="LinkedIn"
                    >
                      <FaLinkedinIn size={24} className="sm:text-xl" />
                    </a>
                  )}
                  
                  {socialMedia.twitter && (
                    <a 
                      href={socialMedia.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 touch-manipulation"
                      style={{ 
                        backgroundColor: themeColors.primary,
                        color: themeColors.textLight
                      }}
                      aria-label="Twitter"
                    >
                      <FaTwitter size={24} className="sm:text-xl" />
                    </a>
                  )}
                  
                  {socialMedia.medium && (
                    <a 
                      href={socialMedia.medium}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 touch-manipulation"
                      style={{ 
                        backgroundColor: themeColors.primary,
                        color: themeColors.textLight
                      }}
                      aria-label="Medium"
                    >
                      <FaMediumM size={24} className="sm:text-xl" />
                    </a>
                  )}
                  
                  {socialMedia.instagram && (
                    <a 
                      href={socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 touch-manipulation"
                      style={{ 
                        backgroundColor: themeColors.primary,
                        color: themeColors.textLight
                      }}
                      aria-label="Instagram"
                    >
                      <FaInstagram size={24} className="sm:text-xl" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animation CSS pour le bouton d'envoi */}
      <style>
        {`
        @keyframes scale-in {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }
        
        /* Amélioration du focus pour l'accessibilité */
        input:focus, textarea:focus {
          box-shadow: 0 0 0 3px ${getHighlightWithOpacity(themeColors.primary, 0.3)};
        }
        
        /* Amélioration du tap sur mobile */
        @media (max-width: 640px) {
          input, textarea, button {
            font-size: 16px; /* Évite le zoom automatique sur iOS */
          }
        }
        `}
      </style>
    </div>
  );
};

export default Contact;

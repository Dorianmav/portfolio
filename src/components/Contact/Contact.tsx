import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/useTheme";
import { contactInfo, socialMedia } from "../../data/contactData";
import { FiAtSign, FiPhone, FiSend, FiCheckCircle } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaGithub, FaLinkedinIn, FaTwitter, FaMediumM, FaInstagram } from "react-icons/fa";

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
      // Simulation d'envoi (à remplacer par un vrai appel API)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Réinitialiser le formulaire après succès
      setName("");
      setEmail("");
      setMessage("");
      setSuccess(true);
      
      // Réinitialiser l'état de succès après 3 secondes
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError(t("contact.errorSubmit", "Une erreur est survenue. Veuillez réessayer."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full py-16" style={{ backgroundColor: themeColors.background }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center mb-12">
          <h2 
            className="text-4xl font-bold text-center relative inline-block"
            style={{ color: themeColors.primary }}
          >
            <span className="relative z-10">{t("contact.title", "Contact")}</span>
            <span 
              className="absolute bottom-0 left-0 w-full h-3 -z-10 transform -translate-y-2"
              style={{ backgroundColor: themeColors.accent, opacity: 0.3 }}
            ></span>
          </h2>
          <p 
            className="text-center mt-4 max-w-2xl"
            style={{ color: themeColors.textSecondary }}
          >
            {t("contact.subtitle", "N'hésitez pas à me contacter pour discuter de vos projets")}
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
          {/* Formulaire de contact */}
          <div className="w-full md:w-1/2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <label 
                  htmlFor="name" 
                  className="absolute -top-2.5 left-4 px-2 text-sm"
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg transition-all duration-300"
                  style={{ 
                    backgroundColor: themeColors.card,
                    color: themeColors.text,
                    border: `2px solid ${themeColors.primary}`,
                    outline: "none"
                  }}
                  placeholder={t("contact.namePlaceholder", "Votre nom")}
                />
              </div>
              
              <div className="relative">
                <label 
                  htmlFor="email" 
                  className="absolute -top-2.5 left-4 px-2 text-sm"
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg transition-all duration-300"
                  style={{ 
                    backgroundColor: themeColors.card,
                    color: themeColors.text,
                    border: `2px solid ${themeColors.primary}`,
                    outline: "none"
                  }}
                  placeholder={t("contact.emailPlaceholder", "votre.email@exemple.com")}
                />
              </div>
              
              <div className="relative">
                <label 
                  htmlFor="message" 
                  className="absolute -top-2.5 left-4 px-2 text-sm"
                  style={{ 
                    backgroundColor: themeColors.background, 
                    color: themeColors.primary 
                  }}
                >
                  {t("contact.message", "Message")}
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg resize-none transition-all duration-300"
                  style={{ 
                    backgroundColor: themeColors.card,
                    color: themeColors.text,
                    border: `2px solid ${themeColors.primary}`,
                    outline: "none"
                  }}
                  placeholder={t("contact.messagePlaceholder", "Votre message...")}
                />
              </div>
              
              {error && (
                <div 
                  className="p-3 rounded-lg text-center"
                  style={{ 
                    backgroundColor: isDarkMode ? "rgba(220, 38, 38, 0.2)" : "rgba(254, 226, 226, 1)",
                    color: isDarkMode ? "#f87171" : "#dc2626"
                  }}
                >
                  {error}
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:hover:scale-100 w-full sm:w-auto"
                style={{ 
                  backgroundColor: themeColors.primary,
                  color: themeColors.textLight
                }}
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
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-110"
                  style={{ 
                    backgroundColor: themeColors.primary,
                    color: themeColors.textLight
                  }}
                >
                  <FiAtSign size={22} />
                </div>
                <div>
                  <h3 
                    className="text-lg font-medium mb-1"
                    style={{ color: themeColors.primary }}
                  >
                    {t("contact.emailTitle", "Email")}
                  </h3>
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    className="transition-colors duration-300 hover:underline"
                    style={{ color: themeColors.text }}
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-110"
                  style={{ 
                    backgroundColor: themeColors.primary,
                    color: themeColors.textLight
                  }}
                >
                  <FiPhone size={22} />
                </div>
                <div>
                  <h3 
                    className="text-lg font-medium mb-1"
                    style={{ color: themeColors.primary }}
                  >
                    {t("contact.phoneTitle", "Téléphone")}
                  </h3>
                  <a 
                    href={`tel:${contactInfo.phone}`}
                    className="transition-colors duration-300 hover:underline"
                    style={{ color: themeColors.text }}
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-110"
                  style={{ 
                    backgroundColor: themeColors.primary,
                    color: themeColors.textLight
                  }}
                >
                  <HiOutlineLocationMarker size={22} />
                </div>
                <div>
                  <h3 
                    className="text-lg font-medium mb-1"
                    style={{ color: themeColors.primary }}
                  >
                    {t("contact.addressTitle", "Adresse")}
                  </h3>
                  <p style={{ color: themeColors.text }}>
                    {contactInfo.address}
                  </p>
                </div>
              </div>
              
              {/* Réseaux sociaux */}
              <div className="mt-12">
                <h3 
                  className="text-lg font-medium mb-4"
                  style={{ color: themeColors.primary }}
                >
                  {t("contact.socialTitle", "Réseaux sociaux")}
                </h3>
                <div className="flex flex-wrap gap-4">
                  {socialMedia.github && (
                    <a 
                      href={socialMedia.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110"
                      style={{ 
                        backgroundColor: themeColors.primary,
                        color: themeColors.textLight
                      }}
                      aria-label="GitHub"
                    >
                      <FaGithub size={20} />
                    </a>
                  )}
                  
                  {socialMedia.linkedin && (
                    <a 
                      href={socialMedia.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110"
                      style={{ 
                        backgroundColor: themeColors.primary,
                        color: themeColors.textLight
                      }}
                      aria-label="LinkedIn"
                    >
                      <FaLinkedinIn size={20} />
                    </a>
                  )}
                  
                  {socialMedia.twitter && (
                    <a 
                      href={socialMedia.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110"
                      style={{ 
                        backgroundColor: themeColors.primary,
                        color: themeColors.textLight
                      }}
                      aria-label="Twitter"
                    >
                      <FaTwitter size={20} />
                    </a>
                  )}
                  
                  {socialMedia.medium && (
                    <a 
                      href={socialMedia.medium}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110"
                      style={{ 
                        backgroundColor: themeColors.primary,
                        color: themeColors.textLight
                      }}
                      aria-label="Medium"
                    >
                      <FaMediumM size={20} />
                    </a>
                  )}
                  
                  {socialMedia.instagram && (
                    <a 
                      href={socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110"
                      style={{ 
                        backgroundColor: themeColors.primary,
                        color: themeColors.textLight
                      }}
                      aria-label="Instagram"
                    >
                      <FaInstagram size={20} />
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
        `}
      </style>
    </div>
  );
};

export default Contact;

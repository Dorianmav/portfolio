import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FaDownload, FaEye, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { useTheme } from "../../context/useTheme";

// Import direct du PDF pour s'assurer qu'il est correctement bundlé
import resumePdf from "../../data/CV Dorian MAVOUNGOUD.pdf";

/**
 * Composant bouton pour afficher et télécharger le CV
 */
const ResumeButton: React.FC = () => {
  const { t } = useTranslation();
  const { themeColors } = useTheme();
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  
  // Chemin vers le CV
  const resumePath = resumePdf;

  // Animation variants
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mt-8"
      >
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={handleOpenModal}
          className="flex items-center space-x-2 py-3 px-6 rounded-full shadow-lg transition-all duration-300"
          style={{ 
            background: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.accent})`,
            color: themeColors.textLight
          }}
        >
          <span>{t("resume.button")}</span>
          <FaEye className="ml-2" />
        </motion.button>
      </motion.div>

      <Modal 
        show={showModal} 
        onHide={handleCloseModal}
        size="lg"
        centered
        className="resume-modal"
      >
        <Modal.Header 
          style={{ 
            backgroundColor: themeColors.card,
            color: themeColors.text,
            borderBottom: `1px solid ${themeColors.border}`,
            padding: "1.25rem 1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Modal.Title style={{ color: themeColors.primary, fontWeight: "bold" }}>{t("resume.title")}</Modal.Title>
          <button 
            onClick={handleCloseModal}
            className="bg-transparent border-0 p-0 flex items-center justify-center w-8 h-8 rounded-full hover:bg-opacity-10 transition-all"
            style={{ 
              backgroundColor: `${themeColors.background}50`,
              color: themeColors.text
            }}
          >
            <FaTimes />
          </button>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: themeColors.card, padding: 0 }}>
          <div className="flex justify-between items-center p-3" style={{ borderBottom: `1px solid ${themeColors.border}` }}>
            <p className="m-0 text-sm" style={{ color: themeColors.textSecondary }}>
              {t("resume.documentDescription")}
            </p>
            <a 
              href={resumePath} 
              download="CV Dorian MAVOUNGOUD.pdf"
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-300 hover:scale-105"
              style={{ 
                backgroundColor: themeColors.primary,
                color: themeColors.textLight
              }}
            >
              <FaDownload size={16} />
              <span>{t("resume.download")}</span>
            </a>
          </div>
          <div className="resume-container" style={{ height: "75vh", backgroundColor: themeColors.background }}>
            <iframe
              src={resumePath}
              title="CV"
              width="100%"
              height="100%"
              style={{ border: "none" }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: themeColors.card, borderTop: `1px solid ${themeColors.border}` }}>
          <button
            onClick={handleCloseModal}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-300"
            style={{ 
              backgroundColor: themeColors.background,
              color: themeColors.text,
              border: `1px solid ${themeColors.border}`
            }}
          >
            <span>{t("resume.close")}</span>
          </button>
        </Modal.Footer>
      </Modal>

      <style>
        {`
        .resume-modal .modal-content {
          border: none;
          border-radius: 0.75rem;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        .resume-modal .modal-dialog {
          max-width: 90%;
          margin: 1.75rem auto;
        }
        @media (min-width: 992px) {
          .resume-modal .modal-dialog {
            max-width: 800px;
          }
        }
        `}
      </style>
    </>
  );
};

export default ResumeButton;

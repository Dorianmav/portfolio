import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FaDownload, FaEye } from "react-icons/fa";
import { motion } from "framer-motion";

/**
 * Composant bouton pour afficher et télécharger le CV
 */
const ResumeButton: React.FC = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Chemin vers le CV (à mettre à jour une fois que le CV sera ajouté)
  const resumePath = "/assets/cv.pdf";

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
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center space-x-2 transition-all duration-300"
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
        <Modal.Header closeButton>
          <Modal.Title>{t("resume.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="flex justify-center mb-4">
            <a 
              href={resumePath} 
              download
              className="btn btn-primary d-flex align-items-center"
            >
              <FaDownload className="mr-2" />
              {t("resume.download")}
            </a>
          </div>
          <div className="resume-container" style={{ height: "70vh" }}>
            <iframe
              src={resumePath}
              title="CV"
              width="100%"
              height="100%"
              style={{ border: "none" }}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ResumeButton;

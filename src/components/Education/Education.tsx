import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import EducationCard from "./EducationCard";
import { themeColors } from "../../theme/colors";

/**
 * Composant qui affiche la section éducation avec les diplômes et formations
 */
const Education: React.FC = () => {
  const { t } = useTranslation();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  return (
    <section id="education" className="py-16" style={{ backgroundColor: themeColors.background }}>
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <Row className="justify-content-center mb-8">
            <Col md={8} className="text-center">
              <motion.h2 
                className="text-4xl font-bold mb-4"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{ color: themeColors.primary }}
              >
                {t("education.title")}
              </motion.h2>
              <motion.p 
                className="text-lg"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{ color: themeColors.text }}
              >
                {t("education.description")}
              </motion.p>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col md={10}>
              <div className="relative">
                {/* Ligne verticale */}
                <div 
                  className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1" 
                  style={{ backgroundColor: themeColors.accent }}
                ></div>
                
                <EducationCard
                  title={t("education.degree1.title")}
                  date={t("education.degree1.date")}
                  institution={t("education.degree1.institution")}
                  description={t("education.degree1.description")}
                  position="left"
                />
                
                <EducationCard
                  title={t("education.degree2.title")}
                  date={t("education.degree2.date")}
                  institution={t("education.degree2.institution")}
                  description={t("education.degree2.description")}
                  position="right"
                />
                
                <EducationCard
                  title={t("education.degree3.title")}
                  date={t("education.degree3.date")}
                  institution={t("education.degree3.institution")}
                  description={t("education.degree3.description")}
                  position="left"
                />
              </div>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </section>
  );
};

export default Education;

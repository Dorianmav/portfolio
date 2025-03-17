import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";
import { themeColors } from "../../theme/colors";

/**
 * Composant qui affiche la section expérience professionnelle
 */
const Experience: React.FC = () => {
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

  // Définir manuellement les compétences pour chaque emploi
  const job1Skills = ["React", "TypeScript", "Node.js", "MongoDB", "Docker"];
  const job2Skills = ["JavaScript", "React", "CSS/SASS", "Responsive Design", "UI/UX"];
  const job3Skills = ["React Native", "JavaScript", "API REST", "Git"];

  return (
    <section id="experience" className="py-16" style={{ backgroundColor: themeColors.background }}>
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
                {t("experience.title")}
              </motion.h2>
              <motion.p 
                className="text-lg"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{ color: themeColors.text }}
              >
                {t("experience.description")}
              </motion.p>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col md={10}>
              <div className="relative">
                {/* Ligne verticale */}
                <div 
                  className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1"
                  style={{ backgroundColor: themeColors.secondary }}
                ></div>
                
                <ExperienceCard
                  title={t("experience.job1.title")}
                  company={t("experience.job1.company")}
                  date={t("experience.job1.date")}
                  description={t("experience.job1.description")}
                  skills={job1Skills}
                  position="left"
                />
                
                <ExperienceCard
                  title={t("experience.job2.title")}
                  company={t("experience.job2.company")}
                  date={t("experience.job2.date")}
                  description={t("experience.job2.description")}
                  skills={job2Skills}
                  position="right"
                />
                
                <ExperienceCard
                  title={t("experience.job3.title")}
                  company={t("experience.job3.company")}
                  date={t("experience.job3.date")}
                  description={t("experience.job3.description")}
                  skills={job3Skills}
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

export default Experience;

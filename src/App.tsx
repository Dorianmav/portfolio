import React from "react";
import Stack from "./components/Stack/Stack";
import { useTranslation } from "react-i18next";
import AnimationSection from "./components/AnimationSection";
import ResumeButton from "./components/ResumeButton/ResumeButton";
import { motion } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import { useTheme } from "./context/useTheme";
import Timeline from "./components/TimelinePreview";
import Header from "./components/Header/Header";
import Recommendation from "./components/Recommendation";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

// Composant pour la section d'accueil
const HomeSection: React.FC = () => {
  const { t } = useTranslation();
  const { themeColors } = useTheme();

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center pt-16"
      style={{ backgroundColor: themeColors.background }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full text-center mb-6"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-2" style={{ color: themeColors.primary }}>
          {t("home.greeting")}
        </h1>
        <div className="h-1 w-24 mx-auto rounded-full" style={{ backgroundColor: themeColors.highlight }}></div>
      </motion.div>
      
      <div className="w-full max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:w-1/2 mb-8 md:mb-0 md:pr-8"
        >
          <h2 className="text-2xl font-semibold mb-4" style={{ color: themeColors.secondary }}>
            {t("home.intro")}
          </h2>
          <p className="text-base leading-relaxed mb-6 text-justify" style={{ color: themeColors.text }}>
            {t("home.description")}
          </p>
          <ResumeButton />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="md:w-1/2 flex justify-center md:justify-end"
        >
          <AnimationSection />
        </motion.div>
      </div>
    </section>
  );
};

// Composant pour la section de la timeline
const TimelineSection: React.FC = () => {
  return (
    <section id="timeline" className="py-16">
      <Timeline />
    </section>
  );
};

// Composant pour la section des compétences
const StackSection: React.FC = () => {
  return (
    <section id="stack" className="py-16">
      <Stack />
    </section>
  );
};

// Composant pour la section des recommandations
const RecommendationSection: React.FC = () => {
  return (
    <section id="recommendations" className="py-16">
      <Recommendation />
    </section>
  );
};

// Composant pour la section de contact
const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-16">
      <Contact />
    </section>
  );
};

// Composant principal de l'application
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

// Contenu de l'application avec accès au contexte du thème
const AppContent: React.FC = () => {
  const { themeColors } = useTheme();

  return (
    <div className="app min-h-screen flex flex-col" style={{ backgroundColor: themeColors.background }}>
      <Header />
      <div className="container mx-auto px-4 flex-grow pt-0">
        <HomeSection />
        <TimelineSection />
        <StackSection />
        {/* <RecommendationSection /> */}
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
};

export default App;

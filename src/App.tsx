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

// Composant pour la section d'accueil
const HomeSection: React.FC = () => {
  const { t } = useTranslation();
  const { themeColors } = useTheme();

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center">
      <AnimationSection />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center mb-8"
      >
        <h1
          className="text-5xl font-bold mb-4"
          style={{ color: themeColors.primary }}
        >
          {t("home.greeting")}
        </h1>
        <p
          className="text-xl mb-6 max-w-2xl mx-auto"
          style={{ color: themeColors.text }}
        >
          {t("home.intro")}
        </p>
        <ResumeButton />
      </motion.div>
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
    <div
      className="app min-h-screen"
      style={{ backgroundColor: themeColors.background }}
    >
      <Header />
      <div className="container mx-auto px-4 pt-20">
        <HomeSection />
        <TimelineSection />
        <StackSection />
        <RecommendationSection />
        <ContactSection />
      </div>
    </div>
  );
};

export default App;

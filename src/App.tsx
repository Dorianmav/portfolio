import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Stack from "./components/Stack/Stack";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { ProjectsProvider } from "./context/ProjectsContext";
// import Projects from "./components/Projects/Projects";
import ProjectsPage from "./components/Projects/ProjectsPage";
import { Routes, Route } from "react-router-dom";
import AnimationSection from "./components/AnimationSection";
// import Education from "./components/Education/Education";
// import Experience from "./components/Experience/Experience";
import ResumeButton from "./components/ResumeButton/ResumeButton";
import { motion } from "framer-motion";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import Timeline from "./components/TimelinePreview";

// Composant pour la page d'accueil
const HomePage = () => {
  const { t } = useTranslation();
  const { themeColors } = useTheme();

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="container mx-auto p-4 md:p-6 mb-2"
      >
        <div className="flex justify-between items-center">
          <div className="flex">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-3xl font-bold text-center"
              style={{ color: themeColors.primary }}
            >
              {t("home.greeting")}
            </motion.h2>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="container mx-auto p-4 md:p-6 mt-2"
      >
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/2">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: themeColors.primary }}
            >
              {t("home.intro")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="text-base md:text-lg mb-6"
              style={{ color: themeColors.text }}
            >
              {t("home.description")}
            </motion.p>
            <ResumeButton />
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <AnimationSection />
          </div>
        </div>
      </motion.div>

      <Stack />
      <Timeline />
      {/* <Education /> */}
      {/* <Experience /> */}
      {/* <Projects /> */}
    </>
  );
};

function AppContent() {
  const { t } = useTranslation();
  const { themeColors } = useTheme();

  return (
    <div
      style={{ backgroundColor: themeColors.background, minHeight: "100vh" }}
    >
      <ProjectsProvider>
        <Routes>
          <Route
            path="/"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <HomePage />
              </motion.div>
            }
          />
          <Route
            path="/projects"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectsPage />
              </motion.div>
            }
          />
        </Routes>
      </ProjectsProvider>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="py-6 mt-8"
        style={{ backgroundColor: themeColors.secondary }}
      >
        <div className="container mx-auto text-center">
          <p className="text-sm" style={{ color: themeColors.textLight }}>
            {t("footer.copyright", { year: new Date().getFullYear() })}{" "}
            {t("footer.designed")} Dorianmav
          </p>
        </div>
      </motion.footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;

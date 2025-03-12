import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Stack from "./components/Stack/Stack";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { ProjectsProvider } from "./context/ProjectsContext";
import { SingleProjectProvider } from "./context/SingleProjectContext";
import Projects from "./components/Projects/Projects";
import ProjectInfo from "./components/Projects/ProjectInfo";
import { Routes, Route } from "react-router-dom";
import AnimationSection from "./components/AnimationSection";
import Education from "./components/Education/Education";
import Experience from "./components/Experience/Experience";
import ResumeButton from "./components/ResumeButton/ResumeButton";
import { motion } from "framer-motion";
import { themeColors } from "./theme/colors";

// Composant pour la page d'accueil
const HomePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto p-4 md:p-6 mb-2"
      >
        <div className="flex justify-between items-center">
          <div className="flex">
            <motion.h2 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-center"
              style={{ color: themeColors.primary }}
            >
              {t("home.greeting")}
            </motion.h2>
          </div>
          <LanguageSwitcher />
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="container mx-auto p-4 md:p-6 mt-2"
      >
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:w-1/2"
          >
            <h2 
              className="text-2xl font-bold mb-4"
              style={{ color: themeColors.primary }}
            >
              {t("home.intro")}
            </h2>
            <p 
              className="text-lg leading-relaxed text-justify"
              style={{ color: themeColors.text }}
            >
              {t("home.description")}
            </p>
            <ResumeButton />
          </motion.div>
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:w-1/2"
          >
            <AnimationSection />
          </motion.div>
        </div>
      </motion.div>

      <Stack />
      <Education />
      <Experience />
      <Projects />
    </>
  );
};

function App() {
  const { t } = useTranslation();

  return (
    <div style={{ backgroundColor: themeColors.background, minHeight: '100vh' }}>
      <ProjectsProvider>
        <SingleProjectProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/projects/:id"
              element={
                <div 
                  className="container mx-auto p-4 md:p-6"
                >
                  <ProjectInfo />
                </div>
              }
            />
          </Routes>
        </SingleProjectProvider>
      </ProjectsProvider>

      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="py-6 mt-8"
        style={{ backgroundColor: themeColors.secondary }}
      >
        <p 
          className="read-the-docs text-center"
          style={{ color: themeColors.textLight }}
        >
          {t("footer.designed")} Dorianmav
        </p>
      </motion.footer>
    </div>
  );
}

export default App;

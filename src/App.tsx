import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Stack from "./components/Stack/Stack";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { ProjectsProvider } from "./context/ProjectsContext";
import { SingleProjectProvider } from "./context/SingleProjectContext";
import ProjectsGrid from "./components/Projects/ProjectsGrid";
import ProjectInfo from "./components/Projects/ProjectInfo";
import { Routes, Route } from "react-router-dom";
import AnimationSection from "./components/AnimationSection";

// Composant pour la page d'accueil
const HomePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="container mx-auto p-4 md:p-6 mb-2">
        <div className="flex justify-between items-center">
          <div className="flex">
            <h2 className="text-3xl font-bold text-center text-primary-dark dark:text-primary-light">
              {t("home.greeting")}
            </h2>
          </div>
          <LanguageSwitcher />
        </div>
      </div>

      <div className="container mx-auto p-4 md:p-6 mt-2">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              {t("home.intro")}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
              {t("home.description")}
            </p>
          </div>
          <div className="md:w-1/2">
            <AnimationSection />
          </div>
        </div>
      </div>

      <Stack />

      <ProjectsGrid />
    </>
  );
};

function App() {
  const { t } = useTranslation();

  return (
    <>
      <ProjectsProvider>
        <SingleProjectProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/projects/:id"
              element={
                <div className="container mx-auto p-4 md:p-6">
                  <ProjectInfo />
                </div>
              }
            />
          </Routes>
        </SingleProjectProvider>
      </ProjectsProvider>

      <p className="read-the-docs mt-4 text-center">
        {t("footer.designed")} Dorianmav
      </p>
    </>
  );
}

export default App;

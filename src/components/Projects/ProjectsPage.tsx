import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiFilter, FiX, FiArrowLeft } from "react-icons/fi";
import { useProjectsContext } from "../../context/ProjectsContext";
import { Project } from "../../types/Project";
import SingleProject from "./SingleProject/SingleProject";
import { Link } from "react-router-dom";

/**
 * Page principale des projets avec filtres et recherche améliorés
 */
const ProjectsPage: React.FC = () => {
  const { t } = useTranslation();
  const {
    projects,
    searchProject,
    setSearchProject,
    selectProject,
    setSelectProject,
  } = useProjectsContext();
  const topRef = useRef<HTMLDivElement>(null);

  const [categories, setCategories] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [sortOption, setSortOption] = useState<string>("newest");

  // Extraire les catégories uniques des projets
  useEffect(() => {
    const uniqueCategories = ["all", ...new Set(projects.map((project) => project.category))];
    setCategories(uniqueCategories);
  }, [projects]);

  // Défiler vers le haut de la page lorsque le composant est monté
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Filtrer et trier les projets
  useEffect(() => {
    let result = [...projects];
    
    // Appliquer les filtres de catégorie
    if (selectProject) {
      result = result.filter(project => project.category === selectProject);
    }
    
    // Appliquer la recherche par titre
    if (searchProject) {
      result = result.filter(project => 
        project.title.toLowerCase().includes(searchProject.toLowerCase())
      );
    }
    
    // Appliquer le tri
    switch (sortOption) {
      case "newest":
        // Supposons que les projets les plus récents ont des IDs plus élevés
        result = result.sort((a, b) => b.id - a.id);
        break;
      case "oldest":
        result = result.sort((a, b) => a.id - b.id);
        break;
      case "alphabetical":
        result = result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }
    
    setFilteredProjects(result);
  }, [projects, selectProject, searchProject, sortOption]);

  // Gérer la recherche
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchProject(e.target.value);
  };

  // Gérer le filtre par catégorie
  const handleFilterClick = (category: string): void => {
    setActiveFilter(category);
    if (category === "all") {
      setSelectProject("");
    } else {
      setSelectProject(category);
    }
  };

  // Gérer le tri
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSortOption(e.target.value);
  };

  // Réinitialiser tous les filtres
  const resetFilters = (): void => {
    setSearchProject("");
    setSelectProject("");
    setActiveFilter("all");
    setSortOption("newest");
  };

  // Couleurs de la palette
  const colors = {
    background: '#F5F5DC', // Blanc cassé
    primary: '#A7C7E7',    // Bleu pastel
    secondary: '#B5C99A',  // Vert sauge
    accent: '#FCE38A',     // Jaune doux
    highlight: '#FFD3B5',  // Pêche clair
    text: '#333333',       // Texte foncé
    textLight: '#ffffff'   // Texte clair
  };

  return (
    <div ref={topRef} className="flex flex-col items-center justify-start min-h-screen overflow-x-hidden p-8" style={{ backgroundColor: colors.background }}>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-6xl flex items-center justify-between mb-8">
          <Link 
            to="/" 
            className="flex items-center gap-2 py-2 px-4 rounded-lg hover:opacity-90 transition-colors"
            style={{ 
              backgroundColor: colors.secondary,
              color: colors.textLight,
              textDecoration: 'none'
            }}
          >
            <FiArrowLeft />
            <span>{t("projects.back")}</span>
          </Link>
          <h1 className="text-5xl font-bold font-sans" style={{ color: colors.primary }}>
            {t("projects.title")}
          </h1>
          <div className="w-[100px]"></div> {/* Élément vide pour équilibrer le layout */}
        </div>
        
        <div className="w-full max-w-6xl mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div className="relative w-full md:w-auto md:flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch style={{ color: colors.text }} />
              </div>
              <input
                type="text"
                placeholder={t("projects.searchPlaceholder")}
                className="w-full py-3 pl-10 pr-4 rounded-lg focus:outline-none focus:ring-2 text-white"
                style={{ 
                  backgroundColor: colors.primary,
                  borderColor: colors.secondary,
                  color: colors.textLight,
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}
                value={searchProject}
                onChange={handleSearch}
              />
              {searchProject && (
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setSearchProject("")}
                >
                  <FiX style={{ color: colors.textLight }} />
                </button>
              )}
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 py-3 px-4 rounded-lg hover:opacity-90 transition-colors"
                style={{ 
                  backgroundColor: colors.secondary,
                  color: colors.textLight
                }}
              >
                <FiFilter />
                <span>{t("projects.filters")}</span>
              </button>
              <select
                value={sortOption}
                onChange={handleSortChange}
                className="py-3 px-4 rounded-lg focus:outline-none focus:ring-2 appearance-none"
                style={{ 
                  backgroundColor: colors.highlight,
                  color: colors.text,
                  backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23333333%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.7rem top 50%",
                  backgroundSize: "0.65rem auto"
                }}
              >
                <option value="newest">{t("projects.sortNewest")}</option>
                <option value="oldest">{t("projects.sortOldest")}</option>
                <option value="alphabetical">{t("projects.sortAlphabetical")}</option>
              </select>
              
              <button
                onClick={resetFilters}
                className="py-3 px-4 text-white rounded-lg transition-colors hover:opacity-90"
                style={{ backgroundColor: colors.accent, color: colors.text }}
              >
                {t("projects.resetFilters")}
              </button>
            </div>
          </div>
          
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mb-6"
              >
                <div className="p-4 rounded-lg shadow-md" style={{ backgroundColor: colors.primary }}>
                  <h3 className="text-lg font-medium mb-3" style={{ color: colors.textLight }}>
                    {t("projects.categories")}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {categories.map((category, index) => (
                      <button
                        key={index}
                        className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
                        style={{ 
                          backgroundColor: activeFilter === category ? colors.accent : colors.secondary,
                          color: activeFilter === category ? colors.text : colors.textLight,
                          boxShadow: activeFilter === category ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'
                        }}
                        onClick={() => handleFilterClick(category)}
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-center gap-6 w-[95%] mx-auto">
          <AnimatePresence>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <SingleProject
                  key={project.id.toString()}
                  id={project.id.toString()}
                  name={project.title}
                  desc={project.description ?? ""}
                  tags={project.technologies || []}
                  code={project.githubLink ?? "#"}
                  demo={project.demoLink ?? "#"}
                  image={project.img || ""}
                  variant="grid"
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-xl" style={{ color: colors.text }}>
                  {t("projects.noResults")}
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;

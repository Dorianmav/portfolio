import React from 'react';
import { FiSearch } from 'react-icons/fi';
import ProjectSingle from './ProjectSingle';
import ProjectsFilter from './ProjectsFilter';
import { useProjectsContext } from '../../context/ProjectsContext';

const ProjectsGrid: React.FC = () => {
  const {
    projects,
    searchProject,
    setSearchProject,
    searchProjectsByTitle,
    selectProject,
    setSelectProject,
    selectProjectsByCategory,
  } = useProjectsContext();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchProject(e.target.value);
  };

  // Déterminer quels projets afficher en fonction des filtres
  const getProjectsToDisplay = () => {
    if (selectProject) {
      return selectProjectsByCategory;
    }
    
    if (searchProject) {
      return searchProjectsByTitle;
    }
    
    return projects;
  };

  const projectsToDisplay = getProjectsToDisplay();

  return (
    <section className="py-5 sm:py-10 mt-5 sm:mt-10">
      <div className="text-center">
        <p className="font-medium text-2xl sm:text-4xl mb-1 text-gray-800 dark:text-gray-200">
          Portfolio de Projets
        </p>
      </div>

      <div className="mt-10 sm:mt-16">
        <h3 className="font-normal text-center text-gray-600 dark:text-gray-300 text-md sm:text-xl mb-3">
          Recherchez des projets par titre ou filtrez par catégorie
        </h3>
        <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-3 gap-3">
          <div className="flex justify-between gap-2">
            <span className="hidden sm:block bg-gray-100 dark:bg-gray-800 p-2.5 shadow-sm rounded-xl cursor-pointer">
              <FiSearch className="text-gray-500 dark:text-gray-400 w-5 h-5" />
            </span>
            <input
              onChange={handleSearch}
              className="font-medium pl-3 pr-1 sm:px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm sm:text-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              id="search"
              name="search"
              type="search"
              placeholder="Rechercher des Projets"
              aria-label="Rechercher"
            />
          </div>

          <ProjectsFilter setSelectProject={setSelectProject} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 sm:gap-10">
        {projectsToDisplay.map((project) => (
          <ProjectSingle
            key={project.id}
            id={project.id}
            title={project.title}
            category={project.category}
            image={project.img}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsGrid;

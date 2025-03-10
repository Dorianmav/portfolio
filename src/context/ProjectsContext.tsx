import React, { createContext, useState, ReactNode, useContext, useMemo } from 'react';
import { Project } from '../types/Project';
import { projectsData } from '../data/projects';

interface ProjectsContextProps {
  projects: Project[];
  searchProject: string;
  setSearchProject: React.Dispatch<React.SetStateAction<string>>;
  searchProjectsByTitle: Project[];
  selectProject: string;
  setSelectProject: React.Dispatch<React.SetStateAction<string>>;
  selectProjectsByCategory: Project[];
}

// Création du contexte avec une valeur par défaut
export const ProjectsContext = createContext<ProjectsContextProps>({
  projects: [],
  searchProject: '',
  setSearchProject: () => {},
  searchProjectsByTitle: [],
  selectProject: '',
  setSelectProject: () => {},
  selectProjectsByCategory: [],
});

interface ProjectsProviderProps {
  children: ReactNode;
}

// Création du fournisseur de contexte
export const ProjectsProvider: React.FC<ProjectsProviderProps> = ({ children }) => {
  const [projects] = useState<Project[]>(projectsData);
  const [searchProject, setSearchProject] = useState<string>('');
  const [selectProject, setSelectProject] = useState<string>('');

  // Recherche de projets par titre
  const searchProjectsByTitle = projects.filter((item) => {
    return item.title
      .toLowerCase()
      .includes(searchProject.toLowerCase()) || searchProject === '';
  });

  // Sélection de projets par catégorie
  const selectProjectsByCategory = projects.filter((item) => {
    // Si aucune catégorie n'est sélectionnée, retourner tous les projets
    if (!selectProject) {
      return true;
    }
    // Sinon, vérifier l'égalité exacte avec la catégorie sélectionnée
    return item.category === selectProject;
  });

  // Utilisation de useMemo pour éviter de recréer l'objet à chaque rendu
  const contextValue = useMemo(() => ({
    projects,
    searchProject,
    setSearchProject,
    searchProjectsByTitle,
    selectProject,
    setSelectProject,
    selectProjectsByCategory,
  }), [projects, searchProject, searchProjectsByTitle, selectProject, selectProjectsByCategory]);

  return (
    <ProjectsContext.Provider value={contextValue}>
      {children}
    </ProjectsContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte des projets
export const useProjectsContext = (): ProjectsContextProps => {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error('useProjectsContext doit être utilisé à l\'intérieur d\'un ProjectsProvider');
  }
  return context;
};

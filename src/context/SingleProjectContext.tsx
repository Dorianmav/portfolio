import React, { createContext, useState, ReactNode, useContext, useMemo } from 'react';
import { SingleProject } from '../types/SingleProject';
import { singleProjectsData } from '../data/singleProjectData';

interface SingleProjectContextProps {
  singleProject: SingleProject | null;
  setSingleProject: React.Dispatch<React.SetStateAction<SingleProject | null>>;
  getProjectById: (id: number) => void;
}

// Création du contexte avec une valeur par défaut
export const SingleProjectContext = createContext<SingleProjectContextProps>({
  singleProject: null,
  setSingleProject: () => {},
  getProjectById: () => {},
});

interface SingleProjectProviderProps {
  children: ReactNode;
}

// Création du fournisseur de contexte
export const SingleProjectProvider: React.FC<SingleProjectProviderProps> = ({ children }) => {
  const [singleProject, setSingleProject] = useState<SingleProject | null>(null);

  // Fonction pour récupérer un projet par son ID
  const getProjectById = (id: number): void => {
    const project = singleProjectsData.find((project) => project.id === id);
    if (project) {
      setSingleProject(project);
    }
  };

  // Utilisation de useMemo pour éviter de recréer l'objet à chaque rendu
  const contextValue = useMemo(() => ({
    singleProject,
    setSingleProject,
    getProjectById,
  }), [singleProject]);

  return (
    <SingleProjectContext.Provider value={contextValue}>
      {children}
    </SingleProjectContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte des projets uniques
export const useSingleProjectContext = (): SingleProjectContextProps => {
  const context = useContext(SingleProjectContext);
  if (context === undefined) {
    throw new Error('useSingleProjectContext doit être utilisé à l\'intérieur d\'un SingleProjectProvider');
  }
  return context;
};

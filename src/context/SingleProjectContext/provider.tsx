import React, { useState, ReactNode, useMemo } from 'react';
import { SingleProject } from '../../types/SingleProject';
import { singleProjectsData } from '../../data/singleProjectData';
import { SingleProjectContext } from './context';

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

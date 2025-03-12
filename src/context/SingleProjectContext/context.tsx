import { createContext } from 'react';
import { SingleProjectContextProps } from './types';

// Création du contexte avec une valeur par défaut
export const SingleProjectContext = createContext<SingleProjectContextProps>({
  singleProject: null,
  setSingleProject: () => {},
  getProjectById: () => {},
});

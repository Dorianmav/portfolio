import { useContext } from 'react';
import { SingleProjectContext } from './context';
import type { SingleProjectContextProps } from './types';

// Hook personnalisé pour utiliser le contexte des projets uniques
export const useSingleProjectContext = (): SingleProjectContextProps => {
  const context = useContext(SingleProjectContext);
  if (context === undefined) {
    throw new Error('useSingleProjectContext doit être utilisé à l\'intérieur d\'un SingleProjectProvider');
  }
  return context;
};

import { SingleProject } from '../../types/SingleProject';
import { Dispatch, SetStateAction } from 'react';

export interface SingleProjectContextProps {
  singleProject: SingleProject | null;
  setSingleProject: Dispatch<SetStateAction<SingleProject | null>>;
  getProjectById: (id: number) => void;
}

import React from 'react';
import { ProjectCategory } from '../../types/Project';

const selectOptions: ProjectCategory[] = [
  'Web Application',
  'Mobile Application',
  'UI/UX Design',
  'Branding',
];

interface ProjectsFilterProps {
  setSelectProject: React.Dispatch<React.SetStateAction<string>>;
}

const ProjectsFilter: React.FC<ProjectsFilterProps> = ({ setSelectProject }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectProject(e.target.value);
  };

  return (
    <select
      onChange={handleChange}
      className="font-general-medium px-4 sm:px-6 py-2 border dark:border-secondary-dark rounded-lg text-sm sm:text-md dark:font-medium bg-secondary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light"
      aria-label="Filtrer les projets par catégorie"
    >
      <option value="" className="text-sm sm:text-md">
        Tous les Projets
      </option>

      {selectOptions.map((option) => (
        <option className="text-normal sm:text-md" key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default ProjectsFilter;

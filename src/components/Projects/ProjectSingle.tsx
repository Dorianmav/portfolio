import React from 'react';
import { Link } from 'react-router-dom';
import { ProjectCategory } from '../../types/Project';
import { useSingleProjectContext } from '../../context/SingleProjectContext';

interface ProjectSingleProps {
  id: number;
  title: string;
  category: ProjectCategory;
  image: string;
}

const ProjectSingle: React.FC<ProjectSingleProps> = ({ id, title, category, image }) => {
  const { getProjectById } = useSingleProjectContext();

  const handleProjectClick = (): void => {
    getProjectById(id);
  };

  return (
    <Link
      to={`/projects/${id}`}
      aria-label="Voir les détails du projet"
      onClick={handleProjectClick}
      className="rounded-xl shadow-lg hover:shadow-xl cursor-pointer mb-10 sm:mb-0 bg-secondary-light dark:bg-ternary-dark"
    >
      <div>
        <img
          src={image}
          className="rounded-t-xl border-none"
          alt={title}
        />
      </div>
      <div className="text-center px-4 py-6">
        <p className="font-general-medium text-xl md:text-2xl text-ternary-dark dark:text-ternary-light mb-2">
          {title}
        </p>
        <span className="text-lg text-ternary-dark dark:text-ternary-light">
          {category}
        </span>
      </div>
    </Link>
  );
};

export default ProjectSingle;

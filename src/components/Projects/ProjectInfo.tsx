import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSingleProjectContext } from '../../context/SingleProjectContext';
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter, FiYoutube, FiArrowLeft } from 'react-icons/fi';
import { CompanyInfo, ProjectDetail, SocialSharing } from '../../types/SingleProject';

const ProjectInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { singleProject, getProjectById } = useSingleProjectContext();

  useEffect(() => {
    if (id) {
      getProjectById(parseInt(id, 10));
    }
  }, [id, getProjectById]);

  if (!singleProject) {
    return <div className="text-center py-10">Chargement du projet...</div>;
  }

  // Fonction pour obtenir l'icône correspondante
  const getIconComponent = (iconName: string): React.ReactNode => {
    switch (iconName) {
      case 'FiTwitter':
        return <FiTwitter />;
      case 'FiInstagram':
        return <FiInstagram />;
      case 'FiFacebook':
        return <FiFacebook />;
      case 'FiLinkedin':
        return <FiLinkedin />;
      case 'FiYoutube':
        return <FiYoutube />;
      default:
        return null;
    }
  };

  // Fonction pour rendre les détails de contact en fonction du type
  const renderContactInfo = (info: CompanyInfo): React.ReactNode => {
    if (info.title === 'Site Web') {
      return (
        <a
          href={info.details}
          className="hover:underline hover:text-indigo-500 dark:hover:text-indigo-400 cursor-pointer duration-300"
          aria-label="Site Web du Projet"
          target="_blank"
          rel="noopener noreferrer"
        >
          {info.details}
        </a>
      );
    } 
    
    if (info.title === 'Téléphone') {
      return (
        <a
          href={`tel:${info.details.replace(/\s+/g, '')}`}
          className="hover:underline hover:text-indigo-500 dark:hover:text-indigo-400 cursor-pointer duration-300"
          aria-label="Téléphone du Projet"
        >
          {info.details}
        </a>
      );
    }
    
    return <span>{info.details}</span>;
  };

  return (
    <>
      <div className="mb-8">
        <Link 
          to="/" 
          className="flex items-center text-lg font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
        >
          <FiArrowLeft className="mr-2" /> Retour aux projets
        </Link>
      </div>

      {/* En-tête du projet */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-8">
        <h1 className="font-general-medium text-3xl md:text-4xl text-primary-dark dark:text-primary-light mb-2">
          {singleProject.ProjectHeader.title}
        </h1>
        <div className="flex flex-wrap items-center mt-2">
          <span className="text-gray-600 dark:text-gray-400 mr-5">
            Publié le: {singleProject.ProjectHeader.publishDate}
          </span>
          <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 py-1 px-3 rounded-full text-sm">
            {singleProject.ProjectHeader.tags}
          </span>
        </div>
      </div>

      {/* Images du projet */}
      <div className="mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {singleProject.ProjectImages.map((image) => (
            <div key={image.id} className="overflow-hidden rounded-lg shadow-md">
              <img 
                src={image.img} 
                alt={image.title} 
                className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="p-3 bg-gray-50 dark:bg-gray-800">
                <p className="text-sm text-gray-600 dark:text-gray-400">{image.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="block sm:flex gap-0 sm:gap-10 mt-6">
        <div className="w-full sm:w-1/3 text-left">
          {/* Détails du client */}
          <div className="mb-7">
            <p className="font-general-regular text-2xl font-semibold text-secondary-dark dark:text-secondary-light mb-2">
              {singleProject.ProjectInfo.ClientHeading}
            </p>
            <ul className="leading-loose">
              {singleProject.ProjectInfo.CompanyInfo.map((info: CompanyInfo) => (
                <li
                  className="font-general-regular text-ternary-dark dark:text-ternary-light"
                  key={info.id}
                >
                  <span>{info.title}: </span>
                  {renderContactInfo(info)}
                </li>
              ))}
            </ul>
          </div>

          {/* Objectifs du projet */}
          <div className="mb-7">
            <p className="font-general-regular text-2xl font-semibold text-ternary-dark dark:text-ternary-light mb-2">
              {singleProject.ProjectInfo.ObjectivesHeading}
            </p>
            <p className="font-general-regular text-primary-dark dark:text-ternary-light">
              {singleProject.ProjectInfo.ObjectivesDetails}
            </p>
          </div>

          {/* Technologies utilisées */}
          <div className="mb-7">
            <p className="font-general-regular text-2xl font-semibold text-ternary-dark dark:text-ternary-light mb-2">
              {singleProject.ProjectInfo.Technologies[0].title}
            </p>
            <p className="font-general-regular text-primary-dark dark:text-ternary-light">
              {singleProject.ProjectInfo.Technologies[0].techs.join(', ')}
            </p>
          </div>

          {/* Partage sur les réseaux sociaux */}
          <div>
            <p className="font-general-regular text-2xl font-semibold text-ternary-dark dark:text-ternary-light mb-2">
              {singleProject.ProjectInfo.SocialSharingHeading}
            </p>
            <div className="flex items-center gap-3 mt-5">
              {singleProject.ProjectInfo.SocialSharing.map((social: SocialSharing) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Partager sur ${social.name}`}
                  className="bg-ternary-light dark:bg-ternary-dark text-gray-400 hover:text-primary-dark dark:hover:text-primary-light p-2 rounded-lg shadow-sm duration-500"
                >
                  <span className="text-lg lg:text-2xl">
                    {getIconComponent(social.icon)}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Section droite du projet */}
        <div className="w-full sm:w-2/3 text-left mt-10 sm:mt-0">
          <p className="font-general-regular text-primary-dark dark:text-primary-light text-2xl font-bold mb-7">
            {singleProject.ProjectInfo.ProjectDetailsHeading}
          </p>
          {singleProject.ProjectInfo.ProjectDetails.map((details: ProjectDetail) => (
            <p
              key={details.id}
              className="font-general-regular mb-5 text-lg text-ternary-dark dark:text-ternary-light"
            >
              {details.details}
            </p>
          ))}
        </div>
      </div>

      {/* Projets liés */}
      {singleProject.RelatedProject?.Projects?.length > 0 && (
        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-10">
          <h2 className="font-general-regular text-2xl font-bold text-primary-dark dark:text-primary-light mb-8">
            {singleProject.RelatedProject.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {singleProject.RelatedProject.Projects.map((relatedProject) => (
              <div key={relatedProject.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <img 
                  src={relatedProject.img} 
                  alt={relatedProject.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-general-medium text-lg text-primary-dark dark:text-primary-light mb-2">
                    {relatedProject.title}
                  </h3>
                  <Link 
                    to={`/projects/${relatedProject.id}`} 
                    className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-sm transition-colors duration-300"
                    onClick={() => getProjectById(relatedProject.id)}
                  >
                    Voir le projet
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectInfo;

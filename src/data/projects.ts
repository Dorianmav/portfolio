import { Project } from '../types/Project';
import WindsurfLogo from '../assets/windsurf-logo.png';

// Importez vos images de projets ici
// Par exemple:
// import WebImage1 from '../assets/web-project-1.jpg';
// Pour l'instant, nous utiliserons des URLs d'images temporaires

export const projectsData: Project[] = [
  {
    id: 1,
    title: 'Application Web de Santé',
    category: 'Web Application',
    img: WindsurfLogo,
    ProjectHeader: {
      title: 'Application Web de Santé - Plateforme Médicale',
      publishDate: '10 Mars 2025',
      tags: 'React / TypeScript / API',
    },
  },
  {
    id: 2,
    title: 'Application Mobile de Fitness',
    category: 'Mobile Application',
    img: WindsurfLogo,
    ProjectHeader: {
      title: 'Application Mobile de Fitness - Suivi d\'Activité',
      publishDate: '5 Mars 2025',
      tags: 'React Native / TypeScript',
    },
  },
  {
    id: 3,
    title: 'Interface de Gestion de Projet',
    category: 'UI/UX Design',
    img: WindsurfLogo,
    ProjectHeader: {
      title: 'Interface de Gestion de Projet - Dashboard',
      publishDate: '28 Février 2025',
      tags: 'Figma / Adobe XD',
    },
  },
  {
    id: 4,
    title: 'Plateforme de Stockage Cloud',
    category: 'Web Application',
    img: WindsurfLogo,
    ProjectHeader: {
      title: 'Plateforme de Stockage Cloud - Sécurité des Données',
      publishDate: '20 Février 2025',
      tags: 'React / Node.js / AWS',
    },
  },
  {
    id: 5,
    title: 'Application Sociale',
    category: 'Mobile Application',
    img: WindsurfLogo,
    ProjectHeader: {
      title: 'Application Sociale - Partage de Contenu',
      publishDate: '15 Février 2025',
      tags: 'React Native / Firebase',
    },
  },
  {
    id: 6,
    title: 'Système de Design',
    category: 'UI/UX Design',
    img: WindsurfLogo,
    ProjectHeader: {
      title: 'Système de Design - Composants Réutilisables',
      publishDate: '10 Février 2025',
      tags: 'Figma / Storybook',
    },
  },
];

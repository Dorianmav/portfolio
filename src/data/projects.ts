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
    description: 'Une plateforme médicale permettant aux patients de prendre rendez-vous avec des médecins et de consulter leur dossier médical en ligne.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
    githubLink: 'https://github.com/username/health-app',
    demoLink: 'https://health-app-demo.com',
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
    description: 'Application mobile permettant aux utilisateurs de suivre leurs activités sportives, de définir des objectifs et de visualiser leurs progrès.',
    technologies: ['React Native', 'TypeScript', 'Redux', 'Firebase'],
    githubLink: 'https://github.com/username/fitness-app',
    demoLink: 'https://fitness-app-demo.com',
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
    description: 'Conception d\'une interface utilisateur intuitive pour un outil de gestion de projet, avec un focus sur l\'expérience utilisateur et l\'accessibilité.',
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'Prototypage'],
    githubLink: 'https://github.com/username/project-management-ui',
    demoLink: 'https://project-management-ui-demo.com',
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
    description: 'Solution de stockage cloud sécurisée permettant aux utilisateurs de stocker, partager et synchroniser leurs fichiers sur différents appareils.',
    technologies: ['React', 'Node.js', 'AWS S3', 'Express', 'MongoDB'],
    githubLink: 'https://github.com/username/cloud-storage',
    demoLink: 'https://cloud-storage-demo.com',
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
    description: 'Réseau social mobile permettant aux utilisateurs de partager du contenu, de communiquer et de découvrir de nouvelles personnes partageant les mêmes centres d\'intérêt.',
    technologies: ['React Native', 'Firebase', 'Redux', 'Cloud Functions'],
    githubLink: 'https://github.com/username/social-app',
    demoLink: 'https://social-app-demo.com',
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
    description: 'Création d\'un système de design complet avec des composants réutilisables pour assurer la cohérence visuelle à travers différentes applications.',
    technologies: ['Figma', 'Storybook', 'React', 'Styled Components'],
    githubLink: 'https://github.com/username/design-system',
    demoLink: 'https://design-system-demo.com',
    ProjectHeader: {
      title: 'Système de Design - Composants Réutilisables',
      publishDate: '10 Février 2025',
      tags: 'Figma / Storybook',
    },
  },
  {
    id: 7,
    title: 'Plateforme E-commerce',
    category: 'Web Application',
    img: WindsurfLogo,
    description: 'Site e-commerce complet avec panier d\'achat, paiement en ligne, gestion des commandes et interface d\'administration.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    githubLink: 'https://github.com/username/ecommerce-platform',
    demoLink: 'https://ecommerce-platform-demo.com',
    ProjectHeader: {
      title: 'Plateforme E-commerce - Boutique en Ligne',
      publishDate: '5 Février 2025',
      tags: 'React / Node.js / Stripe',
    },
  },
  {
    id: 8,
    title: 'Application de Gestion de Budget',
    category: 'Mobile Application',
    img: WindsurfLogo,
    description: 'Application mobile permettant aux utilisateurs de suivre leurs dépenses, de créer des budgets et de visualiser leurs finances sous forme de graphiques.',
    technologies: ['React Native', 'TypeScript', 'Redux', 'Firebase'],
    githubLink: 'https://github.com/username/budget-app',
    demoLink: 'https://budget-app-demo.com',
    ProjectHeader: {
      title: 'Application de Gestion de Budget - Finances Personnelles',
      publishDate: '1 Février 2025',
      tags: 'React Native / Firebase',
    },
  },
  {
    id: 9,
    title: 'Refonte de Site Web',
    category: 'Branding',
    img: WindsurfLogo,
    description: 'Refonte complète de l\'identité visuelle et du site web d\'une entreprise pour moderniser son image de marque et améliorer l\'expérience utilisateur.',
    technologies: ['Figma', 'Adobe Illustrator', 'React', 'SCSS'],
    githubLink: 'https://github.com/username/website-redesign',
    demoLink: 'https://website-redesign-demo.com',
    ProjectHeader: {
      title: 'Refonte de Site Web - Identité Visuelle',
      publishDate: '25 Janvier 2025',
      tags: 'Branding / UI Design / React',
    },
  }
];

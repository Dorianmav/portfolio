import { SingleProject } from '../types/SingleProject';
import WindsurfLogo from '../assets/windsurf-logo.png';

export const singleProjectsData: SingleProject[] = [
  {
    id: 1,
    ProjectHeader: {
      title: 'Application Web de Santé',
      publishDate: '10 Mars 2025',
      tags: 'React / TypeScript / API',
    },
    ProjectImages: [
      {
        id: 1,
        title: 'Application Web de Santé - Vue 1',
        img: WindsurfLogo,
      },
      {
        id: 2,
        title: 'Application Web de Santé - Vue 2',
        img: WindsurfLogo,
      },
      {
        id: 3,
        title: 'Application Web de Santé - Vue 3',
        img: WindsurfLogo,
      },
    ],
    ProjectInfo: {
      ClientHeading: 'À propos du client',
      CompanyInfo: [
        {
          id: 1,
          title: 'Nom',
          details: 'Santé Plus',
        },
        {
          id: 2,
          title: 'Services',
          details: 'Développement Frontend & Backend',
        },
        {
          id: 3,
          title: 'Site Web',
          details: 'https://santeplus.fr',
        },
        {
          id: 4,
          title: 'Téléphone',
          details: '01 23 45 67 89',
        },
      ],
      ObjectivesHeading: 'Objectif',
      ObjectivesDetails:
        'Créer une plateforme de santé intuitive permettant aux utilisateurs de gérer leurs rendez-vous médicaux, consulter leurs dossiers et communiquer avec les professionnels de santé en toute sécurité.',
      Technologies: [
        {
          title: 'Outils & Technologies',
          techs: [
            'React',
            'TypeScript',
            'Node.js',
            'Express',
            'MongoDB',
            'TailwindCSS',
            'Figma',
          ],
        },
      ],
      ProjectDetailsHeading: 'Défi',
      ProjectDetails: [
        {
          id: 1,
          details:
            'Le principal défi de ce projet était de créer une interface utilisateur intuitive tout en respectant les normes strictes de sécurité et de confidentialité des données médicales. Nous avons dû mettre en place un système d\'authentification robuste et une gestion fine des autorisations pour garantir que les informations sensibles ne soient accessibles qu\'aux personnes autorisées.',
        },
        {
          id: 2,
          details:
            'Un autre défi important était l\'intégration avec différents systèmes de gestion médicale existants. Nous avons développé une API flexible capable de communiquer avec divers systèmes tiers tout en maintenant une expérience utilisateur cohérente.',
        },
        {
          id: 3,
          details:
            'La performance était également cruciale, car la plateforme devait pouvoir gérer un grand nombre d\'utilisateurs simultanés et de grandes quantités de données. Nous avons optimisé les requêtes de base de données et mis en place un système de mise en cache efficace pour garantir des temps de réponse rapides.',
        },
      ],
      SocialSharingHeading: 'Partager',
      SocialSharing: [
        {
          id: 1,
          name: 'Twitter',
          icon: 'FiTwitter',
          url: 'https://twitter.com/',
        },
        {
          id: 2,
          name: 'Instagram',
          icon: 'FiInstagram',
          url: 'https://instagram.com/',
        },
        {
          id: 3,
          name: 'Facebook',
          icon: 'FiFacebook',
          url: 'https://facebook.com/',
        },
        {
          id: 4,
          name: 'LinkedIn',
          icon: 'FiLinkedin',
          url: 'https://linkedin.com/',
        },
        {
          id: 5,
          name: 'Youtube',
          icon: 'FiYoutube',
          url: 'https://www.youtube.com/',
        },
      ],
    },
    RelatedProject: {
      title: 'Projets Similaires',
      Projects: [
        {
          id: 1,
          title: 'Application Mobile de Fitness',
          img: WindsurfLogo,
        },
        {
          id: 2,
          title: 'Plateforme de Stockage Cloud',
          img: WindsurfLogo,
        },
        {
          id: 3,
          title: 'Application Sociale',
          img: WindsurfLogo,
        },
      ],
    },
  },
  {
    id: 2,
    ProjectHeader: {
      title: 'Application Mobile de Fitness',
      publishDate: '5 Mars 2025',
      tags: 'React Native / TypeScript',
    },
    ProjectImages: [
      {
        id: 1,
        title: 'Application Mobile de Fitness - Vue 1',
        img: WindsurfLogo,
      },
      {
        id: 2,
        title: 'Application Mobile de Fitness - Vue 2',
        img: WindsurfLogo,
      },
      {
        id: 3,
        title: 'Application Mobile de Fitness - Vue 3',
        img: WindsurfLogo,
      },
    ],
    ProjectInfo: {
      ClientHeading: 'À propos du client',
      CompanyInfo: [
        {
          id: 1,
          title: 'Nom',
          details: 'FitLife',
        },
        {
          id: 2,
          title: 'Services',
          details: 'Développement Mobile & UI/UX Design',
        },
        {
          id: 3,
          title: 'Site Web',
          details: 'https://fitlife.fr',
        },
        {
          id: 4,
          title: 'Téléphone',
          details: '01 98 76 54 32',
        },
      ],
      ObjectivesHeading: 'Objectif',
      ObjectivesDetails:
        'Développer une application mobile de fitness complète permettant aux utilisateurs de suivre leurs activités physiques, créer des programmes d\'entraînement personnalisés et partager leurs progrès avec une communauté.',
      Technologies: [
        {
          title: 'Outils & Technologies',
          techs: [
            'React Native',
            'TypeScript',
            'Redux',
            'Firebase',
            'GraphQL',
            'Figma',
          ],
        },
      ],
      ProjectDetailsHeading: 'Défi',
      ProjectDetails: [
        {
          id: 1,
          details:
            'Le principal défi était de créer une application performante qui fonctionne de manière fluide sur les appareils iOS et Android, tout en offrant une expérience utilisateur cohérente et intuitive. Nous avons dû optimiser le code pour garantir des performances optimales même sur des appareils moins puissants.',
        },
        {
          id: 2,
          details:
            'La synchronisation des données en temps réel entre les appareils et le backend était également un défi important. Nous avons mis en place une architecture robuste utilisant Firebase et GraphQL pour assurer une synchronisation efficace et fiable des données utilisateur.',
        },
        {
          id: 3,
          details:
            'Un autre aspect complexe était la création d\'un système de suivi d\'activité précis qui fonctionne avec différents capteurs de mouvement sur divers appareils. Nous avons développé des algorithmes sophistiqués pour analyser les données des capteurs et fournir des informations précises sur les activités physiques.',
        },
      ],
      SocialSharingHeading: 'Partager',
      SocialSharing: [
        {
          id: 1,
          name: 'Twitter',
          icon: 'FiTwitter',
          url: 'https://twitter.com/',
        },
        {
          id: 2,
          name: 'Instagram',
          icon: 'FiInstagram',
          url: 'https://instagram.com/',
        },
        {
          id: 3,
          name: 'Facebook',
          icon: 'FiFacebook',
          url: 'https://facebook.com/',
        },
        {
          id: 4,
          name: 'LinkedIn',
          icon: 'FiLinkedin',
          url: 'https://linkedin.com/',
        },
      ],
    },
    RelatedProject: {
      title: 'Projets Similaires',
      Projects: [
        {
          id: 1,
          title: 'Application Web de Santé',
          img: WindsurfLogo,
        },
        {
          id: 2,
          title: 'Application Sociale',
          img: WindsurfLogo,
        },
        {
          id: 3,
          title: 'Interface de Gestion de Projet',
          img: WindsurfLogo,
        },
      ],
    },
  },
  // Ajoutez les autres projets ici avec le même format
];

import { TimelineItem } from "../types/TimelineItem";

// Données de la timeline
export const timelineData: TimelineItem[] = [
  {
    id: 1,
    date: "2022 - Présent",
    title: "Développeur Full Stack Senior",
    description: "Conception et développement d'applications web complexes pour des clients internationaux",
    category: "experience",
    location: "TechInnovate, Paris",
    details: [
      "Développement d'applications React avec TypeScript et NextJS",
      "Mise en place d'architectures microservices avec Node.js",
      "Intégration avec des services externes (API externes, services cloud)",
      "Optimisation des performances et des temps de chargement",
      "Gestion des erreurs et des exceptions",
      "Tests unitaires et end-to-end",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Docker",
      "AWS",
      "MongoDB",
      "Redis",
      "JWT",
    ],
  },
  {
    id: 2,
    date: "2021 - 2022",
    title: "Master en Ingénierie Logicielle",
    description: "Spécialisation en architecture des systèmes distribués et applications cloud",
    category: "education",
    location: "École Polytechnique, Paris",
    details: [
      "Mémoire sur l'optimisation des performances des applications React",
      "Projet de fin d'études: Plateforme d'analyse de données en temps réel",
    ],
    technologies: ["React", "Python", "AWS", "Microservices"],
  },
  {
    id: 3,
    date: "2020",
    title: "Certification AWS Developer Associate",
    description: "Spécialisation dans le développement d'applications cloud sur AWS",
    category: "education",
    details: ["Services de calcul et hébergement AWS", "Bases de données AWS"],
    technologies: ["AWS", "Lambda", "DynamoDB", "S3"],
  },
  {
    id: 4,
    date: "2018 - 2019",
    title: "Projet Open Source - Gestionnaire de Budget",
    description: "Application web de gestion budgétaire personnelle",
    category: "project",
    details: [
      "Interface intuitive pour le suivi des dépenses et revenus",
      "Visualisations de données avec D3.js",
    ],
    technologies: ["React", "Node.js", "D3.js", "MongoDB"],
    image: ["../assets/windsurf-logo.png"],
    demoUrl: "https://www.google.fr/",
    gitUrl: "https://github.com/Dorianmav/portfolio_test",
  },
];
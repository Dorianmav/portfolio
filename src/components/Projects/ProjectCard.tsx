import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

interface ProjectCardProps {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  tags: string[];
  demoLink: string;
  codeLink: string;
}

/**
 * Carte de projet avec animations et effets de survol
 */
const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  category,
  image,
  description,
  tags,
  demoLink,
  codeLink,
}) => {
  const { t } = useTranslation();
  
  // Animations
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.1,
      transition: { duration: 0.2, type: "spring", stiffness: 400, damping: 10 }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300"
    >
      <div className="relative overflow-hidden h-48 md:h-64">
        <motion.img
          variants={imageVariants}
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
          <div>
            <span className="px-3 py-1 bg-blue-600 text-white text-xs rounded-full mb-2 inline-block">
              {category}
            </span>
            <h3 className="text-xl font-bold text-white">{title}</h3>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-5">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <Link 
            to={`/projects/${id}`}
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            {t("projects.viewDetails")}
          </Link>
          
          <div className="flex space-x-3">
            <motion.a
              href={codeLink}
              target="_blank"
              rel="noopener noreferrer"
              variants={buttonVariants}
              whileHover="hover"
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label={t("projects.viewCode")}
            >
              <FaGithub size={18} />
            </motion.a>
            
            <motion.a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              variants={buttonVariants}
              whileHover="hover"
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-colors"
              aria-label={t("projects.viewDemo")}
            >
              <FaExternalLinkAlt size={16} />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

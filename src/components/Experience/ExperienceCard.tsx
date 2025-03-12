import React from "react";
import { motion } from "framer-motion";
import { Badge } from "react-bootstrap";
import { themeColors } from "../../theme/colors";

interface ExperienceCardProps {
  title: string;
  company: string;
  date: string;
  description: string;
  skills: string[];
  position: "left" | "right";
}

/**
 * Carte affichant les informations d'une expérience professionnelle
 */
const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  company,
  date,
  description,
  skills,
  position,
}) => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, x: position === "left" ? -50 : 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className={`flex flex-col md:flex-row items-center mb-12 ${position === "right" ? "md:flex-row-reverse" : ""}`}>
      <motion.div 
        className="w-full md:w-1/2 flex justify-center"
        variants={cardVariants}
      >
        <div className="relative">
          {/* Point sur la timeline */}
          <div 
            className="absolute top-1/2 transform -translate-y-1/2 left-0 md:left-auto md:right-0 w-4 h-4 rounded-full z-10"
            style={{ backgroundColor: themeColors.highlight }}
          ></div>
          
          {/* Ligne horizontale */}
          <div 
            className={`absolute top-1/2 transform -translate-y-1/2 ${position === "left" ? "right-0" : "left-0"} w-8 h-1`}
            style={{ backgroundColor: themeColors.secondary }}
          ></div>
        </div>
      </motion.div>
      
      <motion.div 
        className={`w-full md:w-1/2 p-6 mt-4 md:mt-0 ${position === "left" ? "md:pr-12" : "md:pl-12"}`}
        variants={cardVariants}
      >
        <div 
          className="rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl"
          style={{ 
            backgroundColor: themeColors.secondary, 
            borderColor: themeColors.primary,
            borderWidth: '1px',
            borderStyle: 'solid'
          }}
        >
          <h3 
            className="text-xl font-bold mb-2"
            style={{ color: themeColors.textLight }}
          >
            {title}
          </h3>
          <p 
            className="text-md font-semibold mb-1"
            style={{ color: themeColors.highlight }}
          >
            {company}
          </p>
          <p 
            className="text-sm mb-3"
            style={{ color: themeColors.textLight }}
          >
            {date}
          </p>
          <p 
            className="mb-4"
            style={{ color: themeColors.textLight }}
          >
            {description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge 
                key={index} 
                className="px-3 py-2 rounded-full text-sm"
                style={{ 
                  backgroundColor: themeColors.accent,
                  color: themeColors.textLight
                }}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ExperienceCard;

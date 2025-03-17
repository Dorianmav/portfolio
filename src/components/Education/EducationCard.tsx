import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

interface EducationCardProps {
  title: string;
  date: string;
  institution: string;
  description: string;
  position: "left" | "right";
}

/**
 * Carte affichant les informations d'un diplôme ou d'une formation
 */
const EducationCard: React.FC<EducationCardProps> = ({
  title,
  date,
  institution,
  description,
  position,
}) => {
  const { themeColors } = useTheme();
  
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
            style={{ backgroundColor: themeColors.accent }}
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
            backgroundColor: themeColors.primary, 
            borderColor: themeColors.secondary,
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
            className="text-sm mb-2"
            style={{ color: themeColors.accent }}
          >
            {date}
          </p>
          <p 
            className="text-md font-semibold mb-3"
            style={{ color: themeColors.textLight }}
          >
            {institution}
          </p>
          <p style={{ color: themeColors.textLight }}>
            {description}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default EducationCard;

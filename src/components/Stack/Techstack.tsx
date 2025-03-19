import React, { useMemo, useState, useEffect } from "react";
import { DiJavascript1, DiNodejs, DiReact, DiJava } from "react-icons/di";
import { SiTypescript, SiPostgresql, SiOcaml, SiMysql, SiRust, SiFlutter, SiLaravel, SiPhp,
   SiAngular, SiGraphql, SiExpress, SiNextdotjs } from "react-icons/si";
import { IconContext } from "react-icons";
import { useTheme } from "../../context/useTheme";
import "./marquee.css";

/**
 * Techstack component that displays a grid of technology icons
 * representing the developer's technical skills with infinite scrolling
 */
const Techstack: React.FC = () => {
  const { themeColors } = useTheme();
  
  const technologies = useMemo(() => [
    { icon: SiTypescript, name: "TypeScript" },
    { icon: DiJavascript1, name: "JavaScript" },
    { icon: DiNodejs, name: "Node.js" },
    { icon: DiReact, name: "React" },
    { icon: SiOcaml, name: "OCaml" },
    { icon: SiFlutter, name: "Flutter" },
    { icon: SiMysql, name: "MySQL" },
    { icon: SiPostgresql, name: "PostgreSQL" },
    { icon: SiRust, name: "Rust" },
    { icon: DiJava, name: "Java" },
    { icon: SiLaravel, name: "Laravel" },
    { icon: SiPhp, name: "PHP" },
    { icon: SiAngular, name: "Angular" },
    { icon: SiGraphql, name: "GraphQL" },
    { icon: SiExpress, name: "Express" },
    { icon: SiNextdotjs, name: "Next.js" },
  ], []);
  
  // Utilisation d'un hook pour détecter si l'écran est mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const iconContextValue = useMemo(() => ({ 
    size: isMobile ? "2.5em" : "3em", 
    color: themeColors.text 
  }), [themeColors.text, isMobile]);
  
  return (
    <IconContext.Provider value={iconContextValue}>
      <div className="marquee-container">
        <div className="marquee">
          {[...technologies, ...technologies].map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="marquee-item"
            >
              <div className="p-3 sm:p-4 border border-purple-300 rounded-lg bg-white/5 shadow-lg overflow-hidden hover:scale-110 transition-all duration-300 flex items-center justify-center">
                <tech.icon title={tech.name} />
              </div>
              <span className="mt-2 text-xs sm:text-sm" style={{ color: themeColors.text }}>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default Techstack;

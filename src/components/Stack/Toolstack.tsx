import React, { useMemo } from "react";
import { SiPostman, SiLinux, SiDocker, SiJira } from "react-icons/si";
import { DiScrum, DiGit } from "react-icons/di";
import { FaBitbucket } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";
import { IconType, IconContext } from "react-icons";
import WindsurfWhiteLogo from "../../assets/windsurf-white-logo.svg";
import { useTheme } from "../../context/useTheme";
import "./marquee.css";

/**
 * Type définition pour les outils
 */
interface Tool {
  icon?: IconType;
  name: string;
  custom?: boolean;
  render?: () => React.ReactNode;
}

/**
 * Toolstack component that displays a grid of tool icons
 * representing the developer's preferred development tools
 * with infinite scrolling in reverse direction
 */
const Toolstack: React.FC = () => {
  const { themeColors, currentPalette } = useTheme();
  
  const tools = useMemo<Tool[]>(() => [
    { icon: SiLinux, name: "Linux" },
    { icon: DiGit, name: "Git" },
    { icon: VscVscode, name: "VS Code" },
    { 
      custom: true, 
      render: () => {
        // Détermine si l'image doit être inversée en fonction du thème actuel
        const shouldInvert = () => {
          if (currentPalette === 1) {
            return themeColors.text === '#333333';
          } else {
            // Pour themes2
            return themeColors.text === '#2D3142';
          }
        };
        
        return (
          <img
            src={WindsurfWhiteLogo}
            alt="Windsurf"
            title="Windsurf"
            style={{ 
              height: "3em", 
              width: "3em",
              opacity: "0.9",
              filter: shouldInvert() ? "invert(100%)" : "none",
              objectFit: "contain" 
            }}
          />
        );
      }, 
      name: "Windsurf" 
    },
    { icon: SiPostman, name: "Postman" },
    { icon: SiDocker, name: "Docker" },
    { icon: DiScrum, name: "Scrum" },
    { icon: SiJira, name: "Jira" },
    { icon: FaBitbucket, name: "Bitbucket" },
  ], [themeColors.text, currentPalette]);
  
  const iconContextValue = useMemo(() => ({ size: "3em", color: themeColors.text }), [themeColors.text]);
  
  // Dupliquer les outils pour assurer un défilement continu
  const duplicatedTools = [...tools, ...tools, ...tools]; // Trois copies pour assurer la continuité
  
  return (
    <IconContext.Provider value={iconContextValue}>
      <div className="marquee-container">
        <div className="marquee-reverse">
          {duplicatedTools.map((tool, index) => (
            <div
              key={`${tool.name}-${index}`}
              className="marquee-item"
            >
              <div className="p-4 border border-purple-300 rounded-lg bg-white/5 shadow-lg overflow-hidden hover:scale-110 transition-all duration-300 flex items-center justify-center">
                {tool.custom && tool.render ? tool.render() : tool.icon && React.createElement(tool.icon, { title: tool.name })}
              </div>
              <span className="mt-2 text-sm" style={{ color: themeColors.text }}>{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default Toolstack;

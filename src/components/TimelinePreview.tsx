import { useState } from "react";
import { FaGraduationCap, FaBriefcase, FaLaptopCode, FaPlay, FaCode } from "react-icons/fa";
import { timelineData } from "../data/timelineDatas";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/useTheme";

const Timeline = () => {
  const { t } = useTranslation();
  const { themeColors } = useTheme();
  
  // État pour l'élément actuellement sélectionné
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  
  // État pour le filtre de catégorie
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Filtrer les éléments selon la catégorie sélectionnée
  const filteredItems = activeFilter === "all" 
    ? timelineData 
    : timelineData.filter(item => item.category === activeFilter);

  // Obtenir l'icône correspondant à la catégorie
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case "education":
        return <FaGraduationCap className="text-xl" />;
      case "experience":
        return <FaBriefcase className="text-xl" />;
      case "project":
        return <FaLaptopCode className="text-xl" />;
      default:
        return null;
    }
  };

  // Obtenir la couleur de fond selon la catégorie
  const getCategoryColor = (category: string) => {
    switch(category) {
      case "education":
        return themeColors.primary;
      case "experience":
        return themeColors.secondary;
      case "project":
        return themeColors.accent;
      default:
        return themeColors.highlight;
    }
  };

  // Gérer le clic sur un élément
  const handleItemClick = (id: number) => {
    setSelectedItem(selectedItem === id ? null : id);
  };

  return (
    <div className="py-10 px-4" style={{ backgroundColor: themeColors.background }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-16" style={{ color: themeColors.text }}>
          {t("timeline.title")}
        </h1>
        
        {/* Filtres */}
        <div className="flex flex-wrap justify-center gap-2 my-10">
          <button 
            className="px-4 py-2 rounded-full flex items-center gap-2"
            style={{ 
              backgroundColor: activeFilter === "all" ? themeColors.text : themeColors.background,
              color: activeFilter === "all" ? themeColors.background : themeColors.text,
              border: `1px solid ${themeColors.text}`
            }}
            onClick={() => setActiveFilter("all")}
          >
            {t("timeline.filters.all")}
          </button>
          <button 
            className="px-4 py-2 rounded-full flex items-center gap-2"
            style={{ 
              backgroundColor: activeFilter === "experience" ? themeColors.secondary : themeColors.background,
              color: activeFilter === "experience" ? themeColors.textLight : themeColors.text,
              border: `1px solid ${themeColors.secondary}`
            }}
            onClick={() => setActiveFilter("experience")}
          >
            <FaBriefcase /> {t("timeline.filters.experience")}
          </button>
          <button 
            className="px-4 py-2 rounded-full flex items-center gap-2"
            style={{ 
              backgroundColor: activeFilter === "education" ? themeColors.primary : themeColors.background,
              color: activeFilter === "education" ? themeColors.textLight : themeColors.text,
              border: `1px solid ${themeColors.primary}`
            }}
            onClick={() => setActiveFilter("education")}
          >
            <FaGraduationCap /> {t("timeline.filters.education")}
          </button>
          <button 
            className="px-4 py-2 rounded-full flex items-center gap-2"
            style={{ 
              backgroundColor: activeFilter === "project" ? themeColors.accent : themeColors.background,
              color: activeFilter === "project" ? themeColors.textLight : themeColors.text,
              border: `1px solid ${themeColors.accent}`
            }}
            onClick={() => setActiveFilter("project")}
          >
            <FaLaptopCode /> {t("timeline.filters.project")}
          </button>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Ligne verticale centrale */}
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-1" 
            style={{ backgroundColor: themeColors.border }}
          ></div>
          
          {/* Éléments de la timeline */}
          <div className="relative">
            {filteredItems.map((item, index) => (
              <div 
                key={item.id}
                className={`mb-8 flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Date */}
                <div className="md:w-1/2 mb-4 md:mb-0 md:px-8">
                  <div className={`${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <span 
                      className="text-lg font-semibold" 
                      style={{ color: themeColors.text }}
                    >
                      {item.date}
                    </span>
                  </div>
                </div>
                
                {/* Point sur la timeline */}
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: getCategoryColor(item.category) }}
                  >
                    {getCategoryIcon(item.category)}
                  </div>
                </div>
                
                {/* Contenu */}
                <div className="md:w-1/2 md:px-7">
                  <button 
                    className="p-4 rounded-lg shadow cursor-pointer w-full text-left"
                    style={{ 
                      backgroundColor: themeColors.card,
                      ...(index % 2 === 0
                        ? {
                            borderLeft: `4px solid ${getCategoryColor(
                              item.category
                            )}`,
                            borderTopRightRadius: "16px",
                            borderBottomRightRadius: "16px",
                          }
                        : {
                            borderRight: `4px solid ${getCategoryColor(
                              item.category
                            )}`,
                            borderTopLeftRadius: "16px",
                            borderBottomLeftRadius: "16px",
                          }),
                      color: themeColors.text,
                    }}
                    onClick={() => handleItemClick(item.id)}
                    aria-expanded={selectedItem === item.id}
                  >
                    <h3 className="text-xl font-bold" style={{ color: themeColors.text }}>{item.title}</h3>
                    <p style={{ color: themeColors.text }}>{item.description}</p>
                    
                    {item.location && (
                      <p className="text-sm mt-1" style={{ color: themeColors.textSecondary }}>
                        📍 {item.location}
                      </p>
                    )}

                    {/* Boutons de démo et de code */}
                    {(item.demoUrl || item.gitUrl) && (
                          <div className="mt-6 flex items-center justify-between">
                            <div>
                              {item.demoUrl && (
                                <a
                                  href={item.demoUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 hover:scale-110 transform"
                                  style={{
                                    backgroundColor: getCategoryColor(item.category),
                                    borderColor: getCategoryColor(item.category),
                                    color: themeColors.textLight,
                                  }}
                                  aria-label={t("timeline.demo")}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <FaPlay className="text-base" />
                                </a>
                              )}
                            </div>
                            
                            <div>
                              {item.gitUrl && (
                                <a
                                  href={item.gitUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 hover:scale-110 transform"
                                  style={{
                                    backgroundColor: getCategoryColor(item.category),
                                    borderColor: getCategoryColor(item.category),
                                    color: themeColors.textLight,
                                  }}
                                  aria-label={t("timeline.git")}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <FaCode className="text-base" />
                                </a>
                              )}
                            </div>
                          </div>
                        )}
                    
                    {/* Détails affichés lorsqu'un élément est sélectionné */}
                    {selectedItem === item.id && (
                      <div className="mt-4 pt-4" style={{ borderTop: `1px solid ${themeColors.border}` }}>
                        <h4 className="font-semibold mb-2" style={{ color: themeColors.text }}>
                          {t("timeline.details")}:
                        </h4>
                        <ul className="list-disc list-inside space-y-1">
                          {item.details.map((detail, i) => (
                            <li key={`${item.id}-detail-${i}`} style={{ color: themeColors.text }}>{detail}</li>
                          ))}
                        </ul>
                        
                        {item.technologies && (
                          <div className="mt-4">
                            <h4 className="font-semibold mb-2" style={{ color: themeColors.text }}>
                              {t("timeline.technologies")}:
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {item.technologies.map((tech, i) => (
                                <span 
                                  key={`${item.id}-tech-${i}`}
                                  className="px-2 py-1 rounded-full text-sm"
                                  style={{ 
                                    backgroundColor: themeColors.highlight,
                                    color: themeColors.text
                                  }}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </button>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;

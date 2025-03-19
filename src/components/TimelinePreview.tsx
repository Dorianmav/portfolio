import { useState, useEffect, useMemo } from "react";
import { timelineData } from "../data/timelineDatas";
import { TimelineItem } from "../types/TimelineItem";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/useTheme";
import { FaGraduationCap, FaBriefcase, FaCode, FaExternalLinkAlt, FaPlay, FaLaptopCode, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Fonction pour trier les éléments de la timeline par date du plus récent au plus ancien
 * @param items Les éléments de la timeline à trier
 * @returns Les éléments triés
 */
const sortTimelineByDate = (items: TimelineItem[]): TimelineItem[] => {
  const currentYear = new Date().getFullYear();

  return [...items].sort((a, b) => {
    // Extraire l'année la plus récente de chaque date (format: "2023 - 2025" ou "2023" ou "2024 - Présent")
    const getLatestYear = (dateStr: string): number => {
      // Si la date contient "Présent", considérer l'année actuelle
      if (
        dateStr.toLowerCase().includes("présent") ||
        dateStr.toLowerCase().includes("present")
      ) {
        return currentYear;
      }

      // Sinon extraire les années numériques
      const years = dateStr
        .split(/\s*-\s*/)
        .map((part) => {
          const yearRegex = /\d{4}/;
          const match = yearRegex.exec(part);
          return match ? parseInt(match[0]) : 0;
        })
        .filter((year) => year > 0);

      return years.length > 0 ? Math.max(...years) : 0;
    };

    const yearA = getLatestYear(a.date);
    const yearB = getLatestYear(b.date);

    // Trier du plus récent au plus ancien
    return yearB - yearA;
  });
};

const Timeline = () => {
  const { t } = useTranslation();
  const { themeColors } = useTheme();

  // États pour la gestion de la timeline
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [timelineMode, setTimelineMode] = useState<"normal" | "interactive">("normal");
  const [currentYearIndex, setCurrentYearIndex] = useState<number>(0);
  const [timelineAnimation, setTimelineAnimation] = useState<boolean>(false);

  // Trier les données de la timeline pour le mode normal
  const sortedTimelineData = useMemo(() => sortTimelineByDate(timelineData), []);

  // Filtrer les éléments selon la catégorie sélectionnée pour le mode normal
  const filteredItems = useMemo(() => 
    activeFilter === "all"
      ? sortedTimelineData
      : sortedTimelineData.filter((item) => item.category === activeFilter),
    [activeFilter, sortedTimelineData]
  );

  // Analyser et trier les données par année pour le mode interactif
  const timelineByYear = useMemo(() => {
    const currentYear = new Date().getFullYear();
    
    // Extraire toutes les années uniques des événements
    const allYears = new Set<number>();
    
    // Fonction pour extraire les années d'une chaîne de date
    const extractYears = (dateStr: string): number[] => {
      const years: number[] = [];
      
      if (dateStr.toLowerCase().includes("présent") || dateStr.toLowerCase().includes("present")) {
        years.push(currentYear);
      }
      
      const yearMatches = dateStr.match(/\d{4}/g);
      if (yearMatches) {
        yearMatches.forEach(year => years.push(parseInt(year)));
      }
      
      return years;
    };
    
    // Collecter toutes les années
    timelineData.forEach(item => {
      const years = extractYears(item.date);
      years.forEach(year => allYears.add(year));
    });
    
    // Convertir en array et trier
    const sortedYears = Array.from(allYears).sort((a, b) => a - b);
    
    // Organiser les événements par année
    const eventsByYear = sortedYears.map(year => {
      const yearEvents = timelineData.filter(item => {
        const itemYears = extractYears(item.date);
        return itemYears.includes(year) || 
               (itemYears.length === 2 && year >= itemYears[0] && year <= itemYears[1]);
      });
      
      // Trier les événements au sein d'une même année par ordre alphabétique du titre
      // Créer une copie du tableau avant de le trier pour éviter de muter l'original
      const sortedEvents = [...yearEvents].sort((a, b) => a.title.localeCompare(b.title));
      
      return {
        year,
        events: sortedEvents
      };
    });
    
    return eventsByYear;
  }, []);

  // Filtrer les événements par catégorie pour le mode interactif
  const filteredTimelineByYear = useMemo(() => {
    if (activeFilter === "all") return timelineByYear;
    
    return timelineByYear.map(yearData => ({
      year: yearData.year,
      events: yearData.events.filter(event => event.category === activeFilter)
    })).filter(yearData => yearData.events.length > 0);
  }, [timelineByYear, activeFilter]);

  // Fonction pour naviguer entre les années
  const navigateYear = (direction: "next" | "prev") => {
    if (direction === "next" && currentYearIndex < filteredTimelineByYear.length - 1) {
      setCurrentYearIndex(currentYearIndex + 1);
    } else if (direction === "prev" && currentYearIndex > 0) {
      setCurrentYearIndex(currentYearIndex - 1);
    }
  };

  // Lancer l'animation automatique de la timeline
  const startTimelineAnimation = () => {
    setTimelineAnimation(true);
    setCurrentYearIndex(0);
  };

  // Arrêter l'animation
  const stopTimelineAnimation = () => {
    setTimelineAnimation(false);
  };

  // Animation automatique
  useEffect(() => {
    if (!timelineAnimation) return;
    
    const interval = setInterval(() => {
      if (currentYearIndex < filteredTimelineByYear.length - 1) {
        setCurrentYearIndex(prev => prev + 1);
      } else {
        stopTimelineAnimation();
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [timelineAnimation, currentYearIndex, filteredTimelineByYear.length]);

  // S'assurer que l'index courant est valide quand filteredTimelineByYear change
  useEffect(() => {
    if (filteredTimelineByYear.length > 0 && currentYearIndex >= filteredTimelineByYear.length) {
      setCurrentYearIndex(filteredTimelineByYear.length - 1);
    }
  }, [filteredTimelineByYear, currentYearIndex]);

  // Obtenir l'icône correspondant à la catégorie
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "education": return <FaGraduationCap className="text-xl" />;
      case "experience": return <FaBriefcase className="text-xl" />;
      case "project": return <FaLaptopCode className="text-xl" />;
      default: return null;
    }
  };

  // Obtenir la couleur de fond selon la catégorie
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "education": return themeColors.primary;
      case "experience": return themeColors.secondary;
      case "project": return themeColors.accent;
      default: return themeColors.highlight;
    }
  };

  // Gérer le clic sur un élément
  const handleItemClick = (item: TimelineItem) => {
    const hasDetails = item.details && item.details.length > 0;
    const hasTechnologies = item.technologies && item.technologies.length > 0;

    if (hasDetails || hasTechnologies) {
      setSelectedItem(selectedItem === item.id ? null : item.id);
    }
  };

  // Afficher le mode standard ou le mode interactif
  const renderTimelineContent = () => {
    if (timelineMode === "interactive" && filteredTimelineByYear.length > 0) {
      const currentYearData = filteredTimelineByYear[currentYearIndex];
      
      // Si aucune donnée n'est disponible ou si l'index est invalide, afficher un message
      if (!currentYearData) {
        return (
          <div className="text-center py-8" style={{ color: themeColors.textSecondary }}>
            {t("timeline.noEvents", "Aucun événement à afficher")}
          </div>
        );
      }
      
      return (
        <div className="relative mt-6 sm:mt-10">
          {/* Navigation entre les années */}
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            <button 
              onClick={() => navigateYear("prev")}
              disabled={currentYearIndex === 0}
              className="p-1.5 sm:p-2 rounded-full disabled:opacity-30"
              style={{ backgroundColor: themeColors.border }}
            >
              <FaChevronLeft className="text-sm sm:text-base" />
            </button>
            
            <div className="text-2xl sm:text-3xl font-bold" style={{ color: themeColors.text }}>
              {currentYearData.year}
            </div>
            
            <button 
              onClick={() => navigateYear("next")}
              disabled={currentYearIndex === filteredTimelineByYear.length - 1}
              className="p-1.5 sm:p-2 rounded-full disabled:opacity-30"
              style={{ backgroundColor: themeColors.border }}
            >
              <FaChevronRight className="text-sm sm:text-base" />
            </button>
          </div>
          
          {/* Indicateur de progression */}
          <div className="w-full h-1.5 sm:h-2 bg-gray-200 rounded-full mb-6 sm:mb-10">
            <div 
              className="h-full rounded-full transition-all duration-300"
              style={{ 
                width: `${((currentYearIndex + 1) / filteredTimelineByYear.length) * 100}%`,
                backgroundColor: themeColors.accent 
              }}
            ></div>
          </div>
          
          {/* Événements de l'année courante */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentYearData.year}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 sm:space-y-6"
            >
              {currentYearData.events.length > 0 ? (
                currentYearData.events.map((item) => (
                  <motion.div
                    key={item.id}
                    className="p-3 sm:p-4 rounded-lg shadow-md"
                    style={{ backgroundColor: themeColors.card }}
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div 
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: getCategoryColor(item.category) }}
                      >
                        {getCategoryIcon(item.category)}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-bold" style={{ color: themeColors.text }}>
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm mt-1" style={{ color: themeColors.text }}>
                          {item.description}
                        </p>
                        <p className="text-xs sm:text-sm font-semibold mt-1 sm:mt-2" style={{ color: themeColors.textSecondary }}>
                          {item.date}
                          {item.location && <span> • {item.location}</span>}
                        </p>
                        
                        {/* Technologies utilisées */}
                        {item.technologies && item.technologies.length > 0 && (
                          <div className="mt-2 sm:mt-3 flex flex-wrap gap-1 sm:gap-2">
                            {item.technologies.map((tech, i) => (
                              <span
                                key={`${item.id}-tech-${i}`}
                                className="px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs"
                                style={{
                                  backgroundColor: themeColors.highlight,
                                  color: themeColors.text,
                                }}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {/* Liens externes */}
                        <div className="mt-2 sm:mt-3 flex gap-2 sm:gap-3">
                          {item.demoUrl && (
                            <a 
                              href={item.demoUrl} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="flex items-center gap-1 text-xs sm:text-sm"
                              style={{ color: getCategoryColor(item.category) }}
                            >
                              <FaPlay size={10} className="sm:text-xs" /> Demo
                            </a>
                          )}
                          
                          {item.gitUrl && (
                            <a 
                              href={item.gitUrl} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="flex items-center gap-1 text-xs sm:text-sm"
                              style={{ color: getCategoryColor(item.category) }}
                            >
                              <FaCode size={10} className="sm:text-xs" /> Code
                            </a>
                          )}
                          
                          {item.link && (
                            <a 
                              href={item.link} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="flex items-center gap-1 text-xs sm:text-sm"
                              style={{ color: getCategoryColor(item.category) }}
                            >
                              <FaExternalLinkAlt size={10} className="sm:text-xs" /> Link
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Détails supplémentaires */}
                    {item.details && item.details.length > 0 && (
                      <button 
                        className="w-full text-left mt-2 pt-2 sm:mt-3 sm:pt-3 text-xs sm:text-sm"
                        style={{ borderTop: `1px solid ${themeColors.border}` }}
                        onClick={() => handleItemClick(item)}
                      >
                        <span style={{ color: themeColors.accent }}>
                          {selectedItem === item.id ? "Masquer les détails" : "Voir les détails"}
                        </span>
                        
                        {selectedItem === item.id && (
                          <motion.ul 
                            className="list-disc list-inside space-y-1 mt-2"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            transition={{ duration: 0.3 }}
                          >
                            {item.details?.map((detail, i) => (
                              <li key={`${item.id}-detail-${i}`} className="text-xs sm:text-sm" style={{ color: themeColors.text }}>
                                {detail}
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </button>
                    )}
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-6 sm:py-8" style={{ color: themeColors.textSecondary }}>
                  {t("timeline.noEvents")}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      );
    }
    
    // Mode classique - Restauration de l'affichage précédent
    return (
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
              className={`mb-6 sm:mb-8 flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Date - visible uniquement sur desktop */}
              <div className="hidden md:block md:w-1/2 mb-2 md:mb-0 md:px-8">
                <div
                  className={`${
                    index % 2 === 0 ? "md:text-right" : "md:text-left"
                  }`}
                >
                  <span className="text-base sm:text-lg font-semibold" style={{ color: themeColors.text }}>
                    {item.date}
                  </span>
                </div>
              </div>

              {/* Point sur la timeline */}
              <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: getCategoryColor(item.category) }}>
                  {getCategoryIcon(item.category)}
                </div>
              </div>

              {/* Contenu */}
              <div className="md:w-1/2 md:px-7 w-full px-4 mt-8 md:mt-0">
                {/* Date - visible uniquement sur mobile */}
                <div className="md:hidden text-center mb-3">
                  <span className="text-base font-semibold" style={{ color: themeColors.text }}>
                    {item.date}
                  </span>
                </div>
                
                <button
                  className={`p-3 sm:p-4 rounded-lg shadow cursor-pointer w-full text-left ${
                    item.details || item.technologies
                      ? "cursor-pointer hover:shadow-lg"
                      : ""
                  } transition-all duration-300`}
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
                  onClick={() => handleItemClick(item)}
                >
                  <h3 className="text-lg sm:text-xl font-bold" style={{ color: themeColors.text }}>
                    {item.title}
                  </h3>
                  
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noreferrer" className="flex items-center text-xs sm:text-sm mt-1" style={{
                      color: themeColors.text,
                      textDecoration: "underline",
                    }}
                    >
                      <FaExternalLinkAlt className="mr-1 sm:mr-2 text-xs" />
                      {item.description}
                    </a>
                  ) : (
                    <p className="text-xs sm:text-sm mt-1" style={{ color: themeColors.text }}>
                      {item.description}
                    </p>
                  )}

                  {item.location && (
                    <p className="text-xs sm:text-sm mt-1" style={{ color: themeColors.textSecondary }}>
                      📍 {item.location}
                    </p>
                  )}

                  {/* Boutons de démo et de code */}
                  {(item.demoUrl || item.gitUrl) && (
                    <div className="mt-4 sm:mt-6 flex items-center justify-between">
                      <div>
                        {item.demoUrl && (
                          <a href={item.demoUrl} target="_blank" rel="noreferrer" 
                          className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-all duration-300 hover:scale-110 transform" 
                          style={{
                              backgroundColor: getCategoryColor(
                                item.category
                              ),
                              borderColor: getCategoryColor(item.category),
                              color: themeColors.textLight,
                            }}
                            aria-label={t("timeline.demo")}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FaPlay className="text-sm sm:text-base" />
                          </a>
                        )}
                      </div>

                      <div>
                        {item.gitUrl && (
                          <a href={item.gitUrl} target="_blank" rel="noreferrer" 
                          className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-all duration-300 hover:scale-110 transform"
                          style={{
                              backgroundColor: getCategoryColor(
                                item.category
                              ),
                              borderColor: getCategoryColor(item.category),
                              color: themeColors.textLight,
                            }}
                            aria-label={t("timeline.git")}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FaCode className="text-sm sm:text-base" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Détails affichés lorsqu'un élément est sélectionné */}
                  {selectedItem === item.id && (
                    <div className="mt-3 pt-3 sm:mt-4 sm:pt-4" style={{ borderTop: `1px solid ${themeColors.border}` }}>
                      {item.details && item.details.length > 0 && (
                        <>
                          <h4 className="text-sm sm:text-md font-semibold mb-2" style={{ color: themeColors.text }}>
                            {t("timeline.details")}:
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm">
                            {item.details?.map((detail, i) => (
                              <li key={`${item.id}-detail-${i}`} className="text-xs sm:text-sm" style={{ color: themeColors.text }}>
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}

                      {item.technologies && (
                        <div className="mt-3 sm:mt-4">
                          <h4 className="text-sm sm:text-md font-semibold mb-2" style={{ color: themeColors.text }}>
                            {t("timeline.technologies")}:
                          </h4>
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            {item.technologies.map((tech, i) => (
                              <span key={`${item.id}-tech-${i}`} className="px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs sm:text-sm" 
                                style={{
                                  backgroundColor: themeColors.highlight,
                                  color: themeColors.text,
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
    );
  };

  return (
    <div
      className="py-10 px-4 md:px-8 lg:px-12 xl:px-16"
      style={{ backgroundColor: themeColors.background }}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8" style={{ color: themeColors.text }}>
          {t("timeline.title")}
        </h1>

        {/* Sélection du mode de visualisation */}
        <div className="flex justify-center mb-8">
          <fieldset className="inline-flex rounded-md shadow-sm">
            <button
              className="px-4 py-2 text-sm font-medium rounded-l-lg"
              style={{
                backgroundColor: timelineMode === "normal" ? themeColors.accent : themeColors.background,
                color: timelineMode === "normal" ? themeColors.textLight : themeColors.text,
                border: `1px solid ${themeColors.accent}`
              }}
              onClick={() => setTimelineMode("normal")}
            >
              {t("timeline.standardView")}
            </button>
            <button
              className="px-4 py-2 text-sm font-medium rounded-r-lg"
              style={{
                backgroundColor: timelineMode === "interactive" ? themeColors.accent : themeColors.background,
                color: timelineMode === "interactive" ? themeColors.textLight : themeColors.text,
                border: `1px solid ${themeColors.accent}`
              }}
              onClick={() => setTimelineMode("interactive")}
            >
              {t("timeline.interactiveView")}
            </button>
          </fieldset>
        </div>

        {/* Contrôles d'animation - seulement en mode interactif */}
        {timelineMode === "interactive" && (
          <div className="flex justify-center mb-6 sm:mb-8">
            <button
              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm"
              style={{
                backgroundColor: timelineAnimation ? themeColors.highlight : themeColors.accent,
                color: themeColors.textLight
              }}
              onClick={timelineAnimation ? stopTimelineAnimation : startTimelineAnimation}
            >
              {timelineAnimation ? t("timeline.stopAnimation", "Arrêter l'animation") : t("timeline.startAnimation", "Démarrer l'animation")}
            </button>
          </div>
        )}

        {/* Filtres */}
        <div className="flex flex-wrap justify-center gap-2 my-8">
          <button
            className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full flex items-center gap-1 sm:gap-2 text-sm"
            style={{
              backgroundColor:
                activeFilter === "all"
                  ? themeColors.text
                  : themeColors.background,
              color:
                activeFilter === "all"
                  ? themeColors.background
                  : themeColors.text,
              border: `1px solid ${themeColors.text}`,
            }}
            onClick={() => setActiveFilter("all")}
          >
            {t("timeline.filters.all")}
          </button>
          <button
            className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full flex items-center gap-1 sm:gap-2 text-sm"
            style={{
              backgroundColor:
                activeFilter === "experience"
                  ? themeColors.secondary
                  : themeColors.background,
              color:
                activeFilter === "experience"
                  ? themeColors.textLight
                  : themeColors.text,
              border: `1px solid ${themeColors.secondary}`,
            }}
            onClick={() => setActiveFilter("experience")}
          >
            <FaBriefcase className="text-sm sm:text-xl" /> {t("timeline.filters.experience")}
          </button>
          <button
            className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full flex items-center gap-1 sm:gap-2 text-sm"
            style={{
              backgroundColor:
                activeFilter === "education"
                  ? themeColors.primary
                  : themeColors.background,
              color:
                activeFilter === "education"
                  ? themeColors.textLight
                  : themeColors.text,
              border: `1px solid ${themeColors.primary}`,
            }}
            onClick={() => setActiveFilter("education")}
          >
            <FaGraduationCap className="text-sm sm:text-xl" /> {t("timeline.filters.education")}
          </button>
          <button
            className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full flex items-center gap-1 sm:gap-2 text-sm"
            style={{
              backgroundColor:
                activeFilter === "project"
                  ? themeColors.accent
                  : themeColors.background,
              color:
                activeFilter === "project"
                  ? themeColors.textLight
                  : themeColors.text,
              border: `1px solid ${themeColors.accent}`,
            }}
            onClick={() => setActiveFilter("project")}
          >
            <FaLaptopCode className="text-sm sm:text-xl" /> {t("timeline.filters.project")}
          </button>
        </div>

        {/* Contenu de la timeline */}
        {renderTimelineContent()}
      </div>
    </div>
  );
};

export default Timeline;
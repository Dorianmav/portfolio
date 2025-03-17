import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiArrowNarrowRight } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import "./Projects.css";
import { useProjectsContext } from "../../context/ProjectsContext";
import { Project } from "../../types/Project";
import SingleProject from "./SingleProject/SingleProject";
import { themeColors } from "../../theme/colors";

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const { projects } = useProjectsContext();
  const [isHovered, setIsHovered] = useState(false);

  const viewAllBtnStyle = {
    color: themeColors.textLight,
    backgroundColor: themeColors.primary,
    transition: "color 0.2s",
    borderRadius: "45px",
  };
  
  const viewAllBtnHoverStyle = {
    color: "#333333",
    backgroundColor: themeColors.primary,
  };
  
  const viewArrStyle = {
    color: themeColors.textLight,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    width: "40px",
    height: "40px",
    padding: "0.5rem",
    fontSize: "1.05rem",
    borderRadius: "50%",
    cursor: "pointer",
    transition: "background-color 0.2s",
  };
  
  const viewArrHoverStyle = {
    color: themeColors.textLight,
    backgroundColor: themeColors.secondary,
  };

  return (
    <>
      {projects.length > 0 && (
        <div
          className="flex flex-col items-center justify-start min-h-screen overflow-hidden p-4 sm:p-6 md:p-8"
          style={{ backgroundColor: themeColors.background }}
          id="projects"
        >
          <div className="w-full flex items-center justify-center my-4">
            <h1
              className="mb-6 md:mb-10 text-3xl md:text-4xl lg:text-5xl font-bold font-sans"
              style={{ color: themeColors.primary }}
            >
              {t("projects.subtitle")}
            </h1>
          </div>

          <div className="w-full flex flex-col items-center justify-center">
            <div className="w-full md:w-[95%] mx-auto flex flex-wrap justify-center gap-8 md:gap-10 lg:gap-12">
              {projects.slice(0, 3).map((project: Project) => (
                <div
                  key={project.id.toString()}
                  className="w-full sm:w-[85%] md:w-[45%] lg:w-[40%] xl:w-[30%] mb-6"
                >
                  <SingleProject
                    key={project.id.toString()}
                    id={project.id.toString()}
                    name={project.title}
                    desc={project.description ?? ""}
                    tags={project.technologies ?? []}
                    code={project.githubLink ?? "#"}
                    demo={project.demoLink ?? "#"}
                    image={project.img ?? ""}
                    variant="default"
                  />
                </div>
              ))}
            </div>

            {projects.length > 3 && (
              <div className="w-full p-4 sm:p-6 md:p-8 flex items-center justify-center sm:justify-end mt-4 sm:mt-6 md:mt-8">
                <Link to="/projects" style={{ textDecoration: 'none' }}>
                  <button 
                    className="flex items-center justify-between w-[150px] h-12 rounded-full text-base font-medium pl-6 pr-1 outline-none border-none cursor-pointer"
                    style={isHovered ? { ...viewAllBtnStyle, ...viewAllBtnHoverStyle } : viewAllBtnStyle}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    {t("projects.viewAll")}
                    <div 
                      className="flex items-center justify-center ml-2"
                      style={isHovered ? { ...viewArrStyle, ...viewArrHoverStyle } : viewArrStyle}
                    >
                      <HiArrowNarrowRight />
                    </div>
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;

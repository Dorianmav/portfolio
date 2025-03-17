import React, { useState } from "react";
import { FaPlay, FaCode } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";
import { themeColors } from "../../../theme/colors";

interface SingleProjectProps {
  id: string;
  name: string;
  desc: string;
  tags: string[];
  code: string;
  demo: string;
  image: string;
  variant?: "grid" | "default";
}

// Fonction pour diviser les tags en groupes
const chunkTagsIntoGroups = (tags: string[], chunkSize: number) => {
  const chunkedTags = [];

  for (let i = 0; i < tags.length; i += chunkSize) {
    chunkedTags.push(tags.slice(i, i + chunkSize));
  }

  return chunkedTags;
};

// Fonction pour générer les classes du conteneur
const getContainerClasses = (variant: "grid" | "default") => {
  const containerClasses =
    "w-full rounded-lg shadow-lg flex flex-col items-center justify-center relative cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl";

  if (variant === "grid") {
    return (
      containerClasses +
      " h-[400px] p-4 2xl:h-[380px] xl:h-[360px] lg:h-[340px] md:h-[320px]"
    );
  }

  return (
    containerClasses +
    " max-w-[550px] h-[460px] p-6 mx-auto lg:max-w-[450px] lg:h-[420px] md:max-w-[400px] md:h-[400px] sm:max-w-[350px] sm:h-[380px] max-sm:max-w-[300px] max-sm:h-[360px] max-[400px]:max-w-[280px] max-[400px]:h-[340px]"
  );
};

// Fonction pour générer les classes du titre
const getTitleClasses = (variant: "grid" | "default", isHovered: boolean) => {
  const titleClasses = "transition-opacity duration-500";

  if (variant === "grid") {
    return `${titleClasses} text-sm md:text-xs font-normal mb-0 px-2 text-center w-full ${
      isHovered ? "opacity-0" : "opacity-100"
    }`;
  }

  return `${titleClasses} text-2xl mb-1 font-semibold text-center lg:text-xl md:text-lg sm:text-base ${
    isHovered ? "opacity-0" : "opacity-100"
  }`;
};

// Fonction pour générer les classes de la description
const getDescriptionClasses = (
  variant: "grid" | "default",
  isHovered: boolean
) => {
  const descriptionClasses = `absolute left-0 top-[10%] w-[95%] rounded-r-xl overflow-y-auto transition-transform duration-700 ease-in-out transform ${
    isHovered ? "translate-x-[-2%]" : "-translate-x-full"
  }`;

  if (variant === "grid") {
    return descriptionClasses + " h-[160px] p-3 sm:h-[140px]";
  }

  return descriptionClasses + " h-[180px] p-4 sm:h-[160px]";
};

// Fonction pour générer les classes du conteneur de tags
const getTagsContainerClasses = (
  variant: "grid" | "default",
  isHovered: boolean
) => {
  const tagsContainerClasses = `absolute bottom-[16px] right-0 flex flex-col rounded-l-lg transition-transform duration-500 ease-in-out transform ${
    isHovered ? "translate-x-0" : "translate-x-full"
  }`;

  if (variant === "grid") {
    return tagsContainerClasses + " w-[140px] gap-1 p-2";
  }

  return tagsContainerClasses + " w-[160px] gap-2 p-3";
};

const SingleProject: React.FC<SingleProjectProps> = ({
  id,
  name,
  desc,
  tags,
  code,
  demo,
  image,
  variant = "default",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Calculer les groupes de tags
  const chunkSize = variant === "grid" ? 3 : 4;
  const tagGroups = chunkTagsIntoGroups(tags, chunkSize);

  // Récupérer les classes
  const containerClasses = getContainerClasses(variant);
  const titleClasses = getTitleClasses(variant, isHovered);
  const descriptionClasses = getDescriptionClasses(variant, isHovered);
  const tagsContainerClasses = getTagsContainerClasses(variant, isHovered);

  // Autres classes conditionnelles
  const buttonSize = variant === "grid" ? "w-9 h-9" : "w-10 h-10";
  const iconSize = variant === "grid" ? "text-sm" : "text-base";
  const codeTranslate =
    variant === "grid" ? "translate-x-[-140px]" : "translate-x-[-160px]";
  const descTextClasses =
    variant === "grid" ? "leading-tight text-sm" : "leading-tight";
  const tagClasses =
    variant === "grid"
      ? "font-medium text-[10px] py-1 px-1.5 rounded-md"
      : "font-medium text-xs py-1 px-2 rounded-md";

  // Ajuster l'espace image par rapport au titre
  const imageClasses =
    variant === "grid"
      ? `w-full h-[60%] object-cover rounded transition-all duration-500 mt-1 ${
          isHovered ? "opacity-0" : "opacity-100"
        }`
      : `w-full h-3/5 object-cover rounded transition-all duration-500 ${
          isHovered ? "opacity-0" : "opacity-100"
        }`;

  return (
    <Fade direction="up" triggerOnce>
      <article
        key={id}
        className={containerClasses}
        style={{ backgroundColor: themeColors.primary }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-labelledby={`${name.replace(" ", "-").toLowerCase()}`}
      >
        {/* Contenu principal */}
        <div className="flex flex-col items-center justify-start w-full h-full z-10">
          {variant === "grid" ? (
            <h3
              id={name.replace(" ", "-").toLowerCase()}
              className={`${titleClasses} mt-0 pt-0`} // Ajout de mt-0 pt-0
              style={{ color: themeColors.textLight }}
            >
              {name}
            </h3>
          ) : (
            <h2
              id={name.replace(" ", "-").toLowerCase()}
              className={`${titleClasses} mt-0 pt-0`} // Ajout de mt-0 pt-0
              style={{ color: themeColors.textLight }}
            >
              {name}
            </h2>
          )}
          <img src={image} alt={name} className={imageClasses} />
          <div className="flex items-center justify-between w-full mt-3 z-20 relative">
            {/* Bouton Demo - fixe */}
            <a
              href={demo}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center justify-center ${buttonSize} rounded-full border-2 transition-all duration-300 hover:scale-110 transform`}
              style={{
                borderColor: themeColors.textLight,
                color: themeColors.textLight,
              }}
              aria-labelledby={`${name.replace(" ", "-").toLowerCase()} ${name
                .replace(" ", "-")
                .toLowerCase()}-demo`}
            >
              <FaPlay
                id={`${name.replace(" ", "-").toLowerCase()}-demo`}
                className={iconSize}
                aria-label="Demo"
              />
            </a>

            {/* Bouton Code - glisse avec les tags */}
            <a
              href={code}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center justify-center ${buttonSize} rounded-full border-2 transition-all duration-500 hover:scale-110 transform ${
                isHovered ? codeTranslate : ""
              }`}
              style={{
                borderColor: themeColors.textLight,
                color: themeColors.textLight,
              }}
              aria-labelledby={`${name.replace(" ", "-").toLowerCase()} ${name
                .replace(" ", "-")
                .toLowerCase()}-code`}
            >
              <FaCode
                id={`${name.replace(" ", "-").toLowerCase()}-code`}
                className={iconSize}
                aria-label="Code"
              />
            </a>
          </div>
        </div>

        {/* Description - positionnée plus bas */}
        <div
          className={descriptionClasses}
          style={{
            background: themeColors.secondary,
            color: themeColors.textLight,
          }}
        >
          <p className={descTextClasses}>{desc}</p>
        </div>

        {/* Tags - positionnés au niveau du bouton code, sans scrollbar */}
        <div
          className={tagsContainerClasses}
          style={{
            background: themeColors.accent,
            color: themeColors.text,
          }}
        >
          {tagGroups.map((group, groupIndex) => (
            <div
              key={`group-${groupIndex}`}
              className="flex flex-row gap-1 flex-wrap"
            >
              {group.map((tag, i) => (
                <span
                  key={`${id}-${tag}-${i}`}
                  className={tagClasses}
                  style={{
                    backgroundColor: themeColors.highlight,
                    color: themeColors.text,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          ))}
        </div>
      </article>
    </Fade>
  );
};

export default SingleProject;

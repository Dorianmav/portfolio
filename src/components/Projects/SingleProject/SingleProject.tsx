import React from 'react';
import { FaPlay, FaCode } from 'react-icons/fa';
import { Fade } from 'react-awesome-reveal';
import './SingleProject.css';
import { themeColors } from '../../../theme/colors';

interface SingleProjectProps {
  id: string;
  name: string;
  desc: string;
  tags: string[];
  code: string;
  demo: string;
  image: string;
}

const SingleProject: React.FC<SingleProjectProps> = ({ 
  id, 
  name, 
  desc, 
  tags, 
  code, 
  demo, 
  image 
}) => {
  return (
    <Fade direction="up" triggerOnce>
      <div
        key={id}
        className="singleProject"
        style={{ backgroundColor: themeColors.primary }}
      >
        <div className="projectContent">
          <h2
            id={name.replace(' ', '-').toLowerCase()}
            style={{ color: themeColors.textLight }}
          >
            {name}
          </h2>
          <img src={image} alt={name} />
          <div className="project--showcaseBtn">
            <a
              href={demo}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                borderRadius: 50,
                border: `2px solid ${themeColors.textLight}`,
                color: themeColors.textLight,
                transition: 'all 0.2s',
              }}
              aria-labelledby={`${name.replace(' ', '-').toLowerCase()} ${name.replace(' ', '-').toLowerCase()}-demo`}
            >
              <FaPlay
                id={`${name.replace(' ', '-').toLowerCase()}-demo`}
                style={{ fontSize: '1.1rem' }}
                aria-label="Demo"
              />
            </a>
            <a
              href={code}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                borderRadius: 50,
                border: `2px solid ${themeColors.textLight}`,
                color: themeColors.textLight,
                transition: 'all 0.2s',
              }}
              aria-labelledby={`${name.replace(' ', '-').toLowerCase()} ${name.replace(' ', '-').toLowerCase()}-code`}
            >
              <FaCode
                id={`${name.replace(' ', '-').toLowerCase()}-code`}
                style={{ fontSize: '1.1rem' }}
                aria-label="Code"
              />
            </a>
          </div>
        </div>
        
        <p
          className="project--desc"
          style={{
            background: themeColors.secondary,
            color: themeColors.textLight,
          }}
        >
          {desc}
        </p>
        
        <div
          className="project--lang"
          style={{
            background: themeColors.accent,
            color: themeColors.text,
          }}
        >
          {tags.map((tag, i) => (
            <span 
              key={`${id}-${tag}-${i}`}
              style={{
                backgroundColor: themeColors.highlight,
                color: themeColors.text,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Fade>
  );
};

export default SingleProject;

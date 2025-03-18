import React, { useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import { SiPostman, SiLinux, SiDocker, SiJira } from "react-icons/si";
import { DiScrum, DiGit } from "react-icons/di";
import { FaBitbucket } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";
import WindsurfWhiteLogo from "../../assets/windsurf-white-logo.svg";
import { useTheme } from "../../context/ThemeContext";
import { IconContext } from "react-icons";

/**
 * Toolstack component that displays a grid of tool icons
 * representing the developer's preferred development tools
 */
const Toolstack: React.FC = () => {
  const { themeColors } = useTheme();
  return (
    <IconContext.Provider value={useMemo(() => ({ color: themeColors.text }), [themeColors.text])}>
      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        <Col
          xs={4}
          md={2}
          className="text-7xl m-4 p-3 opacity-90 border border-purple-300/60 text-center rounded-md shadow-lg shadow-purple-900/20 overflow-hidden transition-all duration-400 hover:scale-105 hover:border-2 hover:border-purple-400/90 flex items-center justify-center"
        >
          <SiLinux title="Linux" />
        </Col>
        <Col
          xs={4}
          md={2}
          className="text-7xl m-4 p-3 opacity-90 border border-purple-300/60 text-center rounded-md shadow-lg shadow-purple-900/20 overflow-hidden transition-all duration-400 hover:scale-105 hover:border-2 hover:border-purple-400/90 flex items-center justify-center"
        >
          <DiGit title="Git" />
        </Col>
        <Col
          xs={4}
          md={2}
          className="text-7xl m-4 p-3 opacity-90 border border-purple-300/60 text-center rounded-md shadow-lg shadow-purple-900/20 overflow-hidden transition-all duration-400 hover:scale-105 hover:border-2 hover:border-purple-400/90 flex items-center justify-center"
        >
          <VscVscode title="VS Code" />
        </Col>
        <Col
          xs={4}
          md={2}
          className="text-7xl m-4 p-3 opacity-90 border border-purple-300/60 text-center rounded-md shadow-lg shadow-purple-900/20 overflow-hidden transition-all duration-400 hover:scale-105 hover:border-2 hover:border-purple-400/90 flex items-center justify-center"
        >
          <img
            src={WindsurfWhiteLogo}
            alt="Windsurf"
            title="Windsurf"
            style={{ 
              maxHeight: "1em", 
              opacity: "0.9",
              filter: themeColors.text === '#333333' ? "invert(100%)" : "none" 
            }}
          />
        </Col>
        <Col
          xs={4}
          md={2}
          className="text-7xl m-4 p-3 opacity-90 border border-purple-300/60 text-center rounded-md shadow-lg shadow-purple-900/20 overflow-hidden transition-all duration-400 hover:scale-105 hover:border-2 hover:border-purple-400/90 flex items-center justify-center"
        >
          <SiPostman title="Postman" />
        </Col>
        <Col
          xs={4}
          md={2}
          className="text-7xl m-4 p-3 opacity-90 border border-purple-300/60 text-center rounded-md shadow-lg shadow-purple-900/20 overflow-hidden transition-all duration-400 hover:scale-105 hover:border-2 hover:border-purple-400/90 flex items-center justify-center"
        >
          <SiDocker title="Docker" />
        </Col>
        <Col
          xs={4}
          md={2}
          className="text-7xl m-4 p-3 opacity-90 border border-purple-300/60 text-center rounded-md shadow-lg shadow-purple-900/20 overflow-hidden transition-all duration-400 hover:scale-105 hover:border-2 hover:border-purple-400/90 flex items-center justify-center"
        >
          <DiScrum title="Scrum" />
        </Col>
        <Col
          xs={4}
          md={2}
          className="text-7xl m-4 p-3 opacity-90 border border-purple-300/60 text-center rounded-md shadow-lg shadow-purple-900/20 overflow-hidden transition-all duration-400 hover:scale-105 hover:border-2 hover:border-purple-400/90 flex items-center justify-center"
        >
          <SiJira title="Jira" />
        </Col>
        <Col
          xs={4}
          md={2}
          className="text-7xl m-4 p-3 opacity-90 border border-purple-300/60 text-center rounded-md shadow-lg shadow-purple-900/20 overflow-hidden transition-all duration-400 hover:scale-105 hover:border-2 hover:border-purple-400/90 flex items-center justify-center"
        >
          <FaBitbucket title="Bitbucket" />
        </Col>
      </Row>
    </IconContext.Provider>
  );
};

export default Toolstack;

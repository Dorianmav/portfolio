import React from "react";
import { Col, Row } from "react-bootstrap";
import { DiJavascript1, DiNodejs, DiReact, DiJava } from "react-icons/di";
import {
  SiTypescript,
  SiPostgresql,
  SiOcaml,
  SiMysql,
  SiRust,
  SiFlutter,
  SiLaravel,
  SiPhp,
  SiAngular,
  SiGraphql,
  SiExpress,
  SiNextdotjs,
} from "react-icons/si";
import { IconContext } from "react-icons";
import { useTheme } from "../../context/ThemeContext";

/**
 * Techstack component that displays a grid of technology icons
 * representing the developer's technical skills
 */
const Techstack: React.FC = () => {
  const { themeColors } = useTheme();
  return (
    <IconContext.Provider value={{ color: themeColors.text }}>
      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        <Col
          xs={4}
          md={2}
          className="text-7xl m-4 p-3 opacity-90 border border-purple-300/60 text-center rounded-md shadow-lg shadow-purple-900/20 overflow-hidden transition-all duration-400 hover:scale-105 hover:border-2 hover:border-purple-400/90 flex items-center justify-center"
        >
          <SiTypescript title="TypeScript" />
        </Col>
        <Col
          xs={4}
          md={2}
          className="text-7xl m-4 p-3 opacity-90 border border-purple-300/60 text-center rounded-md shadow-lg shadow-purple-900/20 overflow-hidden transition-all duration-400 hover:scale-105 hover:border-2 hover:border-purple-400/90 flex items-center justify-center"
        >
          <DiJavascript1 title="JavaScript" />
        </Col>
        <Col
          xs={4}
          md={2}
          className="text-7xl m-4 p-3 opacity-90 border border-purple-300/60 text-center rounded-md shadow-lg shadow-purple-900/20 overflow-hidden transition-all duration-400 hover:scale-105 hover:border-2 hover:border-purple-400/90 flex items-center justify-center"
        >
          <DiNodejs title="Node.js" />
        </Col>
        <Col
          xs={4}
          md={2}
          className="text-7xl m-4 p-3 opacity-90 border border-purple-300/60 text-center rounded-md shadow-lg shadow-purple-900/20 overflow-hidden transition-all duration-400 hover:scale-105 hover:border-2 hover:border-purple-400/90 flex items-center justify-center"
        >
          <DiReact title="React" />
        </Col>
        <Col
          xs={4}
          md={2}
          className="text-7xl m-4 p-3 opacity-90 border border-purple-300/60 text-center rounded-md shadow-lg shadow-purple-900/20 overflow-hidden transition-all duration-400 hover:scale-105 hover:border-2 hover:border-purple-400/90 flex items-center justify-center"
        >
          <SiOcaml title="OCaml" />
        </Col>
        <Col
          xs={4}
          md={2}
          className="text-7xl m-4 p-3 opacity-90 border border-purple-300/60 text-center rounded-md shadow-lg shadow-purple-900/20 overflow-hidden transition-all duration-400 hover:scale-105 hover:border-2 hover:border-purple-400/90 flex items-center justify-center"
        >
          <SiFlutter title="Flutter" />
        </Col>
        <Col
          xs={4}
          md={2}
          className="text-7xl m-4 p-3 opacity-90 border border-purple-300/60 text-center rounded-md shadow-lg shadow-purple-900/20 overflow-hidden transition-all duration-400 hover:scale-105 hover:border-2 hover:border-purple-400/90 flex items-center justify-center"
        >
          <SiMysql title="MySQL" />
        </Col>
        <Col
          xs={4}
          md={2}
          className="text-7xl m-4 p-3 opacity-90 border border-purple-300/60 text-center rounded-md shadow-lg shadow-purple-900/20 overflow-hidden transition-all duration-400 hover:scale-105 hover:border-2 hover:border-purple-400/90 flex items-center justify-center"
        >
          <SiPostgresql title="PostgreSQL" />
        </Col>
        <Col
          xs={4}
          md={2}
          className="text-7xl m-4 p-3 opacity-90 border border-purple-300/60 text-center rounded-md shadow-lg shadow-purple-900/20 overflow-hidden transition-all duration-400 hover:scale-105 hover:border-2 hover:border-purple-400/90 flex items-center justify-center"
        >
          <SiRust title="Rust" />
        </Col>
        <Col
          xs={4}
          md={2}
          className="text-7xl m-4 p-3 opacity-90 border border-purple-300/60 text-center rounded-md shadow-lg shadow-purple-900/20 overflow-hidden transition-all duration-400 hover:scale-105 hover:border-2 hover:border-purple-400/90 flex items-center justify-center"
        >
          <DiJava title="Java" />
        </Col>
        <Col
          xs={4}
          md={2}
          className="text-7xl m-4 p-3 opacity-90 border border-purple-300/60 text-center rounded-md shadow-lg shadow-purple-900/20 overflow-hidden transition-all duration-400 hover:scale-105 hover:border-2 hover:border-purple-400/90 flex items-center justify-center"
        >
          <SiLaravel title="Laravel" />
        </Col>
        <Col
          xs={4}
          md={2}
          className="text-7xl m-4 p-3 opacity-90 border border-purple-300/60 text-center rounded-md shadow-lg shadow-purple-900/20 overflow-hidden transition-all duration-400 hover:scale-105 hover:border-2 hover:border-purple-400/90 flex items-center justify-center"
        >
          <SiPhp title="PHP" />
        </Col>
        <Col
          xs={4}
          md={2}
          className="text-7xl m-4 p-3 opacity-90 border border-purple-300/60 text-center rounded-md shadow-lg shadow-purple-900/20 overflow-hidden transition-all duration-400 hover:scale-105 hover:border-2 hover:border-purple-400/90 flex items-center justify-center"
        >
          <SiAngular title="Angular" />
        </Col>
        <Col
          xs={4}
          md={2}
          className="text-7xl m-4 p-3 opacity-90 border border-purple-300/60 text-center rounded-md shadow-lg shadow-purple-900/20 overflow-hidden transition-all duration-400 hover:scale-105 hover:border-2 hover:border-purple-400/90 flex items-center justify-center"
        >
          <SiGraphql title="GraphQL" />
        </Col>
        <Col
          xs={4}
          md={2}
          className="text-7xl m-4 p-3 opacity-90 border border-purple-300/60 text-center rounded-md shadow-lg shadow-purple-900/20 overflow-hidden transition-all duration-400 hover:scale-105 hover:border-2 hover:border-purple-400/90 flex items-center justify-center"
        >
          <SiExpress title="Express" />
        </Col>
        <Col
          xs={4}
          md={2}
          className="text-7xl m-4 p-3 opacity-90 border border-purple-300/60 text-center rounded-md shadow-lg shadow-purple-900/20 overflow-hidden transition-all duration-400 hover:scale-105 hover:border-2 hover:border-purple-400/90 flex items-center justify-center"
        >
          <SiNextdotjs title="Next.js" />
        </Col>
      </Row>
    </IconContext.Provider>
  );
};

export default Techstack;

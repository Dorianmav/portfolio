import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Techstack from "./Techstack";
import Toolstack from "./Toolstack";
import { useTranslation } from "react-i18next";

/**
 * About component that displays information about the developer's
 * technical skills and tools
 */
const About: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <Container fluid className="about-section">
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <h1 className="text-4xl font-bold pb-5">
              {t('about.techstack')} <strong className="text-purple-500">Skillset</strong>
            </h1>
            <Techstack />

            <h1 className="text-4xl font-bold pb-5">
              <strong className="text-purple-500">{t('about.toolstack')}</strong>
            </h1>
            <Toolstack />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default About;

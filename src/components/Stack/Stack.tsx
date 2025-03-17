import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Techstack from "./Techstack";
import Toolstack from "./Toolstack";
import { useTranslation } from "react-i18next";
import { themeColors } from "../../theme/colors";

/**
 * Stack component that displays information stack the developer's
 * technical skills and tools
 */
const Stack: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <Container fluid className="stack-section" style={{ backgroundColor: themeColors.background }}>
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
            <h1 className="text-4xl font-bold pb-5" style={{ color: themeColors.primary }}>
              {t('stack.techstack')} <strong style={{ color: themeColors.highlight }}>Skillset</strong>
            </h1>
            <Techstack />

            <h1 className="text-4xl font-bold pb-5" style={{ color: themeColors.primary }}>
              <strong style={{ color: themeColors.highlight }}>{t('stack.toolstack')}</strong>
            </h1>
            <Toolstack />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Stack;

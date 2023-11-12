import React, { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import ProjectDetailDesciption from "./ProjectDetailsDescription";
import RightSideContent from "./RightSideContent";
import "./index.css";
import { useNavigate } from "react-router-dom";

import Section from "./Section";

const ProjectDetail = () => {
  document.title = "Job Details | Jobcy - Job Listing Template | Themesdesign";
  return (
    <React.Fragment>
      <Section />
      <section className="section">
        <Container className="custom-container-hiring-detail">
          <Row>
            <Col lg={8}>
              <ProjectDetailDesciption />
            </Col>
            <Col lg={4} className="mt-lg-0">
              <RightSideContent />
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default ProjectDetail;

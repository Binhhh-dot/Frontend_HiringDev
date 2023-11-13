import React, { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import ProjectDetailDesciption from "./ProjectDetailsDescription";
import "./index.css";
import { useNavigate } from "react-router-dom";

import Section from "./Section";

const ProjectDetail = () => {
  document.title = "Job Details | Jobcy - Job Listing Template | Themesdesign";
  return (
    <React.Fragment>
      <Section />
      <section className="section">
        <Container className="custom-container-project-detail">
          <Row>
            <Col lg={12} className="px-0">
              <ProjectDetailDesciption />
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default ProjectDetail;

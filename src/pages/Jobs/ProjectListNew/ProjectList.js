import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Section from "../ProjectListNew/Section";
import { useNavigate } from "react-router-dom";
import ProjectVacancyList from "./ProjectVacancyList";

const ProjectList = () => {
  document.title = "Project List | WeHire";
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Section />
      <section className="section">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="me-lg-6">
                <h3>Project List</h3>
                <ProjectVacancyList></ProjectVacancyList>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default ProjectList;

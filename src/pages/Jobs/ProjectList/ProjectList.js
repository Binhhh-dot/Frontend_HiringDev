import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Section from "./Section";
import ProjectVacancyList from "./ProjectVacancyList";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import userAuthorization from "../../../utils/userAuthorization";

const ProjectList = () => {
  document.title = "Job List | Jobcy - Job Listing Template | Themesdesign";

  const navigate = useNavigate();
  const location = useLocation();
  const [isLoad, setIdLoad] = useState(false);
  useEffect(() => {
    const localStorageRole = localStorage.getItem('role');
    if (!localStorageRole) {
      navigate("/signin");
    } else {
      if (!userAuthorization(localStorageRole, location.pathname)) {
        navigate("/error404");
      } else {
        setIdLoad(true)
      }
    }
  }, []);

  return (
    <React.Fragment>
      <Section />
      <section className="section">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="me-lg-5">
                <ProjectVacancyList />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

    </React.Fragment>
  );
};

export default ProjectList;

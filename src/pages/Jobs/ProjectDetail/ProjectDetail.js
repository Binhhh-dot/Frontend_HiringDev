import React, { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import ProjectDetailDesciption from "./ProjectDetailsDescription";
import "./index.css";
import { useNavigate, useLocation } from "react-router-dom";
import Section from "./Section";
import userAuthorization from "../../../utils/userAuthorization";
import { useState } from "react";

const ProjectDetail = () => {
  document.title = "Job Details | WeHire - Job Listing Template | Themesdesign";
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
  if (isLoad) {
    return (
      <React.Fragment>
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
  }
};

export default ProjectDetail;

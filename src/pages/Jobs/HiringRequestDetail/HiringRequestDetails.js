import React, { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import JobDetailsDescription from "./JobDetailsDescription";
import RightSideContent from "./RightSideContent";
import "./index.css";
import { useNavigate } from "react-router-dom";

import Section from "./Section";

const HiringRequestDetails = () => {
  document.title = "Job Details | Jobcy - Job Listing Template | Themesdesign";

  const navigate = useNavigate();
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === null) {
      navigate("/signin");
    } else if (role === "HR") {
      navigate("/error404");
    }
  });
  return (
    <React.Fragment>
      <Section />
      <section className="section">
        <Container className="custom-container-hiring-detail">
          <Row>
            <Col lg={8}>
              <JobDetailsDescription />
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

export default HiringRequestDetails;

import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Section from "../HiringRequestList/Section";
import JobSearchOptions from "./JobSearchOptions";
import JobVacancyList from "./JobVacancyList";

import Sidebar from "./Sidebar";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";

const HiringRequestList = () => {
  document.title = "Job List | WeHire - Job Listing Template | Themesdesign";
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
        <Container>
          <Row>
            <Col lg={12}>
              <div className="me-lg-6">
                <h3>Hiring Request List</h3>

                <JobVacancyList />
              </div>
            </Col>
            {/* <Sidebar /> */}
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default HiringRequestList;

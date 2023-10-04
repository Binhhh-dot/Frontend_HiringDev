import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Section from "../HiringRequestList/Section";
import JobSearchOptions from "./JobSearchOptions";
import JobVacancyList from "./JobVacancyList";

import Sidebar from "./Sidebar";
import Pagination from "./Pagination";

const HiringRequestList = () => {
  document.title = "Job List | Jobcy - Job Listing Template | Themesdesign";
  return (
    <React.Fragment>
      <Section />
      <section className="section">
        <Container>
          <Row>
            <Col lg={9}>
              <div className="me-lg-5">
                <h3>Hiring Request List</h3>
                <JobSearchOptions />

                <JobVacancyList />

                <Pagination />
              </div>
            </Col>
            <Sidebar />
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default HiringRequestList;

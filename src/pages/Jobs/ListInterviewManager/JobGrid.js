import React from "react";
import { Col, Container, Row } from "reactstrap";
import JobGridHeader from "./JobGridHeader";
import JobVacancy from "./JobVacancy";
import Section from "./Section";
import Selected from "./Selected";
import Sidebar from "./Sidebar";

const InterviewListManager = () => {
  document.title = "Job Grid | WeHire - Job Listing Template | Themesdesign";
  return (
    <React.Fragment>
      <Section />
      <section className="section">
        <Container>
          <Row>
            <Col lg={9}>
              <div className="me-lg-5">
                <h3>Hiring Request List</h3>

                <JobVacancy />

              </div>
            </Col>
            <Sidebar />
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default InterviewListManager;

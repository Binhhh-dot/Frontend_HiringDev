import React from "react";
import { Col, Container, Row } from "reactstrap";
import JobDetailsDescription from "./JobDetailsDescription";

import Section from "./Section";

const HiringRequestDetails = () => {
  document.title = "Job Details | Jobcy - Job Listing Template | Themesdesign";
  return (
    <React.Fragment>
      <Section />
      <section className="section">
        <Container>
          <Row>
            <Col lg={12}>
              <JobDetailsDescription />
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default HiringRequestDetails;

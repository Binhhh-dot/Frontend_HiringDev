import React from "react";
import { Col, Container, Row } from "reactstrap";
//import CandidateDetails from "./CandidateDetails";
import AssignTaskCreateDetails from "./AssignTaskCreateDetails";
import JobFilters from "./JobFilters";
import Section from "./Section";
import Pagination from "../../Jobs/JobList2/Pagination";

const AssignTaskCreate = () => {
  document.title =
    "Candidate List | Jobcy - Job Listing Template | Themesdesign";
  return (
    <React.Fragment>
      <Section />
      <section className="section">
        <Container className="custom-container-assign-task">
          {/* <JobFilters /> */}
          <Row>
            <Col lg={12}>
              <AssignTaskCreateDetails />
            </Col>
          </Row>
          {/* <Pagination /> */}
        </Container>
      </section>
    </React.Fragment>
  );
};

export default AssignTaskCreate;

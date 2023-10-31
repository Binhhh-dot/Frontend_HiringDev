import React from "react";
import { Col, Container, Row } from "reactstrap";
//import CandidateDetails from "./CandidateDetails";
import AssignTaskDetailsInfo from "./AssignTaskDetailsInfo";
import JobFilters from "./JobFilters";
import Section from "./Section";
import Pagination from "../../Jobs/JobList2/Pagination";

const AssignTaskDetail = () => {
  document.title =
    "Candidate List | Jobcy - Job Listing Template | Themesdesign";
  return (
    <React.Fragment>
      <Section />
      <section className="section">
        <Container className="custom-container-assign-task">
          <Row>
            <Col lg={12}>
              <AssignTaskDetailsInfo />
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default AssignTaskDetail;

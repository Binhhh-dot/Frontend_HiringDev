import React from "react";
import { Col, Container, Row } from "reactstrap";
import DeveloperDetails from "./DeveloperDetails";
import JobFilters from "./JobFilters";
import Section from "./Section";
import Pagination from "../../Jobs/JobList2/Pagination";

const DeveloperList = () => {
  document.title =
    "Candidate List | WeHire - Job Listing Template | Themesdesign";
  return (
    <React.Fragment>
      <Section />
      <section className="section">
        <Container>
          <JobFilters />
          <Row>
            <Col lg={12}>
              <DeveloperDetails />
            </Col>
          </Row>
          <Pagination />
        </Container>
      </section>
    </React.Fragment>
  );
};

export default DeveloperList;

import React from "react";
import { Col, Container, Row } from "reactstrap";
import JobGridHeader from "./JobGridHeader";
import JobVacancy from "./JobVacancy";
import Section from "./Section";
import Selected from "./Selected";

const InterviewList = () => {
  document.title = "Job Grid | Jobcy - Job Listing Template | Themesdesign";
  return (
    <React.Fragment>
      <Section />
      <section className="section">
        <Container>
          <JobGridHeader />
          <Selected />

          <JobVacancy />



        </Container>
      </section>
    </React.Fragment>
  );
};

export default InterviewList;

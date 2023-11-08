import React from "react";
import Section from "./Section";
import NewListInterviewInfo from "./NewListInterviewInfo";
import { Col, Container, Row } from "reactstrap";
const NewListInterview = () => {
  return (
    <React.Fragment>
      <Section />
      <section className="section">
        <Container>
          <Row>
            <Col lg={12}>
              <NewListInterviewInfo />
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default NewListInterview;

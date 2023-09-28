import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Section from "../HiringRequestList/Section";
import JobSearchOptions from "./JobSearchOptions";
import JobVacancyList from "./JobVacancyList";
import Popular from "./Popular";
import Sidebar from "./Sidebar";

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
                <div className="mt-5">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                      <li class="page-item disabled">
                        <a class="page-link" href="#" tabindex="-1">
                          Previous
                        </a>
                      </li>
                      <li class="page-item">
                        <a class="page-link" href="#">
                          1
                        </a>
                      </li>
                      <li class="page-item">
                        <a class="page-link" href="#">
                          2
                        </a>
                      </li>
                      <li class="page-item">
                        <a class="page-link" href="#">
                          3
                        </a>
                      </li>
                      <li class="page-item">
                        <a class="page-link" href="#">
                          Next
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
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

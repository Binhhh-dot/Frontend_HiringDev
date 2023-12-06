import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Section from "../AssignTaskListForManager/Section";
import JobSearchOptions from "./JobSearchOptions";
import AssignTaskListForManager from "./AssignTaskListForManager";

import Sidebar from "./Sidebar";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";

const AssignTaskList = () => {
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
            <Col lg={9}>
              <div className="me-lg-5">
                <h3>List Task For Manager</h3>

                <AssignTaskListForManager />
              </div>
            </Col>
            <Sidebar />
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default AssignTaskList;

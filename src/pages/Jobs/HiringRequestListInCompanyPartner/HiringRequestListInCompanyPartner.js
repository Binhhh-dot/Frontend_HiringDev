import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Section from "../HiringRequestListInCompanyPartner/Section";
import JobSearchOptions from "./JobSearchOptions";
import JobVacancyList from "./JobVacancyList";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const HiringRequestListInCompanyPartner = () => {
  document.title = "Hiring Request List | WeHire ";
  const navigate = useNavigate();
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === null) {
      navigate("/signin");
    } else if (role === "manager") {
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
                <JobVacancyList />
              </div>
            </Col>
            <Sidebar />
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default HiringRequestListInCompanyPartner;

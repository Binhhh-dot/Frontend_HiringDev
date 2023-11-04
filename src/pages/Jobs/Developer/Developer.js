import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Section from "../HiringRequestList/Section";
//import JobSearchOptions from "./JobSearchOptions";
import JobVacancyList from "./JobVacancyList";
import Interview from "./Interview";
import Profile from "./Profile";
import Register from "./Register";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faRegistered,
  faFileLines,
  faUserGroup,
  faHouse,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import "./index.css";

// import Sidebar from "./Sidebar";
// import Pagination from "./Pagination";
//import { useNavigate } from "react-router-dom";

const Developer = () => {
  document.title = "Developer | Jobcy - Developer Template | Themesdesign";

  const [selectedOption, setSelectedOption] = useState("Hiring Request");

  const handleSidebarClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <React.Fragment>
      <Container className="custom-container-developer">
        <Row>
          <Col lg={2} className="p-0">
            <div
              className="border-end"
              style={{
                height: "100%",
              }}
            >
              <div
                style={{
                  position: "fixed",
                  marginTop: "120px",
                }}
              >
                <div style={{ width: "252px" }}>
                  <div className="d-flex align-items-center">
                    <i className="uil uil-align-justify fs-3 ms-3"></i>
                    <h3
                      className="mb-0 ms-2"
                      style={{ fontFamily: "Helvetica" }}
                    >
                      Dev Menu
                    </h3>
                  </div>
                  <div className="d-flex flex-column">
                    <p
                      className="d-flex gap-2  mb-0 pb-2  px-3 menu-tite align-items-center"
                      onClick={() => handleSidebarClick("Hiring Request")}
                      style={{ fontFamily: "Helvetica", paddingTop: "12px" }}
                    >
                      <i
                        className="uil uil-home-alt"
                        style={{ fontSize: "20px" }}
                      ></i>
                      Dashboard
                    </p>
                  </div>
                  <div className="d-flex flex-column ">
                    <p
                      className="sidebar-item mb-0 px-3  py-2"
                      onClick={() => handleSidebarClick("Hiring Request")}
                      style={{ fontFamily: "Helvetica" }}
                    >
                      <i
                        className="uil uil-file-edit-alt me-2"
                        style={{ fontSize: "20px" }}
                      ></i>
                      Hiring Request
                    </p>
                    <p
                      className="sidebar-item mb-0 px-3  py-2"
                      onClick={() => handleSidebarClick("Interview")}
                      style={{ fontFamily: "Helvetica" }}
                    >
                      <i
                        className="uil uil-users-alt me-2"
                        style={{ fontSize: "20px" }}
                      ></i>
                      Interview
                    </p>
                    {/* <p
                      className="sidebar-item mb-0 px-3  py-3"
                      onClick={() => handleSidebarClick("Profile")}
                      style={{ fontFamily: "Helvetica" }}
                    >
                      <FontAwesomeIcon icon={faUser} className="me-3" />
                      Profile
                    </p> */}
                    <p
                      className="sidebar-item mb-0 px-3 py-2"
                      onClick={() => handleSidebarClick("Register")}
                      style={{ fontFamily: "Helvetica" }}
                    >
                      <i
                        className="uil uil-registered me-2"
                        style={{ fontSize: "20px" }}
                      ></i>
                      Register
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={10} className="pe-0">
            <Section />
            {selectedOption === "Hiring Request" && (
              <section className="section">
                <Container>
                  <Row>
                    <Col>
                      <div className="me-lg-6">
                        <h3>Hiring Request List</h3>

                        <JobVacancyList />
                      </div>
                    </Col>
                  </Row>
                </Container>
              </section>
            )}
            {/* ------------------------------------------------------------------- */}
            {selectedOption === "Interview" && (
              <section className="section">
                <Container>
                  <Row>
                    <Col>
                      <div className="me-lg-6">
                        <Interview />
                      </div>
                    </Col>
                  </Row>
                </Container>
              </section>
            )}
            {/* ------------------------------------------------------------------------ */}
            {selectedOption === "Profile" && (
              <section className="section">
                <Container>
                  <Row>
                    <Col>
                      <div className="me-lg-6">
                        <Profile />
                      </div>
                    </Col>
                  </Row>
                </Container>
              </section>
            )}
            {/* ----------------------------------------------------------------------------- */}
            {selectedOption === "Register" && (
              <section className="section">
                <Container>
                  <Row>
                    <Col>
                      <div className="me-lg-6">
                        <Register />
                      </div>
                    </Col>
                  </Row>
                </Container>
              </section>
            )}
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Developer;

import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";

//Import Images
import JobDetailImage from "../../../assets/images/job-detail.jpg";
import JobImage10 from "../../../assets/images/featured-job/img-10.png";
import userImage1 from "../../../assets/images/user/img-01.jpg";
import userImage2 from "../../../assets/images/user/img-02.jpg";
import userImage3 from "../../../assets/images/user/img-03.jpg";
import userImage4 from "../../../assets/images/user/img-04.jpg";
import userImage5 from "../../../assets/images/user/img-05.jpg";
//import { Link } from "react-router-dom";
import "./index.css";

const JobDetailsDescription = () => {
  const [skills, setSkills] = useState([
    "Strong OOP",
    "Resfull API",
    "C++",
    "C#",
    "Java",
    "html",
  ]);

  const [divHeight, setDivHeight] = useState(0);

  const [showCandidateList, setShowCandidateList] = useState(false);

  useEffect(() => {
    const height = document.getElementById("standard").clientHeight;
    setDivHeight(height);
  }, []);

  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [hideSelectedCandidates, setHideSelectedCandidates] = useState(false);

  const handleCandidateSelection = (candidateId) => {
    // check if the candidate is already selected
    if (selectedCandidates.includes(candidateId)) {
      // if selected, remove from the list
      setSelectedCandidates((prevSelected) =>
        prevSelected.filter((id) => id !== candidateId)
      );
    } else {
      //if not selected, add to the list
      setSelectedCandidates((prevSelected) => [...prevSelected, candidateId]);
      setHideSelectedCandidates(false);
    }
  };

  const handleSendButtonClick = () => {
    console.log("Selected Candidate: ", selectedCandidates);

    setHideSelectedCandidates(true);
  };

  const candidateDetails = [
    {
      id: 1,
      userImg: userImage1,
      candidateName: "Charles Dickens",
      candidateDesignation: "Project Manager",
      location: "Senior Javascript/Nodejs",
      salary: "Average Salary: $650",
      rating: 4,
      ratingClass: "badge bg-secondary bg-gradient ms-1",
      addclassNameBookmark: false,
      progress: 100,
      hidden: false,
      badges: [
        {
          id: 1,
          badgeName: "Manage",
          classname: "success",
        },
      ],
    },
    {
      id: 2,
      userImg: userImage2,
      candidateName: "Gabriel Palmer",
      candidateDesignation: "HTML Developer",
      location: "Junior C#",
      salary: "Average Salary: $250",
      rating: 3,
      ratingClass: "badge bg-secondary bg-gradient ms-1",
      addclassNameBookmark: true,
      progress: 60,
      hidden: false,
      badges: [
        {
          id: 1,
          badgeName: "Design",
          classname: "info",
        },
        {
          id: 2,
          badgeName: "Developer",
          classname: "primary",
        },
      ],
    },
    {
      id: 3,
      userImg: userImage3,
      candidateName: "Rebecca Swartz ",
      candidateDesignation: "Graphic Designer",
      location: "Leader Photoshop/Adobe InDesign",
      salary: "Average Salary: $380",
      rating: 4,
      ratingClass: "badge bg-secondary bg-gradient ms-1",
      addclassNameBookmark: false,
      progress: 40,
      hidden: false,
      badges: [
        {
          id: 1,
          badgeName: "Design",
          classname: "success",
        },
        {
          id: 2,
          badgeName: "Developer",
          classname: "primary",
        },
      ],
    },
    {
      id: 4,
      userImg: userImage4,
      candidateName: "Betty Richards",
      candidateDesignation: "Education Training",
      location: "Senior Java/Springboot",
      salary: "Average Salary: $650",
      rating: 4,
      ratingClass: "badge bg-secondary bg-gradient ms-1",
      addclassNameBookmark: true,
      progress: 50,
      hidden: false,
      badges: [
        {
          id: 1,
          badgeName: "C++",
          classname: "primary",
        },
        {
          id: 2,
          badgeName: "UI/UX",
          classname: "info",
        },
      ],
    },
    {
      id: 5,
      userImg: userImage5,
      candidateName: "Jeffrey Montgomery",
      candidateDesignation: "Restaurant Team Member",
      location: "Fresher Javascript",
      salary: "Average Salary: $125",
      rating: 4,
      ratingClass: "badge bg-secondary bg-gradient ms-1",
      addclassNameBookmark: false,
      progress: 30,
      hidden: false,
      badges: [
        {
          id: 1,
          badgeName: "Javascript",
          classname: "primary",
        },
        {
          id: 2,
          badgeName: "Ruby",
          classname: "primary",
        },
      ],
    },
  ];

  const getBarColor = (progress) => {
    if (progress <= 30) {
      return "#EE0000";
    } else if (progress <= 50) {
      return "#EE7600";
    } else if (progress <= 80) {
      return "#FFDF00";
    } else {
      return "green";
    }
  };

  return (
    <React.Fragment>
      <Card className="job-detail overflow-hidden">
        <div>
          <img src={JobDetailImage} alt="" className="img-fluid" />
          <div className="job-details-compnay-profile">
            <img
              src={JobImage10}
              alt=""
              className="img-fluid rounded-3 rounded-3"
            />
          </div>
        </div>
        <CardBody className="p-4">
          <div>
            <Row>
              <Col md={8}>
                <h5 className="mb-1">Hiring Request Title</h5>
                <ul className="list-inline text-muted mb-0">
                  <li className="list-inline-item">
                    <i className="mdi mdi-account"></i> 8 Developer
                  </li>
                  <li className="list-inline-item text-warning review-rating">
                    <span className="badge bg-warning">looking Fo Dev</span>{" "}
                  </li>
                </ul>
              </Col>
              <Col lg={4}>
                <ul className=" mb-0 text-lg-end mt-3 mt-lg-0">
                  <li className="list-inline-item">
                    <div>
                      <p>
                        Deadline Request{" "}
                        <span className="badge bg-secondary">1/10/2023</span>
                      </p>
                    </div>
                  </li>
                </ul>
              </Col>
            </Row>
          </div>

          <div className="mt-4">
            <Row className="g-2">
              <Col lg={3}>
                <div
                  className="border rounded-start p-3"
                  style={{ height: `${divHeight}px` }}
                >
                  <p className="text-muted mb-0 fs-13">Type Of Developer</p>
                  <p className="fw-medium mb-0 badge bg-secondary text-light ms-2">
                    BE Developer
                  </p>
                </div>
              </Col>
              <Col lg={3}>
                <div className="border p-3" id="standard">
                  <p className="text-muted fs-13 mb-0">Skill Requirement</p>
                  <p className="fw-medium mb-0 ">
                    {skills.map((skill, index) => (
                      <span
                        key={index}
                        className="badge bg-primary-subtle text-primary ms-2"
                      >
                        {skill}
                      </span>
                    ))}
                  </p>
                </div>
              </Col>
              <Col lg={3}>
                <div
                  className="border p-3"
                  style={{ height: `${divHeight}px` }}
                >
                  <p className="text-muted fs-13 mb-0">Level Requirement</p>
                  <p className="fw-medium mb-0 badge bg-info text-light ms-2">
                    Senior
                  </p>
                </div>
              </Col>
              <Col lg={3}>
                <div
                  className="border rounded-end p-3"
                  style={{ height: `${divHeight}px` }}
                >
                  <p className="text-muted fs-13 mb-0">Budget</p>
                  <p className="fw-medium mb-0 badge bg-danger text-light ms-2">
                    $2150
                  </p>
                </div>
              </Col>
            </Row>
          </div>

          <div className="mt-4">
            <h5 className="mb-3">Job Description</h5>
            <div className="job-detail-desc">
              <p className="text-muted mb-0">
                As a Product Designer, you will work within a Product Delivery
                Team fused with UX, engineering, product and data talent. You
                will help the team design beautiful interfaces that solve
                business challenges for our clients. We work with a number of
                Tier 1 banks on building web-based applications for AML, KYC and
                Sanctions List management workflows. This role is ideal if you
                are looking to segue your career into the FinTech or Big Data
                arenas.
              </p>
            </div>
          </div>

          <div className="mt-4">
            <h5 className="mb-3">Responsibilities</h5>
            <div className="job-detail-desc mt-2">
              <p className="text-muted">
                As a Product Designer, you will work within a Product Delivery
                Team fused with UX, engineering, product and data talent.
              </p>
              <ul className="job-detail-list list-unstyled mb-0 text-muted">
                <li>
                  <i className="uil uil-circle"></i> Have sound knowledge of
                  commercial activities.
                </li>
                <li>
                  <i className="uil uil-circle"></i> Build next-generation web
                  applications with a focus on the client side
                </li>
                <li>
                  <i className="uil uil-circle"></i> Work on multiple projects
                  at once, and consistently meet draft deadlines
                </li>
                <li>
                  <i className="uil uil-circle"></i> have already graduated or
                  are currently in any year of study
                </li>
                <li>
                  <i className="uil uil-circle"></i> Revise the work of previous
                  designers to create a unified aesthetic for our brand
                  materials
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-4">
            <h5 className="mb-3">Qualification </h5>
            <div className="job-detail-desc mt-2">
              <ul className="job-detail-list list-unstyled mb-0 text-muted">
                <li>
                  <i className="uil uil-circle"></i> B.C.A / M.C.A under
                  National University course complete.
                </li>
                <li>
                  <i className="uil uil-circle"></i> 3 or more years of
                  professional design experience
                </li>
                <li>
                  <i className="uil uil-circle"></i> have already graduated or
                  are currently in any year of study
                </li>
                <li>
                  <i className="uil uil-circle"></i> Advanced degree or
                  equivalent experience in graphic and web design
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-4">
            <h5 className="mb-3">Skill & Experience</h5>
            <div className="job-details-desc">
              <ul className="job-detail-list list-unstyled mb-0 text-muted">
                <li>
                  <i className="uil uil-circle"></i> Understanding of key Design
                  Principal
                </li>
                <li>
                  <i className="uil uil-circle"></i> Proficiency With HTML, CSS,
                  Bootstrap
                </li>
                <li>
                  <i className="uil uil-circle"></i> Wordpress: 1 year
                  (Required)
                </li>
                <li>
                  <i className="uil uil-circle"></i> Experience designing and
                  developing responsive design websites
                </li>
                <li>
                  <i className="uil uil-circle"></i> web designing: 1 year
                  (Preferred)
                </li>
              </ul>
              <div className="mt-4 d-flex flex-wrap align-items-start gap-1">
                <span className="badge bg-primary">PHP</span>
                <span className="badge bg-primary">JS</span>
                <span className="badge bg-primary">Marketing</span>
                <span className="badge bg-primary">REACT</span>
                <span className="badge bg-primary">PHOTOSHOP</span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      <div className="d-flex justify-content-around mt-4">
        <button
          class="button-accept"
          role="button"
          onClick={() => {
            setShowCandidateList(true);
          }}
        >
          Accept Request
        </button>
        <button class="button-cancel" role="button">
          Cancel Request
        </button>
      </div>

      {showCandidateList && (
        <div className="candidate-list">
          <div className="mt-4">
            <h4>List Developer Matching Request</h4>
          </div>

          <div
            className="d-flex justify-content-between border border-3"
            style={{ padding: "15px", borderRadius: "10px" }}
          >
            <div>
              <button
                class="button-send-dev-matching"
                role="button"
                onClick={handleSendButtonClick}
              >
                Send
              </button>
            </div>
            <div className="d-flex">
              <button
                class="btn-list-dev-matching rounded-start-pill"
                role="button"
              >
                Dev Matching
              </button>
              <div
                className="border border-3"
                style={{ margin: "0px 5px" }}
              ></div>
              <button class="btn-list-dev-sent rounded-end-pill" role="button">
                Dev Sent
              </button>
            </div>
          </div>

          {candidateDetails.map((candidateDetailsNew, key) => (
            <div
              key={key}
              className={
                candidateDetailsNew.addclassNameBookmark === true
                  ? "candidate-list-box bookmark-post card mt-4"
                  : "candidate-list-box card mt-4"
              }
              style={{
                display:
                  hideSelectedCandidates &&
                  selectedCandidates.includes(candidateDetailsNew.id)
                    ? "none"
                    : "block",
              }}
            >
              <CardBody className="p-4">
                <Row className="align-items-center">
                  <div className="col-auto">
                    <div className="candidate-list-images">
                      <Link to="#">
                        <img
                          src={candidateDetailsNew.userImg}
                          alt=""
                          className="avatar-md img-thumbnail rounded-circle"
                        />
                      </Link>
                    </div>
                  </div>
                  <Col lg={6}>
                    <div className="candidate-list-content mt-3 mt-lg-0">
                      <h5 className="fs-19 mb-0">
                        <Link to="/developerinfo" className="primary-link">
                          {candidateDetailsNew.candidateName}
                        </Link>

                        <span className={candidateDetailsNew.ratingClass}>
                          <i className="mdi mdi-star align-middle"></i>
                          Year Of Experience:
                          {candidateDetailsNew.rating}
                        </span>
                      </h5>
                      <p className="text-muted mb-2">
                        {" "}
                        {candidateDetailsNew.candidateDesignation}
                      </p>
                      <ul className="list-inline mb-0 text-muted">
                        <li className="list-inline-item">
                          <i className="uil-keyboard"></i>{" "}
                          {candidateDetailsNew.location}
                        </li>
                        <br />
                        <li className="list-inline-item">
                          <i className="uil uil-wallet"></i>{" "}
                          {candidateDetailsNew.salary}
                        </li>
                      </ul>
                    </div>
                  </Col>

                  <Col lg={2}>
                    <div className="mt-2 mt-lg-0 d-flex flex-wrap align-items-start gap-1">
                      {(candidateDetailsNew.badges || []).map(
                        (badgesInner, key) => (
                          <span
                            className={`badge bg-${badgesInner.classname}-subtle text-${badgesInner.classname} fs-14 mt-1`}
                            key={key}
                          >
                            {badgesInner.badgeName}
                          </span>
                        )
                      )}
                    </div>
                  </Col>

                  <Col lg={3} className="border-start border-3">
                    <div className="left-side-matching ">
                      <div>
                        <div className="matching-rate-dev">
                          <span
                            className="percent-matching-dev"
                            style={{
                              color: getBarColor(candidateDetailsNew.progress),
                            }}
                          >
                            {candidateDetailsNew.progress}%
                          </span>
                          <span
                            style={{
                              fontSize: "85%",
                              fontFamily: "Verdana",
                            }}
                          >
                            Matching with requirement
                          </span>
                        </div>
                      </div>

                      <div className="matching-bar border border-2 ">
                        <div
                          className="match-level"
                          style={{
                            width: `${candidateDetailsNew.progress}%`,
                            backgroundColor: getBarColor(
                              candidateDetailsNew.progress
                            ),
                          }}
                        ></div>
                      </div>
                      <div className="send-matching-dev">
                        <button
                          className="button-matchingdev-pushable"
                          role="button"
                          onClick={() =>
                            handleCandidateSelection(candidateDetailsNew.id)
                          }
                        >
                          <span className="button-matchingdev-shadow"></span>
                          <span className="button-matchingdev-edge"></span>
                          <span className="button-matchingdev-front text">
                            Dev
                          </span>
                        </button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </div>
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default JobDetailsDescription;

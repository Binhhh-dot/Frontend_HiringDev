import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row, Modal, ModalBody, Button } from "reactstrap";
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCandidateInfo, setSelectedCandidateInfo] = useState(null);

  const openModal = (candidateInfo) => {
    setSelectedCandidateInfo(candidateInfo);
    setIsModalOpen(true);
    console.log(candidateInfo);
  };

  const closeModal = () => {
    setSelectedCandidateInfo(null);
    setIsModalOpen(false);
  };

  const [selectAllDevMatching, setSelectAllDevAllMatching] = useState(false);
  const [selectedDev, setSelectedDev] = useState([]);

  const toggleSelectDevAll = () => {
    setSelectAllDevAllMatching(!selectAllDevMatching);
    if (!selectAllDevMatching) {
      setSelectedDev(candidateDetails.map((candidate) => candidate.id));
    } else {
      setSelectedDev([]);
    }
  };

  const toggleDevMatchingSelection = (candidateId) => {
    const isSelected = selectedDev.includes(candidateId);
    if (isSelected) {
      setSelectedDev(selectedDev.filter((id) => id !== candidateId));
    } else {
      setSelectedDev([...selectedDev, candidateId]);
    }
  };

  const [cancelReason, setCancelReason] = useState("");
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const openCancelModal = () => {
    setIsCancelModalOpen(true);
  };

  const closeCancelModal = () => {
    setIsCancelModalOpen(false);
  };

  const handleCancelRequest = () => {
    if (cancelReason.trim() === "") {
      console.log("Please enter a reason for cancellation.");
    } else {
      console.log("Cancel Request Reason:", cancelReason);
      closeCancelModal();
    }
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
        {
          id: 2,
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
      return "#fe3839";
    } else if (progress <= 50) {
      return "#ffb302";
    } else if (progress <= 80) {
      return "#fbe83a";
    } else {
      return "#57f000";
    }
  };

  return (
    <React.Fragment>
      <Card className="job-detail ">
        <div>
          {/* <img src={JobDetailImage} alt="" className="img-fluid" /> */}
          <div className="job-details-compnay-profile">
            <img
              src={JobImage10}
              alt=""
              className="img-fluid rounded-3 rounded-3"
              style={{ height: "100px", width: "100px" }}
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
                  <p className="fw-medium mb-0 badge bg-secondary text-light">
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
                        style={{ marginRight: "3px" }}
                        className="badge bg-primary text-light"
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
                  <p className="fw-medium mb-0 badge bg-info text-light">
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
                  <p className="fw-medium mb-0 badge bg-danger text-light">
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
          class="button-accept-pushable"
          role="button"
          onClick={() => {
            setShowCandidateList(true);
          }}
        >
          <span className="button-accept-shadow"></span>
          <span className="button-accept-edge"></span>
          <span className="button-accept-front text"> Accept Request</span>
        </button>

        <button
          class="button-cancel-pushable"
          role="button"
          onClick={openCancelModal}
        >
          <span className="button-cancel-shadow"></span>
          <span className="button-cancel-edge"></span>
          <span className="button-cancel-front text">Cancel Request</span>
        </button>
      </div>

      {showCandidateList && (
        <div className="candidate-list">
          <div className="mt-4">
            <h4>List Developer Matching Request</h4>
          </div>
          {/* nút Send và nút chuyển trang */}
          <div
            className="d-flex justify-content-between border border-3"
            style={{ padding: "15px", borderRadius: "10px" }}
          >
            <div className="d-flex">
              <button
                class="btn-list-dev-matching-pushable rounded-start-pill"
                role="button"
              >
                <span className="btn-list-dev-matching-shadow"></span>
                <span className="btn-list-dev-matching-edge"></span>
                <span className="btn-list-dev-matching-front text">
                  Dev Matching
                </span>
              </button>

              <div
                className="border border-3"
                style={{ margin: "0px 5px" }}
              ></div>
              <button
                class="btn-list-dev-sent-pushable rounded-end-pill"
                role="button"
              >
                <span className="btn-list-dev-sent-shadow"></span>
                <span className="btn-list-dev-sent-edge"></span>
                <span className="btn-list-dev-sent-front text">
                  Dev Accepted
                </span>
              </button>
            </div>

            <div>
              <button
                class="button-send-dev-matching-pushable"
                role="button"
                // onClick={handleSendButtonClick}
              >
                <span className="button-send-dev-matching-shadow"></span>
                <span className="button-send-dev-matching-edge"></span>
                <span className="button-send-dev-matching-front text">
                  Send
                </span>
              </button>
            </div>
          </div>

          <div className="d-flex mt-4">
            <div className="checkbox-all-wrapper-hiring-detail-manager">
              <label>
                <input
                  type="checkbox"
                  checked={selectAllDevMatching}
                  onChange={toggleSelectDevAll}
                />
                <span className="checkbox"></span>
              </label>
            </div>
            <div className="d-flex align-items-center ms-2">
              <h4 style={{ display: "contents" }}>Select All Developer</h4>
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

              // onClick={() => openModal(candidateDetailsNew)}
            >
              {/* thêm checkbox cho mỗi ứng viên */}
              <CardBody className="p-4">
                <Row className="align-items-center">
                  <Col lg={1}>
                    <div className="checkbox-wrapper-hiring-detail-manager d-flex justify-content-center">
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedDev.includes(candidateDetailsNew.id)}
                          onChange={() =>
                            toggleDevMatchingSelection(candidateDetailsNew.id)
                          }
                        />
                        <span className="checkbox"></span>
                      </label>
                    </div>
                  </Col>

                  <div className="col-auto">
                    <div
                      className="candidate-list-images"
                      onClick={() => openModal(candidateDetailsNew)}
                    >
                      <Link to="#">
                        <img
                          src={candidateDetailsNew.userImg}
                          alt=""
                          className="avatar-md img-thumbnail rounded-circle"
                        />
                      </Link>
                    </div>
                  </div>
                  <Col lg={5}>
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
                      <div className="d-flex">
                        <div
                          className="d-flex align-items-center"
                          style={{ marginRight: "30px" }}
                        >
                          <p
                            style={{
                              display: "contents",
                              fontFamily: "Tahoma",
                            }}
                          >
                            Matching with request
                          </p>
                        </div>
                        <div className="matching-rate-dev">
                          <span
                            className="percent-matching-dev"
                            style={{
                              color: getBarColor(candidateDetailsNew.progress),
                            }}
                          >
                            {candidateDetailsNew.progress}%
                          </span>
                        </div>
                      </div>

                      <div className="devmatching-bar border border-1">
                        <div
                          className="devmatch-level"
                          style={{
                            width: `${candidateDetailsNew.progress}%`,
                            backgroundColor: getBarColor(
                              candidateDetailsNew.progress
                            ),
                          }}
                        ></div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </div>
          ))}
        </div>
      )}

      <div>
        <Modal isOpen={isModalOpen} toggle={closeModal} size={"xl"}>
          <div className="mt-2 d-flex justify-content-end ">
            <Button
              close
              className="close-button"
              onClick={closeModal}
              style={{ marginRight: "10px" }}
            ></Button>
          </div>

          <ModalBody className="rounded">
            {selectedCandidateInfo && (
              <div>
                <Row>
                  <Col lg={4}>
                    <Card className="side-bar Modal-info-dev-left">
                      <CardBody className="p-4">
                        <div className="candidate-profile text-center">
                          <img
                            src={selectedCandidateInfo.userImg}
                            alt=""
                            className="avatar-lg rounded-circle"
                          />
                          <h6 className="fs-18 mb-0 mt-4">
                            {selectedCandidateInfo.candidateName}
                          </h6>
                        </div>
                      </CardBody>
                      <CardBody className="candidate-profile-overview border-top p-4">
                        <h6 className="fs-17 fw-semibold mb-3">
                          Profile Overview
                        </h6>
                        <ul className="list-unstyled mb-0">
                          <li>
                            <div className="d-flex">
                              <label className="text-dark">Name</label>
                              <div>
                                <p className="text-muted mb-0">
                                  Gabriel Palmer
                                </p>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="d-flex">
                              <label className="text-dark">Date of Birth</label>
                              <div>
                                <p className="text-muted mb-0">30/4/1975</p>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="d-flex">
                              <label className="text-dark">Gender</label>
                              <div>
                                <p className="text-muted mb-0">Female</p>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="d-flex">
                              <label className="text-dark">
                                Average Salary
                              </label>
                              <div>
                                <p className="text-muted mb-0">$1000</p>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="d-flex">
                              <label className="text-dark">
                                Year Experience
                              </label>
                              <div>
                                <p className="text-muted mb-0 ms-2"> 4 years</p>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </CardBody>
                      <CardBody className="p-4 border-top">
                        <div className="border-bottom pb-3">
                          <h6 className="fs-17 fw-semibold mb-3">
                            Type of Developer
                          </h6>
                          <div className="d-flex flex-wrap align-items-start gap-1">
                            <span className="badge bg-success-subtle text-success fs-13 mt-1">
                              BackEnd Developer
                            </span>
                            <span className="badge bg-success-subtle text-success fs-13 mt-1">
                              AWS Developer
                            </span>
                          </div>
                        </div>

                        <div className="mt-3 border-bottom pb-3">
                          <h6 className="fs-17 fw-semibold mb-3">
                            Level of Developer
                          </h6>
                          <div className="d-flex flex-wrap align-items-start gap-1">
                            <span className="badge bg-success-subtle text-success fs-13 mt-1">
                              Senior
                            </span>
                          </div>
                        </div>

                        <div className="mt-3">
                          <h6 className="fs-17 fw-semibold mb-3">
                            Skill of Developer
                          </h6>
                          <div className="d-flex flex-wrap align-items-start gap-1">
                            <span className="badge bg-success-subtle text-success fs-13 mt-1">
                              Springboot
                            </span>
                            <span className="badge bg-success-subtle text-success fs-13 mt-1">
                              Web Design
                            </span>
                            <span className="badge bg-success-subtle text-success fs-13 mt-1">
                              SpringMVC
                            </span>
                            <span className="badge bg-success-subtle text-success fs-13 mt-1">
                              JUnit
                            </span>
                            <span className="badge bg-success-subtle text-success fs-13 mt-1">
                              Java Server Faces
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg={8}>
                    <Card className="candidate-details mt-4 mt-lg-0 Modal-info-dev-right">
                      <CardBody className="p-4 candidate-personal-detail">
                        <div>
                          <h6 className="fs-17 fw-semibold mb-3 fw-bold">
                            Summary
                          </h6>
                          <p className="text-muted mb-2">
                            Very well thought out and articulate communication.
                            Clear milestones, deadlines and fast work. Patience.
                            Infinite patience. No shortcuts.
                          </p>
                        </div>
                        <div className="candidate-education-details mt-3 pt-3">
                          <h6 className="fs-17 fw-bold mb-0">Education</h6>
                          <div className="candidate-education-content mt-4 d-flex">
                            <div className="circle flex-shrink-0 bg-primary-subtle text-primary">
                              {" "}
                              B{" "}
                            </div>
                            <div className="ms-2">
                              <h6 className="fs-16 mb-1">
                                BCA - Bachelor of Computer Applications
                              </h6>
                              <p className="mb-2 text-muted">
                                International University - (2004 - 2010)
                              </p>
                              <p className="text-muted">
                                There are many variations of passages of
                                available, but the majority alteration in some
                                form.
                              </p>
                            </div>
                          </div>
                          <div className="candidate-education-content mt-4 d-flex">
                            <div className="circle flex-shrink-0 bg-primary-subtle text-primary">
                              {" "}
                              M{" "}
                            </div>
                            <div className="ms-2">
                              <h6 className="fs-16 mb-1">
                                MCA - Master of Computer Application
                              </h6>
                              <p className="mb-2 text-muted">
                                International University - (2010 - 2012)
                              </p>
                              <p className="text-muted">
                                There are many variations of passages of
                                available, but the majority alteration in some
                                form.
                              </p>
                            </div>
                          </div>
                          <div className="candidate-education-content mt-4 d-flex">
                            <div className="circle flex-shrink-0 bg-primary-subtle text-primary">
                              {" "}
                              D{" "}
                            </div>
                            <div className="ms-2">
                              <h6 className="fs-16 mb-1">
                                Design Communication Visual
                              </h6>
                              <p className="text-muted mb-2">
                                International University - (2012-2015)
                              </p>
                              <p className="text-muted">
                                There are many variations of passages of
                                available, but the majority alteration in some
                                form.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="candidate-education-details mt-3 pt-3">
                          <h6 className="fs-17 fw-bold mb-0">
                            Professional Experience
                          </h6>
                          <div className="candidate-education-content mt-4 d-flex">
                            <div className="circle flex-shrink-0 bg-primary-subtle text-primary">
                              {" "}
                              W{" "}
                            </div>
                            <div className="ms-2">
                              <h6 className="fs-16 mb-1">
                                Web Design & Development Team Leader
                              </h6>
                              <p className="mb-2 text-muted">
                                Creative Agency - (2013 - 2016)
                              </p>
                              <p className="text-muted">
                                There are many variations of passages of
                                available, but the majority alteration in some
                                form.
                              </p>
                            </div>
                          </div>
                          <div className="candidate-education-content mt-4 d-flex">
                            <div className="circle flex-shrink-0 bg-primary-subtle text-primary">
                              {" "}
                              P{" "}
                            </div>
                            <div className="ms-2">
                              <h6 className="fs-16 mb-1">Project Manager</h6>
                              <p className="mb-2 text-muted">
                                Jobcy Technology Pvt.Ltd - (Pressent)
                              </p>
                              <p className="text-muted mb-0">
                                There are many variations of passages of
                                available, but the majority alteration in some
                                form.
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
            )}
          </ModalBody>
        </Modal>
      </div>

      <div>
        <Modal isOpen={isCancelModalOpen} toggle={closeCancelModal} size="lg">
          <ModalBody>
            <div>
              <div>
                <h5>Cancel Request</h5>
                <p>Please write your reason:</p>
              </div>
              <div>
                <textarea
                  // rows="4"
                  // cols="50"
                  style={{ width: "100%", height: "100px" }}
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                ></textarea>
              </div>
              <div className="d-flex justify-content-end">
                <Button
                  color="secondary"
                  onClick={closeCancelModal}
                  style={{ marginRight: "10px" }}
                >
                  Cancel
                </Button>
                <Button color="primary" onClick={handleCancelRequest}>
                  Reject Request
                </Button>{" "}
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default JobDetailsDescription;

import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row, Modal, ModalBody, Button } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import DeveloperDetailInManagerPopup from "../../Home/SubSection/DeveloperDetailInManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faBriefcase,
  faTimeline,
  faBullhorn,
} from "@fortawesome/free-solid-svg-icons";

//Import Images
// import JobDetailImage from "../../../assets/images/job-detail.jpg";
import JobImage10 from "../../../assets/images/featured-job/img-10.png";
import userImage1 from "../../../assets/images/user/img-01.jpg";
import userImage2 from "../../../assets/images/user/img-02.jpg";
import userImage3 from "../../../assets/images/user/img-03.jpg";
import userImage4 from "../../../assets/images/user/img-04.jpg";
import userImage5 from "../../../assets/images/user/img-05.jpg";
//import { Link } from "react-router-dom";
import "./index.css";
import hiringrequestService from "../../../services/hiringrequest.service";
import developer from "../../../services/developer.services";

const JobDetailsDescription = () => {
  const { state } = useLocation();

  const [hiringRequestDetail, setHiringRequestDetail] = useState(null);
  const [devMatching, setDevMatching] = useState([]);
  ////////////////////////////////////////////////////////////////////////////////////////
  const [devHasBeenSent, setDevHasBeenSent] = useState([]);
  /////////////////////////////////////////////////////////////////////////////////////////
  const [currentListDev, setCurrentListDev] = useState("matching");
  //////////////////////////////////////////////////////////////////////////////////////////
  const handleTabChange = (tab) => {
    setCurrentListDev(tab);
    console.log(tab);
  };

  /////////////////////////////////////////////////////////////////////////////////////////
  const [showCandidateList, setShowCandidateList] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCandidateInfo, setSelectedCandidateInfo] = useState({});

  const openModal = (candidateInfo) => {
    setSelectedCandidateInfo(candidateInfo);
    setIsModalOpen(true);
    console.log(candidateInfo);
  };

  const closeModal = () => {
    setSelectedCandidateInfo({});
    setIsModalOpen(false);
  };

  ////////////////////////////////////////////////////////////////////////////////////////
  const [selectAllDevMatching, setSelectAllDevAllMatching] = useState(false);
  const [selectedDev, setSelectedDev] = useState([]);

  const toggleSelectDevAll = () => {
    setSelectAllDevAllMatching(!selectAllDevMatching);
    if (!selectAllDevMatching) {
      setSelectedDev(
        candidateDetails.map((candidate) => candidate.developerId)
      );
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

  //////////////////////////////////////////////////////////////////////////////////////////
  // chon dev o phan dev accepted

  /////////////////////////////////////////////////////////////////////////////////////////

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

  const fetchHiringRequestDetailInManager = async () => {
    let response;

    try {
      response = await hiringrequestService.getHiringRequestDetailInManager(
        state.jobId
      );

      setHiringRequestDetail(response.data.data);

      return response;
    } catch (error) {
      console.error("Error fetching hiring request:", error);
    }
  };

  const fetchDeveloperMatchingInManager = async () => {
    let response;

    try {
      response = await hiringrequestService.getDeveloperMatchingInManager(
        state.jobId
      );
      // console.log(response.data.data);
      setDevMatching(response.data.data);
      console.log("request id: " + state.jobId);
      console.log(response.data.data);
      return response;
    } catch (error) {
      console.error("Error fetching developer matching:", error);
    }
  };

  const fetchsendHiringRequestToDevMatching = async () => {
    let response;

    try {
      response = await hiringrequestService.sendHiringRequestToDevMatching(
        state.jobId,
        selectedDev
      );

      console.log("Send OK");
      console.log("/////////////");
      console.log(selectedDev);
      console.log("/////////////");
      fetchDeveloperMatchingInManager();
      return response;
    } catch (error) {
      console.error(
        "Error fetching send hiring request to dev matching:",
        error
      );
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
      console.log(state.jobId);
      console.log(selectedDev);
    }
  };

  const fetchGetSelectedDevByManager = async () => {
    let response;
    try {
      response = await developer.getSelectedDevByManager(state.jobId);
      setDevHasBeenSent(response.data.data);
      console.log(" dev vua duoc gui la");
      console.log(response.data.data);
      console.log("------------------------------------------");

      return response;
    } catch (error) {
      console.error("Error fetching dev matching has been sent:", error);
    }
  };

  const fetchsendevToHR = async () => {
    let response;
    try {
      response = await developer.sendDevToHR(state.jobId, selectedDev);
      console.log("gui cho HR : " + response.data);
      fetchGetSelectedDevByManager();
      return response;
    } catch (error) {
      console.error("Error fetching send dev to HR", error);
    }
  };

  const fetchapprovedHirringRequestStatus = async () => {
    let response;
    try {
      response = await hiringrequestService.approvedHirringRequestStatus(
        state.jobId,
        "string",
        true
      );
      return response;
    } catch (error) {
      console.error("Error fetching approved hiring request", error);
    }
  };

  /////////////////////////////////////////////////////////////////////////////////
  // ham xu li approved hiring request
  const handleAcceptedHirringRequest = () => {
    setShowCandidateList(true);
    fetchapprovedHirringRequestStatus();
  };
  ////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    fetchHiringRequestDetailInManager();
  }, []);

  useEffect(() => {
    fetchGetSelectedDevByManager();
  }, [devMatching]);

  useEffect(() => {
    fetchDeveloperMatchingInManager();
  }, []);

  const candidateDetails = devMatching;

  // const candidateDetails = [
  //   {
  //     id: 1,
  //     userImg: userImage1,
  //     candidateName: "Charles Dickens",
  //     candidateDesignation: "Project Manager",
  //     location: "Senior Javascript/Nodejs",
  //     salary: "Average Salary: $650",
  //     rating: 4,
  //     ratingClass: "badge bg-secondary bg-gradient ms-1",
  //     addclassNameBookmark: false,
  //     progress: 100,
  //     hidden: false,
  //     badges: [
  //       {
  //         id: 1,
  //         badgeName: "Manage",
  //         classname: "success",
  //       },
  //       {
  //         id: 2,
  //         badgeName: "Manage",
  //         classname: "success",
  //       },
  //       {
  //         id: 3,
  //         badgeName: "Manage",
  //         classname: "success",
  //       },
  //       {
  //         id: 4,
  //         badgeName: "Manage",
  //         classname: "success",
  //       },
  //       {
  //         id: 5,
  //         badgeName: "Manage",
  //         classname: "success",
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     userImg: userImage2,
  //     candidateName: "Gabriel Palmer",
  //     candidateDesignation: "HTML Developer",
  //     location: "Junior C#",
  //     salary: "Average Salary: $250",
  //     rating: 3,
  //     ratingClass: "badge bg-secondary bg-gradient ms-1",
  //     addclassNameBookmark: true,
  //     progress: 60,
  //     hidden: false,
  //     badges: [
  //       {
  //         id: 1,
  //         badgeName: "Design",
  //         classname: "info",
  //       },
  //       {
  //         id: 2,
  //         badgeName: "Developer",
  //         classname: "primary",
  //       },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     userImg: userImage3,
  //     candidateName: "Rebecca Swartz ",
  //     candidateDesignation: "Graphic Designer",
  //     location: "Leader Photoshop/Adobe InDesign",
  //     salary: "Average Salary: $380",
  //     rating: 4,
  //     ratingClass: "badge bg-secondary bg-gradient ms-1",
  //     addclassNameBookmark: false,
  //     progress: 40,
  //     hidden: false,
  //     badges: [
  //       {
  //         id: 1,
  //         badgeName: "Design",
  //         classname: "success",
  //       },
  //       {
  //         id: 2,
  //         badgeName: "Developer",
  //         classname: "primary",
  //       },
  //     ],
  //   },
  //   {
  //     id: 4,
  //     userImg: userImage4,
  //     candidateName: "Betty Richards",
  //     candidateDesignation: "Education Training",
  //     location: "Senior Java/Springboot",
  //     salary: "Average Salary: $650",
  //     rating: 4,
  //     ratingClass: "badge bg-secondary bg-gradient ms-1",
  //     addclassNameBookmark: true,
  //     progress: 50,
  //     hidden: false,
  //     badges: [
  //       {
  //         id: 1,
  //         badgeName: "C++",
  //         classname: "primary",
  //       },
  //       {
  //         id: 2,
  //         badgeName: "UI/UX",
  //         classname: "info",
  //       },
  //     ],
  //   },
  //   {
  //     id: 5,
  //     userImg: userImage5,
  //     candidateName: "Jeffrey Montgomery",
  //     candidateDesignation: "Restaurant Team Member",
  //     location: "Fresher Javascript",
  //     salary: "Average Salary: $125",
  //     rating: 4,
  //     ratingClass: "badge bg-secondary bg-gradient ms-1",
  //     addclassNameBookmark: false,
  //     progress: 30,
  //     hidden: false,
  //     badges: [
  //       {
  //         id: 1,
  //         badgeName: "Javascript",
  //         classname: "primary",
  //       },
  //       {
  //         id: 2,
  //         badgeName: "Ruby",
  //         classname: "primary",
  //       },
  //     ],
  //   },
  // ];

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
  if (!hiringRequestDetail) {
    return null;
  }

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
                {/* <h5 className="mb-1">Hiring Request Title </h5> */}
                <h5 className="mb-1">{hiringRequestDetail.jobTitle}</h5>

                <ul className="list-inline text-muted mb-0">
                  <li className="list-inline-item">
                    <i className="mdi mdi-account"></i>
                    <span>{hiringRequestDetail.numberOfDev} </span>
                    Developer
                  </li>
                  <br />
                  <li className="list-inline-item text-warning review-rating">
                    <span className="badge bg-warning">
                      {hiringRequestDetail.statusString}
                    </span>{" "}
                  </li>
                </ul>
              </Col>
              <Col lg={4}>
                <ul className="d-flex flex-column mb-0 text-lg-end mt-3 mt-lg-0">
                  <li className="list-inline-item">
                    <div>
                      <p>
                        <FontAwesomeIcon
                          icon={faTimeline}
                          size="lg"
                          style={{ marginRight: "10px" }}
                        />{" "}
                        <span className="badge bg-secondary">
                          {new Intl.DateTimeFormat("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }).format(new Date(hiringRequestDetail.duration))}
                        </span>
                      </p>
                    </div>
                  </li>
                  <li className="list-inline-item">
                    <div>
                      <p>
                        <FontAwesomeIcon
                          icon={faClock}
                          size="lg"
                          style={{ marginRight: "10px" }}
                        />{" "}
                        <span className="badge bg-secondary">
                          {hiringRequestDetail.scheduleTypeName}
                        </span>
                      </p>
                    </div>
                  </li>
                  <li className="list-inline-item">
                    <div style={{ marginRight: "8px" }}>
                      <p>
                        <FontAwesomeIcon
                          icon={faBriefcase}
                          size="lg"
                          style={{ marginRight: "10px" }}
                        />{" "}
                        <span className="badge bg-secondary">
                          {hiringRequestDetail.employmentTypeName}
                        </span>
                      </p>
                    </div>
                  </li>
                </ul>
              </Col>
            </Row>
          </div>

          <div className="mt-4">
            <Row className="g-2" style={{ columnGap: "3px" }}>
              <Col
                lg={3}
                className="border rounded p-3 "
                style={{ maxWidth: "266px" }}
              >
                <div>
                  <p className="text-muted mb-0 fs-13">Type Of Developer</p>
                  <p className="fw-medium mb-0 badge bg-purple text-light">
                    {hiringRequestDetail.typeRequireName}
                  </p>
                </div>
              </Col>
              <Col
                lg={3}
                className="border rounded p-3"
                style={{ maxWidth: "266px" }}
              >
                <div id="standard">
                  <p className="text-muted fs-13 mb-0">Skill Requirement</p>
                  <p className="fw-medium mb-0 ">
                    {hiringRequestDetail.skillRequireStrings.map(
                      (skill, index) => (
                        <span
                          key={index}
                          style={{ marginRight: "3px" }}
                          className="badge bg-primary text-light"
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </p>
                </div>
              </Col>
              <Col
                lg={3}
                className="border rounded p-3"
                style={{ maxWidth: "266px" }}
              >
                <div>
                  <p className="text-muted fs-13 mb-0">Level Requirement</p>
                  <p className="fw-medium mb-0 badge bg-info text-light">
                    {hiringRequestDetail.levelRequireName}
                  </p>
                </div>
              </Col>
              <Col
                lg={3}
                className="border rounded p-3"
                style={{ maxWidth: "266px" }}
              >
                <div>
                  <p className="text-muted fs-13 mb-0">Salary of Developer</p>
                  <p className="fw-medium mb-0 badge bg-danger text-light">
                    {hiringRequestDetail.salaryPerDev} $
                  </p>
                </div>
              </Col>
            </Row>
          </div>

          <div className="mt-4">
            <h5 className="mb-3">Job Description</h5>
            <div className="job-detail-desc">
              <p className="text-muted mb-0">
                {hiringRequestDetail.jobDescription}
              </p>
            </div>
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
                  There are many variations of passages of available, but the
                  majority alteration in some form.
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
                  There are many variations of passages of available, but the
                  majority alteration in some form.
                </p>
              </div>
            </div>
            <div className="candidate-education-content mt-4 d-flex">
              <div className="circle flex-shrink-0 bg-primary-subtle text-primary">
                {" "}
                D{" "}
              </div>
              <div className="ms-2">
                <h6 className="fs-16 mb-1">Design Communication Visual</h6>
                <p className="text-muted mb-2">
                  International University - (2012-2015)
                </p>
                <p className="text-muted">
                  There are many variations of passages of available, but the
                  majority alteration in some form.
                </p>
              </div>
            </div>
          </div>
          <div className="candidate-education-details mt-3 pt-3">
            <h6 className="fs-17 fw-bold mb-0">Professional Experience</h6>
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
                  There are many variations of passages of available, but the
                  majority alteration in some form.
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
                  There are many variations of passages of available, but the
                  majority alteration in some form.
                </p>
              </div>
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
            </div>
          </div>
        </CardBody>
      </Card>
      <div className="d-flex justify-content-around mt-4">
        {hiringRequestDetail.statusString === "" && showCandidateList == true}

        <button
          style={{
            width: "45%",
            padding: "12px",
            fontSize: "larger",
            fontWeight: "500",
          }}
          class="btn btn-primary"
          role="button"
          onClick={() => {
            handleAcceptedHirringRequest();
          }}
        >
          <span> Accept Request</span>
        </button>

        <button
          style={{
            width: "45%",
            padding: "12px",
            fontSize: "larger",
            fontWeight: "500",
          }}
          class="btn btn-danger"
          role="button"
          onClick={openCancelModal}
        >
          <span>Cancel Request</span>
        </button>
      </div>

      {showCandidateList && (
        <div className="candidate-list">
          <div className="mt-4">
            {currentListDev === "matching" ? (
              <h4>List Developer Matching Request</h4>
            ) : (
              <h4>List Selected Developer</h4>
            )}
          </div>
          {/* nút Send và nút chuyển trang */}
          <div
            className="d-flex justify-content-between border border-3"
            style={{ padding: "15px", borderRadius: "10px" }}
          >
            <div className="d-flex">
              {currentListDev === "matching" ? (
                <button
                  class="btn btn-outline-primary rounded-start-pill Dev Matching"
                  role="button"
                  onClick={() => {
                    handleTabChange("matching");
                  }}
                >
                  <span style={{ fontWeight: "600" }}>Dev Matching</span>
                </button>
              ) : (
                <button
                  class="btn btn-primary rounded-start-pill Dev Matching"
                  role="button"
                  onClick={() => {
                    handleTabChange("matching");
                  }}
                >
                  <span style={{ fontWeight: "600" }}>Dev Matching</span>
                </button>
              )}

              <div
                className="border border-3"
                style={{ margin: "0px 5px" }}
              ></div>
              {currentListDev === "sent" ? (
                <button
                  class="btn btn-outline-primary rounded-end-pill Dev Accepted"
                  role="button"
                  onClick={() => {
                    handleTabChange("sent");
                  }}
                >
                  <span style={{ fontWeight: "600" }}>Dev Accepted</span>
                </button>
              ) : (
                <button
                  class="btn btn-primary rounded-end-pill Dev Accepted"
                  role="button"
                  onClick={() => {
                    handleTabChange("sent");
                  }}
                >
                  <span style={{ fontWeight: "600" }}>Dev Accepted</span>
                </button>
              )}
            </div>

            <div>
              {currentListDev === "matching" ? (
                <button
                  class="btn btn-primary"
                  role="button"
                  onClick={fetchsendHiringRequestToDevMatching}
                >
                  <span>Send To Dev</span>
                </button>
              ) : (
                <button
                  class="btn btn-primary"
                  role="button"
                  onClick={fetchsendevToHR}
                >
                  <span>Send To HR</span>
                </button>
              )}
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

          {currentListDev === "matching"
            ? candidateDetails.map((candidateDetailsNew, key) => (
                <div
                  key={key}
                  className={
                    candidateDetailsNew.addclassNameBookmark === true
                      ? "candidate-list-box bookmark-post card mt-4"
                      : "candidate-list-box card mt-4"
                  }
                >
                  <CardBody className="p-4">
                    <Row className="align-items-center">
                      <Col lg={1}>
                        <div className="checkbox-wrapper-hiring-detail-manager d-flex justify-content-center">
                          <label>
                            <input
                              type="checkbox"
                              checked={selectedDev.includes(
                                candidateDetailsNew.developerId
                              )}
                              onChange={() =>
                                toggleDevMatchingSelection(
                                  candidateDetailsNew.developerId
                                )
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
                      <Col lg={4}>
                        <div className="candidate-list-content mt-3 mt-lg-0">
                          <h5 className="fs-19 mb-0 d-flex">
                            <Link
                              to="/developerinfo"
                              className="primary-link d-flex align-items-end"
                            >
                              {candidateDetailsNew.firstName}{" "}
                              {candidateDetailsNew.lastName}
                            </Link>
                            <div>
                              <span
                                className={
                                  "badge bg-secondary bg-gradient ms-1"
                                }
                              >
                                <i className="mdi mdi-star align-middle"></i>
                                Year Of Experience:{" "}
                                {candidateDetailsNew.yearOfExperience}
                              </span>
                            </div>
                          </h5>
                          <ul className="list-inline mb-0 text-muted">
                            <li className="list-inline-item">
                              <i className="uil-keyboard"></i>{" "}
                              {candidateDetailsNew.levelRequireName}
                            </li>
                            <br />
                            <li className="list-inline-item">
                              <i className="uil uil-wallet"></i>{" "}
                              {candidateDetailsNew.averageSalary}$
                            </li>
                          </ul>
                          <p className="text-muted mb-0">
                            {candidateDetailsNew.typeRequireStrings
                              //.join(", ")
                              .slice(0, 2)
                              .map((typeDev, key) => (
                                <span key={key}>{typeDev + ", "} </span>
                              ))}

                            {candidateDetailsNew.typeRequireStrings.length >
                              2 && <span>...</span>}
                          </p>

                          <div className="mt-2 mt-lg-0 d-flex flex-wrap align-items-start gap-1">
                            {(candidateDetailsNew.skillRequireStrings || [])
                              .slice(0, 4)
                              .map((skillDevRequire, key) => (
                                <span
                                  className={`badge bg-success-subtle text-success fs-14 mt-1`}
                                  key={key}
                                >
                                  {skillDevRequire}
                                </span>
                              ))}
                            {candidateDetailsNew.skillRequireStrings.length >
                              4 && (
                              <span className="badge bg-success-subtle text-success fs-14 mt-1">
                                ...
                              </span>
                            )}
                          </div>
                        </div>
                      </Col>

                      <Col lg={3}>
                        <div className="d-flex flex-column">
                          <div className=" d-flex mb-2">
                            <span className=" fs-14" style={{ width: "38px" }}>
                              Type{" "}
                            </span>
                            <div class="checkbox-wrapper-type ms-2">
                              <div class="round ms-2">
                                <input
                                  type="checkbox"
                                  id="checkbox-type"
                                  checked={candidateDetailsNew.typeMatching}
                                />
                                <label htmlFor="checkbox-type"></label>
                              </div>
                            </div>
                          </div>
                          <div className="mb-2 d-flex">
                            <span className=" fs-14" style={{ width: "38px" }}>
                              Level
                            </span>
                            <div class="checkbox-wrapper-level ms-2">
                              <div class="round ms-2">
                                <input
                                  type="checkbox"
                                  id="checkbox-level"
                                  checked={candidateDetailsNew.levelMatching}
                                />
                                <label htmlFor="checkbox-level"></label>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex mb-2 align-items-center">
                            <span className=" fs-14">Salary</span>
                            <div className="devmatching-bar-salary border border-1 ms-3">
                              <div
                                className="devmatch-level-salary"
                                style={{
                                  width: `${candidateDetailsNew.salaryPerDevPercentage}%`,
                                  backgroundColor: getBarColor(
                                    candidateDetailsNew.salaryPerDevPercentage
                                  ),
                                }}
                              ></div>
                            </div>
                          </div>
                          <div className="d-flex mb-2 align-items-center">
                            <span className=" fs-14" style={{ width: "41px" }}>
                              Skill
                            </span>
                            <div className="devmatching-bar-skill border border-1 ms-3">
                              <div
                                className="devmatch-level-skill"
                                style={{
                                  width: `${candidateDetailsNew.skillPercentage}%`,
                                  backgroundColor: getBarColor(
                                    candidateDetailsNew.skillPercentage
                                  ),
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </Col>

                      <Col lg={3} className="border-start border-3">
                        <div style={{ height: "100px" }}>
                          <div className="left-side-matching ">
                            <div className="d-flex w-100 justify-content-between">
                              <div className="d-flex align-items-center">
                                <p
                                  style={{
                                    display: "contents",
                                    fontFamily: "Tahoma",
                                    fontSize: "15px",
                                  }}
                                >
                                  Matching with request
                                </p>
                              </div>
                              <div className="matching-rate-dev">
                                <span
                                  className="percent-matching-dev"
                                  style={{
                                    color: getBarColor(
                                      candidateDetailsNew.averagedPercentage
                                    ),
                                  }}
                                >
                                  {candidateDetailsNew.averagedPercentage.toFixed(
                                    2
                                  )}
                                  %
                                </span>
                              </div>
                            </div>

                            <div className="devmatching-bar border border-1">
                              <div
                                className="devmatch-level"
                                style={{
                                  width: `${candidateDetailsNew.averagedPercentage}%`,
                                  backgroundColor: getBarColor(
                                    candidateDetailsNew.averagedPercentage
                                  ),
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </div>
              ))
            : devHasBeenSent.map((devHasBeenSentNew, key) => (
                <div
                  key={key}
                  className={
                    devHasBeenSentNew.addclassNameBookmark === true
                      ? "candidate-list-box bookmark-post card mt-4"
                      : "candidate-list-box card mt-4"
                  }
                >
                  <CardBody className="p-4">
                    <Row className="align-items-center">
                      <Col lg={1}>
                        {devHasBeenSentNew.selectedDevStatus ===
                        "Dev Accepted" ? (
                          <div className="checkbox-wrapper-hiring-detail-manager d-flex justify-content-center">
                            <label>
                              <input
                                type="checkbox"
                                checked={selectedDev.includes(
                                  devHasBeenSentNew.developerId
                                )}
                                onChange={() =>
                                  toggleDevMatchingSelection(
                                    devHasBeenSentNew.developerId
                                  )
                                }
                              />
                              <span className="checkbox"></span>
                            </label>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </Col>

                      <div className="col-auto">
                        <div
                          className="candidate-list-images"
                          onClick={() => openModal(devHasBeenSentNew)}
                        >
                          <Link to="#">
                            <img
                              src={devHasBeenSentNew.userImg}
                              alt=""
                              className="avatar-md img-thumbnail rounded-circle"
                            />
                          </Link>
                        </div>
                      </div>
                      <Col lg={4}>
                        <div className="candidate-list-content mt-3 mt-lg-0">
                          <h5 className="fs-19 mb-0 d-flex">
                            <Link
                              to="/developerinfo"
                              className="primary-link d-flex align-items-end"
                            >
                              {devHasBeenSentNew.firstName}{" "}
                              {devHasBeenSentNew.lastName}
                            </Link>
                            <div>
                              <span
                                className={
                                  "badge bg-secondary bg-gradient ms-1"
                                }
                              >
                                <i className="mdi mdi-star align-middle"></i>
                                Year Of Experience:{" "}
                                {devHasBeenSentNew.yearOfExperience}
                              </span>
                            </div>
                          </h5>
                          <p className="text-muted mb-0">
                            {devHasBeenSentNew.typeRequireStrings.join(", ")}
                          </p>
                          <ul className="list-inline mb-0 text-muted">
                            <li className="list-inline-item">
                              <i className="uil-keyboard"></i>{" "}
                              {devHasBeenSentNew.levelRequireName}
                            </li>
                            <br />
                            <li className="list-inline-item">
                              <i className="uil uil-wallet"></i>{" "}
                              {devHasBeenSentNew.averageSalary}$
                            </li>
                          </ul>
                          <div className="mt-2 mt-lg-0 d-flex flex-wrap align-items-start gap-1">
                            {(devHasBeenSentNew.skillRequireStrings || [])
                              .slice(0, 4)
                              .map((skillDevRequire, key) => (
                                <span
                                  className={`badge bg-success-subtle text-success fs-14 mt-1`}
                                  key={key}
                                >
                                  {skillDevRequire}
                                </span>
                              ))}
                          </div>
                        </div>
                      </Col>

                      <Col lg={3}>
                        <div className="d-flex flex-column">
                          <div className=" d-flex mb-2">
                            <span className=" fs-14" style={{ width: "38px" }}>
                              Type{" "}
                            </span>
                            <div class="checkbox-wrapper-type ms-2">
                              <div class="round ms-2">
                                <input
                                  type="checkbox"
                                  id="checkbox-type"
                                  checked={devHasBeenSentNew.typeMatching}
                                />
                                <label htmlFor="checkbox-type"></label>
                              </div>
                            </div>
                          </div>
                          <div className="mb-2 d-flex">
                            <span className=" fs-14" style={{ width: "38px" }}>
                              Level
                            </span>
                            <div class="checkbox-wrapper-level ms-2">
                              <div class="round ms-2">
                                <input
                                  type="checkbox"
                                  id="checkbox-level"
                                  checked={devHasBeenSentNew.levelMatching}
                                />
                                <label htmlFor="checkbox-level"></label>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex mb-2 align-items-center">
                            <span className=" fs-14">Salary</span>
                            <div className="devmatching-bar-salary border border-1 ms-3">
                              <div
                                className="devmatch-level-salary"
                                style={{
                                  width: `${devHasBeenSentNew.salaryPerDevPercentage}%`,
                                  backgroundColor: getBarColor(
                                    devHasBeenSentNew.salaryPerDevPercentage
                                  ),
                                }}
                              ></div>
                            </div>
                          </div>
                          <div className="d-flex mb-2 align-items-center">
                            <span className=" fs-14" style={{ width: "41px" }}>
                              Skill
                            </span>
                            <div className="devmatching-bar-skill border border-1 ms-3">
                              <div
                                className="devmatch-level-skill"
                                style={{
                                  width: `${devHasBeenSentNew.skillPercentage}%`,
                                  backgroundColor: getBarColor(
                                    devHasBeenSentNew.skillPercentage
                                  ),
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </Col>

                      <Col lg={3} className="border-start border-3">
                        <div style={{ height: "100px" }}>
                          <div className="d-flex justify-content-end">
                            <span className="badge bg-pink text-light">
                              {devHasBeenSentNew.selectedDevStatus}
                            </span>
                          </div>
                          <div className="right-side-percen-matching-devaccepted">
                            <div className="d-flex w-100 justify-content-between">
                              <div className="d-flex align-items-center">
                                <p
                                  style={{
                                    display: "contents",
                                    fontFamily: "Tahoma",
                                    fontSize: "15px",
                                  }}
                                >
                                  Matching with request
                                </p>
                              </div>
                              <div className="matching-rate-dev">
                                <span
                                  className="percent-matching-dev"
                                  style={{
                                    color: getBarColor(
                                      devHasBeenSentNew.averagedPercentage
                                    ),
                                  }}
                                >
                                  {devHasBeenSentNew.averagedPercentage.toFixed(
                                    2
                                  )}
                                  %
                                </span>
                              </div>
                            </div>

                            <div className="devmatching-bar border border-1">
                              <div
                                className="devmatch-level"
                                style={{
                                  width: `${devHasBeenSentNew.averagedPercentage}%`,
                                  backgroundColor: getBarColor(
                                    devHasBeenSentNew.averagedPercentage
                                  ),
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </div>
              ))}

          {/* {candidateDetails.map((candidateDetailsNew, key) => (
            <div
              key={key}
              className={
                candidateDetailsNew.addclassNameBookmark === true
                  ? "candidate-list-box bookmark-post card mt-4"
                  : "candidate-list-box card mt-4"
              }
            >
              <CardBody className="p-4">
                <Row className="align-items-center">
                  <Col lg={1}>
                    <div className="checkbox-wrapper-hiring-detail-manager d-flex justify-content-center">
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedDev.includes(
                            candidateDetailsNew.developerId
                          )}
                          onChange={() =>
                            toggleDevMatchingSelection(
                              candidateDetailsNew.developerId
                            )
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
                  <Col lg={4}>
                    <div className="candidate-list-content mt-3 mt-lg-0">
                      <h5 className="fs-19 mb-0 d-flex">
                        <Link
                          to="/developerinfo"
                          className="primary-link d-flex align-items-end"
                        >
                          {candidateDetailsNew.firstName}{" "}
                          {candidateDetailsNew.lastName}
                        </Link>
                        <div>
                          <span
                            className={"badge bg-secondary bg-gradient ms-1"}
                          >
                            <i className="mdi mdi-star align-middle"></i>
                            Year Of Experience:{" "}
                            {candidateDetailsNew.yearOfExperience}
                          </span>
                        </div>
                      </h5>
                      <p className="text-muted mb-0">
                        {candidateDetailsNew.typeRequireStrings.join(", ")}
                      </p>
                      <ul className="list-inline mb-0 text-muted">
                        <li className="list-inline-item">
                          <i className="uil-keyboard"></i>{" "}
                          {candidateDetailsNew.levelRequireName}
                        </li>
                        <br />
                        <li className="list-inline-item">
                          <i className="uil uil-wallet"></i>{" "}
                          {candidateDetailsNew.averageSalary}$
                        </li>
                      </ul>
                      <div className="mt-2 mt-lg-0 d-flex flex-wrap align-items-start gap-1">
                        {(candidateDetailsNew.skillRequireStrings || [])
                          .slice(0, 4)
                          .map((skillDevRequire, key) => (
                            <span
                              className={`badge bg-success-subtle text-success fs-14 mt-1`}
                              key={key}
                            >
                              {skillDevRequire}
                            </span>
                          ))}
                      </div>
                    </div>
                  </Col>

                  <Col lg={3}>
                    <div className="d-flex flex-column">
                      <div className=" d-flex mb-2">
                        <span className=" fs-14" style={{ width: "38px" }}>
                          Type{" "}
                        </span>
                        <div class="checkbox-wrapper-type ms-2">
                          <div class="round ms-2">
                            <input
                              type="checkbox"
                              id="checkbox-type"
                              checked={candidateDetailsNew.typeMatching}
                            />
                            <label htmlFor="checkbox-type"></label>
                          </div>
                        </div>
                      </div>
                      <div className="mb-2 d-flex">
                        <span className=" fs-14" style={{ width: "38px" }}>
                          Level
                        </span>
                        <div class="checkbox-wrapper-level ms-2">
                          <div class="round ms-2">
                            <input
                              type="checkbox"
                              id="checkbox-level"
                              checked={candidateDetailsNew.levelMatching}
                            />
                            <label htmlFor="checkbox-level"></label>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex mb-2 align-items-center">
                        <span className=" fs-14">Salary</span>
                        <div className="devmatching-bar-salary border border-1 ms-3">
                          <div
                            className="devmatch-level-salary"
                            style={{
                              width: `${candidateDetailsNew.salaryPerDevPercentage}%`,
                              backgroundColor: getBarColor(
                                candidateDetailsNew.salaryPerDevPercentage
                              ),
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="d-flex mb-2 align-items-center">
                        <span className=" fs-14" style={{ width: "41px" }}>
                          Skill
                        </span>
                        <div className="devmatching-bar-skill border border-1 ms-3">
                          <div
                            className="devmatch-level-skill"
                            style={{
                              width: `${candidateDetailsNew.skillPercentage}%`,
                              backgroundColor: getBarColor(
                                candidateDetailsNew.skillPercentage
                              ),
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </Col>

                  <Col lg={3} className="border-start border-3">
                    <div style={{ height: "100px" }}>
                      <div className="left-side-matching ">
                        <div className="d-flex w-100 justify-content-between">
                          <div className="d-flex align-items-center">
                            <p
                              style={{
                                display: "contents",
                                fontFamily: "Tahoma",
                                fontSize: "15px",
                              }}
                            >
                              Matching with request
                            </p>
                          </div>
                          <div className="matching-rate-dev">
                            <span
                              className="percent-matching-dev"
                              style={{
                                color: getBarColor(
                                  candidateDetailsNew.averagedPercentage
                                ),
                              }}
                            >
                              {candidateDetailsNew.averagedPercentage.toFixed(
                                2
                              )}
                              %
                            </span>
                          </div>
                        </div>

                        <div className="devmatching-bar border border-1">
                          <div
                            className="devmatch-level"
                            style={{
                              width: `${candidateDetailsNew.averagedPercentage}%`,
                              backgroundColor: getBarColor(
                                candidateDetailsNew.averagedPercentage
                              ),
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </div>
          ))} */}
        </div>
      )}

      <div>
        <DeveloperDetailInManagerPopup
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          devId={selectedCandidateInfo.developerId}
        />
      </div>

      <div>
        <Modal isOpen={isCancelModalOpen} toggle={closeCancelModal} size="lg">
          <ModalBody>
            <div>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <FontAwesomeIcon
                    icon={faBullhorn}
                    size="2xl"
                    style={{
                      color: "#d70f0f",
                      backgroundColor: "#F8D7DA",
                      padding: "15px",
                      borderRadius: "50%",
                    }}
                  />
                  <h3 style={{ textAlign: "center" }}>Are you sure?</h3>
                </div>
                <div className=" border-3 border-top  p-3">
                  <p>
                    Could you kindly provide insights into the reasons behind
                    this decision?{" "}
                    <span style={{ fontWeight: "700" }}>
                      {" "}
                      Your feedback is valuable for my future improvement.
                    </span>
                  </p>
                </div>
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

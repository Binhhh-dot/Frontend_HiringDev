import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CardBody, Col, Row, Modal, ModalBody, Button, Card } from "reactstrap";
import "./custome.css";

//Import images
import userImage1 from "../../../assets/images/user/img-01.jpg";
import userImage2 from "../../../assets/images/user/img-02.jpg";
import userImage3 from "../../../assets/images/user/img-03.jpg";
import userImage4 from "../../../assets/images/user/img-04.jpg";
import userImage5 from "../../../assets/images/user/img-05.jpg";
import userImage6 from "../../../assets/images/user/img-06.jpg";
import userImage7 from "../../../assets/images/user/img-07.jpg";
import userImage8 from "../../../assets/images/user/img-08.jpg";

const HiringRequestDetailInHR = () => {
  const [isModalHROpen, setIsModalHROpen] = useState(false);
  const [selectedDevHRInfo, setSelectedDevHRInfo] = useState(null);

  const openModal = (devHRInfo) => {
    setSelectedDevHRInfo(devHRInfo);
    setIsModalHROpen(true);
  };

  const closeModal = () => {
    setSelectedDevHRInfo(null);
    setIsModalHROpen(false);
  };

  const [selectAll, setSelectAll] = useState(false);
  const [selectedCandidates, setSelectedCandidates] = useState([]);

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedCandidates(candidateDetails.map((candidate) => candidate.id));
    } else {
      setSelectedCandidates([]);
    }
  };

  const toggleCandidateSelection = (candidateId) => {
    const isSelected = selectedCandidates.includes(candidateId);
    if (isSelected) {
      setSelectedCandidates(
        selectedCandidates.filter((id) => id !== candidateId)
      );
    } else {
      setSelectedCandidates([...selectedCandidates, candidateId]);
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
      progress: 80,
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
      progress: 70,
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
      progress: 10,
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
    {
      id: 6,
      userImg: userImage6,
      candidateName: "Milton Osborn",
      candidateDesignation: "Assistant / Store Keeper",
      location: "Senior Machine Leaning",
      salary: "Average Salary: $455",
      rating: 2,
      ratingClass: "badge bg-secondary bg-gradient ms-1",
      addclassNameBookmark: false,
      progress: 80,
      badges: [
        {
          id: 1,
          badgeName: "C#",
          classname: "primary",
        },
        {
          id: 2,
          badgeName: "Java",
          classname: "primary",
        },
      ],
    },
    {
      id: 7,
      userImg: userImage7,
      candidateName: "Harold Jordan",
      candidateDesignation: "Executive, HR Operations",
      location: "Fresher Ruby",
      salary: "Average Salary: $799",
      rating: 4,
      ratingClass: "badge bg-secondary bg-gradient ms-1",
      addclassNameBookmark: false,
      progress: 29,
      badges: [
        {
          id: 1,
          badgeName: "Reactjs",
          classname: "primary",
        },
        {
          id: 2,
          badgeName: "Nodejs",
          classname: "primary",
        },
      ],
    },
    {
      id: 8,
      userImg: userImage8,
      candidateName: "MichaeL Drake ",
      candidateDesignation: "Full Stack Engineer",
      location: "Leader AWS Cloud",
      salary: "Average Salary: $240",
      rating: 3,
      ratingClass: "badge bg-secondary bg-gradient ms-1",
      addclassNameBookmark: false,
      progress: 100,
      badges: [
        {
          id: 1,
          badgeName: "BA",
          classname: "primary",
        },
        {
          id: 2,
          badgeName: "Tester",
          classname: "primary",
        },
      ],
    },
  ];

  const getBarColor = (progress) => {
    if (progress <= 30) {
      return "red";
    } else if (progress <= 50) {
      return "#FFD700";
    } else if (progress <= 80) {
      return "skyblue";
    } else {
      return "green";
    }
  };

  return (
    <React.Fragment>
      {/* <div>
        <button class="button-senddev-HR-pushable" role="button">
          <span class="button-senddev-HR-shadow"></span>
          <span class="button-senddev-HR-edge"></span>
          <span class="button-senddev-HR-front text">Send Interview</span>
        </button>
      </div> */}
      {/*nút chọn tất cả*/}
      <div className="d-flex">
        <div className="select-all-checkbox">
          <label>
            <input
              type="checkbox"
              checked={selectAll}
              onChange={toggleSelectAll}
            />

            <span className="checkbox"></span>
          </label>
        </div>
        <div className="d-flex align-items-center ms-2">
          <h4>Select All Developer</h4>
        </div>
      </div>

      <div className="candidate-list">
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
            {/*thêm checkbox cho mỗi ứng viên*/}

            <CardBody className="p-4">
              <Row className="align-items-center">
                <Col lg={1}>
                  <div className="checkbox-wrapper-39 d-flex justify-content-center">
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedCandidates.includes(
                          candidateDetailsNew.id
                        )}
                        onChange={() =>
                          toggleCandidateSelection(candidateDetailsNew.id)
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
                  <div className="right-side-HR-matching ">
                    <div>
                      <div className="matching-rate-dev">
                        <span
                          className="percent-matching"
                          style={{
                            color: getBarColor(candidateDetailsNew.progress),
                          }}
                        >
                          {candidateDetailsNew.progress}%
                        </span>
                      </div>
                    </div>
                    {/* Chèn thanh tiến trình */}
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
                    <div className="send-matching-dev-HR">
                      <button
                        className="button-send-dev-HR-pushable"
                        role="button"
                      >
                        <span className="button-send-dev-HR-shadow"></span>
                        <span className="button-send-dev-HR-edge"></span>
                        <span className="button-send-dev-HR-front text">
                          Send
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

      <div>
        <Modal isOpen={isModalHROpen} toggle={closeModal} size={"xl"}>
          <div className="mt-2 d-flex justify-content-end ">
            <Button
              close
              className="close-button"
              onClick={closeModal}
              style={{ marginRight: "10px" }}
            ></Button>
          </div>

          <ModalBody className="rounded">
            {selectedDevHRInfo && (
              <div>
                <Row>
                  <Col lg={4}>
                    <Card className="side-bar Modal-info-dev-left-HR">
                      <CardBody className="candidate-profile-overview p-4">
                        <h6 className="fs-17 fw-semibold mb-3">
                          Profile Overview
                        </h6>
                        <ul className="list-unstyled mb-0">
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
                    <Card className="candidate-details mt-4 mt-lg-0 Modal-info-dev-right-HR">
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
    </React.Fragment>
  );
};

export default HiringRequestDetailInHR;

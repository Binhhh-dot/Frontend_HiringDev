import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Modal,
  ModalBody,
  Input,
  Label,
  CardBody,
  Card,
  Button,
} from "reactstrap";

import { Link, useLocation } from "react-router-dom";
import hiringrequestService from "../../../services/hiringrequest.service";
import userImage0 from "../../../assets/images/user/img-00.jpg";

import JobDetailImage from "../../../assets/images/job-detail.jpg";
import JobImage10 from "../../../assets/images/featured-job/img-10.png";
import { FaEye } from "react-icons/fa";

import "./index.css";
import developerServices from "../../../services/developer.services";
const CandidateGridDetails = () => {
  //Apply Now Model
  const [modal, setModal] = useState(false);
  const [candidategridDetails, setCandidategridDetails] = useState([]);
  const openModal = () => setModal(!modal);
  const { state } = useLocation();
  const [modalEye, setModalEye] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [hiringRequestDetail, setHiringRequestDetail] = useState(null);
  const openEyeModal = () => {
    setModalEye(!modalEye);
  };

  const handleCandidateClick = (candidate) => {
    setSelectedCandidate(candidate);
    openEyeModal();
  };
  // ////////////////////////////////////////

  const [interviewInfo, setInterviewInfo] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const [interviewModal, setInterviewModal] = useState(false);

  const openInterviewModal = () => setInterviewModal(true);

  const closeInterviewModal = () => setInterviewModal(false);

  const handleCreateInterview = () => {
    openInterviewModal();
  };

  const handleInterviewSubmit = () => {
    // Perform actions with interviewInfo (e.g., send to the server)
    // ...

    // Close the modal
    closeInterviewModal();
  };

  const fetchJobVacancies = async () => {
    try {
      const response = await developerServices.GetAllSelectedDevByHR(state.jobId)
      const data = response.data;
      const candidategridDetails = data.data.map((dev) => {
        return {
          id: dev.developerId,
          userImg: dev.userImage,
          candidateName: dev.firstName + " " + dev.lastName,
          candidateStatusClassName:
            "profile-active position-absolute badge rounded-circle bg-success",
          experience: dev.yearOfExperience + " Years",
          jobType: dev.levelRequireName,
          salary: dev.averageSalary,
          addclassNameBookmark: false,
          label: false,
          skills: dev.skillRequireStrings,
          averagedPercentage: dev.averagedPercentage,
        };
      });
      setCandidategridDetails(candidategridDetails);
    } catch (error) {
      console.error("Error fetching job vacancies:", error);
    }
  };

  useEffect(() => {
    fetchJobVacancies();
  });



  const fetchHiringRequestDetailInCompany = async () => {
    let response;
    // const saveData = localStorage.getItem("myData");
    try {
      response = await hiringrequestService.getHiringRequestDetailInCompany(
        state.jobId
      );
      console.log(response);
      setHiringRequestDetail(response.data.data);

      return response;
    } catch (error) {
      console.error("Error fetching job vacancies:", error);
    }

  };

  useEffect(() => {
    fetchHiringRequestDetailInCompany();
  }, []);

  if (!hiringRequestDetail) {
    return null;
  }
  return (
    <React.Fragment>
      <Card className="job-detail overflow-hidden">
        <div>
          <img
            src={JobDetailImage}
            alt=""
            className="img-fluid"
            style={{ width: "100%" }}
          />
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
                <h5 className="mb-1">{hiringRequestDetail.jobTitle}</h5>
                <ul className="list-inline text-muted mb-0">
                  <li className="list-inline-item">
                    <i className="mdi mdi-account"></i> {hiringRequestDetail.numberOfDev} Developer
                  </li>
                  <li className="list-inline-item text-warning review-rating">
                    <span className="badge bg-warning">{hiringRequestDetail.statusString}</span>{" "}
                  </li>
                </ul>
              </Col>
              <Col lg={4}>
                <ul className="list-inline mb-0 text-lg-end mt-3 mt-lg-0">
                  <li className="list-inline-item">
                    <div className="favorite-icon">
                      <p>
                        Deadline Request
                        <span> </span>
                        <span className="badge bg-secondary">{new Intl.DateTimeFormat("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }).format(new Date(hiringRequestDetail.duration))}</span>
                      </p>
                    </div>
                  </li>
                  <li className="list-inline-item">
                    <div className="favorite-icon"></div>
                  </li>

                  <li>
                    <button
                      className="btn btn-success"
                      style={{ backgroundColor: "#02AF74" }}
                      onClick={handleCreateInterview}
                    >
                      Create Interview
                    </button>
                  </li>
                </ul>
              </Col>
            </Row>
          </div>

          <div className="mt-4">
            <Row className="g-2 " style={{ columnGap: "3px" }}>
              <Col lg={3} style={{ maxWidth: "266px" }} className="border p-3">
                <div className="rounded-start ">
                  <p className="text-muted mb-0 fs-13">Type Of Developer</p>
                  <p className="fw-medium  badge bg-purple mb-0">
                    {hiringRequestDetail.typeRequireName}
                  </p>
                </div>
              </Col>
              <Col lg={3} className="border p-3" style={{ maxWidth: "266px" }}>
                <div >
                  <p className="text-muted fs-13 mb-0">Skill Requirement</p>
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
                </div>
              </Col>
              <Col lg={3} className="border p-3" style={{ maxWidth: "266px" }}>
                <div >
                  <p className="text-muted fs-13 mb-0">Level Requirement</p>
                  <p className="fw-medium mb-0 badge bg-info">{hiringRequestDetail.levelRequireName}</p>
                </div>
              </Col>
              <Col lg={3} style={{ maxWidth: "266px" }} className="border p-3">
                <div className="  rounded-end">
                  <p className="text-muted fs-13 mb-0">Budget</p>
                  <p className="fw-medium mb-0 badge bg-danger">${hiringRequestDetail.salaryPerDev}</p>
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
        </CardBody>
      </Card>
      <Row>
        <div style={{ marginTop: "35px" }}>
          <h3 style={{ marginBottom: "3px" }}>List Developer Accepted</h3>
        </div>
      </Row>
      <div className="candidate-list">
        <Row>
          {candidategridDetails.map((candidategridDetailsNew, key) => (
            <Col lg={4} md={6} key={key}>
              <div>
                <CardBody className="p-4 dev-accepted mt-4">
                  <div className="d-flex mb-4 justify-content-between">
                    <div className="d-flex">
                      <div className="flex-shrink-0 position-relative">
                        <img
                          src={candidategridDetailsNew.userImg || userImage0}
                          alt=""
                          className="avatar-md rounded"
                        />
                        <span
                          className={
                            candidategridDetailsNew.candidateStatusClassName
                          }
                        ></span>
                      </div>
                      <div className="ms-3">
                        <Link to="/candidatedetails" className="primary-link">
                          <h5 className="fs-17">
                            {candidategridDetailsNew.candidateName}
                          </h5>
                        </Link>
                        <span className="badge bg-info-subtle text-info fs-13">
                          {candidategridDetailsNew.salary}
                        </span>
                      </div>
                    </div>

                    <div>
                      <FaEye
                        style={{ fontSize: "20px" }}
                        className="eye-icon"
                        onClick={() =>
                          handleCandidateClick(candidategridDetailsNew)
                        }
                      />
                    </div>
                  </div>

                  <ul className="list-inline d-flex justify-content-between align-items-center">
                    <li>
                      <div className="d-flex flex-wrap align-items-start gap-1">
                        {candidategridDetailsNew.skills && Array.isArray(candidategridDetailsNew.skills) && candidategridDetailsNew.skills.map((skill, skillIndex) => (
                          <span key={skillIndex} className="badge bg-primary">
                            {skill}
                          </span>
                        ))}
                        <p>...</p>
                      </div>
                    </li>
                  </ul>
                  <div className="border rounded mb-4">
                    <div className="row g-0">
                      <Col lg={6}>
                        <div className="border-end px-3 py-2">
                          <p className="text-muted mb-0">
                            Exp. : {candidategridDetailsNew.experience}
                          </p>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="px-3 py-2">
                          <p className="text-muted mb-0">
                            {candidategridDetailsNew.jobType}
                          </p>
                        </div>
                      </Col>
                    </div>
                  </div>
                  <p className="text-muted">

                  </p>

                  <div
                    className="border border-2 p-3"
                    style={{ borderRadius: "7px" }}
                  >
                    <div className="d-flex justify-content-between">
                      <p>Matching with request</p>
                      <p className="text-success fw-bold">{candidategridDetailsNew.averagedPercentage}%</p>
                    </div>
                    <div className="dev-matching-in-company border border-1">
                      <div className="dev-matching-level-in-company"
                        style={{ width: `${candidategridDetailsNew.averagedPercentage}%` }}></div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <Link
                      to="#hireNow"
                      onClick={openModal}
                      data-bs-toggle="modal"
                      className="btn btn-primary btn-hover w-100 mt-2"
                    >
                      <i className="mdi mdi-account-check"></i> Interview
                    </Link>
                    <Link
                      to="/candidatedetails"
                      className="btn btn-soft-primary btn-hover w-100 mt-2"
                    >
                      Reject
                    </Link>
                  </div>
                </CardBody>
              </div>
            </Col>
          ))}
        </Row>

        <div
          className="modal fade"
          id="hireNow"
          tabIndex="-1"
          aria-labelledby="hireNow"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <Modal isOpen={modal} toggle={openModal} centered>
              <ModalBody className="p-5">
                <div className="text-center mb-4">
                  <h5 className="modal-title" id="staticBackdropLabel">
                    Hire Now
                  </h5>
                </div>
                <div className="position-absolute end-0 top-0 p-3">
                  <button
                    type="button"
                    onClick={openModal}
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="mb-3">
                  <Label for="namrFormControlInput" className="form-label">
                    Company Name
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="namrFormControlInput"
                    placeholder="Enter your company name"
                  />
                </div>
                <div className="mb-3">
                  <Label for="emailFormControlInput" className="form-label">
                    Email Address
                  </Label>
                  <Input
                    type="email"
                    className="form-control"
                    id="emailFormControlInput"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-4">
                  <Label
                    for="messageFormControlTextarea"
                    className="form-label"
                  >
                    Message
                  </Label>
                  <textarea
                    className="form-control"
                    id="messageFormControlTextarea"
                    rows="4"
                    placeholder="Enter your message"
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Send Message
                </button>
              </ModalBody>
            </Modal>
          </div>
        </div>

        <div>
          <Modal isOpen={modalEye} toggle={openEyeModal} size={"xl"}>
            <div className="mt-2 d-flex justify-content-end ">
              <Button
                close
                className="close-button"
                onClick={openEyeModal}
                style={{ marginRight: "10px" }}
              ></Button>
            </div>

            <ModalBody className="rounded">
              {selectedCandidate && (
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
                                  <p className="text-muted mb-0 ms-2">
                                    {" "}
                                    4 years
                                  </p>
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
                              Very well thought out and articulate
                              communication. Clear milestones, deadlines and
                              fast work. Patience. Infinite patience. No
                              shortcuts.
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
          <Modal isOpen={interviewModal} toggle={closeInterviewModal} size="lg">
            <ModalBody className="p-5">
              <div className="text-center mb-4">
                <h3 className="modal-title">Create Interview</h3>
              </div>
              <div className="position-absolute end-0 top-0 p-3">
                <button
                  type="button"
                  onClick={closeInterviewModal}
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="mb-3">
                <Label for="interviewTitle">
                  {" "}
                  <h5>Interview Title</h5>
                </Label>
                <Input
                  type="text"
                  id="interviewTitle"
                  value={interviewInfo.title}
                  onChange={(e) =>
                    setInterviewInfo({
                      ...interviewInfo,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <Label for="interviewDate">
                  {" "}
                  <h5>Date of Interview</h5>
                </Label>
                <Input
                  type="date"
                  id="interviewDate"
                  value={interviewInfo.date}
                  onChange={(e) =>
                    setInterviewInfo({ ...interviewInfo, date: e.target.value })
                  }
                />
              </div>

              <div className="d-flex justify-content-between">
                <div className="mb-3 " style={{ width: "49%" }}>
                  <Label for="interviewStartTime">
                    {" "}
                    <h5>Start Time</h5>
                  </Label>
                  <Input
                    type="time"
                    id="interviewStartTime"
                    value={interviewInfo.startTime}
                    onChange={(e) =>
                      setInterviewInfo({
                        ...interviewInfo,
                        startTime: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-3" style={{ width: "49%" }}>
                  <Label for="interviewEndTime">
                    {" "}
                    <h5> End Time</h5>
                  </Label>
                  <Input
                    type="time"
                    id="interviewEndTime"
                    value={interviewInfo.endTime}
                    onChange={(e) =>
                      setInterviewInfo({
                        ...interviewInfo,
                        endTime: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <h5>Description</h5>
                <textarea
                  // rows="4"
                  // cols="50"
                  style={{ width: "100%", height: "100px" }}
                ></textarea>
              </div>

              <div className="d-flex justify-content-end mt-3">
                <button
                  type="button"
                  className="btn btn-secondary w-45"
                  style={{ marginRight: "10px" }}
                  onClick={handleInterviewSubmit}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary w-45"
                  onClick={handleInterviewSubmit}
                >
                  Create
                </button>
              </div>
            </ModalBody>
          </Modal>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CandidateGridDetails;

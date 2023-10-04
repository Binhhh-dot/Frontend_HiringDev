import React, { useState } from "react";
import {
  Col,
  Row,
  Modal,
  ModalBody,
  Input,
  Label,
  CardBody,
  Card,
} from "reactstrap";
import { Link } from "react-router-dom";

import userImage1 from "../../../assets/images/user/img-01.jpg";
import userImage2 from "../../../assets/images/user/img-02.jpg";
import userImage3 from "../../../assets/images/user/img-03.jpg";
import userImage4 from "../../../assets/images/user/img-04.jpg";
import userImage5 from "../../../assets/images/user/img-05.jpg";
import userImage6 from "../../../assets/images/user/img-06.jpg";
import userImage7 from "../../../assets/images/user/img-07.jpg";
import userImage8 from "../../../assets/images/user/img-08.jpg";
import userImage9 from "../../../assets/images/user/img-09.jpg";

import JobDetailImage from "../../../assets/images/job-detail.jpg";
import JobImage10 from "../../../assets/images/featured-job/img-10.png";

import "./index.css";
const CandidateGridDetails = () => {
  //Apply Now Model
  const [modal, setModal] = useState(false);
  const openModal = () => setModal(!modal);

  const candidategridDetails = [
    {
      id: 1,
      userImg: userImage1,
      candidateName: "Charles Dickens",
      candidateStatusClassName:
        "profile-active position-absolute badge rounded-circle bg-success",
      experience: "0-3 Years",
      jobType: "Freelancers",
      salary: "$800 / hours",
      addclassNameBookmark: true,
      label: true,
      statuslabel: "FEATURED",
    },
    {
      id: 2,
      userImg: userImage2,
      candidateName: "Gabriel Palmer",
      candidateStatusClassName:
        "profile-active position-absolute badge rounded-circle bg-success",
      experience: "3.5 Years",
      jobType: "Freelancers",
      salary: "$350 / hours",
      addclassNameBookmark: true,
      label: false,
    },
    {
      id: 3,
      userImg: userImage3,
      candidateName: "James Lemire",
      candidateStatusClassName:
        "profile-active position-absolute badge rounded-circle bg-danger",
      experience: "4 Years",
      jobType: "Freelancers",
      salary: "$280 / hours",
      addclassNameBookmark: false,
      label: true,
      statuslabel: "URGENT",
    },

    {
      id: 4,
      userImg: userImage4,
      candidateName: "Rebecca Swartz",
      candidateStatusClassName:
        "profile-active position-absolute badge rounded-circle bg-success",
      experience: "2 Years",
      jobType: "Freelancers",
      salary: "$240 / hours",
      addclassNameBookmark: false,
      label: false,
    },
    {
      id: 5,
      userImg: userImage5,
      candidateName: "Betty Richards",
      candidateStatusClassName:
        "profile-active position-absolute badge rounded-circle bg-success",
      experience: "2 Years",
      jobType: "Freelancers",
      salary: "$198 / hours",
      addclassNameBookmark: false,
      label: false,
    },
    {
      id: 6,
      userImg: userImage6,
      candidateName: "Jeffrey Montgomery",
      candidateStatusClassName:
        "profile-active position-absolute badge rounded-circle bg-success",
      experience: "7 Years",
      jobType: "Freelancers",
      salary: "$299 / hours",
      addclassNameBookmark: true,
      label: false,
    },
    {
      id: 7,
      userImg: userImage7,
      candidateName: "Brooke Hayes",
      candidateStatusClassName:
        "profile-active position-absolute badge rounded-circle bg-success",
      experience: "4 Years",
      jobType: "Freelancers",
      salary: "$310 / hours",
      addclassNameBookmark: true,
      label: false,
    },
    {
      id: 8,
      userImg: userImage8,
      candidateName: "Cerys Woods",
      candidateStatusClassName:
        "profile-active position-absolute badge rounded-circle bg-danger",
      experience: "4.5 Years",
      jobType: "Freelancers",
      salary: "$450 / hours",
      addclassNameBookmark: false,
      label: false,
    },
    {
      id: 9,
      userImg: userImage9,
      candidateName: "Olivia Murphy",
      candidateStatusClassName:
        "profile-active position-absolute badge rounded-circle bg-success",
      experience: "7 Years",
      jobType: "Freelancers",
      salary: "$300 / hours",
      addclassNameBookmark: false,
      label: false,
    },
  ];
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
                <ul className="list-inline mb-0 text-lg-end mt-3 mt-lg-0">
                  <li className="list-inline-item">
                    <div className="favorite-icon">
                      <p>
                        Deadline Request
                        <span> </span>
                        <span className="badge bg-secondary">1/10/2023</span>
                      </p>
                    </div>
                  </li>
                  <li className="list-inline-item">
                    <div className="favorite-icon"></div>
                  </li>
                </ul>
              </Col>
            </Row>
          </div>

          <div className="mt-4">
            <Row className="g-2">
              <Col lg={3}>
                <div className="border rounded-start p-3">
                  <p className="text-muted mb-0 fs-13">Type Of Developer</p>
                  <p className="fw-medium fs-15 mb-0">BE Developer</p>
                </div>
              </Col>
              <Col lg={3}>
                <div className="border p-3">
                  <p className="text-muted fs-13 mb-0">Skill Requirement</p>
                  <span className="fw-medium mb-0 badge bg-primary">
                    Strong OOP
                  </span>
                  <span className="fw-medium mb-0 badge bg-primary">
                    Resfull API
                  </span>
                  <span className="fw-medium mb-0 badge bg-primary">JS</span>
                </div>
              </Col>
              <Col lg={3}>
                <div className="border p-3">
                  <p className="text-muted fs-13 mb-0">Level Requirement</p>
                  <p className="fw-medium mb-0">Senior</p>
                </div>
              </Col>
              <Col lg={3}>
                <div className="border rounded-end p-3">
                  <p className="text-muted fs-13 mb-0">Budget</p>
                  <p className="fw-medium mb-0">$2150</p>
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
                  <div className="d-flex mb-4">
                    <div className="flex-shrink-0 position-relative">
                      <img
                        src={candidategridDetailsNew.userImg}
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
                  <ul className="list-inline d-flex justify-content-between align-items-center">
                    <li>
                      <div className="d-flex flex-wrap align-items-start gap-1">
                        <span className="badge bg-primary">PHP</span>
                        <span className="badge bg-primary">JS</span>
                        <span className="badge bg-primary">Marketing</span>
                        <span className="badge bg-primary">REACT</span>
                        <span className="badge bg-primary">PHOTOSHOP</span>
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
                    Some quick example text to build on the card title and bulk
                    the card's content Moltin gives you platform.
                  </p>
                  <div className="mt-3">
                    <Link
                      to="#hireNow"
                      onClick={openModal}
                      data-bs-toggle="modal"
                      className="btn btn-primary btn-hover w-100 mt-2"
                    >
                      <i className="mdi mdi-account-check"></i> Hire Now
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
      </div>
    </React.Fragment>
  );
};

export default CandidateGridDetails;

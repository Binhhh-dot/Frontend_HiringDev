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

  const rejectInterview = async (developerId) => {
    try {
      // Sử dụng giá trị từ state hoặc DOM
      const requestId = state.jobId; // Lấy từ state.jobId
      const isApproved = false;

      // Gọi API để reject interview
      const response = await developerServices.approvalInterviewByHR(requestId, developerId, isApproved);

      // Xử lý kết quả nếu cần thiết
      console.log("API Response:", response);

      // Cập nhật giao diện hoặc thực hiện các hành động khác sau khi reject thành công
      // Ví dụ: Ẩn nút hoặc cập nhật trạng thái
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Error rejecting interview:", error);
      // Hiển thị thông báo lỗi hoặc thực hiện các hành động khác
    }
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
            <div className="">
              <p
                className=""
                dangerouslySetInnerHTML={{ __html: hiringRequestDetail.jobDescription }}
              />
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
                    <button id="rejectButton" className="btn btn-soft-primary btn-hover w-100 mt-2" onClick={() => rejectInterview(candidategridDetailsNew.id)}>Reject</button>
                  </div>
                </CardBody>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </React.Fragment>
  );
};

export default CandidateGridDetails;

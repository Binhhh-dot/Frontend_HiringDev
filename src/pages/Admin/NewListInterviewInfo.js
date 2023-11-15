import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { Form } from "react-bootstrap";
import jobImage1 from "../../assets/images/featured-job/img-01.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faCalendarDays,
  faUser,
  faHourglassHalf,
} from "@fortawesome/free-regular-svg-icons";
import { faLaptopCode } from "@fortawesome/free-solid-svg-icons";
import { Input } from "antd";
import interviewServices from "../../services/interview.services";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import img0 from "../../assets/images/user/img-00.jpg";

const NewListInterviewInfo = () => {
  const [newInterviewListInManager, setNewInterviewListInManager] = useState(
    []
  );

  let [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 7;
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const fetchNewInterviewListInManager = async () => {
    let response;
    try {
      response = await interviewServices.getAllInterviewByManagerAndPaging(
        currentPage,
        7
      );

      console.log(response.data);

      setNewInterviewListInManager(response.data.data);
      setTotalPages(Math.ceil(response.data.paging.total / pageSize));
    } catch (error) {
      console.error("Error fetching interview in manager list :", error);
    }
  };
  //-------------------------------------------------------------------------------------
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageButtons = 4;
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
    if (
      totalPages > maxPageButtons &&
      currentPage <= Math.floor(maxPageButtons / 2) + 1
    ) {
      endPage = maxPageButtons;
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${i === currentPage ? "active" : ""}`}
        >
          <Link className="page-link" to="#" onClick={() => handlePageClick(i)}>
            {i}
          </Link>
        </li>
      );
    }
    return pageNumbers;
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  //-------------------------------------------------------------------------------------
  const [selectInterviewDetail, setSelectInterviewDetail] = useState({});
  const [devInterviewDetail, setDevInterviewDetail] = useState([]);

  const midleSelect = (id) => {
    fetchGetDetailInterviewByInterviewId(id);
    setShowPopup(true);
  };

  const fetchGetDetailInterviewByInterviewId = async (id) => {
    let response;

    try {
      response = await interviewServices.getDetailInterviewByInterviewId(
        id
      );
      console.log("----------------------------------");
      console.log(response.data.data);
      console.log(response.data.data.developer.skillRequireStrings);
      setSelectInterviewDetail(response.data.data);
      setDevInterviewDetail(response.data.data.developer);
      console.log("----------------------------------");
    } catch (error) {
      console.error("Error fetching interview detail in manager list :", error);
    }
  };

  //-------------------------------------------------------------------------------------
  useEffect(() => {
    fetchNewInterviewListInManager();
  }, [currentPage]);

  // useEffect(() => {
  //   fetchGetDetailInterviewByInterviewId();
  // }, []);
  //-------------------------------------------------------------------------------------
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState([]);

  //-------------------------------------------------------------------------------------
  return (
    <React.Fragment>
      <h4>Interview List</h4>
      <div style={{ width: "20%" }} className="mt-3 mb-3">
        <Input placeholder="Search" style={{ height: "40px" }} />
      </div>

      <Modal
        centered
        open={showPopup}
        onOk={() => setShowPopup(false)}
        onCancel={() => setShowPopup(false)}
        width={1100}
        footer={null}
      >
        <Row className="p-3">
          <Col lg={6} className="border-end ">
            <div
              className="d-flex justify-content-between"
              style={{ width: "98%" }}
            >
              <h4 className="mb-0">Interview Detail</h4>
              <p className="badge bg-success text-light fs-13 ">
                {selectInterviewDetail.statusString}
              </p>
            </div>
            <div className="mt-3">
              <p className="mb-0 text-muted">Title </p>
              <div
                className="p-2 border border-2"
                style={{
                  width: "98%",
                  fontWeight: "500",
                  borderRadius: "10px",
                }}
              >
                {selectInterviewDetail.title}
              </div>
            </div>
            <div className="mt-3">
              <p className="mb-0 text-muted">Description </p>
              <div
                className="p-2 border border-2 "
                style={{
                  width: "98%",
                  fontWeight: "500",
                  borderRadius: "10px",
                }}
              >
                {selectInterviewDetail.description}
              </div>
            </div>

            <div className="mt-3">
              <p className="mb-0 text-muted">Date Of Interview </p>
              <div
                className="p-2 border border-2"
                style={{
                  width: "98%",
                  fontWeight: "500",
                  borderRadius: "10px",
                }}
              >
                {selectInterviewDetail.dateOfInterview}
              </div>
            </div>
            <div
              className="d-flex  justify-content-between"
              style={{ gap: "20px", width: "98%" }}
            >
              <div className="mt-3" style={{ width: "50%" }}>
                <p className="mb-0 text-muted">Start Time </p>
                <div
                  className="p-2 border border-2"
                  style={{
                    // width: "fit-content",
                    fontWeight: "500",
                    borderRadius: "10px",
                  }}
                >
                  {selectInterviewDetail.startTime}
                </div>
              </div>

              <div className="mt-3" style={{ width: "50%" }}>
                <p className="mb-0 text-muted">End Time </p>
                <div
                  className="p-2 border border-2"
                  style={{
                    // width: "fit-content",
                    fontWeight: "500",
                    borderRadius: "10px",
                  }}
                >
                  {selectInterviewDetail.endTime}
                </div>
              </div>
            </div>

            <div className="mt-3">
              <p className="mb-0 text-muted">Posted Time</p>
              <div
                className="p-2 border border-2"
                style={{
                  width: "98%",
                  fontWeight: "500",
                  borderRadius: "10px",
                }}
              >
                {selectInterviewDetail.postedTime}
              </div>
            </div>

            {selectInterviewDetail.meetingLink == null ? (
              <div></div>
            ) : (
              <div className="mt-3">
                <p className="mb-0 text-muted">Meeting Link </p>
                <div
                  className="p-2 border border-2"
                  style={{
                    width: "99%",
                    fontWeight: "500",
                    borderRadius: "10px",
                  }}
                >
                  {selectInterviewDetail.meetingLink == null ? (
                    <span>None</span>
                  ) : (
                    selectInterviewDetail.meetingLink
                  )}
                </div>
              </div>
            )}
          </Col>
          <Col lg={6} className="border-start ">
            {/* ------------------------------------------------------ */}
            <Row>
              <Col lg={6}>
                <div className="p-2">
                  <div className="candidate-profile text-center">
                    <img
                      src={img0}
                      alt=""
                      className="avatar-lg rounded-circle"
                    />
                    <h6 className="fs-18 mb-0 mt-4">
                      {devInterviewDetail.firstName}{" "}
                      {devInterviewDetail.lastName}
                    </h6>
                    <p className="text-muted mb-4">
                      {devInterviewDetail.codeName}
                    </p>
                  </div>
                </div>

                <div className="candidate-profile-overview p-2">
                  <h6 className="fs-17 fw-semibold mb-3">Profile Overview</h6>
                  <ul className="list-unstyled mb-0">
                    <li>
                      <div className="d-flex justify-content-start">
                        <label className="text-dark">Gender</label>
                        <div>
                          <p className="text-muted mb-0">
                            {devInterviewDetail.genderString}
                          </p>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div className="d-flex justify-content-start">
                        <label className="text-dark">Email</label>
                        <div>
                          <p className="text-muted mb-0 ">
                            {devInterviewDetail.email}
                          </p>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div className="d-flex justify-content-start">
                        <label className="text-dark">Phone</label>
                        <div>
                          <p className="text-muted mb-0">0123456789</p>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div className="d-flex justify-content-start">
                        <label className="text-dark">Experience</label>
                        <div>
                          <p className="text-muted mb-0 ">
                            {devInterviewDetail.yearOfExperience} Year
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex justify-content-start">
                        <label className="text-dark">Salary</label>
                        <div>
                          <p className="text-muted mb-0">
                            {devInterviewDetail.averageSalary}$
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col lg={6}>
                <div className="p-2 ">
                  <h6 className="fs-17 fw-semibold mb-2">Level</h6>
                  <div className="d-flex flex-wrap align-items-start gap-1">
                    <span className="badge bg-warning text-light fs-12">
                      {devInterviewDetail.levelRequireName}
                    </span>
                  </div>
                </div>

                <div className="p-2 ">
                  <h6 className="fs-17 fw-semibold mb-2">Type</h6>
                  <div className="d-flex flex-wrap align-items-start gap-1">
                    {devInterviewDetail.typeRequireStrings?.map(
                      (skillRequire, key) => (
                        <span
                          key={key}
                          className="badge bg-info-subtle text-info fs-13 mt-1"
                        >
                          {skillRequire}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className="p-2 ">
                  <h6 className="fs-17 fw-semibold mb-2">
                    Professional Skills
                  </h6>
                  <div className="d-flex flex-wrap align-items-start gap-1">
                    {devInterviewDetail.skillRequireStrings?.map(
                      (skillRequire, key) => (
                        <span
                          key={key}
                          className="badge bg-success-subtle text-success fs-13"
                        >
                          {skillRequire}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className="candidate-contact-details p-2">
                  <h6 className="fs-17 fw-semibold mb-3">Work Arrangement</h6>
                  <ul className="list-unstyled mb-0">
                    <div className="d-flex gap-1">
                      <p className="mb-0 badge bg-purplel text-purple fs-13">
                        {devInterviewDetail.scheduleTypeName}
                      </p>
                      <p className="mb-0 badge bg-orangeRed2l text-orangeRed2 fs-13">
                        {devInterviewDetail.employmentTypeName}
                      </p>
                    </div>
                  </ul>
                </div>
              </Col>
            </Row>
            {/* ------------------------------------------------------ */}
          </Col>
          <Row>
            {selectInterviewDetail.rejectionReason == null ? (
              <div></div>
            ) : (
              <div className="mt-3 ">
                <p className="mb-0 text-muted">Rejection Reason</p>
                <div
                  className="p-2 border border-2"
                  style={{
                    width: "100%",
                    fontWeight: "500",
                    borderRadius: "10px",
                  }}
                >
                  {selectInterviewDetail.rejectionReason == null ? (
                    <span></span>
                  ) : (
                    selectInterviewDetail.rejectionReason
                  )}
                </div>
              </div>
            )}
          </Row>
        </Row>
      </Modal>

      <div>
        {newInterviewListInManager.map(
          (newInterviewListInManagerDetail, key) => (
            <div
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
              }}
              key={key}
              className={"job-box-dev-in-list-hiringRequest-for-dev mt-3 card"}
            >
              <div className="p-2">
                <Row className="align-items-center">
                  <Col md={2}>
                    <div>
                      <Link to="#">
                        <img
                          style={{
                            width: "80px",
                            height: "80px",
                          }}
                          src={jobImage1}
                          alt=""
                          className="img-fluid rounded-3 img-avt-hiring-request"
                        />
                      </Link>
                    </div>
                  </Col>

                  <Col md={3} className="px-0">
                    <div
                      onClick={() =>
                        midleSelect(newInterviewListInManagerDetail.interviewId)
                      }
                    >
                      <h5 className="fs-18 mb-0">
                        {newInterviewListInManagerDetail.title}
                      </h5>
                      <p className="text-muted fs-14 mb-0 d-flex align-items-center gap-2">
                        {newInterviewListInManagerDetail.interviewCode}
                      </p>
                    </div>
                  </Col>
                  {/* ------------------ */}

                  {/* -------------------*/}

                  <Col md={2} className="d-flex  gap-2">
                    <div className="d-flex flex-column gap-2">
                      <FontAwesomeIcon
                        icon={faCalendarDays}
                        size="lg"
                        className="text-primary"
                      />
                      <FontAwesomeIcon
                        icon={faClock}
                        size="lg"
                        className="text-primary"
                      />
                    </div>

                    <div>
                      <p className="mb-0">
                        {newInterviewListInManagerDetail.dateOfInterview}
                      </p>
                      <p className="mb-0 mt-1">
                        {newInterviewListInManagerDetail.startTime} -{" "}
                        {newInterviewListInManagerDetail.endTime}
                      </p>
                    </div>
                  </Col>

                  <Col
                    md={2}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <p className="mb-0">
                      {newInterviewListInManagerDetail.postedTime}
                    </p>
                  </Col>

                  <Col md={3} className="d-flex justify-content-center">
                    <span
                      className={
                        newInterviewListInManagerDetail.statusString ===
                          "Waiting Approval"
                          ? "badge bg-warning text-light fs-12"
                          : newInterviewListInManagerDetail.statusString ===
                            "Interviewing"
                            ? "badge bg-blue text-light fs-12"
                            : newInterviewListInManagerDetail.statusString ===
                              "Rejected"
                              ? "badge bg-danger text-light fs-12"
                              : newInterviewListInManagerDetail.statusString ===
                                "Expired"
                                ? "badge bg-danger text-light fs-12"
                                : newInterviewListInManagerDetail.statusString ===
                                  "Cancelled"
                                  ? "badge bg-danger text-light fs-12"
                                  : newInterviewListInManagerDetail.statusString ===
                                    "Approved"
                                    ? "badge bg-success text-light fs-12"
                                    : newInterviewListInManagerDetail.statusString ===
                                      "Complete"
                                      ? "badge bg-primary text-light fs-12"
                                      : newInterviewListInManagerDetail.statusString ===
                                        "Saved"
                                        ? "badge bg-info text-light fs-12"
                                        : ""
                      }
                    >
                      {newInterviewListInManagerDetail.statusString}
                    </span>
                  </Col>
                </Row>
              </div>
            </div>
          )
        )}
      </div>

      {/* ----------------------------------------------------------------------------- */}
      {/* phan trang */}
      <Row>
        <Col lg={12} className="mt-4 pt-2">
          <nav aria-label="Page navigation example">
            <div className="pagination job-pagination mb-0 justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <Link
                  className="page-link"
                  to="#"
                  tabIndex="-1"
                  onClick={handlePrevPage}
                >
                  <i className="mdi mdi-chevron-double-left fs-15"></i>
                </Link>
              </li>
              {renderPageNumbers()}
              <li
                className={`page-item ${currentPage === totalPages ? "disabled" : ""
                  }`}
              >
                <Link className="page-link" to="#" onClick={handleNextPage}>
                  <i className="mdi mdi-chevron-double-right fs-15"></i>
                </Link>
              </li>
            </div>
          </nav>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default NewListInterviewInfo;

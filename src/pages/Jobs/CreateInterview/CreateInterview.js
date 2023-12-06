import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Card, CardBody, Col, Modal, ModalBody, Row } from "reactstrap";
import Pagination from "../JobList2/Pagination";
import Section from "./Section";
import developerServices from "../../../services/developer.services";
import interviewServices from "../../../services/interview.services";
import userImage0 from "../../../assets/images/user/img-00.jpg";
import DeveloperDetailInCompanyPopup from "../../Home/SubSection/DeveloperDetailInCompany";
import { useNavigate } from "react-router-dom";
import { RingLoader, HashLoader } from "react-spinners";

const CreateInterview = () => {
  document.title = "Job Details | WeHire - Job Listing Template | Themesdesign";
  const [listDevId, setListDevid] = useState([]);
  const { state } = useLocation();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [jobListing, setJobListing] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCandidateInfo, setSelectedCandidateInfo] = useState({});
  const navigate = useNavigate();
  let [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [interviewTitlError, setInterviewTitlError] = useState(null);
  const [dateOfInterViewError, setDateOfInterViewError] = useState(null);
  const [timeStartError, setTimeStartError] = useState(null);
  const [timeEndError, setTimeEndError] = useState(null);
  const [desError, setDesError] = useState(null);

  const pageSize = 4;
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

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
          <p className="page-link" onClick={() => handlePageClick(i)}>
            {i}
          </p>
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

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === null) {
      navigate("/signin");
    } else if (role === "manager") {
      navigate("/error404");
    }
  });

  const fetchListDevInterview = async () => {
    let response;
    try {
      const queryParams = new URLSearchParams(location.search);
      const requestIdState = queryParams.get("requestId");
      response = await developerServices.getListDevWaitingInterview(
        requestIdState,
        4,
        currentPage
      );
      console.log(response);
      const data = response.data;
      const jobListing = data.data.map((dev) => {
        return {
          developerId: dev.developerId,
          userId: dev.userId,
          codeName: dev.codeName,
          candidateStatusClassName:
            "profile-active position-absolute badge rounded-circle bg-success",
          yearOfExperience: dev.yearOfExperience + " Years Experience",
          averageSalary: dev.averageSalary,
          employmentTypeName: dev.employmentTypeName,
          devStatusString: dev.devStatusString,
          partTime: true,
          timing: dev.scheduleTypeName,
          badges: [
            {
              id: 1,
              badgeclassName: "bg-primary-subtle text-primary",
              badgeName: dev.levelRequireName,
            },
          ],
        };
      });
      setJobListing(jobListing);
      const developerIds = jobListing.map((job) => job.developerId);
      setListDevid(developerIds);
      setTotalPages(Math.ceil(data.paging.total / pageSize));
      if (data.paging.total < 5) {
        // Lấy tham chiếu đến phần tử có id="paging"
        var rowElement = document.getElementById("paging");

        // Ẩn phần tử bằng cách đặt style.display thành "none"
        if (rowElement) {
          rowElement.style.display = "none";
        }
      }
    } catch (error) {
      console.error("Error fetching job vacancies:", error);
    }
  };

  useEffect(() => {
    fetchListDevInterview();
  }, [currentPage]);

  const openModal = (candidateInfo) => {
    setSelectedCandidateInfo(candidateInfo);
    setIsModalOpen(true);
    console.log(candidateInfo);
  };

  const closeModal = () => {
    setSelectedCandidateInfo({});
    setIsModalOpen(false);
  };

  const handleCreateInterview = async () => {
    let check = true;
    setLoading(true);
    if (!document.getElementById("interview-title").value) {
      setInterviewTitlError("Please enter a interview title");
      check = false;
    } else {
      setInterviewTitlError(null);
    }
    if (!document.getElementById("description").value) {
      setDesError("Please enter a description");
      check = false;
    } else {
      setDesError(null);
    }
    if (!document.getElementById("date-of-interview").value) {
      setDateOfInterViewError("Please enter a date of interview");
      check = false;
    } else {
      setDateOfInterViewError(null);
    }
    if (!document.getElementById("startTime").value) {
      setTimeStartError("Please enter the start time of the interview ");
      check = false;
    } else {
      setTimeStartError(null);
    }
    if (!document.getElementById("endTime").value) {
      setTimeEndError("Please enter the end time of the interview");
      check = false;
    } else {
      setTimeEndError(null);
    }
    if (document.getElementById("date-of-interview").value) {
      const currentDate = new Date();
      const selectedDate = new Date(
        document.getElementById("date-of-interview").value
      );

      if (selectedDate < currentDate) {
        setDateOfInterViewError(
          "Please enter a date greater than the current date"
        );
        check = false;
      } else {
        setDateOfInterViewError(null);
      }
    }

    if (
      document.getElementById("endTime").value &&
      document.getElementById("startTime").value &&
      document.getElementById("startTime") !==
        document.getElementById("endTime").value
    ) {
      const startTimeDate = new Date(
        "1970-01-01T" + document.getElementById("startTime").value + "Z"
      );
      const endTimeDate = new Date(
        "1970-01-01T" + document.getElementById("endTime").value + "Z"
      );
      if (startTimeDate > endTimeDate) {
        // Hiển thị thông báo lỗi
        setTimeStartError("Start Time must be before End Time");
        // Cập nhật DOM để hiển thị thông báo
        check = false;
      } else {
        setTimeStartError(null);
      }
    }
    if (check) {
      try {
        const title = document.getElementById("interview-title").value;
        const description = document.getElementById("description").value;
        const dateOfInterview =
          document.getElementById("date-of-interview").value;

        const startTime = document.getElementById("startTime").value + ":00";
        console.log(startTime);
        const endTime = document.getElementById("endTime").value + ":00";
        const queryParams = new URLSearchParams(location.search);
        const requestId = queryParams.get("requestId");
        const response = await interviewServices.createAnInterview(
          requestId,
          title,
          description,
          dateOfInterview,
          startTime,
          endTime
        );
        let data = response.data;
        console.log(data);
        fetchListDevInterview();
        setLoading(false);
        navigate(`/hiringrequestlistincompanypartnerdetail?Id=${requestId}`);
      } catch (error) {
        console.error("Error fetching job vacancies:", error);
        setLoading(false);
      }
    }
    setLoading(false);
  };

  //-----------------------------------------------------------------------------
  // Modal create  interview
  const [isCreateInterviewModal, setIsCreateInterviewModal] = useState(false);

  const CreateInterviewModalOpen = () => {
    setIsCreateInterviewModal(true);
  };
  const CreateInterviewModalClose = () => {
    setIsCreateInterviewModal(false);
  };
  const handleCreateInterviewModal = () => {
    handleCreateInterview();
  };
  //-----------------------------------------------------------------------------

  const removeOutOfWaitingInterview = async (id) => {
    try {
      const queryParams = new URLSearchParams(location.search);
      const requestId = queryParams.get("requestId");
      const response = await developerServices.removeOutOfWaitingInterview(
        requestId,
        id
      );
      console.log(response);
      fetchListDevInterview();
    } catch (error) {
      console.error("Error fetching job vacancies:", error);
    }
  };
  //-------------------------------------------------------------------------------
  const [toggleDevDelID, setToggleDevDelID] = useState([]);

  const [isDelDevInterviewModal, setIsDelDevInterviewModal] = useState(false);

  const delDevInterviewModalOpen = (id) => {
    setIsDelDevInterviewModal(true);
    setToggleDevDelID(id);
  };

  const delDevInterviewModalClose = () => {
    setIsDelDevInterviewModal(false);
  };
  const handleDelDevInterviewModal = () => {
    if (jobListing.length <= 1) {
      console.log("can not delete number of dev < 1 ");
    } else {
      removeOutOfWaitingInterview(toggleDevDelID);
    }
    setIsDelDevInterviewModal(false);
  };

  const codeNameDel = (id) => {
    const fullCodeName = jobListing.find(
      (developer) => developer.developerId == id
    );
    return fullCodeName?.codeName;
  };

  //-------------------------------------------------------------------------------
  return (
    <React.Fragment>
      {/* Overlay cho trạng thái loading */}
      {loading && (
        <div className="overlay" style={{ zIndex: "2000" }}>
          <div className="spinner"></div>
          <div class="loading-text">Loading</div>
        </div>
      )}
      <Section />
      <section class="section">
        <div class="">
          <div class="row  justify-content-center w-100">
            <div class="col-lg-6 ps-5">
              <div class="rounded shadow bg-white p-4">
                <div class="custom-form">
                  <div id="message3"></div>
                  <form
                    method="post"
                    action="php/contact.php"
                    name="contact-form"
                    id="contact-form3"
                  >
                    <h4 class="text-dark mb-3 ">Create Interview :</h4>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group app-label mt-2">
                          <label class="text-muted">Interview Title</label>
                          <input
                            id="interview-title"
                            type="text"
                            class="form-control resume"
                            placeholder=""
                            required
                          ></input>
                          {interviewTitlError && (
                            <p className="text-danger mt-2">
                              {interviewTitlError}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group app-label mt-2">
                          <label class="text-muted">Date of Interview</label>
                          <input
                            id="date-of-interview"
                            type="date"
                            class="form-control resume"
                            placeholder=""
                          ></input>
                          {dateOfInterViewError && (
                            <p className="text-danger mt-2">
                              {dateOfInterViewError}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group app-label mt-2">
                          <label class="text-muted">Start Time</label>
                          <input
                            id="startTime"
                            type="time"
                            class="form-control resume"
                            placeholder=""
                          ></input>
                          {timeStartError && (
                            <p className="text-danger mt-2">{timeStartError}</p>
                          )}
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="form-group app-label mt-2">
                          <label class="text-muted">End Time</label>
                          <input
                            id="endTime"
                            type="time"
                            class="form-control resume"
                            placeholder=""
                          ></input>
                          {timeEndError && (
                            <p className="text-danger mt-2">{timeEndError}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group app-label mt-2">
                          <label class="text-muted">Description</label>
                          <textarea
                            id="description"
                            class="form-control resume"
                            placeholder=""
                            style={{ height: 125 }}
                          ></textarea>
                          {desError && (
                            <p className="text-danger mt-2">{desError}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-lg-12 mt-3 d-flex justify-content-end ">
                        <button
                          type="button"
                          className="btn btn-primary btn-hover"
                          onClick={CreateInterviewModalOpen}
                          disabled={loading}
                        >
                          {loading ? (
                            <RingLoader color="#fff" loading={true} size={20} />
                          ) : (
                            "Create an interview"
                          )}
                        </button>
                        <span class="loader"></span>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="col-lg-6 mb-4">
              <Row>
                <Col lg={12} className="d-flex flex-column gap-2">
                  {jobListing.map((jobListingDetails, key) => (
                    <Card className="job-box card" key={key}>
                      <CardBody className="p-2">
                        <Row>
                          <Col
                            lg={2}
                            className="d-flex justify-content-center align-items-center "
                          >
                            <div onClick={() => openModal(jobListingDetails)}>
                              <img
                                style={{ width: "60%", marginLeft: "15px" }}
                                src={userImage0}
                                alt=""
                                className="img-fluid rounded-3"
                              />
                            </div>
                          </Col>

                          <Col lg={7}>
                            <div className=" mt-lg-0">
                              <h5 className="fs-17 mb-1">
                                <div
                                  className="text-dark"
                                  onClick={() => openModal(jobListingDetails)}
                                >
                                  {jobListingDetails.codeName}
                                </div>
                              </h5>
                              <ul className="list-inline mb-0">
                                <li className="list-inline-item">
                                  <p className="text-muted fs-14 mb-0">
                                    {jobListingDetails.yearOfExperience}
                                  </p>
                                </li>
                                <li className="list-inline-item">
                                  <p className="text-muted fs-14 mb-0">
                                    <i className="mdi mdi-map-marker"></i>{" "}
                                    {jobListingDetails.employmentTypeName}
                                  </p>
                                </li>
                                <li className="list-inline-item">
                                  <p className="text-muted fs-14 mb-0">
                                    <i className="uil uil-wallet"></i>{" "}
                                    {jobListingDetails.averageSalary}$
                                  </p>
                                </li>
                              </ul>
                              <div className="mt-2">
                                <span
                                  className={
                                    jobListingDetails.fullTime === true
                                      ? "badge bg-success-subtle text-success fs-13 mt-1 mx-1"
                                      : jobListingDetails.partTime === true
                                      ? "badge bg-danger-subtle text-danger fs-13 mt-1 mx-1"
                                      : jobListingDetails.freeLance === true
                                      ? "badge bg-primary-subtle text-primary fs-13 mt-1 mx-1"
                                      : jobListingDetails.internship === true
                                      ? "badge bg-blue-subtle text-blue fs-13 mt-1"
                                      : ""
                                  }
                                >
                                  {jobListingDetails.timing}
                                </span>
                                {(jobListingDetails.badges || []).map(
                                  (badgeInner, key) => (
                                    <span
                                      className={`badge ${badgeInner.badgeclassName} fs-13 mt-1`}
                                      key={key}
                                    >
                                      {badgeInner.badgeName}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          </Col>

                          <Col
                            lg={3}
                            className="d-flex align-items-center justify-content-center"
                          >
                            <ul className="list-inline mb-0 d-flex gap-3 ">
                              <li
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="View More"
                              >
                                <div
                                  onClick={() => openModal(jobListingDetails)}
                                  className="avatar-sm bg-success-subtle text-success d-inline-block text-center rounded-circle fs-18"
                                >
                                  <i className="mdi mdi-eye"></i>
                                </div>
                              </li>
                              <li
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Delete"
                              >
                                <div
                                  //   onClick={() =>
                                  //     removeOutOfWaitingInterview(
                                  //       jobListingDetails.developerId
                                  //     )
                                  //   }
                                  onClick={() =>
                                    delDevInterviewModalOpen(
                                      jobListingDetails.developerId
                                    )
                                  }
                                  className="avatar-sm bg-danger-subtle text-danger d-inline-block text-center rounded-circle fs-18"
                                >
                                  <i className="uil uil-trash-alt"></i>
                                </div>
                              </li>
                            </ul>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  ))}

                  <Modal
                    style={{ padding: "10px" }}
                    isOpen={isDelDevInterviewModal}
                    centered
                    tabIndex="-1"
                    contentLabel="Confirm Delete Modal"
                  >
                    <div className="modal-header">
                      <h3>Confirm Delete</h3>
                    </div>
                    <ModalBody>
                      <div>
                        <h6 style={{ color: "#969BA5" }}>
                          Are you sure you would like to delete this developer{" "}
                          {codeNameDel(toggleDevDelID)}
                        </h6>
                      </div>
                    </ModalBody>
                    <div className="d-flex justify-content-center gap-5 mt-4 modal-footer">
                      <button
                        style={{ width: "100px" }}
                        className="btn btn-secondary"
                        onClick={delDevInterviewModalClose}
                      >
                        Cancel
                      </button>
                      <button
                        style={{ width: "100px" }}
                        className="btn btn-danger"
                        onClick={handleDelDevInterviewModal}
                      >
                        Delete
                      </button>
                    </div>
                  </Modal>

                  <Modal
                    style={{ padding: "10px" }}
                    isOpen={isCreateInterviewModal}
                    centered
                    tabIndex="-1"
                    contentLabel="Confirm Create Interview Modal"
                  >
                    <div className="modal-header">
                      <h3>Confirm Create Interview</h3>
                    </div>
                    <ModalBody>
                      <div>
                        <h6 style={{ color: "#969BA5" }}>
                          Are you sure you would like to create interview
                        </h6>
                      </div>
                    </ModalBody>
                    <div className="d-flex justify-content-around   mt-4 modal-footer">
                      <button
                        style={{ width: "100px" }}
                        className="btn btn-danger"
                        onClick={CreateInterviewModalClose}
                      >
                        Cancel
                      </button>
                      <button
                        style={{ width: "100px" }}
                        className="btn btn-primary"
                        onClick={handleCreateInterviewModal}
                      >
                        Create
                      </button>
                    </div>
                  </Modal>
                </Col>
              </Row>
              <Row id="paging">
                <Col lg={12} className="mt-4 pt-2">
                  <nav aria-label="Page navigation example">
                    <div className="pagination job-pagination mb-0 justify-content-center">
                      <li
                        className={`page-item ${
                          currentPage === 1 ? "disabled" : ""
                        }`}
                      >
                        <p
                          className="page-link"
                          to="#"
                          tabIndex="-1"
                          onClick={handlePrevPage}
                        >
                          <i className="mdi mdi-chevron-double-left fs-15"></i>
                        </p>
                      </li>
                      {renderPageNumbers()}
                      <li
                        className={`page-item ${
                          currentPage === totalPages ? "disabled" : ""
                        }`}
                      >
                        <p
                          className="page-link"
                          to="#"
                          onClick={handleNextPage}
                        >
                          <i className="mdi mdi-chevron-double-right fs-15"></i>
                        </p>
                      </li>
                    </div>
                  </nav>
                </Col>
              </Row>
            </div>

            <div>
              <DeveloperDetailInCompanyPopup
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                devId={selectedCandidateInfo.developerId}
              />
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default CreateInterview;

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

const DetailInterviewManager = () => {
  document.title = "Job Details | WeHire - Job Listing Template | Themesdesign";
  const [listDevId, setListDevid] = useState([]);
  const { state } = useLocation();
  const [jobListing, setJobListing] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCandidateInfo, setSelectedCandidateInfo] = useState({});
  let [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hidingPage, setHidingPage] = useState(false);
  const location = useLocation();
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
          <p className="page-link" to="#" onClick={() => handlePageClick(i)}>
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
    // fetchListDevInterview();
    fetchDetailInterview();
  }, [currentPage]);

  const fetchDetailInterview = async () => {
    try {
      const queryParams = new URLSearchParams(location.search);
      const jobId = queryParams.get("Id");
      const response = await interviewServices.getDetailInterviewByInterviewId(
        jobId,
        4,
        currentPage
      );
      const data = response.data;
      document.getElementById("interview-title").value = data.data.title;
      document.getElementById("description").value = data.data.title;
      document.getElementById("date-of-interview").value =
        data.data.dateOfInterview.split("T")[0];
      document.getElementById("startTime").value = data.data.startTime;
      document.getElementById("endTime").value = data.data.endTime;

      const jobListing = data.data.developers.map((dev) => {
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
      if (data.paging.total <= 4) {
        setHidingPage(true);
      }
      setTotalPages(Math.ceil(data.paging.total / pageSize));
      setJobListing(jobListing);
      const developerIds = jobListing.map((job) => job.developerId);
      setListDevid(developerIds);
    } catch (error) {
      console.error("Error fetching job vacancies:", error);
    }
  };

  const accpetInterview = async () => {
    try {
      const queryParams = new URLSearchParams(location.search);
      const interviewId = queryParams.get("Id");
      const response = await interviewServices.approvalByManager(interviewId);
      fetchDetailInterview();
      console.log("thanh cong");
    } catch (error) {
      console.error("Error fetching job vacancies:", error);
    }
  };

  const openModal = (candidateInfo) => {
    setSelectedCandidateInfo(candidateInfo);
    setIsModalOpen(true);
    console.log(candidateInfo);
  };

  const closeModal = () => {
    setSelectedCandidateInfo({});
    setIsModalOpen(false);
  };
  //-----------------------------------------------------------------------------------
  // Modal Accept
  const [isModalAcceptInterViewOpen, setIsModalAcceptInterViewOpen] =
    useState(false);

  const ModalAcceptInterViewOpen = () => {
    setIsModalAcceptInterViewOpen(true);
  };
  const ModalAcceptInterViewClose = () => {
    setIsModalAcceptInterViewOpen(false);
  };
  const handleModalAcceptInterView = () => {
    accpetInterview();
  };

  //-----------------------------------------------------------------------------------
  // Modal Cancel
  const [isModalCancelInterViewOpen, setIsModalCancelInterViewOpen] =
    useState(false);

  const ModalCancelInterViewOpen = () => {
    setIsModalCancelInterViewOpen(true);
  };
  const ModalCancelInterViewClose = () => {
    setIsModalCancelInterViewOpen(false);
  };
  const handleModalCancelInterView = () => { };
  //-----------------------------------------------------------------------------------
  return (
    <React.Fragment>
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
                    <h4 class="text-dark mb-3 ">Detail Interview :</h4>
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
                            readOnly
                          ></input>
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
                            readOnly
                          ></input>
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
                            readOnly
                          ></input>
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
                            readOnly
                          ></input>
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
                            readOnly
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    {/* <div class="row">
                                            <div class="col-lg-12 mt-3 d-flex justify-content-end ">
                                                <button type="button" className="btn btn-primary btn-hover"
                                                // onClick={handleCreateInterview}
                                                >
                                                    Create an interview
                                                </button>
                                            </div>
                                        </div> */}
                  </form>
                </div>
              </div>
              <div className="d-flex justify-content-around mt-4">
                <button
                  style={{
                    width: "45%",
                    padding: "12px",
                    fontSize: "larger",
                    fontWeight: "500",
                  }}
                  class="btn btn-primary"
                  role="button"
                  onClick={ModalAcceptInterViewOpen}
                >
                  <span> Accept Interview</span>
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
                  onClick={ModalCancelInterViewOpen}
                >
                  <span>Cancel Interview</span>
                </button>
                {/* Modal ----------------------------------------------------------------------------------*/}
                <Modal
                  style={{ padding: "10px" }}
                  isOpen={isModalAcceptInterViewOpen}
                  contentLabel="Confirm Accept Interview Modal"
                  centered
                  tabIndex="-1"
                >
                  <div className="modal-header">
                    <h3>Confirm Accept Interview</h3>
                  </div>

                  <ModalBody>
                    <div>
                      <h6 style={{ color: "#969BA5" }}>
                        Are you sure you would like to accept this interview?
                      </h6>
                    </div>
                  </ModalBody>

                  <div className="d-flex justify-content-around modal-footer">
                    <button
                      style={{ width: "100px" }}
                      className="btn btn-danger"
                      onClick={ModalAcceptInterViewClose}
                    >
                      Cancel
                    </button>
                    <button
                      style={{ width: "100px" }}
                      className="btn btn-primary"
                      onClick={handleModalAcceptInterView}
                    >
                      Accept
                    </button>
                  </div>
                </Modal>
                {/* --------------------------------------------------------------------------- */}
                <Modal
                  style={{ padding: "10px" }}
                  isOpen={isModalCancelInterViewOpen}
                  contentLabel="Confirm Cance Interview Modal"
                  centered
                  tabIndex="-1"
                >
                  <div className="modal-header">
                    <h3>Confirm Cancel Interview</h3>
                  </div>

                  <ModalBody>
                    <div>
                      <h6 style={{ color: "#969BA5" }}>
                        Are you sure you would like to cancel this interview?
                      </h6>
                    </div>
                  </ModalBody>

                  <div className="d-flex justify-content-around modal-footer">
                    <button
                      style={{ width: "100px" }}
                      className="btn btn-secondary"
                      onClick={ModalCancelInterViewClose}
                    >
                      Cancel
                    </button>
                    <button
                      style={{ width: "100px" }}
                      className="btn btn-danger"
                      onClick={handleModalCancelInterView}
                    >
                      Reject
                    </button>
                  </div>
                </Modal>
              </div>
            </div>
            <div class="col-lg-6 mb-4">
              <Row>
                {jobListing.map((jobListingDetails, key) => (
                  <Col lg={12} md={6} className="mb-2" key={key}>
                    <CardBody className="p-3 rounded shadow bg-white">
                      <Row className="d-flex align-items-center">
                        <Col lg={2} className="d-flex justify-content-center">
                          <Link onClick={() => openModal(jobListingDetails)}>
                            <img
                              style={{ width: "72px" }}
                              src={userImage0}
                              alt=""
                              className="img-fluid rounded-3"
                            />
                          </Link>
                        </Col>

                        <Col lg={8}>
                          <div className="mt-3 mt-lg-0">
                            <h5 className="fs-17 mb-1">
                              <Link
                                className="text-dark"
                                onClick={() => openModal(jobListingDetails)}
                              >
                                {jobListingDetails.codeName}
                              </Link>
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
                          lg={2}
                          className="d-flex justify-content-center align-items-center"
                        >
                          <ul className="list-inline mb-0">
                            <li
                              className="list-inline-item"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="View More"
                            >
                              <Link
                                onClick={() => openModal(jobListingDetails)}
                                className="avatar-sm bg-success-subtle text-success d-inline-block text-center rounded-circle fs-18"
                              >
                                <i className="mdi mdi-eye"></i>
                              </Link>
                            </li>
                            {/* <li
                                                                className="list-inline-item"
                                                                data-bs-toggle="tooltip"
                                                                data-bs-placement="top"
                                                                title="Delete"
                                                            >
                                                                <Link
                                                                    onClick={() => openModal(jobListingDetails)}

                                                                    to="#"
                                                                    className="avatar-sm bg-danger-subtle text-danger d-inline-block text-center rounded-circle fs-18"
                                                                >
                                                                    <i className="uil uil-trash-alt"></i>
                                                                </Link>
                                                            </li> */}
                          </ul>
                        </Col>
                      </Row>
                    </CardBody>
                  </Col>
                ))}
              </Row>
              {!hidingPage && (
                <Row>
                  <Col lg={12} className="mt-4 pt-2">
                    <nav aria-label="Page navigation example">
                      <div className="pagination job-pagination mb-0 justify-content-center">
                        <li
                          className={`page-item ${currentPage === 1 ? "disabled" : ""
                            }`}
                        >
                          <p
                            className="page-link"
                            tabIndex="-1"
                            onClick={handlePrevPage}
                          >
                            <i className="mdi mdi-chevron-double-left fs-15"></i>
                          </p>
                        </li>
                        {renderPageNumbers()}
                        <li
                          className={`page-item ${currentPage === totalPages ? "disabled" : ""
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
              )}
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

export default DetailInterviewManager;

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
import Select from "react-select";
import reportServices from "../../../services/report.services";
import projectServices from "../../../services/project.services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn,
  faEllipsisVertical,
  faX,
  faPlus,
  faTimes,
  faEllipsis,
  faAngleRight,
  faAngleLeft,
  faGear,
  faCircle,
  faMobileScreen,
  faLocationDot
} from "@fortawesome/free-solid-svg-icons";
import {
  faFlag,
  faCircleXmark,
  faImage,
  faEnvelope,
  faCalendar,

} from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";

const CreateReport = () => {
  document.title = "Job Details | WeHire - Job Listing Template | Themesdesign";
  const [listDevId, setListDevid] = useState([]);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [jobListing, setJobListing] = useState();
  const [projectDetail, setProjectDetail] = useState();
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
  const [options2, setOptions2] = useState([]);
  const [developerState, setDeveloperState] = useState(null);
  const [selectedOptions2, setSelectedOptions2] = useState([]);

  const handleChange2 = (selected) => {
    console.log(selected);
    setSelectedOptions2(selected);
  };

  const fetchReportType = async () => {
    try {
      const response2 = await reportServices.getReportType();
      console.log(response2)

      let formattedTypes = response2.data.data.map((type) => ({
        value: type.reportTypeId.toString(),
        label: type.reportTypeTitle,
      }));
      console.log(formattedTypes)
      setOptions2(formattedTypes);
    } catch (error) {
      console.error("Error fetching types:", error);
    }
  }

  const fetchListDevInterview = async () => {
    console.log("laplai")
    let response;
    try {
      const developerState = location.state?.developer;
      setDeveloperState(developerState);
      response = await developerServices.getDeveloperDetailByDevId(
        developerState.id
      );
      console.log(response);
      const data = response.data;
      setJobListing(data.data);
    } catch (error) {
      console.error("Error fetching job vacancies:", error);
    }
  };

  const fetchProjectOverview = async () => {
    console.log("laplai")
    let response;
    try {
      const projectIdState = location.state?.projectId;
      response = await projectServices.getProjectDetailByProjectId(
        projectIdState
      );
      const data = response.data;
      setProjectDetail(data.data);
    } catch (error) {
      console.error("Error fetching job vacancies:", error);
    }
  };

  const handleCreateReport = async () => {
    setLoading(true);
    let response;
    try {
      const projectIdState = location.state?.projectId;
      const developerState = location.state?.developer;
      const reportTitle = document.getElementById("report-title").value;
      const reportContent = document.getElementById("report-content").value;
      const reportType = selectedOptions2.value;
      response = await reportServices.createReport(
        developerState.id, projectIdState, reportType, reportTitle, reportContent
      );
      console.log(response)
      toast.success("Create report successfully")
      navigate("/reportList")
      CreateInterviewModalClose();
      setLoading(false);
    } catch (error) {
      console.error("Error fetching job vacancies:", error);
      toast.success("Create report fail")
      CreateInterviewModalClose();
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListDevInterview();
    fetchReportType();
    fetchProjectOverview();
  }, []);

  const openModal = (candidateInfo) => {
    setSelectedCandidateInfo(candidateInfo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCandidateInfo({});
    setIsModalOpen(false);
  };

  const CreateInterviewModalOpen = () => {
    let check = true;

    const reportTitle = document.getElementById("report-title").value.trim();
    const reportContent = document.getElementById("report-content").value.trim();
    const reportType = selectedOptions2.value;

    if (!reportTitle || reportTitle == "") {
      setInterviewTitlError("Please enter report title")
      check = false;
    } else {
      setInterviewTitlError("")
    }
    if (!reportContent || reportContent == "") {
      setDesError("Please enter report content")
      check = false;
    } else {
      setDesError("")
    }
    if (!reportType) {
      setDateOfInterViewError("Please choose report type")
      check = false;
    } else {
      setDateOfInterViewError("")
    }
    if (check) {
      setIsCreateInterviewModal(true);
    }
  };

  const [isCreateInterviewModal, setIsCreateInterviewModal] = useState(false);



  const CreateInterviewModalClose = () => {
    setIsCreateInterviewModal(false);
  };



  return (
    <React.Fragment>
      {/* Overlay cho trạng thái loading */}
      {loading && (
        <div className="overlay" style={{ zIndex: "2000" }}>
          <div className="spinner"></div>
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
                    <h4 class="text-dark mb-3 ">Create Report :</h4>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group app-label mt-2">
                          <label class="text-muted">Report Title</label>
                          <input
                            id="report-title"
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
                          <label class="text-muted">Report Type</label>
                          <Select
                            options={options2}
                            value={selectedOptions2}
                            onChange={handleChange2}
                            className="Select Select--level-highest"
                            style={{ maxHeight: '2000px', overflowY: 'auto' }}
                          />
                          {dateOfInterViewError && (
                            <p className="text-danger mt-2">
                              {dateOfInterViewError}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group app-label mt-2">
                          <label class="text-muted">Report content</label>
                          <textarea
                            id="report-content"
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
                            "Report"
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
              {projectDetail && (
                <>
                  <Card className="job-overview ">
                    <CardBody className="p-4">
                      <div className="list-unstyled mb-0 d-flex flex-column gap-3">
                        <h4>Project Overview</h4>
                        <div className="row">
                          <li className="col-lg-6">
                            <div className="d-flex">
                              <i className="uil uil-parking-square icon bg-primary-subtle text-primary"></i>
                              <div className="ms-3">
                                <h6 className="fs-14 mb-0">Project </h6>
                                <p className="text-muted mb-0" id="projectNameOverview"> {projectDetail.projectName}</p>
                              </div>
                            </div>
                          </li>
                          <li className="col-lg-6">
                            <div className="d-flex ">
                              <i className="uil uil-list-ul icon bg-primary-subtle text-primary"></i>
                              <div className="ms-3">
                                <h6 className="fs-14 mb-0">Project type </h6>
                                <p className="text-muted mb-0" id="projectTypeOverview">{projectDetail.projectTypeName}</p>
                              </div>
                            </div>
                          </li>
                        </div>
                        <div className="row">
                          <li className="col-lg-6">
                            <div className="d-flex ">
                              <i className="uil uil-windsock icon bg-primary-subtle text-primary"></i>
                              <div className="ms-3">
                                <h6 className="fs-14 mb-0">Start date of project </h6>
                                <p className="text-muted mb-0" id="startDayOverview">{projectDetail.startDateMMM}</p>
                              </div>
                            </div>
                          </li>
                          <li className="col-lg-6">
                            <div className="d-flex ">
                              <i className="uil uil-times-circle icon bg-primary-subtle text-primary"></i>
                              <div className="ms-3">
                                <h6 className="fs-14 mb-0">End date of project </h6>
                                <p className="text-muted mb-0" id="endDayOverview">{projectDetail.endDateMMM}</p>
                              </div>
                            </div>
                          </li>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </>
              )}
              <Modal
                style={{ padding: "10px" }}
                isOpen={isCreateInterviewModal}
                centered
                tabIndex="-1"
                contentLabel="Confirm Create Interview Modal"
              >
                <div className="modal-header">
                  <h3>Confirm Create Report</h3>
                </div>
                <ModalBody>
                  <div>
                    <h6 style={{ color: "#969BA5" }}>
                      Are you sure you would like to report this developer
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
                    onClick={handleCreateReport}

                  >
                    Create
                  </button>
                </div>
              </Modal>
              <Row className="mt-4">
                <Col lg={12} className="d-flex flex-column gap-2">
                  {jobListing && (
                    <>
                      <div style={{ backgroundColor: "white", borderRadius: "15px" }}>
                        <CardBody className="p-4 dev-accepted  d-flex flex-column gap-1" style={{ borderRadius: "15px" }}>
                          <div className="d-flex mb-2 justify-content-between">
                            <div className="d-flex">
                              <div
                                className="flex-shrink-0 position-relative"
                                onClick={() =>
                                  openModal(developerState)
                                }
                              >
                                <img
                                  src={
                                    developerState.userImg ||
                                    userImage0
                                  }
                                  alt=""
                                  className="avatar-md rounded"
                                />
                                <span
                                  className={
                                    developerState.candidateStatusClassName
                                  }
                                ></span>
                              </div>
                              <div className="ms-3">
                                <div className="primary-link">
                                  <h5
                                    className="fs-17"
                                    onClick={() =>
                                      openModal(developerState)
                                    }
                                  >
                                    {developerState.firstName} {developerState.lastName}
                                  </h5>
                                </div>
                                <span
                                  className={
                                    developerState.hiredDevStatusString ===
                                      "Rejected"
                                      ? "badge bg-danger text-light mb-2"
                                      : developerState.hiredDevStatusString ===
                                        "Under Consideration"
                                        ? "badge bg-warning text-light mb-2"
                                        : developerState.hiredDevStatusString ===
                                          "Working"
                                          ? "badge bg-blue text-light mb-2"
                                          : developerState.hiredDevStatusString ===
                                            "Expired"
                                            ? "badge bg-danger text-light mb-2"
                                            : developerState.hiredDevStatusString ===
                                              "Cancelled"
                                              ? "badge bg-danger text-light mb-2"
                                              : developerState.hiredDevStatusString ===
                                                "Waiting Interview"
                                                ? "badge bg-warning text-light mb-2"
                                                : developerState.hiredDevStatusString ===
                                                  "Onboarding"
                                                  ? "badge bg-primary text-light mb-2"
                                                  : developerState.hiredDevStatusString ===
                                                    "Saved"
                                                    ? "badge bg-info text-light mb-2"
                                                    : ""
                                  }
                                >
                                  {developerState.hiredDevStatusString}
                                </span>{" "}
                              </div>
                            </div>
                            <div className="d-flex gap-1">
                              <div
                                className="list-inline-item"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                onClick={() => openModal(developerState)}
                                title="View More"
                              >
                                <div className="avatar-sm bg-success-subtle text-success d-inline-block text-center rounded-circle fs-18">
                                  <i className="mdi mdi-eye"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row" style={{ alignItems: "center" }}>
                            <FontAwesomeIcon icon={faEnvelope} className="col-lg-1" style={{ padding: "0px" }} />
                            <div className="col-lg-10" style={{ paddingLeft: "0px" }}>
                              {developerState.email}
                            </div>
                          </div >
                          <div className="row" style={{ alignItems: "center" }}>
                            <FontAwesomeIcon icon={faMobileScreen} className="col-lg-1" style={{ padding: "0px" }} />
                            <div className="col-lg-10" style={{ paddingLeft: "0px" }}>
                              {developerState.phoneNumber}
                            </div>
                          </div >
                          <div className="row" style={{ alignItems: "center" }}>
                            <FontAwesomeIcon icon={faLocationDot} className="col-lg-1" style={{ padding: "0px" }} />
                            <div className="col-lg-10" style={{ paddingLeft: "0px" }}>
                              {developerState.employmentTypeName}
                            </div>
                          </div >
                          <div className="row" style={{ alignItems: "center" }}>
                            <FontAwesomeIcon icon={faFlag} className="col-lg-1" style={{ padding: "0px" }} />
                            <div className="col-lg-10" style={{ paddingLeft: "0px" }}>
                              Start day:
                              {developerState.startWorkingDate}
                            </div>
                          </div >
                          <div className="row" style={{ alignItems: "center" }}>
                            <FontAwesomeIcon icon={faCircleXmark} className="col-lg-1" style={{ padding: "0px" }} />
                            <div className="col-lg-10" style={{ paddingLeft: "0px" }}>
                              End day:
                              {developerState.endWorkingDate}
                            </div>
                          </div >


                        </CardBody>
                      </div>
                    </>
                  )}
                </Col>
              </Row>

            </div>

            <div>
              <DeveloperDetailInCompanyPopup
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                devId={selectedCandidateInfo.id}
              />
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default CreateReport;

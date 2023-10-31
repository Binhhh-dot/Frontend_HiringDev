import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Button,
  CardBody,
  Col,
  Row,
  Card,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalBody,
} from "reactstrap";
import assignTaskServices from "../../../services/assignTask.services";
import developerServices from "../../../services/developer.services";
import userSerrvices from "../../../services/user.serrvices";
import Select from "react-select";
import DeveloperDetailInCompanyPopup from "../../Home/SubSection/DeveloperDetailInCompany";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

//Import images

const AssignTaskForStaffDetailInfo = () => {
  const { state } = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectDevInfo, setSelectDevInfo] = useState({});

  //---------------------------------------------------------------
  const [devInAssignTask, setDevInAssignTask] = useState([]);

  const [selectedDev, setSelectedDev] = useState([]);

  let [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;
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

  //---------------------------------------------------------------
  const fetchGetDeveloperUnofficialPaging = async () => {
    let response;
    try {
      response = await developerServices.getDeveloperUnofficialPaging(
        currentPage,
        5
      );
      console.log("danh sach dev unofficial");
      console.log(response.data);

      setDevInAssignTask(response.data.data);

      setTotalPages(Math.ceil(response.data.paging.total / pageSize));
      console.log("total page");
      console.log(totalPages);

      return response;
    } catch (error) {
      console.error("Error fetching Developer Unofficial Paging:", error);
    }
  };

  useEffect(() => {
    fetchGetDeveloperUnofficialPaging();
  }, [currentPage]);

  //---------------------------------------------------------------

  const openModalDevInAssignTask = (candidateInfo) => {
    setSelectDevInfo(candidateInfo);
    setIsModalOpen(true);
    console.log("candidateInfo:");
    console.log(candidateInfo);
  };
  const closeModalDevInAssignTask = () => {
    setSelectDevInfo({});
    setIsModalOpen(false);
  };

  //-----------------------------------------------------------------------------------
  //Get Content
  const [assignTaskDetail, setAssignTaskDetail] = useState([]);
  const [staffDetail, setStaffDetail] = useState([]);
  const [devDetail, setDevDetail] = useState([]);

  const fetchGetAssignTaskDetail = async () => {
    let response;
    try {
      response = await assignTaskServices.getAssignTaskDetail(3);
      setAssignTaskDetail(response.data.data);
      setStaffDetail(response.data.data.staff);
      setDevDetail(response.data.data.devs);
      console.log("assignTaskDetail");
      console.log(response.data.data);

      return response.data.data;
    } catch (error) {
      console.error("Error fetching get assign task detail:", error);
    }
  };

  //-----------------------------------------------------------------------------------
  // Dropdown Action
  const [showDropdown, setShowDropdown] = useState(
    Array(devDetail.length).fill(false)
  );

  const toggleDropdown = (index) => {
    const newShowDropdown = [...showDropdown];
    newShowDropdown[index] = !newShowDropdown[index];
    setShowDropdown(newShowDropdown);
  };

  //------------------------------------------------------------------------------------
  const [pickDeveloperId, setPickDeveloperId] = useState([]);

  console.log("-----DEV ID--------");
  console.log(pickDeveloperId);

  console.log("-----DEV ID---------");
  const fetchChangeRecruitStatusDevTask = async () => {
    let response;
    try {
      response =
        await developerServices.changeStatusDevUnofficialInTaskDetailForStaff(
          pickDeveloperId,
          assignTaskDetail.taskId,
          true
        );
      console.log("Recruit ok");
      fetchGetAssignTaskDetail();
    } catch (error) {
      console.error(
        "Error fetching change recruit status dev task detail:",
        error
      );
    }
  };

  const fetchChangeRejectStatusDevTask = async () => {
    let response;
    try {
      response =
        await developerServices.changeStatusDevUnofficialInTaskDetailForStaff(
          pickDeveloperId,
          assignTaskDetail.taskId,
          false
        );
      console.log("Reject ok");
    } catch (error) {
      console.error(
        "Error fetching change reject status dev task detail:",
        error
      );
    }
  };

  //------------------------------------------------------------------------------------
  const fetchHandleAcceptApproveAssignTask = async () => {
    let response;
    try {
      response = await assignTaskServices.handleApproveAssignTask(
        assignTaskDetail.taskId,
        "string",
        true
      );
      fetchGetAssignTaskDetail();
      setCompleteButtonVisible(true);
      console.log("Accept OK");
    } catch (error) {
      console.error("Error fetching handle approve task:", error);
    }
  };

  //-------------------------------------------------------------------------------------
  const [rejectReason, setRejectReason] = useState("");
  const fetchHandleRejectApproveAsignTask = async () => {
    let response;
    try {
      response = await assignTaskServices.handleApproveAssignTask(
        assignTaskDetail.taskId,
        rejectReason,
        false
      );
      fetchGetAssignTaskDetail();
      console.log("Reject OK");
      console.log(rejectReason);
    } catch (error) {
      console.error("Error fetching handle reject approve task:", error);
    }
  };

  //------------------------------------------------------------------------------------
  const fetchHandleCompleteTask = async () => {
    let response;
    try {
      response = await assignTaskServices.handleCompleteTask(
        assignTaskDetail.taskId
      );
      fetchGetAssignTaskDetail();
      console.log("FINISH OK");
    } catch (error) {
      console.error("Error fetching handle complete task:", error);
      console.log(assignTaskDetail.taskId);
    }
  };

  //------------------------------------------------------------------------------------

  const [completeButtonVisible, setCompleteButtonVisible] = useState(false);

  const [isModalCompleteOpen, setIsModalCompleteOpen] = useState(false);

  // const [messageCHeckNoDone, setMessageCheckNoDone] = useState(false);

  const openModalComplete = () => {
    setIsModalCompleteOpen(true);
  };

  const handleCompleteModalComplete = () => {
    const allSuccess = devDetail.every(
      (item) => item.devTaskStatus === "Success"
    );
    if (allSuccess) {
      fetchHandleCompleteTask();
      setIsModalCompleteOpen(false);
      setCompleteButtonVisible(false);
    } else {
      // setMessageCheckNoDone(true);
      // setTimeout(() => {
      //   setIsModalCompleteOpen(false);
      //   setMessageCheckNoDone(false);
      // }, 3000);
      setIsModalCompleteOpen(false);
      //setMessageCheckNoDone(false);
    }
  };

  const handleCompleteModalNotYet = () => {
    setIsModalCompleteOpen(false);
  };

  //------------------------------------------------------------------------------------

  const [isModalAcceptOpen, setIsModalAcceptOpen] = useState(false);

  const [isModalRejectOpen, setIsModalRejectOpen] = useState(false);

  const openModalAccept = () => {
    setIsModalAcceptOpen(true);
  };

  const handleOKModalAccept = () => {
    //cho viet api
    fetchHandleAcceptApproveAssignTask();
    //
    //fetchGetAssignTaskDetail();
    //setCompleteButtonVisible(true);
    setIsModalAcceptOpen(false);
  };

  const handleCancelModalAccept = () => {
    setIsModalAcceptOpen(false);
  };
  //---------------------------------------------------------
  //--------------------------------------------------------

  const openModalReject = () => {
    setIsModalRejectOpen(true);
  };

  const handleOKModalReject = () => {
    // cho viet api
    if (rejectReason.trim() === "") {
      console.log("Reason not blank");
    } else {
      fetchHandleRejectApproveAsignTask();
      setIsModalRejectOpen(false);
      setCompleteButtonVisible(false);
    }
  };

  const handleCancelModalReject = () => {
    setIsModalRejectOpen(false);
  };

  //------------------------------------------------------------------
  useEffect(() => {
    fetchGetAssignTaskDetail();
  }, [assignTaskDetail.statusString]);
  //------------------------------------------------------------------
  return (
    <React.Fragment>
      <Row>
        {/* form create */}
        <Col lg={6}>
          <div class="rounded shadow bg-white p-3">
            <div class="custom-form">
              <div id="message3"></div>

              <div className="d-flex justify-content-between">
                <h4 class="text-dark mb-3 ">Task Detail</h4>

                <div>
                  <span
                    className={
                      assignTaskDetail.statusString === "Preparing"
                        ? "badge bg-warning-subtle text-warning fs-13 mt-1 mx-1"
                        : assignTaskDetail.statusString === "In Progress"
                        ? "badge bg-info-subtle text-info fs-13 mt-1 mx-1"
                        : assignTaskDetail.statusString === "Done"
                        ? "badge bg-primary-subtle text-primary fs-13 mt-1 mx-1"
                        : assignTaskDetail.statusString === "Cancelled"
                        ? "badge bg-danger-subtle text-danger fs-13 mt-1 mx-1"
                        : ""
                    }
                  >
                    {assignTaskDetail.statusString}
                  </span>
                </div>
              </div>

              <form>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group app-label mt-2">
                      <label class="text-muted">Task Title</label>
                      <input
                        id="task-title"
                        type="text"
                        class="form-control resume"
                        placeholder=""
                        required
                        value={assignTaskDetail.taskTitle}
                      ></input>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group app-label mt-2">
                      <label class="text-muted">Deadline</label>
                      <input
                        id="deadline"
                        type="text"
                        class="form-control resume"
                        placeholder=""
                        value={assignTaskDetail.deadline}
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
                        style={{ height: "fit-content" }}
                        value={assignTaskDetail.description}
                        readOnly
                      ></textarea>
                    </div>
                  </div>
                </div>
              </form>

              {assignTaskDetail.statusString === "Preparing" && (
                <div
                  className="d-flex justify-content-around mt-3"
                  style={{ width: "100%" }}
                >
                  <button
                    className="btn btn-danger"
                    style={{ width: "40%", fontWeight: "500" }}
                    onClick={openModalReject}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-primary"
                    style={{ width: "40%", fontWeight: "500" }}
                    onClick={openModalAccept}
                  >
                    Accept
                  </button>
                </div>
              )}

              <div className="d-flex justify-content-end mt-3">
                <div style={{ width: "40%", marginRight: "40px" }}>
                  {(assignTaskDetail.statusString === "In Progress" ||
                    completeButtonVisible === true) && (
                    <button
                      className="btn btn-primary"
                      style={{
                        padding: "7px 10px",
                        fontWeight: "500",
                        width: "100%",
                      }}
                      onClick={openModalComplete}
                    >
                      Complete
                    </button>
                  )}
                </div>

                <Modal
                  style={{ padding: "10px" }}
                  isOpen={isModalCompleteOpen}
                  contentLabel="Confirm Complete Modal"
                  centered
                  tabIndex="-1"
                >
                  <div className="modal-header">
                    <h3 style={{ textAlign: "center" }}>Complete task</h3>
                  </div>

                  <ModalBody>
                    <div>
                      <h6 style={{ color: "#969BA5" }}>
                        Have you completed the task yet?
                      </h6>
                    </div>
                  </ModalBody>

                  <div className="d-flex justify-content-around modal-footer">
                    <button
                      style={{ width: "100px" }}
                      className="btn btn-danger"
                      onClick={handleCompleteModalNotYet}
                    >
                      Cancel
                    </button>
                    <button
                      style={{ width: "100px" }}
                      className="btn btn-primary"
                      onClick={handleCompleteModalComplete}
                    >
                      Compele
                    </button>
                  </div>
                </Modal>

                {/* ------------------------------------------------------ */}
                <Modal
                  style={{ padding: "10px" }}
                  isOpen={isModalRejectOpen}
                  contentLabel="Confim Reject Task Modal"
                  centered
                  tabIndex="-1"
                >
                  <div className="modal-header">
                    <h3 style={{ textAlign: "center" }}>Reject Task</h3>
                  </div>

                  <ModalBody>
                    <div>
                      <h6 style={{ color: "#969BA5" }}>
                        Are you sure you would like to reject this task? Give us
                        reason.
                      </h6>
                      <textarea
                        style={{ width: "100%", height: "100px" }}
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                      ></textarea>
                    </div>
                  </ModalBody>
                  <div className="d-flex justify-content-around modal-footer">
                    <button
                      className="btn btn-secondary"
                      onClick={handleCancelModalReject}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={handleOKModalReject}
                    >
                      Reject
                    </button>
                  </div>
                </Modal>
                {/* ------------------------------------------------------ */}
                <Modal
                  style={{ padding: "10px" }}
                  isOpen={isModalAcceptOpen}
                  contentLabel="Confim Accept Task Modal"
                  centered
                  tabIndex="-1"
                >
                  <div className="modal-header">
                    <h3 style={{ textAlign: "center" }}>Accept Task</h3>
                  </div>

                  <ModalBody>
                    <div>
                      <h6 style={{ color: "#969BA5" }}>
                        Are you sure would you like to accepted the task?
                      </h6>
                    </div>
                  </ModalBody>
                  <div className="d-flex justify-content-around modal-footer">
                    <button
                      className="btn btn-danger"
                      onClick={handleCancelModalAccept}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={handleOKModalAccept}
                    >
                      Accept
                    </button>
                  </div>
                </Modal>
                {/* ------------------------------------------------------ */}
              </div>
            </div>
          </div>
        </Col>

        <Col lg={6}>
          {/* tieu de list dev */}
          <Row>
            <div className="d-flex justify-content-between mb-2">
              <h4>List Developer</h4>
            </div>
          </Row>
          <div>
            {/* list developer */}
            <Row style={{ gap: "15px" }}>
              {devDetail.map((devDetailNew, key) => (
                <div key={key}>
                  <Card className="job-box-dev-in-assigntask-detail-forstaff card ">
                    <CardBody className="p-2">
                      <Row className="justify-content-evenly">
                        <Col lg={7} className="ms-2">
                          <div className="mt-3 mt-lg-0">
                            <h5 className="fs-17 mb-0">
                              <Link className="text-dark" onClick={() => {}}>
                                {devDetailNew.fullname}
                              </Link>
                            </h5>
                            <ul className="list-inline mb-0">
                              <li className="list-inline-item">
                                <p className="text-muted fs-14 mb-0">
                                  {devDetailNew.yearOfExperience} years
                                </p>
                              </li>
                              <li className="list-inline-item">
                                <p className="text-muted fs-14 mb-0">
                                  <i className="mdi mdi-map-marker"></i>{" "}
                                  {devDetailNew.employmentTypeId === 1
                                    ? "In-office"
                                    : devDetailNew.employmentTypeId === 2
                                    ? "Remote"
                                    : devDetailNew.employmentTypeId === 3
                                    ? "Not Required"
                                    : ""}
                                </p>
                              </li>
                              <li className="list-inline-item">
                                <p className="text-muted fs-14 mb-0">
                                  <i className="uil uil-wallet"></i>{" "}
                                  {devDetailNew.averageSalary} $
                                </p>
                              </li>
                            </ul>
                            <div className="mt-1">
                              <span
                                className={
                                  "badge bg-peru text-light fs-13 mt-1 mx-1"
                                }
                              >
                                {devDetailNew.scheduleTypeId === 1
                                  ? "Full-time"
                                  : devDetailNew.scheduleTypeId === 2
                                  ? "Part-time"
                                  : devDetailNew.scheduleTypeId === 3
                                  ? "Not Required"
                                  : ""}
                              </span>
                              <span
                                className={
                                  "badge bg-purple text-light fs-13 mt-1 mx-1"
                                }
                              >
                                {devDetailNew.levelId === 1
                                  ? "Internship"
                                  : devDetailNew.levelId === 2
                                  ? "Fresher"
                                  : devDetailNew.levelId === 3
                                  ? "Junior"
                                  : devDetailNew.levelId === 4
                                  ? "Mid-Level"
                                  : devDetailNew.levelId === 5
                                  ? "Senior"
                                  : devDetailNew.levelId === 6
                                  ? "Leader"
                                  : devDetailNew.levelId === 7
                                  ? "Project manager"
                                  : ""}
                              </span>
                            </div>
                          </div>
                        </Col>

                        <Col
                          lg={2}
                          className="d-flex align-items-center justify-content-center"
                        >
                          <div>
                            <span
                              className={
                                devDetailNew.devTaskStatus === "Preparing"
                                  ? "badge bg-warning-subtle text-warning fs-13 mt-1 mx-1"
                                  : devDetailNew.devTaskStatus === "Success"
                                  ? "badge bg-primary-subtle text-primary fs-13 mt-1 mx-1"
                                  : devDetailNew.devTaskStatus === "Fail"
                                  ? "badge bg-danger-subtle text-danger fs-13 mt-1 mx-1"
                                  : devDetailNew.devTaskStatus === "In Progress"
                                  ? "badge bg-info-subtle text-info fs-13 mt-1 mx-1"
                                  : devDetailNew.devTaskStatus === "Done"
                                  ? "badge bg-success text-light fs-13 mt-1 mx-1"
                                  : ""
                              }
                            >
                              {devDetailNew.devTaskStatus}
                            </span>
                          </div>
                        </Col>

                        <Col lg={2}>
                          <ul
                            className="list-inline mt-3 mb-0 d-flex justify-content-center"
                            style={{ gap: "15px" }}
                          >
                            <li
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="View More"
                            >
                              <Link
                                onClick={() => {
                                  openModalDevInAssignTask(devDetailNew);
                                }}
                                className="avatar-sm bg-success-subtle text-success d-inline-block text-center rounded-circle fs-18"
                              >
                                <i className="mdi mdi-eye"></i>
                              </Link>
                            </li>

                            <Dropdown
                              isOpen={showDropdown[key]}
                              toggle={() => toggleDropdown(key)}
                            >
                              <DropdownToggle
                                caret
                                style={{
                                  padding: "0px",
                                  backgroundColor: "white",
                                  border: "0px",
                                }}
                              >
                                <li
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title="Action"
                                >
                                  <Link
                                    onClick={() =>
                                      setPickDeveloperId(
                                        devDetailNew.developerId
                                      )
                                    }
                                    className="avatar-sm bg-warning-subtle text-warning d-inline-block text-center rounded-circle fs-18"
                                  >
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                  </Link>
                                </li>
                              </DropdownToggle>

                              <DropdownMenu style={{ zIndex: "1000" }}>
                                <DropdownItem header>
                                  Choose Action
                                </DropdownItem>
                                <DropdownItem divider />

                                <DropdownItem>
                                  <button
                                    className="btn btn-primary"
                                    style={{ width: "100%" }}
                                    onClick={fetchChangeRecruitStatusDevTask}
                                  >
                                    Recruit
                                  </button>
                                </DropdownItem>

                                <DropdownItem>
                                  <button
                                    className="btn btn-danger"
                                    style={{ width: "100%" }}
                                    onClick={fetchChangeRejectStatusDevTask}
                                  >
                                    Reject
                                  </button>
                                </DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
                          </ul>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </div>
              ))}

              <div>
                <DeveloperDetailInCompanyPopup
                  isModalOpen={isModalOpen}
                  closeModal={closeModalDevInAssignTask}
                  devId={selectDevInfo.developerId}
                />
              </div>
            </Row>

            {/* phan trang */}
            <Row>
              <Col lg={12} className="mt-4 pt-2">
                <nav aria-label="Page navigation example">
                  <div className="pagination job-pagination mb-0 justify-content-center">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
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
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <Link
                        className="page-link"
                        to="#"
                        onClick={handleNextPage}
                      >
                        <i className="mdi mdi-chevron-double-right fs-15"></i>
                      </Link>
                    </li>
                  </div>
                </nav>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default AssignTaskForStaffDetailInfo;

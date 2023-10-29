import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CardBody, Col, Row, Card } from "reactstrap";
import assignTaskServices from "../../../services/assignTask.services";
import developerServices from "../../../services/developer.services";
import userServices from "../../../services/user.services";

import DeveloperDetailInCompanyPopup from "../../Home/SubSection/DeveloperDetailInCompany";
//Import images
import userImage0 from "../../../assets/images/user/img-00.jpg";

const AssignTaskDetailsInfo = () => {
  const { state } = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectDevInfo, setSelectDevInfo] = useState({});
  const [selectStaffInfo, setSelectStaffInfo] = useState({});
  //---------------------------------------------------------------
  const [options3, setOptions3] = useState([]);
  const [selectedOptions3, setSelectedOptions3] = useState([]);
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

  //--------------------------------------------------------------------
  //  const [selectedDev, setSelectedDev] = useState([]);

  // chon developer checkbox
  const toggleDevAssignSelection = (candidateId) => () => {
    // kiem tra neu da chon thi loai
    if (selectedDev.includes(candidateId)) {
      setSelectedDev((prevSelected) =>
        prevSelected.filter((id) => id !== candidateId)
      );
    } else {
      //neu chua chon thi them vao mang
      setSelectedDev((prevSelected) => [...prevSelected, candidateId]);
    }
  };

  console.log("developer duoc chon");
  console.log(selectedDev);
  //---------------------------------------------------------------
  const [staffInAssignTask, setStaffInAssignTask] = useState([]);
  const [currentStaffPage, setCurrentStaffPage] = useState(1);
  const [selectedStaff, setSelectedStaff] = useState([]);

  const fetchGetStaff = async () => {
    let response;
    try {
      response = await userServices.getStaff(currentStaffPage, 50);
      setStaffInAssignTask(response.data.data);

      const formattedStaff = response.data.data.map((staffAS) => ({
        value: staffAS.userId.toString(),
        label: staffAS.firstName + " " + staffAS.lastName,
      }));
      setOptions3(formattedStaff);
    } catch (error) {
      console.error("Error fetching Staff Paging:", error);
    }
  };

  const handleChange3 = (selected) => {
    setSelectedOptions3(selected);
    setSelectedStaff([selected.value]);
  };

  console.log("Staff duoc chon");
  console.log(selectedStaff[0]);

  useEffect(() => {
    fetchGetStaff();
  }, [currentStaffPage]);
  //---------------------------------------------------------------

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

  const openModalStaffInAssignTask = (staffInfo) => {
    setSelectStaffInfo(staffInfo);
    setIsModalOpen(true);
    console.log("staff info:");
    console.log(staffInfo);
  };

  const closeModalStaffInAssignTask = () => {
    setSelectStaffInfo({});
    setIsModalOpen(false);
  };
  //-----------------------------------------------------------------------------------
  const fetchCreateAssignTask = async () => {
    //let response;
    try {
      const taskTitle = document.getElementById("task-title").value;
      const deadline = document.getElementById("deadline").value;
      const description = document.getElementById("description").value;
      const response = await assignTaskServices.createAssignTask(
        selectedStaff[0],
        selectedDev,
        taskTitle,
        description,
        deadline
      );

      const data = response.data;
      console.log("Tao Assign Task ÔK");
      return data;
    } catch (error) {
      console.error("Error fetching create task in manager:", error);
    }
  };

  useEffect(() => {
    fetchCreateAssignTask();
  }, []);

  //-----------------------------------------------------------------------------------
  //Get Content
  const [assignTaskDetail, setAssignTaskDetail] = useState({});
  const [staffDetail, setStaffDetail] = useState([]);
  const [devDetail, setDevDetail] = useState([]);

  const fetchGetAssignTaskDetail = async () => {
    let response;
    try {
      response = await assignTaskServices.getAssignTaskDetail(
        state.taskIdForDetail
      );
      setAssignTaskDetail(response.data.data);
      setStaffDetail(response.data.data.staff);
      setDevDetail(response.data.data.devs);
      console.log("assignTaskDetail");
      console.log(state.taskIdForDetail);
      console.log(response.data.data);

      return response.data.data;
    } catch (error) {
      console.error("Error fetching get assign task detail:", error);
    }
  };

  useEffect(() => {
    fetchGetAssignTaskDetail();
  }, []);
  //-----------------------------------------------------------------------------------

  return (
    <React.Fragment>
      <Row>
        {/* form create */}
        <Col lg={6} className="d-flex flex-column gap-4">
          <Row>
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <h4 className="d-flex align-items-end">Assigned Staff</h4>
              </div>
            </div>

            <Card className="job-box card ">
              <CardBody className="p-1">
                <div>
                  <Row className="justify-content-evenly">
                    <div
                      style={{ width: "fit-content" }}
                      className="d-flex align-items-center"
                    >
                      <img
                        style={{ width: "60px" }}
                        src={userImage0}
                        alt=""
                        className="img-fluid rounded-3"
                      />
                    </div>

                    <Col lg={8} className="d-flex align-items-center">
                      <div className="mt-lg-0">
                        <h5 className="fs-17 mb-0">
                          <Link className="text-dark" onClick={() => {}}>
                            {staffDetail.firstName + " " + staffDetail.lastName}
                          </Link>
                        </h5>
                        <ul className="list-inline mb-0">
                          <li className="list-inline-item">
                            <p className="text-muted fs-14 mb-0">
                              <i className="uil uil-envelope"></i>{" "}
                              {staffDetail.email}
                            </p>
                          </li>
                          <br />
                          <li className="list-inline-item">
                            <p className="text-muted fs-14 mb-0">
                              <i className="uil uil-phone-volume"></i>{" "}
                              {staffDetail.phoneNumber}
                            </p>
                          </li>
                        </ul>
                      </div>
                    </Col>

                    <Col lg={2}>
                      <ul
                        className="list-inline mt-3  d-flex justify-content-center"
                        style={{ gap: "15px" }}
                      >
                        <li
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="View More"
                        >
                          <Link
                            onClick={() => {
                              openModalStaffInAssignTask(staffDetail);
                            }}
                            className="avatar-sm bg-success-subtle text-success d-inline-block text-center rounded-circle fs-18"
                          >
                            <i className="mdi mdi-eye"></i>
                          </Link>
                        </li>
                      </ul>
                    </Col>
                  </Row>
                </div>
              </CardBody>
            </Card>
          </Row>

          <Row>
            <div class="rounded shadow bg-white p-4">
              <div class="custom-form">
                <div id="message3"></div>
                <form
                  method="post"
                  action="php/contact.php"
                  name="contact-form"
                  id="contact-form3"
                >
                  <h4 class="text-dark mb-3 ">Task Detail</h4>
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
                          readOnly
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
              </div>
            </div>
          </Row>
        </Col>

        <Col lg={6}>
          {/* staff + tieu de + dropdown */}
          {/* <Row>
            <Col>
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <h4 className="d-flex align-items-end">Assigned Staff</h4>
                </div>
              </div>

              <div className="mt-3">
               

                <div>
                  <Card className="job-box card ">
                    <CardBody className="p-2">
                      <div>
                        <Row className="justify-content-evenly">
                          <Col
                            lg={1}
                            className="d-flex align-items-center ms-2"
                          >
                            <Link onClick={() => {}}>
                              <img
                                src={userImage1}
                                alt=""
                                className="img-fluid rounded-3"
                              />
                            </Link>
                          </Col>

                          <Col lg={8}>
                            <div className="mt-3 mt-lg-0">
                              <h5 className="fs-17 mb-0">
                                <Link className="text-dark" onClick={() => {}}>
                                  {staffDetail.firstName +
                                    " " +
                                    staffDetail.lastName}
                                </Link>
                              </h5>
                              <ul className="list-inline mb-0">
                                <li className="list-inline-item">
                                  <p className="text-muted fs-14 mb-0">
                                    <i className="uil uil-envelope"></i>{" "}
                                    {staffDetail.email}
                                  </p>
                                </li>
                                <br />
                                <li className="list-inline-item">
                                  <p className="text-muted fs-14 mb-0">
                                    <i className="uil uil-phone-volume"></i>{" "}
                                    {staffDetail.phoneNumber}
                                  </p>
                                </li>
                              </ul>
                            </div>
                          </Col>

                          <Col lg={2}>
                            <ul
                              className="list-inline mt-3  d-flex justify-content-center"
                              style={{ gap: "15px" }}
                            >
                              <li
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="View More"
                              >
                                <Link
                                  onClick={() => {
                                    openModalStaffInAssignTask(staffDetail);
                                  }}
                                  className="avatar-sm bg-success-subtle text-success d-inline-block text-center rounded-circle fs-18"
                                >
                                  <i className="mdi mdi-eye"></i>
                                </Link>
                              </li>
                            </ul>
                          </Col>
                        </Row>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </Col>
            <div className="border-bottom border-4 mt-3"></div>
          </Row> */}

          {/* tieu de list dev */}
          <Row>
            <div className="d-flex justify-content-between">
              <h4>List Developer</h4>
            </div>
          </Row>
          <div>
            {/* list developer */}
            <Row style={{ gap: "9px" }}>
              {devDetail.map((devDetailNew, key) => (
                <div
                  key={key}
                  className="d-flex flex-column gap-2"
                  // style={{ maxHeight: "400px", overflowY: "auto" }}
                >
                  <div>
                    <Card className="job-box card ">
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
                                    "badge bg-success-subtle text-success fs-13 mt-1 mx-1"
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
                                    "badge bg-info-subtle text-blue fs-13 mt-1 mx-1"
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
                                  "badge bg-warning-subtle text-warning fs-13 mt-1 mx-1"
                                }
                              >
                                {devDetailNew.devStatusString === "OnTasking"
                                  ? "OnTasking"
                                  : devDetailNew.scheduleTypeId === 2
                                  ? "Part-time"
                                  : devDetailNew.scheduleTypeId === 3
                                  ? "Not Required"
                                  : ""}
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
                            </ul>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              ))}

              <div>
                <DeveloperDetailInCompanyPopup
                  isModalOpen={isModalOpen}
                  closeModal={closeModalDevInAssignTask}
                  devId={selectDevInfo.developerId}
                />
              </div>

              {/* <div>
                <DeveloperDetailInCompanyPopup
                  isModalOpen={isModalOpen}
                  closeModal={closeModalStaffInAssignTask}
                  devId={selectStaffInfo.userId}
                />
              </div> */}
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

export default AssignTaskDetailsInfo;

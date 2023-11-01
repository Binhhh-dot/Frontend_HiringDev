import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CardBody, Col, Row, Card } from "reactstrap";
import assignTaskServices from "../../../services/assignTask.services";
import developerServices from "../../../services/developer.services";
import userSerrvices from "../../../services/user.serrvices";
import Select from "react-select";
//Import images
import userImage0 from "../../../assets/images/user/img-00.jpg";

const AssignTaskCreateDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectDevInfo, setSelectDevInfo] = useState([]);
  const [selectStaffInfo, setSelectStaffInfo] = useState({});

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

      setDevInAssignTask(response.data.data);

      setTotalPages(Math.ceil(response.data.paging.total / pageSize));

      return response;
    } catch (error) {
      console.error("Error fetching Developer Unofficial Paging:", error);
    }
  };

  useEffect(() => {
    fetchGetDeveloperUnofficialPaging();
  }, [currentPage]);

  //--------------------------------------------------------------------

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

  //---------------------------------------------------------------
  const [options3, setOptions3] = useState([]);
  const [selectedOptions3, setSelectedOptions3] = useState([]);

  const [staffInAssignTask, setStaffInAssignTask] = useState([]);
  const [currentStaffPage, setCurrentStaffPage] = useState(1);
  const [selectedStaff, setSelectedStaff] = useState([]);

  const fetchGetStaff = async () => {
    let response;
    try {
      response = await userSerrvices.getStaffPaging(currentStaffPage, 50);
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

  // const openModalDevInAssignTask = (candidateInfo) => {
  //   setSelectDevInfo(candidateInfo);
  //   setIsModalOpen(true);
  //   console.log("candidateInfo:");
  //   console.log(candidateInfo);
  // };
  // const closeModalDevInAssignTask = () => {
  //   setSelectDevInfo({});
  //   setIsModalOpen(false);
  // };

  // const openModalStaffInAssignTask = (staffInfo) => {
  //   setSelectStaffInfo(staffInfo);
  //   setIsModalOpen(true);
  //   console.log("staff info:");
  //   console.log(staffInfo);
  // };

  // const closeModalStaffInAssignTask = () => {
  //   setSelectStaffInfo({});
  //   setIsModalOpen(false);
  // };
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
      fetchGetStaff();
      fetchGetDeveloperUnofficialPaging();
      return data;
    } catch (error) {
      console.error("Error fetching create task in manager:", error);
    }
  };

  // useEffect(() => {
  //   fetchCreateAssignTask();
  // }, []);

  //-----------------------------------------------------------------------------------

  return (
    <React.Fragment>
      <Row>
        {/* form create */}
        <Col lg={6}>
          <div class="rounded shadow bg-white p-4">
            <div class="custom-form">
              <div id="message3"></div>
              <form
                method="post"
                action="php/contact.php"
                name="contact-form"
                id="contact-form3"
              >
                <h4 class="text-dark mb-3 "> Create Task</h4>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group app-label mt-2">
                      <label class="text-muted">Title</label>
                      <input
                        id="task-title"
                        type="text"
                        class="form-control resume"
                        placeholder=""
                        required
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
                        type="date"
                        class="form-control resume"
                        placeholder=""
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
                        style={{ height: 250 }}
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-lg-12 mt-3 d-flex justify-content-end ">
                    <button
                      type="button"
                      className="btn btn-primary btn-hover"
                      onClick={fetchCreateAssignTask}
                    >
                      Create Task
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Col>

        <Col lg={6}>
          {/* staff + tieu de + dropdown */}
          <Row>
            <Col>
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <h4 className="d-flex align-items-end">Assigned Staff</h4>
                </div>
                <div
                  style={{ width: "40%" }}
                  className="d-flex justify-content-end "
                >
                  <div className="flex-column" style={{ width: "100%" }}>
                    <div className="selection-widget">
                      <Select
                        options={options3}
                        value={selectedOptions3}
                        onChange={handleChange3}
                        className="Select Select--level-high"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3">
                {staffInAssignTask.map(
                  (staffInAssignTaskNew, key) =>
                    selectedStaff[0] == staffInAssignTaskNew.userId && (
                      <div key={key}>
                        <Card className="job-box card ">
                          <CardBody className="p-2">
                            <div>
                              <Row>
                                <Col
                                  lg={1}
                                  className="d-flex align-items-center ms-3"
                                >
                                  <Link onClick={() => {}}>
                                    <img
                                      src={userImage0}
                                      alt=""
                                      className="img-fluid rounded-3"
                                    />
                                  </Link>
                                </Col>

                                <Col lg={8}>
                                  <div className="mt-3 mt-lg-0">
                                    <h5 className="fs-17 mb-0">
                                      <Link
                                        className="text-dark"
                                        onClick={() => {}}
                                      >
                                        {staffInAssignTaskNew.firstName +
                                          " " +
                                          staffInAssignTaskNew.lastName}
                                      </Link>
                                    </h5>
                                    <ul className="list-inline mb-0">
                                      <li className="list-inline-item">
                                        <p className="text-muted fs-14 mb-0">
                                          <i className="uil uil-envelope"></i>{" "}
                                          {staffInAssignTaskNew.email}
                                        </p>
                                      </li>
                                      <br />
                                      <li className="list-inline-item">
                                        <p className="text-muted fs-14 mb-0">
                                          <i className="uil uil-phone-volume"></i>{" "}
                                          {staffInAssignTaskNew.phoneNumber}
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
                                        onClick={() => {}}
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
                    )
                )}
              </div>
            </Col>
            <div className="border-bottom border-4 mt-3"></div>
          </Row>

          {/* tieu de list dev */}
          <Row>
            <div className="d-flex justify-content-between mt-3 mb-2">
              <h4>List Developer</h4>
            </div>
          </Row>
          <div>
            {/* list developer */}
            <Row style={{ gap: "9px" }}>
              {devInAssignTask.map((devInAssignTaskNew, key) => (
                <div key={key} className="d-flex flex-column gap-2">
                  <div>
                    <Card className="job-box card ">
                      <CardBody className="p-2">
                        <Row>
                          <Col
                            lg={1}
                            className="d-flex align-items-center ms-3"
                          >
                            <div className="checkbox-all-wrapper-assign-task">
                              <label>
                                <input
                                  type="checkbox"
                                  checked={selectedDev.includes(
                                    devInAssignTaskNew.developerId
                                  )}
                                  onChange={toggleDevAssignSelection(
                                    devInAssignTaskNew.developerId
                                  )}
                                />
                                <span className="checkbox"></span>
                              </label>
                            </div>
                          </Col>

                          <Col lg={8}>
                            <div className="mt-3 mt-lg-0">
                              <h5 className="fs-17 mb-0">
                                <Link className="text-dark" onClick={() => {}}>
                                  {devInAssignTaskNew.fullname}
                                </Link>
                              </h5>
                              <ul className="list-inline mb-0">
                                <li className="list-inline-item">
                                  <p className="text-muted fs-14 mb-0">
                                    {devInAssignTaskNew.yearOfExperience} years
                                  </p>
                                </li>
                                <li className="list-inline-item">
                                  <p className="text-muted fs-14 mb-0">
                                    <i className="mdi mdi-map-marker"></i>{" "}
                                    {devInAssignTaskNew.employmentTypeId === 1
                                      ? "In-office"
                                      : devInAssignTaskNew.employmentTypeId ===
                                        2
                                      ? "Remote"
                                      : devInAssignTaskNew.employmentTypeId ===
                                        3
                                      ? "Not Required"
                                      : ""}
                                  </p>
                                </li>
                                <li className="list-inline-item">
                                  <p className="text-muted fs-14 mb-0">
                                    <i className="uil uil-wallet"></i>{" "}
                                    {devInAssignTaskNew.averageSalary} $
                                  </p>
                                </li>
                              </ul>
                              <div className="mt-1">
                                <span
                                  className={
                                    "badge bg-peru text-light fs-13 mt-1 mx-1"
                                  }
                                >
                                  {devInAssignTaskNew.scheduleTypeId === 1
                                    ? "Full-time"
                                    : devInAssignTaskNew.scheduleTypeId === 2
                                    ? "Part-time"
                                    : devInAssignTaskNew.scheduleTypeId === 3
                                    ? "Not Required"
                                    : ""}
                                </span>
                                <span
                                  className={
                                    "badge bg-purple text-light fs-13 mt-1 mx-1"
                                  }
                                >
                                  {devInAssignTaskNew.levelId === 1
                                    ? "Internship"
                                    : devInAssignTaskNew.levelId === 2
                                    ? "Fresher"
                                    : devInAssignTaskNew.levelId === 3
                                    ? "Junior"
                                    : devInAssignTaskNew.levelId === 4
                                    ? "Mid-Level"
                                    : devInAssignTaskNew.levelId === 5
                                    ? "Senior"
                                    : devInAssignTaskNew.levelId === 6
                                    ? "Leader"
                                    : devInAssignTaskNew.levelId === 7
                                    ? "Project manager"
                                    : ""}
                                </span>
                              </div>
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
                                  onClick={() => {}}
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

export default AssignTaskCreateDetails;

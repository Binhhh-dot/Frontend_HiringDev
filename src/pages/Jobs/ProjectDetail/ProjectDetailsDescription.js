import React, { useRef, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Row,
  Modal,
  ModalBody,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavItem,
  NavLink,
  Nav,
  TabPane,
  TabContent,
} from "reactstrap";
import { Link, Navigate, useLocation } from "react-router-dom";
import DeveloperDetailInManagerPopup from "../../Home/SubSection/DeveloperDetailInManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn,
  faEllipsisVertical,
  faX,
  faPlus,
  faTimes,
  faEllipsis
} from "@fortawesome/free-solid-svg-icons";
import {
  faFlag,
  faCircleXmark,
  faImage,
  faEnvelope,
  faCalendar
} from "@fortawesome/free-regular-svg-icons";
import "./index.css";
import DeveloperDetailInCompanyPopup from "../../Home/SubSection/DeveloperDetailInCompany";
import CreateHiringRequestPopup from "../CreateHiringRequest/CreateHiringRequestPopup";
import userImage0 from "../../../assets/images/user/img-00.jpg";
import projectServices from "../../../services/project.services";
import classnames from "classnames";
import { useNavigate } from "react-router-dom";
import hiringrequestService from "../../../services/hiringrequest.service";
import {
  CheckSquareOutlined,
  UserOutlined,
  AntDesignOutlined
} from "@ant-design/icons";
import jobPositionServices from "../../../services/jobPosition.services";
import JobImage10 from "../../../assets/images/featured-job/img-10.png";
import JobDetailImage from "../../../assets/images/job-detail.jpg";
import { Avatar, Divider, Tooltip } from 'antd';
import developerServices from "../../../services/developer.services";

const ProjectDetailDesciption = () => {
  const location = useLocation();
  const [hiringRequestDetail, setHiringRequestDetail] = useState([]);
  const [listJobPosition, setListJobPosition] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const [jobVacancyList, setJobVacancyList] = useState([]);
  const [projectId, setProjectId] = useState(null);
  const navigate = useNavigate();
  let [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [projectCount, setProjectCount] = useState(1);
  const rowRef = useRef(null);
  const [showScroll, setShowScroll] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [developerOnboardList, setDeveloperOnboardList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [selectedCandidateInfo, setSelectedCandidateInfo] = useState({});
  const [selectedHiringRequestInfo, setSelectedHiringRequestInfo] = useState({});
  const [selectedJobPositionInfo, setSelectedJobPositionInfo] = useState({});


  // const fetchProjectDetails2 = async () => {
  //   try {
  //     const queryParams = new URLSearchParams(location.search);
  //     const jobId = queryParams.get("Id");
  //     const response = await developerServices.GetAllSelectedDevByHR(jobId);
  //     const data = response.data;
  //     const candidategridDetails = data.data.map((dev) => {
  //       return {
  //         id: dev.developerId,
  //         userImg: dev.userImage,
  //         candidateName: dev.firstName + " " + dev.lastName,
  //         candidateStatusClassName:
  //           "profile-active position-absolute badge rounded-circle bg-success",
  //         experience: dev.yearOfExperience + " Years",
  //         jobType: dev.levelRequireName,
  //         codeName: dev.codeName,
  //         salary: dev.averageSalary,
  //         addclassNameBookmark: false,
  //         label: false,
  //         skills: dev.skillRequireStrings,
  //         averagedPercentage: dev.averagedPercentage.toFixed(2),
  //         selectedDevStatus: dev.selectedDevStatus,
  //       };
  //     });
  //     setCandidategridDetails(candidategridDetails);
  //   } catch (error) {
  //     console.error("Error fetching job vacancies:", error);
  //   }
  // };

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

  const openModal = (candidateInfo) => {
    setSelectedCandidateInfo(candidateInfo);
    setIsModalOpen(true);
  };

  const openModalCreateHiringrequest = (hiringRequestId, jobPositionId) => {
    setSelectedHiringRequestInfo(hiringRequestId);
    setSelectedJobPositionInfo(jobPositionId);
    setIsModalCreateOpen(true);
  };

  const closeModal = () => {
    setSelectedCandidateInfo({});
    setIsModalOpen(false);
  };

  const closeModalCreateHiringRequest = () => {
    setSelectedHiringRequestInfo(null);
    setSelectedJobPositionInfo(null);
    setIsModalCreateOpen(false);
    fetchJobVacancies();
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

  const fetchListDeveloperOnboard = async () => {
    try {
      const queryParams = new URLSearchParams(location.search);
      const projectId = queryParams.get("Id");
      const response = await developerServices.getListDeveloperOnboardByProjectId(projectId);
      console.log("list developer onboard:")
      console.log(response)
      const data = response.data;
      const listDeveloperOnboard = data.data.map((dev) => {
        const words = dev.lastName.split(" ");
        let lastWord;
        if (words.length === 1) {
          // Nếu chỉ có một từ, trả về chữ cái cuối cùng của từ đó
          lastWord = words[0].charAt(words[0].length - 1);
        } else {
          // Nếu có nhiều từ, lấy chữ cái đầu tiên của từ cuối cùng
          lastWord = words[words.length - 1].charAt(0);
        }
        return {
          id: dev.developerId,
          userImg: dev.userImage,
          firstName: dev.firstName,
          lastName: dev.lastName,
          candidateName: dev.firstName + " " + dev.lastName,
          candidateStatusClassName:
            "profile-active position-absolute badge rounded-circle bg-success",
          experience: dev.yearOfExperience + " Years",
          jobType: dev.levelRequireName,
          codeName: dev.codeName,
          salary: dev.averageSalary,
          addclassNameBookmark: false,
          label: false,
          skills: dev.skillRequireStrings,
          selectedDevStatus: dev.selectedDevStatus,
          interviewRound: dev.interviewRound,
          userImage: dev.userImage,
          lastWord: lastWord,
          email: dev.email,
        };
      });
      setDeveloperOnboardList(listDeveloperOnboard);
    } catch (error) {
      console.error("Error fetching job vacancies:", error);
    }
  };

  const fetchProjectDetails = async () => {
    let response;
    // const saveData = localStorage.getItem("myData");

    try {
      const queryParams = new URLSearchParams(location.search);
      const projectId = queryParams.get("Id");
      setProjectId(projectId);
      response = await projectServices.getProjectDetailByProjectId(projectId);
      console.log(response.data.data);
      setHiringRequestDetail(response.data.data);
      return response;
    } catch (error) {
      console.error("Error fetching job vacancies:", error);
    }
  };

  const fetchJobPosition = async () => {
    let response;
    // const saveData = localStorage.getItem("myData");

    try {
      const queryParams = new URLSearchParams(location.search);
      const projectId = queryParams.get("Id");
      setProjectId(projectId);
      response = await jobPositionServices.getJobPostionByProjectId(projectId);
      console.log(response.data.data.length);
      setListJobPosition(response.data.data);
      if (response.data.data.length > 3) {
        setShowScroll(true)
      }
      return response;
    } catch (error) {
      console.error("Error fetching job vacancies:", error);
    }
  };

  useEffect(() => {
    fetchJobPosition();
  }, []);

  useEffect(() => {
    fetchListDeveloperOnboard();
  }, []);

  const turnOnScroll = () => {
    setShowScroll(true)
  }

  useEffect(() => {
    fetchProjectDetails();
  }, []);

  const fetchJobVacancies = async () => {
    let response;
    try {
      const queryParams = new URLSearchParams(location.search);
      const projectId2 = queryParams.get("Id");

      response = await hiringrequestService.getHiringRequestByProjectId(
        projectId2
      );
      // }

      const data = response.data;
      const formattedJobVacancies = data.data.map((job) => {
        // Assuming job.typeRequireName and job.levelRequireName are available
        job.skillRequireStrings.unshift(
          job.typeRequireName,
          job.levelRequireName
        );
        return {
          id: job.requestId,
          companyImg: job.companyImage,
          jobDescription: job.jobTitle,
          companyName: job.companyName,
          location: job.numberOfDev + " Developer",
          duration: job.durationMMM,
          numberOfDev: job.numberOfDev,
          done: job.statusString.includes("Done"),

          save: job.statusString.includes("Saved"),
          waitingApproval: job.statusString.includes("Waiting Approval"),
          inProgress: job.statusString.includes("In Progress"),
          rejected: job.statusString.includes("Rejected"),
          expired: job.statusString.includes("Expired"),
          cancelled: job.statusString.includes("Cancelled"),
          finished: job.statusString.includes("Finished"),
          completed: job.statusString.includes("Completed"),

          timing: job.statusString,
          addclassNameBookmark: false,
          showFullSkills: false,
          badges: [],
          experience: job.skillRequireStrings.join(", "),
          statusString: job.statusString,
          positionName: job.positionName,
        };
      });
      console.log(response.data);
      setJobVacancyList(formattedJobVacancies);
      setTotalPages(Math.ceil(data.paging.total / pageSize));
      if (data.paging.total < 6) {
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
    fetchJobVacancies();
  }, []);

  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const createHiringRequest = async (jobPositionId) => {
    const state = { projectId: projectId, jobPositionId: jobPositionId };
    console.log(projectId);
    console.log(jobPositionId);
    navigate("/createhiringrequest", { state });
  };

  const openHiringRequestDetail = (requestId, statusString, jobPositionId) => {
    if (statusString === "Saved") {
      openModalCreateHiringrequest(requestId, jobPositionId);
    } else {
      navigate('/hiringrequestlistincompanypartnerdetail?Id=' + requestId);
    }
  };


  const toggleInput = () => {
    setShowInput(!showInput);
  };

  const createJobPosition = async () => {
    try {
      const queryParams = new URLSearchParams(location.search);
      const projectId = queryParams.get("Id");
      const positionName = document.getElementById("job-position-input").value;
      const response = await jobPositionServices.createJobPosition(projectId, positionName);
      fetchJobPosition();
      toggleInput();
    } catch (error) {
      console.error("Error create Job Position:", error);
    }
  };

  return (
    <React.Fragment>
      <div className="job-detail " style={{ marginTop: "50px" }}>
        <CardBody className="">
          <div class="row  justify-content-center " style={{ margin: "0px" }}>
            <div class="col-lg-11 " style={{ padding: "0px" }}>
              <Card className="job-detail overflow-hidden">
                <div>
                  <div style={{ position: "relative", display: "inline-block", width: "100%" }}>
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/fuprojectteammanagement.appspot.com/o/vivid-blurred-colorful-background.jpg?alt=media&token=dd0ed801-1438-4d7a-af45-98906b7bf882"
                      alt=""
                      className="img-fluid"
                      style={{ width: "100%", height: "200px", objectFit: "cover" }}
                    />
                    <FontAwesomeIcon icon={faImage}
                      style={{ position: "absolute", top: "40", right: "40", transform: "translate(50%, -50%)", zIndex: "1", fontSize: "25px", color: "grey", cursor: "pointer" }}
                    />
                  </div>
                  <div className="job-details-compnay-profile">
                    <img
                      src={JobImage10}
                      alt=""
                      className="img-fluid rounded-3 rounded-3"
                    />
                  </div>
                </div>
                <CardBody classN ame="p-3">
                  <div className="d-flex flex-column gap-3 ">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex gap-3 align-items-center">
                        <h4 className="mb-0">{hiringRequestDetail.projectName}</h4>
                        <ul className="list-inline mb-0 text-lg-end mt-3 mt-lg-0 ">
                          <li>
                            <span
                              className={
                                hiringRequestDetail.statusString === "Rejected"
                                  ? "badge bg-danger text-light "
                                  : hiringRequestDetail.statusString ===
                                    "Preparing"
                                    ? "badge bg-warning text-light "
                                    : hiringRequestDetail.statusString ===
                                      "In Progress"
                                      ? "badge bg-blue text-light "
                                      : hiringRequestDetail.statusString ===
                                        "Expired"
                                        ? "badge bg-danger text-light "
                                        : hiringRequestDetail.statusString ===
                                          "Cancelled"
                                          ? "badge bg-danger text-light "
                                          : hiringRequestDetail.statusString ===
                                            "Finished"
                                            ? "badge bg-primary text-light "
                                            : hiringRequestDetail.statusString ===
                                              "Complete"
                                              ? "badge bg-primary text-light"
                                              : hiringRequestDetail.statusString === "Saved"
                                                ? "badge bg-info text-light "
                                                : ""
                              }
                            >
                              {hiringRequestDetail.statusString}
                            </span>{" "}
                          </li>
                        </ul>
                      </div>
                      <div>
                        <Avatar.Group
                          maxCount={4}
                          maxStyle={{
                            color: '#f56a00',
                            backgroundColor: '#fde3cf',
                          }}
                        >
                          {developerOnboardList.map((candidategridDetailsNew, key) => (
                            <>
                              {candidategridDetailsNew.userImage ? (
                                <Avatar src={candidategridDetailsNew.userImage} />
                              ) : (
                                <Avatar
                                  style={{
                                    backgroundColor: '#f56a00',
                                  }}
                                >
                                  {candidategridDetailsNew.lastWord}
                                </Avatar>
                              )}
                            </>
                          ))}
                        </Avatar.Group>
                      </div>
                    </div>
                    <div style={{ color: "grey" }} className="d-flex gap-4">
                      <div>
                        <FontAwesomeIcon icon={faFlag} style={{ marginRight: "8px" }} />
                        Start date :{" "}
                        {hiringRequestDetail.startDateMMM}
                      </div>
                      <div>
                        <FontAwesomeIcon icon={faCircleXmark} style={{ marginRight: "8px" }} />
                        End date : {" "}
                        {hiringRequestDetail.endDateMMM}
                      </div>
                    </div>
                    <div>
                      <div className="d-flex justify-content-end">
                        <p className="fw-bold" style={{ color: "grey" }}>
                          {hiringRequestDetail.dayLeft} day left 
                        </p>
                      </div>
                      <div className="dev-matching-in-company border border-1">
                        <div
                          className="dev-matching-level-in-company"
                          style={{
                            width: `${70}% `,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
            <div class="col-lg-11 " style={{ padding: "0px" }}>
              <Card
                className="profile-content-page mt-4 mt-lg-0"
                style={{ border: "none" }}
              >
                <Nav
                  className="profile-content-nav nav-pills border-bottom"
                  id="pills-tab"
                  role="tablist"
                >
                  <NavItem role="presentation">
                    <NavLink
                      to="#"
                      className={classnames({ active: activeTab === "1" })}
                      onClick={() => {
                        tabChange("1");
                      }}
                      type="button"
                    // style={{paddingLeft:"0px"}}
                    >
                      Overview
                    </NavLink>
                  </NavItem>
                  <NavItem role="presentation">
                    <NavLink
                      to="#"
                      className={classnames({ active: activeTab === "2" })}
                      onClick={() => {
                        tabChange("2");
                      }}
                      type="button"
                    // style={{paddingLeft:"0px"}}
                    >
                      Hiring Request
                    </NavLink>
                  </NavItem>
                  <NavItem role="presentation">
                    <NavLink
                      to="#"
                      className={classnames({ active: activeTab === "3" })}
                      onClick={() => {
                        tabChange("3");
                      }}
                      type="button"
                    // style={{paddingLeft:"0px"}}
                    >
                      Developer
                    </NavLink>
                  </NavItem>
                </Nav>

                <CardBody className="p-3" style={{ backgroundColor: "#f6f6f6", overflowX: "auto" }} >
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <div>12</div>
                    </TabPane>
                    <TabPane tabId="2">
                      <div className={`${showScroll ? ' show-scroll' : ''}`} ref={rowRef} style={{ minHeight: "100%" }}>
                        <Row className="flex-nowrap gap-3" style={{ marginLeft: "1px", marginBottom: "10px" }}>
                          {listJobPosition.map((jobPosition, key) => (
                            <Col lg={3} md={6} key={key} className="card " style={{ paddingLeft: "0px", paddingRight: "0px", borderRadius: "15px", height: "fit-content" }}>
                              <div className="d-flex flex-column ms-2 mt-2 mb-2 me-2 gap-3" style={{ height: "100%" }} >
                                <div className="d-flex justify-content-between align-items-center">
                                  <div style={{ paddingLeft: "15px", fontWeight: "bold", fontSize: "18px", marginTop: "15px", marginBottom: "8px" }} >
                                    {jobPosition.positionName}
                                  </div>
                                  <FontAwesomeIcon icon={faEllipsis}
                                    style={{ fontSize: "24px", paddingRight: "15px" }}
                                  />
                                </div>
                                <div className="d-flex flex-column gap-3" style={{ height: "100%" }}>
                                  {jobVacancyList.map((jobVacancyListDetails, key) => {
                                    // Check if the positionName is 'job position 2'
                                    if (jobVacancyListDetails.positionName === jobPosition.positionName) {
                                      return (
                                        <div
                                          onClick={() => openHiringRequestDetail(jobVacancyListDetails.id, jobVacancyListDetails.timing, jobPosition.jobPositionId)}
                                          key={key}
                                          style={{ transform: "none" }}
                                          className={
                                            jobVacancyListDetails.addclassNameBookmark === true
                                              ? "job-box bookmark-post card "
                                              : "job-box card "
                                          }
                                        // className="job-box card mt-4"
                                        >
                                          <div className="p-3">
                                            {/* <Row className="align-items-center"> */}
                                            {/* <Col md={3}> */}
                                            <div className="mb-2 mb-md-0 d-flex">
                                              <div
                                                className="text-dark "
                                                style={{ fontWeight: "bold" }}
                                              >
                                                {jobVacancyListDetails.jobDescription}
                                              </div>
                                              <p className="text-muted fs-14 mb-0">
                                                {jobVacancyListDetails.companyName}
                                              </p>
                                            </div>
                                            <div>
                                              <span
                                                className={
                                                  jobVacancyListDetails.waitingApproval === true
                                                    ? "badge bg-warning text-light fs-12 mt-3"
                                                    : jobVacancyListDetails.inProgress === true
                                                      ? "badge bg-blue text-light fs-12 mt-3"
                                                      : jobVacancyListDetails.rejected === true
                                                        ? "badge bg-danger text-light fs-12 mt-3"
                                                        : jobVacancyListDetails.expired === true
                                                          ? "badge bg-darkcyan text-light fs-12 mt-3"
                                                          : jobVacancyListDetails.cancelled === true
                                                            ? "badge bg-secondary text-light fs-12 mt-3"
                                                            : jobVacancyListDetails.finished === true
                                                              ? "badge bg-primary text-light fs-12 mt-3"
                                                              : jobVacancyListDetails.completed === true
                                                                ? "badge bg-success text-light fs-12 mt-3"
                                                                : jobVacancyListDetails.save === true
                                                                  ? "badge bg-teal text-light fs-12 mt-3"
                                                                  : ""
                                                }
                                              >
                                                {jobVacancyListDetails.timing}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="p-3 bg-light">
                                            <Row className="justify-content-between">
                                              <Col md={12}>
                                                <div className="d-flex justify-content-between">
                                                  <div className="d-flex justify-content-center align-items-center">
                                                    <FontAwesomeIcon icon={faCalendar} style={{ marginRight: "8px", fontSize: "18px" }} />
                                                    <div className="mb-0 " style={{ fontWeight: "bold" }}>
                                                      {jobVacancyListDetails.duration}
                                                    </div>
                                                  </div>
                                                  <div className="d-flex justify-content-center align-items-center">
                                                    <UserOutlined style={{ fontSize: "18px" }} />
                                                    <div style={{ marginLeft: "4px" }}>
                                                      {jobVacancyListDetails.numberOfDev}
                                                    </div>
                                                  </div>
                                                </div>
                                              </Col>
                                            </Row>
                                          </div>
                                        </div>
                                      );
                                    } else {
                                      return null; // If it's not 'job position 2', render nothing or handle differently
                                    }
                                  })}
                                  <div
                                    onClick={() =>
                                      openModalCreateHiringrequest(null, jobPosition.jobPositionId)
                                    }
                                    className="d-flex hover-change " style={{ padding: "8px" }}
                                  >
                                    <span style={{ fontSize: "15px", marginRight: "5px" }}>
                                      <FontAwesomeIcon icon={faPlus} />
                                    </span>
                                    <div style={{ fontWeight: "500" }}>
                                      Add a hiring Request
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          ))}
                          {/* {[...Array(projectCount)].map((_, index) => ( // Tạo số lượng cục <Col> tương ứng với projectCount */}
                          <Col lg={3} md={6} style={{ height: "45px", paddingLeft: "0px", paddingRight: "0px", height: "fit-content" }} >
                            {showInput ? (
                              <div className="card">
                                <div className="form-group app-label">
                                  <input
                                    placeholder="Please enter job position"
                                    style={{ width: "94%", margin: "10px 10px 0px 10px" }}
                                    type="text"
                                    className="form-control resume"
                                    id="job-position-input"
                                  />
                                </div>
                                <div className="d-flex gap-3 mt-2 ms-2 mb-2 align-items-center">
                                  <button className="btn btn-blue"
                                    onClick={createJobPosition}
                                  >
                                    Add</button>
                                  <FontAwesomeIcon icon={faTimes} onClick={toggleInput} />
                                </div>
                              </div>
                            ) : (
                              <div className=" card" onClick={toggleInput} style={{ height: "50px" }}>
                                <div style={{ height: "50px", flex: "1" }}>
                                  <div className="d-flex align-items-center justify-content-center" style={{ height: "100%" }}>
                                    <span style={{ fontSize: "15px", marginRight: "5px" }}>
                                      <FontAwesomeIcon icon={faPlus} />
                                    </span>
                                    <div>Add job position</div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Col>
                          {/* ))} */}
                        </Row>
                      </div>
                      <div>
                        <CreateHiringRequestPopup
                          isModalOpen={isModalCreateOpen}
                          closeModal={closeModalCreateHiringRequest}
                          requestId={selectedHiringRequestInfo}
                          jobPositionId={selectedJobPositionInfo}
                        />
                      </div>
                    </TabPane>
                    <TabPane tabId="3">
                      <Row>
                        {developerOnboardList.map((candidategridDetailsNew, key) => (
                          <Col lg={3} md={6} key={key}>
                            <div style={{ backgroundColor: "white", borderRadius: "15px" }}>
                              <CardBody className="p-4 dev-accepted mt-4" style={{ borderRadius: "15px" }}>
                                <div className="d-flex mb-2 justify-content-between">
                                  <div className="d-flex">
                                    <div
                                      className="flex-shrink-0 position-relative"
                                      onClick={() =>
                                        openModal(candidategridDetailsNew)
                                      }
                                    >
                                      <img
                                        src={
                                          candidategridDetailsNew.userImg ||
                                          userImage0
                                        }
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
                                      <div className="primary-link">
                                        <h5
                                          className="fs-17"
                                          onClick={() =>
                                            openModal(candidategridDetailsNew)
                                          }
                                        >
                                          {candidategridDetailsNew.firstName} {candidategridDetailsNew.lastName}
                                        </h5>
                                      </div>
                                      <span
                                        className={
                                          candidategridDetailsNew.selectedDevStatus ===
                                            "Rejected"
                                            ? "badge bg-danger text-light mb-2"
                                            : candidategridDetailsNew.selectedDevStatus ===
                                              "Under Consideration"
                                              ? "badge bg-warning text-light mb-2"
                                              : candidategridDetailsNew.selectedDevStatus ===
                                                "Interview Scheduled"
                                                ? "badge bg-blue text-light mb-2"
                                                : candidategridDetailsNew.selectedDevStatus ===
                                                  "Expired"
                                                  ? "badge bg-danger text-light mb-2"
                                                  : candidategridDetailsNew.selectedDevStatus ===
                                                    "Cancelled"
                                                    ? "badge bg-danger text-light mb-2"
                                                    : candidategridDetailsNew.selectedDevStatus ===
                                                      "Waiting Interview"
                                                      ? "badge bg-warning text-light mb-2"
                                                      : candidategridDetailsNew.selectedDevStatus ===
                                                        "Onboarding"
                                                        ? "badge bg-primary text-light mb-2"
                                                        : candidategridDetailsNew.selectedDevStatus ===
                                                          "Saved"
                                                          ? "badge bg-info text-light mb-2"
                                                          : ""
                                        }
                                      >
                                        {candidategridDetailsNew.selectedDevStatus} dsad
                                      </span>{" "}
                                    </div>
                                  </div>

                                  <div
                                    className="list-inline-item"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    onClick={() => openModal(candidategridDetailsNew)}
                                    title="View More"
                                  >
                                    <div className="avatar-sm bg-success-subtle text-success d-inline-block text-center rounded-circle fs-18">
                                      <i className="mdi mdi-eye"></i>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex gap-2 align-items-center">
                                  <FontAwesomeIcon icon={faEnvelope} />
                                  {candidategridDetailsNew.email}
                                </div>
                              </CardBody>
                            </div>
                          </Col>
                        ))}
                      </Row>
                      <div>
                        <DeveloperDetailInCompanyPopup
                          isModalOpen={isModalOpen}
                          closeModal={closeModal}
                          devId={selectedCandidateInfo.id}
                        />
                      </div>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </div>
          </div>

        </CardBody>
      </div >
    </React.Fragment >
  );
};

export default ProjectDetailDesciption;

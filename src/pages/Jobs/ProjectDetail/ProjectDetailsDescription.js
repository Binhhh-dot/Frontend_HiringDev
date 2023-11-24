import React, { useEffect, useState } from "react";
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
} from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import projectServices from "../../../services/project.services";
import classnames from "classnames";
import { useNavigate } from "react-router-dom";
import hiringrequestService from "../../../services/hiringrequest.service";
import { CheckSquareOutlined, UserOutlined } from "@ant-design/icons";
const ProjectDetailDesciption = () => {
  const location = useLocation();
  const [hiringRequestDetail, setHiringRequestDetail] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const [jobVacancyList, setJobVacancyList] = useState([]);
  const [projectId, setProjectId] = useState(null);
  const navigate = useNavigate();
  let [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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

  useEffect(() => {
    fetchProjectDetails();
  }, []);

  const fetchJobVacancies = async () => {
    let response;
    try {
      // if (search || skill) {
      //   response =
      //     await hiringrequestService.getAllHiringRequestByIdAndJobTitleAndSkill(
      //       companyId,
      //       currentPage,
      //       5,
      //       search,
      //       skill
      //     );
      // } else {
      const queryParams = new URLSearchParams(location.search);
      const projectId2 = queryParams.get("Id");

      response =
        await hiringrequestService.getHiringRequestByProjectIdAndPaging(
          projectId2,
          currentPage,
          5
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
          duration: job.duration,
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

  const createHiringRequest = async () => {
    const state = { projectId: projectId };
    console.log(projectId);
    navigate("/createhiringrequest", { state });
  };

  const openHiringRequestDetail = (id) => {
    navigate("/hiringrequestlistincompanypartnerdetail?Id=" + id);
  };

  return (
    <React.Fragment>
      <div className="job-detail ">
        <CardBody>
          <div className="d-flex justify-content-between">
            <div className="d-flex p-3">
              <div style={{ fontWeight: "bold" }}>
                {hiringRequestDetail.projectName}
              </div>
              <span
                style={{ height: "fit-content" }}
                className={
                  hiringRequestDetail.statusString === "Preparing"
                    ? "badge bg-warning text-light fs-12"
                    : hiringRequestDetail.statusString === "In Progress"
                    ? "badge bg-blue text-light fs-12"
                    : hiringRequestDetail.statusString === "Rejected"
                    ? "badge bg-danger text-light fs-12"
                    : hiringRequestDetail.statusString === "Expired"
                    ? "badge bg-danger text-light fs-12"
                    : hiringRequestDetail.statusString === "Cancelled"
                    ? "badge bg-danger text-light fs-12"
                    : hiringRequestDetail.statusString === "Finished"
                    ? "badge bg-primary text-light fs-12"
                    : hiringRequestDetail.statusString === "Complete"
                    ? "badge bg-primary text-light fs-12"
                    : hiringRequestDetail.statusString === "Saved"
                    ? "badge bg-info text-light fs-12"
                    : ""
                }
              >
                {hiringRequestDetail.statusString}
              </span>
            </div>
            <div
              onClick={createHiringRequest}
              className="btn btn-success"
              id="button-create-interview"
              style={{ backgroundColor: "#02AF74" }}
            >
              Create Hiring Request
            </div>
          </div>

          <Card
            className="profile-content-page mt-4 mt-lg-0"
            style={{ borderTop: "none" }}
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
                >
                  Developer
                </NavLink>
              </NavItem>
            </Nav>

            <CardBody className="p-4" style={{ backgroundColor: "#f6f6f6" }}>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <div>1</div>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    {jobVacancyList.map((jobVacancyListDetails, key) => (
                      <Col lg={3} md={6} className="mt-4" key={key}>
                        <div
                          onClick={() =>
                            openHiringRequestDetail(jobVacancyListDetails.id)
                          }
                          key={key}
                          style={{ transform: "none" }}
                          className={
                            jobVacancyListDetails.addclassNameBookmark === true
                              ? "job-box bookmark-post card mt-4"
                              : "job-box card mt-4"
                          }
                          // className="job-box card mt-4"
                        >
                          <div className="p-3">
                            {/* <Row className="align-items-center"> */}
                            {/* <Col md={3}> */}
                            <div className="mb-2 mb-md-0 d-flex">
                              <div className="d-flex">
                                <CheckSquareOutlined
                                  style={{ fontSize: "20px" }}
                                />
                              </div>
                              <div
                                className="text-dark mx-2"
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
                                  <div
                                    className="mb-0 "
                                    style={{ fontWeight: "bold" }}
                                  >
                                    {jobVacancyListDetails.duration}
                                  </div>
                                  <div className="d-flex justify-content-center align-items-center">
                                    <UserOutlined
                                      style={{ fontSize: "18px" }}
                                    />
                                    <div style={{ marginLeft: "4px" }}>
                                      {jobVacancyListDetails.numberOfDev}
                                    </div>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </TabPane>
                <TabPane tabId="3">
                  <div>3</div>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </CardBody>
      </div>
    </React.Fragment>
  );
};

export default ProjectDetailDesciption;

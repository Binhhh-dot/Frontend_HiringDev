import React, { useEffect, useState } from "react";
import jobImage1 from "../../assets/images/featured-job/img-01.png";
import {
  Col,
  Row,
  NavItem,
  NavLink,
  Nav,
  TabPane,
  TabContent,
  Card,
  CardBody,
  Container,
} from "reactstrap";
import { Link, useBeforeUnload } from "react-router-dom";
import { Layout, Menu, Input, Button, Space, Badge } from "antd";
import projectServices from "../../services/project.services";
import classnames from "classnames";
import { useBootstrapBreakpoints } from "react-bootstrap/esm/ThemeProvider";
import SiderBarWeb from "./SlideBar/SiderBarWeb";
import userAuthorization from "../../utils/userAuthorization";
import { useNavigate, useLocation } from "react-router-dom";
import img0 from "../../assets/images/user/img-00.jpg";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Empty } from "antd";
import NavBarWeb from "./NavBar/NavBarWeb";

const { Header, Footer, Content } = Layout;

const ProjectListInManager = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoad, setIdLoad] = useState(false);
  useEffect(() => {
    const localStorageRole = localStorage.getItem("role");
    if (!localStorageRole) {
      navigate("/signin");
    } else {
      if (!userAuthorization(localStorageRole, location.pathname)) {
        navigate("/error404");
      } else {
        setIdLoad(true);
      }
    }
  }, []);

  //------------------------------------------------------------------------------------------------
  const [searchInProject, setSearchInProject] = useState("");
  //------------------------------------------------------------------------------------------------

  const [projectList, setProjectList] = useState([]);
  //------------------------------------------------------------------------------------------------
  const [projectListPreparing, setProjectListPreparing] = useState([]);
  const [projectListInprogress, setProjectListInprogress] = useState([]);
  //const [projectListComplete, setProjectListComplete] = useState([]);
  const [projectListClosed, setProjectListClosed] = useState([]);
  const [projectListClosingProcess, setProjectListClosingProcess] = useState(
    []
  );

  //------------------------------------------------------------------------------------------------
  let [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 7;
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const fetchGetProjectListPaging = async () => {
    let response;
    try {
      response = await projectServices.getProjectListPaging(currentPage, 7);
      console.log(response.data);
      setProjectList(response.data.data);
      setTotalPages(Math.ceil(response.data.paging.total / pageSize));
    } catch (error) {
      console.error("Error fetching project list paging", error);
    }
  };
  //------------------------------------------------------------------------------------------------
  let [currentPagePreparing, setCurrentPagePreparing] = useState(1);
  const [totalPagesPreparing, setTotalPagesPreparing] = useState(1);
  const pageSizePreparing = 7;
  const handlePageClickPreparing = (page) => {
    setCurrentPagePreparing(page);
  };

  const fetchProjectListPreparing = async () => {
    let response;

    try {
      response = await projectServices.getProjectLisPreparingtPaging(
        currentPagePreparing,
        7
      );
      console.log(response.data.data);
      setProjectListPreparing(response.data.data);
      setTotalPagesPreparing(
        Math.ceil(response.data.paging.total / pageSizePreparing)
      );
    } catch (error) {
      console.error("Error fetching project list preparing", error);
    }
  };

  //------------------------------------------------------------------------------------------------
  let [currentPageInprogress, setCurrentPageInprogress] = useState(1);
  const [totalPagesInprogress, setTotalPagesInprogress] = useState(1);
  const pageSizeInprogress = 7;
  const handlePageClickInprogress = (page) => {
    setCurrentPageInprogress(page);
  };

  const fetchProjectListInprogress = async () => {
    let response;

    try {
      response = await projectServices.getProjectListInprogressPaging(
        currentPageInprogress,
        7
      );
      console.log(response.data.data);

      setProjectListInprogress(response.data.data);
      setTotalPagesInprogress(
        Math.ceil(response.data.paging.total / pageSizeInprogress)
      );
    } catch (error) {
      console.error("Error fetching project list inprogress", error);
    }
  };

  //------------------------------------------------------------------------------------------------
  let [currentPageClosingProcess, setCurrentPageClosingProcess] = useState(1);
  const [totalPagesClosingProcess, setTotalPagesClosingProcess] = useState(1);
  const pageSizeClosingProcess = 7;
  const handlePageClickClosingProcess = (page) => {
    setCurrentPageClosingProcess(page);
  };

  const fetchProjectListClosingProcess = async () => {
    let response;

    try {
      response = await projectServices.getProjectListClosingProcessPaging(
        currentPageClosingProcess,
        7
      );
      console.log(response.data.data);

      setProjectListClosingProcess(response.data.data);
      setTotalPagesClosingProcess(
        Math.ceil(response.data.paging.total / pageSizeClosingProcess)
      );
    } catch (error) {
      console.error("Error fetching project list Complete", error);
    }
  };

  //------------------------------------------------------------------------------------------------
  let [currentPageClosed, setCurrentPageClosed] = useState(1);
  const [totalPagesClosed, setTotalPagesClosed] = useState(1);
  const pageSizeClosed = 7;
  const handlePageClickClosed = (page) => {
    setCurrentPageClosed(page);
  };

  const fetchProjectListClosed = async () => {
    let response;

    try {
      response = await projectServices.getProjectListClosedPaging(
        currentPageClosed,
        7
      );
      console.log(response.data.data);
      setProjectListClosed(response.data.data);
      setTotalPagesClosed(
        Math.ceil(response.data.paging.total / pageSizeClosed)
      );
    } catch (error) {
      console.error("Error fetching project list Cancelled", error);
    }
  };

  //------------------------------------------------------------------------------------------------
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
  //------------------------------------------------------------------------------------------------
  const renderPageNumbersPreparing = () => {
    const pageNumbers = [];
    const maxPageButtons = 4;
    let startPage = Math.max(
      1,
      currentPagePreparing - Math.floor(maxPageButtons / 2)
    );
    let endPage = Math.min(totalPagesPreparing, startPage + maxPageButtons - 1);
    if (
      totalPagesPreparing > maxPageButtons &&
      currentPagePreparing <= Math.floor(maxPageButtons / 2) + 1
    ) {
      endPage = maxPageButtons;
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${i === currentPagePreparing ? "active" : ""}`}
        >
          <Link
            className="page-link"
            to="#"
            onClick={() => handlePageClickPreparing(i)}
          >
            {i}
          </Link>
        </li>
      );
    }
    return pageNumbers;
  };

  const handleNextPagePreparing = () => {
    if (currentPagePreparing < totalPagesPreparing) {
      setCurrentPagePreparing(currentPagePreparing + 1);
    }
  };

  const handlePrevPagePreparing = () => {
    if (currentPagePreparing > 1) {
      setCurrentPagePreparing(currentPagePreparing - 1);
    }
  };
  //------------------------------------------------------------------------------------------------
  const renderPageNumbersInprogress = () => {
    const pageNumbers = [];
    const maxPageButtons = 4;
    let startPage = Math.max(
      1,
      currentPageInprogress - Math.floor(maxPageButtons / 2)
    );
    let endPage = Math.min(
      totalPagesInprogress,
      startPage + maxPageButtons - 1
    );
    if (
      totalPagesInprogress > maxPageButtons &&
      currentPageInprogress <= Math.floor(maxPageButtons / 2) + 1
    ) {
      endPage = maxPageButtons;
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${i === currentPageInprogress ? "active" : ""}`}
        >
          <Link
            className="page-link"
            to="#"
            onClick={() => handlePageClickInprogress(i)}
          >
            {i}
          </Link>
        </li>
      );
    }
    return pageNumbers;
  };

  const handleNextPageInprogress = () => {
    if (currentPageInprogress < totalPagesInprogress) {
      setCurrentPageInprogress(currentPageInprogress + 1);
    }
  };

  const handlePrevPageInprogress = () => {
    if (currentPageInprogress > 1) {
      setCurrentPageInprogress(currentPageInprogress - 1);
    }
  };
  //------------------------------------------------------------------------------------------------
  const renderPageNumbersClosingProcess = () => {
    const pageNumbers = [];
    const maxPageButtons = 4;
    let startPage = Math.max(
      1,
      currentPageClosingProcess - Math.floor(maxPageButtons / 2)
    );
    let endPage = Math.min(
      totalPagesClosingProcess,
      startPage + maxPageButtons - 1
    );
    if (
      totalPagesClosingProcess > maxPageButtons &&
      currentPageClosingProcess <= Math.floor(maxPageButtons / 2) + 1
    ) {
      endPage = maxPageButtons;
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${
            i === currentPageClosingProcess ? "active" : ""
          }`}
        >
          <Link
            className="page-link"
            to="#"
            onClick={() => handlePageClickClosingProcess(i)}
          >
            {i}
          </Link>
        </li>
      );
    }
    return pageNumbers;
  };

  const handleNextPageClosingProcess = () => {
    if (currentPageClosingProcess < totalPagesClosingProcess) {
      setCurrentPageClosingProcess(currentPageClosingProcess + 1);
    }
  };

  const handlePrevPageClosingProcess = () => {
    if (currentPageClosingProcess > 1) {
      setCurrentPageClosingProcess(currentPageClosingProcess - 1);
    }
  };
  //------------------------------------------------------------------------------------------------
  const renderPageNumbersClosed = () => {
    const pageNumbers = [];
    const maxPageButtons = 4;
    let startPage = Math.max(
      1,
      currentPageClosed - Math.floor(maxPageButtons / 2)
    );
    let endPage = Math.min(totalPagesClosed, startPage + maxPageButtons - 1);
    if (
      totalPagesClosed > maxPageButtons &&
      currentPageClosed <= Math.floor(maxPageButtons / 2) + 1
    ) {
      endPage = maxPageButtons;
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${i === currentPageClosed ? "active" : ""}`}
        >
          <Link
            className="page-link"
            to="#"
            onClick={() => handlePageClickClosed(i)}
          >
            {i}
          </Link>
        </li>
      );
    }
    return pageNumbers;
  };

  const handleNextPageClosed = () => {
    if (currentPageClosed < totalPagesClosed) {
      setCurrentPageClosed(currentPageClosed + 1);
    }
  };

  const handlePrevPageClosed = () => {
    if (currentPageClosed > 1) {
      setCurrentPageClosed(currentPageClosed - 1);
    }
  };

  //------------------------------------------------------------------------------------------------
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  //------------------------------------------------------------------------------------------------
  const [activeTab, setActiveTab] = useState("1");
  const tabChange = (tab) => {
    if (activeTab) {
      if (activeTab !== tab) setActiveTab(tab);
    }
  };
  //------------------------------------------------------------------------------------------------
  useEffect(() => {
    fetchGetProjectListPaging();
  }, [currentPage]);

  useEffect(() => {
    fetchProjectListPreparing();
  }, [currentPagePreparing]);

  useEffect(() => {
    fetchProjectListInprogress();
  }, [currentPageInprogress]);

  useEffect(() => {
    fetchProjectListClosingProcess();
  }, [currentPageClosingProcess]);

  useEffect(() => {
    fetchProjectListClosed();
  }, [currentPageClosed]);
  //------------------------------------------------------------------------------------------------
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <React.Fragment>
      <Layout style={{ minHeight: "100vh" }}>
        <SiderBarWeb choose={"menu-key/12"}></SiderBarWeb>

        <Layout>
          <NavBarWeb></NavBarWeb>

          <Content>
            <section
              className="section p-3 "
              style={{
                backgroundColor: "#FFFF",
                borderRadius: "10px",
                margin: "30px",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              }}
            >
              <Container className="px-0">
                <Row className="px-0">
                  <Col className="px-0">
                    <div className="me-lg-6">
                      <h4>Project List</h4>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <Nav
                            className="profile-content-nav nav-pills border-bottom gap-3 mb-3"
                            id="pills-tab"
                            role="tablist"
                          >
                            <NavItem role="presentation">
                              <NavLink
                                to="#"
                                className={classnames("nav-link", {
                                  active: activeTab === "1",
                                })}
                                onClick={() => {
                                  tabChange("1");
                                }}
                                type="button"
                              >
                                All
                              </NavLink>
                            </NavItem>
                            <NavItem role="presentation">
                              <NavLink
                                to="#"
                                className={classnames("nav-link", {
                                  active: activeTab === "2",
                                })}
                                onClick={() => {
                                  tabChange("2");
                                }}
                                type="button"
                              >
                                Preparing
                              </NavLink>
                            </NavItem>
                            <NavItem role="presentation">
                              <NavLink
                                to="#"
                                className={classnames("nav-link", {
                                  active: activeTab === "3",
                                })}
                                onClick={() => {
                                  tabChange("3");
                                }}
                                type="button"
                              >
                                In progress
                              </NavLink>
                            </NavItem>
                            <NavItem role="presentation">
                              <NavLink
                                to="#"
                                className={classnames("nav-link", {
                                  active: activeTab === "4",
                                })}
                                onClick={() => {
                                  tabChange("4");
                                }}
                                type="button"
                              >
                                Closing Process
                              </NavLink>
                            </NavItem>
                            <NavItem role="presentation">
                              <NavLink
                                to="#"
                                className={classnames("nav-link", {
                                  active: activeTab === "5",
                                })}
                                onClick={() => {
                                  tabChange("5");
                                }}
                                type="button"
                              >
                                Closed
                              </NavLink>
                            </NavItem>
                          </Nav>
                        </div>

                        <Space>
                          <Search
                            className="custom-search-input"
                            placeholder="input search text"
                            allowClear
                            enterButton="Search"
                            size="large"
                            onSearch={onSearch}
                          />
                        </Space>
                      </div>
                      <CardBody className="px-0">
                        <TabContent activeTab={activeTab}>
                          <TabPane tabId="1">
                            {projectList.length === 0 ? (
                              <div>
                                <Empty />
                              </div>
                            ) : (
                              <div>
                                <div>
                                  {projectList.map((projectListDetail, key) => (
                                    <div
                                      key={key}
                                      style={{
                                        boxShadow:
                                          "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                                      }}
                                      className={
                                        "job-box-dev-in-list-hiringRequest-for-dev mt-3 card"
                                      }
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
                                                  src={
                                                    projectListDetail.companyImage
                                                  }
                                                  alt=""
                                                  className="img-fluid rounded-3 img-avt-hiring-request"
                                                />
                                              </Link>
                                            </div>
                                          </Col>

                                          <Col md={2}>
                                            <div>
                                              <h5 className="fs-18 mb-0">
                                                <Link
                                                  to="/projectdetail"
                                                  className="text-dark"
                                                  state={{
                                                    projectId:
                                                      projectListDetail.projectId,
                                                    companyId:
                                                      projectListDetail.companyId,
                                                  }}
                                                >
                                                  {
                                                    projectListDetail.projectName
                                                  }
                                                </Link>
                                              </h5>
                                              <p className="text-muted fs-14 mb-0">
                                                {projectListDetail.projectCode}
                                              </p>
                                            </div>
                                          </Col>

                                          <Col md={1}>
                                            <div className="d-flex align-items-center mb-0">
                                              <div className="flex-shrink-0">
                                                <i
                                                  className="uil uil-user-check text-primary me-1"
                                                  style={{ fontSize: "17px" }}
                                                ></i>
                                              </div>
                                              <p className="text-muted mb-0">
                                                {projectListDetail.numberOfDev}
                                              </p>
                                            </div>
                                          </Col>

                                          <Col md={3}>
                                            <div className="d-flex mb-0 align-items-center">
                                              <div className="flex-shrink-0">
                                                <i
                                                  className="uil uil-clock-three text-primary me-1"
                                                  style={{ fontSize: "17px" }}
                                                ></i>
                                              </div>
                                              <p className="text-muted mb-0">
                                                {" "}
                                                {
                                                  projectListDetail.startDate
                                                } - {projectListDetail.endDate}
                                              </p>
                                            </div>
                                          </Col>

                                          <Col md={2}>
                                            <div>
                                              <span>
                                                {projectListDetail.postedTime}
                                              </span>
                                            </div>
                                          </Col>

                                          <Col
                                            md={2}
                                            className="d-flex justify-content-around"
                                          >
                                            <div className="d-flex align-items-center">
                                              <span
                                                className={
                                                  projectListDetail.statusString ===
                                                  "Preparing"
                                                    ? "badge bg-warning text-light fs-12"
                                                    : projectListDetail.statusString ===
                                                      "Closed"
                                                    ? "badge bg-danger text-light fs-12"
                                                    : projectListDetail.statusString ===
                                                      "In process"
                                                    ? "badge bg-blue text-light fs-12"
                                                    : projectListDetail.statusString ===
                                                      "Closing process"
                                                    ? "badge bg-purple text-light fs-12"
                                                    : ""
                                                }
                                              >
                                                {projectListDetail.statusString}
                                              </span>
                                            </div>
                                          </Col>
                                        </Row>
                                      </div>
                                    </div>
                                  ))}
                                </div>
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
                                            currentPage === totalPages
                                              ? "disabled"
                                              : ""
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
                            )}
                          </TabPane>
                          <TabPane tabId="2">
                            {projectListPreparing.length === 0 ? (
                              <div>
                                <Empty />
                              </div>
                            ) : (
                              <div>
                                <div>
                                  {projectListPreparing.map(
                                    (projectListDetail, key) => (
                                      <div
                                        key={key}
                                        style={{
                                          boxShadow:
                                            "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                                        }}
                                        className={
                                          "job-box-dev-in-list-hiringRequest-for-dev mt-3 card"
                                        }
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
                                                    src={
                                                      projectListDetail.companyImage
                                                    }
                                                    alt=""
                                                    className="img-fluid rounded-3 img-avt-hiring-request"
                                                  />
                                                </Link>
                                              </div>
                                            </Col>

                                            <Col md={2}>
                                              <div>
                                                <h5 className="fs-18 mb-0">
                                                  <Link
                                                    to="/projectdetail"
                                                    className="text-dark"
                                                    state={{
                                                      projectId:
                                                        projectListDetail.projectId,
                                                      companyId:
                                                        projectListDetail.companyId,
                                                    }}
                                                  >
                                                    {
                                                      projectListDetail.projectName
                                                    }
                                                  </Link>
                                                </h5>
                                                <p className="text-muted fs-14 mb-0">
                                                  {
                                                    projectListDetail.projectCode
                                                  }
                                                </p>
                                              </div>
                                            </Col>

                                            <Col md={1}>
                                              <div className="d-flex align-items-center mb-0">
                                                <div className="flex-shrink-0">
                                                  <i
                                                    className="uil uil-user-check text-primary me-1"
                                                    style={{ fontSize: "17px" }}
                                                  ></i>
                                                </div>
                                                <p className="text-muted mb-0">
                                                  {
                                                    projectListDetail.numberOfDev
                                                  }
                                                </p>
                                              </div>
                                            </Col>

                                            <Col md={3}>
                                              <div className="d-flex mb-0 align-items-center">
                                                <div className="flex-shrink-0">
                                                  <i
                                                    className="uil uil-clock-three text-primary me-1"
                                                    style={{ fontSize: "17px" }}
                                                  ></i>
                                                </div>
                                                <p className="text-muted mb-0">
                                                  {" "}
                                                  {
                                                    projectListDetail.startDate
                                                  }{" "}
                                                  - {projectListDetail.endDate}
                                                </p>
                                              </div>
                                            </Col>

                                            <Col md={2}>
                                              <div>
                                                <span>
                                                  {projectListDetail.postedTime}
                                                </span>
                                              </div>
                                            </Col>

                                            <Col
                                              md={2}
                                              className="d-flex justify-content-around"
                                            >
                                              <div className="d-flex align-items-center">
                                                <span
                                                  className={
                                                    projectListDetail.statusString ===
                                                    "Preparing"
                                                      ? "badge bg-warning text-light fs-12"
                                                      : projectListDetail.statusString ===
                                                        "Closed"
                                                      ? "badge bg-danger text-light fs-12"
                                                      : projectListDetail.statusString ===
                                                        "In process"
                                                      ? "badge bg-blue text-light fs-12"
                                                      : projectListDetail.statusString ===
                                                        "Completed"
                                                      ? "badge bg-primary text-light fs-12"
                                                      : projectListDetail.statusString ===
                                                        "Closing Process"
                                                      ? "badge bg-purple text-light fs-12"
                                                      : ""
                                                  }
                                                >
                                                  {
                                                    projectListDetail.statusString
                                                  }
                                                </span>
                                              </div>
                                            </Col>
                                          </Row>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                                {/* phan trang */}
                                <Row>
                                  <Col lg={12} className="mt-4 pt-2">
                                    <nav aria-label="Page navigation example">
                                      <div className="pagination job-pagination mb-0 justify-content-center">
                                        <li
                                          className={`page-item ${
                                            currentPagePreparing === 1
                                              ? "disabled"
                                              : ""
                                          }`}
                                        >
                                          <Link
                                            className="page-link"
                                            to="#"
                                            tabIndex="-1"
                                            onClick={handlePrevPagePreparing}
                                          >
                                            <i className="mdi mdi-chevron-double-left fs-15"></i>
                                          </Link>
                                        </li>
                                        {renderPageNumbersPreparing()}
                                        <li
                                          className={`page-item ${
                                            currentPagePreparing ===
                                            totalPagesPreparing
                                              ? "disabled"
                                              : ""
                                          }`}
                                        >
                                          <Link
                                            className="page-link"
                                            to="#"
                                            onClick={handleNextPagePreparing}
                                          >
                                            <i className="mdi mdi-chevron-double-right fs-15"></i>
                                          </Link>
                                        </li>
                                      </div>
                                    </nav>
                                  </Col>
                                </Row>
                              </div>
                            )}
                          </TabPane>
                          <TabPane tabId="3">
                            {projectListInprogress.length === 0 ? (
                              <div>
                                <Empty />
                              </div>
                            ) : (
                              <div>
                                <div>
                                  {projectListInprogress.map(
                                    (projectListDetail, key) => (
                                      <div
                                        key={key}
                                        style={{
                                          boxShadow:
                                            "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                                        }}
                                        className={
                                          "job-box-dev-in-list-hiringRequest-for-dev mt-3 card"
                                        }
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
                                                    src={
                                                      projectListDetail.companyImage
                                                    }
                                                    alt=""
                                                    className="img-fluid rounded-3 img-avt-hiring-request"
                                                  />
                                                </Link>
                                              </div>
                                            </Col>

                                            <Col md={2}>
                                              <div>
                                                <h5 className="fs-18 mb-0">
                                                  <Link
                                                    to="/projectdetail"
                                                    className="text-dark"
                                                    state={{
                                                      projectId:
                                                        projectListDetail.projectId,
                                                      companyId:
                                                        projectListDetail.companyId,
                                                    }}
                                                  >
                                                    {
                                                      projectListDetail.projectName
                                                    }
                                                  </Link>
                                                </h5>
                                                <p className="text-muted fs-14 mb-0">
                                                  {
                                                    projectListDetail.projectCode
                                                  }
                                                </p>
                                              </div>
                                            </Col>

                                            <Col md={1}>
                                              <div className="d-flex align-items-center mb-0">
                                                <div className="flex-shrink-0">
                                                  <i
                                                    className="uil uil-user-check text-primary me-1"
                                                    style={{ fontSize: "17px" }}
                                                  ></i>
                                                </div>
                                                <p className="text-muted mb-0">
                                                  {
                                                    projectListDetail.numberOfDev
                                                  }
                                                </p>
                                              </div>
                                            </Col>

                                            <Col md={3}>
                                              <div className="d-flex mb-0 align-items-center">
                                                <div className="flex-shrink-0">
                                                  <i
                                                    className="uil uil-clock-three text-primary me-1"
                                                    style={{ fontSize: "17px" }}
                                                  ></i>
                                                </div>
                                                <p className="text-muted mb-0">
                                                  {" "}
                                                  {
                                                    projectListDetail.startDate
                                                  }{" "}
                                                  - {projectListDetail.endDate}
                                                </p>
                                              </div>
                                            </Col>

                                            <Col md={2}>
                                              <div>
                                                <span>
                                                  {projectListDetail.postedTime}
                                                </span>
                                              </div>
                                            </Col>

                                            <Col
                                              md={2}
                                              className="d-flex justify-content-around"
                                            >
                                              <div className="d-flex align-items-center">
                                                <span
                                                  className={
                                                    projectListDetail.statusString ===
                                                    "Preparing"
                                                      ? "badge bg-warning text-light fs-12"
                                                      : projectListDetail.statusString ===
                                                        "cancelled"
                                                      ? "badge bg-danger text-light fs-12"
                                                      : projectListDetail.statusString ===
                                                        "In process"
                                                      ? "badge bg-blue text-light fs-12"
                                                      : projectListDetail.statusString ===
                                                        "completed"
                                                      ? "badge bg-primary text-light fs-12"
                                                      : ""
                                                  }
                                                >
                                                  {
                                                    projectListDetail.statusString
                                                  }
                                                </span>
                                              </div>
                                            </Col>
                                          </Row>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                                {/* phan trang */}
                                <Row>
                                  <Col lg={12} className="mt-4 pt-2">
                                    <nav aria-label="Page navigation example">
                                      <div className="pagination job-pagination mb-0 justify-content-center">
                                        <li
                                          className={`page-item ${
                                            currentPageInprogress === 1
                                              ? "disabled"
                                              : ""
                                          }`}
                                        >
                                          <Link
                                            className="page-link"
                                            to="#"
                                            tabIndex="-1"
                                            onClick={handlePrevPageInprogress}
                                          >
                                            <i className="mdi mdi-chevron-double-left fs-15"></i>
                                          </Link>
                                        </li>
                                        {renderPageNumbersInprogress()}
                                        <li
                                          className={`page-item ${
                                            currentPageInprogress ===
                                            totalPagesInprogress
                                              ? "disabled"
                                              : ""
                                          }`}
                                        >
                                          <Link
                                            className="page-link"
                                            to="#"
                                            onClick={handleNextPageInprogress}
                                          >
                                            <i className="mdi mdi-chevron-double-right fs-15"></i>
                                          </Link>
                                        </li>
                                      </div>
                                    </nav>
                                  </Col>
                                </Row>
                              </div>
                            )}
                          </TabPane>
                          <TabPane tabId="4">
                            {projectListClosingProcess.length === 0 ? (
                              <div>
                                <Empty />
                              </div>
                            ) : (
                              <div>
                                <div>
                                  {projectListClosingProcess.map(
                                    (projectListDetail, key) => (
                                      <div
                                        key={key}
                                        style={{
                                          boxShadow:
                                            "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                                        }}
                                        className={
                                          "job-box-dev-in-list-hiringRequest-for-dev mt-3 card"
                                        }
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
                                                    src={
                                                      projectListDetail.companyImage
                                                    }
                                                    alt=""
                                                    className="img-fluid rounded-3 img-avt-hiring-request"
                                                  />
                                                </Link>
                                              </div>
                                            </Col>

                                            <Col md={2}>
                                              <div>
                                                <h5 className="fs-18 mb-0">
                                                  <Link
                                                    to="/projectdetail"
                                                    className="text-dark"
                                                    state={{
                                                      projectId:
                                                        projectListDetail.projectId,
                                                      companyId:
                                                        projectListDetail.companyId,
                                                    }}
                                                  >
                                                    {
                                                      projectListDetail.projectName
                                                    }
                                                  </Link>
                                                </h5>
                                                <p className="text-muted fs-14 mb-0">
                                                  {
                                                    projectListDetail.projectCode
                                                  }
                                                </p>
                                              </div>
                                            </Col>

                                            <Col md={1}>
                                              <div className="d-flex align-items-center mb-0">
                                                <div className="flex-shrink-0">
                                                  <i
                                                    className="uil uil-user-check text-primary me-1"
                                                    style={{ fontSize: "17px" }}
                                                  ></i>
                                                </div>
                                                <p className="text-muted mb-0">
                                                  {
                                                    projectListDetail.numberOfDev
                                                  }
                                                </p>
                                              </div>
                                            </Col>

                                            <Col md={3}>
                                              <div className="d-flex mb-0 align-items-center">
                                                <div className="flex-shrink-0">
                                                  <i
                                                    className="uil uil-clock-three text-primary me-1"
                                                    style={{ fontSize: "17px" }}
                                                  ></i>
                                                </div>
                                                <p className="text-muted mb-0">
                                                  {" "}
                                                  {
                                                    projectListDetail.startDate
                                                  }{" "}
                                                  - {projectListDetail.endDate}
                                                </p>
                                              </div>
                                            </Col>

                                            <Col md={2}>
                                              <div>
                                                <span>
                                                  {projectListDetail.postedTime}
                                                </span>
                                              </div>
                                            </Col>

                                            <Col
                                              md={2}
                                              className="d-flex justify-content-around"
                                            >
                                              <div className="d-flex align-items-center">
                                                <span
                                                  className={
                                                    projectListDetail.statusString ===
                                                    "Preparing"
                                                      ? "badge bg-warning text-light fs-12"
                                                      : projectListDetail.statusString ===
                                                        "Closed"
                                                      ? "badge bg-danger text-light fs-12"
                                                      : projectListDetail.statusString ===
                                                        "In process"
                                                      ? "badge bg-blue text-light fs-12"
                                                      : projectListDetail.statusString ===
                                                        "completed"
                                                      ? "badge bg-primary text-light fs-12"
                                                      : projectListDetail.statusString ===
                                                        "Closing process"
                                                      ? "badge bg-purple text-light fs-12"
                                                      : ""
                                                  }
                                                >
                                                  {
                                                    projectListDetail.statusString
                                                  }
                                                </span>
                                              </div>
                                            </Col>
                                          </Row>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                                {/* phan trang */}
                                <Row>
                                  <Col lg={12} className="mt-4 pt-2">
                                    <nav aria-label="Page navigation example">
                                      <div className="pagination job-pagination mb-0 justify-content-center">
                                        <li
                                          className={`page-item ${
                                            currentPageClosingProcess === 1
                                              ? "disabled"
                                              : ""
                                          }`}
                                        >
                                          <Link
                                            className="page-link"
                                            to="#"
                                            tabIndex="-1"
                                            onClick={
                                              handlePrevPageClosingProcess
                                            }
                                          >
                                            <i className="mdi mdi-chevron-double-left fs-15"></i>
                                          </Link>
                                        </li>
                                        {renderPageNumbersClosingProcess()}
                                        <li
                                          className={`page-item ${
                                            currentPageClosingProcess ===
                                            totalPagesClosingProcess
                                              ? "disabled"
                                              : ""
                                          }`}
                                        >
                                          <Link
                                            className="page-link"
                                            to="#"
                                            onClick={
                                              handleNextPageClosingProcess
                                            }
                                          >
                                            <i className="mdi mdi-chevron-double-right fs-15"></i>
                                          </Link>
                                        </li>
                                      </div>
                                    </nav>
                                  </Col>
                                </Row>
                              </div>
                            )}
                          </TabPane>
                          <TabPane tabId="5">
                            {projectListClosed.length === 0 ? (
                              <div>
                                <Empty />
                              </div>
                            ) : (
                              <div>
                                <div>
                                  {projectListClosed.map(
                                    (projectListDetail, key) => (
                                      <div
                                        key={key}
                                        style={{
                                          boxShadow:
                                            "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                                        }}
                                        className={
                                          "job-box-dev-in-list-hiringRequest-for-dev mt-3 card"
                                        }
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
                                                    src={
                                                      projectListDetail.companyImage
                                                    }
                                                    alt=""
                                                    className="img-fluid rounded-3 img-avt-hiring-request"
                                                  />
                                                </Link>
                                              </div>
                                            </Col>

                                            <Col md={2}>
                                              <div>
                                                <h5 className="fs-18 mb-0">
                                                  <Link
                                                    to="/projectdetail"
                                                    className="text-dark"
                                                    state={{
                                                      projectId:
                                                        projectListDetail.projectId,
                                                      companyId:
                                                        projectListDetail.companyId,
                                                    }}
                                                  >
                                                    {
                                                      projectListDetail.projectName
                                                    }
                                                  </Link>
                                                </h5>
                                                <p className="text-muted fs-14 mb-0">
                                                  {
                                                    projectListDetail.projectCode
                                                  }
                                                </p>
                                              </div>
                                            </Col>

                                            <Col md={1}>
                                              <div className="d-flex align-items-center mb-0">
                                                <div className="flex-shrink-0">
                                                  <i
                                                    className="uil uil-user-check text-primary me-1"
                                                    style={{ fontSize: "17px" }}
                                                  ></i>
                                                </div>
                                                <p className="text-muted mb-0">
                                                  {
                                                    projectListDetail.numberOfDev
                                                  }
                                                </p>
                                              </div>
                                            </Col>

                                            <Col md={3}>
                                              <div className="d-flex mb-0 align-items-center">
                                                <div className="flex-shrink-0">
                                                  <i
                                                    className="uil uil-clock-three text-primary me-1"
                                                    style={{ fontSize: "17px" }}
                                                  ></i>
                                                </div>
                                                <p className="text-muted mb-0">
                                                  {" "}
                                                  {
                                                    projectListDetail.startDate
                                                  }{" "}
                                                  - {projectListDetail.endDate}
                                                </p>
                                              </div>
                                            </Col>

                                            <Col md={2}>
                                              <div>
                                                <span>
                                                  {projectListDetail.postedTime}
                                                </span>
                                              </div>
                                            </Col>

                                            <Col
                                              md={2}
                                              className="d-flex justify-content-around"
                                            >
                                              <div className="d-flex align-items-center">
                                                <span
                                                  className={
                                                    projectListDetail.statusString ===
                                                    "Preparing"
                                                      ? "badge bg-warning text-light fs-12"
                                                      : projectListDetail.statusString ===
                                                        "Closed"
                                                      ? "badge bg-danger text-light fs-12"
                                                      : projectListDetail.statusString ===
                                                        "In process"
                                                      ? "badge bg-blue text-light fs-12"
                                                      : projectListDetail.statusString ===
                                                        "completed"
                                                      ? "badge bg-primary text-light fs-12"
                                                      : ""
                                                  }
                                                >
                                                  {
                                                    projectListDetail.statusString
                                                  }
                                                </span>
                                              </div>
                                            </Col>
                                          </Row>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                                {/* phan trang */}
                                <Row>
                                  <Col lg={12} className="mt-4 pt-2">
                                    <nav aria-label="Page navigation example">
                                      <div className="pagination job-pagination mb-0 justify-content-center">
                                        <li
                                          className={`page-item ${
                                            currentPageClosed === 1
                                              ? "disabled"
                                              : ""
                                          }`}
                                        >
                                          <Link
                                            className="page-link"
                                            to="#"
                                            tabIndex="-1"
                                            onClick={handlePrevPageClosed}
                                          >
                                            <i className="mdi mdi-chevron-double-left fs-15"></i>
                                          </Link>
                                        </li>
                                        {renderPageNumbersClosed()}
                                        <li
                                          className={`page-item ${
                                            currentPageClosed ===
                                            totalPagesClosed
                                              ? "disabled"
                                              : ""
                                          }`}
                                        >
                                          <Link
                                            className="page-link"
                                            to="#"
                                            onClick={handleNextPageClosed}
                                          >
                                            <i className="mdi mdi-chevron-double-right fs-15"></i>
                                          </Link>
                                        </li>
                                      </div>
                                    </nav>
                                  </Col>
                                </Row>
                              </div>
                            )}
                          </TabPane>
                        </TabContent>
                      </CardBody>
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
          </Content>
        </Layout>
      </Layout>
    </React.Fragment>
  );
};

export default ProjectListInManager;

import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Card,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabPane,
  TabContent,
  Container,
} from "reactstrap";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { Input, Space, Layout, Badge } from "antd";
import SiderBarWeb from "./SlideBar/SiderBarWeb";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import img0 from "../../assets/images/user/img-00.jpg";
import reportServices from "../../services/report.services";
import NavBarWeb from "./NavBar/NavBarWeb";
import { Empty } from "antd";

const { Header, Footer, Content } = Layout;

const ReportList = () => {
  const [reportList, setReportList] = useState([]);
  const [reportListPending, setReportListPending] = useState([]);
  const [reportListProcessing, setReportListProcessing] = useState([]);
  const [reportListDone, setReportListDone] = useState([]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  //-----------------------------------------------------------------------------------
  //Search
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  //-----------------------------------------------------------------------------------
  const [activeTab, setActiveTab] = useState("1");
  const tabChange = (tab) => {
    if (activeTab) {
      if (activeTab !== tab) setActiveTab(tab);
    }
  };
  //-----------------------------------------------------------------------------------
  let [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 7;
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

  //-----------------------------------------------------------------------------------
  let [currentPagePending, setCurrentPagePending] = useState(1);
  const [totalPagesPending, setTotalPagesPending] = useState(1);

  const pageSizePending = 7;
  const handlePageClickPending = (page) => {
    setCurrentPagePending(page);
  };

  const renderPageNumbersPending = () => {
    const pageNumbers = [];
    const maxPageButtons = 4;
    let startPage = Math.max(
      1,
      currentPagePending - Math.floor(maxPageButtons / 2)
    );
    let endPage = Math.min(totalPagesPending, startPage + maxPageButtons - 1);
    if (
      totalPagesPending > maxPageButtons &&
      currentPagePending <= Math.floor(maxPageButtons / 2) + 1
    ) {
      endPage = maxPageButtons;
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${i === currentPagePending ? "active" : ""}`}
        >
          <Link
            className="page-link"
            to="#"
            onClick={() => handlePageClickPending(i)}
          >
            {i}
          </Link>
        </li>
      );
    }

    return pageNumbers;
  };

  const handleNextPagePending = () => {
    if (currentPagePending < totalPagesPending) {
      setCurrentPagePending(currentPagePending + 1);
    }
  };

  const handlePrevPagePending = () => {
    if (currentPagePending > 1) {
      setCurrentPagePending(currentPagePending - 1);
    }
  };
  //-----------------------------------------------------------------------------------
  let [currentPageProcessing, setCurrentPageProcessing] = useState(1);
  const [totalPagesProcessing, setTotalPagesProcessing] = useState(1);

  const pageSizeProcessing = 7;
  const handlePageClickProcessing = (page) => {
    setCurrentPageProcessing(page);
  };

  const renderPageNumbersProcessing = () => {
    const pageNumbers = [];
    const maxPageButtons = 4;
    let startPage = Math.max(
      1,
      currentPageProcessing - Math.floor(maxPageButtons / 2)
    );
    let endPage = Math.min(
      totalPagesProcessing,
      startPage + maxPageButtons - 1
    );
    if (
      totalPagesProcessing > maxPageButtons &&
      currentPageProcessing <= Math.floor(maxPageButtons / 2) + 1
    ) {
      endPage = maxPageButtons;
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${i === currentPageProcessing ? "active" : ""}`}
        >
          <Link
            className="page-link"
            to="#"
            onClick={() => handlePageClickProcessing(i)}
          >
            {i}
          </Link>
        </li>
      );
    }

    return pageNumbers;
  };

  const handleNextPageProcessing = () => {
    if (currentPageProcessing < totalPagesProcessing) {
      setCurrentPagePending(currentPagePending + 1);
    }
  };

  const handlePrevPageProcessing = () => {
    if (currentPageProcessing > 1) {
      setCurrentPageProcessing(currentPageProcessing - 1);
    }
  };

  //-----------------------------------------------------------------------------------
  let [currentPageDone, setCurrentPageDone] = useState(1);
  const [totalPagesDone, setTotalPagesDone] = useState(1);

  const pageSizeDone = 7;
  const handlePageClickDone = (page) => {
    setCurrentPageDone(page);
  };

  const renderPageNumbersDone = () => {
    const pageNumbers = [];
    const maxPageButtons = 4;
    let startPage = Math.max(
      1,
      currentPageDone - Math.floor(maxPageButtons / 2)
    );
    let endPage = Math.min(totalPagesDone, startPage + maxPageButtons - 1);
    if (
      totalPagesDone > maxPageButtons &&
      currentPageDone <= Math.floor(maxPageButtons / 2) + 1
    ) {
      endPage = maxPageButtons;
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${i === currentPageDone ? "active" : ""}`}
        >
          <Link
            className="page-link"
            to="#"
            onClick={() => handlePageClickDone(i)}
          >
            {i}
          </Link>
        </li>
      );
    }

    return pageNumbers;
  };

  const handleNextPageDone = () => {
    if (currentPageDone < totalPagesDone) {
      setCurrentPageDone(currentPageDone + 1);
    }
  };

  const handlePrevPageDone = () => {
    if (currentPageDone > 1) {
      setCurrentPageDone(currentPageDone - 1);
    }
  };

  //-----------------------------------------------------------------------------------
  const fetchGetReportList = async () => {
    let response;
    try {
      response = await reportServices.getReportList(currentPage, 7);
      console.log(response.data.data);
      setReportList(response.data.data);
      setTotalPages(Math.ceil(response.data.paging.total / pageSize));
    } catch (error) {
      console.error("Error fetching list report:", error);
    }
  };
  //-----------------------------------------------------------------------------------
  const fetchGetReportListPending = async () => {
    let response;

    try {
      response = await reportServices.getReportListPendingPaging(
        currentPagePending,
        7
      );
      console.log(response.data.data);

      setReportListPending(response.data.data);
      setTotalPagesPending(
        Math.ceil(response.data.paging.total / pageSizePending)
      );
    } catch (error) {
      console.error("Error fetching list report pending:", error);
    }
  };
  //-----------------------------------------------------------------------------------
  const fetchGetReportListProcessing = async () => {
    let response;
    try {
      response = await reportServices.getReportListProcessingPaging(
        currentPageProcessing,
        7
      );
      console.log(response.data.data);

      setReportListProcessing(response.data.data);
      setTotalPagesProcessing(
        Math.ceil(response.data.paging.total / pageSizeProcessing)
      );
    } catch (error) {
      console.error("Error fetching list report processing:", error);
    }
  };
  //-----------------------------------------------------------------------------------
  const fetchGetReportListDone = async () => {
    let response;

    try {
      response = await reportServices.getReportListDonePaging(
        currentPageDone,
        7
      );
      console.log(response.data.data);

      setReportListDone(response.data.data);
      setTotalPagesDone(Math.ceil(response.data.paging.total / pageSizeDone));
    } catch (error) {
      console.error("Error fetching list report done:", error);
    }
  };
  //-----------------------------------------------------------------------------------
  useEffect(() => {
    fetchGetReportList();
  }, []);

  useEffect(() => {
    fetchGetReportListPending();
  }, []);

  useEffect(() => {
    fetchGetReportListProcessing();
  }, []);

  useEffect(() => {
    fetchGetReportListDone();
  }, []);
  //-----------------------------------------------------------------------------------
  return (
    <React.Fragment>
      <Layout style={{ minHeight: "100vh" }}>
        <SiderBarWeb choose={"menu-key/16"}></SiderBarWeb>
        <Layout>
          <NavBarWeb></NavBarWeb>

          <Content>
            <section
              className="section p-3"
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
                      <div>
                        <div className="mb-2">
                          <h4>Report List</h4>
                        </div>

                        <div className="d-flex justify-content-between">
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
                                Pending
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
                                Processing
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
                                Done
                              </NavLink>
                            </NavItem>
                          </Nav>

                          <div className="d-flex align-items-center ">
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
                        </div>

                        <CardBody className="px-0">
                          <TabContent activeTab={activeTab}>
                            <TabPane tabId="1">
                              {reportList.length === 0 ? (
                                <div>
                                  <Empty />
                                </div>
                              ) : (
                                <div>
                                  {reportList.map((reportListNew, key) => (
                                    <div
                                      key={key}
                                      className="job-box-dev-in-list-hiringRequest-for-dev card mt-3"
                                      style={{
                                        boxShadow:
                                          "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                                      }}
                                    >
                                      <CardBody className="p-2">
                                        <Row className="align-items-center justify-content-evenly">
                                          <Col md={1}>
                                            <div className="d-flex justify-content-center">
                                              <i
                                                className="uil uil-clipboard-notes"
                                                style={{ fontSize: "50px" }}
                                              ></i>
                                            </div>
                                          </Col>

                                          <Col md={2}>
                                            <div>
                                              <h5 className="fs-18 mb-0">
                                                <Link
                                                  to="/listreportinmanagerdetail"
                                                  className="text-dark"
                                                  state={{
                                                    reportId:
                                                      reportListNew.reportId,
                                                    developerId:
                                                      reportListNew.developerId,
                                                    projectId:
                                                      reportListNew.projectId,
                                                  }}
                                                >
                                                  {reportListNew.reportTitle}
                                                </Link>
                                              </h5>
                                              <p className="text-muted fs-14 mb-0">
                                                {
                                                  reportListNew.companyPartnerName
                                                }
                                              </p>
                                            </div>
                                          </Col>

                                          <Col md={3}>
                                            <div className="d-flex flex-column gap-1 justify-content-center">
                                              <div>
                                                <p className="text-muted mb-0 fs-13">
                                                  Project Name
                                                </p>
                                                <p
                                                  className="mb-0 fs-17"
                                                  style={{ fontWeight: "600" }}
                                                >
                                                  {reportListNew.projectName}
                                                </p>
                                              </div>
                                              <div>
                                                <p className="text-muted mb-0 fs-13">
                                                  Project Code
                                                </p>
                                                <p
                                                  className="mb-0 fs-17"
                                                  style={{ fontWeight: "600" }}
                                                >
                                                  {reportListNew.projectCode}
                                                </p>
                                              </div>
                                            </div>
                                          </Col>

                                          <Col md={3}>
                                            <div className="d-flex flex-column gap-1 justify-content-center">
                                              <div>
                                                <p className="text-muted mb-0 fs-13">
                                                  Developer Name
                                                </p>
                                                <p
                                                  className="mb-0 fs-17"
                                                  style={{ fontWeight: "600" }}
                                                >
                                                  {reportListNew.developerName}
                                                </p>
                                              </div>
                                              <div>
                                                <p className="text-muted mb-0 fs-13">
                                                  Developer Code
                                                </p>
                                                <p
                                                  className="mb-0 fs-17"
                                                  style={{ fontWeight: "600" }}
                                                >
                                                  {reportListNew.developerCode}
                                                </p>
                                              </div>
                                            </div>
                                          </Col>

                                          <Col
                                            md={1}
                                            className="d-flex justify-content-start"
                                          >
                                            <div className="d-flex align-items-center">
                                              <span
                                                className={
                                                  reportListNew.statusString ===
                                                  "Pending"
                                                    ? "badge bg-warning text-light fs-12"
                                                    : reportListNew.statusString ===
                                                      "Processing"
                                                    ? "badge bg-blue text-light fs-12"
                                                    : reportListNew.statusString ===
                                                      "Done"
                                                    ? "badge bg-newGreen text-light fs-12"
                                                    : ""
                                                }
                                              >
                                                {reportListNew.statusString}
                                              </span>
                                            </div>
                                          </Col>
                                        </Row>
                                      </CardBody>
                                    </div>
                                  ))}

                                  {/* ---------------------------------------------------------------------- */}
                                  {/* phan trang */}
                                  <Row>
                                    <Col lg={12} className="mt-4 pt-2">
                                      <nav aria-label="Page navigation example">
                                        <div className="pagination job-pagination mb-0 justify-content-center">
                                          <li
                                            className={`page-item ${
                                              currentPage === 1
                                                ? "disabled"
                                                : ""
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
                              {reportListPending.length === 0 ? (
                                <div>
                                  <Empty />
                                </div>
                              ) : (
                                <div>
                                  {reportListPending.map(
                                    (reportListNew, key) => (
                                      <div
                                        key={key}
                                        className="job-box-dev-in-list-hiringRequest-for-dev card mt-3"
                                        style={{
                                          boxShadow:
                                            "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                                        }}
                                      >
                                        <CardBody className="p-2">
                                          <Row className="align-items-center justify-content-evenly">
                                            <Col md={1}>
                                              <div className="d-flex justify-content-center">
                                                <i
                                                  className="uil uil-clipboard-notes"
                                                  style={{ fontSize: "50px" }}
                                                ></i>
                                              </div>
                                            </Col>

                                            <Col md={2}>
                                              <div>
                                                <h5 className="fs-18 mb-0">
                                                  <Link
                                                    to="/listreportinmanagerdetail"
                                                    className="text-dark"
                                                    state={{
                                                      reportId:
                                                        reportListNew.reportId,
                                                      developerId:
                                                        reportListNew.developerId,
                                                      projectId:
                                                        reportListNew.projectId,
                                                    }}
                                                  >
                                                    {reportListNew.reportTitle}
                                                  </Link>
                                                </h5>
                                                <p className="text-muted fs-14 mb-0">
                                                  {
                                                    reportListNew.companyPartnerName
                                                  }
                                                </p>
                                              </div>
                                            </Col>

                                            <Col md={3}>
                                              <div className="d-flex flex-column gap-1 justify-content-center">
                                                <div>
                                                  <p className="text-muted mb-0 fs-13">
                                                    Project Name
                                                  </p>
                                                  <p
                                                    className="mb-0 fs-17"
                                                    style={{
                                                      fontWeight: "600",
                                                    }}
                                                  >
                                                    {reportListNew.projectName}
                                                  </p>
                                                </div>
                                                <div>
                                                  <p className="text-muted mb-0 fs-13">
                                                    Project Code
                                                  </p>
                                                  <p
                                                    className="mb-0 fs-17"
                                                    style={{
                                                      fontWeight: "600",
                                                    }}
                                                  >
                                                    {reportListNew.projectCode}
                                                  </p>
                                                </div>
                                              </div>
                                            </Col>

                                            <Col md={3}>
                                              <div className="d-flex flex-column gap-1 justify-content-center">
                                                <div>
                                                  <p className="text-muted mb-0 fs-13">
                                                    Developer Name
                                                  </p>
                                                  <p
                                                    className="mb-0 fs-17"
                                                    style={{
                                                      fontWeight: "600",
                                                    }}
                                                  >
                                                    {
                                                      reportListNew.developerName
                                                    }
                                                  </p>
                                                </div>
                                                <div>
                                                  <p className="text-muted mb-0 fs-13">
                                                    Developer Code
                                                  </p>
                                                  <p
                                                    className="mb-0 fs-17"
                                                    style={{
                                                      fontWeight: "600",
                                                    }}
                                                  >
                                                    {
                                                      reportListNew.developerCode
                                                    }
                                                  </p>
                                                </div>
                                              </div>
                                            </Col>

                                            <Col
                                              md={1}
                                              className="d-flex justify-content-start"
                                            >
                                              <div className="d-flex align-items-center">
                                                <span
                                                  className={
                                                    reportListNew.statusString ===
                                                    "Pending"
                                                      ? "badge bg-warning text-light fs-12"
                                                      : reportListNew.statusString ===
                                                        "Processing"
                                                      ? "badge bg-blue text-light fs-12"
                                                      : reportListNew.statusString ===
                                                        "Done"
                                                      ? "badge bg-newGreen text-light fs-12"
                                                      : ""
                                                  }
                                                >
                                                  {reportListNew.statusString}
                                                </span>
                                              </div>
                                            </Col>
                                          </Row>
                                        </CardBody>
                                      </div>
                                    )
                                  )}

                                  {/* ---------------------------------------------------------------------- */}
                                  {/* phan trang */}
                                  <Row>
                                    <Col lg={12} className="mt-4 pt-2">
                                      <nav aria-label="Page navigation example">
                                        <div className="pagination job-pagination mb-0 justify-content-center">
                                          <li
                                            className={`page-item ${
                                              currentPagePending === 1
                                                ? "disabled"
                                                : ""
                                            }`}
                                          >
                                            <Link
                                              className="page-link"
                                              to="#"
                                              tabIndex="-1"
                                              onClick={handlePrevPagePending}
                                            >
                                              <i className="mdi mdi-chevron-double-left fs-15"></i>
                                            </Link>
                                          </li>
                                          {renderPageNumbersPending()}
                                          <li
                                            className={`page-item ${
                                              currentPagePending ===
                                              totalPagesPending
                                                ? "disabled"
                                                : ""
                                            }`}
                                          >
                                            <Link
                                              className="page-link"
                                              to="#"
                                              onClick={handleNextPagePending}
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
                              {reportListProcessing.length === 0 ? (
                                <div>
                                  <Empty />
                                </div>
                              ) : (
                                <div>
                                  {reportListProcessing.map(
                                    (reportListNew, key) => (
                                      <div
                                        key={key}
                                        className="job-box-dev-in-list-hiringRequest-for-dev card mt-3"
                                        style={{
                                          boxShadow:
                                            "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                                        }}
                                      >
                                        <CardBody className="p-2">
                                          <Row className="align-items-center justify-content-evenly">
                                            <Col md={1}>
                                              <div className="d-flex justify-content-center">
                                                <i
                                                  className="uil uil-clipboard-notes"
                                                  style={{ fontSize: "50px" }}
                                                ></i>
                                              </div>
                                            </Col>

                                            <Col md={2}>
                                              <div>
                                                <h5 className="fs-18 mb-0">
                                                  <Link
                                                    to="/listreportinmanagerdetail"
                                                    className="text-dark"
                                                    state={{
                                                      reportId:
                                                        reportListNew.reportId,
                                                      developerId:
                                                        reportListNew.developerId,
                                                      projectId:
                                                        reportListNew.projectId,
                                                    }}
                                                  >
                                                    {reportListNew.reportTitle}
                                                  </Link>
                                                </h5>
                                                <p className="text-muted fs-14 mb-0">
                                                  {
                                                    reportListNew.companyPartnerName
                                                  }
                                                </p>
                                              </div>
                                            </Col>

                                            <Col md={3}>
                                              <div className="d-flex flex-column gap-1 justify-content-center">
                                                <div>
                                                  <p className="text-muted mb-0 fs-13">
                                                    Project Name
                                                  </p>
                                                  <p
                                                    className="mb-0 fs-17"
                                                    style={{
                                                      fontWeight: "600",
                                                    }}
                                                  >
                                                    {reportListNew.projectName}
                                                  </p>
                                                </div>
                                                <div>
                                                  <p className="text-muted mb-0 fs-13">
                                                    Project Code
                                                  </p>
                                                  <p
                                                    className="mb-0 fs-17"
                                                    style={{
                                                      fontWeight: "600",
                                                    }}
                                                  >
                                                    {reportListNew.projectCode}
                                                  </p>
                                                </div>
                                              </div>
                                            </Col>

                                            <Col md={3}>
                                              <div className="d-flex flex-column gap-1 justify-content-center">
                                                <div>
                                                  <p className="text-muted mb-0 fs-13">
                                                    Developer Name
                                                  </p>
                                                  <p
                                                    className="mb-0 fs-17"
                                                    style={{
                                                      fontWeight: "600",
                                                    }}
                                                  >
                                                    {
                                                      reportListNew.developerName
                                                    }
                                                  </p>
                                                </div>
                                                <div>
                                                  <p className="text-muted mb-0 fs-13">
                                                    Developer Code
                                                  </p>
                                                  <p
                                                    className="mb-0 fs-17"
                                                    style={{
                                                      fontWeight: "600",
                                                    }}
                                                  >
                                                    {
                                                      reportListNew.developerCode
                                                    }
                                                  </p>
                                                </div>
                                              </div>
                                            </Col>

                                            <Col
                                              md={1}
                                              className="d-flex justify-content-start"
                                            >
                                              <div className="d-flex align-items-center">
                                                <span
                                                  className={
                                                    reportListNew.statusString ===
                                                    "Pending"
                                                      ? "badge bg-warning text-light fs-12"
                                                      : reportListNew.statusString ===
                                                        "Processing"
                                                      ? "badge bg-blue text-light fs-12"
                                                      : reportListNew.statusString ===
                                                        "Done"
                                                      ? "badge bg-newGreen text-light fs-12"
                                                      : ""
                                                  }
                                                >
                                                  {reportListNew.statusString}
                                                </span>
                                              </div>
                                            </Col>
                                          </Row>
                                        </CardBody>
                                      </div>
                                    )
                                  )}

                                  {/* ---------------------------------------------------------------------- */}
                                  {/* phan trang */}
                                  <Row>
                                    <Col lg={12} className="mt-4 pt-2">
                                      <nav aria-label="Page navigation example">
                                        <div className="pagination job-pagination mb-0 justify-content-center">
                                          <li
                                            className={`page-item ${
                                              currentPageProcessing === 1
                                                ? "disabled"
                                                : ""
                                            }`}
                                          >
                                            <Link
                                              className="page-link"
                                              to="#"
                                              tabIndex="-1"
                                              onClick={handlePrevPageProcessing}
                                            >
                                              <i className="mdi mdi-chevron-double-left fs-15"></i>
                                            </Link>
                                          </li>
                                          {renderPageNumbersProcessing()}
                                          <li
                                            className={`page-item ${
                                              currentPageProcessing ===
                                              totalPagesProcessing
                                                ? "disabled"
                                                : ""
                                            }`}
                                          >
                                            <Link
                                              className="page-link"
                                              to="#"
                                              onClick={handleNextPageProcessing}
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
                              {reportListDone.length === 0 ? (
                                <div>
                                  <Empty />
                                </div>
                              ) : (
                                <div>
                                  {reportListDone.map((reportListNew, key) => (
                                    <div
                                      key={key}
                                      className="job-box-dev-in-list-hiringRequest-for-dev card mt-3"
                                      style={{
                                        boxShadow:
                                          "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                                      }}
                                    >
                                      <CardBody className="p-2">
                                        <Row className="align-items-center justify-content-evenly">
                                          <Col md={1}>
                                            <div className="d-flex justify-content-center">
                                              <i
                                                className="uil uil-clipboard-notes"
                                                style={{ fontSize: "50px" }}
                                              ></i>
                                            </div>
                                          </Col>

                                          <Col md={2}>
                                            <div>
                                              <h5 className="fs-18 mb-0">
                                                <Link
                                                  to="/listreportinmanagerdetail"
                                                  className="text-dark"
                                                  state={{
                                                    reportId:
                                                      reportListNew.reportId,
                                                    developerId:
                                                      reportListNew.developerId,
                                                    projectId:
                                                      reportListNew.projectId,
                                                  }}
                                                >
                                                  {reportListNew.reportTitle}
                                                </Link>
                                              </h5>
                                              <p className="text-muted fs-14 mb-0">
                                                {
                                                  reportListNew.companyPartnerName
                                                }
                                              </p>
                                            </div>
                                          </Col>

                                          <Col md={3}>
                                            <div className="d-flex flex-column gap-1 justify-content-center">
                                              <div>
                                                <p className="text-muted mb-0 fs-13">
                                                  Project Name
                                                </p>
                                                <p
                                                  className="mb-0 fs-17"
                                                  style={{ fontWeight: "600" }}
                                                >
                                                  {reportListNew.projectName}
                                                </p>
                                              </div>
                                              <div>
                                                <p className="text-muted mb-0 fs-13">
                                                  Project Code
                                                </p>
                                                <p
                                                  className="mb-0 fs-17"
                                                  style={{ fontWeight: "600" }}
                                                >
                                                  {reportListNew.projectCode}
                                                </p>
                                              </div>
                                            </div>
                                          </Col>

                                          <Col md={3}>
                                            <div className="d-flex flex-column gap-1 justify-content-center">
                                              <div>
                                                <p className="text-muted mb-0 fs-13">
                                                  Developer Name
                                                </p>
                                                <p
                                                  className="mb-0 fs-17"
                                                  style={{ fontWeight: "600" }}
                                                >
                                                  {reportListNew.developerName}
                                                </p>
                                              </div>
                                              <div>
                                                <p className="text-muted mb-0 fs-13">
                                                  Developer Code
                                                </p>
                                                <p
                                                  className="mb-0 fs-17"
                                                  style={{ fontWeight: "600" }}
                                                >
                                                  {reportListNew.developerCode}
                                                </p>
                                              </div>
                                            </div>
                                          </Col>

                                          <Col
                                            md={1}
                                            className="d-flex justify-content-start"
                                          >
                                            <div className="d-flex align-items-center">
                                              <span
                                                className={
                                                  reportListNew.statusString ===
                                                  "Pending"
                                                    ? "badge bg-warning text-light fs-12"
                                                    : reportListNew.statusString ===
                                                      "Processing"
                                                    ? "badge bg-blue text-light fs-12"
                                                    : reportListNew.statusString ===
                                                      "Done"
                                                    ? "badge bg-newGreen text-light fs-12"
                                                    : ""
                                                }
                                              >
                                                {reportListNew.statusString}
                                              </span>
                                            </div>
                                          </Col>
                                        </Row>
                                      </CardBody>
                                    </div>
                                  ))}

                                  {/* ---------------------------------------------------------------------- */}
                                  {/* phan trang */}
                                  <Row>
                                    <Col lg={12} className="mt-4 pt-2">
                                      <nav aria-label="Page navigation example">
                                        <div className="pagination job-pagination mb-0 justify-content-center">
                                          <li
                                            className={`page-item ${
                                              currentPageDone === 1
                                                ? "disabled"
                                                : ""
                                            }`}
                                          >
                                            <Link
                                              className="page-link"
                                              to="#"
                                              tabIndex="-1"
                                              onClick={handlePrevPageDone}
                                            >
                                              <i className="mdi mdi-chevron-double-left fs-15"></i>
                                            </Link>
                                          </li>
                                          {renderPageNumbersDone()}
                                          <li
                                            className={`page-item ${
                                              currentPageDone === totalPagesDone
                                                ? "disabled"
                                                : ""
                                            }`}
                                          >
                                            <Link
                                              className="page-link"
                                              to="#"
                                              onClick={handleNextPageDone}
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

export default ReportList;

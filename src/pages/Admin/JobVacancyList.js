import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Col,
  Row,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavItem,
  NavLink,
  Nav,
  TabPane,
  TabContent,
  Container,
  Card,
  CardBody,
} from "reactstrap";
import { Input, Space } from "antd";

import JobType from "../Home/SubSection/JobType";
import { Dropdown, Form } from "react-bootstrap";
// import hiringrequestService from "../../../services/hiringrequest.service";
import hiringrequestService from "../../services/hiringrequest.service";

import jobImage1 from "../../assets/images/featured-job/img-01.png";
import classnames from "classnames";
import { Empty } from "antd";
import { Skeleton } from "antd";

const JobVacancyList = (a) => {
  //Apply Now Model
  const [jobVacancyList, setJobVacancyList] = useState([]);
  const [jobVacancyListWaitingApproval, setJobVacancyListWaitingApproval] =
    useState([]);
  const [jobVacancyListInProgress, setJobVacancyListInProgress] = useState([]);
  const [jobVacancyListRejected, setJobVacancyListRejected] = useState([]);
  const [jobVacancyListExpired, setJobVacancyListExpired] = useState([]);
  const [jobVacancyListCancelled, setJobVacancyListCancelled] = useState([]);
  const [jobVacancyListClosed, setJobVacancyListClosed] = useState([]);
  const [jobVacancyListCompleted, setJobVacancyListCompleted] = useState([]);
  const [jobVacancyListSaved, setJobVacancyListSaved] = useState([]);

  const [skeleton1, setSkeleton1] = useState(true);
  const [skeleton2, setSkeleton2] = useState(true);
  const [skeleton3, setSkeleton3] = useState(true);
  const [skeleton4, setSkeleton4] = useState(true);
  const [skeleton5, setSkeleton5] = useState(true);
  const [skeleton6, setSkeleton6] = useState(true);
  const [skeleton7, setSkeleton7] = useState(true);
  const [skeleton8, setSkeleton8] = useState(true);

  //--------------------------------------------------------------------------------------------
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

  const fetchJobVacancies = async () => {
    let response;
    try {
      response = await hiringrequestService.getHiringRequestAndPaging(
        currentPage,
        7
      );

      console.log(response.data.data);
      console.log(response.data.paging.total);
      setSkeleton1(false);
      setJobVacancyList(response.data.data);
      setTotalPages(Math.ceil(response.data.paging.total / pageSize));
    } catch (error) {
      console.error("Error fetching job vacancies:", error);
    }
  };
  //--------------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------------
  let [currentPageWaitingApproval, setCurrentPageWaitingApproval] = useState(1);
  const [totalPagesWaitingApproval, setTotalPagesWaitingApproval] = useState(1);

  const pageSizeWaitingApproval = 7;
  const handlePageClickWaitingApproval = (page) => {
    setCurrentPageWaitingApproval(page);
  };

  const renderPageNumbersWaitingApproval = () => {
    const pageNumbers = [];
    const maxPageButtons = 4;
    let startPage = Math.max(
      1,
      currentPageWaitingApproval - Math.floor(maxPageButtons / 2)
    );
    let endPage = Math.min(
      totalPagesWaitingApproval,
      startPage + maxPageButtons - 1
    );
    if (
      totalPagesWaitingApproval > maxPageButtons &&
      currentPageWaitingApproval <= Math.floor(maxPageButtons / 2) + 1
    ) {
      endPage = maxPageButtons;
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${
            i === currentPageWaitingApproval ? "active" : ""
          }`}
        >
          <Link
            className="page-link"
            to="#"
            onClick={() => handlePageClickWaitingApproval(i)}
          >
            {i}
          </Link>
        </li>
      );
    }

    return pageNumbers;
  };

  const handleNextPageWaitingApproval = () => {
    if (currentPageWaitingApproval < totalPagesWaitingApproval) {
      setCurrentPageWaitingApproval(currentPageWaitingApproval + 1);
    }
  };

  const handlePrevPageWaitingApproval = () => {
    if (currentPageWaitingApproval > 1) {
      setCurrentPageWaitingApproval(currentPageWaitingApproval - 1);
    }
  };

  const fetchJobVacanciesWaitingApproval = async () => {
    let response;

    try {
      response =
        await hiringrequestService.getHiringRequestWaitingApprovalPaging(
          currentPageWaitingApproval,
          7
        );

      console.log(response.data.data);
      setSkeleton2(false);
      setJobVacancyListWaitingApproval(response.data.data);
      setTotalPagesWaitingApproval(
        Math.ceil(response.data.paging.total / pageSizeWaitingApproval)
      );
    } catch (error) {
      console.error("Error fetching JobVacancy List Waiting Approval:", error);
    }
  };

  //--------------------------------------------------------------------------------------------
  let [currentPageInProgress, setCurrentPageInProgress] = useState(1);
  const [totalPagesInProgress, setTotalPagesInProgress] = useState(1);

  const pageSizeInProgress = 7;
  const handlePageClickInProgress = (page) => {
    setCurrentPageInProgress(page);
  };

  const renderPageNumbersInProgress = () => {
    const pageNumbers = [];
    const maxPageButtons = 4;
    let startPage = Math.max(
      1,
      currentPageInProgress - Math.floor(maxPageButtons / 2)
    );
    let endPage = Math.min(
      totalPagesInProgress,
      startPage + maxPageButtons - 1
    );
    if (
      totalPagesInProgress > maxPageButtons &&
      currentPageInProgress <= Math.floor(maxPageButtons / 2) + 1
    ) {
      endPage = maxPageButtons;
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${i === currentPageInProgress ? "active" : ""}`}
        >
          <Link
            className="page-link"
            to="#"
            onClick={() => handlePageClickInProgress(i)}
          >
            {i}
          </Link>
        </li>
      );
    }

    return pageNumbers;
  };

  const handleNextPageInProgress = () => {
    if (currentPageInProgress < totalPagesInProgress) {
      setCurrentPageInProgress(currentPageInProgress + 1);
    }
  };

  const handlePrevPageInProgress = () => {
    if (currentPageInProgress > 1) {
      setCurrentPageInProgress(currentPageInProgress - 1);
    }
  };

  const fetchJobVacanciesInProgress = async () => {
    let response;

    try {
      response = await hiringrequestService.getHiringRequestInProgressPaging(
        currentPageInProgress,
        7
      );

      console.log(response.data.data);

      setJobVacancyListInProgress(response.data.data);
      setSkeleton3(false);
      setTotalPagesInProgress(
        Math.ceil(response.data.paging.total / pageSizeInProgress)
      );
    } catch (error) {
      console.error("Error fetching job vacancies list In Progress:", error);
    }
  };

  //---------------------------------------------------------------------------------------------
  let [currentPageRejected, setCurrentPageRejected] = useState(1);
  const [totalPagesRejected, setTotalPagesRejected] = useState(1);

  const pageSizeRejected = 7;
  const handlePageClickRejected = (page) => {
    setCurrentPageRejected(page);
  };

  const renderPageNumbersRejected = () => {
    const pageNumbers = [];
    const maxPageButtons = 4;
    let startPage = Math.max(
      1,
      currentPageRejected - Math.floor(maxPageButtons / 2)
    );
    let endPage = Math.min(totalPagesRejected, startPage + maxPageButtons - 1);
    if (
      totalPagesRejected > maxPageButtons &&
      currentPageRejected <= Math.floor(maxPageButtons / 2) + 1
    ) {
      endPage = maxPageButtons;
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${i === currentPageRejected ? "active" : ""}`}
        >
          <Link
            className="page-link"
            to="#"
            onClick={() => handlePageClickRejected(i)}
          >
            {i}
          </Link>
        </li>
      );
    }

    return pageNumbers;
  };

  const handleNextPageRejected = () => {
    if (currentPageRejected < totalPagesRejected) {
      setCurrentPageRejected(currentPageRejected + 1);
    }
  };

  const handlePrevPageRejected = () => {
    if (currentPageRejected > 1) {
      setCurrentPageRejected(currentPageRejected - 1);
    }
  };

  const fetchJobVacanciesRejected = async () => {
    let response;

    try {
      response = await hiringrequestService.getHiringRequestRejectedPaging(
        currentPageRejected,
        7
      );

      console.log(response.data.data);
      setSkeleton4(false);
      setJobVacancyListRejected(response.data.data);
      setTotalPagesRejected(
        Math.ceil(response.data.paging.total / pageSizeRejected)
      );
    } catch (error) {
      console.error("Error fetching job vacancies list Rejected:", error);
    }
  };

  //---------------------------------------------------------------------------------------------
  let [currentPageExpired, setCurrentPageExpired] = useState(1);
  const [totalPagesExpired, setTotalPagesExpired] = useState(1);

  const pageSizeExpired = 7;
  const handlePageClickExpired = (page) => {
    setCurrentPageExpired(page);
  };

  const renderPageNumbersExpired = () => {
    const pageNumbers = [];
    const maxPageButtons = 4;
    let startPage = Math.max(
      1,
      currentPageExpired - Math.floor(maxPageButtons / 2)
    );
    let endPage = Math.min(totalPagesExpired, startPage + maxPageButtons - 1);
    if (
      totalPagesExpired > maxPageButtons &&
      currentPageExpired <= Math.floor(maxPageButtons / 2) + 1
    ) {
      endPage = maxPageButtons;
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${i === currentPageExpired ? "active" : ""}`}
        >
          <Link
            className="page-link"
            to="#"
            onClick={() => handlePageClickExpired(i)}
          >
            {i}
          </Link>
        </li>
      );
    }

    return pageNumbers;
  };

  const handleNextPageExpired = () => {
    if (currentPageExpired < totalPagesExpired) {
      setCurrentPageExpired(currentPageExpired + 1);
    }
  };

  const handlePrevPageExpired = () => {
    if (currentPageExpired > 1) {
      setCurrentPageExpired(currentPageExpired - 1);
    }
  };

  const fetchJobVacanciesExpired = async () => {
    let response;

    try {
      response = await hiringrequestService.getHiringRequestExpiredPaging(
        currentPageExpired,
        7
      );

      console.log(response.data.data);
      setSkeleton5(false);
      setJobVacancyListExpired(response.data.data);
      setTotalPagesExpired(
        Math.ceil(response.data.paging.total / pageSizeExpired)
      );
    } catch (error) {
      console.error("Error fetching job vacancies list Expired:", error);
    }
  };

  //---------------------------------------------------------------------------------------------
  let [currentPageCancelled, setCurrentPageCancelled] = useState(1);
  const [totalPagesCancelled, setTotalPagesCancelled] = useState(1);

  const pageSizeCancelled = 7;
  const handlePageClickCancelled = (page) => {
    setCurrentPageCancelled(page);
  };

  const renderPageNumbersCancelled = () => {
    const pageNumbers = [];
    const maxPageButtons = 4;
    let startPage = Math.max(
      1,
      currentPageCancelled - Math.floor(maxPageButtons / 2)
    );
    let endPage = Math.min(totalPagesCancelled, startPage + maxPageButtons - 1);
    if (
      totalPagesCancelled > maxPageButtons &&
      currentPageCancelled <= Math.floor(maxPageButtons / 2) + 1
    ) {
      endPage = maxPageButtons;
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${i === currentPageCancelled ? "active" : ""}`}
        >
          <Link
            className="page-link"
            to="#"
            onClick={() => handlePageClickCancelled(i)}
          >
            {i}
          </Link>
        </li>
      );
    }

    return pageNumbers;
  };

  const handleNextPageCancelled = () => {
    if (currentPageCancelled < totalPagesCancelled) {
      setCurrentPageCancelled(currentPageCancelled + 1);
    }
  };

  const handlePrevPageCancelled = () => {
    if (currentPageCancelled > 1) {
      setCurrentPageCancelled(currentPageCancelled - 1);
    }
  };

  const fetchJobVacanciesCancelled = async () => {
    let response;

    try {
      response = await hiringrequestService.getHiringRequestCancelledPaging(
        currentPageCancelled,
        7
      );

      console.log(response.data.data);
      setSkeleton6(false);
      setJobVacancyListCancelled(response.data.data);

      setTotalPagesCancelled(
        Math.ceil(response.data.paging.total / pageSizeCancelled)
      );
    } catch (error) {
      console.error("Error fetching job vacancies list cancelled:", error);
    }
  };

  //---------------------------------------------------------------------------------------------
  let [currentPageClosed, setCurrentPageClosed] = useState(1);
  const [totalPagesClosed, setTotalPagesClosed] = useState(1);

  const pageSizeClosed = 7;
  const handlePageClickClosed = (page) => {
    setCurrentPageClosed(page);
  };

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

  const fetchJobVacanciesClosed = async () => {
    let response;

    try {
      response = await hiringrequestService.getHiringRequestClosedPaging(
        currentPageClosed,
        7
      );

      console.log(response.data.data);

      setJobVacancyListClosed(response.data.data);
      setSkeleton7(false);
      setTotalPagesClosed(
        Math.ceil(response.data.paging.total / pageSizeClosed)
      );
    } catch (error) {
      console.error("Error fetching job vacancies list closed:", error);
    }
  };

  //---------------------------------------------------------------------------------------------
  let [currentPageCompleted, setCurrentPageCompleted] = useState(1);
  const [totalPagesCompleted, setTotalPagesCompleted] = useState(1);

  const pageSizeCompleted = 7;
  const handlePageClickCompleted = (page) => {
    setCurrentPageCompleted(page);
  };

  const renderPageNumbersCompleted = () => {
    const pageNumbers = [];
    const maxPageButtons = 4;
    let startPage = Math.max(
      1,
      currentPageCompleted - Math.floor(maxPageButtons / 2)
    );
    let endPage = Math.min(totalPagesCompleted, startPage + maxPageButtons - 1);
    if (
      totalPagesCompleted > maxPageButtons &&
      currentPageCompleted <= Math.floor(maxPageButtons / 2) + 1
    ) {
      endPage = maxPageButtons;
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${i === currentPageCompleted ? "active" : ""}`}
        >
          <Link
            className="page-link"
            to="#"
            onClick={() => handlePageClickCompleted(i)}
          >
            {i}
          </Link>
        </li>
      );
    }

    return pageNumbers;
  };

  const handleNextPageCompleted = () => {
    if (currentPageCompleted < totalPagesCompleted) {
      setCurrentPageCompleted(currentPageCompleted + 1);
    }
  };

  const handlePrevPageCompleted = () => {
    if (currentPageCompleted > 1) {
      setCurrentPageCompleted(currentPageCompleted - 1);
    }
  };

  const fetchJobVacanciesCompleted = async () => {
    let response;

    try {
      response = await hiringrequestService.getHiringRequestCompletedPaging(
        currentPageCompleted,
        7
      );

      console.log(response.data.data);
      setSkeleton8(false);
      setJobVacancyListCompleted(response.data.data);
      setTotalPagesCompleted(
        Math.ceil(response.data.paging.total / pageSizeCompleted)
      );
    } catch (error) {
      console.error("Error fetching job vacancies list complete:", error);
    }
  };

  //---------------------------------------------------------------------------------------------
  useEffect(() => {
    fetchJobVacancies();
  }, [currentPage]);

  useEffect(() => {
    fetchJobVacanciesWaitingApproval();
  }, [currentPageWaitingApproval]);

  useEffect(() => {
    fetchJobVacanciesInProgress();
  }, [currentPageInProgress]);

  useEffect(() => {
    fetchJobVacanciesRejected();
  }, [currentPageRejected]);

  useEffect(() => {
    fetchJobVacanciesExpired();
  }, [currentPageExpired]);

  useEffect(() => {
    fetchJobVacanciesCancelled();
  }, [currentPageCancelled]);

  useEffect(() => {
    fetchJobVacanciesClosed();
  }, [currentPageClosed]);

  useEffect(() => {
    fetchJobVacanciesCompleted();
  }, [currentPageCompleted]);

  //--------------------------------------------------------------------------------------------
  const [activeTab, setActiveTab] = useState("1");
  const tabChange = (tab) => {
    if (activeTab) {
      if (activeTab !== tab) setActiveTab(tab);
    }
  };
  //---------------------------------------------------------------------------------------------
  //Search
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  //--------------------------------------------------------------------------------------------

  return (
    <React.Fragment>
      <div className="d-flex justify-content-between">
        {" "}
        <h4>Hiring Request List</h4>
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

      <div className="d-flex justify-content-between">
        <Nav
          className="profile-content-nav nav-pills border-bottom mb-3"
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
              Waiting Approval
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
              In Progress
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
              Rejected
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
              Expired
            </NavLink>
          </NavItem>

          <NavItem role="presentation">
            <NavLink
              to="#"
              className={classnames("nav-link", {
                active: activeTab === "6",
              })}
              onClick={() => {
                tabChange("6");
              }}
              type="button"
            >
              Cancelled
            </NavLink>
          </NavItem>

          <NavItem role="presentation">
            <NavLink
              to="#"
              className={classnames("nav-link", {
                active: activeTab === "7",
              })}
              onClick={() => {
                tabChange("7");
              }}
              type="button"
            >
              Closed
            </NavLink>
          </NavItem>

          <NavItem role="presentation">
            <NavLink
              to="#"
              className={classnames("nav-link", {
                active: activeTab === "8",
              })}
              onClick={() => {
                tabChange("8");
              }}
              type="button"
            >
              Completed
            </NavLink>
          </NavItem>
        </Nav>
      </div>

      <CardBody className="px-0">
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Skeleton loading={skeleton1}>
              {jobVacancyList.length === 0 ? (
                <div>
                  <Empty />
                </div>
              ) : (
                <div>
                  <div>
                    {jobVacancyList.map((jobVacancyListDetail, key) => (
                      <div
                        style={{
                          boxShadow:
                            "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                        }}
                        key={key}
                        className={
                          "job-box-dev-in-list-hiringRequest-for-dev mt-3 card"
                        }
                      >
                        <div className="p-2">
                          <Row className="align-items-center">
                            <Col md={2}>
                              <div>
                                <Link>
                                  <img
                                    style={{
                                      width: "80px",
                                      height: "80px",
                                    }}
                                    src={jobVacancyListDetail.companyImage}
                                    alt=""
                                    className="img-fluid rounded-3 img-avt-hiring-request"
                                  />
                                </Link>
                              </div>
                            </Col>

                            <Col md={3}>
                              <div>
                                <h5 className="fs-18 mb-0">
                                  <Link
                                    to="/newhiringrequestdetail"
                                    className="text-dark"
                                    state={{
                                      hiringRequestId:
                                        jobVacancyListDetail.requestId,
                                      companyId: jobVacancyListDetail.companyId,
                                      projectId: jobVacancyListDetail.projectId,
                                    }}
                                  >
                                    {jobVacancyListDetail.jobTitle}
                                  </Link>
                                </h5>
                                <p className="text-muted fs-14 mb-0">
                                  {jobVacancyListDetail.requestCode}
                                </p>
                              </div>
                            </Col>

                            <Col md={3}>
                              <div className="d-flex mb-0 align-items-center">
                                <div className="flex-shrink-0">
                                  <i
                                    className="uil uil-user-check text-primary me-1"
                                    style={{ fontSize: "19px" }}
                                  ></i>
                                </div>
                                <p className="text-muted mb-0">
                                  {jobVacancyListDetail.numberOfDev} developer
                                </p>
                              </div>
                            </Col>

                            <Col md={2}>
                              <div className="d-flex mb-0 align-items-center">
                                <div className="flex-shrink-0">
                                  <i
                                    className="uil uil-clock-three text-primary me-1"
                                    style={{ fontSize: "19px" }}
                                  ></i>
                                </div>
                                <p className="text-muted mb-0">
                                  {jobVacancyListDetail.duration}
                                </p>
                              </div>
                            </Col>

                            <Col
                              md={2}
                              className="d-flex justify-content-around"
                            >
                              <div className="d-flex align-items-center">
                                <span
                                  className={
                                    jobVacancyListDetail.statusString ===
                                    "Waiting Approval"
                                      ? "badge bg-warning text-light fs-12"
                                      : jobVacancyListDetail.statusString ===
                                        "In Progress"
                                      ? "badge bg-blue text-light fs-12"
                                      : jobVacancyListDetail.statusString ===
                                        "Rejected"
                                      ? "badge bg-danger text-light fs-12"
                                      : jobVacancyListDetail.statusString ===
                                        "Expired"
                                      ? "badge bg-danger text-light fs-12"
                                      : jobVacancyListDetail.statusString ===
                                        "Cancelled"
                                      ? "badge bg-danger text-light fs-12"
                                      : jobVacancyListDetail.statusString ===
                                        "Closed"
                                      ? "badge bg-secondary text-light fs-12"
                                      : jobVacancyListDetail.statusString ===
                                        "Completed"
                                      ? "badge bg-primary text-light fs-12"
                                      : jobVacancyListDetail.statusString ===
                                        "Saved"
                                      ? "badge bg-info text-light fs-12"
                                      : ""
                                  }
                                >
                                  {jobVacancyListDetail.statusString}
                                </span>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* ----------------------------------------------------- */}
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
              )}
            </Skeleton>
          </TabPane>
          <TabPane tabId="2">
            <Skeleton loading={skeleton2}>
              {jobVacancyListWaitingApproval.length === 0 ? (
                <div>
                  <Empty />
                </div>
              ) : (
                <div>
                  <div>
                    {jobVacancyListWaitingApproval.map(
                      (jobVacancyListDetail, key) => (
                        <div
                          style={{
                            boxShadow:
                              "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                          }}
                          key={key}
                          className={
                            "job-box-dev-in-list-hiringRequest-for-dev mt-3 card"
                          }
                        >
                          <div className="p-2">
                            <Row className="align-items-center">
                              <Col md={2}>
                                <div>
                                  <Link to="/companydetails">
                                    <img
                                      style={{
                                        width: "80px",
                                        height: "80px",
                                      }}
                                      src={jobVacancyListDetail.companyImage}
                                      alt=""
                                      className="img-fluid rounded-3 img-avt-hiring-request"
                                    />
                                  </Link>
                                </div>
                              </Col>

                              <Col md={3}>
                                <div>
                                  <h5 className="fs-18 mb-0">
                                    <Link
                                      to="/newhiringrequestdetail"
                                      className="text-dark"
                                      state={{
                                        hiringRequestId:
                                          jobVacancyListDetail.requestId,
                                        companyId:
                                          jobVacancyListDetail.companyId,
                                        projectId:
                                          jobVacancyListDetail.projectId,
                                      }}
                                    >
                                      {jobVacancyListDetail.jobTitle}
                                    </Link>
                                  </h5>
                                  <p className="text-muted fs-14 mb-0">
                                    {jobVacancyListDetail.requestCode}
                                  </p>
                                </div>
                              </Col>

                              <Col md={3}>
                                <div className="d-flex mb-0 align-items-center">
                                  <div className="flex-shrink-0">
                                    <i
                                      className="uil uil-user-check text-primary me-1"
                                      style={{ fontSize: "19px" }}
                                    ></i>
                                  </div>
                                  <p className="text-muted mb-0">
                                    {jobVacancyListDetail.numberOfDev} developer
                                  </p>
                                </div>
                              </Col>

                              <Col md={2}>
                                <div className="d-flex mb-0 align-items-center">
                                  <div className="flex-shrink-0">
                                    <i
                                      className="uil uil-clock-three text-primary me-1"
                                      style={{ fontSize: "19px" }}
                                    ></i>
                                  </div>
                                  <p className="text-muted mb-0">
                                    {jobVacancyListDetail.duration}
                                  </p>
                                </div>
                              </Col>

                              <Col
                                md={2}
                                className="d-flex justify-content-around"
                              >
                                <div className="d-flex align-items-center">
                                  <span
                                    className={
                                      jobVacancyListDetail.statusString ===
                                      "Waiting Approval"
                                        ? "badge bg-warning text-light fs-12"
                                        : jobVacancyListDetail.statusString ===
                                          "In Progress"
                                        ? "badge bg-blue text-light fs-12"
                                        : jobVacancyListDetail.statusString ===
                                          "Rejected"
                                        ? "badge bg-danger text-light fs-12"
                                        : jobVacancyListDetail.statusString ===
                                          "Expired"
                                        ? "badge bg-danger text-light fs-12"
                                        : jobVacancyListDetail.statusString ===
                                          "Cancelled"
                                        ? "badge bg-danger text-light fs-12"
                                        : jobVacancyListDetail.statusString ===
                                          "Closed"
                                        ? "badge bg-secondary text-light fs-12"
                                        : jobVacancyListDetail.statusString ===
                                          "Completed"
                                        ? "badge bg-primary text-light fs-12"
                                        : jobVacancyListDetail.statusString ===
                                          "Saved"
                                        ? "badge bg-info text-light fs-12"
                                        : ""
                                    }
                                  >
                                    {jobVacancyListDetail.statusString}
                                  </span>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  {/* ----------------------------------------------------- */}
                  {/* phan trang */}
                  <Row>
                    <Col lg={12} className="mt-4 pt-2">
                      <nav aria-label="Page navigation example">
                        <div className="pagination job-pagination mb-0 justify-content-center">
                          <li
                            className={`page-item ${
                              currentPageWaitingApproval === 1 ? "disabled" : ""
                            }`}
                          >
                            <Link
                              className="page-link"
                              to="#"
                              tabIndex="-1"
                              onClick={handlePrevPageWaitingApproval}
                            >
                              <i className="mdi mdi-chevron-double-left fs-15"></i>
                            </Link>
                          </li>
                          {renderPageNumbersWaitingApproval()}
                          <li
                            className={`page-item ${
                              currentPageWaitingApproval ===
                              totalPagesWaitingApproval
                                ? "disabled"
                                : ""
                            }`}
                          >
                            <Link
                              className="page-link"
                              to="#"
                              onClick={handleNextPageWaitingApproval}
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
            </Skeleton>
          </TabPane>
          <TabPane tabId="3">
            <Skeleton loading={skeleton3}>
              {jobVacancyListInProgress.length === 0 ? (
                <div>
                  <Empty />
                </div>
              ) : (
                <div>
                  <div>
                    {jobVacancyListInProgress.map(
                      (jobVacancyListDetail, key) => (
                        <div
                          style={{
                            boxShadow:
                              "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                          }}
                          key={key}
                          className={
                            "job-box-dev-in-list-hiringRequest-for-dev mt-3 card"
                          }
                        >
                          <div className="p-2">
                            <Row className="align-items-center">
                              <Col md={2}>
                                <div>
                                  <Link to="/companydetails">
                                    <img
                                      style={{
                                        width: "80px",
                                        height: "80px",
                                      }}
                                      src={jobVacancyListDetail.companyImage}
                                      alt=""
                                      className="img-fluid rounded-3 img-avt-hiring-request"
                                    />
                                  </Link>
                                </div>
                              </Col>

                              <Col md={3}>
                                <div>
                                  <h5 className="fs-18 mb-0">
                                    <Link
                                      to="/newhiringrequestdetail"
                                      className="text-dark"
                                      state={{
                                        hiringRequestId:
                                          jobVacancyListDetail.requestId,
                                        companyId:
                                          jobVacancyListDetail.companyId,
                                        projectId:
                                          jobVacancyListDetail.projectId,
                                      }}
                                    >
                                      {jobVacancyListDetail.jobTitle}
                                    </Link>
                                  </h5>
                                  <p className="text-muted fs-14 mb-0">
                                    {jobVacancyListDetail.requestCode}
                                  </p>
                                </div>
                              </Col>

                              <Col md={3}>
                                <div className="d-flex mb-0 align-items-center">
                                  <div className="flex-shrink-0">
                                    <i
                                      className="uil uil-user-check text-primary me-1"
                                      style={{ fontSize: "19px" }}
                                    ></i>
                                  </div>
                                  <p className="text-muted mb-0">
                                    {jobVacancyListDetail.numberOfDev} developer
                                  </p>
                                </div>
                              </Col>

                              <Col md={2}>
                                <div className="d-flex mb-0 align-items-center">
                                  <div className="flex-shrink-0">
                                    <i
                                      className="uil uil-clock-three text-primary me-1"
                                      style={{ fontSize: "19px" }}
                                    ></i>
                                  </div>
                                  <p className="text-muted mb-0">
                                    {jobVacancyListDetail.duration}
                                  </p>
                                </div>
                              </Col>

                              <Col
                                md={2}
                                className="d-flex justify-content-around"
                              >
                                <div className="d-flex align-items-center">
                                  <span
                                    className={
                                      jobVacancyListDetail.statusString ===
                                      "Waiting Approval"
                                        ? "badge bg-warning text-light fs-12"
                                        : jobVacancyListDetail.statusString ===
                                          "In Progress"
                                        ? "badge bg-blue text-light fs-12"
                                        : jobVacancyListDetail.statusString ===
                                          "Rejected"
                                        ? "badge bg-danger text-light fs-12"
                                        : jobVacancyListDetail.statusString ===
                                          "Expired"
                                        ? "badge bg-danger text-light fs-12"
                                        : jobVacancyListDetail.statusString ===
                                          "Cancelled"
                                        ? "badge bg-danger text-light fs-12"
                                        : jobVacancyListDetail.statusString ===
                                          "Closed"
                                        ? "badge bg-secondary text-light fs-12"
                                        : jobVacancyListDetail.statusString ===
                                          "Completed"
                                        ? "badge bg-primary text-light fs-12"
                                        : jobVacancyListDetail.statusString ===
                                          "Saved"
                                        ? "badge bg-info text-light fs-12"
                                        : ""
                                    }
                                  >
                                    {jobVacancyListDetail.statusString}
                                  </span>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                  {/* ----------------------------------------------------- */}
                  {/* phan trang */}
                  <Row>
                    <Col lg={12} className="mt-4 pt-2">
                      <nav aria-label="Page navigation example">
                        <div className="pagination job-pagination mb-0 justify-content-center">
                          <li
                            className={`page-item ${
                              currentPageInProgress === 1 ? "disabled" : ""
                            }`}
                          >
                            <Link
                              className="page-link"
                              to="#"
                              tabIndex="-1"
                              onClick={handlePrevPageInProgress}
                            >
                              <i className="mdi mdi-chevron-double-left fs-15"></i>
                            </Link>
                          </li>
                          {renderPageNumbersInProgress()}
                          <li
                            className={`page-item ${
                              currentPageInProgress === totalPagesInProgress
                                ? "disabled"
                                : ""
                            }`}
                          >
                            <Link
                              className="page-link"
                              to="#"
                              onClick={handleNextPageInProgress}
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
            </Skeleton>
          </TabPane>
          <TabPane tabId="4">
            <Skeleton loading={skeleton4}>
              {jobVacancyListRejected.length === 0 ? (
                <div>
                  <Empty />
                </div>
              ) : (
                <div>
                  <div>
                    {jobVacancyListRejected.map((jobVacancyListDetail, key) => (
                      <div
                        style={{
                          boxShadow:
                            "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                        }}
                        key={key}
                        className={
                          "job-box-dev-in-list-hiringRequest-for-dev mt-3 card"
                        }
                      >
                        <div className="p-2">
                          <Row className="align-items-center">
                            <Col md={2}>
                              <div>
                                <Link to="/companydetails">
                                  <img
                                    style={{
                                      width: "80px",
                                      height: "80px",
                                    }}
                                    src={jobVacancyListDetail.companyImage}
                                    alt=""
                                    className="img-fluid rounded-3 img-avt-hiring-request"
                                  />
                                </Link>
                              </div>
                            </Col>

                            <Col md={3}>
                              <div>
                                <h5 className="fs-18 mb-0">
                                  <Link
                                    to="/newhiringrequestdetail"
                                    className="text-dark"
                                    state={{
                                      hiringRequestId:
                                        jobVacancyListDetail.requestId,
                                      companyId: jobVacancyListDetail.companyId,
                                      projectId: jobVacancyListDetail.projectId,
                                    }}
                                  >
                                    {jobVacancyListDetail.jobTitle}
                                  </Link>
                                </h5>
                                <p className="text-muted fs-14 mb-0">
                                  {jobVacancyListDetail.requestCode}
                                </p>
                              </div>
                            </Col>

                            <Col md={3}>
                              <div className="d-flex mb-0 align-items-center">
                                <div className="flex-shrink-0">
                                  <i
                                    className="uil uil-user-check text-primary me-1"
                                    style={{ fontSize: "19px" }}
                                  ></i>
                                </div>
                                <p className="text-muted mb-0">
                                  {jobVacancyListDetail.numberOfDev} developer
                                </p>
                              </div>
                            </Col>

                            <Col md={2}>
                              <div className="d-flex mb-0 align-items-center">
                                <div className="flex-shrink-0">
                                  <i
                                    className="uil uil-clock-three text-primary me-1"
                                    style={{ fontSize: "19px" }}
                                  ></i>
                                </div>
                                <p className="text-muted mb-0">
                                  {jobVacancyListDetail.duration}
                                </p>
                              </div>
                            </Col>

                            <Col
                              md={2}
                              className="d-flex justify-content-around"
                            >
                              <div className="d-flex align-items-center">
                                <span
                                  className={
                                    jobVacancyListDetail.statusString ===
                                    "Waiting Approval"
                                      ? "badge bg-warning text-light fs-12"
                                      : jobVacancyListDetail.statusString ===
                                        "In Progress"
                                      ? "badge bg-blue text-light fs-12"
                                      : jobVacancyListDetail.statusString ===
                                        "Rejected"
                                      ? "badge bg-danger text-light fs-12"
                                      : jobVacancyListDetail.statusString ===
                                        "Expired"
                                      ? "badge bg-danger text-light fs-12"
                                      : jobVacancyListDetail.statusString ===
                                        "Cancelled"
                                      ? "badge bg-danger text-light fs-12"
                                      : jobVacancyListDetail.statusString ===
                                        "Closed"
                                      ? "badge bg-secondary text-light fs-12"
                                      : jobVacancyListDetail.statusString ===
                                        "Completed"
                                      ? "badge bg-primary text-light fs-12"
                                      : jobVacancyListDetail.statusString ===
                                        "Saved"
                                      ? "badge bg-info text-light fs-12"
                                      : ""
                                  }
                                >
                                  {jobVacancyListDetail.statusString}
                                </span>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* ----------------------------------------------------- */}
                  {/* phan trang */}
                  <Row>
                    <Col lg={12} className="mt-4 pt-2">
                      <nav aria-label="Page navigation example">
                        <div className="pagination job-pagination mb-0 justify-content-center">
                          <li
                            className={`page-item ${
                              currentPageRejected === 1 ? "disabled" : ""
                            }`}
                          >
                            <Link
                              className="page-link"
                              to="#"
                              tabIndex="-1"
                              onClick={handlePrevPageRejected}
                            >
                              <i className="mdi mdi-chevron-double-left fs-15"></i>
                            </Link>
                          </li>
                          {renderPageNumbersRejected()}
                          <li
                            className={`page-item ${
                              currentPageRejected === totalPagesRejected
                                ? "disabled"
                                : ""
                            }`}
                          >
                            <Link
                              className="page-link"
                              to="#"
                              onClick={handleNextPageRejected}
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
            </Skeleton>
          </TabPane>
          <TabPane tabId="5">
            <Skeleton loading={skeleton5}>
              {jobVacancyListExpired.length === 0 ? (
                <div>
                  <Empty />
                </div>
              ) : (
                <div>
                  <div>
                    {jobVacancyListExpired.map((jobVacancyListDetail, key) => (
                      <div
                        style={{
                          boxShadow:
                            "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                        }}
                        key={key}
                        className={
                          "job-box-dev-in-list-hiringRequest-for-dev mt-3 card"
                        }
                      >
                        <div className="p-2">
                          <Row className="align-items-center">
                            <Col md={2}>
                              <div>
                                <Link to="/companydetails">
                                  <img
                                    style={{
                                      width: "80px",
                                      height: "80px",
                                    }}
                                    src={jobVacancyListDetail.companyImage}
                                    alt=""
                                    className="img-fluid rounded-3 img-avt-hiring-request"
                                  />
                                </Link>
                              </div>
                            </Col>

                            <Col md={3}>
                              <div>
                                <h5 className="fs-18 mb-0">
                                  <Link
                                    to="/newhiringrequestdetail"
                                    className="text-dark"
                                    state={{
                                      hiringRequestId:
                                        jobVacancyListDetail.requestId,
                                      companyId: jobVacancyListDetail.companyId,
                                      projectId: jobVacancyListDetail.projectId,
                                    }}
                                  >
                                    {jobVacancyListDetail.jobTitle}
                                  </Link>
                                </h5>
                                <p className="text-muted fs-14 mb-0">
                                  {jobVacancyListDetail.requestCode}
                                </p>
                              </div>
                            </Col>

                            <Col md={3}>
                              <div className="d-flex mb-0 align-items-center">
                                <div className="flex-shrink-0">
                                  <i
                                    className="uil uil-user-check text-primary me-1"
                                    style={{ fontSize: "19px" }}
                                  ></i>
                                </div>
                                <p className="text-muted mb-0">
                                  {jobVacancyListDetail.numberOfDev} developer
                                </p>
                              </div>
                            </Col>

                            <Col md={2}>
                              <div className="d-flex mb-0 align-items-center">
                                <div className="flex-shrink-0">
                                  <i
                                    className="uil uil-clock-three text-primary me-1"
                                    style={{ fontSize: "19px" }}
                                  ></i>
                                </div>
                                <p className="text-muted mb-0">
                                  {jobVacancyListDetail.duration}
                                </p>
                              </div>
                            </Col>

                            <Col
                              md={2}
                              className="d-flex justify-content-around"
                            >
                              <div className="d-flex align-items-center">
                                <span
                                  className={
                                    jobVacancyListDetail.statusString ===
                                    "Waiting Approval"
                                      ? "badge bg-warning text-light fs-12"
                                      : jobVacancyListDetail.statusString ===
                                        "In Progress"
                                      ? "badge bg-blue text-light fs-12"
                                      : jobVacancyListDetail.statusString ===
                                        "Rejected"
                                      ? "badge bg-danger text-light fs-12"
                                      : jobVacancyListDetail.statusString ===
                                        "Expired"
                                      ? "badge bg-danger text-light fs-12"
                                      : jobVacancyListDetail.statusString ===
                                        "Cancelled"
                                      ? "badge bg-danger text-light fs-12"
                                      : jobVacancyListDetail.statusString ===
                                        "Closed"
                                      ? "badge bg-secondary text-light fs-12"
                                      : jobVacancyListDetail.statusString ===
                                        "Completed"
                                      ? "badge bg-primary text-light fs-12"
                                      : jobVacancyListDetail.statusString ===
                                        "Saved"
                                      ? "badge bg-info text-light fs-12"
                                      : ""
                                  }
                                >
                                  {jobVacancyListDetail.statusString}
                                </span>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* ----------------------------------------------------- */}
                  {/* phan trang */}
                  <Row>
                    <Col lg={12} className="mt-4 pt-2">
                      <nav aria-label="Page navigation example">
                        <div className="pagination job-pagination mb-0 justify-content-center">
                          <li
                            className={`page-item ${
                              currentPageExpired === 1 ? "disabled" : ""
                            }`}
                          >
                            <Link
                              className="page-link"
                              to="#"
                              tabIndex="-1"
                              onClick={handlePrevPageExpired}
                            >
                              <i className="mdi mdi-chevron-double-left fs-15"></i>
                            </Link>
                          </li>
                          {renderPageNumbersExpired()}
                          <li
                            className={`page-item ${
                              currentPageExpired === totalPagesExpired
                                ? "disabled"
                                : ""
                            }`}
                          >
                            <Link
                              className="page-link"
                              to="#"
                              onClick={handleNextPageExpired}
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
            </Skeleton>
          </TabPane>
          <TabPane tabId="6">
            <Skeleton loading={skeleton6}>
              {jobVacancyListCancelled.length === 0 ? (
                <div>
                  <Empty />
                </div>
              ) : (
                <div>
                  <div>
                    {jobVacancyListCancelled.map(
                      (jobVacancyListDetail, key) => (
                        <div
                          style={{
                            boxShadow:
                              "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                          }}
                          key={key}
                          className={
                            "job-box-dev-in-list-hiringRequest-for-dev mt-3 card"
                          }
                        >
                          <div className="p-2">
                            <Row className="align-items-center">
                              <Col md={2}>
                                <div>
                                  <Link to="/companydetails">
                                    <img
                                      style={{
                                        width: "80px",
                                        height: "80px",
                                      }}
                                      src={jobVacancyListDetail.companyImage}
                                      alt=""
                                      className="img-fluid rounded-3 img-avt-hiring-request"
                                    />
                                  </Link>
                                </div>
                              </Col>

                              <Col md={3}>
                                <div>
                                  <h5 className="fs-18 mb-0">
                                    <Link
                                      to="/newhiringrequestdetail"
                                      className="text-dark"
                                      state={{
                                        hiringRequestId:
                                          jobVacancyListDetail.requestId,
                                        companyId:
                                          jobVacancyListDetail.companyId,
                                        projectId:
                                          jobVacancyListDetail.projectId,
                                      }}
                                    >
                                      {jobVacancyListDetail.jobTitle}
                                    </Link>
                                  </h5>
                                  <p className="text-muted fs-14 mb-0">
                                    {jobVacancyListDetail.requestCode}
                                  </p>
                                </div>
                              </Col>

                              <Col md={3}>
                                <div className="d-flex mb-0 align-items-center">
                                  <div className="flex-shrink-0">
                                    <i
                                      className="uil uil-user-check text-primary me-1"
                                      style={{ fontSize: "19px" }}
                                    ></i>
                                  </div>
                                  <p className="text-muted mb-0">
                                    {jobVacancyListDetail.numberOfDev} developer
                                  </p>
                                </div>
                              </Col>

                              <Col md={2}>
                                <div className="d-flex mb-0 align-items-center">
                                  <div className="flex-shrink-0">
                                    <i
                                      className="uil uil-clock-three text-primary me-1"
                                      style={{ fontSize: "19px" }}
                                    ></i>
                                  </div>
                                  <p className="text-muted mb-0">
                                    {jobVacancyListDetail.duration}
                                  </p>
                                </div>
                              </Col>

                              <Col
                                md={2}
                                className="d-flex justify-content-around"
                              >
                                <div className="d-flex align-items-center">
                                  <span
                                    className={
                                      jobVacancyListDetail.statusString ===
                                      "Waiting Approval"
                                        ? "badge bg-warning text-light fs-12"
                                        : jobVacancyListDetail.statusString ===
                                          "In Progress"
                                        ? "badge bg-blue text-light fs-12"
                                        : jobVacancyListDetail.statusString ===
                                          "Rejected"
                                        ? "badge bg-danger text-light fs-12"
                                        : jobVacancyListDetail.statusString ===
                                          "Expired"
                                        ? "badge bg-danger text-light fs-12"
                                        : jobVacancyListDetail.statusString ===
                                          "Cancelled"
                                        ? "badge bg-danger text-light fs-12"
                                        : jobVacancyListDetail.statusString ===
                                          "Closed"
                                        ? "badge bg-secondary text-light fs-12"
                                        : jobVacancyListDetail.statusString ===
                                          "Completed"
                                        ? "badge bg-primary text-light fs-12"
                                        : jobVacancyListDetail.statusString ===
                                          "Saved"
                                        ? "badge bg-info text-light fs-12"
                                        : ""
                                    }
                                  >
                                    {jobVacancyListDetail.statusString}
                                  </span>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                  {/* ----------------------------------------------------- */}
                  {/* phan trang */}
                  <Row>
                    <Col lg={12} className="mt-4 pt-2">
                      <nav aria-label="Page navigation example">
                        <div className="pagination job-pagination mb-0 justify-content-center">
                          <li
                            className={`page-item ${
                              currentPageCancelled === 1 ? "disabled" : ""
                            }`}
                          >
                            <Link
                              className="page-link"
                              to="#"
                              tabIndex="-1"
                              onClick={handlePrevPageCancelled}
                            >
                              <i className="mdi mdi-chevron-double-left fs-15"></i>
                            </Link>
                          </li>
                          {renderPageNumbersCancelled()}
                          <li
                            className={`page-item ${
                              currentPageCancelled === totalPagesCancelled
                                ? "disabled"
                                : ""
                            }`}
                          >
                            <Link
                              className="page-link"
                              to="#"
                              onClick={handleNextPageCancelled}
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
            </Skeleton>
          </TabPane>
          <TabPane tabId="7">
            <Skeleton loading={skeleton7}>
              {jobVacancyListClosed.length === 0 ? (
                <div>
                  <Empty />
                </div>
              ) : (
                <div>
                  <div>
                    {jobVacancyListClosed.map((jobVacancyListDetail, key) => (
                      <div
                        style={{
                          boxShadow:
                            "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                        }}
                        key={key}
                        className={
                          "job-box-dev-in-list-hiringRequest-for-dev mt-3 card"
                        }
                      >
                        <div className="p-2">
                          <Row className="align-items-center">
                            <Col md={2}>
                              <div>
                                <Link to="/companydetails">
                                  <img
                                    style={{
                                      width: "80px",
                                      height: "80px",
                                    }}
                                    src={jobVacancyListDetail.companyImage}
                                    alt=""
                                    className="img-fluid rounded-3 img-avt-hiring-request"
                                  />
                                </Link>
                              </div>
                            </Col>

                            <Col md={3}>
                              <div>
                                <h5 className="fs-18 mb-0">
                                  <Link
                                    to="/newhiringrequestdetail"
                                    className="text-dark"
                                    state={{
                                      hiringRequestId:
                                        jobVacancyListDetail.requestId,
                                      companyId: jobVacancyListDetail.companyId,
                                      projectId: jobVacancyListDetail.projectId,
                                    }}
                                  >
                                    {jobVacancyListDetail.jobTitle}
                                  </Link>
                                </h5>
                                <p className="text-muted fs-14 mb-0">
                                  {jobVacancyListDetail.requestCode}
                                </p>
                              </div>
                            </Col>

                            <Col md={3}>
                              <div className="d-flex mb-0 align-items-center">
                                <div className="flex-shrink-0">
                                  <i
                                    className="uil uil-user-check text-primary me-1"
                                    style={{ fontSize: "19px" }}
                                  ></i>
                                </div>
                                <p className="text-muted mb-0">
                                  {jobVacancyListDetail.numberOfDev} developer
                                </p>
                              </div>
                            </Col>

                            <Col md={2}>
                              <div className="d-flex mb-0 align-items-center">
                                <div className="flex-shrink-0">
                                  <i
                                    className="uil uil-clock-three text-primary me-1"
                                    style={{ fontSize: "19px" }}
                                  ></i>
                                </div>
                                <p className="text-muted mb-0">
                                  {jobVacancyListDetail.duration}
                                </p>
                              </div>
                            </Col>

                            <Col
                              md={2}
                              className="d-flex justify-content-around"
                            >
                              <div className="d-flex align-items-center">
                                <span
                                  className={
                                    jobVacancyListDetail.statusString ===
                                    "Waiting Approval"
                                      ? "badge bg-warning text-light fs-12"
                                      : jobVacancyListDetail.statusString ===
                                        "In Progress"
                                      ? "badge bg-blue text-light fs-12"
                                      : jobVacancyListDetail.statusString ===
                                        "Rejected"
                                      ? "badge bg-danger text-light fs-12"
                                      : jobVacancyListDetail.statusString ===
                                        "Expired"
                                      ? "badge bg-danger text-light fs-12"
                                      : jobVacancyListDetail.statusString ===
                                        "Cancelled"
                                      ? "badge bg-danger text-light fs-12"
                                      : jobVacancyListDetail.statusString ===
                                        "Closed"
                                      ? "badge bg-secondary text-light fs-12"
                                      : jobVacancyListDetail.statusString ===
                                        "Completed"
                                      ? "badge bg-primary text-light fs-12"
                                      : jobVacancyListDetail.statusString ===
                                        "Saved"
                                      ? "badge bg-info text-light fs-12"
                                      : ""
                                  }
                                >
                                  {jobVacancyListDetail.statusString}
                                </span>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* ----------------------------------------------------- */}
                  {/* phan trang */}
                  <Row>
                    <Col lg={12} className="mt-4 pt-2">
                      <nav aria-label="Page navigation example">
                        <div className="pagination job-pagination mb-0 justify-content-center">
                          <li
                            className={`page-item ${
                              currentPageClosed === 1 ? "disabled" : ""
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
                              currentPageClosed === totalPagesClosed
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
            </Skeleton>
          </TabPane>
          <TabPane tabId="8">
            <Skeleton loading={skeleton8}>
              {jobVacancyListCompleted.length === 0 ? (
                <div>
                  <Empty />
                </div>
              ) : (
                <div>
                  <div>
                    {jobVacancyListCompleted.map(
                      (jobVacancyListDetail, key) => (
                        <div
                          style={{
                            boxShadow:
                              "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                          }}
                          key={key}
                          className={
                            "job-box-dev-in-list-hiringRequest-for-dev mt-3 card"
                          }
                        >
                          <div className="p-2">
                            <Row className="align-items-center">
                              <Col md={2}>
                                <div>
                                  <Link to="/companydetails">
                                    <img
                                      style={{
                                        width: "80px",
                                        height: "80px",
                                      }}
                                      src={jobVacancyListDetail.companyImage}
                                      alt=""
                                      className="img-fluid rounded-3 img-avt-hiring-request"
                                    />
                                  </Link>
                                </div>
                              </Col>

                              <Col md={3}>
                                <div>
                                  <h5 className="fs-18 mb-0">
                                    <Link
                                      to="/newhiringrequestdetail"
                                      className="text-dark"
                                      state={{
                                        hiringRequestId:
                                          jobVacancyListDetail.requestId,
                                        companyId:
                                          jobVacancyListDetail.companyId,
                                        projectId:
                                          jobVacancyListDetail.projectId,
                                      }}
                                    >
                                      {jobVacancyListDetail.jobTitle}
                                    </Link>
                                  </h5>
                                  <p className="text-muted fs-14 mb-0">
                                    {jobVacancyListDetail.requestCode}
                                  </p>
                                </div>
                              </Col>

                              <Col md={3}>
                                <div className="d-flex mb-0 align-items-center">
                                  <div className="flex-shrink-0">
                                    <i
                                      className="uil uil-user-check text-primary me-1"
                                      style={{ fontSize: "19px" }}
                                    ></i>
                                  </div>
                                  <p className="text-muted mb-0">
                                    {jobVacancyListDetail.numberOfDev} developer
                                  </p>
                                </div>
                              </Col>

                              <Col md={2}>
                                <div className="d-flex mb-0 align-items-center">
                                  <div className="flex-shrink-0">
                                    <i
                                      className="uil uil-clock-three text-primary me-1"
                                      style={{ fontSize: "19px" }}
                                    ></i>
                                  </div>
                                  <p className="text-muted mb-0">
                                    {jobVacancyListDetail.duration}
                                  </p>
                                </div>
                              </Col>

                              <Col
                                md={2}
                                className="d-flex justify-content-around"
                              >
                                <div className="d-flex align-items-center">
                                  <span
                                    className={
                                      jobVacancyListDetail.statusString ===
                                      "Waiting Approval"
                                        ? "badge bg-warning text-light fs-12"
                                        : jobVacancyListDetail.statusString ===
                                          "In Progress"
                                        ? "badge bg-blue text-light fs-12"
                                        : jobVacancyListDetail.statusString ===
                                          "Rejected"
                                        ? "badge bg-danger text-light fs-12"
                                        : jobVacancyListDetail.statusString ===
                                          "Expired"
                                        ? "badge bg-danger text-light fs-12"
                                        : jobVacancyListDetail.statusString ===
                                          "Cancelled"
                                        ? "badge bg-danger text-light fs-12"
                                        : jobVacancyListDetail.statusString ===
                                          "Closed"
                                        ? "badge bg-secondary text-light fs-12"
                                        : jobVacancyListDetail.statusString ===
                                          "Completed"
                                        ? "badge bg-primary text-light fs-12"
                                        : jobVacancyListDetail.statusString ===
                                          "Saved"
                                        ? "badge bg-info text-light fs-12"
                                        : ""
                                    }
                                  >
                                    {jobVacancyListDetail.statusString}
                                  </span>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                  {/* ----------------------------------------------------- */}
                  {/* phan trang */}
                  <Row>
                    <Col lg={12} className="mt-4 pt-2">
                      <nav aria-label="Page navigation example">
                        <div className="pagination job-pagination mb-0 justify-content-center">
                          <li
                            className={`page-item ${
                              currentPageCompleted === 1 ? "disabled" : ""
                            }`}
                          >
                            <Link
                              className="page-link"
                              to="#"
                              tabIndex="-1"
                              onClick={handlePrevPageCompleted}
                            >
                              <i className="mdi mdi-chevron-double-left fs-15"></i>
                            </Link>
                          </li>
                          {renderPageNumbersCompleted()}
                          <li
                            className={`page-item ${
                              currentPageCompleted === totalPagesCompleted
                                ? "disabled"
                                : ""
                            }`}
                          >
                            <Link
                              className="page-link"
                              to="#"
                              onClick={handleNextPageCompleted}
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
            </Skeleton>
          </TabPane>
        </TabContent>
      </CardBody>
    </React.Fragment>
  );
};

export default JobVacancyList;

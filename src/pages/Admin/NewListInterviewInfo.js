import React, { useEffect, useState } from "react";
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
import { Form } from "react-bootstrap";
import jobImage1 from "../../assets/images/featured-job/img-01.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faCalendarDays,
  faUser,
  faHourglassHalf,
} from "@fortawesome/free-regular-svg-icons";
import { faLaptopCode } from "@fortawesome/free-solid-svg-icons";

import interviewServices from "../../services/interview.services";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import img0 from "../../assets/images/user/img-00.jpg";
import classnames from "classnames";
import { Input, Space, Layout, Badge } from "antd";

import SiderBarWeb from "./SlideBar/SiderBarWeb";
import userAuthorization from "../../utils/userAuthorization";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import NavBarWeb from "./NavBar/NavBarWeb";

const { Header, Footer, Content } = Layout;

const NewListInterviewInfo = () => {
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

  const [newInterviewListInManager, setNewInterviewListInManager] = useState(
    []
  );

  //---------------------------------------------------------------------------------------
  const [interviewListWaitingApproval, setInterviewListWaitingApproval] =
    useState([]);
  const [interviewListApproval, setInterviewListApproval] = useState([]);
  const [interviewListComplete, setInterviewListComplete] = useState([]);
  const [interviewListReject, setInterviewListReject] = useState([]);
  const [interviewCancelled, setInterviewCancelled] = useState([]);

  //---------------------------------------------------------------------------------------
  let [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 7;
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const fetchNewInterviewListInManager = async () => {
    let response;
    try {
      response = await interviewServices.getAllInterviewByManagerAndPaging(
        currentPage,
        7
      );
      console.log(response.data.data);
      setNewInterviewListInManager(response.data.data);
      setTotalPages(Math.ceil(response.data.paging.total / pageSize));
    } catch (error) {
      console.error("Error fetching interview in manager list :", error);
    }
  };
  //-------------------------------------------------------------------------------------
  let [currentPageWaitingApproval, setCurrentPageWaitingApproval] = useState(1);
  const [totalPagesWaitingApproval, setTotalPagesWaitingApproval] = useState(1);
  const pageSizeWaitingApproval = 7;
  const handlePageClickWaitingApproval = (page) => {
    setCurrentPageWaitingApproval(page);
  };
  const fetchInterviewListWaitingApproval = async () => {
    let response;
    let tmp;
    try {
      response = await interviewServices.getAllInterviewByManagerAndPaging(
        currentPageWaitingApproval,
        7
      );
      console.log(response.data.data);
      tmp = response.data.data.filter(
        (developer) => developer.statusString == "Waiting Approval"
      );

      setInterviewListWaitingApproval(tmp);
      setTotalPagesWaitingApproval(
        Math.ceil(tmp.length / pageSizeWaitingApproval)
      );
    } catch (error) {
      console.error("Error fetching interview Waiting Approval list :", error);
    }
  };
  //-------------------------------------------------------------------------------------
  let [currentPageApproval, setCurrentPageApproval] = useState(1);
  const [totalPagesApproval, setTotalPagesApproval] = useState(1);
  const pageSizeApproval = 7;
  const handlePageClickApproval = (page) => {
    setCurrentPageApproval(page);
  };
  const fetchInterviewListApproval = async () => {
    let response;
    let tmp;
    try {
      response = await interviewServices.getAllInterviewByManagerAndPaging(
        currentPageApproval,
        7
      );
      console.log(response.data.data);
      tmp = response.data.data.filter(
        (developer) => developer.statusString == "Approved"
      );
      setInterviewListApproval(tmp);
      setTotalPagesApproval(Math.ceil(tmp.length / pageSizeApproval));
    } catch (error) {
      console.error("Error fetching interview Approval list :", error);
    }
  };
  //-------------------------------------------------------------------------------------
  let [currentPageComplete, setCurrentPageComplete] = useState(1);
  const [totalPagesComplete, setTotalPagesComplete] = useState(1);
  const pageSizeComplete = 7;
  const handlePageClickComplete = (page) => {
    setCurrentPageComplete(page);
  };
  const fetchInterviewListComplete = async () => {
    let response;
    let tmp;
    try {
      response = await interviewServices.getAllInterviewByManagerAndPaging(
        currentPageComplete,
        7
      );
      console.log(response.data.data);
      tmp = response.data.data.filter(
        (developer) => developer.statusString == "Completed"
      );
      setInterviewListComplete(tmp);
      setTotalPagesComplete(Math.ceil(tmp.length / pageSizeComplete));
    } catch (error) {
      console.error("Error fetching interview Completed list :", error);
    }
  };

  //-------------------------------------------------------------------------------------
  let [currentPageReject, setCurrentPageReject] = useState(1);
  const [totalPagesReject, setTotalPagesReject] = useState(1);
  const pageSizeReject = 7;
  const handlePageClickReject = (page) => {
    setCurrentPageReject(page);
  };

  const fetchInterviewListReject = async () => {
    let response;
    let tmp;
    try {
      response = await interviewServices.getAllInterviewByManagerAndPaging(
        currentPageReject,
        7
      );
      console.log(response.data.data);
      tmp = response.data.data.filter(
        (developer) => developer.statusString == "Rejected"
      );
      setInterviewListReject(tmp);
      setTotalPagesReject(Math.ceil(tmp.length / pageSizeReject));
    } catch (error) {
      console.error("Error fetching interview Rejected list :", error);
    }
  };
  //-------------------------------------------------------------------------------------
  let [currentPageCancelled, setCurrentPageCancelled] = useState(1);
  const [totalPagesCancelled, setTotalPagesCancelled] = useState(1);
  const pageSizeCancelled = 7;
  const handlePageClickCancelled = (page) => {
    setCurrentPageCancelled(page);
  };

  const fetchInterviewListCancelled = async () => {
    let response;
    let tmp;
    try {
      response = await interviewServices.getAllInterviewByManagerAndPaging(
        currentPageCancelled,
        7
      );
      console.log(response.data.data);
      tmp = response.data.data.filter(
        (developer) => developer.statusString == "Cancelled"
      );
      setInterviewCancelled(tmp);
      setTotalPagesCancelled(Math.ceil(tmp.length / pageSizeCancelled));
    } catch (error) {
      console.error("Error fetching interview Rejected list :", error);
    }
  };

  //-------------------------------------------------------------------------------------

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
  //-------------------------------------------------------------------------------------
  // Phan trang Waiting Approval
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
  //-------------------------------------------------------------------------------------
  // Phan trang Approval
  const renderPageNumbersApproval = () => {
    const pageNumbers = [];
    const maxPageButtons = 4;
    let startPage = Math.max(
      1,
      currentPageApproval - Math.floor(maxPageButtons / 2)
    );
    let endPage = Math.min(totalPagesApproval, startPage + maxPageButtons - 1);
    if (
      totalPagesApproval > maxPageButtons &&
      currentPageApproval <= Math.floor(maxPageButtons / 2) + 1
    ) {
      endPage = maxPageButtons;
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${i === currentPageApproval ? "active" : ""}`}
        >
          <Link
            className="page-link"
            to="#"
            onClick={() => handlePageClickApproval(i)}
          >
            {i}
          </Link>
        </li>
      );
    }
    return pageNumbers;
  };

  const handleNextPageApproval = () => {
    if (currentPageApproval < totalPagesApproval) {
      setCurrentPageApproval(currentPageApproval + 1);
    }
  };

  const handlePrevPageApproval = () => {
    if (currentPageApproval > 1) {
      setCurrentPageApproval(currentPageApproval - 1);
    }
  };
  //-------------------------------------------------------------------------------------
  // Phan trang Complete
  const renderPageNumbersComplete = () => {
    const pageNumbers = [];
    const maxPageButtons = 4;
    let startPage = Math.max(
      1,
      currentPageComplete - Math.floor(maxPageButtons / 2)
    );
    let endPage = Math.min(totalPagesComplete, startPage + maxPageButtons - 1);
    if (
      totalPagesComplete > maxPageButtons &&
      currentPageComplete <= Math.floor(maxPageButtons / 2) + 1
    ) {
      endPage = maxPageButtons;
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${i === currentPageComplete ? "active" : ""}`}
        >
          <Link
            className="page-link"
            to="#"
            onClick={() => handlePageClickComplete(i)}
          >
            {i}
          </Link>
        </li>
      );
    }
    return pageNumbers;
  };

  const handleNextPageComplete = () => {
    if (currentPageComplete < totalPagesComplete) {
      setCurrentPageComplete(currentPageComplete + 1);
    }
  };

  const handlePrevPageComplete = () => {
    if (currentPageComplete > 1) {
      setCurrentPageComplete(currentPageComplete - 1);
    }
  };
  //-------------------------------------------------------------------------------------
  // Phan trang Rejected
  const renderPageNumbersReject = () => {
    const pageNumbers = [];
    const maxPageButtons = 4;
    let startPage = Math.max(
      1,
      currentPageReject - Math.floor(maxPageButtons / 2)
    );
    let endPage = Math.min(totalPagesReject, startPage + maxPageButtons - 1);
    if (
      totalPagesReject > maxPageButtons &&
      currentPageReject <= Math.floor(maxPageButtons / 2) + 1
    ) {
      endPage = maxPageButtons;
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${i === currentPageReject ? "active" : ""}`}
        >
          <Link
            className="page-link"
            to="#"
            onClick={() => handlePageClickReject(i)}
          >
            {i}
          </Link>
        </li>
      );
    }
    return pageNumbers;
  };

  const handleNextPageReject = () => {
    if (currentPageReject < totalPagesReject) {
      setCurrentPageComplete(currentPageReject + 1);
    }
  };

  const handlePrevPageReject = () => {
    if (currentPageReject > 1) {
      setCurrentPageReject(currentPageReject - 1);
    }
  };

  //-------------------------------------------------------------------------------------
  // Phan trang Cancelled
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

  //-------------------------------------------------------------------------------------
  const [selectInterviewDetail, setSelectInterviewDetail] = useState({});
  const [devInterviewDetail, setDevInterviewDetail] = useState([]);

  const midleSelect = (id) => {
    fetchGetDetailInterviewByInterviewId(id);
    setShowPopup(true);
  };

  const fetchGetDetailInterviewByInterviewId = async (id) => {
    let response;

    try {
      response = await interviewServices.getDetailInterviewByInterviewId(id);
      console.log("----------------------------------");
      console.log(response.data.data);
      console.log(response.data.data.developer.skillRequireStrings);
      setSelectInterviewDetail(response.data.data);
      setDevInterviewDetail(response.data.data.developer);

      console.log("----------------------------------");
    } catch (error) {
      console.error("Error fetching interview detail in manager list :", error);
    }
  };

  //-------------------------------------------------------------------------------------
  useEffect(() => {
    fetchNewInterviewListInManager();
  }, [currentPage]);

  useEffect(() => {
    fetchInterviewListWaitingApproval();
  }, [currentPageWaitingApproval]);

  useEffect(() => {
    fetchInterviewListApproval();
  }, [currentPageApproval]);

  useEffect(() => {
    fetchInterviewListComplete();
  }, [currentPageComplete]);

  useEffect(() => {
    fetchInterviewListReject();
  }, [currentPageReject]);

  useEffect(() => {
    fetchInterviewListCancelled();
  }, [currentPageCancelled]);
  //-------------------------------------------------------------------------------------
  const [showPopup, setShowPopup] = useState(false);

  //-------------------------------------------------------------------------------------
  const [activeTab, setActiveTab] = useState("1");
  const tabChange = (tab) => {
    if (activeTab) {
      if (activeTab !== tab) setActiveTab(tab);
    }
  };
  //-------------------------------------------------------------------------------------
  //Search
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  //-------------------------------------------------------------------------------------
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <React.Fragment>
      <Layout style={{ minHeight: "100vh" }}>
        <SiderBarWeb choose={"menu-key/11"}></SiderBarWeb>

        <Layout>
          {/* <div
            style={{
              backgroundColor: "#FFFF",
              height: "70px",
              display: "flex",
              alignItems: "center",
              borderRadius: "7px",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              marginLeft: "30px",
              marginRight: "30px",
              marginBottom: "0px",
            }}
            className="mt-4 justify-content-end"
          >
            <div
              className="d-flex gap-4 align-items-center"
              style={{ height: "inherit" }}
            >
              <Space>
                <Badge dot>
                  <i
                    className="uil uil-bell"
                    style={{ color: "#8F78DF", fontSize: "20px" }}
                  ></i>
                </Badge>
              </Space>
              <Space>
                <Badge dot>
                  <i
                    className="uil uil-envelope-open"
                    style={{ color: "#8F78DF", fontSize: "20px" }}
                  ></i>
                </Badge>
              </Space>

              <div
                className="p-2  d-flex gap-3 align-items-center"
                style={{
                  height: "inherit",
                  backgroundColor: "#6546D2",
                  color: "white",
                  borderRadius: "10px",
                }}
              >
                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                  <DropdownToggle
                    className="p-2 d-flex gap-3 align-items-center"
                    style={{
                      height: "inherit",
                      backgroundColor: "#6546D2",
                      color: "white",

                      cursor: "pointer",
                      border: "0px",
                    }}
                  >
                    <div>
                      <img
                        src={img0}
                        className="ms-1"
                        style={{
                          borderRadius: "10px",
                          height: "50px",
                        }}
                      />
                    </div>
                    <div className="me-1 d-flex flex-column align-items-center">
                      <span className="fs-18">Nik jone</span>
                      <span>Available</span>
                    </div>
                  </DropdownToggle>
                  <DropdownMenu
                    style={{
                      marginLeft: "-25px",
                    }}
                  >
                    <DropdownItem style={{ padding: "0px" }}>
                      <div>
                        <Link to="#" className="dropdown-item">
                          Setting
                        </Link>
                      </div>
                    </DropdownItem>

                    <DropdownItem style={{ padding: "0px" }}>
                      <div>
                        <Link to="/signout" className="dropdown-item">
                          Logout
                        </Link>
                      </div>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </div> */}
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
                      <h4>Interview List</h4>

                      <div className="d-flex justify-content-between">
                        <Nav
                          className="profile-content-nav nav-pills border-bottom gap-3 mb-3 "
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
                              Approved
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
                              Complete
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
                              Rejected
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

                      <Modal
                        centered
                        open={showPopup}
                        onOk={() => setShowPopup(false)}
                        onCancel={() => setShowPopup(false)}
                        width={1100}
                        footer={null}
                      >
                        <Row className="p-3">
                          <Col lg={6} className="border-end ">
                            <div
                              className="d-flex justify-content-between"
                              style={{ width: "98%" }}
                            >
                              <h4 className="mb-0">Interview Detail</h4>
                              <p className="badge bg-success text-light fs-13 ">
                                {selectInterviewDetail.statusString}
                              </p>
                            </div>
                            <div className="mt-3">
                              <p className="mb-0 text-muted">Title </p>
                              <div
                                className="p-2 border border-2"
                                style={{
                                  width: "98%",
                                  fontWeight: "500",
                                  borderRadius: "10px",
                                }}
                              >
                                {selectInterviewDetail.title}
                              </div>
                            </div>
                            <div className="mt-3">
                              <p className="mb-0 text-muted">Description </p>
                              <div
                                className="p-2 border border-2 "
                                style={{
                                  width: "98%",
                                  fontWeight: "500",
                                  borderRadius: "10px",
                                }}
                              >
                                {selectInterviewDetail.description}
                              </div>
                            </div>

                            <div className="mt-3">
                              <p className="mb-0 text-muted">
                                Date Of Interview{" "}
                              </p>
                              <div
                                className="p-2 border border-2"
                                style={{
                                  width: "98%",
                                  fontWeight: "500",
                                  borderRadius: "10px",
                                }}
                              >
                                {selectInterviewDetail.dateOfInterview}
                              </div>
                            </div>
                            <div
                              className="d-flex  justify-content-between"
                              style={{ gap: "20px", width: "98%" }}
                            >
                              <div className="mt-3" style={{ width: "50%" }}>
                                <p className="mb-0 text-muted">Start Time </p>
                                <div
                                  className="p-2 border border-2"
                                  style={{
                                    // width: "fit-content",
                                    fontWeight: "500",
                                    borderRadius: "10px",
                                  }}
                                >
                                  {selectInterviewDetail.startTime}
                                </div>
                              </div>

                              <div className="mt-3" style={{ width: "50%" }}>
                                <p className="mb-0 text-muted">End Time </p>
                                <div
                                  className="p-2 border border-2"
                                  style={{
                                    // width: "fit-content",
                                    fontWeight: "500",
                                    borderRadius: "10px",
                                  }}
                                >
                                  {selectInterviewDetail.endTime}
                                </div>
                              </div>
                            </div>

                            <div className="mt-3">
                              <p className="mb-0 text-muted">Posted Time</p>
                              <div
                                className="p-2 border border-2"
                                style={{
                                  width: "98%",
                                  fontWeight: "500",
                                  borderRadius: "10px",
                                }}
                              >
                                {selectInterviewDetail.postedTime}
                              </div>
                            </div>

                            {selectInterviewDetail.meetingLink == null ? (
                              <div></div>
                            ) : (
                              <div className="mt-3">
                                <p className="mb-0 text-muted">Meeting Link </p>
                                <div
                                  className="p-2 border border-2"
                                  style={{
                                    width: "99%",
                                    fontWeight: "500",
                                    borderRadius: "10px",
                                  }}
                                >
                                  {selectInterviewDetail.meetingLink == null ? (
                                    <span>None</span>
                                  ) : (
                                    selectInterviewDetail.meetingLink
                                  )}
                                </div>
                              </div>
                            )}
                          </Col>
                          <Col lg={6} className="border-start ">
                            {/* ------------------------------------------------------ */}
                            <Row>
                              <Col lg={6}>
                                <div className="p-2">
                                  <div className="candidate-profile text-center">
                                    <img
                                      src={img0}
                                      alt=""
                                      className="avatar-lg rounded-circle"
                                    />
                                    <h6 className="fs-18 mb-0 mt-4">
                                      {devInterviewDetail.firstName}{" "}
                                      {devInterviewDetail.lastName}
                                    </h6>
                                    <p className="text-muted mb-4">
                                      {devInterviewDetail.codeName}
                                    </p>
                                  </div>
                                </div>

                                <div className="candidate-profile-overview p-2">
                                  <h6 className="fs-17 fw-semibold mb-3">
                                    Profile Overview
                                  </h6>
                                  <ul className="list-unstyled mb-0">
                                    <li>
                                      <div className="d-flex justify-content-start">
                                        <label className="text-dark">
                                          Gender
                                        </label>
                                        <div>
                                          <p className="text-muted mb-0">
                                            {devInterviewDetail.genderString}
                                          </p>
                                        </div>
                                      </div>
                                    </li>

                                    <li>
                                      <div className="d-flex justify-content-start">
                                        <label className="text-dark">
                                          Email
                                        </label>
                                        <div>
                                          <p className="text-muted mb-0 ">
                                            {devInterviewDetail.email}
                                          </p>
                                        </div>
                                      </div>
                                    </li>

                                    <li>
                                      <div className="d-flex justify-content-start">
                                        <label className="text-dark">
                                          Phone
                                        </label>
                                        <div>
                                          <p className="text-muted mb-0">
                                            0123456789
                                          </p>
                                        </div>
                                      </div>
                                    </li>

                                    <li>
                                      <div className="d-flex justify-content-start">
                                        <label className="text-dark">
                                          Experience
                                        </label>
                                        <div>
                                          <p className="text-muted mb-0 ">
                                            {
                                              devInterviewDetail.yearOfExperience
                                            }{" "}
                                            Year
                                          </p>
                                        </div>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="d-flex justify-content-start">
                                        <label className="text-dark">
                                          Salary
                                        </label>
                                        <div>
                                          <p className="text-muted mb-0">
                                            {devInterviewDetail.averageSalary}
                                            VND
                                          </p>
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </Col>
                              <Col lg={6}>
                                <div className="p-2 ">
                                  <h6 className="fs-17 fw-semibold mb-2">
                                    Level
                                  </h6>
                                  <div className="d-flex flex-wrap align-items-start gap-1">
                                    <span className="badge bg-warning text-light fs-12">
                                      {devInterviewDetail.levelRequireName}
                                    </span>
                                  </div>
                                </div>

                                <div className="p-2 ">
                                  <h6 className="fs-17 fw-semibold mb-2">
                                    Type
                                  </h6>
                                  <div className="d-flex flex-wrap align-items-start gap-1">
                                    {devInterviewDetail.typeRequireStrings?.map(
                                      (skillRequire, key) => (
                                        <span
                                          key={key}
                                          className="badge bg-info-subtle text-info fs-13 mt-1"
                                        >
                                          {skillRequire}
                                        </span>
                                      )
                                    )}
                                  </div>
                                </div>

                                <div className="p-2 ">
                                  <h6 className="fs-17 fw-semibold mb-2">
                                    Professional Skills
                                  </h6>
                                  <div className="d-flex flex-wrap align-items-start gap-1">
                                    {devInterviewDetail.skillRequireStrings?.map(
                                      (skillRequire, key) => (
                                        <span
                                          key={key}
                                          className="badge bg-success-subtle text-success fs-13"
                                        >
                                          {skillRequire}
                                        </span>
                                      )
                                    )}
                                  </div>
                                </div>

                                <div className="candidate-contact-details p-2">
                                  <h6 className="fs-17 fw-semibold mb-3">
                                    Work Arrangement
                                  </h6>
                                  <ul className="list-unstyled mb-0">
                                    <div className="d-flex gap-1">
                                      <p className="mb-0 badge bg-purplel text-purple fs-13">
                                        {devInterviewDetail.scheduleTypeName}
                                      </p>
                                      <p className="mb-0 badge bg-orangeRed2l text-orangeRed2 fs-13">
                                        {devInterviewDetail.employmentTypeName}
                                      </p>
                                    </div>
                                  </ul>
                                </div>
                              </Col>
                            </Row>
                            {/* ------------------------------------------------------ */}
                          </Col>
                          <Row>
                            {selectInterviewDetail.rejectionReason == null ? (
                              <div></div>
                            ) : (
                              <div className="mt-3 ">
                                <p className="mb-0 text-muted">
                                  Rejection Reason
                                </p>
                                <div
                                  className="p-2 border border-2"
                                  style={{
                                    width: "100%",
                                    fontWeight: "500",
                                    borderRadius: "10px",
                                  }}
                                >
                                  {selectInterviewDetail.rejectionReason ==
                                  null ? (
                                    <span></span>
                                  ) : (
                                    selectInterviewDetail.rejectionReason
                                  )}
                                </div>
                              </div>
                            )}
                          </Row>
                        </Row>
                      </Modal>

                      <CardBody className="px-0">
                        <TabContent activeTab={activeTab}>
                          <TabPane tabId="1">
                            <div>
                              {newInterviewListInManager.map(
                                (newInterviewListInManagerDetail, key) => (
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
                                            <Link to="#">
                                              <img
                                                style={{
                                                  width: "80px",
                                                  height: "80px",
                                                }}
                                                src={
                                                  newInterviewListInManagerDetail.companyImage
                                                }
                                                alt=""
                                                className="img-fluid rounded-3 img-avt-hiring-request"
                                              />
                                            </Link>
                                          </div>
                                        </Col>

                                        <Col md={3} className="px-0">
                                          <div
                                            onClick={() =>
                                              midleSelect(
                                                newInterviewListInManagerDetail.interviewId
                                              )
                                            }
                                          >
                                            <h5
                                              className="fs-18 mb-0"
                                              style={{ cursor: "pointer" }}
                                            >
                                              {
                                                newInterviewListInManagerDetail.title
                                              }
                                            </h5>
                                            <p className="text-muted fs-14 mb-0 d-flex align-items-center gap-2">
                                              {
                                                newInterviewListInManagerDetail.interviewCode
                                              }
                                            </p>
                                          </div>
                                        </Col>
                                        {/* ------------------ */}

                                        {/* -------------------*/}

                                        <Col md={2} className="d-flex  gap-2">
                                          <div className="d-flex flex-column gap-2">
                                            <FontAwesomeIcon
                                              icon={faCalendarDays}
                                              size="lg"
                                              className="text-primary"
                                            />
                                            <FontAwesomeIcon
                                              icon={faClock}
                                              size="lg"
                                              className="text-primary"
                                            />
                                          </div>

                                          <div>
                                            <p className="mb-0">
                                              {
                                                newInterviewListInManagerDetail.dateOfInterview
                                              }
                                            </p>
                                            <p className="mb-0 mt-1">
                                              {
                                                newInterviewListInManagerDetail.startTime
                                              }{" "}
                                              -{" "}
                                              {
                                                newInterviewListInManagerDetail.endTime
                                              }
                                            </p>
                                          </div>
                                        </Col>

                                        <Col
                                          md={2}
                                          className="d-flex justify-content-center align-items-center"
                                        >
                                          <p className="mb-0">
                                            {
                                              newInterviewListInManagerDetail.postedTime
                                            }
                                          </p>
                                        </Col>

                                        <Col
                                          md={3}
                                          className="d-flex justify-content-center"
                                        >
                                          <span
                                            className={
                                              newInterviewListInManagerDetail.statusString ===
                                              "Waiting Approval"
                                                ? "badge bg-warning text-light fs-12"
                                                : newInterviewListInManagerDetail.statusString ===
                                                  "Approved"
                                                ? "badge bg-newGreen text-light fs-12"
                                                : newInterviewListInManagerDetail.statusString ===
                                                  "Rejected"
                                                ? "badge bg-danger text-light fs-12"
                                                : newInterviewListInManagerDetail.statusString ===
                                                  "Expired"
                                                ? "badge bg-danger text-light fs-12"
                                                : newInterviewListInManagerDetail.statusString ===
                                                  "Completed"
                                                ? "badge bg-success text-light fs-12"
                                                : newInterviewListInManagerDetail.statusString ===
                                                  "Cancelled"
                                                ? "badge bg-secondary text-light fs-12"
                                                : ""
                                            }
                                          >
                                            {
                                              newInterviewListInManagerDetail.statusString
                                            }
                                          </span>
                                        </Col>
                                      </Row>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                            {/* ----------------------------------------------------------------------------- */}
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
                          </TabPane>
                          <TabPane tabId="2">
                            <div>
                              <div>
                                {interviewListWaitingApproval.map(
                                  (newInterviewListInManagerDetail, key) => (
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
                                              <Link to="#">
                                                <img
                                                  style={{
                                                    width: "80px",
                                                    height: "80px",
                                                  }}
                                                  src={
                                                    newInterviewListInManagerDetail.companyImage
                                                  }
                                                  alt=""
                                                  className="img-fluid rounded-3 img-avt-hiring-request"
                                                />
                                              </Link>
                                            </div>
                                          </Col>

                                          <Col md={3} className="px-0">
                                            <div
                                              onClick={() =>
                                                midleSelect(
                                                  newInterviewListInManagerDetail.interviewId
                                                )
                                              }
                                            >
                                              <h5
                                                className="fs-18 mb-0"
                                                style={{ cursor: "pointer" }}
                                              >
                                                {
                                                  newInterviewListInManagerDetail.title
                                                }
                                              </h5>
                                              <p className="text-muted fs-14 mb-0 d-flex align-items-center gap-2">
                                                {
                                                  newInterviewListInManagerDetail.interviewCode
                                                }
                                              </p>
                                            </div>
                                          </Col>
                                          {/* ------------------ */}

                                          {/* -------------------*/}

                                          <Col md={2} className="d-flex  gap-2">
                                            <div className="d-flex flex-column gap-2">
                                              <FontAwesomeIcon
                                                icon={faCalendarDays}
                                                size="lg"
                                                className="text-primary"
                                              />
                                              <FontAwesomeIcon
                                                icon={faClock}
                                                size="lg"
                                                className="text-primary"
                                              />
                                            </div>

                                            <div>
                                              <p className="mb-0">
                                                {
                                                  newInterviewListInManagerDetail.dateOfInterview
                                                }
                                              </p>
                                              <p className="mb-0 mt-1">
                                                {
                                                  newInterviewListInManagerDetail.startTime
                                                }{" "}
                                                -{" "}
                                                {
                                                  newInterviewListInManagerDetail.endTime
                                                }
                                              </p>
                                            </div>
                                          </Col>

                                          <Col
                                            md={2}
                                            className="d-flex justify-content-center align-items-center"
                                          >
                                            <p className="mb-0">
                                              {
                                                newInterviewListInManagerDetail.postedTime
                                              }
                                            </p>
                                          </Col>

                                          <Col
                                            md={3}
                                            className="d-flex justify-content-center"
                                          >
                                            <span
                                              className={
                                                newInterviewListInManagerDetail.statusString ===
                                                "Waiting Approval"
                                                  ? "badge bg-warning text-light fs-12"
                                                  : newInterviewListInManagerDetail.statusString ===
                                                    "Approved"
                                                  ? "badge bg-newGreen text-light fs-12"
                                                  : newInterviewListInManagerDetail.statusString ===
                                                    "Rejected"
                                                  ? "badge bg-danger text-light fs-12"
                                                  : newInterviewListInManagerDetail.statusString ===
                                                    "Expired"
                                                  ? "badge bg-danger text-light fs-12"
                                                  : newInterviewListInManagerDetail.statusString ===
                                                    "Completed"
                                                  ? "badge bg-success text-light fs-12"
                                                  : ""
                                              }
                                            >
                                              {
                                                newInterviewListInManagerDetail.statusString
                                              }
                                            </span>
                                          </Col>
                                        </Row>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                            {/* ----------------------------------------------------------------------------- */}
                            {/* phan trang */}
                            <Row>
                              <Col lg={12} className="mt-4 pt-2">
                                <nav aria-label="Page navigation example">
                                  <div className="pagination job-pagination mb-0 justify-content-center">
                                    <li
                                      className={`page-item ${
                                        currentPageWaitingApproval === 1
                                          ? "disabled"
                                          : ""
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
                          </TabPane>
                          <TabPane tabId="3">
                            <div>
                              <div>
                                {interviewListApproval.map(
                                  (newInterviewListInManagerDetail, key) => (
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
                                              <Link to="#">
                                                <img
                                                  style={{
                                                    width: "80px",
                                                    height: "80px",
                                                  }}
                                                  src={
                                                    newInterviewListInManagerDetail.companyImage
                                                  }
                                                  alt=""
                                                  className="img-fluid rounded-3 img-avt-hiring-request"
                                                />
                                              </Link>
                                            </div>
                                          </Col>

                                          <Col md={3} className="px-0">
                                            <div
                                              onClick={() =>
                                                midleSelect(
                                                  newInterviewListInManagerDetail.interviewId
                                                )
                                              }
                                            >
                                              <h5
                                                className="fs-18 mb-0"
                                                style={{ cursor: "pointer" }}
                                              >
                                                {
                                                  newInterviewListInManagerDetail.title
                                                }
                                              </h5>
                                              <p className="text-muted fs-14 mb-0 d-flex align-items-center gap-2">
                                                {
                                                  newInterviewListInManagerDetail.interviewCode
                                                }
                                              </p>
                                            </div>
                                          </Col>
                                          {/* ------------------ */}

                                          {/* -------------------*/}

                                          <Col md={2} className="d-flex  gap-2">
                                            <div className="d-flex flex-column gap-2">
                                              <FontAwesomeIcon
                                                icon={faCalendarDays}
                                                size="lg"
                                                className="text-primary"
                                              />
                                              <FontAwesomeIcon
                                                icon={faClock}
                                                size="lg"
                                                className="text-primary"
                                              />
                                            </div>

                                            <div>
                                              <p className="mb-0">
                                                {
                                                  newInterviewListInManagerDetail.dateOfInterview
                                                }
                                              </p>
                                              <p className="mb-0 mt-1">
                                                {
                                                  newInterviewListInManagerDetail.startTime
                                                }{" "}
                                                -{" "}
                                                {
                                                  newInterviewListInManagerDetail.endTime
                                                }
                                              </p>
                                            </div>
                                          </Col>

                                          <Col
                                            md={2}
                                            className="d-flex justify-content-center align-items-center"
                                          >
                                            <p className="mb-0">
                                              {
                                                newInterviewListInManagerDetail.postedTime
                                              }
                                            </p>
                                          </Col>

                                          <Col
                                            md={3}
                                            className="d-flex justify-content-center"
                                          >
                                            <span
                                              className={
                                                newInterviewListInManagerDetail.statusString ===
                                                "Waiting Approval"
                                                  ? "badge bg-warning text-light fs-12"
                                                  : newInterviewListInManagerDetail.statusString ===
                                                    "Approved"
                                                  ? "badge bg-newGreen text-light fs-12"
                                                  : newInterviewListInManagerDetail.statusString ===
                                                    "Rejected"
                                                  ? "badge bg-danger text-light fs-12"
                                                  : newInterviewListInManagerDetail.statusString ===
                                                    "Expired"
                                                  ? "badge bg-danger text-light fs-12"
                                                  : newInterviewListInManagerDetail.statusString ===
                                                    "Completed"
                                                  ? "badge bg-success text-light fs-12"
                                                  : ""
                                              }
                                            >
                                              {
                                                newInterviewListInManagerDetail.statusString
                                              }
                                            </span>
                                          </Col>
                                        </Row>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                            {/* ----------------------------------------------------------------------------- */}
                            {/* phan trang */}
                            <Row>
                              <Col lg={12} className="mt-4 pt-2">
                                <nav aria-label="Page navigation example">
                                  <div className="pagination job-pagination mb-0 justify-content-center">
                                    <li
                                      className={`page-item ${
                                        currentPageApproval === 1
                                          ? "disabled"
                                          : ""
                                      }`}
                                    >
                                      <Link
                                        className="page-link"
                                        to="#"
                                        tabIndex="-1"
                                        onClick={handlePrevPageApproval}
                                      >
                                        <i className="mdi mdi-chevron-double-left fs-15"></i>
                                      </Link>
                                    </li>
                                    {renderPageNumbersApproval()}
                                    <li
                                      className={`page-item ${
                                        currentPageApproval ===
                                        totalPagesApproval
                                          ? "disabled"
                                          : ""
                                      }`}
                                    >
                                      <Link
                                        className="page-link"
                                        to="#"
                                        onClick={handleNextPageApproval}
                                      >
                                        <i className="mdi mdi-chevron-double-right fs-15"></i>
                                      </Link>
                                    </li>
                                  </div>
                                </nav>
                              </Col>
                            </Row>
                          </TabPane>
                          <TabPane tabId="4">
                            <div>
                              <div>
                                {interviewListComplete.map(
                                  (newInterviewListInManagerDetail, key) => (
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
                                              <Link to="#">
                                                <img
                                                  style={{
                                                    width: "80px",
                                                    height: "80px",
                                                  }}
                                                  src={
                                                    newInterviewListInManagerDetail.companyImage
                                                  }
                                                  alt=""
                                                  className="img-fluid rounded-3 img-avt-hiring-request"
                                                />
                                              </Link>
                                            </div>
                                          </Col>

                                          <Col md={3} className="px-0">
                                            <div
                                              onClick={() =>
                                                midleSelect(
                                                  newInterviewListInManagerDetail.interviewId
                                                )
                                              }
                                            >
                                              <h5
                                                className="fs-18 mb-0"
                                                style={{ cursor: "pointer" }}
                                              >
                                                {
                                                  newInterviewListInManagerDetail.title
                                                }
                                              </h5>
                                              <p className="text-muted fs-14 mb-0 d-flex align-items-center gap-2">
                                                {
                                                  newInterviewListInManagerDetail.interviewCode
                                                }
                                              </p>
                                            </div>
                                          </Col>
                                          {/* ------------------ */}

                                          {/* -------------------*/}

                                          <Col md={2} className="d-flex  gap-2">
                                            <div className="d-flex flex-column gap-2">
                                              <FontAwesomeIcon
                                                icon={faCalendarDays}
                                                size="lg"
                                                className="text-primary"
                                              />
                                              <FontAwesomeIcon
                                                icon={faClock}
                                                size="lg"
                                                className="text-primary"
                                              />
                                            </div>

                                            <div>
                                              <p className="mb-0">
                                                {
                                                  newInterviewListInManagerDetail.dateOfInterview
                                                }
                                              </p>
                                              <p className="mb-0 mt-1">
                                                {
                                                  newInterviewListInManagerDetail.startTime
                                                }{" "}
                                                -{" "}
                                                {
                                                  newInterviewListInManagerDetail.endTime
                                                }
                                              </p>
                                            </div>
                                          </Col>

                                          <Col
                                            md={2}
                                            className="d-flex justify-content-center align-items-center"
                                          >
                                            <p className="mb-0">
                                              {
                                                newInterviewListInManagerDetail.postedTime
                                              }
                                            </p>
                                          </Col>

                                          <Col
                                            md={3}
                                            className="d-flex justify-content-center"
                                          >
                                            <span
                                              className={
                                                newInterviewListInManagerDetail.statusString ===
                                                "Waiting Approval"
                                                  ? "badge bg-warning text-light fs-12"
                                                  : newInterviewListInManagerDetail.statusString ===
                                                    "Approved"
                                                  ? "badge bg-newGreen text-light fs-12"
                                                  : newInterviewListInManagerDetail.statusString ===
                                                    "Rejected"
                                                  ? "badge bg-danger text-light fs-12"
                                                  : newInterviewListInManagerDetail.statusString ===
                                                    "Expired"
                                                  ? "badge bg-danger text-light fs-12"
                                                  : newInterviewListInManagerDetail.statusString ===
                                                    "Completed"
                                                  ? "badge bg-success text-light fs-12"
                                                  : ""
                                              }
                                            >
                                              {
                                                newInterviewListInManagerDetail.statusString
                                              }
                                            </span>
                                          </Col>
                                        </Row>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                            {/* ----------------------------------------------------------------------------- */}
                            {/* phan trang */}
                            <Row>
                              <Col lg={12} className="mt-4 pt-2">
                                <nav aria-label="Page navigation example">
                                  <div className="pagination job-pagination mb-0 justify-content-center">
                                    <li
                                      className={`page-item ${
                                        currentPageComplete === 1
                                          ? "disabled"
                                          : ""
                                      }`}
                                    >
                                      <Link
                                        className="page-link"
                                        to="#"
                                        tabIndex="-1"
                                        onClick={handlePrevPageComplete}
                                      >
                                        <i className="mdi mdi-chevron-double-left fs-15"></i>
                                      </Link>
                                    </li>
                                    {renderPageNumbersComplete()}
                                    <li
                                      className={`page-item ${
                                        currentPageComplete ===
                                        totalPagesComplete
                                          ? "disabled"
                                          : ""
                                      }`}
                                    >
                                      <Link
                                        className="page-link"
                                        to="#"
                                        onClick={handleNextPageComplete}
                                      >
                                        <i className="mdi mdi-chevron-double-right fs-15"></i>
                                      </Link>
                                    </li>
                                  </div>
                                </nav>
                              </Col>
                            </Row>
                          </TabPane>
                          <TabPane tabId="5">
                            <div>
                              <div>
                                {interviewListReject.map(
                                  (newInterviewListInManagerDetail, key) => (
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
                                              <Link to="#">
                                                <img
                                                  style={{
                                                    width: "80px",
                                                    height: "80px",
                                                  }}
                                                  src={
                                                    newInterviewListInManagerDetail.companyImage
                                                  }
                                                  alt=""
                                                  className="img-fluid rounded-3 img-avt-hiring-request"
                                                />
                                              </Link>
                                            </div>
                                          </Col>

                                          <Col md={3} className="px-0">
                                            <div
                                              onClick={() =>
                                                midleSelect(
                                                  newInterviewListInManagerDetail.interviewId
                                                )
                                              }
                                            >
                                              <h5
                                                className="fs-18 mb-0"
                                                style={{ cursor: "pointer" }}
                                              >
                                                {
                                                  newInterviewListInManagerDetail.title
                                                }
                                              </h5>
                                              <p className="text-muted fs-14 mb-0 d-flex align-items-center gap-2">
                                                {
                                                  newInterviewListInManagerDetail.interviewCode
                                                }
                                              </p>
                                            </div>
                                          </Col>
                                          {/* ------------------ */}

                                          {/* -------------------*/}

                                          <Col md={2} className="d-flex  gap-2">
                                            <div className="d-flex flex-column gap-2">
                                              <FontAwesomeIcon
                                                icon={faCalendarDays}
                                                size="lg"
                                                className="text-primary"
                                              />
                                              <FontAwesomeIcon
                                                icon={faClock}
                                                size="lg"
                                                className="text-primary"
                                              />
                                            </div>

                                            <div>
                                              <p className="mb-0">
                                                {
                                                  newInterviewListInManagerDetail.dateOfInterview
                                                }
                                              </p>
                                              <p className="mb-0 mt-1">
                                                {
                                                  newInterviewListInManagerDetail.startTime
                                                }{" "}
                                                -{" "}
                                                {
                                                  newInterviewListInManagerDetail.endTime
                                                }
                                              </p>
                                            </div>
                                          </Col>

                                          <Col
                                            md={2}
                                            className="d-flex justify-content-center align-items-center"
                                          >
                                            <p className="mb-0">
                                              {
                                                newInterviewListInManagerDetail.postedTime
                                              }
                                            </p>
                                          </Col>

                                          <Col
                                            md={3}
                                            className="d-flex justify-content-center"
                                          >
                                            <span
                                              className={
                                                newInterviewListInManagerDetail.statusString ===
                                                "Waiting Approval"
                                                  ? "badge bg-warning text-light fs-12"
                                                  : newInterviewListInManagerDetail.statusString ===
                                                    "Approved"
                                                  ? "badge bg-newGreen text-light fs-12"
                                                  : newInterviewListInManagerDetail.statusString ===
                                                    "Rejected"
                                                  ? "badge bg-danger text-light fs-12"
                                                  : newInterviewListInManagerDetail.statusString ===
                                                    "Expired"
                                                  ? "badge bg-danger text-light fs-12"
                                                  : newInterviewListInManagerDetail.statusString ===
                                                    "Completed"
                                                  ? "badge bg-success text-light fs-12"
                                                  : ""
                                              }
                                            >
                                              {
                                                newInterviewListInManagerDetail.statusString
                                              }
                                            </span>
                                          </Col>
                                        </Row>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                            {/* ----------------------------------------------------------------------------- */}
                            {/* phan trang */}
                            <Row>
                              <Col lg={12} className="mt-4 pt-2">
                                <nav aria-label="Page navigation example">
                                  <div className="pagination job-pagination mb-0 justify-content-center">
                                    <li
                                      className={`page-item ${
                                        currentPageReject === 1
                                          ? "disabled"
                                          : ""
                                      }`}
                                    >
                                      <Link
                                        className="page-link"
                                        to="#"
                                        tabIndex="-1"
                                        onClick={handlePrevPageReject}
                                      >
                                        <i className="mdi mdi-chevron-double-left fs-15"></i>
                                      </Link>
                                    </li>
                                    {renderPageNumbersReject()}
                                    <li
                                      className={`page-item ${
                                        currentPageReject === totalPagesReject
                                          ? "disabled"
                                          : ""
                                      }`}
                                    >
                                      <Link
                                        className="page-link"
                                        to="#"
                                        onClick={handleNextPageReject}
                                      >
                                        <i className="mdi mdi-chevron-double-right fs-15"></i>
                                      </Link>
                                    </li>
                                  </div>
                                </nav>
                              </Col>
                            </Row>
                          </TabPane>
                          <TabPane tabId="6">
                            <div>
                              <div>
                                {interviewCancelled.map(
                                  (newInterviewListInManagerDetail, key) => (
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
                                              <Link to="#">
                                                <img
                                                  style={{
                                                    width: "80px",
                                                    height: "80px",
                                                  }}
                                                  src={
                                                    newInterviewListInManagerDetail.companyImage
                                                  }
                                                  alt=""
                                                  className="img-fluid rounded-3 img-avt-hiring-request"
                                                />
                                              </Link>
                                            </div>
                                          </Col>

                                          <Col md={3} className="px-0">
                                            <div
                                              onClick={() =>
                                                midleSelect(
                                                  newInterviewListInManagerDetail.interviewId
                                                )
                                              }
                                            >
                                              <h5
                                                className="fs-18 mb-0"
                                                style={{ cursor: "pointer" }}
                                              >
                                                {
                                                  newInterviewListInManagerDetail.title
                                                }
                                              </h5>
                                              <p className="text-muted fs-14 mb-0 d-flex align-items-center gap-2">
                                                {
                                                  newInterviewListInManagerDetail.interviewCode
                                                }
                                              </p>
                                            </div>
                                          </Col>
                                          {/* ------------------ */}

                                          {/* -------------------*/}

                                          <Col md={2} className="d-flex  gap-2">
                                            <div className="d-flex flex-column gap-2">
                                              <FontAwesomeIcon
                                                icon={faCalendarDays}
                                                size="lg"
                                                className="text-primary"
                                              />
                                              <FontAwesomeIcon
                                                icon={faClock}
                                                size="lg"
                                                className="text-primary"
                                              />
                                            </div>

                                            <div>
                                              <p className="mb-0">
                                                {
                                                  newInterviewListInManagerDetail.dateOfInterview
                                                }
                                              </p>
                                              <p className="mb-0 mt-1">
                                                {
                                                  newInterviewListInManagerDetail.startTime
                                                }{" "}
                                                -{" "}
                                                {
                                                  newInterviewListInManagerDetail.endTime
                                                }
                                              </p>
                                            </div>
                                          </Col>

                                          <Col
                                            md={2}
                                            className="d-flex justify-content-center align-items-center"
                                          >
                                            <p className="mb-0">
                                              {
                                                newInterviewListInManagerDetail.postedTime
                                              }
                                            </p>
                                          </Col>

                                          <Col
                                            md={3}
                                            className="d-flex justify-content-center"
                                          >
                                            <span
                                              className={
                                                newInterviewListInManagerDetail.statusString ===
                                                "Waiting Approval"
                                                  ? "badge bg-warning text-light fs-12"
                                                  : newInterviewListInManagerDetail.statusString ===
                                                    "Approved"
                                                  ? "badge bg-newGreen text-light fs-12"
                                                  : newInterviewListInManagerDetail.statusString ===
                                                    "Rejected"
                                                  ? "badge bg-danger text-light fs-12"
                                                  : newInterviewListInManagerDetail.statusString ===
                                                    "Expired"
                                                  ? "badge bg-danger text-light fs-12"
                                                  : newInterviewListInManagerDetail.statusString ===
                                                    "Completed"
                                                  ? "badge bg-success text-light fs-12"
                                                  : newInterviewListInManagerDetail.statusString ===
                                                    "Cancelled"
                                                  ? "badge bg-secondary text-light fs-12"
                                                  : ""
                                              }
                                            >
                                              {
                                                newInterviewListInManagerDetail.statusString
                                              }
                                            </span>
                                          </Col>
                                        </Row>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                            {/* ----------------------------------------------------------------------------- */}
                            {/* phan trang */}
                            <Row>
                              <Col lg={12} className="mt-4 pt-2">
                                <nav aria-label="Page navigation example">
                                  <div className="pagination job-pagination mb-0 justify-content-center">
                                    <li
                                      className={`page-item ${
                                        currentPageCancelled === 1
                                          ? "disabled"
                                          : ""
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
                                        currentPageCancelled ===
                                        totalPagesCancelled
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

export default NewListInterviewInfo;

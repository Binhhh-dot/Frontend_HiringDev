import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  Row,
  NavItem,
  NavLink,
  Nav,
  TabPane,
  TabContent,
  Container,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Input, Space, Layout, Badge, Modal } from "antd";
import SiderBarWeb from "./SlideBar/SiderBarWeb";
import { useNavigate, useLocation } from "react-router-dom";
import img0 from "../../assets/images/user/img-00.jpg";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import transactionHistoryServices from "../../services/transactionHistory.services";
import payServices from "../../services/pay.services";
import classnames from "classnames";

import NavBarWeb from "./NavBar/NavBarWeb";
import { Empty } from "antd";
import { Skeleton } from "antd";

const { Header, Footer, Content } = Layout;

const TransactionHistoryList = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [transactionHistoryList, setTransactionHistoryList] = useState([]);
  const [transactionHistoryListCreated, setTransactionHistoryListCreated] =
    useState([]);
  const [transactionHistoryListSuccess, setTransactionHistoryListSuccess] =
    useState([]);
  const [transactionHistoryListFailed, setTransactionHistoryListFailed] =
    useState([]);

  const [showPopup, setShowPopup] = useState(false);
  const [transactionHistoryDetail, setTransactionHistoryDetail] = useState({});
  const [paySlipInTransaction, setPaySlipInTransaction] = useState([]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  //------------------------------------------------------------------------
  const midleSelect = (id) => {
    fetchGetTransactionHistoryById(id);
    setShowPopup(true);
  };
  //------------------------------------------------------------------------
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  //------------------------------------------------------------------------
  const [activeTab, setActiveTab] = useState("1");
  const tabChange = (tab) => {
    if (activeTab) {
      if (activeTab !== tab) setActiveTab(tab);
    }
  };
  //------------------------------------------------------------------------
  const [skeleton1, setSkeleton1] = useState(true);
  const [skeleton2, setSkeleton2] = useState(true);
  const [skeleton3, setSkeleton3] = useState(true);
  const [skeleton4, setSkeleton4] = useState(true);
  //------------------------------------------------------------------------
  let [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 7;
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const fetchGetTransactionHistory = async () => {
    let response;
    try {
      response = await transactionHistoryServices.getTransactionHistory(
        currentPage,
        7
      );

      setTransactionHistoryList(response.data.data);
      setTotalPages(Math.ceil(response.data.paging.total / pageSize));
    } catch (error) {
      console.error("Error fetching list transaction history:", error);
    }
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
  //------------------------------------------------------------------------
  let [currentPageCreated, setCurrentPageCreated] = useState(1);
  const [totalPagesCreated, setTotalPagesCreated] = useState(1);
  const pageSizeCreated = 7;
  const handlePageClickCreated = (page) => {
    setCurrentPageCreated(page);
  };

  const fetchGetTransactionHistoryCreated = async () => {
    let response;
    try {
      response = await transactionHistoryServices.getTransactionHistoryCreated(
        currentPageCreated,
        7
      );
      setTransactionHistoryListCreated(response.data.data);
      setTotalPagesCreated(
        Math.ceil(response.data.paging.total / pageSizeCreated)
      );
    } catch (error) {
      console.error("Error fetching list transaction created history:", error);
    }
  };

  const renderPageNumbersCreated = () => {
    const pageNumbers = [];
    const maxPageButtons = 4;
    let startPage = Math.max(
      1,
      currentPageCreated - Math.floor(maxPageButtons / 2)
    );
    let endPage = Math.min(totalPagesCreated, startPage + maxPageButtons - 1);
    if (
      totalPagesCreated > maxPageButtons &&
      currentPageCreated <= Math.floor(maxPageButtons / 2) + 1
    ) {
      endPage = maxPageButtons;
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${i === currentPageCreated ? "active" : ""}`}
        >
          <Link
            className="page-link"
            to="#"
            onClick={() => handlePageClickCreated(i)}
          >
            {i}
          </Link>
        </li>
      );
    }
    return pageNumbers;
  };

  const handleNextPageCreated = () => {
    if (currentPageCreated < totalPagesCreated) {
      setCurrentPageCreated(currentPageCreated + 1);
    }
  };

  const handlePrevPageCreated = () => {
    if (currentPageCreated > 1) {
      setCurrentPageCreated(currentPageCreated - 1);
    }
  };
  //------------------------------------------------------------------------
  let [currentPageSuccess, setCurrentPageSuccess] = useState(1);
  const [totalPagesSuccess, setTotalPagesSuccess] = useState(1);
  const pageSizeSuccess = 7;
  const handlePageClickSuccess = (page) => {
    setCurrentPageSuccess(page);
  };

  const fetchGetTransactionHistorySuccess = async () => {
    let response;
    try {
      response = await transactionHistoryServices.getTransactionHistorySuccess(
        currentPageSuccess,
        7
      );
      setTransactionHistoryListSuccess(response.data.data);
      setTotalPagesSuccess(
        Math.ceil(response.data.paging.total / pageSizeSuccess)
      );
    } catch (error) {
      console.error("Error fetching list transaction Success history:", error);
    }
  };

  const renderPageNumbersSuccess = () => {
    const pageNumbers = [];
    const maxPageButtons = 4;
    let startPage = Math.max(
      1,
      currentPageSuccess - Math.floor(maxPageButtons / 2)
    );
    let endPage = Math.min(totalPagesSuccess, startPage + maxPageButtons - 1);
    if (
      totalPagesSuccess > maxPageButtons &&
      currentPageSuccess <= Math.floor(maxPageButtons / 2) + 1
    ) {
      endPage = maxPageButtons;
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${i === currentPageSuccess ? "active" : ""}`}
        >
          <Link
            className="page-link"
            to="#"
            onClick={() => handlePageClickSuccess(i)}
          >
            {i}
          </Link>
        </li>
      );
    }
    return pageNumbers;
  };

  const handleNextPageSuccess = () => {
    if (currentPageSuccess < totalPagesSuccess) {
      setCurrentPageSuccess(currentPageSuccess + 1);
    }
  };

  const handlePrevPageSuccess = () => {
    if (currentPageSuccess > 1) {
      setCurrentPageSuccess(currentPageSuccess - 1);
    }
  };
  //------------------------------------------------------------------------

  let [currentPageFailed, setCurrentPageFailed] = useState(1);
  const [totalPagesFailed, setTotalPagesFailed] = useState(1);
  const pageSizeFailed = 7;
  const handlePageClickFailed = (page) => {
    setCurrentPageFailed(page);
  };

  const fetchGetTransactionHistoryFailed = async () => {
    let response;
    try {
      response = await transactionHistoryServices.getTransactionHistoryFailed(
        currentPageFailed,
        7
      );
      setTransactionHistoryListFailed(response.data.data);
      setTotalPagesFailed(
        Math.ceil(response.data.paging.total / pageSizeFailed)
      );
    } catch (error) {
      console.error("Error fetching list transaction Failed history:", error);
    }
  };

  const renderPageNumbersFailed = () => {
    const pageNumbers = [];
    const maxPageButtons = 4;
    let startPage = Math.max(
      1,
      currentPageFailed - Math.floor(maxPageButtons / 2)
    );
    let endPage = Math.min(totalPagesFailed, startPage + maxPageButtons - 1);
    if (
      totalPagesFailed > maxPageButtons &&
      currentPageFailed <= Math.floor(maxPageButtons / 2) + 1
    ) {
      endPage = maxPageButtons;
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${i === currentPageFailed ? "active" : ""}`}
        >
          <Link
            className="page-link"
            to="#"
            onClick={() => handlePageClickFailed(i)}
          >
            {i}
          </Link>
        </li>
      );
    }
    return pageNumbers;
  };

  const handleNextPageFailed = () => {
    if (currentPageFailed < totalPagesFailed) {
      setCurrentPageFailed(currentPageFailed + 1);
    }
  };

  const handlePrevPageFailed = () => {
    if (currentPageFailed > 1) {
      setCurrentPageFailed(currentPageFailed - 1);
    }
  };

  //------------------------------------------------------------------------

  const fetchGetTransactionHistoryById = async (id) => {
    let response;
    let selectTransaction;

    try {
      response = await transactionHistoryServices.getAllTransactionHistory();
      console.log("all transaction");
      console.log(response.data.data);
      selectTransaction = response.data.data.filter(
        (transaction) => transaction.transactionId == id
      );
      console.log(selectTransaction[0]);
      setTransactionHistoryDetail(selectTransaction[0]);
      fetchGetPaySlipInTransaction(selectTransaction[0].payPeriodId);
    } catch (error) {
      console.error("Error fetching list transaction history detail:", error);
    }
  };

  //------------------------------------------------------------------------
  const fetchGetPaySlipInTransaction = async (payPeriodId) => {
    let response;
    try {
      response = await payServices.getPaySlip(payPeriodId);
      console.log(response.data.data);
      setPaySlipInTransaction(response.data.data);
    } catch (error) {
      console.error("Error fetching pay slip in transaction:", error);
    }
  };
  //------------------------------------------------------------------------
  useEffect(() => {
    fetchGetTransactionHistory();
  }, [currentPage]);

  //------------------------------------------------------------------------
  useEffect(() => {
    fetchGetTransactionHistoryCreated();
  }, [currentPageCreated]);
  //------------------------------------------------------------------------
  useEffect(() => {
    fetchGetTransactionHistorySuccess();
  }, [currentPageSuccess]);
  //------------------------------------------------------------------------
  useEffect(() => {
    fetchGetTransactionHistoryFailed();
  }, [currentPageFailed]);
  //------------------------------------------------------------------------
  return (
    <React.Fragment>
      <Layout style={{ minHeight: "100vh" }}>
        <SiderBarWeb choose={"menu-key/17"}></SiderBarWeb>
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
                      <h4>Transaction History List</h4>
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
                              Created
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
                              Success
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
                              Failed
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
                            <Skeleton loading={skeleton1}>
                              {transactionHistoryList.length === 0 ? (
                                <div>
                                  <Empty />
                                </div>
                              ) : (
                                <div>
                                  <div className="mt-3">
                                    {transactionHistoryList.map(
                                      (transactionHistoryListNew, key) => (
                                        <div
                                          key={key}
                                          className="job-box-dev-in-list-hiringRequest-for-dev card mt-3"
                                          style={{
                                            boxShadow:
                                              "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                                          }}
                                        >
                                          <CardBody className="p-2">
                                            <Row className="align-items-center">
                                              <Col md={2}>
                                                <div>
                                                  <Link>
                                                    <img
                                                      style={{
                                                        width: "80px",
                                                        height: "80px",
                                                      }}
                                                      src={
                                                        transactionHistoryListNew.companyImage
                                                      }
                                                      alt=""
                                                      className="img-fluid rounded-3 img-avt-hiring-request"
                                                    />
                                                  </Link>
                                                </div>
                                              </Col>

                                              <Col md={3}>
                                                <div
                                                  onClick={() =>
                                                    midleSelect(
                                                      transactionHistoryListNew.transactionId
                                                    )
                                                  }
                                                >
                                                  <h5 className="fs-18 mb-0">
                                                    <div className="text-dark">
                                                      {
                                                        transactionHistoryListNew.companyName
                                                      }
                                                    </div>
                                                  </h5>
                                                  <p className="text-muted fs-14 mb-0">
                                                    {
                                                      transactionHistoryListNew.payPalTransactionId
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
                                                      {
                                                        transactionHistoryListNew.projectName
                                                      }
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
                                                      {
                                                        transactionHistoryListNew.projectCode
                                                      }
                                                    </p>
                                                  </div>
                                                </div>
                                              </Col>

                                              <Col md={2}>
                                                <div className="d-flex flex-column gap-1 justify-content-center">
                                                  <div>
                                                    <p className="text-muted mb-0 fs-13">
                                                      Pay For Month
                                                    </p>
                                                    <p
                                                      className="mb-0 fs-17"
                                                      style={{
                                                        fontWeight: "600",
                                                      }}
                                                    >
                                                      {
                                                        transactionHistoryListNew.payForMonth
                                                      }
                                                    </p>
                                                  </div>
                                                  <div>
                                                    <p className="text-muted mb-0 fs-13">
                                                      Payment Method
                                                    </p>
                                                    <p
                                                      className="mb-0 fs-17"
                                                      style={{
                                                        fontWeight: "600",
                                                      }}
                                                    >
                                                      {
                                                        transactionHistoryListNew.paymentMethod
                                                      }
                                                    </p>
                                                  </div>
                                                </div>
                                              </Col>

                                              <Col
                                                md={2}
                                                className="d-flex justify-content-center"
                                              >
                                                <div className="d-flex align-items-center">
                                                  <span
                                                    className={
                                                      transactionHistoryListNew.statusString ===
                                                      "Pending"
                                                        ? "badge bg-warning text-light fs-12"
                                                        : transactionHistoryListNew.statusString ===
                                                          "Created"
                                                        ? "badge bg-blue text-light fs-12"
                                                        : transactionHistoryListNew.statusString ===
                                                          "Success"
                                                        ? "badge bg-newGreen text-light fs-12"
                                                        : transactionHistoryListNew.statusString ===
                                                          "Failed"
                                                        ? "badge bg-danger text-light fs-12"
                                                        : ""
                                                    }
                                                  >
                                                    {
                                                      transactionHistoryListNew.statusString
                                                    }
                                                  </span>
                                                </div>
                                              </Col>
                                            </Row>
                                          </CardBody>
                                        </div>
                                      )
                                    )}
                                  </div>

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
                            </Skeleton>
                          </TabPane>
                          <TabPane tabId="2">
                            <Skeleton loading={skeleton2}>
                              {transactionHistoryListCreated.length === 0 ? (
                                <div>
                                  <Empty />
                                </div>
                              ) : (
                                <div>
                                  <div className="mt-3">
                                    {transactionHistoryListCreated.map(
                                      (transactionHistoryListNew, key) => (
                                        <div
                                          key={key}
                                          className="job-box-dev-in-list-hiringRequest-for-dev card mt-3"
                                          style={{
                                            boxShadow:
                                              "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                                          }}
                                        >
                                          <CardBody className="p-2">
                                            <Row className="align-items-center">
                                              <Col md={2}>
                                                <div>
                                                  <Link>
                                                    <img
                                                      style={{
                                                        width: "80px",
                                                        height: "80px",
                                                      }}
                                                      src={
                                                        transactionHistoryListNew.companyImage
                                                      }
                                                      alt=""
                                                      className="img-fluid rounded-3 img-avt-hiring-request"
                                                    />
                                                  </Link>
                                                </div>
                                              </Col>

                                              <Col md={3}>
                                                <div
                                                  onClick={() =>
                                                    midleSelect(
                                                      transactionHistoryListNew.transactionId
                                                    )
                                                  }
                                                >
                                                  <h5 className="fs-18 mb-0">
                                                    <div className="text-dark">
                                                      {
                                                        transactionHistoryListNew.companyName
                                                      }
                                                    </div>
                                                  </h5>
                                                  <p className="text-muted fs-14 mb-0">
                                                    {
                                                      transactionHistoryListNew.payPalTransactionId
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
                                                      {
                                                        transactionHistoryListNew.projectName
                                                      }
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
                                                      {
                                                        transactionHistoryListNew.projectCode
                                                      }
                                                    </p>
                                                  </div>
                                                </div>
                                              </Col>

                                              <Col md={2}>
                                                <div className="d-flex flex-column gap-1 justify-content-center">
                                                  <div>
                                                    <p className="text-muted mb-0 fs-13">
                                                      Pay For Month
                                                    </p>
                                                    <p
                                                      className="mb-0 fs-17"
                                                      style={{
                                                        fontWeight: "600",
                                                      }}
                                                    >
                                                      {
                                                        transactionHistoryListNew.payForMonth
                                                      }
                                                    </p>
                                                  </div>
                                                  <div>
                                                    <p className="text-muted mb-0 fs-13">
                                                      Payment Method
                                                    </p>
                                                    <p
                                                      className="mb-0 fs-17"
                                                      style={{
                                                        fontWeight: "600",
                                                      }}
                                                    >
                                                      {
                                                        transactionHistoryListNew.paymentMethod
                                                      }
                                                    </p>
                                                  </div>
                                                </div>
                                              </Col>

                                              <Col
                                                md={2}
                                                className="d-flex justify-content-center"
                                              >
                                                <div className="d-flex align-items-center">
                                                  <span
                                                    className={
                                                      transactionHistoryListNew.statusString ===
                                                      "Pending"
                                                        ? "badge bg-warning text-light fs-12"
                                                        : transactionHistoryListNew.statusString ===
                                                          "Created"
                                                        ? "badge bg-blue text-light fs-12"
                                                        : transactionHistoryListNew.statusString ===
                                                          "Success"
                                                        ? "badge bg-newGreen text-light fs-12"
                                                        : transactionHistoryListNew.statusString ===
                                                          "Failed"
                                                        ? "badge bg-danger text-light fs-12"
                                                        : ""
                                                    }
                                                  >
                                                    {
                                                      transactionHistoryListNew.statusString
                                                    }
                                                  </span>
                                                </div>
                                              </Col>
                                            </Row>
                                          </CardBody>
                                        </div>
                                      )
                                    )}
                                  </div>

                                  {/* ---------------------------------------------------------------------- */}
                                  {/* phan trang */}
                                  <Row>
                                    <Col lg={12} className="mt-4 pt-2">
                                      <nav aria-label="Page navigation example">
                                        <div className="pagination job-pagination mb-0 justify-content-center">
                                          <li
                                            className={`page-item ${
                                              currentPageCreated === 1
                                                ? "disabled"
                                                : ""
                                            }`}
                                          >
                                            <Link
                                              className="page-link"
                                              to="#"
                                              tabIndex="-1"
                                              onClick={handlePrevPageCreated}
                                            >
                                              <i className="mdi mdi-chevron-double-left fs-15"></i>
                                            </Link>
                                          </li>
                                          {renderPageNumbersCreated()}
                                          <li
                                            className={`page-item ${
                                              currentPageCreated ===
                                              totalPagesCreated
                                                ? "disabled"
                                                : ""
                                            }`}
                                          >
                                            <Link
                                              className="page-link"
                                              to="#"
                                              onClick={handleNextPageCreated}
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
                              {transactionHistoryListSuccess.length === 0 ? (
                                <div>
                                  <Empty />
                                </div>
                              ) : (
                                <div>
                                  <div className="mt-3">
                                    {transactionHistoryListSuccess.map(
                                      (transactionHistoryListNew, key) => (
                                        <div
                                          key={key}
                                          className="job-box-dev-in-list-hiringRequest-for-dev card mt-3"
                                          style={{
                                            boxShadow:
                                              "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                                          }}
                                        >
                                          <CardBody className="p-2">
                                            <Row className="align-items-center">
                                              <Col md={2}>
                                                <div>
                                                  <Link>
                                                    <img
                                                      style={{
                                                        width: "80px",
                                                        height: "80px",
                                                      }}
                                                      src={
                                                        transactionHistoryListNew.companyImage
                                                      }
                                                      alt=""
                                                      className="img-fluid rounded-3 img-avt-hiring-request"
                                                    />
                                                  </Link>
                                                </div>
                                              </Col>

                                              <Col md={3}>
                                                <div
                                                  onClick={() =>
                                                    midleSelect(
                                                      transactionHistoryListNew.transactionId
                                                    )
                                                  }
                                                >
                                                  <h5 className="fs-18 mb-0">
                                                    <div className="text-dark">
                                                      {
                                                        transactionHistoryListNew.companyName
                                                      }
                                                    </div>
                                                  </h5>
                                                  <p className="text-muted fs-14 mb-0">
                                                    {
                                                      transactionHistoryListNew.payPalTransactionId
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
                                                      {
                                                        transactionHistoryListNew.projectName
                                                      }
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
                                                      {
                                                        transactionHistoryListNew.projectCode
                                                      }
                                                    </p>
                                                  </div>
                                                </div>
                                              </Col>

                                              <Col md={2}>
                                                <div className="d-flex flex-column gap-1 justify-content-center">
                                                  <div>
                                                    <p className="text-muted mb-0 fs-13">
                                                      Pay For Month
                                                    </p>
                                                    <p
                                                      className="mb-0 fs-17"
                                                      style={{
                                                        fontWeight: "600",
                                                      }}
                                                    >
                                                      {
                                                        transactionHistoryListNew.payForMonth
                                                      }
                                                    </p>
                                                  </div>
                                                  <div>
                                                    <p className="text-muted mb-0 fs-13">
                                                      Payment Method
                                                    </p>
                                                    <p
                                                      className="mb-0 fs-17"
                                                      style={{
                                                        fontWeight: "600",
                                                      }}
                                                    >
                                                      {
                                                        transactionHistoryListNew.paymentMethod
                                                      }
                                                    </p>
                                                  </div>
                                                </div>
                                              </Col>

                                              <Col
                                                md={2}
                                                className="d-flex justify-content-center"
                                              >
                                                <div className="d-flex align-items-center">
                                                  <span
                                                    className={
                                                      transactionHistoryListNew.statusString ===
                                                      "Pending"
                                                        ? "badge bg-warning text-light fs-12"
                                                        : transactionHistoryListNew.statusString ===
                                                          "Created"
                                                        ? "badge bg-blue text-light fs-12"
                                                        : transactionHistoryListNew.statusString ===
                                                          "Success"
                                                        ? "badge bg-newGreen text-light fs-12"
                                                        : transactionHistoryListNew.statusString ===
                                                          "Failed"
                                                        ? "badge bg-danger text-light fs-12"
                                                        : ""
                                                    }
                                                  >
                                                    {
                                                      transactionHistoryListNew.statusString
                                                    }
                                                  </span>
                                                </div>
                                              </Col>
                                            </Row>
                                          </CardBody>
                                        </div>
                                      )
                                    )}
                                  </div>

                                  {/* ---------------------------------------------------------------------- */}
                                  {/* phan trang */}
                                  <Row>
                                    <Col lg={12} className="mt-4 pt-2">
                                      <nav aria-label="Page navigation example">
                                        <div className="pagination job-pagination mb-0 justify-content-center">
                                          <li
                                            className={`page-item ${
                                              currentPageSuccess === 1
                                                ? "disabled"
                                                : ""
                                            }`}
                                          >
                                            <Link
                                              className="page-link"
                                              to="#"
                                              tabIndex="-1"
                                              onClick={handlePrevPageSuccess}
                                            >
                                              <i className="mdi mdi-chevron-double-left fs-15"></i>
                                            </Link>
                                          </li>
                                          {renderPageNumbersSuccess()}
                                          <li
                                            className={`page-item ${
                                              currentPageSuccess ===
                                              totalPagesSuccess
                                                ? "disabled"
                                                : ""
                                            }`}
                                          >
                                            <Link
                                              className="page-link"
                                              to="#"
                                              onClick={handleNextPageSuccess}
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
                              {transactionHistoryListFailed.length === 0 ? (
                                <div>
                                  <Empty />
                                </div>
                              ) : (
                                <div>
                                  <div className="mt-3">
                                    {transactionHistoryListFailed.map(
                                      (transactionHistoryListNew, key) => (
                                        <div
                                          key={key}
                                          className="job-box-dev-in-list-hiringRequest-for-dev card mt-3"
                                          style={{
                                            boxShadow:
                                              "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                                          }}
                                        >
                                          <CardBody className="p-2">
                                            <Row className="align-items-center">
                                              <Col md={2}>
                                                <div>
                                                  <Link>
                                                    <img
                                                      style={{
                                                        width: "80px",
                                                        height: "80px",
                                                      }}
                                                      src={
                                                        transactionHistoryListNew.companyImage
                                                      }
                                                      alt=""
                                                      className="img-fluid rounded-3 img-avt-hiring-request"
                                                    />
                                                  </Link>
                                                </div>
                                              </Col>

                                              <Col md={3}>
                                                <div
                                                  onClick={() =>
                                                    midleSelect(
                                                      transactionHistoryListNew.transactionId
                                                    )
                                                  }
                                                >
                                                  <h5 className="fs-18 mb-0">
                                                    <div className="text-dark">
                                                      {
                                                        transactionHistoryListNew.companyName
                                                      }
                                                    </div>
                                                  </h5>
                                                  <p className="text-muted fs-14 mb-0">
                                                    {
                                                      transactionHistoryListNew.payPalTransactionId
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
                                                      {
                                                        transactionHistoryListNew.projectName
                                                      }
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
                                                      {
                                                        transactionHistoryListNew.projectCode
                                                      }
                                                    </p>
                                                  </div>
                                                </div>
                                              </Col>

                                              <Col md={2}>
                                                <div className="d-flex flex-column gap-1 justify-content-center">
                                                  <div>
                                                    <p className="text-muted mb-0 fs-13">
                                                      Pay For Month
                                                    </p>
                                                    <p
                                                      className="mb-0 fs-17"
                                                      style={{
                                                        fontWeight: "600",
                                                      }}
                                                    >
                                                      {
                                                        transactionHistoryListNew.payForMonth
                                                      }
                                                    </p>
                                                  </div>
                                                  <div>
                                                    <p className="text-muted mb-0 fs-13">
                                                      Payment Method
                                                    </p>
                                                    <p
                                                      className="mb-0 fs-17"
                                                      style={{
                                                        fontWeight: "600",
                                                      }}
                                                    >
                                                      {
                                                        transactionHistoryListNew.paymentMethod
                                                      }
                                                    </p>
                                                  </div>
                                                </div>
                                              </Col>

                                              <Col
                                                md={2}
                                                className="d-flex justify-content-center"
                                              >
                                                <div className="d-flex align-items-center">
                                                  <span
                                                    className={
                                                      transactionHistoryListNew.statusString ===
                                                      "Pending"
                                                        ? "badge bg-warning text-light fs-12"
                                                        : transactionHistoryListNew.statusString ===
                                                          "Created"
                                                        ? "badge bg-blue text-light fs-12"
                                                        : transactionHistoryListNew.statusString ===
                                                          "Success"
                                                        ? "badge bg-newGreen text-light fs-12"
                                                        : transactionHistoryListNew.statusString ===
                                                          "Failed"
                                                        ? "badge bg-danger text-light fs-12"
                                                        : ""
                                                    }
                                                  >
                                                    {
                                                      transactionHistoryListNew.statusString
                                                    }
                                                  </span>
                                                </div>
                                              </Col>
                                            </Row>
                                          </CardBody>
                                        </div>
                                      )
                                    )}
                                  </div>

                                  {/* ---------------------------------------------------------------------- */}
                                  {/* phan trang */}
                                  <Row>
                                    <Col lg={12} className="mt-4 pt-2">
                                      <nav aria-label="Page navigation example">
                                        <div className="pagination job-pagination mb-0 justify-content-center">
                                          <li
                                            className={`page-item ${
                                              currentPageFailed === 1
                                                ? "disabled"
                                                : ""
                                            }`}
                                          >
                                            <Link
                                              className="page-link"
                                              to="#"
                                              tabIndex="-1"
                                              onClick={handlePrevPageFailed}
                                            >
                                              <i className="mdi mdi-chevron-double-left fs-15"></i>
                                            </Link>
                                          </li>
                                          {renderPageNumbersFailed()}
                                          <li
                                            className={`page-item ${
                                              currentPageFailed ===
                                              totalPagesFailed
                                                ? "disabled"
                                                : ""
                                            }`}
                                          >
                                            <Link
                                              className="page-link"
                                              to="#"
                                              onClick={handleNextPageFailed}
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
                    </div>
                  </Col>
                </Row>

                <Modal
                  centered
                  open={showPopup}
                  onOk={() => setShowPopup(false)}
                  onCancel={() => setShowPopup(false)}
                  width={1000}
                  footer={null}
                >
                  <Row className="p-3">
                    <Col lg={6} className="border-end ">
                      <div
                        className="d-flex justify-content-between"
                        style={{ width: "98%" }}
                      >
                        <h4 className="mb-0">Transaction Detail</h4>
                        <p className="badge bg-success text-light fs-13 ">
                          {transactionHistoryDetail.statusString}
                        </p>
                      </div>

                      <div className="mt-3">
                        <p className="mb-0 text-muted">Payment Method</p>
                        <div
                          className="p-2 border border-2"
                          style={{
                            width: "98%",
                            fontWeight: "500",
                            borderRadius: "10px",
                          }}
                        >
                          {transactionHistoryDetail.paymentMethod}
                        </div>
                      </div>

                      <div className="mt-3">
                        <p className="mb-0 text-muted">PayPal ID</p>
                        <div
                          className="p-2 border border-2"
                          style={{
                            width: "98%",
                            fontWeight: "500",
                            borderRadius: "10px",
                          }}
                        >
                          {transactionHistoryDetail.payPalTransactionId}
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="mb-0 text-muted">Pay For Month</p>
                        <div
                          className="p-2 border border-2 "
                          style={{
                            width: "98%",
                            fontWeight: "500",
                            borderRadius: "10px",
                          }}
                        >
                          {transactionHistoryDetail.payForMonth}
                        </div>
                      </div>

                      <div
                        className="d-flex  justify-content-between"
                        style={{ gap: "20px", width: "98%" }}
                      >
                        <div className="mt-3" style={{ width: "50%" }}>
                          <p className="mb-0 text-muted">Amount </p>
                          <div
                            className="p-2 border border-2"
                            style={{
                              fontWeight: "500",
                              borderRadius: "10px",
                            }}
                          >
                            {transactionHistoryDetail.amount}
                          </div>
                        </div>

                        <div className="mt-3" style={{ width: "50%" }}>
                          <p className="mb-0 text-muted">Time stamp </p>
                          <div
                            className="p-2 border border-2"
                            style={{
                              fontWeight: "500",
                              borderRadius: "10px",
                            }}
                          >
                            {transactionHistoryDetail.timestamp}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3">
                        <p className="mb-0 text-muted">Description</p>
                        <div
                          className="p-2 border border-2"
                          style={{
                            width: "98%",
                            fontWeight: "500",
                            borderRadius: "10px",
                          }}
                        >
                          {transactionHistoryDetail.description}
                        </div>
                      </div>
                    </Col>
                    <Col lg={6} className="border-start ">
                      {/* ------------------------------------------------------ */}
                      <Row>
                        <Col>
                          <div className="candidate-profile-overview p-2">
                            <ul className="list-unstyled mb-0">
                              <h3 className="fs-17 fw-semibold mb-1">
                                Company Overview
                              </h3>
                              <li>
                                <div className="d-flex justify-content-start gap-2">
                                  <label className="text-dark">
                                    Company Name
                                  </label>
                                  <div>
                                    <p className="text-muted mb-0">
                                      {transactionHistoryDetail.companyName}
                                    </p>
                                  </div>
                                </div>
                              </li>

                              <h3 className="fs-17 fw-semibold mb-1 mt-3">
                                Project Overview
                              </h3>
                              <li>
                                <div className="d-flex justify-content-start gap-2">
                                  <label className="text-dark">
                                    Project Name
                                  </label>
                                  <div>
                                    <p className="text-muted mb-0">
                                      {transactionHistoryDetail.projectName}
                                    </p>
                                  </div>
                                </div>
                              </li>

                              <li>
                                <div className="d-flex justify-content-start gap-2">
                                  <label className="text-dark">
                                    Project Code
                                  </label>
                                  <div>
                                    <p className="text-muted mb-0 ">
                                      {transactionHistoryDetail.projectCode}
                                    </p>
                                  </div>
                                </div>
                              </li>

                              <h3 className="fs-17 fw-semibold mb-0 mt-3">
                                Developer Overview
                              </h3>

                              <li>
                                <div className="d-flex justify-content-start gap-2">
                                  <div>
                                    <ul>
                                      {paySlipInTransaction.map(
                                        (paySlipInTransactionNew, key) => (
                                          <li>
                                            <p
                                              key={key}
                                              className="text-muted mb-0"
                                            >
                                              {
                                                paySlipInTransactionNew.firstName
                                              }{" "}
                                              {paySlipInTransactionNew.lastName}
                                            </p>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </Col>
                      </Row>
                      {/* ------------------------------------------------------ */}
                    </Col>
                  </Row>
                </Modal>
              </Container>
            </section>
          </Content>
        </Layout>
      </Layout>
    </React.Fragment>
  );
};

export default TransactionHistoryList;

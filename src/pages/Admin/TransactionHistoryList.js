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
const { Header, Footer, Content } = Layout;

const TransactionHistoryList = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [transactionHistoryList, setTransactionHistoryList] = useState([]);
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

  //------------------------------------------------------------------------

  const fetchGetTransactionHistory = async () => {
    let response;
    try {
      response = await transactionHistoryServices.getTransactionHistory(
        currentPage,
        7
      );
      console.log(response.data.data);
      setTransactionHistoryList(response.data.data);
      setTotalPages(Math.ceil(response.data.paging.total / pageSize));
    } catch (error) {
      console.error("Error fetching list transaction history:", error);
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
  }, []);

  //------------------------------------------------------------------------
  return (
    <React.Fragment>
      <Layout style={{ minHeight: "100vh" }}>
        <SiderBarWeb choose={"menu-key/17"}></SiderBarWeb>
        <Layout>
          <div
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
          </div>
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
                                            {
                                              transactionHistoryDetail.companyName
                                            }
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
                                            {
                                              transactionHistoryDetail.projectName
                                            }
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
                                            {
                                              transactionHistoryDetail.projectCode
                                            }
                                          </p>
                                        </div>
                                      </div>
                                    </li>

                                    <h3 className="fs-17 fw-semibold mb-0 mt-3">
                                      Developer Overview
                                    </h3>

                                    <li>
                                      <div className="d-flex justify-content-start gap-2">
                                        {/* <label className="text-dark">
                                          Developers Name
                                        </label> */}
                                        <div>
                                          <ul>
                                            {paySlipInTransaction.map(
                                              (
                                                paySlipInTransactionNew,
                                                key
                                              ) => (
                                                <li>
                                                  <p
                                                    key={key}
                                                    className="text-muted mb-0"
                                                  >
                                                    {
                                                      paySlipInTransactionNew.firstName
                                                    }{" "}
                                                    {
                                                      paySlipInTransactionNew.lastName
                                                    }
                                                  </p>
                                                </li>
                                              )
                                            )}
                                          </ul>
                                        </div>
                                      </div>
                                    </li>

                                    {/* <li>
                                      <div className="d-flex justify-content-start">
                                        <label className="text-dark">
                                          Experience
                                        </label>
                                        <div>
                                          <p className="text-muted mb-0 ">
                                            {"yearOfExperience"}
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
                                            {"averageSalary"}$
                                          </p>
                                        </div>
                                      </div>
                                    </li> */}
                                  </ul>
                                </div>
                              </Col>
                            </Row>
                            {/* ------------------------------------------------------ */}
                          </Col>
                        </Row>
                      </Modal>

                      {/* <CardBody>
                        <TabContent activeTab={activeTab}>
                          <TabPane tabId="1"></TabPane>
                          <TabPane tabId="1"></TabPane>
                          <TabPane tabId="1"></TabPane>
                        </TabContent>
                      </CardBody> */}
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
                                          style={{ fontWeight: "600" }}
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
                                          style={{ fontWeight: "600" }}
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
                                          style={{ fontWeight: "600" }}
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
                                          style={{ fontWeight: "600" }}
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
                                        {transactionHistoryListNew.statusString}
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
              </Container>
            </section>
          </Content>
        </Layout>
      </Layout>
    </React.Fragment>
  );
};

export default TransactionHistoryList;

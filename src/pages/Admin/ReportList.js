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
const { Header, Footer, Content } = Layout;

const ReportList = () => {
  const [reportList, setReportList] = useState([]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  //-----------------------------------------------------------------------------------
  //Search
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);
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

  useEffect(() => {
    fetchGetReportList();
  }, []);
  //-----------------------------------------------------------------------------------
  return (
    <React.Fragment>
      <Layout style={{ minHeight: "100vh" }}>
        <SiderBarWeb choose={"menu-key/16"}></SiderBarWeb>
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
                      <div className="d-flex justify-content-between">
                        <h4>Report List</h4>

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

                      <div className="mt-3">
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
                                          reportId: reportListNew.reportId,
                                          developerId:
                                            reportListNew.developerId,
                                          projectId: reportListNew.projectId,
                                        }}
                                      >
                                        {reportListNew.reportTitle}
                                      </Link>
                                    </h5>
                                    <p className="text-muted fs-14 mb-0">
                                      {reportListNew.companyPartnerName}
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
                                        reportListNew.statusString === "Pending"
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
                      </div>

                      {/* ---------------------------------------------------------------------- */}
                      {/* phan trang */}
                      <Row>
                        <Col lg={12} className="mt-4 pt-2">
                          <nav aria-label="Page navigation example">
                            <div className="pagination job-pagination mb-0 justify-content-center">
                              <li
                                className={`page-item ${currentPage === 1 ? "disabled" : ""
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
                                className={`page-item ${currentPage === totalPages ? "disabled" : ""
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

export default ReportList;

import React, { useState, useEffect } from "react";
import { Col, Row, Container } from "reactstrap";
import { Link } from "react-router-dom";
import companyServices from "../../services/company.services";
import { Input, Space, Layout, Badge, Modal } from "antd";
import SiderBarWeb from "./SlideBar/SiderBarWeb";
import { useNavigate, useLocation } from "react-router-dom";
import userAuthorization from "../../utils/userAuthorization";
import img0 from "../../assets/images/user/img-00.jpg";
import { faLadderWater } from "@fortawesome/free-solid-svg-icons";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import NavBarWeb from "./NavBar/NavBarWeb";
import SiderBarWebStaff from "./SlideBar/SiderBarWebStaff";
import NavBarWebStaff from "./NavBar/NavBarWebStaff";
const { Header, Footer, Content } = Layout;

const CompanyListPartner = () => {
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

  const [listCompany, setListCompany] = useState([]);

  let [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  //------------------------------------------------------------------------------
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
  //------------------------------------------------------------------------------
  const fetchGetCompanyAndPaging = async () => {
    let response;
    try {
      response = await companyServices.getCompanyAndPaging(currentPage, 7);

      console.log(response.data.data);
      console.log(response.data.paging.total);

      setListCompany(response.data.data);
      setTotalPages(Math.ceil(response.data.paging.total / pageSize));
    } catch (error) {
      console.error("Error fetching list company:", error);
    }
  };

  useEffect(() => {
    fetchGetCompanyAndPaging();
  }, [currentPage]);

  //--------------------------------------------------------------------------------
  const [showPopup, setShowPopup] = useState(false);

  //--------------------------------------------------------------------------------
  const midleSelect = (id) => {
    fetchGetCompanyByCompanyId(id);
    setShowPopup(true);
  };
  //--------------------------------------------------------------------------------
  //Search
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  //--------------------------------------------------------------------------------
  const [selectCompanyDetail, setSelectcompanyDetail] = useState({});

  const fetchGetCompanyByCompanyId = async (id) => {
    let response;
    try {
      response = await companyServices.getCompanyByCompanyId(id);
      console.log("Company Detail");
      console.log(response.data.data);
      setSelectcompanyDetail(response.data.data);
    } catch (error) {
      console.error("Error fetching company by id:", error);
    }
  };
  //--------------------------------------------------------------------------------
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <React.Fragment>
      <Layout style={{ minHeight: "100vh" }}>
        <SiderBarWebStaff choose={"menu-key/1"}></SiderBarWebStaff>
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
          <NavBarWebStaff></NavBarWebStaff>

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
                      <div className="d-flex justify-content-between">
                        <h4>Company Partner List</h4>
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
                      {/* ---------------------------------------------------------------- */}

                      <Modal
                        centered
                        open={showPopup}
                        onOk={() => setShowPopup(false)}
                        onCancel={() => setShowPopup(false)}
                        width={1000}
                        footer={null}
                        style={{ padding: "10px" }}
                      >
                        <div>
                          <Row
                            className="p-1"
                            style={{
                              minHeight: "250px",
                            }}
                          >
                            <Col lg={12} className="px-0">
                              <div className="d-flex justify-content-center align-items-center flex-column gap-5 p-3">
                                <div>
                                  <div className="d-flex justify-content-center">
                                    <img
                                      style={{
                                        width: "100px",
                                        height: "100px",
                                      }}
                                      src={selectCompanyDetail.companyImage}
                                      alt=""
                                      className="img-fluid rounded-circle img-avt-hiring-request border border-3"
                                    />
                                  </div>

                                  <div
                                    className="mt-2 d-flex justify-content-center p-2 fs-20 "
                                    style={{
                                      fontWeight: "500",
                                    }}
                                  >
                                    {selectCompanyDetail.companyName}
                                  </div>
                                </div>

                                <div
                                  className="d-flex justify-content-around mb-2"
                                  style={{ width: "100%" }}
                                >
                                  <div style={{ width: "30%" }}>
                                    <p className="mb-0 text-muted">Email</p>
                                    <div
                                      style={{
                                        borderRadius: "8px",
                                        backgroundColor: "#EFF0F2",
                                      }}
                                      className="d-flex align-items-center p-2 border border-2"
                                    >
                                      <span style={{ fontWeight: "500" }}>
                                        {selectCompanyDetail.companyEmail}
                                      </span>
                                    </div>
                                  </div>

                                  <div style={{ width: "30%" }}>
                                    <p className="mb-0 text-muted">Phone</p>
                                    <div
                                      style={{
                                        borderRadius: "8px",
                                        backgroundColor: "#EFF0F2",
                                      }}
                                      className="p-2 border border-2"
                                    >
                                      <span style={{ fontWeight: "500" }}>
                                        {selectCompanyDetail.phoneNumber}
                                      </span>
                                    </div>
                                  </div>

                                  <div style={{ width: "30%" }}>
                                    <p className="mb-0 text-muted">Address</p>
                                    <div
                                      style={{
                                        borderRadius: "8px",
                                        backgroundColor: "#EFF0F2",
                                      }}
                                      className="p-2 border border-2"
                                    >
                                      <span style={{ fontWeight: "500" }}>
                                        {selectCompanyDetail.address}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          </Row>
                          <div className="border border-1 mt-1 mb-3"></div>
                          <Row style={{ minHeight: "250px" }} className="p-3">
                            <Col lg={12}>
                              <div className="d-flex gap-5">
                                <div
                                  className="d-flex flex-column gap-4"
                                  style={{ width: "50%" }}
                                >
                                  <div>
                                    <p className="mb-0 text-muted">Country</p>
                                    <div
                                      className="p-2 border border-2"
                                      style={{
                                        borderRadius: "8px",
                                        backgroundColor: "#EFF0F2",
                                      }}
                                    >
                                      <span style={{ fontWeight: "500" }}>
                                        {selectCompanyDetail.country}
                                      </span>
                                    </div>
                                  </div>

                                  <div>
                                    <p className="mb-0 text-muted">Rating</p>
                                    <div
                                      className="p-2 border border-2"
                                      style={{
                                        borderRadius: "8px",
                                        backgroundColor: "#EFF0F2",
                                      }}
                                    >
                                      <span style={{ fontWeight: "500" }}>
                                        {selectCompanyDetail.rating}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  style={{ width: "50%" }}
                                  className="d-flex flex-column gap-4"
                                >
                                  <div>
                                    <p className="mb-0 text-muted">HR Name</p>
                                    <div
                                      className="p-2 border border-2"
                                      style={{
                                        borderRadius: "8px",
                                        backgroundColor: "#EFF0F2",
                                      }}
                                    >
                                      <span style={{ fontWeight: "500" }}>
                                        {selectCompanyDetail.hrFullName}
                                      </span>
                                    </div>
                                  </div>

                                  <div>
                                    <p className="mb-0 text-muted">Status</p>
                                    <div
                                      className="p-2 border border-2"
                                      style={{
                                        borderRadius: "8px",
                                        backgroundColor: "#EFF0F2",
                                      }}
                                    >
                                      <span style={{ fontWeight: "500" }}>
                                        {selectCompanyDetail.statusString}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Modal>

                      {/* ---------------------------------------------------------------- */}

                      <div>
                        {listCompany.map((listCompanyNew, key) => (
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
                                        src={listCompanyNew.companyImage}
                                        alt=""
                                        className="img-fluid rounded-3 img-avt-hiring-request"
                                      />
                                    </Link>
                                  </div>
                                </Col>

                                <Col md={2}>
                                  <div style={{ cursor: "pointer" }}>
                                    <h5 className="fs-18 mb-0">
                                      <Link
                                        to="/listcompanyPartnerdetail"
                                        className="text-dark"
                                        state={{
                                          companyId: listCompanyNew.companyId,
                                        }}
                                      >
                                        {listCompanyNew.companyName}
                                      </Link>
                                    </h5>
                                    <p className="text-muted fs-14 mb-0">
                                      {" "}
                                      {listCompanyNew.companyEmail}
                                    </p>
                                  </div>
                                </Col>

                                <Col md={2}>
                                  <div className="d-flex mb-0 align-items-center">
                                    <div className="flex-shrink-0">
                                      <i
                                        className="uil uil-map-marker text-primary me-1"
                                        style={{ fontSize: "19px" }}
                                      ></i>
                                    </div>
                                    <p className="text-muted mb-0">
                                      {listCompanyNew.address}{" "}
                                      {listCompanyNew.country}
                                    </p>
                                  </div>
                                </Col>

                                <Col md={2}>
                                  <div className="d-flex mb-0 align-items-center justify-content-center">
                                    <div className="flex-shrink-0">
                                      <i
                                        className="uil uil-user-check text-primary me-1"
                                        style={{ fontSize: "19px" }}
                                      ></i>
                                    </div>
                                    <p className="text-muted mb-0">
                                      {listCompanyNew.hrFullName}
                                    </p>
                                  </div>
                                </Col>

                                <Col md={2}>
                                  <div className="d-flex mb-0 align-items-center justify-content-center">
                                    <div className="flex-shrink-0">
                                      <i
                                        className="uil uil-arrow-growth text-primary me-1"
                                        style={{ fontSize: "19px" }}
                                      ></i>
                                    </div>
                                    <p className="text-muted mb-0">
                                      {listCompanyNew.rating}
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
                                        listCompanyNew.statusString ===
                                          "Waiting Approval"
                                          ? "badge bg-warning text-light fs-12"
                                          : listCompanyNew.statusString ===
                                            "In Progress"
                                            ? "badge bg-blue text-light fs-12"
                                            : listCompanyNew.statusString ===
                                              "Rejected"
                                              ? "badge bg-danger text-light fs-12"
                                              : listCompanyNew.statusString ===
                                                "Expired"
                                                ? "badge bg-danger text-light fs-12"
                                                : listCompanyNew.statusString ===
                                                  "Cancelled"
                                                  ? "badge bg-danger text-light fs-12"
                                                  : listCompanyNew.statusString ===
                                                    "Finished"
                                                    ? "badge bg-primary text-light fs-12"
                                                    : listCompanyNew.statusString ===
                                                      "Completed"
                                                      ? "badge bg-primary text-light fs-12"
                                                      : listCompanyNew.statusString ===
                                                        "Active"
                                                        ? "badge bg-info text-light fs-12"
                                                        : ""
                                      }
                                    >
                                      {listCompanyNew.statusString}
                                    </span>
                                  </div>
                                </Col>
                              </Row>
                            </div>
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

export default CompanyListPartner;

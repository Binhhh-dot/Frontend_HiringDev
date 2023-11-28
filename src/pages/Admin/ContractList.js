import React, { useEffect, useState } from "react";
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
import classnames from "classnames";
import { Link } from "react-router-dom";
import contractServices from "../../services/contract.services";
import { Input, Space, Layout, Badge } from "antd";
import SiderBarWeb from "./SlideBar/SiderBarWeb";
import userAuthorization from "../../utils/userAuthorization";
import { useNavigate, useLocation } from "react-router-dom";
import img0 from "../../assets/images/user/img-00.jpg";
const { Header, Footer, Content } = Layout;

const ContractList = () => {
  //------------------------------------------------------------------------
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

  const [activeTab, setActiveTab] = useState("1");
  const tabChange = (tab) => {
    if (activeTab) {
      if (activeTab !== tab) setActiveTab(tab);
    }
  };
  //------------------------------------------------------------------------
  const [contractListAll, setContractListAll] = useState([]);
  const [contractListPending, setContractListPending] = useState([]);
  const [contractListSigned, setContractListSigned] = useState([]);
  const [contractListFailed, setContractListFailed] = useState([]);

  //------------------------------------------------------------------------
  let [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 7;
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const fetchGetContractList = async () => {
    let response;
    try {
      response = await contractServices.getContractAndPaging(currentPage, 7);
      console.log(response.data.data);
      setContractListAll(response.data.data);
      setTotalPages(Math.ceil(response.data.paging.total / pageSize));
    } catch (error) {
      console.error("Error fetching caontract list:", error);
    }
  };

  //------------------------------------------------------------------------
  let [currentPagePending, setCurrentPagePending] = useState(1);
  const [totalPagesPending, setTotalPagesPending] = useState(1);
  const pageSizePending = 7;
  const handlePageClickPending = (page) => {
    setCurrentPagePending(page);
  };

  const fetchGetContractListPending = async () => {
    let response;
    let tmp;
    try {
      response = await contractServices.getContractAndPaging(
        currentPagePending,
        7
      );
      console.log(response.data.data);
      tmp = response.data.data.filter(
        (developer) => developer.statusString == "Pending"
      );
      setContractListPending(tmp);
      setTotalPagesPending(Math.ceil(tmp.length / pageSizePending));
    } catch (error) {
      console.error("Error fetching contract pending list :", error);
    }
  };

  //------------------------------------------------------------------------
  let [currentPageSigned, setCurrentPageSigned] = useState(1);
  const [totalPagesSigned, setTotalPagesSigned] = useState(1);
  const pageSizeSigned = 7;
  const handlePageClickSigned = (page) => {
    setCurrentPageSigned(page);
  };

  const fetchGetContractListSigned = async () => {
    let response;
    let tmp;
    try {
      response = await contractServices.getContractAndPaging(
        currentPageSigned,
        7
      );
      console.log(response.data.data);
      tmp = response.data.data.filter(
        (developer) => developer.statusString == "Signed"
      );
      setContractListSigned(tmp);
      setTotalPagesSigned(Math.ceil(tmp.length / pageSizeSigned));
    } catch (error) {
      console.error("Error fetching conttract sign list :", error);
    }
  };

  //------------------------------------------------------------------------
  let [currentPageFailed, setCurrentPageFailed] = useState(1);
  const [totalPagesFailed, setTotalPagesFailed] = useState(1);
  const pageSizeFailed = 7;
  const handlePageClickFailed = (page) => {
    setCurrentPageFailed(page);
  };

  const fetchGetContractListFailed = async () => {
    let response;
    let tmp;
    try {
      response = await contractServices.getContractAndPaging(
        currentPageFailed,
        7
      );
      console.log(response.data.data);
      tmp = response.data.data.filter(
        (developer) => developer.statusString == "Failed"
      );
      setContractListFailed(tmp);
      setTotalPagesFailed(Math.ceil(tmp.length / pageSizeFailed));
    } catch (error) {
      console.error("Error fetching conttract sign list :", error);
    }
  };

  //------------------------------------------------------------------------

  //------------------------------------------------------------------------
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
  //------------------------------------------------------------------------
  const renderPageNumbersSigned = () => {
    const pageNumbers = [];
    const maxPageButtons = 4;
    let startPage = Math.max(
      1,
      currentPageSigned - Math.floor(maxPageButtons / 2)
    );
    let endPage = Math.min(totalPagesSigned, startPage + maxPageButtons - 1);
    if (
      totalPagesSigned > maxPageButtons &&
      currentPageSigned <= Math.floor(maxPageButtons / 2) + 1
    ) {
      endPage = maxPageButtons;
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${i === currentPageSigned ? "active" : ""}`}
        >
          <Link
            className="page-link"
            to="#"
            onClick={() => handlePageClickSigned(i)}
          >
            {i}
          </Link>
        </li>
      );
    }
    return pageNumbers;
  };

  const handleNextPageSigned = () => {
    if (currentPageSigned < totalPagesSigned) {
      setCurrentPageSigned(currentPageSigned + 1);
    }
  };

  const handlePrevPageSigned = () => {
    if (currentPageSigned > 1) {
      setCurrentPageSigned(currentPageSigned - 1);
    }
  };
  //------------------------------------------------------------------------
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
  //Search
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  //------------------------------------------------------------------------
  useEffect(() => {
    fetchGetContractList();
  }, [currentPage]);

  useEffect(() => {
    fetchGetContractListPending();
  }, [currentPagePending]);

  useEffect(() => {
    fetchGetContractListSigned();
  }, [currentPageSigned]);

  useEffect(() => {
    fetchGetContractListFailed();
  }, [currentPageFailed]);
  //------------------------------------------------------------------------
  return (
    <React.Fragment>
      <Layout style={{ minHeight: "100vh" }}>
        <SiderBarWeb choose={"menu-key/14"}></SiderBarWeb>
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
                <Link>
                  <img
                    src={img0}
                    className="ms-1"
                    style={{
                      borderRadius: "10px",
                      height: "50px",
                    }}
                  />
                </Link>
                <div className="me-1 d-flex flex-column align-items-center">
                  <span className="fs-18">Nik jone</span>
                  <span>Available</span>
                </div>
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
                      <div>
                        <div className="mb-2">
                          <h4 className="mb-0">Contract List</h4>
                        </div>

                        <div>
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
                                  Signed
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
                                {contractListAll.map(
                                  (contractListAllNew, key) => (
                                    <div
                                      key={key}
                                      className="job-box-dev-in-list-hiringRequest-for-dev card mt-3"
                                      style={{
                                        boxShadow:
                                          "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                                      }}
                                    >
                                      <CardBody className="p-2">
                                        <Row className="align-items-center ">
                                          <Col md={1}>
                                            <div className="d-flex justify-content-center">
                                              <i
                                                className="uil uil-file-plus-alt"
                                                style={{ fontSize: "50px" }}
                                              ></i>
                                            </div>
                                          </Col>

                                          <Col md={3}>
                                            <div>
                                              <h5 className="fs-18 mb-0">
                                                <Link
                                                  to="/contractdetail"
                                                  className="text-dark"
                                                  state={{
                                                    contractId:
                                                      contractListAllNew.contractId,
                                                  }}
                                                >
                                                  {
                                                    contractListAllNew.contractCode
                                                  }
                                                </Link>
                                              </h5>
                                              <p className="text-muted fs-14 mb-0">
                                                {
                                                  contractListAllNew.companyPartnerName
                                                }
                                              </p>
                                            </div>
                                          </Col>

                                          <Col md={2}>
                                            <div className="d-flex flex-column gap-1 justify-content-center">
                                              <div>
                                                <p className="text-muted mb-0 fs-13">
                                                  Create at
                                                </p>
                                                <p
                                                  className="mb-0 fs-17"
                                                  style={{ fontWeight: "600" }}
                                                >
                                                  {contractListAllNew.createdAt}
                                                </p>
                                              </div>
                                              <div>
                                                <p className="text-muted mb-0 fs-13">
                                                  Human resource
                                                </p>
                                                <p
                                                  className="mb-0 fs-17"
                                                  style={{ fontWeight: "600" }}
                                                >
                                                  {
                                                    contractListAllNew.humanResourceName
                                                  }
                                                </p>
                                              </div>
                                            </div>
                                          </Col>

                                          <Col md={2}>
                                            <div className="d-flex mb-0 align-items-center">
                                              <div className="flex-shrink-0">
                                                <i
                                                  className="uil uil-user-check text-primary me-1"
                                                  style={{ fontSize: "19px" }}
                                                ></i>
                                              </div>
                                              <p className="text-muted mb-0">
                                                {
                                                  contractListAllNew.developerName
                                                }
                                              </p>
                                            </div>
                                          </Col>

                                          <Col
                                            md={2}
                                            className="d-flex justify-content-center"
                                          >
                                            <div>
                                              <p className="text-muted mb-0 fs-13">
                                                Date signed
                                              </p>
                                              <p
                                                className="mb-0 fs-17"
                                                style={{ fontWeight: "600" }}
                                              >
                                                {contractListAllNew.dateSigned}
                                              </p>
                                            </div>
                                          </Col>

                                          <Col
                                            md={2}
                                            className="d-flex justify-content-center"
                                          >
                                            <div className="d-flex align-items-center">
                                              <span
                                                className={
                                                  contractListAllNew.statusString ===
                                                  "Pending"
                                                    ? "badge bg-warning text-light fs-12"
                                                    : contractListAllNew.statusString ===
                                                      "Signed"
                                                    ? "badge bg-success text-light fs-12"
                                                    : contractListAllNew.statusString ===
                                                      "Failed"
                                                    ? "badge bg-danger text-light fs-12"
                                                    : ""
                                                }
                                              >
                                                {
                                                  contractListAllNew.statusString
                                                }
                                              </span>
                                            </div>
                                          </Col>
                                        </Row>
                                      </CardBody>
                                    </div>
                                  )
                                )}

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
                                {contractListPending.map(
                                  (contractListAllNew, key) => (
                                    <div
                                      key={key}
                                      className="job-box-dev-in-list-hiringRequest-for-dev card mt-3"
                                      style={{
                                        boxShadow:
                                          "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                                      }}
                                    >
                                      <CardBody className="p-2">
                                        <Row className="align-items-center ">
                                          <Col md={1}>
                                            <div>
                                              <Link to="#">
                                                <img
                                                  style={{
                                                    width: "80px",
                                                    height: "80px",
                                                  }}
                                                  src={
                                                    contractListAllNew.companyImage
                                                  }
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
                                                  to="/contractdetail"
                                                  className="text-dark"
                                                  state={{
                                                    contractId:
                                                      contractListAllNew.contractId,
                                                  }}
                                                >
                                                  {
                                                    contractListAllNew.contractCode
                                                  }
                                                </Link>
                                              </h5>
                                              <p className="text-muted fs-14 mb-0">
                                                {
                                                  contractListAllNew.companyPartnerName
                                                }
                                              </p>
                                            </div>
                                          </Col>

                                          <Col md={2}>
                                            <div className="d-flex flex-column gap-1 justify-content-center">
                                              <div>
                                                <p className="text-muted mb-0 fs-11">
                                                  Create at
                                                </p>
                                                <p
                                                  className="mb-0 fs-17"
                                                  style={{ fontWeight: "600" }}
                                                >
                                                  {contractListAllNew.createdAt}
                                                </p>
                                              </div>
                                              <div>
                                                <p className="text-muted mb-0 fs-11">
                                                  Human resource
                                                </p>
                                                <p
                                                  className="mb-0 fs-17"
                                                  style={{ fontWeight: "600" }}
                                                >
                                                  {
                                                    contractListAllNew.humanResourceName
                                                  }
                                                </p>
                                              </div>
                                            </div>
                                          </Col>

                                          <Col md={2}>
                                            <div className="d-flex mb-0 align-items-center">
                                              <div className="flex-shrink-0">
                                                <i
                                                  className="uil uil-user-check text-primary me-1"
                                                  style={{ fontSize: "19px" }}
                                                ></i>
                                              </div>
                                              <p className="text-muted mb-0">
                                                {
                                                  contractListAllNew.developerName
                                                }
                                              </p>
                                            </div>
                                          </Col>

                                          <Col
                                            md={2}
                                            className="d-flex justify-content-center"
                                          >
                                            <div>
                                              <p className="text-muted mb-0 fs-11">
                                                Date signed
                                              </p>
                                              <p
                                                className="mb-0 fs-17"
                                                style={{ fontWeight: "600" }}
                                              >
                                                {contractListAllNew.dateSigned}
                                              </p>
                                            </div>
                                          </Col>

                                          <Col
                                            md={2}
                                            className="d-flex justify-content-center"
                                          >
                                            <div className="d-flex align-items-center">
                                              <span
                                                className={
                                                  contractListAllNew.statusString ===
                                                  "Pending"
                                                    ? "badge bg-warning text-light fs-12"
                                                    : contractListAllNew.statusString ===
                                                      "Signed"
                                                    ? "badge bg-success text-light fs-12"
                                                    : contractListAllNew.statusString ===
                                                      "Failed"
                                                    ? "badge bg-danger text-light fs-12"
                                                    : ""
                                                }
                                              >
                                                {
                                                  contractListAllNew.statusString
                                                }
                                              </span>
                                            </div>
                                          </Col>
                                        </Row>
                                      </CardBody>
                                    </div>
                                  )
                                )}

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
                              </TabPane>
                              <TabPane tabId="3">
                                {contractListSigned.map(
                                  (contractListAllNew, key) => (
                                    <div
                                      key={key}
                                      className="job-box-dev-in-list-hiringRequest-for-dev card mt-3"
                                      style={{
                                        boxShadow:
                                          "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                                      }}
                                    >
                                      <CardBody className="p-2">
                                        <Row className="align-items-center ">
                                          <Col md={1}>
                                            <div>
                                              <Link to="#">
                                                <img
                                                  style={{
                                                    width: "80px",
                                                    height: "80px",
                                                  }}
                                                  src={
                                                    contractListAllNew.companyImage
                                                  }
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
                                                  to="/contractdetail"
                                                  className="text-dark"
                                                  state={{
                                                    contractId:
                                                      contractListAllNew.contractId,
                                                  }}
                                                >
                                                  {
                                                    contractListAllNew.contractCode
                                                  }
                                                </Link>
                                              </h5>
                                              <p className="text-muted fs-14 mb-0">
                                                {
                                                  contractListAllNew.companyPartnerName
                                                }
                                              </p>
                                            </div>
                                          </Col>

                                          <Col md={2}>
                                            <div className="d-flex flex-column gap-1 justify-content-center">
                                              <div>
                                                <p className="text-muted mb-0 fs-11">
                                                  Create at
                                                </p>
                                                <p
                                                  className="mb-0 fs-17"
                                                  style={{ fontWeight: "600" }}
                                                >
                                                  {contractListAllNew.createdAt}
                                                </p>
                                              </div>
                                              <div>
                                                <p className="text-muted mb-0 fs-11">
                                                  Human resource
                                                </p>
                                                <p
                                                  className="mb-0 fs-17"
                                                  style={{ fontWeight: "600" }}
                                                >
                                                  {
                                                    contractListAllNew.humanResourceName
                                                  }
                                                </p>
                                              </div>
                                            </div>
                                          </Col>

                                          <Col md={2}>
                                            <div className="d-flex mb-0 align-items-center">
                                              <div className="flex-shrink-0">
                                                <i
                                                  className="uil uil-user-check text-primary me-1"
                                                  style={{ fontSize: "19px" }}
                                                ></i>
                                              </div>
                                              <p className="text-muted mb-0">
                                                {
                                                  contractListAllNew.developerName
                                                }
                                              </p>
                                            </div>
                                          </Col>

                                          <Col
                                            md={2}
                                            className="d-flex justify-content-center"
                                          >
                                            <div>
                                              <p className="text-muted mb-0 fs-11">
                                                Date signed
                                              </p>
                                              <p
                                                className="mb-0 fs-17"
                                                style={{ fontWeight: "600" }}
                                              >
                                                {contractListAllNew.dateSigned}
                                              </p>
                                            </div>
                                          </Col>

                                          <Col
                                            md={2}
                                            className="d-flex justify-content-center"
                                          >
                                            <div className="d-flex align-items-center">
                                              <span
                                                className={
                                                  contractListAllNew.statusString ===
                                                  "Pending"
                                                    ? "badge bg-warning text-light fs-12"
                                                    : contractListAllNew.statusString ===
                                                      "Signed"
                                                    ? "badge bg-success text-light fs-12"
                                                    : contractListAllNew.statusString ===
                                                      "Failed"
                                                    ? "badge bg-danger text-light fs-12"
                                                    : ""
                                                }
                                              >
                                                {
                                                  contractListAllNew.statusString
                                                }
                                              </span>
                                            </div>
                                          </Col>
                                        </Row>
                                      </CardBody>
                                    </div>
                                  )
                                )}

                                {/* phan trang */}
                                <Row>
                                  <Col lg={12} className="mt-4 pt-2">
                                    <nav aria-label="Page navigation example">
                                      <div className="pagination job-pagination mb-0 justify-content-center">
                                        <li
                                          className={`page-item ${
                                            currentPageSigned === 1
                                              ? "disabled"
                                              : ""
                                          }`}
                                        >
                                          <Link
                                            className="page-link"
                                            to="#"
                                            tabIndex="-1"
                                            onClick={handlePrevPageSigned}
                                          >
                                            <i className="mdi mdi-chevron-double-left fs-15"></i>
                                          </Link>
                                        </li>
                                        {renderPageNumbersSigned()}
                                        <li
                                          className={`page-item ${
                                            currentPageSigned ===
                                            totalPagesSigned
                                              ? "disabled"
                                              : ""
                                          }`}
                                        >
                                          <Link
                                            className="page-link"
                                            to="#"
                                            onClick={handleNextPageSigned}
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
                                {contractListFailed.map(
                                  (contractListAllNew, key) => (
                                    <div
                                      key={key}
                                      className="job-box-dev-in-list-hiringRequest-for-dev card mt-3"
                                      style={{
                                        boxShadow:
                                          "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                                      }}
                                    >
                                      <CardBody className="p-2">
                                        <Row className="align-items-center ">
                                          <Col md={1}>
                                            <div>
                                              <Link to="#">
                                                <img
                                                  style={{
                                                    width: "80px",
                                                    height: "80px",
                                                  }}
                                                  src={
                                                    contractListAllNew.companyImage
                                                  }
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
                                                  to="/contractdetail"
                                                  className="text-dark"
                                                  state={{
                                                    contractId:
                                                      contractListAllNew.contractId,
                                                  }}
                                                >
                                                  {
                                                    contractListAllNew.contractCode
                                                  }
                                                </Link>
                                              </h5>
                                              <p className="text-muted fs-14 mb-0">
                                                {
                                                  contractListAllNew.companyPartnerName
                                                }
                                              </p>
                                            </div>
                                          </Col>

                                          <Col md={2}>
                                            <div className="d-flex flex-column gap-1 justify-content-center">
                                              <div>
                                                <p className="text-muted mb-0 fs-11">
                                                  Create at
                                                </p>
                                                <p
                                                  className="mb-0 fs-17"
                                                  style={{ fontWeight: "600" }}
                                                >
                                                  {contractListAllNew.createdAt}
                                                </p>
                                              </div>
                                              <div>
                                                <p className="text-muted mb-0 fs-11">
                                                  Human resource
                                                </p>
                                                <p
                                                  className="mb-0 fs-17"
                                                  style={{ fontWeight: "600" }}
                                                >
                                                  {
                                                    contractListAllNew.humanResourceName
                                                  }
                                                </p>
                                              </div>
                                            </div>
                                          </Col>

                                          <Col md={2}>
                                            <div className="d-flex mb-0 align-items-center">
                                              <div className="flex-shrink-0">
                                                <i
                                                  className="uil uil-user-check text-primary me-1"
                                                  style={{ fontSize: "19px" }}
                                                ></i>
                                              </div>
                                              <p className="text-muted mb-0">
                                                {
                                                  contractListAllNew.developerName
                                                }
                                              </p>
                                            </div>
                                          </Col>

                                          <Col
                                            md={2}
                                            className="d-flex justify-content-center"
                                          >
                                            <div>
                                              <p className="text-muted mb-0 fs-11">
                                                Date signed
                                              </p>
                                              <p
                                                className="mb-0 fs-17"
                                                style={{ fontWeight: "600" }}
                                              >
                                                {contractListAllNew.dateSigned}
                                              </p>
                                            </div>
                                          </Col>

                                          <Col
                                            md={2}
                                            className="d-flex justify-content-center"
                                          >
                                            <div className="d-flex align-items-center">
                                              <span
                                                className={
                                                  contractListAllNew.statusString ===
                                                  "Pending"
                                                    ? "badge bg-warning text-light fs-12"
                                                    : contractListAllNew.statusString ===
                                                      "Signed"
                                                    ? "badge bg-success text-light fs-12"
                                                    : contractListAllNew.statusString ===
                                                      "Failed"
                                                    ? "badge bg-danger text-light fs-12"
                                                    : ""
                                                }
                                              >
                                                {
                                                  contractListAllNew.statusString
                                                }
                                              </span>
                                            </div>
                                          </Col>
                                        </Row>
                                      </CardBody>
                                    </div>
                                  )
                                )}

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
                              </TabPane>
                            </TabContent>
                          </CardBody>
                        </div>
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

export default ContractList;

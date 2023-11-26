import React, { useState, useEffect } from "react";
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import companyServices from "../../services/company.services";
import { Input, Space, Layout } from "antd";
import SiderBarWeb from "./SlideBar/SiderBarWeb";

const CompanyListPartner = () => {
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
  //Search
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  //--------------------------------------------------------------------------------

  return (
    <React.Fragment>
      <Layout style={{ minHeight: "100vh" }}>
        <SiderBarWeb></SiderBarWeb>
        <Layout>
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
                        <Link to="/companydetails">
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
                      <div>
                        <h5 className="fs-18 mb-0">
                          <Link
                            to="/newhiringrequestdetail"
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
                          {listCompanyNew.address} {listCompanyNew.country}
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

                    <Col md={2} className="d-flex justify-content-around">
                      <div className="d-flex align-items-center">
                        <span
                          className={
                            listCompanyNew.statusString === "Waiting Approval"
                              ? "badge bg-warning text-light fs-12"
                              : listCompanyNew.statusString === "In Progress"
                              ? "badge bg-blue text-light fs-12"
                              : listCompanyNew.statusString === "Rejected"
                              ? "badge bg-danger text-light fs-12"
                              : listCompanyNew.statusString === "Expired"
                              ? "badge bg-danger text-light fs-12"
                              : listCompanyNew.statusString === "Cancelled"
                              ? "badge bg-danger text-light fs-12"
                              : listCompanyNew.statusString === "Finished"
                              ? "badge bg-primary text-light fs-12"
                              : listCompanyNew.statusString === "Completed"
                              ? "badge bg-primary text-light fs-12"
                              : listCompanyNew.statusString === "Active"
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
                    <Link className="page-link" to="#" onClick={handleNextPage}>
                      <i className="mdi mdi-chevron-double-right fs-15"></i>
                    </Link>
                  </li>
                </div>
              </nav>
            </Col>
          </Row>
        </Layout>
      </Layout>
    </React.Fragment>
  );
};

export default CompanyListPartner;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Col,
  Row,
  // Input,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";
import { Input } from "antd";

import JobType from "../Home/SubSection/JobType";
import { Dropdown, Form } from "react-bootstrap";
// import hiringrequestService from "../../../services/hiringrequest.service";
import hiringrequestService from "../../services/hiringrequest.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import jobImage1 from "../../assets/images/featured-job/img-01.png";

const JobVacancyList = (a) => {
  //Apply Now Model
  const [jobVacancyList, setJobVacancyList] = useState([]);

  let [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

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

      setJobVacancyList(response.data.data);
      setTotalPages(Math.ceil(response.data.paging.total / pageSize));
    } catch (error) {
      console.error("Error fetching job vacancies:", error);
    }
  };

  useEffect(() => {
    fetchJobVacancies();
  }, [currentPage]);

  const onSearch = () => {
    fetchJobVacancies();
  };

  //--------------------------------------------------------------------------------------------

  return (
    <React.Fragment>
      <h4>Hiring Request List</h4>
      {/* <div style={{ width: "20%" }} className="mt-3 mb-3">
        <Input placeholder="Search" style={{ height: "40px" }} />
      </div> */}

      <div>
        {jobVacancyList.map((jobVacancyListDetail, key) => (
          <div
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
            }}
            key={key}
            className={"job-box-dev-in-list-hiringRequest-for-dev mt-3 card"}
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
                          hiringRequestId: jobVacancyListDetail.requestId,
                          companyId: jobVacancyListDetail.companyId,
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

                <Col md={2} className="d-flex justify-content-around">
                  <div className="d-flex align-items-center">
                    <span
                      className={
                        jobVacancyListDetail.statusString === "Waiting Approval"
                          ? "badge bg-warning text-light fs-12"
                          : jobVacancyListDetail.statusString === "In Progress"
                          ? "badge bg-blue text-light fs-12"
                          : jobVacancyListDetail.statusString === "Rejected"
                          ? "badge bg-danger text-light fs-12"
                          : jobVacancyListDetail.statusString === "Expired"
                          ? "badge bg-danger text-light fs-12"
                          : jobVacancyListDetail.statusString === "Cancelled"
                          ? "badge bg-danger text-light fs-12"
                          : jobVacancyListDetail.statusString === "Finished"
                          ? "badge bg-primary text-light fs-12"
                          : jobVacancyListDetail.statusString === "Completed"
                          ? "badge bg-primary text-light fs-12"
                          : jobVacancyListDetail.statusString === "Saved"
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

      <Row>
        <Col lg={12} className="mt-4 pt-2">
          <nav aria-label="Page navigation example">
            <div className="pagination job-pagination mb-0 justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
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
    </React.Fragment>
  );
};

export default JobVacancyList;

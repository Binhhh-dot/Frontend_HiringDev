import React, { useEffect, useState } from "react";
import jobImage1 from "../../assets/images/featured-job/img-01.png";
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { Layout, Menu, Input, Button } from "antd";
import projectServices from "../../services/project.services";
// const { Search } = Input;

const ProjectList = () => {
  const [projectList, setProjectList] = useState([]);
  //------------------------------------------------------------------------------------------------
  let [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 7;
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  //------------------------------------------------------------------------------------------------
  const fetchGetProjectListPaging = async () => {
    let response;
    try {
      response = await projectServices.getProjectListPaging(currentPage, 7);
      console.log(response.data);
      setProjectList(response.data.data);
      setTotalPages(Math.ceil(response.data.paging.total / pageSize));
    } catch (error) {
      console.error("Error fetching project list paging", error);
    }
  };
  //------------------------------------------------------------------------------------------------
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
  //------------------------------------------------------------------------------------------------
  useEffect(() => {
    fetchGetProjectListPaging();
  }, []);
  //------------------------------------------------------------------------------------------------
  return (
    <React.Fragment>
      <h4>Project List</h4>
      <div style={{ width: "20%" }} className="mt-3 mb-3">
        <Input placeholder="Search" style={{ height: "40px" }} />
      </div>

      <div>
        {projectList.map((projectListDetail, key) => (
          <div
            key={key}
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
            }}
            className={"job-box-dev-in-list-hiringRequest-for-dev mt-3 card"}
          >
            <div className="p-2">
              <Row className="align-items-center">
                <Col md={3}>
                  <div>
                    <h5 className="fs-18 mb-0">
                      <Link
                        to="/projectdetail"
                        className="text-dark"
                        state={{
                          projectId: projectListDetail.projectId,
                        }}
                      >
                        {projectListDetail.projectName}
                      </Link>
                    </h5>
                    <p className="text-muted fs-14 mb-0">
                      {projectListDetail.companyName}
                    </p>
                  </div>
                </Col>

                <Col md={2}>
                  <div className="d-flex align-items-center mb-0">
                    <div className="flex-shrink-0">
                      <i
                        className="uil uil-user-check text-primary me-1"
                        style={{ fontSize: "17px" }}
                      ></i>
                    </div>
                    <p className="text-muted mb-0">
                      {projectListDetail.numberOfDev}
                    </p>
                  </div>
                </Col>

                <Col md={3}>
                  <div className="d-flex mb-0 align-items-center">
                    <div className="flex-shrink-0">
                      <i
                        className="uil uil-clock-three text-primary me-1"
                        style={{ fontSize: "17px" }}
                      ></i>
                    </div>
                    <p className="text-muted mb-0">
                      {" "}
                      {projectListDetail.startDate} -{" "}
                      {projectListDetail.endDate}
                    </p>
                  </div>
                </Col>

                <Col md={2} className="d-flex justify-content-around">
                  <div className="d-flex align-items-center">
                    <span
                      className={
                        projectListDetail.statusString === "waitingApproval"
                          ? "badge bg-warning text-light fs-12"
                          : projectListDetail.statusString === "Preparing"
                          ? "badge bg-blue text-light fs-12"
                          : projectListDetail.statusString === "rejected"
                          ? "badge bg-danger text-light fs-12"
                          : projectListDetail.statusString === "expired"
                          ? "badge bg-danger text-light fs-12"
                          : projectListDetail.statusString === "cancelled"
                          ? "badge bg-danger text-light fs-12"
                          : projectListDetail.statusString === "finished"
                          ? "badge bg-primary text-light fs-12"
                          : projectListDetail.statusString === "completed"
                          ? "badge bg-primary text-light fs-12"
                          : projectListDetail.statusString === "save"
                          ? "badge bg-info text-light fs-12"
                          : ""
                      }
                    >
                      {projectListDetail.statusString}
                    </span>
                  </div>
                </Col>

                <Col md={2}>
                  <div>Posted: {projectListDetail.postedTime}</div>
                </Col>
              </Row>
            </div>
          </div>
        ))}
      </div>

      {/* ----------------------------------------------------------------------------- */}
      {/* phan trang */}
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

export default ProjectList;

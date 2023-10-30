import React, { useState, useEffect } from "react";
import { Col, Row, Modal, ModalBody, Input, Label } from "reactstrap";
import { Link, useLocation } from "react-router-dom";

//Job Images
import jobImage1 from "../../../assets/images/featured-job/img-01.png";
import jobImage2 from "../../../assets/images/featured-job/img-02.png";
import jobImage3 from "../../../assets/images/featured-job/img-03.png";
import jobImage4 from "../../../assets/images/featured-job/img-04.png";
import jobImage5 from "../../../assets/images/featured-job/img-05.png";
import jobImage6 from "../../../assets/images/featured-job/img-06.png";
import jobImage7 from "../../../assets/images/featured-job/img-07.png";
import jobImage8 from "../../../assets/images/featured-job/img-08.png";
import interviewServices from "../../../services/interview.services";

const JobVacancy = () => {
  const [jobVacancyList, setJobVacancyList] = useState([]);

  const { state } = useLocation();
  const { hidingPage, setHingdingPage } = useState(false);


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
  let [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;

  const handlePageClick = (page) => {
    setCurrentPage(page);
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
    console.log(state?.jobId)
    try {
      // if (state?.jobId) {
      //   response = await interviewServices.getAllInterviewByHRAndRequestIdAndPaging(
      //     state.jobId,
      //     8,
      //     currentPage,
      //   );
      // } else {
      response = await interviewServices.getAllInterviewByManagerAndPaging(
        5,
        currentPage,
      );
      // }
      const data = response.data;
      const formattedJobVacancies = data.data.map((job) => {
        // Assuming job.typeRequireName and job.levelRequireName are available
        return {
          interviewId: job.interviewId,
          requestId: job.requestId,
          title: job.title,
          interviewerName: job.interviewerName,
          assignStaffName: job.assignStaffName,
          dateOfInterview: job.dateOfInterview,
          startTime: job.startTime,
          endTime: job.endTime,
          statusString: job.statusString,
          addclassNameBookmark: true,
        };
      });
      console.log(response.data);
      setJobVacancyList(formattedJobVacancies);
      setTotalPages(Math.ceil(data.paging.total / pageSize));
      if (data.paging.total < 6) {
        // Lấy tham chiếu đến phần tử có id="paging"
        var rowElement = document.getElementById("paging");

        // Ẩn phần tử bằng cách đặt style.display thành "none"
        if (rowElement) {
          rowElement.style.display = "none";
        }
      }
    } catch (error) {
      console.error("Error fetching job vacancies:", error);
    }
  };

  useEffect(() => {
    fetchJobVacancies();
  }, [currentPage]);



  return (
    <React.Fragment>
      <Row>
        <Col lg={12}>
          {jobVacancyList.map((jobVacancyDetails, key) => (
            <div
              key={key}
              className={
                jobVacancyDetails.addclassNameBookmark === true
                  ? "job-box bookmark-post card mt-4"
                  : "job-box card mt-4"
              }
            >
              <div className="p-4">
                <Row>
                  <Col lg={2}>
                    <Link to="/companydetails">
                      <img
                        src={jobImage1}
                        alt=""
                        className="img-fluid rounded-3"
                      />
                    </Link>
                  </Col>
                  <Col lg={10}>
                    <div className="mt-3 mt-lg-0">
                      <h5 className="fs-17 mb-1">
                        <Link to="/jobdetails" className="text-dark">
                          {jobVacancyDetails.title}
                        </Link>{" "}
                      </h5>
                      <ul className="list-inline mb-0">
                        <li className="list-inline-item">
                          <p className="text-muted fs-14 mb-0">
                            {jobVacancyDetails.dateOfInterview}
                          </p>
                        </li>
                      </ul>
                      <ul className="list-inline mb-0">
                        <li className="list-inline-item">
                          <p className="text-muted fs-14 mb-0">
                            {jobVacancyDetails.startTime} {jobVacancyDetails.endTime}
                          </p>
                        </li>
                      </ul>
                    </div>
                  </Col>
                </Row>
                <div className="favorite-icon">
                  <span
                    className={
                      "badge bg-success-subtle text-success fs-13 mt-1 mx-1"
                    }
                  >
                    {jobVacancyDetails.statusString}
                  </span>
                </div>
              </div>
              <div className="p-3 bg-light">
                <Row className="justify-content-between">
                  <Col md={8}>
                    <div>
                      <ul className="list-inline mb-0">
                        <li className="list-inline-item">
                          <i className="uil uil-tag"></i> Assign Staff Name:  :
                        </li>
                        <li className="list-inline-item">
                          <Link to="#" className="primary-link text-muted">
                            {jobVacancyDetails.assignStaffName}
                          </Link>

                        </li>

                      </ul>
                    </div>
                  </Col>

                  <Col md={4}>
                    <div className="text-md-end">
                      <Link
                        to={`/detailInterviewManager?Id=${jobVacancyDetails.interviewId}`}

                        className="primary-link"

                      >
                        View Details <i className="mdi mdi-chevron-double-right"></i>
                      </Link>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          ))}
        </Col>

      </Row >
      <Row id="paging">
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
                className={`page-item ${currentPage === totalPages ? "disabled" : ""
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
    </React.Fragment >




  );
};

export default JobVacancy;

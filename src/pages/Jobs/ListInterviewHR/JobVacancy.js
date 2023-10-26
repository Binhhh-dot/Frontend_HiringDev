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
  const pageSize = 8;

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
    const companyId = localStorage.getItem('companyId');
    try {
      if (state?.jobId) {
        response = await interviewServices.getAllInterviewByHRAndRequestIdAndPaging(
          companyId,
          state.jobId,
          8,
          currentPage,
        );
      } else {
        response = await interviewServices.getAllInterviewByHRAndPaging(
          companyId,
          8,
          currentPage,
        );
      }
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
          description: job.description,
        };
      });
      console.log(response.data);
      setJobVacancyList(formattedJobVacancies);
      setTotalPages(Math.ceil(data.paging.total / pageSize));
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
        {jobVacancyList.map((jobVacancy2Details, key) => (
          <Col lg={4} md={6} className="mt-4" key={key}>
            <div
              className={
                jobVacancy2Details.addclassNameBookmark === true
                  ? "card job-grid-box bookmark-post"
                  : "card job-grid-box"
              }
            >
              <div className="card-body p-4">
                <div className="favorite-icon">
                  <span
                    className={
                      "badge bg-success-subtle text-success fs-13 mt-1 mx-1"
                    }
                  >
                    {jobVacancy2Details.statusString}
                  </span>
                </div>
                <div>
                  <Link to="/companydetails">
                    <img
                      src={jobImage1}
                      alt=""
                      className="img-fluid rounded-3"
                    />
                  </Link>
                </div>
                <div className="mt-4">
                  <Link to="/jobdetails" className="primary-link">
                    <h5 className="fs-17">
                      {jobVacancy2Details.title}
                    </h5>
                  </Link>
                  <p className="text-muted mb-0">{jobVacancy2Details.dateOfInterview} </p>
                  <p className="text-muted mb-0">{jobVacancy2Details.startTime} to {jobVacancy2Details.endTime}</p>
                </div>
                <div className="job-grid-content">
                  <p className="text-muted">{jobVacancy2Details.description}</p>
                  <div className="d-flex  mt-4 border-top pt-3">
                    <div className="p-3 bg-light">

                      <div className="text-md-end">
                        <Link
                          to="/detailInterview"
                          className="primary-link"
                          state={{ interviewId: jobVacancy2Details.interviewId }}
                        >
                          View Details <i className="mdi mdi-chevron-double-right"></i>
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
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

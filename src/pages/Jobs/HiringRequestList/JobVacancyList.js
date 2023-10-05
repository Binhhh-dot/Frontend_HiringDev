import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import axios from "axios";

const JobVacancyList = () => {
  //Apply Now Model
  const [jobVacancyList, setJobVacancyList] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = currentPage; i < currentPage + 4; i++) {
      pageNumbers.push(
        <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
          <Link className="page-link" to="#" onClick={() => handlePageClick(i)}>
            {i}
          </Link>
        </li>
      );
    }

    return pageNumbers;
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    const fetchJobVacancies = async () => {
      try {
        const response = await axios.get(
          `https://wehireapi.azurewebsites.net/api/HiringRequest?PageIndex=${currentPage}&PageSize=5`

        );

        const data = response.data;
        const formattedJobVacancies = data.data.map((job) => {
          // Assuming job.typeRequireName and job.levelRequireName are available
          job.skillRequireStrings.unshift(job.typeRequireName, job.levelRequireName);
          return {
            id: job.requestId,
            companyImg: job.companyImage,
            jobDescription: job.jobTitle,
            companyName: job.companyName,
            location: job.numberOfDev + " Developer",
            jobPostTime: new Date(job.duration).toLocaleDateString(),
            cancelled: job.statusString.includes("Cancelled"),
            done: job.statusString.includes("Done"),
            outOfTime: job.statusString.includes("Expired"),
            fullTime: job.statusString.includes("Waiting Approval"),
            timing: job.statusString,
            addclassNameBookmark: false,
            showFullSkills: false,
            badges: [],
            experience: job.skillRequireStrings.join(", "),
          };
        });

        setJobVacancyList(formattedJobVacancies);
      } catch (error) {
        console.error("Error fetching job vacancies:", error);
      }
    };

    fetchJobVacancies();
  }, [currentPage]);



  //Set initial state  for showFulSkill using object id
  const initialSkillsState = jobVacancyList.reduce(
    (acc, job) => ({ ...acc, [job.id]: false }),
    {}
  );

  const [showFullSkills, setShowFullSkills] = useState(initialSkillsState);

  const toggleShowFullSkills = (id) => {
    setShowFullSkills((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <React.Fragment>
      <div>
        {jobVacancyList.map((jobVacancyListDetails, key) => (
          <div
            key={key}
            className={
              jobVacancyListDetails.addclassNameBookmark === true
                ? "job-box bookmark-post card mt-4"
                : "job-box card mt-4"
            }
          >
            <div className="bookmark-label text-center">
              <Link to="#" className="align-middle text-white">
                <i className="mdi mdi-star"></i>
              </Link>
            </div>
            <div className="p-4">
              <Row className="align-items-center">
                <Col md={2}>
                  <div className="text-center mb-4 mb-md-0">
                    <Link to="/companydetails">
                      <img
                        src={jobVacancyListDetails.companyImg}
                        alt=""
                        className="img-fluid rounded-3"
                      />
                    </Link>
                  </div>
                </Col>

                <Col md={3}>
                  <div className="mb-2 mb-md-0">
                    <h5 className="fs-18 mb-0">
                      <Link to="/hiringrequestdetails" className="text-dark">
                        {jobVacancyListDetails.jobDescription}
                      </Link>
                    </h5>
                    <p className="text-muted fs-14 mb-0">
                      {jobVacancyListDetails.companyName}
                    </p>
                  </div>
                </Col>

                <Col md={3}>
                  <div className="d-flex mb-2">
                    <div className="flex-shrink-0">
                      <i className="uil uil-user-check text-primary me-1"></i>
                    </div>
                    <p className="text-muted mb-0">
                      {jobVacancyListDetails.location}
                    </p>
                  </div>
                </Col>

                <Col md={2}>
                  <div className="d-flex mb-0">
                    <div className="flex-shrink-0">
                      <i className="uil uil-clock-three text-primary me-1"></i>
                    </div>
                    <p className="text-muted mb-0">
                      {" "}
                      {jobVacancyListDetails.jobPostTime}
                    </p>
                  </div>
                </Col>

                <Col md={2}>
                  <div>
                    <span
                      className={
                        jobVacancyListDetails.fullTime === true
                          ? "badge bg-success-subtle text-success fs-13 mt-1 mx-1"
                          : jobVacancyListDetails.partTime === true
                            ? "badge bg-danger-subtle text-danger fs-13 mt-1 mx-1"
                            : jobVacancyListDetails.freeLance === true
                              ? "badge bg-primary-subtle text-primary fs-13 mt-1 mx-1"
                              : jobVacancyListDetails.internship === true
                                ? "badge bg-blue-subtle text-blue fs-13 mt-1"
                                : jobVacancyListDetails.lookingForDev === true
                                  ? "badge bg-warning-subtle text-warning fs-13 mt-1 mx-1"
                                  : jobVacancyListDetails.interview === true
                                    ? "badge bg-info text-light fs-13 mt-1 mx-1"
                                    : jobVacancyListDetails.done === true
                                      ? "badge bg-success-subtle text-success fs-13 mt-1 mx-1"
                                      : jobVacancyListDetails.outOfTime === true
                                        ? "badge bg-danger-subtle text-danger fs-13 mt-1 mx-1"
                                        : jobVacancyListDetails.cancelled === true
                                          ? "badge bg-secondary text-light fs-13 mt-1 mx-1"
                                          : ""
                      }
                    >
                      {jobVacancyListDetails.timing}
                    </span>
                    {(jobVacancyListDetails.badges || []).map(
                      (badgeInner, key) => (
                        <span
                          className={`badge ${badgeInner.badgeclassName} fs-13 mt-1`}
                          key={key}
                        >
                          {badgeInner.badgeName}
                        </span>
                      )
                    )}
                  </div>
                </Col>
              </Row>
            </div>
            <div className="p-3 bg-light">
              <Row className="justify-content-between">
                <Col md={9}>
                  <div>
                    <p className="text-muted mb-0 ">
                      {jobVacancyListDetails.experience
                        .split(",")
                        .slice(
                          0,
                          showFullSkills[jobVacancyListDetails.id]
                            ? undefined
                            : 6
                        )
                        .map((skill, index) => (
                          <span
                            key={index}
                            className={`badge ${index === 0 ? 'bg-info text-light' :
                              index === 1 ? 'bg-danger-subtle text-danger' :
                                'bg-primary-subtle text-primary'
                              }  ms-2`}
                          >
                            {skill.trim()}
                          </span>
                        ))}

                      {jobVacancyListDetails.experience.split(",").length >
                        3 && (
                          <Link
                            to="#"
                            onClick={() =>
                              toggleShowFullSkills(jobVacancyListDetails.id)
                            }
                          >
                            {" "}
                            {showFullSkills[jobVacancyListDetails.id]
                              ? "less"
                              : "...more"}
                          </Link>
                        )}

                    </p>
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
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <Link className="page-link" to="#" tabIndex="-1" onClick={handlePrevPage}>
                  <i className="mdi mdi-chevron-double-left fs-15"></i>
                </Link>
              </li>
              {renderPageNumbers()}
              <li className="page-item">
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

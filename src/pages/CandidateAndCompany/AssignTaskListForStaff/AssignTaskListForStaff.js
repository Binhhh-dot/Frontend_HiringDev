import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Input } from "reactstrap";
import JobType from "../../Home/SubSection/JobType";
import { Form } from "react-bootstrap";
import hiringrequestService from "../../../services/hiringrequest.service";
import assignTaskServices from "../../../services/assignTask.services";
const AssignTaskListForStaff = (a) => {
  //Apply Now Model
  const [jobVacancyList, setJobVacancyList] = useState([]);
  const [AssignTaskList, setAssignTaskList] = useState([]);

  let [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [skill, setSkill] = useState([]);
  const pageSize = 5;
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
        5
      );

      const data = response.data;
      const formattedJobVacancies = data.data.map((job) => {
        // Assuming job.typeRequireName and job.levelRequireName are available
        job.skillRequireStrings.unshift(
          job.typeRequireName,
          job.levelRequireName
        );
        return {
          id: job.requestId,
          companyIdMana: job.companyId,
          companyImg: job.companyImage,
          jobDescription: job.jobTitle,
          companyName: job.companyName,
          location: job.numberOfDev + " Developer",
          jobPostTime: new Date(job.duration).toLocaleDateString(),
          cancelled: job.statusString.includes("Cancelled"),
          done: job.statusString.includes("Done"),
          outOfTime: job.statusString.includes("Expired"),
          waitingApproval: job.statusString.includes("Waiting Approval"),
          timing: job.statusString,
          addclassNameBookmark: false,
          showFullSkills: false,
          badges: [],
          experience: job.skillRequireStrings.join(", "),
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

  const onSearch = () => {
    fetchJobVacancies();
  };

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
  //--------------------------------------------------------------------------------
  const fetchGetPagingAssignTaskForStaffWithId = async () => {
    let response;
    try {
      response = await assignTaskServices.getPagingAssignTaskForStaffWithId(
        //3,
        48,
        currentPage,
        5
      );
      setAssignTaskList(response.data.data);
    } catch (error) {
      console.error("Error fetching list task for staff:", error);
    }
  };

  useEffect(() => {
    fetchGetPagingAssignTaskForStaffWithId();
  }, [currentPage]);
  //--------------------------------------------------------------------------------

  return (
    <React.Fragment>
      <div className="job-list-header">
        <Form action="#">
          <Row className="g-2">
            <Col lg={4} md={6}>
              <div className="filler-job-form">
                <i className="uil uil-briefcase-alt"></i>
                <Input
                  type="search"
                  className="form-control filter-input-box"
                  id="exampleFormControlInput1"
                  placeholder="Jobtitle... "
                  style={{ marginTop: "-10px" }}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </Col>

            <Col lg={5} md={6}>
              <div className="filler-job-form">
                <i className="uil uil-clipboard-notes"></i>
                <JobType skill={skill} setSkill={setSkill} />
              </div>
            </Col>
            <Col lg={3} md={6}>
              <div className="btn btn-primary w-100" onClick={() => onSearch()}>
                <i className="uil uil-filter"></i> Filter
              </div>
            </Col>
          </Row>
        </Form>
      </div>
      <div>
        {AssignTaskList.map((jobVacancyListDetails, key) => (
          <div
            key={key}
            className={
              jobVacancyListDetails.addclassNameBookmark === true
                ? "job-box bookmark-post card mt-4"
                : "job-box card mt-4"
            }
          >
            <div
              className="bookmark-label text-center"
              style={{ display: "none" }}
            >
              <Link to="#" className="align-middle text-white">
                <i className="mdi mdi-star"></i>
              </Link>
            </div>
            <div className="p-4">
              <Row
                className="align-items-center"
                style={{ justifyContent: "space-evenly" }}
              >
                <Col md={3}>
                  <div className="mb-2 mb-md-0">
                    <h5 className="fs-18 mb-0">
                      <Link
                        to="/assigntaskforstaffdetail"
                        className="text-dark"
                        state={{
                          taskIdForStaff: jobVacancyListDetails.taskId,
                        }}
                      >
                        {jobVacancyListDetails.taskTitle}
                      </Link>
                    </h5>
                    <p className="text-muted fs-14 mb-0">
                      {/* {jobVacancyListDetails.companyName} */}2 min ago
                    </p>
                  </div>
                </Col>

                <Col md={2}>
                  <div className="d-flex">
                    <div className="flex-shrink-0">
                      <i className="uil  uil-user text-primary me-1"></i>
                    </div>
                    <p className="text-muted mb-0">
                      {/* {jobVacancyListDetails.description} */}2 Member
                    </p>
                  </div>
                </Col>

                <Col md={3}>
                  <div className="d-flex mb-0">
                    <div className="flex-shrink-0">
                      <i className="uil uil-clock-three text-primary me-1"></i>
                    </div>
                    <p className="text-muted mb-0">
                      {" "}
                      {jobVacancyListDetails.deadline}
                    </p>
                  </div>
                </Col>

                <Col md={2}>
                  <div>
                    <span
                      className={
                        jobVacancyListDetails.statusString === "Preparing"
                          ? "badge bg-info-subtle text-info fs-12"
                          : jobVacancyListDetails.statusString === "InProgress"
                          ? "badge bg-blue text-light fs-12"
                          : jobVacancyListDetails.statusString === "Done"
                          ? "badge bg-primary-subtle text-primary fs-12"
                          : jobVacancyListDetails.statusString === "Cancelled"
                          ? "badge bg-danger-subtle text-danger fs-12"
                          : ""
                      }
                    >
                      {jobVacancyListDetails.statusString}
                    </span>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="p-3 bg-light"></div>
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

export default AssignTaskListForStaff;

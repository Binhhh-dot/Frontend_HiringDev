import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Col,
  Row,
  Input,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";
import axios from "axios";
import JobType from "../../Home/SubSection/JobType";
import { Dropdown, Form } from "react-bootstrap";
import hiringrequestService from "../../../services/hiringrequest.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
const JobVacancyList = (a) => {
  //Apply Now Model
  const [jobVacancyList, setJobVacancyList] = useState([]);

  let [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [skill, setSkill] = useState([]);
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
      // if (search || skill) {
      //   response =
      //     await hiringrequestService.getAllHiringRequestByJobTitleAndSkill(
      //       currentPage,
      //       5,
      //       search,
      //       skill
      //     );
      // } else {
      response = await hiringrequestService.getHiringRequestAndPaging(
        currentPage,
        7
      );
      // }

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

          done: job.statusString.includes("Done"),

          save: job.statusString.includes("Saved"),
          waitingApproval: job.statusString.includes("Waiting Approval"),
          inProgress: job.statusString.includes("In Progress"),
          rejected: job.statusString.includes("Rejected"),
          expired: job.statusString.includes("Expired"),
          cancelled: job.statusString.includes("Cancelled"),
          finished: job.statusString.includes("Finished"),
          completed: job.statusString.includes("Completed"),

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

  //--------------------------------------------------------------------------------------------
  const [showDropdownEdit, setShowDropdownEdit] = useState(
    Array(jobVacancyList.length).fill(false)
  );

  const handleDevActionClick = (index) => {
    const newShowDropdownEdit = [...showDropdownEdit];
    newShowDropdownEdit[index] = !newShowDropdownEdit[index];
    setShowDropdownEdit(newShowDropdownEdit);
  };

  const handleAcceptClick = () => {};

  const handleRejectClick = () => {};
  //--------------------------------------------------------------------------------------------

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
                <i className="uil uil-filter"></i> Fliter
              </div>
            </Col>
          </Row>
        </Form>
      </div>
      <div>
        {jobVacancyList.map((jobVacancyListDetails, key) => (
          <div
            key={key}
            className={"job-box-dev-in-list-hiringRequest-for-dev mt-4 card"}
          >
            <div className="p-4">
              <Row className="align-items-center">
                <Col md={2}>
                  <div>
                    <Link to="/companydetails">
                      <img
                        style={{
                          width: "80px",
                          height: "80px",
                        }}
                        src={jobVacancyListDetails.companyImg}
                        alt=""
                        className="img-fluid rounded-3 img-avt-hiring-request"
                      />
                    </Link>
                  </div>
                </Col>

                <Col md={3} className="px-0">
                  <div>
                    <h5 className="fs-18 mb-0">
                      <Link
                        to="/hiringrequestdetails"
                        className="text-dark"
                        state={{
                          jobId: jobVacancyListDetails.id,
                          company: jobVacancyListDetails.companyIdMana,
                        }}
                      >
                        {jobVacancyListDetails.jobDescription}
                      </Link>
                    </h5>
                    <p className="text-muted fs-14 mb-0">
                      {jobVacancyListDetails.companyName}
                    </p>
                  </div>
                </Col>

                <Col md={2}>
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

                <Col md={3} className="d-flex justify-content-around">
                  <div className="d-flex align-items-center">
                    <span
                      className={
                        jobVacancyListDetails.waitingApproval === true
                          ? "badge bg-warning text-light fs-12"
                          : jobVacancyListDetails.inProgress === true
                          ? "badge bg-blue text-light fs-12"
                          : jobVacancyListDetails.rejected === true
                          ? "badge bg-danger text-light fs-12"
                          : jobVacancyListDetails.expired === true
                          ? "badge bg-danger text-light fs-12"
                          : jobVacancyListDetails.cancelled === true
                          ? "badge bg-danger text-light fs-12"
                          : jobVacancyListDetails.finished === true
                          ? "badge bg-primary text-light fs-12"
                          : jobVacancyListDetails.completed === true
                          ? "badge bg-primary text-light fs-12"
                          : jobVacancyListDetails.save === true
                          ? "badge bg-info text-light fs-12"
                          : ""
                      }
                    >
                      {jobVacancyListDetails.timing}
                    </span>
                  </div>

                  <UncontrolledDropdown
                    isOpen={showDropdownEdit[key]}
                    toggle={() => handleDevActionClick(key)}
                  >
                    <DropdownToggle
                      caret
                      style={{
                        padding: "0px",
                        backgroundColor: "white",
                        border: "0px",
                      }}
                    >
                      <div className="avatar-sm bg-warning-subtle text-warning text-center rounded-circle fs-15">
                        <FontAwesomeIcon icon={faPenToSquare} size="xl" />
                      </div>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem style={{ textAlign: "center" }}>
                        <span className="text-primary fw-bolder ">Accept</span>
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem style={{ textAlign: "center" }}>
                        <span className="text-danger fw-bolder">Reject</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
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

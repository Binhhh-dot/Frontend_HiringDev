import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Input } from "reactstrap";
import axios from "axios";
import JobType from "../../Home/SubSection/JobType";
import { Form } from "react-bootstrap";
import hiringrequestService from "../../../services/hiringrequest.service";
import { useNavigate } from "react-router-dom";
//Images Import
import jobImage1 from "../../../assets/images/featured-job/img-01.png";
import jobImage2 from "../../../assets/images/featured-job/img-02.png";
import jobImage3 from "../../../assets/images/featured-job/img-03.png";
import jobImage4 from "../../../assets/images/featured-job/img-04.png";
import jobImage5 from "../../../assets/images/featured-job/img-05.png";
import jobImage6 from "../../../assets/images/featured-job/img-06.png";
import jobImage7 from "../../../assets/images/featured-job/img-07.png";
import projectServices from "../../../services/project.services";

const ProjectVacancyList = () => {
  //Apply Now Model
  const [jobVacancyList, setJobVacancyList] = useState([]);
  const navigate = useNavigate();
  let [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [skill, setSkill] = useState([]);
  const pageSize = 5;
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  const companyId = localStorage.getItem("companyId");
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

  const createNewProject = () => {
    navigate("/createproject")
  };

  const openProjectDetail = (id) => {
    navigate('/projectdetailhr?Id=' + id)
  };




  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const fetchJobVacancies = async () => {
    try {
      let response;
      response =
        await projectServices.getAllProjectByCompanyId(companyId);
      const data = response.data;
      const formattedJobVacancies = data.data.map((project) => {
        return {
          id: project.projectId,
          companyName: project.companyName,
          projectTypeName: project.projectTypeName,
          projectCode: project.projectCode,
          projectName: project.projectName,
          startDate: project.startDate,
          endDate: project.endDate,
          postedTime: project.postedTime,
          statusString: project.statusString,
          done: project.statusString.includes("Done"),

          save: project.statusString.includes("Saved"),
          preparing: project.statusString.includes("Preparing"),
          inProgress: project.statusString.includes("In Progress"),
          rejected: project.statusString.includes("Rejected"),
          expired: project.statusString.includes("Expired"),
          cancelled: project.statusString.includes("Cancelled"),
          finished: project.statusString.includes("Finished"),
          completed: project.statusString.includes("Completed"),
        };

      });
      console.log(response.data);
      setJobVacancyList(formattedJobVacancies);
    } catch (error) {
      console.error("Error fetching job vacancies:", error);
    }
  };

  const openDetail = (statusString, id, companyId) => {
    if (statusString === "Saved") {
      const state = { requestId: id };
      navigate("/createhiringrequest", { state });
    } else {
      navigate("/projectdetail");
      navigate('/projectdetail', {
        state: {
          jobId: id,
          company: companyId,
        },
      });
    }
  };

  useEffect(() => {
    fetchJobVacancies();
  }, [currentPage]);

  const onSearch = () => {
    setCurrentPage(1);
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
        <Row>
          <Col lg={3} md={6} className="mt-4" >
            <div
              onClick={createNewProject}
              style={{ height: "180px" }}
              className={
                "job-box card d-flex align-items-center justify-content-center "
              }
            // className="job-box card mt-4"
            >
              <div style={{ fontSize: "40px", color: "#0000bc", height: "45px" }}>+</div>
              <div style={{ color: "#0000bc" }} >Add Project</div>
            </div>
          </Col>
          {jobVacancyList.map((jobVacancyListDetails, key) => (
            <Col lg={3} md={6} className="mt-4" key={key}>
              <div
                key={key}
                onClick={() => openProjectDetail(jobVacancyListDetails.id)}
                style={{ height: "180px", transform: "none" }}
                className={
                  jobVacancyListDetails.addclassNameBookmark === true
                    ? "job-box bookmark-post card "
                    : "job-box card "
                }
              // className="job-box card mt-4"
              >
                <div className="p-4">
                  <div className="d-flex justify-content-between">
                    <div style={{ fontWeight: "bold", fontSize: "18px" }}>{jobVacancyListDetails.projectName}</div>
                    <span
                      style={{ height: "fit-content" }}
                      className={
                        jobVacancyListDetails.preparing === true
                          ? "badge bg-warning text-light fs-12 mt-1 mx-1"
                          : jobVacancyListDetails.inProgress === true
                            ? "badge bg-blue text-light fs-12 mt-1 mx-1"
                            : jobVacancyListDetails.rejected === true
                              ? "badge bg-danger text-light fs-12 mt-1 mx-1"
                              : jobVacancyListDetails.expired === true
                                ? "badge bg-darkcyan text-light fs-12 mt-1 mx-1"
                                : jobVacancyListDetails.cancelled === true
                                  ? "badge bg-secondary text-light fs-12 mt-1 mx-1"
                                  : jobVacancyListDetails.finished === true
                                    ? "badge bg-primary text-light fs-12 mt-1 mx-1"
                                    : jobVacancyListDetails.completed === true
                                      ? "badge bg-success text-light fs-12 mt-1 mx-1"
                                      : jobVacancyListDetails.save === true
                                        ? "badge bg-teal text-light fs-12 mt-1 mx-1"
                                        : ""
                      }
                    >
                      {jobVacancyListDetails.statusString}
                    </span>
                  </div>

                  <div style={{ fontSize: "13px" }}>{jobVacancyListDetails.projectCode}</div>

                  {/* <Row className="align-items-center">
                    <Col md={3}>
                      <div className="mb-2 mb-md-0">
                        <h5 className="fs-18 mb-0">
                          <div
                            onClick={() =>
                              openDetail(
                                jobVacancyListDetails.statusString,
                                jobVacancyListDetails.id,
                                jobVacancyListDetails.companyId,

                              )
                            }
                            className="text-dark"
                          >
                            {jobVacancyListDetails.jobDescription}
                          </div>
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
                            jobVacancyListDetails.preparing === true
                              ? "badge bg-warning text-light fs-12 mt-1 mx-1"
                              : jobVacancyListDetails.inProgress === true
                                ? "badge bg-blue text-light fs-12 mt-1 mx-1"
                                : jobVacancyListDetails.rejected === true
                                  ? "badge bg-danger text-light fs-12 mt-1 mx-1"
                                  : jobVacancyListDetails.expired === true
                                    ? "badge bg-darkcyan text-light fs-12 mt-1 mx-1"
                                    : jobVacancyListDetails.cancelled === true
                                      ? "badge bg-secondary text-light fs-12 mt-1 mx-1"
                                      : jobVacancyListDetails.finished === true
                                        ? "badge bg-primary text-light fs-12 mt-1 mx-1"
                                        : jobVacancyListDetails.completed === true
                                          ? "badge bg-success text-light fs-12 mt-1 mx-1"
                                          : jobVacancyListDetails.save === true
                                            ? "badge bg-teal text-light fs-12 mt-1 mx-1"
                                            : ""
                          }
                        >
                          {jobVacancyListDetails.statusString}
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
                  </Row> */}
                </div>
                {/* <div className="p-3 bg-light">
                  <Row className="justify-content-between">
                    <Col md={12}>
                      <div>
                        <p className="text-muted mb-0 ">
                        </p>
                      </div>
                    </Col>
                  </Row>
                </div> */}
              </div>
            </Col>
          ))}
        </Row>
      </div>

    </React.Fragment>
  );
};

export default ProjectVacancyList;

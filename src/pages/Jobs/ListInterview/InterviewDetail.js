import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Input } from "reactstrap";
import axios from "axios";
import JobType from "../../Home/SubSection/JobType";
import { Form } from "react-bootstrap";
import hiringrequestService from "../../../services/hiringrequest.service";

//Images Import
import jobImage1 from "../../../assets/images/featured-job/img-01.png";
import jobImage2 from "../../../assets/images/featured-job/img-02.png";
import jobImage3 from "../../../assets/images/featured-job/img-03.png";
import jobImage4 from "../../../assets/images/featured-job/img-04.png";
import jobImage5 from "../../../assets/images/featured-job/img-05.png";
import jobImage6 from "../../../assets/images/featured-job/img-06.png";
import jobImage7 from "../../../assets/images/featured-job/img-07.png";

const JobVacancyList = () => {
    //Apply Now Model
    const [jobVacancyList, setJobVacancyList] = useState([]);

    let [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [skill, setSkill] = useState([]);
    const pageSize = 5;
    const handlePageClick = (page) => {
        setCurrentPage(page);
    };
    const companyId = localStorage.getItem('companyId');
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
            if (search || skill) {
                response =
                    await hiringrequestService.getAllHiringRequestByIdAndJobTitleAndSkill(
                        companyId,
                        currentPage,
                        5,
                        search,
                        skill
                    );
            } else {
                response = await hiringrequestService.getHiringRequestByidAndPaging(
                    companyId,
                    currentPage,
                    5
                );
            }

            const data = response.data;
            const formattedJobVacancies = data.data.map((job) => {
                // Assuming job.typeRequireName and job.levelRequireName are available
                job.skillRequireStrings.unshift(
                    job.typeRequireName,
                    job.levelRequireName
                );
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
                        className={
                            jobVacancyListDetails.addclassNameBookmark === true
                                ? "job-box bookmark-post card mt-4"
                                : "job-box card mt-4"
                        }
                    // className="job-box card mt-4"
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
                                        <Link to="/hiringrequestlistincompanypartnerdetail">
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
                                            <Link
                                                to="/hiringrequestlistincompanypartnerdetail"
                                                className="text-dark"
                                                state={{ jobId: jobVacancyListDetails.id }}
                                            >
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
                                                    ? "badge bg-success-subtle text-success fs-12 mt-1 mx-1"
                                                    : jobVacancyListDetails.partTime === true
                                                        ? "badge bg-danger-subtle text-light fs-12 mt-1 mx-1"
                                                        : jobVacancyListDetails.freeLance === true
                                                            ? "badge bg-primary-subtle text-primary fs-12 mt-1 mx-1"
                                                            : jobVacancyListDetails.internship === true
                                                                ? "badge bg-blue-subtle text-blue fs-12 mt-1"
                                                                : jobVacancyListDetails.lookingForDev === true
                                                                    ? "badge bg-warning-subtle text-warning fs-12 mt-1 mx-1"
                                                                    : jobVacancyListDetails.interview === true
                                                                        ? "badge bg-info text-light fs-12 mt-1 mx-1"
                                                                        : jobVacancyListDetails.done === true
                                                                            ? "badge bg-success-subtle text-success fs-12 mt-1 mx-1"
                                                                            : jobVacancyListDetails.outOfTime === true
                                                                                ? "badge bg-danger-subtle text-light fs-12 mt-1 mx-1"
                                                                                : jobVacancyListDetails.cancelled === true
                                                                                    ? "badge bg-secondary text-light fs-12 mt-1 mx-1"
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
                                <Col md={12}>
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
                                                        className={`badge ${index === 0
                                                            ? "bg-info text-light"
                                                            : index === 1
                                                                ? "bg-danger-subtle text-danger"
                                                                : "bg-primary-subtle text-primary"
                                                            }  ms-2`}
                                                    >
                                                        {skill.trim()}
                                                    </span>
                                                ))}

                                            {jobVacancyListDetails.experience.split(",").length >
                                                6 && (
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
        </React.Fragment>
    );
};

export default JobVacancyList;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Collapse, Input, Label, Row } from "reactstrap";
import axios from "axios";
import JobType from "../../Home/SubSection/JobType";
import { Form } from "react-bootstrap";
import hiringrequestService from "../../../services/hiringrequest.service";
import projectServices from "../../../services/project.services";
import projectTypeServices from "../../../services/projectType.services";
import ProjectType from "../../Home/SubSection/ProjectType";
const ProjectVacancyList = (a) => {
    //Apply Now Model
    const [jobVacancyList, setJobVacancyList] = useState([]);
    const [toggleThird, setToggleThird] = useState(false);
    const [toggleFifth, setToggleFifth] = useState(false);
    const [toggleSecond, setToggleSecond] = useState(false);
    const [statuses, setStatuses] = useState([]);
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
        const companyId = localStorage.getItem("companyId");
        try {
            console.log(currentPage);
            console.log(companyId);
            console.log(pageSize);
            response = await projectServices.getAllProjectByCompanyIdAndPaging(companyId, currentPage, pageSize)
                ;
            console.log(response.data);
            setJobVacancyList(response.data.data);
            setTotalPages(Math.ceil(response.data.paging.total / pageSize));
        } catch (error) {
            console.error("Error fetching job vacancies:", error);
        }
    };

    const fetchStatuses = async () => {
        try {
            const response = await projectTypeServices.getAllType();
            setStatuses(response.data.data);
        } catch (error) {
            console.error("Error fetching statuses:", error);
        }
    };

    useEffect(() => {
        fetchStatuses();
    }, []);

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
            <Row>
                <Col lg={9}>
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
                                            placeholder="Project name/ Project code... "
                                            style={{ marginTop: "-10px" }}
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                        />
                                    </div>
                                </Col>

                                <Col lg={5} md={6}>
                                    <div className="filler-job-form">
                                        <i className="uil uil-clipboard-notes"></i>
                                        <ProjectType skill={skill} setSkill={setSkill} />
                                    </div>
                                </Col>
                                <Col lg={3} md={6}>
                                    <div className="btn btn-primary w-100" onClick={() => onSearch()}>
                                        <i className="uil  uil-search"></i> Search
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    <div>
                        {jobVacancyList.map((jobVacancyListDetails, key) => (
                            <Link
                                key={key}
                                className={
                                    "job-box card mt-4"
                                }
                                to={`/projectdetailhr?Id=${jobVacancyListDetails.projectId}`}

                            >
                                <div className="p-4">
                                    <Row className="align-items-center">
                                        <Col md={2}>
                                            <div>
                                                <div >
                                                    <img
                                                        style={{
                                                            width: "80px",
                                                            height: "80px",
                                                        }}
                                                        src={jobVacancyListDetails.companyImage}
                                                        alt=""
                                                        className="img-fluid rounded-3 img-avt-hiring-request"
                                                    />
                                                </div>
                                            </div>
                                        </Col>

                                        <Col md={3} className="px-0">
                                            <div>
                                                <h5 className="fs-18 mb-0">
                                                    <Link
                                                        to={`/projectdetailhr?Id=${jobVacancyListDetails.projectId}`}
                                                        className="text-dark"
                                                    >
                                                        {jobVacancyListDetails.projectName}
                                                    </Link>
                                                </h5>
                                                <p className="text-muted fs-14 mb-0">
                                                    {jobVacancyListDetails.projectCode}
                                                </p>
                                            </div>
                                        </Col>

                                        <Col md={3}>
                                            <div className="d-flex mb-2">
                                                <div className="flex-shrink-0">
                                                    <i className="uil uil-user-check text-primary me-1"></i>
                                                </div>
                                                <p className="text-muted mb-0">
                                                    {jobVacancyListDetails.numberOfDev}
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
                                                    {jobVacancyListDetails.postedTime}
                                                </p>
                                            </div>
                                        </Col>

                                        <Col md={2}>
                                            <div>
                                                <span
                                                    className={
                                                        jobVacancyListDetails.statusString === "Preparing"
                                                            ? "badge bg-warning text-light fs-12"
                                                            : jobVacancyListDetails.statusString === "In process"
                                                                ? "badge bg-blue text-light fs-12"
                                                                : ""
                                                    }
                                                >
                                                    {jobVacancyListDetails.statusString}
                                                </span>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Link>
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
                </Col>
                <Col lg={3}>
                    <div className="side-bar mt-5 mt-lg-0">
                        <div className="accordion" id="accordionExample">

                            <div className="accordion-item mt-3">
                                <h2 className="accordion-header" id="jobType">
                                    <Button
                                        className="accordion-button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setToggleThird(!toggleThird);
                                        }}
                                        role="button"
                                        id="collapseExample"
                                    >
                                        Project type
                                    </Button>
                                </h2>
                                <Collapse isOpen={toggleThird}>
                                    <div className="accordion-body">
                                        <div className="side-title">
                                            <div className="form-check mt-2">
                                                <Input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="flexRadioDefault"
                                                    id="flexRadioDefault6"
                                                    defaultChecked
                                                />
                                                <label
                                                    className="form-check-label ms-2 text-muted"
                                                    htmlFor="flexRadioDefault6"
                                                >
                                                    All
                                                </label>
                                            </div>
                                            {statuses.map((status) => (
                                                <div className="form-check mt-2" key={status.projectTypeId}>
                                                    <Input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="flexRadioDefault"
                                                        id={`flexRadioDefault${status.projectTypeId}`}
                                                    />
                                                    <label
                                                        className="form-check-label ms-2 text-muted"
                                                        htmlFor={`flexRadioDefault${status.projectTypeId}`}
                                                    >
                                                        {status.projectTypeName}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Collapse>
                            </div>

                            <div className="accordion-item mt-3">
                                <h2 className="accordion-header" id="jobType">
                                    <Button
                                        className="accordion-button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setToggleSecond(!toggleSecond);
                                        }}
                                        role="button"
                                        id="collapseExample"
                                    >
                                        Status project
                                    </Button>
                                </h2>
                                <Collapse isOpen={toggleSecond}>
                                    <div className="accordion-body">
                                        <div className="side-title">
                                            {/* <div className="form-check mt-2">
                                                <Input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="flexRadioDefault"
                                                    id="flexRadioDefault"
                                                    defaultChecked
                                                />
                                                <label
                                                    className="form-check-label ms-2 text-muted"
                                                    htmlFor="flexRadioDefault"
                                                >
                                                    All
                                                </label>
                                            </div> */}
                                            {statuses.map((status) => (
                                                <div className="form-check mt-2" key={status.projectTypeId}>
                                                    <Input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="flexRadioDefault"
                                                        id={`flexRadioDefault${status.projectTypeId}`}
                                                    />
                                                    <label
                                                        className="form-check-label ms-2 text-muted"
                                                        htmlFor={`flexRadioDefault${status.projectTypeId}`}
                                                    >
                                                        {status.projectTypeName}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Collapse>
                            </div>

                            <div className="accordion-item mt-3">
                                <h2 className="accordion-header" id="tagCloud">
                                    <Button
                                        className="accordion-button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setToggleFifth(!toggleFifth);
                                        }}
                                        role="button"
                                        id="collapseExample"
                                    >
                                        Duration
                                    </Button>
                                </h2>
                            </div>
                            <div className="mt-3 date-hiring-request">
                                <input type="date" id="datepicker" />
                                <p id="selectedDate"></p>
                            </div>
                        </div>
                    </div>
                </Col>

            </Row>

        </React.Fragment>
    );
};

export default ProjectVacancyList;

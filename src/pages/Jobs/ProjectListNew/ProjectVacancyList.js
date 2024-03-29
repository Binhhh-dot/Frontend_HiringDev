import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Collapse, Input, Label, Row } from "reactstrap";
import axios from "axios";
import Select from "react-select";
import JobType from "../../Home/SubSection/JobType";
import { Form } from "react-bootstrap";
import hiringrequestService from "../../../services/hiringrequest.service";
import projectServices from "../../../services/project.services";
import projectTypeServices from "../../../services/projectType.services";
import ProjectType from "../../Home/SubSection/ProjectType";
import { Empty } from 'antd';
import { Skeleton } from 'antd';

const ProjectVacancyList = (a) => {
    //Apply Now Model
    const [jobVacancyList, setJobVacancyList] = useState([]);
    const [toggleThird, setToggleThird] = useState(false);
    const [toggleFifth, setToggleFifth] = useState(false);
    const [toggleSecond, setToggleSecond] = useState(true);
    const [statuses, setStatuses] = useState(0);
    const [loading, setLoading] = useState(true);

    const [options, setOptions] = useState([]);


    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await projectTypeServices.getAllType();

                if (response.data && response.data.data) {
                    const formattedOptions = response.data.data.map((item) => ({
                        label: item.projectTypeName,
                        value: item.projectTypeId.toString(),
                    }));

                    setOptions(formattedOptions);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchOptions();
    }, []); // Empty dependency array ensures the effect runs once on component mount

    const colourStyles = {
        control: (styles) => ({
            ...styles,
            border: 0,
            boxShadow: "none",
            padding: "12px 0 12px 40px",
            margin: "-16px -6px 0 -52px",
            borderRadius: "0",
        }),
    };



    const liststatuses = [
        { label: 'All', value: 0 },
        { label: 'Preparing', value: 1 },
        { label: 'In Process', value: 2 },
        { label: 'Closing Process', value: 3 },
        { label: 'Closed', value: 4 },
    ];
    let [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [skill, setSkill] = useState(null);
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



    const handleStatusChange = (selectedValue) => {
        setStatuses(selectedValue);
    };

    const fetchJobVacancies = async () => {
        let response;
        const companyId = localStorage.getItem("companyId");
        try {
            const projectType = skill ? skill.value : "";
            const inputSearch = search;
            let status = "";
            console.log(statuses)
            if (statuses != 0) {
                status = statuses;
            }
            console.log(status)

            response = await projectServices.getAllProjectByCompanyIdAndPaging(companyId, currentPage, pageSize, projectType, inputSearch, status)
                ;
            console.log(response.data);
            setJobVacancyList(response.data.data);
            console.log(response.data.paging.total)
            console.log(pageSize)
            setTotalPages(Math.ceil(response.data.paging.total / pageSize));
            console.log(totalPages)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error("Error fetching job vacancies:", error);
        }
    };

    useEffect(() => {
        setLoading(true)
        setCurrentPage(1);
        fetchJobVacancies();
    }, [statuses]);


    const setSkillValue = (selectedOption) => {
        if (!selectedOption) {
            setSkill(null); // Hoặc giá trị thích hợp để biểu thị hủy chọn
        } else {
            setSkill(selectedOption);
        }
    };

    useEffect(() => {
        setLoading(true)
        fetchJobVacancies();
    }, [currentPage]);

    useEffect(() => {
        setLoading(true)
        setCurrentPage(1);
        fetchJobVacancies();
    }, [skill]);


    const onSearch = () => {
        setLoading(true)
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
                                        <Select
                                            options={options}
                                            styles={colourStyles}
                                            className="selectForm__inner"
                                            name="choices-single-categories"
                                            id="choices-single-categories"
                                            aria-label="Default select example"
                                            value={skill}
                                            onChange={setSkillValue}
                                            isClearable
                                            placeholder="Select project type..."
                                        />
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
                        {loading ? ( // Render Skeleton while loading is true
                            <>
                                <Skeleton active />
                                <Skeleton active />
                                <Skeleton active />
                            </>
                        ) :
                            jobVacancyList.length > 0 ? (
                                <>
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

                                                    <Col md={2}>
                                                        <div className="d-flex mb-2">
                                                            <div className="flex-shrink-0">
                                                                <i className="uil uil-user-check text-primary me-1"></i>
                                                            </div>
                                                            <p className="text-muted mb-0">
                                                                {jobVacancyListDetails.numberOfDev}
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
                                                                            : jobVacancyListDetails.statusString === "Closed"
                                                                                ? "badge bg-teal text-light fs-12"
                                                                                : jobVacancyListDetails.statusString === "Closing process"
                                                                                    ? "badge bg-teal text-light fs-12"
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
                                </>
                            ) : (
                                <Empty />
                            )}
                    </div>
                    {loading ? ( // Render Skeleton while loading is true
                        <>

                        </>
                    ) :
                        totalPages > 1 && (
                            <>
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
                            </>
                        )}

                </Col>
                <Col lg={3}>

                    <Link className="btn btn-primary w-100 mb-4" to="/createproject" >
                        <i className="uil  uil-plus"></i> Create project
                    </Link>

                    <div className="side-bar mt-5 mt-lg-0">
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item ">
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
                                            {liststatuses.map((status) => (
                                                <div className="form-check mt-2" key={status.value}>
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        id={`status-${status.value}`}
                                                        checked={statuses === status.value}
                                                        onChange={() => handleStatusChange(status.value)}
                                                    />
                                                    <label
                                                        className="form-check-label ms-2 text-muted"
                                                        htmlFor={`status-${status.value}`}
                                                    >
                                                        {status.label}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Collapse>
                            </div>
                            {/* <div className="accordion-item mt-3">
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
                            </div> */}
                        </div>
                    </div>
                </Col>

            </Row>

        </React.Fragment>
    );
};

export default ProjectVacancyList;

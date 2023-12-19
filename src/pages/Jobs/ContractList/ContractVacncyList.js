import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Collapse, Input, Label, Row, FormGroup, Card, CardBody } from "reactstrap";
import axios from "axios";
import Select from "react-select";
import JobType from "../../Home/SubSection/JobType";
import { Form } from "react-bootstrap";
import hiringrequestService from "../../../services/hiringrequest.service";
import projectServices from "../../../services/project.services";
import projectTypeServices from "../../../services/projectType.services";
import ProjectType from "../../Home/SubSection/ProjectType";
import { Empty } from 'antd';
import reportServices from "../../../services/report.services";
import { Modal as AntdModal } from "antd";
import img0 from "../../../assets/images/user/img-00.jpg";
import contractServices from "../../../services/contract.services";
import { useNavigate } from "react-router-dom";
import { Skeleton } from 'antd';

const ContractVacncyList = (a) => {
    //Apply Now Model
    const [jobVacancyList, setJobVacancyList] = useState([]);
    const [toggleSecond, setToggleSecond] = useState(true);
    const [statuses, setStatuses] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [selectReportDetail, setSelectReportDetail] = useState({});
    const [projectDetail, setProjectDetail] = useState({});
    const [devInterviewDetail, setDevInterviewDetail] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
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
        { label: 'Pending', value: 1 },
        { label: 'Signed', value: 2 },
        { label: 'Failed', value: 3 },
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
                    <div className="page-link" onClick={() => handlePageClick(i)}>
                        {i}
                    </div>
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
            let status = "";
            if (statuses != 0) {
                status = statuses;
            }
            const inputSearch = search;
            response = await contractServices.getListContractByCompanyIdAndPaging(companyId, currentPage, pageSize, inputSearch, status)
                ;

            setJobVacancyList(response.data.data);

            setTotalPages(Math.ceil(response.data.paging.total / pageSize));
            console.log(totalPages)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error("Error fetching job vacancies:", error);
        }
    };


    const fetchDetailReport = async (reportId) => {
        let response;
        try {
            response = await reportServices.getReportById(reportId);
            console.log(response.data);
            setSelectReportDetail(response.data.data);
        } catch (error) {
            console.error("Error fetching job vacancies:", error);
        }
    };

    const fetchDetailProject = async (projectId) => {
        let response;
        try {
            response = await projectServices.getProjectDetailByProjectId(projectId);
            console.log(response.data);
            setProjectDetail(response.data.data);
        } catch (error) {
            console.error("Error fetching job vacancies:", error);
        }
    };

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
        fetchJobVacancies();
    }, [statuses]);


    const onSearch = () => {
        setLoading(true)
        setCurrentPage(1);
        fetchJobVacancies();
    };

    const openDetailContract = (contractId) => {
        const state = {
            contractId: contractId,
        };
        navigate("/contractDetailHr", { state });
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

    const midleSelect = (developerId, projectId, hiredDeveloperId) => {
        fetchDetailReport(developerId);
        fetchDetailProject(projectId);
        setShowPopup(true);
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
                                            placeholder="Contract code... "
                                            style={{ marginTop: "-10px" }}
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
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
                                {/* Add more Skeleton components as needed */}
                            </>
                        ) : jobVacancyList.length > 0 ? (
                            <>
                                {jobVacancyList.map((jobVacancyListDetails, key) => (
                                    <div
                                        key={key}
                                        className={
                                            " card mt-4"
                                        }
                                        onClick={() => openDetailContract(jobVacancyListDetails.contractId)}

                                    >
                                        <div className="p-4" style={{ color: "black" }}>
                                            <Row className="align-items-center">
                                                <Col md={1}>
                                                    <div className="d-flex justify-content-center">
                                                        <i
                                                            className="uil uil-file-plus-alt"
                                                            style={{ fontSize: "50px" }}
                                                        ></i>
                                                    </div>
                                                </Col>

                                                <Col md={3}>
                                                    <div>
                                                        <h5 className="fs-18 mb-0">
                                                            <div
                                                            >
                                                                {
                                                                    jobVacancyListDetails.contractCode
                                                                }
                                                            </div>
                                                        </h5>
                                                        <p className="text-muted fs-14 mb-0">
                                                            {
                                                                jobVacancyListDetails.companyPartnerName
                                                            }
                                                        </p>
                                                    </div>
                                                </Col>

                                                <Col md={2}>
                                                    <div className="d-flex flex-column gap-1 justify-content-center">
                                                        <div>
                                                            <p className="text-muted mb-0 fs-13">
                                                                Create at
                                                            </p>
                                                            <p
                                                                className="mb-0 fs-17"
                                                                style={{ fontWeight: "600" }}
                                                            >
                                                                {jobVacancyListDetails.createdAt}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-muted mb-0 fs-13">
                                                                Human resource
                                                            </p>
                                                            <p
                                                                className="mb-0 fs-17"
                                                                style={{ fontWeight: "600" }}
                                                            >
                                                                {
                                                                    jobVacancyListDetails.humanResourceName
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Col>

                                                <Col md={2}>
                                                    <div className="d-flex mb-0 align-items-center">
                                                        <div className="flex-shrink-0">
                                                            <i
                                                                className="uil uil-user-check text-primary me-1"
                                                                style={{ fontSize: "19px" }}
                                                            ></i>
                                                        </div>
                                                        <p className="text-muted mb-0">
                                                            {
                                                                jobVacancyListDetails.developerName
                                                            }
                                                        </p>
                                                    </div>
                                                </Col>

                                                <Col
                                                    md={2}
                                                    className="d-flex justify-content-center"
                                                >
                                                    <div>
                                                        <p className="text-muted mb-0 fs-13">
                                                            Date signed
                                                        </p>
                                                        <p
                                                            className="mb-0 fs-17"
                                                            style={{ fontWeight: "600" }}
                                                        >
                                                            {jobVacancyListDetails.dateSigned}
                                                        </p>
                                                    </div>
                                                </Col>

                                                <Col
                                                    md={2}
                                                    className="d-flex justify-content-center"
                                                >
                                                    <div className="d-flex align-items-center">
                                                        <span
                                                            className={
                                                                jobVacancyListDetails.statusString ===
                                                                    "Pending"
                                                                    ? "badge bg-warning text-light fs-12"
                                                                    : jobVacancyListDetails.statusString ===
                                                                        "Signed"
                                                                        ? "badge bg-success text-light fs-12"
                                                                        : jobVacancyListDetails.statusString ===
                                                                            "Failed"
                                                                            ? "badge bg-danger text-light fs-12"
                                                                            : ""
                                                            }
                                                        >
                                                            {
                                                                jobVacancyListDetails.statusString
                                                            }
                                                        </span>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>

                                    </div>
                                ))}
                            </>
                        ) : (
                            <Empty />
                        )}
                    </div>
                    {loading ? ( // Render Skeleton while loading is true
                        <>

                        </>
                    ) : totalPages > 1 && (
                        <>
                            <Row>
                                <Col lg={12} className="mt-4 pt-2">
                                    <nav aria-label="Page navigation example">
                                        <div className="pagination job-pagination mb-0 justify-content-center">
                                            <li
                                                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                                            >
                                                <div
                                                    className="page-link"
                                                    tabIndex="-1"
                                                    onClick={handlePrevPage}
                                                >
                                                    <i className="mdi mdi-chevron-double-left fs-15"></i>
                                                </div>
                                            </li>
                                            {renderPageNumbers()}
                                            <li
                                                className={`page-item ${currentPage === totalPages ? "disabled" : ""
                                                    }`}
                                            >
                                                <div className="page-link" onClick={handleNextPage}>
                                                    <i className="mdi mdi-chevron-double-right fs-15"></i>
                                                </div>
                                            </li>
                                        </div>
                                    </nav>
                                </Col>
                            </Row>
                        </>
                    )}

                </Col>
                <Col lg={3}>
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
                                        Status contract
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
                        </div>
                    </div>
                </Col>

            </Row>

        </React.Fragment>
    );
};

export default ContractVacncyList;

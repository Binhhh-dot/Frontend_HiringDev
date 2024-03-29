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
import userImage0 from "../../../assets/images/user/img-00.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBullhorn,
    faEllipsisVertical,
    faX,
    faPlus,
    faTimes,
    faEllipsis,
    faAngleRight,
    faAngleLeft,
    faGear,
    faCircle,
    faMobileScreen,
    faLocationDot
} from "@fortawesome/free-solid-svg-icons";
import {
    faFlag,
    faCircleXmark,
    faImage,
    faEnvelope,
    faCalendar,

} from "@fortawesome/free-regular-svg-icons";
import { Skeleton } from 'antd';

const ReportVacancyList = (a) => {
    //Apply Now Model
    const [jobVacancyList, setJobVacancyList] = useState([]);
    const [toggleSecond, setToggleSecond] = useState(true);
    const [statuses, setStatuses] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [selectReportDetail, setSelectReportDetail] = useState({});
    const [projectDetail, setProjectDetail] = useState({});
    const [devInterviewDetail, setDevInterviewDetail] = useState([]);
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
        { label: 'Pending', value: 1 },
        { label: 'Processing', value: 2 },
        { label: 'Done', value: 3 },
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
            response = await reportServices.getReportListByCompanyIdAndPaging(companyId, currentPage, pageSize, inputSearch, status)
                ;
            console.log(response.data);
            setJobVacancyList(response.data.data);
            console.log(response.data.paging.total)
            console.log(pageSize)
            setTotalPages(Math.ceil(response.data.paging.total / pageSize));
            console.log(totalPages)
            setLoading(false);
        } catch (error) {
            setLoading(false);
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
        setLoading(true);
        fetchJobVacancies();
    }, [currentPage]);

    useEffect(() => {
        setLoading(true);
        fetchJobVacancies();
    }, [statuses]);


    const onSearch = () => {
        setLoading(true);
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

    const midleSelect = (reportId, projectId, hiredDeveloperId) => {
        fetchDetailReport(reportId);
        fetchDetailProject(projectId);
        // fetchDetailDev(hiredDeveloperId);
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
                                            placeholder="Title report... "
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
                    <AntdModal
                        centered
                        open={showPopup}
                        onOk={() => setShowPopup(false)}
                        onCancel={() => {
                            setShowPopup(false);
                        }}
                        width={1100}
                        footer={null}
                        zIndex={9999}
                    >
                        <Row className="p-3">
                            <Col lg={6} className="border-end ">
                                <div
                                    style={{ width: "98%" }}
                                >
                                    <div className="d-flex justify-content-between gap-2">
                                        <h4 className="mb-0">Report Detail</h4>
                                        <div className="d-flex align-items-center ">
                                            <span
                                                className={
                                                    selectReportDetail.statusString === "Pending"
                                                        ? "badge bg-warning text-light fs-12"
                                                        : selectReportDetail.statusString ===
                                                            "Processing"
                                                            ? "badge bg-blue text-light fs-12"
                                                            : selectReportDetail.statusString ===
                                                                "Done"
                                                                ? "badge bg-newGreen text-light fs-12"
                                                                : ""
                                                }
                                            >
                                                {selectReportDetail.statusString}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <Form action="#" className="auth-form mt-2">
                                    <FormGroup className="mb-3">
                                        <Label
                                            htmlFor="usernameInput"
                                            className="form-label"
                                            style={{ marginBottom: "0px" }}
                                        >
                                            Report Title
                                        </Label>
                                        <Input
                                            type="text"
                                            className="form-control border border-2"
                                            id="interview-title-popup"
                                            style={{
                                                width: "98%",
                                                fontWeight: "500",
                                                borderRadius: "5px",
                                            }}
                                            readOnly={true}
                                            value={selectReportDetail.reportTitle}
                                        />
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <Label
                                            htmlFor="usernameInput"
                                            className="form-label"
                                            style={{ marginBottom: "0px" }}
                                        >
                                            Report Type
                                        </Label>
                                        <Input
                                            type="text"
                                            className="form-control border border-2"
                                            id="description-title-popup"
                                            style={{
                                                width: "98%",
                                                fontWeight: "500",
                                                borderRadius: "5px",
                                            }}
                                            readOnly={true}
                                            value={selectReportDetail.reportTypeTitle}
                                        />
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <Label
                                            htmlFor="usernameInput"
                                            className="form-label"
                                            style={{ marginBottom: "0px" }}
                                        >
                                            Report content
                                        </Label>
                                        <Input
                                            type="textarea"
                                            className="form-control border border-2"
                                            id="date-of-interview-popup"
                                            style={{
                                                width: "98%",
                                                fontWeight: "500",
                                                borderRadius: "5px",
                                            }}
                                            readOnly={true}
                                            value={selectReportDetail.reportContent}
                                        />
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <Label
                                            htmlFor="usernameInput"
                                            className="form-label"
                                            style={{ marginBottom: "0px" }}
                                        >
                                            Response content
                                        </Label>
                                        <Input
                                            type="textarea"
                                            className="form-control border border-2"
                                            id="date-of-interview-popup"
                                            style={{
                                                width: "98%",
                                                fontWeight: "500",
                                                borderRadius: "5px",
                                            }}
                                            readOnly={true}
                                            value={selectReportDetail.responseContent || ""}
                                        />
                                    </FormGroup>
                                </Form>
                            </Col>
                            <Col lg={6} className="border-start ">
                                <Row className="job-overview ">
                                    <div className="list-unstyled mb-0 d-flex flex-column gap-3">
                                        <h4>Project Overview</h4>
                                        <div className="row">
                                            <li className="col-lg-6">
                                                <div className="d-flex">
                                                    <i className="uil uil-parking-square icon bg-primary-subtle text-primary"></i>
                                                    <div className="ms-3">
                                                        <h6 className="fs-14 mb-0">Project </h6>
                                                        <p className="text-muted mb-0" id="projectNameOverview"> {projectDetail.projectName}</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="col-lg-6">
                                                <div className="d-flex ">
                                                    <i className="uil uil-list-ul icon bg-primary-subtle text-primary"></i>
                                                    <div className="ms-3">
                                                        <h6 className="fs-14 mb-0">Project type </h6>
                                                        <p className="text-muted mb-0" id="projectTypeOverview">{projectDetail.projectTypeName}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        </div>
                                        <div className="row">
                                            <li className="col-lg-6">
                                                <div className="d-flex ">
                                                    <i className="uil uil-windsock icon bg-primary-subtle text-primary"></i>
                                                    <div className="ms-3">
                                                        <h6 className="fs-14 mb-0">Start date of project </h6>
                                                        <p className="text-muted mb-0" id="startDayOverview">{projectDetail.startDateMMM}</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="col-lg-6">
                                                <div className="d-flex ">
                                                    <i className="uil uil-times-circle icon bg-primary-subtle text-primary"></i>
                                                    <div className="ms-3">
                                                        <h6 className="fs-14 mb-0">End date of project </h6>
                                                        <p className="text-muted mb-0" id="endDayOverview">{projectDetail.endDateMMM}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        </div>
                                    </div>

                                </Row>
                                <Row className="mt-4">
                                    <Col lg={12} className="d-flex flex-column gap-2">
                                        {selectReportDetail.developerInProject && (
                                            <>
                                                <div style={{ backgroundColor: "white", borderRadius: "15px" }}>
                                                    <CardBody className="p-4 dev-accepted  d-flex flex-column gap-1" style={{ borderRadius: "15px" }}>
                                                        <div className="d-flex mb-2 justify-content-between">
                                                            <div className="d-flex">
                                                                <div
                                                                    className="flex-shrink-0 position-relative"
                                                                // onClick={() =>
                                                                //   openModal(developerState)
                                                                // }
                                                                >
                                                                    <img
                                                                        src={
                                                                            selectReportDetail.developerInProject.userImage ||
                                                                            userImage0
                                                                        }
                                                                        alt=""
                                                                        className="avatar-md rounded"
                                                                    />
                                                                    <span
                                                                        className={
                                                                            selectReportDetail.developerInProject.candidateStatusClassName
                                                                        }
                                                                    ></span>
                                                                </div>
                                                                <div className="ms-3">
                                                                    <div className="primary-link">
                                                                        <h5
                                                                            className="fs-17"
                                                                        // onClick={() =>
                                                                        //   openModal(developerState)
                                                                        // }
                                                                        >
                                                                            {selectReportDetail.developerInProject.firstName} {selectReportDetail.developerInProject.lastName}
                                                                        </h5>
                                                                    </div>
                                                                    <span
                                                                        className={
                                                                            selectReportDetail.developerInProject.hiredDevStatusString ===
                                                                                "Rejected"
                                                                                ? "badge bg-danger text-light mb-2"
                                                                                : selectReportDetail.developerInProject.hiredDevStatusString ===
                                                                                    "Under Consideration"
                                                                                    ? "badge bg-warning text-light mb-2"
                                                                                    : selectReportDetail.developerInProject.hiredDevStatusString ===
                                                                                        "Working"
                                                                                        ? "badge bg-blue text-light mb-2"
                                                                                        : selectReportDetail.developerInProject.hiredDevStatusString ===
                                                                                            "Expired"
                                                                                            ? "badge bg-danger text-light mb-2"
                                                                                            : selectReportDetail.developerInProject.hiredDevStatusString ===
                                                                                                "Cancelled"
                                                                                                ? "badge bg-danger text-light mb-2"
                                                                                                : selectReportDetail.developerInProject.hiredDevStatusString ===
                                                                                                    "Waiting Interview"
                                                                                                    ? "badge bg-warning text-light mb-2"
                                                                                                    : selectReportDetail.developerInProject.hiredDevStatusString ===
                                                                                                        "Onboarding"
                                                                                                        ? "badge bg-primary text-light mb-2"
                                                                                                        : selectReportDetail.developerInProject.hiredDevStatusString ===
                                                                                                            "Saved"
                                                                                                            ? "badge bg-info text-light mb-2"
                                                                                                            : ""
                                                                        }
                                                                    >
                                                                        {selectReportDetail.developerInProject.hiredDevStatusString}
                                                                    </span>{" "}
                                                                </div>
                                                            </div>
                                                            <div className="d-flex gap-1">
                                                                <div
                                                                    className="list-inline-item"
                                                                    data-bs-toggle="tooltip"
                                                                    data-bs-placement="top"
                                                                    // onClick={() => openModal(developerState)}
                                                                    title="View More"
                                                                >
                                                                    <div className="avatar-sm bg-success-subtle text-success d-inline-block text-center rounded-circle fs-18">
                                                                        <i className="mdi mdi-eye"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row" style={{ alignItems: "center" }}>
                                                            <FontAwesomeIcon icon={faEnvelope} className="col-lg-1" style={{ padding: "0px" }} />
                                                            <div className="col-lg-10" style={{ paddingLeft: "0px" }}>
                                                                {selectReportDetail.developerInProject.email}
                                                            </div>
                                                        </div >
                                                        <div className="row" style={{ alignItems: "center" }}>
                                                            <FontAwesomeIcon icon={faMobileScreen} className="col-lg-1" style={{ padding: "0px" }} />
                                                            <div className="col-lg-10" style={{ paddingLeft: "0px" }}>
                                                                {selectReportDetail.developerInProject.phoneNumber}
                                                            </div>
                                                        </div >
                                                        <div className="row" style={{ alignItems: "center" }}>
                                                            <FontAwesomeIcon icon={faLocationDot} className="col-lg-1" style={{ padding: "0px" }} />
                                                            <div className="col-lg-10" style={{ paddingLeft: "0px" }}>
                                                                {selectReportDetail.developerInProject.employmentTypeName}
                                                            </div>
                                                        </div >
                                                        <div className="row" style={{ alignItems: "center" }}>
                                                            <FontAwesomeIcon icon={faFlag} className="col-lg-1" style={{ padding: "0px" }} />
                                                            <div className="col-lg-10" style={{ paddingLeft: "0px" }}>
                                                                Start day:
                                                                {selectReportDetail.developerInProject.startWorkingDate}
                                                            </div>
                                                        </div >
                                                        <div className="row" style={{ alignItems: "center" }}>
                                                            <FontAwesomeIcon icon={faCircleXmark} className="col-lg-1" style={{ padding: "0px" }} />
                                                            <div className="col-lg-10" style={{ paddingLeft: "0px" }}>
                                                                End day:
                                                                {selectReportDetail.developerInProject.endWorkingDate}
                                                            </div>
                                                        </div >


                                                    </CardBody>
                                                </div>
                                            </>
                                        )}
                                    </Col>
                                </Row>
                                {/* ------------------------------------------------------ */}
                            </Col>
                        </Row>
                    </AntdModal>
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
                                        // to={`/projectdetailhr?Id=${jobVacancyListDetails.projectId}`}
                                        onClick={() =>
                                            midleSelect(jobVacancyListDetails.reportId, jobVacancyListDetails.projectId, jobVacancyListDetails.hiredDeveloperId)
                                        }
                                    >
                                        <div className="p-4" style={{ color: "black" }}>
                                            <Row className="align-items-center">
                                                <Col md={2}>
                                                    <div className="d-flex justify-content-center">
                                                        <i
                                                            className="uil uil-clipboard-notes"
                                                            style={{ fontSize: "50px" }}
                                                        ></i>
                                                    </div>
                                                </Col>

                                                <Col md={2}>
                                                    <div>
                                                        <h5 className="fs-18 mb-0">
                                                            <Link
                                                                // to="/listreportinmanagerdetail"
                                                                className="text-dark"
                                                            // state={{
                                                            //     reportId: jobVacancyListDetails.reportId,
                                                            //     developerId:
                                                            //     jobVacancyListDetails.developerId,
                                                            //     projectId: jobVacancyListDetails.projectId,
                                                            // }}
                                                            >
                                                                {jobVacancyListDetails.reportTitle}
                                                            </Link>
                                                        </h5>
                                                        <p className="text-muted fs-14 mb-0">
                                                            {jobVacancyListDetails.companyPartnerName}
                                                        </p>
                                                    </div>
                                                </Col>

                                                <Col md={3}>
                                                    <div className="d-flex flex-column gap-1 justify-content-center">
                                                        <div>
                                                            <p className="text-muted mb-0 fs-13">
                                                                Project Name
                                                            </p>
                                                            <p
                                                                className="mb-0 fs-17"
                                                                style={{ fontWeight: "600" }}
                                                            >
                                                                {jobVacancyListDetails.projectName}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-muted mb-0 fs-13">
                                                                Project Code
                                                            </p>
                                                            <p
                                                                className="mb-0 fs-17"
                                                                style={{ fontWeight: "600" }}
                                                            >
                                                                {jobVacancyListDetails.projectCode}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Col>

                                                <Col md={3}>
                                                    <div className="d-flex flex-column gap-1 justify-content-center">
                                                        <div>
                                                            <p className="text-muted mb-0 fs-13">
                                                                Developer Name
                                                            </p>
                                                            <p
                                                                className="mb-0 fs-17"
                                                                style={{ fontWeight: "600" }}
                                                            >
                                                                {jobVacancyListDetails.developerName}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-muted mb-0 fs-13">
                                                                Developer Code
                                                            </p>
                                                            <p
                                                                className="mb-0 fs-17"
                                                                style={{ fontWeight: "600" }}
                                                            >
                                                                {jobVacancyListDetails.developerCode}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Col>

                                                <Col
                                                    md={2}
                                                    className="d-flex justify-content-start"
                                                >
                                                    <div className="d-flex align-items-center">
                                                        <span
                                                            className={
                                                                jobVacancyListDetails.statusString === "Pending"
                                                                    ? "badge bg-warning text-light fs-12"
                                                                    : jobVacancyListDetails.statusString ===
                                                                        "Processing"
                                                                        ? "badge bg-blue text-light fs-12"
                                                                        : jobVacancyListDetails.statusString ===
                                                                            "Done"
                                                                            ? "badge bg-newGreen text-light fs-12"
                                                                            : ""
                                                            }
                                                        >
                                                            {jobVacancyListDetails.statusString}
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
                                        Status report
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

export default ReportVacancyList;

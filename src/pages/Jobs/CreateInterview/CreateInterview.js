import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Card, CardBody, Col, Modal, ModalBody, Row } from "reactstrap";
import Pagination from "../JobList2/Pagination";
import Section from "./Section";
import developerServices from "../../../services/developer.services";
import interviewServices from "../../../services/interview.services";
import userImage0 from "../../../assets/images/user/img-00.jpg";
import DeveloperDetailInCompanyPopup from "../../Home/SubSection/DeveloperDetailInCompany";
import { useNavigate } from "react-router-dom";


const CreateInterview = () => {
    document.title = "Job Details | Jobcy - Job Listing Template | Themesdesign";

    const { state } = useLocation();
    const [jobListing, setJobListing] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCandidateInfo, setSelectedCandidateInfo] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        const role = localStorage.getItem('role');
        if (role === null) {
            navigate("/signin");
        } else if (role === 'manager') {
            navigate("/error404");
        }
    });
    const fetchListDevInterview = async () => {
        try {
            const response = await developerServices.getListDevWaitingInterview(state.jobId)
            const data = response.data;
            const jobListing = data.data.map((dev) => {
                return {
                    developerId: dev.developerId,
                    userId: dev.userId,
                    codeName: dev.codeName,
                    candidateStatusClassName:
                        "profile-active position-absolute badge rounded-circle bg-success",
                    yearOfExperience: dev.yearOfExperience + " Years Experience",
                    averageSalary: dev.averageSalary,
                    employmentTypeName: dev.employmentTypeName,
                    devStatusString: dev.devStatusString,
                    partTime: true,
                    timing: dev.scheduleTypeName,
                    badges: [
                        {
                            id: 1,
                            badgeclassName: "bg-primary-subtle text-primary",
                            badgeName: dev.levelRequireName,
                        }
                    ]
                };
            });
            setJobListing(jobListing);
        } catch (error) {
            console.error("Error fetching job vacancies:", error);
        }
    };


    useEffect(() => {
        fetchListDevInterview();
    }, []);


    const openModal = (candidateInfo) => {
        setSelectedCandidateInfo(candidateInfo);
        setIsModalOpen(true);
        console.log(candidateInfo);
    };

    const closeModal = () => {
        setSelectedCandidateInfo({});
        setIsModalOpen(false);
    };


    const handleCreateInterview = async () => {
        try {
            const title = document.getElementById("interview-title").value;
            const description = document.getElementById("description").value;
            const dateOfInterview = document.getElementById("date-of-interview").value;

            const startTime = document.getElementById("startTime").value + ":00";
            console.log(startTime)
            const endTime = document.getElementById("endTime").value + ":00";

            const response = await interviewServices.createAnInterview(state.jobId, title, description, dateOfInterview, startTime, endTime);
            const data = response.data;
            if (data.code === 201) {
                try {
                    const response = await developerServices.appectDevToInterview(state.jobId, data.data.interviewId);
                    const data = response.data;
                    console.log(data)
                } catch (error) {
                    console.error("Error:", error);
                }
            }
            console.log(data)
            fetchListDevInterview();
        } catch (error) {
            console.error("Error fetching job vacancies:", error);
        }
    };

    return (
        <React.Fragment>
            <Section />
            <section class="section">
                <div class="">
                    <div class="row  justify-content-center w-100">
                        <div class="col-lg-6 ps-5" >
                            <div class="rounded shadow bg-white p-4">
                                <div class="custom-form">
                                    <div id="message3"></div>
                                    <form method="post" action="php/contact.php" name="contact-form" id="contact-form3">
                                        <h4 class="text-dark mb-3 ">Create Interview :</h4>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Interview Title</label>
                                                    <input id="interview-title" type="text" class="form-control resume" placeholder="" required></input>

                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Date of Interview</label>
                                                    <input id="date-of-interview" type="date" class="form-control resume" placeholder=""></input>

                                                </div>
                                            </div>

                                        </div>




                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Start Time</label>
                                                    <input id="startTime" type="time" class="form-control resume" placeholder=""></input>

                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">End Time</label>
                                                    <input id="endTime" type="time" class="form-control resume" placeholder=""></input>

                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Description</label>
                                                    <textarea id="description" class="form-control resume" placeholder="" style={{ height: 125 }}></textarea>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="row">
                                            <div class="col-lg-12 mt-3 d-flex justify-content-end ">
                                                <button type="button" className="btn btn-primary btn-hover"
                                                    onClick={handleCreateInterview}
                                                >

                                                    Create an interview

                                                </button>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 mb-4">
                            <Row>
                                <Col lg={12}>
                                    {jobListing.map((jobListingDetails, key) => (
                                        <Card className="job-box card " key={key}>
                                            <CardBody className="p-4">
                                                <Row>
                                                    <Col lg={1}>
                                                        <Link onClick={() => openModal(jobListingDetails)}>
                                                            <img
                                                                src={userImage0}
                                                                alt=""
                                                                className="img-fluid rounded-3"
                                                            />
                                                        </Link>
                                                    </Col>

                                                    <Col lg={9}>
                                                        <div className="mt-3 mt-lg-0">
                                                            <h5 className="fs-17 mb-1">
                                                                <Link className="text-dark"
                                                                    onClick={() => openModal(jobListingDetails)}
                                                                >
                                                                    {jobListingDetails.codeName}
                                                                </Link>
                                                            </h5>
                                                            <ul className="list-inline mb-0">
                                                                <li className="list-inline-item">
                                                                    <p className="text-muted fs-14 mb-0">
                                                                        {jobListingDetails.yearOfExperience}
                                                                    </p>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <p className="text-muted fs-14 mb-0">
                                                                        <i className="mdi mdi-map-marker"></i>{" "}
                                                                        {jobListingDetails.employmentTypeName}
                                                                    </p>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <p className="text-muted fs-14 mb-0">
                                                                        <i className="uil uil-wallet"></i>{" "}
                                                                        {jobListingDetails.averageSalary}$
                                                                    </p>
                                                                </li>
                                                            </ul>
                                                            <div className="mt-2">
                                                                <span
                                                                    className={
                                                                        jobListingDetails.fullTime === true
                                                                            ? "badge bg-success-subtle text-success fs-13 mt-1 mx-1"
                                                                            : jobListingDetails.partTime === true
                                                                                ? "badge bg-danger-subtle text-danger fs-13 mt-1 mx-1"
                                                                                : jobListingDetails.freeLance === true
                                                                                    ? "badge bg-primary-subtle text-primary fs-13 mt-1 mx-1"
                                                                                    : jobListingDetails.internship === true
                                                                                        ? "badge bg-blue-subtle text-blue fs-13 mt-1"
                                                                                        : ""
                                                                    }
                                                                >
                                                                    {jobListingDetails.timing}
                                                                </span>
                                                                {(jobListingDetails.badges || []).map(
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
                                                        </div>
                                                    </Col>

                                                    <Col lg={2} className="align-self-center">
                                                        <ul className="list-inline mt-3 mb-0">
                                                            <li
                                                                className="list-inline-item"
                                                                data-bs-toggle="tooltip"
                                                                data-bs-placement="top"
                                                                title="View More"
                                                            >
                                                                <Link
                                                                    onClick={() => openModal(jobListingDetails)}
                                                                    className="avatar-sm bg-success-subtle text-success d-inline-block text-center rounded-circle fs-18"
                                                                >
                                                                    <i className="mdi mdi-eye"></i>
                                                                </Link>
                                                            </li>
                                                            <li
                                                                className="list-inline-item"
                                                                data-bs-toggle="tooltip"
                                                                data-bs-placement="top"
                                                                title="Delete"
                                                            >
                                                                <Link
                                                                    onClick={() => openModal(jobListingDetails)}

                                                                    to="#"
                                                                    className="avatar-sm bg-danger-subtle text-danger d-inline-block text-center rounded-circle fs-18"
                                                                >
                                                                    <i className="uil uil-trash-alt"></i>
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                        </Card>
                                    ))}
                                </Col>
                                <Pagination />
                            </Row>
                        </div>

                        <div>
                            <DeveloperDetailInCompanyPopup
                                isModalOpen={isModalOpen}
                                closeModal={closeModal}
                                devId={selectedCandidateInfo.developerId}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

export default CreateInterview;

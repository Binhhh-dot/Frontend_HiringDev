import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Modal, ModalBody, Row } from "reactstrap";
import Pagination from "../JobList2/Pagination";
import Section from "./Section";

const CreateInterview = () => {
    document.title = "Job Details | Jobcy - Job Listing Template | Themesdesign";
    const [modal, setModal] = useState(false);
    const openModal = () => setModal(!modal);

    const jobListing = [
        {
            id: 1,
            companyImg: null,
            jobDescription: "Business Associate",
            experience: "",
            companyName: "Jobcy Technology Pvt.Ltd",
            location: "California",
            salary: "$250 - $800 / month",
            partTime: true,
            timing: "Part Time",
            badges: [
                {
                    id: 1,
                    badgeclassName: "bg-warning-subtle text-warning",
                    badgeName: "Urgent"
                }
            ]
        },
        {
            id: 2,
            companyImg: null,
            jobDescription: "Marketing Director",
            experience: "2-4 Yrs Exp.",
            companyName: "Creative Agency",
            location: "New York",
            salary: "$250 - $800 / month",
            partTime: true,
            timing: "Part Time",
            badges: [
                {
                    id: 1,
                    badgeclassName: "bg-info-subtle text-info",
                    badgeName: "Private"
                }
            ]
        },
        {
            id: 3,
            companyImg: null,
            jobDescription: "HTML Developer",
            experience: "2-4 Yrs Exp.",
            companyName: "Jobcy Technology Pvt.Ltd",
            location: "California",
            salary: "$250 - $800 / month",
            freeLance: true,
            timing: "Freelance",
            badges: [
                {
                    id: 1,
                    badgeclassName: "bg-blue-subtle text-blue",
                    badgeName: "Internship"
                }
            ]
        },
        {
            id: 4,
            companyImg: null,
            jobDescription: "Product Sales Specialist",
            experience: "5+ Yrs Exp.",
            companyName: "Jobcy Technology Pvt.Ltd",
            location: "California",
            salary: "$250 - $800 / month",
            fullTime: true,
            timing: "Freelance",
            badges: [
                {
                    id: 1,
                    badgeclassName: "bg-info-subtle text-info",
                    badgeName: "Private"
                }
            ]
        },
        {
            id: 5,
            companyImg: null,
            jobDescription: "Product Designer",
            experience: "0-5 Yrs Exp.",
            companyName: "Creative Agency",
            location: "California",
            salary: "$250 - $800 / month",
            internship: true,
            timing: "Internship",
            badges: []
        },
        {
            id: 6,
            companyImg: null,
            jobDescription: "Project Manager",
            experience: "0-2 Yrs Exp.",
            companyName: "Jobcy Technology Pvt.Ltd",
            location: "California",
            salary: "$250 - $800 / month",
            fullTime: true,
            timing: "Freelance",
            badges: [
                {
                    id: 1,
                    badgeclassName: "bg-warning-subtle text-warning",
                    badgeName: "Urgent"
                },
                {
                    id: 2,
                    badgeclassName: "bg-info-subtle text-info",
                    badgeName: "Private"
                }
            ]
        }
    ];
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
                                                    <textarea id="date-of-interview" class="form-control resume" placeholder="" style={{ height: 125 }}></textarea>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="row">
                                            <div class="col-lg-12 mt-2">
                                                <button type="button" className="btn btn-primary" >

                                                    "Post a hiring request"

                                                </button>
                                            </div>
                                            <div class="col-lg-12 mt-2">
                                                <button type="button" className="btn btn-primary" >

                                                    "Save"

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
                                        <Card className="job-box card mt-4" key={key}>
                                            <CardBody className="p-4">
                                                <Row>
                                                    <Col lg={1}>
                                                        <Link to="/companydetails">
                                                            <img
                                                                src={jobListingDetails.companyImg}
                                                                alt=""
                                                                className="img-fluid rounded-3"
                                                            />
                                                        </Link>
                                                    </Col>

                                                    <Col lg={9}>
                                                        <div className="mt-3 mt-lg-0">
                                                            <h5 className="fs-17 mb-1">
                                                                <Link to="/jobdetails" className="text-dark">
                                                                    {jobListingDetails.jobDescription}
                                                                </Link>
                                                            </h5>
                                                            <ul className="list-inline mb-0">
                                                                <li className="list-inline-item">
                                                                    <p className="text-muted fs-14 mb-0">
                                                                        {jobListingDetails.companyName}
                                                                    </p>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <p className="text-muted fs-14 mb-0">
                                                                        <i className="mdi mdi-map-marker"></i>{" "}
                                                                        {jobListingDetails.location}
                                                                    </p>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <p className="text-muted fs-14 mb-0">
                                                                        <i className="uil uil-wallet"></i>{" "}
                                                                        {jobListingDetails.salary}
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
                                                                    to="/jobdetails"
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
                                                                    onClick={openModal}
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

                            <div
                                className="modal fade"
                                id="deleteModal"
                                tabIndex="-1"
                                aria-labelledby="deleteModal"
                                aria-hidden="true"
                            >
                                <div className="modal-dialog modal-dialog-centered">
                                    <Modal isOpen={modal} toggle={openModal} centered>
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="staticBackdropLabel">
                                                Delete Jobs ?
                                            </h5>
                                            <button
                                                type="button"
                                                className="btn-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                            ></button>
                                        </div>
                                        <ModalBody>
                                            <div>
                                                <h6 className="text-danger">
                                                    <i className="uil uil-exclamation-triangle"></i> Warning: Are
                                                    you sure you want to delete job Post ?
                                                </h6>
                                                <p className="text-muted">
                                                    {" "}
                                                    Your jobs post will be permenently removed and you won't be
                                                    able to see them again, including the once you're shared with
                                                    your friends.
                                                </p>
                                            </div>
                                        </ModalBody>
                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                onClick={openModal}
                                                className="btn btn-primary btn-sm"
                                            >
                                                Cancel
                                            </button>
                                            <button type="button" className="btn btn-danger btn-sm">
                                                Yes, delete
                                            </button>
                                        </div>
                                    </Modal>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

export default CreateInterview;

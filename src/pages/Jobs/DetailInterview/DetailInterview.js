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

const DetailInterview = () => {
  document.title = "Job Details | Jobcy - Job Listing Template | Themesdesign";
  const [listDevId, setListDevid] = useState([]);
  const { state } = useLocation();
  const [developerInfo, setDeveloperInfo] = useState([]);
  const { hidingPage, setHingdingPage } = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCandidateInfo, setSelectedCandidateInfo] = useState({});
  const navigate = useNavigate();

  let [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
  useEffect(() => {
    // fetchListDevInterview();
    fetchDetailInterview();
  }, [currentPage]);

  const fetchDetailInterview = async () => {
    try {
      const response = await interviewServices.getDetailInterviewByInterviewId(
        state.interviewId
      );
      const data = response.data;

      document.getElementById("interview-title").innerHTML = data.data.title;
      document.getElementById("description").innerHTML = data.data.description;
      document.getElementById("date-of-interview").innerHTML =
        data.data.dateOfInterview.split("T")[0];
      document.getElementById("startTime").innerHTML = data.data.startTime;
      document.getElementById("endTime").innerHTML = data.data.endTime;
      // var element = document.getElementById("status-interview");

      // if (element) {
      //     // Thay đổi thuộc tính className
      //     element.className = "new-class-name"; // Thay thế "new-class-name" bằng tên lớp bạn muốn thêm hoặc thay đổi.
      // }
      document.getElementById("status-interview").innerHTML =
        data.data.statusString;
      setDeveloperInfo(data.data.developer);

    } catch (error) {
      console.error("Error fetching job vacancies:", error);
    }
  };

  useEffect(() => {
    // fetchListDevInterview();
    changeCss();
  }, []);

  const changeCss = async () => {
    const response = await interviewServices.getDetailInterviewByInterviewId(
      state.interviewId,
      8,
      currentPage
    );
    const data = response.data;
    if (data.paging.total === 1) {
      // Nếu data.paging.total = 1
      // Thay đổi thuộc tính class của thẻ có id "col-1"
      var col1 = document.getElementById("col-1");
      if (col1) {
        col1.className = "col-lg-6 ps-5";
      }
      // Thay đổi thuộc tính class của thẻ có id "col-2"
      var col2 = document.getElementById("col-2");
      if (col2) {
        col2.className = "col-lg-6 mb-4";
      }
      var col3 = document.getElementById("col-3");
      if (col3) {
        col3.className = "mb-2 col-lg-12";
        console.log("thaydoiro");
      }
    }
  };

  const openModal = (candidateInfo) => {
    setSelectedCandidateInfo(candidateInfo);
    setIsModalOpen(true);
    console.log(candidateInfo);
  };

  const closeModal = () => {
    setSelectedCandidateInfo({});
    setIsModalOpen(false);
  };

  // const handleCreateInterview = async () => {
  //     try {
  //         const title = document.getElementById("interview-title").value;
  //         const description = document.getElementById("description").value;
  //         const dateOfInterview = document.getElementById("date-of-interview").value;

  //         const startTime = document.getElementById("startTime").value + ":00";
  //         console.log(startTime)
  //         const endTime = document.getElementById("endTime").value + ":00";

  //         const response = await interviewServices.createAnInterview(state.jobId, title, description, dateOfInterview, startTime, endTime);
  //         let data = response.data;
  //         console.log(data);
  //         if (data.code === 201) {
  //             try {
  //                 const interviewId = data.data.interviewId;
  //                 const response = await developerServices.appectDevToInterview(state.jobId, interviewId, listDevId);
  //             } catch (error) {
  //                 console.error("Error:", error);
  //             }
  //         }
  //         console.log(data)
  //         fetchListDevInterview();
  //     } catch (error) {
  //         console.error("Error fetching job vacancies:", error);
  //     }
  // };

  return (
    <React.Fragment>
      <Section />
      <section class="section">
        <div class="">
          <div class="row  justify-content-center w-100">
            <div class="col-lg-6 ps-5" id="col-1">
              <div class="rounded shadow bg-white p-4">
                <div class="custom-form">
                  <div id="message3"></div>
                  <form
                    style={{ height: "fit-content" }}
                    method="post"
                    action="php/contact.php"
                    name="contact-form"
                    id="contact-form3"
                  >
                    <div className="d-flex justify-content-between mb-3">
                      <h4 class="text-dark ">Detail Interview :</h4>
                      <div>
                        {" "}
                        <span
                          className={
                            "badge bg-success-subtle text-success fs-13 "
                          }
                          id="status-interview"
                        ></span>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group app-label mt-2">
                          <label class="text-muted">Interview Title</label>
                          <div
                            style={{ fontSize: "large", fontWeight: "600" }}
                            id="interview-title"
                            type="text"
                            class="ms-1 resume"
                            placeholder=""
                            required
                            readOnly
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group app-label mt-5">
                          <label class="text-muted">Date of Interview</label>
                          <div
                            style={{ fontSize: "large", fontWeight: "600" }}
                            id="date-of-interview"
                            type="date"
                            class="ms-1 resume"
                            placeholder=""
                            readOnly
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group app-label mt-5">
                          <label class="text-muted">Start Time</label>
                          <div
                            style={{ fontSize: "large", fontWeight: "600" }}
                            id="startTime"
                            type="time"
                            class="ms-1 resume"
                            placeholder=""
                            readOnly
                          ></div>
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="form-group app-label mt-5">
                          <label class="text-muted">End Time</label>
                          <div
                            style={{ fontSize: "large", fontWeight: "600" }}
                            id="endTime"
                            type="time"
                            class="ms-1 resume"
                            placeholder=""
                            readOnly
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group app-label mt-5">
                          <label class="text-muted">Description</label>
                          <div
                            id="description"
                            class="ms-1 resume"
                            placeholder=""
                            style={{
                              height: 125,
                              fontSize: "large",
                              fontWeight: "600",
                            }}
                            readOnly
                          ></div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="col-lg-6 mb-4" id="col-2">
              <Row>
                <Col md={12} className="mb-2 col-lg-12" id="col-3" >
                  <CardBody className="p-3 rounded shadow bg-white">
                    <Row className="d-flex align-items-center">
                      <Col lg={2}>
                        <Link onClick={() => openModal(developerInfo)}>
                          <img
                            src={userImage0}
                            alt=""
                            className="img-fluid rounded-3"
                          />
                        </Link>
                      </Col>

                      <Col lg={8}>
                        <div className="mt-3 mt-lg-0">
                          <h5 className="fs-17 mb-1">
                            <Link
                              className="text-dark"
                              onClick={() => openModal(developerInfo)}
                            >
                              {developerInfo.codeName}
                            </Link>
                          </h5>
                          <ul className="list-inline mb-0">
                            <li className="list-inline-item">
                              <p className="text-muted fs-14 mb-0">
                                {developerInfo.yearOfExperience}
                              </p>
                            </li>
                            <li className="list-inline-item">
                              <p className="text-muted fs-14 mb-0">
                                <i className="mdi mdi-map-marker"></i>{" "}
                                {developerInfo.employmentTypeName}
                              </p>
                            </li>
                            <li className="list-inline-item">
                              <p className="text-muted fs-14 mb-0">
                                <i className="uil uil-wallet"></i>{" "}
                                {developerInfo.averageSalary}$
                              </p>
                            </li>
                          </ul>
                          <div className="mt-2">
                            <span
                              className={
                                developerInfo.fullTime === true
                                  ? "badge bg-success-subtle text-success fs-13 mt-1 mx-1"
                                  : developerInfo.partTime === true
                                    ? "badge bg-danger-subtle text-danger fs-13 mt-1 mx-1"
                                    : developerInfo.freeLance === true
                                      ? "badge bg-primary-subtle text-primary fs-13 mt-1 mx-1"
                                      : developerInfo.internship === true
                                        ? "badge bg-blue-subtle text-blue fs-13 mt-1"
                                        : ""
                              }
                            >
                              {developerInfo.timing}
                            </span>
                            {(developerInfo.badges || []).map(
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

                      <Col
                        lg={2}
                        className="d-flex justify-content-center align-self-center"
                      >
                        <ul className="list-inline mt-3 mb-0">
                          <li
                            className="list-inline-item"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="View More"
                          >
                            <Link
                              onClick={() => openModal(developerInfo)}
                              className="avatar-sm bg-success-subtle text-success d-inline-block text-center rounded-circle fs-18"
                            >
                              <i className="mdi mdi-eye"></i>
                            </Link>
                          </li>
                        </ul>
                      </Col>
                    </Row>
                  </CardBody>
                </Col>
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

export default DetailInterview;

import React from "react";
import { Link } from "react-router-dom";
import { Button, CardBody, Col, Row } from "reactstrap";

//Import images
import userImage1 from "../../../assets/images/user/img-01.jpg";
import userImage2 from "../../../assets/images/user/img-02.jpg";
import userImage3 from "../../../assets/images/user/img-03.jpg";
import userImage4 from "../../../assets/images/user/img-04.jpg";
import userImage5 from "../../../assets/images/user/img-05.jpg";
import userImage6 from "../../../assets/images/user/img-06.jpg";
import userImage7 from "../../../assets/images/user/img-07.jpg";
import userImage8 from "../../../assets/images/user/img-08.jpg";

const AssignTaskListDetails = () => {
  const candidateDetails = [
    {
      id: 1,
      userImg: userImage1,
      candidateName: "Charles Dickens",
      candidateDesignation: "Project Manager",
      location: "Oakridge Lane Richardson",
      salary: "$650 / hours",
      rating: 4.8,
      ratingClass: "badge bg-success ms-1",
      addclassNameBookmark: false,
      badges: [
        {
          id: 1,
          badgeName: "Leader",
          classname: "success",
        },
        {
          id: 2,
          badgeName: "Manager",
          classname: "primary",
        },
        {
          id: 2,
          badgeName: "Developer",
          classname: "warning",
        },
      ],
    },
    {
      id: 2,
      userImg: userImage2,
      candidateName: "Gabriel Palmer",
      candidateDesignation: "HTML Developer",
      location: "Oakridge Lane California",
      salary: "$250 / hours",
      rating: 3.4,
      ratingClass: "badge bg-warning ms-1",
      addclassNameBookmark: true,
      badges: [
        {
          id: 1,
          badgeName: "Design",
          classname: "info",
        },
        {
          id: 2,
          badgeName: "Developer",
          classname: "primary",
        },
      ],
    },
    {
      id: 3,
      userImg: userImage3,
      candidateName: "Rebecca Swartz ",
      candidateDesignation: "Graphic Designer",
      location: "Oakridge Lane Richardson",
      salary: "$380 / hours",
      rating: 4.3,
      ratingClass: "badge bg-success ms-1",
      addclassNameBookmark: false,
      badges: [
        {
          id: 1,
          badgeName: "Design",
          classname: "success",
        },
        {
          id: 2,
          badgeName: "Developer",
          classname: "primary",
        },
      ],
    },
    {
      id: 4,
      userImg: userImage4,
      candidateName: "Betty Richards",
      candidateDesignation: "Education Training",
      location: "Oakridge Lane Richardson",
      salary: "$650 / hours",
      rating: 4.5,
      ratingClass: "badge bg-success ms-1",
      addclassNameBookmark: true,
      badges: [
        {
          id: 1,
          badgeName: "Trainer",
          classname: "warning",
        },
        {
          id: 2,
          badgeName: "Adobe illustrator",
          classname: "info",
        },
      ],
    },
    {
      id: 5,
      userImg: userImage5,
      candidateName: "Jeffrey Montgomery",
      candidateDesignation: "Restaurant Team Member",
      location: "Oakridge Lane Richardson",
      salary: "$125 / hours",
      rating: 4.9,
      ratingClass: "badge bg-success ms-1",
      addclassNameBookmark: false,
      badges: [
        {
          id: 1,
          badgeName: "Trainer",
          classname: "primary",
        },
        {
          id: 2,
          badgeName: "Adobe illustrator",
          classname: "warning",
        },
      ],
    },
    {
      id: 6,
      userImg: userImage6,
      candidateName: "Milton Osborn",
      candidateDesignation: "Assistant / Store Keeper",
      location: "Oakridge Lane Richardson",
      salary: "$455 / hours",
      rating: 2.5,
      ratingClass: "badge bg-danger ms-1",
      addclassNameBookmark: false,
      badges: [
        {
          id: 1,
          badgeName: "Trainer",
          classname: "info",
        },
        {
          id: 2,
          badgeName: "Adobe illustrator",
          classname: "primary",
        },
      ],
    },
    {
      id: 7,
      userImg: userImage7,
      candidateName: "Harold Jordan",
      candidateDesignation: "Executive, HR Operations",
      location: "Oakridge Lane Richardson",
      salary: "$799 / hours",
      rating: 4.9,
      ratingClass: "badge bg-success ms-1",
      addclassNameBookmark: false,
      badges: [
        {
          id: 1,
          badgeName: "Trainer",
          classname: "success",
        },
        {
          id: 2,
          badgeName: "Adobe illustrator",
          classname: "primary",
        },
      ],
    },
    {
      id: 8,
      userImg: userImage8,
      candidateName: "MichaeL Drake ",
      candidateDesignation: "Full Stack Engineer",
      location: "Oakridge Lane Richardson",
      salary: "$240 / hours",
      rating: 3.9,
      ratingClass: "badge bg-warning ms-1",
      addclassNameBookmark: false,
      badges: [
        {
          id: 1,
          badgeName: "Trainer",
          classname: "info",
        },
        {
          id: 2,
          badgeName: "Adobe illustrator",
          classname: "warning",
        },
      ],
    },
  ];
  return (
    <React.Fragment>
      {/* <Row className="align-items-center">
        <Col lg={8}>
          <div className="mb-3 mb-lg-0">
            <h6 className="fs-16 mb-0"> Showing 1 – 8 of 11 results </h6>
          </div>
        </Col>

        <Col lg={4}>
          <div className="candidate-list-widgets">
            <Row>
              <Col lg={6}>
                <div className="selection-widget">
                  <select
                    className="form-select"
                    data-trigger
                    name="choices-single-filter-orderby"
                    id="choices-single-filter-orderby"
                    aria-label="Default select example"
                  >
                    <option value="df">Default</option>
                    <option value="ne">Newest</option>
                    <option value="od">Oldest</option>
                    <option value="rd">Random</option>
                  </select>
                </div>
              </Col>
              <Col lg={6}>
                <div className="selection-widget mt-2 mt-lg-0">
                  <select
                    className="form-select"
                    data-trigger
                    name="choices-candidate-page"
                    id="choices-candidate-page"
                    aria-label="Default select example"
                  >
                    <option value="df">All</option>
                    <option value="ne">8 per Page</option>
                    <option value="ne">12 per Page</option>
                  </select>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row> */}

      <Row>
        <Col lg={6}>
          <div class="rounded shadow bg-white p-4">
            <div class="custom-form">
              <div id="message3"></div>
              <form
                method="post"
                action="php/contact.php"
                name="contact-form"
                id="contact-form3"
              >
                <h4 class="text-dark mb-3 "> Form Create Task</h4>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group app-label mt-2">
                      <label class="text-muted">Task Title</label>
                      <input
                        id="interview-title"
                        type="text"
                        class="form-control resume"
                        placeholder=""
                        required
                      ></input>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group app-label mt-2">
                      <label class="text-muted">Date Start Task</label>
                      <input
                        id="date-of-interview"
                        type="date"
                        class="form-control resume"
                        placeholder=""
                      ></input>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group app-label mt-2">
                      <label class="text-muted">Start Time</label>
                      <input
                        id="startTime"
                        type="time"
                        class="form-control resume"
                        placeholder=""
                      ></input>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group app-label mt-2">
                      <label class="text-muted">End Time</label>
                      <input
                        id="endTime"
                        type="time"
                        class="form-control resume"
                        placeholder=""
                      ></input>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group app-label mt-2">
                      <label class="text-muted">Description</label>
                      <textarea
                        id="description"
                        class="form-control resume"
                        placeholder=""
                        style={{ height: 125 }}
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-lg-12 mt-3 d-flex justify-content-end ">
                    <button
                      type="button"
                      className="btn btn-primary btn-hover"
                      // onClick={}
                    >
                      Create Task
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Col>
        <Col lg={6}>
          <Row>
            <Col>
              <div className="d-flex justify-content-end">
                <div></div>
                <div style={{ width: "30%" }}>
                  <div className="selection-widget">
                    <select
                      className="form-select"
                      data-trigger
                      name="choices-single-filter-orderby"
                      id="choices-single-filter-orderby"
                      aria-label="Default select example"
                    >
                      <option value="df">Default</option>
                      <option value="ne">Staff 1</option>
                      <option value="od">Staff 2</option>
                      <option value="rd">Staff 3</option>
                      <option value="rd">Staff 4</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <div className="candidate-list-box card">
                  <CardBody className="p-4">
                    <Row className="align-items-center">
                      <div className="col-auto">
                        <div className="candidate-list-images">
                          <Link to="#">
                            <img
                              src={userImage5}
                              alt=""
                              className="avatar-md img-thumbnail rounded-circle"
                            />
                          </Link>
                        </div>
                      </div>
                      <Col lg={5}>
                        <div className="candidate-list-content mt-3 mt-lg-0">
                          <h5 className="fs-19 mb-0">
                            <Link
                              to="/candidatedetails"
                              className="primary-link"
                            >
                              {"Teo"}
                            </Link>

                            <span className={"candidateDetailsNew.ratingClass"}>
                              <i className="mdi mdi-star align-middle"></i>
                              {4}
                            </span>
                          </h5>
                          <p className="text-muted mb-2"> {"Manager"}</p>
                          <ul className="list-inline mb-0 text-muted">
                            <li className="list-inline-item">
                              <i className="mdi mdi-map-marker"></i> {"Ben Tre"}
                            </li>
                            <br />
                            <li className="list-inline-item">
                              <i className="uil uil-wallet"></i> {"5000"}$
                            </li>
                          </ul>
                        </div>
                      </Col>

                      <Col lg={4}>
                        <div className="mt-2 mt-lg-0 d-flex flex-wrap align-items-start gap-1">
                          ABC DEF XYZ
                          {/* {(candidateDetailsNew.badges || []).map(
                            (badgesInner, key) => (
                              <span
                                className={`badge bg-${badgesInner.classname}-subtle text-${badgesInner.classname} fs-14 mt-1`}
                                key={key}
                              >
                                {badgesInner.badgeName}
                              </span>
                            )
                          )} */}
                        </div>
                      </Col>
                    </Row>
                    <div className="favorite-icon">
                      <Link to="#">
                        <i className="uil uil-heart-alt fs-18"></i>
                      </Link>
                    </div>
                  </CardBody>
                </div>
              </div>
            </Col>
            <div className="border-bottom border-4 mt-3"></div>
          </Row>

          <Row>
            <Col>
              <div className="d-flex justify-content-between mt-3 mb-2">
                <div className="d-flex">
                  <div className="checkbox-all-wrapper-hiring-detail-manager d-flex align-items-center">
                    <label>
                      <input
                        type="checkbox"
                        // checked={}
                        // onChange={}
                      />
                      <span className="checkbox"></span>
                    </label>
                  </div>

                  <div className="d-flex align-items-center ms-2">
                    <h4 style={{ display: "contents" }}>
                      Select All Developer
                    </h4>
                  </div>
                </div>

                <div>
                  <button className="btn btn-primary btn-hover">
                    Select Developer
                  </button>
                </div>
              </div>
              <div>
                {" "}
                <div
                  className="candidate-list"
                  style={{ maxHeight: "400px", overflowY: "auto" }}
                >
                  {candidateDetails.map((candidateDetailsNew, key) => (
                    <div
                      key={key}
                      className={
                        candidateDetailsNew.addclassNameBookmark === true
                          ? "candidate-list-box bookmark-post card mt-3"
                          : "candidate-list-box card mt-3"
                      }
                    >
                      <CardBody className="p-4">
                        <Row className="align-items-center">
                          <Col lg={1}>
                            <div className="checkbox-wrapper-hiring-detail-manager d-flex justify-content-center">
                              <label>
                                <input
                                  type="checkbox"
                                  // checked onChange={}
                                />
                                <span className="checkbox"></span>
                              </label>
                            </div>
                          </Col>
                          <div className="col-auto">
                            <div className="candidate-list-images">
                              <Link to="#">
                                <img
                                  src={candidateDetailsNew.userImg}
                                  alt=""
                                  className="avatar-md img-thumbnail rounded-circle"
                                />
                              </Link>
                            </div>
                          </div>
                          <Col lg={5}>
                            <div className="candidate-list-content mt-3 mt-lg-0">
                              <h5 className="fs-19 mb-0">
                                <Link
                                  to="/candidatedetails"
                                  className="primary-link"
                                >
                                  {candidateDetailsNew.candidateName}
                                </Link>

                                <span
                                  className={candidateDetailsNew.ratingClass}
                                >
                                  <i className="mdi mdi-star align-middle"></i>
                                  {candidateDetailsNew.rating}
                                </span>
                              </h5>
                              <p className="text-muted mb-2">
                                {" "}
                                {candidateDetailsNew.candidateDesignation}
                              </p>
                              <ul className="list-inline mb-0 text-muted">
                                <li className="list-inline-item">
                                  <i className="mdi mdi-map-marker"></i>{" "}
                                  {candidateDetailsNew.location}
                                </li>
                                <li className="list-inline-item">
                                  <i className="uil uil-wallet"></i>{" "}
                                  {candidateDetailsNew.salary}
                                </li>
                              </ul>
                            </div>
                          </Col>

                          <Col lg={4}>
                            <div className="mt-2 mt-lg-0 d-flex flex-wrap align-items-start gap-1">
                              {(candidateDetailsNew.badges || []).map(
                                (badgesInner, key) => (
                                  <span
                                    className={`badge bg-${badgesInner.classname}-subtle text-${badgesInner.classname} fs-14 mt-1`}
                                    key={key}
                                  >
                                    {badgesInner.badgeName}
                                  </span>
                                )
                              )}
                            </div>
                          </Col>
                        </Row>
                        <div className="favorite-icon">
                          <Link to="#">
                            <i className="uil uil-heart-alt fs-18"></i>
                          </Link>
                        </div>
                      </CardBody>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default AssignTaskListDetails;

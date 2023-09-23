import React from "react";
import { Link } from "react-router-dom";
import { CardBody, Col, Row } from "reactstrap";

//Import images
import userImage1 from "../../../assets/images/user/img-01.jpg";
import userImage2 from "../../../assets/images/user/img-02.jpg";
import userImage3 from "../../../assets/images/user/img-03.jpg";
import userImage4 from "../../../assets/images/user/img-04.jpg";
import userImage5 from "../../../assets/images/user/img-05.jpg";
import userImage6 from "../../../assets/images/user/img-06.jpg";
import userImage7 from "../../../assets/images/user/img-07.jpg";
import userImage8 from "../../../assets/images/user/img-08.jpg";

const DeveloperDetails = () => {
  const candidateDetails = [
    {
      id: 1,
      userImg: userImage1,
      candidateName: "Charles Dickens",
      candidateDesignation: "Project Manager",
      location: "Oakridge Lane Richardson",
      salary: "Average Salary: $650",
      rating: 4,
      ratingClass: "badge bg-dark bg-gradient ms-1",
      addclassNameBookmark: false,
      badges: [
        {
          id: 1,
          badgeName: "Active",
          classname: "success",
        },
        {
          id: 2,
          badgeName: "Working On Project",
          classname: "warning",
        },
        {
          id: 2,
          badgeName: "Unavailable",
          classname: "danger",
        },
      ],
    },
    {
      id: 2,
      userImg: userImage2,
      candidateName: "Gabriel Palmer",
      candidateDesignation: "HTML Developer",
      location: "Oakridge Lane California",
      salary: "Average Salary: $250",
      rating: 3,
      ratingClass: "badge bg-dark bg-gradient ms-1",
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
      salary: "Average Salary: $380",
      rating: 4,
      ratingClass: "badge bg-dark bg-gradient ms-1",
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
      salary: "Average Salary: $650",
      rating: 4,
      ratingClass: "badge bg-dark bg-gradient ms-1",
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
      salary: "Average Salary: $125",
      rating: 4,
      ratingClass: "badge bg-dark bg-gradient ms-1",
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
      salary: "Average Salary: $455",
      rating: 2,
      ratingClass: "badge bg-dark bg-gradient ms-1",
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
      salary: "Average Salary: $799",
      rating: 4,
      ratingClass: "badge bg-dark bg-gradient ms-1",
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
      salary: "Average Salary: $240",
      rating: 3,
      ratingClass: "badge bg-dark bg-gradient ms-1",
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
      <Row className="align-items-center">
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
                    <option value="ne">Available</option>
                    <option value="od">Unavailable</option>
                    <option value="rd">Working On Project</option>
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
      </Row>
      <div className="candidate-list">
        {candidateDetails.map((candidateDetailsNew, key) => (
          <div
            key={key}
            className={
              candidateDetailsNew.addclassNameBookmark === true
                ? "candidate-list-box bookmark-post card mt-4"
                : "candidate-list-box card mt-4"
            }
          >
            <CardBody className="p-4">
              <Row className="align-items-center">
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
                <Col lg={7}>
                  <div className="candidate-list-content mt-3 mt-lg-0">
                    <h5 className="fs-19 mb-0">
                      <Link to="/developerinfo" className="primary-link">
                        {candidateDetailsNew.candidateName}
                      </Link>

                      <span className={candidateDetailsNew.ratingClass}>
                        <i className="mdi mdi-star align-middle"></i>
                        Year Of Experience:
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
            </CardBody>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default DeveloperDetails;

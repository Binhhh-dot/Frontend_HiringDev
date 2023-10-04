import React from "react";
import { Link } from "react-router-dom";
import { CardBody, Col, Row } from "reactstrap";
import "./custome.css";

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
      location: "Senior Javascript/Nodejs",
      salary: "Average Salary: $650",
      rating: 4,
      ratingClass: "badge bg-secondary bg-gradient ms-1",
      addclassNameBookmark: false,
      progress: 100,
      badges: [
        {
          id: 1,
          badgeName: "Manage",
          classname: "success",
        },
      ],
    },
    {
      id: 2,
      userImg: userImage2,
      candidateName: "Gabriel Palmer",
      candidateDesignation: "HTML Developer",
      location: "Junior C#",
      salary: "Average Salary: $250",
      rating: 3,
      ratingClass: "badge bg-secondary bg-gradient ms-1",
      addclassNameBookmark: true,
      progress: 60,
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
      location: "Leader Photoshop/Adobe InDesign",
      salary: "Average Salary: $380",
      rating: 4,
      ratingClass: "badge bg-secondary bg-gradient ms-1",
      addclassNameBookmark: false,
      progress: 80,
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
      location: "Senior Java/Springboot",
      salary: "Average Salary: $650",
      rating: 4,
      ratingClass: "badge bg-secondary bg-gradient ms-1",
      addclassNameBookmark: true,
      progress: 70,
      badges: [
        {
          id: 1,
          badgeName: "C++",
          classname: "primary",
        },
        {
          id: 2,
          badgeName: "UI/UX",
          classname: "info",
        },
      ],
    },
    {
      id: 5,
      userImg: userImage5,
      candidateName: "Jeffrey Montgomery",
      candidateDesignation: "Restaurant Team Member",
      location: "Fresher Javascript",
      salary: "Average Salary: $125",
      rating: 4,
      ratingClass: "badge bg-secondary bg-gradient ms-1",
      addclassNameBookmark: false,
      progress: 10,
      badges: [
        {
          id: 1,
          badgeName: "Javascript",
          classname: "primary",
        },
        {
          id: 2,
          badgeName: "Ruby",
          classname: "primary",
        },
      ],
    },
    {
      id: 6,
      userImg: userImage6,
      candidateName: "Milton Osborn",
      candidateDesignation: "Assistant / Store Keeper",
      location: "Senior Machine Leaning",
      salary: "Average Salary: $455",
      rating: 2,
      ratingClass: "badge bg-secondary bg-gradient ms-1",
      addclassNameBookmark: false,
      progress: 80,
      badges: [
        {
          id: 1,
          badgeName: "C#",
          classname: "primary",
        },
        {
          id: 2,
          badgeName: "Java",
          classname: "primary",
        },
      ],
    },
    {
      id: 7,
      userImg: userImage7,
      candidateName: "Harold Jordan",
      candidateDesignation: "Executive, HR Operations",
      location: "Fresher Ruby",
      salary: "Average Salary: $799",
      rating: 4,
      ratingClass: "badge bg-secondary bg-gradient ms-1",
      addclassNameBookmark: false,
      progress: 29,
      badges: [
        {
          id: 1,
          badgeName: "Reactjs",
          classname: "primary",
        },
        {
          id: 2,
          badgeName: "Nodejs",
          classname: "primary",
        },
      ],
    },
    {
      id: 8,
      userImg: userImage8,
      candidateName: "MichaeL Drake ",
      candidateDesignation: "Full Stack Engineer",
      location: "Leader AWS Cloud",
      salary: "Average Salary: $240",
      rating: 3,
      ratingClass: "badge bg-secondary bg-gradient ms-1",
      addclassNameBookmark: false,
      progress: 100,
      badges: [
        {
          id: 1,
          badgeName: "BA",
          classname: "primary",
        },
        {
          id: 2,
          badgeName: "Tester",
          classname: "primary",
        },
      ],
    },
  ];

  const getBarColor = (progress) => {
    if (progress <= 30) {
      return "red";
    } else if (progress <= 50) {
      return "#FFD700";
    } else if (progress <= 80) {
      return "skyblue";
    } else {
      return "green";
    }
  };

  return (
    <React.Fragment>
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
                <Col lg={6}>
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
                        <i className="uil-keyboard"></i>{" "}
                        {candidateDetailsNew.location}
                      </li>
                      <br />
                      <li className="list-inline-item">
                        <i className="uil uil-wallet"></i>{" "}
                        {candidateDetailsNew.salary}
                      </li>
                    </ul>
                  </div>
                </Col>

                <Col lg={2}>
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

                <Col lg={3} className="border-start border-3">
                  <div className="left-side-matching ">
                    <div>
                      <div className="matching-rate-dev">
                        <span
                          className="percent-matching"
                          style={{
                            color: getBarColor(candidateDetailsNew.progress),
                          }}
                        >
                          {candidateDetailsNew.progress}%
                        </span>
                        <span style={{ fontSize: "80%" }}>
                          Matching with requirement
                        </span>
                      </div>
                    </div>
                    {/* Chèn thanh tiến trình */}
                    <div className="matching-bar border border-2 ">
                      <div
                        className="match-level"
                        style={{
                          width: `${candidateDetailsNew.progress}%`,
                          backgroundColor: getBarColor(
                            candidateDetailsNew.progress
                          ),
                        }}
                      ></div>
                    </div>
                    <div className="send-matching-dev">
                      <button className="button-82-pushable" role="button">
                        <span className="button-82-shadow"></span>
                        <span className="button-82-edge"></span>
                        <span className="button-82-front text">Send</span>
                      </button>
                    </div>
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

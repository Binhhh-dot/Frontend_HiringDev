import React, { useState, useEffect } from "react";
import hiringrequestService from "../../../services/hiringrequest.service";
const DeveloperDetailInManager = ({ devId }, ...props) => {
  const [devInformationInManager, setDevInformationInManager] = useState(null);

  const fetchGetDeveloperDetailInManager = async () => {
    let response;

    try {
      response = await hiringrequestService.getDeveloperDetailInManager(devId);
      setDevInformationInManager(response.data.data);
      console.log(response);
      return response;
    } catch (error) {
      console.error("Error fetching develper detail:", error);
    }
  };

  useEffect(() => {
    fetchGetDeveloperDetailInManager();
  }, []);

  if (!devInformationInManager) {
    return null;
  }
  // thay selectedCandidateInfo bang devInformationInManager
  return (
    <React.Fragment>
      <div>
        <Row>
          <Col lg={4}>
            <Card className="side-bar Modal-info-dev-left">
              <CardBody className="p-4">
                <div className="candidate-profile text-center">
                  <img
                    src={devInformationInManager.userImg}
                    alt=""
                    className="avatar-lg rounded-circle"
                  />
                  <h6 className="fs-18 mb-0 mt-4">
                    {devInformationInManager.firstName}
                    {devInformationInManager.lastName}
                  </h6>
                </div>
              </CardBody>
              <CardBody className="candidate-profile-overview border-top p-4">
                <h6 className="fs-17 fw-semibold mb-3">Profile Overview</h6>
                <ul className="list-unstyled mb-0">
                  <li>
                    <div className="d-flex">
                      <label className="text-dark">Name</label>
                      <div>
                        <p className="text-muted mb-0">
                          {" "}
                          {devInformationInManager.lastName}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex">
                      <label className="text-dark">Date of Birth</label>
                      <div>
                        <p className="text-muted mb-0">
                          {devInformationInManager.dateOfBirth}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex">
                      <label className="text-dark">Gender</label>
                      <div>
                        <p className="text-muted mb-0">Female</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex">
                      <label className="text-dark">Average Salary</label>
                      <div>
                        <p className="text-muted mb-0">
                          {devInformationInManager.averageSalary}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex">
                      <label className="text-dark">Year Experience</label>
                      <div>
                        <p className="text-muted mb-0 ms-2">
                          {devInformationInManager.yearOfExperience}
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </CardBody>
              <CardBody className="p-4 border-top">
                <div className="border-bottom pb-3">
                  <h6 className="fs-17 fw-semibold mb-3">Type of Developer</h6>
                  <div className="d-flex flex-wrap align-items-start gap-1">
                    <span className="badge bg-success-subtle text-success fs-13 mt-1">
                      {devInformationInManager.typeName}
                    </span>
                    <span className="badge bg-success-subtle text-success fs-13 mt-1">
                      AWS Developer
                    </span>
                  </div>
                </div>

                <div className="mt-3 border-bottom pb-3">
                  <h6 className="fs-17 fw-semibold mb-3">Level of Developer</h6>
                  <div className="d-flex flex-wrap align-items-start gap-1">
                    <span className="badge bg-success-subtle text-success fs-13 mt-1">
                      {devInformationInManager.levelName}
                    </span>
                  </div>
                </div>

                <div className="mt-3">
                  <h6 className="fs-17 fw-semibold mb-3">Skill of Developer</h6>
                  <div className="d-flex flex-wrap align-items-start gap-1">
                    <span className="badge bg-success-subtle text-success fs-13 mt-1">
                      Springboot
                    </span>
                    {devInformationInManager.skillName}
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          {/* khúc này m thêm mấy phần description vô */}
          <Col lg={8}>
            <Card className="candidate-details mt-4 mt-lg-0 Modal-info-dev-right">
              <CardBody className="p-4 candidate-personal-detail">
                <div>
                  <h6 className="fs-17 fw-semibold mb-3 fw-bold">Summary</h6>
                  <p className="text-muted mb-2">
                    Very well thought out and articulate communication. Clear
                    milestones, deadlines and fast work. Patience. Infinite
                    patience. No shortcuts.
                  </p>
                </div>
                <div className="candidate-education-details mt-3 pt-3">
                  <h6 className="fs-17 fw-bold mb-0">Education</h6>
                  <div className="candidate-education-content mt-4 d-flex">
                    <div className="circle flex-shrink-0 bg-primary-subtle text-primary">
                      {" "}
                      B{" "}
                    </div>
                    <div className="ms-2">
                      <h6 className="fs-16 mb-1">
                        BCA - Bachelor of Computer Applications
                      </h6>
                      <p className="mb-2 text-muted">
                        International University - (2004 - 2010)
                      </p>
                      <p className="text-muted">
                        There are many variations of passages of available, but
                        the majority alteration in some form.
                      </p>
                    </div>
                  </div>
                  <div className="candidate-education-content mt-4 d-flex">
                    <div className="circle flex-shrink-0 bg-primary-subtle text-primary">
                      {" "}
                      M{" "}
                    </div>
                    <div className="ms-2">
                      <h6 className="fs-16 mb-1">
                        MCA - Master of Computer Application
                      </h6>
                      <p className="mb-2 text-muted">
                        International University - (2010 - 2012)
                      </p>
                      <p className="text-muted">
                        There are many variations of passages of available, but
                        the majority alteration in some form.
                      </p>
                    </div>
                  </div>
                  <div className="candidate-education-content mt-4 d-flex">
                    <div className="circle flex-shrink-0 bg-primary-subtle text-primary">
                      {" "}
                      D{" "}
                    </div>
                    <div className="ms-2">
                      <h6 className="fs-16 mb-1">
                        Design Communication Visual
                      </h6>
                      <p className="text-muted mb-2">
                        International University - (2012-2015)
                      </p>
                      <p className="text-muted">
                        There are many variations of passages of available, but
                        the majority alteration in some form.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="candidate-education-details mt-3 pt-3">
                  <h6 className="fs-17 fw-bold mb-0">
                    Professional Experience
                  </h6>
                  <div className="candidate-education-content mt-4 d-flex">
                    <div className="circle flex-shrink-0 bg-primary-subtle text-primary">
                      {" "}
                      W{" "}
                    </div>
                    <div className="ms-2">
                      <h6 className="fs-16 mb-1">
                        Web Design & Development Team Leader
                      </h6>
                      <p className="mb-2 text-muted">
                        Creative Agency - (2013 - 2016)
                      </p>
                      <p className="text-muted">
                        There are many variations of passages of available, but
                        the majority alteration in some form.
                      </p>
                    </div>
                  </div>
                  <div className="candidate-education-content mt-4 d-flex">
                    <div className="circle flex-shrink-0 bg-primary-subtle text-primary">
                      {" "}
                      P{" "}
                    </div>
                    <div className="ms-2">
                      <h6 className="fs-16 mb-1">Project Manager</h6>
                      <p className="mb-2 text-muted">
                        Jobcy Technology Pvt.Ltd - (Pressent)
                      </p>
                      <p className="text-muted mb-0">
                        There are many variations of passages of available, but
                        the majority alteration in some form.
                      </p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default DeveloperDetailInManager;

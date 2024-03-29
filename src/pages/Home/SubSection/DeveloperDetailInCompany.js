import React, { useState, useEffect } from "react";
import hiringrequestService from "../../../services/hiringrequest.service";
import { Row, Col, Card, CardBody, Modal, ModalBody, Button } from "reactstrap";
import userImage0 from "../../../assets/images/user/img-00.jpg";
import educationServices from "../../../services/education.services";
import professionalExperienceServices from "../../../services/professionalExperience.services";

const DeveloperDetailInCompanyPopup = (
  { isModalOpen, closeModal, devId },
  ...props
) => {
  const [developerInfo, setDeveloperInfo] = useState(null);
  const [educationInfo, setEducationInfo] = useState([]);
  const [professInfo, setProfessInfo] = useState([]);
  const fetchGetDeveloperDetailInManager = async () => {
    let response;
    try {
      response = await hiringrequestService.getDeveloperDetailInManager(devId);
      console.log(response.data.data);
      setDeveloperInfo(response.data.data);
    } catch (error) {
      console.error(
        "Error fetching Developer Detail In Manager Popup vacancies:",
        error
      );
    }
  };

  const fetchGetEducationDev = async () => {
    let response;
    try {
      response = await educationServices.getEducationByDeveloperId(devId);
      console.log(response.data.data);
      setEducationInfo(response.data.data);
    } catch (error) {
      console.error(
        "Error fetching Developer Detail In Manager Popup vacancies:",
        error
      );
    }
  };

  const fetchGetProfessDev = async () => {
    let response;
    try {
      response = await professionalExperienceServices.getProfessionalExperience(devId);
      console.log(response.data.data);
      setProfessInfo(response.data.data);
    } catch (error) {
      console.error(
        "Error fetching Developer Detail In Manager Popup vacancies:",
        error
      );
    }
  };



  useEffect(() => {
    fetchGetDeveloperDetailInManager();
    fetchGetEducationDev();
    fetchGetProfessDev();
  }, [isModalOpen, devId]);

  return (
    <React.Fragment>
      <div>
        <Modal isOpen={isModalOpen} toggle={closeModal} size={"xl"}>
          <div className="mt-2 d-flex justify-content-end ">
            <Button
              close
              className="close-button"
              onClick={closeModal}
              style={{ marginRight: "10px" }}
            ></Button>
          </div>

          <ModalBody className="rounded">
            {developerInfo && (
              <div>
                <Row>
                  <Col lg={4}>
                    <Card className="side-bar Modal-info-dev-left">
                      <CardBody className="p-4">
                        <div className="candidate-profile text-center">
                          <img
                            src={
                              developerInfo.userImage || userImage0
                            }
                            alt=""
                            className="avatar-lg rounded-circle"
                          />
                          <h6 className="fs-18 mb-0 mt-4">
                            {developerInfo.firstName} {developerInfo.lastName}
                          </h6>
                        </div>
                      </CardBody>
                      <CardBody className="candidate-profile-overview border-top p-4">
                        <h6 className="fs-17 fw-semibold mb-3">
                          Profile Overview
                        </h6>
                        <ul className="list-unstyled mb-0">
                          <li>
                            <div className="d-flex">
                              <label className="text-dark">Code</label>
                              <div>
                                <p className="text-muted mb-0">
                                  {developerInfo.codeName}
                                </p>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="d-flex">
                              <label className="text-dark">Gender</label>
                              <div>
                                <p className="text-muted mb-0">
                                  {developerInfo.genderName}
                                </p>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="d-flex">
                              <label className="text-dark">
                                Average Salary
                              </label>
                              <div>
                                <p className="text-muted mb-0">
                                  ${developerInfo.averageSalary}
                                </p>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="d-flex">
                              <label className="text-dark">
                                Year Experience
                              </label>
                              <div>
                                <p className="text-muted mb-0 ms-2">
                                  {developerInfo.yearOfExperience} years
                                </p>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </CardBody>
                      <CardBody className="p-4 border-top">
                        <div className="border-bottom pb-3">
                          <h6 className="fs-17 fw-semibold mb-3">
                            Type of Developer
                          </h6>
                          <div className="d-flex flex-wrap align-items-start gap-1">
                            {developerInfo.types.map((type) => (
                              <span
                                key={type.typeId}
                                className="badge bg-success-subtle text-success fs-13 mt-1"
                              >
                                {type.typeName}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-3 border-bottom pb-3">
                          <h6 className="fs-17 fw-semibold mb-3">
                            Level of Developer
                          </h6>
                          <div className="d-flex flex-wrap align-items-start gap-1">
                            <span className="badge bg-success-subtle text-success fs-13 mt-1">
                              {developerInfo.level.levelName}
                            </span>
                          </div>
                        </div>

                        <div className="mt-3">
                          <h6 className="fs-17 fw-semibold mb-3">
                            Skill of Developer
                          </h6>
                          <div className="d-flex flex-wrap align-items-start gap-1">
                            {developerInfo.skills.map((skill) => (
                              <span
                                key={skill.skillId}
                                className="badge bg-success-subtle text-success fs-13 mt-1"
                              >
                                {skill.skillName}
                              </span>
                            ))}
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg={8}>
                    <Card className="candidate-details mt-4 mt-lg-0 Modal-info-dev-right">
                      <CardBody className="p-4 candidate-personal-detail">
                        <div>
                          <h6 className="fs-17 fw-semibold mb-3 fw-bold">
                            Summary
                          </h6>
                          <p className="text-muted mb-2">
                            {developerInfo.summary}
                          </p>
                        </div>
                        <div className="candidate-education-details mt-3 pt-3">
                          <h6 className="fs-17 fw-bold mb-0">Education</h6>
                          {educationInfo.map((jobVacancy, key) => (
                            <div className="candidate-education-content mt-4 d-flex" key={key}>
                              <div className="circle flex-shrink-0 bg-primary-subtle text-primary">
                                {" "}
                                {jobVacancy.majorName && (
                                  <>
                                    {jobVacancy.majorName.charAt(0)}{" "}
                                  </>
                                )}
                              </div>
                              <div className="ms-2">
                                <h6 className="fs-16 mb-1">
                                  {jobVacancy.majorName}
                                </h6>
                                <p className="mb-2 text-muted">
                                  {jobVacancy.schoolName} -({jobVacancy.startDateMMM} - {jobVacancy.endDateMMM})
                                </p>
                                <p className="text-muted">
                                  {jobVacancy.description}
                                </p>
                              </div>
                            </div>
                          ))}

                        </div>
                        <div className="candidate-education-details mt-3 pt-3">
                          <h6 className="fs-17 fw-bold mb-0">
                            Professional Experience
                          </h6>
                          {professInfo.map((jobVacancy, key) => (
                            <div className="candidate-education-content mt-4 d-flex" key={key}>
                              <div className="circle flex-shrink-0 bg-primary-subtle text-primary">
                                {" "}
                                {jobVacancy.jobName && (
                                  <>
                                    {jobVacancy.jobName.charAt(0)}{" "}
                                  </>
                                )}
                              </div>
                              <div className="ms-2">
                                <h6 className="fs-16 mb-1">
                                  {jobVacancy.jobName}
                                </h6>
                                <p className="mb-2 text-muted">
                                  {jobVacancy.companyName} -({jobVacancy.startDateMMM} - {jobVacancy.endDateMMM})
                                </p>
                                <p className="text-muted">
                                  {jobVacancy.description}
                                </p>
                              </div>
                            </div>
                          ))}

                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
            )}
          </ModalBody>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default DeveloperDetailInCompanyPopup;

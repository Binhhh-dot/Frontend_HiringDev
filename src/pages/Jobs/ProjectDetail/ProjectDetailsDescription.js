import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Row,
  Modal,
  ModalBody,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link, Navigate, useLocation } from "react-router-dom";
import DeveloperDetailInManagerPopup from "../../Home/SubSection/DeveloperDetailInManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import projectServices from "../../../services/project.services";

const ProjectDetailDesciption = () => {
  const location = useLocation();

  // const fetchProjectDetails2 = async () => {
  //   try {
  //     const queryParams = new URLSearchParams(location.search);
  //     const jobId = queryParams.get("Id");
  //     const response = await developerServices.GetAllSelectedDevByHR(jobId);
  //     const data = response.data;
  //     const candidategridDetails = data.data.map((dev) => {
  //       return {
  //         id: dev.developerId,
  //         userImg: dev.userImage,
  //         candidateName: dev.firstName + " " + dev.lastName,
  //         candidateStatusClassName:
  //           "profile-active position-absolute badge rounded-circle bg-success",
  //         experience: dev.yearOfExperience + " Years",
  //         jobType: dev.levelRequireName,
  //         codeName: dev.codeName,
  //         salary: dev.averageSalary,
  //         addclassNameBookmark: false,
  //         label: false,
  //         skills: dev.skillRequireStrings,
  //         averagedPercentage: dev.averagedPercentage.toFixed(2),
  //         selectedDevStatus: dev.selectedDevStatus,
  //       };
  //     });
  //     setCandidategridDetails(candidategridDetails);
  //   } catch (error) {
  //     console.error("Error fetching job vacancies:", error);
  //   }
  // };

  const fetchProjectDetails = async () => {
    let response;
    // const saveData = localStorage.getItem("myData");

    try {
      const queryParams = new URLSearchParams(location.search);
      const projectId = queryParams.get("Id");
      response = await projectServices.getProjectDetailByProjectId(
        projectId
      );
      console.log(response.data.data)
      return response;
    } catch (error) {
      console.error("Error fetching job vacancies:", error);
    }
  };

  useEffect(() => {
    fetchProjectDetails();
  }, []);

  return (
    <React.Fragment>
      <Card className="job-detail ">
        <div>
          <div className="job-details-compnay-profile d-flex justify-content-between">
            <div
              className="d-flex flex-column align-self-end"
              style={{
                paddingRight: "15px",
                position: "absolute",
                right: "0",
                top: "50px",
              }}
            >
              <div className="d-flex align-items-end gap-2">
                <span
                // className={
                //   hiringRequestDetail.statusString === "Waiting Approval"
                //     ? "badge bg-warning text-light fs-12"
                //     : hiringRequestDetail.statusString === "In Progress"
                //       ? "badge bg-blue text-light fs-12"
                //       : hiringRequestDetail.statusString === "Rejected"
                //         ? "badge bg-danger text-light fs-12"
                //         : hiringRequestDetail.statusString === "Expired"
                //           ? "badge bg-danger text-light fs-12"
                //           : hiringRequestDetail.statusString === "Cancelled"
                //             ? "badge bg-danger text-light fs-12"
                //             : hiringRequestDetail.statusString === "Finished"
                //               ? "badge bg-primary text-light fs-12"
                //               : hiringRequestDetail.statusString === "Complete"
                //                 ? "badge bg-primary text-light fs-12"
                //                 : hiringRequestDetail.statusString === "Saved"
                //                   ? "badge bg-info text-light fs-12"
                //                   : ""
                // }
                // company={{ companyMana: hiringRequestDetail.companyId }}
                >
                  status
                  {/* {hiringRequestDetail.statusString} */}
                </span>
              </div>
            </div>
          </div>
        </div>
        <CardBody className="p-3">
          <div>
            <Row>
              <Col md={8}>
                <h3 className="mb-1">
                  {/* {hiringRequestDetail.jobTitle}
                   */}
                  title
                </h3>
              </Col>
            </Row>
          </div>

          <div className="mt-4">
            <Row className="g-2" style={{ columnGap: "0px" }}>
              <Col
                lg={3}
                className="border rounded p-3 "
                style={{ maxWidth: "266px" }}
              >
                <div>
                  <p className="text-muted mb-0 fs-13">Type Of Developer</p>
                  <p className="fw-medium mb-0 badge bg-info-subtle text-info">
                    {/* {hiringRequestDetail.typeRequireName} */}
                    type
                  </p>
                </div>
              </Col>
              <Col
                lg={3}
                className="border rounded p-3"
                style={{ maxWidth: "266px" }}
              >
                <div id="standard">
                  <p className="text-muted fs-13 mb-0">Skill Requirement</p>
                  <p className="fw-medium mb-0 ">
                    {/* {hiringRequestDetail.skillRequireStrings.map(
                      (skill, index) => (
                        <span
                          key={index}
                          style={{ marginRight: "3px" }}
                          className="badge bg-primary-subtle text-primary"
                        >
                          {skill}
                        </span>
                      )
                    )} */}
                    skill
                  </p>
                </div>
              </Col>

              <Col
                lg={3}
                className="border rounded p-3"
                style={{ maxWidth: "266px" }}
              >
                <div>
                  <p className="text-muted fs-13 mb-0">Level Requirement</p>
                  <p className="fw-medium mb-0 badge bg-purplel text-purple">
                    {/* {hiringRequestDetail.levelRequireName}
                     */}
                    level
                  </p>
                </div>
              </Col>

              <Col
                lg={3}
                className="border rounded p-3"
                style={{ maxWidth: "266px" }}
              >
                <div id="standard">
                  <p className="text-muted fs-13 mb-0">Deadline</p>
                  <p className="fw-medium mb-0 ">
                    <span className="badge bg-orangeRed2l text-orangeRed2">
                      {/* {new Intl.DateTimeFormat("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }).format(new Date(hiringRequestDetail.duration))} */}
                      duration
                    </span>
                  </p>
                </div>
              </Col>
            </Row>
          </div>

          <div className="mt-4">
            <div className="job-detail-desc">
              <p
                className=""
              // dangerouslySetInnerHTML={{
              //   __html: hiringRequestDetail.jobDescription,
              // }}
              />
              des
            </div>
          </div>

          <div className="mt-4">
            <div className="job-details-desc">
              <ul className="job-detail-list list-unstyled mb-0 ">
                <h5>Level Require</h5>
                <li className="mb-3">
                  <i className="uil uil-circle"></i>{" "}
                  {/* {hiringRequestDetail.levelRequireName} */}
                  level
                </li>

                <h5>Skill & Type Require</h5>
                {/* {hiringRequestDetail.skillRequireStrings.map((skill, index) => (
                  <li key={index}>
                    <i className="uil uil-circle"></i>
                    {skill}
                  </li>
                ))} */}

                <li>
                  <i className="uil uil-circle"></i>{" "}
                  {/* {hiringRequestDetail.typeRequireName} */}
                  type
                </li>
              </ul>
            </div>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default ProjectDetailDesciption;

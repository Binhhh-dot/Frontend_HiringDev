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
import projectServices from "../../services/project.services";
import { useLocation } from "react-router";

const ProjectDetailDescription = () => {
  const { state } = useLocation();
  //--------------------------------------------------------------------------------
  const [projectDetail, setProjectDetail] = useState([]);
  const [devInProject, setDevInProject] = useState([]);

  //--------------------------------------------------------------------------------

  const fetchGetProjectDetailByProjectId = async () => {
    let response;
    try {
      response = await projectServices.getProjectDetailByProjectId(
        state.projectId
      );
      setProjectDetail(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching project detail :", error);
    }
  };

  useEffect(() => {
    fetchGetProjectDetailByProjectId();
  }, []);
  //--------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------
  return (
    <React.Fragment>
      <Card
        className="job-detail "
        style={{
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
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
                  className={
                    // hiringRequestDetail.statusString === "Waiting Approval"
                    //   ? "badge bg-warning text-light fs-12"
                    //   : hiringRequestDetail.statusString === "In Progress"
                    //   ? "badge bg-blue text-light fs-12"
                    //   : hiringRequestDetail.statusString === "Rejected"
                    //   ? "badge bg-danger text-light fs-12"
                    //   : hiringRequestDetail.statusString === "Expired"
                    //   ? "badge bg-danger text-light fs-12"
                    //   : hiringRequestDetail.statusString === "Cancelled"
                    //   ? "badge bg-danger text-light fs-12"
                    //   : hiringRequestDetail.statusString === "Finished"
                    //   ? "badge bg-primary text-light fs-12"
                    //   : hiringRequestDetail.statusString === "Complete"
                    //   ? "badge bg-primary text-light fs-12"
                    //   : hiringRequestDetail.statusString === "Saved"
                    //   ? "badge bg-info text-light fs-12"
                    //   : ""

                    "badge bg-blue text-light fs-12"
                  }
                >
                  {projectDetail.statusString}
                </span>

                {/* {hiringRequestDetail.statusString === "Waiting Approval" ||
                hiringRequestDetail.statusString === "Rejected" ? (
                  <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    size="xl"
                    color="#909191"
                  />
                ) : (
                  <Dropdown
                    isOpen={showDropdown}
                    toggle={toggleDropdown}
                    disabled={disableIconCancel}
                  >
                    <DropdownToggle
                      caret
                      style={{
                        padding: "0px",
                        backgroundColor: "white",
                        border: "0px",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faEllipsisVertical}
                        size="xl"
                        color="#909191"
                        // onClick={handleDropdownClick}
                      />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem header style={{ textAlign: "center" }}>
                        Are you sure?
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>
                        <button
                          className="d-flex justify-content-center"
                          style={{
                            width: "100%",
                            padding: "7px",
                            fontWeight: "500",
                          }}
                          class="btn btn-danger"
                          role="button"
                          onClick={openCancelAfterModal}
                        >
                          <span style={{ fontSize: "15px" }}>
                            Cancel Request
                          </span>
                        </button>
                      </DropdownItem>
                      <DropdownItem divider />
                    </DropdownMenu>
                  </Dropdown>
                )} */}
              </div>
            </div>
          </div>
        </div>
        <CardBody className="p-3 ">
          <div>
            <Row>
              <Col md={8}>
                <h3 className="mb-1">{projectDetail.projectName}</h3>
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
                  <p className="text-muted mb-0 fs-13">Type Of Project</p>
                  <p className="fw-medium mb-0 badge bg-info-subtle text-info">
                    {projectDetail.projectTypeName}
                  </p>
                </div>
              </Col>
              <Col
                lg={3}
                className="border rounded p-3"
                style={{ maxWidth: "266px" }}
              >
                <div id="standard">
                  <p className="text-muted fs-13 mb-0">Project Code</p>
                  <p className="fw-medium mb-0 badge bg-success-subtle text-success">
                    {/* {hiringRequestDetail.skillRequireStrings.map(
                      (skill, index) => (
                        <span
                          key={index}
                          style={{ marginRight: "3px" }}
                          className="badge bg-success-subtle text-success"
                        >
                          {skill}
                        </span>
                      )
                    )} */}
                    {projectDetail.projectCode}
                  </p>
                </div>
              </Col>

              <Col
                lg={3}
                className="border rounded p-3"
                style={{ maxWidth: "266px" }}
              >
                <div>
                  <p className="text-muted fs-13 mb-0">Number Of Dev</p>
                  <p className="fw-medium mb-0 badge bg-purplel text-purple">
                    {projectDetail.numberOfDev}
                  </p>
                </div>
              </Col>

              <Col
                lg={3}
                className="border rounded p-3"
                style={{ maxWidth: "266px" }}
              >
                <div id="standard">
                  <p className="text-muted fs-13 mb-0">Start Date - End Date</p>
                  <p className="fw-medium mb-0 ">
                    <span className="badge bg-orangeRed2l text-orangeRed2">
                      {projectDetail.startDate} - {projectDetail.endDate}
                    </span>
                  </p>
                </div>
              </Col>
            </Row>
          </div>

          <div className="mt-4">
            <div className="job-detail-desc">
              {/* <p
                className=""
                dangerouslySetInnerHTML={{
                  __html: hiringRequestDetail.jobDescription,
                }}
              /> */}
              Create At {projectDetail.createdAt}
            </div>
          </div>

          <div className="mt-4">
            <div className="job-details-desc">
              <ul className="job-detail-list list-unstyled mb-0 ">
                <h5>Level Require</h5>
                <li className="mb-3">
                  <i className="uil uil-circle"></i> levelRequireName
                </li>
                <h5>Skill & Type Require</h5>
                {/* {hiringRequestDetail.skillRequireStrings.map((skill, index) => (
                  <li key={index}>
                    <i className="uil uil-circle"></i>
                    {skill}
                  </li>
                ))} */}
                skill
                <li>
                  <i className="uil uil-circle"></i> typeRequireName
                </li>
              </ul>
            </div>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default ProjectDetailDescription;

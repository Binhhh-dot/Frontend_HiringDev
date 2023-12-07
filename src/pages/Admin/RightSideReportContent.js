import React, { useState, useEffect } from "react";
import { Modal, ModalBody, Input, Label, Card, CardBody } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import reportServices from "../../services/report.services";
import developerServies from "../../services/developer.services";
import projectServices from "../../services/project.services";

const RightSideReportContent = () => {
  const { state } = useLocation();
  const [developerInReport, setDeveloperInReport] = useState({});
  const [levelDeveloperInReport, setLevelDeveloperInReport] = useState("");
  const [typeDeveloperInReport, setTypeDeveloperInReport] = useState([]);
  const [projectInReport, setProjectInReport] = useState({});
  //-------------------------------------------------------------------
  const fetchGetDeveloperInReport = async () => {
    let response;
    try {
      response = await developerServies.getDeveloperByDevId(state.developerId);
      console.log(response.data.data);
      setDeveloperInReport(response.data.data);
      setTypeDeveloperInReport(response.data.data.types);
      setLevelDeveloperInReport(response.data.data.level.levelName);
    } catch (error) {
      console.error("Error fetching developer in report:", error);
    }
  };

  const fetchGetProjectInReport = async () => {
    let response;
    try {
      response = await projectServices.getProjectDetailByProjectId(
        state.projectId
      );
      console.log(response.data.data);
      setProjectInReport(response.data.data);
    } catch (error) {
      console.error("Error fetching project in report:", error);
    }
  };

  //---------------------------------------------------------------------
  useEffect(() => {
    fetchGetDeveloperInReport();
  }, []);

  useEffect(() => {
    fetchGetProjectInReport();
  }, []);
  //-------------------------------------------------------------------
  return (
    <React.Fragment>
      <div className="side-bar">
        <Card
          className="company-profile"
          style={{
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          }}
        >
          <CardBody className="p-4">
            <div className="text-center">
              <div>
                <img
                  style={{ width: "100px", height: "100px" }}
                  src={developerInReport.userImage}
                  alt=""
                  className="img-fluid rounded-3 avt-company-hiring-detail"
                />
              </div>

              <div className="mt-4">
                <h6 className="fs-17 mb-0">
                  {developerInReport.firstName} {developerInReport.lastName}
                </h6>
                <p className="mb-0 text-muted" style={{ fontStyle: "italic" }}>
                  {" "}
                  #{developerInReport.codeName}
                </p>
              </div>
            </div>
            <ul className="list-unstyled mt-4">
              <li className="mt-3">
                <div className="d-flex">
                  <i className="uil uil-envelope text-primary fs-4"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Email</h6>
                    <p className="text-muted fs-14 mb-0">
                      {developerInReport.email}
                    </p>
                  </div>
                </div>
              </li>

              <li>
                <div className="d-flex mt-3">
                  <i className="uil uil-phone-volume text-primary fs-4"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Phone</h6>
                    <p className="text-muted fs-14 mb-0">
                      {developerInReport.phoneNumber}
                    </p>
                  </div>
                </div>
              </li>

              <li className="mt-3">
                <div className="d-flex">
                  <i className="uil uil-user-square text-primary fs-4"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Experience</h6>
                    <p className="text-muted fs-14 mb-0">
                      {developerInReport.yearOfExperience} years
                    </p>
                  </div>
                </div>
              </li>

              <li className="mt-3">
                <div className="d-flex">
                  <i className="uil uil-angle-double-up text-primary fs-4"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Developer Level</h6>
                    <p className="text-muted fs-14 mb-0">
                      {levelDeveloperInReport}
                    </p>
                  </div>
                </div>
              </li>

              <li className="mt-3">
                <div className="d-flex">
                  <i className="uil uil-desktop text-primary fs-4"></i>
                  <div className="ms-3" style={{ width: "100%" }}>
                    <h6 className="fs-14 mb-2">Developer Type</h6>
                    <p className="text-muted fs-14 mb-0">
                      {typeDeveloperInReport.map(
                        (typeDeveloperInReportNew, key) => (
                          <span key={key}>
                            {typeDeveloperInReportNew.typeName},{" "}
                          </span>
                        )
                      )}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </CardBody>
        </Card>

        <Card
          className="job-overview mt-4"
          style={{
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          }}
        >
          <CardBody className="p-4">
            <h4>Project Overview</h4>
            <ul className="list-unstyled mt-4 mb-0">
              <li>
                <div className="d-flex mt-4">
                  <i className="uil uil-parking-square icon bg-primary-subtle text-primary"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Project</h6>
                    <p className="text-muted mb-0">
                      {projectInReport.projectName}
                    </p>

                    <p className="text-muted mb-0">
                      #{projectInReport.projectCode}
                    </p>
                  </div>
                </div>
              </li>

              <li>
                <div className="d-flex mt-4">
                  <i className="uil  uil-list-ul icon bg-primary-subtle text-primary"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Type Of Project</h6>
                    <p className="text-muted mb-0">
                      {projectInReport.projectTypeName}
                    </p>
                  </div>
                </div>
              </li>

              <li>
                <div className="d-flex mt-4">
                  <i className="uil uil-windsock icon bg-primary-subtle text-primary"></i>

                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Start Date</h6>
                    <p className="text-muted mb-0">
                      {projectInReport.startDateMMM}
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex mt-4">
                  <i className="uil uil-times-circle icon bg-primary-subtle text-primary"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">End Date</h6>
                    <p className="text-muted mb-0">
                      {projectInReport.endDateMMM}
                    </p>
                  </div>
                </div>
              </li>

              <li>
                <div className="d-flex mt-4">
                  <i className="uil uil-folder-info icon bg-primary-subtle text-primary"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Status</h6>
                    <p className="text-muted mb-0">
                      {projectInReport.statusString}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </CardBody>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default RightSideReportContent;

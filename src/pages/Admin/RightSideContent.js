import React, { useEffect, useState } from "react";
import { Modal, ModalBody, Input, Label, Card, CardBody } from "reactstrap";
import { Link, useLocation } from "react-router-dom";

import companyServices from "../../services/company.services";
import hiringrequestService from "../../services/hiringrequest.service";
//import projectService from "../../services/project.services";
import projectServices from "../../services/project.services";

const RightSideContent = () => {
  //Apply Now Model
  const [modal, setModal] = useState(false);
  const openModal = () => setModal(!modal);
  // const { company } = useLocation();
  const { state } = useLocation();
  ///////////////////////////////////////////////////////////
  const [companyInfoInManager, setCompanyInfoInManager] = useState(null);
  const [hiringRequestDetailOverview, setHiringRequestDetailOverview] =
    useState(null);
  const [projectInfoInManager, setProjectInfoInManager] = useState({});
  //////////////////////////////////////////////////////////
  const fetchGetCompanyByCompanyId = async () => {
    let response;
    try {
      response = await companyServices.getCompanyByCompanyId(state.companyId);
      setCompanyInfoInManager(response.data.data);
      console.log("GET COMPANY BY ID");
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching company detail:", error);
    }
  };

  /////////////////////////////////////////////////////////////
  const fetchGetHiringDetailOverview = async () => {
    let response;
    try {
      response = await hiringrequestService.getHiringRequestDetailInManager(
        state?.hiringRequestId
      );
      setHiringRequestDetailOverview(response.data.data);
      console.log("hiring request overview");
      console.log(response.data.data);
      return response;
    } catch (error) {
      console.error("Error fetching hiring request detail overview:", error);
    }
  };
  ///////////////////////////////////////////////////////////////////////////
  const fetchGetProjectOverview = async () => {
    let response;
    try {
      response = await projectServices.getProjectDetailByProjectId(
        state.projectId
      );
      setProjectInfoInManager(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching project overview:", error);
    }
  };

  ////////////////////////////////////////////////////////////
  useEffect(() => {
    fetchGetCompanyByCompanyId();
    fetchGetHiringDetailOverview();
    fetchGetProjectOverview();
  }, []);
  ////////////////////////////////////////////////////////////

  if (!companyInfoInManager || !hiringRequestDetailOverview) {
    return null;
  }

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
                  src={companyInfoInManager.companyImage}
                  alt=""
                  className="img-fluid rounded-3 avt-company-hiring-detail"
                />
              </div>

              <div className="mt-4">
                <h6 className="fs-17 mb-1">
                  {companyInfoInManager.companyName}
                </h6>
              </div>
            </div>
            <ul className="list-unstyled mt-4">
              <li className="mt-3">
                <div className="d-flex">
                  <i className="uil uil-user-square text-primary fs-4"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Human Resource</h6>
                    <p className="text-muted fs-14 mb-0">
                      {companyInfoInManager.hrFullName}
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
                      {companyInfoInManager.phoneNumber}
                    </p>
                  </div>
                </div>
              </li>
              <li className="mt-3">
                <div className="d-flex">
                  <i className="uil uil-envelope text-primary fs-4"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Email</h6>
                    <p className="text-muted fs-14 mb-0">
                      {companyInfoInManager.companyEmail}
                    </p>
                  </div>
                </div>
              </li>

              <li className="mt-3">
                <div className="d-flex">
                  <i className="uil uil-map-marker text-primary fs-4"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Location</h6>
                    <p className="text-muted fs-14 mb-0">
                      {companyInfoInManager.address}{" "}
                      {companyInfoInManager.country}
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
                      <Link
                        to="/projectdetail"
                        state={{
                          projectId: state.projectId,
                          companyId: state.companyId,
                        }}
                      >
                        {projectInfoInManager.projectName}
                      </Link>
                    </p>
                  </div>
                </div>
              </li>

              <li>
                <div className="d-flex mt-4">
                  <i className="uil uil-list-ul icon bg-primary-subtle text-primary"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Type Of Project</h6>
                    <p className="text-muted mb-0">
                      {projectInfoInManager.projectTypeName}
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
                      {projectInfoInManager.startDateMMM}
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
                      {projectInfoInManager.endDateMMM}
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
                      {projectInfoInManager.statusString}
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

export default RightSideContent;

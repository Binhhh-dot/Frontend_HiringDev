import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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

import companyServices from "../../services/company.services";
import { Link } from "react-router-dom";

const ProjectRightSideContent = () => {
  const [companyInfoInProject, setCompanyInfoInProject] = useState([]);
  //-----------------------------------------------------------------------------
  const { state } = useLocation();
  //-----------------------------------------------------------------------------
  const fetchGetCompanyByCompanyId = async () => {
    let response;
    try {
      response = await companyServices.getCompanyByCompanyId(state.companyId);

      console.log(response.data);
      setCompanyInfoInProject(response.data.data);
    } catch (error) {
      console.error("Error fetching company detail:", error);
    }
  };

  useEffect(() => {
    fetchGetCompanyByCompanyId();
  }, []);
  //-----------------------------------------------------------------------------

  return (
    <React.Fragment>
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
                src={companyInfoInProject.companyImage}
                alt=""
                className="img-fluid rounded-3 avt-company-hiring-detail"
              />
            </div>

            <div className="mt-4">
              <h6 className="fs-17 mb-1">{companyInfoInProject.companyName}</h6>
            </div>
          </div>
          <ul className="list-unstyled mt-4">
            <li className="mt-3">
              <div className="d-flex">
                <i className="uil uil-user-square text-primary fs-4"></i>
                <div className="ms-3">
                  <h6 className="fs-14 mb-2">Human Resource</h6>
                  <p className="text-muted fs-14 mb-0">
                    {companyInfoInProject.hrFullName}
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
                    {companyInfoInProject.phoneNumber}
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
                    {companyInfoInProject.companyEmail}
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
                    {companyInfoInProject.address}{" "}
                    {companyInfoInProject.country}
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default ProjectRightSideContent;

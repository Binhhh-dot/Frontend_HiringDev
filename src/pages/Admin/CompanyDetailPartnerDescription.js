import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Row,
  Button,
  NavItem,
  NavLink,
  Nav,
  TabPane,
  TabContent,
  Form,
  Label,
} from "reactstrap";
import companyServices from "../../services/company.services";
import { Link, Navigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-bootstrap";
import { Badge, Space, Layout, Menu, Input, Modal } from "antd";
import Select from "react-select";
import img0 from "../../assets/images/user/img-00.jpg";
import axios from "axios";
import UpdateCompanyPopup from "./UpdateCompanyPopup.js/UpdateCompanyPopup";

const CompanyDetailPartnerDescription = () => {
  const [showPopupUpdateCompany, setShowPopupUpdateCompany] = useState(false);
  const openPopupUpdateCompany = () => {
    setShowPopupUpdateCompany(true);
  };
  const closePopupUpdateCompany = () => {
    setShowPopupUpdateCompany(false);
    fetchCompanyDetail();
  };

  //-----------------------------------------------------------------------------------------
  const { state } = useLocation();
  const [companyDetail, setcompanyDetail] = useState([]);

  const fetchCompanyDetail = async () => {
    let response;
    try {
      response = await companyServices.getCompanyByCompanyId(state.companyId);

      console.log(response.data.data);
      setcompanyDetail(response.data.data);
    } catch (error) {
      console.error("Error fetching company partner detail description", error);
    }
  };

  //----------------------------------------------------------------------------------------

  useEffect(() => {
    fetchCompanyDetail();
  }, []);

  //----------------------------------------------------------------------------------------
  return (
    <React.Fragment>
      <Card
        className="job-detail"
        style={{
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <CardBody className="p-3">
          <div>
            <Row>
              <Col md={2} style={{ maxWidth: "120px" }}>
                <img
                  style={{
                    width: "90px",
                    height: "90px",
                  }}
                  src={companyDetail.companyImage}
                  alt=""
                  className="img-fluid rounded-3 img-avt-hiring-request"
                />
              </Col>
              <Col md={8} className="px-0">
                <h3 className="mb-1">{companyDetail.companyName}</h3>
                <p className="fw-medium mb-0 badge bg-blue text-light">
                  {companyDetail.statusString}
                </p>
              </Col>
              <Col
                md={2}
                className="px-0 d-flex justify-content-end"
                style={{ marginLeft: "65px" }}
              >
                <Dropdown>
                  <Dropdown.Toggle
                    variant="white"
                    id="dropdown-basic"
                    style={{ padding: "0px", color: "#ACB4B6" }}
                  >
                    <FontAwesomeIcon icon={faGear} size="lg" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {/* Nội dung của dropdown ở đây */}
                    <Dropdown.Item onClick={() => openPopupUpdateCompany()}>
                      Update Company
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
          </div>

          <UpdateCompanyPopup
            isModalOpen={showPopupUpdateCompany}
            closeModal={closePopupUpdateCompany}
            companyId={state.companyId}
          ></UpdateCompanyPopup>

          {/* ---------------------------------------------------------------------------------- */}

          <div className="mt-4">
            <Row className="gap-2" style={{ columnGap: "0px" }}>
              <Col
                lg={3}
                className="border rounded p-3 "
                style={{ maxWidth: "298px" }}
              >
                <div>
                  <p className="text-muted mb-0 fs-13">Company Email</p>
                  <p className="fw-medium mb-0 badge bg-info-subtle text-info">
                    {companyDetail.companyEmail}
                  </p>
                </div>
              </Col>
              <Col
                lg={3}
                className="border rounded p-3"
                style={{ maxWidth: "298px" }}
              >
                <div id="standard">
                  <p className="text-muted fs-13 mb-0">Phone</p>

                  <p className="fw-medium mb-0 badge bg-success-subtle text-success">
                    {companyDetail.phoneNumber}
                  </p>
                </div>
              </Col>

              <Col
                lg={3}
                className="border rounded p-3"
                style={{ maxWidth: "298px" }}
              >
                <div>
                  <p className="text-muted fs-13 mb-0">Address</p>

                  <p className="fw-medium mb-0 badge bg-purplel text-purple">
                    {companyDetail.address} {companyDetail.country}
                  </p>
                </div>
              </Col>

              <Col
                lg={3}
                className="border rounded p-3"
                style={{ maxWidth: "298px" }}
              >
                <div id="standard">
                  <p className="text-muted fs-13 mb-0">Human Resource</p>
                  <p className="fw-medium mb-0 ">
                    <span className="badge bg-orangeRed2l text-orangeRed2">
                      {companyDetail.hrFullName}
                    </span>
                  </p>
                </div>
              </Col>
            </Row>
          </div>

          <div className="mt-3">
            <h5>ABOUT COMPANY</h5>
            <p>{companyDetail.aboutCompany}</p>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default CompanyDetailPartnerDescription;

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
  NavItem,
  NavLink,
  Nav,
  TabPane,
  TabContent,
} from "reactstrap";
import companyServices from "../../services/company.services";
import { Link, Navigate, useLocation } from "react-router-dom";
const CompanyDetailPartnerDescription = () => {
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

  useEffect(() => {
    fetchCompanyDetail();
  }, []);

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
                <p className="mb-0 mt-1 text-muted">
                  {companyDetail.rating}{" "}
                  <i className="mdi mdi-star align-middle text-warning"></i>
                </p>
              </Col>
            </Row>
          </div>

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

          {/* <div className="mt-4">
            <div className="job-detail-desc">
              <p
                className=""
                dangerouslySetInnerHTML={{
                  __html: "hiringRequestDetail.jobDescription",
                }}
              />
            </div>
          </div> */}
          <div>DESCRIPTION</div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default CompanyDetailPartnerDescription;

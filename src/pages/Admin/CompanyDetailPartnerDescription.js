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

const CompanyDetailPartnerDescription = () => {
  const [showPopupProfileCompany, setShowPopupProfileCompany] = useState(false);
  const handleOKProfileCompany = () => {};
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
  let companyUpdateDetail;
  const [avatar, setAvatar] = useState();
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [companyCreated, setCompanyCreated] = useState(false);
  const [companyImageUpdate, setCompanyImageUpdate] = useState(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  useEffect(() => {
    return () => avatar && URL.revokeObjectURL(avatar.preview);
  }, [avatar]);

  useEffect(() => {
    const fetchCompanyDetailUpdate = async () => {
      const userId = localStorage.getItem("userId");
      if (state.companyId) {
        setCompanyCreated(true);
        try {
          const response = await companyServices.getCompanyByCompanyId(
            state.companyId
          );
          companyUpdateDetail = response;
          document.getElementById("company-name").value =
            response.data.data.companyName;
          document.getElementById("email-address").value =
            response.data.data.companyEmail;
          document.getElementById("address").value = response.data.data.address;
          document.getElementById("number").value =
            response.data.data.phoneNumber;

          const fileDev = response.data.data.companyImage;
          setCompanyImageUpdate(fileDev);
        } catch (error) {
          console.error("Error get detail update company:", error);
        }
      } else {
        setCompanyImageUpdate(img0);
      }

      axios
        .get(
          "https://restcountries.com/v3.1/all?fields=name&fbclid=IwAR2NFDKzrPsdQyN2Wfc6KNsyrDkMBakGFkvYe-urrPH33yawZDSIbIoxjX4"
        )
        .then((response) => {
          const data = response.data;
          const formattedCountries = data.map((country) => ({
            value: country.name.common,
            label: country.name.common,
          }));
          setCountries(formattedCountries);
          if (companyUpdateDetail) {
            const selected = formattedCountries.find(
              (country) =>
                country.value === companyUpdateDetail.data.data.country
            );
            if (selected) {
              const company = {
                value: selected.value,
                label: selected.label,
              };
              setSelectedCountry(company);
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching data", error);
        });
    };
    fetchCompanyDetailUpdate();
  }, [isUpdateMode]);

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
                    <Dropdown.Item
                      onClick={() => {
                        setShowPopupProfileCompany(true);
                      }}
                    >
                      Update Company
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
          </div>

          {/* ---------------------------------------------------------------------------------- */}
          {/* Modal */}
          <Modal
            centered
            open={showPopupProfileCompany}
            onOk={() => handleOKProfileCompany()}
            onCancel={() => setShowPopupProfileCompany(false)}
            width={800}
            okType="default"
            okButtonProps={{
              style: {
                background: "#6546D2",
                borderColor: "#6546D2",
                color: "white",
              },
            }}
          >
            <Form action="#">
              <div>
                <h5 className="fs-17 fw-semibold mb-3 mb-0">Update Company</h5>
                <div className="text-center">
                  <div className="mb-4 profile-user">
                    {avatar ? (
                      <img
                        src={avatar.preview}
                        className="rounded-circle img-thumbnail profile-img"
                        id="profile-img"
                        alt=""
                      />
                    ) : (
                      <img
                        src={companyImageUpdate} // Giá trị mặc định là "userImage2"
                        className="rounded-circle img-thumbnail profile-img"
                        id="profile-img-2"
                        alt=""
                      />
                    )}
                    <div className="p-0 rounded-circle profile-photo-edit">
                      <label className="profile-photo-edit avatar-xs">
                        <i
                          className="uil uil-edit"
                          //onClick={handleChooseAvatar}
                        ></i>
                      </label>
                      <input
                        type="file"
                        id="profile-img-file-input"
                        // onChange={handlePreviewAvatar}
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>
                </div>
                <Row>
                  <Col lg={12}>
                    <div className="mb-3">
                      <label htmlFor="firstName" className="form-label">
                        Company Name
                      </label>
                      <Input
                        type="text"
                        className="form-control"
                        id="company-name"
                      />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <Label class="text-muted">Country</Label>
                      <div style={{ paddingBottom: "10px" }}>
                        <Select
                        // options={countries}
                        // value={selectedCountry}
                        // onChange={(selectedOption) =>
                        //   setSelectedCountry(selectedOption)
                        // }
                        />
                      </div>
                    </div>
                  </Col>

                  <Col lg={6}>
                    <div className="mb-3">
                      <Label htmlFor="email" className="form-label">
                        Address
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="address"
                      />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <Label htmlFor="email" className="form-label">
                        Email
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="email-address"
                      />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <Label htmlFor="email" className="form-label">
                        Company Phone Number
                      </Label>
                      <Input type="text" className="form-control" id="number" />
                    </div>
                  </Col>
                </Row>
              </div>
              {/* <div className="mt-4 text-end">
                    {companyIdFromLocalStorage === "null" ? (
                      <div
                        className="btn btn-soft-primary fw-bold"
                        onClick={handleUpdateCompany}
                      >
                        Create
                      </div>
                    ) : (
                      <div
                        className="btn btn-soft-blue fw-bold"
                        onClick={handleUpdateCompany}
                      >
                        Update
                      </div>
                    )}
                  </div> */}
            </Form>
          </Modal>

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

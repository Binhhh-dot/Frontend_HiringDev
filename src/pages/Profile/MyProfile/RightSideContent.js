import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Nav,
  NavLink,
  TabContent,
  TabPane,
  Card,
  Input,
  Form,
  NavItem,
  CardBody,
  Label
} from "reactstrap";
import Select from "react-select";

import classnames from "classnames";

//Images Import
import userImage2 from "../../../assets/images/user/img-02.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import companyServices from "../../../services/company.services";



const RightSideContent = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [companyId, setCompanyId] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  let companyDetail = null;

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  useEffect(() => {
    const fetchCompanyDetail = async () => {
      let companyId = localStorage.getItem('companyId');
      setCompanyId(companyId);
      const userId = localStorage.getItem('userId');
      if (companyId) {

        try {
          // Make API request
          const response = await companyServices.getCompanyByCompanyId(companyId);
          companyDetail = response;
          // Handle the response (you can show a success message or redirect to another page)
          document.getElementById("company-name").value = response.data.data.companyName;
          document.getElementById("email-address").value = response.data.data.companyEmail;
          document.getElementById("address").value = response.data.data.address;
          document.getElementById("number").value = response.data.data.phoneNumber;
          const fileDev = response.data.data.companyImage;
          // const file = fileDev.target.files[0];
          console.log(fileDev)
          setUserImage(fileDev)
          console.log('API Response:', response.data.data.companyName);


        } catch (error) {
          // Handle errors (show an error message or log the error)
          console.error('Error creating company:', error);
          console.log(error.response.data);
        }
      } else {
        setUserImage(userImage2)
      }


      axios
        .get('https://restcountries.com/v3.1/all?fields=name&fbclid=IwAR2NFDKzrPsdQyN2Wfc6KNsyrDkMBakGFkvYe-urrPH33yawZDSIbIoxjX4')
        .then((response) => {
          const data = response.data;
          const formattedCountries = data.map((country) => ({
            value: country.name.common,
            label: country.name.common,
          }));
          setCountries(formattedCountries);
          if (companyDetail) {
            const selected = formattedCountries.find((country) => country.value === companyDetail.data.data.country);
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
          console.error('Error fetching data', error);
        });
    };
    fetchCompanyDetail();
  }, []);


  const handleUpdateCompany = async () => {
    const companyName = document.getElementById('company-name').value;
    const companyEmail = document.getElementById('email-address').value;
    const phoneNumber = document.getElementById('number').value;
    const address = document.getElementById('address').value;
    const country = selectedCountry ? selectedCountry.value : '';
    const fileInput = document.getElementById('profile-img-file-input');
    const file = fileInput.files[0];
    // Get userId from localStorage
    const userId = localStorage.getItem('userId');

    const formData = new FormData();
    formData.append('CompanyId', companyId)
    formData.append('CompanyName', companyName);
    formData.append('CompanyEmail', companyEmail);
    formData.append('phoneNumber', phoneNumber);
    formData.append('address', address);
    formData.append('country', country);
    formData.append('file', file || null);
    const fileField = formData.get('file');

// Kiểm tra xem giá trị có tồn tại hay không
if (fileField) {
  console.log('Giá trị của trường "file" trong formData:', fileField);
} else {
  console.log('Trường "file" trong formData không tồn tại hoặc có giá trị là null.');
}
    console.log(formData)
    try {
      // Make API request
      const response = await companyServices.updateCompany(companyId,formData);

      // Handle the response (you can show a success message or redirect to another page)
      console.log('API Response:', response.data);
      const responseUser = await axios.get(`https://wehireapi.azurewebsites.net/api/User/${userId}`);
      const userData = responseUser.data;
      localStorage.setItem('companyId', userData.data.companyId);
    } catch (error) {
      // Handle errors (show an error message or log the error)
      console.error('Error creating company:', error);
    }


  };

  const [avatar, setAvatar] = useState();
  const [avatar2, setAvatar2] = useState();

  useEffect(() => {
    return () => avatar && URL.revokeObjectURL(avatar.preview);
  }, [avatar]);

  const handleChooseAvatar = () => {
    const inputElement = document.getElementById('profile-img-file-input');
    inputElement.click();
  };

  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      file.preview = URL.createObjectURL(file);
      setAvatar(file);
    }
  };

  useEffect(() => {
    return () => avatar2 && URL.revokeObjectURL(avatar2.preview);
  }, [avatar]);

  const handleChooseAvatar2 = () => {
    const inputElement = document.getElementById('profile-img-file-input2');
    inputElement.click();
  };

  const handlePreviewAvatar2 = (e) => {
    const file = e.target.files[0];
    if (file) {
      file.preview = URL.createObjectURL(file);
      setAvatar2(file);
    }
  };

  return (
    <React.Fragment>
      <Col lg={8}>
        <Card className="profile-content-page mt-4 mt-lg-0">
          <Nav
            className="profile-content-nav nav-pills border-bottom mb-4"
            id="pills-tab"
            role="tablist"
          >
            <NavItem role="presentation">
              <NavLink
                to="#"
                className={classnames({ active: activeTab === "1" })}
                onClick={() => {
                  tabChange("1");
                }}
                type="button"
              >
                Overview
              </NavLink>
            </NavItem>
            <NavItem role="presentation">
              <NavLink
                to="#"
                className={classnames({ active: activeTab === "2" })}
                onClick={() => {
                  tabChange("2");
                }}
                type="button"
              >
                Settings
              </NavLink>
            </NavItem>
            <NavItem role="presentation">
              <NavLink
                to="#"
                className={classnames({ active: activeTab === "3" })}
                onClick={() => {
                  tabChange("3");
                }}
                type="button"
              >
                Company
              </NavLink>
            </NavItem>
          </Nav>

          <CardBody className="p-4">
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <div>
                  <h5 className="fs-18 fw-bold">About</h5>
                  <p className="text-muted mt-4">
                    Developer with over 5 years' experience working in both the
                    public and private sectors. Diplomatic, personable, and
                    adept at managing sensitive situations. Highly organized,
                    self-motivated, and proficient with computers. Looking to
                    boost students’ satisfactions scores for{" "}
                    <b>International University</b>. Bachelor's degree in
                    communications.
                  </p>
                  <p className="text-muted">
                    It describes the candidate's relevant experience, skills,
                    and achievements. The purpose of this career summary is to
                    explain your qualifications for the job in 3-5 sentences and
                    convince the manager to read the whole resume document.
                  </p>
                </div>
                <div className="candidate-education-details mt-4">
                  <h6 className="fs-18 fw-bold mb-0">Education</h6>
                  <div className="candidate-education-content mt-4 d-flex">
                    <div className="circle flex-shrink-0 bg-primary-subtle text-primary">
                      B
                    </div>
                    <div className="ms-4">
                      <h6 className="fs-16 mb-1">
                        BCA - Bachelor of Computer Applications
                      </h6>
                      <p className="mb-2 text-muted">
                        International University - (2004 - 2010)
                      </p>
                      <p className="text-muted">
                        There are many variations of passages of available, but
                        the majority alteration in some form. As a highly
                        skilled and successfull product development and design
                        specialist with more than 4 Years of My experience.
                      </p>
                    </div>
                  </div>
                  <div className="candidate-education-content mt-3 d-flex">
                    <div className="circle flex-shrink-0 bg-primary-subtle text-primary">
                      M
                    </div>
                    <div className="ms-4">
                      <h6 className="fs-16 mb-1">
                        MCA - Master of Computer Application
                      </h6>
                      <p className="mb-2 text-muted">
                        International University - (2010 - 2012)
                      </p>
                      <p className="text-muted">
                        There are many variations of passages of available, but
                        the majority alteration in some form. As a highly
                        skilled and successfull product development and design
                        specialist with more than 4 Years of My experience.
                      </p>
                    </div>
                  </div>
                  <div className="candidate-education-content mt-3 d-flex">
                    <div className="circle flex-shrink-0 bg-primary-subtle text-primary">
                      D
                    </div>
                    <div className="ms-4">
                      <h6 className="fs-16 mb-1">
                        Design Communication Visual
                      </h6>
                      <p className="text-muted mb-2">
                        International University - (2012-2015)
                      </p>
                      <p className="text-muted">
                        There are many variations of passages of available, but
                        the majority alteration in some form. As a highly
                        skilled and successfull product development and design
                        specialist with more than 4 Years of My experience.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="candidate-education-details mt-4">
                  <h6 className="fs-18 fw-bold mb-0">Experiences</h6>
                  <div className="candidate-education-content mt-4 d-flex">
                    <div className="circle flex-shrink-0 bg-primary-subtle text-primary">
                      {" "}
                      W{" "}
                    </div>
                    <div className="ms-4">
                      <h6 className="fs-16 mb-1">
                        Web Design & Development Team Leader
                      </h6>
                      <p className="mb-2 text-muted">
                        Creative Agency - (2013 - 2016)
                      </p>
                      <p className="text-muted">
                        There are many variations of passages of available, but
                        the majority alteration in some form. As a highly
                        skilled and successfull product development and design
                        specialist with more than 4 Years of My experience.
                      </p>
                    </div>
                  </div>
                  <div className="candidate-education-content mt-4 d-flex">
                    <div className="circle flex-shrink-0 bg-primary-subtle text-primary">
                      {" "}
                      P{" "}
                    </div>
                    <div className="ms-4">
                      <h6 className="fs-16 mb-1">Project Manager</h6>
                      <p className="mb-2 text-muted">
                        Jobcy Technology Pvt.Ltd - (Pressent)
                      </p>
                      <p className="text-muted mb-0">
                        There are many variations of passages of available, but
                        the majority alteration in some form. As a highly
                        skilled and successfull product development and design
                        specialist with more than 4 Years of My experience.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <h5 className="fs-18 fw-bold">Skills</h5>
                </div>
                <div className="mt-0 d-flex flex-wrap align-items-start gap-1">
                  <span className="badge fs-13 bg-blue-subtle text-blue mt-2">
                    Cloud Management
                  </span>
                  <span className="badge fs-13 bg-blue-subtle text-blue mt-2">
                    Responsive Design
                  </span>
                  <span className="badge fs-13 bg-blue-subtle text-blue mt-2">
                    Network Architecture
                  </span>
                  <span className="badge fs-13 bg-blue-subtle text-blue mt-2">
                    PHP
                  </span>
                  <span className="badge fs-13 bg-blue-subtle text-blue mt-2">
                    Bootstrap
                  </span>
                  <span className="badge fs-13 bg-blue-subtle text-blue mt-2">
                    UI & UX Designer
                  </span>
                </div>
                <div className="mt-4">
                  <h5 className="fs-18 fw-bold">Spoken languages</h5>
                </div>
                <div className="mt-0 d-flex flex-wrap align-items-start gap-1">
                  <span className="badge fs-13 bg-success-subtle text-success mt-2">
                    English
                  </span>
                  <span className="badge fs-13 bg-success-subtle text-success mt-2">
                    German
                  </span>
                  <span className="badge fs-13 bg-success-subtle text-success mt-2">
                    French
                  </span>
                </div>
              </TabPane>
              <TabPane tabId="2">
                <Form action="#">
                  <div>
                    <h5 className="fs-17 fw-semibold mb-3 mb-0">My Company</h5>
                    <div className="text-center">
                      <div className="mb-4 profile-user">
                        {avatar2 ? (
                          <img
                            src={avatar2.preview}
                            className="rounded-circle img-thumbnail profile-img"
                            id="profile-img"
                            alt=""
                          />
                        ) : (
                          <img
                            src={userImage}  // Giá trị mặc định là "userImage2"
                            className="rounded-circle img-thumbnail profile-img"
                            id="profile-img-2"
                            alt=""
                          />
                        )}
                        <div className="p-0 rounded-circle profile-photo-edit">
                          <label
                            className="profile-photo-edit avatar-xs"
                          >
                            <i className="uil uil-edit" onClick={handleChooseAvatar2}></i>
                          </label>
                          <input
                            type="file"
                            id="profile-img-file-input2"
                            onChange={handlePreviewAvatar2}
                            style={{ display: 'none' }}
                          />
                        </div>
                      </div>
                    </div>
                    <Row>
                      <Col lg={6}>
                        <div className="mb-3">
                          <label htmlFor="firstName" className="form-label">
                            First Name
                          </label>
                          <Input
                            type="text"
                            className="form-control"
                            id="firstName"
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <Label htmlFor="lastName" className="form-label">
                            Last Name
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="lastName"
                          />
                        </div>
                      </Col>

                      <Col lg={6}>
                        <div className="mb-3">
                          <label
                            htmlFor="choices-single-categories"
                            className="form-label"
                          >
                            Account Type
                          </label>
                          <select
                            className="form-select"
                            data-trigger
                            name="choices-single-categories"
                            id="choices-single-categories"
                            aria-label="Default select example"
                          >
                            <option value="4">Accounting</option>
                            <option value="1">IT & Software</option>
                            <option value="3">Marketing</option>
                            <option value="5">Banking</option>
                          </select>
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
                            id="email"
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <div className="mt-4">
                    <h5 className="fs-17 fw-semibold mb-3">Profile</h5>
                    <Row>
                      <Col lg={12}>
                        <div className="mb-3">
                          <Label
                            htmlFor="exampleFormControlTextarea1"
                            className="form-label"
                          >
                            Introduce Yourself
                          </Label>
                          <textarea className="form-control" rows="5">
                            Developer with over 5 years' experience working in
                            both the public and private sectors. Diplomatic,
                            personable, and adept at managing sensitive
                            situations. Highly organized, self-motivated, and
                            proficient with computers. Looking to boost
                            students’ satisfactions scores for International
                            University. Bachelor's degree in communications.
                          </textarea>
                        </div>
                      </Col>

                      <Col lg={6}>
                        <div className="mb-3">
                          <Label htmlFor="languages" className="form-label">
                            Languages
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="languages"
                          />
                        </div>
                      </Col>

                      <Col lg={6}>
                        <div className="mb-3">
                          <label
                            htmlFor="choices-single-location"
                            className="form-label"
                          >
                            Location
                          </label>
                          <select
                            className="form-select"
                            data-trigger
                            name="choices-single-location"
                            id="choices-single-location"
                            aria-label="Default select example"
                          >
                            <option value="ME">Montenegro</option>
                            <option value="MS">Montserrat</option>
                            <option value="MA">Morocco</option>
                            <option value="MZ">Mozambique</option>
                          </select>
                        </div>
                      </Col>
                      <Col lg={12}>
                        <div className="mb-3">
                          <Label htmlFor="attachmentscv" className="form-label">
                            Attachments CV
                          </Label>
                          <Input
                            className="form-control"
                            type="file"
                            id="attachmentscv"
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <div className="mt-4">
                    <h5 className="fs-17 fw-semibold mb-3">Social Media</h5>
                    <Row>
                      <Col lg={6}>
                        <div className="mb-3">
                          <Label htmlFor="facebook" className="form-label">
                            Facebook
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="facebook"
                            to="https://www.facebook.com"
                          />
                        </div>
                      </Col>

                      <Col lg={6}>
                        <div className="mb-3">
                          <Label htmlFor="twitter" className="form-label">
                            Twitter
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="twitter"
                            to="https://www.twitter.com"
                          />
                        </div>
                      </Col>

                      <Col lg={6}>
                        <div className="mb-3">
                          <Label htmlFor="linkedin" className="form-label">
                            Linkedin
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="linkedin"
                            to="https://www.linkedin.com"
                          />
                        </div>
                      </Col>

                      <Col lg={6}>
                        <div className="mb-3">
                          <Label htmlFor="whatsapp" className="form-label">
                            Whatsapp
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="whatsapp"
                            to="https://www.whatsapp.com"
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <div className="mt-4">
                    <h5 className="fs-17 fw-semibold mb-3 mb-3">
                      Change Password
                    </h5>
                    <Row>
                      <Col lg={12}>
                        <div className="mb-3">
                          <Label
                            htmlFor="current-password-input"
                            className="form-label"
                          >
                            Current password
                          </Label>
                          <Input
                            type="password"
                            className="form-control"
                            placeholder="Enter Current password"
                            id="current-password-input"
                          />
                        </div>
                      </Col>

                      <Col lg={6}>
                        <div className="mb-3">
                          <Label
                            htmlFor="new-password-input"
                            className="form-label"
                          >
                            New password
                          </Label>
                          <Input
                            type="password"
                            className="form-control"
                            placeholder="Enter new password"
                            id="new-password-input"
                          />
                        </div>
                      </Col>

                      <Col lg={6}>
                        <div className="mb-3">
                          <Label
                            htmlFor="confirm-password-input"
                            className="form-label"
                          >
                            Confirm Password
                          </Label>
                          <Input
                            type="password"
                            className="form-control"
                            placeholder="Confirm Password"
                            id="confirm-password-input"
                          />
                        </div>
                      </Col>

                      <Col lg={12}>
                        <div className="form-check">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            id="verification"
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="verification"
                          >
                            Enable Two-Step Verification via email
                          </Label>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="mt-4 text-end">
                    <Link to="#" className="btn btn-primary">
                      Update
                    </Link>
                  </div>
                </Form>
              </TabPane>
              <TabPane tabId="3">
                <Form action="#">
                  <div>
                    <h5 className="fs-17 fw-semibold mb-3 mb-0">My Company</h5>
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
                            src={userImage}  // Giá trị mặc định là "userImage2"
                            className="rounded-circle img-thumbnail profile-img"
                            id="profile-img-2"
                            alt=""
                          />
                        )}
                        <div className="p-0 rounded-circle profile-photo-edit">
                          <label
                            className="profile-photo-edit avatar-xs"
                          >
                            <i className="uil uil-edit" onClick={handleChooseAvatar}></i>
                          </label>
                          <input
                            type="file"
                            id="profile-img-file-input"
                            onChange={handlePreviewAvatar}
                            style={{ display: 'none' }}
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
                              options={countries}
                              value={selectedCountry}
                              onChange={(selectedOption) =>
                                setSelectedCountry(selectedOption)
                              }
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
                          <Input
                            type="text"
                            className="form-control"
                            id="number"
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="mt-4 text-end">
                    <Link to="#" className="btn btn-primary" onClick={handleUpdateCompany} >
                      {companyId ? 'Update' : 'Create'}
                    </Link>
                  </div>
                </Form>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment >
  );
};

export default RightSideContent;

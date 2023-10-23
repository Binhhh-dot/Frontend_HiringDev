import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col } from "reactstrap";
import hiringrequestService from "../../../services/hiringrequest.service";
//Import images
import profileImage from "../../../assets/images/profile.jpg";
import userSerrvices from "../../../services/user.serrvices";
import axios from "axios";


const LeftSideContent = () => {
  const [userData, setUserData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const fetchUserDetail = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          // Make API request
          const response = await userSerrvices.getUserById(userId);
          const { lastName, firstName, email, phoneNumber } = response.data.data;
          setUserData({
            lastName,
            firstName,
            email,
            phoneNumber,
          });

          console.log('API Response:', response.data);
  
  
        } catch (error) {
          // Handle errors (show an error message or log the error)
          console.error('Error creating company:', error);
          console.log(error.response.data);
        }
      } 
    };
    fetchUserDetail();
  }, []);
  return (
    <React.Fragment>
      <Col lg={4}>
        <Card className="profile-sidebar me-lg-4">
          <CardBody className="p-4">
            <div className="text-center pb-4 border-bottom">
              <img
                src={profileImage}
                alt=""
                className="avatar-lg img-thumbnail rounded-circle mb-4"
              />
              <h5 className="mb-0" id="user-name">{userData.lastName} {userData.firstName}</h5>
              <p className="text-muted">HR</p>
              <ul className="list-inline d-flex justify-content-center align-items-center ">
                <li className="list-inline-item text-warning fs-19">
                  <i className="mdi mdi-star"></i>
                  <i className="mdi mdi-star"></i>
                  <i className="mdi mdi-star"></i>
                  <i className="mdi mdi-star"></i>
                  <i className="mdi mdi-star-half-full"></i>
                </li>
              </ul>
              <ul className="candidate-detail-social-menu list-inline mb-0">
                <li className="list-inline-item">
                  <Link
                    to="#"
                    className="social-link rounded-3 btn-soft-primary"
                  >
                    <i className="uil uil-facebook-f"></i>
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to="#" className="social-link rounded-3 btn-soft-info">
                    <i className="uil uil-twitter-alt"></i>
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link
                    to="#"
                    className="social-link rounded-3 btn-soft-success"
                  >
                    <i className="uil uil-whatsapp"></i>
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link
                    to="#"
                    className="social-link rounded-3 btn-soft-danger"
                  >
                    <i className="uil uil-phone-alt"></i>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="mt-4 border-bottom pb-4">
              <h5 className="fs-17 fw-bold mb-3">Documents</h5>
              <ul className="profile-document list-unstyled mb-0">
                <li>
                  <div className="profile-document-list d-flex align-items-center mt-4 ">
                    <div className="icon flex-shrink-0">
                      <i className="uil uil-file"></i>
                    </div>
                    <div className="ms-3">
                      <h6 className="fs-16 mb-0">Resume.pdf</h6>
                      <p className="text-muted mb-0">1.25 MB</p>
                    </div>
                    <div className="ms-auto">
                      <Link to="#" download className="fs-20 text-muted">
                        <i className="uil uil-import"></i>
                      </Link>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="profile-document-list d-flex align-items-center mt-4 ">
                    <div className="icon flex-shrink-0">
                      <i className="uil uil-file"></i>
                    </div>
                    <div className="ms-3">
                      <h6 className="fs-16 mb-0">Cover-letter.pdf</h6>
                      <p className="text-muted mb-0">1.25 MB</p>
                    </div>
                    <div className="ms-auto">
                      <Link
                        to="#"
                        download="dark-logo"
                        className="fs-20 text-muted"
                      >
                        <i className="uil uil-import"></i>
                      </Link>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-4">
              <h5 className="fs-17 fw-bold mb-3">Contacts</h5>
              <div className="profile-contact">
                <ul className="list-unstyled mb-0">
                  <li>
                    <div className="d-flex">
                      <label>Email</label>
                      <div>
                        <p className="text-muted text-break mb-0" id="email-user">
                        {userData.email}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex">
                      <label>Phone Number</label>
                      <div>
                        <p className="text-muted mb-0" id="phone-user">{userData.phoneNumber}</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex">
                      <label>Location</label>
                      <div>
                        <p className="text-muted mb-0">New Caledonia</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default LeftSideContent;

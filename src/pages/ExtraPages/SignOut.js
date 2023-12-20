import React, { useEffect } from "react";

import lightLogo from "../../assets/images/we-hire-green.png";
import darkLogo from "../../assets/images/logo-dark.png";

import signInImage from "../../assets/images/auth/sign-in.png";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loginService from "../../services/login.service";
import notificationServices from "../../services/notification.services";

const SignOut = () => {
  document.title = "Sign Out | WeHire - Job Listing Template | Themesdesign";
  console.log(process.env.SERVICE_URL);
  const clearData = async () => {
    let response;
    let response2;
    try {
      const userId = localStorage.getItem("userId");
      const promise1 = loginService.revokeAccount(userId);
      const promise2 = notificationServices.getUserDeviceId(userId);

      [response, response2] = await Promise.all([promise1, promise2]);

      console.log(response);
      console.log(response2);

      if (response2?.status === 200) {
        const deviceToken = localStorage.getItem("deviceToken");
        const foundDevice = response2.data.data.find(item => item.deviceToken === deviceToken);
        if (foundDevice) {
          console.log("DeviceToken tồn tại trong danh sách:");
          console.log("UserDeviceId:", foundDevice.userDeviceId);
          const response3 = notificationServices.deleteUserDevice(foundDevice.userDeviceId);
          localStorage.clear();
        } else {
          console.log("DeviceToken không tồn tại trong danh sách.");
          localStorage.clear();
        }
      } else {
        localStorage.clear();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    clearData();
    sendMessageToParent();
  }, []);

  const sendMessageToParent = () => {
    if (window.opener) {
      window.opener.postMessage('code:', '*');
    } else {
      console.error("No parent window found.");
    }
  };



  return (
    <React.Fragment>
      <div>
        <div className="main-content">
          <div className="page-content">
            <section className="bg-auth">
              <Container>
                <Row className="justify-content-center">
                  <Col xl={10} lg={12}>
                    <Card className="auth-box">
                      <Row>
                        <Col lg={6} className="text-center">
                          <CardBody className="p-4">
                            <Link to="/">
                              <img
                                src={lightLogo}
                                alt=""
                                className="logo-light"
                              />
                              <img
                                src={lightLogo}
                                alt=""
                                className="logo-dark"
                              />
                            </Link>
                            <div className="mt-5">
                              <img
                                src={signInImage}
                                alt=""
                                className="img-fluid"
                              />
                            </div>
                          </CardBody>
                        </Col>
                        <Col lg={6}>
                          <div className="auth-content card-body p-5 text-white">
                            <div className="w-100">
                              <div className="text-center mb-4">
                                <h5>You are Logged Out</h5>
                                <p className="text-white-70">
                                  Thank you for using WeHire
                                </p>
                              </div>
                              <Link
                                to="/signin"
                                className="btn btn-white btn-hover w-100"
                              >
                                Sign In
                              </Link>
                              <div className="mt-3 text-center">
                                <p className="mb-0">
                                  Don't have an account ?{" "}
                                  <Link
                                    to="/signup"
                                    className="fw-medium text-white text-decoration-underline"
                                  >
                                    {" "}
                                    Sign Up{" "}
                                  </Link>
                                </p>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </section>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignOut;

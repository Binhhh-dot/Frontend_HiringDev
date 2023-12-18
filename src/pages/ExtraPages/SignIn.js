import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Input, Row } from "reactstrap";

//Import Image
import lightLogo from "../../assets/images/we-hire-green.png";
import darkLogo from "../../assets/images/logo-dark.png";

import signInImage from "../../assets/images/auth/sign-in.png";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import loginService from "../../services/login.service";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HashLoader } from "react-spinners";
import { requestPermission } from "../../utils/firebase";
import notificationServices from "../../services/notification.services";
import userSerrvices from "../../services/user.serrvices";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  document.title = "Sign In | WeHire - Job Listing Template | Themesdesign";
  const [loadingSignIn, setLoadingSignIn] = useState(false);
  const [devicetoken, setDevicetoken] = useState();

  const sendDeviceToken = async (token) => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await notificationServices.postUserDevice(userId, token);
      localStorage.setItem("deviceToken", token);
      console.log(response);
    } catch (error) {
      console.log(error)
    }
  };



  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoadingSignIn(true);
    let userId;
    let role;
    let refreshTokenExp;
    let accessToken;
    let refreshToken;
    let accessTokenExp;
    try {
      const response = await loginService.login(email, password);
      // Check if the API call was successful
      if (response.data.code === 200) {

        // Extract user ID from the decoded token
        userId = response.data.data.userId;
        role = response.data.data.role;
        refreshTokenExp = response.data.data.refreshTokenExp;
        accessToken = response.data.data.accessToken;
        refreshToken = response.data.data.refreshToken;
        accessTokenExp = response.data.data.accessTokenExp;
        if (userId) {
          // Save user ID to local storage
          localStorage.setItem("userId", userId);
          localStorage.setItem("role", role)
          localStorage.setItem("refreshTokenExp", refreshTokenExp)
          localStorage.setItem("accessToken", accessToken)
          localStorage.setItem("refreshToken", refreshToken)
          localStorage.setItem("accessTokenExp", accessTokenExp)
          // Navigate to "/layout3"
        }
        const responseUser = await userSerrvices.getUserById(userId);;
        const userData = responseUser.data;
        console.log(userData.data.companyId)
        console.log(role)
        if (role == "Manager") {
          navigate("/manager")
          requestPermission((token) => {
            console.log(token)
            sendDeviceToken(token);
          });
        } else if (role === "Admin") {
          navigate("/dashboard")
          requestPermission((token) => {
            console.log(token)
            sendDeviceToken(token);
          });
        }
        else {
          if (userData.data.companyId != null) {
            localStorage.setItem('companyId', userData.data.companyId);
            setLoadingSignIn(false);
            toast.success('Login successfully!');
            navigate("/home")
            requestPermission((token) => {
              console.log(token)
              sendDeviceToken(token);
            });
          } else {
            navigate("/signcompany")
            setLoadingSignIn(false);
            toast.info("Let's create company information!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        }
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoadingSignIn(false);
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
                      <Row className="g-0">
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
                          <CardBody className="auth-content p-5 h-100 text-white">
                            <div className="w-100">
                              <div className="text-center mb-4">
                                <h5>Welcome Back !</h5>
                                <p className="text-white-70">
                                  Sign in to continue to WeHire.
                                </p>
                              </div>
                              <Form
                                action="/"
                                className="auth-form"
                                onSubmit={handleSignIn}
                              >
                                <div className="mb-3">
                                  <label
                                    htmlFor="GmailInput"
                                    className="form-label"
                                  >
                                    Gmail
                                  </label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="GmailInput"
                                    placeholder="Enter your email"
                                    value={email} // <-- Đã thêm dòng này
                                    onChange={(e) => setEmail(e.target.value)} // <-- Đã thêm dòng này
                                    required
                                    onInput={(e) =>
                                      e.target.setCustomValidity("")
                                    } // Clear custom validity on input
                                    onInvalid={(e) =>
                                      e.target.setCustomValidity(
                                        "Please enter your email"
                                      )
                                    }
                                  />
                                </div>
                                <div className="mb-3">
                                  <label
                                    htmlFor="passwordInput"
                                    className="form-label"
                                  >
                                    Password
                                  </label>
                                  <Input
                                    type="password"
                                    className="form-control"
                                    id="passwordInput"
                                    placeholder="Enter your password"
                                    value={password} // <-- Đã thêm dòng này
                                    onChange={(e) =>
                                      setPassword(e.target.value)
                                    } // <-- Đã thêm dòng này
                                    required
                                    onInput={(e) =>
                                      e.target.setCustomValidity("")
                                    } // Clear custom validity on input
                                    onInvalid={(e) =>
                                      e.target.setCustomValidity(
                                        "Please enter your password"
                                      )
                                    }
                                  />
                                </div>
                                <div className="mb-4">
                                  <div className="form-check">
                                    <Link
                                      to="/resetpassword"
                                      className="float-end text-white"
                                    >
                                      Forgot Password?
                                    </Link>
                                  </div>
                                </div>
                                <div className="text-center">

                                  <button
                                    type="submit"
                                    className="btn btn-white btn-hover w-100"
                                    disabled={loadingSignIn}
                                  >
                                    {loadingSignIn ? (
                                      <HashLoader
                                        size={20}
                                        color={"green"}
                                        loading={true}
                                      />
                                    )
                                      : (
                                        "Sign In"
                                      )}
                                  </button>
                                  {error && (
                                    <p className="text-danger mt-2">{error}</p>
                                  )}
                                </div>
                              </Form>
                              <div className="mt-4 text-center">
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
                          </CardBody>
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

export default SignIn;

import React, { useState } from "react";
import { Card, CardBody, Col, Container, Input, Row } from "reactstrap";

//Import Image
import lightLogo from "../../assets/images/logo-light.png";
import darkLogo from "../../assets/images/logo-dark.png";

import signInImage from "../../assets/images/auth/sign-in.png";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import jwtDecode from 'jwt-decode';
import loginService from "../../services/login.service";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  document.title = "Sign In | Jobcy - Job Listing Template | Themesdesign";

  const handleSignIn = async (e) => {
    e.preventDefault();
    let userId;
    let role;
    try {
      const response = await loginService.login(email, password);
      // Check if the API call was successful
      if (response.data.code === 200) {

        // Extract user ID from the decoded token
        userId = response.data.data.userId;
        role = response.data.data.role;
        if (userId) {
          // Save user ID to local storage
          localStorage.setItem("userId", userId);
          localStorage.setItem("role", role)
          // Navigate to "/layout3"
        }
      }
    } catch (error) {
      console.log("Error during login:", error.response.data.message);
      setError(error.response.data.message);
    }

    const responseUser = await axios.get(`https://wehireapi.azurewebsites.net/api/User/${userId}`);
    const userData = responseUser.data;
    console.log(userData.data.companyId)
    console.log(role)
    if (role == "Manager") {
      navigate("/layout3")
    } else {
      if (userData.data.companyId != null) {
        localStorage.setItem('companyId', userData.data.companyId);
        navigate("/layout3")
      } else {
        navigate("/signcompany")
      }
    }

  };

  const saveTokenToLocalStorage = (token) => {
    // Implement your logic to save the token to local storage
    // For example:
    localStorage.setItem("accessToken", token);
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
                                src={darkLogo}
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
                                  Sign in to continue to Jobcy.
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
                                    Mật khẩu
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
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="flexCheckDefault"
                                    />
                                    <Link
                                      to="/resetpassword"
                                      className="float-end text-white"
                                    >
                                      Forgot Password?
                                    </Link>
                                    <label
                                      className="form-check-label"
                                      htmlFor="flexCheckDefault"
                                    >
                                      Remember me
                                    </label>
                                  </div>
                                </div>
                                <div className="text-center">
                                  <button
                                    type="submit"
                                    className="btn btn-white btn-hover w-100"
                                  >
                                    Sign In
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

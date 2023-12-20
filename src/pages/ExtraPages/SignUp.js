import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Card, Col, Input, Row, CardBody } from "reactstrap";

import lightLogo from "../../assets/images/we-hire-green.png";
import darkLogo from "../../assets/images/logo-dark.png";

import signUpImage from "../../assets/images/auth/sign-up.png";
import { Form } from "react-bootstrap";
import axios from "axios"; // Import Axios
import loginService from "../../services/login.service";
import { HashLoader } from "react-spinners";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  document.title = "Sign Up | WeHire";
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [loadingSignUp, setLoadingSignUp] = useState(false);


  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoadingSignUp(true);
    try {
      const response = await loginService.signUp(formData);

      if (response.status === 201) {
        // Đăng ký thành công, chuyển hướng đến trang đăng nhập
        navigate("/signin")
        toast.success("Sign up sucessfully")
      }
      setLoadingSignUp(false);
    } catch (error) {
      console.error("Lỗi khi đăng ký:", error);
      setLoadingSignUp(false);
      // Xử lý lỗi tại đây nếu cần thiết
      toast.error(error.response.data.message)
    }
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;

    // Thực hiện cập nhật state formData
    setFormData({ ...formData, email: newEmail });

    // Thực hiện xử lý kiểm tra email
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail);

    if (newEmail.trim() === '') {
      e.target.setCustomValidity('Please enter your email');
      return; // Không cần kiểm tra tiếp nếu trống
    }

    if (!isValidEmail) {
      e.target.setCustomValidity('Please enter a valid email address.');
    } else {
      e.target.setCustomValidity('');
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
                      <Row className="align-items-center">
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
                                src={signUpImage}
                                alt=""
                                className="img-fluid"
                              />
                            </div>
                          </CardBody>
                        </Col>
                        <Col lg={6}>
                          <CardBody className="auth-content p-5 text-white">
                            <div className="w-100">
                              <div className="text-center">
                                <h5>Let's Get Started</h5>
                                <p className="text-white-70">
                                  Sign Up and get access to all the features of
                                  WeHire
                                </p>
                              </div>
                              <Form action="/" className="auth-form" onSubmit={handleSignUp} lang="en">
                                <div className="mb-3">
                                  <label
                                    htmlFor="firstnameInput"
                                    className="form-label"
                                  >
                                    First Name
                                  </label>
                                  <Input lang="en"
                                    type="text"
                                    className="form-control"
                                    required
                                    id="firstnameInput"
                                    placeholder="Enter your first name"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    onInput={(e) => e.target.setCustomValidity('')} // Clear custom validity on input
                                    onInvalid={(e) => e.target.setCustomValidity("Please enter your first name")}
                                  />
                                </div>
                                <div className="mb-3">
                                  <label
                                    htmlFor="lastnameInput"
                                    className="form-label"
                                  >
                                    Last Name
                                  </label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    required
                                    id="lastnameInput"
                                    placeholder="Enter your last name"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    onInput={(e) => e.target.setCustomValidity('')} // Clear custom validity on input
                                    onInvalid={(e) => e.target.setCustomValidity("Please enter your last name")}
                                  />
                                </div>
                                <div className="mb-3">
                                  <label
                                    htmlFor="phonenumberInput"
                                    className="form-label"
                                  >
                                    Phone Number
                                  </label>
                                  <Input
                                    type="number"
                                    className="form-control"
                                    required
                                    id="phonenumberInput"
                                    placeholder="Enter your phone number"
                                    value={formData.phoneNumber}
                                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                    onInput={(e) => e.target.setCustomValidity('')} // Clear custom validity on input
                                    onInvalid={(e) => e.target.setCustomValidity("Please enter your phone number")}
                                  />
                                </div>
                                <div className="mb-3">
                                  <label
                                    htmlFor="passwordInput"
                                    className="form-label"
                                  >
                                    Email
                                  </label>
                                  <Input
                                    lang="en"
                                    type="email"
                                    className="form-control"
                                    id="emailInput"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleEmailChange}
                                    required
                                    onInvalid={(e) => e.target.setCustomValidity("Please enter your email")}
                                  />
                                </div>
                                <div className="mb-3">
                                  <label
                                    htmlFor="emailInput"
                                    className="form-label"
                                  >
                                    Password
                                  </label>
                                  <Input
                                    type="password"
                                    className="form-control"
                                    id="passwordInput"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    required
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    onInput={(e) => e.target.setCustomValidity('')} // Clear custom validity on input
                                    onInvalid={(e) => e.target.setCustomValidity("Please enter your password")}
                                  />
                                </div>
                                {/* <div className="mb-4">
                                  <div className="form-check">
                                    <Input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="flexCheckDefault"
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="flexCheckDefault"
                                    >
                                      I agree to the{" "}
                                      <Link
                                        to="#"
                                        className="text-white text-decoration-underline"
                                      >
                                        Terms and conditions
                                      </Link>
                                    </label>
                                  </div>
                                </div> */}
                                <div className="text-center">
                                  {error && <p className="text-danger mt-2">{error}</p>}
                                  <button
                                    type="submit"
                                    className="btn btn-white btn-hover w-100"
                                    disabled={loadingSignUp}
                                  >
                                    {loadingSignUp ? (
                                      <HashLoader
                                        size={20}
                                        color={"green"}
                                        loading={true}
                                      />
                                    )
                                      : (
                                        "Sign Up"
                                      )}
                                  </button>
                                </div>
                              </Form>
                              <div className="mt-3 text-center">
                                <p className="mb-0">
                                  Already a member ?{" "}
                                  <Link
                                    to="/signin"
                                    className="fw-medium text-white text-decoration-underline"
                                  >
                                    {" "}
                                    Sign In{" "}
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

export default SignUp;

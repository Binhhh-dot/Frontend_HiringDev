import React, { useEffect, useState } from "react";

import lightLogo from "../../assets/images/logo-light.png";
import darkLogo from "../../assets/images/logo-dark.png";
import signInImage from "../../assets/images/auth/sign-in.png";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewWindow from 'react-new-window';
// import { useHistory } from 'react-router-dom';

const Callback = () => {
    // const history = useHistory();
    const location = useLocation();
    document.title = "Sign Out | Jobcy - Job Listing Template | Themesdesign";
    console.log(process.env.SERVICE_URL);
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const code = queryParams.get("code");
        console.log(code)
        sendMessageToParent();
    }, []);

    const sendMessageToParent = () => {
        if (window.opener) {
            const queryParams = new URLSearchParams(location.search);
            const code = queryParams.get("code");
            window.opener.postMessage(code, '*');
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
                                                <Col lg={6}>
                                                    <div className="auth-content card-body p-5 text-white">
                                                        <div className="w-100">
                                                            <div className="text-center mb-4">
                                                                <h5>You are Logged Out</h5>
                                                                <p className="text-white-70">
                                                                    Thank you for using Jobcy
                                                                </p>
                                                            </div>


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

export default Callback;

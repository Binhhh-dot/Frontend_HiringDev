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

const CallbackPayment = () => {
    const [loading, setLoading] = useState(true);
    // const history = useHistory();
    const location = useLocation();
    document.title = "Sign Out | WeHire - Job Listing Template | Themesdesign";
    console.log(process.env.SERVICE_URL);
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const code = queryParams.get("code");
        const PayerID = queryParams.get("PayerID");
        const paymentId = queryParams.get("paymentId");
        console.log(code)
        console.log(PayerID)
        console.log(paymentId)
        sendMessageToParent(PayerID, paymentId);
    }, []);

    const sendMessageToParent = (PayerID, paymentId) => {
        window.opener.postMessage({ PayerID, paymentId }, '*');
    };



    return (
        <React.Fragment>
            {loading && (
                <div className="overlayNoCloud" style={{ zIndex: "2000" }}>
                    <div className="spinnerNoCloud"></div>
                </div>
            )}
            <div>
                <div className="main-content">
                    <div className="page-content">
                        <section className="bg-auth">
                            <Container>

                            </Container>
                        </section>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default CallbackPayment;

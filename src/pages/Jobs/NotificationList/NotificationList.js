import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Section from "./Section";
import { useNavigate } from "react-router-dom";
import NotificationVacancyList from "./NotificationVacancyList";

const NotificationList = () => {
    document.title = "Job List | WeHire - Job Listing Template | Themesdesign";
    const navigate = useNavigate();
    return (
        <React.Fragment>
            <Section />
            <section className="section">
                <Container>
                    <Row>
                        <Col lg={12}>
                            <div className="me-lg-6">
                                <h3>Notification List</h3>
                                <NotificationVacancyList></NotificationVacancyList>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    );
};

export default NotificationList;

import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Section from "../ReportList/Section";
import { useNavigate } from "react-router-dom";
import ReportVacancyList from "./ReportVacancyList";

const ReportList = () => {
    document.title = "Report List | WeHire ";
    const navigate = useNavigate();
    return (
        <React.Fragment>
            <Section />
            <section className="section">
                <Container>
                    <Row>
                        <Col lg={12}>
                            <div className="me-lg-6">
                                <h3>Report List</h3>
                                <ReportVacancyList></ReportVacancyList>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    );
};

export default ReportList;

import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Section from "../ContractDetail/Section";
import { useNavigate } from "react-router-dom";
import ContractVacancyDetail from "./ContractVacancyDetail";

const ContractDetail = () => {
    document.title = "Job List | Jobcy - Job Listing Template | Themesdesign";
    const navigate = useNavigate();
    return (
        <React.Fragment>
            <Section />
            <section className="section">
                <Container>
                    <Row>
                        <Col lg={12}>
                            <div className="me-lg-6">
                                <ContractVacancyDetail></ContractVacancyDetail>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    );
};

export default ContractDetail;

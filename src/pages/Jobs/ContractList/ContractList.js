import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Section from "../ContractList/Section";
import { useNavigate } from "react-router-dom";
import ContractVacncyList from "./ContractVacncyList";

const ContractList = () => {
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
                                <h3>Report List</h3>
                                <ContractVacncyList></ContractVacncyList>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    );
};

export default ContractList;

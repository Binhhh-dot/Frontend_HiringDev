import React from "react";
import { useEffect } from "react";
import { Col, Row } from "reactstrap";
import hiringrequestService from "../../../services/hiringrequest.service";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Section = () => {
  const [projectId, setProjectId] = useState(null);
  const location = useLocation();
  const getIdProject = async () => {
    let response;
    // const saveData = localStorage.getItem("myData");
    try {
      const queryParams = new URLSearchParams(location.search);
      const jobId = queryParams.get("Id");
      response = await hiringrequestService.getHiringRequestDetailInCompany(
        jobId
      );
      setProjectId(response.data.data.projectId);

    } catch (error) {
      console.error("Error fetching job vacancies:", error);
    }
  };

  useEffect(() => {
    getIdProject();
  }, []);
  return (
    <React.Fragment>
      <section className="page-title-box">
        <div className="container">
          <Row className="justify-content-center">
            <Col md={6}>
              <div className="text-center text-white">
                <h3 className="mb-4">
                  Hiring Request List
                </h3>
                <div className="page-next">
                  <nav
                    className="d-inline-block"
                    aria-label="breadcrumb text-center"
                  >
                    <ol className="breadcrumb justify-content-center">
                      <li className="breadcrumb-item">
                        <Link to="/home">Home</Link>
                      </li>
                      <li className="breadcrumb-item">
                        <Link to={`/projectdetailhr?Id='${projectId}'`}>project detail</Link>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        {" "}
                        Hiring Request Detail{" "}
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>
      <div className="position-relative" style={{ zIndex: 1 }}>
        <div className="shape">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 250">
            <path
              fill="#FFFFFF"
              fillOpacity="1"
              d="M0,192L120,202.7C240,213,480,235,720,234.7C960,235,1200,213,1320,202.7L1440,192L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Section;

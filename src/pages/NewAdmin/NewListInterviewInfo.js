import React from "react";
import { Col, Row, Input } from "reactstrap";
import { Form } from "react-bootstrap";
import jobImage1 from "../../assets/images/featured-job/img-01.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faCalendarDays,
  faUser,
  faHourglassHalf,
} from "@fortawesome/free-regular-svg-icons";

const NewListInterviewInfo = () => {
  return (
    <React.Fragment>
      <div className="job-list-header mb-4">
        <Form action="#">
          <Row className="g-2">
            <Col lg={4} md={6}>
              <div className="filler-job-form">
                <i className="uil uil-briefcase-alt"></i>
                <Input
                  type="search"
                  className="form-control filter-input-box"
                  id="exampleFormControlInput1"
                  placeholder="Jobtitle... "
                  style={{ marginTop: "-10px" }}
                  value={""}
                  onChange={(e) => {}}
                />
              </div>
            </Col>

            <Col lg={5} md={6}>
              <div className="filler-job-form">
                <i className="uil uil-clipboard-notes"></i>
                {/* <JobType skill={""} setSkill={""} /> */}
              </div>
            </Col>
            <Col lg={3} md={6}>
              <div className="btn btn-primary w-100" onClick={() => {}}>
                <i className="uil uil-filter"></i> Fliter
              </div>
            </Col>
          </Row>
        </Form>
      </div>

      <Row className="d-flex flex-column gap-2">
        <div
          className="d-flex align-items-center border border-2 p-3"
          style={{ borderRadius: "10px" }}
        >
          <Col lg={1} className="d-flex justify-content-center">
            <img src={jobImage1} alt="" className="img-fluid rounded-3" />
          </Col>
          <Col lg={3}>
            <h5 className="mb-0">Interview1</h5>
            <div className="d-flex gap-1 align-items-center">
              <FontAwesomeIcon icon={faUser} size="sm" color="#02AF74" />
              <p className="mb-0 mt-1">binh le</p>
            </div>
          </Col>
          <Col lg={3} className="d-flex  gap-2">
            <div className="d-flex flex-column gap-2">
              <FontAwesomeIcon
                icon={faCalendarDays}
                size="lg"
                color="#02AF74"
              />
              <FontAwesomeIcon icon={faClock} size="lg" color="#02AF74" />
            </div>

            <div>
              <p className="mb-0">31/10/2023</p>
              <p className="mb-0 mt-1">07:36 - 10:36</p>
            </div>
          </Col>
          <Col lg={2}>
            <span className="badge bg-warning text-light fs-12">
              Waiting Approval
            </span>
          </Col>
          <Col
            lg={3}
            className="d-flex align-items-center justify-content-center"
          >
            <p className="mb-0">Posted: 9min ago </p>
          </Col>
        </div>

        <div
          className="d-flex align-items-center border border-2 p-3"
          style={{ borderRadius: "10px" }}
        >
          <Col lg={1} className="d-flex justify-content-center">
            <img src={jobImage1} alt="" className="img-fluid rounded-3" />
          </Col>
          <Col lg={3}>
            <h5 className="mb-0">Interview1</h5>
            <div className="d-flex gap-1 align-items-center">
              <FontAwesomeIcon icon={faUser} size="sm" color="#02AF74" />
              <p className="mb-0 mt-1">binh le</p>
            </div>
          </Col>
          <Col lg={3} className="d-flex  gap-2">
            <div className="d-flex flex-column gap-2">
              <FontAwesomeIcon
                icon={faCalendarDays}
                size="lg"
                color="#02AF74"
              />
              <FontAwesomeIcon icon={faClock} size="lg" color="#02AF74" />
            </div>

            <div>
              <p className="mb-0">31/10/2023</p>
              <p className="mb-0 mt-1">07:36 - 10:36</p>
            </div>
          </Col>
          <Col lg={2}>
            <span className="badge bg-warning text-light fs-12">
              Waiting Approval
            </span>
          </Col>
          <Col
            lg={3}
            className="d-flex align-items-center justify-content-center"
          >
            <p className="mb-0">Posted: 9min ago </p>
          </Col>
        </div>

        <div
          className="d-flex align-items-center border border-2 p-3"
          style={{ borderRadius: "10px" }}
        >
          <Col lg={1} className="d-flex justify-content-center">
            <img src={jobImage1} alt="" className="img-fluid rounded-3" />
          </Col>
          <Col lg={3}>
            <h5 className="mb-0">Interview1</h5>
            <div className="d-flex gap-1 align-items-center">
              <FontAwesomeIcon icon={faUser} size="sm" color="#02AF74" />
              <p className="mb-0 mt-1">binh le</p>
            </div>
          </Col>
          <Col lg={3} className="d-flex  gap-2">
            <div className="d-flex flex-column gap-2">
              <FontAwesomeIcon
                icon={faCalendarDays}
                size="lg"
                color="#02AF74"
              />
              <FontAwesomeIcon icon={faClock} size="lg" color="#02AF74" />
            </div>

            <div>
              <p className="mb-0">31/10/2023</p>
              <p className="mb-0 mt-1">07:36 - 10:36</p>
            </div>
          </Col>
          <Col lg={2}>
            <span className="badge bg-warning text-light fs-12">
              Waiting Approval
            </span>
          </Col>
          <Col
            lg={3}
            className="d-flex align-items-center justify-content-center"
          >
            <p className="mb-0">Posted: 9min ago </p>
          </Col>
        </div>

        <div
          className="d-flex align-items-center border border-2 p-3"
          style={{ borderRadius: "10px" }}
        >
          <Col lg={1} className="d-flex justify-content-center">
            <img src={jobImage1} alt="" className="img-fluid rounded-3" />
          </Col>
          <Col lg={3}>
            <h5 className="mb-0">Interview1</h5>
            <div className="d-flex gap-1 align-items-center">
              <FontAwesomeIcon icon={faUser} size="sm" color="#02AF74" />
              <p className="mb-0 mt-1">binh le</p>
            </div>
          </Col>
          <Col lg={3} className="d-flex  gap-2">
            <div className="d-flex flex-column gap-2">
              <FontAwesomeIcon
                icon={faCalendarDays}
                size="lg"
                color="#02AF74"
              />
              <FontAwesomeIcon icon={faClock} size="lg" color="#02AF74" />
            </div>

            <div>
              <p className="mb-0">31/10/2023</p>
              <p className="mb-0 mt-1">07:36 - 10:36</p>
            </div>
          </Col>
          <Col lg={2}>
            <span className="badge bg-warning text-light fs-12">
              Waiting Approval
            </span>
          </Col>
          <Col
            lg={3}
            className="d-flex align-items-center justify-content-center"
          >
            <p className="mb-0">Posted: 9min ago </p>
          </Col>
        </div>

        <div
          className="d-flex align-items-center border border-2 p-3"
          style={{ borderRadius: "10px" }}
        >
          <Col lg={1} className="d-flex justify-content-center">
            <img src={jobImage1} alt="" className="img-fluid rounded-3" />
          </Col>
          <Col lg={3}>
            <h5 className="mb-0">Interview1</h5>
            <div className="d-flex gap-1 align-items-center">
              <FontAwesomeIcon icon={faUser} size="sm" color="#02AF74" />
              <p className="mb-0 mt-1">binh le</p>
            </div>
          </Col>
          <Col lg={3} className="d-flex  gap-2">
            <div className="d-flex flex-column gap-2">
              <FontAwesomeIcon
                icon={faCalendarDays}
                size="lg"
                color="#02AF74"
              />
              <FontAwesomeIcon icon={faClock} size="lg" color="#02AF74" />
            </div>

            <div>
              <p className="mb-0">31/10/2023</p>
              <p className="mb-0 mt-1">07:36 - 10:36</p>
            </div>
          </Col>
          <Col lg={2}>
            <span className="badge bg-warning text-light fs-12">
              Waiting Approval
            </span>
          </Col>
          <Col
            lg={3}
            className="d-flex align-items-center justify-content-center"
          >
            <p className="mb-0">Posted: 9min ago </p>
          </Col>
        </div>
      </Row>
    </React.Fragment>
  );
};

export default NewListInterviewInfo;

import React, { useState } from "react";
import { Form, Col, Row, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Input, ModalBody } from "reactstrap";
import CountryOptions from "../../Home/SubSection/CountryOptions";
import JobType from "../../Home/SubSection/JobType";

const JobFilters = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCreateInterview = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [dateOfInterview, setDateOfInterview] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSaveChanges = () => {
    // Xử lý logic lưu thay đổi (có thể thêm vào đây)
    handleCloseModal();
  };

  return (
    <React.Fragment>
      <Row className="justify-content-center">
        <Col lg={12}>
          <div className="candidate-list-widgets mb-4">
            <Form action="#">
              <Row className="g-2">
                <Col lg={3}>
                  <div className="filler-job-form">
                    <i className="uil uil-briefcase-alt"></i>
                    <Input
                      type="search"
                      className="form-control filter-input-box"
                      id="exampleFormControlInput1"
                      placeholder="Developer Name... "
                      style={{ marginTop: "-12px" }}
                    />
                  </div>
                </Col>
                <Col lg={3}>
                  <div className="filler-job-form">
                    <i className="uil uil-monitor"></i>

                    <CountryOptions />
                  </div>
                </Col>
                <Col lg={3}>
                  <div className="filler-job-form">
                    <i className="uil uil-clipboard-notes"></i>
                    <JobType />
                  </div>
                </Col>
                <Col lg={3}>
                  <div className="d-flex justify-content-between">
                    <div>
                      <Link to="#" className="btn btn-primary">
                        <i className="uil uil-filter"></i> Filter
                      </Link>
                    </div>

                    <div>
                      <button
                        className="btn btn-success"
                        style={{ backgroundColor: "#02AF74" }}
                        onClick={handleCreateInterview}
                      >
                        Create Interview
                      </button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>

      {/*Modal*/}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        style={{ marginTop: "100px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Interview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Your form for creating interview goes here */}
          <Form>
            <Form.Group controlId="dateOfInterview">
              <Form.Label>Date of Interview</Form.Label>
              <Form.Control
                type="date"
                value={dateOfInterview}
                onChange={(e) => setDateOfInterview(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="startTime">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="endTime">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default JobFilters;

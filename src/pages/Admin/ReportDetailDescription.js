import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  Row,
  Modal,
  ModalBody,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavItem,
  NavLink,
  Nav,
  TabPane,
  TabContent,
} from "reactstrap";
import { Link, Navigate, useLocation } from "react-router-dom";
import { Progress, Space } from "antd";
import reportServices from "../../services/report.services";

const ReportDetailDescription = () => {
  //-------------------------------------------------------------------------
  const { state } = useLocation();

  const [reportDetailDescription, setReportDetailDescription] = useState([]);

  const [replyText, setReplyText] = useState("");

  const [replyTextResult, setReplyTextResult] = useState("");

  const [responseVisible, setresponseVisible] = useState(false);

  const [replyAction, setReplyAction] = useState(false);

  const [confirmButton, setConfirmButton] = useState(true);

  const handleReplyChange = (e) => {
    setReplyText(e.target.value);
  };

  // const handleReplySubmit = () => {
  //   console.log("Reply:", replyText);
  //   fetchHandleRelyReport();
  // };

  //-------------------------------------------------------------------------
  const fetchGetReportById = async () => {
    let response;
    try {
      response = await reportServices.getReportById(state.reportId);
      console.log(response.data.data.responseContent);
      setReportDetailDescription(response.data.data);
      setReplyTextResult(response.data.data.responseContent);
      if (response.data.data.statusString == "Pending") {
        setresponseVisible(false);
        setReplyAction(false);
      } else if (response.data.data.statusString == "Processing") {
        //setresponseVisible(true);
        setReplyAction(true);
        setConfirmButton(false);
      } else {
        setresponseVisible(true);
        setReplyAction(false);
        setConfirmButton(false);
      }
    } catch (error) {
      console.error("Error fetching get report by Id", error);
    }
  };

  //-------------------------------------------------------------------------
  const fetchHandleRelyReport = async () => {
    let response;
    try {
      response = await reportServices.handleRelyReport(
        state.reportId,
        replyText
      );
      console.log("reply ok");
      console.log(response.data.data);
      fetchGetReportById();
    } catch (error) {
      console.error("Error fetching handle reply report", error);
    }
  };
  //-------------------------------------------------------------------------
  const fetchHandleConfirmReport = async () => {
    let response;
    try {
      response = await reportServices.handleConfirmReport(state.reportId);
      console.log("Confirm OK");
      fetchGetReportById();
    } catch (error) {
      console.error("Error fetching handle confirm report", error);
    }
  };
  //-------------------------------------------------------------------------

  useEffect(() => {
    fetchGetReportById();
  }, []);
  //-------------------------------------------------------------------------
  return (
    <React.Fragment>
      <Card
        className="job-detail "
        style={{
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <div>
          <div className="job-details-compnay-profile d-flex justify-content-between">
            <div
              className="d-flex flex-column align-self-end"
              style={{
                paddingRight: "15px",
                position: "absolute",
                right: "0",
                top: "50px",
              }}
            >
              <div className="d-flex align-items-end">
                <span
                  className={
                    reportDetailDescription.statusString === "Pending"
                      ? "badge bg-warning text-light fs-12"
                      : reportDetailDescription.statusString === "Processing"
                      ? "badge bg-blue text-light fs-12"
                      : reportDetailDescription.statusString === "Rejected"
                      ? "badge bg-danger text-light fs-12"
                      : reportDetailDescription.statusString === "Expired"
                      ? "badge bg-danger text-light fs-12"
                      : reportDetailDescription.statusString === "Cancelled"
                      ? "badge bg-danger text-light fs-12"
                      : reportDetailDescription.statusString === "Closed"
                      ? "badge bg-secondary text-light fs-12"
                      : reportDetailDescription.statusString === "Done"
                      ? "badge bg-newGreen text-light fs-12"
                      : reportDetailDescription.statusString === "Saved"
                      ? "badge bg-info text-light fs-12"
                      : ""
                  }
                >
                  {reportDetailDescription.statusString}
                </span>
              </div>
            </div>
          </div>
        </div>
        <CardBody className="p-3">
          <div>
            <Row>
              <Col md={8}>
                <h3 className="mb-1">{reportDetailDescription.reportTitle}</h3>
              </Col>
            </Row>
          </div>

          <div className="mt-4">
            <h5>Report Type</h5>
            <div
              className="p-2"
              style={{ borderRadius: "8px", backgroundColor: "#F8F9F9" }}
            >
              <p className="mb-0">{reportDetailDescription.reportTypeTitle}</p>
            </div>
          </div>

          <div className="mt-4">
            <h5>Report Content</h5>
            <div
              className=" p-2 mt-2"
              style={{ borderRadius: "8px", backgroundColor: "#F8F9F9" }}
            >
              <p className="mb-0">{reportDetailDescription.reportContent}</p>
            </div>
          </div>

          {confirmButton && (
            <div className="mt-4 d-flex justify-content-center">
              <button
                className="btn btn-primary"
                onClick={fetchHandleConfirmReport}
              >
                Confirm Report
              </button>
            </div>
          )}

          {responseVisible && (
            <div className="mt-4">
              <h5>Response</h5>
              <div
                className=" p-2 mt-2"
                style={{ borderRadius: "8px", backgroundColor: "#F8F9F9" }}
              >
                <p className="mb-0">{replyTextResult}</p>
              </div>
            </div>
          )}

          {replyAction && (
            <div className="mt-4 reply-report d-flex flex-column">
              <div className="mb-3">
                <label htmlFor="replyTextArea" className="form-label">
                  Response:
                </label>
                <textarea
                  className="form-control"
                  id="replyTextArea"
                  rows="3"
                  onChange={(e) => handleReplyChange(e)}
                ></textarea>
              </div>
              <button
                className="btn btn-primary"
                onClick={fetchHandleRelyReport}
              >
                Submit
              </button>
            </div>
          )}
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default ReportDetailDescription;

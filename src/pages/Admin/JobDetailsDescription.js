import React, { useEffect, useState } from "react";
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

import DeveloperDetailInManagerPopup from "../Home/SubSection/DeveloperDetailInManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";

//import { Link } from "react-router-dom";
import "./index.css";

import hiringrequestService from "../../services/hiringrequest.service";

import developer from "../../services/developer.services";
import { Progress, Space } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import hireddevServices from "../../services/hireddev.services";
import { RingLoader } from "react-spinners";

const JobDetailsDescription = () => {
  const [loading, setLoading] = useState(false);

  const { state } = useLocation();

  const [hiringRequestDetail, setHiringRequestDetail] = useState(null);

  const [devMatching, setDevMatching] = useState([]);

  const [devHasBeenSent, setDevHasBeenSent] = useState([]);

  const [currentListDev, setCurrentListDev] = useState("matching");

  const [disableIconCancel, setDisableIconCancel] = useState(false);

  const [isVisibleListDevAfter, setIsVisibleListDevAfter] = useState(false);
  //const [listDevAfterReject, setListDevAfterReject] = useState([]);

  const [targetDevManager, setTargetDevManager] = useState(0);
  const [numberOfDevManager, setNumberOfDevManager] = useState(0);

  const handleTabChange = (tab) => {
    setCurrentListDev(tab);
    console.log(tab);
  };

  /////////////////////////////////////////////////////////////////////////////////////////
  const [showCandidateList, setShowCandidateList] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCandidateInfo, setSelectedCandidateInfo] = useState({});

  const openModal = (candidateInfo) => {
    setSelectedCandidateInfo(candidateInfo);
    setIsModalOpen(true);
    console.log(candidateInfo);
  };

  const closeModal = () => {
    setSelectedCandidateInfo({});
    setIsModalOpen(false);
  };

  //------------------------------------------------------------------------------------

  const [selectedDev, setSelectedDev] = useState([]);
  const [isSendButtonVisible, setIsSendButtonVisibility] = useState(false);

  const toggleDevMatchingSelection = (candidateId) => {
    setSelectedDev((prevSelectedDev) => {
      const isSelected = prevSelectedDev.includes(candidateId);
      if (isSelected) {
        setTargetDevManager(targetDevManager - 1);
      } else {
        if (targetDevManager >= numberOfDevManager) {
          toast.warn("The number of requests for developers has been exceeded");
        }
        setTargetDevManager(targetDevManager + 1);
      }
      const updatedSelectedDev = isSelected
        ? prevSelectedDev.filter((id) => id !== candidateId)
        : [...prevSelectedDev, candidateId];

      setIsSendButtonVisibility(updatedSelectedDev.length > 0);

      return updatedSelectedDev;
    });
  };
  console.log("------------------------------------------------------");
  console.log("cac dev matching DUOC CHON de gui di cho dev chap nhan");
  console.log(selectedDev);
  console.log("------------------------------------------------------");
  //--------------------------------------------------------------------------------

  const [cancelReason, setCancelReason] = useState("");
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const openCancelModal = () => {
    setIsCancelModalOpen(true);
  };

  const closeCancelModal = () => {
    setIsCancelModalOpen(false);
  };

  const handleCancelRequest = () => {
    if (cancelReason.trim() === "") {
      console.log("Please enter a reason for cancellation.");
      toast.warning("Please enter a reason for cancellation", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      fetchCancelHirringRequestStatus();
      console.log("Cancel Request Reason:", cancelReason);
      closeCancelModal();
    }
  };

  //---------------------------------------------------------------------------------------------------
  const fetchCancelHirringRequestStatus = async () => {
    let response;
    try {
      response = await hiringrequestService.cancelHirringRequestStatus(
        state.hiringRequestId,
        cancelReason,
        false
      );
      fetchHiringRequestDetailInManager();
      console.log("li do cancel request:");
      console.log(cancelReason);
      toast.success("Cancel Successfully!");
      return response;
    } catch (error) {
      console.error("Error fetching cancel hiring request", error);
      toast.error("Cancel Hiring Request Failed", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  //---------------------------------------------------------------------------------------------------

  const fetchHiringRequestDetailInManager = async () => {
    let response;

    try {
      response = await hiringrequestService.getHiringRequestDetailInManager(
        state.hiringRequestId
      );

      setHiringRequestDetail(response.data.data);
      console.log("hiring request detail in manager");
      console.log(response.data.data);
      if (
        response.data.data.statusString !== "Waiting Approval" &&
        response.data.data.statusString !== "Rejected"
      ) {
        setShowCandidateList(true);
      }

      if (
        response.data.data.statusString === "Closed" ||
        response.data.data.statusString === "Completed"
      ) {
        setShowCandidateList(false);
        setIsVisibleListDevAfter(true);
      }

      setTargetDevManager(response.data.data.targetedDev);
      setNumberOfDevManager(response.data.data.numberOfDev);
      return response;
    } catch (error) {
      console.error("Error fetching hiring request:", error);
    }
  };

  const fetchDeveloperMatchingInManager = async () => {
    let response;

    try {
      response = await developer.getDeveloperMatchingInManager(
        state.hiringRequestId
      );

      setDevMatching(response.data.data);
      console.log("request id: " + state.hiringRequestId);
      console.log("danh sach dev matching");
      console.log(response.data.data);
      return response;
    } catch (error) {
      console.error("Error fetching developer matching:", error);
    }
  };

  const fetchSendDevToHRNew = async () => {
    let response;
    setLoading(true);
    try {
      response = await hireddevServices.sendDevToHRNew(
        state.hiringRequestId,
        selectedDev
      );
      setIsSendButtonVisibility(false);
      fetchDeveloperMatchingInManager();
      setLoading(false);

      toast.success("Send developer successfully!");
    } catch (error) {
      console.error("Error fetching send dev to HR:", error);
      setLoading(false);

      toast.error("Send developer to HR error", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const fetchGetSelectedDevByManager = async () => {
    let response;
    try {
      response = await hireddevServices.getSelectedDevByManager(
        state.hiringRequestId
      );
      setDevHasBeenSent(response.data.data);
      console.log(" dev vua duoc gui la");
      console.log(response.data.data);
      console.log("------------------------------------------");

      return response;
    } catch (error) {
      console.error("Error fetching dev matching has been sent:", error);
    }
  };

  //--------------------------------------------------------------------------------
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);

  const openAcceptModal = () => {
    setIsAcceptModalOpen(true);
  };

  const closeAcceptModal = () => {
    setIsAcceptModalOpen(false);
  };

  const handleAcceptModalAccept = async () => {
    try {
      const response = await hiringrequestService.approvedHirringRequestStatus(
        state.hiringRequestId,
        "string",
        true
      );

      if (response.status === 200) {
        setShowCandidateList(true);
        fetchHiringRequestDetailInManager();
        setIsAcceptModalOpen(false);
      } else {
        setIsAcceptModalOpen(false);
      }
      toast.success("Approved successfully!");
      return response;
    } catch (error) {
      console.error("Error fetching approved hiring request", error);
      toast.error("Approved hiring request failed", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  //--------------------------------------------------------------------------------

  //trang handle nut send
  const [isPopConfirmOpen, setIsPopupConfirmOpen] = useState(false);

  const handleSendToDev = () => {
    setIsPopupConfirmOpen(true);
  };
  const handleConfirm = () => {
    fetchSendDevToHRNew();
    setIsPopupConfirmOpen(false);
    setSelectedDev([]);
  };

  const handleConfirmCancel = () => {
    setIsPopupConfirmOpen(false);
  };

  //////////////////////////////////////////////////////////////////////////////
  const getDevNameMatching = (id) => {
    const fullNameMathcing = devMatching.find((dev) => dev.developerId === id);
    return fullNameMathcing?.firstName + " " + fullNameMathcing?.lastName;
  };

  /////////////////////////////////////////////////////////////////////////////
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown((prevState) => !prevState);

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleCloseDropdown = () => {
    setShowDropdown(false);
  };

  //----------------------------------------------------------------------------------------

  const [cancelReasonAfter, setCancelReasonAfter] = useState("");

  const fetchCancelHirringRequestStatusAfter = async () => {
    let response;
    try {
      response = await hiringrequestService.cancelHirringRequestStatusAfter(
        state.hiringRequestId,
        cancelReasonAfter,
        false
      );
      fetchHiringRequestDetailInManager();
      console.log(cancelReasonAfter);
      toast.success("Close hiring request successfully!");
    } catch (error) {
      console.error("Error fetching closed hiring request after", error);
      toast.error("Close hiring request failed", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  //---------------------------------------------------------------------------------------
  //handle modal cancel request after
  const [isCancelAfterModalOpen, setIsCancelAfterModalOpen] = useState(false);

  const openCancelAfterModal = () => {
    setIsCancelAfterModalOpen(true);
  };

  const closeCancelAfterModal = () => {
    setIsCancelAfterModalOpen(false);
  };

  const handleCancelAfterRequest = () => {
    if (cancelReasonAfter.trim() === "") {
      console.log("Please enter a reason for cancellation.");
      toast.warning("Please enter a reason for cancellation", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      fetchCancelHirringRequestStatusAfter();
      closeCancelAfterModal();
    }
  };
  //----------------------------------------------------------------------------------------

  useEffect(() => {
    fetchHiringRequestDetailInManager();
  }, []);

  useEffect(() => {
    fetchGetSelectedDevByManager();
  }, [devMatching]);

  useEffect(() => {
    fetchDeveloperMatchingInManager();
  }, []);

  const candidateDetails = devMatching;

  const getBarColor = (progress) => {
    if (progress <= 30) {
      return "#fe3839";
    } else if (progress <= 50) {
      return "#ffb302";
    } else if (progress <= 80) {
      return "#fbe83a";
    } else {
      return "#57f000";
    }
  };

  if (!state?.hiringRequestId) {
    return <Navigate to={"/"}></Navigate>;
  }

  if (!hiringRequestDetail) {
    return null;
  }

  return (
    <React.Fragment>
      <Card
        className="job-detail "
        style={{
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        {loading && (
          <div className="overlay" style={{ zIndex: "2000" }}>
            <div className="spinner"></div>
          </div>
        )}

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
              <div className="d-flex align-items-end gap-2">
                <span
                  className={
                    hiringRequestDetail.statusString === "Waiting Approval"
                      ? "badge bg-warning text-light fs-12"
                      : hiringRequestDetail.statusString === "In Progress"
                      ? "badge bg-blue text-light fs-12"
                      : hiringRequestDetail.statusString === "Rejected"
                      ? "badge bg-danger text-light fs-12"
                      : hiringRequestDetail.statusString === "Expired"
                      ? "badge bg-danger text-light fs-12"
                      : hiringRequestDetail.statusString === "Cancelled"
                      ? "badge bg-danger text-light fs-12"
                      : hiringRequestDetail.statusString === "Closed"
                      ? "badge bg-secondary text-light fs-12"
                      : hiringRequestDetail.statusString === "Completed"
                      ? "badge bg-newGreen text-light fs-12"
                      : hiringRequestDetail.statusString === "Saved"
                      ? "badge bg-info text-light fs-12"
                      : ""
                  }
                  company={{ companyMana: hiringRequestDetail.companyId }}
                >
                  {hiringRequestDetail.statusString}
                </span>

                {hiringRequestDetail.statusString === "Waiting Approval" ||
                hiringRequestDetail.statusString === "Closed" ||
                hiringRequestDetail.statusString === "Completed" ? (
                  <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    size="xl"
                    color="#909191"
                  />
                ) : (
                  <Dropdown
                    isOpen={showDropdown}
                    toggle={toggleDropdown}
                    disabled={disableIconCancel}
                  >
                    <DropdownToggle
                      caret
                      style={{
                        padding: "0px",
                        backgroundColor: "white",
                        border: "0px",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faEllipsisVertical}
                        size="xl"
                        color="#909191"
                        // onClick={handleDropdownClick}
                      />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem header style={{ textAlign: "center" }}>
                        Are you sure?
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>
                        <button
                          className="d-flex justify-content-center"
                          style={{
                            width: "100%",
                            padding: "7px",
                            fontWeight: "500",
                          }}
                          class="btn btn-danger"
                          role="button"
                          onClick={openCancelAfterModal}
                        >
                          <span style={{ fontSize: "15px" }}>
                            Closed Request
                          </span>
                        </button>
                      </DropdownItem>
                      <DropdownItem divider />
                    </DropdownMenu>
                  </Dropdown>
                )}
              </div>
            </div>
          </div>
        </div>
        <CardBody className="p-3 ">
          <div>
            <Row>
              <Col md={8}>
                <h3 className="mb-1">{hiringRequestDetail.jobTitle}</h3>
                <p
                  className="fw-medium mb-0 text-muted"
                  style={{ fontStyle: "italic" }}
                >
                  #{hiringRequestDetail.requestCode}
                </p>
              </Col>
            </Row>
          </div>

          <div className="mt-4">
            <Row className="g-2" style={{ columnGap: "0px" }}>
              <Col
                lg={3}
                className="border rounded p-3 "
                style={{ maxWidth: "266px" }}
              >
                <div>
                  <p className="text-muted mb-0 fs-13">Employment Type</p>
                  <p className="fw-medium mb-0 badge bg-info-subtle text-info">
                    {hiringRequestDetail.employmentTypeName}
                  </p>
                </div>
              </Col>
              <Col
                lg={3}
                className="border rounded p-3"
                style={{ maxWidth: "266px" }}
              >
                <div id="standard">
                  <p className="text-muted fs-13 mb-0">Number Of Dev</p>

                  <p className="fw-medium mb-0 badge bg-success-subtle text-success">
                    {hiringRequestDetail.numberOfDev}
                  </p>
                </div>
              </Col>

              <Col
                lg={3}
                className="border rounded p-3"
                style={{ maxWidth: "266px" }}
              >
                <div>
                  <p className="text-muted fs-13 mb-0">
                    Average Salary Developer{" "}
                  </p>

                  <p className="fw-medium mb-0 badge bg-purplel text-purple">
                    {hiringRequestDetail.salaryPerDev} VND
                  </p>
                </div>
              </Col>

              <Col
                lg={3}
                className="border rounded p-3"
                style={{ maxWidth: "266px" }}
              >
                <div id="standard">
                  <p className="text-muted fs-13 mb-0">Deadline</p>
                  <p className="fw-medium mb-0 ">
                    <span className="badge bg-orangeRed2l text-orangeRed2">
                      {hiringRequestDetail.durationMMM}
                    </span>
                  </p>
                </div>
              </Col>
            </Row>
          </div>

          <div className="mt-4">
            <div className="job-detail-desc">
              <p
                className=""
                dangerouslySetInnerHTML={{
                  __html: hiringRequestDetail.jobDescription,
                }}
              />
            </div>
          </div>

          <div className="mt-4">
            <div className="job-details-desc">
              <ul className="job-detail-list list-unstyled mb-0 ">
                <h5>Level Require</h5>
                <li className="mb-3">
                  <i className="uil uil-circle"></i>{" "}
                  {hiringRequestDetail.levelRequireName}
                </li>

                <h5>Skill & Type Require</h5>

                <li>
                  <i className="uil uil-circle"></i>{" "}
                  {hiringRequestDetail.typeRequireName}
                </li>

                {hiringRequestDetail.skillRequireStrings.map((skill, index) => (
                  <li key={index}>
                    <i className="uil uil-circle"></i>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardBody>
      </Card>

      {hiringRequestDetail.statusString === "Waiting Approval" ? (
        <div className="d-flex justify-content-around mt-4">
          <button
            style={{
              width: "45%",
              padding: "12px",
              fontSize: "larger",
              fontWeight: "500",
            }}
            class="btn btn-primary"
            role="button"
            //onClick={handleAcceptedHirringRequest}
            onClick={openAcceptModal}
          >
            <span> Accept Request</span>
          </button>

          <button
            style={{
              width: "45%",
              padding: "12px",
              fontSize: "larger",
              fontWeight: "500",
            }}
            class="btn btn-danger"
            role="button"
            onClick={openCancelModal}
          >
            <span>Cancel Request</span>
          </button>
        </div>
      ) : (
        <div className="d-flex justify-content-center mt-3"></div>
      )}

      {showCandidateList && (
        <div className="candidate-list">
          <div
            className="d-flex justify-content-between border border-3 border-dark-subtle"
            style={{ padding: "15px", borderRadius: "10px" }}
          >
            <div className="d-flex ">
              {currentListDev === "matching" ? (
                <div
                  class="Dev Matching d-flex align-items-center fs-17 border-bottom border-primary border-3 pb-1"
                  onClick={() => {
                    handleTabChange("matching");
                  }}
                >
                  <span
                    style={{ fontWeight: "600", cursor: "pointer" }}
                    className="text-primary pb-1"
                  >
                    Matching
                  </span>
                </div>
              ) : (
                <div
                  class="Dev Matching d-flex align-items-center fs-17 pb-1"
                  onClick={() => {
                    handleTabChange("matching");
                  }}
                >
                  <span
                    style={{ fontWeight: "600", cursor: "pointer" }}
                    className="pb-1"
                  >
                    Matching
                  </span>
                </div>
              )}

              <div style={{ margin: "0px 10px" }}></div>

              {currentListDev === "sent" ? (
                <div
                  class="Dev Accepted d-flex align-items-center fs-17 border-bottom border-primary border-3 pb-1"
                  onClick={() => {
                    handleTabChange("sent");
                  }}
                >
                  <span
                    style={{ fontWeight: "600", cursor: "pointer" }}
                    className="text-primary pb-1"
                  >
                    Send
                  </span>
                </div>
              ) : (
                <div
                  class="Dev Accepted d-flex align-items-center fs-17 pb-1"
                  onClick={() => {
                    handleTabChange("sent");
                  }}
                >
                  <span
                    style={{ fontWeight: "600", cursor: "pointer" }}
                    className="pb-1"
                  >
                    Send
                  </span>
                </div>
              )}
            </div>

            <div>
              {currentListDev === "matching" ? (
                <div>
                  {isSendButtonVisible && (
                    <div>
                      <button
                        class="btn btn-primary"
                        role="button"
                        onClick={handleSendToDev}
                        disabled={loading}
                      >
                        {loading ? (
                          <RingLoader color="#fff" loading={true} size={20} />
                        ) : (
                          <span className="fs-17">Send To Company</span>
                        )}
                      </button>
                      {
                        <Modal
                          style={{ padding: "10px" }}
                          isOpen={isPopConfirmOpen}
                          contentLabel="Confirm Modal"
                          centered
                          tabIndex="-1"
                        >
                          <div className="modal-header">
                            <h3 style={{ textAlign: "center" }}>
                              Confirm sending
                            </h3>
                          </div>
                          <ModalBody>
                            <div>
                              <h6 style={{ color: "#969BA5" }}>
                                Are you sure you would like to send this hirring
                                request to company{" "}
                                <span>
                                  {selectedDev.map((developer, key) => (
                                    <span key={key}>
                                      {getDevNameMatching(developer)},
                                    </span>
                                  ))}{" "}
                                  ? This action can not be undone.
                                </span>
                              </h6>
                            </div>
                          </ModalBody>

                          <div className="d-flex justify-content-center gap-5 mt-4 modal-footer">
                            <button
                              style={{ width: "100px" }}
                              className="btn btn-danger"
                              onClick={handleConfirmCancel}
                            >
                              Cancel
                            </button>
                            <button
                              style={{ width: "100px" }}
                              className="btn btn-primary"
                              onClick={handleConfirm}
                            >
                              Send
                            </button>
                          </div>
                        </Modal>
                      }
                    </div>
                  )}
                </div>
              ) : (
                <div></div>
              )}
            </div>
            {/* ------------------------------------------------------------------------------------------------------------ */}
          </div>

          <div className="d-flex mt-4">
            {currentListDev === "matching" && devMatching.length > 0 ? (
              <div className="d-flex" style={{ width: "100%" }}>
                <div
                  className="d-flex align-items-center justify-content-between"
                  style={{ width: "100%" }}
                >
                  <h4 className="mb-0">List Developer Matching</h4>
                  <h4 className="mb-0 text-muted">
                    Developer Sent {targetDevManager}/
                    <span>{hiringRequestDetail.numberOfDev}</span>
                  </h4>
                </div>
              </div>
            ) : currentListDev === "sent" && devHasBeenSent.length > 0 ? (
              <div className="d-flex">
                <div className="d-flex align-items-center ms-2">
                  <h4 style={{ display: "contents" }}>
                    List Developer Has Been Sent
                  </h4>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>

          {currentListDev === "matching"
            ? candidateDetails.map((candidateDetailsNew, key) => (
                <div
                  key={key}
                  className={
                    candidateDetailsNew.addclassNameBookmark === true
                      ? "candidate-list-box bookmark-post card mt-4"
                      : "candidate-list-box card mt-4"
                  }
                >
                  <CardBody className="p-4">
                    <Row className="align-items-center">
                      <Col lg={1}>
                        <div className="checkbox-wrapper-hiring-detail-manager d-flex justify-content-center">
                          <label>
                            <input
                              type="checkbox"
                              checked={selectedDev.includes(
                                candidateDetailsNew.developerId
                              )}
                              onChange={() =>
                                toggleDevMatchingSelection(
                                  candidateDetailsNew.developerId
                                )
                              }
                            />
                            <span className="checkbox"></span>
                          </label>
                        </div>
                      </Col>

                      <Col lg={5}>
                        <div className="candidate-list-content mt-3 mt-lg-0">
                          <h5
                            className="fs-19 mb-0 d-flex"
                            onClick={() => openModal(candidateDetailsNew)}
                          >
                            {candidateDetailsNew.firstName}{" "}
                            {candidateDetailsNew.lastName}
                          </h5>
                          <ul className="list-inline mb-0 text-muted">
                            <li className="list-inline-item">
                              <i className="uil-keyboard"></i>{" "}
                              {candidateDetailsNew.levelRequireName}
                            </li>
                            <br />
                            <li className="list-inline-item">
                              <i className="uil uil-wallet"></i>{" "}
                              {candidateDetailsNew.averageSalary}$
                            </li>
                          </ul>
                          <p className="text-muted mb-0">
                            {candidateDetailsNew.typeRequireStrings

                              .slice(0, 2)
                              .map((typeDev, key) => (
                                <span key={key}>{typeDev + ", "} </span>
                              ))}

                            {candidateDetailsNew.typeRequireStrings.length >
                              2 && <span>...</span>}
                          </p>

                          <div className="mt-2 mt-lg-0 d-flex flex-wrap align-items-start gap-1">
                            {(candidateDetailsNew.skillRequireStrings || [])
                              .slice(0, 4)
                              .map((skillDevRequire, key) => (
                                <span
                                  className={`badge bg-success-subtle text-success fs-14 mt-1`}
                                  key={key}
                                >
                                  {skillDevRequire}
                                </span>
                              ))}
                            {candidateDetailsNew.skillRequireStrings.length >
                              4 && (
                              <span className="badge bg-success-subtle text-success fs-14 mt-1">
                                ...
                              </span>
                            )}
                          </div>
                        </div>
                      </Col>

                      <Col lg={3}>
                        <div className="d-flex flex-column gap-1">
                          <div className=" d-flex ">
                            <span className=" fs-14" style={{ width: "38px" }}>
                              Type{" "}
                            </span>
                            <div class="checkbox-wrapper-type ms-2">
                              <div class="round ms-2">
                                <input
                                  type="checkbox"
                                  id="checkbox-type"
                                  checked={candidateDetailsNew.typeMatching}
                                />
                                <label htmlFor="checkbox-type"></label>
                              </div>
                            </div>
                          </div>
                          <div className=" d-flex">
                            <span className=" fs-14" style={{ width: "38px" }}>
                              Level
                            </span>
                            <div class="checkbox-wrapper-level ms-2">
                              <div class="round ms-2">
                                <input
                                  type="checkbox"
                                  id="checkbox-level"
                                  checked={candidateDetailsNew.levelMatching}
                                />
                                <label htmlFor="checkbox-level"></label>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex  align-items-center justify-content-between">
                            <span className=" fs-14">Salary</span>

                            <div>
                              <Space size={30} wrap>
                                <Progress
                                  steps={5}
                                  percent={
                                    candidateDetailsNew.salaryPerDevPercentage
                                  }
                                  strokeColor={getBarColor(
                                    candidateDetailsNew.salaryPerDevPercentage
                                  )}
                                />
                              </Space>
                            </div>
                          </div>
                          <div className="d-flex  align-items-center justify-content-between">
                            <span className=" fs-14">Skill</span>

                            <div>
                              <Space size={30} wrap>
                                <Progress
                                  steps={5}
                                  percent={candidateDetailsNew.skillPercentage}
                                  strokeColor={getBarColor(
                                    candidateDetailsNew.skillPercentage
                                  )}
                                />
                              </Space>
                            </div>
                          </div>
                          <div>
                            <span>
                              Experience: {candidateDetailsNew.yearOfExperience}{" "}
                              years
                            </span>
                          </div>
                        </div>
                      </Col>

                      <Col lg={3} className="border-start border-3">
                        <div style={{ height: "100%" }}>
                          <div className="left-side-matching">
                            <Space size={10}>
                              <Progress
                                type="circle"
                                percent={candidateDetailsNew.averagedPercentage}
                                size={97}
                                strokeWidth={9}
                                strokeColor={getBarColor(
                                  candidateDetailsNew.averagedPercentage
                                )}
                              />
                            </Space>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </div>
              ))
            : devHasBeenSent.map((devHasBeenSentNew, key) => (
                <div
                  key={key}
                  className={
                    devHasBeenSentNew.addclassNameBookmark === true
                      ? "candidate-list-box bookmark-post card mt-4"
                      : "candidate-list-box card mt-4"
                  }
                >
                  <CardBody className="p-4">
                    <Row className="align-items-center">
                      <Col lg={6}>
                        <div className="candidate-list-content mt-3 mt-lg-0">
                          <h5 className="fs-19 mb-0 d-flex">
                            <Link
                              to="/developerinfo"
                              className="primary-link d-flex align-items-end"
                            >
                              {devHasBeenSentNew.firstName}{" "}
                              {devHasBeenSentNew.lastName}
                            </Link>
                          </h5>

                          <ul className="list-inline mb-0 text-muted">
                            <li className="list-inline-item">
                              <i className="uil-keyboard"></i>{" "}
                              {devHasBeenSentNew.levelRequireName}
                            </li>
                            <br />
                            <li className="list-inline-item">
                              <i className="uil uil-wallet"></i>{" "}
                              {devHasBeenSentNew.averageSalary}$
                            </li>
                          </ul>

                          <p className="text-muted mb-0">
                            {devHasBeenSentNew.typeRequireStrings
                              .slice(0, 2)
                              .map((typeDev, key) => (
                                <span key={key}>{typeDev + ","}</span>
                              ))}
                            {devHasBeenSentNew.typeRequireStrings.length >
                              2 && <span>...</span>}
                          </p>

                          <div className="mt-2 mt-lg-0 d-flex flex-wrap align-items-start gap-1">
                            {(devHasBeenSentNew.skillRequireStrings || [])
                              .slice(0, 4)
                              .map((skillDevRequire, key) => (
                                <span
                                  className={`badge bg-success-subtle text-success fs-14 mt-1`}
                                  key={key}
                                >
                                  {skillDevRequire}
                                </span>
                              ))}
                          </div>
                        </div>
                      </Col>

                      <Col lg={3}>
                        <div className="d-flex flex-column">
                          <div className=" d-flex mb-2">
                            <span className=" fs-14" style={{ width: "38px" }}>
                              Type{" "}
                            </span>
                            <div class="checkbox-wrapper-type ms-2">
                              <div class="round ms-2">
                                <input
                                  type="checkbox"
                                  id="checkbox-type"
                                  checked={devHasBeenSentNew.typeMatching}
                                />
                                <label htmlFor="checkbox-type"></label>
                              </div>
                            </div>
                          </div>
                          <div className="mb-2 d-flex">
                            <span className=" fs-14" style={{ width: "38px" }}>
                              Level
                            </span>
                            <div class="checkbox-wrapper-level ms-2">
                              <div class="round ms-2">
                                <input
                                  type="checkbox"
                                  id="checkbox-level"
                                  checked={devHasBeenSentNew.levelMatching}
                                />
                                <label htmlFor="checkbox-level"></label>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex mb-2 align-items-center justify-content-between">
                            <span className=" fs-14">Salary</span>

                            <div>
                              <Space size={30} wrap>
                                <Progress
                                  steps={5}
                                  percent={
                                    devHasBeenSentNew.salaryPerDevPercentage
                                  }
                                  strokeColor={getBarColor(
                                    devHasBeenSentNew.salaryPerDevPercentage
                                  )}
                                />
                              </Space>
                            </div>
                          </div>
                          <div className="d-flex mb-2 align-items-center justify-content-between">
                            <span className=" fs-14">Skill</span>

                            <div>
                              <Space size={30} wrap>
                                <Progress
                                  steps={5}
                                  percent={devHasBeenSentNew.skillPercentage}
                                  strokeColor={getBarColor(
                                    devHasBeenSentNew.skillPercentage
                                  )}
                                />
                              </Space>
                            </div>
                          </div>
                          <div>
                            <span>
                              Experience: {devHasBeenSentNew.yearOfExperience}{" "}
                              years
                            </span>
                          </div>
                        </div>
                      </Col>

                      <Col lg={3} className="border-start border-3">
                        <div style={{ height: "100%" }}>
                          <div className="d-flex justify-content-end mb-3">
                            <span
                              className={
                                devHasBeenSentNew.hiredDeveloperStatus ===
                                "Interview Scheduled"
                                  ? "badge bg-primary text-light"
                                  : devHasBeenSentNew.hiredDeveloperStatus ===
                                    "Rejected"
                                  ? "badge bg-danger text-light"
                                  : devHasBeenSentNew.hiredDeveloperStatus ===
                                    "Waiting Interview"
                                  ? "badge bg-warning text-light"
                                  : devHasBeenSentNew.hiredDeveloperStatus ===
                                    "Under Consideration"
                                  ? "badge bg-blue text-light"
                                  : devHasBeenSentNew.hiredDeveloperStatus ===
                                    "Onboarding"
                                  ? "badge bg-newGreen text-light"
                                  : devHasBeenSentNew.hiredDeveloperStatus ===
                                    "Contract Processing"
                                  ? "badge bg-warning text-light"
                                  : devHasBeenSentNew.hiredDeveloperStatus ===
                                    "Contract Failed"
                                  ? "badge bg-danger text-light"
                                  : devHasBeenSentNew.hiredDeveloperStatus ===
                                    "Request Closed"
                                  ? "badge bg-danger text-light"
                                  : ""
                              }
                            >
                              {devHasBeenSentNew.hiredDeveloperStatus}
                            </span>
                          </div>
                          <div className="right-side-percen-matching-devaccepted">
                            <Space size={10}>
                              <Progress
                                type="circle"
                                percent={devHasBeenSentNew.averagedPercentage}
                                size={97}
                                strokeWidth={9}
                                strokeColor={getBarColor(
                                  devHasBeenSentNew.averagedPercentage
                                )}
                              />
                            </Space>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </div>
              ))}
        </div>
      )}
      {/* ------------------------------------------------------------------------------------------------------*/}
      {/* LIST DEV ACCEPT AFTER REJECT */}

      <div>
        {isVisibleListDevAfter &&
          devHasBeenSent.map((devHasBeenSentNew, key) => (
            <div
              key={key}
              className={
                devHasBeenSentNew.addclassNameBookmark === true
                  ? "candidate-list-box bookmark-post card mt-4"
                  : "candidate-list-box card mt-4"
              }
            >
              <CardBody className="p-4">
                <Row className="align-items-center">
                  <Col lg={5}>
                    <div className="candidate-list-content mt-lg-0 d-flex flex-column gap-1">
                      <h5 className="fs-19 mb-0 d-flex">
                        <Link
                          to="/developerinfo"
                          className="primary-link d-flex align-items-end"
                        >
                          {devHasBeenSentNew.firstName}{" "}
                          {devHasBeenSentNew.lastName}
                        </Link>
                      </h5>

                      <p className="fs-14 text-muted list-inline-item mb-0">
                        <i className="uil-keyboard"></i>{" "}
                        {devHasBeenSentNew.levelRequireName}
                      </p>

                      <p className="fs-14 text-muted list-inline-item mb-0">
                        <i className="uil uil-wallet"></i>{" "}
                        {devHasBeenSentNew.averageSalary}$
                      </p>

                      <p className="text-muted mb-1">
                        {devHasBeenSentNew.typeRequireStrings
                          .slice(0, 2)
                          .map((typeDev, key) => (
                            <span key={key}>{typeDev + ","}</span>
                          ))}
                        {devHasBeenSentNew.typeRequireStrings.length > 2 && (
                          <span>...</span>
                        )}
                      </p>

                      <div className="mt-2 mt-lg-0 d-flex flex-wrap align-items-start gap-1">
                        {(devHasBeenSentNew.skillRequireStrings || [])
                          .slice(0, 4)
                          .map((skillDevRequire, key) => (
                            <span
                              className={`badge bg-success-subtle text-success fs-14 mt-1`}
                              key={key}
                            >
                              {skillDevRequire}
                            </span>
                          ))}
                      </div>
                    </div>
                  </Col>

                  <Col lg={4}>
                    <div className="d-flex flex-column">
                      <div className=" d-flex mb-2">
                        <span className=" fs-14" style={{ width: "38px" }}>
                          Type{" "}
                        </span>
                        <div class="checkbox-wrapper-type ms-2">
                          <div class="round ms-2">
                            <input
                              type="checkbox"
                              id="checkbox-type"
                              checked={devHasBeenSentNew.typeMatching}
                            />
                            <label htmlFor="checkbox-type"></label>
                          </div>
                        </div>
                      </div>
                      <div className="mb-2 d-flex">
                        <span className=" fs-14" style={{ width: "38px" }}>
                          Level
                        </span>
                        <div class="checkbox-wrapper-level ms-2">
                          <div class="round ms-2">
                            <input
                              type="checkbox"
                              id="checkbox-level"
                              checked={devHasBeenSentNew.levelMatching}
                            />
                            <label htmlFor="checkbox-level"></label>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex mb-2 align-items-center justify-content-between">
                        <span className=" fs-14">Salary</span>

                        <div>
                          <Space size={30} swap>
                            <Progress
                              steps={5}
                              percent={devHasBeenSentNew.salaryPerDevPercentage}
                              strokeColor={getBarColor(
                                devHasBeenSentNew.salaryPerDevPercentage
                              )}
                            />
                          </Space>
                        </div>

                        {/* <div
                          className="devmatching-bar-salary border border-1"
                          style={{ marginLeft: "17px" }}
                        >
                          <div
                            className="devmatch-level-salary"
                            style={{
                              width: `${devHasBeenSentNew.salaryPerDevPercentage}%`,
                              backgroundColor: getBarColor(
                                devHasBeenSentNew.salaryPerDevPercentage
                              ),
                            }}
                          ></div>
                        </div> */}
                      </div>
                      <div className="d-flex mb-2 align-items-center justify-content-between">
                        <span className=" fs-14">Skill</span>

                        <div>
                          <Space size={30} wrap>
                            <Progress
                              steps={5}
                              percent={devHasBeenSentNew.skillPercentage}
                              strokeColor={getBarColor(
                                devHasBeenSentNew.skillPercentage
                              )}
                            />
                          </Space>
                        </div>

                        {/* <div
                          className="devmatching-bar-skill border border-1 "
                          style={{ marginLeft: "23px" }}
                        >
                          <div
                            className="devmatch-level-skill"
                            style={{
                              width: `${devHasBeenSentNew.skillPercentage}%`,
                              backgroundColor: getBarColor(
                                devHasBeenSentNew.skillPercentage
                              ),
                            }}
                          ></div>
                        </div> */}
                      </div>
                      <div>
                        <span>
                          Experience: {devHasBeenSentNew.yearOfExperience} years
                        </span>
                      </div>
                    </div>
                  </Col>

                  <Col lg={3} className="border-start border-3">
                    <div style={{ height: "100%" }}>
                      <div className="d-flex justify-content-end mb-2">
                        <span
                          className={
                            devHasBeenSentNew.hiredDeveloperStatus ===
                            "Interview Scheduled"
                              ? "badge bg-primary text-light"
                              : devHasBeenSentNew.hiredDeveloperStatus ===
                                "Rejected"
                              ? "badge bg-danger text-light"
                              : devHasBeenSentNew.hiredDeveloperStatus ===
                                "Waiting Interview"
                              ? "badge bg-warning text-light"
                              : devHasBeenSentNew.hiredDeveloperStatus ===
                                "Under Consideration"
                              ? "badge bg-blue text-light"
                              : devHasBeenSentNew.hiredDeveloperStatus ===
                                "Onboarding"
                              ? "badge bg-newGreen text-light"
                              : devHasBeenSentNew.hiredDeveloperStatus ===
                                "Contract Processing"
                              ? "badge bg-warning text-light"
                              : devHasBeenSentNew.hiredDeveloperStatus ===
                                "Contract Failed"
                              ? "badge bg-danger text-light"
                              : devHasBeenSentNew.hiredDeveloperStatus ===
                                "Request Closed"
                              ? "badge bg-danger text-light"
                              : devHasBeenSentNew.hiredDeveloperStatus ===
                                "Working"
                              ? "badge bg-orangeRed2 text-light"
                              : ""
                          }
                        >
                          {devHasBeenSentNew.hiredDeveloperStatus}
                        </span>
                      </div>
                      <div className="right-side-percen-matching-devaccepted">
                        <Space size={10}>
                          <Progress
                            type="circle"
                            percent={devHasBeenSentNew.averagedPercentage}
                            size={97}
                            strokeWidth={9}
                            strokeColor={getBarColor(
                              devHasBeenSentNew.averagedPercentage
                            )}
                          />
                        </Space>
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </div>
          ))}
      </div>
      {/* ----------------------------------------------------------------------------------------------------- */}

      <div>
        <DeveloperDetailInManagerPopup
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          devId={selectedCandidateInfo.developerId}
        />
      </div>

      <div>
        <Modal isOpen={isCancelModalOpen} toggle={closeCancelModal} size="lg">
          <ModalBody>
            <div>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <FontAwesomeIcon
                    icon={faBullhorn}
                    size="2xl"
                    style={{
                      color: "#d70f0f",
                      backgroundColor: "#F8D7DA",
                      padding: "15px",
                      borderRadius: "50%",
                    }}
                  />
                  <h3 style={{ textAlign: "center" }}>Are you sure?</h3>
                </div>
                <div className=" border-3 border-top  p-3">
                  <p>
                    Could you kindly provide insights into the reasons behind
                    this decision?{" "}
                    <span style={{ fontWeight: "700" }}>
                      {" "}
                      Your feedback is valuable for my future improvement.
                    </span>
                  </p>
                </div>
              </div>
              <div>
                <textarea
                  style={{ width: "100%", height: "100px" }}
                  value={cancelReason}
                  placeholder="Type your reason here..."
                  onChange={(e) => setCancelReason(e.target.value)}
                ></textarea>
              </div>
              <div className="d-flex justify-content-end">
                <Button
                  color="secondary"
                  onClick={closeCancelModal}
                  style={{ marginRight: "10px" }}
                >
                  Cancel
                </Button>
                <Button color="danger" onClick={handleCancelRequest}>
                  Reject Request
                </Button>{" "}
              </div>
            </div>
          </ModalBody>
        </Modal>

        {/* -------------------------------------------------------------------------------- */}
        <Modal
          isOpen={isCancelAfterModalOpen}
          toggle={closeCancelAfterModal}
          size="lg"
        >
          <ModalBody>
            <div>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <FontAwesomeIcon
                    icon={faBullhorn}
                    size="2xl"
                    style={{
                      color: "#d70f0f",
                      backgroundColor: "#F8D7DA",
                      padding: "15px",
                      borderRadius: "50%",
                    }}
                  />
                  <h3 style={{ textAlign: "center" }}>Are you sure?</h3>
                </div>
                <div className=" border-3 border-top  p-3">
                  <p>
                    Could you kindly provide insights into the reasons behind
                    this decision?{" "}
                    <span style={{ fontWeight: "700" }}>
                      {" "}
                      Your feedback is valuable for my future improvement.
                    </span>
                  </p>
                </div>
              </div>
              <div>
                <textarea
                  style={{ width: "100%", height: "100px" }}
                  value={cancelReasonAfter}
                  placeholder="Type your reason here..."
                  onChange={(e) => setCancelReasonAfter(e.target.value)}
                ></textarea>
              </div>
              <div className="d-flex justify-content-end">
                <Button
                  color="secondary"
                  onClick={closeCancelAfterModal}
                  style={{ marginRight: "10px" }}
                >
                  Cancel
                </Button>
                <Button color="danger" onClick={handleCancelAfterRequest}>
                  Closed Request
                </Button>{" "}
              </div>
            </div>
          </ModalBody>
        </Modal>

        {/* ---------------------------------------------------------------------------------------- */}
        <Modal
          style={{ padding: "10px" }}
          isOpen={isAcceptModalOpen}
          toggle={closeAcceptModal}
          contentLabel="Accept Request Modal"
          centered
          tabIndex="-1"
        >
          <div className="modal-header">
            <h3 style={{ textAlign: "center" }}>Accept Hiring Request</h3>
          </div>
          <ModalBody>
            <div>
              <h6 style={{ color: "#969BA5" }}>
                Are you sure would you like to accept this hiring request?
              </h6>
            </div>
          </ModalBody>
          <div className="d-flex justify-content-around modal-footer">
            <button
              className="btn btn-danger"
              onClick={closeAcceptModal}
              style={{ width: "100px" }}
            >
              Cancel
            </button>
            <button
              style={{ width: "100px" }}
              className="btn btn-primary"
              onClick={handleAcceptModalAccept}
            >
              Accept
            </button>
          </div>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default JobDetailsDescription;

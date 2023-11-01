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
} from "reactstrap";
import { Link, Navigate, useLocation } from "react-router-dom";
import DeveloperDetailInManagerPopup from "../../Home/SubSection/DeveloperDetailInManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";

//Import Images
// import JobDetailImage from "../../../assets/images/job-detail.jpg";
// import JobImage10 from "../../../assets/images/featured-job/img-10.png";
// import userImage1 from "../../../assets/images/user/img-01.jpg";
// import userImage2 from "../../../assets/images/user/img-02.jpg";
// import userImage3 from "../../../assets/images/user/img-03.jpg";
// import userImage4 from "../../../assets/images/user/img-04.jpg";
// import userImage5 from "../../../assets/images/user/img-05.jpg";
//import { Link } from "react-router-dom";
import "./index.css";
import hiringrequestService from "../../../services/hiringrequest.service";
import developer from "../../../services/developer.services";

const JobDetailsDescription = () => {
  const { state } = useLocation();

  const [hiringRequestDetail, setHiringRequestDetail] = useState(null);
  const [devMatching, setDevMatching] = useState([]);
  ////////////////////////////////////////////////////////////////////////////////////////
  const [devHasBeenSent, setDevHasBeenSent] = useState([]);
  /////////////////////////////////////////////////////////////////////////////////////////
  const [currentListDev, setCurrentListDev] = useState("matching");
  //////////////////////////////////////////////////////////////////////////////////////////
  const [disableIconCancel, setDisableIconCancel] = useState(false);
  /////////////////////////////////////////////////////////////////////////////////////////
  const [isVisibleListDevAfter, setIsVisibleListDevAfter] = useState(false);
  const [listDevAfterReject, setListDevAfterReject] = useState([]);
  ////////////////////////////////////////////////////////////////////////////////////////
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

  ////////////////////////////////////////////////////////////////////////////////////////
  const [selectAllDevMatching, setSelectAllDevAllMatching] = useState(false);
  const [selectedDev, setSelectedDev] = useState([]);
  const [isSendButtonVisible, setIsSendButtonVisibility] = useState(false);

  const toggleSelectDevAll = () => {
    setSelectAllDevAllMatching(!selectAllDevMatching);
    setSelectedDev((prevSelectedDev) => {
      if (!selectAllDevMatching) {
        return candidateDetails.map((candidate) => candidate.developerId);
      } else {
        return [];
      }
    });

    setIsSendButtonVisibility(!selectAllDevMatching);
  };

  const toggleDevMatchingSelection = (candidateId) => {
    setSelectedDev((prevSelectedDev) => {
      const isSelected = prevSelectedDev.includes(candidateId);
      const updatedSelectedDev = isSelected
        ? prevSelectedDev.filter((id) => id !== candidateId)
        : [...prevSelectedDev, candidateId];

      setIsSendButtonVisibility(
        updatedSelectedDev.length > 0 || selectAllDevMatching
      );

      return updatedSelectedDev;
    });
  };
  // console.log("---------------------------------------");
  // console.log("cac dev matching duoc chon de gui di cho dev chap nhan");
  // console.log(selectedDev);
  // console.log("---------------------------------------");

  //////////////////////////////////////////////////////////////////////////////////////////
  // chon dev o phan dev accepted
  const [selectedAllDevAccept, setSelectedAllDevAccept] = useState(false);
  const [selectedDevAccept, setSelectedDevAccept] = useState([]);
  const [isSendButtonAcceptVisible, setIsSendButtonAcceptVisible] =
    useState(false);

  const toggleSelectedAllDevAccept = () => {
    setSelectedAllDevAccept(!selectedAllDevAccept);

    if (!selectedAllDevAccept) {
      const waitingDevAccept = devHasBeenSent
        .filter((candidate) => candidate.selectedDevStatus === "Dev Accepted")
        .map((candidate) => candidate.developerId);
      setSelectedDevAccept(waitingDevAccept);
    } else {
      setSelectedDevAccept([]);
    }

    setIsSendButtonAcceptVisible(
      //selectedAllDevAccept || selectedDevAccept.length > 0
      !selectedAllDevAccept && selectedDevAccept.length === 0
    );
    console.log(!selectedAllDevAccept, selectedDevAccept.length);
  };

  const toggleDevAcceptSelection = (candidateId) => {
    const candidate = devHasBeenSent.find(
      (candidate) => candidate.developerId === candidateId
    );
    //kiem tra xem checkbox co hien thi hay khong
    if (candidate && candidate.selectedDevStatus === "Dev Accepted") {
      setSelectedDevAccept((prevSelectedDevAccept) => {
        const selectedDevAccept = prevSelectedDevAccept.includes(candidateId)
          ? prevSelectedDevAccept.filter((id) => id !== candidateId)
          : [...prevSelectedDevAccept, candidateId];
        setIsSendButtonAcceptVisible(
          !selectedAllDevAccept && selectedDevAccept.length > 0
          // !selectedAllDevAccept && selectedDevAccept.length === 0
          // true
        );
        return selectedDevAccept;
      });
    }

    // setIsSendButtonAcceptVisible(
    //   !selectedAllDevAccept && selectedDevAccept.length > 0
    //   // !selectedAllDevAccept && selectedDevAccept.length === 0
    //   // true
    // );

    console.log("---------------------------------------------------");
    console.log("cac dev accepted duoc chon de gui di cho HR chap nhan");
    console.log(selectedDevAccept);
    console.log("---------------------------------------------------");
  };

  /////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////

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
    } else {
      fetchCancelHirringRequestStatus();
      //fetchHiringRequestDetailInManager();
      console.log("Cancel Request Reason:", cancelReason);
      closeCancelModal();
    }
  };

  //---------------------------------------------------------------------------------------------------
  const fetchCancelHirringRequestStatus = async () => {
    let response;
    try {
      response = await hiringrequestService.cancelHirringRequestStatus(
        state.jobId,
        cancelReason,
        false
      );
      fetchHiringRequestDetailInManager();
      console.log("li do cancel request:");
      console.log(cancelReason);
      return response;
    } catch (error) {
      console.error("Error fetching cancel hiring request", error);
    }
  };

  //---------------------------------------------------------------------------------------------------
  const fetchHiringRequestDetailInManager = async () => {
    let response;

    try {
      response = await hiringrequestService.getHiringRequestDetailInManager(
        state.jobId
      );

      setHiringRequestDetail(response.data.data);
      if (
        response.data.data.statusString !== "Waiting Approval" &&
        response.data.data.statusString !== "Rejected"
      ) {
        setShowCandidateList(true);
      }

      if (response.data.data.statusString === "Rejected") {
        if (devHasBeenSent.length !== 0) {
          setIsVisibleListDevAfter(true);
        }
      }

      return response;
    } catch (error) {
      console.error("Error fetching hiring request:", error);
    }
  };

  const fetchDeveloperMatchingInManager = async () => {
    let response;

    try {
      response = await hiringrequestService.getDeveloperMatchingInManager(
        state.jobId
      );

      setDevMatching(response.data.data);
      console.log("request id: " + state.jobId);
      console.log(response.data.data);
      return response;
    } catch (error) {
      console.error("Error fetching developer matching:", error);
    }
  };

  const fetchsendHiringRequestToDevMatching = async () => {
    let response;

    try {
      response = await hiringrequestService.sendHiringRequestToDevMatching(
        state.jobId,
        selectedDev
      );

      setIsSendButtonVisibility(false);
      fetchDeveloperMatchingInManager();
      return response;
    } catch (error) {
      console.error(
        "Error fetching send hiring request to dev matching:",
        error
      );
    }
  };

  const fetchGetSelectedDevByManager = async () => {
    let response;
    try {
      response = await developer.getSelectedDevByManager(state.jobId);
      setDevHasBeenSent(response.data.data);
      console.log(" dev vua duoc gui la");
      console.log(response.data.data);
      console.log("------------------------------------------");

      return response;
    } catch (error) {
      console.error("Error fetching dev matching has been sent:", error);
    }
  };

  const fetchsendevToHR = async () => {
    let response;
    try {
      response = await developer.sendDevToHR(state.jobId, selectedDevAccept);
      fetchGetSelectedDevByManager();
      setSelectedAllDevAccept(false);
      return response;
    } catch (error) {
      console.error("Error fetching send dev to HR", error);
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
        state.jobId,
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

      return response;
    } catch (error) {
      console.error("Error fetching approved hiring request", error);
    }
  };

  //--------------------------------------------------------------------------------

  // const fetchCancelHirringRequestStatus = async () => {
  //   let response;
  //   try {
  //     response = await hiringrequestService.cancelHirringRequestStatus(
  //       state.jobId,
  //       cancelReason,
  //       false
  //     );
  //     console.log(cancelReason);
  //     return response;
  //   } catch (error) {
  //     console.error("Error fetching cancel hiring request", error);
  //   }
  // };

  /////////////////////////////////////////////////////////////////////////////////
  // ham xu li approved hiring request
  // const handleAcceptedHirringRequest = () => {
  //   setShowCandidateList(true);
  //   fetchapprovedHirringRequestStatus();
  // };
  ////////////////////////////////////////////////////////////////////////////////

  //trang handle nut send
  const [isPopConfirmOpen, setIsPopupConfirmOpen] = useState(false);

  const handleSendToDev = () => {
    setIsPopupConfirmOpen(true);
  };
  const handleConfirm = () => {
    // thuc hien chuc nang cua nut send o day
    fetchsendHiringRequestToDevMatching();
    setIsPopupConfirmOpen(false);
    //setIsSendButtonVisibility(false);
    //window.location.reload();
    setSelectedDev([]);
  };

  const handleConfirmCancel = () => {
    setIsPopupConfirmOpen(false);
  };
  // fetchsendHiringRequestToDevMatching();
  ///////////////////////////////////////////////////////////////////////////////
  //trang handle nut send cancel
  const [isPopConfirmOpenHR, setIsPopupConfirmOpenHR] = useState(false);

  const handleSendToHR = () => {
    setIsPopupConfirmOpenHR(true);
  };

  const handleConfirmHR = () => {
    //thuc hien chuc nang cua nut send o day

    setIsSendButtonAcceptVisible(false);
    fetchsendevToHR();
    setIsPopupConfirmOpenHR(false);
    setSelectedDevAccept([]);
  };

  const handleConfirmCancelHR = () => {
    setIsPopupConfirmOpenHR(false);
  };

  //////////////////////////////////////////////////////////////////////////////
  const getDevNameMatching = (id) => {
    const fullNameMathcing = devMatching.find((dev) => dev.developerId === id);
    return fullNameMathcing?.firstName + " " + fullNameMathcing?.lastName;
  };

  const getDevNameAccepted = (id) => {
    const fullNameAccepted = devHasBeenSent.find(
      (dev) => dev.developerId === id
    );
    return fullNameAccepted?.firstName + " " + fullNameAccepted?.lastName;
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
  //const [cancelReason, setCancelReason] = useState("");

  const [cancelReasonAfter, setCancelReasonAfter] = useState("");

  const fetchCancelHirringRequestStatusAfter = async () => {
    let response;
    try {
      response = await hiringrequestService.cancelHirringRequestStatusAfter(
        state.jobId,
        cancelReasonAfter,
        false
      );
      fetchHiringRequestDetailInManager();
      console.log(cancelReasonAfter);
    } catch (error) {
      console.error("Error fetching cancel hiring request after", error);
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

  if (!state?.jobId) {
    return <Navigate to={"/"}></Navigate>;
  }

  if (!hiringRequestDetail) {
    return null;
  }

  return (
    <React.Fragment>
      <Card className="job-detail ">
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
                      : hiringRequestDetail.statusString === "Finished"
                      ? "badge bg-primary text-light fs-12"
                      : hiringRequestDetail.statusString === "Complete"
                      ? "badge bg-primary text-light fs-12"
                      : hiringRequestDetail.statusString === "Saved"
                      ? "badge bg-info text-light fs-12"
                      : ""
                  }
                  company={{ companyMana: hiringRequestDetail.companyId }}
                >
                  {hiringRequestDetail.statusString}
                </span>

                {hiringRequestDetail.statusString === "Waiting Approval" ||
                hiringRequestDetail.statusString === "Rejected" ? (
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
                            Cancel Request
                          </span>
                        </button>
                      </DropdownItem>
                      <DropdownItem divider />
                    </DropdownMenu>
                  </Dropdown>
                )}
                {/* <Dropdown
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
                        <span style={{ fontSize: "15px" }}>Cancel Request</span>
                      </button>
                    </DropdownItem>
                    <DropdownItem divider />
                  </DropdownMenu>
                </Dropdown> */}
              </div>
            </div>
          </div>
        </div>
        <CardBody className="p-3">
          <div>
            <Row>
              <Col md={8}>
                <h3 className="mb-1">{hiringRequestDetail.jobTitle}</h3>
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
                  <p className="text-muted mb-0 fs-13">Type Of Developer</p>
                  <p className="fw-medium mb-0 badge bg-info-subtle text-info">
                    {hiringRequestDetail.typeRequireName}
                  </p>
                </div>
              </Col>
              <Col
                lg={3}
                className="border rounded p-3"
                style={{ maxWidth: "266px" }}
              >
                <div id="standard">
                  <p className="text-muted fs-13 mb-0">Skill Requirement</p>
                  <p className="fw-medium mb-0 ">
                    {hiringRequestDetail.skillRequireStrings.map(
                      (skill, index) => (
                        <span
                          key={index}
                          style={{ marginRight: "3px" }}
                          className="badge bg-primary-subtle text-primary"
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </p>
                </div>
              </Col>

              <Col
                lg={3}
                className="border rounded p-3"
                style={{ maxWidth: "266px" }}
              >
                <div>
                  <p className="text-muted fs-13 mb-0">Level Requirement</p>
                  <p className="fw-medium mb-0 badge bg-purplel text-purple">
                    {hiringRequestDetail.levelRequireName}
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
                      {new Intl.DateTimeFormat("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }).format(new Date(hiringRequestDetail.duration))}
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
                {hiringRequestDetail.skillRequireStrings.map((skill, index) => (
                  <li key={index}>
                    <i className="uil uil-circle"></i>
                    {skill}
                  </li>
                ))}

                <li>
                  <i className="uil uil-circle"></i>{" "}
                  {hiringRequestDetail.typeRequireName}
                </li>
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
          <div className="mt-4">
            {currentListDev === "matching" ? (
              <h4>List Developer Matching Request</h4>
            ) : (
              <h4>List Selected Developer</h4>
            )}
          </div>
          {/* nút Send và nút chuyển trang */}
          <div
            className="d-flex justify-content-between border border-3"
            style={{ padding: "15px", borderRadius: "10px" }}
          >
            <div className="d-flex">
              {currentListDev === "matching" ? (
                <button
                  class="btn btn-primary rounded-start-pill Dev Matching"
                  role="button"
                  onClick={() => {
                    handleTabChange("matching");
                  }}
                >
                  <span style={{ fontWeight: "600" }}>Dev Matching</span>
                </button>
              ) : (
                <button
                  class="btn btn-outline-primary rounded-start-pill Dev Matching"
                  role="button"
                  onClick={() => {
                    handleTabChange("matching");
                  }}
                >
                  <span style={{ fontWeight: "600" }}>Dev Matching</span>
                </button>
              )}

              <div
                className="border border-3"
                style={{ margin: "0px 5px" }}
              ></div>
              {currentListDev === "sent" ? (
                <button
                  class="btn btn-primary rounded-end-pill Dev Accepted"
                  role="button"
                  onClick={() => {
                    handleTabChange("sent");
                  }}
                >
                  <span style={{ fontWeight: "600" }}>Dev Accepted</span>
                </button>
              ) : (
                <button
                  class="btn btn-outline-primary rounded-end-pill Dev Accepted"
                  role="button"
                  onClick={() => {
                    handleTabChange("sent");
                  }}
                >
                  <span style={{ fontWeight: "600" }}>Dev Accepted</span>
                </button>
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
                      >
                        <span>Send To Dev</span>
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
                                request to developer{" "}
                                <span>
                                  {selectedDev.map((developer, key) => (
                                    <span key={key}>
                                      {getDevNameMatching(developer)}? This
                                      action can not be undone.
                                    </span>
                                  ))}
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
                <div>
                  {isSendButtonAcceptVisible && (
                    <div>
                      <button
                        class="btn btn-primary"
                        role="button"
                        onClick={handleSendToHR}
                      >
                        <span>Send To HR</span>
                      </button>{" "}
                      {
                        <Modal
                          style={{ padding: "10px" }}
                          isOpen={isPopConfirmOpenHR}
                          contentLabel="Confirm Modal"
                          centered
                          tabIndex="-1"
                        >
                          <div className="modal-header">
                            <h3 style={{ textAlign: "center" }}>
                              Confirm sending
                            </h3>
                          </div>
                          <ModalBody className="p-3">
                            <div>
                              <h6 style={{ color: "#969BA5" }}>
                                Are you sure you would like to send this
                                developer{" "}
                                <span>
                                  {selectedDevAccept.map((developer, key) => (
                                    <span key={key}>
                                      {getDevNameAccepted(developer)} to company
                                      partner?. This action can not be undone.
                                    </span>
                                  ))}
                                </span>
                              </h6>
                            </div>
                          </ModalBody>

                          <div className="d-flex justify-content-center gap-5 mt-4 modal-footer">
                            <button
                              style={{ width: "100px" }}
                              className="btn btn-danger"
                              onClick={handleConfirmCancelHR}
                            >
                              Cancel
                            </button>
                            <button
                              style={{ width: "100px" }}
                              className="btn btn-primary"
                              onClick={handleConfirmHR}
                            >
                              Send
                            </button>
                          </div>
                        </Modal>
                      }
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="d-flex mt-4">
            {currentListDev === "matching" ? (
              <div className="d-flex">
                <div className="checkbox-all-wrapper-hiring-detail-manager">
                  <label>
                    <input
                      type="checkbox"
                      checked={selectAllDevMatching}
                      onChange={toggleSelectDevAll}
                    />
                    <span className="checkbox"></span>
                  </label>
                </div>

                <div className="d-flex align-items-center ms-2">
                  <h4 style={{ display: "contents" }}>
                    Select All Developer Matching
                  </h4>
                </div>
              </div>
            ) : (
              <div className="d-flex">
                <div className="checkbox-all-wrapper-hiring-detail-manager">
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedAllDevAccept}
                      onChange={toggleSelectedAllDevAccept}
                    />
                    <span className="checkbox"></span>
                  </label>
                </div>

                <div className="d-flex align-items-center ms-2">
                  <h4 style={{ display: "contents" }}>
                    Select All Developer Accepted
                  </h4>
                </div>
              </div>
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
                          <div className="d-flex  align-items-center">
                            <span className=" fs-14">Salary</span>
                            <div className="devmatching-bar-salary border border-1 ms-3">
                              <div
                                className="devmatch-level-salary"
                                style={{
                                  width: `${candidateDetailsNew.salaryPerDevPercentage}%`,
                                  backgroundColor: getBarColor(
                                    candidateDetailsNew.salaryPerDevPercentage
                                  ),
                                }}
                              ></div>
                            </div>
                          </div>
                          <div className="d-flex  align-items-center">
                            <span className=" fs-14" style={{ width: "41px" }}>
                              Skill
                            </span>
                            <div className="devmatching-bar-skill border border-1 ms-3">
                              <div
                                className="devmatch-level-skill"
                                style={{
                                  width: `${candidateDetailsNew.skillPercentage}%`,
                                  backgroundColor: getBarColor(
                                    candidateDetailsNew.skillPercentage
                                  ),
                                }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <span>
                              {/* <i className="mdi mdi-star align-middle"></i> */}
                              Experience: {candidateDetailsNew.yearOfExperience}{" "}
                              years
                            </span>
                          </div>
                        </div>
                      </Col>

                      <Col lg={3} className="border-start border-3">
                        <div style={{ height: "100px" }}>
                          <div className="left-side-matching ">
                            <div className="d-flex w-100 justify-content-between">
                              <div className="d-flex align-items-center">
                                <p
                                  style={{
                                    display: "contents",
                                    fontFamily: "Tahoma",
                                    fontSize: "15px",
                                  }}
                                >
                                  Matching request total
                                </p>
                              </div>
                              <div className="matching-rate-dev">
                                <span
                                  className="percent-matching-dev"
                                  style={{
                                    color: getBarColor(
                                      candidateDetailsNew.averagedPercentage
                                    ),
                                  }}
                                >
                                  {/* {candidateDetailsNew.averagedPercentage.toFixed(
                                    2
                                  )}
                                  % */}
                                  {candidateDetailsNew.averagedPercentage.toFixed(
                                    2
                                  ) == 100.0
                                    ? 100
                                    : candidateDetailsNew.averagedPercentage.toFixed(
                                        2
                                      )}
                                  %
                                </span>
                              </div>
                            </div>

                            <div className="devmatching-bar border border-1">
                              <div
                                className="devmatch-level"
                                style={{
                                  width: `${candidateDetailsNew.averagedPercentage}%`,
                                  backgroundColor: getBarColor(
                                    candidateDetailsNew.averagedPercentage
                                  ),
                                }}
                              ></div>
                            </div>
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
                      <Col lg={1}>
                        {devHasBeenSentNew.selectedDevStatus ===
                        "Dev Accepted" ? (
                          <div className="checkbox-wrapper-hiring-detail-manager d-flex justify-content-center">
                            <label>
                              <input
                                type="checkbox"
                                checked={selectedDevAccept.includes(
                                  devHasBeenSentNew.developerId
                                )}
                                onChange={() =>
                                  toggleDevAcceptSelection(
                                    devHasBeenSentNew.developerId
                                  )
                                }
                              />
                              <span className="checkbox"></span>
                            </label>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </Col>

                      <Col lg={5}>
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
                          <div className="d-flex mb-2 align-items-center">
                            <span className=" fs-14">Salary</span>
                            <div className="devmatching-bar-salary border border-1 ms-3">
                              <div
                                className="devmatch-level-salary"
                                style={{
                                  width: `${devHasBeenSentNew.salaryPerDevPercentage}%`,
                                  backgroundColor: getBarColor(
                                    devHasBeenSentNew.salaryPerDevPercentage
                                  ),
                                }}
                              ></div>
                            </div>
                          </div>
                          <div className="d-flex mb-2 align-items-center">
                            <span className=" fs-14" style={{ width: "41px" }}>
                              Skill
                            </span>
                            <div className="devmatching-bar-skill border border-1 ms-3">
                              <div
                                className="devmatch-level-skill"
                                style={{
                                  width: `${devHasBeenSentNew.skillPercentage}%`,
                                  backgroundColor: getBarColor(
                                    devHasBeenSentNew.skillPercentage
                                  ),
                                }}
                              ></div>
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
                        <div style={{ height: "100px" }}>
                          <div className="d-flex justify-content-end">
                            <span
                              className={
                                devHasBeenSentNew.selectedDevStatus ===
                                "Waiting HR Approval"
                                  ? "badge bg-warning text-light"
                                  : devHasBeenSentNew.selectedDevStatus ===
                                    "Dev Accepted"
                                  ? "badge bg-primary text-light"
                                  : devHasBeenSentNew.selectedDevStatus ===
                                    "HR Rejected"
                                  ? "badge bg-danger text-light"
                                  : devHasBeenSentNew.selectedDevStatus ===
                                    "Waiting Interview"
                                  ? "badge bg-warning text-light"
                                  : devHasBeenSentNew.selectedDevStatus ===
                                    "Waiting Dev Approval"
                                  ? "badge bg-warning text-light"
                                  : devHasBeenSentNew.selectedDevStatus ===
                                    "Interviewing"
                                  ? "badge bg-info text-light"
                                  : ""
                              }
                            >
                              {devHasBeenSentNew.selectedDevStatus}
                            </span>
                          </div>
                          <div className="right-side-percen-matching-devaccepted">
                            <div className="d-flex w-100 justify-content-between">
                              <div className="d-flex align-items-center">
                                <p
                                  style={{
                                    display: "contents",
                                    fontFamily: "Tahoma",
                                    fontSize: "15px",
                                  }}
                                >
                                  Matching request total
                                </p>
                              </div>
                              <div className="matching-rate-dev">
                                <span
                                  className="percent-matching-dev"
                                  style={{
                                    color: getBarColor(
                                      devHasBeenSentNew.averagedPercentage
                                    ),
                                  }}
                                >
                                  {devHasBeenSentNew.averagedPercentage.toFixed(
                                    2
                                  ) == 100.0
                                    ? 100
                                    : devHasBeenSentNew.averagedPercentage.toFixed(
                                        2
                                      )}
                                  %
                                </span>
                              </div>
                            </div>

                            <div className="devmatching-bar border border-1">
                              <div
                                className="devmatch-level"
                                style={{
                                  width: `${devHasBeenSentNew.averagedPercentage}%`,
                                  backgroundColor: getBarColor(
                                    devHasBeenSentNew.averagedPercentage
                                  ),
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </div>
              ))}
        </div>
      )}
      {/* ------------------------------------------------------------------------------------------------- */}
      {/* LIST DEV ACCEPT AFTER REJECT */}

      <div>
        <div>{isVisibleListDevAfter && <h3>List Developer Accepted</h3>}</div>

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
                  <Col lg={1}>
                    <div></div>
                  </Col>

                  <Col lg={5}>
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
                      <div className="d-flex mb-2 align-items-center">
                        <span className=" fs-14">Salary</span>
                        <div className="devmatching-bar-salary border border-1 ms-3">
                          <div
                            className="devmatch-level-salary"
                            style={{
                              width: `${devHasBeenSentNew.salaryPerDevPercentage}%`,
                              backgroundColor: getBarColor(
                                devHasBeenSentNew.salaryPerDevPercentage
                              ),
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="d-flex mb-2 align-items-center">
                        <span className=" fs-14" style={{ width: "41px" }}>
                          Skill
                        </span>
                        <div className="devmatching-bar-skill border border-1 ms-3">
                          <div
                            className="devmatch-level-skill"
                            style={{
                              width: `${devHasBeenSentNew.skillPercentage}%`,
                              backgroundColor: getBarColor(
                                devHasBeenSentNew.skillPercentage
                              ),
                            }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <span>
                          Experience: {devHasBeenSentNew.yearOfExperience} years
                        </span>
                      </div>
                    </div>
                  </Col>

                  <Col lg={3} className="border-start border-3">
                    <div style={{ height: "100px" }}>
                      <div className="d-flex justify-content-end">
                        <span
                          className={
                            devHasBeenSentNew.selectedDevStatus ===
                            "Waiting HR Approval"
                              ? "badge bg-warning text-light"
                              : devHasBeenSentNew.selectedDevStatus ===
                                "Dev Accepted"
                              ? "badge bg-primary text-light"
                              : devHasBeenSentNew.selectedDevStatus ===
                                "HR Rejected"
                              ? "badge bg-danger text-light"
                              : devHasBeenSentNew.selectedDevStatus ===
                                "Waiting Interview"
                              ? "badge bg-warning text-light"
                              : devHasBeenSentNew.selectedDevStatus ===
                                "Waiting Dev Approval"
                              ? "badge bg-warning text-light"
                              : devHasBeenSentNew.selectedDevStatus ===
                                "Interviewing"
                              ? "badge bg-info text-light"
                              : ""
                          }
                        >
                          {devHasBeenSentNew.selectedDevStatus}
                        </span>
                      </div>
                      <div className="right-side-percen-matching-devaccepted">
                        <div className="d-flex w-100 justify-content-between">
                          <div className="d-flex align-items-center">
                            <p
                              style={{
                                display: "contents",
                                fontFamily: "Tahoma",
                                fontSize: "15px",
                              }}
                            >
                              Matching request total
                            </p>
                          </div>
                          <div className="matching-rate-dev">
                            <span
                              className="percent-matching-dev"
                              style={{
                                color: getBarColor(
                                  devHasBeenSentNew.averagedPercentage
                                ),
                              }}
                            >
                              {devHasBeenSentNew.averagedPercentage.toFixed(
                                2
                              ) == 100.0
                                ? 100
                                : devHasBeenSentNew.averagedPercentage.toFixed(
                                    2
                                  )}
                              %
                            </span>
                          </div>
                        </div>

                        <div className="devmatching-bar border border-1">
                          <div
                            className="devmatch-level"
                            style={{
                              width: `${devHasBeenSentNew.averagedPercentage}%`,
                              backgroundColor: getBarColor(
                                devHasBeenSentNew.averagedPercentage
                              ),
                            }}
                          ></div>
                        </div>
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
                  <h3 style={{ textAlign: "center" }}>
                    Are you sureAAAAAAAAAAAAAA?
                  </h3>
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
                  Reject Request
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

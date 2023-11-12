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

const ProjectDetailDesciption = () => {
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



  ////////////////////////////////////////////////////////////////////////////////////////
  const [selectAllDevMatching, setSelectAllDevAllMatching] = useState(false);
  const [selectedDev, setSelectedDev] = useState([]);
  const [isSendButtonVisible, setIsSendButtonVisibility] = useState(false);


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



  /////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////

  const [cancelReason, setCancelReason] = useState("");
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);





  //---------------------------------------------------------------------------------------------------


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
        setShowCandidateList(false);
        setIsVisibleListDevAfter(true);
      }

      return response;
    } catch (error) {
      console.error("Error fetching hiring request:", error);
    }
  };




  //////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown((prevState) => !prevState);

  //----------------------------------------------------------------------------------------
  //const [cancelReason, setCancelReason] = useState("");

  const [cancelReasonAfter, setCancelReasonAfter] = useState("");


  //---------------------------------------------------------------------------------------
  //handle modal cancel request after
  const [isCancelAfterModalOpen, setIsCancelAfterModalOpen] = useState(false);

  const openCancelAfterModal = () => {
    setIsCancelAfterModalOpen(true);
  };




  useEffect(() => {
    fetchHiringRequestDetailInManager();
  }, []);


  const candidateDetails = devMatching;


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
    </React.Fragment>
  );
};

export default ProjectDetailDesciption;

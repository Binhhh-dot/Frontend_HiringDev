import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Row,
  Modal,
  ModalBody,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  NavItem,
  NavLink,
  Nav,
  TabPane,
  TabContent,
  Collapse,
} from "reactstrap";

import projectServices from "../../services/project.services";
import { useLocation } from "react-router";
import img0 from "../../assets/images/user/img-00.jpg";
import DeveloperDetailInProjectPopup from "../Home/SubSection/DeveloperDetailInProject";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faUserMinus,
} from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-bootstrap";
import projectTypeServices from "../../services/projectType.services";
import Select from "react-select";
import moment from "moment/moment";
import classnames from "classnames";
import payServices from "../../services/pay.services";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DatePicker, Space } from "antd";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { PlusOutlined } from "@ant-design/icons";
import { Empty } from "antd";

import "react-calendar/dist/Calendar.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { result } from "lodash";
import hireddevServices from "../../services/hireddev.services";
import UpdateProjectPopup from "./UpdateProjectPopup/UpdateProjectPopup";
import { Editor } from "@tinymce/tinymce-react";

dayjs.extend(customParseFormat);

const monthFormat = "YYYY-MM-DD";

const ProjectDetailDescription = () => {
  const { state } = useLocation();
  const [value, setValue] = useState("");
  const [allowedMonthsList, setAllowedMonthsList] = useState([]);
  //--------------------------------------------------------------------------------
  const [projectDetail, setProjectDetail] = useState([]);
  const [devInProject, setDevInProject] = useState([]);

  //--------------------------------------------------------------------------------
  const [currentProjectName, setCurrentProjectName] = useState(null);
  const [currentProjectType, setCurrentProjectType] = useState(null);
  const [currentStartDate, setcurrentStartDate] = useState(null);
  const [currentEndDate, setCurrentEndDate] = useState(null);
  const [currentDescription, setCurrentDescription] = useState(null);

  //const [startMonth, setStartMonth] = useState(null);
  //const [endMonth, setEndMonth] = useState(null);

  const [allowedDatesList, setAllowedDatesList] = useState([]);
  const [defaultMonth, setDefaultMonth] = useState(null);
  const [defaultClickDay, setDefaultClickDay] = useState(null);

  const [listPaySlip, setlistPaySlip] = useState([]);

  const [listWorklog, setListWorklog] = useState([]);
  //------------------------------------------------
  const [selectProjectId, setSelectProjectId] = useState({});
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const openModalUpdateProject = () => {
    setIsModalUpdateOpen(true);
  };

  const closeModalUpdateProject = () => {
    setIsModalUpdateOpen(false);
  };
  // -----------------------------------------------

  const convertDay = (yearmonthday) => {
    if (yearmonthday) {
      const dateMoment = moment(yearmonthday, "DD-MM-YYYY");

      const result = dateMoment.format("YYYY-MM-DD");
      return result;
    }
  };

  // const convertFile = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     file.preview = URL.createObjectURL(file);
  //     setCurrentFile(file);
  //   }
  // };

  //-------------------------------------------------------------------------------
  const [showCollapse, setShowCollapse] = useState(
    Array(devInProject.length).fill(false)
  );

  // Hàm toggleCollapse
  const toggleCollapse = (index, paySlipId) => {
    const newShowCollapse = [...showCollapse];
    newShowCollapse[index] = !newShowCollapse[index];
    setShowCollapse(newShowCollapse);
    fetchGetWorklog(paySlipId);
  };

  //--------------------------------------------------------------------------------

  const fetchGetProjectDetailByProjectId = async () => {
    let response;

    try {
      response = await projectServices.getProjectDetailByProjectId(
        state.projectId
      );

      console.log("project detail");
      console.log(response.data.data);

      setSelectProjectId(response.data.data.projectId);

      setProjectDetail(response.data.data);

      setCurrentProjectName(response.data.data.projectName);

      setCurrentProjectType(response.data.data.projectTypeName);

      setcurrentStartDate(convertDay(response.data.data.startDate));

      setCurrentEndDate(convertDay(response.data.data.endDate));

      setCurrentDescription(response.data.data.description);

      // -----------
      function convertToDateObject(dateString) {
        const [day, month, year] = dateString.split("-").map(Number);
        return new Date(year, month - 1, day); // month - 1 because months are zero-indexed in JavaScript
      }
      const startDate = convertToDateObject(response.data.data.startDate);
      const endDate = convertToDateObject(response.data.data.endDate);

      const monthsArray = [];
      //const yearsArray = [];

      let currentMonthStart = new Date(
        startDate.getFullYear(),
        startDate.getMonth() - 1,
        25
      );
      let currentMonthEnd = new Date(
        currentMonthStart.getFullYear(),
        currentMonthStart.getMonth() + 1,
        24
      );

      let checkFirstMonth = false;
      while (currentMonthStart <= endDate) {
        let formattedMonth;

        if (!checkFirstMonth) {
          if (currentMonthStart < startDate && startDate < currentMonthEnd) {
            formattedMonth =
              currentMonthEnd.getMonth() +
              1 +
              " " +
              currentMonthEnd.getFullYear();
            monthsArray.push(formattedMonth);
          }
          checkFirstMonth = true;
        } else {
          if (currentMonthStart < startDate) {
            formattedMonth =
              currentMonthEnd.getMonth() +
              1 +
              " " +
              currentMonthEnd.getFullYear();
            monthsArray.push(formattedMonth);
          } else {
            formattedMonth =
              currentMonthEnd.getMonth() +
              1 +
              " " +
              currentMonthEnd.getFullYear();
            monthsArray.push(formattedMonth);
          }
        }

        currentMonthStart.setMonth(currentMonthStart.getMonth() + 1);
        currentMonthStart.setDate(25);

        currentMonthEnd = new Date(
          currentMonthStart.getFullYear(),
          currentMonthStart.getMonth() + 1,
          24
        );
      }

      let formattedMonths = monthsArray.map((monthsArray) => {
        let [m, year] = monthsArray.split(" ");
        return `${m.padStart(2, "0")} ${year}`;
      });

      setAllowedDatesList(formattedMonths);
      console.log("monthsArray");
      console.log(formattedMonths);
      const [defaultMonth, defaultYear] = allowedDatesList[0].split(" ");

      // Thiết lập giá trị mặc định từ tháng và năm lấy từ chuỗi
      const defaultDate = new Date(defaultYear, defaultMonth - 1, 1);

      setDefaultMonth(defaultDate);
    } catch (error) {
      console.error("Error fetching project detail :", error);
    }
  };

  //----------------------------------------------------------------------------------
  // const [projectDevStatus, setProjectDevStatus] = useState(0);
  const fetchGetDeveloperByProject = async () => {
    let response;
    try {
      response = await projectServices.getDeveloperByProject(state.projectId);
      console.log("danh sach dev tham gia tham gia vào project");
      console.log(response.data.data);
      setDevInProject(response.data.data);
    } catch (error) {
      console.error("Error fetching developer by project:", error);
    }
  };
  //--------------------------------------------------------------------------------
  const [selectedCandidateInfo, setSelectedCandidateInfo] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (candidateInfo) => {
    setSelectedCandidateInfo(candidateInfo);
    setIsModalOpen(true);
    console.log(candidateInfo);
  };

  const closeModal = () => {
    setSelectedCandidateInfo({});
    setIsModalOpen(false);
  };

  //--------------------------------------------------------------------------------
  // const [modalUpdateProject, setModalUpdateProject] = useState(false);
  // const openModalUpdateProject = () => {
  //   setModalUpdateProject(!modalUpdateProject);
  // };

  //--------------------------------------------------------------------------------
  const [activeTab, setActiveTab] = useState("1");
  const tabChange = (tab) => {
    if (activeTab) {
      if (activeTab !== tab) setActiveTab(tab);
    }
  };
  //---------------------------------------------------------------------------------
  const [activeTabMini, setActiveTabMini] = useState("5");
  const tabChangeMini = (tabMini) => {
    if (activeTabMini) {
      if (activeTabMini !== tabMini) setActiveTabMini(tabMini);
    }
  };
  //---------------------------------------------------------------------------------
  // Date---
  //dayjs("2023/12/09", monthFormat)

  const getFormattedDate = (selectedDate) => {
    const selectedMonth = selectedDate.format("MM");
    const selectedYear = selectedDate.format("YYYY");

    const formattedDate = `${selectedYear}-${selectedMonth}-26`;

    return formattedDate;
  };

  // const isMonthInRange = (current) => {
  //   return (
  //     current.isSameOrAfter(startMonth, "month") &&
  //     current.isSameOrBefore(endMonth, "month")
  //   );
  // };

  const pickDate = (date) => {
    const formattedDate = getFormattedDate(date);
    setDefaultClickDay(formattedDate);
  };

  //---------------------------------------------------------------------------------

  const [listPeriod, setListPeriod] = useState([]);

  const fetchGetPayPeriod = async () => {
    let response;
    // console.log("defaultClickDay");
    // console.log(defaultClickDay);

    try {
      response = await payServices.getPayPeriod(
        state.projectId,
        defaultClickDay
      );
      console.log("PERIOD PERIOD");

      console.log(response.data.data.payPeriodId);
      setListPeriod(response.data.data);

      fetchGetListPaySlip(response.data.data.payPeriodId);
    } catch (error) {
      console.error("Error fetching get pay period or pay slip:", error);
      setListPeriod(null);
    }
  };

  //----------------------------------------------------------------------------------

  function allowedDates(dateList) {
    console.log("dateList");
    console.log(dateList);
    return function (current) {
      const currentDate = current.format("MM YYYY");
      return !dateList.includes(currentDate);
    };
  }

  //-------------------------------------------------------------------------------------
  const fetchGetListPaySlip = async (payPeriodIdSlip) => {
    let response;
    try {
      response = await payServices.getPaySlip(payPeriodIdSlip);

      console.log(response.data.data);
      console.log("PAY SLIP PAY SLIP");
      setlistPaySlip(response.data.data);
    } catch (error) {
      console.error("Error fetching pay slip", error);

      console.log("PAYYYYYYYYYYYYYYYYYYYYYYYYYYYYY");
    }
  };

  //-------------------------------------------------------------------------------------
  const fetchGetWorklog = async (paySlipId) => {
    let response;
    try {
      response = await payServices.getWorklog(paySlipId);
      console.log(response.data.data);
      console.log("WORK LOG WORK LOG");
      setListWorklog(response.data.data);
    } catch (error) {
      console.error("Error fetching worklog", error);
    }
  };

  //------------------------------------------------------------------------------------------
  const fetchKickDeveloperInProject = async (midleDeveloperId) => {
    let response;
    try {
      response = await hireddevServices.kickDeveloperInProject(
        state.projectId,
        midleDeveloperId
      );
      console.log(response.data.data);
      console.log("Kick OK");
    } catch (error) {
      console.error("Error fetching remove developer from project", error);
    }
  };

  //------------------------------------------------------------------------------------------
  const [showDropdown, setShowDropdown] = useState(
    Array(devInProject.length).fill(false)
  );

  const toggleDropdown = (index) => {
    const newShowDropdown = [...showDropdown];
    newShowDropdown[index] = !newShowDropdown[index];
    setShowDropdown(newShowDropdown);
  };
  //------------------------------------------------------------------------------------------
  const [modalKickDevInProject, setModalKickDevInProject] = useState(false);

  const [midleDeveloperId, setMidleDeveloperId] = useState([]);
  const openModalKickDevInProject = (developerId) => {
    console.log(developerId);
    setMidleDeveloperId(developerId);

    setModalKickDevInProject(!modalKickDevInProject);
  };

  //------------------------------------------------------------------------------------------
  const kickDeveloperFormProject = (midleDeveloperId) => {
    fetchKickDeveloperInProject(midleDeveloperId);
    setModalKickDevInProject(false);
  };
  //------------------------------------------------------------------------------------------
  useEffect(() => {
    fetchGetProjectDetailByProjectId();
    fetchGetDeveloperByProject();
  }, []);

  useEffect(() => {
    fetchGetProjectDetailByProjectId();
  }, [isModalUpdateOpen]);

  useEffect(() => {
    fetchGetPayPeriod();
  }, [defaultClickDay]);

  //--------------------------------------------------------------------------------

  return (
    <React.Fragment>
      <Card
        className="job-detail "
        style={{
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <CardBody className="p-3">
          <div>
            <Row>
              <Col lg={12}>
                <div
                  className="d-flex justify-content-between"
                  style={{ width: "100%" }}
                >
                  <div className="d-flex align-items-center gap-2">
                    <h3 className="mb-0">{projectDetail.projectName}</h3>

                    <span className={"badge bg-blue text-light fs-12"}>
                      {projectDetail.statusString}
                    </span>
                  </div>

                  <div className="d-flex align-items-center">
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="white"
                        id="dropdown-basic"
                        style={{ padding: "0px", color: "#ACB4B6" }}
                      >
                        <FontAwesomeIcon icon={faGear} size="lg" />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {/* Nội dung của dropdown ở đây */}
                        <Dropdown.Item onClick={openModalUpdateProject}>
                          Update Project
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>

                {/* -------------------------------------------------------------------------------- */}
                {/* Modal */}
                <UpdateProjectPopup
                  isModalOpen={isModalUpdateOpen}
                  closeModal={closeModalUpdateProject}
                  projectId={selectProjectId}
                ></UpdateProjectPopup>

                {/* -------------------------------------------------------------------------------- */}

                <p
                  className="fw-medium mb-0 text-muted"
                  style={{ fontStyle: "italic" }}
                >
                  #{projectDetail.projectCode}
                </p>
              </Col>
            </Row>
          </div>

          <div className="mt-4">
            <div className="d-flex justify-content-between">
              <Nav
                className="profile-content-nav nav-pills border-bottom gap-5 "
                id="pills-tab"
                role="tablist"
              >
                <NavItem role="presentation">
                  <NavLink
                    to="#"
                    className={classnames("nav-link", {
                      active: activeTab === "1",
                    })}
                    onClick={() => {
                      tabChange("1");
                    }}
                    type="button"
                  >
                    Overview
                  </NavLink>
                </NavItem>
                <NavItem role="presentation">
                  <NavLink
                    to="#"
                    className={classnames("nav-link", {
                      active: activeTab === "2",
                    })}
                    onClick={() => {
                      tabChange("2");
                    }}
                    type="button"
                  >
                    Developer
                  </NavLink>
                </NavItem>
                <NavItem role="presentation">
                  <NavLink
                    to="#"
                    className={classnames("nav-link", {
                      active: activeTab === "3",
                    })}
                    onClick={() => {
                      tabChange("3");
                    }}
                    type="button"
                  >
                    Pay Period
                  </NavLink>
                </NavItem>
              </Nav>
            </div>

            <CardBody className="px-0">
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <Row className="justify-content-between">
                    <Col
                      lg={12}
                      className="d-flex flex-column align-items-center"
                    >
                      <div style={{ width: "100%" }}>
                        <p className="mb-0 text-muted">Project Type </p>
                        <div
                          className="p-2 border border-2 mt-1"
                          style={{
                            width: "100%",
                            fontWeight: "500",
                            borderRadius: "5px",
                            backgroundColor: "#EFF0F2",
                          }}
                        >
                          {projectDetail.projectTypeName}
                        </div>
                      </div>

                      <div style={{ width: "100%" }} className="mt-3">
                        <p className="mb-0 text-muted">Member</p>
                        <div
                          className="p-2 border border-2 mt-1"
                          style={{
                            width: "100%",
                            fontWeight: "500",
                            borderRadius: "5px",
                            backgroundColor: "#EFF0F2",
                          }}
                        >
                          {projectDetail.numberOfDev}
                        </div>
                      </div>

                      <div
                        style={{ width: "100%" }}
                        className="d-flex align-items-center mt-3 gap-3"
                      >
                        <div style={{ width: "100%" }}>
                          <p className="mb-0 text-muted">Start Date </p>
                          <div
                            className="p-2 border border-2 mt-1"
                            style={{
                              width: "100%",
                              fontWeight: "500",
                              borderRadius: "5px",
                              backgroundColor: "#EFF0F2",
                            }}
                          >
                            {projectDetail.startDateMMM}
                          </div>
                        </div>

                        <div style={{ width: "100%" }}>
                          <p className="mb-0 text-muted">End Date</p>
                          <div
                            className="p-2 border border-2 mt-1"
                            style={{
                              width: "100%",
                              fontWeight: "500",
                              borderRadius: "5px",
                              backgroundColor: "#EFF0F2",
                            }}
                          >
                            {projectDetail.endDateMMM}
                          </div>
                        </div>
                      </div>

                      <div style={{ width: "100%" }} className="mt-3">
                        <p className="mb-0 text-muted">Description</p>
                        <div
                          className="p-2 border border-2 mt-1"
                          style={{
                            width: "100%",
                            fontWeight: "500",
                            borderRadius: "5px",
                            backgroundColor: "#EFF0F2",
                          }}
                        >
                          <p
                            className="project-description mb-0"
                            dangerouslySetInnerHTML={{
                              __html: projectDetail.description,
                            }}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <div className="mt-1 mb-2">
                    <div>
                      <h4>List Working Developers</h4>
                    </div>

                    {devInProject.map((devInProjectDetail, key) => (
                      <div
                        style={{
                          boxShadow:
                            "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                        }}
                        key={key}
                        className="job-box-dev-in-list-hiringRequest-for-dev card mt-3"
                      >
                        <CardBody>
                          <Row className="align-items-center">
                            <Col
                              lg={2}
                              className="d-flex justify-content-center"
                            >
                              <div className="candidate-profile text-center">
                                <img
                                  src={devInProjectDetail.userImage || img0}
                                  alt=""
                                  className="avatar-lg rounded-circle"
                                />
                              </div>
                            </Col>
                            <Col lg={3} className="">
                              <h5
                                className="mb-0"
                                onClick={() => openModal(devInProjectDetail)}
                              >
                                {devInProjectDetail.firstName}{" "}
                                {devInProjectDetail.lastName}
                              </h5>
                              <ul className="info-dev-by-project mb-0">
                                <li>
                                  <i className="uil uil-envelope"></i>{" "}
                                  {devInProjectDetail.email}
                                </li>

                                <li>
                                  <i className="uil uil-phone-volume"></i>{" "}
                                  {devInProjectDetail.phoneNumber}
                                </li>
                              </ul>
                            </Col>
                            <Col lg={2}>
                              <ul className="info-dev-by-project mb-0 d-flex flex-column gap-1 align-items-center">
                                <li>
                                  <span className="d-flex gap-1 ">
                                    <p className="mb-0">Exp: </p>
                                    {devInProjectDetail.yearOfExperience} years
                                  </span>
                                </li>
                              </ul>
                            </Col>
                            <Col
                              lg={1}
                              className="d-flex gap-1 justify-content-center"
                            >
                              <i className="uil uil-keyboard"></i>
                              <p className="mb-0">
                                {devInProjectDetail.levelRequireName}
                              </p>
                            </Col>
                            <Col
                              lg={3}
                              className="d-flex justify-content-center"
                            >
                              <p className="mb-0 badge bg-blue text-light fs-13 ">
                                {devInProjectDetail.hiredDevStatusString}
                              </p>
                            </Col>
                            <Col
                              lg={1}
                              className="d-flex justify-content-center"
                            >
                              <div>
                                <Dropdown
                                  isOpen={showDropdown[key]}
                                  toggle={() => toggleDropdown(key)}
                                >
                                  <Dropdown.Toggle
                                    variant="white"
                                    id="dropdown-devInProject"
                                    style={{ padding: "0px", color: "#ACB4B6" }}
                                  >
                                    <FontAwesomeIcon
                                      icon={faUserMinus}
                                      size="xl"
                                    />
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu>
                                    <Dropdown.Item
                                      onClick={() =>
                                        openModalKickDevInProject(
                                          devInProjectDetail.developerId
                                        )
                                      }
                                    >
                                      Remove Developer
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                      </div>
                    ))}
                    {/* Modal Kick Develoepr */}
                    <Modal
                      isOpen={modalKickDevInProject}
                      toggle={() =>
                        setModalKickDevInProject(!modalKickDevInProject)
                      }
                      centered
                    >
                      <div className="modal-header">
                        <h4>Remove Developer From Project</h4>
                      </div>
                      <ModalBody style={{ minHeight: "100px" }}>
                        <div>
                          <p className="mb-0 text-muted">
                            Are you sure you would like to remove this
                            developer, This action can not be undone.
                          </p>
                        </div>
                      </ModalBody>
                      <div className="d-flex justify-content-end gap-2 mt-2 modal-footer">
                        <button
                          style={{ width: "100px" }}
                          className="btn btn-secondary"
                          onClick={() => setModalKickDevInProject(false)}
                        >
                          Cancel
                        </button>
                        <button
                          style={{ width: "100px" }}
                          className="btn btn-danger"
                          onClick={() =>
                            kickDeveloperFormProject(midleDeveloperId)
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </Modal>
                  </div>
                </TabPane>
                <TabPane tabId="3">
                  <div>
                    {/* ----------------------------------------------------------------------- */}

                    <div className="mb-2 d-flex justify-content-between">
                      {/* defaultMonth */}
                      <DatePicker
                        defaultValue={defaultMonth}
                        picker="month"
                        disabledDate={allowedDates(allowedDatesList)}
                        format="MM YYYY"
                        onChange={(date) => pickDate(date)}
                      />
                      <div style={{ borderRadius: "9px" }}>
                        <div
                          className="border border-1 p-2"
                          style={{
                            borderRadius: "9px",
                            backgroundColor: "#1677FF",
                            color: "white",
                          }}
                        >
                          <i className="uil uil-plus"></i> Create Pay Period
                        </div>
                      </div>
                    </div>

                    <Nav
                      className="profile-content-nav nav-pills border-bottom mb-4"
                      id="pills-tab"
                      role="tablist"
                      justified
                    >
                      <NavItem role="presentation">
                        <NavLink
                          to="#"
                          className={classnames("nav-link", {
                            active: activeTabMini === "5",
                          })}
                          onClick={() => {
                            tabChangeMini("5");
                          }}
                          type="button"
                        >
                          Pay Period
                        </NavLink>
                      </NavItem>

                      <NavItem role="presentation">
                        <NavLink
                          to="#"
                          className={classnames("nav-link", {
                            active: activeTabMini === "6",
                          })}
                          onClick={() => {
                            tabChangeMini("6");
                          }}
                          type="button"
                        >
                          Pay Slip
                        </NavLink>
                      </NavItem>
                    </Nav>

                    {/* -------------------------------------------------------------- */}
                    <div>
                      <TabContent activeTab={activeTabMini}>
                        <TabPane tabId="5">
                          <div>
                            <div>
                              <div>
                                <div className="px-4 mb-2">
                                  <Row className="align-items-center">
                                    <Col md={2} style={{ textAlign: "center" }}>
                                      <div>
                                        <span className="mb-0">
                                          Payperiod Code
                                        </span>
                                      </div>
                                    </Col>

                                    <Col md={2} style={{ textAlign: "center" }}>
                                      <div>
                                        <p className="mb-0">Start Date</p>
                                      </div>
                                    </Col>

                                    <Col md={2} style={{ textAlign: "center" }}>
                                      <div>
                                        <p className="mb-0">End Date</p>
                                      </div>
                                    </Col>

                                    <Col md={2} style={{ textAlign: "center" }}>
                                      <p className="mb-0">Total Amount</p>
                                    </Col>

                                    <Col md={2} style={{ textAlign: "center" }}>
                                      Created At
                                    </Col>

                                    <Col md={2} style={{ textAlign: "center" }}>
                                      <div>
                                        <span>Status</span>
                                      </div>
                                    </Col>
                                  </Row>
                                </div>
                                <div
                                  style={{
                                    boxShadow:
                                      "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                                  }}
                                  className={
                                    "job-box-dev-in-list-hiringRequest-for-dev card"
                                  }
                                >
                                  {listPeriod !== null ? (
                                    <div className="p-4">
                                      <Row className="align-items-center">
                                        <Col
                                          md={2}
                                          style={{ textAlign: "center" }}
                                        >
                                          <div>
                                            <span className="mb-0">
                                              {listPeriod.payPeriodCode}
                                            </span>
                                          </div>
                                        </Col>

                                        <Col
                                          md={2}
                                          style={{ textAlign: "center" }}
                                        >
                                          <div>
                                            <p className="mb-0">
                                              {listPeriod.startDateMMM}
                                            </p>
                                          </div>
                                        </Col>

                                        <Col
                                          md={2}
                                          style={{ textAlign: "center" }}
                                        >
                                          <div>
                                            <p className="mb-0">
                                              {listPeriod.endDateMMM}
                                            </p>
                                          </div>
                                        </Col>

                                        <Col
                                          md={2}
                                          style={{ textAlign: "center" }}
                                        >
                                          <p className="mb-0">
                                            {listPeriod.totalAmount}
                                          </p>
                                        </Col>

                                        <Col
                                          md={2}
                                          style={{ textAlign: "center" }}
                                        >
                                          {listPeriod.createdAt}
                                        </Col>

                                        <Col
                                          md={2}
                                          style={{ textAlign: "center" }}
                                        >
                                          <div>
                                            <span
                                              className={
                                                listPeriod.statusString ===
                                                  "Created"
                                                  ? "badge bg-blue text-light fs-12"
                                                  : listPeriod.statusString ===
                                                    "cancelled"
                                                    ? "badge bg-danger text-light fs-12"
                                                    : listPeriod.statusString ===
                                                      "Inprogress"
                                                      ? "badge bg-primary text-light fs-12"
                                                      : listPeriod.statusString ===
                                                        "completed"
                                                        ? "badge bg-primary text-light fs-12"
                                                        : ""
                                              }
                                            >
                                              {listPeriod.statusString}
                                            </span>
                                          </div>
                                        </Col>
                                      </Row>
                                    </div>
                                  ) : (
                                    <div>
                                      <Empty />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabPane>
                        <TabPane tabId="6">
                          <div>
                            <Row className="mb-2 px-3">
                              <Col md={2} style={{ textAlign: "center" }}>
                                First Name
                              </Col>
                              <Col
                                md={2}
                                className="px-0"
                                style={{ textAlign: "center" }}
                              >
                                Last Name
                              </Col>
                              <Col
                                md={2}
                                className="px-0"
                                style={{ textAlign: "center" }}
                              >
                                Email
                              </Col>
                              <Col
                                md={2}
                                className="px-0"
                                style={{ textAlign: "center" }}
                              >
                                Total Hours
                              </Col>
                              <Col
                                md={1}
                                className="px-0"
                                style={{ textAlign: "center" }}
                              >
                                Total OT
                              </Col>
                              <Col
                                md={2}
                                className="px-0"
                                style={{ textAlign: "center" }}
                              >
                                Total Salary
                              </Col>
                              <Col md={1}></Col>
                            </Row>

                            {listPeriod !== null ? (
                              <div className="d-flex flex-column gap-2">
                                {listPaySlip.map((listPaySlipNew, key) => (
                                  <div key={key}>
                                    <div
                                      style={{
                                        boxShadow:
                                          "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                                      }}
                                      className={
                                        "job-box-dev-in-list-hiringRequest-for-dev card"
                                      }
                                    >
                                      <div className="p-3">
                                        <Row className="align-items-center">
                                          <Col
                                            md={2}
                                            style={{ textAlign: "center" }}
                                          >
                                            <div>
                                              <span className="mb-0">
                                                {listPaySlipNew.firstName}
                                              </span>
                                            </div>
                                          </Col>

                                          <Col
                                            md={2}
                                            className="px-0"
                                            style={{ textAlign: "center" }}
                                          >
                                            <div>
                                              <p className="mb-0">
                                                {listPaySlipNew.lastName}
                                              </p>
                                            </div>
                                          </Col>

                                          <Col
                                            md={2}
                                            className="px-0"
                                            style={{ textAlign: "center" }}
                                          >
                                            <div>
                                              <p className="mb-0">
                                                {listPaySlipNew.email}
                                              </p>
                                            </div>
                                          </Col>

                                          <Col
                                            md={2}
                                            className="px-0"
                                            style={{ textAlign: "center" }}
                                          >
                                            <p className="mb-0">
                                              {
                                                listPaySlipNew.totalActualWorkedHours
                                              }
                                            </p>
                                          </Col>

                                          <Col
                                            md={1}
                                            className=" px-0"
                                            style={{ textAlign: "center" }}
                                          >
                                            {listPaySlipNew.totalOvertimeHours}
                                          </Col>

                                          <Col
                                            md={2}
                                            style={{ textAlign: "center" }}
                                          >
                                            <div>
                                              <span>
                                                {listPaySlipNew.totalEarnings}
                                              </span>
                                            </div>
                                          </Col>

                                          <Col md={1}>
                                            <div
                                              className="d-flex justify-content-center rounded-circle"
                                              onClick={() =>
                                                toggleCollapse(
                                                  key,
                                                  listPaySlipNew.paySlipId
                                                )
                                              }
                                              style={{
                                                backgroundColor: "#ECECED",
                                              }}
                                            >
                                              <i
                                                className="uil uil-angle-down"
                                                style={{ fontSize: "26px" }}
                                              ></i>
                                            </div>
                                          </Col>
                                        </Row>
                                      </div>
                                    </div>

                                    <Collapse isOpen={showCollapse[key]}>
                                      {listWorklog.map(
                                        (listWorklogNew, key) => (
                                          <div
                                            key={key}
                                            style={{
                                              backgroundColor: "#EFF0F2",
                                              borderRadius: "7px",
                                            }}
                                            className="mt-1 p-2"
                                          >
                                            <div className="d-flex flex-column gap-2">
                                              <div
                                                className="job-box-dev-in-list-hiringRequest-for-dev card  p-2"
                                                style={{
                                                  backgroundColor: "#FFFFFF",
                                                }}
                                              >
                                                <Row>
                                                  <Col
                                                    md={3}
                                                    className="d-flex justify-content-center align-items-center"
                                                  >
                                                    {listWorklogNew.workDateMMM}
                                                  </Col>
                                                  <Col md={3}>
                                                    <div>
                                                      {" "}
                                                      <Input
                                                        type="text"
                                                        className="form-control"
                                                        id="time-In"
                                                        value={
                                                          listWorklogNew.timeIn
                                                        }
                                                        onChange={(e) =>
                                                          setCurrentProjectName(
                                                            e.target.value
                                                          )
                                                        }
                                                      />
                                                    </div>
                                                  </Col>
                                                  <Col md={3}>
                                                    <div>
                                                      {" "}
                                                      <Input
                                                        type="text"
                                                        className="form-control"
                                                        id="time-Out"
                                                        value={
                                                          listWorklogNew.timeOut
                                                        }
                                                        onChange={(e) =>
                                                          setCurrentProjectName(
                                                            e.target.value
                                                          )
                                                        }
                                                      />
                                                    </div>
                                                  </Col>
                                                  <Col
                                                    md={3}
                                                    className="d-flex justify-content-center align-items-center"
                                                  >
                                                    {
                                                      listWorklogNew.hourWorkInDay
                                                    }
                                                  </Col>
                                                </Row>
                                              </div>
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </Collapse>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div>
                                <Empty />
                              </div>
                            )}
                          </div>
                        </TabPane>
                      </TabContent>
                    </div>
                  </div>
                </TabPane>
              </TabContent>
            </CardBody>
          </div>
        </CardBody>
      </Card>

      {/* ----------------------------------------------------------------------------- */}
      {/* <DeveloperDetailInProjectPopup
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        devId={selectedCandidateInfo.developerId}
      /> */}
    </React.Fragment>
  );
};

export default ProjectDetailDescription;

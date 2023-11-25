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
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
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

import "react-calendar/dist/Calendar.css";
dayjs.extend(customParseFormat);

const monthFormat = "YYYY/MM/DD";

const ProjectDetailDescription = () => {
  const { state } = useLocation();
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
  const [currentFile, setCurrentFile] = useState(null);

  const [startMonth, setStartMonth] = useState(null);
  const [endMonth, setEndMonth] = useState(null);
  const [allowedYearsList, setAllowedYearsList] = useState([]);
  // ----

  const convertDay = (yearmonthday) => {
    if (yearmonthday) {
      const dateMoment = moment(yearmonthday, "DD-MM-YYYY");

      const result = dateMoment.format("YYYY/MM/DD");
      return result;
    }
  };

  const convertFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      file.preview = URL.createObjectURL(file);
      setCurrentFile(file);
    }
  };

  //-------------------------------------------------------------------------------
  const [showCollapse, setShowCollapse] = useState(
    Array(devInProject.length).fill(false)
  );

  // Hàm toggleCollapse
  const toggleCollapse = (index) => {
    const newShowCollapse = [...showCollapse];
    newShowCollapse[index] = !newShowCollapse[index];
    setShowCollapse(newShowCollapse);
  };

  //--------------------------------------------------------------------------------

  const fetchGetProjectDetailByProjectId = async () => {
    let response;
    try {
      response = await projectServices.getProjectDetailByProjectId(
        state.projectId
      );
      setProjectDetail(response.data.data);

      setCurrentProjectName(response.data.data.projectName);
      setCurrentProjectType(response.data.data.projectTypeName);

      setcurrentStartDate(convertDay(response.data.data.startDate));
      setStartMonth(
        dayjs(convertDay(response.data.data.startDate), monthFormat)
      );

      setCurrentEndDate(convertDay(response.data.data.endDate));
      setEndMonth(dayjs(convertDay(response.data.data.startDate), monthFormat));

      setCurrentDescription(response.data.data.description);
      console.log("GGGGGGGGGGGGGGGGGGGGGG");
      console.log(convertDay(response.data.data.startDate));

      // -----------
      function convertToDateObject(dateString) {
        const [day, month, year] = dateString.split("-").map(Number);
        return new Date(year, month - 1, day); // month - 1 because months are zero-indexed in JavaScript
      }
      const startDate = convertToDateObject(response.data.data.startDate);
      const endDate = convertToDateObject(response.data.data.endDate);

      const monthsArray = [];
      const yearsArray = [];

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
        let formattedYear;

        if (!checkFirstMonth) {
          if (currentMonthStart < startDate && startDate < currentMonthEnd) {
            formattedMonth = currentMonthEnd.getMonth() + 1;
            formattedYear = currentMonthEnd.getFullYear();
            monthsArray.push(formattedMonth);
            yearsArray.push(formattedYear);
          }

          checkFirstMonth = true;
        } else {
          if (currentMonthStart < startDate) {
            formattedMonth = currentMonthEnd.getMonth() + 1;
            formattedYear = currentMonthEnd.getFullYear();
            monthsArray.push(formattedMonth);
            yearsArray.push(formattedYear);
          } else {
            formattedMonth = currentMonthEnd.getMonth() + 1;
            formattedYear = currentMonthEnd.getFullYear();
            monthsArray.push(formattedMonth);
            yearsArray.push(formattedYear);
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

      setAllowedMonthsList(monthsArray);
      console.log("monthsArray");
      setAllowedYearsList(yearsArray);
      console.log(yearsArray);
      console.log(monthsArray);
    } catch (error) {
      console.error("Error fetching project detail :", error);
    }
  };
  //----------------------------------------------------------------------------------
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

  const [optionProjectType, setOptionProjectType] = useState([]);
  const [selectOption, setSelectOption] = useState([]);
  //--------------------------------------------------------------------------------

  const fetchProjectType = async () => {
    let response;
    try {
      response = await projectTypeServices.getAllProjectType();
      console.log(response.data.data);

      const activeTypes = response.data.data.filter(
        (type) => type.statusString === "Active"
      );

      if (projectDetail) {
        const requiredTypeName = projectDetail.projectTypeName;
        const foundType = activeTypes.find(
          (type) => type.projectTypeName === requiredTypeName
        );
        if (foundType) {
          const newType = {
            value: foundType.projectTypeId.toString(),
            label: foundType.projectTypeName,
          };
          setOptionProjectType(newType);
        }
      }
      let formattedTypes = activeTypes.map((type) => ({
        value: type.projectTypeId.toString(),
        label: type.projectTypeName,
      }));

      setOptionProjectType(formattedTypes);
    } catch (error) {
      console.error("Error fetching project type:", error);
    }
  };

  const handleChangeOption = (selected) => {
    console.log(selected);
    setSelectOption(selected);
  };
  //--------------------------------------------------------------------------------
  const [modalUpdateProject, setModalUpdateProject] = useState(false);
  const openModalUpdateProject = () => {
    setModalUpdateProject(!modalUpdateProject);
  };

  //--------------------------------------------------------------------------------
  const [resultUpdate, setresultUpdate] = useState([]);

  const fetchUpdateProject = async () => {
    let response;
    try {
      response = await projectServices.updateProject(
        state.projectId,
        state.projectId,
        currentProjectType,
        currentProjectName,
        currentDescription,
        currentStartDate,
        currentEndDate,
        currentFile
      );

      console.log(response.data.data);
      setresultUpdate(response.data.data);
      fetchGetProjectDetailByProjectId();
    } catch (error) {
      console.error("Error fetching update project:", error);
    }
  };
  //--------------------------------------------------------------------------------
  const updateProject = () => {
    fetchUpdateProject();
  };
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

  const [defaultClickDay, setDefaultClickDay] = useState(null);

  const isMonthInRange = (current) => {
    return (
      current.isSameOrAfter(startMonth, "month") &&
      current.isSameOrBefore(endMonth, "month")
    );
  };

  const pickDate = (date) => {
    const formattedDate = getFormattedDate(date);
    setDefaultClickDay(formattedDate);
    console.log(formattedDate);
    console.log("JJJJJJJJJJJJJ");
  };

  //---------------------------------------------------------------------------------

  const [listPeriod, setListPeriod] = useState([]);

  const fetchGetPayPeriod = async () => {
    let response;
    try {
      response = await payServices.getPayPeriod(
        state.projectId,
        defaultClickDay
      );
      console.log("PERIOD PERIOD");
      console.log(response.data);
      setListPeriod(response.data.data);
    } catch (error) {
      console.error("Error fetching get pay period:", error);
    }
  };

  //----------------------------------------------------------------------------------

  function allowedMonthsAndYears(monthList, yearList) {
    return function (current) {
      const currentMonth = current.month();
      const currentYear = current.year();

      const isInAllowedMonths = monthList.some(
        (month) => currentMonth === month - 1 && currentYear === moment().year()
      );

      const isInAllowedYears = yearList.some(
        (year) => currentYear === year && currentMonth === moment().month()
      );

      return !(isInAllowedMonths && isInAllowedYears);
    };
  }
  //-------------------------------------------------------------------------------------

  useEffect(() => {
    fetchGetProjectDetailByProjectId();
  }, []);

  useEffect(() => {
    fetchGetDeveloperByProject();
  }, []);

  useEffect(() => {
    fetchProjectType();
  }, []);

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
                        <Dropdown.Item href="#">Dropdown Item 2</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>

                {/* ------------------ */}
                <Modal
                  isOpen={modalUpdateProject}
                  toggle={openModalUpdateProject}
                  role="dialog"
                  centered
                  size="lg"
                >
                  <ModalBody className="p-4">
                    <div className="position-absolute end-0 top-0 p-3">
                      <button
                        type="button"
                        className="btn-close"
                        onClick={openModalUpdateProject}
                      ></button>
                    </div>
                    <div className="auth-content">
                      <div className="w-100">
                        <div className="text-center mb-4">
                          <h5>Update Project</h5>
                          <p className="text-muted"></p>
                        </div>
                        <Form action="#" className="auth-form">
                          <FormGroup className="mb-3">
                            <Label
                              htmlFor="projectNameInput"
                              className="form-label"
                            >
                              Project Name
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              id="project-name"
                              value={currentProjectName}
                              onChange={(e) =>
                                setCurrentProjectName(e.target.value)
                              }
                            />
                          </FormGroup>

                          <FormGroup className="mb-3">
                            <Label
                              htmlFor="projectTypeInput"
                              className="form-label"
                            >
                              Project Type
                            </Label>
                            <div className="form-button">
                              <Select
                                options={optionProjectType}
                                defaultInputValue={currentProjectType}
                                onChange={handleChangeOption}
                                className="Select Select--level-highest"
                                style={{
                                  maxHeight: "2000px",
                                  overflowY: "auto",
                                }}
                              />
                            </div>
                          </FormGroup>
                          <div className="d-flex justify-content-between gap-2">
                            <FormGroup
                              className="mb-3"
                              style={{ width: "50%" }}
                            >
                              <Label
                                htmlFor="startDateInput"
                                className="form-label"
                              >
                                Start Date
                              </Label>
                              <Input
                                type="date"
                                className="form-control"
                                id="start-date"
                                value={currentStartDate}
                                onChange={(e) =>
                                  setcurrentStartDate(e.target.value)
                                }
                              />
                            </FormGroup>

                            <FormGroup
                              className="mb-3"
                              style={{ width: "50%" }}
                            >
                              <Label
                                htmlFor="endDateInput"
                                className="form-label"
                              >
                                End Date
                              </Label>
                              <Input
                                type="date"
                                className="form-control"
                                id="end-date"
                                value={currentEndDate}
                                onChange={(e) =>
                                  setCurrentEndDate(e.target.value)
                                }
                              />
                            </FormGroup>
                          </div>

                          <FormGroup className="mb-3">
                            <label htmlFor="fileInput" className="form-label">
                              File Image
                            </label>
                            <Input
                              type="file"
                              className="file"
                              id="fileInput"
                              onChange={convertFile}
                            />
                          </FormGroup>

                          <FormGroup className="mb-3">
                            <label
                              htmlFor="passwordInput"
                              className="form-label"
                            >
                              Description
                            </label>
                            <Input
                              type="textarea"
                              className="form-control"
                              id="description"
                              style={{ height: 100 }}
                              value={currentDescription}
                              onChange={(e) =>
                                setCurrentDescription(e.target.value)
                              }
                            />
                          </FormGroup>

                          <div className="text-center">
                            <div
                              className="btn btn-primary w-100"
                              onClick={() => updateProject()}
                            >
                              Update Project
                            </div>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </ModalBody>
                </Modal>
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
                    Payroll
                  </NavLink>
                </NavItem>
                <NavItem role="presentation">
                  <NavLink
                    to="#"
                    className={classnames("nav-link", {
                      active: activeTab === "4",
                    })}
                    onClick={() => {
                      tabChange("4");
                    }}
                    type="button"
                  >
                    History
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
                          {projectDetail.description}
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
                                  src={img0}
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
                              lg={2}
                              className="d-flex gap-1 justify-content-center"
                            >
                              <i className="uil uil-keyboard"></i>
                              <p className="mb-0">
                                {devInProjectDetail.levelRequireName}
                              </p>
                            </Col>
                            <Col
                              lg={2}
                              className="d-flex justify-content-center"
                            >
                              <p className="mb-0 badge bg-blue text-light fs-13 ">
                                {devInProjectDetail.devStatusString}
                              </p>
                            </Col>
                            <Col
                              lg={1}
                              className="d-flex justify-content-center"
                            >
                              <div>
                                <FontAwesomeIcon
                                  icon={faEllipsisVertical}
                                  size="xl"
                                />
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                      </div>
                    ))}
                  </div>
                </TabPane>
                <TabPane tabId="3">
                  <div>
                    {/* ----------------------------------------------------------------------- */}
                    {/* <DatePicker
                      defaultValue={startMonth}
                      format={monthFormat}
                      picker="month"
                      disabledDate={(current) =>
                        !isMonthInRange(dayjs(current))
                      }
                      onChange={(date) => setStartMonth(date)}
                    /> */}
                    {/* ----------------------------------------------------------------------- */}
                    <div className="mb-2 d-flex justify-content-between">
                      <DatePicker
                        defaultValue={startMonth}
                        // format={monthFormat}
                        picker="month"
                        disabledDate={allowedMonthsAndYears(
                          allowedMonthsList,
                          allowedYearsList
                        )}
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
                            {/* <div className="mb-4 d-flex justify-content-between">
                              <DatePicker
                                defaultValue={dayjs("2023/11", monthFormat)}
                                format={monthFormat}
                                picker="month"
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
                                  <i className="uil uil-plus"></i> Create
                                </div>
                              </div>
                            </div> */}

                            <div>
                              <div>
                                <div className="px-4 mb-2">
                                  <Row className="align-items-center">
                                    <Col md={2} style={{ textAlign: "center" }}>
                                      <div>
                                        <span className="mb-0">
                                          PayPeriodCode
                                        </span>
                                      </div>
                                    </Col>

                                    <Col md={2} style={{ textAlign: "center" }}>
                                      <div>
                                        <p className="mb-0">StartDate</p>
                                      </div>
                                    </Col>

                                    <Col md={2} style={{ textAlign: "center" }}>
                                      <div>
                                        <p className="mb-0">EndDate</p>
                                      </div>
                                    </Col>

                                    <Col md={2} style={{ textAlign: "center" }}>
                                      <p className="mb-0">TotalAmount</p>
                                    </Col>

                                    <Col md={2} style={{ textAlign: "center" }}>
                                      CreatedAt
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
                                  <div className="p-4">
                                    <Row className="align-items-center">
                                      <Col
                                        md={2}
                                        style={{ textAlign: "center" }}
                                      >
                                        <div>
                                          <span className="mb-0">#MLN111</span>
                                        </div>
                                      </Col>

                                      <Col
                                        md={2}
                                        style={{ textAlign: "center" }}
                                      >
                                        <div>
                                          <p className="mb-0">25 Oct 2023</p>
                                        </div>
                                      </Col>

                                      <Col
                                        md={2}
                                        style={{ textAlign: "center" }}
                                      >
                                        <div>
                                          <p className="mb-0">24 Nov 2023</p>
                                        </div>
                                      </Col>

                                      <Col
                                        md={2}
                                        style={{ textAlign: "center" }}
                                      >
                                        <p className="mb-0">3000$</p>
                                      </Col>

                                      <Col
                                        md={2}
                                        style={{ textAlign: "center" }}
                                      >
                                        25 Nov 2023
                                      </Col>

                                      <Col
                                        md={2}
                                        style={{ textAlign: "center" }}
                                      >
                                        <div>
                                          <span>Status</span>
                                        </div>
                                      </Col>
                                    </Row>
                                  </div>
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

                            <div className="d-flex flex-column gap-2">
                              {devInProject.map((devInProjectNew, key) => (
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
                                            <span className="mb-0">Nguyen</span>
                                          </div>
                                        </Col>

                                        <Col
                                          md={2}
                                          className="px-0"
                                          style={{ textAlign: "center" }}
                                        >
                                          <div>
                                            <p className="mb-0">Van A</p>
                                          </div>
                                        </Col>

                                        <Col
                                          md={2}
                                          className="px-0"
                                          style={{ textAlign: "center" }}
                                        >
                                          <div>
                                            <p className="mb-0">a@gmail.com</p>
                                          </div>
                                        </Col>

                                        <Col
                                          md={2}
                                          className="px-0"
                                          style={{ textAlign: "center" }}
                                        >
                                          <p className="mb-0">168 hours</p>
                                        </Col>

                                        <Col
                                          md={1}
                                          className=" px-0"
                                          style={{ textAlign: "center" }}
                                        >
                                          10 hours
                                        </Col>

                                        <Col
                                          md={2}
                                          style={{ textAlign: "center" }}
                                        >
                                          <div>
                                            <span>20000$</span>
                                          </div>
                                        </Col>

                                        <Col md={1}>
                                          <div
                                            className="d-flex justify-content-center rounded-circle"
                                            onClick={() => toggleCollapse(key)}
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
                                    <div
                                      style={{
                                        backgroundColor: "#EFF0F2",
                                        borderRadius: "7px",
                                      }}
                                      className="mt-1 p-2"
                                    >
                                      <div className="d-flex flex-column gap-2">
                                        <div
                                          className="job-box-dev-in-list-hiringRequest-for-dev card  p-2"
                                          style={{ backgroundColor: "#FFFFFF" }}
                                        >
                                          <Row>
                                            <Col
                                              md={3}
                                              className="d-flex justify-content-center align-items-center"
                                            >
                                              Work Date
                                            </Col>
                                            <Col md={3}>
                                              <div>
                                                {" "}
                                                <Input
                                                  type="text"
                                                  className="form-control"
                                                  id="time-In"
                                                  value={"07:00"}
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
                                                  value={"07:00"}
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
                                              Hours In Day{" "}
                                            </Col>
                                          </Row>
                                        </div>
                                      </div>
                                    </div>
                                  </Collapse>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TabPane>
                      </TabContent>
                    </div>
                  </div>
                </TabPane>

                <TabPane tabId="4">
                  <div className="mt-1 mb-2">
                    <div>
                      <h4>List History Payment</h4>
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
                              <div>history name</div>
                            </Col>
                            <Col
                              lg={3}
                              className="d-flex justify-content-center"
                            >
                              <div>history name</div>
                            </Col>
                            <Col
                              lg={2}
                              className="d-flex justify-content-center"
                            >
                              <div>history name</div>
                            </Col>
                            <Col
                              lg={2}
                              className="d-flex gap-1 justify-content-center"
                            >
                              <div>history name</div>
                            </Col>
                            <Col
                              lg={2}
                              className="d-flex justify-content-center"
                            >
                              <div>history name</div>
                            </Col>
                            <Col
                              lg={1}
                              className="d-flex justify-content-center"
                            >
                              <div>
                                <FontAwesomeIcon
                                  icon={faEllipsisVertical}
                                  size="xl"
                                />
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                      </div>
                    ))}
                  </div>
                </TabPane>
              </TabContent>
            </CardBody>
          </div>
        </CardBody>
      </Card>

      {/* ----------------------------------------------------------------------------- */}
      <DeveloperDetailInProjectPopup
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        devId={selectedCandidateInfo.developerId}
      />
    </React.Fragment>
  );
};

export default ProjectDetailDescription;

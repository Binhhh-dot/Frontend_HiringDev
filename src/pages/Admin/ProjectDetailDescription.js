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
import { Dropdown as DropdownAntd } from 'antd';
import { HashLoader } from "react-spinners";

import projectServices from "../../services/project.services";
import { useLocation } from "react-router";
import img0 from "../../assets/images/user/img-00.jpg";
import DeveloperDetailInProjectPopup from "../Home/SubSection/DeveloperDetailInProject";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faUserMinus,
  faAngleLeft,
  faAngleRight
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import payPeriodServices from "../../services/payPeriod.services";
import paySlipServices from "../../services/paySlip.services";
import workLogServices from "../../services/workLog.services";

dayjs.extend(customParseFormat);

const monthFormat = "YYYY-MM-DD";

const ProjectDetailDescription = () => {
  const location = useLocation();
  const { state } = useLocation();
  const [value, setValue] = useState("");
  const [allowedMonthsList, setAllowedMonthsList] = useState([]);
  //--------------------------------------------------------------------------------
  const [closedProjectButtonVisible, setClosedProjectButtonVisible] =
    useState(false);
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
  const [selectProjectId, setSelectProjectId] = useState(null);
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
      //---------------------------------------------------------
      if (response.data.data.statusString == "Closing process") {
        setClosedProjectButtonVisible(true);
      }
      // --------------------------------------------------------
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
  const ClosingProcess = async () => {
    let response;
    try {
      response = projectServices.ClosingProcessProjectInManager(
        state.projectId
      );
      console.log(response);
      fetchGetProjectDetailByProjectId();
      toast.success("Closing process project successfully");
    } catch (error) {
      console.error("Error clossing process project", error);
      toast.error("Closing process project successfully");
    }
  };

  //------------------------------------------------------------------------------------------
  useEffect(() => {
    fetchGetProjectDetailByProjectId();
    fetchGetDeveloperByProject();
  }, []);

  useEffect(() => {
    if (isModalUpdateOpen) {
      fetchGetProjectDetailByProjectId();
    }
  }, [isModalUpdateOpen]);

  useEffect(() => {
    fetchGetPayPeriod();
  }, [defaultClickDay]);

  //--------------------------------------------------------------------------------
  const [loadPayPeriod, setLoadPayPeriod] = useState(false);
  const [payPeriodDetail, setPayPeriodDetail] = useState(null);
  const [payRollDetail, setPayRollDetail] = useState([]);
  const [workLoglist, setWorkLoglist] = useState([]);
  const [listMonth, setListMonth] = useState([]);
  const [listStartDay, setListStartDay] = useState([]);
  const [listEndDay, setListEndDay] = useState([]);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(null);
  const [workLogIdOnClick, setWorkLogIdOnClick] = useState(0);
  const [payslipIdOnClick, setPayslipIdOnClick] = useState(0);
  const [countSetTime, setCountSetTime] = useState(0);
  const [isEditWorkLog, setIsEditWorkLog] = useState(false);
  const [isCompleteEditWorkLog, setIsCompleteEditWorkLog] = useState(true);
  const [loadListWorkLog, setLoadListWorkLog] = useState(false);
  const [paySlipIdLoad, setPaySlipIdLoad] = useState(null);
  const [isEditPayslip, setIsEditPayslip] = useState(false);
  const [isCancelEditWorkLog, setIsCancelEditWorkLog] = useState();
  const [isCancelEditPayslip, setIsCancelEditPayslip] = useState(false);
  const [startTimeWorkLogSave, setStartTimeWorkLogSave] = useState(false);
  const [endTimeWorkLogSave, setEndTimeWorkLogSave] = useState(false);
  const [statusWorkLogSave, setStatusWorkLogSave] = useState();
  const [totalOTPayslipSave, setTotalOTPayslipSave] = useState(false);
  const [editableRowId, setEditableRowId] = useState(null);
  const [ediPaySlipRowId, setEdiPaySlipRowId] = useState(null);
  const [loadingSavePaySlip, setLoadingSavePaySlip] = useState(false);
  const [loadingSaveWorkLog, setLoadingSaveWorkLog] = useState(false);
  const [loadingCreateNew, setLoadingCreateNew] = useState(false);
  const [keyPayRoll, setKeyPayRoll] = useState(null);
  const [keyWorkLog, setKeyWorkLog] = useState(null);
  const [keyPayslip, setKeyPayslip] = useState(null);
  const [isHavePayment, setIsHavePaymemt] = useState(false);
  const [valuesStatus, setValuesStatus] = useState({});

  const optionsStatus = [
    { label: 'Normally', value: 0 },
    { label: 'Paid leave', value: 1 },
    { label: 'Unpaid leave', value: 2 },
  ];


  const profileItems2 = [
    {
      key: "1",
      label: (
        <div
          style={{ width: "100px" }}
          onClick={() => onUpdateWorkLog()}
        >
          Edit
        </div>
      ),
    },
  ]


  const profileItems3 = [
    {
      key: "1",
      label: (
        <div
          style={{ width: "100px" }}
          onClick={() => onUpdatePaySlip()}
        >
          Edit
        </div>
      ),
    },
  ]

  const [showCollapse, setShowCollapse] = useState(Array(payRollDetail.length).fill(false));

  const toggleCollapse = (key2, paySlipId) => {
    setKeyPayRoll(key2);
    const newShowCollapse = [...showCollapse];
    newShowCollapse[key2] = !newShowCollapse[key2];
    setShowCollapse(newShowCollapse);
    setPaySlipIdLoad(paySlipId)
    fetchWorklog(paySlipId);
  };

  const setKeyAndIdWorkLog = (workLogId, key) => {
    setWorkLogIdOnClick(workLogId)
    setKeyWorkLog(key)
  };

  const setPayRollEdit = (payrollId, key) => {
    setPayslipIdOnClick(payrollId)
    setKeyPayslip(key)
  };

  const handleChangeStatus = (selected) => {
    console.log(selected)
    const key = '' + keyPayRoll + keyWorkLog;
    setValuesStatus(prevState => ({
      ...prevState,
      [key]: selected
    }));
  };



  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 to month because it's zero-indexed
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  const fetchProjectDetails = async () => {
    let response;
    // const saveData = localStorage.getItem("myData");

    try {
      const projectId = state.projectId;
      response = await projectServices.getProjectDetailByProjectId(projectId);
      console.log(response.data.data);
      function convertToDateObject(dateString) {
        const [day, month, year] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day); // month - 1 because months are zero-indexed in JavaScript
      }

      if (response.data.data.minStartDate !== "" && response.data.data.maxEndDate !== "") {
        const startDate = convertToDateObject(response.data.data.minStartDate);
        const endDate = convertToDateObject(response.data.data.maxEndDate);

        var temp = new Date(startDate);
        var formattedMinDate = temp.toISOString().split('T')[0];

        var temp2 = new Date(endDate);
        var formattedMaxDate = temp2.toISOString().split('T')[0]; // Sử dụng temp2 thay vì temp
        var currentDate = new Date();
        // Trừ đi 7 ngày từ formattedMinDate


        // Kiểm tra nếu startDate trừ đi 7 ngày bé hơn ngày hiện tại

        // Thêm 3 ngày vào startDate
        currentDate.setDate(currentDate.getDate() + 4);
        const formattedSevenDaysBeforeMinDate = currentDate.toISOString().split('T')[0];





        const monthsArray = [];
        const startDateArray = [];
        const endDateArray = [];

        let currentMonthStart = new Date(startDate.getFullYear(), startDate.getMonth() - 1, 25);
        let currentMonthEnd = new Date(currentMonthStart.getFullYear(), currentMonthStart.getMonth() + 1, 24);

        let checkFirstMonth = false;
        while (currentMonthStart <= endDate) {
          let formattedMonth;
          let formattedStartDay;
          let formattedEndDay;
          if (!checkFirstMonth) {
            if (currentMonthStart < startDate && startDate < currentMonthEnd) {
              formattedMonth = format(currentMonthEnd, 'MMMM yyyy');
              formattedStartDay = formatDate(startDate);
              formattedEndDay = formatDate(new Date(currentMonthEnd));
              monthsArray.push(formattedMonth);
              startDateArray.push(formattedStartDay);
              endDateArray.push(formattedEndDay);
            }

            checkFirstMonth = true;
          } else {
            if (currentMonthStart < startDate) {
              formattedMonth = format(currentMonthEnd, 'MMMM yyyy');
              formattedStartDay = formatDate(startDate);
              formattedEndDay = formatDate(new Date(currentMonthEnd));
              monthsArray.push(formattedMonth);
              startDateArray.push(formattedStartDay);
              endDateArray.push(formattedEndDay);
            } else {

              formattedMonth = format(currentMonthEnd, 'MMMM yyyy');
              formattedStartDay = formatDate(new Date(currentMonthStart));
              formattedEndDay = formatDate(currentMonthEnd > endDate ? endDate : new Date(currentMonthEnd));
              monthsArray.push(formattedMonth);
              startDateArray.push(formattedStartDay);
              endDateArray.push(formattedEndDay);
            }
          }

          currentMonthStart.setMonth(currentMonthStart.getMonth() + 1);
          currentMonthStart.setDate(25);

          currentMonthEnd = new Date(currentMonthStart.getFullYear(), currentMonthStart.getMonth() + 1, 24);
        }

        setListMonth(monthsArray);
        if (monthsArray.length === 0) {
          setIsHavePaymemt(false);
          console.log("monthsArray")
          console.log(monthsArray)
        } else {
          setIsHavePaymemt(true);
          console.log("monthsArray")
          console.log(monthsArray)
          setListStartDay(startDateArray);
          setListEndDay(endDateArray);
        }

        setLoadPayPeriod(!loadPayPeriod);
        setCurrentMonthIndex(0);
      }
      return response;
    } catch (error) {
      console.error("Error fetching job vacancies:", error);
    }
  };


  const fetchWorklog = async (paySlipId) => {
    let response;
    try {
      response = await workLogServices.getWorkLogByPaySlipId(paySlipId);
      setWorkLoglist(response.data.data);
      console.log("worklog")
      console.log(response.data.data)
    } catch (error) {
      console.error("Error fetching job vacancies:", error);
    }
  };

  const updatedWorkLog = async (timeIn, timeOut, isPaid) => {
    let response;
    setLoadingSaveWorkLog(true)
    try {
      console.log(workLogIdOnClick)
      console.log(timeIn)
      console.log(timeOut)
      response = await workLogServices.updateWorkLog(workLogIdOnClick, timeIn, timeOut, isPaid);
      console.log("worklog21312312312")
      console.log(response.data.data)
      const temp = "hourInDay" + response.data.data.workLogId;
      // const temp2 = "totalhourspayroll" + response.data.data.payPeriodId;
      document.getElementById(temp).innerHTML = "Hours in day: " + response.data.data.hourWorkInDay;
      // document.getElementById(temp2).innerHTML = response.data.data.totalAmount;
      const temp2 = listEndDay[currentMonthIndex];
      if (temp2) {
        const parts = temp2.split('.');
        const newDate = `${parts[2]}-${parts[1]}-25`;
        fetchDetailPayPeriod(newDate)
      }
      toast.success("Update worklog successfully")
      setLoadListWorkLog(!loadListWorkLog);
      setIsCompleteEditWorkLog(true);
      setLoadingSaveWorkLog(false)
      setEditableRowId(null);
    } catch (error) {
      setIsCompleteEditWorkLog(false);
      setLoadingSaveWorkLog(false)
      console.error("Error fetching job vacancies:", error);
      toast.error("Update worklog fail")
    }
  };

  const updatedPayslip = async (totalOT) => {
    let response;
    setLoadingSavePaySlip(true)
    try {
      console.log(payslipIdOnClick)
      console.log(totalOT)
      response = await paySlipServices.updateTotalOTPayslip(payslipIdOnClick, totalOT);
      console.log(response.data.data)


      const temp2 = listEndDay[currentMonthIndex];
      if (temp2) {
        const parts = temp2.split('.');
        const newDate = `${parts[2]}-${parts[1]}-25`;
        fetchDetailPayPeriod(newDate)
      }
      toast.success("Update payslip successfully")
      setEdiPaySlipRowId(null);
      setLoadingSavePaySlip(false)
    } catch (error) {
      console.error("Error fetching job vacancies:", error);
      toast.error("Update payslip fail")

      setLoadingSavePaySlip(false)
    }
  };

  const fetchDetailPayPeriod = async (newDate) => {
    let response;
    console.log("ham nay bi goi lai")
    console.log(newDate)
    try {
      const projectId = state.projectId;
      console.log(projectId)
      response = await payPeriodServices.getPayPeriodDetailByProjectIdAndDate(projectId, newDate);
      console.log(response)
      setPayPeriodDetail(response.data.data);
      if (response.data.code === 200) {
        console.log("cho nay ms bi goi lai");
        console.log(response.data.data.payPeriodId);
        const response2 = await paySlipServices.getPaySlipByPayPeriodId(response.data.data.payPeriodId);
        console.log("response2")
        console.log(response2)
        if (response.data.code == 200) {
          setPayRollDetail(response2.data.data);
          response2.data.data.forEach((payRollDetailNew, key2) => {
            const temp = "totalOT" + key2;
            console.log(temp)
            const element = document.getElementById(temp);
            if (element) {
              console.log("co")
              console.log(payRollDetailNew.totalOvertimeHours)
              element.value = payRollDetailNew.totalOvertimeHours;
            }
          });
        }
      }
    } catch (error) {
      console.error("Error fetching job vacancies:", error);
      console.log("payperiod loi")
      setPayPeriodDetail(null);
      setPayRollDetail([]);
    }
  }


  useEffect(() => {
    console.log(payRollDetail)
  }, [payRollDetail]);

  useEffect(() => {
    // if (countSetTime) {
    console.log("thaydoi")
    console.log(keyPayRoll)
    var count = 0;
    workLoglist.map((log) => {
      const temp2 = "endTimeWorkLog" + keyPayRoll + count;
      document.getElementById(temp2).value = log.timeIn;
      const temp = "endTimeWorkLog2" + keyPayRoll + count;
      document.getElementById(temp).value = log.timeOut;
      const key = '' + keyPayRoll + count;
      var status;
      if (log.isPaidLeave == null) {
        console.log("null")
        status = { label: 'Normally', value: 0 };
      } else {
        if (log.isPaidLeave == true) {
          status = { label: 'Paid leave', value: 1 };
        } else {
          status = { label: 'Unpaid leave', value: 2 };
        }
      }
      setValuesStatus(prevState => ({
        ...prevState,
        [key]: status
      }));
      count += 1;

    });
    setCountSetTime(countSetTime + 1)
  }, [workLoglist]);


  useEffect(() => {
    fetchWorklog(paySlipIdLoad);
  }, [loadListWorkLog]);


  const onUpdateWorkLog = () => {
    setIsCompleteEditWorkLog(false);
    const foundLog = workLoglist.find(log => log.workLogId === workLogIdOnClick);
    setStartTimeWorkLogSave(foundLog.timeIn);
    setEndTimeWorkLogSave(foundLog.timeOut);
    console.log("foundLog.isPaidLeave");
    console.log(foundLog.isPaidLeave);
    setStatusWorkLogSave(foundLog.isPaidLeave);
    setEditableRowId(workLogIdOnClick);
  };

  const onUpdatePaySlip = () => {
    const foundLog = payRollDetail.find(log => log.paySlipId === payslipIdOnClick);
    setTotalOTPayslipSave(foundLog.totalOvertimeHours)
    setEdiPaySlipRowId(payslipIdOnClick);
  };




  useEffect(() => {
    fetchProjectDetails();
  }, []);

  useEffect(() => {
    const temp = listEndDay[currentMonthIndex];
    if (temp) {
      const parts = temp.split('.');
      const newDate = `${parts[2]}-${parts[1]}-25`;
      fetchDetailPayPeriod(newDate)
    }
  }, [currentMonthIndex]);

  useEffect(() => {
    const temp = listStartDay[currentMonthIndex];
    if (temp) {
      const parts = temp.split('.');
      const newDate = `${parts[2]}-${parts[1]}-25`;
      fetchDetailPayPeriod(newDate)
    }
  }, [loadPayPeriod]);

  function formatTime00(inputTime) {
    if (inputTime.indexOf(":") !== -1 && inputTime.lastIndexOf(":") === inputTime.indexOf(":")) {
      // Nếu có ít hơn hai dấu hai chấm (":") trong chuỗi, thêm ":00" vào cuối
      return inputTime + ":00";
    } else {
      // Nếu đã có hai dấu hai chấm, giữ nguyên chuỗi
      return inputTime;
    }
  }

  useEffect(() => {
    if (!isCancelEditWorkLog) {
      if (workLogIdOnClick) {
        const temp2 = "endTimeWorkLog" + keyPayRoll + keyWorkLog;
        const temp = "endTimeWorkLog2" + keyPayRoll + keyWorkLog;
        const key = '' + keyPayRoll + keyWorkLog;
        var statusSave;
        if (statusWorkLogSave == null) {
          statusSave = { label: 'Normally', value: 0 };
        } else {
          if (statusWorkLogSave == true) {
            statusSave = { label: 'Paid leave', value: 1 };
          } else {
            statusSave = { label: 'Unpaid leave', value: 2 };
          }
        }
        const status = valuesStatus[key]
        console.log(statusSave)
        console.log(status)
        if (statusSave.value == status.value) {
          console.log("giong nhau")
        } else {
          console.log("khac nhau")
        }
        if (formatTime00(document.getElementById(temp2).value) >= formatTime00(document.getElementById(temp).value) && status.value == 0) {
          const temp3 = "timeErrorWorkLog" + workLogIdOnClick;
          document.getElementById(temp3).innerHTML = "The start time of work must be less than the end time of work";
          setIsCompleteEditWorkLog(false);
        } else {
          const temp3 = "timeErrorWorkLog" + workLogIdOnClick;
          document.getElementById(temp3).innerHTML = "";
          if (formatTime00(document.getElementById(temp2).value) != startTimeWorkLogSave || formatTime00(document.getElementById(temp).value) != endTimeWorkLogSave || statusSave.value != status.value) {
            console.log("co update")
            var isPaid;
            if (status.value == 0) {
              isPaid = null;
            }
            if (status.value == 1) {
              isPaid = true;
            }
            if (status.value == 2) {
              isPaid = false;
            }
            updatedWorkLog(formatTime00(document.getElementById(temp2).value), formatTime00(document.getElementById(temp).value), isPaid)
          } else {
            setIsCompleteEditWorkLog(true);
            setEditableRowId(null);
          }
        }
      }
    } else {
      try {
        console.log("false")
        const temp2 = "endTimeWorkLog" + keyPayRoll + keyWorkLog;
        document.getElementById(temp2).value = startTimeWorkLogSave;

        const temp = "endTimeWorkLog2" + keyPayRoll + keyWorkLog;
        document.getElementById(temp).value = endTimeWorkLogSave;

        const key = '' + keyPayRoll + keyWorkLog;
        var status;
        if (statusWorkLogSave == null) {
          console.log("null")
          status = { label: 'Normally', value: 0 };
        } else {
          if (statusWorkLogSave == true) {
            status = { label: 'Paid leave', value: 1 };
          } else {
            status = { label: 'Unpaid leave', value: 2 };
          }
        }
        setValuesStatus(prevState => ({
          ...prevState,
          [key]: status
        }));
        setIsCompleteEditWorkLog(true);
        setEditableRowId(null);
      } catch (error) {
        console.log("Loi khi update worklog", error)
      }
    }
  }, [isEditWorkLog]);


  useEffect(() => {
    if (!isCancelEditPayslip) {
      if (payslipIdOnClick) {
        const temp2 = "totalOT" + keyPayslip;
        if (formatTime00(document.getElementById(temp2).value) < 0) {
          const temp = "totalOT" + keyPayslip;
          console.log(temp)
          document.getElementById(temp).value = totalOTPayslipSave;
          setEdiPaySlipRowId(null);

        } else {
          if (formatTime00(document.getElementById(temp2).value) != totalOTPayslipSave) {
            updatedPayslip(document.getElementById(temp2).value)
          } else {
            setEdiPaySlipRowId(null);
          }
        }
      }
    } else {
      try {
        console.log("false")
        const temp2 = "totalOT" + keyPayslip;
        console.log(temp2)
        document.getElementById(temp2).value = totalOTPayslipSave;
        setEdiPaySlipRowId(null);

      } catch (error) {
        console.log("Loi khi update worklog", error)

      }
    }
  }, [isEditPayslip]);


  const cancelUpdateWorkLog = () => {
    setIsEditWorkLog(!isEditWorkLog);
    setIsCancelEditWorkLog(true);
  };


  const saveUpdateWorkLog = () => {
    setIsEditWorkLog(!isEditWorkLog);
    setIsCancelEditWorkLog(false);
  };

  const cancelUpdatePayslip = () => {
    setIsEditPayslip(!isEditPayslip);
    setIsCancelEditPayslip(true);
  };

  const saveUpdatePayslip = () => {
    setIsEditPayslip(!isEditPayslip);
    setIsCancelEditPayslip(false);
  };

  const nextMonth = () => {
    const updatedShowCollapse = showCollapse.map(() => false);
    setShowCollapse(updatedShowCollapse);
    setIsEditWorkLog(!isEditWorkLog);
    setIsEditPayslip(!isEditPayslip);
    setIsCancelEditPayslip(true);
    setIsCancelEditWorkLog(true);
    if (currentMonthIndex < listMonth.length - 1) {
      setCurrentMonthIndex(currentMonthIndex + 1);
    }
  };

  const previousMonth = () => {
    const updatedShowCollapse = showCollapse.map(() => false);
    setShowCollapse(updatedShowCollapse);
    setIsEditWorkLog(!isEditWorkLog);
    setIsEditPayslip(!isEditPayslip);
    setIsCancelEditPayslip(true);
    setIsCancelEditWorkLog(true);
    if (currentMonthIndex > 0) {
      setCurrentMonthIndex(currentMonthIndex - 1);
    }
  };

  const createNewPayPeriod = async () => {
    setLoadingCreateNew(true)
    try {
      const projectId = state.projectId;
      const currentMonthData = listMonth[currentMonthIndex];

      const date = new Date(currentMonthData);
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-25` + "T08:47:13.849Z";
      console.log(formattedDate)
      const response = await payPeriodServices.createNewPayPeriod(projectId, formattedDate);
      console.log(response)
      toast.success("Create pay period successfully")
      setLoadPayPeriod(!loadPayPeriod);
      setLoadingCreateNew(false);
    } catch (error) {
      toast.error("Create pay period fail")
      setLoadingCreateNew(false);
    }
  };



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

                    <span
                      className={
                        projectDetail.statusString === "Preparing"
                          ? "badge bg-warning text-light fs-12"
                          : projectDetail.statusString === "Closed"
                            ? "badge bg-danger text-light fs-12"
                            : projectDetail.statusString === "In process"
                              ? "badge bg-blue text-light fs-12"
                              : projectDetail.statusString === "Completed"
                                ? "badge bg-success text-light fs-12"
                                : projectDetail.statusString === "Closing process"
                                  ? "badge bg-purple text-light fs-12"
                                  : ""
                      }
                    >
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
                        <Dropdown.Item onClick={() => openModalUpdateProject()}>
                          Update Project
                        </Dropdown.Item>
                        {closedProjectButtonVisible && (
                          <Dropdown.Item onClick={ClosingProcess}>
                            Closed Project
                          </Dropdown.Item>
                        )}
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
                      <div className="d-flex align-items-center gap-3" disabled="true">
                        <FontAwesomeIcon icon={faAngleLeft} style={{ fontSize: '20px' }} onClick={previousMonth} />
                        <FontAwesomeIcon icon={faAngleRight} style={{ fontSize: '20px' }} onClick={nextMonth} />
                        <div className="d-flex flex-column">
                          <div id="monthYearSelected" style={{ fontSize: "20px", fontWeight: "600" }}>{listMonth[currentMonthIndex]}</div>
                          <div id="dateSelected" style={{ fontSize: "15px", color: "grey" }}>{listStartDay[currentMonthIndex]} - {listEndDay[currentMonthIndex]}</div>
                        </div>
                      </div>
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
                                  {payPeriodDetail ? (
                                    <div className="p-4">
                                      <Row className="align-items-center">
                                        <Col
                                          md={2}
                                          style={{ textAlign: "center" }}
                                        >
                                          <div>
                                            <span className="mb-0">
                                              {payPeriodDetail.payPeriodCode}
                                            </span>
                                          </div>
                                        </Col>

                                        <Col
                                          md={2}
                                          style={{ textAlign: "center" }}
                                        >
                                          <div>
                                            <p className="mb-0">
                                              {payPeriodDetail.startDateMMM}
                                            </p>
                                          </div>
                                        </Col>

                                        <Col
                                          md={2}
                                          style={{ textAlign: "center" }}
                                        >
                                          <div>
                                            <p className="mb-0">
                                              {payPeriodDetail.endDateMMM}
                                            </p>
                                          </div>
                                        </Col>

                                        <Col
                                          md={2}
                                          style={{ textAlign: "center" }}
                                        >
                                          <p className="mb-0">
                                            {payPeriodDetail.totalAmount}
                                          </p>
                                        </Col>

                                        <Col
                                          md={2}
                                          style={{ textAlign: "center" }}
                                        >
                                          {payPeriodDetail.createdAt}
                                        </Col>

                                        <Col
                                          md={2}
                                          style={{ textAlign: "center" }}
                                        >
                                          <div>
                                            <span
                                              className={
                                                payPeriodDetail.statusString ===
                                                  "Created"
                                                  ? "badge bg-blue text-light fs-12"
                                                  : payPeriodDetail.statusString ===
                                                    "cancelled"
                                                    ? "badge bg-danger text-light fs-12"
                                                    : payPeriodDetail.statusString ===
                                                      "Inprogress"
                                                      ? "badge bg-primary text-light fs-12"
                                                      : payPeriodDetail.statusString ===
                                                        "completed"
                                                        ? "badge bg-primary text-light fs-12"
                                                        : ""
                                              }
                                            >
                                              {payPeriodDetail.statusString}
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
                            {payRollDetail[0] ? (
                              <>
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
                              </>
                            ) : (
                              <Empty />
                            )}
                            <div className="d-flex flex-column gap-2">
                              {payRollDetail.map((payRollDetailNew, key2) => (
                                <div key2={key2}>
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
                                            <span className="mb-0">{payRollDetailNew.firstName}</span>
                                          </div>
                                        </Col>

                                        <Col
                                          md={2}
                                          className="px-0"
                                          style={{ textAlign: "center" }}
                                        >
                                          <div>
                                            <p className="mb-0">{payRollDetailNew.lastName}</p>
                                          </div>
                                        </Col>

                                        <Col
                                          md={2}
                                          className="px-0"
                                          style={{ textAlign: "center" }}
                                        >
                                          <div>
                                            <p className="mb-0">{payRollDetailNew.email}</p>
                                          </div>
                                        </Col>

                                        <Col
                                          md={2}
                                          className="px-0"
                                          style={{ textAlign: "center" }}


                                        >
                                          <p className="mb-0" > {payRollDetailNew.totalActualWorkedHours}</p>
                                        </Col>

                                        <Col
                                          md={1}
                                          className=" px-0"
                                          style={{ textAlign: "center" }}
                                        >
                                          <input
                                            type="number"
                                            className="form-control"
                                            id={`totalOT${key2}`}
                                            readOnly={ediPaySlipRowId !== payRollDetailNew.paySlipId}
                                            defaultValue={0}
                                          />
                                        </Col>

                                        <Col
                                          md={2}
                                          style={{ textAlign: "center" }}

                                        >
                                          <div>
                                            <span >{payRollDetailNew.totalEarnings}</span>
                                          </div>
                                        </Col>

                                        <Col md={1} className="d-flex gap-2 justify-content-between align-items-center" style={{ paddingLeft: "0px" }}>
                                          <div
                                            className="d-flex justify-content-center align-items-center rounded-circle"
                                            onClick={() => toggleCollapse(key2, payRollDetailNew.paySlipId)}
                                            style={{
                                              backgroundColor: "#ECECED",
                                              width: "30px",
                                              height: "30px",
                                            }}
                                          >
                                            <i
                                              className="uil uil-angle-down"
                                              style={{ fontSize: "30px" }}
                                            ></i>
                                          </div>
                                          {payPeriodDetail.statusString == "Created" && (
                                            <>
                                              <DropdownAntd trigger={['click']} menu={{ items: profileItems3 }} onClick={() =>
                                                setPayRollEdit(payRollDetailNew.paySlipId, key2)
                                              }>
                                                <a style={{ height: "max-content" }} onClick={(e) => e.preventDefault()}>
                                                  <FontAwesomeIcon
                                                    icon={faGear}
                                                    size="xl"
                                                    color="#909191"
                                                  />
                                                </a>
                                              </DropdownAntd>
                                            </>
                                          )}
                                        </Col>
                                        {ediPaySlipRowId == payRollDetailNew.paySlipId ? (
                                          <>
                                            <Row style={{ marginTop: "10px" }}>
                                              <Col
                                                md={2}
                                                style={{ textAlign: "end" }}
                                                className="d-flex gap-2 justify-content-end"
                                              >
                                              </Col>
                                              <Col
                                                md={6}
                                                style={{ textAlign: "end" }}
                                                className="d-flex gap-2 justify-content-end"
                                              >
                                              </Col>
                                              <Col
                                                md={4}
                                                style={{ textAlign: "end" }}
                                                className="d-flex gap-2 justify-content-end"
                                              >
                                                <div className="btn btn-soft-danger"
                                                  onClick={() => cancelUpdatePayslip()}
                                                >
                                                  Cancel
                                                </div>

                                                <button className="btn btn-soft-blue "
                                                  onClick={() => {
                                                    saveUpdatePayslip();
                                                  }}
                                                  disabled={loadingSavePaySlip}
                                                >
                                                  {loadingSavePaySlip ? (
                                                    <div style={{ width: "45px" }} className="d-flex align-items-center justify-content-center">
                                                      <HashLoader
                                                        size={20}
                                                        color={"white"}
                                                        loading={true}
                                                      />
                                                    </div>
                                                  ) : (
                                                    "Save"
                                                  )}
                                                </button>


                                              </Col>
                                            </Row>
                                          </>
                                        ) : (
                                          null
                                        )}
                                      </Row>
                                    </div>
                                  </div>
                                  <Collapse isOpen={showCollapse[key2]}>
                                    <div
                                      style={{
                                        backgroundColor: "#EFF0F2",
                                        borderRadius: "7px",
                                      }}
                                      className="mt-1 p-2 d-flex flex-column gap-2"
                                    >
                                      {workLoglist.map((workLogDetail, key) => (
                                        <div className="d-flex flex-column gap-2">
                                          <div
                                            className="job-box-dev-in-list-hiringRequest-for-dev card d-flex flex-column gap-2 p-2"
                                            style={{ backgroundColor: "#FFFFFF" }}
                                          >
                                            <div className="d-flex flex-row justify-content-between align-items-center ">
                                              <div
                                                id={`time-In2-${workLogDetail.workLogId}`}
                                              >
                                                {workLogDetail.workDateMMM}
                                              </div>
                                              <div >
                                                <div>
                                                  <input
                                                    type="time"
                                                    className="form-control"
                                                    id={`endTimeWorkLog${key2}${key}`}
                                                    readOnly={editableRowId !== workLogDetail.workLogId}
                                                  />
                                                </div>
                                              </div>
                                              <div >
                                                <div>
                                                  <input
                                                    type="time"
                                                    className="form-control"
                                                    id={`endTimeWorkLog2${key2}${key}`}
                                                    readOnly={editableRowId !== workLogDetail.workLogId}
                                                  />
                                                </div>
                                              </div>
                                              <div
                                                md={1}
                                                className="d-flex justify-content-center align-items-center"
                                                id={`hourInDay${workLogDetail.workLogId}`}
                                              >
                                                {workLogDetail.hourWorkInDay}
                                              </div>
                                              <div >
                                                <Select
                                                  options={optionsStatus}
                                                  name="choices-single-categories"
                                                  id={`statusWorkLog${key2}${key}`}
                                                  value={valuesStatus[`${key2}${key}`]}
                                                  onChange={handleChangeStatus}
                                                  aria-label="Default select example"
                                                  menuPosition={'fixed'}
                                                  isDisabled={editableRowId !== workLogDetail.workLogId}
                                                />
                                              </div>
                                              <div
                                                md={1}
                                                className="d-flex justify-content-center align-items-center"
                                              >
                                                {payPeriodDetail.statusString == "Created" && (
                                                  <>
                                                    {isCompleteEditWorkLog && ( // Kiểm tra nếu isCompleteEditWorkLog === false
                                                      <DropdownAntd trigger={['click']} menu={{ items: profileItems2 }} onClick={() =>
                                                        setKeyAndIdWorkLog(workLogDetail.workLogId, key)
                                                      }>
                                                        <a style={{ height: "max-content" }} onClick={(e) => e.preventDefault()}>
                                                          <FontAwesomeIcon
                                                            icon={faGear}
                                                            size="xl"
                                                            color="#909191"
                                                          />
                                                        </a>
                                                      </DropdownAntd>
                                                    )}
                                                  </>
                                                )}
                                              </div>
                                            </div>
                                            {editableRowId == workLogDetail.workLogId ? (
                                              <>
                                                <Row>
                                                  <Col
                                                    md={2}
                                                    style={{ textAlign: "end" }}
                                                    className="d-flex gap-2 justify-content-end"
                                                  >
                                                  </Col>
                                                  <Col
                                                    md={6}
                                                    style={{ textAlign: "end" }}
                                                    className="d-flex gap-2 justify-content-end"
                                                  >
                                                    <p id={`timeErrorWorkLog${workLogDetail.workLogId}`} className="text-danger mt-2"></p>
                                                  </Col>
                                                  <Col
                                                    md={4}
                                                    style={{ textAlign: "end" }}
                                                    className="d-flex gap-2 justify-content-end"
                                                  >
                                                    <div className="btn btn-soft-danger"
                                                      onClick={() => cancelUpdateWorkLog()}
                                                    >
                                                      Cancel
                                                    </div>
                                                    <button className="btn btn-soft-blue "
                                                      onClick={() => {
                                                        saveUpdateWorkLog();
                                                      }}
                                                      disabled={loadingSaveWorkLog}
                                                    >
                                                      {loadingSaveWorkLog ? (
                                                        <div style={{ width: "45px" }} className="d-flex align-items-center justify-content-center">
                                                          <HashLoader
                                                            size={20}
                                                            color={"white"}
                                                            loading={true}
                                                          />
                                                        </div>
                                                      ) : (
                                                        "Save"
                                                      )}
                                                    </button>

                                                  </Col>
                                                </Row>
                                              </>
                                            ) : (
                                              null
                                            )}
                                          </div>
                                        </div>
                                      ))}
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

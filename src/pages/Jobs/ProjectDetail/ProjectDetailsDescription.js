import React, { useRef, useEffect, useState } from "react";
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
  Input,
  Collapse,
  Form
} from "reactstrap";
import { Await, Link, Navigate, useLocation } from "react-router-dom";
import DeveloperDetailInManagerPopup from "../../Home/SubSection/DeveloperDetailInManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn,
  faEllipsisVertical,
  faX,
  faPlus,
  faTimes,
  faEllipsis,
  faAngleRight,
  faAngleLeft,
  faGear,
  faCircle
} from "@fortawesome/free-solid-svg-icons";
import {
  faFlag,
  faCircleXmark,
  faImage,
  faEnvelope,
  faCalendar
} from "@fortawesome/free-regular-svg-icons";
import { Modal as AntdModal, Button as AntdButton } from "antd";
import "./index.css";
import DeveloperDetailInCompanyPopup from "../../Home/SubSection/DeveloperDetailInCompany";
import CreateHiringRequestPopup from "../CreateHiringRequest/CreateHiringRequestPopup";
import userImage0 from "../../../assets/images/user/img-00.jpg";
import projectServices from "../../../services/project.services";
import classnames from "classnames";
import { useNavigate } from "react-router-dom";
import hiringrequestService from "../../../services/hiringrequest.service";
import { format, addMonths, subMonths } from 'date-fns';
import {
  CheckSquareOutlined,
  UserOutlined,
  AntDesignOutlined
} from "@ant-design/icons";
import jobPositionServices from "../../../services/jobPosition.services";
import JobImage10 from "../../../assets/images/featured-job/img-10.png";
import JobDetailImage from "../../../assets/images/job-detail.jpg";
import paypalImage from "../../../assets/images/pngwing.png";
// import paypalImage from "../../src/assets/images/pngwing.png";
import { Avatar, Divider, Tooltip } from 'antd';
import developerServices from "../../../services/developer.services";
import dayjs from "dayjs";
import { DatePicker, Space } from "antd";
import customParseFormat from "dayjs/plugin/customParseFormat";
import payPeriodServices from "../../../services/payPeriod.services";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileSaver from 'file-saver';
import axios from "axios";
import { Dropdown as DropdownAntd } from 'antd';
import { Empty, TimePicker } from 'antd';
import { theme } from 'antd';
import moment from 'moment';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import paySlipServices from "../../../services/paySlip.services";
import workLogServices from "../../../services/workLog.services";
import { HashLoader } from "react-spinners";
import customUrl from "../../../utils/customUrl";
import paymentServices from "../../../services/payment.services";
import { Menu } from 'antd';
import Select from "react-select";
import JobType from "../../Home/SubSection/JobType";
import skillService from "../../../services/skill.service";
import typeService from "../../../services/type.service";
import levelService from "../../../services/level.service";
dayjs.extend(customParseFormat);

const ProjectDetailDesciption = () => {
  const formatTimePicker = 'HH:mm';
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [hiringRequestDetail, setHiringRequestDetail] = useState([]);
  const [listJobPosition, setListJobPosition] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const [jobVacancyList, setJobVacancyList] = useState([]);
  const [projectId, setProjectId] = useState(null);
  const navigate = useNavigate();
  const rowRef = useRef(null);
  const [showScroll, setShowScroll] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [loadPayPeriod, setLoadPayPeriod] = useState(false);
  const [developerOnboardList, setDeveloperOnboardList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [selectedCandidateInfo, setSelectedCandidateInfo] = useState({});
  const [payPeriodDetail, setPayPeriodDetail] = useState(null);
  const [payRollDetail, setPayRollDetail] = useState([]);
  const [workLoglist, setWorkLoglist] = useState([]);
  const [selectedHiringRequestInfo, setSelectedHiringRequestInfo] = useState({});
  const [selectedJobPositionInfo, setSelectedJobPositionInfo] = useState({});
  const [checkHeightListHiringRequest, setCheckHeightListHiringRequest] = useState(false);
  const monthFormat = "YYYY/MM";
  const [currentMonth, setCurrentMonth] = useState();
  const [listMonth, setListMonth] = useState([]);
  const [listStartDay, setListStartDay] = useState([]);
  const [listEndDay, setListEndDay] = useState([]);
  const [isInputEditable, setIsInputEditable] = useState([]);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(null);
  const [minDateDuration, setMinDateDuration] = useState();
  const [maxDateDuration, setMaxDateDuration] = useState();
  const [workLogIdOnClick, setWorkLogIdOnClick] = useState(0);
  const [payslipIdOnClick, setPayslipIdOnClick] = useState(0);
  const [editingPositions, setEditingPositions] = useState({});
  const [editingPositionSelect, setEditingPositionSelect] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [countSetTime, setCountSetTime] = useState(0);
  const [isEditWorkLog, setIsEditWorkLog] = useState(false);
  const [isEditPayslip, setIsEditPayslip] = useState(false);
  const [isCancelEditWorkLog, setIsCancelEditWorkLog] = useState(false);
  const [isCancelEditPayslip, setIsCancelEditPayslip] = useState(false);
  const [startTimeWorkLogSave, setStartTimeWorkLogSave] = useState(false);
  const [endTimeWorkLogSave, setEndTimeWorkLogSave] = useState(false);
  const [totalOTPayslipSave, setTotalOTPayslipSave] = useState(false);
  const [timeErrorWorkLog, setTimeErrorWorkLog] = useState([]);
  const [currentDateBill, setCurrentDateBill] = useState();
  const [key, setKey] = useState(Date.now());
  const [editableRowId, setEditableRowId] = useState(null);
  const [ediPaySlipRowId, setEdiPaySlipRowId] = useState(null);

  const [dateValue, setDateValue] = useState(new Date());
  const [loadingGenerateExel, setLoadingGenerateExel] = useState(false);
  const [loadingImportExel, setLoadingImportExel] = useState(false);
  const [loadingPayNow, setLoadingPaynow] = useState(false);

  const [keyPayRoll, setKeyPayRoll] = useState(null);
  const [keyWorkLog, setKeyWorkLog] = useState(null);
  const [positionIdChose, setPositionIdChose] = useState(null);

  const [showPopup, setShowPopup] = useState(false);
  const [isHavePayment, setIsHavePaymemt] = useState(false);
  const [showDropdown, setShowDropdown] = useState({});
  let [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [skill, setSkill] = useState([]);
  const [typeRequire, setTypeRequire] = useState(null);
  const [levelRequire, setLevelRequire] = useState(null);
  const [status, setStatus] = useState(null);
  const [startSalaryPerDev, setStartSalaryPerDev] = useState([]);
  const [endSalartPerDev, setEndSalartPerDev] = useState([]);

  const [options, setOptions] = useState([]);
  const [options2, setOptions2] = useState([]);
  const [options3, setOptions3] = useState([]);
  const [options4, setOptions4] = useState([]);


  const handlePageClick = (page) => {
    setCurrentPage(page);
  };


  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageButtons = 4;
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
    if (
      totalPages > maxPageButtons &&
      currentPage <= Math.floor(maxPageButtons / 2) + 1
    ) {
      endPage = maxPageButtons;
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${i === currentPage ? "active" : ""}`}
        >
          <div className="page-link" onClick={() => handlePageClick(i)}>
            {i}
          </div>
        </li>
      );
    }

    return pageNumbers;
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const initialSkillsState = jobVacancyList.reduce(
    (acc, job) => ({ ...acc, [job.id]: false }),
    {}
  );

  const [showFullSkills, setShowFullSkills] = useState(initialSkillsState);

  // Function to handle payment execution on backend
  const executePayment = async (paymentId, payerId) => {
    try {
      const response = await paymentServices.executePayment(paymentId, payerId);
      console.log(response);
      toast.success("Payment successfully")
      setLoadPayPeriod(!loadPayPeriod);
      setLoadingPaynow(false)
      setShowPopup(false)
      setLoading(false)
    } catch (error) {
      console.error('Error executing payment:', error);
      // Xử lý lỗi nếu cần thiết
      setLoadingPaynow(false)
      setShowPopup(false)
      setLoading(false)
    }
  };

  const handleDateChange = (date) => {
    setDateValue(date);
    // Thực hiện các thao tác khác khi người dùng thay đổi ngày
  };



  const profileItems = [
    {
      key: "1",
      label: (
        <div
          style={{ width: "100px" }}
        // onClick={() => onUpdateWorkLog()}
        >
          Edit
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          style={{ width: "100px" }}
          // onClick={() => onUpdateWorkLog()}
          onClick={() => {
            AntdModal.confirm({
              title: 'Confirm delete job position',
              content: (<div>
                <p>Are you sure to delete this job position?</p>
                <p>All activities in the hiring request of this job position will stop</p>
              </div>),
              onOk() {
                // Action when the user clicks OK
                console.log('Confirmed!');
              },
              onCancel() {
                // Action when the user cancels
                console.log('Cancelled!');
              },
              footer: (_, { OkBtn, CancelBtn }) => (
                <>
                  <CancelBtn />
                  <OkBtn />
                </>
              ),
            });
          }}
        >
          Delete
        </div>
      ),
    },
  ]

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
    fetchWorklog(paySlipId);
  };

  const setKeyAndIdWorkLog = (workLogId, key) => {
    setWorkLogIdOnClick(workLogId)
    setKeyWorkLog(key)
  };

  const setPayRollEdit = (payrollId) => {
    setPayslipIdOnClick(payrollId)
  };

  const [activeTabMini, setActiveTabMini] = useState("5");
  const tabChangeMini = (tabMini) => {
    if (activeTabMini) {
      if (activeTabMini !== tabMini) setActiveTabMini(tabMini);
    }
  };


  const openModal = (candidateInfo) => {
    setSelectedCandidateInfo(candidateInfo);
    setIsModalOpen(true);
  };

  const openModalCreateHiringrequest = (hiringRequestId) => {
    setSelectedHiringRequestInfo(hiringRequestId);
    setIsModalCreateOpen(true);
  };

  const closeModal = () => {
    setSelectedCandidateInfo({});
    setIsModalOpen(false);
  };



  const closeModalCreateHiringRequest = () => {
    setSelectedHiringRequestInfo(null);
    setIsModalCreateOpen(false);
    fetchJobVacancies();
  };

  const fetchOptions = async () => {
    try {
      const response = await skillService.getAllSkill();

      if (response.data && response.data.data) {
        // Transform API data into the format expected by react-select
        const formattedOptions = response.data.data.map((item) => ({
          label: item.skillName,
          value: item.skillId.toString(),
        }));

        setOptions(formattedOptions);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchOptions2 = async () => {
    try {
      const response = await typeService.getAllType();

      if (response.data && response.data.data) {
        // Transform API data into the format expected by react-select
        const formattedOptions = response.data.data.map((item) => ({
          label: item.typeName,
          value: item.typeId.toString(),
        }));

        setOptions2(formattedOptions);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchOptions3 = async () => {
    try {
      const response = await levelService.getAllLevel();

      if (response.data && response.data.data) {
        // Transform API data into the format expected by react-select
        const formattedOptions = response.data.data.map((item) => ({
          label: item.levelName,
          value: item.levelId.toString(),
        }));

        setOptions3(formattedOptions);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchOptions4 = async () => {
    try {
      const response = await hiringrequestService.getAllStatusHiringRequest();

      if (response.data && response.data.data) {
        // Transform API data into the format expected by react-select
        const formattedOptions = response.data.data.map((item) => ({
          label: item.statusName,
          value: item.statusId.toString(),
        }));

        setOptions4(formattedOptions);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchOptions();
    fetchOptions2();
    fetchOptions3();
    fetchOptions4();
  }, []); // Empty dependency array ensures the effect runs once on component mount

  const colourStyles = {
    control: (styles) => ({
      ...styles,
      border: 0,
      boxShadow: "none",
      padding: "12px 0 12px 40px",
      margin: "-16px -6px 0 -52px",
      borderRadius: "0",
      backgroundColor: "#fafafa"
    })
  };

  const setSkillValue = (selectedOption) => {
    if (!selectedOption) {
      setSkill(null); // Hoặc giá trị thích hợp để biểu thị hủy chọn
    } else {
      setSkill(selectedOption);
    }
  }


  const setTypeValue = (selectedOption) => {
    if (!selectedOption) {
      setTypeRequire(null); // Hoặc giá trị thích hợp để biểu thị hủy chọn
    } else {
      setTypeRequire(selectedOption);
    }
  }

  const setLevelValue = (selectedOption) => {
    if (!selectedOption) {
      setLevelRequire(null); // Hoặc giá trị thích hợp để biểu thị hủy chọn
    } else {
      setLevelRequire(selectedOption);
    }
  }

  const setStatusValue = (selectedOption) => {
    if (!selectedOption) {
      setStatus(null); // Hoặc giá trị thích hợp để biểu thị hủy chọn
    } else {
      setStatus(selectedOption);
    }
  }


  const fetchListDeveloperOnboard = async () => {
    try {
      const queryParams = new URLSearchParams(location.search);
      const projectId = queryParams.get("Id");
      const response = await developerServices.getListDeveloperOnboardByProjectId(projectId);
      console.log("list developer onboard:")
      console.log(response)
      const data = response.data;
      const listDeveloperOnboard = data.data.map((dev) => {
        const words = dev.lastName.split(" ");
        let lastWord;
        if (words.length === 1) {
          // Nếu chỉ có một từ, trả về chữ cái cuối cùng của từ đó
          lastWord = words[0].charAt(words[0].length - 1);
        } else {
          // Nếu có nhiều từ, lấy chữ cái đầu tiên của từ cuối cùng
          lastWord = words[words.length - 1].charAt(0);
        }
        return {
          id: dev.developerId,
          userImg: dev.userImage,
          firstName: dev.firstName,
          lastName: dev.lastName,
          candidateName: dev.firstName + " " + dev.lastName,
          candidateStatusClassName:
            "profile-active position-absolute badge rounded-circle bg-success",
          experience: dev.yearOfExperience + " Years",
          jobType: dev.levelRequireName,
          codeName: dev.codeName,
          salary: dev.averageSalary,
          addclassNameBookmark: false,
          label: false,
          skills: dev.skillRequireStrings,
          selectedDevStatus: dev.selectedDevStatus,
          interviewRound: dev.interviewRound,
          userImage: dev.userImage,
          lastWord: lastWord,
          email: dev.email,
        };
      });
      setDeveloperOnboardList(listDeveloperOnboard);
    } catch (error) {
      console.error("Error fetching job vacancies:", error);
    }
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
      const queryParams = new URLSearchParams(location.search);
      const projectId = queryParams.get("Id");
      setProjectId(projectId);
      response = await projectServices.getProjectDetailByProjectId(projectId);
      console.log(response.data.data);
      setHiringRequestDetail(response.data.data);
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


        setMinDateDuration(formattedSevenDaysBeforeMinDate);


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

  const updatedWorkLog = async (timeIn, timeOut) => {
    let response;
    try {
      console.log(workLogIdOnClick)
      console.log(timeIn)
      console.log(timeOut)
      response = await workLogServices.updateWorkLog(workLogIdOnClick, timeIn, timeOut);
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
      setEditableRowId(null);
    } catch (error) {
      console.error("Error fetching job vacancies:", error);
      toast.error("Update worklog fail")
    }
  };

  const updatedPayslip = async (totalOT) => {
    let response;
    try {
      console.log(payslipIdOnClick)
      console.log(totalOT)
      response = await paySlipServices.updateTotalOTPayslip(payslipIdOnClick, totalOT);
      console.log("payperiod21312312312")
      console.log(response.data.data)


      const temp2 = listEndDay[currentMonthIndex];
      if (temp2) {
        const parts = temp2.split('.');
        const newDate = `${parts[2]}-${parts[1]}-25`;
        fetchDetailPayPeriod(newDate)
      }
      toast.success("Update payslip successfully")
      setEditableRowId(null);
    } catch (error) {
      console.error("Error fetching job vacancies:", error);
      toast.error("Update payslip fail")
    }
  };



  const openPayment = async (payPeriodId) => {
    setLoading(true);
    setLoadingPaynow(true)
    try {
      const payerId = localStorage.getItem("userId");
      const description = "khong biet la cai gi het";
      const queryParams = new URLSearchParams(location.search);
      const projectId = queryParams.get("Id");
      console.log(payPeriodId);
      console.log(payerId);
      console.log(description);
      const returnUrl = customUrl.redirectUrlReturnPay + "/callbackpayment";
      console.log(returnUrl);
      const response = await paymentServices.createPayment(payPeriodId, payerId, description, returnUrl);
      console.log(response);
      if (response.data.code === 200) {
        console.log("mo cua so")
        const windowFeatures = 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=800, height=800, top=100, left=600';
        const popupWindow = window.open(response.data.data, "popupWindow", windowFeatures);
        function checkPopupStatus() {
          if (popupWindow && popupWindow.closed) {
            console.log("Cửa sổ đã đóng");
            setLoadingPaynow(false)
            setShowPopup(false)
            setLoading(false)
            clearInterval(intervalId);
          } else {
            console.log("Cửa sổ đang mở");
            // Thực hiện hành động nếu cửa sổ vẫn đang mở (nếu cần)
          }
        }
        const intervalId = setInterval(checkPopupStatus, 1000);

        window.addEventListener('message', (event) => {
          const { PayerID, paymentId } = event.data;
          if (PayerID && paymentId) {
            event.source.close();
            executePayment(paymentId, PayerID);
          }
        });

      }
    } catch (error) {
      console.error("Error fetching job vacancies:", error);
      setLoadingPaynow(false)
      setShowPopup(false)
      setLoading(false)
      toast.error("Payment fail")
    }
  };


  const fetchDetailPayPeriod = async (newDate) => {
    let response;
    console.log("ham nay bi goi lai")
    console.log(newDate)
    try {
      const queryParams = new URLSearchParams(location.search);
      const projectId = queryParams.get("Id");
      console.log(projectId)
      response = await payPeriodServices.getPayPeriodDetailByProjectIdAndDate(projectId, newDate);
      console.log(response)
      setPayPeriodDetail(response.data.data);
      if (response.data.code === 200) {
        console.log("cho nay ms bi goi lai")
        console.log(response.data.data.payPeriodId)
        const response2 = await paySlipServices.getPaySlipByPayPeriodId(response.data.data.payPeriodId);
        setPayRollDetail(response2.data.data);
      }
    } catch (error) {
      console.error("Error fetching job vacancies:", error);
      console.log("payperiod loi")
      setPayPeriodDetail(null);
      setPayRollDetail([]);
    }
  }

  useEffect(() => {
    const currentDate = new Date();

    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0, cần cộng thêm 1
    const year = currentDate.getFullYear();

    const formattedDate = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;

    setCurrentDateBill(formattedDate);

  }, []);

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
      count += 1;
    });

    setCountSetTime(countSetTime + 1)
  }, [workLoglist]);

  const onUpdateWorkLog = () => {
    const foundLog = workLoglist.find(log => log.workLogId === workLogIdOnClick);
    setStartTimeWorkLogSave(foundLog.timeIn);
    setEndTimeWorkLogSave(foundLog.timeOut);
    setEditableRowId(workLogIdOnClick);
  };

  const onUpdatePaySlip = () => {
    const foundLog = payRollDetail.find(log => log.paySlipId === payslipIdOnClick);
    setTotalOTPayslipSave(foundLog.totalOvertimeHours)
    setEdiPaySlipRowId(payslipIdOnClick);
  };

  useEffect(() => {
    fetchListDeveloperOnboard();
  }, []);


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
      console.log("set Calendar")

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
        if (formatTime00(document.getElementById(temp2).value) >= formatTime00(document.getElementById(temp).value)) {
          const temp3 = "timeErrorWorkLog" + workLogIdOnClick;
          document.getElementById(temp3).innerHTML = "The start time of work must be less than the end time of work";
        } else {
          if (formatTime00(document.getElementById(temp2).value) != startTimeWorkLogSave || formatTime00(document.getElementById(temp).value) != endTimeWorkLogSave) {
            updatedWorkLog(formatTime00(document.getElementById(temp2).value), formatTime00(document.getElementById(temp).value))
          } else {
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
        setEditableRowId(null);
      } catch (error) {
        console.log("Loi khi update worklog", error)
      }
    }
  }, [isEditWorkLog]);


  useEffect(() => {
    if (!isCancelEditPayslip) {
      if (workLogIdOnClick) {
        const temp2 = "totalOT" + payslipIdOnClick;
        if (formatTime00(document.getElementById(temp2).value) != totalOTPayslipSave) {
          updatedPayslip(document.getElementById(temp2).value)
        } else {
          setEditableRowId(null);
        }

      }

    } else {
      try {
        console.log("false")
        const temp2 = "totalOT" + payslipIdOnClick;
        document.getElementById(temp2).value = totalOTPayslipSave;

        setEditableRowId(null);
      } catch (error) {
        console.log("Loi khi update worklog", error)
      }
    }
  }, [isEditPayslip]);

  const fetchJobVacancies = async () => {
    let response;
    try {
      const skillSearch = skill.map(skill => skill.value);
      const levelSearch = typeRequire ? typeRequire.value : "";
      const typeSearch = levelRequire ? levelRequire.value : "";
      const statusSearch = status ? status.value : "";
      const inputSearch = search;
      const queryParams = new URLSearchParams(location.search);
      const projectId2 = queryParams.get("Id");

      response = await hiringrequestService.getAllHiringRequestByProjectIdAndPaging(
        projectId2, currentPage, 5, skillSearch, levelSearch, typeSearch, inputSearch, statusSearch
      );

      const formattedJobVacancies = response.data.data.map((job) => {
        // Assuming job.typeRequireName and job.levelRequireName are available
        job.skillRequireStrings.unshift(
          job.typeRequireName,
          job.levelRequireName
        );
        return {
          requestId: job.requestId,
          projectId: job.projectId,
          companyId: job.companyId,
          requestCode: job.requestCode,
          jobTitle: job.jobTitle,
          jobDescription: job.jobDescription,
          numberOfDev: job.numberOfDev,
          targetedDev: job.targetedDev,
          createdAt: job.createdAt,
          salaryPerDev: job.salaryPerDev,
          durationMMM: job.durationMMM,
          duration: job.duration,
          employmentTypeName: job.employmentTypeName,
          typeRequireName: job.typeRequireName,
          levelRequireName: job.levelRequireName,
          statusString: job.statusString,
          skillRequireStrings: job.skillRequireStrings,
          postedTime: job.postedTime,
          showFullSkills: false,
          badges: [],
          experience: job.skillRequireStrings.join(", "),
        };
      });

      setJobVacancyList(formattedJobVacancies);
      setTotalPages(Math.ceil(response.data.paging.total / 5));

    } catch (error) {
      console.error("Error fetching job vacancies:", error);
    }
  };

  useEffect(() => {
    fetchJobVacancies();
  }, []);

  useEffect(() => {
    fetchJobVacancies();
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    fetchJobVacancies();
  }, [skill, typeRequire, levelRequire, status]);

  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };



  const openHiringRequestDetail = (requestId, statusString) => {
    if (statusString === "Saved") {
      openModalCreateHiringrequest(requestId);
    } else {
      navigate('/hiringrequestlistincompanypartnerdetail?Id=' + requestId);
    }
  };


  const toggleInput = () => {
    setShowInput(!showInput);
  };



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
    if (currentMonthIndex < listMonth.length - 1) {
      setCurrentMonthIndex(currentMonthIndex + 1);
    }
  };

  const previousMonth = () => {
    if (currentMonthIndex > 0) {
      setCurrentMonthIndex(currentMonthIndex - 1);
    }
  };



  const generateExel = async () => {
    setLoadingGenerateExel(true)
    const queryParams = new URLSearchParams(location.search);
    const projectId = queryParams.get("Id");

    const currentMonthData = listMonth[currentMonthIndex];

    const date = new Date(currentMonthData);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-25`;
    const filename = "EmployeePaySlip_" + hiringRequestDetail.companyName.replace(/\s+/g, '') + "_" + listMonth[currentMonthIndex].replace(/\s+/g, '_');

    downloadExcelFile(projectId, formattedDate, filename)

  };

  const importExcel = async (formData2) => {
    try {
      if (formData2) {
        const queryParams = new URLSearchParams(location.search);
        const projectId = queryParams.get("Id");
        const response = await payPeriodServices.importExcel(projectId, formData2);
        console.log("import")
        console.log(response)
        toast.success("Import successfully")
        setLoadingImportExel(false);
      }
      setLoadPayPeriod(!loadPayPeriod);
      setLoadingImportExel(false);
    } catch (error) {
      console.log("import")
      console.log(error)
      toast.error(error.response.data.message)
      setLoadingImportExel(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoadingImportExel(true);
      const formData2 = new FormData();
      formData2.append('file', file);
      importExcel(formData2);
    }
    setKey(Date.now())
    setLoadingImportExel(false);
  };

  const downloadExcelFile = async (projectId, inputDate, filename) => {
    try {
      const response = await payPeriodServices.exportToExcel(projectId, inputDate);
      if (response.status !== 200) {
        throw new Error('Something went wrong while downloading the file');
      }
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.setAttribute('download', filename);
      downloadLink.click();
      setLoadingGenerateExel(false)
    } catch (error) {
      console.error('Error downloading the file:', error);
      toast.error("There are no developers worked in " + listMonth[currentMonthIndex].replace(/\s+/g, ' '))
      setLoadingGenerateExel(false)
    }
  };

  const onSearch = () => {
    setCurrentPage(1);
    fetchJobVacancies();

  };

  return (
    <React.Fragment>
      {loading && (
        <div className="overlay" style={{ zIndex: "3000" }}>
          <div className="spinnerNoCloud"></div>
        </div>
      )}
      <div className="job-detail " style={{ marginTop: "50px" }}>
        <CardBody className="">
          <div class="row  justify-content-center " style={{ margin: "0px" }}>
            <div class="col-lg-11 " style={{ padding: "0px" }}>
              <Card className="job-detail overflow-hidden">
                <div>
                  <div style={{ position: "relative", display: "inline-block", width: "100%" }}>
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/fuprojectteammanagement.appspot.com/o/vivid-blurred-colorful-background.jpg?alt=media&token=dd0ed801-1438-4d7a-af45-98906b7bf882"
                      alt=""
                      className="img-fluid"
                      style={{ width: "100%", height: "200px", objectFit: "cover" }}
                    />
                    <FontAwesomeIcon icon={faImage}
                      style={{ position: "absolute", top: "40", right: "40", transform: "translate(50%, -50%)", zIndex: "1", fontSize: "25px", color: "grey", cursor: "pointer" }}
                    />
                  </div>
                  <div className="job-details-compnay-profile">
                    <img
                      src={JobImage10}
                      alt=""
                      className="img-fluid rounded-3 rounded-3"
                    />
                  </div>
                </div>
                <CardBody classN ame="p-3">
                  <div className="d-flex flex-column gap-3 ">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex gap-3 align-items-center">
                        <h4 className="mb-0">{hiringRequestDetail.projectName}</h4>
                        <ul className="list-inline mb-0 text-lg-end mt-3 mt-lg-0 ">
                          <li>
                            <span
                              className={
                                hiringRequestDetail.statusString === "Rejected"
                                  ? "badge bg-danger text-light "
                                  : hiringRequestDetail.statusString ===
                                    "Preparing"
                                    ? "badge bg-warning text-light "
                                    : hiringRequestDetail.statusString ===
                                      "In process"
                                      ? "badge bg-blue text-light "
                                      : hiringRequestDetail.statusString ===
                                        "Expired"
                                        ? "badge bg-danger text-light "
                                        : hiringRequestDetail.statusString ===
                                          "Cancelled"
                                          ? "badge bg-danger text-light "
                                          : hiringRequestDetail.statusString ===
                                            "Finished"
                                            ? "badge bg-primary text-light "
                                            : hiringRequestDetail.statusString ===
                                              "Complete"
                                              ? "badge bg-primary text-light"
                                              : hiringRequestDetail.statusString === "Saved"
                                                ? "badge bg-info text-light "
                                                : ""
                              }
                            >
                              {hiringRequestDetail.statusString}
                            </span>{" "}
                          </li>
                        </ul>
                      </div>
                      <div>
                        <Avatar.Group
                          maxCount={4}
                          maxStyle={{
                            color: '#f56a00',
                            backgroundColor: '#fde3cf',
                          }}
                        >
                          {developerOnboardList.map((candidategridDetailsNew, key) => (
                            <>
                              {candidategridDetailsNew.userImage ? (
                                <Avatar src={candidategridDetailsNew.userImage} />
                              ) : (
                                <Avatar
                                  style={{
                                    backgroundColor: '#f56a00',
                                  }}
                                >
                                  {candidategridDetailsNew.lastWord}
                                </Avatar>
                              )}
                            </>
                          ))}
                        </Avatar.Group>
                      </div>
                    </div>
                    <div style={{ color: "grey" }} className="d-flex gap-4">
                      <div>
                        <FontAwesomeIcon icon={faFlag} style={{ marginRight: "8px" }} />
                        Start date :{" "}
                        {hiringRequestDetail.startDateMMM}
                      </div>
                      <div>
                        <FontAwesomeIcon icon={faCircleXmark} style={{ marginRight: "8px" }} />
                        End date : {" "}
                        {hiringRequestDetail.endDateMMM}
                      </div>
                    </div>
                    <div>
                      <div className="d-flex justify-content-end">
                        <p className="fw-bold" style={{ color: "grey" }}>
                          {hiringRequestDetail.dayLeft} day left
                        </p>
                      </div>
                      <div className="dev-matching-in-company border border-1">
                        <div
                          className="dev-matching-level-in-company"
                          style={{
                            width: `${hiringRequestDetail.dayLeftPercent}% `,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
            <div class="col-lg-11 " style={{ padding: "0px" }}>
              <Card
                className="profile-content-page mt-4 mt-lg-0"
                style={{ border: "none" }}
              >
                <Nav
                  className="profile-content-nav nav-pills border-bottom"
                  id="pills-tab"
                  role="tablist"
                >
                  <NavItem role="presentation">
                    <NavLink
                      className={classnames({ active: activeTab === "1" })}
                      onClick={() => {
                        tabChange("1");
                      }}
                      type="button"
                    // style={{paddingLeft:"0px"}}
                    >
                      Overview
                    </NavLink>
                  </NavItem>
                  <NavItem role="presentation">
                    <NavLink
                      className={classnames({ active: activeTab === "2" })}
                      onClick={() => {
                        tabChange("2");
                      }}
                      type="button"
                    // style={{paddingLeft:"0px"}}
                    >
                      Hiring Request
                    </NavLink>
                  </NavItem>
                  <NavItem role="presentation">
                    <NavLink
                      className={classnames({ active: activeTab === "3" })}
                      onClick={() => {
                        tabChange("3");
                      }}
                      type="button"
                    // style={{paddingLeft:"0px"}}
                    >
                      Developer
                    </NavLink>
                  </NavItem>
                  <NavItem role="presentation">
                    <NavLink
                      className={classnames({ active: activeTab === "4" })}
                      onClick={() => {
                        tabChange("4");
                      }}
                      type="button"
                    >
                      Payment
                    </NavLink>
                  </NavItem>
                  <NavItem role="presentation">
                    <NavLink
                      className={classnames({ active: activeTab === "5" })}
                      onClick={() => {
                        tabChange("5");
                      }}
                      type="button"
                    // style={{paddingLeft:"0px"}}
                    >
                      Hiring request new
                    </NavLink>
                  </NavItem>
                </Nav>
                <CardBody className="p-4" style={{ backgroundColor: "#fafafa", overflowX: "auto" }} >
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <div>12</div>
                    </TabPane>
                    <TabPane tabId="2">

                      <div className={`${showScroll ? ' show-scroll' : ''}`} ref={rowRef} style={{
                        minHeight: checkHeightListHiringRequest ? "100%" : "auto",
                        height: checkHeightListHiringRequest ? "auto" : "650px",
                      }}>
                        <Row className="flex-nowrap gap-3" style={{ marginLeft: "1px", marginBottom: "10px" }}>
                          {listJobPosition.map((jobPosition, key) => (
                            <Col lg={3} md={6} key={key} className="card " style={{ paddingLeft: "0px", paddingRight: "0px", borderRadius: "15px", height: "fit-content", backgroundColor: "#f6f6f6" }}>
                              <div className="d-flex flex-column ms-2 mt-2 mb-2 me-2 gap-3" style={{ height: "100%" }} >
                                <div className="d-flex justify-content-between align-items-center">
                                  {/* {editingPositions[jobPosition.jobPositionId] ? (
                                    <div className="form-group app-label">
                                      <input
                                        ref={inputRef}
                                        placeholder="Please enter job position"
                                        style={{ width: "94%", margin: "10px 10px 0px 10px" }}
                                        type="text"
                                        className="form-control resume"
                                        id="job-position-input"
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        onKeyDown={(e) => handleKeyPress(e, jobPosition.jobPositionId)}
                                      />
                                    </div>
                                  ) : ( */}
                                  <div
                                    style={{
                                      paddingLeft: "15px",
                                      fontWeight: "bold",
                                      fontSize: "18px",
                                      marginTop: "15px",
                                      marginBottom: "8px",
                                      cursor: "pointer"
                                    }}
                                  // onClick={() => onUpdateJobPosition(jobPosition.jobPositionId)}
                                  >
                                    {jobPosition.positionName}
                                  </div>
                                  {/* )} */}
                                  <DropdownAntd menu={{ items: profileItems }}>
                                    <FontAwesomeIcon icon={faEllipsis}
                                      style={{ fontSize: "24px", paddingRight: "15px", color: 'black', cursor: "pointer" }}
                                      onClick={() => setPositionIdChose(jobPosition.jobPositionId)}
                                    />
                                  </DropdownAntd>
                                </div>
                                <div className="d-flex flex-column gap-3" style={{ height: "100%" }}>
                                  {jobVacancyList.map((jobVacancyListDetails, key) => {
                                    // Check if the positionName is 'job position 2'
                                    if (jobVacancyListDetails.jobPositionId === jobPosition.jobPositionId) {
                                      return (
                                        <div
                                          onClick={() => openHiringRequestDetail(jobVacancyListDetails.id, jobVacancyListDetails.timing)}
                                          key={key}
                                          style={{ transform: "none" }}
                                          className={
                                            "job-box card "
                                          }
                                        // className="job-box card mt-4"
                                        >
                                          <div className="p-3">
                                            {/* <Row className="align-items-center"> */}
                                            {/* <Col md={3}> */}
                                            <div className="mb-2 mb-md-0 d-flex">
                                              <div
                                                className="text-dark "
                                                style={{ fontWeight: "bold" }}
                                              >
                                                {jobVacancyListDetails.jobTitle}
                                              </div>
                                              {/* <p className="text-muted fs-14 mb-0">
                                                {jobVacancyListDetails.companyName}
                                              </p> */}
                                            </div>
                                            <div>
                                              <span
                                                className={
                                                  jobVacancyListDetails.waitingApproval === true
                                                    ? "badge bg-warning text-light fs-12 mt-3"
                                                    : jobVacancyListDetails.inProgress === true
                                                      ? "badge bg-blue text-light fs-12 mt-3"
                                                      : jobVacancyListDetails.rejected === true
                                                        ? "badge bg-danger text-light fs-12 mt-3"
                                                        : jobVacancyListDetails.expired === true
                                                          ? "badge bg-danger text-light fs-12 mt-3"
                                                          : jobVacancyListDetails.cancelled === true
                                                            ? "badge bg-secondary text-light fs-12 mt-3"
                                                            : jobVacancyListDetails.finished === true
                                                              ? "badge bg-primary text-light fs-12 mt-3"
                                                              : jobVacancyListDetails.completed === true
                                                                ? "badge bg-success text-light fs-12 mt-3"
                                                                : jobVacancyListDetails.save === true
                                                                  ? "badge bg-teal text-light fs-12 mt-3"
                                                                  : ""
                                                }
                                              >
                                                {jobVacancyListDetails.timing}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="p-3 bg-light">
                                            <Row className="justify-content-between">
                                              <Col md={12}>
                                                <div className="d-flex justify-content-between">
                                                  <div className="d-flex justify-content-center align-items-center">
                                                    <FontAwesomeIcon icon={faCalendar} style={{ marginRight: "8px", fontSize: "18px" }} />
                                                    <div className="mb-0 " style={{ fontWeight: "bold" }}>
                                                      {jobVacancyListDetails.duration}
                                                    </div>
                                                  </div>
                                                  <div className="d-flex justify-content-center align-items-center">
                                                    <UserOutlined style={{ fontSize: "18px" }} />
                                                    <div style={{ marginLeft: "4px" }}>
                                                      {jobVacancyListDetails.numberOfDev}
                                                    </div>
                                                  </div>
                                                </div>
                                              </Col>
                                            </Row>
                                          </div>
                                        </div>
                                      );
                                    } else {
                                      return null; // If it's not 'job position 2', render nothing or handle differently
                                    }
                                  })}
                                  <div
                                    onClick={() =>
                                      openModalCreateHiringrequest(null, jobPosition.jobPositionId)
                                    }
                                    className="d-flex hover-change " style={{ padding: "8px" }}
                                  >
                                    <span style={{ fontSize: "15px", marginRight: "5px" }}>
                                      <FontAwesomeIcon icon={faPlus} />
                                    </span>
                                    <div style={{ fontWeight: "500" }}>
                                      Add a hiring Request
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          ))}
                          {/* {[...Array(projectCount)].map((_, index) => ( // Tạo số lượng cục <Col> tương ứng với projectCount */}
                          <Col lg={3} md={6} style={{ height: "45px", paddingLeft: "0px", paddingRight: "0px", height: "fit-content" }} >
                            {showInput ? (
                              <div className="card">
                                <div className="form-group app-label">
                                  <input
                                    placeholder="Please enter job position"
                                    style={{ width: "94%", margin: "10px 10px 0px 10px" }}
                                    type="text"
                                    className="form-control resume"
                                    id="job-position-input"
                                  />
                                </div>
                                <div className="d-flex gap-3 mt-2 ms-2 mb-2 align-items-center">
                                  <button className="btn btn-blue"
                                  >
                                    Add</button>
                                  <FontAwesomeIcon icon={faTimes} onClick={toggleInput} />
                                </div>
                              </div>
                            ) : (
                              <div className=" card" onClick={toggleInput} style={{ height: "50px" }}>
                                <div style={{ height: "50px", flex: "1" }}>
                                  <div className="d-flex align-items-center justify-content-center" style={{ height: "100%" }}>
                                    <span style={{ fontSize: "15px", marginRight: "5px" }}>
                                      <FontAwesomeIcon icon={faPlus} />
                                    </span>
                                    <div>Add job position</div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Col>
                          {/* ))} */}
                        </Row>
                      </div>
                      <div>
                        <CreateHiringRequestPopup
                          isModalOpen={isModalCreateOpen}
                          closeModal={closeModalCreateHiringRequest}
                          requestId={selectedHiringRequestInfo}
                        />
                      </div>
                    </TabPane>
                    <TabPane tabId="3">
                      <Row>
                        {developerOnboardList.map((candidategridDetailsNew, key) => (
                          <Col lg={3} md={6} key={key}>
                            <div style={{ backgroundColor: "white", borderRadius: "15px" }}>
                              <CardBody className="p-4 dev-accepted mt-4" style={{ borderRadius: "15px" }}>
                                <div className="d-flex mb-2 justify-content-between">
                                  <div className="d-flex">
                                    <div
                                      className="flex-shrink-0 position-relative"
                                      onClick={() =>
                                        openModal(candidategridDetailsNew)
                                      }
                                    >
                                      <img
                                        src={
                                          candidategridDetailsNew.userImg ||
                                          userImage0
                                        }
                                        alt=""
                                        className="avatar-md rounded"
                                      />
                                      <span
                                        className={
                                          candidategridDetailsNew.candidateStatusClassName
                                        }
                                      ></span>
                                    </div>
                                    <div className="ms-3">
                                      <div className="primary-link">
                                        <h5
                                          className="fs-17"
                                          onClick={() =>
                                            openModal(candidategridDetailsNew)
                                          }
                                        >
                                          {candidategridDetailsNew.firstName} {candidategridDetailsNew.lastName}
                                        </h5>
                                      </div>
                                      <span
                                        className={
                                          candidategridDetailsNew.selectedDevStatus ===
                                            "Rejected"
                                            ? "badge bg-danger text-light mb-2"
                                            : candidategridDetailsNew.selectedDevStatus ===
                                              "Under Consideration"
                                              ? "badge bg-warning text-light mb-2"
                                              : candidategridDetailsNew.selectedDevStatus ===
                                                "Interview Scheduled"
                                                ? "badge bg-blue text-light mb-2"
                                                : candidategridDetailsNew.selectedDevStatus ===
                                                  "Expired"
                                                  ? "badge bg-danger text-light mb-2"
                                                  : candidategridDetailsNew.selectedDevStatus ===
                                                    "Cancelled"
                                                    ? "badge bg-danger text-light mb-2"
                                                    : candidategridDetailsNew.selectedDevStatus ===
                                                      "Waiting Interview"
                                                      ? "badge bg-warning text-light mb-2"
                                                      : candidategridDetailsNew.selectedDevStatus ===
                                                        "Onboarding"
                                                        ? "badge bg-primary text-light mb-2"
                                                        : candidategridDetailsNew.selectedDevStatus ===
                                                          "Saved"
                                                          ? "badge bg-info text-light mb-2"
                                                          : ""
                                        }
                                      >
                                        {candidategridDetailsNew.selectedDevStatus} dsad
                                      </span>{" "}
                                    </div>
                                  </div>

                                  <div
                                    className="list-inline-item"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    onClick={() => openModal(candidategridDetailsNew)}
                                    title="View More"
                                  >
                                    <div className="avatar-sm bg-success-subtle text-success d-inline-block text-center rounded-circle fs-18">
                                      <i className="mdi mdi-eye"></i>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex gap-2 align-items-center">
                                  <FontAwesomeIcon icon={faEnvelope} />
                                  {candidategridDetailsNew.email}
                                </div>
                              </CardBody>
                            </div>
                          </Col>
                        ))}
                      </Row>
                      <div>
                        <DeveloperDetailInCompanyPopup
                          isModalOpen={isModalOpen}
                          closeModal={closeModal}
                          devId={selectedCandidateInfo.id}
                        />
                      </div>
                    </TabPane>
                    <TabPane tabId="4">
                      {isHavePayment ? (
                        <>
                          <div>
                            <div className="d-flex justify-content-between mb-3">
                              <div style={{ fontSize: "30px", fontWeight: "bold" }}>
                                Payroll
                              </div>

                              <div className="d-flex gap-5 justify-content-end">
                                <div className="btn btn-soft-primary fw-bold"
                                >
                                  Create new
                                </div>
                                <div className="d-flex justify-content-end gap-2">
                                  <div>
                                    <input
                                      key={key}
                                      type="file"
                                      style={{ display: 'none' }}
                                      onChange={handleFileChange}
                                      id="fileInput" // Đặt id để tham chiếu trong nút Import Excel
                                      disabled={loadingImportExel}
                                    />
                                    <label
                                      htmlFor="fileInput"
                                      className="btn btn-soft-blue fw-bold"
                                    >
                                      {loadingImportExel ? (
                                        <div style={{ width: "100px" }} className="d-flex align-items-center justify-content-center">
                                          <HashLoader
                                            size={20}
                                            color={"white"}
                                            loading={true}
                                          />
                                        </div>
                                      ) : (
                                        "Import Excel"
                                      )}
                                    </label>
                                  </div>
                                  <button className="btn btn-soft-blue fw-bold"
                                    onClick={() => {
                                      generateExel();
                                    }}
                                    disabled={loadingGenerateExel}
                                  >
                                    {loadingGenerateExel ? (
                                      <div style={{ width: "110px" }} className="d-flex align-items-center justify-content-center">
                                        <HashLoader
                                          size={20}
                                          color={"white"}
                                          loading={true}
                                        />
                                      </div>
                                    ) : (
                                      "Generate Excel"
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>

                            <Nav
                              className="profile-content-nav nav-pills border-bottom d-flex justify-content-between"
                              id="pills-tab"
                              role="tablist"
                            >
                              <div className="d-flex align-items-center gap-3" disabled="true">
                                <FontAwesomeIcon icon={faAngleLeft} style={{ fontSize: '20px' }} onClick={previousMonth} />
                                <FontAwesomeIcon icon={faAngleRight} style={{ fontSize: '20px' }} onClick={nextMonth} />
                                <div className="d-flex flex-column">
                                  <div id="monthYearSelected" style={{ fontSize: "20px", fontWeight: "600" }}>{listMonth[currentMonthIndex]}</div>
                                  <div id="dateSelected" style={{ fontSize: "15px", color: "grey" }}>{listStartDay[currentMonthIndex]} - {listEndDay[currentMonthIndex]}</div>
                                </div>
                              </div>
                              <div className="d-flex">
                                <NavItem role="presentation">
                                  <NavLink
                                    className={classnames({ active: activeTabMini === "5" })}
                                    onClick={() => {
                                      tabChangeMini("5");
                                    }}
                                    type="button"
                                  // style={{paddingLeft:"0px"}}
                                  >
                                    Overview
                                  </NavLink>
                                </NavItem>
                                <NavItem role="presentation">
                                  <NavLink
                                    className={classnames({ active: activeTabMini === "6" })}
                                    onClick={() => {
                                      tabChangeMini("6");
                                    }}
                                    type="button"
                                  // style={{paddingLeft:"0px"}}
                                  >
                                    Pay Period
                                  </NavLink>
                                </NavItem>
                              </div>
                            </Nav>
                            {/* -------------------------------------------------------------- */}
                            <div>
                              <TabContent activeTab={activeTabMini}>
                                <TabPane tabId="5" className="pt-4 ">
                                  {payPeriodDetail ? (
                                    <>
                                      <div className="row">
                                        <div className="col-lg-9 p-4 d-flex flex-column gap-4 card " style={{
                                          boxShadow:
                                            "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                                        }}>
                                          <div className="d-flex align-items-center justify-content-between">
                                            <div style={{ color: "black", fontWeight: "500" }}>Total salary payable for the month</div>
                                            <div>
                                              <span
                                                className={
                                                  payPeriodDetail.statusString === "Created"
                                                    ? "badge bg-blue text-light fs-12 "
                                                    : payPeriodDetail.statusString === "Expired"
                                                      ? "badge bg-danger text-light fs-12 "
                                                      : payPeriodDetail.statusString === "Deleted"
                                                        ? "badge bg-secondary text-light fs-12 "
                                                        : payPeriodDetail.statusString === "Paid"
                                                          ? "badge bg-primary text-light fs-12 "
                                                          : ""
                                                }
                                              >
                                                {payPeriodDetail.statusString}
                                              </span>
                                            </div>
                                          </div>
                                          <div style={{ border: "1px solid #d9d9d9" }}></div>
                                          <div className="d-flex justify-content-between" style={{ fontSize: "35px" }}>
                                            <div>Total salary for developers in {listMonth[currentMonthIndex].split(' ')[0]}</div>
                                            <div>{payPeriodDetail.totalAmount}</div>
                                          </div>
                                          <div className="d-flex flex-column">
                                            {payPeriodDetail.developerFullName.map((fullName, index) => (
                                              <>
                                                <div className="d-flex gap-2  align-items-center ">
                                                  <FontAwesomeIcon icon={faCircle} style={{ color: "#20b144", fontSize: "10px" }} />
                                                  <div style={{ color: "black", fontWeight: "480" }} key={index}>Salary of {fullName}</div>
                                                </div>
                                              </>
                                            ))}
                                          </div>
                                          <div style={{ color: "grey", marginTop: "80px" }} className="d-flex justify-content-between" >
                                            <div>Last updated : {payPeriodDetail.updatedAt}</div>
                                            {payPeriodDetail.statusString !== "Paid" && (
                                              <div className="btn btn-soft-primary fw-bold" onClick={() => {
                                                setShowPopup(true);
                                              }}>Continues</div>
                                            )}
                                          </div>
                                        </div>
                                        <div className="col-lg-3"
                                          style={{ paddingLeft: "24px" }}>
                                          <Calendar
                                            onChange={handleDateChange}
                                            value={dateValue}
                                          // Các propkhác của Calendar nếu cần
                                          />
                                        </div>
                                      </div>

                                      <AntdModal
                                        centered
                                        open={showPopup}
                                        onOk={() => setShowPopup(false)}
                                        onCancel={() => {
                                          setShowPopup(false);
                                        }}
                                        width={750}
                                        footer={null}
                                        zIndex={2000}
                                      >
                                        <div className="ps-3 pr-5 row ">
                                          <div className="col-lg-9">
                                            <div className=" profile-user">
                                              <img
                                                src={userImage0}  // Giá trị mặc định là "userImage2"
                                                className="rounded-circle img-thumbnail"
                                                style={{ width: "120px" }}
                                                id="profile-img-2"
                                                alt=""
                                              />
                                            </div>
                                            <div className="candidate-profile-overview ">
                                              <h6 className="fs-17 fw-semibold ">{payPeriodDetail.companyName}</h6>
                                              <h6 style={{ color: "grey" }}>{hiringRequestDetail.projectName}</h6>
                                            </div>
                                          </div>
                                          <div className="col-lg-3 d-flex flex-column justify-content-start" style={{ textAlign: "end", paddingTop: "30px", paddingRight: '30px' }} >
                                            <div style={{ fontSize: "15px", color: "grey" }}>{payPeriodDetail.payPeriodCode}</div>
                                            <div style={{ fontSize: "15px", color: "grey" }}>{currentDateBill}</div>
                                          </div>
                                        </div>
                                        <Divider style={{ marginBottom: "12px" }}></Divider>

                                        <div className="px-3 d-flex justify-content-between align-items-center">
                                          <div style={{ fontWeight: "600" }}>
                                            Actual total amount
                                          </div>
                                          <div style={{ fontSize: "20px", color: "green", fontWeight: "500" }} >
                                            {payPeriodDetail.totalActualAmount}
                                          </div>
                                        </div>
                                        <Divider style={{ marginBottom: "12px" }}></Divider>

                                        <div className="px-3 d-flex justify-content-between align-items-center">
                                          <div style={{ fontWeight: "600" }}>
                                            Total OT amount
                                          </div>
                                          <div style={{ fontSize: "20px", color: "green", fontWeight: "500" }} >
                                            {payPeriodDetail.totalOTAmount}
                                          </div>
                                        </div>
                                        <Divider style={{ marginBottom: "12px" }}></Divider>

                                        <div className="px-3 d-flex justify-content-end align-items-end">
                                          <div style={{ fontWeight: "600", fontSize: "20px" }}>
                                            TOTAL DUE : {payPeriodDetail.totalAmount}
                                          </div>
                                        </div>
                                        <Divider style={{ marginBottom: "12px" }}></Divider>


                                        <div className="row" style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                                          <div className="col-lg-4  d-flex flex-column gap-2" >
                                            <div style={{ color: "grey" }}>
                                              TO
                                            </div>
                                            <div style={{ fontWeight: "600" }}>
                                              WeHire Co.
                                            </div>
                                            <div className="d-flex flex-column" style={{ color: "grey" }}>
                                              <div>
                                                Quan 9
                                              </div>
                                              <div>
                                                Ho Chi Minh City
                                              </div>
                                              VietNam
                                            </div>
                                            <div style={{ color: "grey" }}>
                                              wehire@gmail.com
                                            </div>
                                          </div>
                                          <div className=" col-lg-4 d-flex flex-column gap-2" >
                                            <div style={{ color: "grey" }}>
                                              FROM
                                            </div>
                                            <div style={{ fontWeight: "600" }}>
                                              {payPeriodDetail.companyName}
                                            </div>
                                            <div className="d-flex flex-column" style={{ color: "grey" }}>
                                              {payPeriodDetail.companyAddress}
                                            </div>
                                            <div style={{ color: "grey" }}>
                                              {payPeriodDetail.companyEmail}
                                            </div>
                                          </div>
                                          <div className="d-flex col-lg-4 flex-column gap-2" >
                                            <div style={{ color: "grey" }}>
                                              NOTE
                                            </div>
                                            <div>
                                              Note
                                            </div>
                                          </div>
                                        </div>
                                        <div className="px-3 d-flex justify-content-end align-items-end">
                                          <button className="btn btn-warning fw-bold d-flex align-items-center justify-content-center mt-3"
                                            onClick={() => {
                                              openPayment(payPeriodDetail.payPeriodId);
                                            }}
                                            disabled={loadingPayNow}
                                            style={{ width: "1000px" }}
                                          >
                                            {loadingPayNow ? (
                                              <div style={{ width: "300px" }} className="d-flex align-items-center justify-content-center">
                                                <HashLoader
                                                  size={20}
                                                  color={"white"}
                                                  loading={true}
                                                />
                                              </div>
                                            ) : (
                                              <img src={paypalImage} alt="PayPal" style={{ width: "150px" }}></img>
                                            )}
                                          </button>
                                        </div>
                                      </AntdModal>

                                    </>
                                  ) : (
                                    <Empty />
                                  )}
                                </TabPane>
                                <TabPane tabId="6" className="pt-4">
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

                                                <Col md={1} className="d-flex gap-2 justify-content-between align-items-center">
                                                  <div
                                                    className="d-flex justify-content-center align-items-center rounded-circle"
                                                    onClick={() => toggleCollapse(key2, payRollDetailNew.paySlipId)}
                                                    style={{
                                                      backgroundColor: "#ECECED",
                                                      width: "50px",
                                                      height: "50px",
                                                    }}
                                                  >
                                                    <i
                                                      className="uil uil-angle-down"
                                                      style={{ fontSize: "30px" }}
                                                    ></i>
                                                  </div>
                                                  <DropdownAntd trigger={['click']} menu={{ items: profileItems3 }}
                                                    onClick={() =>
                                                      setPayRollEdit(payRollDetailNew.paySlipId)
                                                    }
                                                    overlayStyle={{ right: '4.312px', bottom: "auto", left: "auto" }} >
                                                    <a style={{ height: "max-content" }} onClick={(e) => e.preventDefault()}>
                                                      <FontAwesomeIcon
                                                        icon={faGear}
                                                        size="xl"
                                                        color="#909191"
                                                      />
                                                    </a>
                                                  </DropdownAntd>
                                                </Col>
                                                {ediPaySlipRowId == payRollDetailNew.paySlipId ? (
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
                                                        <div className="btn btn-soft-blue"
                                                          onClick={() => saveUpdatePayslip()}
                                                        >
                                                          Save
                                                        </div>
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
                                                    <Row>
                                                      <Col
                                                        md={3}
                                                        className="d-flex justify-content-center align-items-center"
                                                        id={`time-In2-${workLogDetail.workLogId}`}
                                                      >
                                                        {workLogDetail.workDateMMM}

                                                      </Col>
                                                      <Col md={3}>
                                                        <div>
                                                          <input
                                                            type="time"
                                                            className="form-control"
                                                            id={`endTimeWorkLog${key2}${key}`}
                                                            readOnly={editableRowId !== workLogDetail.workLogId}
                                                          />
                                                        </div>
                                                      </Col>
                                                      <Col md={3}>
                                                        <div>
                                                          <input
                                                            type="time"
                                                            className="form-control"
                                                            id={`endTimeWorkLog2${key2}${key}`}
                                                            readOnly={editableRowId !== workLogDetail.workLogId}
                                                          />
                                                        </div>
                                                      </Col>
                                                      <Col
                                                        md={2}
                                                        className="d-flex justify-content-center align-items-center"
                                                        id={`hourInDay${workLogDetail.workLogId}`}
                                                      >
                                                        Hours in day: {workLogDetail.hourWorkInDay}
                                                      </Col>
                                                      <Col
                                                        md={1}
                                                        className="d-flex justify-content-center align-items-center"
                                                      >

                                                        <DropdownAntd trigger={['click']} menu={{ items: profileItems2 }} onClick={() =>
                                                          setKeyAndIdWorkLog(workLogDetail.workLogId, key)
                                                        } >
                                                          <a style={{ height: "max-content" }} onClick={(e) => e.preventDefault()}>
                                                            <FontAwesomeIcon
                                                              icon={faGear}
                                                              size="xl"
                                                              color="#909191"
                                                            />
                                                          </a>
                                                        </DropdownAntd>
                                                      </Col>
                                                    </Row>
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
                                                            <div className="btn btn-soft-blue"
                                                              onClick={() => saveUpdateWorkLog()}
                                                            >
                                                              Save
                                                            </div>
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
                        </>
                      ) : (
                        <Empty />
                      )}
                    </TabPane>
                    <TabPane tabId="5">

                      <div className="job-list-header">
                        <Form action="#">
                          <Row className="g-2">
                            <Col lg={4} md={6}>
                              <div className="filler-job-form">
                                <i className="uil uil-briefcase-alt"></i>
                                <Input
                                  type="search"
                                  className="form-control filter-input-box"
                                  id="exampleFormControlInput1"
                                  placeholder="Hiringrequest Title / Hiringrequest Code..."
                                  style={{ marginTop: "-10px", backgroundColor: "#fafafa" }}
                                  value={search}
                                  onChange={(e) => setSearch(e.target.value)}
                                />
                              </div>
                            </Col>
                            <Col lg={2} md={6}>
                              <div className="btn btn-primary w-100" onClick={() => onSearch()}>
                                <i className="uil uil-search"></i> Search
                              </div>
                            </Col>
                            <Col lg={4} md={6}>
                            </Col>
                            <Col lg={2} md={6}>
                              <div className="btn btn-primary w-100"
                                onClick={() => openModalCreateHiringrequest(null)}
                              >
                                <i className="uil uil-plus"></i> Create
                              </div>
                            </Col>
                            <Col lg={3} md={6}>
                              <div className="filler-job-form">
                                <i className="uil uil-clipboard-notes"></i>
                                <Select
                                  isMulti
                                  options={options}
                                  styles={colourStyles}
                                  className="selectForm__inner"
                                  name="choices-single-categories"
                                  id="choices-single-categories"
                                  aria-label="Default select example"
                                  value={skill}
                                  onChange={setSkillValue}
                                  menuPosition={'fixed'}

                                />
                              </div>
                            </Col>
                            <Col lg={3} md={6}>
                              <div className="filler-job-form">
                                <i className="uil uil-clipboard-notes"></i>
                                <Select
                                  options={options2}
                                  styles={colourStyles}
                                  className="selectForm__inner"
                                  name="choices-single-categories"
                                  id="choices-single-categories"
                                  aria-label="Default select example"
                                  value={typeRequire}
                                  onChange={setTypeValue}
                                  menuPosition={'fixed'}
                                  isClearable

                                />
                              </div>
                            </Col>
                            <Col lg={3} md={6}>
                              <div className="filler-job-form">
                                <i className="uil uil-clipboard-notes"></i>
                                <Select
                                  options={options3}
                                  styles={colourStyles}
                                  className="selectForm__inner"
                                  name="choices-single-categories"
                                  id="choices-single-categories"
                                  aria-label="Default select example"
                                  value={levelRequire}
                                  onChange={setLevelValue}
                                  menuPosition={'fixed'}
                                  isClearable
                                />
                              </div>
                            </Col>
                            <Col lg={3} md={6}>
                              <div className="filler-job-form">
                                <i className="uil uil-clipboard-notes"></i>
                                <Select
                                  options={options4}
                                  styles={colourStyles}
                                  className="selectForm__inner"
                                  name="choices-single-categories"
                                  id="choices-single-categories"
                                  aria-label="Default select example"
                                  value={status}
                                  onChange={setStatusValue}
                                  menuPosition={'fixed'}
                                  isClearable
                                />
                              </div>
                            </Col>
                          </Row>
                        </Form>
                      </div>
                      <div>
                        {jobVacancyList.map((jobVacancyListDetails, key) => (
                          <div
                            key={key}
                            className={
                              "job-box card mt-4"
                            }
                            onClick={() => openHiringRequestDetail(jobVacancyListDetails.requestId, jobVacancyListDetails.statusString)}
                          >
                            <div className="p-4">
                              <Row className="align-items-center">
                                <Col md={3}>
                                  <div className="mb-2 mb-md-0">
                                    <h5 className="fs-18 mb-0">
                                      <div
                                        className="text-dark"
                                      >
                                        {jobVacancyListDetails.jobTitle}
                                      </div>
                                    </h5>
                                    <p className="text-muted fs-14 mb-0">
                                      {jobVacancyListDetails.requestCode}
                                    </p>
                                  </div>
                                </Col>

                                <Col md={3}>
                                  <div className="d-flex mb-2">
                                    <div className="flex-shrink-0">
                                      <i className="uil uil-user-check text-primary me-1"></i>
                                    </div>
                                    <p className="text-muted mb-0">
                                      {jobVacancyListDetails.targetedDev} / {jobVacancyListDetails.numberOfDev} Developer
                                    </p>
                                  </div>
                                </Col>
                                <Col md={2}>
                                  <div className="d-flex mb-0">
                                    <div className="flex-shrink-0">
                                      <i className="uil uil-location-pin-alt text-primary me-1"></i>
                                    </div>
                                    <p className="text-muted mb-0">
                                      {" "}
                                      {jobVacancyListDetails.employmentTypeName}
                                    </p>
                                  </div>
                                </Col>
                                <Col md={2}>
                                  <div className="d-flex mb-0">
                                    <div className="flex-shrink-0">
                                      <i className="uil uil-clock-three text-primary me-1"></i>
                                    </div>
                                    <p className="text-muted mb-0">
                                      {" "}
                                      {jobVacancyListDetails.durationMMM}
                                    </p>
                                  </div>
                                </Col>

                                <Col md={2}>
                                  <div>
                                    <span
                                      className={
                                        jobVacancyListDetails.statusString === "Rejected"
                                          ? "badge bg-danger text-light mb-2"
                                          : jobVacancyListDetails.statusString ===
                                            "Waiting Approval"
                                            ? "badge bg-warning text-light mb-2"
                                            : jobVacancyListDetails.statusString ===
                                              "In Progress"
                                              ? "badge bg-blue text-light mb-2"
                                              : jobVacancyListDetails.statusString ===
                                                "Expired"
                                                ? "badge bg-danger text-light mb-2"
                                                : jobVacancyListDetails.statusString ===
                                                  "Cancelled"
                                                  ? "badge bg-blue text-light mb-2"
                                                  : jobVacancyListDetails.statusString ===
                                                    "Closed"
                                                    ? "badge bg-gray text-light mb-2"
                                                    : jobVacancyListDetails.statusString ===
                                                      "Completed"
                                                      ? "badge bg-primary text-light mb-2"
                                                      : jobVacancyListDetails.statusString === "Saved"
                                                        ? "badge bg-teal text-light mb-2"
                                                        : ""
                                      }
                                    >
                                      {jobVacancyListDetails.statusString}
                                    </span>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                            <div className="p-3 bg-light">
                              <Row className="justify-content-between">
                                <Col md={10}>
                                  <div>
                                    <p className="text-muted mb-0 ">
                                      {jobVacancyListDetails.experience
                                        .split(",")
                                        .slice(
                                          0,
                                          showFullSkills[jobVacancyListDetails.id]
                                            ? undefined
                                            : 8
                                        )
                                        .map((skill, index) => (
                                          <span
                                            key={index}
                                            className={`badge ${index === 0
                                              ? "bg-info text-light"
                                              : index === 1
                                                ? "bg-danger-subtle text-danger"
                                                : "bg-primary-subtle text-primary"
                                              }  ms-2`}
                                          >
                                            {skill.trim()}
                                          </span>
                                        ))}

                                      {jobVacancyListDetails.experience.split(",").length >
                                        8 ? (
                                        <span className="badge bg-primary-subtle text-primary ms-2">
                                          ...
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </p>
                                  </div>
                                </Col>
                                <Col md={2}>
                                  <div>
                                    {jobVacancyListDetails.postedTime}
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </div>
                        ))}
                      </div>
                      {totalPages > 1 && (
                        <Row id="paging">
                          <Col lg={12} className="mt-4 pt-2">
                            <nav aria-label="Page navigation example">
                              <div className="pagination job-pagination mb-0 justify-content-center">
                                <li
                                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                                >
                                  <div
                                    className="page-link"
                                    tabIndex="-1"
                                    onClick={handlePrevPage}
                                  >
                                    <i className="mdi mdi-chevron-double-left fs-15"></i>
                                  </div>
                                </li>
                                {renderPageNumbers()}
                                <li
                                  className={`page-item ${currentPage === totalPages ? "disabled" : ""
                                    }`}
                                >
                                  <div className="page-link" onClick={handleNextPage}>
                                    <i className="mdi mdi-chevron-double-right fs-15"></i>
                                  </div>
                                </li>
                              </div>
                            </nav>
                          </Col>
                        </Row>
                      )}
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </div >
          </div >

        </CardBody >
      </div >
    </React.Fragment >
  );
};

export default ProjectDetailDesciption;

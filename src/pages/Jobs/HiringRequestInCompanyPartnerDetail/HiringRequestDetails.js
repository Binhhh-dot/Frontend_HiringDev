import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Modal,
  ModalBody,
  Input,
  Label,
  CardBody,
  Card,
  Button,
  Form,
  FormGroup,
  Nav,
  NavItem,
  NavLink,
  TabPane,
  TabContent,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import { Modal as AntdModal, Button as AntdButton } from "antd";
import { Container } from "reactstrap";
import DeveloperDetailInCompanyPopup from "../../Home/SubSection/DeveloperDetailInCompany";
import DeveloperDetailInManagerPopup from "../../Home/SubSection/DeveloperDetailInManager";
import ExtendDurationHiringRequestPopup from "../CreateHiringRequest/ExtendDurationHiringRequestPopup";
import { HashLoader } from "react-spinners";
import { Link, useLocation } from "react-router-dom";
import hiringrequestService from "../../../services/hiringrequest.service";
import userImage0 from "../../../assets/images/user/img-00.jpg";

import JobDetailImage from "../../../assets/images/job-detail.jpg";
import JobImage10 from "../../../assets/images/featured-job/img-10.png";
import { FaEye } from "react-icons/fa";
import { Progress } from "antd";

import "./index.css";
import developerServices from "../../../services/developer.services";
import interviewServices from "../../../services/interview.services";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classnames from "classnames";
import jobImage1 from "../../../assets/images/featured-job/img-01.png";
import img0 from "../../../assets/images/user/img-00.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisVertical,
  faGear,
  faEllipsis
} from "@fortawesome/free-solid-svg-icons";
import { DownOutlined, SkypeOutlined } from '@ant-design/icons';
import { Dropdown as DropdownAntd, Space } from 'antd';
import teamMeetingServices from "../../../services/teamMeeting.services";
import customUrl from "../../../utils/customUrl";
import { useNavigate } from "react-router-dom";
import { Empty } from 'antd';
import { fi } from "date-fns/locale";
import urlConstant from "../../../Common/urlConstant";
import hireddevServices from "../../../services/hireddev.services";
import projectServices from "../../../services/project.services";


const HiringRequestDetails = () => {
  //Apply Now Model
  const [candidategridDetails, setCandidategridDetails] = useState([]);
  const { state } = useLocation();
  const location = useLocation();
  const [modalEye, setModalEye] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [hiringRequestDetail, setHiringRequestDetail] = useState(null);
  const [projectDetail, setProjectDetail] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCandidateInfo, setSelectedCandidateInfo] = useState({});
  const [listInterview, setlistInterview] = useState([]);
  const [isHaveListInterview, setIsHaveListInterview] = useState(false);
  const [isHaveListDeveloper, setIsHaveListDeveloper] = useState(false);
  const [loadingButtons, setLoadingButtons] = useState({});
  const [loadingInterview, setLoadingInterview] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [loadingReject, setLoadingReject] = useState(false);
  const [loadingOnboard, setLoadingOnboard] = useState(false);
  const [isListLoading, setIsListLoading] = useState(false);
  const [isListLoading2, setIsListLoading2] = useState(false);
  const [modalCreateInterview, setModalCreateInterview] = useState(false);
  const [developerIdSelectedCreateInterview, setDeveloperIdSelectedCreateInterview] = useState(null);
  const [interviewTitlError, setInterviewTitlError] = useState(null);
  const [dateOfInterViewError, setDateOfInterViewError] = useState(null);
  const [timeStartError, setTimeStartError] = useState(null);
  const [timeEndError, setTimeEndError] = useState(null);
  const [desError, setDesError] = useState(null);
  const [interviewTitleUpdateError, setInterviewTitleUpdateError] = useState(null);
  const [dateOfInterViewUpdateError, setDateOfInterViewUpdateError] = useState(null);
  const [timeStartUpdateError, setTimeStartUpdateError] = useState(null);
  const [timeEndUpdateError, setTimeEndUpdateError] = useState(null);
  const [desUpdateError, setDesUpdateError] = useState(null);
  const [loadListDeveloper, setLoadListDeveloper] = useState(false);
  let [currentPageInterview, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 6;
  const [showPopup, setShowPopup] = useState(false);
  const [selectInterviewDetail, setSelectInterviewDetail] = useState({});
  const [devInterviewDetail, setDevInterviewDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isInputEditable, setIsInputEditable] = useState(false);
  const [interviewTitleInput, setInterviewTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [dateOfInterviewInput, setDateOfInterviewInput] = useState('');
  const [startTimeInput, setStartTimeInput] = useState('');
  const [endTimeInput, setEndTimeInput] = useState('');
  const [authenCode, setAuthencode] = useState(null);
  const [authenCodeCancel, setAuthenCodeCancel] = useState(null);
  const [authenCodeUpdate, setAuthenCodeUpdate] = useState(null);
  const [authenCodeOld, setAuthencodeOld] = useState(null);
  const [authenCodeCancelOld, setAuthenCodeCancelOld] = useState(null);
  const [authenCodeUpdateOld, setAuthenCodeUpdateOld] = useState(null);

  const [isUpdateInterview, setIsUpdateInterview] = useState(false);
  const [interviewIdCancel, setInterviewIdCancel] = useState(null);
  const [interviewIdUpdate, setInterviewIdUpdate] = useState(null);
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const today = new Date();
  today.setDate(today.getDate() + 1);
  const tomorrow = today.toISOString().split('T')[0];
  const navigate = useNavigate();
  const [isHaveReason, setIsHaveReason] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [selectedHiringRequestInfo, setSelectedHiringRequestInfo] = useState({});

  useState(() => {
    setMinDate(tomorrow); // Thiết lập giá trị minDate thành ngày kế tiếp
  }, []);


  const profileItems = [
    {
      label: (
        <div
          style={{ width: "100px" }}
          onClick={() => onUpdateInterview()}
        >
          Edit
        </div>
      ),
      key: '0',
    },
    {
      label: (
        <div
          style={{ width: "100px" }}
          onClick={() => {
            AntdModal.confirm({
              title: 'Confirm cancel interview',
              content: 'Are you sure to cancel this interview?',
              onOk() {
                // Action when the user clicks OK
                console.log('Confirmed!');
                openWindowCancelInterview(selectInterviewDetail.interviewId);
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
          Cancel
        </div>
      ),
      key: '1',
    },
  ]

  const profileItems2 = [
    {
      label: (
        <div
          style={{ width: "100px" }}
          onClick={() => {
            AntdModal.confirm({
              title: 'Confirm cancel interview',
              content: 'Are you sure to cancel this interview?',
              onOk() {
                // Action when the user clicks OK
                console.log('Confirmed!');
                openWindowCancelInterview(selectInterviewDetail.interviewId);
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
          Cancel
        </div>
      ),
      key: '1',
    },
  ]



  const profileItems3 = [
    {
      label: (
        <div
          style={{ width: "100px" }}
          onClick={() => {
            AntdModal.confirm({
              content: (
                <div style={{ paddingRight: "20px" }}>
                  <p>Please provide a reason for closing this hiring request:</p>
                  <input
                    type="textarea"
                    id="reasonCloseHiringRequest"
                  />
                  <Input
                    type="textarea"
                    className="form-control"
                    id="description"
                    style={{ height: 100 }}
                  />
                </div>
              ),
              onOk() {
                const reason = document.getElementById("reasonCloseHiringRequest").value.trim();
                console.log(reason);
                if (reason != "") {
                  console.log(reason);
                  // Thực hiện hành động khi người dùng nhập lý do và ấn OK ở đây
                  closeHiringRequest(reason);
                } else {
                  toast.error("Please provide your reason close this hiring request")
                  // Hiển thị thông báo yêu cầu người dùng nhập lý do
                }
              },
              onCancel() {
                console.log('Cancelled!');
                // Thực hiện hành động khi người dùng hủy bỏ ở đây (nếu cần)
              },
              okButtonProps: {
                style: { marginRight: '20px' },
              },
            });
          }}
        >
          Close
        </div>
      ),
      key: '1',
    },
    {
      label: (
        <div
          style={{ width: "100px" }}
          onClick={() => cloneHiringRequest()}
        >
          Clone
        </div>
      ),
      key: '2',
    },

    {
      label: (
        <div
          style={{ width: "100px" }}
          onClick={() => {
            openModalCreateHiringrequest();
          }}
        >
          Extend duration
        </div>
      ),
      key: '3',
    },

  ]

  const profileItems4 = [
    {
      label: (
        <div
          style={{ width: "100px" }}
          onClick={() => {
            AntdModal.confirm({
              content: (
                <div style={{ paddingRight: "20px" }}>
                  <p>Please provide a reason for closing this hiring request:</p>
                  <Input
                    type="textarea"
                    className="form-control"
                    id="reasonCloseHiringRequest"
                    style={{ height: 100 }}
                  />
                </div>
              ),
              onOk() {
                const reason = document.getElementById("reasonCloseHiringRequest").value.trim();
                console.log(reason);
                if (reason != "") {
                  console.log(reason);
                  // Thực hiện hành động khi người dùng nhập lý do và ấn OK ở đây
                  closeHiringRequest(reason);
                } else {
                  toast.error("Please provide your reason close this hiring request")
                  // Hiển thị thông báo yêu cầu người dùng nhập lý do
                }
              },
              onCancel() {
                console.log('Cancelled!');
                // Thực hiện hành động khi người dùng hủy bỏ ở đây (nếu cần)
              },
              okButtonProps: {
                style: { marginRight: '20px' },
              },
            });
          }}
        >
          Close
        </div>
      ),
      key: '1',
    },
    {
      label: (
        <div
          style={{ width: "100px" }}
          onClick={() => cloneHiringRequest()}
        >
          Clone
        </div>
      ),
      key: '2',
    },
  ]

  const profileItems5 = [
    {
      label: (
        <div
          style={{ width: "100px" }}
          onClick={() => cloneHiringRequest()}
        >
          Clone
        </div>
      ),
      key: '2',
    },
  ]

  const profileItems6 = [
    {
      label: (
        <div
          style={{ width: "100px" }}
          onClick={() => cloneHiringRequest()}
        >
          Clone
        </div>
      ),
      key: '2',
    },
    {
      label: (
        <div
          style={{ width: "100px" }}
          onClick={() => {
            openModalCreateHiringrequest();
          }}
        >
          Extend duration
        </div>
      ),
      key: '3',
    },
  ]


  const openModalCreateInterview = (developerId) => {
    setInterviewTitlError(null);
    setDateOfInterViewError(null);
    setTimeStartError(null);
    setTimeEndError(null);
    setDesError(null);
    setModalCreateInterview(!modalCreateInterview);
    setDeveloperIdSelectedCreateInterview(developerId);
  }

  const openModal = (candidateInfo) => {
    setSelectedCandidateInfo(candidateInfo);
    setIsModalOpen(true);
  };

  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const completedInterview = async (interviewId) => {
    setLoading(true);
    try {
      const response = await interviewServices.completedInterview(interviewId);
      setShowPopup(false)
      setLoadListDeveloper(!loadListDeveloper);
      setLoading(false);
      toast.success("Complete interview successfuly")
      console.log(response);
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.error("Error completedInterview:", error);
      setLoading(false);

    }
  };

  const openSkype = async (linkMeeting) => {
    window.open(linkMeeting, '_blank');
  };

  const updateInterview = async (interviewId) => {
    let check = true;
    if (!document.getElementById("interview-title-popup").value) {
      setInterviewTitleUpdateError("Please enter a interview title");
      check = false;
    } else {
      setInterviewTitleUpdateError(null);
    }
    if (!document.getElementById("description-title-popup").value) {
      setDesUpdateError("Please enter a description");
      check = false;
    } else {
      setDesUpdateError(null);
    }
    if (!document.getElementById("date-of-interview-popup").value) {
      setDateOfInterViewUpdateError("Please enter a date of interview");
      check = false;
    } else {
      setDateOfInterViewUpdateError(null);
      console.log(document.getElementById("date-of-interview-popup").value)
    }
    if (!document.getElementById("start-time-popup").value) {
      setTimeStartUpdateError("Please enter the start time of the interview ");
      check = false;
    } else {
      setTimeStartUpdateError(null);
    }
    if (!document.getElementById("end-time-popup").value) {
      setTimeEndUpdateError("Please enter the end time of the interview");
      check = false;
    } else {
      setTimeEndUpdateError(null);
    }
    if (document.getElementById("date-of-interview-popup").value) {
      const currentDate = new Date();
      const selectedDate = new Date(
        document.getElementById("date-of-interview-popup").value
      );

      if (selectedDate <= currentDate) {
        setDateOfInterViewUpdateError(
          "Please enter a date greater than the current date"
        );
        check = false;
      } else {
        setDateOfInterViewUpdateError(null);
      }
    }

    if (
      document.getElementById("end-time-popup").value &&
      document.getElementById("start-time-popup").value &&
      document.getElementById("start-time-popup") !==
      document.getElementById("end-time-popup").value
    ) {
      const startTimeDate = new Date(
        "1970-01-01T" + document.getElementById("start-time-popup").value + "Z"
      );
      const endTimeDate = new Date(
        "1970-01-01T" + document.getElementById("end-time-popup").value + "Z"
      );
      if (startTimeDate > endTimeDate) {
        // Hiển thị thông báo lỗi
        setTimeStartUpdateError("Start Time must be before End Time");
        // Cập nhật DOM để hiển thị thông báo
        check = false;
      } else {
        setTimeStartUpdateError(null);
      }
    }
    if (check) {
      openWindowUpdateInterview(interviewId);
    }
  };

  const exitPopup = () => {
    document.getElementById('buttonSaveFormInterview').style.display = 'none';
    document.getElementById('buttonCancelFormInterview').style.display = 'none';
    setIsInputEditable(false)
  };

  const cancelEditInterview = (id) => {
    setInterviewTitleUpdateError(null);
    setDesUpdateError(null);
    setDateOfInterViewUpdateError(null);
    setTimeStartUpdateError(null);
    setTimeEndUpdateError(null);
    document.getElementById('buttonSaveFormInterview').style.display = 'none';
    document.getElementById('buttonCancelFormInterview').style.display = 'none';
    fetchGetDetailInterviewByInterviewId(id);
    setIsInputEditable(false)
  };

  const closeModal = () => {
    setSelectedCandidateInfo({});
    setIsModalOpen(false);
  };
  const openEyeModal = () => {
    setModalEye(!modalEye);
  };


  const fetchJobVacancies = async () => {
    try {
      const queryParams = new URLSearchParams(location.search);
      const jobId = queryParams.get("Id");
      const response = await hireddevServices.getListDeveloperInRequestByRequestId(jobId);
      const data = response.data;
      const candidategridDetails = data.data.map((dev) => {
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
          averagedPercentage: dev.averagedPercentage.toFixed(2),
          selectedDevStatus: dev.hiredDeveloperStatus,
          interviewRound: dev.interviewRound,
          typeMatching: dev.typeMatching,
          levelMatching: dev.levelMatching,
          salaryPerDevPercentage: dev.salaryPerDevPercentage,
          skillPercentage: dev.skillPercentage,
          yearOfExperience: dev.yearOfExperience
        };
      });
      setCandidategridDetails(candidategridDetails);
      if (candidategridDetails.length > 0) {
        setIsHaveListDeveloper(true)
      } else {
        setIsHaveListDeveloper(false)
      }
    } catch (error) {
      console.error("Error fetching job vacancies:", error);
    }
  };



  const fetchHiringRequestDetailInCompany = async () => {
    let response;
    // const saveData = localStorage.getItem("myData");
    try {
      const queryParams = new URLSearchParams(location.search);
      const jobId = queryParams.get("Id");
      response = await hiringrequestService.getHiringRequestDetailInCompany(
        jobId
      );
      console.log(response)
      if (response.data.code == "200") {
        const projectId = response.data.data.projectId;
        fetchProjectDetail(projectId);
      }
      setHiringRequestDetail(response.data.data);

      var parts2 = response.data.data.duration.split('-');
      if (parts2.length === 3) {
        var day = parts2[1];
        var month = parts2[0];
        var year = parts2[2];
        // Format the date as "yyyy-dd-mm"
        var formattedDurationEndDay = year + '-' + day + '-' + month;
        setMaxDate(formattedDurationEndDay)
      } else {
        console.error("Invalid date format");
      }

      return response;
    } catch (error) {
      console.error("Error fetching job vacancies:", error);
    }
  };

  const fetchProjectDetail = async (projectId) => {
    let response;
    // const saveData = localStorage.getItem("myData");
    try {
      response = await projectServices.getProjectDetailByProjectId(
        projectId
      );
      console.log(response);
      document.getElementById("projectNameOverview").innerHTML = response.data.data.projectName;
      document.getElementById("projectTypeOverview").innerHTML = response.data.data.projectTypeName;
      document.getElementById("startDayOverview").innerHTML = response.data.data.startDateMMM;
      document.getElementById("endDayOverview").innerHTML = response.data.data.endDateMMM;
      return response;
    } catch (error) {
      console.error("Error fetching job vacancies:", error);
    }
  };

  const fetchListInterview = async () => {
    let response;
    const queryParams = new URLSearchParams(location.search);
    const requestId = queryParams.get("Id");
    const companyId = localStorage.getItem('companyId');
    try {
      response = await interviewServices.getListInterviewByRequestId(
        requestId,
      );
      const data = response.data;
      const formattedJobVacancies = data.data.map((job) => {
        // Assuming job.typeRequireName and job.levelRequireName are available
        return {
          interviewId: job.interviewId,
          requestId: job.requestId,
          title: job.title,
          interviewerName: job.interviewerName,
          assignStaffName: job.assignStaffName,
          dateOfInterview: job.dateOfInterview,
          postedTime: job.postedTime,
          startTime: job.startTime,
          endTime: job.endTime,
          statusString: job.statusString,
          addclassNameBookmark: true,
          description: job.description.length > 70 ? job.description.substring(0, 70).trim() + "..." : job.description,
        };
      });
      setlistInterview(formattedJobVacancies);
      if (formattedJobVacancies.length > 0) {
        setIsHaveListInterview(true)
      } else {
        setIsHaveListInterview(false)
      }
    } catch (error) {
      console.error("Error fetching job vacancies:", error);
    }
  };

  useEffect(() => {
    fetchHiringRequestDetailInCompany();
    fetchJobVacancies();
    fetchListInterview();
  }, []);

  useEffect(() => {
    fetchHiringRequestDetailInCompany();
    fetchJobVacancies();
    fetchListInterview();
  }, [isModalCreateOpen]);

  const handleInterviewCreation = async () => {
    setLoading(true);
    try {
      const title = document.getElementById("interview-title").value;
      const description = document.getElementById("description").value;
      const dateOfInterview =
        document.getElementById("date-of-interview").value;

      const startTime = document.getElementById("startTime").value + ":00";
      console.log(startTime);
      const endTime = document.getElementById("endTime").value + ":00";
      const queryParams = new URLSearchParams(location.search);
      const requestId = queryParams.get("Id");
      const developerId = developerIdSelectedCreateInterview;
      const response = await interviewServices.createAnInterview(
        requestId,
        developerId,
        title,
        description,
        dateOfInterview,
        startTime,
        endTime
      );
      let interviewId = response.data.data.interviewId;
      console.log("tao interview")
      console.log(response)
      if (response.data.code == 201) {
        console.log("tao thanh cong")
        try {
          const redirectUrl = customUrl.redirectUrlCreateMeetting;
          const responseCreateMeeting = await teamMeetingServices.createTeamMeeting(interviewId, redirectUrl, authenCode)
          console.log(responseCreateMeeting)
          console.log("tao meet thanh cong")
          toast.success('Create successfully!');
        } catch (error) {
          console.log("tao meet ko thanh cong")
          console.log("error:", error)
        }
      }
      setLoadListDeveloper(!loadListDeveloper);
      setModalCreateInterview(false);
      setAuthencodeOld(authenCode);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching job vacancies:", error);
      setLoading(false);
    }
  };

  const handleCancelInterview = async () => {
    console.log("nhay do")
    setLoading(true);
    try {
      const interviewId = interviewIdCancel;
      console.log(interviewId);
      console.log("nhay do")
      const redirectUrl = customUrl.redirectUrlCreateMeetting;
      console.log(interviewId);
      console.log(redirectUrl);
      console.log(authenCodeCancel);
      const responseCancelMeeting = await teamMeetingServices.deleteTeamMeeting(interviewId, redirectUrl, authenCodeCancel)
      console.log("responseCancelMeeting")
      console.log(responseCancelMeeting)
      if (responseCancelMeeting.status == 200) {
        try {
          const response = await interviewServices.cancelInterview(interviewId);
          console.log(response)
          toast.success('Cancel successfully!');
        } catch (error) {
          console.log("error:", error)
        }
      }
      setModalCreateInterview(false);
      setShowPopup(false);
      exitPopup();
      setLoadListDeveloper(!loadListDeveloper);
      setAuthenCodeCancelOld(authenCodeCancel);
      setLoading(false);
    } catch (error) {
      console.error("Error delete metting", error);
      setLoading(false);
    }
  };

  const handleUpdateInterview = async () => {
    console.log("chui do dc day ")
    setLoading(true);
    const interviewId = interviewIdUpdate;
    let interviewSave;
    try {
      interviewSave = await interviewServices.getDetailInterviewByInterviewId(interviewId);
      console.log(interviewSave.data.data);
      const title = document.getElementById("interview-title-popup").value;
      const description = document.getElementById("description-title-popup").value;
      const dateOfInterview = document.getElementById("date-of-interview-popup").value;
      const startDate = document.getElementById("start-time-popup").value + ":00";
      const endDate = document.getElementById("end-time-popup").value + ":00";
      const response = await interviewServices.updateInterview(interviewId, title, description, dateOfInterview, startDate, endDate);
      console.log("api update :")
      console.log(response);
      if (response?.status === 200) {
        try {
          const redirectUrl = customUrl.redirectUrlCreateMeetting;
          console.log(interviewId);
          console.log(redirectUrl);
          console.log(authenCodeUpdate);
          const response = await teamMeetingServices.editTeamMeeting(interviewId, redirectUrl, authenCodeUpdate);
          console.log(response)
          setIsUpdateInterview(!isUpdateInterview);
          setLoadListDeveloper(!loadListDeveloper);
          setShowPopup(false);
          exitPopup();
          toast.success('Update interview successfully!');
          setAuthenCodeUpdateOld(authenCodeUpdate);
          setModalCreateInterview(false);
          setLoading(false);
        } catch (error) {
          console.log("error meeting:", error)
          const titleSave = interviewSave.data.data.title;
          const descriptionSave = interviewSave.data.data.description;
          const dateOfInterviewSave = interviewSave.data.data.dateOfInterview.split('-').reverse().join('-');
          const startDateSave = interviewSave.data.data.startTime + ":00";
          const endDateSave = interviewSave.data.data.endTime + ":00";
          const response = await interviewServices.updateInterview(interviewId, titleSave, descriptionSave, dateOfInterviewSave, startDateSave, endDateSave);
          console.log("update lai cai bi sua :")
          console.log(response);
          toast.success('Update interview fail, please check your account microsoft!');
          setIsUpdateInterview(!isUpdateInterview);
          setLoadListDeveloper(!loadListDeveloper);
          setAuthenCodeUpdateOld(authenCodeUpdate);
          setModalCreateInterview(false);
          setShowPopup(false);
          exitPopup();
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error completedInterview:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authenCode == authenCodeOld) {
      console.log("lap lai")
      setLoading(false);
    } else {
      handleInterviewCreation();
    }
  }, [authenCode]);

  useEffect(() => {
    if (authenCodeCancel == authenCodeCancelOld) {
      console.log("lap lai")
      setLoading(false);
    } else {
      handleCancelInterview();
    }
  }, [authenCodeCancel]);

  useEffect(() => {
    if (authenCodeUpdate == authenCodeUpdateOld) {
      console.log("lap lai")
      setLoading(false);
    } else {
      handleUpdateInterview();
    }
  }, [authenCodeUpdate]);

  useEffect(() => {
    fetchHiringRequestDetailInCompany();
    fetchJobVacancies();
    fetchListInterview();
  }, [loadListDeveloper]);


  useEffect(() => {
    fetchListInterview();
  }, [currentPageInterview]);

  useEffect(() => {
    fetchListInterview();
  }, [isUpdateInterview]);

  const [showItems, setShowItems] = useState(5);
  const listInterviewArray = Object.values(listInterview);
  const listInterviewToShow = listInterviewArray.slice(0, showItems);
  const showAll = listInterviewArray.length > 5;
  if (!hiringRequestDetail) {
    return null;
  }

  const handleInterviewClick = async (id) => {
    setLoadingInterview((prevLoading) => ({
      ...prevLoading,
      [id]: true,
    }));
    setLoadingReject((prevLoading) => ({
      ...prevLoading,
      [id]: true,
    }));
    try {
      // Sử dụng giá trị từ state hoặc DOM
      const queryParams = new URLSearchParams(location.search);
      const requestId = queryParams.get("Id");
      const isApproved = true;

      // Gọi API để reject interview
      const response = await developerServices.approvalInterviewByHR(
        requestId,
        id,
        isApproved
      );
      setIsListLoading(true);

      // Xử lý kết quả nếu cần thiết
      console.log("API Response:", response);

      fetchJobVacancies();
      setIsListLoading(false);

      // Cập nhật giao diện hoặc thực hiện các hành động khác sau khi reject thành công
      // Ví dụ: Ẩn nút hoặc cập nhật trạng thái
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Error rejecting interview:", error);
      // Hiển thị thông báo lỗi hoặc thực hiện các hành động khác
    }
    // Simulate an asynchronous action, e.g., making an API request
    // After the action is completed, you can update the state
    setLoadingInterview((prevLoading) => ({
      ...prevLoading,
      [id]: false,
    }));
    setLoadingReject((prevLoading) => ({
      ...prevLoading,
      [id]: false,
    }));
    // Replace with the actual duration of your action
  };

  const rejectInterview2 = async (id) => {
    // Simulate an asynchronous action, e.g., making an API request
    setLoadingReject((prevLoading) => ({
      ...prevLoading,
      [id]: true,
    }));
    setLoadingInterview((prevLoading) => ({
      ...prevLoading,
      [id]: true,
    }));
    try {
      // Sử dụng giá trị từ state hoặc DOM
      const queryParams = new URLSearchParams(location.search);
      const requestId = queryParams.get("Id");
      // Gọi API để reject interview
      const response = await hireddevServices.rejectSelectedDev(requestId, id);
      fetchJobVacancies();
      fetchListInterview();
      setIsListLoading(true);
      // Xử lý kết quả nếu cần thiết
      // Cập nhật giao diện hoặc thực hiện các hành động khác sau khi reject thành công
      // Ví dụ: Ẩn nút hoặc cập nhật trạng thái
      setIsListLoading(false);
      toast.success("Reject developer sucessfully")
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Error rejecting interview:", error);
      // Hiển thị thông báo lỗi hoặc thực hiện các hành động khác
      setLoadingReject((prevLoading) => ({
        ...prevLoading,
        [id]: false,
      }));
      setLoadingInterview((prevLoading) => ({
        ...prevLoading,
        [id]: false,
      }));
      toast.success("Reject developer fail")
    }
    // Simulate an asynchronous action, e.g., making an API request

    // After the action is completed, you can update the state
    // Replace with the actual duration of your action
  };

  const handleOnboard = async (id) => {
    setLoadingOnboard((prevLoading) => ({
      ...prevLoading,
      [id]: true,
    }));
    try {
      // Sử dụng giá trị từ state hoặc DOM
      const queryParams = new URLSearchParams(location.search);
      const requestId = queryParams.get("Id");

      const state = {
        requestId: requestId,
        developerId: id
      };
      navigate("/laborSubleasingAgreement", { state });
      // Gọi API để reject interview
      // const response = await developerServices.onbardingDeveloper(requestId, id);
      setIsListLoading2(true);
      // Xử lý kết quả nếu cần thiết
      // fetchJobVacancies();
      // Cập nhật giao diện hoặc thực hiện các hành động khác sau khi reject thành công
      // Ví dụ: Ẩn nút hoặc cập nhật trạng thái
      setIsListLoading2(false);
      setLoadingReject((prevLoading) => ({
        ...prevLoading,
        [id]: false,
      }));
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Error rejecting interview:", error);
      // Hiển thị thông báo lỗi hoặc thực hiện các hành động khác
      setLoadingOnboard((prevLoading) => ({
        ...prevLoading,
        [id]: false,
      }));
    }
    // Simulate an asynchronous action, e.g., making an API request

    // After the action is completed, you can update the state
    // Replace with the actual duration of your action
  };

  const createAnInterview = async () => {
    let check = true;
    if (!document.getElementById("interview-title").value) {
      setInterviewTitlError("Please enter a interview title");
      check = false;
    } else {
      setInterviewTitlError(null);
    }
    if (!document.getElementById("description").value) {
      setDesError("Please enter a description");
      check = false;
    } else {
      setDesError(null);
    }
    if (!document.getElementById("date-of-interview").value) {
      console.log(document.getElementById("date-of-interview").value)
      setDateOfInterViewError("Please enter a date of interview");
      check = false;
    } else {
      setDateOfInterViewError(null);
      console.log(document.getElementById("date-of-interview").value)
    }
    if (!document.getElementById("startTime").value) {
      setTimeStartError("Please enter the start time of the interview ");
      check = false;
    } else {
      setTimeStartError(null);
    }
    if (!document.getElementById("endTime").value) {
      setTimeEndError("Please enter the end time of the interview");
      check = false;
    } else {
      setTimeEndError(null);
    }
    if (document.getElementById("date-of-interview").value) {
      const currentDate = new Date();
      const selectedDate = new Date(
        document.getElementById("date-of-interview").value
      );

      if (selectedDate <= currentDate) {
        setDateOfInterViewError(
          "Please enter a date greater than the current date"
        );
        check = false;
      } else {
        setDateOfInterViewError(null);
      }
    }

    if (
      document.getElementById("endTime").value &&
      document.getElementById("startTime").value &&
      document.getElementById("startTime") !==
      document.getElementById("endTime").value
    ) {
      const startTimeDate = new Date(
        "1970-01-01T" + document.getElementById("startTime").value + "Z"
      );
      const endTimeDate = new Date(
        "1970-01-01T" + document.getElementById("endTime").value + "Z"
      );
      if (startTimeDate > endTimeDate) {
        // Hiển thị thông báo lỗi
        setTimeStartError("Start Time must be before End Time");
        // Cập nhật DOM để hiển thị thông báo
        check = false;
      } else {
        setTimeStartError(null);
      }
    }
    let checkCreateInterview = false;
    let code;
    if (check) {
      setLoading(true);
      const windowFeatures = 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=800, height=800, top=100, left=600';
      const urlCreateInterview = customUrl.urlCreateInterview;
      const popupWindow = window.open(urlCreateInterview, "popupWindow", windowFeatures);




      // Lắng nghe các thông điệp từ cửa sổ popup
      window.addEventListener('message', (event) => {
        code = event.data;
        // Kiểm tra nếu nhận được thông điệp "Signout", đóng cửa sổ popup
        if (code) {
          setLoading(true);
          checkCreateInterview = true;
          popupWindow.close();
          console.log(event.data)
          setAuthencode(event.data)
        }
      });

      function checkPopupStatus() {
        if (popupWindow && popupWindow.closed) {
          console.log("Cửa sổ đã đóng");
          if (!checkCreateInterview) {
            setLoading(false);
          }
          clearInterval(intervalId);
        } else {
          console.log("Cửa sổ đang mở");
        }
      }
      const intervalId = setInterval(checkPopupStatus, 1000);

    }
  };


  const openWindowCancelInterview = async (interviewId) => {
    setLoading(true);
    const windowFeatures = 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=800, height=800, top=100, left=600';

    const urlCreateInterview = customUrl.urlCreateInterview;
    const popupWindow = window.open(urlCreateInterview, "popupWindow", windowFeatures);

    let code;
    let checkCreateInterview = false;

    window.addEventListener('message', (event) => {
      code = event.data;
      // Kiểm tra nếu nhận được thông điệp "Signout", đóng cửa sổ popup
      if (code) {
        checkCreateInterview = true;
        popupWindow.close();
        setLoading(true);
        console.log(event.data)
        setAuthenCodeCancel(event.data)
        setInterviewIdCancel(interviewId)
      }
    });

    function checkPopupStatus() {
      if (popupWindow && popupWindow.closed) {
        console.log("Cửa sổ đã đóng");
        clearInterval(intervalId);
        if (!checkCreateInterview) {
          setLoading(false);
        }
      } else {
        console.log("Cửa sổ đang mở");
      }
    }
    const intervalId = setInterval(checkPopupStatus, 1000);

    // Lắng nghe các thông điệp từ cửa sổ popup

  };

  const openWindowUpdateInterview = async (interviewId) => {
    setLoading(true)
    const windowFeatures = 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=800, height=800, top=100, left=600';

    const urlCreateInterview = customUrl.urlCreateInterview;
    const popupWindow = window.open(urlCreateInterview, "popupWindow", windowFeatures);

    let code;
    let checkCreateInterview = false;

    window.addEventListener('message', (event) => {
      code = event.data;
      // Kiểm tra nếu nhận được thông điệp "Signout", đóng cửa sổ popup
      if (code) {
        checkCreateInterview = true;
        setShowPopup(false);
        exitPopup();
        popupWindow.close();
        console.log(event.data);
        setAuthenCodeUpdate(event.data)
        setInterviewIdUpdate(interviewId)
        setLoading(true);
      }
    });
    function checkPopupStatus() {
      if (popupWindow && popupWindow.closed) {
        console.log("Cửa sổ đã đóng");
        clearInterval(intervalId);
        if (!checkCreateInterview) {
          setLoading(false)
        }
      } else {
        console.log("Cửa sổ đang mở");
      }
    }
    const intervalId = setInterval(checkPopupStatus, 1000);

    // Lắng nghe các thông điệp từ cửa sổ popup
    // setLoading(true);
  };

  const midleSelect = (id) => {
    setInterviewTitleUpdateError(null);
    setDesUpdateError(null);
    setDateOfInterViewUpdateError(null);
    setTimeStartUpdateError(null);
    setTimeEndUpdateError(null);
    fetchGetDetailInterviewByInterviewId(id);
    setShowPopup(true);
  };


  const onUpdateInterview = () => {
    document.getElementById('buttonSaveFormInterview').style.display = 'block';
    document.getElementById('buttonCancelFormInterview').style.display = 'block';
    setIsInputEditable(true);
  };

  const closeHiringRequest = async (reason) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams(location.search);
      const requestId = queryParams.get("Id");
      const isCompanyPartner = true;
      const response = await hiringrequestService.closeHiringRequest(requestId,
        reason,
        isCompanyPartner);
      console.log(response)
      setLoadListDeveloper(!loadListDeveloper);
      setLoading(false);
      toast.success("Close hiring request sucessfully")
    } catch (error) {
      setLoading(false);
      toast.error("Close hiring request fail")
      console.log(error)
    }
  };

  const extendDuration = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams(location.search);
      const requestId = queryParams.get("Id");
      const isCompanyPartner = true;
      const response = await hiringrequestService.closeHiringRequest(requestId,

        isCompanyPartner);
      console.log(response)
      setLoadListDeveloper(!loadListDeveloper);
      setLoading(false);
      toast.success("Close hiring request sucessfully")
    } catch (error) {
      setLoading(false);
      toast.error("Close hiring request fail")
      console.log(error)
    }
  };

  const cloneHiringRequest = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams(location.search);
      const requestId = queryParams.get("Id");
      const response = await hiringrequestService.cloneHiringRequest(requestId);
      setLoadListDeveloper(!loadListDeveloper);
      setLoading(false);
      const projectId = response.data.data.projectId;
      toast.success("Clone hiring request sucessfully")
      navigate("/projectdetailhr?Id=" + projectId);
    } catch (error) {
      setLoading(false);
      toast.error("Clone hiring request fail")
      console.log(error)
    }
  };



  const cancelInterview = async (interviewId) => {
    try {
      console.log(interviewId);
      const response = await interviewServices.cancelInterview(interviewId);
      toast.success("Cancel sucessfully")
    } catch (error) {
      toast.success("Cancel error")
      console.log(error)
    }
  };

  const fetchGetDetailInterviewByInterviewId = async (id) => {
    let response;
    try {
      response = await interviewServices.getDetailInterviewByInterviewId(
        id
      );
      document.getElementById("interview-title-popup").value = response.data.data.title;
      setInterviewTitleInput(response.data.data.title);
      document.getElementById("description-title-popup").value = response.data.data.description;
      setDescriptionInput(response.data.data.description);
      var parts = response.data.data.dateOfInterview.split('-');
      if (parts.length === 3) {
        var day = parts[1];
        var month = parts[0];
        var year = parts[2];
        // Format the date as "yyyy-dd-mm"
        var formattedDate = year + '-' + day + '-' + month;
        document.getElementById("date-of-interview-popup").value = formattedDate;
        setDateOfInterviewInput(formattedDate);
      } else {
        console.error("Invalid date format");
      }
      document.getElementById("start-time-popup").value = response.data.data.startTime;
      setStartTimeInput(response.data.data.startTime);
      document.getElementById("end-time-popup").value = response.data.data.endTime;
      setEndTimeInput(response.data.data.endTime);
      setSelectInterviewDetail(response.data.data);
      setDevInterviewDetail(response.data.data.developer);
    } catch (error) {
      console.error("Error fetching interview detail in manager list :", error);
    }
  };

  const closeModalCreateHiringRequest = () => {
    setSelectedHiringRequestInfo(null);
    setIsModalCreateOpen(false);
  };

  const openModalCreateHiringrequest = () => {
    const queryParams = new URLSearchParams(location.search);
    const requestId = queryParams.get("Id");
    setSelectedHiringRequestInfo(requestId);
    setIsModalCreateOpen(true);
  };

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

  return (
    <React.Fragment>
      {loading && (
        <div className="overlay" style={{ zIndex: "2000" }}>
          <div className="spinner"></div>
        </div>
      )}
      <section class="section">

        <div class="row justify-content-center " style={{ margin: "0px" }}>
          {hiringRequestDetail.rejectionReason && (
            <>
              <div className="col-lg-11" style={{ paddingLeft: "0px", paddingRight: "12px" }}>
                <div className=" alert alert-danger mt-2" role="alert">
                  {hiringRequestDetail.rejectionReason}
                </div>
              </div>
            </>
          )}
          <div class="col-lg-8 " style={{ padding: "0px" }}>
            <Card className="job-detail overflow-hidden" style={{ minHeight: "807px" }}>
              <div>
                <div style={{ position: "relative", display: "inline-block", width: "100%" }}>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/fuprojectteammanagement.appspot.com/o/vivid-blurred-colorful-background.jpg?alt=media&token=dd0ed801-1438-4d7a-af45-98906b7bf882"
                    alt=""
                    className="img-fluid"
                    style={{ width: "100%", height: "200px", objectFit: "cover" }}
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
                <div>
                  <Row>
                    <Col md={8}>
                      <h4 className="mb-1">{hiringRequestDetail.jobTitle}</h4>
                    </Col>
                    <Col lg={4} className="d-flex justify-content-end gap-3">
                      <ul className="list-inline mb-0 text-lg-end mt-3 mt-lg-0">
                        <li>
                          <span
                            className={
                              hiringRequestDetail.statusString === "Rejected"
                                ? "badge bg-danger text-light mb-2"
                                : hiringRequestDetail.statusString ===
                                  "Waiting Approval"
                                  ? "badge bg-warning text-light mb-2"
                                  : hiringRequestDetail.statusString ===
                                    "In Progress"
                                    ? "badge bg-blue text-light mb-2"
                                    : hiringRequestDetail.statusString ===
                                      "Expired"
                                      ? "badge bg-danger text-light mb-2"
                                      : hiringRequestDetail.statusString ===
                                        "Cancelled"
                                        ? "badge bg-blue text-light mb-2"
                                        : hiringRequestDetail.statusString ===
                                          "Finished"
                                          ? "badge bg-primary text-light mb-2"
                                          : hiringRequestDetail.statusString ===
                                            "Completed"
                                            ? "badge bg-primary text-light mb-2"
                                            : hiringRequestDetail.statusString === "Closed"
                                              ? "badge bg-teal text-light mb-2"
                                              : ""
                            }
                          >
                            {hiringRequestDetail.statusString}
                          </span>{" "}
                        </li>
                      </ul>
                      {hiringRequestDetail.statusString == "Expired" && (
                        <>
                          <DropdownAntd trigger={['click']} menu={{ items: profileItems6 }}>
                            <a style={{ height: "max-content" }} onClick={(e) => e.preventDefault()}>
                              <FontAwesomeIcon icon={faGear} size="xl" color="#909191" />
                            </a>
                          </DropdownAntd>
                        </>
                      )}
                      {hiringRequestDetail.statusString == "Rejected" && (
                        <>
                          <DropdownAntd trigger={['click']} menu={{ items: profileItems5 }}>
                            <a style={{ height: "max-content" }} onClick={(e) => e.preventDefault()}>
                              <FontAwesomeIcon icon={faGear} size="xl" color="#909191" />
                            </a>
                          </DropdownAntd>
                        </>
                      )}
                      {hiringRequestDetail.statusString == "Waiting Approval" && (
                        <>
                          <DropdownAntd trigger={['click']} menu={{ items: profileItems4 }}>
                            <a style={{ height: "max-content" }} onClick={(e) => e.preventDefault()}>
                              <FontAwesomeIcon icon={faGear} size="xl" color="#909191" />
                            </a>
                          </DropdownAntd>
                        </>
                      )}
                      {hiringRequestDetail.statusString == "In Progress" && (
                        <>
                          <DropdownAntd trigger={['click']} menu={{ items: profileItems4 }}>
                            <a style={{ height: "max-content" }} onClick={(e) => e.preventDefault()}>
                              <FontAwesomeIcon icon={faGear} size="xl" color="#909191" />
                            </a>
                          </DropdownAntd>
                        </>
                      )}
                      {hiringRequestDetail.statusString == "Cancelled" && (
                        <>
                          <DropdownAntd trigger={['click']} menu={{ items: profileItems5 }}>
                            <a style={{ height: "max-content" }} onClick={(e) => e.preventDefault()}>
                              <FontAwesomeIcon icon={faGear} size="xl" color="#909191" />
                            </a>
                          </DropdownAntd>
                        </>
                      )}
                      {hiringRequestDetail.statusString == "Finished" && (
                        <>
                          <DropdownAntd trigger={['click']} menu={{ items: profileItems5 }}>
                            <a style={{ height: "max-content" }} onClick={(e) => e.preventDefault()}>
                              <FontAwesomeIcon icon={faGear} size="xl" color="#909191" />
                            </a>
                          </DropdownAntd>
                        </>
                      )}
                      {hiringRequestDetail.statusString == "Completed" && (
                        <>
                          <DropdownAntd trigger={['click']} menu={{ items: profileItems5 }}>
                            <a style={{ height: "max-content" }} onClick={(e) => e.preventDefault()}>
                              <FontAwesomeIcon icon={faGear} size="xl" color="#909191" />
                            </a>
                          </DropdownAntd>
                        </>
                      )}
                      {hiringRequestDetail.statusString == "Closed" && (
                        <>
                          <DropdownAntd trigger={['click']} menu={{ items: profileItems5 }}>
                            <a style={{ height: "max-content" }} onClick={(e) => e.preventDefault()}>
                              <FontAwesomeIcon icon={faGear} size="xl" color="#909191" />
                            </a>
                          </DropdownAntd>
                        </>
                      )}
                    </Col>
                  </Row>
                </div>

                <div className="mt-4">
                  <Row className="g-2 ">
                    <Col lg={3} className="border p-3">
                      <div className="rounded-start ">
                        <p className="text-muted mb-0 fs-13">
                          Type Of Developer
                        </p>
                        <p className="fw-medium badge bg-info text-light mb-0">
                          {hiringRequestDetail.typeRequireName}
                        </p>
                      </div>
                    </Col>
                    <Col lg={3} className="border p-3">
                      <div>
                        <p className="text-muted fs-13 mb-0">
                          Skill Requirement
                        </p>
                        {hiringRequestDetail.skillRequireStrings.map(
                          (skill, index) => (
                            <span
                              key={index}
                              style={{ marginRight: "3px" }}
                              className="badge bg-primary text-light"
                            >
                              {skill}
                            </span>
                          )
                        )}
                      </div>
                    </Col>
                    <Col lg={3} className="border p-3">
                      <div>
                        <p className="text-muted fs-13 mb-0">
                          Level Requirement
                        </p>
                        <p className="fw-medium mb-0 badge bg-purple text-light">
                          {hiringRequestDetail.levelRequireName}
                        </p>
                      </div>
                    </Col>
                    <Col lg={3} className="border p-3">
                      <div className="  rounded-end">
                        <p className="text-muted fs-13 mb-0">Deadline</p>
                        <p className="fw-medium mb-0 badge bg-orangeRed2 text-light">
                          {hiringRequestDetail.duration}
                        </p>
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className="mt-4">
                  <h5 className="mb-3">Hiring request description</h5>
                  <div className="">
                    <p
                      className=""
                      dangerouslySetInnerHTML={{
                        __html: hiringRequestDetail.jobDescription,
                      }}
                    />
                  </div>
                </div>
              </CardBody>
            </Card>

          </div>

          <Modal
            isOpen={modalCreateInterview}
            toggle={openModalCreateInterview}
            role="dialog"
            centered
          >
            <ModalBody className="p-5">
              <div className="position-absolute end-0 top-0 p-3">
                <button
                  type="button"
                  className="btn-close"
                  onClick={openModalCreateInterview}
                ></button>
              </div>
              <div className="auth-content">
                <div className="w-100">
                  <div className="text-center mb-4">
                    <h5>Create Interview</h5>
                    <p className="text-muted">
                    </p>
                  </div>
                  <Form action="#" className="auth-form">
                    <FormGroup className="mb-3">
                      <Label
                        htmlFor="usernameInput"
                        className="form-label"
                      >
                        Interview Title
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="interview-title"
                      />
                      {interviewTitlError && (
                        <p className="text-danger mt-2">
                          {interviewTitlError}
                        </p>
                      )}
                    </FormGroup>
                    <FormGroup className="mb-3">
                      <Label
                        htmlFor="emailInput"
                        className="form-label"
                      >
                        Date of interview
                      </Label>
                      <Input
                        type="date"
                        className="form-control"
                        id="date-of-interview"
                        min={minDate}
                        max={maxDate}
                      />
                      {dateOfInterViewError && (
                        <p className="text-danger mt-2">
                          {dateOfInterViewError}
                        </p>
                      )}
                    </FormGroup>
                    <FormGroup className="mb-3">
                      <label
                        htmlFor="passwordInput"
                        className="form-label"
                      >
                        Start time
                      </label>
                      <Input
                        type="time"
                        className="form-control"
                        id="startTime"
                      />
                      {timeStartError && (
                        <p className="text-danger mt-2">
                          {timeStartError}
                        </p>
                      )}
                    </FormGroup>
                    <FormGroup className="mb-3">
                      <label
                        htmlFor="passwordInput"
                        className="form-label"
                      >
                        End time
                      </label>
                      <Input
                        type="time"
                        className="form-control"
                        id="endTime"
                      />
                      {timeEndError && (
                        <p className="text-danger mt-2">
                          {timeEndError}
                        </p>
                      )}
                    </FormGroup><FormGroup className="mb-3">
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
                      />
                      {desError && (
                        <p className="text-danger mt-2">
                          {desError}
                        </p>
                      )}
                    </FormGroup>

                    <div className="text-center">
                      <div
                        className="btn btn-primary w-100"
                        onClick={() => createAnInterview()}
                      >
                        Create an interview
                      </div>
                    </div>
                  </Form>

                </div>
              </div>
            </ModalBody>
          </Modal>

          <AntdModal
            centered
            open={showPopup}
            onOk={() => setShowPopup(false)}
            onCancel={() => {
              setShowPopup(false);
              exitPopup();
            }}
            width={1100}
            footer={null}
          >
            <Row className="p-3">
              <Col lg={6} className="border-end ">
                <div
                  className="d-flex justify-content-between"
                  style={{ width: "98%" }}
                >
                  <div className="d-flex gap-2">

                    <h4 className="mb-0">Interview Detail</h4>
                    <p className="badge bg-success text-light fs-13 ">
                      {selectInterviewDetail.statusString}
                    </p>
                  </div>

                  {selectInterviewDetail.statusString !== 'Completed' && (
                    <>
                      {selectInterviewDetail.statusString === 'Waiting Approval' ? (
                        <DropdownAntd trigger={['click']} menu={{ items: profileItems }}>
                          <a style={{ height: "max-content" }} onClick={(e) => e.preventDefault()}>
                            <FontAwesomeIcon icon={faGear} size="xl" color="#909191" />
                          </a>
                        </DropdownAntd>
                      ) : (
                        null
                      )}
                      {selectInterviewDetail.statusString === 'Approval' ? (
                        <DropdownAntd trigger={['click']} menu={{ items: profileItems2 }}>
                          <a style={{ height: "max-content" }} onClick={(e) => e.preventDefault()}>
                            <FontAwesomeIcon icon={faGear} size="xl" color="#909191" />
                          </a>
                        </DropdownAntd>
                      ) : (
                        null
                      )}
                    </>
                  )}

                </div>
                <Form action="#" className="auth-form">
                  <FormGroup className="mb-3">
                    <Label
                      htmlFor="usernameInput"
                      className="form-label"
                      style={{ marginBottom: "0px" }}
                    >
                      Interview Title
                    </Label>
                    <Input
                      type="text"
                      className="form-control border border-2"
                      id="interview-title-popup"
                      style={{
                        width: "98%",
                        fontWeight: "500",
                        borderRadius: "5px",
                      }}
                      readOnly={!isInputEditable}
                      onChange={(e) => setInterviewTitleInput(e.target.value)}
                    />
                    {interviewTitleUpdateError && (
                      <p className="text-danger mt-2">
                        {interviewTitleUpdateError}
                      </p>
                    )}
                  </FormGroup>
                  <FormGroup className="mb-3">
                    <Label
                      htmlFor="usernameInput"
                      className="form-label"
                      style={{ marginBottom: "0px" }}
                    >
                      Description
                    </Label>
                    <Input
                      type="text"
                      className="form-control border border-2"
                      id="description-title-popup"
                      style={{
                        width: "98%",
                        fontWeight: "500",
                        borderRadius: "5px",
                      }}
                      readOnly={!isInputEditable}
                      onChange={(e) => setDescriptionInput(e.target.value)}
                    />
                    {desUpdateError && (
                      <p className="text-danger mt-2">
                        {desUpdateError}
                      </p>
                    )}
                  </FormGroup>
                  <FormGroup className="mb-3">
                    <Label
                      htmlFor="usernameInput"
                      className="form-label"
                      style={{ marginBottom: "0px" }}
                    >
                      Date of interview
                    </Label>
                    <Input
                      type="date"
                      className="form-control border border-2"
                      id="date-of-interview-popup"
                      style={{
                        width: "98%",
                        fontWeight: "500",
                        borderRadius: "5px",
                      }}
                      readOnly={!isInputEditable}
                      onChange={(e) => setDateOfInterviewInput(e.target.value)}
                    />
                    {dateOfInterViewUpdateError && (
                      <p className="text-danger mt-2">
                        {dateOfInterViewUpdateError}
                      </p>
                    )}
                  </FormGroup>
                  <div className="d-flex justify-content-between">
                    <FormGroup className="mb-3" style={{ width: "240px" }}>
                      <Label
                        htmlFor="usernameInput"
                        className="form-label"
                        style={{ marginBottom: "0px" }}
                      >
                        Start Time
                      </Label>
                      <Input
                        type="time"
                        className="form-control border border-2"
                        id="start-time-popup"
                        style={{
                          width: "98%",
                          fontWeight: "500",
                          borderRadius: "5px",
                        }}
                        readOnly={!isInputEditable}
                        // value={selectInterviewDetail.title}
                        onChange={(e) => setStartTimeInput(e.target.value)}
                      />
                      {timeStartUpdateError && (
                        <p className="text-danger mt-2">
                          {timeStartUpdateError}
                        </p>
                      )}
                    </FormGroup>
                    <FormGroup className="mb-3" style={{ width: "240px" }} >
                      <Label
                        htmlFor="usernameInput"
                        className="form-label"
                        style={{ marginBottom: "0px" }}
                      >
                        End Time
                      </Label>
                      <Input
                        type="time"
                        className="form-control border border-2"
                        id="end-time-popup"
                        style={{
                          width: "96%",
                          fontWeight: "500",
                          borderRadius: "5px",
                        }}
                        readOnly={!isInputEditable}
                        // value={selectInterviewDetail.title}
                        onChange={(e) => setEndTimeInput(e.target.value)}
                      />
                      {timeEndUpdateError && (
                        <p className="text-danger mt-2">
                          {timeEndUpdateError}
                        </p>
                      )}
                    </FormGroup>
                  </div>
                </Form>
                {selectInterviewDetail.statusString === "Approved" && (
                  <div className="  d-flex justify-content-end" id="buttonCompleted">
                    <button
                      className="btn btn-blue me-2"
                      onClick={() => {
                        openSkype(selectInterviewDetail.meetingUrl);
                      }}
                      id="buttonCompletedFormInterview"
                    >
                      <div className="d-flex">
                        <SkypeOutlined className="me-1" style={{ fontSize: "17px" }} />
                        Join Skype
                      </div>
                    </button>

                    <button
                      className="btn btn-success me-2"
                      onClick={() => {
                        completedInterview(selectInterviewDetail.interviewId);
                      }}
                      id="buttonCompletedFormInterview"
                    >
                      Complete
                    </button>
                  </div>
                )}
                <div className="d-flex gap-2 justify-content-end" >

                  <div className="mt-3 d-flex justify-content-end">
                    <button className="btn btn-danger"
                      onClick={() => {
                        cancelEditInterview(selectInterviewDetail.interviewId);
                      }}
                      id="buttonCancelFormInterview"
                      style={{ display: "none" }}
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="mt-3 d-flex justify-content-end">
                    <button className="btn btn-blue"
                      onClick={() => {
                        updateInterview(selectInterviewDetail.interviewId);
                      }}
                      id="buttonSaveFormInterview"
                      style={{ display: "none" }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </Col>
              <Col lg={6} className="border-start ">
                <Row>
                  <Col lg={6}>
                    <div className="p-2">
                      <div className="candidate-profile text-center">
                        <img
                          src={img0}
                          alt=""
                          className="avatar-lg rounded-circle"
                        />
                        <h6 className="fs-18 mb-0 mt-4">
                          {devInterviewDetail.firstName}{" "}
                          {devInterviewDetail.lastName}
                        </h6>
                        <p className="text-muted mb-4">
                          {devInterviewDetail.codeName}
                        </p>
                      </div>
                    </div>

                    <div className="candidate-profile-overview p-2">
                      <h6 className="fs-17 fw-semibold mb-3">Profile Overview</h6>
                      <ul className="list-unstyled mb-0">
                        <li>
                          <div className="d-flex justify-content-start">
                            <label className="text-dark">Gender</label>
                            <div>
                              <p className="text-muted mb-0">
                                {devInterviewDetail.genderString}
                              </p>
                            </div>
                          </div>
                        </li>

                        <li>
                          <div className="d-flex justify-content-start">
                            <label className="text-dark">Email</label>
                            <div>
                              <p className="text-muted mb-0 ">
                                {devInterviewDetail.email}
                              </p>
                            </div>
                          </div>
                        </li>

                        <li>
                          <div className="d-flex justify-content-start">
                            <label className="text-dark">Phone</label>
                            <div>
                              <p className="text-muted mb-0">0123456789</p>
                            </div>
                          </div>
                        </li>

                        <li>
                          <div className="d-flex justify-content-start">
                            <label className="text-dark">Experience</label>
                            <div>
                              <p className="text-muted mb-0 ">
                                {devInterviewDetail.yearOfExperience} Year
                              </p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex justify-content-start">
                            <label className="text-dark">Salary</label>
                            <div>
                              <p className="text-muted mb-0">
                                {devInterviewDetail.averageSalary}$
                              </p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="p-2 ">
                      <h6 className="fs-17 fw-semibold mb-2">Level</h6>
                      <div className="d-flex flex-wrap align-items-start gap-1">
                        <span className="badge bg-warning text-light fs-12">
                          {devInterviewDetail.levelRequireName}
                        </span>
                      </div>
                    </div>

                    <div className="p-2 ">
                      <h6 className="fs-17 fw-semibold mb-2">Type</h6>
                      <div className="d-flex flex-wrap align-items-start gap-1">
                        {devInterviewDetail.typeRequireStrings?.map(
                          (skillRequire, key) => (
                            <span
                              key={key}
                              className="badge bg-info-subtle text-info fs-13 mt-1"
                            >
                              {skillRequire}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    <div className="p-2 ">
                      <h6 className="fs-17 fw-semibold mb-2">
                        Professional Skills
                      </h6>
                      <div className="d-flex flex-wrap align-items-start gap-1">
                        {devInterviewDetail.skillRequireStrings?.map(
                          (skillRequire, key) => (
                            <span
                              key={key}
                              className="badge bg-success-subtle text-success fs-13"
                            >
                              {skillRequire}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    <div className="candidate-contact-details p-2">
                      <h6 className="fs-17 fw-semibold mb-3">Work Arrangement</h6>
                      <ul className="list-unstyled mb-0">
                        <div className="d-flex gap-1">
                          <p className="mb-0 badge bg-purplel text-purple fs-13">
                            {devInterviewDetail.scheduleTypeName}
                          </p>
                          <p className="mb-0 badge bg-orangeRed2l text-orangeRed2 fs-13">
                            {devInterviewDetail.employmentTypeName}
                          </p>
                        </div>
                      </ul>
                    </div>
                  </Col>
                </Row>
                {/* ------------------------------------------------------ */}
              </Col>
              <Row>
                {selectInterviewDetail.rejectionReason == null ? (
                  <div></div>
                ) : (
                  <div className="mt-3 ">
                    <p className="mb-0 text-muted">Rejection Reason</p>
                    <div
                      className="p-2 border border-2"
                      style={{
                        width: "100%",
                        fontWeight: "500",
                        borderRadius: "10px",
                      }}
                    >
                      {selectInterviewDetail.rejectionReason == null ? (
                        <span></span>
                      ) : (
                        selectInterviewDetail.rejectionReason
                      )}
                    </div>
                  </div>
                )}
              </Row>
            </Row>
          </AntdModal>

          <div class="col-lg-3 d-flex flex-column gap-4">
            <Card className="job-overview ">
              <CardBody className="p-4">
                <h4>Project Overview</h4>
                <ul className="list-unstyled mt-4 mb-0">
                  <li>
                    <div className="d-flex mt-4">
                      <i className="uil uil-parking-square icon bg-primary-subtle text-primary"></i>
                      <div className="ms-3">
                        <h6 className="fs-14 mb-0">Project </h6>
                        <p className="text-muted mb-0" id="projectNameOverview"></p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex mt-4">
                      <i className="uil uil-list-ul icon bg-primary-subtle text-primary"></i>
                      <div className="ms-3">
                        <h6 className="fs-14 mb-0">Project type </h6>
                        <p className="text-muted mb-0" id="projectTypeOverview"></p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex mt-4">
                      <i className="uil uil-windsock icon bg-primary-subtle text-primary"></i>
                      <div className="ms-3">
                        <h6 className="fs-14 mb-0">Start date of project </h6>
                        <p className="text-muted mb-0" id="startDayOverview"></p>
                      </div>
                    </div>
                  </li><li>
                    <div className="d-flex mt-4">
                      <i className="uil uil-times-circle icon bg-primary-subtle text-primary"></i>
                      <div className="ms-3">
                        <h6 className="fs-14 mb-0">End date of project </h6>
                        <p className="text-muted mb-0" id="endDayOverview"></p>
                      </div>
                    </div>
                  </li>
                </ul>
              </CardBody>
            </Card>
            <Card className="job-overview ">
              <CardBody className="p-4">
                <h4>Hiring Request Overview</h4>
                <ul className="list-unstyled mt-4 mb-0">
                  <li>
                    <div className="d-flex mt-4">
                      <i className="uil uil-window-maximize icon bg-primary-subtle text-primary"></i>
                      <div className="ms-3">
                        <h6 className="fs-14 mb-0">Hiring Request Title</h6>
                        <p className="text-muted mb-0">
                          {hiringRequestDetail.jobTitle}
                        </p>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="d-flex mt-4">
                      <i className="uil uil-user-square icon bg-primary-subtle text-primary"></i>
                      <div className="ms-3">
                        <h6 className="fs-14 mb-0">No. Dev</h6>
                        <p className="text-muted mb-0">
                          {hiringRequestDetail.numberOfDev}
                        </p>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="d-flex mt-4">
                      <i className="uil uil-star-half-alt icon bg-primary-subtle text-primary"></i>
                      <div className="ms-3">
                        <h6 className="fs-14 mb-0">Employment Type</h6>
                        <p className="text-muted mb-0">{hiringRequestDetail.employmentTypeName}</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex mt-4">
                      <i className="uil uil-usd-circle icon bg-primary-subtle text-primary"></i>
                      <div className="ms-3">
                        <h6 className="fs-14 mb-0">Offered Salary Per Dev</h6>
                        <p className="text-muted mb-0">
                          {hiringRequestDetail.salaryPerDev} VND
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex mt-4">
                      <i className="uil uil-history icon bg-primary-subtle text-primary"></i>
                      <div className="ms-3">
                        <h6 className="fs-14 mb-0">Date Posted</h6>
                        {hiringRequestDetail.postedTime}
                        <p className="text-muted mb-0"></p>
                      </div>
                    </div>
                  </li>
                </ul>
              </CardBody>
            </Card>
            <ExtendDurationHiringRequestPopup
              isModalOpen={isModalCreateOpen}
              closeModal={closeModalCreateHiringRequest}
              requestId={selectedHiringRequestInfo}>
            </ExtendDurationHiringRequestPopup>
          </div>



          <div class="col-lg-11 p-0">
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
                  >
                    List developer
                  </NavLink>
                </NavItem>
                <NavItem role="presentation">
                  <NavLink
                    className={classnames({ active: activeTab === "2" })}
                    onClick={() => {
                      tabChange("2");
                    }}
                    type="button"
                  >
                    List interview
                  </NavLink>
                </NavItem>

              </Nav>
              <CardBody style={{ backgroundColor: "#f6f6f6", padding: "0 24px 24px 24px" }}>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <Row>
                      {!isHaveListDeveloper ? (
                        <Empty style={{ marginTop: "20px" }} />
                      ) : (
                        null
                      )}
                      {candidategridDetails.map((candidategridDetailsNew, key) => (
                        <Col lg={3} md={6} key={key}>
                          <div style={{ backgroundColor: "white", borderRadius: "15px" }}>
                            <CardBody className="p-4 dev-accepted mt-4" style={{ borderRadius: "15px" }}>
                              <div className="d-flex mb-4 justify-content-between">
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
                                            "Contract Failed"
                                            ? "badge bg-danger text-light mb-2"
                                            : candidategridDetailsNew.selectedDevStatus ===
                                              "Working"
                                              ? "badge bg-blue text-light mb-2"
                                              : candidategridDetailsNew.selectedDevStatus ===
                                                "Under Consideration"
                                                ? "badge bg-warning text-light mb-2"
                                                : candidategridDetailsNew.selectedDevStatus ===
                                                  "Contract Processing"
                                                  ? "badge bg-warning text-light mb-2"
                                                  : candidategridDetailsNew.selectedDevStatus ===
                                                    "Interview Scheduled"
                                                    ? "badge bg-blue text-light mb-2"
                                                    : candidategridDetailsNew.selectedDevStatus ===
                                                      "Completed"
                                                      ? "badge bg-primary text-light mb-2"
                                                      : candidategridDetailsNew.selectedDevStatus ===
                                                        "Waiting Interview"
                                                        ? "badge bg-warning text-light mb-2"
                                                        : candidategridDetailsNew.selectedDevStatus ===
                                                          "Terminated"
                                                          ? "badge bg-danger text-light mb-2"
                                                          : candidategridDetailsNew.selectedDevStatus ===
                                                            "Request Closed"
                                                            ? "badge  bg-teal text-light mb-2"
                                                            : ""
                                      }
                                    >
                                      {candidategridDetailsNew.selectedDevStatus}
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



                              <div className="d-flex flex-column gap-1 mb-3">
                                <div className=" d-flex row align-items-center ">
                                  <span className=" fs-14 col-lg-3 " style={{ paddingRight: "0px" }}>Type</span>
                                  <div className=" checkbox-wrapper-type col-lg-5" style={{ paddingLeft: "0px" }}>
                                    <div class="round ">
                                      <input
                                        type="checkbox"
                                        id="checkbox-type"
                                        checked={candidategridDetailsNew.typeMatching}
                                      />
                                      <label htmlFor="checkbox-type"></label>
                                    </div>
                                  </div>
                                </div>
                                <div className=" d-flex row align-items-center ">
                                  <span className=" fs-14 col-lg-3 " style={{ paddingRight: "0px" }}>Level</span>
                                  <div className=" checkbox-wrapper-level col-lg-5" style={{ paddingLeft: "0px" }}>
                                    <div class="round ">
                                      <input
                                        type="checkbox"
                                        id="checkbox-level"
                                        checked={candidategridDetailsNew.levelMatching}
                                      />
                                      <label htmlFor="checkbox-type"></label>
                                    </div>
                                  </div>
                                </div>

                                <div className="d-flex row align-items-center ">
                                  <span className=" fs-14 col-lg-3 " style={{ paddingRight: "0px" }}>Salary</span>

                                  <div className="col-lg-5" style={{ paddingLeft: "0px" }}>
                                    <Space size={30} wrap>
                                      <Progress
                                        steps={5}
                                        percent={
                                          candidategridDetailsNew.salaryPerDevPercentage
                                        }
                                        strokeColor={getBarColor(
                                          candidategridDetailsNew.salaryPerDevPercentage
                                        )}
                                      />
                                    </Space>
                                  </div>
                                </div>
                                <div className="d-flex row align-items-center ">
                                  <span className=" fs-14 col-lg-3 " style={{ paddingRight: "0px" }}>Skill</span>

                                  <div className="col-lg-5" style={{ paddingLeft: "0px" }}>
                                    <Space size={30} wrap>
                                      <Progress
                                        steps={5}
                                        percent={
                                          candidategridDetailsNew.skillPercentage
                                        }
                                        strokeColor={getBarColor(
                                          candidategridDetailsNew.skillPercentage
                                        )}
                                      />
                                    </Space>
                                  </div>
                                </div>

                                <div>
                                  <span>
                                    Experience:{" "}
                                    {candidategridDetailsNew.yearOfExperience} years
                                  </span>
                                </div>
                              </div>

                              <div
                                className="border border-2 p-3"
                                style={{ borderRadius: "7px" }}
                              >
                                <div className="d-flex justify-content-between">
                                  <p>Matching with request</p>
                                  <p className="text-success fw-bold">
                                    {candidategridDetailsNew.averagedPercentage}%
                                  </p>
                                </div>
                                <div className="dev-matching-in-company border border-1">
                                  <div
                                    className="dev-matching-level-in-company"
                                    style={{
                                      width: `${candidategridDetailsNew.averagedPercentage}% `,
                                    }}
                                  ></div>
                                </div>
                              </div>
                              <div className="mt-3">
                                {candidategridDetailsNew.selectedDevStatus ===
                                  "Under Consideration" ? (
                                  <>
                                    <button
                                      id="interviewButton"
                                      className="btn btn-soft-blue w-100 mt-2 fw-bold"
                                      onClick={() =>
                                        openModalCreateInterview(
                                          candidategridDetailsNew.id
                                        )
                                      }
                                      disabled={loadingInterview[candidategridDetailsNew.id] || loadingReject[candidategridDetailsNew.id]}
                                    >
                                      <>
                                        Interview {candidategridDetailsNew.interviewRound > 0 ? `Round ${candidategridDetailsNew.interviewRound + 1}` : ''}
                                      </>
                                    </button>
                                    <button
                                      id="onboardButton"
                                      className="btn btn-soft-primary w-100 mt-2 fw-bold"
                                      onClick={() =>
                                        handleOnboard(candidategridDetailsNew.id)
                                      }
                                      disabled={loadingOnboard[candidategridDetailsNew.id] || loadingReject[candidategridDetailsNew.id]}

                                    >
                                      {loadingOnboard[candidategridDetailsNew.id] ? (
                                        <HashLoader
                                          size={20}
                                          color={"white"}
                                          loading={true}
                                        />
                                      ) : isListLoading2 ? (
                                        <HashLoader
                                          size={20}
                                          color={"white"}
                                          loading={true}
                                        />
                                      ) : (
                                        "Hire"
                                      )}
                                    </button>
                                    <button
                                      id="rejectButton"
                                      className="btn btn-soft-danger btn-danger w-100 mt-2 fw-bold"
                                      onClick={() =>
                                        rejectInterview2(candidategridDetailsNew.id)
                                      }
                                      disabled={loadingInterview[candidategridDetailsNew.id] || loadingReject[candidategridDetailsNew.id]}
                                    >
                                      {loadingReject[candidategridDetailsNew.id] ? (
                                        <HashLoader
                                          size={20}
                                          color={"white"}
                                          loading={true}
                                        />
                                      ) : isListLoading ? (
                                        <HashLoader
                                          size={20}
                                          color={"white"}
                                          loading={true}
                                        />
                                      ) : (
                                        "Reject"
                                      )}
                                    </button>
                                  </>
                                ) : candidategridDetailsNew.selectedDevStatus ===
                                  "Waiting Interview" ? (
                                  <>
                                    <button
                                      id="interviewButton"
                                      className="btn btn-soft-blue w-100 mt-2 fw-bold"
                                      onClick={() =>
                                        openModalCreateInterview(
                                          candidategridDetailsNew.id
                                        )
                                      }
                                    >
                                      <>
                                        Interview {candidategridDetailsNew.interviewRound > 0 ? `Round ${candidategridDetailsNew.interviewRound + 1}` : ''}
                                      </>
                                    </button>

                                    <button
                                      id="onboardButton"
                                      className="btn btn-soft-primary w-100 mt-2 fw-bold"
                                      onClick={() =>
                                        handleOnboard(candidategridDetailsNew.id)
                                      }
                                      disabled={loadingOnboard[candidategridDetailsNew.id] || loadingReject[candidategridDetailsNew.id]}

                                    >
                                      {loadingOnboard[candidategridDetailsNew.id] ? (
                                        <HashLoader
                                          size={20}
                                          color={"white"}
                                          loading={true}
                                        />
                                      ) : isListLoading2 ? (
                                        <HashLoader
                                          size={20}
                                          color={"white"}
                                          loading={true}
                                        />
                                      ) : (
                                        "Hire"
                                      )}
                                    </button>
                                    <button
                                      id="rejectButton"
                                      className="btn btn-soft-danger btn-danger w-100 mt-2 fw-bold"
                                      onClick={() =>
                                        rejectInterview2(candidategridDetailsNew.id)
                                      }
                                      disabled={loadingOnboard[candidategridDetailsNew.id] || loadingReject[candidategridDetailsNew.id]}
                                    >
                                      {loadingReject[candidategridDetailsNew.id] ? (
                                        <HashLoader
                                          size={20}
                                          color={"white"}
                                          loading={true}
                                        />
                                      ) : isListLoading ? (
                                        <HashLoader
                                          size={20}
                                          color={"white"}
                                          loading={true}
                                        />
                                      ) : (
                                        "Reject"
                                      )}
                                    </button>
                                  </>
                                ) :
                                  candidategridDetailsNew.selectedDevStatus ===
                                    "Interview Scheduled" ? (
                                    <>
                                      <button
                                        id="onboardButton"
                                        className="btn btn-soft-primary w-100 mt-2 fw-bold"
                                        onClick={() =>
                                          handleOnboard(candidategridDetailsNew.id)
                                        }
                                        disabled={loadingOnboard[candidategridDetailsNew.id] || loadingReject[candidategridDetailsNew.id]}

                                      >
                                        {loadingOnboard[candidategridDetailsNew.id] ? (
                                          <HashLoader
                                            size={20}
                                            color={"white"}
                                            loading={true}
                                          />
                                        ) : isListLoading2 ? (
                                          <HashLoader
                                            size={20}
                                            color={"white"}
                                            loading={true}
                                          />
                                        ) : (
                                          "Hire"
                                        )}
                                      </button>
                                      <button
                                        id="rejectButton"
                                        className="btn btn-soft-danger btn-danger w-100 mt-2 fw-bold"
                                        onClick={() =>
                                          rejectInterview2(candidategridDetailsNew.id)
                                        }
                                        disabled={loadingReject[candidategridDetailsNew.id]}

                                      >
                                        {loadingReject[candidategridDetailsNew.id] ? (
                                          <HashLoader
                                            size={20}
                                            color={"white"}
                                            loading={true}
                                          />
                                        ) : isListLoading ? (
                                          <HashLoader
                                            size={20}
                                            color={"white"}
                                            loading={true}
                                          />
                                        ) : (
                                          "Reject"
                                        )}
                                      </button>
                                    </>
                                  ) :
                                    null}
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
                  <TabPane tabId="2">
                    <Row>
                      {!isHaveListInterview ? (
                        <Empty style={{ marginTop: "20px" }} />
                      ) : (
                        null
                      )}
                      {listInterview.map((jobVacancy2Details, key) => (
                        <Col lg={3} md={6} className="mt-4" s key={key}>
                          <div
                            onClick={() =>
                              midleSelect(jobVacancy2Details.interviewId)
                            }
                            className={
                              jobVacancy2Details.addclassNameBookmark === true
                                ? "card job-grid-box bookmark-post"
                                : "card job-grid-box"
                            }
                          >
                            <div className="card-body p-4">
                              <div className="favorite-icon">
                                <span
                                  className={
                                    jobVacancy2Details.statusString ===
                                      "Rejected"
                                      ? "badge bg-danger text-light mb-2"
                                      : jobVacancy2Details.statusString ===
                                        "Contract Failed"
                                        ? "badge bg-danger text-light mb-2"
                                        : jobVacancy2Details.statusString ===
                                          "Approved"
                                          ? "badge bg-blue text-light mb-2"
                                          : jobVacancy2Details.statusString ===
                                            "Under Consideration"
                                            ? "badge bg-warning text-light mb-2"
                                            : jobVacancy2Details.statusString ===
                                              "Waiting Approval"
                                              ? "badge bg-warning text-light mb-2"
                                              : jobVacancy2Details.statusString ===
                                                "Interview Scheduled"
                                                ? "badge bg-blue text-light mb-2"
                                                : jobVacancy2Details.statusString ===
                                                  "Completed"
                                                  ? "badge bg-primary text-light mb-2"
                                                  : jobVacancy2Details.statusString ===
                                                    "Waiting Interview"
                                                    ? "badge bg-warning text-light mb-2"
                                                    : jobVacancy2Details.statusString ===
                                                      "Terminated"
                                                      ? "badge bg-danger text-light mb-2"
                                                      : jobVacancy2Details.statusString ===
                                                        "Cancelled"
                                                        ? "badge  bg-teal text-light mb-2"
                                                        : ""
                                  }
                                >
                                  {jobVacancy2Details.statusString}
                                </span>
                              </div>

                              <div>
                                <div>
                                  <img
                                    src={jobImage1}
                                    alt=""
                                    className="img-fluid rounded-3"
                                  />
                                </div>
                              </div>
                              <div className="mt-4">
                                <div className="primary-link">
                                  <h5 className="fs-17">
                                    {jobVacancy2Details.title}
                                  </h5>
                                </div>
                              </div>
                              <div className="d-flex flex-column gap-1 ">
                                {/* <div className="d-flex  mb-0">
                                  <div className="flex-shrink-0">
                                    <i className="uil uil-clock-three text-primary me-1"></i>
                                  </div>
                                  <p className="text-muted  mb-0 ">{jobVacancy2Details.startTime} to {jobVacancy2Details.endTime}</p>
                                  <div className="flex-shrink-0 ms-2">
                                    <i className="uil uil-calendar-alt text-primary "></i>
                                  </div>
                                  <p className="text-muted mb-0 ms-1">{jobVacancy2Details.dateOfInterview} </p>
                                </div> */}
                                <div className="d-flex justify-content-between">
                                  <div className="d-flex">
                                    <i className="uil uil-clock-three text-primary me-1"></i>
                                    <p className="text-muted  mb-0 ">{jobVacancy2Details.startTime} to {jobVacancy2Details.endTime}</p>
                                  </div>
                                  <div className="d-flex">
                                    <i className="uil uil-calendar-alt text-primary "></i>
                                    <p className="text-muted mb-0 ms-1">{jobVacancy2Details.dateOfInterview} </p>
                                  </div>
                                </div>
                                <p className="text-muted mb-0" style={{ height: "45px" }}>{jobVacancy2Details.description}</p>
                              </div>

                              <div className="d-flex align-items-center justify-content-between mt-1 border-top pt-3">
                                <p className="text-muted float-start mb-0">
                                  {jobVacancy2Details.postedTime}
                                </p>
                                <div className="text-end">
                                  <div
                                    onClick={() =>
                                      midleSelect(jobVacancy2Details.interviewId)
                                    }
                                    className="btn btn-sm btn-primary"
                                  >
                                    Read more <i className="uil uil-angle-right-b"></i>
                                  </div>
                                </div>
                              </div>

                            </div>

                          </div>
                        </Col>
                      ))}
                    </Row>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </div>
        </div >

      </section >
      <div>
      </div>
    </React.Fragment >
  );
};

export default HiringRequestDetails;

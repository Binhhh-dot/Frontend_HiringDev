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
import { Modal as AntdModal } from "antd";
import { Container } from "reactstrap";
import DeveloperDetailInCompanyPopup from "../../Home/SubSection/DeveloperDetailInCompany";
import DeveloperDetailInManagerPopup from "../../Home/SubSection/DeveloperDetailInManager";
import { HashLoader } from "react-spinners";
import { Link, useLocation } from "react-router-dom";
import hiringrequestService from "../../../services/hiringrequest.service";
import userImage0 from "../../../assets/images/user/img-00.jpg";

import JobDetailImage from "../../../assets/images/job-detail.jpg";
import JobImage10 from "../../../assets/images/featured-job/img-10.png";
import { FaEye } from "react-icons/fa";

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
  faGear
} from "@fortawesome/free-solid-svg-icons";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown as DropdownAntd, Space } from 'antd';


const HiringRequestDetails = () => {
  //Apply Now Model
  const [candidategridDetails, setCandidategridDetails] = useState([]);
  const { state } = useLocation();
  const location = useLocation();
  const [modalEye, setModalEye] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [hiringRequestDetail, setHiringRequestDetail] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCandidateInfo, setSelectedCandidateInfo] = useState({});
  const [listInterview, setlistInterview] = useState([]);
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
  const [loadListDeveloper, setLoadListDeveloper] = useState(false);
  let [currentPageInterview, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 6;
  const [showPopup, setShowPopup] = useState(false);
  const [selectInterviewDetail, setSelectInterviewDetail] = useState({});
  const [devInterviewDetail, setDevInterviewDetail] = useState([]);

  const [isInputEditable, setIsInputEditable] = useState(false);
  const [interviewTitleInput, setInterviewTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [dateOfInterviewInput, setDateOfInterviewInput] = useState('');
  const [startTimeInput, setStartTimeInput] = useState('');
  const [endTimeInput, setEndTimeInput] = useState('');

  const generateItems = () => {
    if (selectInterviewDetail.statusString === "Waiting Approval") {
      return [
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
          label: <a href="https://www.aliyun.com">Cancel</a>,
          key: '1',
        },
      ];
    } else {
      return [
        {
          label: <a href="https://www.aliyun.com">Cancel</a>,
          key: '1',
        },
      ];
    }
  };

  const items = generateItems();

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
    try {
      const response = await interviewServices.completedInterview(interviewId);
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
    }
  };

  const updateInterview = async (interviewId) => {
    try {
      const response = await interviewServices.completedInterview(interviewId);
      console.log(response);
    } catch (error) {
      console.error("Error completedInterview:", error);
    }
  };

  const exitPopup = () => {
    document.getElementById('buttonSaveFormInterview').style.display = 'none';
    document.getElementById('buttonCancelFormInterview').style.display = 'none';
    setIsInputEditable(false)
  };

  const cancelEditInterview = (id) => {
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
      const response = await developerServices.GetAllSelectedDevByHR(jobId);
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
          selectedDevStatus: dev.selectedDevStatus,
          interviewRound: dev.interviewRound,
        };
      });
      setCandidategridDetails(candidategridDetails);
    } catch (error) {
      console.error("Error fetching job vacancies:", error);
    }
  };

  // useEffect(() => {
  //   fetchJobVacancies();
  //   // fetchListInterview();
  // }, []);

  const fetchHiringRequestDetailInCompany = async () => {
    let response;
    // const saveData = localStorage.getItem("myData");

    try {
      const queryParams = new URLSearchParams(location.search);
      const jobId = queryParams.get("Id");
      response = await hiringrequestService.getHiringRequestDetailInCompany(
        jobId
      );
      setHiringRequestDetail(response.data.data);

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
      response = await interviewServices.getAllInterviewByHRAndPaging(
        companyId,
        requestId,
        8,
        currentPageInterview,
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
      setTotalPages(Math.ceil(data.paging.total / pageSize));
      if (data.paging.total < 7) {
        // Lấy tham chiếu đến phần tử có id="paging"
        var rowElement = document.getElementById("paging");

        // Ẩn phần tử bằng cách đặt style.display thành "none"
        if (rowElement) {
          rowElement.style.display = "none";
        }
      }
    } catch (error) {
      console.error("Error fetching job vacancies:", error);
    }
  };

  useEffect(() => {
    fetchHiringRequestDetailInCompany();
    fetchJobVacancies();
  }, []);



  useEffect(() => {
    fetchJobVacancies();
    fetchListInterview();
  }, [loadListDeveloper]);

  useEffect(() => {
    fetchListInterview();
  }, [currentPageInterview]);

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
    // Replace with the actual duration of your action
  };

  const rejectInterview2 = async (id) => {
    // Simulate an asynchronous action, e.g., making an API request
    setLoadingReject((prevLoading) => ({
      ...prevLoading,
      [id]: true,
    }));
    try {
      // Sử dụng giá trị từ state hoặc DOM
      const queryParams = new URLSearchParams(location.search);
      const requestId = queryParams.get("Id");
      // Gọi API để reject interview
      const response = await developerServices.rejectSelectedDev(requestId, id);
      setIsListLoading(true);
      // Xử lý kết quả nếu cần thiết
      fetchJobVacancies();
      // Cập nhật giao diện hoặc thực hiện các hành động khác sau khi reject thành công
      // Ví dụ: Ẩn nút hoặc cập nhật trạng thái
      setIsListLoading(false);
      setLoadingReject((prevLoading) => ({
        ...prevLoading,
        [id]: false,
      }));
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Error rejecting interview:", error);
      // Hiển thị thông báo lỗi hoặc thực hiện các hành động khác
      setLoadingReject((prevLoading) => ({
        ...prevLoading,
        [id]: false,
      }));
    }
    // Simulate an asynchronous action, e.g., making an API request

    // After the action is completed, you can update the state
    // Replace with the actual duration of your action
  };

  const handleOnboard = async (id) => {
    // Simulate an asynchronous action, e.g., making an API request
    setLoadingOnboard((prevLoading) => ({
      ...prevLoading,
      [id]: true,
    }));
    try {
      // Sử dụng giá trị từ state hoặc DOM
      const queryParams = new URLSearchParams(location.search);
      const requestId = queryParams.get("Id");
      // Gọi API để reject interview
      const response = await developerServices.onbardingDeveloper(requestId, id);
      setIsListLoading2(true);
      // Xử lý kết quả nếu cần thiết
      fetchJobVacancies();
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
    console.log(developerIdSelectedCreateInterview)

    let check = true;
    // setLoading(true);
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
      setDateOfInterViewError("Please enter a date of interview");
      check = false;
    } else {
      setDateOfInterViewError(null);
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

      if (selectedDate < currentDate) {
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

    if (check) {
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
        let data = response.data;
        setLoadListDeveloper(!loadListDeveloper);
        toast.success('Create successfully!');
        setModalCreateInterview(false);
        // fetchListDevInterview();
        // setLoading(false);
        // navigate(`/hiringrequestlistincompanypartnerdetail?Id=${requestId}`);
      } catch (error) {
        console.error("Error fetching job vacancies:", error);
        // setLoading(false);
      }
    }
    // setLoading(false);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageButtons = 4;
    let startPage = Math.max(1, currentPageInterview - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
    if (
      totalPages > maxPageButtons &&
      currentPageInterview <= Math.floor(maxPageButtons / 2) + 1
    ) {
      endPage = maxPageButtons;
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${i === currentPageInterview ? "active" : ""}`}
        >
          <p className="page-link" to="#" onClick={() => handlePageClick(i)}>
            {i}
          </p>
        </li>
      );
    }

    return pageNumbers;
  };



  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  const handleNextPage = () => {
    if (currentPageInterview < totalPages) {
      setCurrentPage(currentPageInterview + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPageInterview > 1) {
      setCurrentPage(currentPageInterview - 1);
    }
  };

  const midleSelect = (id) => {
    fetchGetDetailInterviewByInterviewId(id);

    setShowPopup(true);
  };

  const handleClick = () => {
    // Mở cửa sổ mới khi người dùng ấn vào button
    const authWindow = window.open(
      'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=4362c773-bb6a-40ec-8ac3-92209a7a05e7&response_type=code&redirect_uri=https://localhost:3000/callback&response_mode=query&scope=https://graph.microsoft.com/.default&state=12345',
      '_blank',
      'width=600,height=400'
    );

    // Kiểm tra khi cửa sổ đó được đóng lại
    const interval = setInterval(() => {
      if (authWindow.closed) {
        clearInterval(interval);

        // Lấy mã code từ URL của cửa sổ mới
        const searchParams = new URLSearchParams(authWindow.location.search);
        const code = searchParams.get('code');

        if (code) {
          console.log('Mã code:', code);
          // Thực hiện xử lý tiếp theo sau khi lấy được mã code
        } else {
          console.log('Không nhận được mã code.');
        }
      }
    }, 1000);
  }



  const onUpdateInterview = () => {
    document.getElementById('buttonSaveFormInterview').style.display = 'block';
    document.getElementById('buttonCancelFormInterview').style.display = 'block';
    setIsInputEditable(true);

  };

  const fetchGetDetailInterviewByInterviewId = async (id) => {
    let response;

    try {
      response = await interviewServices.getDetailInterviewByInterviewId(
        id
      );
      document.getElementById("interview-title-popup").value = response.data.data.title;
      document.getElementById("description-title-popup").value = response.data.data.description;
      var parts = response.data.data.dateOfInterview.split('-');
      if (parts.length === 3) {
        var day = parts[1];
        var month = parts[0];
        var year = parts[2];
        // Format the date as "yyyy-dd-mm"
        var formattedDate = year + '-' + day + '-' + month;
        document.getElementById("date-of-interview-popup").value = formattedDate;
      } else {
        console.error("Invalid date format");
      }
      document.getElementById("start-time-popup").value = response.data.data.startTime;
      document.getElementById("end-time-popup").value = response.data.data.endTime;
      setSelectInterviewDetail(response.data.data);
      setDevInterviewDetail(response.data.data.developer);
    } catch (error) {
      console.error("Error fetching interview detail in manager list :", error);
    }
  };


  return (
    <React.Fragment>
      <section class="section">
        <div class="row  justify-content-center " style={{ margin: "0px" }}>
          <div class="col-lg-8 " style={{ padding: "0px" }}>
            <Card className="job-detail overflow-hidden">
              <div>
                <img
                  src={JobDetailImage}
                  alt=""
                  className="img-fluid"
                  style={{ width: "100%" }}
                />
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
                      {/* <ul className="list-inline text-muted mb-0">
                          <li className="list-inline-item text-warning review-rating">
                            <span className="badge bg-warning">
                              {hiringRequestDetail.statusString}
                            </span>{" "}
                          </li>
                        </ul> */}
                    </Col>
                    <Col lg={4}>
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
                                        ? "badge bg-danger text-light mb-2"
                                        : hiringRequestDetail.statusString ===
                                          "Finished"
                                          ? "badge bg-primary text-light mb-2"
                                          : hiringRequestDetail.statusString ===
                                            "Complete"
                                            ? "badge bg-primary text-light mb-2"
                                            : hiringRequestDetail.statusString === "Saved"
                                              ? "badge bg-info text-light mb-2"
                                              : ""
                            }
                          >
                            {hiringRequestDetail.statusString}
                          </span>{" "}
                        </li>
                      </ul>
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
                  <h5 className="mb-3">Job Description</h5>
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

                    <div>
                      <button onClick={() => handleClick()}  >Mở cửa sổ đăng nhập</button>

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
              exitPopup(); // Log message when the modal is closed
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
                    <DropdownAntd
                      menu={{
                        items,
                      }}
                      trigger={['click']}
                    >
                      <a style={{ height: "max-content" }} onClick={(e) => e.preventDefault()}>
                        <FontAwesomeIcon
                          icon={faGear}
                          size="xl"
                          color="#909191"
                        />
                      </a>
                    </DropdownAntd>
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
                        borderRadius: "10px",
                      }}
                      readOnly={!isInputEditable}
                      // value={selectInterviewDetail.title}
                      onChange={(e) => setInterviewTitleInput(e.target.value)}
                    />
                    {interviewTitlError && (
                      <p className="text-danger mt-2">
                        {interviewTitlError}
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
                        borderRadius: "10px",
                      }}
                      readOnly={!isInputEditable}
                      // value={selectInterviewDetail.title}
                      onChange={(e) => setDescriptionInput(e.target.value)}
                    />
                    {interviewTitlError && (
                      <p className="text-danger mt-2">
                        {interviewTitlError}
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
                        borderRadius: "10px",
                      }}
                      readOnly={!isInputEditable}
                      // value={selectInterviewDetail.title}
                      onChange={(e) => setDateOfInterviewInput(e.target.value)}
                    />
                    {interviewTitlError && (
                      <p className="text-danger mt-2">
                        {interviewTitlError}
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
                          borderRadius: "10px",
                        }}
                        readOnly={!isInputEditable}
                        // value={selectInterviewDetail.title}
                        onChange={(e) => setStartTimeInput(e.target.value)}
                      />
                      {interviewTitlError && (
                        <p className="text-danger mt-2">
                          {interviewTitlError}
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
                          borderRadius: "10px",
                        }}
                        readOnly={!isInputEditable}
                        // value={selectInterviewDetail.title}
                        onChange={(e) => setEndTimeInput(e.target.value)}
                      />
                      {interviewTitlError && (
                        <p className="text-danger mt-2">
                          {interviewTitlError}
                        </p>
                      )}
                    </FormGroup>
                  </div>
                </Form>
                {selectInterviewDetail.statusString === "Approved" && (
                  <div className="mt-3 d-flex justify-content-end" id="buttonCompleted">
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        completedInterview(selectInterviewDetail.interviewId);
                      }}
                      id="buttonCompletedFormInterview"
                    >
                      Completed
                    </button>
                  </div>
                )}
                <div className="d-flex gap-2 justify-content-end" >
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
                </div>
              </Col>
              <Col lg={6} className="border-start ">
                {/* ------------------------------------------------------ */}
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
                <h4>Job Overview</h4>
                <ul className="list-unstyled mt-4 mb-0">
                  <li>
                    <div className="d-flex mt-4">
                      <i className="uil uil-user icon bg-primary-subtle text-primary"></i>
                      <div className="ms-3">
                        <h6 className="fs-14 mb-0">Job Title</h6>
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
                        <h6 className="fs-14 mb-0">Experience</h6>
                        <p className="text-muted mb-0"> 0-3 Years</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex mt-4">
                      <i className="uil uil-usd-circle icon bg-primary-subtle text-primary"></i>
                      <div className="ms-3">
                        <h6 className="fs-14 mb-0">Offered Salary</h6>
                        <p className="text-muted mb-0">
                          {hiringRequestDetail.salaryPerDev}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex mt-4">
                      <i className="uil uil-graduation-cap icon bg-primary-subtle text-primary"></i>
                      <div className="ms-3">
                        <h6 className="fs-14 mb-0">Qualification</h6>
                        <p className="text-muted mb-0">Bachelor Degree</p>
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
            {/* {listInterview.length > 0 ? (
              <div className="job-overview ">
                <div>
                  <div className="d-flex flex-column gap-3">
                    <div className="d-flex justify-content-between align-items-center ">
                      <h4 class="justify-content-center ">List Interviews</h4>
                      <Link
                        to="/listInterview"
                        className="btn btn-link mb-0"
                        // style={{ backgroundColor: "#02AF74" }}
                        state={{ jobId: hiringRequestDetail.requestId }}
                      >
                        View All
                      </Link>
                    </div>
                    <Row className="d-flex flex-column gap-4">
                      {listInterviewToShow.map((listInterviewDetails, key) => (
                        <Col lg={12} md={12} key={key}>
                          <div className="dev-accepted ">
                            <div className="px-4 py-3">
                              <Row>
                                <Col lg={12}>
                                  <div className="mt-3 mt-lg-0 d-flex flex-column gap-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                      <h5 className="mb-0">
                                        <Link
                                          to="/jobdetails"
                                          className="text-dark"
                                        >
                                          {listInterviewDetails.title}
                                        </Link>{" "}
                                      </h5>
                                      <span
                                        className={
                                          "badge bg-success-subtle text-success fs-13 mt-1 mx-1"
                                        }
                                      >
                                        {listInterviewDetails.statusString}
                                      </span>
                                    </div>
                                    <div className="d-flex flex-column gap-1">
                                      <p className="text-muted fs-14 mb-0">
                                        Date:{" "}
                                        {listInterviewDetails.dateOfInterview}
                                      </p>
                                      <p className="text-muted fs-14 mb-0">
                                        Time: {listInterviewDetails.startTime} -{" "}
                                        {listInterviewDetails.endTime}
                                      </p>
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </div>
                        </Col>
                      ))}
                      <Col lg={12} md={12}>
                        <div className="dev-accepted">
                          <div className="px-4 py-3 ">
                            <Row>
                              <div
                                className="d-flex justify-content-center align-items-center"
                                style={{
                                  height: "50px",
                                }}
                              >
                                <i
                                  className=" uil uil-plus"
                                  style={{ fontSize: "20px" }}
                                ></i>
                                <span className="ms-1">Add interview</span>
                              </div>
                            </Row>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <p>No interviews available.</p>
              </div>
            )} */}

          </div>
          <div class="col-lg-11 p-0">
            <Card
              className="profile-content-page mt-4 mt-lg-0"
              style={{ borderTop: "none" }}

            >
              <Nav
                className="profile-content-nav nav-pills border-bottom"
                id="pills-tab"
                role="tablist"
              >
                <NavItem role="presentation">
                  <NavLink
                    to="#"
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
                    to="#"
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

                              <ul className="list-inline d-flex justify-content-between align-items-center">
                                <li>
                                  <div className="d-flex flex-wrap align-items-start gap-1">
                                    {candidategridDetailsNew.skills &&
                                      Array.isArray(
                                        candidategridDetailsNew.skills
                                      ) &&
                                      candidategridDetailsNew.skills
                                        .slice(0, 3)
                                        .map((skill, skillIndex) => (
                                          <span
                                            key={skillIndex}
                                            className="badge bg-success-subtle text-success fs-14 mt-1"
                                          >
                                            {skill}
                                          </span>
                                        ))}
                                    {candidategridDetailsNew.skills &&
                                      Array.isArray(
                                        candidategridDetailsNew.skills
                                      ) &&
                                      candidategridDetailsNew.skills.length > 3 && (
                                        <span className="badge bg-success-subtle text-success fs-14 mt-1">
                                          ...
                                        </span>
                                      )}
                                  </div>
                                </li>
                              </ul>
                              <div className="border rounded mb-4">
                                <div className="row g-0">
                                  <Col lg={6}>
                                    <div className="border-end px-3 py-2">
                                      <p className="text-muted mb-0">
                                        Exp. : {candidategridDetailsNew.experience}
                                      </p>
                                    </div>
                                  </Col>
                                  <Col lg={6}>
                                    <div className="px-3 py-2">
                                      <p className="text-muted mb-0">
                                        {candidategridDetailsNew.jobType}
                                      </p>
                                    </div>
                                  </Col>
                                </div>
                              </div>
                              <p className="text-muted"></p>

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
                                      className="btn btn-soft-primary btn-hover w-100 mt-2 fw-bold"
                                      onClick={() =>
                                        handleInterviewClick(
                                          candidategridDetailsNew.id
                                        )
                                      }
                                    >
                                      {loadingInterview[
                                        candidategridDetailsNew.id
                                      ] ? (
                                        <HashLoader
                                          size={20}
                                          color={"#36D7B7"}
                                          loading={true}
                                        />
                                      ) : (
                                        <>
                                          <i className="mdi mdi-account-check"></i>
                                          Interview
                                        </>
                                      )}
                                    </button>
                                    <button
                                      id="rejectButton"
                                      className="btn btn-soft-danger btn-danger w-100 mt-2 fw-bold"
                                      onClick={() =>
                                        rejectInterview2(candidategridDetailsNew.id)
                                      }
                                    >
                                      {loadingReject[candidategridDetailsNew.id] ? (
                                        <HashLoader
                                          size={20}
                                          color={"red"}
                                          loading={true}
                                        />
                                      ) : isListLoading ? (
                                        <HashLoader
                                          size={20}
                                          color={"red"}
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
                                        Create Interview {candidategridDetailsNew.interviewRound > 0 ? `Round ${candidategridDetailsNew.interviewRound + 1}` : ''}
                                      </>
                                    </button>
                                    {candidategridDetailsNew.interviewRound > 0 && (
                                      <button
                                        id="onboardButton"
                                        className="btn btn-soft-blue w-100 mt-2 fw-bold"
                                        onClick={() =>
                                          handleOnboard(candidategridDetailsNew.id)
                                        }
                                      >
                                        {loadingOnboard[candidategridDetailsNew.id] ? (
                                          <HashLoader
                                            size={20}
                                            color={"blue"}
                                            loading={true}
                                          />
                                        ) : isListLoading2 ? (
                                          <HashLoader
                                            size={20}
                                            color={"blue"}
                                            loading={true}
                                          />
                                        ) : (
                                          "Onboard"
                                        )}
                                      </button>
                                    )}
                                    <button
                                      id="rejectButton"
                                      className="btn btn-soft-danger btn-danger w-100 mt-2 fw-bold"
                                      onClick={() =>
                                        rejectInterview2(candidategridDetailsNew.id)
                                      }
                                    >
                                      {loadingReject[candidategridDetailsNew.id] ? (
                                        <HashLoader
                                          size={20}
                                          color={"red"}
                                          loading={true}
                                        />
                                      ) : isListLoading ? (
                                        <HashLoader
                                          size={20}
                                          color={"red"}
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
                                        id="rejectButton"
                                        className="btn btn-soft-danger btn-danger w-100 mt-2 fw-bold"
                                        onClick={() =>
                                          rejectInterview2(candidategridDetailsNew.id)
                                        }
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
                                    "badge bg-success-subtle text-success fs-13 mt-1 mx-1"
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
                                <div className="d-flex mb-0">
                                  <div className="flex-shrink-0">
                                    <i className="uil uil-clock-three text-primary me-1"></i>
                                  </div>
                                  <p className="text-muted  mb-0 ">{jobVacancy2Details.startTime} to {jobVacancy2Details.endTime}</p>
                                  {/* <p className="text-muted mb-0 ms-1">|</p> */}
                                  <div className="flex-shrink-0 ms-2">
                                    <i className="uil uil-calendar-alt text-primary "></i>
                                  </div>
                                  <p className="text-muted mb-0 ms-1">{jobVacancy2Details.dateOfInterview} </p>
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

                    {/* <Row id="paging">
                      <Col lg={12} className="mt-4 pt-2">
                        <nav aria-label="Page navigation example">
                          <div className="pagination job-pagination mb-0 justify-content-center">
                            <li
                              className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                            >
                              <p
                                className="page-link"
                                to="#"
                                tabIndex="-1"
                                onClick={handlePrevPage}
                              >
                                <i className="mdi mdi-chevron-double-left fs-15"></i>
                              </p>
                            </li>
                            {renderPageNumbers()}
                            <li
                              className={`page-item ${currentPage === totalPages ? "disabled" : ""
                                }`}
                            >
                              <p className="page-link" to="#" onClick={handleNextPage}>
                                <i className="mdi mdi-chevron-double-right fs-15"></i>
                              </p>
                            </li>
                          </div>
                        </nav>
                      </Col>
                    </Row> */}
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </div>
        </div>

      </section>
      <div>
      </div>
    </React.Fragment >
  );
};

export default HiringRequestDetails;

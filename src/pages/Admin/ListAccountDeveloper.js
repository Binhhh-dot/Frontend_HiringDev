import React, { useEffect, useState } from "react";
import {
  Layout,
  Button,
  Table,
  Divider,
  Tag,
  Space,
  Avatar,
  Badge,
  Input,
  Breadcrumb,
  Modal,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  InputNumber,
  Radio,
  Slider,
  Switch,
  TreeSelect,
  Upload,
  Col,
  Row,
  message,
  notification,
  Menu,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  LeftOutlined,
  RightOutlined,
  HomeOutlined,
  SnippetsOutlined,
  SolutionOutlined,
  CodeOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import userSerrvices from "../../services/user.serrvices";
import { FaSpider, FaUserAltSlash } from "react-icons/fa";
import {
  faClock,
  faPenToSquare,
  faTrashCan,
  faPlusSquare,
} from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import img0 from "../../assets/images/user/img-00.jpg";
import axios from "axios";
import employmentTypeServices from "../../services/employmentType.services";
import developerServices from "../../services/developer.services";
import Select from "react-select";
import SliderBarWeb from "../Admin/SlideBar/SiderBarWeb";
import skillService from "../../services/skill.service";
import genderServices from "../../services/gender.services";
import typeServices from "../../services/type.service";
import levelServices from "../../services/level.service";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { toast } from 'react-toastify';

import SiderBarWebAdmin from "./SlideBar/SiderBarWebAdmin";
import UpdateDeveloperAccountPopup from "./UpdateDeveloperAccountPopup/UpdateDeveloperAccountPopup";
import NavBarWebAdmin from "./NavBar/NavBarWebAdmin";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 12,
    span: 12,
  },
};

const page = {
  pageSize: 10, // Number of items per page
};

const { Column, ColumnGroup } = Table;

const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;


const ListAccountDeveloper = () => {
  let developerDetail;

  const [componentDisabled, setComponentDisabled] = useState(true);

  const [visibleModal1, setVisibleModal1] = useState(false);
  const [visibleModal2, setVisibleModal2] = useState(false);
  const [visibleModal3, setVisibleModal3] = useState(false);
  const [visibleModal4, setVisibleModal4] = useState(false);

  const showModal1 = () => {
    setVisibleModal1(true);
  };

  //----------------------------------------------------------------------------------------
  const [developerIdAccount, setDeveloperIdAccount] = useState(null);

  const showModal2 = (developerId) => {
    setDeveloperIdAccount(developerId);
    setVisibleModal2(true);
  };

  const closedModal2 = () => {
    setVisibleModal2(false);
    fetchDeveloperPaging();
  };

  //----------------------------------------------------------------------------------------
  const showModal3 = () => {
    setVisibleModal3(true);
  };
  const showModal4 = () => {
    setVisibleModal4(true);
  };
  const handleOk = () => {
    setVisibleModal1(false);
    setVisibleModal2(false);
    setVisibleModal3(false);
    setVisibleModal4(false);
  };

  const handleCancel = () => {
    setVisibleModal1(false);
    setVisibleModal2(false);
    setVisibleModal3(false);
    setVisibleModal4(false);
  };

  const onFinish = (values) => {
    console.log(values);
  };
  // const onReset = () => {
  //   formRef.current?.resetFields();
  // };
  // const formRef = React.useRef(null);

  const [modal, contextHolder] = Modal.useModal();

  const confirm = () => {
    modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "Do you want to delete?",
      okText: "Yes",
      cancelText: "No",
    });
  };

  //API
  const [developer, setDeveloper] = useState([]);

  const fetchDeveloperPaging = async () => {
    try {
      const response = await userSerrvices.getListDeveloper();
      setDeveloper(response.data.data);
      return response;
    } catch (error) {
      console.error("Error fetching user paging:", error);
      throw error;
    }
  };
  useEffect(() => {
    fetchDeveloperPaging().then((data) => {
      console.log("User paging data:", data);
    });
  }, []);

  //Create Dev

  document.title = "Create Developer Account";

  const [options, setOptions] = useState([]);
  const [options2, setOptions2] = useState([]);
  const [options7, setOptions7] = useState([]);
  const [options3, setOptions3] = useState([]);
  const [options4, setOptions4] = useState([]);
  const [options5, setOptions5] = useState([]);
  const [options6, setOptions6] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOptions2, setSelectedOptions2] = useState([]);
  const [selectedOptions7, setSelectedOptions7] = useState([]);
  const [selectedOptions3, setSelectedOptions3] = useState([]);
  const [selectedOptions4, setSelectedOptions4] = useState([]);
  const [selectedOptions5, setSelectedOptions5] = useState([]);
  const [selectedOptions6, setSelectedOptions6] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };
  const handleChange2 = (selected) => {
    setSelectedOptions2(selected);
  };
  const handleChange7 = (selected) => {
    setSelectedOptions7(selected);
    console.log(selected);
  };
  const handleChange3 = (selected) => {
    setSelectedOptions3(selected);
  };
  const handleChange5 = (selected) => {
    setSelectedOptions5(selected);
  };
  const handleChange6 = (selected) => {
    setSelectedOptions6(selected);
  };

  const handleChange4 = (selected) => {
    setSelectedOptions4(selected);
    setImageUrl(selected.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response7 = await genderServices.getAllGender();
        const genderList = response7.data.data;
        const options7 = genderList.map((gender) => ({
          value: gender.genderId, // src là giá trị
          label: gender.genderName, // devFulName là nhãn
        }));
        console.log(options7);
        setOptions7(options7);
      } catch (error) {
        console.error("Error fetching gender:", error);
      }

      try {
        const response = await skillService.getAllSkill();
        const activeSkills = response.data.data.filter(
          (skill) => skill.statusString === "Active"
        );
        const formattedSkills = activeSkills.map((skill) => ({
          value: skill.skillId.toString(),
          label: skill.skillName,
        }));
        console.log(formattedSkills);
        setOptions(formattedSkills);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }

      try {
        const response2 = await typeServices.getAllType();
        const activeTypes = response2.data.data.filter(
          (type) => type.statusString === "Active"
        );
        const formattedTypes = activeTypes.map((type) => ({
          value: type.typeId.toString(),
          label: type.typeName,
        }));
        console.log(formattedTypes);
        setOptions2(formattedTypes);
      } catch (error) {
        console.error("Error fetching types:", error);
      }

      try {
        const response3 = await levelServices.getAllLevel();
        const activeLevels = response3.data.data.filter(
          (level) => level.statusString === "Active"
        );

        const formattedLevels = activeLevels.map((level) => ({
          value: level.levelId.toString(),
          label: level.levelName,
        }));
        console.log(formattedLevels);
        setOptions3(formattedLevels);
      } catch (error) {
        console.error("Error fetching levels:", error);
      }

      try {
        const response6 = await employmentTypeServices.getAllEmploymentType();
        const activeEmploymentType = response6.data.data.filter(
          (employmentType) => employmentType.statusString === "Active"
        );
        const formattedEmploymentType = activeEmploymentType.map(
          (employmentType) => ({
            value: employmentType.employmentTypeId.toString(),
            label: employmentType.employmentTypeName,
          })
        );
        console.log(formattedEmploymentType);
        setOptions6(formattedEmploymentType);
      } catch (error) {
        console.error("Error fetching employment typeName:", error);
      }
    };

    fetchData();
  }, []);

  const [firstNameError, setFirstNameError] = useState(null);
  const [lastNameError, setLastNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [levelError, setLevelError] = useState(null);

  const [employmentTypeError, setEmploymentTypeError] = useState(null);
  const [genderError, setGenderError] = useState(null);
  const [skillError, setSkillError] = useState(null);
  const [avarageSalaryError, setAvarageSalaryError] = useState(null);
  const [yearOfExperienceError, setYearOfExperienceError] = useState(null);
  const [phoneNumberError, setPhoneNumberError] = useState(null);
  const [dateOfBirthError, setDateOfBirthError] = useState(null);

  const handleOKCreate = async () => {
    try {
      await handleCreateDev();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // const handleOKUpdate = async () => {
  //   try {
  //     await handleUpdateDev();
  //   } catch (error) {
  //     console.error("Error deleting user:", error);
  //   }
  // };

  const handleCreateDev = async () => {
    // Kiểm tra xem có userID trong localStorage không
    let check = true;
    if (!document.getElementById("first-name").value) {
      setFirstNameError("Please enter a first-name.");
      check = false;
    } else {
      setFirstNameError(null);
    }

    if (!document.getElementById("last-name").value) {
      setLastNameError("Please enter a last-name.");
      check = false;
    } else {
      setLastNameError(null);
    }

    if (!document.getElementById("email").value) {
      setEmailError("Please enter an email");
      check = false;
    } else {
      setEmailError(null);
    }

    if (selectedOptions2.length === 0) {
      setTypeError("Please select at least one type");
      check = false;
    } else {
      setTypeError(null);
    }

    if (!selectedOptions3.value) {
      setLevelError("Please select the level ");
      check = false;
    } else {
      setLevelError(null);
    }

    if (!selectedOptions6.value) {
      setEmploymentTypeError("Please select the employment type ");
      check = false;
    } else {
      setEmploymentTypeError(null);
    }

    if (!selectedOptions7.value) {
      setGenderError("Please select the gender");
      check = false;
    } else {
      setGenderError(null);
    }

    // Kiểm tra lỗi cho Skill requirement
    if (selectedOptions.length === 0) {
      setSkillError("Please select at least one skill");
      check = false;
    } else {
      setSkillError(null);
    }

    if (
      !document.getElementById("avarage-salary").value ||
      parseInt(document.getElementById("avarage-salary").value, 10) <= 0
    ) {
      setAvarageSalaryError("Please enter the avarage salary(greater than 0)");
      check = false;
    } else {
      setAvarageSalaryError(null);
    }

    if (
      !document.getElementById("year-of-experience").value ||
      parseInt(document.getElementById("year-of-experience").value, 10) <= 0
    ) {
      setYearOfExperienceError(
        "Please enter the year of experience(greater than 0)"
      );
      check = false;
    } else {
      setYearOfExperienceError(null);
    }

    if (!document.getElementById("phone-number").value) {
      setPhoneNumberError("Please enter a phone number");
      check = false;
    } else {
      setPhoneNumberError(null);
    }

    // Kiểm tra lỗi cho Duration
    if (!document.getElementById("date-of-birth").value) {
      check = false;
      setDateOfBirthError("Please enter the date of birth");
    } else {
      setDateOfBirthError(null);
    }
    if (check) {
      try {
        const firstName = document.getElementById("first-name").value;
        const lastName = document.getElementById("last-name").value;
        const email = document.getElementById("email").value;
        const avarageSalary = document.getElementById("avarage-salary").value;
        const yearOfExperience =
          document.getElementById("year-of-experience").value;
        const phoneNumber = document.getElementById("phone-number").value;
        const dateOfBirth = document.getElementById("date-of-birth").value; // replace with actual value from the type dropdown
        const levelRequireId = selectedOptions3.value; // replace with actual value from the level dropdown
        const employmentTypeId = selectedOptions6.value;
        const genderId = selectedOptions7.value;
        const skillIds = selectedOptions.map((skill) => skill.value);
        const typeRequireId = selectedOptions2.map((type) => type.value);
        const response = await developerServices.CreateDeveloperAccount(
          firstName,
          lastName,
          email,
          phoneNumber,
          genderId,
          dateOfBirth,
          yearOfExperience,
          avarageSalary,
          employmentTypeId,
          levelRequireId,
          typeRequireId,
          skillIds
        );
        console.log(response);
        toast.success("Create account successfully!")
        fetchDeveloperPaging();
        setVisibleModal1(false);
      } catch (error) {
        console.error("Error create dev:", error);
        toast.error("Create account fail!")

      }
    } else {
    }
  };

  // const [userImage3, setUserImage3] = useState(null);
  // const [userDataDetail, setUserDataDetail] = useState({});
  // const [userImage, setUserImage] = useState(null);

  // const [avatar, setAvatar] = useState(null);

  // const handleChooseAvatar = () => {
  //   const inputElement = document.getElementById("profile-img-file-input");
  //   inputElement.click();
  // };

  // const handlePreviewAvatar = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     file.preview = URL.createObjectURL(file);
  //     setAvatar(file);
  //   }
  // };

  //-----------------------------------------------------------------------------------------------------

  const [hRInfo, setHrInfo] = useState({});
  const handleRowClick = (developerId) => {
    fetchDeveloperById(developerId);
    showModal3();
  };
  const fetchDeveloperById = async (developerId) => {
    let response;
    try {
      response = await userSerrvices.getDeveloperById(developerId);
      setHrInfo(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching developer by id:", error);
    }
  };
  useEffect(() => {
    fetchDeveloperById();
  }, [hRInfo]);

  //-----------------------------------------------------------------------------------------------------
  //Delete
  const [userId, setUserId] = useState(null);

  const handleDeleteClick = (userId) => {
    showModal4();
    setUserId(userId);
  };

  const handleDeleteConfirm = async (userId) => {
    try {
      await userSerrvices.deleteDeveloper(userId);
      toast.success("Account deleted successfully!")

    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Account deleted fails")

    }
  };

  const handleOkDelete = async () => {
    try {
      await handleDeleteConfirm(userId);
      setVisibleModal4(false);
      fetchDeveloperPaging();
    } catch (error) {
      // Handle any errors that might occur during the deletion process
      console.error("Error deleting user:", error);
      // Optionally, you can show an error message to the user
    }
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const [switchStatusMap, setSwitchStatusMap] = useState({});

  return (
    <React.Fragment>
      <Layout style={{ minHeight: "100vh" }}>
        <SiderBarWebAdmin choose={"menu-key/5"}></SiderBarWebAdmin>
        {/* <SiderBarWebAdmin choose={"menu-key/5"}></SiderBarWebAdmin> */}
        <Layout>

          <NavBarWebAdmin></NavBarWebAdmin>

          <div
            style={{
              padding: "10px 5px 0px 5px",
              background: "white",
              margin: "30px",
              borderRadius: "12px",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
          >
            <Content>
              <h1
                style={{
                  padding: "5px 0px 0px 0px",
                  margin: "0px 0px 0px 20px",
                  color: "black",
                  fontSize: "20px",
                  fontWeight: "bold"
                }}
              >
                MANAGE DEVELOPER
              </h1>

              <a
                className="me-1 d-flex flex-column align-items-end"
                onClick={showModal1}
              >
                <FontAwesomeIcon size="2xl" icon={faPlusSquare} />
              </a>
              <div
                style={{
                  padding: 25,
                  minHeight: 400,
                }}
              >
                <div style={{ height: "600px", overflow: "auto" }}>
                  <Table
                    className="custom-table"
                    dataSource={developer}
                    pagination={page}
                    onRow={(record, rowIndex) => {
                      return {
                        onClick: (event) => {
                          handleRowClick(record.developerId);
                        },
                      };
                    }}
                    size="middle"
                    components={{
                      header: {
                        cell: (props) => (
                          <th
                            {...props}
                            style={{
                              background: "hsl(253deg 61% 85%)",
                              border: "none",
                            }}
                          />
                        ),
                      },
                    }}
                    rowClassName={(record, index) =>
                      index % 2 === 0 ? "even-row" : "odd-row"
                    }
                  >
                    <Column
                      title="Code Name"
                      dataIndex="codeName"
                      key="codeName"
                    />

                    <Column
                      title="FirstName"
                      dataIndex="firstName"
                      key="firstName"
                    />
                    <Column
                      title="LastName"
                      dataIndex="lastName"
                      key="lastName"
                    />
                    <Column
                      title="Email"
                      dataIndex="email"
                      key="email"
                      width={120}
                    />

                    <Column
                      title="Gender"
                      dataIndex="genderString"
                      key="genderString"
                    />
                    <Column
                      title="Year Of Experience"
                      dataIndex="yearOfExperience"
                      key="yearOfExperience"
                      width={100}
                    />
                    <Column
                      title="Salary"
                      dataIndex="averageSalary"
                      key="averageSalary"
                      width={80}
                    />

                    <Column
                      width={100}
                      title="Status"
                      dataIndex="devStatusString"
                      key="devStatusString"
                      render={(text, record) => (
                        <span
                          className={
                            text === "Available"
                              ? "badge text-bg-success"
                              : text === "Selected On Request"
                                ? "badge text-bg-info"
                                : "badge bg-warning text-light"
                          }
                        >
                          {text}
                        </span>
                      )}
                    />
                    <Column
                      title="Action"
                      key="action"
                      render={(_, record) => (
                        <Space size="middle">
                          <a
                            onClick={(event) => {
                              //handleEditClick(record.developerId);
                              showModal2(record.developerId);
                              event.stopPropagation();
                            }}
                          >
                            <FontAwesomeIcon
                              style={{ color: "#6d73f6" }}
                              size="xl"
                              icon={faPenToSquare}
                            />
                          </a>
                          <Switch
                            checked={record.statusString === 'Active' && (switchStatusMap[record.userId] || true)}
                            onChange={(checked, event) => {
                              event.stopPropagation();

                              handleDeleteClick(record.userId);
                              setSwitchStatusMap((prevMap) => ({ ...prevMap, [record.userId]: checked }));
                            }}

                            size="small" // Set size to "small" for iOS-like appearance
                            style={{ backgroundColor: record.userStatus === 'Active' ? '#4CD964' : '#D1D1D6', borderColor: record.userStatus === 'Active' ? '#4CD964' : '#D1D1D6' }}
                          />
                        </Space>
                      )}
                    />
                  </Table>
                </div>

                <Modal
                  centered
                  visible={visibleModal4}
                  onOk={handleOkDelete}
                  onCancel={handleCancel}
                  footer={[
                    <Button
                      key="cancel"
                      className="badge text-bg-secondary"
                      onClick={handleCancel}
                    >
                      No
                    </Button>,
                    <Button
                      key="confirm"
                      className="badge text-bg-danger"
                      onClick={handleOkDelete}
                    >
                      Yes
                    </Button>,
                  ]}
                >
                  <ExclamationCircleOutlined
                    style={{
                      fontSize: "40px",
                      margin: "auto",
                      display: "block",
                      color: "yellow",
                    }}
                  />
                  <p style={{ textAlign: "center", fontWeight: "bold" }}>
                    Are you sure you want to change your account status?
                  </p>
                </Modal>
              </div>
            </Content>
          </div>

          <Modal
            centered
            title="Details Account"
            visible={visibleModal3}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
            width={800}
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {hRInfo && (
              <div
                style={{
                  padding: "10px",
                  fontSize: "16px",
                  display: "flex", // Use flexbox
                  justifyContent: "space-between", // Align items to left and right
                  flexWrap: "wrap", // Wrap content to the next line if needed
                }}
              >
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "50%", // Adjust as needed
                  }}
                >
                  {hRInfo.userImage ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start", // Align at the top
                        marginBottom: "10px",
                        width: "100%", // Occupy full width
                      }}
                    >
                      <img
                        src={hRInfo.userImage}
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                          marginBottom: "10px",
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        marginBottom: "10px",
                      }}
                    >
                      <FaUserAltSlash
                        style={{
                          fontSize: "24px",
                          color: "#6d73f6",
                        }}
                      />
                      <span>No Image</span>
                    </div>
                  )}

                  <p>
                    <strong>Code Name:</strong> {hRInfo.codeName}
                  </p>
                  <p>
                    <strong>Name:</strong>{" "}
                    {`${hRInfo.firstName} ${hRInfo.lastName}`}
                  </p>
                  <p>
                    <strong>Email:</strong> {hRInfo.email}
                  </p>
                  <p>
                    <strong>Password:</strong> {hRInfo.password}
                  </p>
                  <p>
                    <strong>Phone:</strong> {hRInfo.phoneNumber}
                  </p>

                  <p>
                    <strong>Date Of Birth:</strong> {hRInfo.dateOfBirth}
                  </p>
                  <p>
                    <strong>Gender Name: </strong> {hRInfo.genderName}
                  </p>
                </div>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "50%", // Adjust as needed
                  }}
                >
                  <p>
                    <strong>Year Of Experience:</strong>{" "}
                    {hRInfo.yearOfExperience}
                  </p>

                  <p>
                    <strong>Average Salary:</strong> {hRInfo.averageSalary}
                  </p>
                  <p>
                    <strong>Employment Type Name:</strong>{" "}
                    {hRInfo.employmentTypeName}
                  </p>
                  <p>
                    <strong>Developer Status:</strong>{" "}
                    <span
                      className={
                        hRInfo.devStatusString === "On Working"
                          ? "badge bg-warning text-light"
                          : hRInfo.devStatusString === "Selected On Request"
                            ? "badge bg-info text-light"
                            : hRInfo.devStatusString === "Available"
                              ? "badge bg-success text-light"
                              : "badge text-bg-danger"
                      }
                    >
                      {hRInfo.devStatusString}
                    </span>
                  </p>
                  <p>
                    <strong>Account Status:</strong>{" "}
                    <span
                      className={
                        hRInfo.userStatusString === "Active"
                          ? "badge  text-bg-success"
                          : hRInfo.userStatusString === "Selected On Request"
                            ? "badge bg-warning text-light"
                            : "badge text-bg-danger"
                      }
                    >
                      {hRInfo.userStatusString}
                    </span>
                  </p>

                  {/* Additional Fields */}
                  {hRInfo.level && (
                    <p>
                      <strong>Level:</strong> {hRInfo.level.levelName}
                    </p>
                  )}
                  {hRInfo.skills && (
                    <p>
                      <strong>Skills:</strong>{" "}
                      {hRInfo.skills.map((skill, index) => (
                        <span
                          key={index}
                          style={{
                            display: "inline-block",
                            padding: "0.25em 0.25em",
                            margin: "0.1em",
                            borderRadius: "0.4em",
                            backgroundColor: "#C0C0C0", // Màu xanh dương của badge-info
                            color: "#000000", // Màu chữ trắng
                          }}
                        >
                          {skill.skillName}
                        </span>
                      ))}
                    </p>
                  )}

                  {hRInfo.types && hRInfo.types[0] && (
                    <p>
                      <strong>Type:</strong> {hRInfo.types[0].typeName}
                    </p>
                  )}
                </div>
              </div>
            )}
          </Modal>

          {contextHolder}
          <Modal
            centered
            visible={visibleModal1}
            onOk={handleOKCreate}
            onCancel={handleCancel}
            width={1000}
            footer={null}
          >
            <React.Fragment>
              <section className="section py-0">
                <div className=" ">
                  <div className="row justify-content-center  ">
                    <div className="rounded  bg-white">
                      <div className="custom-form">
                        <div id="message3"></div>
                        <form
                          method="post"
                          action="php/contact.php"
                          name="contact-form"
                          id="contact-form3"
                        >
                          <h4 class="text-dark mb-3">
                            Create new account developer
                          </h4>
                          <div class="row">
                            <div class="col-md-6">
                              <div class="form-group app-label mt-2">
                                <label class="text-muted">First name:</label>
                                <input
                                  id="first-name"
                                  type="text"
                                  class="form-control resume"
                                  placeholder=""
                                ></input>
                                {firstNameError && (
                                  <p className="text-danger mt-2">
                                    {firstNameError}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group app-label mt-2">
                                <label class="text-muted">Last name:</label>
                                <input
                                  id="last-name"
                                  type="text"
                                  class="form-control resume"
                                  placeholder=""
                                ></input>
                                {lastNameError && (
                                  <p className="text-danger mt-2">
                                    {lastNameError}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-6">
                              <div class="form-group app-label mt-2">
                                <label class="text-muted">Email</label>
                                <input
                                  id="email"
                                  type="email"
                                  class="form-control resume"
                                  placeholder="abc@gmail.com"
                                ></input>
                                {emailError && (
                                  <p className="text-danger mt-2">
                                    {emailError}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div class="col-md-6">
                              <div className="form-group app-label mt-2">
                                <label className="text-muted">Gender</label>
                                <div className="form-button">
                                  <Select
                                    options={options7}
                                    value={selectedOptions7}
                                    onChange={handleChange7}
                                    style={{ width: "100%" }}
                                  />
                                </div>
                                {genderError && (
                                  <p className="text-danger mt-2">
                                    {genderError}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-6">
                              <div class="form-group app-label mt-2">
                                <label class="text-muted">Date of birth</label>
                                <input
                                  id="date-of-birth"
                                  type="date"
                                  class="custom-date resume"
                                ></input>
                                {dateOfBirthError && (
                                  <p className="text-danger mt-2">
                                    {dateOfBirthError}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div class="col-md-6">
                              <div class="form-group app-label mt-2">
                                <label class="text-muted">Phone Number</label>
                                <input
                                  id="phone-number"
                                  type="number"
                                  class="form-control resume"
                                  placeholder="+8426265656"
                                ></input>
                                {phoneNumberError && (
                                  <p className="text-danger mt-2">
                                    {phoneNumberError}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-6">
                              <div class="form-group app-label mt-2">
                                <label class="text-muted">Avarage Salary</label>
                                <input
                                  id="avarage-salary"
                                  type="number"
                                  class="form-control resume"
                                ></input>
                                {avarageSalaryError && (
                                  <p className="text-danger mt-2">
                                    {avarageSalaryError}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div class="col-md-6">
                              <div class="form-group app-label mt-2">
                                <label class="text-muted">
                                  Year of Experience
                                </label>
                                <input
                                  id="year-of-experience"
                                  type="number"
                                  class="form-control resume"
                                  placeholder="2"
                                ></input>
                                {yearOfExperienceError && (
                                  <p className="text-danger mt-2">
                                    {yearOfExperienceError}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group app-label mt-2">
                                <label className="text-muted">
                                  Type requirement
                                </label>
                                <div className="form-button">
                                  <Select
                                    isMulti
                                    options={options2}
                                    value={selectedOptions2}
                                    onChange={handleChange2}
                                    style={{ width: "100%" }}
                                  />
                                </div>
                                {typeError && (
                                  <p className="text-danger mt-2">
                                    {typeError}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div class="form-group app-label mt-2">
                                <label class="text-muted">
                                  Level requirement
                                </label>
                                <div class="form-button">
                                  <div className="form-button">
                                    <Select
                                      options={options3}
                                      value={selectedOptions3}
                                      onChange={handleChange3}
                                      style={{ width: "100%" }}
                                    />
                                  </div>
                                  {levelError && (
                                    <p className="text-danger mt-2">
                                      {levelError}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group app-label mt-2">
                                <label className="text-muted">
                                  Skill requirement
                                </label>
                                <div className="form-button">
                                  <Select
                                    isMulti
                                    options={options}
                                    value={selectedOptions}
                                    onChange={handleChange}
                                    style={{ width: "100%" }}
                                  />
                                </div>
                                {skillError && (
                                  <p className="text-danger mt-2">
                                    {skillError}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div class="form-group app-label mt-2">
                                <label class="text-muted">
                                  Employment Type
                                </label>
                                <div class="form-button">
                                  <div className="form-button">
                                    <Select
                                      options={options6}
                                      value={selectedOptions6}
                                      onChange={handleChange6}
                                      style={{ width: "100%" }}
                                    />
                                  </div>
                                </div>
                                {employmentTypeError && (
                                  <p className="text-danger mt-2">
                                    {employmentTypeError}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-12 mt-2 d-flex justify-content-end">
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={handleOKCreate}
                            >
                              Create
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </React.Fragment>
          </Modal>

          {/* ------------------------------------------------------------------------------------------------- */}
          <UpdateDeveloperAccountPopup
            isOpen={visibleModal2}
            closeModal={closedModal2}
            developerId={developerIdAccount}
          ></UpdateDeveloperAccountPopup>
          {/* ------------------------------------------------------------------------------------------------- */}
        </Layout>
      </Layout>
    </React.Fragment>
  );
};

export default ListAccountDeveloper;

import React, { useEffect, useState } from 'react'
import {
    Layout, Button, Table, Divider, Tag, Space, Avatar, Badge, Input, Breadcrumb,
    Modal, Cascader, Checkbox, DatePicker, Form, InputNumber, Radio,
    Slider, Switch, TreeSelect, Upload, Col, Row, message, notification, Menu
} from 'antd';
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
    ExclamationCircleOutlined
} from "@ant-design/icons";
import userSerrvices from "../../services/user.serrvices";
import { FaSpider, FaUserAltSlash } from 'react-icons/fa';
import {
    faClock,
    faPenToSquare,
    faTrashCan,
    faPlusSquare,

} from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import img0 from "../../assets/images/user/img-00.jpg";
import axios from "axios";
import employmentTypeServices from '../../services/employmentType.services';
import developerServices from '../../services/developer.services';
import scheduleTypeService from './/../../services/scheduleType';
import Select from 'react-select';
import SliderBarWeb from "../Admin/SlideBar/SiderBarWeb"


const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
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
    pageSize: 6, // Number of items per page
};

const { Column, ColumnGroup } = Table;

const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;
const items = [
    {
        label: "Dashboard",
        key: "menu-key/1",
        icon: <HomeOutlined />,
        className: "option-1",
    },
    {
        label: "Option 2",
        key: "menu-key/2",
        icon: <DesktopOutlined />,
        className: "option-2",
    },
    {
        label: "User",
        key: "menu-key/sub-menu-key",
        icon: <UserOutlined />,
        children: [
            { label: "Manager", key: "menu-key/sub-menu-key/3" },
            { label: "Staff", key: "menu-key/sub-menu-key/4" },
            { label: "Hr", key: "menu-key/sub-menu-key/5" },
        ],
        className: "option-2",
    },
    {
        label: "Team",
        key: "menu-key/sub-menu-key2",
        icon: <TeamOutlined />,
        children: [
            { label: "Team 1", key: "menu-key/sub-menu-key2/6" },
            { label: "Team 2", key: "menu-key/sub-menu-key2/8" },
        ],
    },
    {
        label: "Files",
        key: "menu-key/9",
        icon: <FileOutlined />,
        className: "files",
    },
    {
        label: "Hiring Request",
        key: "menu-key/10",
        icon: <SnippetsOutlined />,
        className: "hiringRequest",
    },
    {
        label: "Interview",
        key: "menu-key/11",
        icon: <SolutionOutlined />,
        className: "interview",
    },

    {
        label: "Project",
        key: "menu-key/12",
        icon: <CodeOutlined />,
        className: "project",
    },
];

const ListAccountDeveloper = () => {

    const [selectedKeys, setSelectedKeys] = useState(["menu-key/10"]); // Định nghĩa selectedKeys
    const [isLeftIcon, setIsLeftIcon] = useState(true);
    const [showWeHire, setShowWeHire] = useState(true);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
        setIsLeftIcon(!isLeftIcon); // Cập nhật biến trạng thái khi toggleSidebar
        setShowWeHire(!showWeHire);
    };

    const handleMenuClick = (item) => {
        setSelectedKeys([item.key]);
    };

    const handleSubMenuClick = (item) => {
        setSelectedKeys([item.key]);
    };
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState({});

    // const handleRowClick = (record) => {
    //     setSelectedRecord(record);
    //     setModalVisible(true);
    // };



    const handleCancelDetail = () => {
        setModalVisible(false);
    };


    const [componentDisabled, setComponentDisabled] = useState(true);

    const [collapsed, setCollapsed] = useState(false);

  
    const [visibleModal1, setVisibleModal1] = useState(false);
    const [visibleModal2, setVisibleModal2] = useState(false);
    const [visibleModal3, setVisibleModal3] = useState(false);
    const [visibleModal4, setVisibleModal4] = useState(false);



    const showModal1 = () => {
        setVisibleModal1(true);
    };

    const showModal2 = () => {
        setVisibleModal2(true);
    };
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
    const onReset = () => {
        formRef.current?.resetFields();
    };
    const formRef = React.useRef(null);

    const [modal, contextHolder] = Modal.useModal();
    const confirm = () => {
        modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: 'Do you want to delete?',
            okText: 'Yes',
            cancelText: 'No',
        });
    };
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;


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
    });

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
                const response4 = await axios.get("https://wehireapi.azurewebsites.net/api/Cv");
                const cvList = response4.data.data;
                const options4 = cvList.map(cv => ({
                    value: cv.src, // src là giá trị
                    label: cv.cvCode, // devFulName là nhãn
                    id: cv.cvId
                }));
                console.log(options4)
                setOptions4(options4);
                if (options4.length > 0) {
                    setSelectedOptions4(options4[0]);
                    setImageUrl(options4[0].value);
                }
            } catch (error) {
                console.error("Error fetching levels:", error);
            }

            try {
                const response7 = await axios.get("https://wehireapi.azurewebsites.net/api/Gender");
                const genderList = response7.data.data;
                const options7 = genderList.map(gender => ({
                    value: gender.genderId, // src là giá trị
                    label: gender.genderName, // devFulName là nhãn
                }));
                console.log(options7);
                setOptions7(options7);
            } catch (error) {
                console.error("Error fetching gender:", error);
            }

            try {
                const response = await axios.get("https://wehireapi.azurewebsites.net/api/Skill");
                const activeSkills = response.data.data.filter(skill => skill.statusString === "Active");
                const formattedSkills = activeSkills.map(skill => ({
                    value: skill.skillId.toString(),
                    label: skill.skillName
                }));
                setOptions(formattedSkills);
            } catch (error) {
                console.error("Error fetching skills:", error);
            }

            try {
                const response2 = await axios.get("https://wehireapi.azurewebsites.net/api/Type");
                const activeTypes = response2.data.data.filter(type => type.statusString === "Active");
                const formattedTypes = activeTypes.map(type => ({
                    value: type.typeId.toString(),
                    label: type.typeName
                }));
                console.log(formattedTypes)
                setOptions2(formattedTypes);
            } catch (error) {
                console.error("Error fetching types:", error);
            }

            try {
                const response3 = await axios.get("https://wehireapi.azurewebsites.net/api/Level");
                const activeLevels = response3.data.data.filter(level => level.statusString === "Active");
                const formattedLevels = activeLevels.map(level => ({
                    value: level.levelId.toString(),
                    label: level.levelName
                }));
                setOptions3(formattedLevels);
            } catch (error) {
                console.error("Error fetching levels:", error);
            }


            try {
                const response5 = await scheduleTypeService.getAllScheduleType();
                const activeScheduleType = response5.data.data.filter(scheduleType => scheduleType.statusString === "Active");
                const formattedScheduleType = activeScheduleType.map(scheduleType => ({
                    value: scheduleType.scheduleTypeId.toString(),
                    label: scheduleType.scheduleTypeName
                }));
                setOptions5(formattedScheduleType);
            } catch (error) {
                console.error("Error fetching schedule type:", error);
            }

            try {
                const response6 = await employmentTypeServices.getAllEmploymentType();
                const activeEmploymentType = response6.data.data.filter(employmentType => employmentType.statusString === "Active");
                const formattedEmploymentType = activeEmploymentType.map(employmentType => ({
                    value: employmentType.employmentTypeId.toString(),
                    label: employmentType.employmentTypeName
                }));
                setOptions6(formattedEmploymentType);
            } catch (error) {
                console.error("Error fetching employment typeName:", error);
            }


        };
        fetchData();

    }, []);

    const [firstNameError, setFirstNameError] = useState([]);
    const [lastNameError, setLastNameError] = useState([]);
    const [emailError, setEmailError] = useState([]);
    const [typeError, setTypeError] = useState([]);
    const [levelError, setLevelError] = useState([]);
    const [scheduleTypeError, setScheduleTypeError] = useState([]);
    const [employmentTypeError, setEmploymentTypeError] = useState([]);
    const [genderError, setGenderError] = useState([]);
    const [skillError, setSkillError] = useState([]);
    const [avarageSalaryError, setAvarageSalaryError] = useState([]);
    const [yearOfExperienceError, setYearOfExperienceError] = useState([]);
    const [phoneNumberError, setPhoneNumberError] = useState([]);
    const [dateOfBirthError, setDateOfBirthError] = useState([]);



    const handleOkUpdate = async () => {
        try {
            await handleCreateDev();
           setVisibleModal1(false);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

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

        // if (!selectedOptions5.value) {
        //     setEmploymentTypeError("Please select the employment type ");
        //     check = false;
        // } else {
        //     setEmploymentTypeError(null);
        // }

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

        if (!document.getElementById("avarage-salary").value || parseInt(document.getElementById("avarage-salary").value, 10) <= 0) {
            setAvarageSalaryError("Please enter the avarage salary(greater than 0)");
            check = false;
        } else {
            setAvarageSalaryError(null);
        }

        if (!document.getElementById("year-of-experience").value || parseInt(document.getElementById("year-of-experience").value, 10) <= 0) {
            setYearOfExperienceError("Please enter the year of experience(greater than 0)");
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
            //     const currentDate = new Date();
            //     const selectedDate = new Date(document.getElementById("duration").value);
            //     const sevenDaysLater = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000); // Thêm 7 ngày

            //     if (selectedDate < sevenDaysLater) {
            //         setDurationError("Please enter a date that is at least 7 days greater than the current date.");
            //         check = false;
            //     } else {
            setDateOfBirthError(null);
            // }
        }
        if (check) {
            try {
                const firstName = document.getElementById("first-name").value;
                const lastName = document.getElementById("last-name").value;
                const email = document.getElementById("email").value;
                const avarageSalary = document.getElementById("avarage-salary").value;
                const yearOfExperience = document.getElementById("year-of-experience").value;
                const phoneNumber = document.getElementById("phone-number").value;
                const dateOfBirth = document.getElementById("date-of-birth").value; // replace with actual value from the type dropdown
                const levelRequireId = selectedOptions3.value; // replace with actual value from the level dropdown
                const scheduleTypeId = selectedOptions6.value;
                const employmentTypeId = selectedOptions6.value;
                const genderId = selectedOptions7.value;
                const cvId = selectedOptions4.id;
                const skillIds = selectedOptions.map((skill) => skill.value);
                const typeRequireId = selectedOptions2.map((type) => type.value);
                const response = await developerServices.CreateDeveloperAccount(
                    firstName, lastName, email, phoneNumber, genderId, dateOfBirth, yearOfExperience, avarageSalary, cvId, scheduleTypeId, employmentTypeId, levelRequireId, typeRequireId, skillIds
                );
                console.log(response)
                message.success({
                    content: 'Account Created Successfully',
                    duration: 2,
                    onClose: () => {
                        console.log('Toast closed');
                    },
                    style: {
                        marginTop: '50px',
                        marginRight: '50px',
                    },
                });
            } catch (error) {
                console.error("Error create dev:", error);
                message.error({
                    content: 'Error creating account ',
                    duration: 2,
                    style: {
                        marginTop: '50px',
                        marginRight: '50px',
                    },
                });

            }
        }
    };

    // Update 

    const [hRInfo, setHrInfo] =
        useState(null);
    const handleRowClick = (developerId) => {
        fetchDeveloperById(developerId);
        showModal3();
    };
    const fetchDeveloperById = async (developerId) => {
        let response;
        try {
            response = await userSerrvices.getDeveloperById(
                developerId
            );
            setHrInfo(response.data.data);
            console.log(response.data.data);
            return response;
        } catch (error) {
            console.error("Error fetching hiring request detail overview:", error);
        }
    };
    useEffect(() => {
        fetchDeveloperById();
    }, [hRInfo]);

    //Delete 
    const [userId, setUserId] = useState(null);

    const handleDeleteClick = (userId) => {
        showModal4();
        setUserId(userId);
    };

    const handleDeleteConfirm = async (userId) => {
        try {
            await userSerrvices.deleteDeveloper(userId);
            message.success({
                content: 'Account deleted successfully',
                duration: 2,
                onClose: () => {
                    console.log('Toast closed');
                },
                style: {
                    marginTop: '50px',
                    marginRight: '50px',
                },
            });
        } catch (error) {
            console.error('Update failed:', error);
            message.error({
                content: 'Error Deleting account ',
                duration: 2,
                style: {
                    marginTop: '50px',
                    marginRight: '50px',
                },
            });
        }
    };

    const handleOkDelete = async () => {
        try {
            await handleDeleteConfirm(userId);
            setVisibleModal4(false);
        } catch (error) {
            // Handle any errors that might occur during the deletion process
            console.error("Error deleting user:", error);
            // Optionally, you can show an error message to the user
        }
    };
    return (
        <React.Fragment>
            <Layout style={{ minHeight: "100vh" }}>
               <SliderBarWeb></SliderBarWeb>
                <Layout>
                <div
                    style={{
                        backgroundColor: "#FFFF",
                        height: "70px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderRadius: "7px",
                        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                        marginLeft: "30px",
                        marginRight: "30px",
                        marginBottom: "0px",
                    }}
                    className="mt-4"
                >
                    <div style={{ backgroundColor: "white", width: "30%" }}>
                        <Search
                            className="ms-3"
                            placeholder="Type here to search"
                            onSearch={(value) => {
                                console.log(value);
                            }}
                        />
                    </div>

                    <div
                        className="d-flex gap-4 align-items-center"
                        style={{ height: "inherit" }}
                    >
                        <Space>
                            <Badge dot className="bell-icon">
                                <i
                                    className="uil uil-bell"
                                    style={{ color: "#8F78DF", fontSize: "20px" }}
                                ></i>
                            </Badge>
                        </Space>
                        <Space>
                            <Badge dot className="bell-icon">
                                <i
                                    className="uil uil-envelope-open"
                                    style={{ color: "#8F78DF", fontSize: "20px" }}
                                ></i>
                            </Badge>
                        </Space>

                        <div
                            className="p-2  d-flex gap-3 align-items-center"
                            style={{
                                height: "inherit",
                                backgroundColor: "#6546D2",
                                color: "white",
                                borderRadius: "10px",
                            }}
                        >
                            <div className="me-1 d-flex flex-column align-items-center">
                                <span className="fs-18">Nik jone</span>
                                <span>Available</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{
                    padding: "0px 30px 0px 50px", background: 'white', margin: '30px', borderRadius: '12px', boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",

                }}>
                    <Content>
                        <Breadcrumb
                            style={{
                                margin: '16px 0',
                            }}
                        >
                            <Breadcrumb.Item>Management</Breadcrumb.Item>
                            <Breadcrumb.Item>Developer List</Breadcrumb.Item>
                        </Breadcrumb>
                        <a className="me-1 d-flex flex-column align-items-end" onClick={showModal1}>
                            <FontAwesomeIcon size='2xl' icon={faPlusSquare} />
                        </a>
                        <div
                            style={{
                                padding: 24,
                                minHeight: 360,
                            }}
                        >
                            <div style={{ height: '600px', overflow: 'auto' }}>

                                <Table dataSource={developer} pagination={page} onRow={(record, rowIndex) => {
                                    return {
                                        onClick: (event) => {
                                            // Handle row click
                                            handleRowClick(record.developerId);
                                        },
                                    };
                                }} size='middle' scroll={{
                                    x: 3000,
                                }} components={{
                                    header: {
                                        cell: (props) => <th {...props} style={{ background: 'hsl(253deg 61% 85%)', border: 'none' }} />,
                                    },

                                }} rowClassName={(record, index) => index % 2 === 0 ? 'even-row' : 'odd-row'}>
                                    <Column
                                        title="Image"
                                        dataIndex="userImage"
                                        key="userImage"
                                        render={(text, record) => (
                                            <img
                                                src={record.userImage}
                                                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                                            />
                                        )}
                                    />
                                    <Column title="Devloper" dataIndex="developerId" key="developerId"  width={80} />

                                    <Column title="FirstName" dataIndex="firstName" key="firstName" />
                                    <Column title="LastName" dataIndex="lastName" key="lastName" />
                                    <Column title="Email" dataIndex="email" key="email" />
                                    <Column title="Code Name" dataIndex="codeName" key="codeName" />
                                    <Column title="Gender" dataIndex="genderString" key="genderString" />
                                    <Column title="Year Of Experience" dataIndex="yearOfExperience" key="yearOfExperience"  width={150} />
                                    <Column title="Salary" dataIndex="averageSalary" key="averageSalary"  width={80} />
                                    <Column title="Schedule Type" dataIndex="scheduleTypeName" key="scheduleTypeName" />
                                    <Column title="RequireName" dataIndex="levelRequireName" key="levelRequireName" />
                                    <Column title="Type Require" dataIndex="typeRequireStrings" key="typeRequireStrings"
                                        render={(text, record) => (
                                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                {text.map((type, index) => (
                                                    <div key={index} className="badge text-bg-light" style={{ padding: '5px', margin: '5px' }}>
                                                        {type}
                                                    </div>
                                                ))}
                                            </div>
                                        )}width={400}  />
                                    <Column title="Skill Require" dataIndex="skillRequireStrings" key="skillRequireStrings" render={(text, record) => (
                                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                            {text.map((skill, index) => (
                                                <div key={index} className="badge text-bg-light" style={{ padding: '5px', margin: '5px' }}>
                                                    {skill}
                                                </div>
                                            ))}
                                        </div>
                                    )} width={500} 
                                 />
                                    <Column title="Role" dataIndex="roleString" key="roleString" />
                                    <Column title="Emplowment Type" dataIndex="employmentTypeName" key="employmentTypeName" />


                                    <Column
                                        title="Status"
                                        dataIndex="devStatusString"
                                        key="devStatusString"
                                        render={(text, record) => (
                                            <span className={text === 'Available' ? 'badge text-bg-success' : text === 'Selected On Request' ? 'badge text-bg-info' : 'badge bg-warning text-light'}>
                                            {text}
                                          </span>
                                        )}
                                  
                                    />
                                    <Column
                                            title="Action"
                                            key="action"
                                            render={(_, record) => (
                                                <Space size="middle">
                                                    <a onClick={(event) => {
                                                        // handleEditClick(record.userId);
                                                            
                                                        event.stopPropagation();
                                                    }}>
                                                        <FontAwesomeIcon style={{ color: '#6d73f6' }} size='xl' icon={faPenToSquare} />
                                                    </a>
                                                    {record.devStatusString === 'Available' || record.devStatusString === 'On Working' ? (
                                                        <a onClick={(event) => {
                                                            handleDeleteClick(record.userId);
                                                            event.stopPropagation();
                                                        }}>
                                                            <FontAwesomeIcon style={{ color: '#6d73f6' }} size='xl' icon={faTrashCan} />
                                                        </a>
                                                    ) : null}
                                                </Space>
                                            )}
                                        />

                                </Table>
                            </div>

                        
                    <Modal
                        visible={visibleModal4}
                        onOk={handleOkDelete}
                        onCancel={handleCancel}
                        footer={[
                            <Button key="cancel" className="badge text-bg-secondary" onClick={handleCancel}>
                                Cancel
                            </Button>,
                            <Button key="confirm" className="badge text-bg-danger" onClick={handleOkDelete}>
                                Confirm Delete
                            </Button>,
                        ]}
                    >
                        <ExclamationCircleOutlined style={{ fontSize: '40px', margin: 'auto', display: 'block', color: 'yellow' }} />
                        <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Are you sure you want to delete your account?</p>
                    </Modal>


                        </div>
                    </Content>
                </div>


                <Modal
                    title="Details Account"
                    visible={visibleModal3}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}
                    width={800}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    {hRInfo && (
                        <div style={{ padding: '20px', fontSize: '16px' }} >
                            {hRInfo.userImage ? (
                                <img
                                    src={hRInfo.userImage}
                                    style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '20px' }}
                                />
                            ) : (
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                    <FaUserAltSlash style={{ fontSize: '24px', marginBottom: '10px', color: '#6d73f6' }} />
                                    <span>No Image</span>
                                </div>
                            )}
                            <p><strong>Name:</strong> {`${hRInfo.firstName} ${hRInfo.lastName}`}</p>
                            <p><strong>Email:</strong> {hRInfo.email}</p>
                            <p><strong>Password:</strong> {hRInfo.password}</p>
                            <p><strong>Phone:</strong> {hRInfo.phoneNumber}</p>
                            <p><strong>Date Of Birth:</strong> {hRInfo.dateOfBirth}</p>
                            <p><strong>Code Name:</strong> {hRInfo.codeName}</p>
                            <p><strong>Year Of Experience:</strong> {hRInfo.yearOfExperience}</p>
                            <p><strong>Average Salary:</strong> {hRInfo.averageSalary}</p>
                            <p><strong>Schedule Type Name:</strong> {hRInfo.scheduleTypeName}</p>
                            <p><strong>Employment Type Name:</strong> {hRInfo.employmentTypeName}</p>
                            <p><strong>Developer Status:</strong> <span className={hRInfo.devStatusString === 'On Working' ? 'badge bg-warning text-light' : hRInfo.devStatusString === 'Selected On Request' ? 'badge text-bg-light'  : 'badge text-bg-danger'}>{hRInfo.devStatusString}</span></p>
                            <p><strong>Account Status:</strong> <span className={hRInfo.userStatusString === 'Active' ? 'badge rounded-pill text-bg-success' : hRInfo.userStatusString === 'Selected On Request' ? 'badge bg-warning text-light'  : 'badge text-bg-danger'}>{hRInfo.userStatusString}</span></p>
                            <p><strong>Gender Name:     </strong> {hRInfo.genderName}</p>




                        </div>
                    )}
                </Modal>
                {contextHolder}
                <Modal
                    title="Create Account"
                    centered
                    visible={visibleModal1}
                    onOk={handleOkUpdate}
                    onCancel={handleCancel}
                    width={1000}
                    footer={null}
                >
                     <React.Fragment>
            <section className="section" style={{ paddingTop: "0px" }}>
                <div className=" ">
                    <div className="row justify-content-center  w-100 ">
                            <div className="rounded shadow bg-white p-4">
                                <div className="custom-form">
                                    <div id="message3"></div>
                                    <form
                                        method="post"
                                        action="php/contact.php"
                                        name="contact-form"
                                        id="contact-form3"
                                    >
                                        <h4 class="text-dark mb-3">Create new account developer</h4>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">First name:</label>
                                                    <input id="first-name" type="text" class="form-control resume" placeholder=""></input>
                                                    {firstNameError && <p className="text-danger mt-2">{firstNameError}</p>}
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Last name:</label>
                                                    <input id="last-name" type="text" class="form-control resume" placeholder=""></input>
                                                    {lastNameError && <p className="text-danger mt-2">{lastNameError}</p>}
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Email</label>
                                                    <input id="email" type="email" class="form-control resume" placeholder="abc@gmail.com"></input>
                                                    {emailError && <p className="text-danger mt-2">{emailError}</p>}
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
                                                            style={{ width: '100%' }} 
                                                        />
                                                    </div>
                                                    {genderError && <p className="text-danger mt-2">{genderError}</p>}

                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Date of birth</label>
                                                    <input id="date-of-birth" type="date" class="custom-date resume"></input>
                                                    {dateOfBirthError && <p className="text-danger mt-2">{dateOfBirthError}</p>}

                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Phone Number</label>
                                                    <input id="phone-number" type="number" class="form-control resume" placeholder="+8426265656"></input>
                                                    {phoneNumberError && <p className="text-danger mt-2">{phoneNumberError}</p>}

                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Avarage Salary</label>
                                                    <input id="avarage-salary" type="number" class="form-control resume"></input>
                                                    {avarageSalaryError && <p className="text-danger mt-2">{avarageSalaryError}</p>}

                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Year of Experience</label>
                                                    <input id="year-of-experience" type="number" class="form-control resume" placeholder="2"></input>
                                                    {yearOfExperienceError && <p className="text-danger mt-2">{yearOfExperienceError}</p>}

                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">

                                            <div className="form-group app-label mt-2">
                                                <label className="text-muted">Type requirement</label>
                                                <div className="form-button">
                                                    <Select
                                                        isMulti
                                                        options={options2}
                                                        value={selectedOptions2}
                                                        onChange={handleChange2}
                                                        style={{ width: '100%' }} 
                                                    />
                                                </div>
                                                {typeError && <p className="text-danger mt-2">{typeError}</p>}

                                            </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Level requirement</label>
                                                    <div class="form-button">
                                                        <div className="form-button">
                                                            <Select

                                                                options={options3}
                                                                value={selectedOptions3}
                                                                onChange={handleChange3}
                                                                style={{ width: '100%' }} 
                                                            />
                                                        </div>
                                                        {levelError && <p className="text-danger mt-2">{levelError}</p>}

                                                    </div>
                                                </div>
                                            </div>
                                        </div><div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group app-label mt-2">

                                                    <label className="text-muted">Skill requirement</label>
                                                    <div className="form-button">
                                                        <Select
                                                            isMulti
                                                            options={options}
                                                            value={selectedOptions}
                                                            onChange={handleChange}
                                                            style={{ width: '100%' }} 
                                                        />
                                                    </div>
                                                    {skillError && <p className="text-danger mt-2">{skillError}</p>}

                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Employment Type</label>
                                                    <div class="form-button">
                                                        <div className="form-button">
                                                            <Select
                                                                options={options6}
                                                                value={selectedOptions6}
                                                                onChange={handleChange6}
                                                                style={{ width: '100%' }} 
                                                            />
                                                        </div>
                                                    </div>
                                                    {employmentTypeError && <p className="text-danger mt-2">{employmentTypeError}</p>}

                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-12 mt-2 d-flex justify-content-end">
                                            <button type="button" className="btn btn-primary btn-hover" onClick={handleOkUpdate} >
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
                <Modal
                    title="Update Account"
                    centered
                    visible={visibleModal2}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}
                    width={1000}
                >
                    <div>
                        <Checkbox
                            checked={componentDisabled}
                            onChange={(e) => setComponentDisabled(e.target.checked)}
                        >
                            Form disabled
                        </Checkbox>
                        <Form
                            {...layout}
                            onFinish={onFinish}

                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 25,
                            }}
                            layout="horizontal"
                            disabled={componentDisabled}
                            style={{
                                maxWidth: 600,
                                margin: 'auto'
                            }}
                        >
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
                                        <Upload action="/upload.do" listType="picture-card">
                                            <div>

                                                <div
                                                    style={{
                                                        marginTop: 8,
                                                    }}
                                                >
                                                    Upload
                                                </div>
                                            </div>
                                        </Upload>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="First Name" name="input1">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Last Name" name="lastName">
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Email" name="email">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Password" name="password">
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Year Of Experience" name="experience">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Salary" name="salary">
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Schedule Type" name="email">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="RequireName" name="password">
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Phone Number" name="phoneNumber">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Birthday">
                                        <DatePicker />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Role" name="role">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Status">
                                        <Select>
                                            <Select.Option value="active">Active</Select.Option>
                                            <Select.Option value="de-active">De-Active</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>

                            </Form.Item>


                        </Form>
                    </div>
                </Modal>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    <p className='badge bg-warning text-light'>WeHire Design ©2023 Created by HDC</p>
                </Footer>


            </Layout>

            </Layout>
        </React.Fragment>
    );
};

export default ListAccountDeveloper;

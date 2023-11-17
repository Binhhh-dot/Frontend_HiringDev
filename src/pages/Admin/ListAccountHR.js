import React, { useEffect, useState } from 'react'
import {
    Layout, Button, Table, Divider, Tag, Space, Avatar, Badge, Input, Breadcrumb,
    Modal, Cascader, Checkbox, DatePicker, Form, InputNumber, Radio, Select,
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

const ListAccountHR = () => {
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



    const onReset = () => {
        formRef.current?.resetFields();
    };
    const formRef = React.useRef(null);

    const [modal, contextHolder] = Modal.useModal();
    let [currentPage, setCurrentPage] = useState(1);


    // const handleFirstNameChange = (value) => {
    //     setUserData({
    //         ...userDataDetail,
    //         firstName: '',
    //         lastName: '',
    //         phoneNumber: '',
    //         email: '',
    //         password: '',
    //         dateOfBirth: '',
    //         statusString: '',


    //     });
    // };


    //API

    const [HRPaging, setHRPaging] = useState([]);

    const fetchHRPaging = async () => {
        try {
            const response = await userSerrvices.getListHR();
            setHRPaging(response.data.data);
            return response;
        } catch (error) {
            console.error("Error fetching user paging:", error);
            throw error; // Rethrow the error to handle it elsewhere if needed
        }
    };

    useEffect(() => {
        fetchHRPaging().then((data) => {
            // setUserPaging(data); // This line is not necessary, as it's already set in fetchUserPaging
            console.log("User paging data:", data);
        });
    }, [currentPage]);

    //API: getHRById

    const [hRInfo, setHrInfo] =
        useState(null);
    const handleRowClick = (userId) => {
        fetchHrById(userId);
        showModal3();
    };

    const [userId, setUserId] = useState(null);
    const handleEditClick = (userId) => {
        fetchUserDetail(userId);
        showModal2();
        setUserId(userId);
    };

    const handleDeleteClick = (userId) => {
        showModal4();
        setUserId(userId);
    };


    const fetchHrById = async (userId) => {
        let response;
        try {
            response = await userSerrvices.getHRById(
                userId
            );
            setHrInfo(response.data.data);
            console.log(response.data.data);
            return response;
        } catch (error) {
            console.error("Error fetching hiring request detail overview:", error);
        }
    };
    useEffect(() => {
        fetchHrById();
    }, [hRInfo]);


    useEffect(() => {
        fetchUserDetail(/* pass the userId parameter if available */);
    }, []);

    //Create HR
    const [form] = Form.useForm();



    const handleOkCreate = () => {
        form
            .validateFields()
            .then(async (values) => {
                await createHR(values);
                form.resetFields();
                setVisibleModal1(false);
            })
            .catch((errorInfo) => {
                console.log('Validation Failed:', errorInfo);
            });
    };

    const handleCancelCreate = () => {
        form.resetFields();
        setVisibleModal1(false);
    };

    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const createHR = async (values) => {
        try {
            const response = await userSerrvices.createHR(values.firstName, values.lastName, values.email, values.password, values.phoneNumber, values.dateOfBirth, 6);
            let data = response.data;

            console.log('Save posted successfully:', data);
            message.success({
                content: 'Account created successfully',
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
            console.error('Error posting job:', error);
            message.error({
                content: 'Error creating account: ',
                duration: 2,
                style: {
                    marginTop: '50px',
                    marginRight: '50px',
                },
            });
        }
    };


    //Update HR
    const [userDataDetail, setUserDataDetail] = useState({
        userId: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        dateOfBirth: '',
        statusString: '',
    });

    const fetchUserDetail = async (userId) => {
        if (userId) {
            try {
                const response = await userSerrvices.getHRById(userId);
                const {
                    lastName,
                    firstName,
                    email,
                    password,
                    phoneNumber,
                    dateOfBirth,
                    statusString,
                    roleString,
                    companyId,
                } = response.data.data;

                setUserDataDetail({
                    lastName,
                    firstName,
                    email,
                    password,
                    phoneNumber,
                    dateOfBirth,
                    roleString,
                    statusString,
                    companyId,
                });
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        }
    };

    //Delete 
    const handleDeleteConfirm = async (userId) => {
        try {
            await userSerrvices.deleteHR(userId);
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


    const handleOkUpdate = async () => {
        try {
            const values = await form.validateFields(['userId', 'firstName', 'lastName', 'email', 'password', 'phoneNumber', 'statusString', 'dateOfBirth']);
            await handleUpdate(values, userId);
            form.resetFields();
            setVisibleModal2(false);
        } catch (errorInfo) {
            console.log('Validation Failed:', errorInfo);
        }
    };

    const handleCancelUpdate = () => {
        form.resetFields();
        setVisibleModal2(false);
    };

    const handleUpdate = async (values, userId) => {
        try {
            // Prepare formData here based on values
            const formData = new FormData();
            formData.append('UserId', userId);
            formData.append('FirstName', values.firstName);
            formData.append('LastName', values.lastName);
            formData.append('Email', values.email);
            formData.append('Password', values.password);
            formData.append('PhoneNumber', values.phoneNumber);
            formData.append('Status', values.statusString);
            formData.append('DateOfBirth', values.dateOfBirth);

            // Call your update function here
            const response = await userSerrvices.updateHR(userId, formData);

            // Handle the response as needed
            console.log('Update response:', response);
            message.success({
                content: 'Account created successfully',
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
                content: 'Error creating account: ',
                duration: 2,
                style: {
                    marginTop: '50px',
                    marginRight: '50px',
                },
            });
        }
    };
    return (
        <React.Fragment>
            <Layout style={{ minHeight: "100vh" }}>
                <Sider
                    collapsed={collapsed}
                    width={250}
                    style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
                >
                    <div className="d-flex mt-3 justify-content-between ms-3 me-3">
                        {showWeHire && (
                            <h2 className="mb-0" id="wehire">
                                WeHire
                            </h2>
                        )}
                        {isLeftIcon ? (
                            <div
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "#f8f7fd",
                                    borderRadius: "10px",
                                }}
                            >
                                {/* <LeftOutlined
                onClick={toggleSidebar}
                style={{ color: "purple", fontSize: "24px" }}
              /> */}
                                <FontAwesomeIcon
                                    icon={faAngleLeft}
                                    size="xl"
                                    color="#6546D2"
                                    onClick={toggleSidebar}
                                />
                            </div>
                        ) : (
                            <div
                                className="ms-2"
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "#f8f7fd",
                                    borderRadius: "10px",
                                }}
                            >
                                {/* <RightOutlined
                onClick={toggleSidebar}
                style={{ color: "purple", fontSize: "24px" }}
              /> */}
                                <FontAwesomeIcon
                                    icon={faAngleRight}
                                    size="xl"
                                    color="#6546D2"
                                    onClick={toggleSidebar}
                                />
                            </div>
                        )}
                    </div>
                    <Menu
                        className="mt-4"
                        style={{ border: "0px" }}
                        defaultSelectedKeys={["menu-key/10"]}
                        selectedKeys={selectedKeys}
                        mode="inline"
                        onClick={handleMenuClick}
                    >
                        {items.map((item) =>
                            item.children ? (
                                <Menu.SubMenu
                                    key={item.key}
                                    icon={item.icon}
                                    title={item.label}
                                    onClick={() => handleSubMenuClick(item)}
                                >
                                    {item.children.map((child) => (
                                        <Menu.Item key={child.key}>{child.label}</Menu.Item>
                                    ))}
                                </Menu.SubMenu>
                            ) : (
                                <Menu.Item key={item.key} icon={item.icon}>
                                    {item.label}
                                </Menu.Item>
                            )
                        )}
                    </Menu>
                </Sider>
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
                                <Link>
                                    <img
                                        src={img0}
                                        className="ms-1"
                                        style={{
                                            borderRadius: "10px",
                                            height: "50px",
                                        }}
                                    />
                                </Link>
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
                                    margin: '13px 0',
                                }}
                            >
                                <Breadcrumb.Item>Management</Breadcrumb.Item>
                                <Breadcrumb.Item>Manager List</Breadcrumb.Item>
                            </Breadcrumb>
                            <a className="me-1 d-flex flex-column align-items-end" onClick={showModal1}>
                                <FontAwesomeIcon size='2xl' icon={faPlusSquare} />
                            </a>
                            <div
                                style={{
                                    padding: 20,
                                    minHeight: 360,
                                }}
                            >
                                <div style={{ height: '600px', overflow: 'auto' }}>

                                    <Table className='custom-table' dataSource={HRPaging} pagination={page} size='middle' components={{
                                        header: {
                                            cell: (props) => <th {...props} style={{ background: 'hsl(253deg 61% 85%)', border: 'none' }} />,
                                        },

                                    }} onRow={(record, rowIndex) => {
                                        return {
                                            onClick: (event) => {
                                                // Handle row click
                                                handleRowClick(record.userId);
                                            },
                                        };
                                    }} rowClassName={(record, index) => index % 2 === 0 ? 'even-row' : 'odd-row'}
                                    >
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
                                        <Column title="FirstName" dataIndex="firstName" key="firstName" />
                                        <Column title="LastName" dataIndex="lastName" key="lastName" />
                                        <Column title="Email" dataIndex="email" key="email" />
                                        <Column title="password" dataIndex="password" key="password" />
                                        <Column title="Phone Number" dataIndex="phoneNumber" key="phoneNumber" />
                                        <Column title="Birthday" dataIndex="dateOfBirth" key="dateOfBirth" />
                                        <Column title="Role" dataIndex="roleString" key="roleString" />
                                        <Column
                                            title="Status"
                                            dataIndex="statusString"
                                            key="statusString"
                                            render={(text, record) => (
                                                <span className={text === 'Active' ? 'badge text-bg-success' : text === 'OnTasking' ? 'badge bg-warning text-light' : 'badge text-bg-danger'}>
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
                                                        handleEditClick(record.userId);

                                                        event.stopPropagation();
                                                    }}>
                                                        <FontAwesomeIcon style={{ color: '#6d73f6' }} size='xl' icon={faPenToSquare} />
                                                    </a>
                                                    {record.statusString === 'Active' || record.statusString === 'OnTasking' ? (
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
                            </div>
                        </Content>
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
                                <p><strong>Role:</strong> {hRInfo.roleString}</p>
                                <p><strong>Status:</strong> <span className={hRInfo.statusString === 'Active' ? 'badge bg-warning text-light' : 'badge text-bg-danger'}>{hRInfo.statusString}</span></p>


                            </div>
                        )}
                    </Modal>
                    {contextHolder}

                    <Modal
                        title="Create Account"
                        centered
                        visible={visibleModal1}
                        onOk={handleOkCreate}
                        onCancel={handleCancelCreate}
                        footer={null}

                    >
                        <Form form={form} layout="vertical">
                            <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: 'Please input your first name!' }]} >
                                <Input />
                            </Form.Item>
                            <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: 'Please input your last name!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    { required: true, message: 'Please input your email!' },
                                    {
                                        pattern: /^[\w-]+(\.[\w-]+)*@gmail\.com$/,
                                        message: 'Please enter a valid Gmail address!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input your password!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="phoneNumber"
                                label="Phone Number"
                                rules={[
                                    { required: true, message: 'Please input your phone number!' },
                                    {
                                        pattern: /^0[0-9]{9}$/,
                                        message: 'Please enter phone number starting with 0 have to 10 number!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item name="dateOfBirth" label="Birth" rules={[{ required: true, message: 'Please input your date of birth!' }]}>
                                <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
                            </Form.Item>
                            {/* Add other form fields here */}
                            <Form.Item style={{ textAlign: 'center' }}>
                                <Button type="primary" onClick={handleOkCreate} style={{ backgroundColor: 'purple', borderColor: 'purple' }}>
                                    Save
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Modal
                        title="Update User"
                        visible={visibleModal2}
                        onUpdate={handleOkUpdate}
                        onCancel={handleCancelUpdate}
                        footer={null}
                    >
                        <Form form={form} initialValues={userDataDetail}>
                            {/* <Form.Item label="User Id" name="userId">
                            <p><Input value={userDataDetail.userId}
                                onChange={(e) => setUserDataDetail({ ...userDataDetail, userId: e.target.value })} /></p>
                        </Form.Item> */}
                            <Form.Item label="FirstName" name="firstName">
                                <p><Input value={userDataDetail.firstName}
                                    onChange={(e) => setUserDataDetail({ ...userDataDetail, firstName: e.target.value })} /></p>
                            </Form.Item>
                            <Form.Item label="LastName" name="lastName">
                                <p><Input value={userDataDetail.lastName}
                                    onChange={(e) => setUserDataDetail({ ...userDataDetail, lastName: e.target.value })} /></p>
                            </Form.Item>
                            <Form.Item label="Email" name="email">
                                <p><Input value={userDataDetail.email}
                                    onChange={(e) => setUserDataDetail({ ...userDataDetail, email: e.target.value })} /></p>
                            </Form.Item>
                            <Form.Item label="Password" name="password">
                                <p><Input value={userDataDetail.password}
                                    onChange={(e) => setUserDataDetail({ ...userDataDetail, password: e.target.value })} /></p>
                            </Form.Item>
                            <Form.Item label="PhoneNumber" name="phoneNumber">
                                <p><Input value={userDataDetail.phoneNumber}
                                    onChange={(e) => setUserDataDetail({ ...userDataDetail, phoneNumber: e.target.value })} /></p>
                            </Form.Item>
                            <Form.Item name="dateOfBirth" label="Birth Day">

                                <DatePicker value={userDataDetail.dateOfBirth} style={{ width: '100%' }} format="YYYY-MM-DD" />

                            </Form.Item>
                            <Form.Item label="Status" name="statusString">
                                <Select onChange={(value) => setUserDataDetail({ ...userDataDetail, statusString: value })}>
                                    <Select.Option value="1">Active</Select.Option>
                                    <Select.Option value="0">Inactive</Select.Option>
                                    <Select.Option value="2">OnTasking</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item style={{ textAlign: 'center' }}>
                                <Button type="primary" onClick={handleOkUpdate} style={{ backgroundColor: 'purple', borderColor: 'purple' }}>
                                    Save
                                </Button>
                            </Form.Item>

                        </Form>
                    </Modal>
                    <Modal
                        title="Update Account"
                        centered
                        // visible={visibleModal2}
                        // onOk={handleOk}
                        // onCancel={handleCancel}
                        // footer={null}
                        width={1000}
                    >
                        <div>
                            <Form action="#">
                                <div>
                                    <h5 className="fs-17 fw-semibold mb-3 mb-0">My Company</h5>
                                    <div className="text-center">

                                    </div>
                                    <Row>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                First Name
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    id="first-name"
                                                    value={userDataDetail.firstName}
                                                    onChange={(e) => setUserDataDetail({ ...userDataDetail, firstName: e.target.value })}
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                Last Name
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    id="last-name"
                                                    value={userDataDetail.lastName}
                                                    onChange={(e) => setUserDataDetail({ ...userDataDetail, lastName: e.target.value })}
                                                />
                                            </div>
                                        </Col>

                                        <Col lg={6}>
                                            <div className="mb-3">
                                                Email
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    id="address"
                                                    value={userDataDetail.email}
                                                    onChange={(e) => setUserDataDetail({ ...userDataDetail, email: e.target.value })}
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                Password
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    id="password"
                                                    value={userDataDetail.password}
                                                    onChange={(e) => setUserDataDetail({ ...userDataDetail, password: e.target.value })}
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                Phone Number
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    id="number"
                                                    value={userDataDetail.phoneNumber}
                                                    onChange={(e) => setUserDataDetail({ ...userDataDetail, phoneNumber: e.target.value })}
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                Birth Day
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    id="number"
                                                    value={userDataDetail.dateOfBirth}
                                                    onChange={(e) => setUserDataDetail({ ...userDataDetail, dateOfBirth: e.target.value })}
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                Role
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    id="number"
                                                    value={userDataDetail.roleString}
                                                    onChange={(e) => setUserDataDetail({ ...userDataDetail, roleString: e.target.value })}
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                Status
                                                <Select value={userDataDetail.statusString}>
                                                    <Select.Option value="Active">Active</Select.Option>
                                                    <Select.Option value="Inactive">InActive</Select.Option>
                                                </Select>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="mt-4 text-end">
                                    <div className="btn btn-warning" >
                                        Update
                                    </div>

                                </div>
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

export default ListAccountHR;

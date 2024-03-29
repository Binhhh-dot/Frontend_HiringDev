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
  Select,
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
import SliderBarWeb from "../Admin/SlideBar/SiderBarWeb";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { toast } from 'react-toastify';

import SiderBarWebAdmin from "./SlideBar/SiderBarWebAdmin";
import UpdateHRAccountPopup from "./UpdateUserAccountPopup/UpdateUserAccountPopup";
import NavBarWebAdmin from "./NavBar/NavBarWebAdmin";

const page = {
  pageSize: 6, // Number of items per page
};

const { Column, ColumnGroup } = Table;

const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;
// const items = [
//     {
//         label: "Dashboard",
//         key: "menu-key/1",
//         icon: <HomeOutlined />,
//         className: "option-1",
//     },
//     {
//         label: "Option 2",
//         key: "menu-key/2",
//         icon: <DesktopOutlined />,
//         className: "option-2",
//     },
//     {
//         label: "User",
//         key: "menu-key/sub-menu-key",
//         icon: <UserOutlined />,
//         children: [
//             { label: "Manager", key: "/listAccountManager" },
//             { label: "Staff", key: "menu-key/sub-menu-key/4" },
//             { label: "Hr", key: "menu-key/sub-menu-key/5" },
//         ],
//         className: "option-2",
//     },
//     {
//         label: "Team",
//         key: "menu-key/sub-menu-key2",
//         icon: <TeamOutlined />,
//         children: [
//             { label: "Team 1", key: "menu-key/sub-menu-key2/6" },
//             { label: "Team 2", key: "menu-key/sub-menu-key2/8" },
//         ],
//     },
//     {
//         label: "Files",
//         key: "menu-key/9",
//         icon: <FileOutlined />,
//         className: "files",
//     },
//     {
//         label: "Hiring Request",
//         key: "menu-key/10",
//         icon: <SnippetsOutlined />,
//         className: "hiringRequest",
//     },
//     {
//         label: "Interview",
//         key: "menu-key/11",
//         icon: <SolutionOutlined />,
//         className: "interview",
//     },

//     {
//         label: "Project",
//         key: "menu-key/12",
//         icon: <CodeOutlined />,
//         className: "project",
//     },
// ];

const ListAccountStaff = () => {
  // const [selectedKeys, setSelectedKeys] = useState(["menu-key/10"]); // Định nghĩa selectedKeys
  // const [isLeftIcon, setIsLeftIcon] = useState(true);
  // const [showWeHire, setShowWeHire] = useState(true);

  // const toggleSidebar = () => {
  //     setCollapsed(!collapsed);
  //     setIsLeftIcon(!isLeftIcon); // Cập nhật biến trạng thái khi toggleSidebar
  //     setShowWeHire(!showWeHire);
  // };

  // const handleMenuClick = (item) => {
  //     setSelectedKeys([item.key]);
  // };

  // const handleSubMenuClick = (item) => {
  //     setSelectedKeys([item.key]);
  // };

  // const [collapsed, setCollapsed] = useState(false);

  const [visibleModal1, setVisibleModal1] = useState(false);
  const [visibleModal2, setVisibleModal2] = useState(false);
  const [visibleModal3, setVisibleModal3] = useState(false);
  const [visibleModal4, setVisibleModal4] = useState(false);

  const showModal1 = () => {
    setVisibleModal1(true);
  };
  const [userIdAccountHr, setStaffIdAccount] = useState(null);

  const showModal2 = (userId) => {
    setStaffIdAccount(userId);
    setVisibleModal2(true);
  };

  const closedModal2 = () => {
    setVisibleModal2(false);
    fetchStaffPaging();
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

  const [StaffPaging, setStaffPaging] = useState([]);

  const fetchStaffPaging = async () => {
    try {
      const response = await userSerrvices.getListStaff();
      setStaffPaging(response.data.data);
      return response;
    } catch (error) {
      console.error("Error fetching user paging:", error);
      throw error; // Rethrow the error to handle it elsewhere if needed
    }
  };

  useEffect(() => {
    fetchStaffPaging().then((data) => {
      // setUserPaging(data); // This line is not necessary, as it's already set in fetchUserPaging
      console.log("User paging data:", data);
    });
  }, [currentPage]);

  //API: getHRById

  const [hRInfo, setHrInfo] = useState(null);
  const handleRowClick = (userId) => {
    fetchStaffById(userId);
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

  const fetchStaffById = async (userId) => {
    let response;
    try {
      response = await userSerrvices.getStaffById(userId);
      setHrInfo(response.data.data);
      console.log(response.data.data);
      return response;
    } catch (error) {
      console.error("Error fetching hiring request detail overview:", error);
    }
  };
  useEffect(() => {
    fetchStaffById();
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
        await createStaff(values);
        form.resetFields();
        fetchStaffPaging();
        setVisibleModal1(false);
      })
      .catch((errorInfo) => {
        console.log("Validation Failed:", errorInfo);
      });
  };

  const handleCancelCreate = () => {
    form.resetFields();
    setVisibleModal1(false);
  };

  const createStaff = async (values) => {
    try {
      const response = await userSerrvices.createStaff(
        values.firstName,
        values.lastName,
        values.email,
        values.password,
        values.phoneNumber,
        values.dateOfBirth,
        4
      );
      let data = response.data;

      console.log("Save posted successfully:", data);
      toast.success("Create account successfully!")

    } catch (error) {
      console.error("Error posting job:", error);
      toast.error("Create account fail!")

    }
  };

  //Update HR
  const [userDataDetail, setUserDataDetail] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: "",
    statusString: "",
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
        console.error("Error fetching user details:", error);
      }
    }
  };

  //Delete
  const handleDeleteConfirm = async (userId) => {
    try {
      await userSerrvices.deleteHR(userId);
      toast.success("Deleted account successfully!")

    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Create account fail!")

    }
  };

  const handleOkDelete = async () => {
    try {
      await handleDeleteConfirm(userId);
      setVisibleModal4(false);
      fetchStaffPaging();
    } catch (error) {
      // Handle any errors that might occur during the deletion process
      console.error("Error deleting user:", error);
      // Optionally, you can show an error message to the user
    }
  };



  //-------------------------------------------------------------------------------
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [switchStatusMap, setSwitchStatusMap] = useState({});

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <React.Fragment>
      <Layout style={{ minHeight: "100vh" }}>
        <SiderBarWebAdmin choose={"menu-key/3"}></SiderBarWebAdmin>
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
                MANAGE STAFF
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
                    dataSource={StaffPaging}
                    pagination={page}
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
                    onRow={(record, rowIndex) => {
                      return {
                        onClick: (event) => {
                          // Handle row click
                          handleRowClick(record.userId);
                        },
                      };
                    }}
                    rowClassName={(record, index) =>
                      index % 2 === 0 ? "even-row" : "odd-row"
                    }
                  >
                    <Column
                      title="Image"
                      dataIndex="userImage"
                      key="userImage"
                      render={(text, record) => (
                        <img
                          src={record.userImage}
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
                        />
                      )}
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
                    <Column title="Email" dataIndex="email" key="email" />
                    <Column
                      title="password"
                      dataIndex="password"
                      key="password"
                    />
                    <Column
                      title="Phone Number"
                      dataIndex="phoneNumber"
                      key="phoneNumber"
                    />
                    <Column
                      title="Birthday"
                      dataIndex="dateOfBirth"
                      key="dateOfBirth"
                    />
                    <Column
                      title="Role"
                      dataIndex="roleString"
                      key="roleString"
                    />
                    <Column
                      title="Status"
                      dataIndex="statusString"
                      key="statusString"
                      render={(text, record) => (
                        <span
                          className={
                            text === "Active"
                              ? "badge text-bg-success"
                              : text === "OnTasking"
                                ? "badge bg-warning text-light"
                                : "badge text-bg-danger"
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
                              showModal2(record.userId);

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
                            style={{ backgroundColor: record.statusString === 'Active' ? '#4CD964' : '#D1D1D6', borderColor: record.statusString === 'Active' ? '#4CD964' : '#D1D1D6' }}
                          />
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

          <Modal
            title="Details Account"
            visible={visibleModal3}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
            width={800}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {hRInfo && (
              <div style={{ padding: "20px", fontSize: "16px" }}>
                {hRInfo.userImage ? (
                  <img
                    src={hRInfo.userImage}
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      marginBottom: "20px",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <FaUserAltSlash
                      style={{
                        fontSize: "24px",
                        marginBottom: "10px",
                        color: "#6d73f6",
                      }}
                    />
                    <span>No Image</span>
                  </div>
                )}
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
                  <strong>Role:</strong> {hRInfo.roleString}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      hRInfo.statusString === "Active"
                        ? "badge bg-warning text-light"
                        : "badge text-bg-danger"
                    }
                  >
                    {hRInfo.statusString}
                  </span>
                </p>
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
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[
                  { required: true, message: "Please input your first name!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[
                  { required: true, message: "Please input your last name!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  {
                    pattern: /^[\w-]+(\.[\w-]+)*@gmail\.com$/,
                    message: "Please enter a valid Gmail address!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                  {
                    pattern: /^0[0-9]{9}$/,
                    message:
                      "Please enter phone number starting with 0 have to 10 number!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="dateOfBirth"
                label="Birth"
                rules={[
                  {
                    required: true,
                    message: "Please input your date of birth!",
                  },
                ]}
              >
                <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
              </Form.Item>
              {/* Add other form fields here */}
              <Form.Item style={{ textAlign: "center" }}>
                <Button
                  type="primary"
                  onClick={handleOkCreate}
                  style={{ backgroundColor: "purple", borderColor: "purple" }}
                >
                  Save
                </Button>
              </Form.Item>
            </Form>
          </Modal>

          <UpdateHRAccountPopup
            isOpen={visibleModal2}
            closeModal={closedModal2}
            userId={userIdAccountHr}
          ></UpdateHRAccountPopup>
          {/* <Footer
            style={{
              textAlign: "center",
            }}
          >
            <p className="badge bg-warning text-light">
              WeHire Design ©2023 Created by HDC
            </p>
          </Footer> */}
        </Layout>
      </Layout>
    </React.Fragment>
  );
};

export default ListAccountStaff;

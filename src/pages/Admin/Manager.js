import React, { useState, useEffect } from "react";
import JobVacancyList from "./JobVacancyList";
import NewListInterviewInfo from "./NewListInterviewInfo";
import ProjectList from "./ProjectListInManager";
import ContractList from "./ContractList";
import CompanyListPartner from "./CompanyListPartner";
import img0 from "../../assets/images/user/img-00.jpg";
import { Badge, Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import SiderBarWeb from "./SlideBar/SiderBarWeb";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
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
  AuditOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Input, Button, Modal } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Col,
  Row,
  Container,
  Collapse,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";

import { Link } from "react-router-dom";
import classname from "classnames";
import userAuthorization from "../../utils/userAuthorization";
import { arSA } from "date-fns/locale";
import userSerrvices from "../../services/user.serrvices";
import NavBarWeb from "./NavBar/NavBarWeb";

const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;

// -----------COMMENT NAY DUNG XOA, CON DUNG LAI-----------------------
// const items = [
// {
//   label: "Dashboard",
//   key: "menu-key/1",
//   icon: <HomeOutlined />,
//   className: "option-1",
// },

// {
//   label: "Option 2",
//   key: "menu-key/2",
//   icon: <DesktopOutlined />,
//   className: "option-2",
// },
// {
//   label: "User",
//   key: "menu-key/sub-menu-key",
//   icon: <UserOutlined />,
//   children: [
//     { label: "Tom", key: "menu-key/sub-menu-key/3" },
//     { label: "Bill", key: "menu-key/sub-menu-key/4" },
//     { label: "Alex", key: "menu-key/sub-menu-key/5" },
//   ],
//   className: "option-2",
// },
// {
//   label: "Team",
//   key: "menu-key/sub-menu-key2",
//   icon: <TeamOutlined />,
//   children: [
//     { label: "Team 1", key: "menu-key/sub-menu-key2/6" },
//     { label: "Team 2", key: "menu-key/sub-menu-key2/8" },
//   ],
// },

// {
//   label: "Files",
//   key: "menu-key/9",
//   icon: <FileOutlined />,
//   className: "files",
// },

//-----------------------------------------------------------------------
//   {
//     label: "Hiring Request",
//     key: "menu-key/10",
//     icon: <SnippetsOutlined />,
//     className: "hiringRequest",
//   },
//   {
//     label: "Interview",
//     key: "menu-key/11",
//     icon: <SolutionOutlined />,
//     className: "interview",
//   },

//   {
//     label: "Project",
//     key: "menu-key/12",
//     icon: <CodeOutlined />,
//     className: "project",
//   },

//   {
//     label: "Contract",
//     key: "menu-key/14",
//     icon: <AuditOutlined />,
//     className: "contract",
//   },

//   {
//     label: "Company",
//     key: "menu-key/15",
//     icon: <BankOutlined />,
//     className: "company",
//   },
// ];

const Manager = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoad, setIdLoad] = useState(false);
  useEffect(() => {
    const localStorageRole = localStorage.getItem("role");
    if (!localStorageRole) {
      navigate("/signin");
    } else {
      if (!userAuthorization(localStorageRole, location.pathname)) {
        navigate("/error404");
      } else {
        setIdLoad(true);
      }
    }
  }, []);

  // const [collapsed, setCollapsed] = useState(false);
  // const [selectedKeys, setSelectedKeys] = useState(["menu-key/10"]); // Định nghĩa selectedKeys
  // const [isLeftIcon, setIsLeftIcon] = useState(true);
  // const [showWeHire, setShowWeHire] = useState(true);

  // const toggleSidebar = () => {
  //   setCollapsed(!collapsed);
  //   setIsLeftIcon(!isLeftIcon); // Cập nhật biến trạng thái khi toggleSidebar
  //   setShowWeHire(!showWeHire);
  // };

  // const handleMenuClick = (item) => {
  //   setSelectedKeys([item.key]);
  // };

  // const handleSubMenuClick = (item) => {
  //   setSelectedKeys([item.key]);
  // };

  // console.log(selectedKeys);
  // const [dropdownOpen, setDropdownOpen] = useState(false);

  // const toggleDropdown = () => {
  //   setDropdownOpen(!dropdownOpen);
  // };
  //-------------------------------------------------------------------------------------
  // const [showPopupProfileUser, setShowPopupProfileUser] = useState(false);
  // const handleProfileUser = () => {};
  // const handleOkProfileUser = () => {};
  //-------------------------------------------------------------------------------------
  // const [name, setName] = useState("");
  // const [imgUser, setImgUser] = useState("");
  // const [status, setStatus] = useState("");

  // const fetchGetUserDetail = async () => {
  //   const userId = localStorage.getItem("userId");
  //   let response;
  //   let fullName;
  //   if (userId) {
  //     try {
  //       response = await userSerrvices.getUserById(userId);
  //       fullName =
  //         response.data.data.firstName + " " + response.data.data.lastName;
  //       setName(fullName);
  //       setImgUser(response.data.data.userImage);
  //       setStatus(response.data.data.statusString);
  //     } catch (error) {
  //       console.error("Error fetching user detail", error);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   fetchGetUserDetail();
  // }, []);
  //-------------------------------------------------------------------------------------
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SiderBarWeb choose={"menu-key/10"}></SiderBarWeb>
      <Layout>
        <NavBarWeb></NavBarWeb>
        {/* <div
          style={{
            backgroundColor: "#FFFF",
            height: "70px",
            display: "flex",
            alignItems: "center",
            borderRadius: "7px",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            marginLeft: "30px",
            marginRight: "30px",
            marginBottom: "0px",
          }}
          className="mt-4 justify-content-end"
        >
          <div
            className="d-flex gap-4 align-items-center"
            style={{ height: "inherit" }}
          >
            <Space>
              <Badge dot>
                <i
                  className="uil uil-bell"
                  style={{ color: "#8F78DF", fontSize: "20px" }}
                ></i>
              </Badge>
            </Space>

            <div
              className="p-1  d-flex gap-3 align-items-center me-2"
              style={{
                height: "60px",
                backgroundColor: "#6546D2",
                color: "white",
                borderRadius: "7px",
              }}
            >
              <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle
                  className="p-1 d-flex gap-3 align-items-center"
                  style={{
                    height: "60px",
                    backgroundColor: "#6546D2",
                    color: "white",

                    cursor: "pointer",
                    border: "0px",
                  }}
                >
                  <div>
                    <img
                      src={imgUser || img0}
                      className="ms-1 px-0"
                      style={{
                        borderRadius: "7px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="me-1 d-flex flex-column align-items-center">
                    <span className="fs-18">{name}</span>
                    <span>{status}</span>
                  </div>
                </DropdownToggle>
                <DropdownMenu
                  style={{
                    marginLeft: "-25px",
                  }}
                >
                  <DropdownItem style={{ padding: "0px" }}>
                    <div onClick={() => setShowPopupProfileUser(true)}>
                      <div className="dropdown-item">Profile</div>
                    </div>
                  </DropdownItem>

                  <DropdownItem style={{ padding: "0px" }}>
                    <div>
                      <Link to="#" className="dropdown-item">
                        Change Password
                      </Link>
                    </div>
                  </DropdownItem>

                  <DropdownItem style={{ padding: "0px" }}>
                    <div>
                      <Link to="/signout" className="dropdown-item">
                        Logout
                      </Link>
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div> */}

        {/* ------------------------------------------------------------------------------------- */}
        {/* <Modal
          centered
          open={showPopupProfileUser}
          onOk={() => handleOkProfileUser()}
          onCancel={() => setShowPopupProfileUser(false)}
          width={800}
          okType="default"
          okButtonProps={{
            style: {
              background: "#6546D2",
              borderColor: "#6546D2",
              color: "white",
            },
          }}
        >
          <div>
            <h5>Profile Manager</h5>
          </div>
        </Modal> */}
        {/* ------------------------------------------------------------------------------------- */}

        <Content>
          <section
            className="section p-3 "
            style={{
              backgroundColor: "#FFFF",
              borderRadius: "10px",
              margin: "30px",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
          >
            <Container className="px-0">
              <Row className="px-0">
                <Col className="px-0">
                  <div className="me-lg-6">
                    <JobVacancyList />
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Manager;

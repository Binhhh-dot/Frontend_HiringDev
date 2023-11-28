import React, { useState } from "react";
import img0 from "../../assets/images/user/img-00.jpg";
import ProjectDetailDescription from "./ProjectDetailDescription";
import ProjectRightSideContent from "./ProjectRightSideContent";
import { Space } from "antd";
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
} from "@ant-design/icons";
import { Layout, Menu, Input, Button, Badge } from "antd";

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
import SiderBarWeb from "./SlideBar/SiderBarWeb";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const { Header, Footer, Content } = Layout;
const { Search } = Input;
// const items = [
//   {
//     label: "Dashboard",
//     key: "menu-key/1",
//     icon: <HomeOutlined />,
//     className: "option-1",
//   },
//   {
//     label: "Option 2",
//     key: "menu-key/2",
//     icon: <DesktopOutlined />,
//     className: "option-2",
//   },
//   {
//     label: "User",
//     key: "menu-key/sub-menu-key",
//     icon: <UserOutlined />,
//     children: [
//       { label: "Tom", key: "menu-key/sub-menu-key/3" },
//       { label: "Bill", key: "menu-key/sub-menu-key/4" },
//       { label: "Alex", key: "menu-key/sub-menu-key/5" },
//     ],
//     className: "option-2",
//   },
//   {
//     label: "Team",
//     key: "menu-key/sub-menu-key2",
//     icon: <TeamOutlined />,
//     children: [
//       { label: "Team 1", key: "menu-key/sub-menu-key2/6" },
//       { label: "Team 2", key: "menu-key/sub-menu-key2/8" },
//     ],
//   },
//   {
//     label: "Files",
//     key: "menu-key/9",
//     icon: <FileOutlined />,
//     className: "files",
//   },
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
// ];

const ProjectDetail = () => {
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
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <React.Fragment>
      <Layout style={{ minHeight: "100vh" }}>
        <SiderBarWeb choose={"menu-key/12"}></SiderBarWeb>

        <Layout>
          <div
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
              <Space>
                <Badge dot>
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
                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                  <DropdownToggle
                    className="p-2 d-flex gap-3 align-items-center"
                    style={{
                      height: "inherit",
                      backgroundColor: "#6546D2",
                      color: "white",

                      cursor: "pointer",
                      border: "0px",
                    }}
                  >
                    <div>
                      <img
                        src={img0}
                        className="ms-1"
                        style={{
                          borderRadius: "10px",
                          height: "50px",
                        }}
                      />
                    </div>
                    <div className="me-1 d-flex flex-column align-items-center">
                      <span className="fs-18">Nik jone</span>
                      <span>Available</span>
                    </div>
                  </DropdownToggle>
                  <DropdownMenu
                    style={{
                      marginLeft: "-25px",
                    }}
                  >
                    <DropdownItem style={{ padding: "0px" }}>
                      <div>
                        <Link to="#" className="dropdown-item">
                          Setting
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
          </div>

          <Content>
            <section className="section " style={{ paddingTop: "14px" }}>
              <Container
                className="custom-container-hiring-detail"
                style={{ paddingLeft: "30px", paddingRight: "30px" }}
              >
                <Row className="mt-3">
                  <Col lg={8}>
                    <ProjectDetailDescription />
                  </Col>

                  <Col
                    lg={4}
                    className="mt-lg-0"
                    style={{ paddingLeft: "19px" }}
                  >
                    <ProjectRightSideContent />
                  </Col>
                </Row>
              </Container>
            </section>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </React.Fragment>
  );
};

export default ProjectDetail;

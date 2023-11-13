import React, { useState } from "react";
import JobDetailsDescription from "./JobDetailsDescription";
import RightSideContent from "./RightSideContent";
import NewListInterviewInfo from "./NewListInterviewInfo";
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

import { Layout, Menu, Input, Button } from "antd";

import {
  Col,
  Row,
  Container,
  Collapse,
  NavbarToggler,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

import { Link } from "react-router-dom";
import classname from "classnames";
import { Badge, Space } from "antd";
import img0 from "../../assets/images/user/img-00.jpg";

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
      { label: "Tom", key: "menu-key/sub-menu-key/3" },
      { label: "Bill", key: "menu-key/sub-menu-key/4" },
      { label: "Alex", key: "menu-key/sub-menu-key/5" },
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
const NewHiringRequestDetail = () => {
  const [collapsed, setCollapsed] = useState(false);
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
  return (
    <React.Fragment>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsed={collapsed}
          width={250}
          style={{
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          }}
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
              borderRadius: "8px",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              marginLeft: "30px",
              marginRight: "30px",
              marginBottom: "0px",
            }}
            className="my-3"
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

          <Content>
            {/* ----------------------------------------------------------------------------- */}
            <section className="section " style={{ paddingTop: "14px" }}>
              <Container
                className="custom-container-hiring-detail"
                style={{ paddingLeft: "30px", paddingRight: "30px" }}
              >
                <Row>
                  <Col lg={8}>
                    <JobDetailsDescription />
                  </Col>
                  <Col
                    lg={4}
                    className="mt-lg-0"
                    style={{ paddingLeft: "19px" }}
                  >
                    <RightSideContent />
                  </Col>
                </Row>
              </Container>
            </section>
          </Content>
        </Layout>
      </Layout>
    </React.Fragment>
  );
};

export default NewHiringRequestDetail;

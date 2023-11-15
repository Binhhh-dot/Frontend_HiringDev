import React, { useState, useEffect } from "react";
import JobVacancyList from "./JobVacancyList";
import NewListInterviewInfo from "./NewListInterviewInfo";
import ProjectList from "./ProjectList";
import img0 from "../../assets/images/user/img-00.jpg";
import { Badge, Space } from "antd";
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

const Test = () => {
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

  console.log(selectedKeys);
  return (
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
        {/* <Header style={{ padding: 16, backgroundColor: '#f8f7fd', display: 'flex', justifyContent: 'space-between' }}>
  <div style={{ backgroundColor: "white", padding: "25px", width: "100%", display: 'flex', justifyContent: 'space-between' }}>
    <div style={{ display: 'flex', alignItems: 'center'}}>
    <Search
  placeholder="Search..."
  onSearch={(value) => {
    console.log(value);
  }}
/>
    </div>
    
    <div style={{ display: 'flex', alignItems: 'center'}}>

      <Button type="primary" onClick={() => {}}>
        Create
      </Button>
    </div>

    
  </div>
</Header> */}

        <div
          style={{
            backgroundColor: "#FFFF",
            height: "70px",
            display: "flex",
            //justifyContent: "space-between",
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
          {selectedKeys[0] === "menu-key/10" && (
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
          )}
          {/* -------------------------------------------------------- */}
          {selectedKeys[0] === "menu-key/11" && (
            <section
              className="section p-3"
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
                      <NewListInterviewInfo />
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
          )}
          {/* ----------------------------------------------------------- */}
          {selectedKeys[0] === "menu-key/12" && (
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
                      <ProjectList />
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
          )}
          {/* ----------------------------------------------------------- */}
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
};

export default Test;

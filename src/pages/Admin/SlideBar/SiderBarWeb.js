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
import { Link, useNavigate } from "react-router-dom";
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

const { Header, Footer, Sider, Content } = Layout;

const SiderBarWeb = () => {
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
        { label: "HR", key: "menu-key/sub-menu-key/5" },
        { label: "Developer", key: "menu-key/sub-menu-key/6" },
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
  const navigate = useNavigate();

  return (
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
                <Menu.Item key={child.key}>
                  {child.label === "Manager" && (
                    <Link to="/listAccountManager">{child.label}</Link>
                  )}
                  {child.label === "Staff" && (
                    <Link to="/listAccountStaff">{child.label}</Link>
                  )}
                  {child.label === "HR" && (
                    <Link to="/listAccountHR">{child.label}</Link>
                  )}
                  {child.label === "Developer" && (
                    <Link to="/listAccountDeveloper">{child.label}</Link>
                  )}
                </Menu.Item>
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
  );
};

export default SiderBarWeb;

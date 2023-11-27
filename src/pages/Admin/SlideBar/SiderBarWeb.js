import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  HomeOutlined,
  SnippetsOutlined,
  SolutionOutlined,
  CodeOutlined,
  AuditOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const { Sider } = Layout;

const SiderBarWeb = ({ choose }) => {
  const [collapsed, setCollapsed] = useState(false);
  //"menu-key/10"
  const [selectedKeys, setSelectedKeys] = useState([choose]);
  const [isLeftIcon, setIsLeftIcon] = useState(true);
  const [showWeHire, setShowWeHire] = useState(true);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    setIsLeftIcon(!isLeftIcon);
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
    // {
    //   label: "Option 2",
    //   key: "menu-key/2",
    //   icon: <DesktopOutlined />,
    //   className: "option-2",
    // },
    {
      label: "User",
      key: "menu-key/sub-menu-key",
      icon: <UserOutlined />,
      children: [
        { label: "List Manager", key: "menu-key/sub-menu-key/3" },
        { label: "List Staff", key: "menu-key/sub-menu-key/4" },
        { label: "List HR", key: "menu-key/sub-menu-key/5" },
        { label: "List Developer", key: "menu-key/sub-menu-key/6" },
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
      label: "Hiring Request",
      key: "menu-key/10",
      icon: <SnippetsOutlined />,
      className: "hiringRequest",
      link: "/manager",
    },
    {
      label: "Interview",
      key: "menu-key/11",
      icon: <SolutionOutlined />,
      className: "interview",
      link: "/newlistinterview", // Add the link property
    },
    {
      label: "Project",
      key: "menu-key/12",
      icon: <CodeOutlined />,
      className: "project",
      link: "/projectlistinmanager", // Add the link property
    },
    {
      label: "Contract",
      key: "menu-key/14",
      icon: <AuditOutlined />,
      className: "contract",
      link: "/listcontract", // Add the link property
    },

    {
      label: "Company",
      key: "menu-key/15",
      icon: <BankOutlined />,
      className: "company",
      link: "/listcompanyPartner", // Add the link property
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
        //"menu-key/10"
        defaultSelectedKeys={[choose]}
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
                  {child.label === "List Manager" && (
                    <Link to="/listAccountManager">{child.label}</Link>
                  )}
                  {child.label === "List Staff" && (
                    <Link to="/listAccountStaff">{child.label}</Link>
                  )}
                  {child.label === "List HR" && (
                    <Link to="/listAccountHR">{child.label}</Link>
                  )}
                  {child.label === "List Developer" && (
                    <Link to="/listAccountDeveloper">{child.label}</Link>
                  )}
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ) : (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.link}>{item.label}</Link>
            </Menu.Item>
          )
        )}
      </Menu>
    </Sider>
  );
};

export default SiderBarWeb;

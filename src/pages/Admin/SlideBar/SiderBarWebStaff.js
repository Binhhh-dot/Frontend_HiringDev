import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleLeft,
    faAngleRight,
    faUserTie,
    faIdCardClip,
    faChalkboardUser,
    faBuildingUser,
    faUserGear,
    faSignal,
    faCodeMerge
} from "@fortawesome/free-solid-svg-icons";
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
    HighlightFilled,
    HighlightOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/we-hire-green.png";


const { Sider } = Layout;

const SiderBarWebStaff = ({ choose }) => {
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
            label: "Comapany",
            key: "menu-key/1",
            icon: <BankOutlined />,
            className: "dashboard",
            link: "/listcompanyPartner",
        },
        {
            label: "Interview",
            key: "menu-key/2",
            icon: <SolutionOutlined />,
            className: "listAccountManager",
            link: "/newlistinterview",
        },
        {
            label: "Report",
            key: "menu-key/3",
            icon: <HighlightOutlined />,
            className: "listAccountStaff",
            link: "/listreportinmanager",
        },
    ];

    const navigate = useNavigate();

    return (
        <Sider
            collapsed={collapsed}
            width={250}
            style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
        >
            <div className="d-flex mt-3 justify-content-between ms-3 me-3 align-items-center">
                {showWeHire && (
                    <div className="mb-0" id="wehire">
                        <img
                            src={logo}
                            alt=""
                            className="logo-light"
                            style={{ objectFit: "cover", width: "170px" }}
                        />
                    </div>
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
                {items.map((item) => (
                    <Menu.Item key={item.key} icon={item.icon}>
                        <Link to={item.link}>{item.label}</Link>
                    </Menu.Item>
                ))}
            </Menu>
        </Sider>
    );
};

export default SiderBarWebStaff;

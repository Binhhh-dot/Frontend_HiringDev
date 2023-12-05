// import React, { useState } from "react";

// import img0 from "../../assets/images/user/img-00.jpg";
// import { Badge, Space } from "antd";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
// import {
//   PieChartOutlined,
//   DesktopOutlined,
//   UserOutlined,
//   TeamOutlined,
//   FileOutlined,
//   LeftOutlined,
//   RightOutlined,
//   HomeOutlined,
//   SnippetsOutlined,
//   SolutionOutlined,
//   CodeOutlined,
// } from "@ant-design/icons";
// import { Layout, Menu, Input, Button } from "antd";

// import { Link } from "react-router-dom";
// import classname from "classnames";

// const { Header, Footer, Sider, Content } = Layout;
// const { Search } = Input;

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

// const SideBarManager = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [selectedKeys, setSelectedKeys] = useState(["menu-key/10"]); // Định nghĩa selectedKeys
//   const [isLeftIcon, setIsLeftIcon] = useState(true);
//   const [showWeHire, setShowWeHire] = useState(true);

//   const toggleSidebar = () => {
//     setCollapsed(!collapsed);
//     setIsLeftIcon(!isLeftIcon); // Cập nhật biến trạng thái khi toggleSidebar
//     setShowWeHire(!showWeHire);
//   };

//   const handleMenuClick = (item) => {
//     setSelectedKeys([item.key]);
//   };

//   const handleSubMenuClick = (item) => {
//     setSelectedKeys([item.key]);
//   };

//   return (
//     <React.Fragment>
//       <Layout style={{ minHeight: "100vh" }}>
//         <Sider
//           collapsed={collapsed}
//           width={250}
//           style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
//         >
//           <div className="d-flex mt-3 justify-content-between ms-3 me-3">
//             {showWeHire && (
//               <h2 className="mb-0" id="wehire">
//                 WeHire
//               </h2>
//             )}
//             {isLeftIcon ? (
//               <div
//                 style={{
//                   width: "40px",
//                   height: "40px",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   backgroundColor: "#f8f7fd",
//                   borderRadius: "10px",
//                 }}
//               >
//                 <FontAwesomeIcon
//                   icon={faAngleLeft}
//                   size="xl"
//                   color="#6546D2"
//                   onClick={toggleSidebar}
//                 />
//               </div>
//             ) : (
//               <div
//                 className="ms-2"
//                 style={{
//                   width: "40px",
//                   height: "40px",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   backgroundColor: "#f8f7fd",
//                   borderRadius: "10px",
//                 }}
//               >
//                 <FontAwesomeIcon
//                   icon={faAngleRight}
//                   size="xl"
//                   color="#6546D2"
//                   onClick={toggleSidebar}
//                 />
//               </div>
//             )}
//           </div>
//           <Menu
//             className="mt-4"
//             style={{ border: "0px" }}
//             defaultSelectedKeys={["menu-key/10"]}
//             selectedKeys={selectedKeys}
//             mode="inline"
//             onClick={handleMenuClick}
//           >
//             {items.map((item) =>
//               item.children ? (
//                 <Menu.SubMenu
//                   key={item.key}
//                   icon={item.icon}
//                   title={item.label}
//                   onClick={() => handleSubMenuClick(item)}
//                 >
//                   {item.children.map((child) => (
//                     <Menu.Item key={child.key}>{child.label}</Menu.Item>
//                   ))}
//                 </Menu.SubMenu>
//               ) : (
//                 <Menu.Item key={item.key} icon={item.icon}>
//                   {item.label}
//                 </Menu.Item>
//               )
//             )}
//           </Menu>
//         </Sider>
//       </Layout>
//     </React.Fragment>
//   );
// };

// export default SideBarManager;

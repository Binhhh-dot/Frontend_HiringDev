import React, { useState , useEffect} from 'react';
import { PieChartOutlined, DesktopOutlined, UserOutlined, TeamOutlined, FileOutlined, LeftOutlined, RightOutlined, HomeOutlined  } from '@ant-design/icons';
import { Layout, Menu, Input, Button } from 'antd';


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
    { label: 'Dashboard', key: 'menu-key/1', icon: <HomeOutlined />, className: 'option-1'},
    { label: 'Option 2', key: 'menu-key/2', icon: <DesktopOutlined /> , className: 'option-2'},
    {
      label: 'User',
      key: 'menu-key/sub-menu-key',
      icon: <UserOutlined />,
      children: [
        { label: 'Tom', key: 'menu-key/sub-menu-key/3' },
        { label: 'Bill', key: 'menu-key/sub-menu-key/4' },
        { label: 'Alex', key: 'menu-key/sub-menu-key/5' },
      ],
      className: 'option-2'
    },
    {
      label: 'Team',
      key: 'menu-key/sub-menu-key2',
      icon: <TeamOutlined />,
      children: [
        { label: 'Team 1', key: 'menu-key/sub-menu-key2/6' },
        { label: 'Team 2', key: 'menu-key/sub-menu-key2/8' },
      ],
    },
    { label: 'Files', key: 'menu-key/9', icon: <FileOutlined />, className: 'files' },
  ];

const Test = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(['menu-key/1']); // Định nghĩa selectedKeys
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
    <Layout style={{ minHeight: '100vh' }}>
    <Sider collapsed={collapsed} width={250} >
      <div className="d-flex mt-3 justify-content-between ms-3 me-3">
      {showWeHire && <h2 className="mb-0" id="wehire">WeHire</h2>}
          {isLeftIcon ? (
              <div  style={{  width: "35px", height: "35px", display: "flex", justifyContent: "center", alignItems: "center",
          backgroundColor:"#f8f7fd"
          }}>
              <LeftOutlined onClick={toggleSidebar} style={{ color: "purple", fontSize: "24px" }} />
        </div>
  ) : (
    <div className="ms-2"   style={{  width: "35px", height: "35px", display: "flex", justifyContent: "center", alignItems: "center",
          backgroundColor:"#f8f7fd"
          }}>
    <RightOutlined onClick={toggleSidebar} style={{ color: "purple", fontSize: "24px" }} />
    </div>
  )}
      </div>
      <Menu
      className="mt-4"
        style={{border:"0px"}}
        defaultSelectedKeys={['menu-key/1']}
        selectedKeys={selectedKeys}
        mode="inline"
        onClick={handleMenuClick}
      >
        {items.map((item) => (
          item.children ? (
            <Menu.SubMenu
              key={item.key}
              icon={item.icon}
              title={item.label}
              onClick={() => handleSubMenuClick(item)}
            >
              {item.children.map((child) => (
                <Menu.Item key={child.key}>
                  {child.label}
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ) : (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.label}
            </Menu.Item>
          )
        ))}
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



        




    <div style={{backgroundColor:"#f8f7fd", height:"50px", display:"flex", justifyContent:"center", alignItems:"center"}} >

        <div style={{backgroundColor:"white"}}>
        <Search
        
  placeholder="Search..."
  onSearch={(value) => {
    console.log(value);
  }}
  
/>
        </div>
    </div>
        <Content >
        </Content>
        <Footer>Footer</Footer>
      </Layout>
  </Layout>

  );
};

export default Test;

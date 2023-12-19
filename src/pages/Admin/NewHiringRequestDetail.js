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

import { Layout, Menu, Input, Button, Badge, Space } from "antd";

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

import img0 from "../../assets/images/user/img-00.jpg";
import SiderBarWeb from "./SlideBar/SiderBarWeb";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import NavBarWeb from "./NavBar/NavBarWeb";
import SiderBarWebStaff from "./SlideBar/SiderBarWebStaff";

const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;

const NewHiringRequestDetail = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <React.Fragment>
      <Layout style={{ minHeight: "100vh" }}>
        <SiderBarWeb choose={"menu-key/10"}></SiderBarWeb>

        <Layout>
          <NavBarWeb></NavBarWeb>

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

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

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SiderBarWeb choose={"menu-key/10"}></SiderBarWeb>
      <Layout>
        <NavBarWeb></NavBarWeb>

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

import React, { useState } from "react";
import { Layout, Menu, Input, Button, Badge, Space } from "antd";
import { Link } from "react-router-dom";
import {
  Col,
  Row,
  Container,
  Collapse,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import SiderBarWeb from "./SlideBar/SiderBarWeb";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import img0 from "../../assets/images/user/img-00.jpg";
import CompanyDetailPartnerDescription from "./CompanyDetailPartnerDescription";
import NavBarWeb from "./NavBar/NavBarWeb";
const { Header, Footer, Sider, Content } = Layout;

const CompanyDetailPartner = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <React.Fragment>
      <Layout style={{ minHeight: "100vh" }}>
        <SiderBarWeb choose={"menu-key/15"}></SiderBarWeb>
        <Layout>
          <NavBarWeb></NavBarWeb>
          <Content>
            <section className="section " style={{ paddingTop: "14px" }}>
              <Container
                className="custom-container-hiring-detail"
                style={{ paddingLeft: "30px", paddingRight: "30px" }}
              >
                <Row>
                  <Col lg={12}>
                    <CompanyDetailPartnerDescription />
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

export default CompanyDetailPartner;

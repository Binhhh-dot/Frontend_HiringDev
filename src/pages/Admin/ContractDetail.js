import React, { useState } from "react";
import ContractDetailDescription from "./ContractDetailDescription";
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
import SiderBarWeb from "./SlideBar/SiderBarWeb";

const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;

const ContractDetail = () => {
  return (
    <React.Fragment>
      <Layout style={{ minHeight: "100vh" }}>
        <SiderBarWeb choose={"menu-key/14"}></SiderBarWeb>

        <Layout>
          <div
            style={{
              backgroundColor: "#FFFF",
              height: "70px",
              display: "flex",
              // justifyContent: "space-between",
              alignItems: "center",
              borderRadius: "8px",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              marginLeft: "30px",
              marginRight: "30px",
              marginBottom: "0px",
            }}
            className="my-3 justify-content-end"
          >
            {/* <div style={{ backgroundColor: "white", width: "30%" }}>
              <Search
                className="ms-3"
                placeholder="Type here to search"
                onSearch={(value) => {
                  console.log(value);
                }}
              />
            </div> */}

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
                  <Col lg={12}>
                    <ContractDetailDescription />
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

export default ContractDetail;

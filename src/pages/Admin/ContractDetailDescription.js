import React from "react";
import {
  Card,
  CardBody,
  Col,
  Row,
  Modal,
  ModalBody,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavItem,
  NavLink,
  Nav,
  TabPane,
  TabContent,
} from "reactstrap";
const ContractDetailDescription = () => {
  return (
    <React.Fragment>
      <Card
        className="job-detail "
        style={{
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <CardBody className="p-3 ">
          <div>
            <h4>Contract Detail</h4>
          </div>
          <div>CONTRACT CONTENT</div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
export default ContractDetailDescription;

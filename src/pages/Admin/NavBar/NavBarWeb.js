import React, { useState, useEffect } from "react";
import img0 from "../../../assets/images/user/img-00.jpg";
import { Badge, Space, Layout, Menu, Input, Modal } from "antd";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  Label,
  Col,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import userSerrvices from "../../../services/user.serrvices";

const NavBarWeb = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [name, setName] = useState("");
  const [imgUser, setImgUser] = useState("");
  const [status, setStatus] = useState("");
  const [userData, setUserData] = useState();
  const [defaultUserImg, setDefaultUserImg] = useState(null);

  const [userImageState, setUserState] = useState(null);
  const [dateState, setDateState] = useState(null);
  const [firstNameState, setFirstnameState] = useState(null);
  const [lastNameState, setLastnameState] = useState(null);
  const [phoneState, setPhonenameState] = useState(null);
  //-------------------------------------------------------------------------
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  //------------------------------------------------------------------------
  const [showPopupProfileUser, setShowPopupProfileUser] = useState(false);
  const handleProfileUser = () => {};
  const handleOkProfileUser = () => {};
  //------------------------------------------------------------------------
  const [avatar2, setAvatar2] = useState();
  useEffect(() => {
    return () => avatar2 && URL.revokeObjectURL(avatar2.preview);
  }, [avatar2]);

  const handleChooseAvatar2 = () => {
    const inputElement = document.getElementById("profile-img-file-input-2");
    inputElement.click();
  };

  const handlePreviewAvatar2 = (e) => {
    const file = e.target.files[0];
    if (file) {
      file.preview = URL.createObjectURL(file);
      setAvatar2(file);
    } else {
      setAvatar2(null);
    }
  };
  //-------------------------------------------------------------------------
  const fetchGetUserDetail2 = async () => {
    const userId = localStorage.getItem("userId");
    let response;
    let fullName;
    if (userId) {
      try {
        response = await userSerrvices.getUserById(userId);
        fullName =
          response.data.data.firstName + " " + response.data.data.lastName;
        setName(fullName);
        setImgUser(response.data.data.userImage);
        setStatus(response.data.data.statusString);
      } catch (error) {
        console.error("Error fetching user detail2", error);
      }
    }
  };

  //-------------------------------------------------------------------------
  const fetchGetUserDetail = async () => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      try {
        const response = await userSerrvices.getUserById(userId);
        //-------------------------------------------------------------------
        const {
          lastName,
          firstName,
          email,
          phoneNumber,
          dateOfBirth,
          userImage,
        } = response.data.data;
        setUserData({
          lastName,
          firstName,
          email,
          phoneNumber,
          dateOfBirth,
          userImage,
        });
        document.getElementById("firstNameManager").value =
          response.data.data.firstName;
        document.getElementById("lastNameManager").value =
          response.data.data.lastName;
        document.getElementById("phoneNumberManager").value =
          response.data.data.phoneNumber;
        let formattedDate;
        if (response.data.data.dateOfBirth) {
          const dateOfBirthtemp = response.data.data.dateOfBirth;
          const parsedDate = new Date(dateOfBirthtemp);
          formattedDate = parsedDate.toISOString().split("T")[0];
          document.getElementById("dayOfBirhManager").value = formattedDate;
          setDateState(formattedDate);
        }

        setFirstnameState(response.data.data.firstName);
        setLastnameState(response.data.data.lastName);
        setPhonenameState(response.data.data.phoneNumber);

        if (response.data.data.userImage) {
          setDefaultUserImg(response.data.data.userImage);
        } else {
          setDefaultUserImg(img0);
        }
      } catch (error) {
        console.error("Error fetching user detail", error);
      }
    }
  };

  //   useEffect(() => {
  //     fetchGetUserDetail();
  //   }, []);

  const midleChange = () => {
    setShowPopupProfileUser(true);

    fetchGetUserDetail();
  };

  useEffect(() => {
    fetchGetUserDetail2();
  }, []);
  //------------------------------------------------------------------------
  return (
    <React.Fragment>
      <div>
        <div
          style={{
            backgroundColor: "#FFFF",
            height: "70px",
            display: "flex",
            alignItems: "center",
            borderRadius: "7px",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            marginLeft: "30px",
            marginRight: "30px",
            marginBottom: "0px",
          }}
          className="mt-4 justify-content-end"
        >
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

            <div
              className="p-1  d-flex gap-3 align-items-center me-2"
              style={{
                height: "60px",
                backgroundColor: "#6546D2",
                color: "white",
                borderRadius: "7px",
              }}
            >
              <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle
                  className="p-1 d-flex gap-3 align-items-center"
                  style={{
                    height: "60px",
                    backgroundColor: "#6546D2",
                    color: "white",

                    cursor: "pointer",
                    border: "0px",
                  }}
                >
                  <div>
                    <img
                      src={imgUser || img0}
                      className="ms-1 px-0"
                      style={{
                        borderRadius: "7px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="me-1 d-flex flex-column align-items-center">
                    <span className="fs-18">{name}</span>
                    <span>{status}</span>
                  </div>
                </DropdownToggle>
                <DropdownMenu
                  style={{
                    marginLeft: "-25px",
                  }}
                >
                  <DropdownItem style={{ padding: "0px" }}>
                    <div onClick={midleChange}>
                      <div className="dropdown-item">Profile</div>
                    </div>
                  </DropdownItem>

                  <DropdownItem style={{ padding: "0px" }}>
                    <div>
                      <Link to="#" className="dropdown-item">
                        Change Password
                      </Link>
                    </div>
                  </DropdownItem>

                  <DropdownItem style={{ padding: "0px" }}>
                    <div>
                      <Link to="/signout" className="dropdown-item">
                        Logout
                      </Link>
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
        {/* ------------------------------------------------------------------------------------- */}
        <Modal
          centered
          open={showPopupProfileUser}
          onOk={() => handleOkProfileUser()}
          onCancel={() => setShowPopupProfileUser(false)}
          width={800}
          okType="default"
          okButtonProps={{
            style: {
              background: "#6546D2",
              borderColor: "#6546D2",
              color: "white",
            },
          }}
        >
          <Form>
            <div>
              <h5 className="fs-17 fw-semibold mb-3 mb-0">Manager Profile</h5>
              <div className="text-center">
                <div className="mb-4 profile-user">
                  {avatar2 ? (
                    <img
                      src={avatar2.preview}
                      className="rounded-circle img-thumbnail profile-img"
                      id="profile-img"
                      alt=""
                    />
                  ) : (
                    <img
                      src={defaultUserImg}
                      className="rounded-circle img-thumbnail profile-img"
                      id="profile-img-2"
                      alt=""
                    />
                  )}
                  <div className="p-0 rounded-circle profile-photo-edit">
                    <label className="profile-photo-edit avatar-xs">
                      <i
                        className="uil uil-edit"
                        onClick={handleChooseAvatar2}
                      ></i>
                    </label>
                    <input
                      type="file"
                      id="profile-img-file-input-2"
                      onChange={handlePreviewAvatar2}
                      accept=".jpg, .jpeg, .png"
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
              </div>
              <Row>
                <Col lg={6}>
                  <div className="mb-3">
                    <label htmlFor="firstNameManager" className="form-label">
                      First Name
                    </label>
                    <Input
                      type="text"
                      className="form-control"
                      id="firstNameManager"
                      name="firstName"
                    />
                    {/* {firstNameError && (
                      <p className="text-danger mt-2">{firstNameError}</p>
                    )} */}
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-3">
                    <Label htmlFor="lastNameManager" className="form-label">
                      Last Name
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="lastNameManager"
                    />
                    {/* {lastNameError && (
                      <p className="text-danger mt-2">{lastNameError}</p>
                    )} */}
                  </div>
                </Col>

                <Col lg={6}>
                  <div className="mb-3">
                    <Label htmlFor="phoneNumberManager" className="form-label">
                      Phone Number
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="phoneNumberManager"
                    />
                    {/* {phoneNumberError && (
                      <p className="text-danger mt-2">{phoneNumberError}</p>
                    )} */}
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-3">
                    <Label htmlFor="dayOfBirhManager" className="form-label">
                      Day of Birth
                    </Label>
                    <Input
                      type="date"
                      className="form-control"
                      id="dayOfBirhManager"
                    />
                    {/* {dayOfBirthError && (
                      <p className="text-danger mt-2">{dayOfBirthError}</p>
                    )} */}
                  </div>
                </Col>
              </Row>
            </div>
          </Form>
        </Modal>
        {/* ------------------------------------------------------------------------------------- */}
      </div>
    </React.Fragment>
  );
};

export default NavBarWeb;

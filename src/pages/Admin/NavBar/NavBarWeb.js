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
import notificationServices from "../../../services/notification.services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { onMessageListener } from "../../../utils/firebase";
import { useLocation, useNavigate } from "react-router-dom";

const NavBarWeb = () => {
  const location = useLocation();
  //const history = useHistory();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [name, setName] = useState("");
  const [imgUser, setImgUser] = useState("");
  const [status, setStatus] = useState("");
  const [roleString, setRoleString] = useState("");
  //-------------------------------------------------------------------------
  const [notification, setNotification] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [listNotification, setListNotification] = useState([]);
  const [countNotification, setCountNotification] = useState(false);
  //-------------------------------------------------------------------------
  const userId = localStorage.getItem("userId");
  //-------------------------------------------------------------------------
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  //------------------------------------------------------------------------
  // const [showPopupProfileUser, setShowPopupProfileUser] = useState(false);

  // const openPopupProfileUser = () => {
  //   setShowPopupProfileUser(true);
  // };

  // const closePopupProfileUser = () => {
  //   setShowPopupProfileUser(false);
  // };

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
        setRoleString(response.data.data.roleString);
      } catch (error) {
        console.error("Error fetching user detail2", error);
      }
    }
  };
  //--------------------------------------------------------------------------
  const dropDownnotification = async () => {
    setNotification((prevState) => !prevState);
    const userId = localStorage.getItem("userId");
    if (userId) {
      try {
        const response = await notificationServices.unNewNotification(userId);
        console.log(response);
        setCountNotification(0);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu người dùng:", error);
      }
    }
  };
  //--------------------------------------------------------------------------
  const fetchGetListNotificationByManager = async () => {
    let response;
    try {
      response = await notificationServices.getListNotificationByManager();
      console.log(response.data.data);
      setListNotification(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  //--------------------------------------------------------------------------
  const fetchCountNotification = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const respone = await notificationServices.getCountNotificationByUserId(
        userId
      );
      console.log(respone.data.data);
      setCountNotification(respone.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  //--------------------------------------------------------------------------

  // const determineUrl = (notificationTypeName, routeId) => {
  //   switch (notificationTypeName) {
  //     case "Project":
  //       return `/projectdetail/`;

  //     case "Report":
  //       return `/listreportinmanagerdetail`;

  //     case "Hiring Request":
  //       return `/newhiringrequestdetail`;

  //     default:
  //       return "/";
  //   }
  // };

  //--------------------------------------------------------------------------
  const handleNoti = async (jobVacancyListDetails) => {
    const { notificationTypeName, routeId } = jobVacancyListDetails;
    //const url = determineUrl(notificationTypeName);

    const userId = localStorage.getItem("userId");

    try {
      const response = await notificationServices.readNotification(
        jobVacancyListDetails.notificationId,
        userId
      );

      console.log(response);
    } catch (error) {
      console.error("Error reading to notification:", error);
    }

    //navigate(url, { replace: true }); // Sử dụng replace: true để tải lại trang
    setNotification(false);
    //window.location.reload();
  };
  //--------------------------------------------------------------------------
  onMessageListener()
    .then((payload) => {
      // Xử lý thông báo ở đây
      console.log("Received message from Firebase:", payload);
      setNotificationVisible(!notificationVisible);
    })
    .catch((error) => {
      console.error("Error listening to messages:", error);
    });

  //--------------------------------------------------------------------------

  useEffect(() => {
    fetchGetUserDetail2();
  }, []);
  //--------------------------------------------------------------------------
  useEffect(() => {
    fetchGetListNotificationByManager();
    fetchCountNotification();
  }, []);
  //--------------------------------------------------------------------------
  useEffect(() => {
    fetchGetListNotificationByManager();
    fetchCountNotification();
  }, [notificationVisible]);
  //--------------------------------------------------------------------------
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
              <Badge>
                <Dropdown isOpen={notification} toggle={dropDownnotification}>
                  <DropdownToggle
                    className="header-item noti-icon position-relative"
                    id="notification"
                    type="button"
                    tag="div"
                  >
                    <i className="mdi mdi-bell fs-22"></i>
                    {countNotification != 0 && (
                      <>
                        <div className="count position-absolute">
                          {countNotification}
                        </div>
                      </>
                    )}
                  </DropdownToggle>
                  <DropdownMenu
                    className="dropdown-menu-md dropdown-menu-end p-0"
                    aria-labelledby="notification"
                    end
                  >
                    <div className="notification-header border-bottom bg-light">
                      <h6 className="mb-1"> Notification </h6>
                      <p className="text-muted fs-13 mb-0">
                        You have {countNotification} unread Notification
                      </p>
                    </div>

                    <div className="notification-wrapper dropdown-scroll">
                      {listNotification.map((jobVacancyListDetails, key) => (
                        <div
                          key={key}
                          className="text-dark notification-item d-block active"
                          onClick={() => handleNoti(jobVacancyListDetails)}
                        >
                          <div className="d-flex align-items-center gap-2">
                            <div className="flex-shrink-0 me-3">
                              <div className="avatar-xs bg-primary text-white rounded-circle text-center">
                                <i className="uil uil-megaphone"></i>
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <p className="mt-0 mb-1 fs-14">
                                {jobVacancyListDetails.content}
                              </p>
                              <p className="mb-0 fs-12 ">
                                {jobVacancyListDetails.isRead != true ? (
                                  <>
                                    <i
                                      style={{ color: "#92969B" }}
                                      className="mdi mdi-clock-outline"
                                    ></i>{" "}
                                    <span style={{ color: "#92969B" }}>
                                      {" "}
                                      {jobVacancyListDetails.createdTime}
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <i className="mdi mdi-clock-outline"></i>{" "}
                                    <span>
                                      {" "}
                                      {jobVacancyListDetails.createdTime}
                                    </span>
                                  </>
                                )}
                              </p>
                            </div>
                            {jobVacancyListDetails.isRead != true && (
                              <FontAwesomeIcon
                                icon={faCircle}
                                style={{ fontSize: "10px", color: "green" }}
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="notification-footer border-top text-center">
                      <Link className="primary-link fs-13" to="#">
                        <i className="mdi mdi-arrow-right-circle me-1"></i>{" "}
                        <span>View More..</span>
                      </Link>
                    </div>
                  </DropdownMenu>
                </Dropdown>
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
                    <span>{roleString}</span>
                  </div>
                </DropdownToggle>
                <DropdownMenu
                  style={{
                    marginLeft: "-25px",
                  }}
                >
                  <DropdownItem style={{ padding: "0px" }}>
                    <div>
                      {/* onClick={openPopupProfileUser} */}
                      <Link
                        to={"/profilemanager"}
                        className="dropdown-item px-0 p-0"
                      >
                        <div className="dropdown-item">Profile</div>
                      </Link>
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

        {/* <UpdateProfileManagerPopup
          isModalOpen={showPopupProfileUser}
          closeModal={closePopupProfileUser}
          userId={userId}
        ></UpdateProfileManagerPopup> */}

        {/* ------------------------------------------------------------------------------------- */}
      </div>
    </React.Fragment>
  );
};

export default NavBarWeb;

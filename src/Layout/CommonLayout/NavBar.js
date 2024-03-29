import React, { useState, useEffect } from "react";
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


import { Link, Redirect, useNavigate } from "react-router-dom";
import classname from "classnames";
import withRouter from "../../components/withRouter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn,
  faEllipsisVertical,
  faX,
  faPlus,
  faTimes,
  faEllipsis,
  faAngleRight,
  faAngleLeft,
  faGear,
  faCircle,
  faMobileScreen
} from "@fortawesome/free-solid-svg-icons";
import darkLogo from "../../assets/images/logo-dark.png";
import lightLogo from "../../assets/images/logo-light.png";
import userImage2 from "../../assets/images/user/img-02.jpg";
import jobImage4 from "../../assets/images/featured-job/img-04.png";
import userImage1 from "../../assets/images/user/img-01.jpg";
import jobImage from "../../assets/images/featured-job/img-01.png";
import profileImage from "../../assets/images/user/img-00.jpg";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userSerrvices from "../../services/user.serrvices";
import { onMessageListener } from "../../utils/firebase";
import notificationServices from "../../services/notification.services";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const userId = localStorage.getItem("userId");
  const [home, setHome] = useState(false);
  const [company, setCompany] = useState(false);
  const [pages, setPages] = useState(false);
  const [blog, setBlog] = useState(false);
  const navStyle = userId ? { marginTop: "0px" } : {};
  //Notification Dropdown
  const [notification, setNotification] = useState(false);
  const [notificationFb, setNotificationFb] = useState(false)
  const [firstNoti, setFirstNoti] = useState(false)
  const [listNotification, setListNotification] = useState([])
  const [countNotification, setCountNotification] = useState(false)
  //user Profile Dropdown
  const [userProfile, setUserProfile] = useState(false);
  const dropDownuserprofile = () => setUserProfile((prevState) => !prevState);

  //scroll navbar
  const [navClass, setnavClass] = useState(false);
  const [role, setRole] = useState(null);
  const [name, setName] = useState(null);
  const [imgUser, setImgUser] = useState(null);
  const navigate = useNavigate();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [route, setRoute] = useState('');


  useEffect(() => {
    window.addEventListener("scroll", scrollNavigation, true);
    const role = localStorage.getItem("role");
    setRole(role);
  });

  const signout = () => {
    // Giả sử error là một tham số được truyền vào từ nơi gọi hàm
    toast.success("Logout successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    // Thực hiện các bước đăng xuất, chẳng hạn như xóa thông tin xác thực
    // Ví dụ: authService.signOut();
  };

  function scrollNavigation() {
    var scrollup = window.pageYOffset;
    if (scrollup > 0) {
      setnavClass("nav-sticky");
    } else {
      setnavClass("");
    }
  }

  //menu activation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const pathName = props.router.location.pathname;
    var matchingMenuItem = null;
    var ul = document.getElementById("navbarCollapse");
    var items = ul.getElementsByTagName("a");
    removeActivation(items);
    for (var i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [props.router.location.pathname]);

  const fetchUserDetail = async () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      try {
        const response = await userSerrvices.getUserById(userId);
        setName(response.data.data.firstName);
        setImgUser(response.data.data.userImage);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu người dùng:", error);
      }
    }
  };

  const dropDownnotification = async () => {
    setNotification((prevState) => !prevState);
    const userId = localStorage.getItem("userId");
    if (userId) {
      try {
        const response = await notificationServices.unNewNotification(userId);
        console.log(response)
        setCountNotification(0);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu người dùng:", error);
      }
    }
  }

  const handleNoti = async (jobVacancyListDetails) => {
    const page = jobVacancyListDetails.notificationTypeName;
    const routeId = jobVacancyListDetails.routeId;
    var url;
    if (page == "Hiring Request") {
      url = "/hiringrequestlistincompanypartnerdetail?Id=" + routeId;
      console.log(url)
    }
    if (page == "Interview") {
      url = "/hiringrequestlistincompanypartnerdetail?Id=" + routeId;
      console.log(url)
    }
    if (page == "Contract") {
      url = "/contractListHr";
      console.log(url)
    }
    if (page == "Project ") {
      url = "/projectdetailhr?Id=" + routeId;
      console.log(url)
    }
    if (page == "Payment") {
      url = "/payment?Id=" + routeId;
      console.log(url)
    }
    const userId = localStorage.getItem("userId");
    try {
      const respone = await notificationServices.readNotification(jobVacancyListDetails.notificationId, userId);
      console.log(respone);
    } catch (error) {
      console.log(error);
    }
    navigate(url);
    setNotification(false);
  };

  useEffect(() => {
    fetchUserDetail();
  }, []);

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;
      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        if (parent.classList.contains("active")) {
          parent.classList.remove("active");
        }
      }
    }
  };

  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement.parentElement.parentElement;

    if (parent) {
      parent.classList.add("active"); // li
      const parent2 = parent.parentElement;
      parent2.classList.add("active"); // li
      const parent3 = parent2.parentElement;
      if (parent3) {
        parent3.classList.add("active"); // li
        const parent4 = parent3.parentElement;
        if (parent4) {
          parent4.classList.add("active"); // li
          const parent5 = parent4.parentElement;
          if (parent5) {
            parent5.classList.add("active"); // li
            const parent6 = parent5.parentElement;
            if (parent6) {
              parent6.classList.add("active"); // li
            }
          }
        }
      }
    }
    return false;
  }

  const fetchListNotification = async () => {
    let userId = localStorage.getItem("userId");
    if (userId) {
      try {
        const respone = await notificationServices.getListNotificationByUserId(userId);
        console.log(respone)
        setListNotification(respone.data.data)
        if (firstNoti) {
          toast.info(respone.data.data[0].content);
        }
        setFirstNoti(false)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const fetchCountNotification = async () => {
    let userId = localStorage.getItem("userId");
    if (userId) {
      try {
        const userId = localStorage.getItem("userId");
        const respone = await notificationServices.getCountNotificationByUserId(userId);
        console.log(respone)
        setCountNotification(respone.data.data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    fetchListNotification();
    fetchCountNotification();
  }, [])


  useEffect(() => {
    fetchListNotification();
    fetchCountNotification();

  }, [notificationFb])




  onMessageListener().then((payload) => {
    // Xử lý thông báo ở đây
    console.log('Received message from Firebase:', payload);
    setFirstNoti(true);
    setNotificationFb(!notificationFb)
  }).catch((error) => {
    console.error('Error listening to messages:', error);
  });



  const channel = new BroadcastChannel('notificationChannel');
  channel.onmessage = function (event) {
    setFirstNoti(true);
    setNotificationFb(!notificationFb)
  };




  return (
    <React.Fragment >
      <nav
        className={"navbar navbar-expand-lg fixed-top sticky p-0 " + navClass}
        style={navStyle}
        id="navigation"
      >
        <Container fluid className="custom-container">
          <Link className="navbar-brand text-dark fw-bold me-auto" to="/home">
            <img src={darkLogo} height="22" alt="" className="logo-dark" />
            <img src={lightLogo} height="22" alt="" className="logo-light" />
          </Link>
          <div>
            <NavbarToggler
              className="me-3"
              type="button"
              onClick={() => toggle()}
            >
              <i className="mdi mdi-menu"></i>
            </NavbarToggler>
          </div>
          <Collapse
            isOpen={isOpen}
            className="navbar-collapse"
            id="navbarCollapse"
          >
            <ul className="navbar-nav mx-auto navbar-center">
              {/* <NavItem className="dropdown dropdown-hover">
                <NavLink
                  to="/layout3"
                  id="homedrop"
                  className="arrow-none"
                  onClick={() => setHome(!home)}
                >
                  Home <div className="arrow-down"></div>
                </NavLink>
                <ul
                  className={classname("dropdown-menu dropdown-menu-center", {
                    show: home,
                  })}
                  aria-labelledby="homedrop"
                >
                  <li>
                    <Link className="dropdown-item" to="/">
                      Home 1
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/layout2">
                      Home 2
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/layout3">
                      Home 3
                    </Link>
                  </li>
                </ul>
              </NavItem> */}
              <NavItem>
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </NavItem>
              <NavItem className="dropdown dropdown-hover">
                <NavLink
                  id="jobsdropdown"
                  role="button"
                // onClick={() => setCompany(!company)}
                >
                  Page <div className="arrow-down"></div>
                </NavLink>
                <ul
                  className={classname("dropdown-menu dropdown-menu-center", {
                    show: company,
                  })}
                  aria-labelledby="jobsdropdown"
                >
                  <li>

                    <Link
                      className="dropdown-item"
                      to="/reportList"
                    >
                      Report List
                    </Link>

                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/contractListHr"
                    >
                      Contract List
                    </Link>


                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/transactionlist"
                    >
                      Transaction List
                    </Link>
                  </li>
                </ul>
              </NavItem>

              {/* {(role === "HR") && (
                <>
                  <li className="nav-item dropdown dropdown-hover">
                    <Link
                      id="pagesdoropdown"
                      className="nav-link dropdown-toggle arrow-none"
                    >
                      Page
                      <div className="arrow-down"></div>
                    </Link>
                    <div
                      className={classname(
                        "dropdown-menu dropdown-menu-lg dropdown-menu-center",
                        { show: pages }
                      )}
                      aria-labelledby="pagesdoropdown"
                    >
                      <Row>
                        {role === "HR" && (
                          <>
                            <Col lg={6}>
                              <span className="dropdown-header">
                                another
                              </span>
                              <Link
                                className="dropdown-item"
                                to="/reportList"
                              >
                                Report List
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="/contractListHr"
                              >
                                Contract List
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="/transactionlist"
                              >
                                Transaction List
                              </Link>
                            </Col>
                            <Col lg={6}>
                              <span className="dropdown-header">
                                Project
                              </span>
                              <Link
                                className="dropdown-item"
                                to="/projectlist"
                              >
                                Project List
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="/createproject"
                              >
                                Create new project
                              </Link>
                            </Col>
                          </>
                        )}
                        {role === "Manager" && (
                          <>
                            <Col lg={5}>
                              <span className="dropdown-header">List</span>

                              <Link
                                className="dropdown-item"
                                to="/hiringrequestlist"
                              >
                                List HiringRequest In Process
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="/hiringrequestdetails"
                              >
                                List HiringRequest Expired
                              </Link>

                              <Link
                                className="dropdown-item"
                                to="/assigntaskcreate"
                              >
                                Assign Task Create
                              </Link>

                              <Link
                                className="dropdown-item"
                                to="/assigntaskdetail"
                              >
                                Assign Task Detail
                              </Link>

                              <Link
                                className="dropdown-item"
                                to="/assigntaskforstaffdetail"
                              >
                                Task Detail For Staff
                              </Link>

                              <Link
                                className="dropdown-item"
                                to="/assigntasklistformanager"
                              >
                                Task List For Manager
                              </Link>

                              <Link
                                className="dropdown-item"
                                to="/assigntasklistforstaff"
                              >
                                Task List For Staff
                              </Link>

                              <Link className="dropdown-item" to="/developer">
                                Developer
                              </Link>
                            </Col>
                            <Col lg={3}>
                              <span className="dropdown-header">Interview</span>
                              <Link
                                className="dropdown-item"
                                to="/listInterview"
                              >
                                List Interview
                              </Link>

                            </Col>
                            <Col lg={4}>
                              <span className="dropdown-header">
                                Hiring Request
                              </span>


                            </Col>
                          </>
                        )}
                      </Row>
                    </div>
                  </li>
                </>
              )} */}
              <NavItem>
                <Link className="nav-link" to="/projectlist">
                  project
                </Link>
              </NavItem>

              <NavItem>
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </NavItem>

            </ul>
          </Collapse>

          {userId ? (
            <ul className="header-menu list-inline d-flex align-items-center mb-0">
              <Dropdown
                isOpen={notification}
                toggle={dropDownnotification}
                className="list-inline-item  me-4"
              >
                <DropdownToggle
                  // href="#"
                  className="header-item noti-icon position-relative"
                  id="notification"
                  type="button"
                  tag="div"
                >
                  <i className="mdi mdi-bell fs-22"></i>
                  {countNotification != 0 && (
                    <>
                      <div className="count position-absolute">{countNotification}</div>
                    </>
                  )}
                </DropdownToggle>
                <DropdownMenu
                  className="dropdown-menu-sm dropdown-menu-end p-0"
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
                        className="text-dark notification-item d-block active"
                        onClick={() => handleNoti(jobVacancyListDetails)}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <div className="flex-shrink-0 me-3">
                            <div className="avatar-xs bg-primary text-white rounded-circle text-center">
                              <i className="uil uil-user-check"></i>
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <h6 className="mt-0 mb-1 fs-14">
                              {jobVacancyListDetails.content}
                            </h6>
                            <p className="mb-0 fs-12 ">
                              {jobVacancyListDetails.isRead != true ? (
                                <>
                                  <i style={{ color: "green" }} className="mdi mdi-clock-outline"></i>{" "}
                                  <span style={{ color: "green" }}> {jobVacancyListDetails.createdTime}</span>
                                </>
                              ) : (
                                <>
                                  <i className="mdi mdi-clock-outline"></i>{" "}
                                  <span> {jobVacancyListDetails.createdTime}</span>
                                </>
                              )}
                            </p>
                          </div>
                          {jobVacancyListDetails.isRead != true && (
                            <FontAwesomeIcon icon={faCircle} style={{ fontSize: "10px", color: "green" }} />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="notification-footer border-top text-center">
                    <Link className="primary-link fs-13" to="/notificationList">
                      <i className="mdi mdi-arrow-right-circle me-1"></i>{" "}
                      <span>View More..</span>
                    </Link>
                  </div>
                </DropdownMenu>
              </Dropdown>
              <Dropdown
                onClick={() => setUserProfile(!userProfile)}
                isOpen={userProfile}
                toggle={dropDownuserprofile}
                className="list-inline-item"
              >
                <DropdownToggle
                  to="#"
                  className="header-item"
                  id="userdropdown"
                  type="button"
                  tag="a"
                  aria-expanded="false"
                >
                  <img
                    src={imgUser || profileImage}
                    alt="mdo"
                    width="35"
                    height="35"
                    className="rounded-circle me-1"
                  />{" "}
                  <span className="d-none d-md-inline-block fw-medium">
                    Hi, {name}
                  </span>
                </DropdownToggle>
                <DropdownMenu
                  className="dropdown-menu-end"
                  aria-labelledby="userdropdown"
                  end
                >


                  <li>
                    <Link className="dropdown-item" to="/myprofile">
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/companydetails">
                      Profile Company
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/signout" onClick={signout}>
                      Logout
                    </Link>
                  </li>
                </DropdownMenu>
              </Dropdown>
            </ul>
          ) : null}
        </Container>
      </nav>
    </React.Fragment>
  );
};

export default withRouter(NavBar);
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

import { Link } from "react-router-dom";
import classname from "classnames";
import withRouter from "../../components/withRouter";

import darkLogo from "../../assets/images/logo-dark.png";
import lightLogo from "../../assets/images/logo-light.png";
import userImage2 from "../../assets/images/user/img-02.jpg";
import jobImage4 from "../../assets/images/featured-job/img-04.png";
import userImage1 from "../../assets/images/user/img-01.jpg";
import jobImage from "../../assets/images/featured-job/img-01.png";
import profileImage from "../../assets/images/profile.jpg";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userSerrvices from "../../services/user.serrvices";

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
  const dropDownnotification = () => setNotification((prevState) => !prevState);

  //user Profile Dropdown
  const [userProfile, setUserProfile] = useState(false);
  const dropDownuserprofile = () => setUserProfile((prevState) => !prevState);

  //scroll navbar
  const [navClass, setnavClass] = useState(false);
  const [role, setRole] = useState(null);
  const [name, setName] = useState(null);
  const [imgUser, setImgUser] = useState(null);
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

  return (
    <React.Fragment>
      <nav
        className={"navbar navbar-expand-lg fixed-top sticky p-0 " + navClass}
        style={navStyle}
        id="navigation"
      >
        <Container fluid className="custom-container">
          <Link className="navbar-brand text-dark fw-bold me-auto" to="/layout3">
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
                <Link className="nav-link" to="/layout3">
                  Home
                </Link>
              </NavItem>
              <NavItem className="dropdown dropdown-hover">
                <NavLink
                  to="/#"
                  id="jobsdropdown"
                  role="button"
                  onClick={() => setCompany(!company)}
                >
                  Company <div className="arrow-down"></div>
                </NavLink>
                <ul
                  className={classname("dropdown-menu dropdown-menu-center", {
                    show: company,
                  })}
                  aria-labelledby="jobsdropdown"
                >
                  <li>
                    <Link className="dropdown-item" to="/aboutus">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/services">
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/team">
                      Team
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/pricing">
                      Pricing
                    </Link>
                  </li>
                  <Link className="dropdown-item" to="/privacyandpolicy">
                    Priacy & Policy
                  </Link>
                  <li>
                    <Link className="dropdown-item" to="/faqs">
                      Faqs
                    </Link>
                  </li>
                </ul>
              </NavItem>

              {!(role === null) && (
                <>
                  <li className="nav-item dropdown dropdown-hover">
                    <Link
                      id="pagesdoropdown"
                      className="nav-link dropdown-toggle arrow-none"
                      onClick={() => setPages(!pages)}
                    >
                      Pages
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
                            <Col lg={4}>
                              <span className="dropdown-header">List</span>
                              <Link
                                className="dropdown-item"
                                to="/hiringrequestlistincompanypartner"
                              >
                                List Hiring Request
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="/hiringRequestListExpiredHR"
                              >
                                List Hiring Request Expired
                              </Link>
                            </Col>
                            {/* <Link className="dropdown-item" to="/joblist">
                              Job List
                            </Link>
                            <Link className="dropdown-item" to="/joblist2">
                              Job List-2
                            </Link>
                            <Link className="dropdown-item" to="/jobgrid">
                              Job Grid
                            </Link>
                            <Link className="dropdown-item" to="/jobgrid2">
                              Job Grid-2
                            </Link>
                            <Link className="dropdown-item" to="/jobdetails">
                              Job Details
                            </Link>

                            <Link className="dropdown-item" to="/jobscategories">
                              Jobs Categories
                            </Link> */}
                            {/* <Link
                          className="dropdown-item"
                          to="/createhiringrequest"
                        >
                          Create hiring request
                        </Link>
                        <Link
                          className="dropdown-item"
                          to="/createInterview"
                        >
                          Create interview
                        </Link> */}

                            <Col lg={4}>
                              {/* <Link
                                className="dropdown-item"
                                to="/developerinfo"
                              > */}
                              <span className="dropdown-header">Interview</span>

                              <Link
                                className="dropdown-item"
                                to="/listInterviewHR"
                                state={{ jobId: null }}
                              >
                                List Interview
                              </Link>

                              {/* <div>
                        <Link className="dropdown-item" to="/developerlist">
                          Developer List
                        </Link>
                        <Link className="dropdown-item" to="/developerinfo">
                          Developer Info
                        </Link>
                        <Link
                          className="dropdown-item"
                          to="/createstaffaccount"
                        >
                          Create Staff Account
                        </Link>
                        <Link
                          className="dropdown-item"
                          to="/createdeveloperaccount"
                        >
                          Create Developer Account
                        </Link>

                        <Link
                          className="dropdown-item"
                          to="/createcompanyaccount"
                        >
                          Create Company Account
                        </Link>

                        <Link className="dropdown-item" to="/candidatelist">
                          Candidate List
                        </Link>
                        <Link className="dropdown-item" to="/candidategrid">
                          Candidate Grid
                        </Link>
                        <Link className="dropdown-item" to="/candidatedetails">
                          Candidate Details
                        </Link>
                        <Link className="dropdown-item" to="/companylist">
                          Company List
                        </Link>
                        <Link className="dropdown-item" to="/companydetails">
                          Company Details
                        </Link>

                        <Link className="dropdown-item" to="/hiringrequestinhr">
                          HiringRequest Details In HR
                        </Link>

                        <Link
                          className="dropdown-item"
                          to="/developerlistincompanypartner"
                        >
                          Developer List In Company
                        </Link>
                      </div> */}
                            </Col>
                            <Col lg={4}>
                              <span className="dropdown-header">
                                Hiring Request
                              </span>

                              <Link
                                className="dropdown-item"
                                to="/createhiringrequest"
                              >
                                Create Hiring Request
                              </Link>

                              <Link
                                className="dropdown-item"
                                to="/createproject"
                              >
                                Create Project
                              </Link>

                              <Link
                                className="dropdown-item"
                                to="/projectlist"
                              >
                                Project List
                              </Link>

                              {/* <div>
                        <Link className="dropdown-item" to="/signup">
                          Sign Up
                        </Link>
                        <Link className="dropdown-item" to="/signin">
                          Sign In
                        </Link>
                        <Link className="dropdown-item" to="/signout">
                          Sign Out
                        </Link>
                        <Link className="dropdown-item" to="/resetpassword">
                          Reset Password
                        </Link>
                        <Link className="dropdown-item" to="/comingsoon">
                          Coming Soon
                        </Link>
                        <Link className="dropdown-item" to="/error404">
                          404 Error
                        </Link>
                        <Link className="dropdown-item" to="/components">
                          Components
                        </Link>
                      </div> */}
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
                              {/* <div>
                        <Link className="dropdown-item" to="/developerlist">
                          Developer List
                        </Link>
                        <Link className="dropdown-item" to="/developerinfo">
                          Developer Info
                        </Link>
                        <Link
                          className="dropdown-item"
                          to="/createstaffaccount"
                        >
                          Create Staff Account
                        </Link>
                        <Link
                          className="dropdown-item"
                          to="/createdeveloperaccount"
                        >
                          Create Developer Account
                        </Link>

                        <Link
                          className="dropdown-item"
                          to="/createcompanyaccount"
                        >
                          Create Company Account
                        </Link>

                        <Link className="dropdown-item" to="/candidatelist">
                          Candidate List
                        </Link>
                        <Link className="dropdown-item" to="/candidategrid">
                          Candidate Grid
                        </Link>
                        <Link className="dropdown-item" to="/candidatedetails">
                          Candidate Details
                        </Link>
                        <Link className="dropdown-item" to="/companylist">
                          Company List
                        </Link>
                        <Link className="dropdown-item" to="/companydetails">
                          Company Details
                        </Link>

                        <Link className="dropdown-item" to="/hiringrequestinhr">
                          HiringRequest Details In HR
                        </Link>

                        <Link
                          className="dropdown-item"
                          to="/developerlistincompanypartner"
                        >
                          Developer List In Company
                        </Link>
                      </div> */}
                            </Col>
                            <Col lg={4}>
                              <span className="dropdown-header">
                                Hiring Request
                              </span>

                              {/* <div>
                        <Link className="dropdown-item" to="/signup">
                          Sign Up
                        </Link>
                        <Link className="dropdown-item" to="/signin">
                          Sign In
                        </Link>
                        <Link className="dropdown-item" to="/signout">
                          Sign Out
                        </Link>
                        <Link className="dropdown-item" to="/resetpassword">
                          Reset Password
                        </Link>
                        <Link className="dropdown-item" to="/comingsoon">
                          Coming Soon
                        </Link>
                        <Link className="dropdown-item" to="/error404">
                          404 Error
                        </Link>
                        <Link className="dropdown-item" to="/components">
                          Components
                        </Link>
                      </div> */}
                            </Col>
                          </>
                        )}
                      </Row>
                    </div>
                  </li>
                </>
              )}

              {/* <NavItem className="dropdown dropdown-hover">
                <NavLink
                  to="/#"
                  id="productdropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  onClick={() => setBlog(!blog)}
                >
                  Blog
                  <div className="arrow-down"></div>
                </NavLink>
                <ul
                  className={classname("dropdown-menu dropdown-menu-center", {
                    show: blog,
                  })}
                  aria-labelledby="productdropdown"
                >
                  <li>
                    <Link className="dropdown-item" to="/blog">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/bloggrid">
                      Blog Grid
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/blogmodern">
                      Blog Modern
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/blogmasonary">
                      Blog Masonry
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/blogdetails">
                      Blog details
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/blogauther">
                      Blog Author
                    </Link>
                  </li>
                </ul>
              </NavItem> */}
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
                  <div className="count position-absolute">3</div>
                </DropdownToggle>
                <DropdownMenu
                  className="dropdown-menu-sm dropdown-menu-end p-0"
                  aria-labelledby="notification"
                  end
                >
                  <div className="notification-header border-bottom bg-light">
                    <h6 className="mb-1"> Notification </h6>
                    <p className="text-muted fs-13 mb-0">
                      You have 4 unread Notification
                    </p>
                  </div>
                  <div className="notification-wrapper dropdown-scroll">
                    <Link
                      to="#"
                      className="text-dark notification-item d-block active"
                    >
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0 me-3">
                          <div className="avatar-xs bg-primary text-white rounded-circle text-center">
                            <i className="uil uil-user-check"></i>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="mt-0 mb-1 fs-14">
                            22 verified registrations
                          </h6>
                          <p className="mb-0 fs-12 text-muted">
                            <i className="mdi mdi-clock-outline"></i>{" "}
                            <span>3 min ago</span>
                          </p>
                        </div>
                      </div>
                    </Link>
                    <Link
                      to="#"
                      className="text-dark notification-item d-block"
                    >
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0 me-3">
                          <img
                            src={userImage2}
                            className="rounded-circle avatar-xs"
                            alt="user-pic"
                          />
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="mt-0 mb-1 fs-14">James Lemire</h6>
                          <p className="text-muted fs-12 mb-0">
                            <i className="mdi mdi-clock-outline"></i>{" "}
                            <span>15 min ago</span>
                          </p>
                        </div>
                      </div>
                    </Link>
                    <Link
                      to="#"
                      className="text-dark notification-item d-block"
                    >
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0 me-3">
                          <img
                            src={jobImage4}
                            className="rounded-circle avatar-xs"
                            alt="user-pic"
                          />
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="mt-0 mb-1 fs-14">
                            Applications has been approved
                          </h6>
                          <p className="text-muted mb-0 fs-12">
                            <i className="mdi mdi-clock-outline"></i>{" "}
                            <span>45 min ago</span>
                          </p>
                        </div>
                      </div>
                    </Link>
                    <Link
                      to="#"
                      className="text-dark notification-item d-block"
                    >
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0 me-3">
                          <img
                            src={userImage1}
                            className="rounded-circle avatar-xs"
                            alt="user-pic"
                          />
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="mt-0 mb-1 fs-14">Kevin Stewart</h6>
                          <p className="text-muted mb-0 fs-12">
                            <i className="mdi mdi-clock-outline"></i>{" "}
                            <span>1 hour ago</span>
                          </p>
                        </div>
                      </div>
                    </Link>
                    <Link
                      to="#"
                      className="text-dark notification-item d-block"
                    >
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0 me-3">
                          <img
                            src={jobImage}
                            className="rounded-circle avatar-xs"
                            alt="user-pic"
                          />
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="mt-0 mb-1 fs-15">Creative Agency</h6>
                          <p className="text-muted mb-0 fs-12">
                            <i className="mdi mdi-clock-outline"></i>{" "}
                            <span>2 hour ago</span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="notification-footer border-top text-center">
                    <Link className="primary-link fs-13" to="#">
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
                    <Link className="dropdown-item" to="/managejobs">
                      Manage Jobs
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/bookmarkjobs">
                      Bookmarks Jobs
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/myprofile">
                      My Profile
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

import React from "react";

// import Layout1 from "../pages/Home/Layout1/Layout1";
// import Layout2 from "../pages/Home/Layout2/Layout2";
// import Layout3 from "../pages/Home/Layout3/Layout3";

//Company Section
import AboutUs from "../pages/Company/AboutUs/AboutUs";
import Services from "../pages/Company/Services/Services";
import Team from "../pages/Company/Team/Team";
import Pricing from "../pages/Company/Pricing/Pricing";
import PrivacyAndPolicy from "../pages/Company/PrivacyAndPolicy/PrivacyAndPolicy";
import Faqs from "../pages/Company/Faqs/Faqs";
import PaymenAgreement from "../pages/CandidateAndCompany/PaymentAgreement/PrivacyAndPolicy";
//Jobs Section
import HiringRequestList from "../pages/Jobs/HiringRequestList/HiringRequestList";
import CreateHiringRequest from "../pages/Jobs/CreateHiringRequest/CreateHiringRequest";
import CreateProject from "../pages/Jobs/CreateProject/CreateProject";
import JobList from "../pages/Jobs/JobList/JobList";
import JobList2 from "../pages/Jobs/JobList2/JobList2";
import JobGrid from "../pages/Jobs/JobGrid/JobGrid";
import JobGrid2 from "../pages/Jobs/JobGrid2/JobGrid2";
import JobDetails from "../pages/Jobs/JobDetails/JobDetails";
import JobsCategories from "../pages/Jobs/JobsCategories/JobsCategories";
import ProjectList from "../pages/Jobs/ProjectList/ProjectList";
import ProjectListNew from "../pages/Jobs/ProjectListNew/ProjectList";
//Candidate and Company Section

import CreateStaffAccount from "../pages/CandidateAndCompany/CreateStaffAccount/CreateStaffAcount";
import CreateDeveloperAccount from "../pages/CandidateAndCompany/CreateDeveloperAccount/CreateDeveloperAcount";
import CandidateList from "../pages/CandidateAndCompany/CandidateList/CandidateList";
import CandidateGrid from "../pages/CandidateAndCompany/CandidateGrid/CandidateGrid";
import CandidateDetails from "../pages/CandidateAndCompany/CandidateDetails/CandidateDetails";
import CompanyList from "../pages/CandidateAndCompany/CompanyList/CompanyList";
import CompanyDetails from "../pages/CandidateAndCompany/CompanyDetails/CompanyDetails";

//Blog Section
import Blog from "../pages/Blog/Blog/Blog";
import BlogGrid from "../pages/Blog/BlogGrid/BlogGrid";
import BlogModern from "../pages/Blog/BlogModern/BlogModern";
import BlogMasonary from "../pages/Blog/BlogMasonary/BlogMasonary";
import BlogDetails from "../pages/Blog/BlogDetails/BlogDetails";
import BlogAuther from "../pages/Blog/BlogAuther/BlogAuther";
import ContractListHR from "../pages/Jobs/ContractList/ContractList";
//Contacts
import Contact from "../pages/Contact/Contact";
import TransactionList from "../pages/Jobs/TransactionList/TransactionList";
//AuthPages
import SignIn from "../pages/ExtraPages/SignIn";
import SignUp from "../pages/ExtraPages/SignUp";
import SignOut from "../pages/ExtraPages/SignOut";
import Callback from "../pages/ExtraPages/Callback";
import SignCompany from "../pages/ExtraPages/SignCompany";
import ResetPassword from "../pages/ExtraPages/ResetPassword";
import ComingSoon from "../pages/ExtraPages/ComingSoon";
import Error404 from "../pages/ExtraPages/Error404";
import Components from "../pages/ExtraPages/Components/Components";
import Manager from "../pages/Admin/Manager";
//profile section(User Profile)
import BookMarkJobPost from "../pages/Profile/BookMarkJobPost/BookMarkJobPost";
import ManageJobs from "../pages/Profile/ManageJobs/ManageJobs";
import BookMarkJobs from "../pages/Profile/BookMarkJobs/BookMarkJobs";
import MyProfile from "../pages/Profile/MyProfile/MyProfile";
import HiringRequestDetails from "../pages/Jobs/HiringRequestDetail/HiringRequestDetails";
import DeveloperList from "../pages/CandidateAndCompany/DeveloperList/DeveloperList";
//import DeveloperDetails from "../pages/CandidateAndCompany/DeveloperList/DeveloperDetails";
import DeveloperInfo from "../pages/CandidateAndCompany/DeveloperInfo/DeveloperInfo";
// import DeveloperListInCompanyPartner from "../pages/CandidateAndCompany/DeveloperListInCompanyPartner/DeveloperListInCompanyPartner";
// import DeveloperListInCompanyPartnerDetail from "../pages/CandidateAndCompany/DeveloperListInCompanyPartner/DeveloperListInCompanyPartnerDetail";
import CreateCompanyAccount from "../pages/CandidateAndCompany/CreateCompanyAccount/CreateCompanyAcount";
import HiringRequestListInCompanyPartner from "../pages/Jobs/HiringRequestListInCompanyPartner/HiringRequestListInCompanyPartner";
import HiringRequestListInCompanyPartnerDetail from "../pages/Jobs/HiringRequestInCompanyPartnerDetail/HiringRequestListInCompanyPartnerDetail";
import HiringRequestInHR from "../pages/CandidateAndCompany/HiringRequestDetailInHR/HiringRequestInHR";
import HiringRequestDetailInHR from "../pages/CandidateAndCompany/HiringRequestDetailInHR/HiringRequestDetailInHR";
import CreateInterview from "../pages/Jobs/CreateInterview/CreateInterview";
// import AssignTaskList from "../pages/CandidateAndCompany/AssignTask/AssignTaskList";
import AssignTaskDetail from "../pages/CandidateAndCompany/AssignTaskDetail/AssignTaskDetail";
import AssignTaskCreate from "../pages/CandidateAndCompany/CreateAssignTask/AssignTaskCreate";
// import AssignTaskCreateForStaff from "../pages/CandidateAndCompany/CreateAssignTaskForStaff/AssignTaskCreateForStaff";
import AssignTaskForStaffDetail from "../pages/CandidateAndCompany/AssignTaskForStaffDetail/AssignTaskForStaffDetail";
import AssignTaskList from "../pages/CandidateAndCompany/AssignTaskListForManager/AssignTaskList";
import AssignTaskListFS from "../pages/CandidateAndCompany/AssignTaskListForStaff/AssignTaskListFS";
import ProjectDetailHR from "../pages/Jobs/ProjectDetail/ProjectDetail";

import DetailInterview from "../pages/Jobs/DetailInterview/DetailInterview";
import DetailInterviewManager from "../pages/Jobs/DetailInterviewManager/DetailInterview";
import InterviewList from "../pages/Jobs/ListInterviewHR/JobGrid";
import InterviewListManager from "../pages/Jobs/ListInterviewManager/JobGrid";
import HiringRequestListExpiredHR from "../pages/Jobs/HiringRequestListExpiredHR/HiringRequestListExpiredHR";
import Developer from "../pages/Jobs/Developer/Developer";
//import NewListInterview from "../pages/NewAdmin/NewListInterview";
import NewHiringRequestDetail from "../pages/Admin/NewHiringRequestDetail";
import ProjectDetail from "../pages/Admin/ProjectDetail";

//Dashboard
import Dashboard from "../pages/Admin/Dashboard/Dashboard";

import CreateReport from "../pages/Jobs/CreateReport/CreateReport";
import ReportListHR from "../pages/Jobs/ReportList/ReportList";
import ContractDetailHr from "../pages/Jobs/ContractDetail/ContractDetail";
//
import ManageLevel from "../pages/Admin/Info/ManageLevel";
import ManageSkill from "../pages/Admin/Info/ManageSkill";
import ManageType from "../pages/Admin/Info/ManageType";
import NotificationList from "../pages/Jobs/NotificationList/NotificationList";
//Admin Management
import ListAccountHR from "../pages/Admin/ListAccountHR";
import ListAccountManager from "../pages/Admin/ListAccountManager";
import ListAccountStaff from "../pages/Admin/ListAccountStaff";
import ListAccountDeveloper from "../pages/Admin/ListAccountDeveloper";
import CompanyListPartner from "../pages/Admin/CompanyListPartner";
import ContractDetail from "../pages/Admin/ContractDetail";
import NewListInterviewInfo from "../pages/Admin/NewListInterviewInfo";
import ProjectListInManager from "../pages/Admin/ProjectListInManager";
import ContractList from "../pages/Admin/ContractList";
import CallbackPayment from "../pages/ExtraPages/CallbackPayment";
import CompanyDetailPartner from "../pages/Admin/CompanyDetailPartner";
import ReportList from "../pages/Admin/ReportList";
import ReportListDetail from "../pages/Admin/ReportListDetail";
import TransactionHistoryList from "../pages/Admin/TransactionHistoryList";
import UpdateProfileManager from "../pages/Admin/NavBar/UpdateProfileManager";
import UpdateProfileAdmin from "../pages/Admin/NavBar/UpdateProfileAdmin";
import UpdateProfileStaff from "../pages/Admin/NavBar/UpdateProfileStaff";
//Home Section
const Layout1 = React.lazy(() => import("../pages/Home/Layout1/Layout1"));
const Layout2 = React.lazy(() => import("../pages/Home/Layout2/Layout2"));
const Layout3 = React.lazy(() => import("../pages/Home/Layout3/Layout3"));

const userRoutes = [
  //profile Section(User Profile)
  { path: "/bookmarkjobpost", component: <BookMarkJobPost /> },
  { path: "/myprofile", component: <MyProfile /> },
  { path: "/bookmarkjobs", component: <BookMarkJobs /> },
  { path: "/managejobs", component: <ManageJobs /> },

  //Components Section(Extra Pages)
  { path: "/components", component: <Components /> },

  //Contact
  { path: "/contact", component: <Contact /> },

  // Blog Section
  { path: "/blogauther", component: <BlogAuther /> },
  { path: "/blogdetails", component: <BlogDetails /> },
  { path: "/blogmodern", component: <BlogModern /> },
  { path: "/blogmasonary", component: <BlogMasonary /> },
  { path: "/bloggrid", component: <BlogGrid /> },
  { path: "/blog", component: <Blog /> },

  //Candidate and Company Section
  { path: "/companydetails", component: <CompanyDetails /> },
  { path: "/developerlist", component: <DeveloperList /> },
  { path: "/developerinfo", component: <DeveloperInfo /> },
  { path: "/companylist", component: <CompanyList /> },
  { path: "/candidatedetails", component: <CandidateDetails /> },
  { path: "/candidategrid", component: <CandidateGrid /> },
  { path: "/candidatelist", component: <CandidateList /> },
  { path: "/hiringrequestinhr", component: <HiringRequestInHR /> },
  { path: "/hiringrequestdetailinhr", component: <HiringRequestDetailInHR /> },
  { path: "/assigntaskcreate", component: <AssignTaskCreate /> },
  { path: "/assigntaskdetail", component: <AssignTaskDetail /> },
  {
    path: "/assigntaskforstaffdetail",
    component: <AssignTaskForStaffDetail />,
  },
  { path: "/assigntasklistformanager", component: <AssignTaskList /> },
  { path: "/assigntasklistforstaff", component: <AssignTaskListFS /> },
  { path: "/listInterview", component: <InterviewListManager /> },
  { path: "/listInterviewHR", component: <InterviewList /> },

  { path: "/jobscategories", component: <JobsCategories /> },
  { path: "/jobdetails", component: <JobDetails /> },
  { path: "/jobgrid2", component: <JobGrid2 /> },
  { path: "/jobgrid", component: <JobGrid /> },
  { path: "/joblist2", component: <JobList2 /> },
  { path: "/joblist", component: <JobList /> },
  { path: "/hiringrequestlist", component: <HiringRequestList /> },
  { path: "/hiringrequestdetails", component: <HiringRequestDetails /> },
  {
    path: "/hiringrequestlistincompanypartner",
    component: <HiringRequestListInCompanyPartner />,
  },
  {
    path: "/notificationList",
    component: <NotificationList />,
  },
  {
    path: "/projectlist",
    component: <ProjectListNew />,
  },
  {
    path: "/transactionlist",
    component: <TransactionList />,
  },
  {
    path: "/projectdetailhr",
    component: <ProjectDetailHR />,
  },
  {
    path: "/hiringRequestListExpiredHR",
    component: <HiringRequestListExpiredHR />,
  },
  {
    path: "/hiringrequestlistincompanypartnerdetail",
    component: <HiringRequestListInCompanyPartnerDetail />,
  },
  {
    path: "/createInterview",
    component: <CreateInterview />,
  },
  {
    path: "/createReport",
    component: <CreateReport />,
  },
  {
    path: "/reportList",
    component: <ReportListHR />,
  },
  {
    path: "/contractListHr",
    component: <ContractListHR />,
  },
  {
    path: "/detailInterview",
    component: <DetailInterview />,
  },
  {
    path: "/detailInterviewManager",
    component: <DetailInterviewManager />,
  },
  {
    path: "/contractDetailHr",
    component: <ContractDetailHr />,
  },

  { path: "/createhiringrequest", component: <CreateHiringRequest /> },
  { path: "/createproject", component: <CreateProject /> },
  { path: "/developer", component: <Developer /> },
  //{ path: "/listinterviewnew", component: <NewListInterview /> },

  //Company Section
  { path: "/createstaffaccount", component: <CreateStaffAccount /> },
  { path: "/createdeveloperaccount", component: <CreateDeveloperAccount /> },
  { path: "/createcompanyaccount", component: <CreateCompanyAccount /> },
  { path: "/faqs", component: <Faqs /> },
  { path: "/privacyandpolicy", component: <PrivacyAndPolicy /> },
  { path: "/laborSubleasingAgreement", component: <PaymenAgreement /> },
  { path: "/pricing", component: <Pricing /> },
  { path: "/team", component: <Team /> },
  { path: "/services", component: <Services /> },
  { path: "/aboutus", component: <AboutUs /> },

  //Home Section
  { path: "/home", component: <Layout3 /> },
  { path: "/layout2", component: <Layout1 /> },
  { path: "/", component: <Layout3 /> },
];

const authRoutes = [
  { path: "/error404", component: <Error404 /> },
  { path: "/comingsoon", component: <ComingSoon /> },
  { path: "/resetpassword", component: <ResetPassword /> },
  { path: "/signout", component: <SignOut /> },
  { path: "/callback", component: <Callback /> },
  { path: "/callbackpayment", component: <CallbackPayment /> },
  { path: "/signup", component: <SignUp /> },
  { path: "/signin", component: <SignIn /> },
  { path: "/signcompany", component: <SignCompany /> },
  { path: "/manager", component: <Manager /> },
  { path: "/newhiringrequestdetail", component: <NewHiringRequestDetail /> },
  { path: "/projectdetail", component: <ProjectDetail /> },
  { path: "/listAccountHR", component: <ListAccountHR /> },
  { path: "/listAccountManager", component: <ListAccountManager /> },
  { path: "/listAccountStaff", component: <ListAccountStaff /> },
  { path: "/listAccountDeveloper", component: <ListAccountDeveloper /> },
  { path: "/listcompanyPartner", component: <CompanyListPartner /> },
  { path: "/contractdetail", component: <ContractDetail /> },
  { path: "/newlistinterview", component: <NewListInterviewInfo /> },
  { path: "/projectlistinmanager", component: <ProjectListInManager /> },
  { path: "/listcontract", component: <ContractList /> },
  { path: "/listcompanyPartnerdetail", component: <CompanyDetailPartner /> },
  { path: "/listreportinmanager", component: <ReportList /> },
  { path: "/listreportinmanagerdetail", component: <ReportListDetail /> },
  { path: "/listtransactionhistory", component: <TransactionHistoryList /> },
  { path: "/manageLevel", component: <ManageLevel /> },
  { path: "/manageSkill", component: <ManageSkill /> },
  { path: "/manageType", component: <ManageType /> },
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/profilemanager", component: <UpdateProfileManager /> },
  { path: "/profileadmin", component: <UpdateProfileAdmin /> },
  { path: "/profilestaff", component: <UpdateProfileStaff /> },


];

export { userRoutes, authRoutes };

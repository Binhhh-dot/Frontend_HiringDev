const SERVICE_URL = "https://wehireapi.azurewebsites.net/api";

export default {
  base: SERVICE_URL,
  endpoint: {
    auth: {
      login: "/Account/Login",
      siginUp: "/Account/SignUp",
    },
    skill: {
      getAll: "/Skill",
    },
    level: {
      getAll: "/Level",
    },
    scheduleType: {
      getAll: "/ScheduleType",
    },
    employmentType: {
      getAll: "/EmploymentType",
    },
    type: {
      getAll: "/Type",
      searchName: "",
    },
    projectType: {
      getAll: "/ProjectType?Status=${status}",
    },
    hiringRequest: {
      getAll: "/HiringRequest",
      createHiringRequest: "/HiringRequest",
      paging: "PageIndex=${currentPage}&PageSize=${pageSize}",
      searchJobTitle: "&JobTitle=${search}",
      searchLevel: "&LevelRequireId=${LevelRequireId}",
      searchType: "&TypeRequireId=${TypeRequireId}",
      searchStatusHiringRequest: "&Status=${Status}",
      searchSalary: "&LevelRequireId=${LevelRequireId}",
      searchDuration:
        "&StartSalaryPerDev=${StartSalaryPerDev}&EndSalaryPerDev=${EndSalaryPerDev}",
      getAllStatus: "/HiringRequest/Status",

      //-----------------------------------------------------------------------
      getHiringRequestDetailInManager: "/HiringRequest/${hiringRequestId}",
      getHiringRequestDetailInCompany: "/HiringRequest/${hiringRequestId}",
      //-----------------------------------------------------------------------
      getDeveloperMatchingInManager: "/Developer/DevMatching/${devMatching}",
      sendHiringRequestToDevMatching: "/SelectingDev",
      getDevMatchingHasBeenSent:
        "/SelectingDev/SelectedDevByManager/${requestId}",
      getDeveloperDetailInManager: "/Developer/${devId}",
      getAllHiringRequestById:
        "/HiringRequest/ByCompany?companyId=${companyId}",
      approvedHirringRequestStatus: "/HiringRequestStatus/ChangeWaitingStatus",
      cancelHirringRequestStatus: "/HiringRequestStatus/ChangeWaitingStatus",
      cancelHirringRequestStatusAfter: "/HiringRequestStatus/Cancel",
      getHiringRequestByRequestId: "/HiringRequest?requestId=${requestId}",
    },

    selectingDeveloper: {
      getAllSelectedDevByHR: "/SelectingDev/SelectedDevByHR/${hiringRequestId}",
      approvalByHR: "/SelectingDev/ApprovalByHR",
      onboarnding: "/SelectingDev/Onboarding",
      rejectSelectedDev:
        "/SelectingDev/RejectDev?requestId=${requestId}&developerId=${developerId}",
      accpectDevToInterview: "/SelectingDev/DevToInterviewing",
      // GetAllSelectedDevByHR: "/SelectingDev/SelectedDevByHR/${hiringRequestId}",
      getSelectedDevByManager:
        "/SelectingDev/SelectedDevByManager/${requestId}",
      sendDevToHR: "/SelectingDev/SendDevToHR",
      removeOutOfWaitingInterview:
        "/SelectingDev/RemoveOutOfWaitingInterview?requestId=${requestId}&developerId=${developerId}",
      sendDevToHRNew: "/SelectingDev/SendDevToHR",
    },
    company: {
      createCompany: "/CompanyPartner",
      getCompanyByCompanyId: "/CompanyPartner/${companyId}",
      updateCompany: "/CompanyPartner?companyId=${companyId}",
    },
    country: {
      getAll:
        "https://restcountries.com/v3.1/all?fields=name&fbclid=IwAR2NFDKzrPsdQyN2Wfc6KNsyrDkMBakGFkvYe-urrPH33yawZDSIbIoxjX4",
    },
    developer: {
      getListDevWaitingInterview:
        "/Developer/DevWaitingInterview/${requestId}?PageIndex=${PageIndex}&PageSize=${PageSize}",
      createDeveloper: "/Developer",
      getDeveloperUnofficial: "/Developer/Unofficial",
      getDeveloperUnofficialPaging:
        "PageIndex=${currentPage}&PageSize=${pageSize}",

      changeStatusDevUnofficialInTaskDetailForStaff:
        "/AssignTask/ChangeStatusDevTask",
    },
    interview: {
      createAnInterview: "/Interview",
      getListInterviewByRequestId: "/Interview/Request/${requestId}",
      getAllInterviewByHRAndPaging:
        "/Interview/ByHR?companyId=${companyId}&PageIndex=${PageIndex}&PageSize=${PageSize}",
      getDetailInterviewByInterviewId:
        "/Interview/${InterviewId}?PageIndex=${PageIndex}&PageSize=${PageSize}",
      getAllInterviewByHRAndRequestIdAndPaging:
        "/Interview/ByHR?companyId=${companyId}&requestId=${requestId}&PageIndex=${PageIndex}&PageSize=${PageSize}",
      getAllInterviewByManagerAndPaging:
        "/Interview/ByManager?PageIndex=${PageIndex}&PageSize=${PageSize}",
      approvalByManager: "/Interview/ApprovalByManager",
    },
    assignTask: {
      createAssignTask: "/AssignTask",
      getAssignTaskDetail: "/AssignTask/${taskId}",

      getAllAssignTaskForManager: "/AssignTask",
      getPagingAssignTaskForManager:
        "PageIndex=${PageIndex}&PageSize=${PageSize}",

      getAllAssignTaskForStaff: "/AssignTask",
      getPagingAssignTaskForStaffWithId:
        "/Staff/${staffId}?PageIndex=${PageIndex}&PageSize=${PageSize}",

      handleCompleteTask: "/AssignTask/Finished?taskId=${taskId}",

      handleApproveAssignTask: "/AssignTask/Approval",
    },

    user: {
      getUserById: "/User/${userId}",
      updateUser: "/User/${userId}",
      getStaff: "/User/Staff",
      getStaffPaging: "PageIndex=${PageIndex}&PageSize=${PageSize}",
    },
    project: {
      getProjectList: "/Project",
      getProjectListPaging: "PageIndex=${PageIndex}&PageSize=${PageSize}",

      createProject: "/Project",
      getAllProjectByCompanyId: "/Project/ByCompany/${companyId}",
      getProjectDetailByProjectId: "/Project/${projectId}",
    },
  },
};

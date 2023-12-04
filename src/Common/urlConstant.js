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
      postSkill: "/Skill",
      editSkill: "/Skill",
      deleteSkill: "/Skill/${skillId}"
    },
    level: {
      getAll: "/Level",
      postLevel: "/Level",
      editLevel: "/Level",
      deleteLevel: "/Level/${levelId}"
    },
    scheduleType: {
      getAll: "/ScheduleType",
    },
    employmentType: {
      getAll: "/EmploymentType",
    },
    type: {
      getAll: "/Type",
      postType: "/Type",
      editType: "/Type",
      deleteType: "/Type/${typeId}",

      searchName: "",
    },

    projectType: {
      getAll: "/ProjectType?Status=${status}",
      getAllProjectType: "/ProjectType",
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
      // getDeveloperMatchingInManager: "/Developer/DevMatching/${devMatching}",
      sendHiringRequestToDevMatching: "/SelectingDev",
      getDevMatchingHasBeenSent:
        "/SelectingDev/SelectedDevByManager/${requestId}",
      getDeveloperDetailInManager: "/Developer/${devId}",
      getAllHiringRequestById:
        "/HiringRequest/ByCompany?companyId=${companyId}",
      approvedHirringRequestStatus: "/HiringRequestStatus/ChangeWaitingStatus",
      cancelHirringRequestStatus: "/HiringRequestStatus/ChangeWaitingStatus",
      cancelHirringRequestStatusAfter: "/HiringRequestStatus/Closed",
      getHiringRequestByRequestId: "/HiringRequest?requestId=${requestId}",
      getAllHiringRequestByProjectId:
        "/HiringRequest/ByProject?projectId=${projectId}",
      updateHiringRequest: "/HiringRequest?requestId=${requestId}",
    },

    selectingDeveloper: {
      getAllSelectedDevByHR: "/SelectingDev/SelectedDevByHR/${hiringRequestId}",
      approvalByHR: "/SelectingDev/ApprovalByHR",
      onboarnding: "/SelectingDev/Onboarding",
      rejectSelectedDev:
        "/SelectingDev/RejectDev?requestId=${requestId}&developerId=${developerId}",
      accpectDevToInterview: "/SelectingDev/DevToInterviewing",
      // GetAllSelectedDevByHR: "/SelectingDev/SelectedDevByHR/${hiringRequestId}",
      // getSelectedDevByManager:
      //   "/SelectingDev/SelectedDevByManager/${requestId}",
      sendDevToHR: "/SelectingDev/SendDevToHR",
      removeOutOfWaitingInterview:
        "/SelectingDev/RemoveOutOfWaitingInterview?requestId=${requestId}&developerId=${developerId}",
      // sendDevToHRNew: "/SelectingDev/SendDevToHR",
      onboardDeveloper:
        "/SelectingDev/Onboarding?requestId=${requestId}&developerId=${developerId}",
    },
    company: {
      createCompany: "/CompanyPartner",
      getCompanyByCompanyId: "/CompanyPartner/${companyId}",
      updateCompany: "/CompanyPartner?companyId=${companyId}",
      getCompany: "/CompanyPartner",
      getCompanyAndPaging: "PageIndex=${PageIndex}&PageSize=${PageSize}",
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
      getListDeveloperOnboardByProjectId: "/Developer/ByProject/${projectId}",
      updateDeveloperByAdmin: "/Developer/ByAdmin/${developerId}",
      deleteDeveloper: "",
      getDeveloperMatchingInManager: "/Developer/DevMatching/${requestId}",
      getDeveloperByDevId: "/Developer/${devId}",
    },
    interview: {
      createAnInterview: "/Interview",
      getListInterviewByRequestId: "/Interview/Request/${requestId}",
      getAllInterviewByHRAndPaging:
        "/Interview/ByHR?companyId=${companyId}&requestId=${requestId}&PageIndex=${PageIndex}&PageSize=${PageSize}",
      getDetailInterviewByInterviewId: "/Interview/${InterviewId}",
      getAllInterviewByHRAndRequestIdAndPaging:
        "/Interview/ByHR?companyId=${companyId}&requestId=${requestId}&PageIndex=${PageIndex}&PageSize=${PageSize}",
      getAllInterviewByManagerAndPaging:
        "/Interview/ByManager?PageIndex=${PageIndex}&PageSize=${PageSize}",
      approvalByManager: "/Interview/ApprovalByManager",
      completeInterview: "/Interview/Finish?interviewId=${interviewId}",
      updateInterview: "/Interview/${interviewId}",
      cancelInterview: "/Interview/Cancel/${interviewId}",
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

      getListDeveloper: "/Developer",
      getListManager: "/User?roleId=3",
      getListStaff: "/User?roleId=4",
      getListHR: "/User?roleId=6",
      getStaffById: "/User/${id}",
      getHRById: "/User/${id}",
      updateHR: "/User/ByAdmin/${id}",
      deleteHR: "/User/ChangeStatus/${userId}",
      createHR: "/User",
      getDeveloperById: "/Developer/${devId}",
      getManagerById: "/User/${id}",
      updateManager: "/User/ByAdmin/${id}",
      createManager: "/User",
      deleteManager: "/User/ChangeStatus/${userId}",
      getStaffById: "/User/${id}",
      createStaff: "/User",
      updateStaff: "/User/ByAdmin/${id}",
      deleteStaff: "/User/ChangeStatus/${userId}",
    },
    project: {
      getProjectList: "/Project",
      getProjectListPaging: "PageIndex=${PageIndex}&PageSize=${PageSize}",

      createProject: "/Project",
      getAllProjectByCompanyId: "/Project/ByCompany/${companyId}",
      getProjectDetailByProjectId: "/Project/${projectId}",
      getDeveloperByProject:
        "/Developer/ByProject/${projectId}?status=${status}",
      updateProject: "/Project/${projectId}",
      getAllProjectByCompanyIdAndPaging:
        "/Project/ByCompany/${companyId}?PageIndex={PageIndex}&PageSize={PageSize}",
    },
    contract: {
      getContract: "/Contract",
      getContractAndPaging: "PageIndex=${PageIndex}&PageSize=${PageSize}",
      getPreContract:
        "/Contract/PreContract?developerId=${developerId}&requestId=${requestId}",
      postContract: "/Contract",
      getContractById: "/Contract/${contractId}",
      confirmContract: "/Contract/ConfirmSigned?contractId=${contractId}",
    },
    pay: {
      getPayPeriod: "/PayPeriod/${projectId}?inputDate=${inputDate}",
      getPaySlip: "/PaySlip/ByPayPeriod/${payPeriodId}",
      getPaySlipPaging: "PageIndex=${PageIndex}&PageSize=${PageSize}",
      getWorklog: "/WorkLog/ByPaySlip/${paySlipId}",
    },
    jobPosition: {
      createJobPosition: "/JobPosition",
      getJobPositionByProjectId: "/JobPosition/ByProject/${projectId}",
      getJobPositionsWithHiringRequest:
        "/JobPosition/JobPositionsWithHiringRequest/${projectId}",
      deleteJobPosition: "/JobPosition/${jobPosition}",
    },
    teamMeeting: {
      createTeamMeeting: "/TeamMeeting",
      deleteTeamMeeting: "/TeamMeeting",
      updateTeamMeeting: "/TeamMeeting",
    },

    payPeriod: {
      exportToExcel:
        "/PayPeriod/ExportToExcel/${projectId}?inputDate=${inputDate}",
      importExcel: "/PayPeriod/ImportExcel/${projectId}",
      getPayPeriodDetailByProjectIdAndDate:
        "/PayPeriod/${projectId}?inputDate=${inputDate}",
    },
    paySlip: {
      getPaySlipByPayPeriodId: "PaySlip/ByPayPeriod/${payPeriodId}",
    },
    workLog: {
      getWorkLogByPaySlipId: "/WorkLog/ByPaySlip/${paySlipId}",
      updateWorkLog: "/WorkLog",
    },

    gender: {
      getAllGender: "/Gender",
    },
    payment: {
      createPayment: "/Payment/Create",
      executePayment:
        "/Payment/Execute?paymentId=${paymentId}&payerId=${payerId}",
    },
    hiredDev: {
      getSelectedDevByManager:
        "/HiredDeveloper/DevelopersInRequest/${requestId}",
      sendDevToHRNew: "/HiredDeveloper/SendDevToHR",
      kickDevInProject:
        "/HiredDeveloper/TerminateFromProject?projectId=${projectId}&developerId=${developerId}",
    },

    report: {
      getReportList: "/Report?PageIndex=${PageIndex}&PageSize=${PageSize}",
      getReportById: "/Report/${reportId}",
      handleRelyReport: "/Report/Reply",
      handleConfirmReport: "/Report/Confirm/${reportId}",
    },
    transactionHistory: {
      getTransactionHistory:
        "/Transaction?PageIndex=${PageIndex}&PageSize=${PageSize}",
    },
  },
};

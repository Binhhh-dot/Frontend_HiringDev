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
      getHiringRequestDetailInManager: "/HiringRequest/${hiringRequestId}",
      getHiringRequestDetailInCompany: "/HiringRequest/${hiringRequestId}",
      getDeveloperMatchingInManager: "/Developer/DevMatching/${devMatching}",
      sendHiringRequestToDevMatching: "/SelectingDev",
      getDevMatchingHasBeenSent:
        "/SelectingDev/SelectedDevByManager/${requestId}",
      getDeveloperDetailInManager: "/Developer/${devId}",
      getAllHiringRequestById:
        "/HiringRequest/ByCompany?companyId=${companyId}",
      approvedHirringRequestStatus: "/HiringRequestStatus/ChangeWaitingStatus",
      getHiringRequestByRequestId: "/HiringRequest?requestId=${requestId}",
    },

    selectingDeveloper: {
      getAllSelectedDevByHR: "/SelectingDev/SelectedDevByHR/${hiringRequestId}",
      approvalByHR: "/SelectingDev/ApprovalByHR",
      onboarnding: "/SelectingDev/Onboarding",
      rejectSelectedDev:
        "/SelectingDev/RejectDev?requestId=${requestId}&developerId=${developerId}",
      accpectDevToInterview:
        "/SelectingDev/DevToInterviewing?requestId=${requestId}",
      // GetAllSelectedDevByHR: "/SelectingDev/SelectedDevByHR/${hiringRequestId}",
      getSelectedDevByManager:
        "/SelectingDev/SelectedDevByManager/${requestId}",
      sendDevToHR: "/SelectingDev/SendDevToHR",
    },
    company: {
      createCompany: "/CompanyPartner",
      getCompanyByCompanyId: "/CompanyPartner/${companyId}",
    },
    country: {
      getAll:
        "https://restcountries.com/v3.1/all?fields=name&fbclid=IwAR2NFDKzrPsdQyN2Wfc6KNsyrDkMBakGFkvYe-urrPH33yawZDSIbIoxjX4",
    },
    developer: {
      getListDevWaitingInterview: "/Developer/DevWaitingInterview/${requestId}",
      createDeveloper: "/Developer",
    },
    interview: {
      createAnInterview: "/Interview",
      getListInterviewByRequestId: "/Interview/${requestId}",
    },
  },
};

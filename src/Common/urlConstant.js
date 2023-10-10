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
    type: {
      getAll: "/Type",
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
      getHiringRequestDetailInManager: "HiringRequest/${hiringRequestId}",
    },
    company: {
      createCompany: "/CompanyPartner",
    },
    country: {
      getAll:
        "https://restcountries.com/v3.1/all?fields=name&fbclid=IwAR2NFDKzrPsdQyN2Wfc6KNsyrDkMBakGFkvYe-urrPH33yawZDSIbIoxjX4",
    },
  },
};

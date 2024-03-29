import urlConstant from "../Common/urlConstant";
import axiosLocalHost from "../utils/customAxios";

const createHiringRequest = async (
  companyId,
  projectId,
  jobTitle,
  jobDescription,
  numberOfDev,
  salaryPerDev,
  duration,
  typeRequireId,
  levelRequireId,
  skillIds,
  isSaved,
  employmentTypeId
) => {
  const serviceUrl = urlConstant.endpoint.hiringRequest.createHiringRequest;
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "POST",
    {
      companyId,
      projectId,
      jobTitle,
      jobDescription,
      numberOfDev,
      salaryPerDev,
      duration,
      typeRequireId,
      levelRequireId,
      skillIds,
      isSaved,
      employmentTypeId,
    }
  );
  return response;
};

const updateHiringRequest = async (
  requestId,
  jobTitle,
  jobDescription,
  numberOfDev,
  salaryPerDev,
  duration,
  typeRequireId,
  levelRequireId,
  skillIds,
  isSaved,
  employmentTypeId
) => {
  const serviceUrl =
    urlConstant.endpoint.hiringRequest.updateHiringRequest.replace(
      "${requestId}",
      requestId
    );
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "PUT",
    {
      requestId,
      jobTitle,
      jobDescription,
      numberOfDev,
      salaryPerDev,
      duration,
      typeRequireId,
      levelRequireId,
      skillIds,
      isSaved,
      employmentTypeId,
    }
  );
  return response;
};

const getAllHiringRequest = async () => {
  const serviceUrl = urlConstant.endpoint.hiringRequest.getAll;
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET"
  );
  return response;
};

const getAllStatusHiringRequest = async () => {
  const serviceUrl = urlConstant.endpoint.hiringRequest.getAllStatus;
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET"
  );
  console.log(serviceUrl);
  return response;
};

const getHiringRequestAndPaging = async (currentPage, pageSize) => {
  const serviceUrl = urlConstant.endpoint.hiringRequest.getAll + "?";
  const pagingUrl = urlConstant.endpoint.hiringRequest.paging
    .replace("${currentPage}", currentPage)
    .replace("${pageSize}", pageSize);
  const fullUrl = serviceUrl + pagingUrl;
  const response = await axiosLocalHost.sendAuthorizedRequest(fullUrl, "GET");
  return response;
};

const getAllHiringRequestByJobTitleAndSkill = async (
  currentPage,
  pageSize,
  jobTitle,
  skill,
  level
) => {
  const serviceUrl = urlConstant.endpoint.hiringRequest.getAll + "?";
  const pagingUrl = urlConstant.endpoint.hiringRequest.paging
    .replace("${currentPage}", currentPage)
    .replace("${pageSize}", pageSize);
  let fullUrl = serviceUrl + pagingUrl;

  if (jobTitle) {
    const searchUrl = urlConstant.endpoint.hiringRequest.searchJobTitle.replace(
      "${search}",
      jobTitle
    );
    fullUrl += searchUrl;
  }
  if (level) {
    const levelUrl = urlConstant.endpoint.hiringRequest.searchLevel.replace(
      "${LevelRequireId}",
      level
    );
    fullUrl += levelUrl;
  }

  if (skill && skill.length > 0) {
    const skillUrls = skill.map((item) => "&SkillIds=" + item.value);
    const fullUrls = skillUrls.join("&");
    fullUrl += fullUrls;
  }
  const response = await axiosLocalHost.sendAuthorizedRequest(fullUrl, "GET");
  console.log(fullUrl);
  return response;
};

//-------------------------------------------------------------------------------------
const getHiringRequestDetailInManager = async (hiringRequestId) => {
  const serviceUrl =
    urlConstant.endpoint.hiringRequest.getHiringRequestDetailInManager.replace(
      "${hiringRequestId}",
      hiringRequestId
    );

  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET"
  );

  return response;
};
//----------------------------------------------------------------------------------------
const getHiringRequestDetailInCompany = async (hiringRequestId) => {
  const serviceUrl =
    urlConstant.endpoint.hiringRequest.getHiringRequestDetailInManager.replace(
      "${hiringRequestId}",
      hiringRequestId
    );

  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET"
  );
  return response;
};
//-----------------------------------------------------------------------------------------
const getHiringRequestSaved = async (companyId) => {
  const serviceUrl =
    urlConstant.endpoint.hiringRequest.getAllHiringRequestById.replace(
      "${companyId}",
      companyId
    );
  const statusUrls =
    urlConstant.endpoint.hiringRequest.searchStatusHiringRequest.replace(
      "${Status}",
      0
    );
  const fullUrl = serviceUrl + statusUrls;
  const response = await axiosLocalHost.sendAuthorizedRequest(fullUrl, "GET");
  return response;
};

// const getDeveloperMatchingInManager = async (devMatchingId) => {
//   const serviceUrl =
//     urlConstant.endpoint.hiringRequest.getDeveloperMatchingInManager.replace(
//       "${devMatching}",
//       devMatchingId
//     );

//   const response = await axiosLocalHost.get(serviceUrl);
//   return response;
// };

const sendHiringRequestToDevMatching = async (requestId, developerIds) => {
  const serviceUrl =
    urlConstant.endpoint.hiringRequest.sendHiringRequestToDevMatching;
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "POST",
    {
      requestId,
      developerIds,
    }
  );
  return response;
};

const getDevMatchingHasBeenSent = async (requestId) => {
  const serviceUrl =
    urlConstant.endpoint.hiringRequest.getDevMatchingHasBeenSent.replace(
      "${requestId}",
      requestId
    );
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET"
  );
  return response;
};

const getDeveloperDetailInManager = async (devId) => {
  const serviceUrl =
    urlConstant.endpoint.hiringRequest.getDeveloperDetailInManager.replace(
      "${devId}",
      devId
    );
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET"
  );
  return response;
};

const getHiringRequestByidAndPaging = async (
  companyId,
  currentPage,
  pageSize,
  status
) => {
  const serviceUrl =
    urlConstant.endpoint.hiringRequest.getAllHiringRequestById.replace(
      "${companyId}",
      companyId
    ) + "&";
  const pagingUrl = urlConstant.endpoint.hiringRequest.paging
    .replace("${currentPage}", currentPage)
    .replace("${pageSize}", pageSize);
  const statusUrls =
    urlConstant.endpoint.hiringRequest.searchStatusHiringRequest.replace(
      "${Status}",
      status
    );
  const fullUrl = serviceUrl + pagingUrl + statusUrls;
  const response = await axiosLocalHost.sendAuthorizedRequest(fullUrl, "GET");
  return response;
};

const getAllHiringRequestByIdAndJobTitleAndSkill = async (
  companyId,
  currentPage,
  pageSize,
  jobTitle,
  skill
) => {
  const serviceUrl =
    urlConstant.endpoint.hiringRequest.getAllHiringRequestById.replace(
      "${companyId}",
      companyId
    ) + "&";
  const pagingUrl = urlConstant.endpoint.hiringRequest.paging
    .replace("${currentPage}", currentPage)
    .replace("${pageSize}", pageSize);

  let fullUrl = serviceUrl + pagingUrl;

  if (jobTitle) {
    const searchUrl = urlConstant.endpoint.hiringRequest.searchJobTitle.replace(
      "${search}",
      jobTitle
    );
    fullUrl += searchUrl;
  }
  // if (level) {
  //   const levelUrl = urlConstant.endpoint.hiringRequest.searchLevel.replace(
  //     "${LevelRequireId}",
  //     level
  //   );
  //   fullUrl += levelUrl;
  // }

  if (skill && skill.length > 0) {
    const skillUrls = skill.map((item) => "&SkillIds=" + item.value);
    const fullUrls = skillUrls.join("&");
    fullUrl += fullUrls;
  }
  //   if (status) {

  //     const statusUrls =
  //       urlConstant.endpoint.hiringRequest.searchStatusHiringRequest.replace(
  //         "${Status}",
  //         status
  //       );
  //     fullUrl += statusUrls;
  //   }
  const response = await axiosLocalHost.sendAuthorizedRequest(fullUrl, "GET");
  console.log(fullUrl);
  return response;
};

const approvedHirringRequestStatus = async (
  requestId,
  rejectionReason,
  isApproved
) => {
  const serviceUrl =
    urlConstant.endpoint.hiringRequest.approvedHirringRequestStatus;
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "PUT",
    {
      requestId,
      rejectionReason,
      isApproved,
    }
  );
  return response;
};

const cancelHirringRequestStatus = async (
  requestId,
  rejectionReason,
  isApproved
) => {
  const serviceUrl =
    urlConstant.endpoint.hiringRequest.cancelHirringRequestStatus;
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "PUT",
    {
      requestId,
      rejectionReason,
      isApproved,
    }
  );
  return response;
};

//----------------------------------------------------------------------------------
const cancelHirringRequestStatusAfter = async (
  requestId,
  rejectionReason,
  isCompanyPartner
) => {
  const serviceUrl =
    urlConstant.endpoint.hiringRequest.cancelHirringRequestStatusAfter;
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "PUT",
    {
      requestId,
      rejectionReason,
      isCompanyPartner,
    }
  );
  return response;
};

const getHiringRequestByProjectIdAndPaging = async (
  projectId,
  currentPage,
  pageSize
) => {
  const serviceUrl =
    urlConstant.endpoint.hiringRequest.getAllHiringRequestByProjectId.replace(
      "${projectId}",
      projectId
    ) + "&";
  const pagingUrl = urlConstant.endpoint.hiringRequest.paging
    .replace("${currentPage}", currentPage)
    .replace("${pageSize}", pageSize);
  const fullUrl = serviceUrl + pagingUrl;
  const response = await axiosLocalHost.sendAuthorizedRequest(fullUrl, "GET");
  return response;
};

const getHiringRequestByProjectId = async (projectId) => {
  const serviceUrl =
    urlConstant.endpoint.hiringRequest.getAllHiringRequestByProjectId.replace(
      "${projectId}",
      projectId
    );
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET"
  );
  return response;
};

const getAllHiringRequestByProjectIdAndPaging = async (
  projectId,
  pageIndex,
  pageSize,
  skillSearch,
  levelSearch,
  typeSearch,
  inputSearch,
  statusSearch
) => {
  const values = skillSearch.map((value) => `&SkillIds=${value}`);
  const serviceUrl =
    urlConstant.endpoint.hiringRequest.getAllHiringRequestByProjectIdAndPaging
      .replace("${projectId}", projectId)
      .replace("${PageIndex}", pageIndex)
      .replace("${PageSize}", pageSize)
      .replace("${searchKeyString}", inputSearch)
      .replace("${TypeRequireId}", typeSearch)
      .replace("${LevelRequireId}", levelSearch)
      .replace("${Status}", statusSearch) + values.join("");
  console.log(serviceUrl);
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET"
  );
  return response;
};

const closeHiringRequest = async (
  requestId,
  rejectionReason,
  isCompanyPartner
) => {
  const serviceUrl =
    urlConstant.endpoint.hiringRequest.closeHirringRequestStatus;
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "PUT",
    {
      requestId,
      rejectionReason,
      isCompanyPartner,
    }
  );
  return response;
};

const cloneHiringRequest = async (requestId) => {
  const serviceUrl =
    urlConstant.endpoint.hiringRequest.cloneHiringRequest.replace(
      "${requestId}",
      requestId
    );
  const response = await axiosLocalHost
    .sendAuthorizedRequest(serviceUrl, 'POST', requestId);
  return response;
};

const extendDuration = async (requestId, newDuration) => {
  const serviceUrl = urlConstant.endpoint.hiringRequest.extendDuration;
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "PUT",
    {
      requestId,
      newDuration,
    }
  );
  return response;
};

const getHiringRequestWaitingApprovalPaging = async (PageIndex, PageSize) => {
  const serviceUrl =
    urlConstant.endpoint.hiringRequest.getHiringRequestWaitingApprovalPaging
      .replace("${PageIndex}", PageIndex)
      .replace("${PageSize}", PageSize);
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET"
  );
  return response;
};

const getHiringRequestInProgressPaging = async (PageIndex, PageSize) => {
  const serviceUrl =
    urlConstant.endpoint.hiringRequest.getHiringRequestInProgressPaging
      .replace("${PageIndex}", PageIndex)
      .replace("${PageSize}", PageSize);
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET"
  );
  return response;
};

const getHiringRequestRejectedPaging = async (PageIndex, PageSize) => {
  const serviceUrl =
    urlConstant.endpoint.hiringRequest.getHiringRequestRejectedPaging
      .replace("${PageIndex}", PageIndex)
      .replace("${PageSize}", PageSize);
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET"
  );
  return response;
};

const getHiringRequestExpiredPaging = async (PageIndex, PageSize) => {
  const serviceUrl =
    urlConstant.endpoint.hiringRequest.getHiringRequestExpiredPaging
      .replace("${PageIndex}", PageIndex)
      .replace("${PageSize}", PageSize);
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET"
  );
  return response;
};

const getHiringRequestCancelledPaging = async (PageIndex, PageSize) => {
  const serviceUrl =
    urlConstant.endpoint.hiringRequest.getHiringRequestCancelledPaging
      .replace("${PageIndex}", PageIndex)
      .replace("${PageSize}", PageSize);
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET"
  );
  return response;
};

const getHiringRequestClosedPaging = async (PageIndex, PageSize) => {
  const serviceUrl =
    urlConstant.endpoint.hiringRequest.getHiringRequestClosedPaging
      .replace("${PageIndex}", PageIndex)
      .replace("${PageSize}", PageSize);
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET"
  );
  return response;
};

const getHiringRequestCompletedPaging = async (PageIndex, PageSize) => {
  const serviceUrl =
    urlConstant.endpoint.hiringRequest.getHiringRequestCompletedPaging
      .replace("${PageIndex}", PageIndex)
      .replace("${PageSize}", PageSize);
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET"
  );
  return response;
};

export default {
  createHiringRequest,
  getAllHiringRequest,
  getHiringRequestAndPaging,
  getAllHiringRequestByJobTitleAndSkill,
  getAllStatusHiringRequest,
  getHiringRequestDetailInManager,
  //getDeveloperMatchingInManager,
  sendHiringRequestToDevMatching,
  getDevMatchingHasBeenSent,
  getDeveloperDetailInManager,
  getHiringRequestByidAndPaging,
  getAllHiringRequestByIdAndJobTitleAndSkill,
  getHiringRequestDetailInCompany,
  approvedHirringRequestStatus,
  getHiringRequestSaved,
  updateHiringRequest,
  cancelHirringRequestStatus,
  cancelHirringRequestStatusAfter,
  getHiringRequestByProjectIdAndPaging,
  getHiringRequestByProjectId,
  getAllHiringRequestByProjectIdAndPaging,
  closeHiringRequest,
  cloneHiringRequest,
  extendDuration,
  getHiringRequestWaitingApprovalPaging,
  getHiringRequestInProgressPaging,
  getHiringRequestRejectedPaging,
  getHiringRequestExpiredPaging,
  getHiringRequestCancelledPaging,
  getHiringRequestClosedPaging,
  getHiringRequestCompletedPaging,
};

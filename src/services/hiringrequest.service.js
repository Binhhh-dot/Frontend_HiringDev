import urlConstant from "../Common/urlConstant";
import utils from "../utils/customAxios";

const createHiringRequest = async (
  jobTitle,
  jobDescription,
  numberOfDev,
  salaryPerDev,
  duration,
  typeRequireId,
  levelRequireId,
  skills,
  isSaved,
  companyId,
  employmentTypeId,
  scheduleTypeId
) => {
  const serviceUrl = urlConstant.endpoint.hiringRequest.createHiringRequest;
  const response = await utils.axiosLocalHost.post(serviceUrl, {
    jobTitle,
    jobDescription,
    numberOfDev,
    salaryPerDev,
    duration,
    typeRequireId,
    levelRequireId,
    skills,
    isSaved,
    companyId,
    scheduleTypeId,
    employmentTypeId,
  });
  return response;
};

const getAllHiringRequest = async () => {
  const serviceUrl = urlConstant.endpoint.hiringRequest.getAll;
  const response = await utils.axiosLocalHost.get(serviceUrl);
  return response;
};

const getAllStatusHiringRequest = async () => {
  const serviceUrl = urlConstant.endpoint.hiringRequest.getAllStatus;
  const response = await utils.axiosLocalHost.get(serviceUrl);
  console.log(serviceUrl);
  return response;
};

const getHiringRequestAndPaging = async (currentPage, pageSize) => {
  const serviceUrl = urlConstant.endpoint.hiringRequest.getAll + "?";
  const pagingUrl = urlConstant.endpoint.hiringRequest.paging
    .replace("${currentPage}", currentPage)
    .replace("${pageSize}", pageSize);
  const fullUrl = serviceUrl + pagingUrl;
  const response = await utils.axiosLocalHost.get(fullUrl);
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
  const response = await utils.axiosLocalHost.get(fullUrl);
  console.log(fullUrl);
  return response;
};

const getHiringRequestDetailInManager = async (hiringRequestId) => {
  const serviceUrl =
    urlConstant.endpoint.hiringRequest.getHiringRequestDetailInCompany.replace(
      "${hiringRequestId}",
      hiringRequestId
    );

  const response = await utils.axiosLocalHost.get(serviceUrl);

  // localStorage.setItem("myData", hiringRequestId);

  return response;
};

const getHiringRequestDetailInCompany = async (hiringRequestId) => {
  const serviceUrl =
    urlConstant.endpoint.hiringRequest.getHiringRequestDetailInManager.replace(
      "${hiringRequestId}",
      hiringRequestId
    );

  const response = await utils.axiosLocalHost.get(serviceUrl);
  return response;
};

const getDeveloperMatchingInManager = async (devMatchingId) => {
  const serviceUrl =
    urlConstant.endpoint.hiringRequest.getDeveloperMatchingInManager.replace(
      "${devMatching}",
      devMatchingId
    );

  const response = await utils.axiosLocalHost.get(serviceUrl);
  return response;
};

const sendHiringRequestToDevMatching = async (requestId, developerIds) => {
  const serviceUrl =
    urlConstant.endpoint.hiringRequest.sendHiringRequestToDevMatching;
  const response = await utils.axiosLocalHost.post(serviceUrl, {
    requestId,
    developerIds,
  });
  return response;
};

const getDevMatchingHasBeenSent = async (requestId) => {
  const serviceUrl =
    urlConstant.endpoint.hiringRequest.getDevMatchingHasBeenSent.replace(
      "${requestId}",
      requestId
    );
  const response = await utils.axiosLocalHost.get(serviceUrl);
  return response;
};

const getDeveloperDetailInManager = async (devId) => {
  const serviceUrl =
    urlConstant.endpoint.hiringRequest.getDeveloperDetailInManager.replace(
      "${devId}",
      devId
    );
  const response = await utils.axiosLocalHost.get(serviceUrl);
  return response;
};

const getHiringRequestByidAndPaging = async (
  companyId,
  currentPage,
  pageSize
) => {
  const serviceUrl =
    urlConstant.endpoint.hiringRequest.getAllHiringRequestById.replace(
      "${companyId}",
      companyId
    ) + "&";
  const pagingUrl = urlConstant.endpoint.hiringRequest.paging
    .replace("${currentPage}", currentPage)
    .replace("${pageSize}", pageSize);
  const fullUrl = serviceUrl + pagingUrl;
  const response = await utils.axiosLocalHost.get(fullUrl);
  return response;
};

const getAllHiringRequestByIdAndJobTitleAndSkill = async (
  companyId,
  currentPage,
  pageSize,
  jobTitle,
  skill,
  level
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
  const response = await utils.axiosLocalHost.get(fullUrl);
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
  const response = await utils.axiosLocalHost.put(serviceUrl, {
    requestId,
    rejectionReason,
    isApproved,
  });
  return response;
};
export default {
  createHiringRequest,
  getAllHiringRequest,
  getHiringRequestAndPaging,
  getAllHiringRequestByJobTitleAndSkill,
  getAllStatusHiringRequest,
  getHiringRequestDetailInManager,
  getDeveloperMatchingInManager,
  sendHiringRequestToDevMatching,
  getDevMatchingHasBeenSent,
  getDeveloperDetailInManager,
  getHiringRequestByidAndPaging,
  getAllHiringRequestByIdAndJobTitleAndSkill,
  getHiringRequestDetailInCompany,
  approvedHirringRequestStatus,
};

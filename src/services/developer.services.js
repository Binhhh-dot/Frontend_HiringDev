import { config } from "dotenv";
import urlConstant from "../Common/urlConstant";
import axiosLocalHost from "../utils/customAxios";

const GetAllSelectedDevByHR = async (hiringRequestId) => {
  const serviceUrl =
    urlConstant.endpoint.selectingDeveloper.getAllSelectedDevByHR.replace(
      "${hiringRequestId}",
      hiringRequestId
    );
  const response = await axiosLocalHost.sendAuthorizedRequest(serviceUrl, 'GET');
  return response;
};

// const getSelectedDevByManager = async (requestId) => {
//   const serviceUrl =
//     urlConstant.endpoint.selectingDeveloper.getSelectedDevByManager.replace(
//       "${requestId}",
//       requestId
//     );
//   const response = await axiosLocalHost.normalRequest.get(serviceUrl);
//   return response;
// };

const sendDevToHR = async (requestId, developerIds) => {
  const serviceUrl = urlConstant.endpoint.selectingDeveloper.sendDevToHR;
  const response = await axiosLocalHost
    .sendAuthorizedRequest(serviceUrl, 'PUT', {
      requestId,
      developerIds,
    });
  return response;
};

// export default {
//   GetAllSelectedDevByHR,
//   getSelectedDevByManager,
//   sendDevToHR,
// };
//     const serviceUrl = urlConstant.endpoint.selectingDeveloper.getAllSelectedDevByHR.replace("${hiringRequestId}", hiringRequestId);
//     const response = await axiosLocalHost.normalRequest.get(serviceUrl);
//     return response;
// };

const approvalInterviewByHR = async (requestId, developerId, isApproved) => {
  const serviceUrl = urlConstant.endpoint.selectingDeveloper.approvalByHR;
  const response = await axiosLocalHost
    .sendAuthorizedRequest(serviceUrl, 'PUT', {
      requestId,
      developerId,
      isApproved,
    });
  return response;
};

const approvalOnboardingByHR = async (requestId, developerId, isApproved) => {
  const serviceUrl = urlConstant.endpoint.selectingDeveloper.onboarnding;
  const response = await axiosLocalHost
    .sendAuthorizedRequest(serviceUrl, 'PUT', {
      requestId,
      developerId,
      isApproved,
    });
  return response;
};

const getListDevWaitingInterview = async (requestId, PageSize, PageIndex) => {
  const serviceUrl = urlConstant.endpoint.developer.getListDevWaitingInterview
    .replace("${requestId}", requestId)
    .replace("${PageIndex}", PageIndex)
    .replace("${PageSize}", PageSize);
  const response = await axiosLocalHost.sendAuthorizedRequest(serviceUrl, 'GET');
  return response;
};

const rejectSelectedDev = async (requestId, developerId) => {
  const serviceUrl = urlConstant.endpoint.selectingDeveloper.rejectSelectedDev
    .replace("${requestId}", requestId)
    .replace("${developerId}", developerId);
  const response = await axiosLocalHost
    .sendAuthorizedRequest(serviceUrl, 'PUT', {
      requestId,
      developerId,
    });
  return response;
};

const appectDevToInterview = async (requestId, interviewId, devIds) => {
  const serviceUrl =
    urlConstant.endpoint.selectingDeveloper.accpectDevToInterview;
  const response = await axiosLocalHost
    .sendAuthorizedRequest(serviceUrl, 'PUT', {
      requestId,
      interviewId,
      devIds,
    });
  return response;
};

const removeOutOfWaitingInterview = async (requestId, devIds) => {
  const serviceUrl =
    urlConstant.endpoint.selectingDeveloper.removeOutOfWaitingInterview
      .replace("${requestId}", requestId)
      .replace("${developerId}", devIds);
  const response = await axiosLocalHost
    .sendAuthorizedRequest(serviceUrl, 'PUT', {
      requestId,
      devIds,
    });
  return response;
};

const getDeveloperDetailByDevId = async (devIds) => {
  const serviceUrl =
    urlConstant.endpoint.developer.getDeveloperDetailByDevId.replace(
      "${developerId}",
      devIds
    );
  const response = await axiosLocalHost
    .sendAuthorizedRequest(serviceUrl, 'GET', devIds);
  return response;
};

const CreateDeveloperAccount = async (
  firstName,
  lastName,
  email,
  phoneNumber,
  genderId,
  dateOfBirth,
  yearOfExperience,
  averageSalary,
  employmentTypeId,
  levelId,
  types,
  skills
) => {
  const serviceUrl = urlConstant.endpoint.developer.createDeveloper;
  const response = await axiosLocalHost
    .sendAuthorizedRequest(serviceUrl, 'POST', {
      firstName,
      lastName,
      email,
      phoneNumber,
      genderId,
      dateOfBirth,
      yearOfExperience,
      averageSalary,
      employmentTypeId,
      levelId,
      types,
      skills,
    });
  return response;
};

const getDeveloperUnofficial = async () => {
  const serviceUrl = urlConstant.endpoint.developer.getDeveloperUnofficial;
  const response = await axiosLocalHost.sendAuthorizedRequest(serviceUrl, 'GET');
  return response;
};

const getDeveloperUnofficialPaging = async (currentPage, PageSize) => {
  const serviceUrl =
    urlConstant.endpoint.developer.getDeveloperUnofficial + "?";
  const pagingUrl = urlConstant.endpoint.developer.getDeveloperUnofficialPaging
    .replace("${currentPage}", currentPage)
    .replace("${pageSize}", PageSize);
  const fullUrl = serviceUrl + pagingUrl;
  const response = await axiosLocalHost.sendAuthorizedRequest(fullUrl, 'GET');
  return response;
};

const changeStatusDevUnofficialInTaskDetailForStaff = async (
  developerId,
  taskId,
  isApproved
) => {
  const serviceUrl =
    urlConstant.endpoint.developer
      .changeStatusDevUnofficialInTaskDetailForStaff;
  const response = await axiosLocalHost
    .sendAuthorizedRequest(serviceUrl, 'PUT', {
      developerId,
      taskId,
      isApproved,
    });
  return response;
};

// const sendDevToHRNew = async (requestId, developerIds) => {
//   const serviceUrl = urlConstant.endpoint.selectingDeveloper.sendDevToHRNew;
//   const response = await axiosLocalHost.normalRequest.post(serviceUrl, {
//     requestId,
//     developerIds,
//   });

//   return response;
// };

const onbardingDeveloper = async (requestId, developerId) => {
  const serviceUrl = urlConstant.endpoint.selectingDeveloper.onboardDeveloper
    .replace("${requestId}", requestId)
    .replace("${developerId}", developerId);
  const response = await axiosLocalHost
    .sendAuthorizedRequest(serviceUrl, 'PUT', {
      requestId,
      developerId,
    });
  return response;
};

const getListDeveloperOnboardByProjectId = async (projectId, status) => {
  const values = status.map((value) => `&Status=${value}`);
  const serviceUrl =
    urlConstant.endpoint.developer.getListDeveloperOnboardByProjectId.replace(
      "${projectId}",
      projectId
    ) + values.join("");

  const response = await axiosLocalHost
    .sendAuthorizedRequest(serviceUrl, 'GET', projectId);
  return response;
};

const updateDeveloperByAdmin = async (developerId, formData) => {
  const serviceUrl =
    urlConstant.endpoint.developer.updateDeveloperByAdmin.replace(
      "${developerId}",
      developerId
    );

  console.log([...formData]);
  const config = {
    header: {
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await axiosLocalHost
    .sendAuthorizedRequest(serviceUrl, 'PUT', formData, config);
  return response;
};

const getDeveloperMatchingInManager = async (requestId) => {
  const serviceUrl =
    urlConstant.endpoint.developer.getDeveloperMatchingInManager.replace(
      "${requestId}",
      requestId
    );

  const response = await axiosLocalHost
    .sendAuthorizedRequest(serviceUrl, 'GET');
  return response;
};

const getDeveloperByDevId = async (devId) => {
  const serviceUrl = urlConstant.endpoint.developer.getDeveloperByDevId.replace(
    "${devId}",
    devId
  );
  const response = await axiosLocalHost.sendAuthorizedRequest(serviceUrl, 'GET');
  return response;
};

export default {
  GetAllSelectedDevByHR,
  approvalInterviewByHR,
  approvalOnboardingByHR,
  getListDevWaitingInterview,
  rejectSelectedDev,
  appectDevToInterview,
  CreateDeveloperAccount,
  // GetAllSelectedDevByHR,
  // getSelectedDevByManager,
  sendDevToHR,
  getDeveloperUnofficial,
  getDeveloperUnofficialPaging,
  changeStatusDevUnofficialInTaskDetailForStaff,
  removeOutOfWaitingInterview,
  // sendDevToHRNew,
  onbardingDeveloper,
  getListDeveloperOnboardByProjectId,
  updateDeveloperByAdmin,
  getDeveloperMatchingInManager,
  getDeveloperDetailByDevId,
  getDeveloperByDevId,
};

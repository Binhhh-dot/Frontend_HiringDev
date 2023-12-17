import urlConstant from "../Common/urlConstant";
import axiosLocalHost from "../utils/customAxios";

const getListDeveloperInRequestByRequestId = async (
  requestId
) => {
  const serviceUrl =
    urlConstant.endpoint.hiredDev.getListDeveloperInRequestByRequestId
      .replace("${requestId}", requestId)
  const response = await axiosLocalHost
    .sendAuthorizedRequest(serviceUrl, 'GET');
  return response;
}


const getSelectedDevByManager = async (requestId) => {
  const serviceUrl =
    urlConstant.endpoint.hiredDev.getSelectedDevByManager.replace(
      "${requestId}",
      requestId
    );
  const response = await axiosLocalHost
    .sendAuthorizedRequest(serviceUrl, 'GET');
  return response;
};

const sendDevToHRNew = async (requestId, developerIds) => {
  const serviceUrl = urlConstant.endpoint.hiredDev.sendDevToHRNew;
  const response = await axiosLocalHost
    .sendAuthorizedRequest(serviceUrl, 'POST', {
      requestId,
      developerIds,
    });
  return response;
};

const kickDeveloperInProject = async (projectId, developerId) => {
  const serviceUrl = urlConstant.endpoint.hiredDev.kickDevInProject
    .replace("${projectId}", projectId)
    .replace("${developerId}", developerId);
  const response = await axiosLocalHost
    .sendAuthorizedRequest(serviceUrl, 'PUT');
  return response;
};

const rejectSelectedDev = async (requestId, developerId) => {
  const serviceUrl = urlConstant.endpoint.hiredDev.rejectSelectedDev
    .replace("${requestId}", requestId)
    .replace("${developerId}", developerId);
  const response = await axiosLocalHost.sendAuthorizedRequest(serviceUrl, 'PUT');
  return response;
};

export default {
  getSelectedDevByManager,
  sendDevToHRNew,
  kickDeveloperInProject,
  getListDeveloperInRequestByRequestId,
  rejectSelectedDev
};

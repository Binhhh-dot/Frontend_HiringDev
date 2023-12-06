import urlConstant from "../Common/urlConstant";
import axiosLocalHost from "../utils/customAxios";

const getListDeveloperInRequestByRequestId = async (
  requestId
) => {
  const serviceUrl =
    urlConstant.endpoint.hiredDev.getListDeveloperInRequestByRequestId
      .replace("${requestId}", requestId)
  const response = await axiosLocalHost.normalRequest.get(serviceUrl);
  return response;
}


const getSelectedDevByManager = async (requestId) => {
  const serviceUrl =
    urlConstant.endpoint.hiredDev.getSelectedDevByManager.replace(
      "${requestId}",
      requestId
    );
  const response = await axiosLocalHost.normalRequest.get(serviceUrl);
  return response;
};

const sendDevToHRNew = async (requestId, developerIds) => {
  const serviceUrl = urlConstant.endpoint.hiredDev.sendDevToHRNew;
  const response = await axiosLocalHost.normalRequest.post(serviceUrl, {
    requestId,
    developerIds,
  });
  return response;
};

const kickDeveloperInProject = async (projectId, developerId) => {
  const serviceUrl = urlConstant.endpoint.hiredDev.kickDevInProject
    .replace("${projectId}", projectId)
    .replace("${developerId}", developerId);
  const response = await axiosLocalHost.normalRequest.put(serviceUrl);
  return response;
};

export default {
  getSelectedDevByManager,
  sendDevToHRNew,
  kickDeveloperInProject,
  getListDeveloperInRequestByRequestId,
};

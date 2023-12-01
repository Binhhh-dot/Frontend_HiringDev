import urlConstant from "../Common/urlConstant";
import utils from "../utils/customAxios";

const getSelectedDevByManager = async (requestId) => {
  const serviceUrl =
    urlConstant.endpoint.hiredDev.getSelectedDevByManager.replace(
      "${requestId}",
      requestId
    );
  const response = await utils.axiosLocalHost.get(serviceUrl);
  return response;
};

const sendDevToHRNew = async (requestId, developerIds) => {
  const serviceUrl = urlConstant.endpoint.hiredDev.sendDevToHRNew;
  const response = await utils.axiosLocalHost.post(serviceUrl, {
    requestId,
    developerIds,
  });
  return response;
};

const kickDeveloperInProject = async (projectId, developerId) => {
  const serviceUrl = urlConstant.endpoint.hiredDev.kickDevInProject
    .replace("${projectId}", projectId)
    .replace("${developerId}", developerId);
  const response = await utils.axiosLocalHost.put(serviceUrl);
  return response;
};

export default {
  getSelectedDevByManager,
  sendDevToHRNew,
  kickDeveloperInProject,
};

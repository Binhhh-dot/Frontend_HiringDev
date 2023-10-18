import urlConstant from "../Common/urlConstant";
import utils from "../utils/customAxios";

const GetAllSelectedDevByHR = async (hiringRequestId) => {
  const serviceUrl =
    urlConstant.endpoint.developer.GetAllSelectedDevByHR.replace(
      "${hiringRequestId}",
      hiringRequestId
    );
  const response = await utils.axiosLocalHost.get(serviceUrl);
  return response;
};

const getSelectedDevByManager = async (requestId) => {
  const serviceUrl =
    urlConstant.endpoint.developer.getSelectedDevByManager.replace(
      "${requestId}",
      requestId
    );
  const response = await utils.axiosLocalHost.get(serviceUrl);
  return response;
};

const sendDevToHR = async (requestId, developerIds) => {
  const serviceUrl = urlConstant.endpoint.developer.sendDevToHR;
  const response = await utils.axiosLocalHost.put(serviceUrl, {
    requestId,
    developerIds,
  });
  return response;
};

export default {
  GetAllSelectedDevByHR,
  getSelectedDevByManager,
  sendDevToHR,
};

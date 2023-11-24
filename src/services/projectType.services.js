import urlConstant from "../Common/urlConstant";
import utils from "../utils/customAxios";

const getAllType = async () => {
  const serviceUrl = urlConstant.endpoint.projectType.getAll.replace(
    "${status}",
    "1"
  );
  const response = await utils.axiosLocalHost.get(serviceUrl);
  return response;
};

const getAllProjectType = async () => {
  const serviceUrl = urlConstant.endpoint.projectType.getAllProjectType;
  const response = await utils.axiosLocalHost.get(serviceUrl);
  return response;
};

export default {
  getAllType,
  getAllProjectType,
};

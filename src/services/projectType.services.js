import urlConstant from "../Common/urlConstant";
import axiosLocalHost from "../utils/customAxios";

const getAllType = async () => {
  const serviceUrl = urlConstant.endpoint.projectType.getAll.replace(
    "${status}",
    "1"
  );
  const response = await axiosLocalHost.normalRequest.get(serviceUrl);
  return response;
};

const getAllProjectType = async () => {
  const serviceUrl = urlConstant.endpoint.projectType.getAllProjectType;
  const response = await axiosLocalHost.normalRequest.get(serviceUrl);
  return response;
};

export default {
  getAllType,
  getAllProjectType,
};

import urlConstant from "../Common/urlConstant";
import axiosLocalHost from "../utils/customAxios";

const getAllGender = async () => {
  const serviceUrl = urlConstant.endpoint.gender.getAllGender;
  const response = await axiosLocalHost.normalRequest.get(serviceUrl);
  return response;
};

export default {
  getAllGender,
};

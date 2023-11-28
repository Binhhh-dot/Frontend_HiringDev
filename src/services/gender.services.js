import urlConstant from "../Common/urlConstant";
import utils from "../utils/customAxios";

const getAllGender = async () => {
  const serviceUrl = urlConstant.endpoint.gender.getAllGender;
  const response = await utils.axiosLocalHost.get(serviceUrl);
  return response;
};

export default {
  getAllGender,
};

import urlConstant from "../Common/urlConstant";
import utils from "../utils/customAxios";

const getStaff = async (currentPage, pageSize) => {
  const serviceUrl = urlConstant.endpoint.user.getStaff
    .replace("${currentPage}", currentPage)
    .replace("${pageSize}", pageSize);
  const response = await utils.axiosLocalHost.get(serviceUrl);
  return response;
};

export default { getStaff };

import urlConstant from "../Common/urlConstant";
import utils from "../utils/customAxios";

const getProjectList = async () => {
  const serviceUrl = urlConstant.endpoint.project.getProjectList;
  const response = await utils.axiosLocalHost.get(serviceUrl);
  return response;
};

const getProjectListPaging = async (PageIndex, PageSize) => {
  const serviceUrl = urlConstant.endpoint.project.getProjectList + "?";
  const pagingUrl = urlConstant.endpoint.project.getProjectListPaging
    .replace("${PageIndex}", PageIndex)
    .replace("${PageSize}", PageSize);
  const fullUrl = serviceUrl + pagingUrl;
  const response = await utils.axiosLocalHost.get(fullUrl);
  return response;
};

export default { getProjectList, getProjectListPaging };

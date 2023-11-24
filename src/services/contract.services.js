import urlConstant from "../Common/urlConstant";
import utils from "../utils/customAxios";

const getContract = async () => {
  const serviceUrl = urlConstant.endpoint.contract.getContract;
  const response = await utils.axiosLocalHost.get(serviceUrl);
  return response;
};

const getContractAndPaging = async (PageIndex, PageSize) => {
  const serviceUrl = urlConstant.endpoint.contract.getContract + "?";
  const pagingUrl = urlConstant.endpoint.contract.getContractAndPaging
    .replace("${PageIndex}", PageIndex)
    .replace("${PageSize}", PageSize);
  const fullUrl = serviceUrl + pagingUrl;
  const response = await utils.axiosLocalHost.get(fullUrl);
  return response;
};

export default { getContract, getContractAndPaging };

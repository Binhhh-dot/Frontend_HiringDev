import urlConstant from "../Common/urlConstant"
import utils from "../utils/customAxios"

const getPreContract = async (developerId, requestId) => {
  const serviceUrl = urlConstant.endpoint.contract.getPreContract.replace("${developerId}", developerId).replace("${requestId}", requestId);
  const response = await utils.axiosLocalHost.get(serviceUrl, { developerId, requestId })
  return response
}


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

export default {
  getPreContract,
  getContract,
  getContractAndPaging
};

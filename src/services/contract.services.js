import urlConstant from "../Common/urlConstant"
import axiosLocalHost from "../utils/customAxios";

const getPreContract = async (developerId, requestId) => {
  const serviceUrl = urlConstant.endpoint.contract.getPreContract.replace("${developerId}", developerId).replace("${requestId}", requestId);
  const response = await axiosLocalHost.normalRequest.get(serviceUrl, { developerId, requestId })
  return response
}


const getContract = async () => {
  const serviceUrl = urlConstant.endpoint.contract.getContract;
  const response = await axiosLocalHost.normalRequest.get(serviceUrl);
  return response;
};

const getContractAndPaging = async (PageIndex, PageSize) => {
  const serviceUrl = urlConstant.endpoint.contract.getContract + "?";
  const pagingUrl = urlConstant.endpoint.contract.getContractAndPaging
    .replace("${PageIndex}", PageIndex)
    .replace("${PageSize}", PageSize);
  const fullUrl = serviceUrl + pagingUrl;
  const response = await axiosLocalHost.normalRequest.get(fullUrl);
  return response;
};

const postContract = async (requestId, developerId, fromDate, toDate, legalRepresentation, legalRepresentationPosition) => {
  const serviceUrl = urlConstant.endpoint.contract.postContract;
  const response = await axiosLocalHost.normalRequest.post(serviceUrl, { requestId, developerId, fromDate, toDate, legalRepresentation, legalRepresentationPosition });
  return response
};


const getContractById = async (contractId) => {
  const serviceUrl = urlConstant.endpoint.contract.getContractById.replace(
    "${contractId}",
    contractId
  );
  const response = await axiosLocalHost.normalRequest.get(serviceUrl);
  return response;
};


const confirmContract = async (contractId) => {
  const serviceUrl = urlConstant.endpoint.contract.confirmContract.replace(
    "${contractId}",
    contractId
  );

  const response = await axiosLocalHost.normalRequest.put(serviceUrl);
  return response;
};

const getListContractByCompanyIdAndPaging = async (companyId, PageIndex, pageSize, contractCode, status) => {
  const serviceUrl = urlConstant.endpoint.contract.getListContractByCompanyIdAndPaging
    .replace("${companyId}", companyId)
    .replace("${PageIndex}", PageIndex)
    .replace("${PageSize}", pageSize)
    .replace("${ContractCode}", contractCode)
    .replace("${Status}", status)
    ;

  const response = await axiosLocalHost.normalRequest.get(serviceUrl);
  return response;
}

export default {
  getPreContract,
  getContract,
  getContractAndPaging,
  postContract,
  getContractAndPaging,
  getContractById,
  confirmContract,
  getListContractByCompanyIdAndPaging
};
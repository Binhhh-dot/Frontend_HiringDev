import urlConstant from "../Common/urlConstant";
import axiosLocalHost from "../utils/customAxios";

const getPreContract = async (developerId, requestId) => {
  const serviceUrl = urlConstant.endpoint.contract.getPreContract
    .replace("${developerId}", developerId)
    .replace("${requestId}", requestId);
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET",
    { developerId, requestId }
  );
  return response;
};

const getContract = async () => {
  const serviceUrl = urlConstant.endpoint.contract.getContract;
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET"
  );
  return response;
};

const getContractAndPaging = async (PageIndex, PageSize) => {
  const serviceUrl = urlConstant.endpoint.contract.getContract + "?";
  const pagingUrl = urlConstant.endpoint.contract.getContractAndPaging
    .replace("${PageIndex}", PageIndex)
    .replace("${PageSize}", PageSize);
  const fullUrl = serviceUrl + pagingUrl;
  const response = await axiosLocalHost.sendAuthorizedRequest(fullUrl, "GET");
  return response;
};

const postContract = async (
  requestId,
  developerId,
  fromDate,
  toDate,
  legalRepresentation,
  legalRepresentationPosition
) => {
  const serviceUrl = urlConstant.endpoint.contract.postContract;
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "POST",
    {
      requestId,
      developerId,
      fromDate,
      toDate,
      legalRepresentation,
      legalRepresentationPosition,
    }
  );
  return response;
};

const getContractById = async (contractId) => {
  const serviceUrl = urlConstant.endpoint.contract.getContractById.replace(
    "${contractId}",
    contractId
  );
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET"
  );
  return response;
};

const confirmContract = async (contractId) => {
  const serviceUrl = urlConstant.endpoint.contract.confirmContract.replace(
    "${contractId}",
    contractId
  );

  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "PUT"
  );
  return response;
};

const getListContractByCompanyIdAndPaging = async (
  companyId,
  PageIndex,
  pageSize,
  contractCode,
  status
) => {
  const serviceUrl =
    urlConstant.endpoint.contract.getListContractByCompanyIdAndPaging
      .replace("${companyId}", companyId)
      .replace("${PageIndex}", PageIndex)
      .replace("${PageSize}", pageSize)
      .replace("${ContractCode}", contractCode)
      .replace("${Status}", status);
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET"
  );
  return response;
};

const getContractPendingPaging = async (PageIndex, PageSize) => {
  const serviceUrl = urlConstant.endpoint.contract.getContractPendingPaging
    .replace("${PageIndex}", PageIndex)
    .replace("${PageSize}", PageSize);
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET"
  );
  return response;
};

const getContractSignedPaging = async (PageIndex, PageSize) => {
  const serviceUrl = urlConstant.endpoint.contract.getContractSignedPaging
    .replace("${PageIndex}", PageIndex)
    .replace("${PageSize}", PageSize);
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET"
  );
  return response;
};

const getContractFailedPaging = async (PageIndex, PageSize) => {
  const serviceUrl = urlConstant.endpoint.contract.getContractFailedPaging
    .replace("${PageIndex}", PageIndex)
    .replace("${PageSize}", PageSize);
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET"
  );
  return response;
};

const getContractTerminatedPaging = async (PageIndex, PageSize) => {
  const serviceUrl = urlConstant.endpoint.contract.getContractTerminatedPaging
    .replace("${PageIndex}", PageIndex)
    .replace("${PageSize}", PageSize);
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET"
  );
  return response;
};

const getContractEndOfContractPaging = async (PageIndex, PageSize) => {
  const serviceUrl =
    urlConstant.endpoint.contract.getContractEndOfContractPaging
      .replace("${PageIndex}", PageIndex)
      .replace("${PageSize}", PageSize);
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET"
  );
  return response;
};

export default {
  getPreContract,
  getContract,
  getContractAndPaging,
  postContract,
  getContractAndPaging,
  getContractById,
  confirmContract,
  getListContractByCompanyIdAndPaging,
  getContractPendingPaging,
  getContractSignedPaging,
  getContractFailedPaging,
  getContractTerminatedPaging,
  getContractEndOfContractPaging,
};

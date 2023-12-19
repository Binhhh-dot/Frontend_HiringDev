import urlConstant from "../Common/urlConstant";
import axiosLocalHost from "../utils/customAxios";

const getTransactionHistory = async (PageIndex, PageSize) => {
  const serviceUrl =
    urlConstant.endpoint.transactionHistory.getTransactionHistory
      .replace("${PageIndex}", PageIndex)
      .replace("${PageSize}", PageSize);
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET"
  );
  return response;
};

const getAllTransactionHistory = async () => {
  const serviceUrl =
    urlConstant.endpoint.transactionHistory.getAllTransactionHistory;

  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET"
  );
  return response;
};

const getTransactionByCompanyIdAndPaging = async (
  companyId,
  PageIndex,
  PageSize,
  PayPalTransactionId,
  Status,
  Amount
) => {
  const serviceUrl =
    urlConstant.endpoint.transactionHistory.getTransactionByCompanyIdAndPaging
      .replace("${PageIndex}", PageIndex)
      .replace("${PageSize}", PageSize)
      .replace("${companyId}", companyId)
      .replace("${PayPalTransactionId}", PayPalTransactionId)
      .replace("${Status}", Status)
      .replace("${Amount}", Amount);
  console.log(serviceUrl);
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET"
  );
  return response;
};

const getTransactionHistoryCreated = async (PageIndex, PageSize) => {
  const serviceUrl =
    urlConstant.endpoint.transactionHistory.getTransactionHistoryCreated
      .replace("${PageIndex}", PageIndex)
      .replace("${PageSize}", PageSize);

  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET"
  );
  return response;
};

const getTransactionHistorySuccess = async (PageIndex, PageSize) => {
  const serviceUrl =
    urlConstant.endpoint.transactionHistory.getTransactionHistorySuccess
      .replace("${PageIndex}", PageIndex)
      .replace("${PageSize}", PageSize);

  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET"
  );
  return response;
};

const getTransactionHistoryFailed = async (PageIndex, PageSize) => {
  const serviceUrl =
    urlConstant.endpoint.transactionHistory.getTransactionHistoryFailed
      .replace("${PageIndex}", PageIndex)
      .replace("${PageSize}", PageSize);

  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET"
  );
  return response;
};

export default {
  getTransactionHistory,
  getTransactionByCompanyIdAndPaging,
  getAllTransactionHistory,
  getTransactionHistoryCreated,
  getTransactionHistorySuccess,
  getTransactionHistoryFailed,
};

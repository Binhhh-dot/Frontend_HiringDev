import urlConstant from "../Common/urlConstant";
import utils from "../utils/customAxios";

const getTransactionHistory = async (PageIndex, PageSize) => {
  const serviceUrl =
    urlConstant.endpoint.transactionHistory.getTransactionHistory
      .replace("${PageIndex}", PageIndex)
      .replace("${PageSize}", PageSize);
  const response = await utils.axiosLocalHost.get(serviceUrl);
  return response;
};

const getAllTransactionHistory = async () => {
  const serviceUrl =
    urlConstant.endpoint.transactionHistory.getAllTransactionHistory;

  const response = await utils.axiosLocalHost.get(serviceUrl);
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
  const response = await utils.axiosLocalHost.get(serviceUrl);
  return response;
};

// export default { getTransactionHistory, getAllTransactionHistory };

export default {
  getTransactionHistory,
  getTransactionByCompanyIdAndPaging,
  getAllTransactionHistory,
};

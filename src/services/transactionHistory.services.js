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

export default { getTransactionHistory, getAllTransactionHistory };

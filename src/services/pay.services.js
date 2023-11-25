import urlConstant from "../Common/urlConstant";
import utils from "../utils/customAxios";

const getPayPeriod = async (projectId, inputDate) => {
  const serviceUrl = urlConstant.endpoint.pay.getPayPeriod
    .replace("${projectId}", projectId)
    .replace("${inputDate}", inputDate);
  const response = await utils.axiosLocalHost.get(serviceUrl);
  return response;
};

const getPaySlipAndPaging = async (payPeriodId, PageIndex, PageSize) => {
  const serviceUrl =
    urlConstant.endpoint.pay.getPaySlip.replace("${payPeriodId}", payPeriodId) +
    "?";

  const pagingUrl = urlConstant.endpoint.pay.getPaySlipPaging
    .replace("${PageIndex}", PageIndex)
    .replace("${PageSize}", PageSize);

  const fullUrl = serviceUrl + pagingUrl;
  const response = await utils.axiosLocalHost.get(fullUrl);
  return response;
};

export default { getPayPeriod, getPaySlipAndPaging };

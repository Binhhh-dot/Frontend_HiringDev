import urlConstant from "../Common/urlConstant";
import axiosLocalHost from "../utils/customAxios";

const getPayPeriod = async (projectId, inputDate) => {
  const serviceUrl = urlConstant.endpoint.pay.getPayPeriod
    .replace("${projectId}", projectId)
    .replace("${inputDate}", inputDate);
  const response = await axiosLocalHost.normalRequest.get(serviceUrl);
  return response;
};

const getPaySlip = async (payPeriodId) => {
  const serviceUrl = urlConstant.endpoint.pay.getPaySlip.replace(
    "${payPeriodId}",
    payPeriodId
  );
  const response = await axiosLocalHost.normalRequest.get(serviceUrl);
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
  const response = await axiosLocalHost.normalRequest.get(fullUrl);
  return response;
};

const getWorklog = async (paySlipId) => {
  const serviceUrl = urlConstant.endpoint.pay.getWorklog.replace(
    "${paySlipId}",
    paySlipId
  );
  const response = await axiosLocalHost.normalRequest.get(serviceUrl);
  return response;
};

export default { getPayPeriod, getPaySlipAndPaging, getPaySlip, getWorklog };

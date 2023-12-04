import urlConstant from "../Common/urlConstant";
import utils from "../utils/customAxios";

const getReportList = async (PageIndex, PageSize) => {
  const serviceUrl = urlConstant.endpoint.report.getReportList
    .replace("${PageIndex}", PageIndex)
    .replace("${PageSize}", PageSize);
  const response = await utils.axiosLocalHost.get(serviceUrl);
  return response;
};

const getReportById = async (reportId) => {
  const serviceUrl = urlConstant.endpoint.report.getReportById.replace(
    "${reportId}",
    reportId
  );
  const response = await utils.axiosLocalHost.get(serviceUrl);
  return response;
};

const handleRelyReport = async (reportId, responseContent) => {
  const serviceUrl = urlConstant.endpoint.report.handleRelyReport;
  const response = await utils.axiosLocalHost.post(serviceUrl, {
    reportId,
    responseContent,
  });
  return response;
};

const handleConfirmReport = async (reportId) => {
  const serviceUrl = urlConstant.endpoint.report.handleConfirmReport.replace(
    "${reportId}",
    reportId
  );

  const response = await utils.axiosLocalHost.put(serviceUrl);
  return response;
};

export default {
  getReportList,
  getReportById,
  handleRelyReport,
  handleConfirmReport,
};

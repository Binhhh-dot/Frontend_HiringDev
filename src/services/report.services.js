import urlConstant from "../Common/urlConstant";
import utils from "../utils/customAxios";

const getReportList = async (PageIndex, PageSize) => {
  const serviceUrl = urlConstant.endpoint.report.getReportList
    .replace("${PageIndex}", PageIndex)
    .replace("${PageSize}", PageSize);
  const response = await utils.axiosLocalHost.get(serviceUrl);
  return response;
};

const getReportType = async () => {
  const serviceUrl = urlConstant.endpoint.report.getReportType;
  const response = await utils.axiosLocalHost.get(serviceUrl)
  return response
}

const createReport = async (developerId, projectId, reportTypeId, reportTitle, reportContent) => {
  const serviceUrl = urlConstant.endpoint.report.createReport;
  const response = await utils.axiosLocalHost.post(serviceUrl, { developerId, projectId, reportTypeId, reportTitle, reportContent })
  return response
}

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
  getReportType,
  createReport
};

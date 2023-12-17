import urlConstant from "../Common/urlConstant";
import axiosLocalHost from "../utils/customAxios";

const getReportList = async (PageIndex, PageSize) => {
  const serviceUrl = urlConstant.endpoint.report.getReportList
    .replace("${PageIndex}", PageIndex)
    .replace("${PageSize}", PageSize);
  const response = await axiosLocalHost.normalRequest.get(serviceUrl);
  return response;
};

const getReportType = async () => {
  const serviceUrl = urlConstant.endpoint.report.getReportType;
  const response = await axiosLocalHost.normalRequest.get(serviceUrl);
  return response;
};

const createReport = async (
  developerId,
  projectId,
  reportTypeId,
  reportTitle,
  reportContent
) => {
  const serviceUrl = urlConstant.endpoint.report.createReport;
  const response = await axiosLocalHost.normalRequest.post(serviceUrl, {
    developerId,
    projectId,
    reportTypeId,
    reportTitle,
    reportContent,
  });
  return response;
};

const getReportById = async (reportId) => {
  const serviceUrl = urlConstant.endpoint.report.getReportById.replace(
    "${reportId}",
    reportId
  );
  const response = await axiosLocalHost.normalRequest.get(serviceUrl);
  return response;
};

const handleRelyReport = async (reportId, responseContent) => {
  const serviceUrl = urlConstant.endpoint.report.handleRelyReport;
  const response = await axiosLocalHost.normalRequest.post(serviceUrl, {
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

  const response = await axiosLocalHost.normalRequest.put(serviceUrl);
  return response;
};

const getReportListByCompanyIdAndPaging = async (
  companyId,
  PageIndex,
  PageSize,
  searchKeyString,
  status
) => {
  const serviceUrl =
    urlConstant.endpoint.report.getReportListByCompanyIdAndPaging
      .replace("${companyId}", companyId)
      .replace("${PageIndex}", PageIndex)
      .replace("${PageSize}", PageSize)
      .replace("${Status}", status)
      .replace("${searchKeyString}", searchKeyString);
  console.log(serviceUrl);
  const response = await axiosLocalHost.normalRequest.get(serviceUrl);
  return response;
};

const getReportListPendingPaging = async (PageIndex, PageSize) => {
  const serviceUrl = urlConstant.endpoint.report.getReportListPendingPaging
    .replace("${PageIndex}", PageIndex)
    .replace("${PageSize}", PageSize);
  const response = await axiosLocalHost.normalRequest.get(serviceUrl);
  return response;
};

const getReportListProcessingPaging = async (PageIndex, PageSize) => {
  const serviceUrl = urlConstant.endpoint.report.getReportListProcessingPaging
    .replace("${PageIndex}", PageIndex)
    .replace("${PageSize}", PageSize);
  const response = await axiosLocalHost.normalRequest.get(serviceUrl);
  return response;
};

const getReportListDonePaging = async (PageIndex, PageSize) => {
  const serviceUrl = urlConstant.endpoint.report.getReportListDonePaging
    .replace("${PageIndex}", PageIndex)
    .replace("${PageSize}", PageSize);
  const response = await axiosLocalHost.normalRequest.get(serviceUrl);
  return response;
};

export default {
  getReportList,
  getReportById,
  handleRelyReport,
  handleConfirmReport,
  getReportType,
  createReport,
  getReportListByCompanyIdAndPaging,
  getReportListPendingPaging,
  getReportListProcessingPaging,
  getReportListDonePaging,
};

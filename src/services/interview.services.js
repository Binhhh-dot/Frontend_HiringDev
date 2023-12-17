import urlConstant from "../Common/urlConstant";
import axiosLocalHost from "../utils/customAxios";

const createAnInterview = async (
  requestId,
  developerId,
  title,
  description,
  dateOfInterview,
  startTime,
  endTime
) => {
  const serviceUrl = urlConstant.endpoint.interview.createAnInterview;
  const response = await axiosLocalHost
    .sendAuthorizedRequest(serviceUrl, 'POST', {
      requestId,
      developerId,
      title,
      description,
      dateOfInterview,
      startTime,
      endTime,
    });
  return response;
};

const getListInterviewByRequestId = async (requestId) => {
  const serviceUrl =
    urlConstant.endpoint.interview.getListInterviewByRequestId.replace(
      "${requestId}",
      requestId
    );
  const response = await axiosLocalHost
    .sendAuthorizedRequest(serviceUrl, 'GET', requestId);
  return response;
};

const getAllInterviewByHRAndPaging = async (companyId, requestId, pageSize, pageIndex) => {
  const serviceUrl = urlConstant.endpoint.interview.getAllInterviewByHRAndPaging
    .replace("${companyId}", companyId)
    .replace("${PageSize}", pageSize)
    .replace("${PageIndex}", pageIndex)
    .replace("${requestId}", requestId);
  const response = await axiosLocalHost
    .sendAuthorizedRequest(serviceUrl, 'GET');
  return response;
};

const getAllInterviewByHRAndRequestIdAndPaging = async (
  companyId,
  requestId,
  pageSize,
  pageIndex
) => {
  const serviceUrl =
    urlConstant.endpoint.interview.getAllInterviewByHRAndRequestIdAndPaging
      .replace("${companyId}", companyId)
      .replace("${PageSize}", pageSize)
      .replace("${PageIndex}", pageIndex)
      .replace("${requestId}", requestId);
  const response = await axiosLocalHost
    .sendAuthorizedRequest(serviceUrl, 'GET');
  return response;
};

const getDetailInterviewByInterviewId = async (
  interviewId
) => {
  const serviceUrl =
    urlConstant.endpoint.interview.getDetailInterviewByInterviewId
      .replace("${InterviewId}", interviewId)

  const response = await axiosLocalHost
    .sendAuthorizedRequest(serviceUrl, 'GET', interviewId);
  return response;
};

const getAllInterviewByManagerAndPaging = async (pageIndex, pageSize) => {
  const serviceUrl =
    urlConstant.endpoint.interview.getAllInterviewByManagerAndPaging
      .replace("${PageIndex}", pageIndex)
      .replace("${PageSize}", pageSize);

  const response = await axiosLocalHost
    .sendAuthorizedRequest(serviceUrl, 'GET');
  return response;
};

const approvalByManager = async (interviewId) => {
  const isApproved = true;
  const rejectionReason = "Accpect";
  const serviceUrl = urlConstant.endpoint.interview.approvalByManager;
  const response = await axiosLocalHost
    .sendAuthorizedRequest(serviceUrl, 'PUT', {
      interviewId,
      isApproved,
      rejectionReason,
    });
  return response;
};

const completedInterview = async (interviewId) => {
  const serviceUrl = urlConstant.endpoint.interview.completeInterview.replace("${interviewId}", interviewId);
  const response = await axiosLocalHost
    .sendAuthorizedRequest(serviceUrl, 'PUT', interviewId);
  return response;
}

const updateInterview = async (
  interviewId,
  title,
  description,
  dateOfInterview,
  startTime,
  endTime
) => {
  const serviceUrl = urlConstant.endpoint.interview.updateInterview.replace("${interviewId}", interviewId);
  const response = await axiosLocalHost
    .sendAuthorizedRequest(serviceUrl, 'PUT', {
      interviewId,
      title,
      description,
      dateOfInterview,
      startTime,
      endTime,
    });
  return response;
};

const cancelInterview = async (
  interviewId
) => {
  const serviceUrl = urlConstant.endpoint.interview.cancelInterview.replace("${interviewId}", interviewId);
  const response = await axiosLocalHost
    .sendAuthorizedRequest(serviceUrl, 'PUT', interviewId);
  return response;
};

export default {
  createAnInterview,
  getListInterviewByRequestId,
  getAllInterviewByHRAndPaging,
  getDetailInterviewByInterviewId,
  getAllInterviewByHRAndRequestIdAndPaging,
  getAllInterviewByManagerAndPaging,
  approvalByManager,
  completedInterview,
  updateInterview,
  cancelInterview,
};
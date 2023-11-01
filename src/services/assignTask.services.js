import urlConstant from "../Common/urlConstant";
import utils from "../utils/customAxios";

const createAssignTask = async (
  userId,
  devIds,
  taskTitle,
  description,
  deadline
) => {
  const serviceUrl = urlConstant.endpoint.assignTask.createAssignTask;
  const response = await utils.axiosLocalHost.post(serviceUrl, {
    userId,
    devIds,
    taskTitle,
    description,
    deadline,
  });
  return response;
};

const getAssignTaskDetail = async (taskId) => {
  const serviceUrl =
    urlConstant.endpoint.assignTask.getAssignTaskDetail.replace(
      "${taskId}",
      taskId
    );
  const response = await utils.axiosLocalHost.get(serviceUrl);
  return response;
};
//-----------------------------------------------------------------------------------------
const getAllAssignTaskForManager = async () => {
  const serviceUrl = urlConstant.endpoint.assignTask.getAllAssignTaskForManager;
  const response = await utils.axiosLocalHost.get(serviceUrl);
  return response;
};

const getPagingAssignTaskForManager = async (PageIndex, PageSize) => {
  const serviceUrl =
    urlConstant.endpoint.assignTask.getAllAssignTaskForManager + "?";
  const pagingUrl =
    urlConstant.endpoint.assignTask.getPagingAssignTaskForManager
      .replace("${PageIndex}", PageIndex)
      .replace("${PageSize}", PageSize);
  const fullUrl = serviceUrl + pagingUrl;
  const response = await utils.axiosLocalHost.get(fullUrl);
  return response;
};
//----------------------------------------------------------------------------------------
const getAllAssignTaskForStaff = async () => {
  const serviceUrl = urlConstant.endpoint.assignTask.getAllAssignTaskForStaff;
  const response = await utils.axiosLocalHost.get(serviceUrl);
  return response;
};

const getPagingAssignTaskForStaffWithId = async (
  staffId,
  PageIndex,
  PageSize
) => {
  const serviceUrl = urlConstant.endpoint.assignTask.getAllAssignTaskForStaff;

  const pagingUrl =
    urlConstant.endpoint.assignTask.getPagingAssignTaskForStaffWithId
      .replace("${staffId}", staffId)
      .replace("${PageIndex}", PageIndex)
      .replace("${PageSize}", PageSize);
  const fullUrl = serviceUrl + pagingUrl;
  const response = await utils.axiosLocalHost.get(fullUrl);
  return response;
};

//---------------------------------------------------------------

const handleCompleteTask = async (taskId) => {
  const serviceUrl = urlConstant.endpoint.assignTask.handleCompleteTask.replace(
    "${taskId}",
    taskId
  );
  const response = await utils.axiosLocalHost.put(serviceUrl);
  return response;
};

//------------------------------------------------------------------------------

const handleApproveAssignTask = async (taskId, rejectionReason, isApproval) => {
  const serviceUrl = urlConstant.endpoint.assignTask.handleApproveAssignTask;
  const response = await utils.axiosLocalHost.put(serviceUrl, {
    taskId,
    rejectionReason,
    isApproval,
  });
  return response;
};

export default {
  createAssignTask,
  getAssignTaskDetail,
  getAllAssignTaskForManager,
  getPagingAssignTaskForManager,
  getAllAssignTaskForStaff,
  getPagingAssignTaskForStaffWithId,
  handleCompleteTask,
  handleApproveAssignTask,
};

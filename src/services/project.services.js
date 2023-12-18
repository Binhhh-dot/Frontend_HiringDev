import urlConstant from "../Common/urlConstant";
import axiosLocalHost from "../utils/customAxios";

const getProjectList = async () => {
  const serviceUrl = urlConstant.endpoint.project.getProjectList;
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET"
  );
  return response;
};

const getProjectListPaging = async (PageIndex, PageSize) => {
  const serviceUrl = urlConstant.endpoint.project.getProjectList + "?";
  const pagingUrl = urlConstant.endpoint.project.getProjectListPaging
    .replace("${PageIndex}", PageIndex)
    .replace("${PageSize}", PageSize);
  const fullUrl = serviceUrl + pagingUrl;
  const response = await axiosLocalHost.sendAuthorizedRequest(fullUrl, "GET");
  return response;
};

const createProject = async (
  companyId,
  projectName,
  projectTypeId,
  status,
  startDate,
  endDate,
  description
) => {
  const serviceUrl = urlConstant.endpoint.project.createProject;
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "POST",
    {
      companyId,
      projectName,
      projectTypeId,
      status,
      startDate,
      endDate,
      description,
    }
  );
  return response;
};

const getAllProjectByCompanyId = async (companyId) => {
  const serviceUrl =
    urlConstant.endpoint.project.getAllProjectByCompanyId.replace(
      "${companyId}",
      companyId
    );
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET"
  );
  return response;
};

const getProjectDetailByProjectId = async (projectId) => {
  const serviceUrl =
    urlConstant.endpoint.project.getProjectDetailByProjectId.replace(
      "${projectId}",
      projectId
    );
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET"
  );
  return response;
};

const getDeveloperByProject = async (ProjectId) => {
  const serviceUrl = urlConstant.endpoint.project.getDeveloperByProject.replace(
    "${ProjectId}",
    ProjectId
  );

  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET"
  );
  return response;
};

const updateProject = async (projectId, formData) => {
  const serviceUrl = urlConstant.endpoint.project.updateProject.replace(
    "${projectId}",
    projectId
  );
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "PUT",
    formData,
    config
  );
  return response;
};

const getAllProjectByCompanyIdAndPaging = async (
  companyId,
  PageIndex,
  PageSize,
  ProjectTypeId,
  inputSearch,
  status
) => {
  const serviceUrl =
    urlConstant.endpoint.project.getAllProjectByCompanyIdAndPaging
      .replace("${companyId}", companyId)
      .replace("{PageIndex}", PageIndex)
      .replace("{PageSize}", PageSize)
      .replace("${ProjectTypeId}", ProjectTypeId)
      .replace("${searchKeyString}", inputSearch)
      .replace("${Status}", status);
  console.log(serviceUrl);
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET"
  );
  return response;
};

const updateImage = async (formData, projectId) => {
  const serviceUrl = urlConstant.endpoint.project.updateImage.replace(
    "${projectId}",
    projectId
  );
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  console.log(serviceUrl);
  const response = await axiosLocalHost.normalRequest.sendAuthorizedRequest(
    serviceUrl,
    "PUT",
    formData,
    config
  );
  console.log(response);
  return response;
};

const getProjectLisPreparingtPaging = async (PageIndex, PageSize) => {
  const serviceUrl = urlConstant.endpoint.project.getProjectList + "?";
  const pagingUrl = urlConstant.endpoint.project.getProjectLisPreparingtPaging
    .replace("${PageIndex}", PageIndex)
    .replace("${PageSize}", PageSize);
  const fullUrl = serviceUrl + pagingUrl;
  const response = await axiosLocalHost.sendAuthorizedRequest(fullUrl, "GET");

  return response;
};

const getProjectListInprogressPaging = async (PageIndex, PageSize) => {
  const serviceUrl = urlConstant.endpoint.project.getProjectList + "?";
  const pagingUrl = urlConstant.endpoint.project.getProjectListInprogressPaging
    .replace("${PageIndex}", PageIndex)
    .replace("${PageSize}", PageSize);
  const fullUrl = serviceUrl + pagingUrl;
  const response = await axiosLocalHost.sendAuthorizedRequest(fullUrl, "GET");

  return response;
};

const getProjectListClosingProcessPaging = async (PageIndex, PageSize) => {
  const serviceUrl = urlConstant.endpoint.project.getProjectList + "?";
  const pagingUrl =
    urlConstant.endpoint.project.getProjectListClosingProcessPaging
      .replace("${PageIndex}", PageIndex)
      .replace("${PageSize}", PageSize);
  const fullUrl = serviceUrl + pagingUrl;
  const response = await axiosLocalHost.sendAuthorizedRequest(fullUrl, "GET");

  return response;
};

const getProjectListClosedPaging = async (PageIndex, PageSize) => {
  const serviceUrl = urlConstant.endpoint.project.getProjectList + "?";
  const pagingUrl = urlConstant.endpoint.project.getProjectListClosedPaging
    .replace("${PageIndex}", PageIndex)
    .replace("${PageSize}", PageSize);
  const fullUrl = serviceUrl + pagingUrl;
  const response = await axiosLocalHost.sendAuthorizedRequest(fullUrl, "GET");

  return response;
};

const ClosingProcessProjectInManager = async (projectId) => {
  const serviceUrl = urlConstant.endpoint.project.closingProcessProject.replace(
    "${projectId}",
    projectId
  );
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "PUT"
  );
  return response;
};

const closeProjectByHr = async (projectId) => {
  const serviceUrl = urlConstant.endpoint.project.closeProjectByHr.replace(
    "${projectId}",
    projectId
  );
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "PUT"
  );
  return response;
};

export default {
  createProject,
  getAllProjectByCompanyId,
  getProjectDetailByProjectId,
  getProjectList,
  getProjectListPaging,
  getDeveloperByProject,
  updateProject,
  getAllProjectByCompanyIdAndPaging,
  updateImage,
  getProjectLisPreparingtPaging,
  getProjectListInprogressPaging,
  closeProjectByHr,
  getProjectListClosingProcessPaging,
  getProjectListClosedPaging,
  ClosingProcessProjectInManager,
};

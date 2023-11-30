import urlConstant from "../Common/urlConstant";
import utils from "../utils/customAxios";

const getProjectList = async () => {
  const serviceUrl = urlConstant.endpoint.project.getProjectList;
  const response = await utils.axiosLocalHost.get(serviceUrl);
  return response;
};

const getProjectListPaging = async (PageIndex, PageSize) => {
  const serviceUrl = urlConstant.endpoint.project.getProjectList + "?";
  const pagingUrl = urlConstant.endpoint.project.getProjectListPaging
    .replace("${PageIndex}", PageIndex)
    .replace("${PageSize}", PageSize);
  const fullUrl = serviceUrl + pagingUrl;
  const response = await utils.axiosLocalHost.get(fullUrl);
  return response;
};

const createProject = async (formData) => {
  const serviceUrl = urlConstant.endpoint.project.createProject;
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await utils.axiosLocalHost.post(
    serviceUrl,
    formData,
    config
  );
  return response;
};

const getAllProjectByCompanyId = async (companyId) => {
  const serviceUrl =
    urlConstant.endpoint.project.getAllProjectByCompanyId.replace(
      "${companyId}",
      companyId
    );
  const response = await utils.axiosLocalHost.get(serviceUrl);
  return response;
};

const getProjectDetailByProjectId = async (projectId) => {
  const serviceUrl =
    urlConstant.endpoint.project.getProjectDetailByProjectId.replace(
      "${projectId}",
      projectId
    );
  const response = await utils.axiosLocalHost.get(serviceUrl);
  return response;
};

const getDeveloperByProject = async (projectId) => {
  const serviceUrl = urlConstant.endpoint.project.getDeveloperByProject.replace(
    "${projectId}",
    projectId
  );
  const response = await utils.axiosLocalHost.get(serviceUrl);
  return response;
};

const updateProject = async (
  projectId,
  ProjectId,
  ProjectTypeId,
  ProjectName,
  Description,
  StartDate,
  EndDate
) => {
  const serviceUrl = urlConstant.endpoint.project.updateProject.replace(
    "${projectId}",
    projectId
  );
  const response = await utils.axiosLocalHost.put(serviceUrl, {
    ProjectId,
    ProjectTypeId,
    ProjectName,
    Description,
    StartDate,
    EndDate,
  });

  return response;
};

const getAllProjectByCompanyIdAndPaging = async (companyId, PageIndex, PageSize) => {
  const serviceUrl =
    urlConstant.endpoint.project.getAllProjectByCompanyIdAndPaging.replace(
      "${companyId}", companyId).replace("{PageIndex}", PageIndex).replace("{PageSize}", PageSize);
  const response = await utils.axiosLocalHost.get(serviceUrl);
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
  getAllProjectByCompanyIdAndPaging
};

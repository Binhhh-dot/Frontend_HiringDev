import urlConstant from "../Common/urlConstant";
import utils from "../utils/customAxios";
import axiosLocalHost from "../utils/customAxios";


const getDashboard = async () => {
    const serviceUrl = urlConstant.endpoint.dashboard.getDashboard;
    const response = await axiosLocalHost.sendAuthorizedRequest(serviceUrl, 'GET');
    return response;
};
const getDashboardRecentHiringRequest = async () => {
    const serviceUrl = urlConstant.endpoint.dashboard.getDashboardRecentHiringRequest;
    const response = await axiosLocalHost.sendAuthorizedRequest(serviceUrl, 'GET');
    return response;
};

const getDashboardHiringRequest = async (dateInWeek) => {
    const serviceUrl = urlConstant.endpoint.dashboard.getDashboardHiringRequest.replace("${dateInWeek}", dateInWeek);
    const response = await axiosLocalHost.sendAuthorizedRequest(serviceUrl, 'GET');
    return response
}

const getDashboardProject = async (dateInWeek) => {
    const serviceUrl = urlConstant.endpoint.dashboard.getDashboardProject.replace("${dateInWeek}", dateInWeek);
    const response = await axiosLocalHost.sendAuthorizedRequest(serviceUrl, 'GET');
    return response
}

const getDashboardProjectByProjectId = async (projectId) => {
    const serviceUrl = urlConstant.endpoint.dashboard.getDashboardProjectByProjectId.replace("${projectId}", projectId);
    const response = await axiosLocalHost.sendAuthorizedRequest(serviceUrl, 'GET');
    return response
}

export default {
    getDashboard,
    getDashboardRecentHiringRequest,
    getDashboardHiringRequest,
    getDashboardProject,
    getDashboardProjectByProjectId
}
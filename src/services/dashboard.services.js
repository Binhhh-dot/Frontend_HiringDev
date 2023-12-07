import urlConstant from "../Common/urlConstant";
import utils from "../utils/customAxios";

const getDashboard = async () => {
    const serviceUrl = urlConstant.endpoint.dashboard.getDashboard;
    const response = await utils.axiosLocalHost.get(serviceUrl);
    return response;
};
const getDashboardRecentHiringRequest = async () => {
    const serviceUrl = urlConstant.endpoint.dashboard.getDashboardRecentHiringRequest;
    const response = await utils.axiosLocalHost.get(serviceUrl);
    return response;
};

const getDashboardHiringRequest = async (dateInWeek) => {
    const serviceUrl = urlConstant.endpoint.dashboard.getDashboardHiringRequest.replace("${dateInWeek}", dateInWeek);
    const response = await utils.axiosLocalHost.get(serviceUrl)
    return response
}

const getDashboardProject = async (dateInWeek) => {
    const serviceUrl = urlConstant.endpoint.dashboard.getDashboardProject.replace("${dateInWeek}", dateInWeek);
    const response = await utils.axiosLocalHost.get(serviceUrl)
    return response
}

export default {
    getDashboard,
    getDashboardRecentHiringRequest,
    getDashboardHiringRequest,
    getDashboardProject
}
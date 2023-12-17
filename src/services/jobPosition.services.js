import urlConstant from "../Common/urlConstant"
import axiosLocalHost from "../utils/customAxios";


const createJobPosition = async (projectId, positionName) => {
    const serviceUrl = urlConstant.endpoint.jobPosition.createJobPosition;
    const response = await axiosLocalHost
        .sendAuthorizedRequest(serviceUrl, 'POST', { projectId, positionName });
    return response
}

const getJobPostionByProjectId = async (projectId) => {
    const serviceUrl = urlConstant.endpoint.jobPosition.getJobPositionByProjectId.replace("${projectId}", projectId);
    const response = await axiosLocalHost
        .sendAuthorizedRequest(serviceUrl, 'GET', projectId);
    return response
}

const getJobPositionsWithHiringRequest = async (projectId) => {
    const serviceUrl = urlConstant.endpoint.jobPosition.getJobPositionsWithHiringRequest.replace("${projectId}", projectId);
    const response = await axiosLocalHost.normalRequest.get(serviceUrl, projectId)
    return response
}

const deleteJobPosition = async (jobPositionId) => {
    const serviceUrl = urlConstant.endpoint.jobPosition.deleteJobPosition.replace("${jobPosition}", jobPositionId);
    const response = await axiosLocalHost.normalRequest.delete(serviceUrl, jobPositionId)
    return response
}



export default {
    createJobPosition,
    getJobPostionByProjectId,
    getJobPositionsWithHiringRequest,
    deleteJobPosition
}
import urlConstant from "../Common/urlConstant"
import utils from "../utils/customAxios"


const createJobPosition = async (projectId, positionName) => {
    const serviceUrl = urlConstant.endpoint.jobPosition.createJobPosition;
    const response = await utils.axiosLocalHost.post(serviceUrl, { projectId, positionName })
    return response
}

const getJobPostionByProjectId = async (projectId) => {
    const serviceUrl = urlConstant.endpoint.jobPosition.getJobPositionByProjectId.replace("${projectId}", projectId);
    const response = await utils.axiosLocalHost.get(serviceUrl, projectId)
    return response
}

const getJobPositionsWithHiringRequest = async (projectId) => {
    const serviceUrl = urlConstant.endpoint.jobPosition.getJobPositionsWithHiringRequest.replace("${projectId}", projectId);
    const response = await utils.axiosLocalHost.get(serviceUrl, projectId)
    return response
}


export default {
    createJobPosition,
    getJobPostionByProjectId,
    getJobPositionsWithHiringRequest
}
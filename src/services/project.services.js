import urlConstant from "../Common/urlConstant"
import utils from "../utils/customAxios"

const createProject = async (formData) => {
    const serviceUrl = urlConstant.endpoint.project.createProject;
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }
    const response = await utils.axiosLocalHost.post(serviceUrl,
        formData, config
    )
    return response
}

const getAllProjectByCompanyId = async (companyId) => {
    const serviceUrl = urlConstant.endpoint.project.getAllProjectByCompanyId.replace("${companyId}", companyId);
    const response = await utils.axiosLocalHost.get(serviceUrl);
    return response;
};

const getProjectDetailByProjectId = async (projectId) => {
    const serviceUrl = urlConstant.endpoint.project.getProjectDetailByProjectId.replace("${projectId}", projectId);
    const response = await utils.axiosLocalHost.get(serviceUrl);
    return response;
}

export default {
    createProject,
    getAllProjectByCompanyId,
    getProjectDetailByProjectId
}
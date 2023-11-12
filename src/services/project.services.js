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

export default {
    createProject
}
import urlConstant from "../Common/urlConstant"
import utils from "../utils/customAxios"

const getUserById = async (userId) => {
    const serviceUrl = urlConstant.endpoint.user.getUserById.replace("${userId}", userId);
    const response = await utils.axiosLocalHost.get(serviceUrl)
    return response
}

const updateUser = async (formData, userId) => {
    const serviceUrl = urlConstant.endpoint.user.updateUser.replace("${userId}", userId);
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }
    const response = await utils.axiosLocalHost.put(serviceUrl, formData, config)

    return response
}

export default {
    getUserById,
    updateUser
}
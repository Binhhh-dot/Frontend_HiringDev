import urlConstant from "../Common/urlConstant"
import utils from "../utils/customAxios"

const getUserById = async (userId) => {
    const serviceUrl = urlConstant.endpoint.user.getUserById.replace("${userId}", userId);
    const response = await utils.axiosLocalHost.get(serviceUrl)
    return response
}

export default {
    getUserById
}
import urlConstant from "../Common/urlConstant"
import utils from "../utils/customAxios"

const getAllLevel = async () => {
    const serviceUrl = urlConstant.endpoint.level.getAll;
    const response = await utils.axiosLocalHost.get(serviceUrl)
    return response
}

export default {
    getAllLevel
}
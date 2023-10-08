import urlConstant from "../Common/urlConstant"
import utils from "../utils/customAxios"

const getAllType = async () => {
    const serviceUrl = urlConstant.endpoint.type.getAll;
    const response = await utils.axiosLocalHost.get(serviceUrl)
    return response
}

export default {
    getAllType
}
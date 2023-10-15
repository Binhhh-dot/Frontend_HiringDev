import urlConstant from "../Common/urlConstant"
import utils from "../utils/customAxios"

const getAllEmploymentType = async () => {
    const serviceUrl = urlConstant.endpoint.employmentType.getAll;
    const response = await utils.axiosLocalHost.get(serviceUrl)
    return response
}

export default {
    getAllEmploymentType
}
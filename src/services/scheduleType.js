import urlConstant from "../Common/urlConstant"
import utils from "../utils/customAxios"

const getAllScheduleType = async () => {
    const serviceUrl = urlConstant.endpoint.scheduleType.getAll;
    const response = await utils.axiosLocalHost.get(serviceUrl)
    return response
}

export default {
    getAllScheduleType
}
import urlConstant from "../Common/urlConstant"
import axiosLocalHost from "../utils/customAxios";

const getAllScheduleType = async () => {
    const serviceUrl = urlConstant.endpoint.scheduleType.getAll;
    const response = await axiosLocalHost.sendAuthorizedRequest(serviceUrl, 'GET');
    return response
}

export default {
    getAllScheduleType
}
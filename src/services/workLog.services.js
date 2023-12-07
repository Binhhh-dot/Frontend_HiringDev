import urlConstant from "../Common/urlConstant"
import axiosLocalHost from "../utils/customAxios";

const getWorkLogByPaySlipId = async (paySlipId) => {
    const serviceUrl = urlConstant.endpoint.workLog.getWorkLogByPaySlipId.replace("${paySlipId}", paySlipId);
    const response = await axiosLocalHost.sendAuthorizedRequest(serviceUrl, 'GET')
    return response
}

const updateWorkLog = async (workLogId, timeIn, timeOut, isPaidLeave) => {
    const serviceUrl = urlConstant.endpoint.workLog.updateWorkLog;
    const response = await axiosLocalHost.sendAuthorizedRequest(serviceUrl, 'PUT', { workLogId, timeIn, timeOut, isPaidLeave })
    return response
}

export default {
    getWorkLogByPaySlipId,
    updateWorkLog,
}
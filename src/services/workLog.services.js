import urlConstant from "../Common/urlConstant"
import utils from "../utils/customAxios"

const getWorkLogByPaySlipId = async (paySlipId) => {
    const serviceUrl = urlConstant.endpoint.workLog.getWorkLogByPaySlipId.replace("${paySlipId}", paySlipId);
    const response = await utils.axiosLocalHost.get(serviceUrl)
    return response
}

const updateWorkLog = async (workLogId, timeIn, timeOut, isPaidLeave) => {
    const serviceUrl = urlConstant.endpoint.workLog.updateWorkLog;
    const response = await utils.axiosLocalHost.put(serviceUrl, { workLogId, timeIn, timeOut, isPaidLeave })
    return response
}

export default {
    getWorkLogByPaySlipId,
    updateWorkLog,
}
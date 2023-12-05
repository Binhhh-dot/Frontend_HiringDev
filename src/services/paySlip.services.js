import urlConstant from "../Common/urlConstant"
import utils from "../utils/customAxios"

const getPaySlipByPayPeriodId = async (payPeriodId) => {
    const serviceUrl = urlConstant.endpoint.paySlip.getPaySlipByPayPeriodId.replace("${payPeriodId}", payPeriodId);
    const response = await utils.axiosLocalHost.get(serviceUrl)
    return response
}

const updateTotalOTPayslip = async (paySlipId, totalOvertimeHours) => {
    const serviceUrl = urlConstant.endpoint.paySlip.updateTotalOTPaySlip;
    const response = await utils.axiosLocalHost.put(serviceUrl, { paySlipId, totalOvertimeHours })
    return response
}

export default {
    getPaySlipByPayPeriodId,
    updateTotalOTPayslip
}
import urlConstant from "../Common/urlConstant"
import axiosLocalHost from "../utils/customAxios";

const getPaySlipByPayPeriodId = async (payPeriodId) => {
    const serviceUrl = urlConstant.endpoint.paySlip.getPaySlipByPayPeriodId.replace("${payPeriodId}", payPeriodId);
    const response = await axiosLocalHost.normalRequest.get(serviceUrl)
    return response
}

const updateTotalOTPayslip = async (paySlipId, totalOvertimeHours) => {
    const serviceUrl = urlConstant.endpoint.paySlip.updateTotalOTPaySlip;
    const response = await axiosLocalHost.normalRequest.put(serviceUrl, { paySlipId, totalOvertimeHours })
    return response
}

export default {
    getPaySlipByPayPeriodId,
    updateTotalOTPayslip
} 
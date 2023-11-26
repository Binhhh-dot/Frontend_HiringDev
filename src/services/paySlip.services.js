import urlConstant from "../Common/urlConstant"
import utils from "../utils/customAxios"

const getPaySlipByPayPeriodId = async (payPeriodId) => {
    const serviceUrl = urlConstant.endpoint.paySlip.getPaySlipByPayPeriodId.replace("${payPeriodId}", payPeriodId);
    const response = await utils.axiosLocalHost.get(serviceUrl)
    return response
}

export default {
    getPaySlipByPayPeriodId
}
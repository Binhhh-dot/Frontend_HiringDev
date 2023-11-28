import urlConstant from "../Common/urlConstant"
import utils from "../utils/customAxios"

const createPayment = async (payPeriodId, payerId, description, returnUrl) => {
    const serviceUrl = urlConstant.endpoint.payment.createPayment;
    const response = await utils.axiosLocalHost.post(serviceUrl, { payPeriodId, payerId, description, returnUrl })
    return response
}

const executePayment = async (paymentId, payerId) => {
    const serviceUrl = urlConstant.endpoint.payment.executePayment.replace("${paymentId}", paymentId).replace("${payerId}", payerId);
    const response = await utils.axiosLocalHost.post(serviceUrl, { paymentId, payerId })
    return response
}

export default {
    createPayment,
    executePayment
}
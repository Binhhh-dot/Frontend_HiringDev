import urlConstant from "../Common/urlConstant"
import axiosLocalHost from "../utils/customAxios";

const createPayment = async (payPeriodId, payerId, description, returnUrl) => {
    const serviceUrl = urlConstant.endpoint.payment.createPayment;
    const response = await axiosLocalHost.normalRequest.post(serviceUrl, { payPeriodId, payerId, description, returnUrl })
    return response
}

const executePayment = async (paymentId, payerId) => {
    const serviceUrl = urlConstant.endpoint.payment.executePayment.replace("${paymentId}", paymentId).replace("${payerId}", payerId);
    const response = await axiosLocalHost.normalRequest.post(serviceUrl, { paymentId, payerId })
    return response
}

export default {
    createPayment,
    executePayment
} 
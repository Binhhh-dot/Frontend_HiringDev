import urlConstant from "../Common/urlConstant"
import utils from "../utils/customAxios"

const getPreContract = async (developerId, requestId) => {
    const serviceUrl = urlConstant.endpoint.contract.getPreContract.replace("${developerId}", developerId).replace("${requestId}", requestId);
    const response = await utils.axiosLocalHost.get(serviceUrl, { developerId, requestId })
    return response
}

export default {
    getPreContract
}
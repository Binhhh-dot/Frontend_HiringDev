import urlConstant from "../Common/urlConstant";
import utils from "../utils/customAxios";

const getListDeveloperInRequestByRequestId = async (
    requestId
) => {
    const serviceUrl =
        urlConstant.endpoint.hiredDev.getListDeveloperInRequestByRequestId
            .replace("${requestId}", requestId)
    const response = await utils.axiosLocalHost.get(serviceUrl);
    return response;
}

export default {
    getListDeveloperInRequestByRequestId
};

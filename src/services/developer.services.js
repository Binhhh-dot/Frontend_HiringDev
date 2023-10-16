import urlConstant from "../Common/urlConstant";
import utils from "../utils/customAxios";

const GetAllSelectedDevByHR = async (hiringRequestId) => {
    const serviceUrl = urlConstant.endpoint.developer.GetAllSelectedDevByHR.replace("${hiringRequestId}", hiringRequestId);
    const response = await utils.axiosLocalHost.get(serviceUrl);
    return response;
};


export default {
    GetAllSelectedDevByHR
};
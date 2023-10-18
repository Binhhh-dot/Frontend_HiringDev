import urlConstant from "../Common/urlConstant";
import utils from "../utils/customAxios";

const GetAllSelectedDevByHR = async (hiringRequestId) => {
    const serviceUrl = urlConstant.endpoint.selectingDeveloper.getAllSelectedDevByHR.replace("${hiringRequestId}", hiringRequestId);
    const response = await utils.axiosLocalHost.get(serviceUrl);
    return response;
};

const approvalInterviewByHR = async (requestId, developerId, isApproved) => {
    const serviceUrl = urlConstant.endpoint.selectingDeveloper.approvalByHR;
    const response = await utils.axiosLocalHost.put(serviceUrl, { requestId, developerId, isApproved });
    return response;
};

const approvalOnboardingByHR = async (requestId, developerId, isApproved) => {
    const serviceUrl = urlConstant.endpoint.selectingDeveloper.onboarnding;
    const response = await utils.axiosLocalHost.put(serviceUrl, { requestId, developerId, isApproved });
    return response;
};


export default {
    GetAllSelectedDevByHR,
    approvalInterviewByHR,
    approvalOnboardingByHR,
};
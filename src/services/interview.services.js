import urlConstant from "../Common/urlConstant"
import utils from "../utils/customAxios"

const createAnInterview = async (
    requestId,
    title,
    description,
    dateOfInterview,
    startTime,
    endTime
) => {
    const serviceUrl = urlConstant.endpoint.interview.createAnInterview;
    const response = await utils.axiosLocalHost.post(serviceUrl, {
        requestId,
        title,
        description,
        dateOfInterview,
        startTime,
        endTime,
    });
    return response;
};

const getListInterviewByRequestId = async (requestId) => {
    const serviceUrl = urlConstant.endpoint.interview.getListInterviewByRequestId.replace("${requestId}", requestId);
    const response = await utils.axiosLocalHost.get(serviceUrl, {
        requestId,
    });
    return response;
}

export default {
    createAnInterview,
    getListInterviewByRequestId
}
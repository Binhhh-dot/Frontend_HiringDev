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

const getAllInterviewByHRAndPaging = async (companyId, pageSize, pageIndex) => {
    const serviceUrl = urlConstant.endpoint.interview.getAllInterviewByHRAndPaging
        .replace("${companyId}", companyId)
        .replace("${PageSize}", pageSize)
        .replace("${PageIndex}", pageIndex)
        ;
    const response = await utils.axiosLocalHost.get(serviceUrl);
    return response;
}

const getAllInterviewByHRAndRequestIdAndPaging = async (companyId, requestId, pageSize, pageIndex) => {
    const serviceUrl = urlConstant.endpoint.interview.getAllInterviewByHRAndRequestIdAndPaging
        .replace("${companyId}", companyId)
        .replace("${PageSize}", pageSize)
        .replace("${PageIndex}", pageIndex)
        .replace("${requestId}", requestId)
        ;
    const response = await utils.axiosLocalHost.get(serviceUrl);
    return response;
}

const getDetailInterviewByInterviewId = async (interviewId, PageSize, PageIndex) => {
    const serviceUrl = urlConstant.endpoint.interview.getDetailInterviewByInterviewId
        .replace("${InterviewId}", interviewId)
        .replace("${PageSize}", PageSize)
        .replace("${PageIndex}", PageIndex);
    const response = await utils.axiosLocalHost.get(serviceUrl, interviewId);
    return response;
}

const getAllInterviewByManagerAndPaging = async (pageSize, pageIndex) => {
    const serviceUrl = urlConstant.endpoint.interview.getAllInterviewByManagerAndPaging
        .replace("${PageSize}", pageSize)
        .replace("${PageIndex}", pageIndex)
        ;
    const response = await utils.axiosLocalHost.get(serviceUrl);
    return response;
}


export default {
    createAnInterview,
    getListInterviewByRequestId,
    getAllInterviewByHRAndPaging,
    getDetailInterviewByInterviewId,
    getAllInterviewByHRAndRequestIdAndPaging,
    getAllInterviewByManagerAndPaging
}
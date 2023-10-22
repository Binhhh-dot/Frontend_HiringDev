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

const getListDevWaitingInterview = async (requestId) => {
    const serviceUrl = urlConstant.endpoint.developer.getListDevWaitingInterview.replace("${requestId}", requestId);
    const response = await utils.axiosLocalHost.get(serviceUrl);
    return response;
};

const rejectSelectedDev = async (requestId, developerId) => {
    const serviceUrl = urlConstant.endpoint.selectingDeveloper.rejectSelectedDev.replace("${requestId}", requestId).replace("${developerId}", developerId);
    const response = await utils.axiosLocalHost.put(serviceUrl, { requestId, developerId });
    return response;
};

const appectDevToInterview = async (requestId) => {
    const serviceUrl = urlConstant.endpoint.selectingDeveloper.accpectDevToInterview.replace("${requestId}", requestId);
    const response = await utils.axiosLocalHost.put(serviceUrl, requestId);
    return response;
};

const CreateDeveloperAccount = async (firstName, lastName, email, phoneNumber, genderId, dateOfBirth, yearOfExperience, averageSalary, cvid, scheduleTypeId, employmentTypeId, levelId, types, skills) => {
    const serviceUrl = urlConstant.endpoint.developer.createDeveloper;
    const response = await utils.axiosLocalHost.post(serviceUrl, { firstName, lastName, email, phoneNumber, genderId, dateOfBirth, yearOfExperience, averageSalary, cvid, scheduleTypeId, employmentTypeId, levelId, types, skills });
    return response;
};

export default {
    GetAllSelectedDevByHR, approvalInterviewByHR,
    approvalOnboardingByHR,
    getListDevWaitingInterview,
    rejectSelectedDev,
    appectDevToInterview,
    CreateDeveloperAccount
};
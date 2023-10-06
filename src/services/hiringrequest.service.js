import urlConstant from "../Common/urlConstant"
import utils from "../utils/customAxios"

const createHiringRequest = async (jobTitle, jobDescription, numberOfDev, salaryPerDev, duration, typeRequireId, levelRequireId, skills, isSaved, companyId) => {
    const serviceUrl = urlConstant.endpoint.hiringRequest.createHiringRequest;
    const response = await utils.axiosLocalHost.post(serviceUrl, { jobTitle, jobDescription, numberOfDev, salaryPerDev, duration, typeRequireId, levelRequireId, skills, isSaved, companyId })
    return response
}

export default {
    createHiringRequest
}
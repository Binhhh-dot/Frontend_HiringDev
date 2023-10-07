import urlConstant from "../Common/urlConstant"
import utils from "../utils/customAxios"

const createHiringRequest = async (jobTitle, jobDescription, numberOfDev, salaryPerDev, duration, typeRequireId, levelRequireId, skills, isSaved, companyId) => {
    const serviceUrl = urlConstant.endpoint.hiringRequest.createHiringRequest;
    const response = await utils.axiosLocalHost.post(serviceUrl, { jobTitle, jobDescription, numberOfDev, salaryPerDev, duration, typeRequireId, levelRequireId, skills, isSaved, companyId })
    return response
}

const getAllHiringRequest = async () => {
    const serviceUrl = urlConstant.endpoint.hiringRequest.getAll;
    const response = await utils.axiosLocalHost.get(serviceUrl);
    return response;
}

const getHiringRequestAndPaging = async (currentPage, pageSize) => {
    const serviceUrl = urlConstant.endpoint.hiringRequest.getAll + "?";
    const pagingUrl = urlConstant.endpoint.hiringRequest.paging
        .replace("${currentPage}", currentPage)
        .replace("${pageSize}", pageSize);
    const fullUrl = serviceUrl + pagingUrl;
    const response = await utils.axiosLocalHost.get(fullUrl);
    return response;
}

const getAllHiringRequestByJobTitleAndSkill = async (currentPage, pageSize, jobTitle, skill, level) => {
    const serviceUrl = urlConstant.endpoint.hiringRequest.getAll + "?";
    const pagingUrl = urlConstant.endpoint.hiringRequest.paging
        .replace("${currentPage}", currentPage)
        .replace("${pageSize}", pageSize);
    let fullUrl = serviceUrl + pagingUrl;

    if (jobTitle) {
        const searchUrl = urlConstant.endpoint.hiringRequest.searchJobTitle
            .replace("${search}", jobTitle);
        fullUrl += searchUrl;
    }
    if (level) {
        const levelUrl = urlConstant.endpoint.hiringRequest.searchLevel
            .replace("${LevelRequireId}", level);
        fullUrl += levelUrl;
    }

    if (skill && skill.length > 0) {
        const skillUrls = skill.map(item => "&SkillIds=" + item.value);
        const fullUrls = skillUrls.join("&");
        fullUrl += fullUrls;
    }
    const response = await utils.axiosLocalHost.get(fullUrl);
    console.log(fullUrl)
    return response;
}



export default {
    createHiringRequest,
    getAllHiringRequest,
    getHiringRequestAndPaging,
    getAllHiringRequestByJobTitleAndSkill
}
import urlConstant from "../Common/urlConstant"
import axiosLocalHost from "../utils/customAxios"

const getAllSkill = async () => {
    const serviceUrl = urlConstant.endpoint.skill.getAll;
    const response = await axiosLocalHost.normalRequest.get(serviceUrl)
    return response
}

const createSkill = async (
    skillName,
    skillDescription,
) => {
    const serviceUrl = urlConstant.endpoint.skill.postSkill;
    const response = await axiosLocalHost.normalRequest.post(serviceUrl, {
        skillName,
        skillDescription,
    });
    return response;
};

const updateSkill = async (
    skillId,
    skillName,
    skillDescription,
    status,
) => {
    const serviceUrl =
        urlConstant.endpoint.skill.editSkill;
    const response = await axiosLocalHost.normalRequest.put(serviceUrl, {
        skillId,
        skillName,
        skillDescription,
        status,
    });
    return response;
};
const deleteSkill = async (skillId) => {
    const serviceUrl = urlConstant.endpoint.skill.deleteSkill.replace("${skillId}", skillId);
    const response = await axiosLocalHost.normalRequest.delete(serviceUrl)
    return response
}

export default {
    getAllSkill,
    createSkill,
    updateSkill,
    deleteSkill
}
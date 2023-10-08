import urlConstant from "../Common/urlConstant"
import utils from "../utils/customAxios"

const getAllSkill = async () => {
    const serviceUrl = urlConstant.endpoint.skill.getAll;
    const response = await utils.axiosLocalHost.get(serviceUrl)
    return response
}

export default {
    getAllSkill
}
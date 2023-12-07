import urlConstant from "../Common/urlConstant"
import axiosLocalHost from "../utils/customAxios";

const getAllEmploymentType = async () => {
    const serviceUrl = urlConstant.endpoint.employmentType.getAll;
    const response = await axiosLocalHost.normalRequest.get(serviceUrl)
    return response
}

export default {
    getAllEmploymentType
}
import urlConstant from "../Common/urlConstant"
import axiosLocalHost from "../utils/customAxios";

const getAllLevel = async () => {
    const serviceUrl = urlConstant.endpoint.level.getAll;
    const response = await axiosLocalHost.normalRequest.get(serviceUrl)
    return response
}

const createLevel = async (
    levelName,
    levelDescription,
) => {
    const serviceUrl = urlConstant.endpoint.level.postLevel;
    const response = await axiosLocalHost.normalRequest.post(serviceUrl, {
        levelName,
        levelDescription,
    });
    return response;
};

const updateLevel = async (
    levelId,
    levelName,
    levelDescription,
    status,
) => {
    const serviceUrl =
        urlConstant.endpoint.level.editLevel;
    const response = await axiosLocalHost.normalRequest.put(serviceUrl, {
        levelId,
        levelName,
        levelDescription,
        status,
    });
    return response;
};

const deleteLevel = async (levelId) => {
    const serviceUrl = urlConstant.endpoint.level.deleteLevel.replace("${levelId}", levelId);
    const response = await axiosLocalHost.normalRequest.delete(serviceUrl)
    return response
}
export default {
    getAllLevel,
    createLevel,
    updateLevel,
    deleteLevel,

}
import urlConstant from "../Common/urlConstant"
import axiosLocalHost from "../utils/customAxios";

const getAllLevel = async () => {
    const serviceUrl = urlConstant.endpoint.level.getAll;
    const response = await axiosLocalHost
        .sendAuthorizedRequest(serviceUrl, 'GET');
    return response
}

const createLevel = async (
    levelName,
    levelDescription,
) => {
    const serviceUrl = urlConstant.endpoint.level.postLevel;
    const response = await axiosLocalHost.normalRequest
        .sendAuthorizedRequest(serviceUrl, 'POST', {
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
    const response = await axiosLocalHost
        .sendAuthorizedRequest(serviceUrl, 'PUT', {
            levelId,
            levelName,
            levelDescription,
            status,
        });
    return response;
};

const deleteLevel = async (levelId) => {
    const serviceUrl = urlConstant.endpoint.level.deleteLevel.replace("${levelId}", levelId);
    const response = await axiosLocalHost
        .sendAuthorizedRequest(serviceUrl, 'DELETE');
    return response
}
export default {
    getAllLevel,
    createLevel,
    updateLevel,
    deleteLevel,

}
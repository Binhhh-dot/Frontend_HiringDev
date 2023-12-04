import urlConstant from "../Common/urlConstant"
import utils from "../utils/customAxios"

const getAllType = async () => {
    const serviceUrl = urlConstant.endpoint.type.getAll;
    const response = await utils.axiosLocalHost.get(serviceUrl)
    return response
}

const createType = async (
    typeName,
    typeDescription,
) => {
    const serviceUrl = urlConstant.endpoint.type.postType;
    const response = await utils.axiosLocalHost.post(serviceUrl, {
        typeName,
        typeDescription,
    });
    return response;
};

const updateType = async (
    typeId,
    typeName,
    typeDescription,
    status,
) => {
    const serviceUrl =
        urlConstant.endpoint.type.editType;
    const response = await utils.axiosLocalHost.put(serviceUrl, {
        typeId,
        typeName,
        typeDescription,
        status,
    });
    return response;
};

const deleteType = async (typeId) => {
    const serviceUrl = urlConstant.endpoint.type.deleteType.replace("${typeId}", typeId);
    const response = await utils.axiosLocalHost.delete(serviceUrl)
    return response
}
export default {
    getAllType,
    createType,
    updateType,
    deleteType
}
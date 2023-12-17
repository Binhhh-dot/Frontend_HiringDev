import urlConstant from "../Common/urlConstant"
import axiosLocalHost from "../utils/customAxios";

const getAllType = async () => {
    const serviceUrl = urlConstant.endpoint.type.getAll;
    const response = await axiosLocalHost.normalRequest.get(serviceUrl)
    return response
}

const createType = async (
    typeName,
    typeDescription,
) => {
    const serviceUrl = urlConstant.endpoint.type.postType;
    const response = await axiosLocalHost.normalRequest.post(serviceUrl, {
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
    const response = await axiosLocalHost.normalRequest.put(serviceUrl, {
        typeId,
        typeName,
        typeDescription,
        status,
    });
    return response;
};

const deleteType = async (typeId) => {
    const serviceUrl = urlConstant.endpoint.type.deleteType.replace("${typeId}", typeId);
    const response = await axiosLocalHost.normalRequest.delete(serviceUrl)
    return response
}
export default {
    getAllType,
    createType,
    updateType,
    deleteType
}
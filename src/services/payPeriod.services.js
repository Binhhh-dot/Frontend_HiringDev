import urlConstant from "../Common/urlConstant"
import axiosLocalHost from "../utils/customAxios";

const exportToExcel = async (projectId, inputDate) => {
    const serviceUrl = urlConstant.endpoint.payPeriod.exportToExcel.replace("${projectId}", projectId).replace("${inputDate}", inputDate);
    const config = {
        responseType: 'blob'
    };
    const response = await axiosLocalHost.normalRequest.get(serviceUrl, config);
    return response
}

const importExcel = async (projectId, formData) => {
    const serviceUrl = urlConstant.endpoint.payPeriod.importExcel.replace("${projectId}", projectId);
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }
    const response = await axiosLocalHost
        .sendAuthorizedRequest(serviceUrl, 'POST', formData, config);
    return response
}

const getPayPeriodDetailByProjectIdAndDate = async (projectId, inputDate) => {
    const serviceUrl = urlConstant.endpoint.payPeriod.getPayPeriodDetailByProjectIdAndDate.replace("${projectId}", projectId).replace("${inputDate}", inputDate);
    const response = await axiosLocalHost.sendAuthorizedRequest(serviceUrl, 'GET');
    return response
}

const createNewPayPeriod = async (projectId, inputDate) => {
    const serviceUrl = urlConstant.endpoint.payPeriod.createNewPayPeriod;
    const response = await axiosLocalHost
        .sendAuthorizedRequest(serviceUrl, 'POST', { projectId, inputDate });
    return response
}

export default {
    exportToExcel,
    importExcel,
    getPayPeriodDetailByProjectIdAndDate,
    createNewPayPeriod
}
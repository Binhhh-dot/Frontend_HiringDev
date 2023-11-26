import urlConstant from "../Common/urlConstant"
import utils from "../utils/customAxios"

const exportToExcel = async (projectId, inputDate) => {
    const serviceUrl = urlConstant.endpoint.payPeriod.exportToExcel.replace("${projectId}", projectId).replace("${inputDate}", inputDate);
    const response = await utils.axiosLocalHost.get(serviceUrl, { responseType: 'blob' })
    return response
}

const importExcel = async (projectId, formData) => {
    const serviceUrl = urlConstant.endpoint.payPeriod.importExcel.replace("${projectId}", projectId);
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }
    const response = await utils.axiosLocalHost.post(serviceUrl, formData, config);
    return response
}

const getPayPeriodDetailByProjectIdAndDate = async (projectId, inputDate) => {
    const serviceUrl = urlConstant.endpoint.payPeriod.getPayPeriodDetailByProjectIdAndDate.replace("${projectId}", projectId).replace("${inputDate}", inputDate);
    const response = await utils.axiosLocalHost.get(serviceUrl);
    return response
}

export default {
    exportToExcel,
    importExcel,
    getPayPeriodDetailByProjectIdAndDate
}
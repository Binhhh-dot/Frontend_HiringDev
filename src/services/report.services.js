import urlConstant from "../Common/urlConstant"
import utils from "../utils/customAxios"

const getReportType = async () => {
    const serviceUrl = urlConstant.endpoint.report.getReportType;
    const response = await utils.axiosLocalHost.get(serviceUrl)
    return response
}

const createReport = async (developerId, projectId, reportTypeId, reportTitle, reportContent) => {
    const serviceUrl = urlConstant.endpoint.report.createReport;
    const response = await utils.axiosLocalHost.post(serviceUrl, { developerId, projectId, reportTypeId, reportTitle, reportContent })
    return response
}

export default {
    getReportType,
    createReport
}
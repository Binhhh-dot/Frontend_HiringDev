import urlConstant from "../Common/urlConstant"
import utils from "../utils/customAxios"

const createCompany = async (formData) => {
    const serviceUrl = urlConstant.endpoint.company.createCompany;
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }
    const response = await utils.axiosLocalHost.post(serviceUrl, formData, config)
    console.log(response);
    return response
}

const updateCompany = async (companyId, formData) => {
    const serviceUrl = urlConstant.endpoint.company.updateCompany.replace("${companyId}", companyId);
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }
    const response = await utils.axiosLocalHost.put(serviceUrl, formData, config)

    return response
}

const getCompanyByCompanyId = async (companyId) => {
    const serviceUrl = urlConstant.endpoint.company.getCompanyByCompanyId.replace("${companyId}", companyId);
    const response = await utils.axiosLocalHost.get(serviceUrl)

    return response
}

export default {
    createCompany,
    getCompanyByCompanyId,
    updateCompany
}
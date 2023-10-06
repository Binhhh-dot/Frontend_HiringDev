import urlConstant from "../Common/urlConstant"
import utils from "../utils/customAxios"

const login = async (email, password) => {
    const serviceUrl = urlConstant.endpoint.auth.login;
    const response = await utils.axiosLocalHost.post(serviceUrl, {
        email,
        password,
    })
    return response
}

export default {
    login,
}
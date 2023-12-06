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
const signUp = async (formData) => {
    const serviceUrl = urlConstant.endpoint.auth.siginUp;
    try {
        const response = await utils.axiosLocalHost.post(serviceUrl, formData);
        console.log("API Response:", response);
        return response;
    } catch (error) {
        console.error("API Error:", error);
        throw error; // Nếu bạn muốn chuyển tiếp lỗi cho phía gọi hàm
    }
}

const revokeAccount = async (userId) => {
    const serviceUrl = urlConstant.endpoint.auth.revoke.replace("${userId}", userId);
    try {
        const response = await utils.axiosLocalHost.delete(serviceUrl, userId);
        console.log("API Response:", response);
        return response;
    } catch (error) {
        console.error("API Error:", error);
        throw error; // Nếu bạn muốn chuyển tiếp lỗi cho phía gọi hàm
    }
}

export default {
    login,
    signUp,
    revokeAccount
}
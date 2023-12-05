import urlConstant from "../Common/urlConstant"
import utils from "../utils/customAxios"

const postUserDevice = async (userId, deviceToken) => {
    const serviceUrl = urlConstant.endpoint.notification.postUserDevice;
    try {
        const response = await utils.axiosLocalHost.post(serviceUrl, { userId, deviceToken });
        return response;
    } catch (error) {
        throw error; // Nếu bạn muốn chuyển tiếp lỗi cho phía gọi hàm
    }
}

const getListNotificationByUserId = async (userId) => {
    const serviceUrl = urlConstant.endpoint.notification.getListNotificationByUserId.replace("${userId}", userId);
    try {
        const response = await utils.axiosLocalHost.get(serviceUrl);
        return response;
    } catch (error) {
        throw error; // Nếu bạn muốn chuyển tiếp lỗi cho phía gọi hàm
    }
}

const getCountNotificationByUserId = async (userId) => {
    const serviceUrl = urlConstant.endpoint.notification.getCountNotificationByUserId.replace("${userId}", userId);
    try {
        const response = await utils.axiosLocalHost.get(serviceUrl);
        return response;
    } catch (error) {
        throw error; // Nếu bạn muốn chuyển tiếp lỗi cho phía gọi hàm
    }
}

export default {
    postUserDevice,
    getListNotificationByUserId,
    getCountNotificationByUserId
}
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

const readNotification = async (notificationId, userId) => {
    const serviceUrl = urlConstant.endpoint.notification.readNotification.replace("${userId}", userId).replace("${notificationId}", notificationId);
    try {
        const response = await utils.axiosLocalHost.put(serviceUrl, { notificationId, userId });
        return response;
    } catch (error) {
        throw error; // Nếu bạn muốn chuyển tiếp lỗi cho phía gọi hàm
    }
}

const unNewNotification = async (userId) => {
    const serviceUrl = urlConstant.endpoint.notification.unNewNotification.replace("${userId}", userId);
    try {
        const response = await utils.axiosLocalHost.put(serviceUrl, { userId });
        return response;
    } catch (error) {
        throw error; // Nếu bạn muốn chuyển tiếp lỗi cho phía gọi hàm
    }
}

const deleteUserDevice = async (userDeviceId) => {
    const serviceUrl = urlConstant.endpoint.notification.deleteUserDevice.replace("${userDeviceId}", userDeviceId);
    try {
        const response = await utils.axiosLocalHost.delete(serviceUrl, { userDeviceId });
        return response;
    } catch (error) {
        throw error; // Nếu bạn muốn chuyển tiếp lỗi cho phía gọi hàm
    }
}

export default {
    postUserDevice,
    getListNotificationByUserId,
    getCountNotificationByUserId,
    readNotification,
    unNewNotification,
    deleteUserDevice
}
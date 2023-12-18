import axios from "axios";
import url from '../Common/urlConstant'

const axiosClient = axios.create({
    baseURL: url.base,
});


const sendAuthorizedRequest = async (url, method, data = null, config = {}) => {
    let accessToken = localStorage.getItem('accessToken');
    const headers = {};

    if (isAccessTokenExpired()) {
        const newAccessToken = await tokensCheckAndRefresh();
        if (!newAccessToken) {
            // clearData();
            deleteUserDevice();
            console.log("het token")
            return; // Dừng hàm tại đây hoặc xử lý tiếp theo tùy theo logic ứng dụng của bạn
        }
        console.log("doi token")
        accessToken = newAccessToken;
    }
    console.log("ko doi token")

    headers['Authorization'] = `Bearer ${accessToken}`;

    try {
        const response = await axiosClient({
            method,
            url,
            headers: { ...headers, ...config.headers },
            data,
        });
        return response;
    } catch (error) {
        // Xử lý lỗi
        console.error("Error fetching data: ", error);
        // clearData();
        throw error;
    }
};

const deleteUserDevice = async () => {
    try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`https://wehireapi.azurewebsites.net/api/UserDevice/User/${userId}`);

        if (response?.status === 200) {
            const deviceToken = localStorage.getItem("deviceToken");
            const foundDevice = response.data.data.find(item => item.deviceToken === deviceToken);

            if (foundDevice) {
                console.log("DeviceToken exists in the list:");
                console.log("UserDeviceId:", foundDevice.userDeviceId);

                const response3 = await axios.delete(`https://wehireapi.azurewebsites.net/api/UserDevice/${foundDevice.userDeviceId}`);
                localStorage.clear();
                // window.location.href = '/signin';
            } else {
                console.log("DeviceToken does not exist in the list.");
                localStorage.clear();
                // window.location.href = '/signin';
            }
        } else {
            localStorage.clear();
            // window.location.href = '/signin';
        }
    } catch (error) {
        localStorage.clear();
        // window.location.href = '/signin';
        console.error('Error refreshing tokens: ', error);
    }
};


const refreshTokenByApi = async (accessToken, refreshToken) => {
    try {
        const response = await axios.post('https://wehireapi.azurewebsites.net/api/Account/Refresh', {
            accessToken,
            refreshToken,
        });

        // Sau khi nhận được response từ API, cập nhật thông tin mới vào localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('accessTokenExp');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('refreshTokenExp');
        localStorage.setItem('accessToken', response.data.data.accessToken);
        localStorage.setItem('accessTokenExp', response.data.data.accessTokenExp);
        localStorage.setItem('refreshToken', response.data.data.refreshToken);
        localStorage.setItem('refreshTokenExp', response.data.data.refreshTokenExp);
        return response.data.data.accessToken;
    } catch (error) {
        console.error('Error refreshing tokens: ', error);
        throw error;
    }
};

const isAccessTokenExpired = () => {
    const accessTokenExp = localStorage.getItem('accessTokenExp');
    const refreshTokenExp = localStorage.getItem('refreshTokenExp');
    if (!accessTokenExp) {
        return true; // Nếu không có thông tin thời hạn, coi như accessToken đã hết hạn
    }
    const accessTokenExpTimestamp = new Date(accessTokenExp).getTime() / 1000;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return currentTimestamp >= accessTokenExpTimestamp;
};

const isRefreshTokenExpired = () => {
    const refreshTokenExp = localStorage.getItem('refreshTokenExp');
    if (!refreshTokenExp) {
        return true; // Nếu không có thông tin thời hạn, coi như refreshToken đã hết hạn
    }
    const refreshTokenExpTimestamp = new Date(refreshTokenExp).getTime() / 1000;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return currentTimestamp >= refreshTokenExpTimestamp;
};

const tokensCheckAndRefresh = async () => {
    if (isRefreshTokenExpired()) {
        // clearData();
        return null;
    } else {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        const newAccessToken = await refreshTokenByApi(accessToken, refreshToken);
        return newAccessToken;
    }
};

const axiosLocalHost = {
    sendAuthorizedRequest,
    normalRequest: axiosClient,
};

export default axiosLocalHost;
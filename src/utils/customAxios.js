import axios from "axios";
import url from '../Common/urlConstant'
import { useNavigate } from "react-router-dom";



const axiosClient = axios.create({
    baseURL: url.base,
});

const sendAuthorizedRequest = async (url, method, data = null) => {
    let accessToken = localStorage.getItem('accessToken');
    const headers = {};

    if (!accessToken || isAccessTokenExpired()) {
        const newAccessToken = await tokensCheckAndRefresh();
        if (!newAccessToken) {
            return; // Dừng hàm tại đây hoặc xử lý tiếp theo tùy theo logic ứng dụng của bạn
        }
        accessToken = newAccessToken;
    }

    headers['Authorization'] = `Bearer ${accessToken}`;

    try {
        const response = await axiosClient({
            method,
            url,
            headers,
            data,
        });
        return response;
    } catch (error) {
        // Xử lý lỗi
        console.error("Error fetching data: ", error);
        throw error;
    }
};

const refreshTokenByApi = async (accessToken, refreshToken) => {
    try {
        const response = await axios.post('https://wehireapi.azurewebsites.net/api/Account/Refresh', {
            accessToken,
            refreshToken,
        });

        // Sau khi nhận được response từ API, cập nhật thông tin mới vào localStorage
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('accessTokenExp', response.data.accessTokenExp);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('refreshTokenExp', response.data.refreshTokenExp);

        return response.data.accessToken;
    } catch (error) {
        console.error('Error refreshing tokens: ', error);
        throw error;
    }
};

const isAccessTokenExpired = () => {
    const accessTokenExp = localStorage.getItem('accessTokenExp');
    if (!accessTokenExp) {
        return true; // Nếu không có thông tin thời hạn, coi như accessToken đã hết hạn
    }

    const currentTimestamp = Math.floor(Date.now() / 1000);
    return currentTimestamp >= accessTokenExp;
};

const isRefreshTokenExpired = () => {
    const refreshTokenExp = localStorage.getItem('refreshTokenExp');
    if (!refreshTokenExp) {
        return true; // Nếu không có thông tin thời hạn, coi như refreshToken đã hết hạn
    }

    const currentTimestamp = Math.floor(Date.now() / 1000);
    return currentTimestamp >= refreshTokenExp;
};

const tokensCheckAndRefresh = async () => {
    if (isRefreshTokenExpired()) {

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
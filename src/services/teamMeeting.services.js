import urlConstant from "../Common/urlConstant"
import utils from "../utils/customAxios"

const createTeamMeeting = async (interviewId, redirectUrl, authenCode) => {
    const serviceUrl = urlConstant.endpoint.teamMeeting.createTeamMeeting;
    const response = await utils.axiosLocalHost.post(serviceUrl, { interviewId, redirectUrl, authenCode })
    return response
}

const deleteTeamMeeting = async (interviewId, redirectUrl, authenCode) => {
    const serviceUrl = urlConstant.endpoint.teamMeeting.deleteTeamMeeting;

    const requestData = {
        interviewId: interviewId,
        redirectUrl: redirectUrl,
        authenCode: "M.C106_BAY.2.e4783785-3bc0-39e4-bd6e-d8ecc6d32863"
    };
    console.log(requestData);
    try {
        const response = await utils.axiosLocalHost.delete(serviceUrl, {
            data: requestData, // Đặt dữ liệu trong trường 'data'
            headers: {
                'Content-Type': 'application/json' // Đặt header Content-Type là JSON
            }
        });
        console.log(response);
        return response;
    } catch (error) {
        // Xử lý lỗi nếu cần
        console.error('Error:', error);
        throw error;
    }
};

const editTeamMeeting = async (interviewId, redirectUrl, authenCode) => {
    const serviceUrl = urlConstant.endpoint.teamMeeting.updateTeamMeeting;
    const response = await utils.axiosLocalHost.put(serviceUrl, { interviewId, redirectUrl, authenCode })
    return response
}


export default {
    createTeamMeeting,
    deleteTeamMeeting,
    editTeamMeeting
}
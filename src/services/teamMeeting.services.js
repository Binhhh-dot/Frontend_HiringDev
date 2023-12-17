import urlConstant from "../Common/urlConstant"
import axiosLocalHost from "../utils/customAxios";

const createTeamMeeting = async (interviewId, redirectUrl, authenCode) => {
    const serviceUrl = urlConstant.endpoint.teamMeeting.createTeamMeeting;
    const response = await axiosLocalHost.sendAuthorizedRequest(serviceUrl, 'POST', { interviewId, redirectUrl, authenCode });
    return response
}

const deleteTeamMeeting = async (interviewId, redirectUrl, authenCode) => {
    const serviceUrl = urlConstant.endpoint.teamMeeting.deleteTeamMeeting;
    const requestData = {
        interviewId: interviewId,
        redirectUrl: redirectUrl,
        authenCode: authenCode
    };
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    };
    try {
        const response = await axiosLocalHost
            .sendAuthorizedRequest(serviceUrl, 'DELETE', requestData, config);
        return response;
    } catch (error) {
        // Xử lý lỗi ở đây
        console.error('Error:', error);
        throw error;
    }
};

const editTeamMeeting = async (interviewId, redirectUrl, authenCode) => {
    const serviceUrl = urlConstant.endpoint.teamMeeting.updateTeamMeeting;
    const response = await axiosLocalHost.sendAuthorizedRequest(serviceUrl, 'PUT', { interviewId, redirectUrl, authenCode });
    return response
}


export default {
    createTeamMeeting,
    deleteTeamMeeting,
    editTeamMeeting
}
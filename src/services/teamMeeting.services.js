import urlConstant from "../Common/urlConstant"
import axiosLocalHost from "../utils/customAxios";

const createTeamMeeting = async (interviewId, redirectUrl, authenCode) => {
    const serviceUrl = urlConstant.endpoint.teamMeeting.createTeamMeeting;
    const response = await axiosLocalHost.normalRequest.post(serviceUrl, { interviewId, redirectUrl, authenCode })
    return response
}

const deleteTeamMeeting = async (interviewId, redirectUrl, authenCode) => {
    const serviceUrl = urlConstant.endpoint.teamMeeting.deleteTeamMeeting;
    const requestData = {
        interviewId: interviewId,
        redirectUrl: redirectUrl,
        authenCode: authenCode
    };
    try {
        const response = await axiosLocalHost.normalRequest.delete(serviceUrl, {
            headers: {
                'Content-Type': 'application/json'
            },
            data: requestData
        });
        return response;
    } catch (error) {
        // Xử lý lỗi ở đây
        console.error('Error:', error);
        throw error;
    }
};

const editTeamMeeting = async (interviewId, redirectUrl, authenCode) => {
    const serviceUrl = urlConstant.endpoint.teamMeeting.updateTeamMeeting;
    const response = await axiosLocalHost.normalRequest.put(serviceUrl, { interviewId, redirectUrl, authenCode })
    return response
}


export default {
    createTeamMeeting,
    deleteTeamMeeting,
    editTeamMeeting
}
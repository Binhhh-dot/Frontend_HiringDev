import urlConstant from "../Common/urlConstant"
import axiosLocalHost from "../utils/customAxios";

const createTeamMeeting = async (interviewId, redirectUrl, authenCode) => {
    const serviceUrl = urlConstant.endpoint.teamMeeting.createTeamMeeting;
    const response = await axiosLocalHost.normalRequest.post(serviceUrl, { interviewId, redirectUrl, authenCode })
    return response
}

const deleteTeamMeeting = async (interviewId, redirectUrl, authenCode) => {
    const serviceUrl = urlConstant.endpoint.teamMeeting.deleteTeamMeeting;
    const response = await axiosLocalHost.normalRequest.delete(serviceUrl, { interviewId, redirectUrl, authenCode })
    return response
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
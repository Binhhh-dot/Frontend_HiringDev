import urlConstant from "../Common/urlConstant"
import utils from "../utils/customAxios"

const createTeamMeeting = async (interviewId, redirectUrl, authenCode) => {
    const serviceUrl = urlConstant.endpoint.teamMeeting.createTeamMeeting;
    const response = await utils.axiosLocalHost.post(serviceUrl, { interviewId, redirectUrl, authenCode })
    return response
}

const deleteTeamMeeting = async (interviewId, redirectUrl, authenCode) => {
    const serviceUrl = urlConstant.endpoint.teamMeeting.deleteTeamMeeting;
    const response = await utils.axiosLocalHost.delete(serviceUrl, { interviewId, redirectUrl, authenCode })
    return response
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
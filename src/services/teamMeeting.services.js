import urlConstant from "../Common/urlConstant"
import utils from "../utils/customAxios"

const createTeamMeeting = async (interviewId, redirectUrl, authenCode) => {
    const serviceUrl = urlConstant.endpoint.teamMeeting.createTeamMeeting;
    const response = await utils.axiosLocalHost.post(serviceUrl, { interviewId, redirectUrl, authenCode })
    return response
}

export default {
    createTeamMeeting
}
import urlConstant from "../Common/urlConstant";
import axiosLocalHost from "../utils/customAxios";

const getEducationByDeveloperId = async (developerId) => {
  const serviceUrl =
    urlConstant.endpoint.education.getEducationByDeveloperId.replace(
      "${developerId}",
      developerId
    );

  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET"
  );
  return response;
};

export default { getEducationByDeveloperId };

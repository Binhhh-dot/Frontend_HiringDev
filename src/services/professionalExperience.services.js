import urlConstant from "../Common/urlConstant";
import axiosLocalHost from "../utils/customAxios";

const getProfessionalExperience = async (developerId) => {
  const serviceUrl =
    urlConstant.endpoint.professionalExperience.getProfessionalExperience.replace(
      "${developerId}",
      developerId
    );

  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET"
  );
  return response;
};

export default { getProfessionalExperience };

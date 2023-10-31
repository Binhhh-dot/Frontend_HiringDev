import urlConstant from "../Common/urlConstant";
import utils from "../utils/customAxios";

const getUserById = async (userId) => {
  const serviceUrl = urlConstant.endpoint.user.getUserById.replace(
    "${userId}",
    userId
  );
  const response = await utils.axiosLocalHost.get(serviceUrl);
  return response;
};

const updateUser = async (formData, userId) => {
  const serviceUrl = urlConstant.endpoint.user.updateUser.replace(
    "${userId}",
    userId
  );
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await utils.axiosLocalHost.put(serviceUrl, formData, config);

  return response;
};

// const getStaff = async (PageIndex, PageSize) => {
//   const serviceUrl = urlConstant.endpoint.user.getStaff
//     .replace("${PageIndex}", PageIndex)
//     .replace("${PageSize}", PageSize);
//   const response = await utils.axiosLocalHost.get(serviceUrl);
//   return response;
// };

const getStaff = async () => {
  const serviceUrl = urlConstant.endpoint.user.getStaff;
  const response = await utils.axiosLocalHost.get(serviceUrl);
  return response;
};

const getStaffPaging = async (PageIndex, PageSize) => {
  const serviceUrl = urlConstant.endpoint.user.getStaff + "?";
  const pagingUrl = urlConstant.endpoint.user.getStaffPaging
    .replace("${PageIndex}", PageIndex)
    .replace("${PageSize}", PageSize);
  const fullUrl = serviceUrl + pagingUrl;
  const response = await utils.axiosLocalHost.get(fullUrl);
  console.log(fullUrl);
  return response;
};

const getStaff2 = async (PageIndex, pageSize) => {
  const serviceUrl = `/User/Staff?PageIndex=${PageIndex}&PageSize=${pageSize}`;
  const response = await utils.axiosLocalHost.get(serviceUrl);
  return response;
};

export default {
  getUserById,
  updateUser,
  getStaff,
  getStaffPaging,
  getStaff2,
};

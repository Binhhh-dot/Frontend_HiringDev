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


const getListManager = async() =>{
  const serviceUrl = urlConstant.endpoint.user.getListManager;
  const response = await utils.axiosLocalHost.get(serviceUrl);
  return response;
}

const getListStaff = async() => {
  const serviceUrl = urlConstant.endpoint.user.getListStaff;
  const response = await utils.axiosLocalHost.get(serviceUrl);
  return response;
}

const getListHR = async() => {
  const serviceUrl = urlConstant.endpoint.user.getListHR;
  const response = await utils.axiosLocalHost.get(serviceUrl);
  return response;
}
const getListDeveloper = async() => {
  const serviceUrl = urlConstant.endpoint.user.getListDeveloper;
  const response = await utils.axiosLocalHost.get(serviceUrl);
  return response;
}

const getStaffById = async (id) => {
  const serviceUrl = urlConstant.endpoint.user.getStaffById.replace("${id}", id);
  const response = await utils.axiosLocalHost.get(serviceUrl)

  return response
}

//HR

const getHRById = async (id) => {
  const serviceUrl = urlConstant.endpoint.user.getHRById.replace("${id}", id);
  const response = await utils.axiosLocalHost.get(serviceUrl)

  return response
}

const updateHR = async (id, formData) => {
  const serviceUrl = urlConstant.endpoint.user.updateHR.replace("${id}", id);
  const config = {
      headers: {
          'Content-Type': 'multipart/form-data',
      },
  }
  const response = await utils.axiosLocalHost.put(serviceUrl, formData, config)

  return response
}

const deleteHR = async (userId) => {
  const serviceUrl = urlConstant.endpoint.user.deleteHR.replace("${userId}", userId);
  const response = await utils.axiosLocalHost.delete(serviceUrl)

  return response
}

const createHR = async (
  firstName,
  lastName,
  email,
  password,
  phoneNumber,
  dateOfBirth,
  roleId,

) => {
  const serviceUrl = urlConstant.endpoint.user.createHR;
  const response = await utils.axiosLocalHost.post(serviceUrl, {
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    dateOfBirth,
    roleId,
  });
  return response;
};

//Devloper
const getDeveloperById = async (devId) => {
  const serviceUrl = urlConstant.endpoint.user.getDeveloperById.replace("${devId}", devId);
  const response = await utils.axiosLocalHost.get(serviceUrl)

  return response
}

const deleteDeveloper = async (userId) => {
  const serviceUrl = urlConstant.endpoint.user.deleteDeveloper.replace("${userId}", userId);
  const response = await utils.axiosLocalHost.delete(serviceUrl)

  return response
}

//Manager
const getManagerById = async (id) => {
  const serviceUrl = urlConstant.endpoint.user.getManagerById.replace("${id}", id);
  const response = await utils.axiosLocalHost.get(serviceUrl)

  return response
}

const updateManager = async (id, formData) => {
  const serviceUrl = urlConstant.endpoint.user.updateManager.replace("${id}", id);
  const config = {
      headers: {
          'Content-Type': 'multipart/form-data',
      },
  }
  const response = await utils.axiosLocalHost.put(serviceUrl, formData, config)

  return response
}
const createManager = async (
  firstName,
  lastName,
  email,
  password,
  phoneNumber,
  dateOfBirth,
  roleId,

) => {
  const serviceUrl = urlConstant.endpoint.user.createManager;
  const response = await utils.axiosLocalHost.post(serviceUrl, {
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    dateOfBirth,
    roleId,
  });
  return response;
};

const deleteManager = async (userId) => {
  const serviceUrl = urlConstant.endpoint.user.deleteManager.replace("${userId}", userId);
  const response = await utils.axiosLocalHost.delete(serviceUrl)

  return response
}

//Staff

const updateStaff = async (id, formData) => {
  const serviceUrl = urlConstant.endpoint.user.updateStaff.replace("${id}", id);
  const config = {
      headers: {
          'Content-Type': 'multipart/form-data',
      },
  }
  const response = await utils.axiosLocalHost.put(serviceUrl, formData, config)

  return response
}

const createStaff = async (
  firstName,
  lastName,
  email,
  password,
  phoneNumber,
  dateOfBirth,
  roleId,

) => {
  const serviceUrl = urlConstant.endpoint.user.createManager;
  const response = await utils.axiosLocalHost.post(serviceUrl, {
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    dateOfBirth,
    roleId,
  });
  return response;
};

const deleteStaff = async (userId) => {
  const serviceUrl = urlConstant.endpoint.user.deleteManager.replace("${userId}", userId);
  const response = await utils.axiosLocalHost.delete(serviceUrl)

  return response
}

export default {
  getUserById,
  updateUser,
  getStaff,
  getStaffPaging,
  getStaff2,
  getListManager,
  getListStaff,
  getListHR,
  getStaffById,
  getHRById,
  updateHR,
  deleteHR,
  createHR,
  getDeveloperById,
  getManagerById,
  createManager,
  updateManager,
  deleteManager,
  createStaff,
  deleteStaff,
  updateStaff,
  getListDeveloper,
  deleteDeveloper,
};

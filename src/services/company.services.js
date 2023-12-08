import urlConstant from "../Common/urlConstant";
import axiosLocalHost from "../utils/customAxios";

const createCompany = async (formData) => {
  const serviceUrl = urlConstant.endpoint.company.createCompany;
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await axiosLocalHost.normalRequest.post(
    serviceUrl,
    formData,
    config
  );
  console.log(response);
  return response;
};

const updateCompany = async (companyId, formData) => {
  const serviceUrl = urlConstant.endpoint.company.updateCompany.replace(
    "${companyId}",
    companyId
  );
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await axiosLocalHost.normalRequest.put(serviceUrl, formData, config);

  return response;
};

const getCompanyByCompanyId = async (companyId) => {
  const serviceUrl = urlConstant.endpoint.company.getCompanyByCompanyId.replace(
    "${companyId}",
    companyId
  );
  const response = await axiosLocalHost.normalRequest.get(serviceUrl);

  return response;
};

const getCompany = async () => {
  const serviceUrl = urlConstant.endpoint.company.getCompany;
  const response = await axiosLocalHost.normalRequest.get(serviceUrl);
  return response;
};

const getCompanyAndPaging = async (PageIndex, PageSize) => {
  const serviceUrl = urlConstant.endpoint.company.getCompany + "?";
  const pagingUrl = urlConstant.endpoint.company.getCompanyAndPaging
    .replace("${PageIndex}", PageIndex)
    .replace("${PageSize}", PageSize);
  const fullUrl = serviceUrl + pagingUrl;
  const response = await axiosLocalHost.normalRequest.get(fullUrl);
  return response;
};

export default {
  createCompany,
  getCompanyByCompanyId,
  updateCompany,
  getCompany,
  getCompanyAndPaging,
};

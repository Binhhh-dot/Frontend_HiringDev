const REDIRECT_URL_CREATEMEETING = "https://frontend-hiring-dev.vercel.app/callback";
const REDIRECT_URL_PAYMENT = "https://frontend-hiring-dev.vercel.app";
const URL_CREATE_INTERVIEW = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=4362c773-bb6a-40ec-8ac3-92209a7a05e7&response_type=code&redirect_uri=https://frontend-hiring-dev.vercel.app/callback&response_mode=query&scope=https://graph.microsoft.com/.default&state=12345";

export default {
    redirectUrlCreateMeetting: REDIRECT_URL_CREATEMEETING,
    redirectUrlReturnPay: REDIRECT_URL_PAYMENT,
    urlCreateInterview: URL_CREATE_INTERVIEW,
};

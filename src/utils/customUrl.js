const REDIRECT_URL_CREATEMEETING = "https://localhost:3000/callback";
const REDIRECT_URL_PAYMENT = "https://localhost:3000";
const URL_CREATE_INTERVIEW = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=4362c773-bb6a-40ec-8ac3-92209a7a05e7&response_type=code&redirect_uri=https://localhost:3000/callback&response_mode=query&scope=https://graph.microsoft.com/.default&state=12345";

export default {
    redirectUrlCreateMeetting: REDIRECT_URL_CREATEMEETING,
    redirectUrlReturnPay: REDIRECT_URL_PAYMENT,
    urlCreateInterview: URL_CREATE_INTERVIEW,
};

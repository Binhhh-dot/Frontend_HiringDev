const SERVICE_URL = 'https://wehireapi.azurewebsites.net/api'

export default {
    base: SERVICE_URL,
    endpoint: {
        auth: {
            login: '/Account/Login',
            siginUp: '/Account/SignUp'
        },

    }
}
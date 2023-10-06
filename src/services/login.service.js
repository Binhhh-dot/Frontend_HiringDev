import urlConstant from "../Common/urlConstant"



const login = async (email, password) =>{
    const serviceUrl = urlConstant.endpoint.auth.login
    const response = await util.axiosLocalHost.post(serviceUrl,{
        email,
        password,
      })
      return response
}

export default{
    login,
}
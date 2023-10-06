import axios from "axios";
import url from '@/common/urlConstant'

const axiosClient = axios.create({
    baseURL : url.base,
})

export default{
    axiosLocalHost : axiosClient,
}
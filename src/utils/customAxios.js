import axios from "axios";
import url from '../Common/urlConstant'

const axiosClient = axios.create({
    baseURL: url.base,
})

export default {
    axiosLocalHost: axiosClient,
}
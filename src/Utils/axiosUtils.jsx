import axios from "axios";
import { UserUrl, baseUrl } from "../Constants/Constants";

const createAxiosClient = (baseURL) => {
    const client = axios.create({
        baseURL,
        timeout: 8000,
        timeoutErrorMessage: "Request timeout Please Try Again!!!"
    })
    return client
}

const attachToken = (req, tokenName) => {
    let authToken = localStorage.getItem('token')
    const accesstoken = JSON.parse(authToken);
    if (accesstoken) {
        req.headers.Authorization = `Bearer ${accesstoken.access}`;
    }
    return req
}

const userAxios = createAxiosClient(UserUrl)
userAxios.interceptors.request.use(async (req) => {
    const modifiedReq = attachToken(req,'token')
    return modifiedReq 
})
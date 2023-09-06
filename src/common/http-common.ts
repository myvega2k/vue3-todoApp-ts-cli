import axios, { AxiosInstance } from "axios"

const API_URL = process.env.VUE_APP_APIURL

const apiClient: AxiosInstance = axios.create({
    baseURL: API_URL,//"http://localhost:4500/api",
    headers: {
        "Content-type": "application/json",
    },
})
export default apiClient
import axios, { AxiosInstance } from "axios"

const apiClient: AxiosInstance = axios.create({
    baseURL: "http://localhost:4500/api",
    headers: {
        "Content-type": "application/json",
    },
})
export default apiClient
import axios, { Axios } from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {"Content-Type": "application/json"}, 
    withCredentials: true,   // if every thunk has to send cookies othewise move it to only that specific page
});

export default axiosInstance;
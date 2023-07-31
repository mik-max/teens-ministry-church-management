import axios, { AxiosRequestConfig } from "axios";
const Request = axios.create({
     baseURL: process.env.NEXT_PUBLIC_BASE_URL,
     timeout: 30000,
});

export {Request}
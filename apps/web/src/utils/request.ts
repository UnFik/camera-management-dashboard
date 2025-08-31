import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import { API_URL } from "@/config/url";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/stores/auth-store";

const request = async ({ ...config }: AxiosRequestConfig) => {    
  const authorization = Cookies.get(ACCESS_TOKEN) || ""
  const client = axios.create({ baseURL: config.baseURL ?? API_URL });

  if (!config.baseURL) {
    client.defaults.headers.common.Accept = "application/json";
    // client.defaults.headers.post['Content-Type'] = "application/json"
    // client.defaults.withCredentials = true;
    client.defaults.headers.common.Authorization = authorization ? `Bearer ${authorization}` : '';
  }

  const onSuccess = (response: AxiosResponse) => response;
  const onError = (err: AxiosError) => {
    return Promise.reject(err);
  };
  return client(config).then(onSuccess).catch(onError);
};

export default request;

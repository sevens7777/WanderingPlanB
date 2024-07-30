"use script"

import qs from 'querystring'
import axios from "axios";
import { Toast } from "vant";
// Full config:  https://github.com/axios/axios#request-config
axios.defaults.baseURL = process.env.VUE_APP_BASE_API;
axios.defaults.method= 'post'
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
    // baseURL: process.env.baseURL || process.env.apiUrl || ""
    // timeout: 60 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
    function(config) {
        // Do something before request is sent
        const data=config.data
        const contentType=config.headers['Content-Type']

        if (typeof data=="object"&& contentType==='application/x-www-form-urlencoded'){
            config.data=qs.stringify(data)
        }
        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
    function(response) {
        // Do something with response data
        const {data} = response
        let result = data
        if (data.status === 200) {
            result = Promise.resolve(data)
        } else {
            Toast.fail(data.message ?? '请求失败')
            result = Promise.reject(data)
        }
        return result
    },
    function(error) {
        // Do something with response error
        Toast.fail('网路错误')
        return Promise.reject(error);
    }
);

export default _axios

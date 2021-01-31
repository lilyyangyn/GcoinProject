
import Qs from 'qs';
import axios from 'axios';
import router from "../../router";

axios.defaults.withCredentials=true;

export const reqRealEndAsync = (method, baseUrl,
                                url, params, callback) => {
    const transport = axios.create({
        withCredentials: true
    })

    return axios({
        timeout: 5000,
        baseURL: baseUrl,
        method: method,
        url: url,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
        },
        data: Qs.stringify(params),
        withCredentials: true,
        traditional: true,
    }).then(res => {
        let result = res.data;
        if (result.code == 1) {
            router.replace({
                path: "signup",
                query: {
                    msg: result.message
                }
            });
        } else if (result.code == 0) {
            if (callback != undefined) {
                callback(result.code, result.message, result.data);
            }
        }else if (result.code == 2) {
            if (callback != undefined) {
                callback(result.code, result.message, result.data);
            }
        }
    }).catch(error => window.alert(error));
};

export const reqRealEnd = (method, baseUrl,
                           url, params) => {
    return axios({
        timeout: 5000,
        baseURL: baseUrl,
        method: method,
        url: url,
        headers:{
            'Content-type': 'application/x-www-form-urlencoded',
        },
        data: Qs.stringify(params),
        traditional: true,
    });
};
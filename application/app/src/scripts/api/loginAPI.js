import {reqRealEndAsync, reqRealEnd} from "./axiosUtil";
import {config} from "./config";

export const login = (params, callback) => {

    return reqRealEndAsync("post", config.domain,
        "/login/userlogin", params, callback);
};

export const checkLogin = (params, callback) => {

    return reqRealEndAsync("get", config.domain,
        "/login/verifylogin", params, callback);
}

export const Logout = () => {
    alert("logout function");
    sessionStorage.removeItem("uid");
    return reqRealEnd("get",config.domain,"/login/logout",null);
}
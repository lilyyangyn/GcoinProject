import {reqRealEndAsync} from "./axiosUtil";
import {config} from "./config";

export const login = (params, callback) => {

    return reqRealEndAsync("post", config.domain,
        "/login/userlogin", params, callback);

};
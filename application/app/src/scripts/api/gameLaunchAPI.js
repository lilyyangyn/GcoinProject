import {reqRealEndAsync} from "./axiosUtil";
import {config} from "./config";

export const gameLaunch = (params, callback) => {
    return reqRealEndAsync("post", config.domain,
        "/gameregistration/register", params, callback);
};
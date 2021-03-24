import {reqRealEndAsync} from "./axiosUtil";
import {config} from "./config";

export const createOrder = (params, callback) => {
    return reqRealEndAsync("post", config.gameServerDomain,
        "/test", params, callback);
};
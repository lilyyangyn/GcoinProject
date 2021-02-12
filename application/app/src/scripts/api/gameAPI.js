import {reqRealEndAsync} from "./axiosUtil";
import {config} from "./config";

export const gameLaunch = (params, callback) => {
    return reqRealEndAsync("post", config.domain,
        "/game/register", params, callback);
};

export const getGameListData = (params, callback) => {
    return reqRealEndAsync("get", config.domain,
        "/game/gamelist", params, callback);
};

export const getGameInfo = (params, callback) => {
    return reqRealEndAsync("post", config.domain,
        "/game/gameinfo", params, callback);
};

export const getThumbnailBase64Str = (params, callback, imgFileName) => {
    let url = "game/thumbnail/"+imgFileName;
    return reqRealEndAsync("get", config.domain,
        url, params, callback);
};
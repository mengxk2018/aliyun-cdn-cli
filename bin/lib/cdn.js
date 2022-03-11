"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AliyunCdnService = void 0;
// This file is auto-generated, don't edit it
const cdn20180510_1 = __importStar(require("@alicloud/cdn20180510")), $Cdn = cdn20180510_1;
const $OpenApi = __importStar(require("@alicloud/openapi-client"));
class AliyunCdnService {
    client;
    constructor(access) {
        this.client = this.createClient(access.accessKeyId, access.accessKeySecret);
    }
    /**
     * 使用AK&SK初始化账号Client
     * @param accessKeyId
     * @param accessKeySecret
     * @return Client
     * @throws Exception
     */
    createClient(accessKeyId, accessKeySecret) {
        const config = new $OpenApi.Config({});
        // 您的AccessKey ID
        config.accessKeyId = accessKeyId;
        // 您的AccessKey Secret
        config.accessKeySecret = accessKeySecret;
        // 访问的域名
        config.endpoint = "cdn.aliyuncs.com";
        return new cdn20180510_1.default(config);
    }
    /**
       刷新
       * @param opts
       */
    async refresh(opts) {
        const params = new $Cdn.RefreshObjectCachesRequest(opts);
        const res = await this.client.refreshObjectCaches(params);
        console.log("CDN刷新成功：refreshTaskId=", res.body.refreshTaskId);
    }
    /**
     * 预热
     * @param opts
     */
    async push(opts) {
        const params = new $Cdn.PushObjectCacheRequest(opts);
        const ret = await this.client.pushObjectCache(params);
        console.log("CDN预热成功：", ret);
    }
}
exports.AliyunCdnService = AliyunCdnService;

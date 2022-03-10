// This file is auto-generated, don't edit it
import Cdn, * as $Cdn from "@alicloud/cdn20180510";
import * as $OpenApi from "@alicloud/openapi-client";

export interface Access {
  accessKeyId: string;
  accessKeySecret: string;
}

export interface RefreshOpts {
  securityToken?: string;
  objectPath: string;
  objectType?: ["Directory", "File"]; //刷新接口，刷新文件类型
  area?: [ //预热接口
    "domestic", //仅中国内地。
    "overseas" //全球，不包含中国内地
  ];
}

export class AliyunCdnService {
  client: Cdn;

  constructor(access: Access) {
    this.client = this.createClient(access.accessKeyId, access.accessKeySecret);
  }

  /**
   * 使用AK&SK初始化账号Client
   * @param accessKeyId
   * @param accessKeySecret
   * @return Client
   * @throws Exception
   */
  createClient(accessKeyId: string, accessKeySecret: string): Cdn {
    const config = new $OpenApi.Config({});
    // 您的AccessKey ID
    config.accessKeyId = accessKeyId;
    // 您的AccessKey Secret
    config.accessKeySecret = accessKeySecret;
    // 访问的域名
    config.endpoint = "cdn.aliyuncs.com";
    return new Cdn(config);
  }

  /**
     刷新
     * @param opts
     */

  async refresh(opts: RefreshOpts) {
    const params = new $Cdn.RefreshObjectCachesRequest(opts);
    const res = await this.client.refreshObjectCaches(params);
    console.log("CDN刷新成功：refreshTaskId=", res.body.refreshTaskId);
  }

  /**
   * 预热
   * @param opts
   */
  async push(opts: RefreshOpts) {
    const params = new $Cdn.PushObjectCacheRequest(opts);
    const ret = await this.client.pushObjectCache(params);
    console.log("CDN预热成功：", ret);
  }
}

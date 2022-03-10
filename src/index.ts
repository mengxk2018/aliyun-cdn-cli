import minimist from "minimist";
import { Access, RefreshOpts, AliyunCdnService } from "./lib/cdn";

const path = require('path')
const fs = require('fs')

const helper = `\naliyun-cdn-cli 选项说明:
            \n\t -i <AccessKey>                  访问阿里云凭证，访问控制台上可以获得
            \n\t -k <AccessKeySecret>            访问阿里云密钥，访问控制台上可以获得
            \n\t -c <config>                     自定义配置文件，默认读取./aliyun.config.json
            \n\t -f <filename|folder>            刷新目录或文件，有特殊字符先做 URLencode，以加速域名开头，多个以\\n隔开
            \n\t -t <taskType>                   任务类型:[refresh=刷新,push=预热]
            \n\t -o [String,<File|Directory>]    可选项，刷新的类型：[File=文件刷新,Directory=目录刷新(默认)]            
            \n\t -a [String,<domestic|overseas>  可选项，预热范围，不传与cdn设置一致：[domestic=仅中国大陆,overseas全球（不包含中国大陆）]
            \n\t -h <help>                       查看帮助
            \n\t`;

function showHelp() {
  console.log(helper);
}

export default async function run() {
  const args = minimist(process.argv.slice(2));

  const { i, k, f, o = "Directory", a, t = "refresh", c, h } = args;

  if (h) {
    showHelp();
    return;
  }

  if (!f) {
    showHelp();
    console.error("\n-f<文件或目录> 参数不能为空\n\n");
    return;
  }

  // 获取配置
  const config = {} as Access
  const configPath = path.posix.join(process.cwd(), c || './aliyun.config.json')
  if (fs.existsSync(configPath)) Object.assign(config, require(configPath))

  // console.log('config:', JSON.stringify(config))

  //执行刷新任务

  const access: Access = { accessKeyId: i || config.accessKeyId, accessKeySecret: k || config.accessKeySecret };

  const opts: RefreshOpts = { objectPath: f, objectType: o, area: a };

  const cdnService: AliyunCdnService = new AliyunCdnService(access);

  // console.log("params:", JSON.stringify(opts));

  if (t === "push") {
    await cdnService.push(opts);
  } else {
    await cdnService.refresh(opts);
  }
}
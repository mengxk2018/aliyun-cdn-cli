# aliyun-cdn-cli
阿里云 CDN CLI，可以快速刷新，预热等

[CDN缓存概览](https://help.aliyun.com/document_detail/120427.html)

```
npm install -g aliyun-cdn-cli
```
```
  Usage: aliyun-cdn-cli [options]
    -i, --AccessKeyId <value>             阿里云凭证
    -k, --AccessKeySecret <value>         阿里云密钥
    -c, --config<value>                   自定义配置文件，默认读取./aliyun.config.json
    -f, --refreshPath <dir/file>          刷新目录或文件的地址：有特殊字符先做URLencode，以加速域名开头，多个以\\n隔开
    -o, --refreshType <Directory/File>    刷新类型：[Directory=目录(默认),File=文件][可选]
    -t, --taskType <refresh/push>         任务类型:[refresh=刷新(默认),push=预热]
    -h, --help                            查看帮助
    -v, --version                         查看版本
```
## [刷新缓存](https://help.aliyun.com/document_detail/91164.html) 被刷新的文件缓存将立即失效，新的请求将回源获取最新的文件，支持URL批量刷新。
```
aliyun-cdn-cli -f http://yourcdndomain/img/
aliyun-cdn-cli -f http://yourcdndomain/img/1.png[\\nhttp://yourcdndomain/img/2.png]
```

## [预热源站](https://help.aliyun.com/document_detail/91161.html) 将源站的内容主动预热到L2缓存节点上。您首次访问可直接命中缓存，缓解源站压力。
```
aliyun-cdn-cli -t push -f http://yourcdndomain/img/1.png
```
[如何判断CDN的预热任务是否执行完成](https://help.aliyun.com/document_detail/40132.htm?spm=a2c4g.11186623.0.0.6a9473fe41cTBp)

[使用CDN后，文件与源文件不一致，如何刷新缓存](https://help.aliyun.com/document_detail/147730.html)
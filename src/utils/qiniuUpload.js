// 七牛文件上传
import * as qiniu from "qiniu-js";
import {getQiNiuToken} from "@/api/public";
import {Toast} from "vant";

function qiniuUpload() {   //file是选择的文件对象
  const upload = (dir, file) => {
    return new Promise((resolve, reject) => {
      getQiNiuToken().then((response) => {
        let domain = response.domain
        let token = response.token
        let key = dir + '/' + file.name.substring(0, file.name.lastIndexOf('.')) + '-' + new Date().getTime()
          + file.name.substring(file.name.lastIndexOf('.'))
        let config = {
          useCdnDomain: true,   //表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。
          region: qiniu.region.z1     // 根据具体提示修改上传地区,当为 null 或 undefined 时，自动分析上传域名区域
        }
        let putExtra = {
          fname: "",  //文件原文件名
          params: {}, //用来放置自定义变量
          mimeType: null  //用来限制上传文件类型，为 null 时表示不对文件类型限制；限制类型放到数组里： ["image/png", "image/jpeg", "image/gif"]
        };
        const observable = qiniu.upload(file, key, token, putExtra, config)
        observable.subscribe({
          next: (result) => {
            //主要用来展示进度
            console.log(result)
          },
          error: (error) => {
            //上传错误后触发
            console.log(error);
            reject(error)
          },
          complete: (result) => {
            //上传成功后触发。包含文件地址。
            let url = domain + result.key
            // console.log(url)
            resolve(url)
          },
        });
      }).catch(response => {
        //发生错误时执行的代码
        console.log(response)
      });
    })
  }
  return {
    upload
  }
}

export default qiniuUpload

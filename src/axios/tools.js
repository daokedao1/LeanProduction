

import axios from 'axios';
let query  = {}


const env = process.env.NODE_ENV || 'development'
/**
 * 公用get请求
 * @param url       接口地址
 * @param params       接口异常提示
 */
 export const GET = (url, params = {}) => {
     if (!params) {
         params = {}
     }
     let headers = {
         "content-type": "application/json"
     }
     return new Promise((resolve, reject) => {
         axios({
             url,
             headers,
             params: {...params, ...query},
             method: 'get',
             timeout: 30000
         }).then(res => {
           if (res.data.code === 200 || res.data.status == "0" ||res.data.success !== true) {
             resolve(res.data);
           } else {
             reject(res.data);
           }
             if (env === 'development') {
                 console.group('调用网络接口成功');
                 console.log('[请求的Url]:', url);
                 console.log('[请求的Data]:', params);
                 console.log('[请求的Result]:', res.data);
                 console.groupEnd();
             }
         }).catch(error => {
             let isTimeout = JSON.stringify(error).includes('timeout') || ''
             if (isTimeout) {
                 resolve({msg: '请求超时'})
             } else {
                 resolve(error)
             }
         })
     })
 }

/**
 * 公用post请求
 * @param url       接口地址
 * @param data      接口参数
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
 export const POST = (url, data = {},header) => {
    //  query.tk = sessionStorage.getItem("accessToken") || decodeURIComponent(cookieGet('accessToken')) || ''
    //  query.code = sessionStorage.getItem("accessToken") || decodeURIComponent(cookieGet('accessToken')) || ''
    //  query.p = sessionStorage.getItem("source") || cookieGet('source') || ''
    //  query.v = sessionStorage.getItem("version") || cookieGet('version') || ''
    let ruquest;
     if (!data) {
         data = {}
     }
     let headers = {
        "Content-Type": "application/json",
         "Authorization":header
     };
     const newUrl= "http://119.90.248.34:51029"+url;

     return new Promise((resolve, reject) => {
        ruquest=axios.post(newUrl, data, {
            headers
          });
          ruquest.then(function(res) {

            if (res.data.code === 200 || res.data.status == "0" ||res.data.success !== true) {
              resolve(res.data);
            } else {
              reject(res.data);
            }
                 if (env === 'development') {
                     console.group('调用网络接口成功');
                     console.log('[请求的Url]:', url);
                     console.log('[请求的Data]:', data);
                     console.log('[请求的Result]:', res.data);
                     console.groupEnd();
                 }
          })
          .catch(function(error) {
            // handle error
            console.log(error);
          })
          .then(function() {
            // always executed
          });
        //  axios({
        //      url,
        //      data,
        //      headers,
        //     //  params: query,
        //      method: 'post',
        //     //  timeout: 30000
        //  }).then(res => {
        //      if (res.data.code !== 0) {
        //          reject(res.data)
        //      } else {
        //          resolve(res.data)
        //      }
        //      if (env === 'development') {
        //          console.group('调用网络接口成功');
        //          console.log('[请求的Url]:', url);
        //          console.log('[请求的Data]:', data);
        //          console.log('[请求的Result]:', res.data);
        //          console.groupEnd();
        //      }
        //  }).catch(error => {
        //     //  let isTimeout = JSON.stringify(error).includes('timeout') || ''
        //     //  if (isTimeout) {
        //     //      resolve({msg: '请求超时'})
        //     //  } else {
        //     //      resolve(error)
        //     //  }
        //  })
     })
 }

 export default {
     GET,
     POST
 }

 import axios from 'axios';

 /* 防止重复提交，利用axios的cancelToken */
 let pending: any[] = []; // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
 const CancelToken: any = axios.CancelToken;



 const removePending: any = (config: any, f: any) => {
     const flagUrl = config.url;
     if (pending.indexOf(flagUrl) !== -1) {
         if (f) {
             f('取消重复请求'); // 执行取消操作
         } else {
             pending.splice(pending.indexOf(flagUrl), 1); // 把这条记录从数组中移除
         }
     } else {
         if (f) {
             pending.push(flagUrl);
         }
     }
 };

 /* 创建axios实例 */
 const service = axios.create({
     timeout: 5000, 
 });

 /* request拦截器 */
 service.interceptors.request.use((config: any) => {
     if (!config.neverCancel) {
         // 生成cancelToken
         config.cancelToken = new CancelToken((c: any) => {
             removePending(config, c);
         });
     }
     // 在这里可以统一修改请求头，例如 加入 用户 token 等操作
     return config;
 }, (error: any) => {
     Promise.reject(error);
 });

 /* respone拦截器 */
 service.interceptors.response.use(
     (response: any) => {
         removePending(response.config);
         const res = response.data;
         if (res.code !== 200) {
             if (res.code === 401) {
                 if (location.hash === '#/') {
                     return res;
                 } else {
                     location.href = '/#/';
                 }
             }
             return Promise.reject('error');
         } else {
             return response;
         }
     },
     (error: any) => {
         // 异常处理
         console.log(error)
         pending = [];
         if (error.message === '取消重复请求') {
             return Promise.reject(error);
         }
         return Promise.reject(error);
     },
 );

 export default service;
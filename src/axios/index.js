import axios from 'axios'
import qs from 'qs' //formdata序列化
import $router from '@/router'
import config from '@/config'



// 超时时间
axios.defaults.timeout = 10000;
// post 默认请求方式 (貌似有 axios bug 设置并没有效果)
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 请求地址 前缀
axios.defaults.baseURL = config.host;


// 请求拦截
axios.interceptors.request.use((rqs) => {
  // 默认以 form表单提交 ， 增加 mheaders = true 表示以 json格式提交 ， 使用 let form = new FormData() 格式则以 FormData 格式提交
  if (rqs.method === 'post' && rqs.mheaders !== true) {
    rqs.data = qs.stringify(rqs.data);
  }
  return rqs;
}, (error) => {
  return Promise.reject(error);
});

// 响应拦截
axios.interceptors.response.use((res) => { // 状态码 200 回调
  /* if(res.data.code !== '0000'){
    return Promise.reject(res);
  } */
  return res.data;

}, (err) => { // 状态码不是200 回调
  if (err.response) {
    alert('网络出错');
  }
  return Promise.reject(err);
});




export default axios

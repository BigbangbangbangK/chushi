/* 
 * 这个东西到底我们封装成什么？
 * 类
 * 对象
 * 函数  √
 */

// const baseURL = 'http://localhost:3000' // 本地启动
// const baseURL = 'http://10.31.154.189:3000' // 公司局域网启动
// const baseURL = 'http://10.31.154.110:3000' // 测试环境
// const baseURL = 'http://10.31.154.456:3000' // 上线环境
import axios from 'axios'
import Vue from 'vue'
import {
    Toast
} from 'vant'
Vue.use(Toast)
const instance = axios.create({ // 创建一个axios实例
    // baseURL,
    // timeout: 5000,
});

// 默认表单提交
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


// // 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 如果你没有登录，项目中任何页面你都进不去-后台管理系统
    Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner'
    })


    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

//   // 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    Toast.clear()


    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

const request = ({
    url,
    method = "GET",
    params,
    data,
    withCredentials = false, // default
    headers
}) => {
    return new Promise((resolved, rejected) => {
        // 区别两个不同的数据请求就行  get  post 
        switch (method.toUpperCase()) {
            case 'POST':
                var read_data = {}
                if (headers['Content-Type'] == 'application/x-www-form-urlencoded') {
                    // 表单提交
                    const p = new URLSearchParams()
                    for (let key in data) {
                        p.append(key, data[key])
                    }
                    read_data = p
                } else {
                    // json提交
                    read_data = data
                }
                instance.post(url, data = read_data, {
                        withCredentials, // default
                        headers
                    }).then(res => resolved(res))
                    .catch(err => rejected(err))
                break;

            case 'PUT':
                instance.put(url, {
                        method,
                        params,
                        withCredentials, // default
                        headers
                    }).then(res => resolved(res))
                    .catch(err => rejected(err))
                break;
            default:
                instance.get(url, {
                        method,
                        params,
                        withCredentials, // default
                        headers
                    }).then(res => resolved(res))
                    .catch(err => rejected(err))
                break;
        }
    })
}





export default request
// module.exports = request 
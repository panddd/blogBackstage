import axios from 'axios'

// 创建axios实例。统一配置
const service = axios.create({
    baseURL: "http://localhost:8080/",
    timeout: 7200000
})


service.interceptors.request.use(config => {
    //... 获取token，存储token 等操作
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
    if (user) {
        config.headers['token'] = user.token;
    }

    return config
}, error => {
    console.log(error)
    Promise.reject(error)
})


// respone拦截器
service.interceptors.response.use(res => {
    return res ?.data
}, err => {
    console.log(err)
})

export default service
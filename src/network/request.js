import axios from 'axios'

export function request(config) {

    //1.创建axios实例
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/hy66',
        timeout: 5000
    })

    //2.axios的拦截器
    // //2.1请求拦截(用于检查我们发送过去的请求是否合法)
    // instance.interceptors.request.use(config => {
    //     return config//拦截之后要返回，main.js拿不到就会执行catch语句
    //     //1.比如config中的一些信息不符合要求

    //     //2.比如每次发送请求的的时候，在界面显示一个请求图标

    //     //3.某些网络请求(比如登录(token))，必须要携带一些特殊信息

    // },err => {
    //     console.log(err)//请求发送失败打印
    // })

    //2.2响应拦截
    instance.interceptors.response.use(res => {
        // console.log(res.data)
        return res.data//如果你只想要res里的data，就只需要返回res.data

    },err => {
        console.log(err)
    })

    //3.发送真正的网络请求
    return instance(config)
}

import axios from 'axios'

export function request(config) {

    //1.创建axios实例
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/hy66',
        timeout: 5000
    })

    // //2.axios的拦截器
    // //2.1请求拦截
    // instance.interceptors.request.use(config => {
    //     return config//拦截之后要返回，main.js拿不到就会执行catch语句
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

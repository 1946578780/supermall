import Axios from 'axios'

export function request(config){
    const instance = Axios.create({
        baseURL: "http://123.207.32.32:8000/api/wh",
        timeout: 5000,
    })
    //超时5秒进行拦截
    instance.interceptors.request.use(config=>{
        // console.log(config)
        return config
    },err=>{
        console.log(err)
    })
    //响应拦截
    instance.interceptors.response.use(res=>{
        return res.data
    },err=>{
        console.log(err)
    })
    //发送真正的网络请求
    return instance(config)
}
export default request
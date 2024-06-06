import axios from 'axios'
const myRequest = axios.create({
    baseURL: 'http://localhost:5172', // 基础路径,将统一的部分全部封装
    withCredentials: false // 表示请求可以携带cookie
})
export default myRequest;


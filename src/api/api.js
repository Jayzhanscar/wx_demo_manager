import axios from 'axios'
// 创建axios实例
const api = axios.create({
  withCredentials: true,
  timeout: 60000
})

api.interceptors.request.use(async(config) => {
  // 获取token
  let user = sessionStorage.getItem('user');
  if (user) {
    user = JSON.parse(user);
    config.headers['Authorization'] = 'bearer'+ " "+ user.jwt
  }

  if (config.method === 'post') {
    config.headers['content-type'] = 'application/json'
  }
    
  return config
}, (error) => {
  // Do something with request error
  return Promise.reject(error)
})


export default api
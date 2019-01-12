
import api from './api';
// md5加密
let meta = {
  api: '/api',
  success(res) {},
  error(res) {
    console.log(res)
  }
};

let service = {};


//获取话题列表
service.login = (data, success) => {
  let config = {
    url: `${meta.api}/user/api/super/login`,
    method: 'post',
    data: data
  };
  return api(config)
    .then((data) => {
      if (data.status === 200)
        success(data.data);
      else
        console.log(data)
    })
    .catch()
}

export default service

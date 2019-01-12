
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


// 用户登录
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

// 海报列表
service.posterList = (data, success, size, page, title) => {

  let config = {
    url: `${meta.api}/goods/api/poster/list/`+'?size='+ size.toString()+ '&page=' + page,
    method: 'get',
    data: data,
  };
  if (title){
    config.url += '&title='+ title
  }
  return api(config)
      .then((data) => {
        if (data.status === 200)
          success(data.data);
        else
          console.log(data)
      })
      .catch()
}

// 创建海报
service.createPoster = (data, success) => {
  let config = {
    url: `${meta.api}/goods/api/poster/create`,
    method: 'post',
    data: data,
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

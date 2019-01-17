
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
// 海报删除
service.deletePoster = (data, success) => {
  let config = {
    url: `${meta.api}/goods/api/poster/batch/delete`,
    method: 'delete',
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

// 上传图片
service.upLoadImg = (data, success) => {
  let config = {
    url: `${meta.api}/goods/api/img/upload`,
    method: 'post',
    data: data,
    dataType: "formData",
    cache: false,
    processData: false,
    contentType: false,
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

// 用户列表
service.userList = (data, success, size, page, mobile) => {
  let config = {
    url: `${meta.api}/user/api/list/`+'?size='+ size.toString()+ '&page=' + page,
    method: 'get',
    data: data,
  };
  if (mobile){
    config.url += '&mobile='+ mobile
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

// 创建商品分类
service.CreateClassify = (data, success) => {
  let config = {
    url: `${meta.api}/goods/api/classify/create`,
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
// 商品分类列表
service.ClassifyList = (data, success) => {
  let config = {
    url: `${meta.api}/goods/api/classify/list`,
    method: 'get',
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
// 删除分类
service.deleteClassify = (data, success) => {

  let id = data['id']
  let config = {
    url: `${meta.api}/goods/api/classify/modify/`+ id.toString(),
    method: 'delete',
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
// 修改分类
service.modifyClassify = (data, success) => {

  let id = data['id']
  let config = {
    url: `${meta.api}/goods/api/classify/modify/`+ id.toString(),
    method: 'patch',
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

// 商品列表
service.GoodsList = (data, success) => {
  let size = data['size']
  let page = data['page']
  let config = {
    url: `${meta.api}/goods/api/list/`+'?size='+ size.toString()+ '&page=' + page,
    method: 'get',
  };
  if (data['name']){
    config.url += '&name='+ data['name']
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
// 添加商品
service.addGoods = (data, success ) => {
  let config = {
    url: `${meta.api}/goods/api/create`,
    method: 'post',
    data: data,
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
// 获取课程列表
service.curriculumList = (data, success) => {
  let size = data['size']
  let page = data['page']
  let config = {
    url: `${meta.api}/goods/api/curriculum/list/`+'?size='+ size.toString()+ '&page=' + page,
    method: 'get',
  };
  if (data['name']){
    config.url += '&name='+ data['name']
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
// 删除课程
service.deleteCurriculum = (data, success) => {
  let cuid = data['cuid']
  let config = {
    url: `${meta.api}/goods/api/curriculum/list/`+ cuid,
    method: 'delete',
  };
  return api(config)
      .then((data) => {
        if (data.status === 200)
          success(data.data);
        else
          console.log(data)
      })
      .catch()
}// 创建课程
service.addCurriculum = (data, success ) => {
  let config = {
    url: `${meta.api}/goods/api/curriculum/create/`,
    method: 'post',
    data: data,
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
// 获取视频列表
service.videoList = (data, success ) => {
  let size = data['size']
  let page = data['page']

  let config = {
    url: `${meta.api}/goods/api/video/list`+'?size='+ size.toString()+ '&page=' + page,
    method: 'get',
  }
  if (data['name']){
    config.url += '&name='+ data['name']
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
// 课程添加视频
service.addVideo = (data, success ) => {
  let config = {
    url: `${meta.api}/goods/api/curriculum/video/create/`,
    method: 'post',
    data: data,
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
export default service

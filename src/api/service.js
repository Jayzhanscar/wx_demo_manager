
import api from './api';
// md5加密
let meta = {
  api: '/api',
  success(res) {},
  error(res) {
      alert(res)
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
          console.log(data.content)
          this.$message({
              massage: data,
              type: 'error'
          })
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

// ------------------------------------创建商品分类------------------------------------
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
//------------------------------------ 商品分类列表------------------------------------
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
// ------------------------------------删除分类------------------------------------
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
// ------------------------------------修改分类------------------------------------
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

// ------------------------------------商品列表------------------------------------
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
// ------------------------------------添加商品------------------------------------
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
// --------------------------修改商品信息------------------------------------------
service.updateGoods = (guid, data, success) => {
 let config = {
     url: `${meta.api}/goods/api/operator/`+ guid,
     method: 'patch',
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

// -----------------------删除商品----------------------------------------------------

// ------------------------------------获取课程列表------------------------------------
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
// ------------------------------------删除课程------------------------------------
service.deleteCurriculum = (data, success) => {
  let cuid = data['uuid']
  let config = {
    url: `${meta.api}/goods/api/curriculum/operator/`+ cuid,
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
}// ------------------------------------创建课程------------------------------------
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
// ------------------------------------修改课程------------------------------------
service.updateCurriculum = (cuid, data, success) => {
  let config = {
    url: `${meta.api}/goods/api/curriculum/operator/` + cuid,
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
// ------------------------------------获取视频列表-------------------------------------
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
// ------------------------------------课程添加视频------------------------------------
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

// ------------------------------------课程删除视频------------------------------------
service.deleteVideo = (vuid, success ) => {

  let config = {
    url: `${meta.api}/goods/api/curriculum/video/delete/`+ vuid,
    method: 'delete',
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

// ------------------------------------砍价活动列表------------------------------------
service.BargainList = (data, success ) => {
  let size = data['size']
  let page = data['page']

  let config = {
    url: `${meta.api}/activity/api/bargain/list`+'?size='+ size.toString()+ '&page=' + page,
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
// ------------------------------------创建砍价活动------------------------------------
service.createBargain = (data, success ) => {
  let config = {
    url: `${meta.api}/activity/api/bargain/create/`,
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
},
// ------------------------------------修改砍价活动------------------------------------
service.updateBargain = (buid, data, success ) => {
      let config = {
        url: `${meta.api}/activity/api/bargain/detail/`+ buid,
        method: 'patch',
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

// ------------------------------------删除砍价活动------------------------------------
service.deleteBargain = (buid, success ) => {
  let config = {
    url: `${meta.api}/activity/api/bargain/detail/`+ buid,
    method: 'delete',
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
// -----------------------------------拼团活动列表----------------------------
service.assembleList = (data, success ) => {
  let size = data['size']
  let page = data['page']
  let config = {
    url: `${meta.api}/activity/api/assemble/list/`+'?size='+ size.toString()+ '&page=' + page,
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
// --------------------------------创建拼团活动-------------------------------
service.createAssemble = (data, success ) => {

  let config = {
    url: `${meta.api}/activity/api/assemble/create/`,
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
//---------------------------------修改拼团活动-------------------------------
service.updateAssemble = (auid, data, success ) => {

  let config = {
    url: `${meta.api}/activity/api/assemble/detail/`+ auid,
    method: 'patch',
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

//---------------------------------删除拼团活动-------------------------------
service.deleteAssemble = (auid, success ) => {

  let config = {
    url: `${meta.api}/activity/api/assemble/detail/`+ auid,
    method: 'delete',
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
// ---------------轮播图列表-----------------
service.listCarDetail = (success ) => {

    let config = {
        url: `${meta.api}/goods/api/carousel/list`,
        method: 'get',
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
// ---------------创建轮播图------------------
service.CreateCarDetail = (data, success) => {
    let config = {
        url: `${meta.api}/goods/api/carousel/create/`,
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
// ------------删除轮播图 ---------------
service.deleteCarDetail = (cuid, success) => {
    let config = {
        url: `${meta.api}/goods/api/carousel/delete/`+ cuid,
        method: 'delete',
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
// --------------获取商品订单列表-------------
service.orderGoodsList = (data, success) => {
    let size = data['size']
    let page = data['page']
    let config = {
        url: `${meta.api}/order/api/goods/list/`+'?size='+ size.toString()+ '&page=' + page,
    }
    if (data['order_num']){
        config.url += '&order_num='+ data['order_num']
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
// -------------------修改订单----------------
service.modifyOrderGoods = (data, success) => {
    let config = {
        url: `${meta.api}/order/api/goods/modify/`,
        method: 'post',
        data: data
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
// --------------------课程订单列表---------------
service.orderCurrList = (data, success) => {
    let size = data['size']
    let page = data['page']
    let config = {
        url: `${meta.api}/order/api/curr/list/`+'?size='+ size.toString()+ '&page=' + page,
        method: 'get',
    }
    if (data['order_num']){
        config.url += '&order_num='+ data['order_num']
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
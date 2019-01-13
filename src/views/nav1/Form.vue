<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
      <el-form-item label="海报标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="上传图片">


        <input id="id" type="file" @change='upFlis' class='verlong'>

        <!-- <el-upload
          action="/api/goods/api/img/upload"
          list-type="picture-card"
          :before-upload="beforeAvatarUpload"
          :on-success="onSuccess"
          :on-exceed="exceed"
          :limit="5"
          :headers="{
            'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoiNjljOGE0OWQ5ZWY0NGJkM2FiYTRhMWE3Zjg2ZGUwOWQiLCJuaWNrIjoiRyIsInR5cGUiOjAsImV4cCI6MTU0NzQ1Mzc0OX0.MnwIgtLVk2iyh1kon0VTg6kn9u0kOEqpyvBov2ig0Rk'
          }">
          <input type="file" @change='upFlisBack' class='verlong'>
          <i class="el-icon-plus"></i>
        </el-upload> -->


        <!-- <el-upload
            class="upload-demo"
            drag
            multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload> -->
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="作者头像">
        <el-upload
            class="upload-demo"
            :on-change="handleChange"
			action="https://www.ymkgdesign.com"
            :file-list="fileList3">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="文件路径">
        <el-input v-model="form.path"></el-input>
      </el-form-item>
      <el-form-item  label="提取码">
        <el-input  v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item  label="详细说明">
        <el-input  v-model="form.detail"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button  @click.native.prevent="createPoster" type="primary">立即创建</el-button>
        <el-button @click.native.prevent>取消</el-button>
      </el-form-item>
    </el-form>

      <!--<el-form-item label="活动区域">-->
        <!--<el-select v-model="form.region" placeholder="请选择活动区域">-->
          <!--<el-option label="区域一" value="shanghai"></el-option>-->
          <!--<el-option label="区域二" value="beijing"></el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="活动时间">-->
        <!--<el-col :span="11">-->
          <!--<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>-->
        <!--</el-col>-->
        <!--<el-col class="line" :span="2">-</el-col>-->
        <!--<el-col :span="11">-->
          <!--<el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>-->
        <!--</el-col>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="即时配送">-->
        <!--<el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="活动性质">-->
        <!--<el-checkbox-group v-model="form.type">-->
          <!--<el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>-->
          <!--<el-checkbox label="地推活动" name="type"></el-checkbox>-->
          <!--<el-checkbox label="线下主题活动" name="type"></el-checkbox>-->
          <!--<el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>-->
        <!--</el-checkbox-group>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="特殊资源">-->
        <!--<el-radio-group v-model="form.resource">-->
          <!--<el-radio label="线上品牌商赞助"></el-radio>-->
          <!--<el-radio label="线下场地免费"></el-radio>-->
        <!--</el-radio-group>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="活动形式">-->
        <!--<el-input type="textarea" v-model="form.desc"></el-input>-->
      <!--</el-form-item>-->
  </div>
</template>

<script>
  import service from '../../api/service.js'
	export default {
		data() {
			return {
				form: {
					title: '',
					path: '',
					creator: '',
					pic: '',
					code: '',
					detail: [],
          creator_pic: '',
          base64Img: '',
          imgUrl: ''
				}
			}
    },
		methods: {
      // 点击得到imageUrl
      submitImg() {
        // img
        let data = {
          img: this.base64Img
        }
        const success = data => {
          this.imgUrl =  `https://www.ymkgdesign.com${data.url}`
          console.log( this.imgUrl)
        }
        service.upLoadImg(data, success)
      },

      // 上传文件change绑定事件处理
      upFlis(event) {
        let that = this
        let files = document.getElementById('id').files[0]
        let reader = new FileReader();
        reader.readAsDataURL(files)
        let imgFile = ''
        reader.onload = e => {
            imgFile = e.target.result;
            that.base64Img = imgFile.split('base64')[1]
            that.submitImg()
        }
      },

      // 上传限制
      beforeAvatarUpload(file) {
        // 图片格式
        let imgTypeList = [
          'image/png',
          'image/jpg',
          'image/jpeg',
          'image/bmp',
          'image/gif'
        ]
        let type = false
        for (let i = 0; i < imgTypeList.length; i++) {
          if (imgTypeList[i] === file.type) {
            type = true
          }
        }

        if (type === false) {
          this.$message.error('上传头像图片只能是 png/jpg/jpeg/bmp/gif 格式!')
          return false
        }
        if (file.size / 1024 / 1024 > 3) {
          this.$message.error('上传头像图片大小不能超过 3MB!')
          return false
        }
      },

      // 图片上传成功
      onSuccess(res, file, fileList) {
        if (res.code === 0) {
          // 添加img列表
          this.imgList.push(res.data.url)
        }
      },


			onSubmit() {
				console.log('submit!');
			},
			createPoster: function () {
				let data = {

				}
				const success = data => {
					// 缓存登录数据
					// localStorage.setItem('mydata', JSON.stringify(data))
					console.log('我已经获取了海报列表了')
					this.postList = data['results']
					console.log('-------', this.postList)

				}
				service.posterList(data, success, size, page)
			}

		}
	}

</script>
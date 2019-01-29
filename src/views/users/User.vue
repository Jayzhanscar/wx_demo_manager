<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.mobile" placeholder="手机号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUserList(1,filters.mobile )">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="userList" highlight-current-row v-loading="listLoading"  style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="nick" label="昵称" width="120" sortable>
			</el-table-column>
			<el-table-column prop="mobile" label="手机号" width="130"  sortable>
			</el-table-column>
			<el-table-column prop="gender" label="性别" width="90"  :formatter="formatSex" sortable>
			</el-table-column>
			<el-table-column prop="address" label="地址" width="160" sortable>
			</el-table-column>
			<el-table-column prop="create_time" label="注册时间" width="120" sortable>
			</el-table-column>
			<el-table-column prop="last_login" label="最后登录时间" width="170" sortable>
			</el-table-column>
			<el-table-column prop="u_type" label=类型 min-width="180" :formatter="formatUser" sortable>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
			</el-pagination>
		</el-col>


	</section>
</template>

<script>
	import service from '../../api/service.js'
	export default {
		data() {
			return {
				listLoading: false,
				filters: {
					 mobile: ''
				},
				total: 0,
				page: 1,
				userList : [

				]
			}
		},
		create: function() {
			this.getUserList()

		},
		methods: {
			//性别显示转换
			formatSex: function (row, column) {
				return row.gender == 1 ? '男' : row.gender == 0 ? '女' : '未知';
			},
			// 用户类型转换
			formatUser: function (row, column) {
				return row.u_type == 0 ? '普通用户' : row.u_type == 1 ? '超级用户' : '未知';
			},
			getUserList: function (page, mobile) {
				let size = 10
				let data = {

				}
				const success = data => {
					console.log('用户列表', data)
					this.userList = data['results']
					this.total = data['count']


				}
				service.userList(data, success, size, page, mobile)

			},
			// 分页请求
			handleCurrentChange(val) {
				this.page = val;
				this.getPostList(val)
			},
		},
		mounted() {
			this.getUserList(1, 0);
		}
	}


</script>
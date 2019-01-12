<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.title" placeholder="名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getPostList(1, filters.title)">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="postList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="title" label="名称" width="120" sortable>
			</el-table-column>
			<el-table-column prop="creator" label="创作者" width="100"  sortable>
			</el-table-column>
			<el-table-column prop="code" label="提取码" width="100"  sortable>
			</el-table-column>
			<el-table-column prop="download" label="下载量" width="100" sortable>
			</el-table-column>
			<el-table-column prop="view" label="浏览量" width="120" sortable>
			</el-table-column>
			<el-table-column prop="path" label="下载地址" width="120" sortable>
			</el-table-column>
			<el-table-column prop="pic" label="图片地址" min-width="180" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
		<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="addForm">
				<el-form-item label="标题" prop="name">
					<el-input v-model="editForm.title" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="作者" prop="name">
					<el-input v-model="editForm.creator" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="文件路径" prop="name">
					<el-input v-model="editForm.path" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="提取码" prop="name">
					<el-input v-model="editForm.code" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="作者头像">
					<el-upload
							action="111"
							class="upload-demo"
							>
						<el-button size="small" type="primary">点击上传</el-button>
						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
				</el-form-item>
				<el-form-item label="缩略图"  prop="name">
					<el-upload
							class="upload-demo"
							action="111"
					>
						<el-button size="small" type="primary">点击上传</el-button>
						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
				</el-form-item>
				<el-form-item label="备注说明" prop="detail">
					<el-input v-model="editForm.detail" auto-complete="off"></el-input>
				</el-form-item>

			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="标题" prop="name">
					<el-input v-model="addForm.title" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="作者" prop="name">
					<el-input v-model="addForm.creator" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="文件路径" prop="name">
					<el-input v-model="addForm.path" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="提取码" prop="name">
					<el-input v-model="addForm.code" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="作者头像">
					<el-upload
							class="upload-demo"
							action="https://www.ymkgdesign.com/"
							>
						<el-button size="small" type="primary">点击上传</el-button>
						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
				</el-form-item>
				<el-form-item label="缩略图"  prop="name">
					<el-upload
							class="upload-demo"
							action="https://www.ymkgdesign.com/"
					>
						<el-button size="small" type="primary">点击上传</el-button>
						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
				</el-form-item>
				<el-form-item label="备注说明" prop="detail">
					<el-input v-model="addForm.detail" auto-complete="off"></el-input>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="createPoster" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	import service from '../../api/service.js'

	export default {
		data() {
			return {
				postList: [],
				filters: {
					title: ''
				},
				//新增界面数据
				addForm: {
					title: '',
					creator : '',
					creator_pic: [],
					path: '',
					code: '',
					pic: []

				},
				//编辑界面数据
				editForm: {
					title: '',
					creator : '',
					creator_pic: [],
					path: '',
					code: '',
					pic: []
				},
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '此项必填', trigger: 'blur' },
					],

				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '此项必填', trigger: 'blur' }
					]
				},


			}
		},
		create:function(){
			this.getPostList();
		},
		methods: {
			// 获取海报列表
			getPostList: function (page, title) {
				let size = 10
				let data = {}
				const success = data => {
					this.listLoading = false;
					this.postList = data['results']
					this.total = data['count']
					console.log('-------', this.postList)

				}
				service.posterList(data, success, size, page, title)
			},
			// 分页请求
			handleCurrentChange(val) {
				this.page = val;
				console.log(val, '666666')
				this.getPostList(val)
			},
			// 创建海报
			createPoster: function() {
				console.log('test-----', this.addForm)

			},


			//
			// //性别显示转换
			//

			//获取用户列表
			// getUsers() {
			// 	let para = {
			// 		page: this.page,
			// 		name: this.filters.name
			// 	};
			// 	this.listLoading = true;
			// 	//NProgress.start();
			// 	getUserListPage(para).then((res) => {
			// 		this.total = res.data.total;
			// 		this.users = res.data.users;
			// 		this.listLoading = false;
			// 		//NProgress.done();
			// 	});
			// },
			//删除
			handleDel: function (index, row) {
				// this.$confirm('确认删除该记录吗?', '提示', {
				// 	type: 'warning'
				// }).then(() => {
				// 	this.listLoading = true;
				// 	//NProgress.start();
				// 	let para = { id: row.id };
				// 	removeUser(para).then((res) => {
				// 		this.listLoading = false;
				// 		//NProgress.done();
				// 		this.$message({
				// 			message: '删除成功',
				// 			type: 'success'
				// 		});
				// 		this.getUsers();
				// 	});
				// }).catch(() => {
				//
				// });
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;

			},
			//编辑
			editSubmit: function () {
				// TODO 编辑
				// this.$refs.editForm.validate((valid) => {
				// 	if (valid) {
				// 		this.$confirm('确认提交吗？', '提示', {}).then(() => {
				// 			this.editLoading = true;
				// 			//NProgress.start();
				// 			let para = Object.assign({}, this.editForm);
				// 			para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
				// 			editUser(para).then((res) => {
				// 				this.editLoading = false;
				// 				//NProgress.done();
				// 				this.$message({
				// 					message: '提交成功',
				// 					type: 'success'
				// 				});
				// 				this.$refs['editForm'].resetFields();
				// 				this.editFormVisible = false;
				// 				this.getUsers();
				// 			});
				// 		});
				// 	}
				// });
			},
			//新增
			// addSubmit: function () {
			// 	this.$refs.addForm.validate((valid) => {
			// 		if (valid) {
			// 			this.$confirm('确认提交吗？', '提示', {}).then(() => {
			// 				this.addLoading = true;
			// 				//NProgress.start();
			// 				let para = Object.assign({}, this.addForm);
			// 				para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
			// 				addUser(para).then((res) => {
			// 					this.addLoading = false;
			// 					//NProgress.done();
			// 					this.$message({
			// 						message: '提交成功',
			// 						type: 'success'
			// 					});
			// 					this.$refs['addForm'].resetFields();
			// 					this.addFormVisible = false;
			// 					this.getUsers();
			// 				});
			// 			});
			// 		}
			// 	});
			// },
			selsChange: function (sels) {
				this.sels = sels;
				// TODO 获取批量id
			},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				// TODO 批量删
				// this.$confirm('确认删除选中记录吗？', '提示', {
				// 	type: 'warning'
				// }).then(() => {
				// 	this.listLoading = true;
				// 	//NProgress.start();
				// 	let para = { ids: ids };
				// 	batchRemoveUser(para).then((res) => {
				// 		this.listLoading = false;
				// 		//NProgress.done();
				// 		this.$message({
				// 			message: '删除成功',
				// 			type: 'success'
				// 		});
				// 		this.getUsers();
				// 	});
				// }).catch(() => {
				//
				// });
			}
		},
		mounted() {
			this.getPostList(1, 0);
		}
	}

</script>

<style scoped>

</style>
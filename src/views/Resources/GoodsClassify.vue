<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="classifyList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="name" label="名称" width="120" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<!--<el-col :span="24" class="toolbar">-->
			<!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
			<!--&lt;!&ndash;<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">&ndash;&gt;-->
			<!--&lt;!&ndash;</el-pagination>&ndash;&gt;-->
		<!--</el-col>-->

		<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible"   :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px"  ref="addForm">
				<el-form-item label="标题" prop='name'>
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>

			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px"  ref="addForm">
				<el-form-item label="分类名称" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="createClassify" :loading="addLoading">提交</el-button>
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
				name: '',
				classifyList: [],
				filters: {
					title: ''
				},
				//新增界面数据
				addForm: {
					name: '',

				},
				//编辑界面数据
				editForm: {
					name: '',
				},
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				// editFormRules: {
				// 	name: [
				// 		{ required: true, message: '此项必填', trigger: 'blur' },
				// 	],
				//
				// },

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				// addFormRules: {
				// 	name: [
				// 		{ required: true, message: '此项必填', trigger: 'blur' }
				// 	]
				// },


			}
		},
		create:function(){
			this.getClassifyList();
		},
		methods: {
			// 获取商品分类列表
			getClassifyList: function () {
				let data = {}
				const success = data => {
					this.listLoading = false;
					this.classifyList = data
					this.total = data['count']

				}
				service.ClassifyList(data, success)
			},
			// 创建商品分类
			createClassify: function (){
				let data = {
					name: this.addForm.name,
				}
				const success = data => {
					this.addFormVisible = false;
					this.getClassifyList();
					this.$message({
						message: '创建成功',
						type: 'success'
					});

				}
				service.CreateClassify(data, success)
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let data = {
						id : row.classify_id
					};
					const success = data => {
						this.listLoading = false
						this.getClassifyList();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
					}
					service.deleteClassify(data, success)

					}).catch(() => {
				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
				console.log(this.editForm, '-----')
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;

			},
			//编辑
			editSubmit: function () {

				this.$confirm('确认提交吗？', '提示', {}).then(() => {
					this.editLoading = true;
					let data = {
						id : this.editForm.classify_id,
						name: this.editForm.name
					};
					const success = data => {
						this.editLoading = false;
						this.editFormVisible = false;
						this.getClassifyList();
						this.$message({
							message: '修改成功',
							type: 'success'
						});
					}
					service.modifyClassify(data, success)
				});

			},
			//
			selsChange: function (sels) {
				this.sels = sels;
			},
			// //批量删除
			// batchRemove: function () {
			// 	var ids = this.sels.map(item => item.id).toString();
			// 	this.$confirm('确认删除选中记录吗？', '提示', {
			// 		type: 'warning'
			// 	}).then(() => {
			// 		this.listLoading = true;
			// 		//NProgress.start();
			// 		let para = { ids: ids };
			// 		batchRemoveUser(para).then((res) => {
			// 			this.listLoading = false;
			// 			//NProgress.done();
			// 			this.$message({
			// 				message: '删除成功',
			// 				type: 'success'
			// 			});
			// 			this.getUsers();
			// 		});
			// 	}).catch(() => {
			//
			// 	});
			// }
		},
		mounted() {
			this.getClassifyList();
		}
	}

</script>

<style scoped>

</style>
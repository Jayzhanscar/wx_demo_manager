<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bofuncGoodsListom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="课程名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="funcVideoList(1, filters.name)">查询</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="videoList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="name" label="名称" width="120" sortable>
            </el-table-column>
            <el-table-column prop="episodes" label="集数" width="100"  sortable>
            </el-table-column>
            <el-table-column prop="curr.name" label="所属课程" width="130"  sortable>
            </el-table-column>
            <el-table-column prop="longtime" label="时长" width="120" sortable>
            </el-table-column>
            <el-table-column prop="file" label="文件路径" width="120" sortable>
            </el-table-column>
            <el-table-column prop="create_time" label="创建时间" min-width="180" sortable>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <!--<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
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
        <!--&lt;!&ndash;编辑界面&ndash;&gt;-->
        <!--<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">-->
            <!--<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="addForm">-->
                <!--<el-form-item label="课程名称" prop="name">-->
                    <!--<el-input v-model="editForm.name" auto-complete="off"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="作者" prop="name">-->
                    <!--<el-input v-model="editForm.creator" auto-complete="off"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="作者头像">-->
                    <!--<input type="file">-->
                <!--</el-form-item>-->
                <!--<el-form-item label="主图">-->
                    <!--<input type="file">-->
                <!--</el-form-item>-->

                <!--<el-form-item label="备注说明" prop="detail">-->
                    <!--<el-input v-model="editForm.detail" auto-complete="off"></el-input>-->
                <!--</el-form-item>-->

            <!--</el-form>-->

            <!--<div slot="footer" class="dialog-footer">-->
                <!--<el-button @click.native="editFormVisible = false">取消</el-button>-->
                <!--<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>-->
            <!--</div>-->
        <!--</el-dialog>-->

        <!--新增界面-->
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="视频名称" prop="name">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="视频文件" prop="pic">
                    <input ref="videoFile" type="file" >
                </el-form-item>
                <el-form-item label="集数">
                    <el-input v-model="addForm.episodes" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属课程">
                    <el-select v-model="addForm.curr" placeholder="请选择">
                        <el-option
                                v-for="item in currOptions"
                                :key="item.uuid"
                                :label="item.name"
                                :value="item.uuid">
                        </el-option>
                    </el-select>

                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="funcCreateVideo" :loading="addLoading">提交</el-button>
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
                currOptions: '',
                videoList: [],
                filters: {
                    name: ''
                },
                //新增界面数据
                addForm: {
                    name: '',
                    curr: '',
                    episodes: '',
                    detail: '',
                    creator_detail: '',
                },
                //编辑界面数据
                editForm: {
                    name: '',
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
            this.funcVideoList(1, 0);
        },
        methods: {
            // 获取视频列表
            funcVideoList: function (page, name) {
                let size = 10
                let data = {
                    'size': size,
                    'page': page,
                    'name': name
                };
                const success = data => {
                    this.listLoading = false;
                    this.videoList = data['results'];
                    this.total = data['count']

                };
                service.videoList(data, success)
            },
            //获取课程列表
            funcCurriculumList: function (page, name) {
                let size = 30
                let data = {
                    'size': size,
                    'page': page,
                    'name': name
                };
                const success = data => {
                    this.listLoading = false;
                    this.currOptions = data['results'];
                    this.total = data['count']

                };
                service.curriculumList(data, success)
            },
            //添加视频
            funcCreateVideo: function () {
                let fileFormData = new FormData()
                let videoFile = this.$refs.videoFile.files[0];
                fileFormData.append('cuid', this.addForm.curr )
                fileFormData.append('episodes', this.addForm.episodes )
                fileFormData.append('name', this.addForm.name )
                fileFormData.append('file', videoFile )
                const success = data => {
                    this.listLoading = false;
                    console.log('上传成功')
                };
                service.addVideo(fileFormData, success)
            },
            // 分页请求
            handleCurrentChange(val) {
                this.page = val;
                this.funcCurriculumList(val, 0)
            },
            test: function(){
                console.log('-----', this.addForm)
            },
            // 创建课程
            createCurriculum: function() {
                let fileFormData = new FormData();

                let creator_avator = this.$refs.creator_avator.files[0];
                let curriculumPic = this.$refs.curriculumPic.files[0];
                const success = data => {
                    this.addFormVisible = false;
                    this.addFormVisible = false;
                };
                fileFormData.append('pic', curriculumPic,);
                fileFormData.append('name', this.addForm.name,);
                fileFormData.append('price', this.addForm.price,);
                fileFormData.append('creator', this.addForm.creator,);
                fileFormData.append('detail',this.addForm.detail,);
                fileFormData.append('ispay',this.addForm.ispay,);
                fileFormData.append('creator_detail',this.addForm.creator_detail,);
                fileFormData.append('creator_avator', creator_avator);
                service.addCurriculum(fileFormData, success)
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
                this.funcCurriculumList(1, 0)
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
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    console.log('调用批量删', ids)

                });
            }
        },
        mounted() {
            this.funcVideoList(1, 0);
        }
    }

</script>

<style scoped>

</style>
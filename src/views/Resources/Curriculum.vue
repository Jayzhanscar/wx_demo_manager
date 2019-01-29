<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bofuncGoodsListom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="课程名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="funcCurriculumList(1, filters.name)">查询</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="curriculcumList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="name" label="课程名称" width="120" sortable>
            </el-table-column>
            <el-table-column prop="creator" label="作者" width="100"  sortable>
            </el-table-column>
            <el-table-column prop="pic" label="主图" width="100"  sortable>
            </el-table-column>
            <el-table-column prop="price" label="价格(元)" width="120" sortable>
            </el-table-column>
            <el-table-column prop="ispay" label="是否付费" width="120" sortable :formatter="formatPay">
            </el-table-column>
            <el-table-column prop="sumtime" label="课程总时长" min-width="180" sortable>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
            </el-pagination>
        </el-col>
        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="addForm">
                <el-form-item label="课程名称" prop="name">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="价格" prop="price">
                     <el-input v-model="editForm.price" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="作者" prop="title">
                    <el-input v-model="editForm.creator" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="作者头像">
                    <input ref="updateAvatar" type="file">
                </el-form-item>
                <el-form-item label="作者详情">
                    <el-input v-model="editForm.creator_detail" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="主图">
                    <input ref="updatePic" type="file">
                </el-form-item>
                <el-form-item label="是否免费">
                    <template>
                        <el-radio v-model="editForm.ispay" label="0">免费</el-radio>
                        <el-radio v-model="editForm.ispay" label="1">付费</el-radio>
                    </template>
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
                <el-form-item label="课程名称" prop="name">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="作者" prop="creator">
                    <el-input v-model="addForm.creator" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="价格" prop="price">
                    <el-input v-model="addForm.price" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="主图" prop="pic">
                    <input ref="curriculumPic" type="file" >
                </el-form-item>
                <el-form-item label="是否免费">
                    <template>
                        <el-radio v-model="addForm.ispay" label="0">免费</el-radio>
                        <el-radio v-model="addForm.ispay" label="1">付费</el-radio>
                    </template>
                </el-form-item>
                <el-form-item label="作者详情">
                    <el-input v-model="addForm.creator_detail" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="作者头像">
                    <input ref="creator_avator" type="file">
                </el-form-item>
                <el-form-item label="课程详情" prop="detail">
                    <el-input v-model="addForm.detail" auto-complete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="createCurriculum" :loading="addLoading">提交</el-button>
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
                curriculcumList: [],
                filters: {
                    name: ''
                },
                //新增界面数据
                addForm: {
                    name: '',
                    price : '',
                    ispay: '',
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
            this.funcCurriculumList(1, 0);
        },
        methods: {

           //收费标砖显示转换
            formatPay: function (row, column) {
            	return row.ispay == 1 ? '付费' : row.ispay == 0 ? '免费' : '未知';
            },
            // 获取课程列表
            funcCurriculumList: function (page, name) {
                let size = 10
                let data = {
                    'size': size,
                    'page': page,
                    'name': name
                };
                const success = data => {
                    this.listLoading = false;
                    this.curriculcumList = data['results'];
                    this.total = data['count']

                };
                service.curriculumList(data, success)
            },
            // 分页请求
            handleCurrentChange(val) {
                this.page = val;
                this.funcCurriculumList(val, 0)
            },
            // 创建课程
            createCurriculum: function() {
                let fileFormData = new FormData();

                let creator_avator = this.$refs.creator_avator.files[0];
                let curriculumPic = this.$refs.curriculumPic.files[0];
                const success = data => {
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
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                	type: 'warning'
                }).then(() => {
                	this.listLoading = true;
                	//NProgress.start();
                    let data = {
                        'uuid': row.uuid
                    }
                    console.log(row.uuid, '123456')
                    const success = data => {
                          this.listLoading = false;
                    }
                    service.deleteCurriculum(data, success)

                }).catch(() => {

                });
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
                this.$confirm('确认提交吗？', '提示', {}).then(() => {
                    this.editLoading = true;
                    let creator_avator = this.$refs.updateAvatar.files[0];
                    let curriculumPic = this.$refs.updatePic.files[0];
                    let data = new FormData()
                    data.append('name', this.editForm.name,)
                    data.append('price', this.editForm.price)
                    data.append('creator', this.editForm.creator)
                    data.append('ispay',this.editForm.ispay,)
                    data.append('creator_detail',this.editForm.creator_detail,)
                    data.append('pic', curriculumPic,);
                    data.append('creator_avator', creator_avator);
                    const success = data => {
                        this.editLoading = false;
                        this.editFormVisible = false;
                    }
                    service.updateCurriculum( this.editForm.uuid, data, success)
                });
            },
            selsChange: function (sels) {
                this.sels = sels;
                // 获取批量id
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
            this.funcCurriculumList(1, 0);
        }
    }

</script>

<style scoped>

</style>
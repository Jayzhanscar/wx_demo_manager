<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bofuncGoodsListom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="funcBargiansList(1, filters.name)">查询</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="bargainList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="40">
            </el-table-column>
            <el-table-column prop="name" label="砍价名称" width="120" sortable>
            </el-table-column>
            <el-table-column prop="number" label="砍价次数" width="120"  sortable>
            </el-table-column>
            <el-table-column prop="curr.name" label="课程名称" width="130"  sortable>
            </el-table-column>
            <el-table-column prop="curr.price" label="课程价格" width="130" sortable>
            </el-table-column>
            <el-table-column prop="create_time" label="开始时间" width="150" :formatter="formatStartData" sortable>
            </el-table-column>
            <el-table-column prop="end_time" label="结束时间" width="170"   :formatter="formatEndData" sortable>
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
                <el-form-item label="活动名称" prop="name">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="砍价次数" prop="number">
                    <el-input v-model="editForm.number" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="主图" prop="pic">
                    <input ref="updatePic" type="file" >
                </el-form-item>
                <el-form-item label="课程选择">
                    <el-select v-model="editForm.curr_uuid" placeholder="请选择">
                        <el-option
                                v-for="item in currListOptions"
                                :key="item.uuid"
                                :label="item.name"
                                :value="item.uuid">
                        </el-option>
                    </el-select>

                </el-form-item>
                <el-form-item label="时长(天)" prop="duration">
                    <el-input v-model="editForm.duration" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="详情" prop="note">
                    <el-input v-model="editForm.note" auto-complete="off"></el-input>
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
                <el-form-item label="活动名称" prop="name">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="砍价次数" prop="number">
                    <el-input v-model="addForm.number" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="主图" prop="pic">
                    <input ref="pic" type="file" >
                </el-form-item>
                <el-form-item label="课程选择">
                    <el-select v-model="addForm.curr_uuid" placeholder="请选择">
                        <el-option
                                v-for="item in currListOptions"
                                :key="item.uuid"
                                :label="item.name"
                                :value="item.uuid">
                        </el-option>
                    </el-select>

                </el-form-item>
                <el-form-item label="时长(天)" prop="duration">
                    <el-input v-model="addForm.duration" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="详情" prop="note">
                    <el-input v-model="addForm.note" auto-complete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="createBargain" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import {formatDate} from '../../common/js/util'
    import service from '../../api/service.js'

    export default {
        data() {
            return {
                bargainList: [],
                currListOptions: [],
                classify_id: '',
                postList: [],
                filters: {
                    name: ''
                },
                //新增界面数据
                addForm: {
                    name: '',
                    duration : '',
                    number: '',
                    curr_uuid: '',
                    note: ''

                },
                //编辑界面数据
                editForm: {
                    name: '',
                    duration : '',
                    number: '',
                    curr_uuid: '',
                    note: ''
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
            this.funcBargiansList(1, 0);
        },
        methods: {
            //时间显示转换
            formatStartData: function (row, column) {
                return formatDate(row.create_time, 'yyyy-MM-dd hh:mm')
            },
            formatEndData: function (row, column) {
                return formatDate(row.end_time, 'yyyy-MM-dd hh:mm')
            },
            // 获取砍价列表
            funcBargiansList: function (page, name) {
                let size = 10
                let data = {
                    'size': size,
                    'page': page,
                    'name': name
                };
                const success = data => {
                    this.listLoading = false;
                    this.bargainList = data['results'];
                    this.total = data['count']

                };
                service.BargainList(data, success)
            },
            // 分页请求
            handleCurrentChange(val) {
                this.page = val;
                this.funcGoodsList(val, 0)
            },
            // 创建砍价活动
            createBargain: function() {
                let fileFormData = new FormData();

                let pic = this.$refs.pic.files[0];
                const success = data => {
                    this.addFormVisible = false;
                };
                fileFormData.append('pic', pic,);
                fileFormData.append('name', this.addForm.name,);
                fileFormData.append('number', this.addForm.number,);
                fileFormData.append('duration',this.addForm.duration,);
                fileFormData.append('note', this.addForm.note,);
                fileFormData.append('cuid', this.addForm.curr_uuid,);
                service.createBargain(fileFormData, success)
            },
            // 获取课程列表
            funcCurriculumList: function (page, name) {
                let size = 100
                let data = {
                    'size': size,
                    'page': page,
                    'name': name
                };
                const success = data => {
                    this.listLoading = false;
                    this.currListOptions = data['results'];
                    this.total = data['count']

                };
                service.curriculumList(data, success)
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                	type: 'warning'
                }).then(() => {
                	this.listLoading = true;
                	// //NProgress.start();
                    const success= data => {
                        this.listLoading = false;
                        console.log('已删除')
                    }
                    service.deleteBargain(row.uuid, success)

                }).catch(() => {

                });
            },
            //显示编辑界面
            handleEdit: function (index, row) {
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
                // 获取课程列表
                this.funcCurriculumList(1,0)
            },
            //显示新增界面
            handleAdd: function () {
                this.addFormVisible = true;
                this.funcCurriculumList(1,0)
            },
            //编辑
            editSubmit: function () {
                this.$confirm('确认提交吗？', '提示', {}).then(() => {

                    let fileFormData = new FormData();
                    this.editLoading = true;

                    let pic = this.$refs.updatePic.files[0];
                    const success= data => {
                        console.log(data)
                        this.editLoading = false;
                        this.editFormVisible = false;
                    }
                    fileFormData.append('pic', pic,);
                    fileFormData.append('name', this.editForm.name,);
                    fileFormData.append('number', this.editForm.number,);
                    fileFormData.append('duration',this.editForm.duration,);
                    fileFormData.append('note', this.editForm.note,);
                    fileFormData.append('cuid', this.editForm.curr_uuid,);
                    service.updateBargain(this.editForm.uuid, fileFormData, success)

                });
            },
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
            this.funcBargiansList(1, 0);
        }
    }

</script>

<style scoped>

</style>
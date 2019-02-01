<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.title" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getdiscussList(1, filters.title)">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="discussList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="user_name" label="评论者" width="120" sortable>
            </el-table-column>
            <el-table-column prop="content" label="评论内容" width="400"  sortable>
            </el-table-column>
            <el-table-column prop="mold" label="类型" width="100"  sortable>
            </el-table-column>
            <el-table-column prop="create_time" label="评论时间" width="150" :formatter="startformatData" sortable>
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
    </section>
</template>

<script>
    import {formatDate} from '../../common/js/util'
    import service from '../../api/service.js'

    export default {
        data() {
            return {
                noShow: false,
                discussList: [],
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
            this.getdiscussList(1);
        },
        methods: {
            //时间显示转换
            startformatData: function (row, column) {
                return formatDate(row.create_time, 'yyyy-MM-dd hh:mm')
            },
            // 获取评论列表
            getdiscussList: function (page, name) {
                let size = 10
                let data = {
                    'page': page,
                    'size': size,
                }
                const success = data => {
                    this.listLoading = false;
                    this.discussList = data['results']
                    this.total = data['count']

                }
                service.discussList(data, success)
            },
            // 分页请求
            handleCurrentChange(val) {
                this.page = val;
                this.getdiscussList(val)
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    // NProgress.start();
                    let data = {
                        'ids': [row.id, ]
                    }
                    const success = data => {
                        this.listLoading = false;

                        this.getdiscussList(1);
                    }
                    service.discussDelete(data, success())

                }).catch(() => {
                    //
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
            selsChange: function (sels) {
                // 批量获取id
                this.sels = sels;

            },
            //批量删除
            batchRemove: function () {
                var ids = this.sels.map(item => item.id).splice(',');
                // TODO 批量删
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {

                    this.listLoading = true;
                    let data = {
                        'ids': ids
                    }
                    const success = data => {
                        this.listLoading = false;
                        this.getdiscussList(1);
                    }
                    service.discussDelete(data, success())
                });
            }
        },
        mounted() {
            this.getdiscussList(1);
        }
    }

</script>

<style scoped>

</style>
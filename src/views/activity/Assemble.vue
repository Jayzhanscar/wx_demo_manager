<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bofuncGoodsListom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="funcAssembleList(1, filters.name)">查询</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="assembleList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="name" label="名称" width="120" sortable>
            </el-table-column>
            <el-table-column prop="number" label="人数" width="100"  sortable>
            </el-table-column>
            <el-table-column prop="pic" label="首图" width="100"  sortable>
            </el-table-column>
            <el-table-column prop="note" label="备注" width="130" so  rtable>
            </el-table-column>
            <el-table-column prop="ass_price" label="拼团价" width="100" sortable>
            </el-table-column>
            <el-table-column prop="goods.name" label="商品名称" width="120" sortable>
            </el-table-column>
            <el-table-column prop="goods.price" label="原价" min-width="100" sortable>
            </el-table-column>
            <el-table-column prop="end_time" label="截止日期" width="120"  sortable>
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
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
            </el-pagination>
        </el-col>
        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="addForm">
                <el-form-item label="活动名" prop="name">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="拼团价" prop="ass_price">
                    <el-input v-model="editForm.ass_price" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="人数" prop="ass_price">
                    <el-input v-model="editForm.number" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="时长(天)" prop="duration">
                    <el-input v-model="editForm.duration" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="主图" prop="pic">
                    <input ref="updatePic" type="file" >
                </el-form-item>
                <el-form-item label="商品选择">
                    <el-select v-model="editForm.guid" placeholder="请选择">
                        <el-option
                                v-for="item in goodsOptions"
                                :key="item.uuid"
                                :label="item.name"
                                :value="item.uuid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="拼团说明" prop="note">
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
                <el-form-item label="活动名" prop="name">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="拼团价" prop="ass_price">
                    <el-input v-model="addForm.ass_price" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="人数" prop="ass_price">
                    <el-input v-model="addForm.number" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="时长(天)" prop="duration">
                    <el-input v-model="addForm.duration" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="主图" prop="pic">
                    <input ref="Pic" type="file" >
                </el-form-item>
                <el-form-item label="商品选择">
                    <el-select v-model="addForm.guid" placeholder="请选择">
                        <el-option
                                v-for="item in goodsOptions"
                                :key="item.uuid"
                                :label="item.name"
                                :value="item.uuid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="拼团说明" prop="note">
                    <el-input v-model="addForm.note" auto-complete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import util from '../../common/js/util'
    import {formatDate} from '../../common/js/util'
    import service from '../../api/service.js'
    export default {
        data() {
            return {
                assembleList: [],
                goodsOptions: [],
                classify_id: '',
                postList: [],
                filters: {
                    name: ''
                },
                //新增界面数据
                addForm: {
                    name: '',
                    duration : '',
                    note: '',
                    ass_price: '',
                    number: '',
                    guid: '',
                },
                //编辑界面数据
                editForm: {
                    name: '',
                    duration : '',
                    note: '',
                    ass_price: '',
                    number: '',
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
            this.funcAssembleList(1, 0);
        },
        methods: {
            //时间显示转换
            startformatData: function (row, column) {
                return formatDate(row.end_time, 'yyyy-MM-dd hh:mm')
            },
            // 获取拼团列表
            funcAssembleList: function (page, name) {
                let size = 10;
                let data = {
                    'size': size,
                    'page': page,
                    'name': name
                };
                const success = data => {
                    this.listLoading = false;
                    this.assembleList = data['results'];
                    this.total = data['count']

                };
                service.assembleList(data, success)
            },
            // 分页请求
            handleCurrentChange(val) {
                this.page = val;
                this.funcAssembleList(val, 0)
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                	type: 'warning'
                }).then(() => {
                	this.listLoading = true;
                	let success= data => {
                        this.listLoading = false;
                    }
                    service.deleteAssemble(row.uuid, success())
                	//NProgress.start();
                }).catch(() => {

                });
            },
            //显示编辑界面
            handleEdit: function (index, row) {
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
                let data = {
                    size: 100,
                    page: 1
                }
                const success = data => {
                    this.listLoading = false;
                    this.goodsOptions = data['results']
                    this.total = data['count']
                }
                service.GoodsList(data, success)
            },
            //显示新增界面
            handleAdd: function () {
                this.addFormVisible = true;
                let data = {
                    size: 100,
                    page: 1
                }
                const success = data => {
                    this.listLoading = false;
                    this.goodsOptions = data['results']
                    this.total = data['count']
                }
                service.GoodsList(data, success)
            },
            //编辑砍价
            editSubmit: function () {
                this.$confirm('确认提交吗？', '提示', {}).then(() => {
                    this.editLoading = true;
                    let fileFormData = new FormData();

                    let pic = this.$refs.updatePic.files[0];
                    const success = data => {
                        this.editFormVisible = false;
                    };
                    fileFormData.append('pic', pic,);
                    fileFormData.append('note', this.editForm.note, );
                    fileFormData.append('name', this.editForm.name,);
                    fileFormData.append('ass_price', this.editForm.ass_price,);
                    fileFormData.append('guid',this.editForm.guid,);
                    fileFormData.append('number', this.editForm.number,);
                    fileFormData.append('duration', this.editForm.duration,);
                    service.updateAssemble(this.editForm.uuid, fileFormData, success())
                });
            },
            //添加拼团活动
            addSubmit: function () {
            	this.$refs.addForm.validate((valid) => {
            		if (valid) {
            			this.$confirm('确认提交吗？', '提示', {}).then(() => {
            				this.addLoading = true;
            				//NProgress.start();
                            let fileFormData = new FormData();

                            let pic = this.$refs.Pic.files[0];
                            const success = data => {
                                this.addFormVisible = false;
                            };
                            fileFormData.append('pic', pic,);
                            fileFormData.append('note', this.addForm.note, );
                            fileFormData.append('name', this.addForm.name,);
                            fileFormData.append('ass_price', this.addForm.ass_price,);
                            fileFormData.append('guid',this.addForm.guid,);
                            fileFormData.append('number', this.addForm.number,);
                            fileFormData.append('duration', this.addForm.duration,);
                            service.createAssemble(fileFormData, success)
            			});
            		}
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
            this.funcAssembleList(1, 0);
        }
    }

</script>
<style scoped>
</style>
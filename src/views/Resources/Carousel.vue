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
        <el-table :data="CarouselList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="pic" label="轮播图" width="200" sortable>
            </el-table-column>
            <el-table-column prop="type" label="类型" width="200"  :formatter="formatType" sortable>
            </el-table-column>
            <el-table-column prop="name" label="商品名称" width="200"   sortable>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <!--<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
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
            <el-form :model="addForm" label-width="90px"  ref="addForm">
                <el-form-item label="轮播图类型">
                    <el-radio-group v-model="addForm.car_type">
                        <el-radio :label="0">普通商品</el-radio>
                        <el-radio :label="1">课程</el-radio>
                        <el-radio :label="2">拼团活动</el-radio>
                        <el-radio :label="3">砍价活动</el-radio>
                    </el-radio-group>
                </el-form-item>


                <el-form-item v-show="addForm.car_type==0" label="商品列表">
                    <el-select  v-model="addForm.jump_uuid" placeholder="请选择">
                        <el-option
                                v-for="item in goodsOptions"
                                :key="item.uuid"
                                :label="item.name"
                                :value="item.uuid">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item  v-show="addForm.car_type==1"label="课程列表">
                    <el-select   v-model="addForm.jump_uuid" placeholder="请选择">
                        <el-option
                                v-for="item in currOptions"
                                :key="item.uuid"
                                :label="item.name"
                                :value="item.uuid">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item  v-show="addForm.car_type==2"label="拼团列表">
                    <el-select  v-model="addForm.jump_uuid" placeholder="请选择">
                        <el-option
                                v-for="item in assOptions"
                                :key="item.uuid"
                                :label="item.name"
                                :value="item.uuid">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item  v-show="addForm.car_type==3"label="砍价列表">
                    <el-select  v-model="addForm.jump_uuid" placeholder="请选择">
                        <el-option
                                v-for="item in barOptions"
                                :key="item.uuid"
                                :label="item.name"
                                :value="item.uuid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="主图" prop="pic">
                    <input ref="Pic" type="file" >
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="createCarDetail" :loading="addLoading">提交</el-button>
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
                goodsOptions:'',
                currOptions:'',
                assOptions:'',
                barOptions:'',
                name: '',
                CarouselList: [],
                filters: {
                    title: ''
                },
                //新增界面数据
                addForm: {
                    name: '',
                    car_type: '',
                    jump_uuid: '',

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
            this.getCarouselList();
        },
        methods: {
            // 筛选
            formatType: function (row, column) {
                return row.type == 0 ? '普通商品' : row.type == 1 ? '课程' : row.type == 2 ? '拼团活动' : row.type ==3 ? '砍价活动': ''
            },
            // 获取轮播图列表
            getCarouselList: function () {
                let data = {}
                const success = data => {
                    this.listLoading = false;
                    this.CarouselList = data;
                    this.total = data['count']

                }
                service.listCarDetail(success)
            },
            // 创建轮播图
            createCarDetail: function (){
                this.$confirm('确认提交吗？', '提示', {}).then(() => {
                    let pic = this.$refs.Pic.files[0];
                    let dataForm = new FormData()
                    dataForm.append('car_type', Number(this.addForm.car_type),)
                    dataForm.append('jump_uuid', this.addForm.jump_uuid,)
                    dataForm.append('pic', pic,)
                    const success = data => {
                        this.addFormVisible = false;
                        alert('创建成功')

                    }
                    service.CreateCarDetail(dataForm, success)
                })
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    const success = data => {
                        this.listLoading = false
                        console.log('删除成功', data)
                    }
                    service.deleteCarDetail(row.id, success)

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
                let data = {
                    size : 100,
                    page : 1,
                }
                this.addFormVisible = true;
                const goods_success = data => {
                    this.goodsOptions = data['results']
                }
                const curr_success = data => {
                    this.currOptions = data['results']
                }
                const ass_success = data => {
                    this.assOptions = data['results']
                }
                const bar_success = data => {
                    this.barOptions = data['results']
                }
                // 获取商品；列表
                service.GoodsList(data, goods_success)
                // 获取课程列表
                service.curriculumList(data, curr_success)
                // 获取拼团列表
                service.assembleList(data, ass_success)
                // 获取砍价列表
                service.BargainList(data, bar_success)


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
            this.getCarouselList();
        }
    }

</script>

<style scoped>

</style>
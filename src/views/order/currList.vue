<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bofuncGoodsListom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.order_num" placeholder="订单号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getOrderCurrList(1, filters.order_num)">查询</el-button>
        </el-form-item>
        <!--<el-form-item>-->
        <!--<el-button type="primary" @click="handleAdd">新增</el-button>-->
        <!--</el-form-item>-->
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="orderCurrList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <!--<el-table-column type="selection" width="55">-->
      <!--</el-table-column>-->
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="order_num" label="订单号" width="160" sortable>
      </el-table-column>
      <el-table-column prop="c_type" label="订单类型" width="120" :formatter="formatType" sortable>
      </el-table-column>
      <el-table-column prop="money" label='支付金额' width="120" sortable>
      </el-table-column>
      <el-table-column prop="user" label='购买者' width="100" sortable>
      </el-table-column>
      <el-table-column prop="phone" label='联系方式' width="140" sortable>
      </el-table-column>
      <el-table-column prop="curriculum_name" label='课程名称' width="120" sortable>
      </el-table-column>
      <el-table-column prop="succeed" label='是否支付' width="120" :formatter="formatPay" sortable>
      </el-table-column>
      <!--<el-table-column label="操作" width="250">-->
        <!--<template scope="scope">-->
          <!--&lt;!&ndash;<el-button size="small" @click="handleSee(scope.$index, scope.row)">查看</el-button>&ndash;&gt;-->
          <!--&lt;!&ndash;<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>&ndash;&gt;-->
          <!--&lt;!&ndash;<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>&ndash;&gt;-->
        <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
      </el-pagination>
    </el-col>

    <!--工具条-->
    <!--<el-col :span="24" class="toolbar">-->
    <!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
    <!--&lt;!&ndash;<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">&ndash;&gt;-->
    <!--&lt;!&ndash;</el-pagination>&ndash;&gt;-->
    <!--</el-col>-->

    <!--编辑界面-->
    <el-dialog title="编辑" v-model="editFormVisible"   :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px"  ref="addForm">
        <el-form-item label="快递公司" prop='name'>
          <el-input v-model="editForm.company" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="快递单号" prop='name'>
          <el-input v-model="editForm.express_num" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
    <el-dialog title="商品详情" v-model="watchVisible"   :close-on-click-modal="false">
      <el-row :gutter="20" v-for="i in editForm.goods_list">
        <el-col :span="6"><div class="grid-content bg-purple">商品名称:  {{i.name}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">商品数量: x {{i.num}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><img width="30" height="30" :src=" 'https://www.ymkgdesign.com/'+ i.pic"></div></el-col>
      </el-row>
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
        tableData:[],
        name: '',
        orderCurrList: [],
        filters: {
          order_num: ''
        },
        //新增界面数据
        addForm: {
          name: '',

        },
        //编辑界面数据
        editForm: {
          company: '',
          express_num: '',
        },
        total: 0,
        page: 1,
        listLoading: false,
        sels: [],//列表选中列

        editFormVisible: false,//编辑界面是否显示
        editLoading: false,
        watchVisible: false, // 显示查看页
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
      this.getOrderCurrList(1,0);
    },
    methods: {
      // 订单类型
      formatType: function (row, column) {
        return row.c_type == 1 ? '砍价课程' : row.c_type == 0 ? '普通课程' : '未知';
      },
      // 支付状态
      formatPay: function (row, column) {
        return row.succeed == 1 ? '已付' : row.succeed == 0 ? '未付款' : '未知';
      },
      // 获取商品订单列表
      getOrderCurrList: function (page, order_num) {
        let data = {
          page: page,
          order_num: order_num,
          size: 10
        }

        const success = data => {
          this.listLoading = false;
          this.orderCurrList = data['results']
          this.total = data['count']

        }
        service.orderCurrList(data, success)
      },
      // 创建商品分类
      createClassify: function (){
        let data = {
          name: this.addForm.name,
        }
        const success = data => {
          this.addFormVisible = false;
          alert('创建成功')

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
            console.log('删除成功', data)
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
      handleSee: function (index, row) {
        this.watchVisible = true;
        this.editForm = Object.assign({}, row);
        console.log(this.editForm)

      },
      // 分页请求
      handleCurrentChange(val) {
        this.page = val;
        this.getOrderCurrList(val, 0)
      },
      //编辑
      editSubmit: function () {

        this.$confirm('确认提交吗？', '提示', {}).then(() => {
          this.editLoading = true;
          let data = {
            express_num : this.editForm.express_num,
            company: this.editForm.company,
            ruid: this.editForm.uuid
          };
          const success = data => {
            this.editLoading = false;
            this.editFormVisible = false;
          }
          service.modifyOrderGoods(data, success)
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
      this.getOrderCurrList(1, 0);
    }
  }

</script>

<style scoped>

</style>
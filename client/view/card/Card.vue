<template>
    <el-card>
      <el-button @click="createCards" size="mini">新建卡池</el-button>
      <el-table :data="tableData" style="width: 100%" v-loading="loading.table">
        <el-table-column prop="name" label="卡池">
        </el-table-column>
        <el-table-column prop="up_rate" label="up率">
          <template slot-scope="scope">
            {{scope.row.up_rate}}%
          </template>
        </el-table-column>
        <el-table-column label="up角色">
          <!--<template slot-scope="scope">-->
            <!--{{scope.row.up_rate}}%-->
          <!--</template>-->
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle size="mini"
                       @click="updateCard(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle size="mini"
                       @click="deleteCard(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @current-change="getCardList"
          :current-page.sync="table.currentPage"
          :page-size="table.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="table.total">
        </el-pagination>
      </div>

      <el-dialog :title="dialogTitle" :visible.sync="createDialog" width="50%">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="卡池名称">
            <el-input v-model="form.name" name="name"></el-input>
          </el-form-item>
          <el-form-item label="up率">
            <el-input v-model="form.up_rate" name="up_rate"></el-input>
          </el-form-item>
          <el-form-item label="是否会歪">
            <el-radio-group v-model="form.hasAll">
              <el-radio :label="false" name="hasAll">否</el-radio>
              <el-radio :label="true" name="hasAll">是</el-radio>
            </el-radio-group>
            <template  v-if="form.hasAll">
              歪率<el-input v-model="form.crooked_rate" name="crooked_rate"></el-input>
            </template>
          </el-form-item>

          <el-form-item label="up角色">
            <el-transfer filterable v-model="form.up_role" :data="up_role_date" :render-content="renderFunc">
            </el-transfer>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="createDialog = false">取 消</el-button>
          <el-button type="primary" @click="subCard">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
</template>

<script>
  import {
    getHeroList,
    createCard,
    updateCard,
    getCardList,
    deleteCard,
    queryCardById,
  } from '@/api/api'
  export default {
    data() {
      return {
        createDialog:false,
        up_role_date:[],
        tableData:[],
        dialogTitle:"新建卡池",
        condition: {
          text: "",
        },
        table: {
          total: 0,
          pageSize: 10,
          currentPage: 1,
        },
        loading: {
          table: false,
        },
        form:{
          name:"",
          up_rate:"3",
          hasAll:false,
          crooked_rate:"3",
          up_role:[],
        },
        renderFunc(h, option) {
          return <span><img class="small-img" src={'http://39.98.79.79' + option.portrait}/> { option.label }</span>;
        }
      }
    },
    methods:{
      updateCard(id){
        let para = new FormData();
        para.append("id",id);
        queryCardById(para).then(res=>{
          let data = res.data.data;
          let up_role = data.up_role.split(",");
          for(let i=0;i<up_role.length;i++){
            up_role[i] = Number(up_role[i]);
          }
          this.form = {
            name: data.name,
            up_rate: data.up_rate,
            hasAll: data.hasAll,
            crooked_rate: data.crooked_rate,
            up_role: up_role,
          };
          this.createDialog = true;
        })
      },
      subCard(){
        this.createCard();
      },
      createCard(){
        let para = new FormData(this.$refs.form.$el);
        para.set("up_role",this.form.up_role.join(","));
        createCard(para).then(res=>{
          if (res.data.status) {
            this.$message.success(res.data.msg);
            this.createDialog = false;
          } else {
            this.$message.error(res.data.msg);
          }
        })
      },
      createCards(){
        this.createDialog = true;
      },
      getCardList() {
        let para = new FormData();
        para.append("currentPage", this.table.currentPage);
        para.append("pageSize", this.table.pageSize);
        para.append("text", this.condition.text);
        this.loading.table = true;
        getCardList(para).then(res => {
          this.loading.table = false;
          if (res.data.status) {
            this.table.total = res.data.data.count;
            this.tableData = res.data.data.rows;
          }
        })
      }
    },
    mounted(){
      this.getCardList();
      let para = new FormData();
      para.append("top",true);
      getHeroList(para).then(res=>{
        let data = res.data.data;
        for(let i=0;i<data.length;i++){
          this.up_role_date.push({key:data[i].id,label:data[i].name,portrait:data[i].portrait});
        }
      })
    }
  }
</script>

<style scoped>

</style>
<style>
  .hero-create-container .form-custom .el-col {
    margin-top: 15px;
  }
  .el-transfer-panel__filter.el-input{
    width:auto;
  }
  .small-img{
    width:20px;
    height:20px;
  }
</style>

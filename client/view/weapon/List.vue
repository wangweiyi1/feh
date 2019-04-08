<template>
    <div>
      <el-card>
        <el-button @click="linkCreateWeapon" size="mini">新建武器</el-button>
        <el-row style="text-align: right;">
          <el-input v-model="condition.text" @input="updateCondition" size="mini" placeholder="搜索"
                    prefix-icon="el-icon-search"></el-input>
        </el-row>
        <el-table :data="weaponList" style="width: 100%" v-loading="loading.table">
          <el-table-column prop="name" label="技能">
          </el-table-column>
          <el-table-column prop="description" label="简介" width="400">
          </el-table-column>
          <el-table-column prop="type" label="类型">
          </el-table-column>
          <el-table-column prop="sp" label="所需sp">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="updateWeapon(scope.row.id)"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="deleteWeapon(scope.row.id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            @current-change="getWeaponList"
            :current-page.sync="table.currentPage"
            :page-size="table.pageSize"
            layout="total, prev, pager, next"
            :total="table.total">
          </el-pagination>
        </div>
      </el-card>
    </div>
</template>

<script>
  import {getWeaponList,deleteWeapon} from '@/api/api'
  export default {
    data() {
      return {
        weaponList: [],
        condition:{
          text:""
        },
        table:{
          total:0,
          pageSize:10,
          currentPage:1,
        },
        loading:{
          table:false,
        }
      }
    },
    methods:{
      deleteWeapon(id){
        this.$confirm('是否确认删除此武器?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let para = new FormData();
          para.append("id",id);
          deleteWeapon(para).then(res=>{
            if(res.data.status){
              this.getWeaponList();
              this.$message.success(res.data.msg);
            }else{
              this.$message.error(res.data.msg);
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      updateCondition(){
        this.getWeaponList();
      },
      updateWeapon(id){
        this.$router.push({ path: '/weapon/create',query:{id:id} });
      },
      linkCreateWeapon(){
        this.$router.push({ path: '/weapon/create' });
      },
      getWeaponList(){
        let para = new FormData();
        para.append("currentPage",this.table.currentPage);
        para.append("pageSize",this.table.pageSize);
        para.append("text",this.condition.text);
        this.loading.table = true;
        getWeaponList(para).then(res => {
          console.log(res.data.data);
          this.loading.table = false;
          if(res.data.status){
            this.table.total = res.data.data.count;
            this.weaponList = res.data.data.rows;
          }
        })
      }
    },
    mounted(){
      this.getWeaponList();
    }
  }
</script>

<style scoped>
  .pagination{
    text-align: right;
  }
</style>

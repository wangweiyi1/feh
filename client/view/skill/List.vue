<template>
    <div>
      <el-card>
        <el-button @click="linkCreateSkill" size="mini">新建技能</el-button>
        <el-table :data="skillList" style="width: 100%" v-loading="loading.table">
          <el-table-column prop="name" label="技能">
          </el-table-column>
          <el-table-column prop="description" label="简介" width="400">
          </el-table-column>
          <el-table-column prop="position" label="位置">
          </el-table-column>
          <el-table-column prop="sp" label="所需sp">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="updateSkill(scope.row.id)"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="deleteSkill(scope.row.id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            @current-change="getSkillList"
            :current-page.sync="table.currentPage"
            :page-size="table.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="table.total">
          </el-pagination>
        </div>
      </el-card>
    </div>
</template>

<script>
  import {getSkillList,deleteSkill} from '@/api/api'
  export default {
    data() {
      return {
        skillList: [],
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
      deleteSkill(id){
        this.$confirm('是否确认删除此技能?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let para = new FormData();
          para.append("id",id);
          deleteSkill(para).then(res=>{
            if(res.data.status){
              this.getSkillList();
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
      updateSkill(id){
        this.$router.push({ path: '/skill/create',query:{id:id} });
      },
      linkCreateSkill(){
        this.$router.push({ path: '/skill/create' });
      },
      getSkillList(){
        let para = new FormData();
        para.append("currentPage",this.table.currentPage);
        para.append("pageSize",this.table.pageSize);
        this.loading.table = true;
        getSkillList(para).then(res => {
          this.loading.table = false;
          if(res.data.status){
            this.table.total = res.data.data.count;
            this.skillList = res.data.data.table;
          }
        })
      }
    },
    mounted(){
      this.getSkillList();
    }
  }
</script>

<style scoped>
  .pagination{
    text-align: right;
  }
</style>

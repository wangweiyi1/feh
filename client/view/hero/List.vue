<template>
  <div>
    <el-card>
      <el-row>
        <el-col :span="4">
          <el-button @click="linkCreateSkill" size="mini">新建英雄</el-button>
        </el-col>
        <el-col :span="20" class="conditon-list">
          <!--<el-radio-group v-model="condition.position" @change="updateCondition" size="mini">-->
            <!--<el-radio-button label="">All</el-radio-button>-->
            <!--<el-radio-button label="a">A</el-radio-button>-->
            <!--<el-radio-button label="b">B</el-radio-button>-->
            <!--<el-radio-button label="c">C</el-radio-button>-->
            <!--<el-radio-button label="sup">辅助技能</el-radio-button>-->
            <!--<el-radio-button label="kill">奥义</el-radio-button>-->
            <!--<el-radio-button label="seal">圣印</el-radio-button>-->
          <!--</el-radio-group>-->
          <el-input v-model="condition.text" @input="updateCondition" size="mini" placeholder="搜索"
                    prefix-icon="el-icon-search"></el-input>
        </el-col>
      </el-row>
      <el-table :data="skillList" style="width: 100%" v-loading="loading.table">
        <el-table-column label="头像" width="100">
          <template slot-scope="scope">
            <img :src="'http://39.98.79.79'+scope.row.portrait" class="portrait" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名字">
        </el-table-column>
        <el-table-column prop="weapon" label="武器类型">
          <template slot-scope="scope">
            <img :src="'/static/img/icon/'+scope.row.weapon+'.png'" class="icon" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="move" label="移动类型">
          <template slot-scope="scope">
            <img :src="'/static/img/icon/'+scope.row.move+'.png'" class="icon" alt="">
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle size="mini"
                       @click="updateSkill(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle size="mini"
                       @click="deleteSkill(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @current-change="getHeroList"
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
  import {getHeroList, deleteSkill} from '@/api/api'

  export default {
    data() {
      return {
        skillList: [],
        condition: {
          text: "",
          position: "",
          level: true,
        },
        table: {
          total: 0,
          pageSize: 10,
          currentPage: 1,
        },
        loading: {
          table: false,
        }
      }
    },
    methods: {
      deleteSkill(id) {
        this.$confirm('是否确认删除此技能?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let para = new FormData();
          para.append("id", id);
          deleteSkill(para).then(res => {
            if (res.data.status) {
              this.getSkillList();
              this.$message.success(res.data.msg);
            } else {
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
      updateSkill(id) {
        this.$router.push({path: '/hero/create', query: {id: id}});
      },
      linkCreateSkill() {
        this.$router.push({path: '/hero/create'});
      },
      updateCondition() {
        this.table.currentPage = 1;
        this.getHeroList();
      },
      getHeroList() {
        let para = new FormData();
        para.append("currentPage", this.table.currentPage);
        para.append("pageSize", this.table.pageSize);
        para.append("level", this.condition.level);
        para.append("position", this.condition.position);
        para.append("text", this.condition.text);
        this.loading.table = true;
        getHeroList(para).then(res => {
          console.log(res);
          this.loading.table = false;
          if (res.data.status) {
            this.table.total = res.data.data.count;
            this.skillList = res.data.data.rows;
          }
        })
      }
    },
    mounted() {
      this.getHeroList();
    }
  }
</script>

<style scoped>
  .pagination {
    text-align: right;
  }

  .conditon-list {
    text-align: right;
  }

  .portrait{
    width:50px;
    height:50px;
  }
</style>

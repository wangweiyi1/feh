<template>
  <div>
    <el-card v-loading="loading">
      <el-form ref="form" :model="form" label-width="200px">
        <el-form-item label="英雄名称">
          <el-input v-model="form.name" name="name"></el-input>
        </el-form-item>
        <el-form-item label="英雄简介">
          <el-input type="textarea" name="description" style="width:400px;" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="登场作品">
          <el-select v-model="form.from" placeholder="请选择" name="from">
            <el-option v-for="item in worksList" :key="item.key" :label="item.value" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否是真五">
          <el-radio-group v-model="form.top">
            <el-radio :label="true" name="position">是</el-radio>
            <el-radio :label="false" name="position">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否是大英雄或者涡战英雄">
          <el-radio-group v-model="form.special_hero">
            <el-radio :label="true" name="position">是</el-radio>
            <el-radio :label="false" name="position">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="移动方式">
          <el-radio-group v-model="form.select_move" size="small">
            <template v-for="item in moveList">
              <el-radio :label="item.key" name="select_move" border>{{item.value}}</el-radio>
            </template>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="武器类型">
          <el-radio-group v-model="form.select_weapon" size="small">
            <template v-for="item in weaponList">
              <el-radio :label="item.key" name="select_weapon" border>{{item.value}}</el-radio>
            </template>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="影响属性">
          HP:
          <el-input-number v-model="form.hp" name="hp" class="input-shot"></el-input-number>
          ATK:
          <el-input-number v-model="form.atk" name="atk" class="input-shot"></el-input-number>
          SPD:
          <el-input-number v-model="form.spd" name="spd" class="input-shot"></el-input-number>
          DEF:
          <el-input-number v-model="form.def" name="def" class="input-shot"></el-input-number>
          RES:
          <el-input-number v-model="form.res" name="res" class="input-shot"></el-input-number>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="small" @click="submitSkill">提交</el-button>
          <el-button size="small" @click="$router.push({path: '/skill/list'})">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import data from '@/data/data';
  import {createSkill, querySkillById, updateSkill} from '@/api/api'

  export default {
    data() {
      return {
        id: 0,
        update: false,
        loading: false,
        weaponList: data.weaponList,
        moveList: data.moveList,
        worksList: [],
        form: {
          name: "",
          description: "",
          top:false,
          special_hero:false,
          from: "",
          select_weapon: "sword",
          select_move: "walk",
          levelFive:{
            hp: 0,
            atk: 0,
            spd: 0,
            def: 0,
            res: 0,
          },
        },
      }
    },
    methods: {
      submitSkill() {
        if (this.update) {
          this.updateSkill();
        } else {
          this.createSkill();
        }
      },
      createSkill() {
        let para = new FormData(this.$refs.form.$el);
        this.loading = true;
        createSkill(para).then(res => {
          this.loading = false;
          if (res.data.status) {
            this.$message.success(res.data.msg);
            // this.$router.push({path: '/skill/list'});
          } else {
            this.$message.error(res.data.msg);
          }
        })
      },
      updateSkill() {
        let para = new FormData(this.$refs.form.$el);
        para.append("id", this.id);
        this.loading = true;
        updateSkill(para).then(res => {
          this.loading = false;
          if (res.data.status) {
            this.$router.push({path: '/skill/list'});
            this.$message.success(res.data.msg);
          } else {
            this.$message.error(res.data.msg);
          }
        })
      },
      querySkill() {
        let para = new FormData();
        para.append("id", this.id);
        this.loading = true;
        querySkillById(para).then(res => {
          this.loading = false;
          let data = res.data.data;
          data.select_move = data.select_move.split(",");
          data.select_weapon = data.select_weapon.split(",");
          this.form = data;
        })
      }
    },
    mounted() {
      if (this.$route.query.id) {
        this.id = this.$route.query.id;
        this.update = true;
        this.querySkill();
      }
    }
  }
</script>

<style scoped>

</style>

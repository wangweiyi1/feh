<template>
  <div>
    <el-card v-loading="loading">
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="技能名称">
          <el-input v-model="form.name" name="name"></el-input>
        </el-form-item>
        <el-form-item label="技能简介">
          <el-input type="textarea" name="description" style="width:400px;" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="学习所需sp">
          <el-select v-model="form.sp" placeholder="请选择" name="sp">
            <el-option v-for="item in spList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="技能等级">
          <el-input-number v-model="form.level" name="level" :min="1" :max="4"></el-input-number>
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
          白值:
          <el-select v-model="form.attribute" placeholder="请选择" name="attribute" style="width:120px;">
            <el-option v-for="item in attributeList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="技能位置">
          <el-radio-group v-model="form.position">
            <el-radio label="a" name="position">A</el-radio>
            <el-radio label="b" name="position">B</el-radio>
            <el-radio label="c" name="position">C</el-radio>
            <el-radio label="sup" name="position">辅助技能</el-radio>
            <el-radio label="kill" name="position">奥义</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="奥义CD" v-if="form.position == 'kill'">
          <el-input-number v-model="form.cd" name="cd" :min="1" :max="5"></el-input-number>
        </el-form-item>
        <el-form-item label="是否是专属技能">
          <el-radio-group v-model="form.exclusive">
            <el-radio :label="true" name="exclusive">是</el-radio>
            <el-radio :label="false" name="exclusive">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否可以锻造成圣印">
          <el-radio-group v-model="form.build">
            <el-radio :label="true" name="build">是</el-radio>
            <el-radio :label="false" name="build">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="可以使用的移动方式">
          <el-checkbox-group v-model="form.select_move" size="small">
            <template v-for="item in moveList">
              <el-checkbox :label="item.key" name="select_move" border>{{item.value}}</el-checkbox>
            </template>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="可以使用的武器类型">
          <el-checkbox-group v-model="form.select_weapon" size="small">
            <template v-for="item in weaponList">
              <el-checkbox :label="item.key" name="select_weapon" border>{{item.value}}</el-checkbox>
            </template>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="small" @click="submitSkill">提交</el-button>
          <el-button size="small">取消</el-button>
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
        form: {
          name: "",
          position: "a",
          description: "",
          exclusive: false,
          sp: "",
          level: 1,
          build: false,
          cd: 1,
          select_weapon: [],
          select_move: [],
          hp: 0,
          atk: 0,
          spd: 0,
          def: 0,
          res: 0,
          attribute:0,
        },
        spList: [
          {value: 40, label: '40'},
          {value: 50, label: '50'},
          {value: 60, label: '60'},
          {value: 70, label: '70'},
          {value: 80, label: '80'},
          {value: 100, label: '100'},
          {value: 120, label: '120'},
          {value: 150, label: '150'},
          {value: 160, label: '160'},
          {value: 200, label: '200'},
          {value: 240, label: '240'},
          {value: 300, label: '300'},
          {value: 350, label: '350'},
          {value: 400, label: '400'},
        ],
        attributeList:[
          {value: 0, label: '0'},
          {value: 160, label: '160'},
          {value: 165, label: '165'},
          {value: 170, label: '170'},
        ]
      }
    },
    created() {
      for (let i = 0; i < data.weaponList.length; i++) {
        this.form.select_weapon.push(data.weaponList[i].key);
      }
      for (let i = 0; i < data.moveList.length; i++) {
        this.form.select_move.push(data.moveList[i].key);
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
          data.build = (data.build.data[0] == 1) ? true : false;
          data.exclusive = (data.exclusive.data[0] == 1) ? true : false;
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

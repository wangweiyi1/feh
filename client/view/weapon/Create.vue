<template>
  <div>
    <el-card v-loading="loading">
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="武器名称">
          <el-input v-model="form.name" name="name"></el-input>
        </el-form-item>
        <el-form-item label="武器简介">
          <el-input type="textarea" name="description" style="width:400px;" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="学习所需sp">
          <el-select v-model="form.sp" placeholder="请选择" name="sp">
            <el-option v-for="item in spList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="武器类型">
          <el-radio-group v-model="form.type" size="small">
            <template v-for="item in weaponList">
              <el-radio :label="item.key" name="type" border>
                {{item.value}}
                <!--<img class="weapon-icon" :src="'/static/img/icon/' + item.key + '.png'" alt="">-->
              </el-radio>
            </template>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否是专属武器">
          <el-radio-group v-model="form.exclusive">
            <el-radio :label="true" name="exclusive">是</el-radio>
            <el-radio :label="false" name="exclusive">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否是锻造后的武器">
          <el-radio-group v-model="form.build">
            <el-radio :label="true" name="build">是</el-radio>
            <el-radio :label="false" name="build">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="锻造前的武器" v-if="form.build">
          <el-select v-model="form.build_id" placeholder="请选择" filterable>
            <el-option v-for="item in baseWeaponList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="锻造前的武器" v-if="form.build">
          <!--stone: {type: Sequelize.INTEGER},-->
          <!--medals: {type: Sequelize.INTEGER},-->
          <!--water: {type: Sequelize.INTEGER},-->
          奖牌
          <el-input v-model="form.stone" name="stone"></el-input>
          炼成石
          <el-input v-model="form.medals" name="medals"></el-input>
          水滴
          <el-input v-model="form.water" name="water"></el-input>
        </el-form-item>
        <el-form-item label="影响属性">
          HP: <el-input-number v-model="form.hp" name="hp" class="input-shot"></el-input-number>
          ATK: <el-input-number v-model="form.atk" name="atk" class="input-shot"></el-input-number>
          ATK2: <el-input-number v-model="form.atk2" name="atk2" class="input-shot"></el-input-number>
          SPD: <el-input-number v-model="form.spd" name="spd" class="input-shot"></el-input-number>
          DEF: <el-input-number v-model="form.def" name="def" class="input-shot"></el-input-number>
          RES: <el-input-number v-model="form.res" name="res" class="input-shot"></el-input-number>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="small" @click="submitWeapon">提交</el-button>
          <el-button size="small">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import data from '@/data/data';
  import {createWeapon,queryWeaponById,updateWeapon,queryBaseWeapon} from '@/api/api'

  export default {
    data() {
      return {
        id:0,
        update:false,
        loading:false,
        weaponList:data.weaponList,
        moveList:data.moveList,
        baseWeaponList:[],
        spList: [
          {value: 50, label: '50'},
          {value: 100, label: '100'},
          {value: 200, label: '200'},
          {value: 300, label: '300'},
          {value: 350, label: '350'},
          {value: 400, label: '400'},
        ],
        form:{
          name:"",
          description:"",
          exclusive:false,
          sp:"",
          type:"axe",
          build_id:"",
          build:false,
          medals:0,
          stone:0,
          water:0,
          hp:0,
          atk:0,
          atk2:0,
          spd:0,
          def:0,
          res:0,
        }
      }
    },
    methods:{
      submitWeapon(){
        if(this.update){
          this.updateWeapon();
        }else{
          this.createWeapon();
        }
      },
      createWeapon(){
        let para = new FormData(this.$refs.form.$el);
        para.append("build_id",this.form.build_id);
        this.loading = true;
        createWeapon(para).then(res=>{
          this.loading = false;
          if(res.data.status){
            this.$message.success(res.data.msg);
            this.queryBaseWeapon();
          }else{
            this.$message.error(res.data.msg);
          }
        })
      },
      updateWeapon(){
        let para = new FormData(this.$refs.form.$el);
        para.append("id",this.id);
        para.append("build_id",this.form.build_id);
        this.loading = true;
        updateWeapon(para).then(res=>{
          this.loading = false;
          if(res.data.status){
            this.$router.push({ path: '/weapon/list' });
            this.$message.success(res.data.msg);
          }else{
            this.$message.error(res.data.msg);
          }
        })
      },
      queryWeapon(){
        let para = new FormData();
        para.append("id",this.id);
        this.loading = true;
        queryWeaponById(para).then(res=>{
          this.loading = false;
          let data = res.data.data;
          if(data.build_id == null){
            data.build_id = "";
          }
          console.log(data);
          this.form = data;
        })
      },
      queryBaseWeapon(){
        queryBaseWeapon().then(res=>{
          let data = res.data.data;
          this.baseWeaponList = data;
        });
      }
    },
    mounted(){
      if (this.$route.query.id) {
        this.id = this.$route.query.id;
        this.update = true;
        this.queryWeapon();
      }
      this.queryBaseWeapon();
    }
  }
</script>

<style scoped>
  .weapon-icon{
    width:20px;
    height:20px;
  }
</style>

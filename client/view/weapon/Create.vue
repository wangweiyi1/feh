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
          <el-input v-model="form.sp" name="sp"></el-input>
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
        <el-form-item label="影响属性">
          HP: <el-input-number v-model="form.hp" name="hp" class="input-shot"></el-input-number>
          ATK: <el-input-number v-model="form.atk" name="atk" class="input-shot"></el-input-number>
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
        form:{
          name:"",
          description:"",
          exclusive:false,
          sp:"",
          type:"sword",
          build_id:"",
          build:false,
          hp:0,
          atk:0,
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
          data.build = (data.build.data[0] == 1) ? true : false;
          data.exclusive = (data.exclusive.data[0] == 1) ? true : false;
          if(data.build_id == null){
            data.build_id = "";
          }
          console.log(data);
          this.form = data;
        })
      }
    },
    mounted(){
      if (this.$route.query.id) {
        this.id = this.$route.query.id;
        this.update = true;
        this.queryWeapon();
      }
      queryBaseWeapon().then(res=>{
        let data = res.data.data;
        this.baseWeaponList = data;
      });
    }
  }
</script>

<style scoped>
  .weapon-icon{
    width:20px;
    height:20px;
  }
</style>

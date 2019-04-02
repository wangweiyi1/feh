<template>
  <div class="hero-create-container">
    <el-card v-loading="loading">
      <el-form ref="form" :model="form" label-width="200px">
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="http://39.98.79.79:80/hero/uploadPortrait"
            :show-file-list="false" name="file" :data="fileData"
            :on-success="handleAvatarSuccess">
            <img v-if="imageUrl" :src="imageUrl" name="portrait" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="英雄名称">
          <el-input v-model="form.name" name="name"></el-input>
        </el-form-item>
        <el-form-item label="英雄简介">
          <el-input type="textarea" name="description" style="width:400px;" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="登场作品">
          <el-select v-model="form.production" placeholder="请选择" name="production">
            <el-option v-for="item in productionList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否是限定英雄">
          <el-radio-group v-model="form.limit">
            <el-radio :label="true" name="limit">是</el-radio>
            <el-radio :label="false" name="limit">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否是大英雄或者涡战英雄">
          <el-radio-group v-model="form.special_hero">
            <el-radio :label="true" name="special_hero">是</el-radio>
            <el-radio :label="false" name="special_hero">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="移动方式">
          <el-radio-group v-model="form.move" size="small">
            <template v-for="item in moveList">
              <el-radio :label="item.key" name="move" border>{{item.value}}</el-radio>
            </template>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="武器类型">
          <el-radio-group v-model="form.weapon" size="small">
            <template v-for="item in weaponTypeList">
              <el-radio :label="item.key" name="weapon" border>{{item.value}}</el-radio>
            </template>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否是真五">
          <el-radio-group v-model="form.top">
            <el-radio :label="true" name="top">是</el-radio>
            <el-radio :label="false" name="top">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="优势性格">
          <el-checkbox-group v-model="form.good_character" size="small">
            <template v-for="item in characterList">
              <el-checkbox :label="item.key" name="good_character" border>{{item.value}}</el-checkbox>
            </template>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="劣势性格">
          <el-checkbox-group v-model="form.bad_character" size="small">
            <template v-for="item in characterList">
              <el-checkbox :label="item.key" name="bad_character" border>{{item.value}}</el-checkbox>
            </template>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="">
          <el-tabs v-model="activeName">
            <el-tab-pane label="五星" name="first">
              <el-row class="form-custom">
                <el-col :span="2" class="title">1级属性</el-col>
                <el-col :span="22">
                  HP:
                  <el-input v-model="form.levelFive.level1_hp" name="levelFive.level1_hp" class="input-shot"></el-input>
                  ATK:
                  <el-input v-model="form.levelFive.level1_atk" name="levelFive.level1_atk"
                            class="input-shot"></el-input>
                  SPD:
                  <el-input v-model="form.levelFive.level1_spd" name="levelFive.level1_spd"
                            class="input-shot"></el-input>
                  DEF:
                  <el-input v-model="form.levelFive.level1_def" name="levelFive.level1_def"
                            class="input-shot"></el-input>
                  RES:
                  <el-input v-model="form.levelFive.level1_res" name="levelFive.level1_res"
                            class="input-shot"></el-input>
                </el-col>

                <el-col :span="2" class="title">40级属性</el-col>
                <el-col :span="22">
                  HP:
                  <el-input v-model="form.levelFive.level40_hp" name="levelFive.level40_hp"
                            class="input-shot"></el-input>
                  ATK:
                  <el-input v-model="form.levelFive.level40_atk" name="levelFive.level40_atk"
                            class="input-shot"></el-input>
                  SPD:
                  <el-input v-model="form.levelFive.level40_spd" name="levelFive.level40_spd"
                            class="input-shot"></el-input>
                  DEF:
                  <el-input v-model="form.levelFive.level40_def" name="levelFive.level40_def"
                            class="input-shot"></el-input>
                  RES:
                  <el-input v-model="form.levelFive.level40_res" name="levelFive.level40_res"
                            class="input-shot"></el-input>
                </el-col>

                <el-col :span="2" class="title">武器</el-col>
                <el-col :span="22">
                  <el-select v-model="form.levelFive.weapon" name="levelFive.weapon" placeholder="请选择" filterable clearable>
                    <el-option v-for="item in weaponList" v-if="checkWeapon(item.type)" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>

                <el-col :span="2" class="title">辅助技能</el-col>
                <el-col :span="22">
                  <el-select v-model="form.levelFive.sup" name="levelFive.sup" placeholder="请选择" filterable clearable>
                    <el-option v-for="item in skillList" v-if="item.position == 'sup'" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>

                <el-col :span="2" class="title">奥义</el-col>
                <el-col :span="22">
                  <el-select v-model="form.levelFive.kill" name="levelFive.kill" placeholder="请选择" filterable clearable>
                    <el-option v-for="item in skillList" v-if="item.position == 'kill'" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>

                <el-col :span="2" class="title">A</el-col>
                <el-col :span="22">
                  <el-select v-model="form.levelFive.a" name="levelFive.a" placeholder="请选择" filterable clearable>
                    <el-option v-for="item in skillList" v-if="item.position == 'a'" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>

                <el-col :span="2" class="title">B</el-col>
                <el-col :span="22">
                  <el-select v-model="form.levelFive.b" name="levelFive.b" placeholder="请选择" filterable clearable>
                    <el-option v-for="item in skillList" v-if="item.position == 'b'" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>

                <el-col :span="2" class="title">C</el-col>
                <el-col :span="22">
                  <el-select v-model="form.levelFive.c" name="levelFive.c" placeholder="请选择" filterable clearable>
                    <el-option v-for="item in skillList" v-if="item.position == 'c'" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="四星" name="second">
              <el-radio-group v-model="form.hasFour" name="hasFour">
                <el-radio :label="true">有四星版本</el-radio>
                <el-radio :label="false">无四星版本</el-radio>
              </el-radio-group>
              <el-row class="form-custom" v-if="form.hasFour">
                <el-col :span="2" class="title">1级属性</el-col>
                <el-col :span="22">
                  HP:
                  <el-input v-model="form.levelFour.level1_hp" name="levelFour.level1_hp" class="input-shot"></el-input>
                  ATK:
                  <el-input v-model="form.levelFour.level1_atk" name="levelFour.level1_atk"
                            class="input-shot"></el-input>
                  SPD:
                  <el-input v-model="form.levelFour.level1_spd" name="levelFour.level1_spd"
                            class="input-shot"></el-input>
                  DEF:
                  <el-input v-model="form.levelFour.level1_def" name="levelFour.level1_def"
                            class="input-shot"></el-input>
                  RES:
                  <el-input v-model="form.levelFour.level1_res" name="levelFour.level1_res"
                            class="input-shot"></el-input>
                </el-col>

                <el-col :span="2" class="title">40级属性</el-col>
                <el-col :span="22">
                  HP:
                  <el-input v-model="form.levelFour.level40_hp" name="levelFour.level40_hp"
                            class="input-shot"></el-input>
                  ATK:
                  <el-input v-model="form.levelFour.level40_atk" name="levelFour.level40_atk"
                            class="input-shot"></el-input>
                  SPD:
                  <el-input v-model="form.levelFour.level40_spd" name="levelFour.level40_spd"
                            class="input-shot"></el-input>
                  DEF:
                  <el-input v-model="form.levelFour.level40_def" name="levelFour.level40_def"
                            class="input-shot"></el-input>
                  RES:
                  <el-input v-model="form.levelFour.level40_res" name="levelFour.level40_res"
                            class="input-shot"></el-input>
                </el-col>

                <el-col :span="2" class="title">武器</el-col>
                <el-col :span="22">
                  <el-select v-model="form.levelFour.weapon" name="levelFour.weapon" placeholder="请选择">
                    <el-option v-for="item in weaponList" v-if="checkWeapon(item.type)" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>

                <el-col :span="2" class="title">辅助技能</el-col>
                <el-col :span="22">
                  <el-select v-model="form.levelFour.sup" name="levelFour.sup" placeholder="请选择">
                    <el-option v-for="item in skillList" v-if="item.position == 'sup'" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>

                <el-col :span="2" class="title">奥义</el-col>
                <el-col :span="22">
                  <el-select v-model="form.levelFour.kill" name="levelFour.kill" placeholder="请选择">
                    <el-option v-for="item in skillList" v-if="item.position == 'kill'" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>

                <el-col :span="2" class="title">A</el-col>
                <el-col :span="22">
                  <el-select v-model="form.levelFour.a" name="levelFour.a" placeholder="请选择">
                    <el-option v-for="item in skillList" v-if="item.position == 'a'" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>

                <el-col :span="2" class="title">B</el-col>
                <el-col :span="22">
                  <el-select v-model="form.levelFour.b" name="levelFour.b" placeholder="请选择">
                    <el-option v-for="item in skillList" v-if="item.position == 'b'" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>

                <el-col :span="2" class="title">C</el-col>
                <el-col :span="22">
                  <el-select v-model="form.levelFour.c" name="levelFour.c" placeholder="请选择">
                    <el-option v-for="item in skillList" v-if="item.position == 'c'" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="三星" name="third">
              <el-radio-group v-model="form.hasThree" name="hasThree">
                <el-radio :label="true">有三星版本</el-radio>
                <el-radio :label="false">无三星版本</el-radio>
              </el-radio-group>
              <el-row class="form-custom" v-if="form.hasThree">
                <el-col :span="2" class="title">1级属性</el-col>
                <el-col :span="22">
                  HP:
                  <el-input v-model="form.levelThree.level1_hp" name="levelThree.level1_hp" class="input-shot"></el-input>
                  ATK:
                  <el-input v-model="form.levelThree.level1_atk" name="levelThree.level1_atk"
                            class="input-shot"></el-input>
                  SPD:
                  <el-input v-model="form.levelThree.level1_spd" name="levelThree.level1_spd"
                            class="input-shot"></el-input>
                  DEF:
                  <el-input v-model="form.levelThree.level1_def" name="levelThree.level1_def"
                            class="input-shot"></el-input>
                  RES:
                  <el-input v-model="form.levelThree.level1_res" name="levelThree.level1_res"
                            class="input-shot"></el-input>
                </el-col>

                <el-col :span="2" class="title">40级属性</el-col>
                <el-col :span="22">
                  HP:
                  <el-input v-model="form.levelThree.level40_hp" name="levelThree.level40_hp"
                            class="input-shot"></el-input>
                  ATK:
                  <el-input v-model="form.levelThree.level40_atk" name="levelThree.level40_atk"
                            class="input-shot"></el-input>
                  SPD:
                  <el-input v-model="form.levelThree.level40_spd" name="levelThree.level40_spd"
                            class="input-shot"></el-input>
                  DEF:
                  <el-input v-model="form.levelThree.level40_def" name="levelThree.level40_def"
                            class="input-shot"></el-input>
                  RES:
                  <el-input v-model="form.levelThree.level40_res" name="levelThree.level40_res"
                            class="input-shot"></el-input>
                </el-col>

                <el-col :span="2" class="title">武器</el-col>
                <el-col :span="22">
                  <el-select v-model="form.levelThree.weapon" name="levelThree.weapon" placeholder="请选择">
                    <el-option v-for="item in weaponList" v-if="checkWeapon(item.type)" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>

                <el-col :span="2" class="title">辅助技能</el-col>
                <el-col :span="22">
                  <el-select v-model="form.levelThree.sup" name="levelThree.sup" placeholder="请选择">
                    <el-option v-for="item in skillList" v-if="item.position == 'sup'" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>

                <el-col :span="2" class="title">奥义</el-col>
                <el-col :span="22">
                  <el-select v-model="form.levelThree.kill" name="levelThree.kill" placeholder="请选择">
                    <el-option v-for="item in skillList" v-if="item.position == 'kill'" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>

                <el-col :span="2" class="title">A</el-col>
                <el-col :span="22">
                  <el-select v-model="form.levelThree.a" name="levelThree.a" placeholder="请选择">
                    <el-option v-for="item in skillList" v-if="item.position == 'a'" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>

                <el-col :span="2" class="title">B</el-col>
                <el-col :span="22">
                  <el-select v-model="form.levelThree.b" name="levelThree.b" placeholder="请选择">
                    <el-option v-for="item in skillList" v-if="item.position == 'b'" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>

                <el-col :span="2" class="title">C</el-col>
                <el-col :span="22">
                  <el-select v-model="form.levelThree.c" name="levelThree.c" placeholder="请选择">
                    <el-option v-for="item in skillList" v-if="item.position == 'c'" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-tab-pane>


          </el-tabs>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="small" @click="submit">提交</el-button>
          <el-button size="small" @click="$router.push({path: '/hero/list'})">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import data from '@/data/data';
  import {
    querySkillById,
    getSkillList,
    uploadPortrait,
    queryAllProduction,
    createHero,
    updateHero,
    deleteHeroById,
    getWeaponList
  } from '@/api/api'

  export default {
    data() {
      return {
        id: 0,
        imageUrl: "",
        portraitUrl:"",
        value: "",
        fileData: {
          id: 0
        },
        update: false,
        updated: false,
        loading: false,
        weaponTypeList: data.weaponList,
        moveList: data.moveList,
        productionList: [],
        skillList: [],
        weaponList:[],
        characterList: [
          {key: "hp", value: "HP"},
          {key: "atk", value: "攻击"},
          {key: "spd", value: "速度"},
          {key: "def", value: "防守"},
          {key: "res", value: "魔抗"},
        ],
        levels: ["4", "3"],
        activeName: "first",
        form: {
          name: "",
          description: "",
          limit: false,
          top: false,
          special_hero: false,
          production: "",
          weapon: "sword",
          move: "walk",
          good_character: [],
          bad_character: [],
          hasFour:false,
          hasThree:false,
          levelFive: {
            level1_hp: 0,
            level1_atk: 0,
            level1_spd: 0,
            level1_def: 0,
            level1_res: 0,
            level40_hp: 0,
            level40_atk: 0,
            level40_spd: 0,
            level40_def: 0,
            level40_res: 0,
            weapon: "",
            sup: "",
            kill: "",
            a: "",
            b: "",
            c: "",
          },
          levelFour: {
            level1_hp: 0,
            level1_atk: 0,
            level1_spd: 0,
            level1_def: 0,
            level1_res: 0,
            level40_hp: 0,
            level40_atk: 0,
            level40_spd: 0,
            level40_def: 0,
            level40_res: 0,
            weapon: "",
            sup: "",
            kill: "",
            a: "",
            b: "",
            c: "",
          },
          levelThree: {
            level1_hp: 0,
            level1_atk: 0,
            level1_spd: 0,
            level1_def: 0,
            level1_res: 0,
            level40_hp: 0,
            level40_atk: 0,
            level40_spd: 0,
            level40_def: 0,
            level40_res: 0,
            weapon: "",
            sup: "",
            kill: "",
            a: "",
            b: "",
            c: "",
          },
        },
      }
    },
    methods: {
      checkWeapon(type){
        let result = false;
        let weapon = this.form.weapon;
        if(weapon.indexOf('dragon') != -1){
          weapon = 'dragon';
        }
        if(weapon.indexOf('bow') != -1){
          weapon = 'bow';
        }
        if(weapon.indexOf('dart') != -1){
          weapon = 'dart';
        }
        if(weapon.indexOf('orc') != -1){
          weapon = 'orc';
        }
        if(weapon == type){
          result = true;
        }
        return result;
      },
      // uploadPortrait(file) {
      //   let para = new FormData();
      //   para.append('id', this.id);
      //   para.append('file', file);
      //   uploadPortrait(para).then(res => {
      //     console.log(res);
      //     // this.
      //   });
      // },
      handleAvatarSuccess(res, file) {
        this.portraitUrl = res.data;
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      submit() {
        this.updateHero();
      },
      createHero() {
        this.loading = true;
        createHero().then(res => {
          this.loading = false;
          let data = res.data.data;
          this.id = data.id;
          this.fileData.id = data.id;
        })
      },
      updateHero() {
        let para = new FormData(this.$refs.form.$el);
        para.append("id", this.id);
        para.set("production",this.form.production);
        para.set("portraitUrl",this.portraitUrl);

        para.set("levelFive.weapon",this.form.levelFive.weapon);
        para.set("levelFive.sup",this.form.levelFive.sup);
        para.set("levelFive.kill",this.form.levelFive.kill);
        para.set("levelFive.a",this.form.levelFive.a);
        para.set("levelFive.b",this.form.levelFive.b);
        para.set("levelFive.c",this.form.levelFive.c);

        if(this.form.hasFour){
          para.set("levelFour.weapon",this.form.levelFive.weapon);
          para.set("levelFour.sup",this.form.levelFive.sup);
          para.set("levelFour.kill",this.form.levelFive.kill);
          para.set("levelFour.a",this.form.levelFive.a);
          para.set("levelFour.b",this.form.levelFive.b);
          para.set("levelFour.c",this.form.levelFive.c);
        }

        if(this.form.hasThree){
          para.set("levelThree.weapon",this.form.levelFive.weapon);
          para.set("levelThree.sup",this.form.levelFive.sup);
          para.set("levelThree.kill",this.form.levelFive.kill);
          para.set("levelThree.a",this.form.levelFive.a);
          para.set("levelThree.b",this.form.levelFive.b);
          para.set("levelThree.c",this.form.levelFive.c);
        }
        this.loading = true;
        updateHero(para).then(res => {
          this.loading = false;
          this.updated = true;
          console.log(res.data.data);
          if (res.data.status) {
            // this.$router.push({path: '/hero/list'});
            this.$message.success(res.data.msg);
          } else {
            this.$message.error(res.data.msg);
          }
        })
      },
      init() {
        this.querySkillList();
        this.queryAllProduction();
        this.queryWeaponList();
      },
      queryAllProduction() {
        queryAllProduction().then(res => {
          this.productionList = res.data.data;
        })
      },
      querySkillList() {
        let para = new FormData();
        para.append("level", "false");
        getSkillList(para).then(res => {
          this.skillList = res.data.data;
        })
      },
      queryWeaponList(){
        let para = new FormData();
        para.append("level", "true");
        getWeaponList(para).then(res => {
          this.weaponList = res.data.data;
        })
      },
    },
    beforeDestroy(){
      if(!this.updated){
        let para = new FormData();
        para.append("id",this.id);
        deleteHeroById(para).then(res => {
          console.log(res);
        });
      }
    },
    mounted() {
      this.init();
      if (this.$route.query.id) {
        this.id = this.$route.query.id;
        this.update = true;
        this.updated = true;
      }else{
        this.createHero();
      }
    }
  }
</script>

<style scoped>
  .title {
    text-align: right;
    padding-right: 10px;
  }
</style>
<style>
  .hero-create-container .form-custom .el-col {
    margin-top: 15px;
  }
</style>

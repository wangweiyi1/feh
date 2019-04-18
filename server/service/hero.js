const heroEntity = require('../entity/hero');
const attributeEntity = require('../entity/attribute');
const heroAttributeEntity = require('../entity/hero_attribute');
const util = require('../util/util');

// heroEntity.hero.belongsToMany(attributeEntity.attribute, { through: heroAttributeEntity.hero_attribute, foreignKey: 'hero_id' });
// attributeEntity.attribute.belongsToMany(heroEntity.hero, { through: heroAttributeEntity.hero_attribute, foreignKey: 'attribute_id' });

module.exports.createHero = (cb) => {
  return heroEntity.hero.create({update:false}).then((results) => {
    cb(results);
  }).catch((error) => {
    console.log(error);
  });
};

module.exports.updateHero = (params, cb) => {
  let result = {};
  let data = {
    portrait:params.portraitUrl,
    name: params.name,
    equipped_weapon: params.equipped_weapon,
    description: params.description,
    production: params.production,
    weapon: params.weapon,
    move: params.move,
    legend: (params.legend == "true") ? true : false,
    update:true,
    limit: (params.limit == "true") ? true : false,
    top: (params.top == "true") ? true : false,
    special_hero: (params.special_hero == "true") ? true : false,
  };
  if(params.good_character != undefined){
    data.good_character = typeof params.good_character == "string" ? params.good_character : params.good_character.join(",");
  }
  if(params.bad_character != undefined){
    data.bad_character = typeof params.bad_character == "string" ? params.bad_character : params.bad_character.join(",");
  }
  if(params.isUpdate == "true"){
    return heroEntity.hero.update(data,{where:{id:params.id}}).then(async (results)=>{
      result.hero = results;
      //更新五星数据
      this.updateAttribute(params.levelFive,{where:{id:params.levelFive.attribute_id}});
      //更新四星数据
      if(params.hasFour){
        this.updateAttribute(params.levelFour,{where:{id:params.levelFour.attribute_id}});
        this.updateHeroAttribute({
          level:4,
        },{where:{hero_id:Number(params.id)}});
      }else{
        this.updateHeroAttribute({
          level:'',
        },{where:{hero_id:Number(params.id)}});
      }
      //更新三星数据
      if(params.hasThree){
        this.updateAttribute(params.levelThree,{where:{id:params.levelThree.attribute_id}});
        this.updateHeroAttribute({
          level:3,
        },{where:{hero_id:Number(params.id)}});
      }else{
        this.updateHeroAttribute({
          level:'',
        },{where:{hero_id:Number(params.id)}});
      }
      cb(result);
    }).catch((error)=>{
      console.log(error);
    });
  }else{
    return heroEntity.hero.update(data,{where:{id:params.id}}).then(async (results)=>{
      result.hero = results;
      params.levelFive.level = 5;
      result.attribute = {};
      result.attribute.level5 = await this.createAttribute(params.levelFive);
      await this.createHeroAttribute({
        level:5,
        hero_id:Number(params.id),
        attribute_id:result.attribute.level5.id,
      });
      if(params.hasFour){
        result.attribute.level4 = await this.createAttribute(params.levelFour);
        await this.createHeroAttribute({
          level:4,
          hero_id:Number(params.id),
          attribute_id:result.attribute.level4.id,
        });
      }
      if(params.hasThree){
        result.attribute.level3 = await this.createAttribute(params.levelThree);
        await this.createHeroAttribute({
          level:3,
          hero_id:Number(params.id),
          attribute_id:result.attribute.level3.id,
        });
      }
      // this.createAttribute(params.levelFive,result,cb);
      cb(result);
    }).catch((error)=>{
      console.log(error);
    });
  }

};

module.exports.createAttribute = (params) => {
  let data = {
    hp_1: params.level1_hp,
    atk_1: params.level1_atk,
    spd_1: params.level1_spd,
    def_1: params.level1_def,
    res_1: params.level1_res,
    hp_40: params.level40_hp,
    atk_40: params.level40_atk,
    spd_40: params.level40_spd,
    def_40: params.level40_def,
    res_40: params.level40_res,
    weapon: params.weapon,
    sup: params.sup,
    kill: params['kill'],
    a: params.a,
    b: params.b,
    c: params.c,
  };
  return attributeEntity.attribute.create(data);
};

module.exports.updateAttribute = (params, cb) => {
  let data = {
    hp_1: params.level1_hp,
    atk_1: params.level1_atk,
    spd_1: params.level1_spd,
    def_1: params.level1_def,
    res_1: params.level1_res,
    hp_40: params.level40_hp,
    atk_40: params.level40_atk,
    spd_40: params.level40_spd,
    def_40: params.level40_def,
    res_40: params.level40_res,
    weapon: params.weapon,
    sup: params.sup,
    kill: params['kill'],
    a: params.a,
    b: params.b,
    c: params.c,
  };
  return attributeEntity.attribute.update(data,{where:{id:params.attribute_id}});
};

module.exports.createHeroAttribute = (params) => {
  let data = {
    level:params.level,
    attribute_id:params.attribute_id,
    hero_id:params.hero_id,
  };
  return heroAttributeEntity.hero_attribute.create(data);
};

module.exports.updateHeroAttribute = (params, cb) => {
  let data = {
    level:params.level,
  };
  return heroAttributeEntity.hero_attribute.update(data,{where:{hero_id:params.id}});
};
//删除信息
module.exports.deleteHeroById = (id, cb) => {
  var arr = [];
  return heroAttributeEntity.hero_attribute.findAll({where: {hero_id:id,}}).then(async (results)=>{
    for(let i=0;i<results.length;i++){
      arr.push(results[0].attribute_id)
    }
    await this.deleteHeroAttribute(id);
    await this.deleteHero(id);
    await this.deleteAttribute(arr);
    cb(results);
  }).catch((error) => {
    console.log(error);
  });

  // console.log(result.attribute_id);
  // if(result.attribute_id != []){
  //   for(let i=0;i<result.attribute_id.length;i++){
  //     arr.push(result.attribute_id[i].attribute_id)
  //   }
  // }
  // console.log(arr);
  // return heroAttributeEntity.hero_attribute.destroy({where: {hero_id:id}}).then(async (results)=>{
  //   // await this.deleteAttribute({where:{id:arr}});
  //   // await this.deleteHero({where:{id:id}});
  //   cb(results);
  // }).catch((error) => {
  //   console.log(error);
  // });
};

//删除hero对应数据
module.exports.deleteHero = (id,cb) => {
  return heroEntity.hero.destroy({
    where: {
      id:id,
    },
  })
};
//删除中间表数据
module.exports.deleteHeroAttribute = (id,cb) => {
  return heroAttributeEntity.hero_attribute.destroy({
    where: {
      hero_id:id,
    },
  })
};
//删除属性表对应数据
module.exports.deleteAttribute = (id,cb) => {
  return attributeEntity.attribute.destroy({
    where: {
      id:id,
    },
  })
};

module.exports.queryHeroAttributeID = (id,cb) => {
  return heroAttributeEntity.hero_attribute.findAll({
    where: {
      hero_id:id,
    },
  })
};

//获取英雄信息逻辑实现
module.exports.getHeroInfoList = (params,cb) => {
  //关联两个表进行查询数据
  return heroEntity.hero.findAll({
    //用于左连接列表
    include:[{
      //想要加载的模型
      model:heroAttributeEntity.hero_attribute,
      where:{
        'hero_id':params.id
      },
      //进一步嵌套
      include:[{
        model:attributeEntity.attribute,
      }],
    }],
    // order:[[heroAttributeEntity.hero_attribute, 'id', 'DESC']],
    // limit:1,
  }).then((result) => {
    cb(result);
  }).catch(error => {
    console.log(error);
  })
};

module.exports.queryHeroById = (params,cb) => {
  let condition = {};
  condition.include = [
    {
      //想要加载的模型
      model:heroAttributeEntity.hero_attribute,
      //进一步嵌套
      include:[{
        model:attributeEntity.attribute,
      }],
    }
  ];
  return heroEntity.hero.findById(params.id,condition).then((results)=>{
    cb(results);
  }).catch((error)=>{
    console.log(error);
  });
};

module.exports.getHeroListLimit = (params,cb) => {
  let condition = {};
  let where = {};
  where.update = true;
  if(params.text && params.text != ""){
    where.name = {
      $like:"%" + params.text + "%"
    }
  }
  condition.order = [
    ['id', 'DESC'],
  ];
  console.log(params.pageSize)
  condition.where = where;
  condition.limit = Number(params.pageSize);
  condition.offset = (params.currentPage - 1) * params.pageSize;
  return heroEntity.hero.findAndCountAll(condition).then((results)=>{
    cb(results);
  }).catch((error)=>{
    console.log(error);
  });
};

module.exports.getHeroList = (params,cb) => {
  let condition = {};
  let where = {};
  where.update = true;
  if(params.text && params.text != ""){
    where.name = {
      $like:"%" + params.text + "%"
    }
  }
  if(params.top){
    where.top = (params.top == "true") ? true : false;
  }
  condition.order = [
    ['id', 'DESC'],
  ];
  condition.where = where;
  condition.include = [
    {
      //想要加载的模型
      model:heroAttributeEntity.hero_attribute,
      //进一步嵌套
      include:[{
        model:attributeEntity.attribute,
      }],
    }
  ];
  return heroEntity.hero.findAll(condition).then((results)=>{
    cb(results);
  }).catch((error)=>{
    console.log(error);
  });
};

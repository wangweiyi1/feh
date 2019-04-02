const heroEntity = require('../entity/hero');
const attributeEntity = require('../entity/attribute');
const heroAttributeEntity = require('../entity/hero_attribute');
const util = require('../util/util');

module.exports.createHero = (cb) => {
  return heroEntity.hero.create({update:false}).then((results) => {
    cb(results);
  }).catch((error) => {
    cb([], "创建失败");
  });
};

module.exports.updateHero = (params, cb) => {
  let result = {};
  let data = {
    portrait:params.portraitUrl,
    name: params.name,
    description: params.description,
    production: params.production,
    weapon: params.weapon,
    move: params.move,
    good_character:typeof params.good_character == "String" ? params.good_character : params.good_character.join(","),
    bad_character:typeof params.bad_character == "String" ? params.bad_character : params.bad_character.join(","),
    update:true,
    limit: (params.limit == "true") ? true : false,
    top: (params.top == "true") ? true : false,
    special_hero: (params.special_hero == "true") ? true : false,
  };
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
    cb([],"修改失败");
  });
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
    kill: params.kill,
    a: params.a,
    b: params.b,
    c: params.c,
  };
  return attributeEntity.attribute.create(data);
};

module.exports.updateAttribute = (params, cb) => {

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

};

module.exports.deleteHeroById = (id, cb) => {
  return heroEntity.hero.destroy({where: {id: id}}).then((results) => {
    cb(results);
  }).catch((error) => {
    cb([], "查询失败");
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
  condition.where = where;
  if(params.pageSize && params.currentPage){
    condition.limit = Number(params.pageSize);
    condition.offset = (params.currentPage - 1) * params.pageSize;
    return heroEntity.hero.findAndCount(condition).then((results)=>{
      cb(results);
    }).catch((error)=>{
      cb([],"查询失败");
    });
  }else{
    return heroEntity.hero.findAll(condition).then((results)=>{
      cb(results);
    }).catch((error)=>{
      cb([],"查询失败");
    });
  }
};

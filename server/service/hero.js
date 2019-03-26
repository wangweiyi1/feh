const heroEntity = require('../entity/hero');
const attributeEntity = require('../entity/attribute');
const heroAttributeEntity = require('../entity/hero_attribute');
const util = require('../util/util');

module.exports.createHero = (cb) => {
  return heroEntity.hero.create().then((results) => {
    cb(results);
  }).catch((error) => {
    cb([], "创建失败");
  });
};

module.exports.updateHero = (params, cb) => {
  let data = {
    name: params.name,
    description: params.description,
    production: params.production,
    weapon: params.weapon,
    move: params.move,
    limit: (params.limit == "true") ? true : false,
    top: (params.top == "true") ? true : false,
    special_hero: (params.special_hero == "true") ? true : false,
  };
  // return async () => {
  //   let heroResults = await heroEntity.hero.update(data,{where:{id:params.id}});
  //   cb(heroResults);
  // }
  return heroEntity.hero.update(data,{where:{id:params.id}}).then((results)=>{
    cb(results);
  }).catch((error)=>{
    cb([],"修改失败");
  });
};

module.exports.deleteHeroById = (id, cb) => {
  return heroEntity.hero.destroy({where: {id: id}}).then((results) => {
    cb(results);
  }).catch((error) => {
    cb([], "查询失败");
  });
};

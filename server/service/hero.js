const heroEntity = require('../entity/hero');
const util = require('../util/util');

module.exports.createHero = (cb) => {
  return heroEntity.hero.create().then((results)=>{
    cb(results);
  }).catch((error)=>{
    cb([],"创建失败");
  });
};

module.exports.deleteHeroById = (id,cb) => {
  return heroEntity.hero.destroy({where:{id:id}}).then((results)=>{
    cb(results);
  }).catch((error)=>{
    cb([],"查询失败");
  });
};

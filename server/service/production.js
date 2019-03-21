const productionEntity = require('../entity/production');
const util = require('../util/util');

module.exports.queryAll = (cb) => {
  return productionEntity.production.findAll().then((results)=>{
    cb(results);
  }).catch((error)=>{
    cb([],"查询失败");
  });
};

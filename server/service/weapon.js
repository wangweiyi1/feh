const weaponEntity = require('../entity/weapon');
const util = require('../util/util');

module.exports.getWeaponListLimit = (params,cb) => {
  let condition = {};
  let where = {};
  if(params.text && params.text != ""){
    where.name = {
      $like:"%" + params.text + "%"
    }
  }
  // if(params.position && params.position != ""){
  //   if(params.position == "seal"){
  //     where.build = true;
  //   }else{
  //     where.position = params.position
  //   }
  // }
  // if(params.level == "true"){
  //   where.level = {$gte:3};
  // }
  condition.order = [
    ['id', 'DESC'],
  ];
  condition.where = where;
  if(params.pageSize && params.currentPage){
    condition.limit = Number(params.pageSize);
    condition.offset = (params.currentPage - 1) * params.pageSize;
    return weaponEntity.weapon.findAndCount(condition).then((results)=>{
      cb(results);
    }).catch((error)=>{
      cb([],"查询失败");
    });
  }else{
    return weaponEntity.weapon.findAll(condition).then((results)=>{
      cb(results);
    }).catch((error)=>{
      cb([],"查询失败");
    });
  }
};

module.exports.queryWeaponById = (id,cb) => {
  return weaponEntity.weapon.findById(id).then((results)=>{
    cb(results);
  }).catch((error)=>{
    cb([],"查询失败");
  });
};

module.exports.deleteData = (id,cb) => {
  return weaponEntity.weapon.destroy({where:{id:id}}).then((results)=>{
    cb(results);
  }).catch((error)=>{
    cb([],"查询失败");
  });
};

module.exports.createWeapon = (params,cb) => {
  let data = params;
  if(data.build_id == ""){
    data.build_id = null;
  }
  data.creation = util.formatDate(new Date(),"yyyy-MM-dd hh:mm:ss");
  data.lase_modified = util.formatDate(new Date(),"yyyy-MM-dd hh:mm:ss");
  return weaponEntity.weapon.create(data).then((results)=>{
    cb(results);
  }).catch((error)=>{
    cb([],"创建失败");
  });
};

module.exports.updateWeapon = (params,cb) => {
  let data = params;
  if(data.build_id == ""){
    data.build_id = null;
  }
  data.lase_modified = util.formatDate(new Date(),"yyyy-MM-dd hh:mm:ss");
  return weaponEntity.weapon.update(data,{where:{id:data.id}}).then((results)=>{
    cb(results);
  }).catch((error)=>{
    cb([],"修改失败");
  });
};

module.exports.queryBaseWeapon = (params,cb) => {
  let condition = {};
  condition.where = {
    // build:false,
    sp:{
      $gte:300,
      $ne: 350,
    },
  };
  condition.order = [['creation', 'DESC']];
  return weaponEntity.weapon.findAll(condition).then((results)=>{
    cb(results);
  }).catch((error)=>{
    cb([],"查询失败");
  });
};

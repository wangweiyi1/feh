const skillEntity = require('../entity/skill');
const util = require('../util/util');

module.exports.getSkillListLimit = (params,cb) => {
  let where = {};
  if(params.text != ""){
    where.name = {
      $like:"%" + params.text + "%"
    }
  }
  if(params.position != ""){
    where.position = params.position
  }
  if(params.level == "true"){
    where.level = {$gte:3};
  }
  return skillEntity.skill.findAndCount({
    where:where,
    order: [
      ['id', 'DESC'],
    ],
    limit:Number(params.pageSize),
    offset:(params.currentPage - 1) * params.pageSize
  }).then((results)=>{
    cb(results);
  }).catch((error)=>{
    cb([],"查询失败");
  });
};

module.exports.querySkillById = (id,cb) => {
  return skillEntity.skill.findById(id).then((results)=>{
    cb(results);
  }).catch((error)=>{
    cb([],"查询失败");
  });
};

module.exports.deleteData = (id,cb) => {
  return skillEntity.skill.destroy({where:{id:id}}).then((results)=>{
    cb(results);
  }).catch((error)=>{
    cb([],"查询失败");
  });
};

module.exports.createSkill = (params,cb) => {
  let data = params;
  if(typeof data.select_weapon == "object"){
    data.select_weapon = data.select_weapon.join(",");
  }
  if(typeof data.select_move == "object"){
    data.select_move = data.select_move.join(",");
  }
  data.sp = Number(data.sp);
  data.build = (data.build == "true") ? true : false;
  data.exclusive = (data.exclusive == "true") ? true : false;
  data.creation = util.formatDate(new Date(),"yyyy-MM-dd hh:mm:ss");
  data.lase_modified = util.formatDate(new Date(),"yyyy-MM-dd hh:mm:ss");
  return skillEntity.skill.create(data).then((results)=>{
    cb(results);
  }).catch((error)=>{
    cb([],"创建失败");
  });
};

module.exports.updateSkill = (params,cb) => {
  let data = params;
  if(typeof data.select_weapon == "object"){
    data.select_weapon = data.select_weapon.join(",");
  }
  if(typeof data.select_move == "object"){
    data.select_move = data.select_move.join(",");
  }
  data.build = (data.build == "true") ? true : false;
  data.exclusive = (data.exclusive == "true") ? true : false;
  data.lase_modified = util.formatDate(new Date(),"yyyy-MM-dd hh:mm:ss");
  return skillEntity.skill.update(data,{where:{id:data.id}}).then((results)=>{
    cb(results);
  }).catch((error)=>{
    cb([],"修改失败");
  });
};

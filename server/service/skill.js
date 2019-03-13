const skillEntity = require('../entity/skill');
const util = require('../util/util');

module.exports.getSkillListLimit = (params,cb) => {
  return skillEntity.skill.findAndCountAll({
    order: [
      ['id', 'DESC'],
    ],
    limit:Number(params.pageSize),
    offset:(params.currentPage - 1) * params.pageSize
  }).then((results)=>{
    cb(results);
  }).catch((error)=>{
    cb([],"查询失败");
  })
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
    cb([],"查询失败");
  })
};

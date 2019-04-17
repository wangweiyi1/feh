const cardEntity = require('../entity/card');
const util = require('../util/util');

module.exports.getCardListLimit = (params,cb) => {
  let condition = {};
  let where = {};
  if(params.text && params.text != ""){
    where.name = {
      $like:"%" + params.text + "%"
    }
  }
  if(params.position && params.position != ""){
    if(params.position == "seal"){
      where.build = true;
    }else{
      where.position = params.position
    }
  }
  if(params.level == "true"){
    where.level = {$gte:3};
  }
  condition.order = [
    ['id', 'DESC'],
  ];
  condition.where = where;
  if(params.pageSize && params.currentPage){
    condition.limit = Number(params.pageSize);
    condition.offset = (params.currentPage - 1) * params.pageSize;
    return cardEntity.card.findAndCount(condition).then((results)=>{
      cb(results);
    }).catch((error)=>{
      cb([],"查询失败");
    });
  }else{
    return cardEntity.card.findAll(condition).then((results)=>{
      cb(results);
    }).catch((error)=>{
      cb([],"查询失败");
    });
  }
};

module.exports.queryCardById = (id,cb) => {
  return cardEntity.card.findById(id).then((results)=>{
    cb(results);
  }).catch((error)=>{
    cb([],"查询失败");
  });
};

module.exports.deleteData = (id,cb) => {
  return cardEntity.card.destroy({where:{id:id}}).then((results)=>{
    cb(results);
  }).catch((error)=>{
    cb([],"查询失败");
  });
};

module.exports.createCard = (params,cb) => {
  let data = {
    name:params.name,
    up_rate:params.up_rate,
    hasAll:(params.hasAll == "true") ? true : false,
    crooked_rate:params.crooked_rate,
    up_role:params.up_role,
  };
  return cardEntity.card.create(data).then((results)=>{
    cb(results);
  }).catch((error)=>{
    cb([],"创建失败");
  });
};

module.exports.updateCard = (params,cb) => {
  let data = {
    name:params.name,
    up_rate:params.up_rate,
    hasAll:(params.hasAll == "true") ? true : false,
    crooked_rate:params.crooked_rate,
    up_role:params.up_role,
  };
  return cardEntity.card.update(data,{where:{id:params.id}}).then((results)=>{
    cb(results);
  }).catch((error)=>{
    cb([],"修改失败");
  });
};

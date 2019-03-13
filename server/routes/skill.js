let express = require('express');
let router = express.Router();
let multipart = require('connect-multiparty');
let multipartMiddleware = multipart();
const util = require('../util/util');
const db = require('../connection/connection');
const skillService = require("../service/skill");

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/createSkill',multipartMiddleware, function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');

  skillService.createSkill(req.body,(results,error)=>{
    if(error){
      res.status(500).json({"status":false,"msg":error,"data":[]});
    }else{
      res.status(200).json({"status":true,"msg":"添加成功","data":results});
    }
  })
  //处理参数部分
  // let data = req.body;
  // if(typeof data.select_weapon == "object"){
  //   data.select_weapon = data.select_weapon.join(",");
  // }
  // if(typeof data.select_move == "object"){
  //   data.select_move = data.select_move.join(",");
  // }
  // data.sp = Number(data.sp);
  // data.build = (data.build == "true") ? true : false;
  // data.exclusive = (data.exclusive == "true") ? true : false;
  // data.creation = util.formatDate(new Date(),"yyyy-MM-dd hh:mm:ss");
  // data.lase_modified = util.formatDate(new Date(),"yyyy-MM-dd hh:mm:ss");
  // //sql调用部分
  // let sql = db.getInsertSql('skill',data);
  // db.query(sql, function(error, rows, fields){
  //   if(error){
  //     res.status(500).json({"status":false,"msg":error,"data":[]});
  //   }
  //   res.status(200).json({"status":true,"msg":"添加成功","data":"success"});
  // });
});

router.post('/updateSkill',multipartMiddleware, function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');

  //处理参数部分
  let data = req.body;
  let where = {id:data.id};
  console.log(data.id);
  delete data.id;
  if(typeof data.select_weapon == "object"){
    data.select_weapon = data.select_weapon.join(",");
  }
  if(typeof data.select_move == "object"){
    data.select_move = data.select_move.join(",");
  }
  data.sp = Number(data.sp);
  data.build = (data.build == "true") ? true : false;
  data.exclusive = (data.exclusive == "true") ? true : false;
  data.lase_modified = util.formatDate(new Date(),"yyyy-MM-dd hh:mm:ss");
  //sql调用部分
  db.updateData('skill',data,where, function(error, rows, fields){
    if(error){
      res.status(500).json({"status":false,"msg":error,"data":[]});
    }
    res.status(200).json({"status":true,"msg":"修改成功","data":"success"});
  });
});

router.post('/getSkillList',multipartMiddleware, function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  skillService.getSkillListLimit(req.body,(results,error)=>{
    if(error){
      res.status(500).json({"status":false,"msg":error,"data":[]});
    }else{
      res.status(200).json({"status":true,"msg":"success","data":results});
    }
  })
});

router.post('/deleteSkill',multipartMiddleware, function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  let id = req.body.id;
  db.deleteData('skill',{id:id},(error, rows, fields)=>{
    if(error){
      res.status(500).json({"status":false,"msg":'删除失败',"data":[]});
    }
    res.status(200).json({"status":true,"msg":"删除成功","data":"success"});
  })
});

router.post('/querySkillById',multipartMiddleware, function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  let id = req.body.id;
  db.selectOneData('skill',{id:id},(error, rows, fields)=>{
    if(error){
      res.status(500).json({"status":false,"msg":'查询失败',"data":[]});
    }
    res.status(200).json({"status":true,"msg":"查询成功","data":rows[0]});
  })
});

module.exports = router;

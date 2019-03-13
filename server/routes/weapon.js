let express = require('express');
let router = express.Router();
let multipart = require('connect-multiparty');
let multipartMiddleware = multipart();
const util = require('../util/util');
const db = require('../connection/connection');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/createWeapon',multipartMiddleware, function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');

  //处理参数部分
  let data = req.body;
  data.exclusive = (data.exclusive == "true") ? true : false;
  data.build = (data.build == "true") ? true : false;
  data.creation = util.formatDate(new Date(),"yyyy-MM-dd hh:mm:ss");
  data.lase_modified = util.formatDate(new Date(),"yyyy-MM-dd hh:mm:ss");
  //sql调用部分
  let sql = db.getInsertSql('weapon',data);
  db.query(sql, function(error, rows, fields){
    if(error){
      res.status(500).json({"status":false,"msg":error,"data":[]});
    }
    res.status(200).json({"status":true,"msg":"添加成功","data":"success"});
  });
});

router.post('/updateWeapon',multipartMiddleware, function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');

  //处理参数部分
  let data = req.body;
  let where = {id:data.id};
  delete data.id;
  data.exclusive = (data.exclusive == "true") ? true : false;
  data.build = (data.build == "true") ? true : false;
  data.lase_modified = util.formatDate(new Date(),"yyyy-MM-dd hh:mm:ss");
  //sql调用部分
  db.updateData('weapon',data,where, function(error, rows, fields){
    if(error){
      res.status(500).json({"status":false,"msg":error,"data":[]});
    }
    res.status(200).json({"status":true,"msg":"修改成功","data":"success"});
  });
});

router.post('/getWeaponList',multipartMiddleware, function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  let currentPage = req.body.currentPage;
  let pageSize = req.body.pageSize;
  db.query("SELECT COUNT(*) AS rowCount from weapon", function(error, rows, fields){
    let count = rows[0].rowCount;
    db.query("SELECT * from weapon LIMIT " + (currentPage - 1) * pageSize + "," + pageSize, function(error, rows, fields){
      let string = JSON.stringify(rows);
      let data = {
        count:count,
        table:JSON.parse(string)
      };
      if(error){
        res.status(500).json({"status":false,"msg":error,"data":[]});
      }
      res.status(200).json({"status":true,"msg":"success","data":data});
    });
  });
});

router.post('/deleteWeapon',multipartMiddleware, function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  let id = req.body.id;
  db.deleteData('weapon',{id:id},(error, rows, fields)=>{
    if(error){
      res.status(500).json({"status":false,"msg":'删除失败',"data":[]});
    }
    res.status(200).json({"status":true,"msg":"删除成功","data":"success"});
  })
});

router.post('/queryWeaponById',multipartMiddleware, function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  let id = req.body.id;
  db.selectOneData('weapon',{id:id},(error, rows, fields)=>{
    if(error){
      res.status(500).json({"status":false,"msg":'查询失败',"data":[]});
    }
    res.status(200).json({"status":true,"msg":"查询成功","data":rows[0]});
  })
});

router.post('/queryBaseWeapon',multipartMiddleware, function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  db.query("SELECT * from weapon WHERE sp>=350 AND build=0", function(error, rows, fields){
    if(error){
      res.status(500).json({"status":false,"msg":error,"data":[]});
    }
    res.status(200).json({"status":true,"msg":"success","data":rows});
  });
});

module.exports = router;

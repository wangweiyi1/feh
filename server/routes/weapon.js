let express = require('express');
let router = express.Router();
let multipart = require('connect-multiparty');
let multipartMiddleware = multipart();
const weaponService = require("../service/weapon");

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/createWeapon',multipartMiddleware, function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');

  //处理参数部分
  weaponService.createWeapon(req.body,(results,error)=>{
    if(error){
      res.status(500).json({"status":false,"msg":error,"data":[]});
    }else{
      res.status(200).json({"status":true,"msg":"添加成功","data":results});
    }
  })
});

router.post('/updateWeapon',multipartMiddleware, function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');

  //处理参数部分
  weaponService.updateWeapon(req.body,(results,error)=>{
    if(error){
      res.status(500).json({"status":false,"msg":error,"data":[]});
    }else{
      res.status(200).json({"status":true,"msg":"修改成功","data":results});
    }
  })
});

router.post('/deleteWeapon',multipartMiddleware, function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');

  weaponService.deleteData(req.body.id,(results, error)=>{
    if(error){
      res.status(500).json({"status":false,"msg":'删除失败',"data":[]});
    }
    res.status(200).json({"status":true,"msg":"删除成功","data":"success"});
  })
});

router.post('/getWeaponList',multipartMiddleware, function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');

  weaponService.getWeaponListLimit(req.body,(results, error)=>{
    if(error){
      res.status(500).json({"status":false,"msg":'删除失败',"data":[]});
    }
    res.status(200).json({"status":true,"msg":"success","data":results});
  })
});

router.post('/queryWeaponById',multipartMiddleware, function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');

  weaponService.queryWeaponById(req.body.id,(results,error)=>{
    if(error){
      res.status(500).json({"status":false,"msg":error,"data":[]});
    }else{
      res.status(200).json({"status":true,"msg":"success","data":results});
    }
  });
});

router.post('/queryBaseWeapon',multipartMiddleware, function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');

  weaponService.queryBaseWeapon(req.body,(results,error)=>{
    if(error){
      res.status(500).json({"status":false,"msg":error,"data":[]});
    }else{
      res.status(200).json({"status":true,"msg":"success","data":results});
    }
  });
});

module.exports = router;

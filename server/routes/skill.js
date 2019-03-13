let express = require('express');
let router = express.Router();
let multipart = require('connect-multiparty');
let multipartMiddleware = multipart();
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
});

router.post('/updateSkill',multipartMiddleware, function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');

  skillService.updateSkill(req.body,(results,error)=>{
    if(error){
      res.status(500).json({"status":false,"msg":error,"data":[]});
    }else{
      res.status(200).json({"status":true,"msg":"修改成功","data":results});
    }
  })
});

router.post('/deleteSkill',multipartMiddleware, function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  skillService.deleteData(req.body.id,(results, error)=>{
    if(error){
      res.status(500).json({"status":false,"msg":'删除失败',"data":[]});
    }
    res.status(200).json({"status":true,"msg":"删除成功","data":"success"});
  })
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

router.post('/querySkillById',multipartMiddleware, function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');

  skillService.querySkillById(req.body.id,(results,error)=>{
    if(error){
      res.status(500).json({"status":false,"msg":error,"data":[]});
    }else{
      res.status(200).json({"status":true,"msg":"success","data":results});
    }
  });
});

module.exports = router;

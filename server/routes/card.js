let express = require('express');
let router = express.Router();
let multipart = require('connect-multiparty');
let multipartMiddleware = multipart();
const cardService = require("../service/card");

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/createCard',multipartMiddleware, function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');

  cardService.createCard(req.body,(results,error)=>{
    if(error){
      res.status(500).json({"status":false,"msg":error,"data":[]});
    }else{
      res.status(200).json({"status":true,"msg":"添加成功","data":results});
    }
  })
});

router.post('/updateCard',multipartMiddleware, function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');

  cardService.updateCard(req.body,(results,error)=>{
    if(error){
      res.status(500).json({"status":false,"msg":error,"data":[]});
    }else{
      res.status(200).json({"status":true,"msg":"修改成功","data":results});
    }
  })
});

router.post('/deleteCard',multipartMiddleware, function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  cardService.deleteData(req.body.id,(results, error)=>{
    if(error){
      res.status(500).json({"status":false,"msg":'删除失败',"data":[]});
    }
    res.status(200).json({"status":true,"msg":"删除成功","data":"success"});
  })
});

router.post('/getCardList',multipartMiddleware, function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');

  cardService.getCardListLimit(req.body,(results,error)=>{
    if(error){
      res.status(500).json({"status":false,"msg":error,"data":[]});
    }else{
      res.status(200).json({"status":true,"msg":"success","data":results});
    }
  })
});

router.post('/queryCardById',multipartMiddleware, function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');

  cardService.queryCardById(req.body.id,(results,error)=>{
    if(error){
      res.status(500).json({"status":false,"msg":error,"data":[]});
    }else{
      res.status(200).json({"status":true,"msg":"success","data":results});
    }
  });
});

module.exports = router;

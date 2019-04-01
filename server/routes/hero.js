let express = require('express');
let router = express.Router();
let multipart = require('connect-multiparty');
let multipartMiddleware = multipart();
const heroService = require("../service/hero");

let path = require('path');
let multer = require('multer');
let Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, "../../static/img/upload"));
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }
});
// let upload = multer({storage: Storage}).array("file", 3);
let upload = multer({storage: Storage}).single("file");

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/uploadPortrait', function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');

  upload(req, res, function (err) {
    if (err) {
      res.status(500).json({"status":false,"msg":'上传失败',"data":[]});
    }
    res.status(200).json({"status":true,"msg":'上传成功',"data":req.file.path});
  });
});

router.post('/createHero', function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');

  heroService.createHero((results,error)=>{
    if(error){
      res.status(500).json({"status":false,"msg":error,"data":[]});
    }else{
      res.status(200).json({"status":true,"msg":"添加成功","data":results});
    }
  })
});

router.post('/updateHero',multipartMiddleware, function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');

  heroService.updateHero(req.body,(results,error)=>{
    if(error){
      res.status(500).json({"status":false,"msg":error,"data":[]});
    }else{
      res.status(200).json({"status":true,"msg":"success","data":results});
    }
  })
});

router.post('/deleteHeroById',multipartMiddleware, function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');

  heroService.deleteHeroById(req.body.id,(results, error)=>{
    if(error){
      res.status(500).json({"status":false,"msg":'删除失败',"data":[]});
    }
    res.status(200).json({"status":true,"msg":"删除成功","data":"success"});
  })
});

module.exports = router;

let express = require('express');
let router = express.Router();
let multipart = require('connect-multiparty');
let multipartMiddleware = multipart();
const productionService = require("../service/production");

router.post('/queryAllProduction',multipartMiddleware, function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');

  productionService.queryAll((results,error)=>{
    if(error){
      res.status(500).json({"status":false,"msg":error,"data":[]});
    }else{
      res.status(200).json({"status":true,"msg":"success","data":results});
    }
  });
});


module.exports = router;

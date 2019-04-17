let express = require('express');
let fs = require('fs');
let path = require('path');
let bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//注册接口
app.use('/skill', require('./routes/skill'));
app.use('/weapon', require('./routes/weapon'));
app.use('/hero', require('./routes/hero'));
app.use('/common', require('./routes/common'));
app.use('/card', require('./routes/card'));

app.all("*", function(req, res, next) {
  let origin = req.headers.origin;
  // res.set('Access-Control-Allow-Origin', '*');
  next();
});

// 访问静态资源
app.use(express.static(path.resolve(__dirname, '../dist')));

// 访问单页
app.get('*', function (req, res) {
  let html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');
  res.send(html);
});

process.on('uncaughtException', function (err) {
  //打印出错误
  console.log(err);
  //打印出错误的调用栈方便调试
  console.log(err.stack);
});

// 监听
app.listen(8081, function () {
  console.log('success listen...8081');
});

global.DB_SETTING = {
  host : '39.104.95.22',
  user : 'fitness',
  password : 'Jianshya!@#',
  database : 'weiyi',
  connectionLimit:200
};
const mysql = require('mysql');
const pool = mysql.createPool(DB_SETTING);

pool.getConnection(function (err, connection){
  exports.do = function (sql, callback){

    connection.query(sql, function (){
      callback.apply(connection, arguments);
      connection.release();
    });
  }
})

let query = function (sql, callback){
  this.getConnection(function (err, connection){
    connection.query(sql, function (){
      callback.apply(connection, arguments);
      connection.release();
    });
  })
}.bind(pool)
exports.query = query;

// 查询所有数据
let selectAll = (table, callback) => {
  let sql = "SELECT * FROM " + table;
  query(sql, callback);
};
// 获取insert的sql
let getInsertSql = (table, datas) => {
  let fields = '';
  let values = '';
  for (let k in datas) {
    fields += k + ',';
    if (typeof datas[k] == "boolean") {
      values = values + datas[k] + ","
    } else {
      values = values + "'" + datas[k] + "',"
    }
  }
  fields = fields.slice(0, -1);
  values = values.slice(0, -1);
  let sql = "INSERT INTO " + table + '(' + fields + ') VALUES(' + values + ')';
  console.log(sql);
  return sql;
};
// 更新一条数据
let updateData = function (table, sets, where, callback) {
  let _SETS = '';
  let _WHERE = '';
  let keys = '';
  let values = '';
  for (let k in sets) {
    if(sets[k] != ""){
      if (typeof sets[k] == "boolean") {
        _SETS += k + "=" + sets[k] + ","
      } else {
        _SETS += k + "='" + sets[k] + "',";
      }
    }
  }
  _SETS = _SETS.slice(0, -1);
  for (let k2 in where) {
    //  _WHERE+=k2+"='"+where[k2]+"' AND ";
    _WHERE += k2 + "=" + where[k2];
  }
  // UPDATE user SET Password='321' WHERE UserId=12
  //update table set username='admin2',age='55'   where id="5";
  let sql = "UPDATE " + table + ' SET ' + _SETS + ' WHERE ' + _WHERE;
  console.log(sql);
  query(sql, callback);
};

// 删除一条数据
let deleteData = function (table, where, callback) {
  let _WHERE = '';
  for (let k2 in where) {
    //多个筛选条件使用  _WHERE+=k2+"='"+where[k2]+"' AND ";
    _WHERE += k2 + "=" + where[k2];
  }
  // DELETE  FROM user WHERE UserId=12  注意UserId的数据类型要和数据库一致
  let sql = "DELETE  FROM " + table + ' WHERE ' + _WHERE;
  query(sql, callback);
};
// 查询一条数据
let selectOneData = function (table, where, callback) {
  let _WHERE = '';
  for (let k2 in where) {
    //多个筛选条件使用  _WHERE+=k2+"='"+where[k2]+"' AND ";
    _WHERE += k2 + "=" + where[k2];
  }
  // DELETE  FROM user WHERE UserId=12  注意UserId的数据类型要和数据库一致
  let sql = "SELECT * FROM " + table + ' WHERE ' + _WHERE;
  query(sql, callback);
};

exports.selectAll = selectAll;
exports.getInsertSql = getInsertSql;
exports.deleteData = deleteData;
exports.updateData = updateData;
exports.selectOneData = selectOneData;

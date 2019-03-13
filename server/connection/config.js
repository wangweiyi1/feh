const mysql = require('mysql')

const connectdb = ()=>{
  let connection = mysql.createConnection(DB_SETTING);
  return connection;
};

module.exports = connectdb;

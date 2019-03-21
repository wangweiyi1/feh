const Sequelize = require('sequelize');
const db = require('../connection/db');


const Production = db.define('production', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement: true
  },
  name: {type: Sequelize.STRING},
}, {
  // 如果为 true 则表的名称和 model 相同，即 user
  // 为 false MySQL创建的表名称会是复数 users
  // 如果指定的表名称本就是复数形式则不变
  freezeTableName: true,
  timestamps: false,
});

module.exports.production = Production;

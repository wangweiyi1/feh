const Sequelize = require('sequelize');
const db = require('../connection/db');


const attribute = db.define('attribute', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement: true
  },
  hp: {type: Sequelize.INTEGER},
  atk: {type: Sequelize.INTEGER},
  spd: {type: Sequelize.INTEGER},
  def: {type: Sequelize.INTEGER},
  res: {type: Sequelize.INTEGER},
  a: {type: Sequelize.INTEGER},
  b: {type: Sequelize.INTEGER},
  c: {type: Sequelize.INTEGER},
}, {
  // 如果为 true 则表的名称和 model 相同，即 user
  // 为 false MySQL创建的表名称会是复数 users
  // 如果指定的表名称本就是复数形式则不变
  freezeTableName: true,
});

module.exports.attribute = attribute;

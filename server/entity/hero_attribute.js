const Sequelize = require('sequelize');
const db = require('../connection/db');

const heroEntity = require('./hero');
const attributeEntity = require('./attribute');

const hero_attribute = db.define('hero_attribute', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement: true
  },
  hero_id: {type: Sequelize.INTEGER},
  attribute_id: {type: Sequelize.INTEGER},
  level: {type: Sequelize.INTEGER},
}, {
  // 如果为 true 则表的名称和 model 相同，即 user
  // 为 false MySQL创建的表名称会是复数 users
  // 如果指定的表名称本就是复数形式则不变
  freezeTableName: true,
});

module.exports.hero_attribute = hero_attribute;

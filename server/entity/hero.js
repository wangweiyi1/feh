const Sequelize = require('sequelize');
const db = require('../connection/db');


const hero = db.define('hero', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement: true
  },
  portrait: {type: Sequelize.STRING,},
  name: {type: Sequelize.STRING,},
  description: {type: Sequelize.STRING},
  production: {type: Sequelize.STRING},
  weapon: {type: Sequelize.STRING},
  move: {type: Sequelize.STRING},
  limit: {type: Sequelize.BOOLEAN},
  top: {type: Sequelize.BOOLEAN},
  update: {type: Sequelize.BOOLEAN},
  special_hero: {type: Sequelize.BOOLEAN},
  good_character: {type: Sequelize.STRING},
  bad_character: {type: Sequelize.STRING},
}, {
  // 如果为 true 则表的名称和 model 相同，即 user
  // 为 false MySQL创建的表名称会是复数 users
  // 如果指定的表名称本就是复数形式则不变
  freezeTableName: true,
});

module.exports.hero = hero;

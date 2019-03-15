const Sequelize = require('sequelize');
const db = require('../connection/db');


const Skill = db.define('skill', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement: true
  },
  name: {type: Sequelize.STRING,},
  position: {type: Sequelize.STRING},
  description: {type: Sequelize.BOOLEAN},
  exclusive: {type: Sequelize.BOOLEAN},
  sp: {type: Sequelize.INTEGER},
  level: {type: Sequelize.STRING},
  build: {type: Sequelize.BOOLEAN},
  cd: {type: Sequelize.STRING},
  select_weapon: {type: Sequelize.STRING},
  select_move: {type: Sequelize.STRING},
  hp: {type: Sequelize.INTEGER},
  atk: {type: Sequelize.INTEGER},
  spd: {type: Sequelize.INTEGER},
  def: {type: Sequelize.INTEGER},
  res: {type: Sequelize.INTEGER},
  attribute: {type: Sequelize.INTEGER},
  creation: {type: Sequelize.STRING},
  lase_modified: {type: Sequelize.STRING},
}, {
  // 如果为 true 则表的名称和 model 相同，即 user
  // 为 false MySQL创建的表名称会是复数 users
  // 如果指定的表名称本就是复数形式则不变
  freezeTableName: true,
  timestamps: false,
});

module.exports.skill = Skill;

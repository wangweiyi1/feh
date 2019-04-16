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
  legend: {type: Sequelize.BOOLEAN},
  limit: {type: Sequelize.BOOLEAN},
  top: {type: Sequelize.BOOLEAN},
  update: {type: Sequelize.BOOLEAN},
  special_hero: {type: Sequelize.BOOLEAN},
  equipped_weapon: {type: Sequelize.STRING},
  good_character: {type: Sequelize.STRING},
  bad_character: {type: Sequelize.STRING},
}, {
  // 如果为 true 则表的名称和 model 相同，即 user
  // 为 false MySQL创建的表名称会是复数 users
  // 如果指定的表名称本就是复数形式则不变
  freezeTableName: true,
});

const attribute = db.define('attribute', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement: true
  },
  hp_1: {type: Sequelize.INTEGER},
  atk_1: {type: Sequelize.INTEGER},
  spd_1: {type: Sequelize.INTEGER},
  def_1: {type: Sequelize.INTEGER},
  res_1: {type: Sequelize.INTEGER},
  hp_40: {type: Sequelize.INTEGER},
  atk_40: {type: Sequelize.INTEGER},
  spd_40: {type: Sequelize.INTEGER},
  def_40: {type: Sequelize.INTEGER},
  res_40: {type: Sequelize.INTEGER},
  weapon: {type: Sequelize.INTEGER},
  sup: {type: Sequelize.INTEGER},
  kill: {type: Sequelize.INTEGER},
  a: {type: Sequelize.INTEGER},
  b: {type: Sequelize.INTEGER},
  c: {type: Sequelize.INTEGER},
}, {
  // 如果为 true 则表的名称和 model 相同，即 user
  // 为 false MySQL创建的表名称会是复数 users
  // 如果指定的表名称本就是复数形式则不变
  freezeTableName: true,
});

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

hero.hasMany(hero_attribute,{foreignKey: 'hero_id'});
hero_attribute.belongsTo(hero,{foreignKey: 'hero_id'});

// hero.belongsToMany(attribute, { as: 'hero', through: hero_attribute, foreignKey: 'hero_id' });
// attribute.belongsToMany(hero, { as: 'attribute', through: hero_attribute, foreignKey: 'attribute_id' });

module.exports.hero = hero;
module.exports.attribute = attribute;
module.exports.hero_attribute = hero_attribute;

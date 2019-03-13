const skill = require('../entity/skill');

module.exports.findAll = () => {
  return skill.skill.findAll();
};

module.exports.getSkillListLimit = (params) => {
  return skill.sequelize.query("select (SELECT COUNT(s.id) FROM skill s) as 'sumCount', s.* FROM  skill s ORDER BY creation desc LIMIT " + (params.currentPage - 1) * params.pageSize + "," + params.pageSize + "");
};

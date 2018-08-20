module.exports = function(sequelize, DataTypes) {
  var Trans = sequelize.define("Trans", {
    trans: DataTypes.STRING,
    language: DataTypes.STRING,
    votes: DataTypes.INTEGER
  });
  return Trans;
};

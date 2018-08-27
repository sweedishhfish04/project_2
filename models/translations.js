module.exports = function(sequelize, DataTypes) {
  var Trans = sequelize.define("Trans", {
    trans: DataTypes.STRING,
    language: DataTypes.STRING,
    category: DataTypes.STRING,
    votes: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    phraseId: DataTypes.INTEGER
  });
  return Trans;
};

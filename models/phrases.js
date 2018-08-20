module.exports = function(sequelize, DataTypes) {
  var Phrase = sequelize.define("Phrase", {
    phrase: DataTypes.STRING,
    trans: DataTypes.STRING,
    votes: DataTypes.INTEGER
  });
  return Phrase;
};

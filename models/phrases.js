module.exports = function(sequelize, DataTypes) {
  var Phrase = sequelize.define("Phrase", {
    phrase: DataTypes.STRING,
    category: DataTypes.STRING
  });
  return Phrase;
};

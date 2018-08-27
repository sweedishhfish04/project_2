module.exports = function(sequelize, DataTypes) {
    var Trans2 = sequelize.define("Trans2", {
      trans: DataTypes.STRING,
      language: DataTypes.STRING,
      votes: DataTypes.INTEGER
    });
    return Trans2;
  };

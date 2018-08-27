module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        lang1: DataTypes.STRING,
        lang1Level: DataTypes.INTEGER,
        lang2: DataTypes.STRING,
        lang2Level: DataTypes.INTEGER,
        lang3: DataTypes.STRING,
        lang3Level: DataTypes.INTEGER,
        nativeLang: DataTypes.STRING
    });
    return User;
};
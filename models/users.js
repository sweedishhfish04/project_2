module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        nativeLang: DataTypes.STRING,
        knownLang: DataTypes.STRING
    });
    return User;
};
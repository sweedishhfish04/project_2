module.exports = function(sequelize, DataTypes) {
    var Trans2 = sequelize.define("Trans2", {
      trans: DataTypes.STRING,
      language: DataTypes.STRING,
      votes: DataTypes.INTEGER
    });
    return Trans2;
  };



//   module.exports = function (sequelize, DataTypes) {
//     const Anim = sequelize.define("Trans2", {
//       trans: DataTypes.STRING,
//       language: DataTypes.STRING,
//       votes: DataTypes.STRING,
//       URL: DataTypes.STRING,
//       dlName: DataTypes.STRING,
//       srcName: DataTypes.STRING
//     });
  
//     Anim.associate = (models) => {
//       Anim.belongsToMany(models.Weapon, {
//         through: 'AnimWepIm'
//         //foreignKey: 'animId'
//       });
//     };
// }

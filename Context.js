const Sequelize = require("sequelize");

module.exports = class Context {
  constructor() {
    this.database = require("./config/database");
  }

  static initWhere(column, value) {
    if (value) {
      let toks = value.split(" ");
      if (toks.length > 0) {
        let conditions = [];
        for (let i = 0; i < toks.length; i++) {
          let obj = {};
          obj[column] = { [Sequelize.Op.like]: "%" + toks[i] + "%" };
          conditions.push(obj);
        }
        return conditions;
      }
    }
    return [];
  }

  init() {
    // Models
    const User = require("./model/User");
    const UserType = require("./model/UserType");
    const Estate = require("./model/Estate");
    const EstateType = require("./model/EstateType");
    const EstateImage = require("./model/EstateImage");

    // Tables
    const user = User(this.database, Sequelize.DataTypes);
    const user_type = UserType(this.database, Sequelize.DataTypes);
    const estate = Estate(this.database, Sequelize.DataTypes);
    const estate_type = EstateType(this.database, Sequelize.DataTypes);
    const estate_image = EstateImage(this.database, Sequelize.DataTypes);

    // ForeignKeys
    user.belongsTo(user_type, {
      foreignKey: { name: "user_type_id", allowNull: false },
    });
    estate.belongsTo(user, {
      foreignKey: { name: "owner_id", allowNull: false },
    });
    estate.belongsTo(estate_type, {
      foreignKey: { name: "estate_type_id", allowNull: false },
    });
    estate_image.belongsTo(estate, {
      foreignKey: { name: "estate_id", allowNull: false },
    });

    this.database.sync({ force: false });
  }
};

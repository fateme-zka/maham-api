const Sequelize = require("sequelize");

module.exports = class Context {
  constructor() {
    this.database = require("./config/database");
  }

  init() {
    // Models
    const User = require("./model/User");
    const UserType = require("./model/UserType");

    // Tables
    const user = User(this.database, Sequelize.DataTypes);
    const user_type = UserType(this.database, Sequelize.DataTypes);

    // ForeignKeys
    user.belongsTo(user_type, {
      foreignKey: { name: "user_type_id", allowNull: false },
    });

    this.database.sync({ force: false });
  }
};

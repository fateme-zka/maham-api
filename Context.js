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
    const Role = require("./model/Role");
    const Estate = require("./model/Estate");
    const EstateType = require("./model/EstateType");
    const EstateImage = require("./model/EstateImage");
    const Like = require("./model/Like");
    const Bookmark = require("./model/Bookmark");
    const Province = require("./model/Province");
    const City = require("./model/City");

    // Tables
    const user = User(this.database, Sequelize.DataTypes);
    const role = Role(this.database, Sequelize.DataTypes);
    const estate = Estate(this.database, Sequelize.DataTypes);
    const estate_type = EstateType(this.database, Sequelize.DataTypes);
    const estate_image = EstateImage(this.database, Sequelize.DataTypes);
    const like = Like(this.database, Sequelize.DataTypes);
    const bookmark = Bookmark(this.database, Sequelize.DataTypes);
    const province = Province(this.database, Sequelize.DataTypes);
    const city = City(this.database, Sequelize.DataTypes);

    // ForeignKeys
    user.belongsTo(role, {
      foreignKey: { name: "role_id", allowNull: false },
    });
    estate.belongsTo(user, {
      foreignKey: { name: "owner_id", allowNull: false },
    });
    estate.belongsTo(estate_type, {
      foreignKey: { name: "estate_type_id", allowNull: false },
    });
    estate.belongsTo(province, {
      foreignKey: { name: "province_id", allowNull: false },
    });
    estate.belongsTo(city, {
      foreignKey: { name: "city_id", allowNull: false },
    });
    estate_image.belongsTo(estate, {
      foreignKey: { name: "estate_id", allowNull: false },
    });
    like.belongsTo(user, {
      foreignKey: { name: "user_id", allowNull: false },
    });
    like.belongsTo(estate, {
      foreignKey: { name: "estate_id", allowNull: false },
    });
    bookmark.belongsTo(user, {
      foreignKey: { name: "user_id", allowNull: false },
    });
    bookmark.belongsTo(estate, {
      foreignKey: { name: "estate_id", allowNull: false },
    });
    city.belongsTo(province, {
      foreignKey: { name: "province_id", allowNull: false },
    });

    this.database.sync({ force: false });
  }

  async getModel(model, options) {
    if (!options) options = {};
    return await this.database.models[model].findOne(options);
  }

  //#region User-------------------------------------------------------------
  async getUser(column, value) {
    let where = {};
    if (column == "id") where = { id: value };
    else if (column == "username") where = { username: value };
    else if (column == "phone_number") where = { phone_number: value };
    return await this.getModel("user", { where });
  }

  async register(
    role_id,
    admin,
    username,
    password,
    first_name,
    last_name,
    phone_number,
    email
  ) {
    first_name = first_name.trim();
    if (last_name) last_name = last_name.trim();
    if (email) email = email.trim();

    return await this.database.models.user.create({
      role_id,
      admin,
      username,
      password,
      first_name,
      last_name,
      phone_number,
      email,
    });
  }
  //#endregion

  //#region Estate-----------------------------------------------------------
  async getEstates() {
    return this.database.models.estate.findAll({
      limit: 30,
    });
  }
  //#endregion
};

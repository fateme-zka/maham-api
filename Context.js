const Sequelize = require("sequelize");
const { Op } = require("sequelize");

module.exports = class Context {
  constructor() {
    this.database = require("./config/database");
  }

  init() {
    // Models
    const User = require("./model/User");
    const Role = require("./model/Role");
    const Session = require("./model/Session");
    const Estate = require("./model/Estate");
    const EstateType = require("./model/EstateType");
    const EstateImage = require("./model/EstateImage");
    const EstateScore = require("./model/EstateScore");
    const Like = require("./model/Like");
    const Bookmark = require("./model/Bookmark");
    const Province = require("./model/Province");
    const City = require("./model/City");

    // Tables
    const user = User(this.database, Sequelize.DataTypes);
    const role = Role(this.database, Sequelize.DataTypes);
    const session = Session(this.database, Sequelize.DataTypes);
    const estate = Estate(this.database, Sequelize.DataTypes);
    const estate_type = EstateType(this.database, Sequelize.DataTypes);
    const estate_image = EstateImage(this.database, Sequelize.DataTypes);
    const estate_score = EstateScore(this.database, Sequelize.DataTypes);
    const like = Like(this.database, Sequelize.DataTypes);
    const bookmark = Bookmark(this.database, Sequelize.DataTypes);
    const province = Province(this.database, Sequelize.DataTypes);
    const city = City(this.database, Sequelize.DataTypes);

    // ForeignKeys
    user.belongsTo(role, {
      foreignKey: { name: "role_id", allowNull: false },
    });
    estate.belongsTo(user, {
      foreignKey: { name: "user_id", allowNull: false },
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
    estate_score.belongsTo(estate, {
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
    session.belongsTo(user, {
      foreignKey: { name: "user_id", allowNull: false },
    });
    session.belongsTo(role, {
      foreignKey: { name: "role_id", allowNull: false },
    });

    this.database.sync({ force: false });
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

  async getModel(model, options) {
    if (!options) options = {};
    return await this.database.models[model].findOne(options);
  }

  //#region User
  async getUser(column, value) {
    let where = {};
    if (column == "id") where = { id: value };
    else if (column == "username") where = { username: value };
    else if (column == "phone_number") where = { phone_number: value };
    return await this.getModel("user", {
      where,
      include: {
        model: this.database.models.role,
        as: "role",
      },
    });
  }
  async registerUser(
    role_id,
    admin,
    username,
    password,
    first_name,
    last_name,
    phone_number,
    email,
    image,
    cover_image
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
      image,
      cover_image,
    });
  }
  //#endregion

  //#region Role
  async getRole(id, name) {
    let where = {};
    if (id) where.id = id;
    if (name) where.name = { [Sequelize.Op.like]: "%" + name.trim() + "%" };
    return await this.database.models.role.findOne({ where });
  }
  //#endregion

  //#region Session
  async createSession(user_id, role_id, admin) {
    let session = await this.database.models.session.findOne({
      where: {
        user_id,
        role_id,
        admin,
      },
    });
    if (!session) {
      session = await this.database.models.session.create({
        user_id,
        role_id,
        admin,
      });
    }
    return session;
  }
  async deleteSession(id) {
    await this.database.models.session.destroy({ where: { id } });
  }
  //#endregion

  //#region Estate
  async getEstates() {
    return this.database.models.estate.findAll({
      where: { verified: true, sold: false, active: true },
      limit: 30,
    });
  }
  async getEstate(id) {
    let estate = await this.getModel("estate", {
      where: { id },
      include: [
        {
          model: this.database.models.province,
          as: "province",
        },
        {
          model: this.database.models.city,
          as: "city",
        },
      ],
    });
    if (estate) {
      let images = await this.database.models.estate_image.findAll({
        where: { estate_id: id },
      });
      estate.dataValues.images = images;
    }
    return estate;
  }
  async addEstate(
    estate_type_id,
    user_id,
    name,
    phone_number,
    email,
    province_id,
    city_id,
    area,
    address,
    description,
    land_size_meter,
    buliding_size_meter,
    loan,
    document_type,
    sale_method,
    pawn_price,
    rent_price,
    meter_price,
    verified,
    sold,
    active,
    building_name,
    cooling_system,
    heating_system,
    crossing_width,
    length,
    width,
    distance_to_city,
    distance_to_sea,
    room_count,
    building_floor_count,
    building_unit_count,
    flooring_type,
    cabinet_type,
    windows_type,
    closet_type,
    inner_door_type,
    entrance_door_type,
    facade_type,
    parking,
    storeroom,
    elevator,
    waterfront,
    gazebo,
    green_space,
    security_door,
    table_gas,
    kitchen_hood,
    furnished,
    shooting,
    barbecue,
    fireplace,
    automatic_door,
    central_antenna,
    terrace,
    sauna,
    jacuzzi,
    air_conditioner,
    camera,
    video_door_phone,
    pool,
    images
  ) {
    let estate = await this.database.models.estate.create({
      estate_type_id,
      user_id,
      name,
      phone_number,
      email,
      province_id,
      city_id,
      area,
      address,
      description,
      land_size_meter,
      buliding_size_meter,
      loan,
      document_type,
      sale_method,
      pawn_price,
      rent_price,
      meter_price,
      verified,
      sold,
      active,
      building_name,
      cooling_system,
      heating_system,
      crossing_width,
      length,
      width,
      distance_to_city,
      distance_to_sea,
      room_count,
      building_floor_count,
      building_unit_count,
      flooring_type,
      cabinet_type,
      windows_type,
      closet_type,
      inner_door_type,
      entrance_door_type,
      facade_type,
      parking,
      storeroom,
      elevator,
      waterfront,
      gazebo,
      green_space,
      security_door,
      table_gas,
      kitchen_hood,
      furnished,
      shooting,
      barbecue,
      fireplace,
      automatic_door,
      central_antenna,
      terrace,
      sauna,
      jacuzzi,
      air_conditioner,
      camera,
      video_door_phone,
      pool,
    });
    images.forEach(async (image) => {
      await this.database.models.estate_image.create({
        estate_id: estate.id,
        image,
      });
    });
    return estate;
  }
  async verifyEstate(id) {
    return await this.database.models.estate.update(
      { verified: true },
      { where: { id } }
    );
  }
  async updateEstate(id, images, fields) {
    let obj = {};
    // fields.forEach((field) => {
    //   if (field) obj[field] = field;
    // });
    fields.map((field) => {
      if (field) obj[field] = field;
    });
    let estate = await this.database.models.estate.update(obj, {
      where: { id },
    });
    // replace all images
    await this.database.models.estate_image.destroy({
      where: { estate_id: id },
    });
    images.forEach(async (image) => {
      await this.database.models.estate_image.create({
        estate_id: id,
        image,
      });
    });
    return estate;
  }
  async deleteEstate(id) {
    await this.database.models.estate.destroy({ where: { id } });
  }
  async switchStatusEstate(id, active, sold) {
    let options = {};
    if (active) options.active = active == "true";
    if (sold) options.sold = sold == "true";
    return await this.database.models.estate.update(options, { where: { id } });
  }
  //#endregion

  //#region Estate Type
  async getEstateType(name) {
    return await this.database.models.estate_type.findOne({
      where: {
        name: {
          [Op.like]: "%" + name.trim() + "%",
        },
      },
    });
  }
  //#endregion

  //#region Province/City
  async getProvinces() {
    return await this.database.models.province.findAll();
  }
  async getCities(province_id) {
    return await this.database.models.city.findAll({ where: { province_id } });
  }
  //#endregion
};

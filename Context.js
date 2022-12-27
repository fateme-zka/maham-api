const Sequelize = require("sequelize");

module.exports = class Context {
  constructor() {
    this.database = require("./config/database");
  }

  init() {}
};

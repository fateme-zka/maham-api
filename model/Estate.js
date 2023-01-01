const Base = require("./Base");

module.exports = (sequelize, DataTypes) => {
  return Base(sequelize, DataTypes, "estate", {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, },
    estate_type_id: { type: DataTypes.INTEGER, allowNull: false },
    owner_id: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    phone_number: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: true },
    province_id: { type: DataTypes.INTEGER, allowNull: false },
    city_id: { type: DataTypes.INTEGER, allowNull: false },
    area: { type: DataTypes.STRING, allowNull: true },
    address: { type: DataTypes.TEXT, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    land_size_meter: { type: DataTypes.FLOAT, allowNull: true },
    buliding_size_meter: { type: DataTypes.FLOAT, allowNull: true },
    loan: { type: DataTypes.BOOLEAN, allowNull: true },
    document_type: { type: DataTypes.STRING, allowNull: true },
    // status
    verified: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    sold: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    // OTHER----------------------------------------------------
    building_name: { type: DataTypes.STRING, allowNull: true },
    cooling_system: { type: DataTypes.STRING, allowNull: true },
    heating_system: { type: DataTypes.STRING, allowNull: true },
    crossing_width: { type: DataTypes.FLOAT, allowNull: true },
    length: { type: DataTypes.FLOAT, allowNull: true },
    width: { type: DataTypes.FLOAT, allowNull: true },
    // count
    room_count: { type: DataTypes.INTEGER, allowNull: true },
    building_floor_count: { type: DataTypes.INTEGER, allowNull: true },
    building_unit_count: { type: DataTypes.INTEGER, allowNull: true },
    distance_to_city: { type: DataTypes.FLOAT, allowNull: true },
    distance_to_sea: { type: DataTypes.FLOAT, allowNull: true },
    // type
    flooring_type: { type: DataTypes.STRING, allowNull: true },
    cabinet_type: { type: DataTypes.STRING, allowNull: true },
    windows_type: { type: DataTypes.STRING, allowNull: true },
    closet_type: { type: DataTypes.STRING, allowNull: true },
    inner_door_type: { type: DataTypes.STRING, allowNull: true },
    entrance_door_type: { type: DataTypes.STRING, allowNull: true },
    facade_type: { type: DataTypes.STRING, allowNull: true },
    // option
    parking: { type: DataTypes.BOOLEAN, allowNull: true },
    storeroom: { type: DataTypes.BOOLEAN, allowNull: true },
    elevator: { type: DataTypes.BOOLEAN, allowNull: true },
    waterfront: { type: DataTypes.BOOLEAN, allowNull: true },
    gazebo: { type: DataTypes.BOOLEAN, allowNull: true },
    green_space: { type: DataTypes.BOOLEAN, allowNull: true },
    security_door: { type: DataTypes.BOOLEAN, allowNull: true },
    table_gas: { type: DataTypes.BOOLEAN, allowNull: true },
    kitchen_hood: { type: DataTypes.BOOLEAN, allowNull: true },
    furnished: { type: DataTypes.BOOLEAN, allowNull: true },
    shooting: { type: DataTypes.BOOLEAN, allowNull: true },
    barbecue: { type: DataTypes.BOOLEAN, allowNull: true },
    fireplace: { type: DataTypes.BOOLEAN, allowNull: true },
    automatic_door: { type: DataTypes.BOOLEAN, allowNull: true },
    central_antenna: { type: DataTypes.BOOLEAN, allowNull: true },
    terrace: { type: DataTypes.BOOLEAN, allowNull: true },
    sauna: { type: DataTypes.BOOLEAN, allowNull: true },
    jacuzzi: { type: DataTypes.BOOLEAN, allowNull: true },
    air_conditioner: { type: DataTypes.BOOLEAN, allowNull: true },
    camera: { type: DataTypes.BOOLEAN, allowNull: true },
    video_door_phone: { type: DataTypes.BOOLEAN, allowNull: true },
    pool: { type: DataTypes.BOOLEAN, allowNull: true },
  });
};

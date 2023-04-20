const Base = require("./Base");

module.exports = (sequelize, DataTypes) =>
{
	return Base(sequelize, DataTypes, "user", {
		id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, },
		user_role_id: { type: DataTypes.INTEGER, allowNull: false },
		admin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
		password: { type: DataTypes.STRING, allowNull: false, secure: true },
		name: { type: DataTypes.STRING, allowNull: false },
		phone_number: { type: DataTypes.STRING, allowNull: false, unique: true },
		email: { type: DataTypes.STRING, allowNull: true, unique: true },
		image: { type: DataTypes.STRING, allowNull: true },
		cover_image: { type: DataTypes.STRING, allowNull: true },
		e_otp: { type: DataTypes.STRING(6), allowNull: true, secure: true },
		e_otp_time: { type: 'TIMESTAMP', allowNull: true, defaultValue: sequelize.literal('CURRENT_TIMESTAMP'), secure: true },
		e_otp_attempt: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false, secure: true },
		e_try_attempt: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false, secure: true },
		e_approved: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
		f_otp: { type: DataTypes.STRING(18), allowNull: true, secure: true },
		f_otp_time: { type: 'TIMESTAMP', allowNull: true, defaultValue: sequelize.literal('CURRENT_TIMESTAMP'), secure: true },
		f_otp_attempt: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false, secure: true },
		f_try_attempt: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false, secure: true },
	});
};

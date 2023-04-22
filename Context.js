const Sequelize = require("sequelize");
const { Op } = require("sequelize");

module.exports = class Context
{
	constructor()
	{
		this.database = require("./config/database");
	}

	init()
	{
		// // Models
		// const User = require("./model/User");
		// const UserRole = require("./model/UserRole");
		// const Estate = require("./model/Estate");
		// const EstateType = require("./model/EstateType");
		// const EstateImage = require("./model/EstateImage");
		// const EstateScore = require("./model/EstateScore");
		// const Like = require("./model/Like");
		// const Bookmark = require("./model/Bookmark");
		// const Province = require("./model/Province");
		// const City = require("./model/City");
		// const Comment = require("./model/Comment");
		// const Score = require("./model/Score");
		// const Message = require("./model/Message");

		// // Tables
		// const user = User(this.database, Sequelize.DataTypes);
		// const user_role = UserRole(this.database, Sequelize.DataTypes);
		// const estate = Estate(this.database, Sequelize.DataTypes);
		// const estate_type = EstateType(this.database, Sequelize.DataTypes);
		// const estate_image = EstateImage(this.database, Sequelize.DataTypes);
		// const estate_score = EstateScore(this.database, Sequelize.DataTypes);
		// const like = Like(this.database, Sequelize.DataTypes);
		// const bookmark = Bookmark(this.database, Sequelize.DataTypes);
		// const province = Province(this.database, Sequelize.DataTypes);
		// const city = City(this.database, Sequelize.DataTypes);
		// const comment = Comment(this.database, Sequelize.DataTypes);
		// const score = Score(this.database, Sequelize.DataTypes);
		// const message = Message(this.database, Sequelize.DataTypes);

		// // ForeignKeys
		// user.belongsTo(user_role, {
		// 	foreignKey: { name: "user_role_id", allowNull: false },
		// });
		// estate.belongsTo(user, {
		// 	foreignKey: { name: "user_id", allowNull: false },
		// });
		// estate.belongsTo(estate_type, {
		// 	foreignKey: { name: "estate_type_id", allowNull: false },
		// });
		// estate.belongsTo(province, {
		// 	foreignKey: { name: "province_id", allowNull: false },
		// });
		// estate.belongsTo(city, {
		// 	foreignKey: { name: "city_id", allowNull: false },
		// });
		// estate_image.belongsTo(estate, {
		// 	foreignKey: { name: "estate_id", allowNull: false },
		// });
		// estate_score.belongsTo(estate, {
		// 	foreignKey: { name: "estate_id", allowNull: false },
		// });
		// like.belongsTo(user, {
		// 	foreignKey: { name: "user_id", allowNull: false },
		// });
		// like.belongsTo(estate, {
		// 	foreignKey: { name: "estate_id", allowNull: false },
		// });
		// bookmark.belongsTo(user, {
		// 	foreignKey: { name: "user_id", allowNull: false },
		// });
		// bookmark.belongsTo(estate, {
		// 	foreignKey: { name: "estate_id", allowNull: false },
		// });
		// city.belongsTo(province, {
		// 	foreignKey: { name: "province_id", allowNull: false },
		// });
		// comment.belongsTo(estate, {
		// 	foreignKey: { name: "estate_id", allowNull: false },
		// });
		// comment.belongsTo(user, {
		// 	foreignKey: { name: "user_id", allowNull: false },
		// });
		// score.belongsTo(estate, {
		// 	foreignKey: { name: "estate_id", allowNull: false },
		// });
		// score.belongsTo(user, {
		// 	foreignKey: { name: "user_id", allowNull: false },
		// });
		// message.belongsTo(user, {
		// 	foreignKey: { name: "sender_id", allowNull: false },
		// });
		// message.belongsTo(user, {
		// 	foreignKey: { name: "receiver_id", allowNull: false },
		// });

		// this.database.sync({ force: false });
	}

	static initWhere(column, value)
	{
		if (value)
		{
			let toks = value.split(" ");
			if (toks.length > 0)
			{
				let conditions = [];
				for (let i = 0;i < toks.length;i++)
				{
					let obj = {};
					obj[column] = { [Sequelize.Op.like]: "%" + toks[i] + "%" };
					conditions.push(obj);
				}
				return conditions;
			}
		}
		return [];
	}

	async getModel(model, options)
	{
		if (!options) options = {};
		return await this.database.models[model].findOne(options);
	}

	async createModel(model, values)
	{
		return await this.database.models[model].create(values);
	}

	//#region User
	async getUser(column, value)
	{
		let where = { column: value };
		// if (column == "id") where = { id: value };
		// else if (column == "email") where = { email: value };
		// else if (column == "phone_number") where = { phone_number: value };
		return await this.getModel("user", {
			where,
			include: {
				model: this.database.models.user_role,
				as: "user_role",
			},
		});
	}

	async getConsultantsOrAdmins()
	{
		return await this.database.models.user.findAll({
			attributes: ["id", "email", "name"],
		});
	}

	async registerUser(
		user_role_id,
		admin,
		email,
		password,
		name,
		phone_number,
		image,
		cover_image
	)
	{
		let values = {
			user_role_id,
			admin,
			email: email.trim(),
			password,
			name: name.trim(),
			phone_number,
			image,
			cover_image
		}
		return await this.createModel("user", values);
	}

	async updateUser(id, fields)
	{
		let values = {};
		Object.keys(fields).forEach((key) =>
		{
			if (fields[key]) values[key] = fields[key];
		});
		return await this.database.models.user.update(values, { where: { id } });
	}
	//#endregion

	//#region UserRole
	async getUserRole(id, name)
	{
		let where = {};
		if (id) where.id = id;
		if (name) where.name = { [Sequelize.Op.like]: "%" + name.trim() + "%" };
		return await this.database.models.user_role.findOne({ where });
	}
	//#endregion

	//#region Province/City
	async getProvinces()
	{
		return await this.database.models.province.findAll();
	}

	async getCities(province_id)
	{
		return await this.database.models.city.findAll({ where: { province_id } });
	}
	//#endregion

	//#region Estate
	whereEstates(
		sale_method,
		estate_type_id,
		meter,
		room_count,
		province_id,
		city_id,
		total_min_price,
		total_max_price,
		meter_min_price,
		meter_max_price,
		pawn_min_price,
		pawn_max_price,
		rent_min_price,
		rent_max_price,
		where
	)
	{
		if (!where) where = {};
		if (sale_method) where.sale_method = sale_method;
		if (estate_type_id) where.estate_type_id = estate_type_id;
		if (meter)
		{
			let or = {
				[Op.or]: [{ land_size_meter: meter }, { buliding_size_meter: meter }],
			};
			where = { ...where, ...or };
		}
		if (room_count) where.room_count = room_count;
		if (province_id) where.province_id = province_id;
		if (city_id) where.city_id = city_id;
		if (total_min_price) where.total_price = { [Op.gte]: total_min_price };
		if (total_max_price) where.total_price = { [Op.lte]: total_max_price };
		if (meter_min_price) where.meter_price = { [Op.gte]: meter_min_price };
		if (meter_max_price) where.meter_price = { [Op.lte]: meter_max_price };
		if (pawn_min_price) where.pawn_price = { [Op.gte]: pawn_min_price };
		if (pawn_max_price) where.pawn_price = { [Op.lte]: pawn_max_price };
		if (rent_min_price) where.rent_price = { [Op.gte]: rent_min_price };
		if (rent_max_price) where.rent_price = { [Op.lte]: rent_max_price };
		return where;
	}

	async getEstates(
		user_id,
		sale_method,
		estate_type_id,
		meter,
		room_count,
		province_id,
		city_id,
		total_min_price,
		total_max_price,
		meter_min_price,
		meter_max_price,
		pawn_min_price,
		pawn_max_price,
		rent_min_price,
		rent_max_price
	)
	{
		let where = { verified: true, sold: false, active: true };
		where = this.whereEstates(
			sale_method,
			estate_type_id,
			meter,
			room_count,
			province_id,
			city_id,
			total_min_price,
			total_max_price,
			meter_min_price,
			meter_max_price,
			pawn_min_price,
			pawn_max_price,
			rent_min_price,
			rent_max_price,
			where
		);
		if (user_id) where.user_id = user_id;
		return this.database.models.estate.findAll({
			where,
			limit: 30, // todo pagination
		});
	}

	async getEstateTypes()
	{
		return this.database.models.estate_type.findAll();
	}

	async getEstate(id)
	{
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
		if (estate)
		{
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
		total_price,
		meter_price,
		pawn_price,
		rent_price,
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
	)
	{
		let values = {
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
			total_price,
			meter_price,
			pawn_price,
			rent_price,
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
		};
		let estate = await this.createModel("estate", values);

		images.forEach(async (image) =>
		{
			await this.createModel("estate_image", {
				estate_id: estate.id,
				image,
			});
		});
		return estate;
	}

	async verifyEstate(id)
	{
		return await this.database.models.estate.update(
			{ verified: true },
			{ where: { id } }
		);
	}

	async updateEstate(id, images, fields)
	{
		let values = {};
		Object.keys(fields).forEach((key) =>
		{
			if (fields[key]) values[key] = fields[key];
		});
		let estate = await this.database.models.estate.update(values, {
			where: { id },
		});
		// replace all images
		await this.database.models.estate_image.destroy({
			where: { estate_id: id },
		});
		images.forEach(async (image) =>
		{
			await this.createModel("estate_image", {
				estate_id: id,
				image,
			});
		});
		return estate;
	}

	async deleteEstate(id)
	{
		await this.database.models.estate.destroy({ where: { id } });
	}

	async switchStatusEstate(id, active, sold)
	{
		let options = {};
		if (active) options.active = active == "true";
		if (sold) options.sold = sold == "true";
		return await this.database.models.estate.update(options, { where: { id } });
	}

	async transferEstate(id, receiver_id)
	{
		return await this.database.models.estate.update(
			{ user_id: receiver_id },
			{ where: { id } }
		);
	}
	//#endregion

	//#region Estate Type
	async getEstateType(name)
	{
		return await this.database.models.estate_type.findOne({
			where: {
				name: {
					[Op.like]: "%" + name.trim() + "%",
				},
			},
		});
	}
	//#endregion

	//#region Estate Reaction
	async likeEstate(estate_id, user_id, like)
	{
		if (!like)
		{
			await this.database.models.like.destroy({
				where: { user_id, estate_id },
			});
			return;
		}
		like = await this.database.models.like.findOne({
			where: { user_id, estate_id },
		});
		if (!like)
			return await this.createModel("like", { user_id, estate_id });
	}

	async countLikes(estate_id)
	{
		return await this.database.models.like.count({
			where: { estate_id },
		});
	}

	async checkLike(estate_id, user_id)
	{
		let like = await this.database.models.like.findOne({
			where: { user_id, estate_id },
		});
		if (like) return { like: true };
		return { like: false };
	}

	async bookmarkEstate(estate_id, user_id, bookmark)
	{
		if (!bookmark)
		{
			await this.database.models.bookmark.destroy({
				where: { user_id, estate_id },
			});
			return;
		}
		bookmark = await this.database.models.bookmark.findOne({
			where: { user_id, estate_id },
		});
		if (!bookmark)
			return await this.createModel("bookmark", { user_id, estate_id });
	}

	async checkBookmark(estate_id, user_id)
	{
		let bookmark = await this.database.models.bookmark.findOne({
			where: { user_id, estate_id },
		});
		if (bookmark) return { bookmark: true };
		return { bookmark: false };
	}

	async getBookmarkedEstates(user_id)
	{
		let estate_ids = [];
		let bookmarks = await this.database.models.bookmark.findAll({
			where: { user_id },
		});
		bookmarks.map((bookmark) => estate_ids.push(bookmark.estate_id));
		return await this.database.models.estate.findAll({
			where: { id: estate_ids },
		});
	}

	async getComments(estate_id)
	{
		return await this.database.models.comment.findAll({
			where: { estate_id, verified: true },
		});
	}

	async verifyComment(id)
	{
		return await this.database.models.comment.update(
			{ verified: true },
			{ where: { id } }
		);
	}

	async addComment(estate_id, user_id, text)
	{
		return await this.createModel("comment", {
			estate_id,
			user_id,
			text,
			verified: false,
		});
	}

	async deleteComment(id)
	{
		await this.database.models.comment.destroy({ where: { id } });
	}

	async addScore(estate_id, user_id, star)
	{
		return await this.createModel("score", {
			estate_id,
			user_id,
			star,
		});
	}

	async countScores(estate_id)
	{
		let bind = { estate_id };
		let query = `SELECT COUNT(*), SUM(star) FROM score WHERE estate_id=$estate_id;`;
		let [result] = await this.database.query(query, { bind });
		let rate = result[0]["SUM(star)"] / result[0]["COUNT(*)"];
		return { rate };
	}
	//#endregion

	//#region Message
	async getMessages(allOrNotSeen, receiver_id)
	{
		if (allOrNotSeen)
		{
			return await this.database.models.message.findAll({
				where: { receiver_id },
				include: {
					model: this.database.models.user,
					as: "sender",
				},
			});
		}
		return await this.database.models.message.findAll({
			where: { receiver_id, seen: false },
			include: {
				model: this.database.models.user,
				as: "sender",
			},
		});
	}

	async sendMessage(sender_id, receiver_id, title, text)
	{
		return await this.createModel("message", {
			sender_id,
			receiver_id,
			title,
			text,
			seen: false,
		});
	}

	async seenMessage(id, receiver_id)
	{
		return await this.database.models.message.update(
			{ seen: true },
			{ where: { id, receiver_id } }
		);
	}
	//#endregion

	//#region ContactUs
	async addContactUs(name, email, phone_number, title, text, estate_id)
	{
		return await this.createModel("contact_us", { name, email, phone_number, title, text, estate_id });
	}

	async getContactUses(limit, estate_id)
	{
		let options = {};
		if (estate_id) options.where.estate_id = estate_id;
		if (limit) options.where.limit = limit;
		return await this.database.models.contact_us.findAll(options);
	}
	//#endregion
};

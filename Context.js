const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const error_operation = require("./util/error_operation");
const PAGE = 1;
const PAGE_SIZE = 20;

module.exports = class Context
{
	constructor()
	{
		this.database = require("./config/database");
	}

	init()
	{
		// Models
		const User = require("./model/User");
		const UserRole = require("./model/UserRole");
		const AdvertisingRequest = require("./model/AdvertisingRequest");
		const ContactUs = require("./model/ContactUs");
		const Customer = require("./model/Customer");
		const CustomerFollowup = require("./model/CustomerFollowup");
		const CustomerStage = require("./model/CustomerStage");
		const Estate = require("./model/Estate");
		const EstateBookmark = require("./model/EstateBookmark");
		const EstateFavorite = require("./model/EstateFavorite");
		const EstateFollowup = require("./model/EstateFollowup");
		const EstateImage = require("./model/EstateImage");
		const EstateScore = require("./model/EstateScore");
		const EstateType = require("./model/EstateType");
		const Meeting = require("./model/Meeting");
		const Message = require("./model/Message");
		const Setting = require("./model/Setting");
		const Sms = require("./model/Sms");
		const SupportRequest = require("./model/SupportRequest");
		const City = require("./model/City");
		const Province = require("./model/Province");

		// Tables
		const user = User(this.database, Sequelize.DataTypes);
		const user_role = UserRole(this.database, Sequelize.DataTypes);
		const advertising_request = AdvertisingRequest(this.database, Sequelize.DataTypes);
		const contact_us = ContactUs(this.database, Sequelize.DataTypes);
		const customer = Customer(this.database, Sequelize.DataTypes);
		const customer_followup = CustomerFollowup(this.database, Sequelize.DataTypes);
		const customer_stage = CustomerStage(this.database, Sequelize.DataTypes);
		const estate = Estate(this.database, Sequelize.DataTypes);
		const estate_bookmark = EstateBookmark(this.database, Sequelize.DataTypes);
		const estate_favorite = EstateFavorite(this.database, Sequelize.DataTypes);
		const estate_followup = EstateFollowup(this.database, Sequelize.DataTypes);
		const estate_image = EstateImage(this.database, Sequelize.DataTypes);
		const estate_score = EstateScore(this.database, Sequelize.DataTypes);
		const estate_type = EstateType(this.database, Sequelize.DataTypes);
		const meeting = Meeting(this.database, Sequelize.DataTypes);
		const message = Message(this.database, Sequelize.DataTypes);
		const setting = Setting(this.database, Sequelize.DataTypes);
		const sms = Sms(this.database, Sequelize.DataTypes);
		const support_request = SupportRequest(this.database, Sequelize.DataTypes);
		const city = City(this.database, Sequelize.DataTypes);
		const province = Province(this.database, Sequelize.DataTypes);

		// ForeignKeys
		user.belongsTo(user_role, {
			foreignKey: { name: "user_role_id", allowNull: false },
		});
		advertising_request.belongsTo(user, {
			foreignKey: { name: "user_id", allowNull: true },
		});
		user.hasMany(advertising_request);
		contact_us.belongsTo(estate, {
			foreignKey: { name: "estate_id", allowNull: true },
		});
		estate.hasMany(contact_us);
		customer.belongsTo(user, {
			foreignKey: { name: "user_id", allowNull: false },
		});
		user.hasMany(customer);
		customer.belongsTo(customer_stage, {
			foreignKey: { name: "customer_stage_id", allowNull: false },
		});
		customer_followup.belongsTo(user, {
			foreignKey: { name: "user_id", allowNull: false },
		});
		customer_followup.belongsTo(customer, {
			foreignKey: { name: "customer_id", allowNull: false },
		});
		customer.hasMany(customer_followup);
		customer_followup.belongsTo(customer_stage, {
			foreignKey: { name: "customer_stage_id", allowNull: false },
		});
		customer_followup.belongsTo(user, {
			foreignKey: { name: "followup_user_id", allowNull: false },
		});
		user.hasMany(customer_followup);
		estate.belongsTo(estate_type, {
			foreignKey: { name: "estate_type_id", allowNull: false },
		});
		estate.belongsTo(user, {
			foreignKey: { name: "user_id", allowNull: false },
		});
		user.hasMany(estate);
		estate.belongsTo(province, {
			foreignKey: { name: "province_id", allowNull: false },
		});
		estate.belongsTo(city, {
			foreignKey: { name: "city_id", allowNull: false },
		});
		city.belongsTo(province, {
			foreignKey: { name: "province_id", allowNull: false },
		});
		province.hasMany(city);
		estate_bookmark.belongsTo(estate, {
			foreignKey: { name: "estate_id", allowNull: false },
		});
		estate.hasMany(estate_bookmark);
		estate_bookmark.belongsTo(user, {
			foreignKey: { name: "user_id", allowNull: false },
		});
		user.hasMany(estate_bookmark);
		estate_favorite.belongsTo(estate, {
			foreignKey: { name: "estate_id", allowNull: false },
		});
		estate.hasMany(estate_favorite);
		estate_favorite.belongsTo(user, {
			foreignKey: { name: "user_id", allowNull: false },
		});
		user.hasMany(estate_favorite);
		estate_followup.belongsTo(estate, {
			foreignKey: { name: "estate_id", allowNull: false },
		});
		estate.hasMany(estate_followup);
		estate_followup.belongsTo(user, {
			foreignKey: { name: "user_id", allowNull: false },
		});
		user.hasMany(estate_followup);
		estate_followup.belongsTo(customer, {
			foreignKey: { name: "customer_id", allowNull: false },
		});
		customer.hasMany(estate_followup);
		estate_image.belongsTo(estate, {
			foreignKey: { name: "estate_id", allowNull: false },
		});
		estate.hasMany(estate_image);
		estate_score.belongsTo(estate, {
			foreignKey: { name: "estate_id", allowNull: false },
		});
		estate.hasMany(estate_score);
		estate_score.belongsTo(user, {
			foreignKey: { name: "user_id", allowNull: false },
		});
		user.hasMany(estate_score);
		meeting.belongsTo(user, {
			foreignKey: { name: "user_id", allowNull: false },
		});
		user.hasMany(meeting);
		meeting.belongsTo(estate, {
			foreignKey: { name: "estate_id", allowNull: false },
		});
		estate.hasMany(meeting);
		meeting.belongsTo(customer, {
			foreignKey: { name: "customer_id", allowNull: false },
		});
		customer.hasMany(meeting);
		message.belongsTo(user, {
			foreignKey: { name: "sender_id", allowNull: false },
		});
		message.belongsTo(user, {
			foreignKey: { name: "receiver_id", allowNull: false },
		});
		user.hasMany(message);
		setting.belongsTo(user, {
			foreignKey: { name: "user_id", allowNull: true },
		});
		user.hasMany(setting);
		sms.belongsTo(user, {
			foreignKey: { name: "user_id", allowNull: true },
		});
		user.hasMany(sms);
		support_request.belongsTo(user, {
			foreignKey: { name: "user_id", allowNull: true },
		});
		user.hasMany(support_request);

		this.database.sync({ force: false });
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

	async getModel(model, options, user_id, noErrorOnEmpty)
	{
		if (!options) options = {};
		let value = await this.database.models[model].findOne(options);
		if (!value && !noErrorOnEmpty)
			error_operation.throwError(404, "Could not found " + model);
		if (user_id && value.user_id != user_id)
			error_operation.throwError(403, "The user is not allowed!");
		return value;
	}

	async createModel(model, values)
	{
		return await this.database.models[model].create(values);
	}

	async deleteModel(model, options)
	{
		let value = await this.getModel(model, options);
		await value.destroy();
		return value;
	}

	pagination(page, page_size, options)
	{
		if (!options)
			options = {};
		page = page !== undefined ? parseInt(page) : PAGE;
		page_size = page_size !== undefined ? parseInt(page_size) : PAGE_SIZE;
		let offset = (page - 1) * page_size;
		options.limit = page_size;
		options.offset = offset;
		return options;
	}

	//#region Info
	async countEstates()
	{
		let all_estates = await this.database.models.estate.count({ where: { verified: true } });
		let sell_estates = await this.database.models.estate.count({
			where: {
				verified: true,
				sold: true,
				sale_method: "sell"
			}
		});
		let pawn_estates = await this.database.models.estate.count({
			where: {
				verified: true,
				sold: true,
				sale_method: "pawn"
			}
		});
		let rent_estates = await this.database.models.estate.count({
			where: {
				verified: true,
				sold: true,
				sale_method: "rent"
			}
		});

		return { all_estates, sell_estates, pawn_estates, rent_estates };
	}

	async countAllUsers()
	{
		return await this.database.models.user.count({ where: { admin: false } });
	}
	//#endregion

	//#region User
	async getUser(column, value, exclude)
	{
		let options = {
			where: {},
			include: {
				model: this.database.models.user_role,
				as: "user_role",
			},
		};
		if (column == "id") options.where.id = value;
		else if (column == "email") options.where.email = value;
		else if (column == "phone_number") options.where.phone_number = value;
		if (exclude)
		{
			options.attributes = ["id", "name", "email", "phone_number"];
			options.include.attributes = ["id", "name", "position"]
		}
		return await this.getModel("user", options, null, true);
	}

	async registerUser(
		user_role_id,
		admin,
		email,
		password,
		name,
		phone_number,
		image
	)
	{
		let values = {
			user_role_id,
			admin,
			email: email.trim(),
			password,
			name: name.trim(),
			phone_number,
			image
		}
		let user = await this.createModel("user", values);
		return await this.database.models.user.findOne({
			where: { id: user.id },
			attributes: ["id", "name", "email", "phone_number"]
		});
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

	//#region Admin
	async getUserPosition(id)
	{
		let user = await this.getModel("user", {
			where: { id },
			include: {
				model: this.database.models.user_role,
				as: "user_role",
				required: true
			},
		});
		return user.user_role.position;
	}

	async getUsers(user_role_name)
	{
		return await this.database.models.user.findAll({
			include: {
				model: this.database.models.user_role,
				as: "user_role",
				where: { name: { [Op.like]: '%' + user_role_name.trim() + '%' } }
			},
		})
	}

	async getUserRole(name)
	{
		return await this.getModel("user_role", { where: { name: { [Op.like]: '%' + name.trim() + '%' } } });
	}

	async transferEstate(id, receiver_id)
	{
		let estate = await this.getModel("estate", {
			where: {
				id,
				verified: true,
				active: true
			}
		});
		estate.user_id = receiver_id;
		return await estate.save();
	}

	async verifyEstate(id, user_id)
	{
		let estate = await this.getModel("estate", { where: { id } });
		estate.verified = true;
		if (user_id)
			estate.user_id = user_id
		return await estate.save();
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
	setEstateOptions()
	{
		let options = {
			where: {
				verified: true,
				sold: false,
				active: true,
			},
			attributes: {
				include: [
					[
						Sequelize.literal(`(
							SELECT COUNT(estate_favorite.id) FROM estate_favorite 
							WHERE estate_favorite.estate_id=estate.id AND estate_favorite.deleted_at IS NULL
							)`),
						"favorite_count"
					], [
						Sequelize.literal(`(
							SELECT AVG(estate_score.score) FROM estate_score 
							WHERE estate_score.estate_id=estate.id AND estate_score.deleted_at IS NULL
							)`),
						"score_average"
					],
				],
			},
			include: [
				{
					model: this.database.models.user,
					as: "user",
					attributes: ["name", "email", "phone_number"]
				},
				{
					model: this.database.models.estate_type,
					as: "estate_type",
					attributes: ["name"]
				},
				{
					model: this.database.models.province,
					as: "province",
					attributes: ["name"]
				},
				{
					model: this.database.models.city,
					as: "city",
					attributes: ["name"]
				},
				{
					model: this.database.models.estate_image,
					attributes: ['image'],
					required: false
				},
				{
					model: this.database.models.estate_favorite,
					attributes: [],
					required: false
				},
				{
					model: this.database.models.estate_score,
					attributes: [],
					required: false
				}
			],
		};
		return options;
	}

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
				[Op.or]: [{ land_size_meter: meter }, { building_size_meter: meter }],
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

	async getEstate(id)
	{
		let options = this.setEstateOptions();
		options.where.id = id;
		let estate = await this.getModel("estate", options);
		return estate;
	}

	async getEstates(
		user_id,
		page,
		page_size,
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
		let options = this.setEstateOptions();
		options.where = this.whereEstates(
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
			options.where
		);
		if (user_id) options.where.user_id = user_id;

		options = this.pagination(page, page_size, options);
		options.order = ["created_at"];
		return this.database.models.estate.findAll(options);
	}

	async getEstateTypes()
	{
		return this.database.models.estate_type.findAll();
	}

	async getRecentEstates(limit)
	{
		let options = this.setEstateOptions();
		options.limit = limit;
		return await this.database.models.estate.findAll(options);
	}

	async getFavoriteEstateCities(limit)
	{
		let options = {
			where: { verified: true },
			include: [
				{
					model: this.database.models.city,
					as: "city",
					attributes: [],
					required: true
				},
				{
					model: this.database.models.estate_favorite,
					attributes: [],
					required: false
				}
			],
			attributes: [
				[
					Sequelize.literal(`(
						SELECT COUNT(estate_favorite.id) FROM estate_favorite 
						WHERE estate_favorite.estate_id=estate.id AND estate_favorite.deleted_at IS NULL
						)`),
					"favorite_count"
				],
				[Sequelize.literal('city.name'), 'city_name']
			],
			// group: ["estate_favorite.id"],
			// order: ["favorite_count"],
			limit
		}
		let estates = await this.database.models.estate.findAll(options);
		estates.sort((a, b) => b.id - a.id);
		// estates = estates.map(estate => estate.dataValues.city_name);
		return estates;
	}

	async addEstate(values, images)
	{
		let estate = await this.createModel("estate", values);

		if (images)
		{
			for (let i = 0;i < images.length;i++)
			{
				await this.createModel("estate_image", {
					estate_id: estate.id,
					image: images[i],
				});

			}
		}
		return estate;
	}

	// async updateEstate(id, images, fields)
	// {
	// 	let values = {};
	// 	Object.keys(fields).forEach((key) =>
	// 	{
	// 		if (fields[key]) values[key] = fields[key];
	// 	});
	// 	let estate = await this.database.models.estate.update(values, {
	// 		where: { id },
	// 	});
	// 	// replace all images
	// 	await this.database.models.estate_image.destroy({
	// 		where: { estate_id: id },
	// 	});
	// 	images.forEach(async (image) =>
	// 	{
	// 		await this.createModel("estate_image", {
	// 			estate_id: id,
	// 			image,
	// 		});
	// 	});
	// 	return estate;
	// }

	async activeEstate(id, active)
	{
		return await this.database.models.estate.update({ active }, { where: { id } });
	}

	async soldEstate(id, sold)
	{
		return await this.database.models.estate.update({ sold }, { where: { id } });
	}

	async deleteEstate(id)
	{
		return await this.deleteModel("estate", { where: { id } });
	}

	// estate followup
	async getEstateFollowups(user_id)
	{
		let user = await this.getUser("id", user_id);
		if (!user.admin)
			return await this.database.models.estate_followup.findAll({ where: { user_id } });
		return await this.database.models.estate_followup.findAll();
	}

	async addEstateFollowup(user_id, estate_id, customer_id, register_time, register_date, reminder_time, reminder_date, description)
	{
		let values = { user_id, estate_id, customer_id, register_time, register_date, reminder_time, reminder_date, description };
		return await this.createModel("estate_followup", values);
	}

	async updateEstateFollowup(id, user_id, register_time, register_date, reminder_time, reminder_date, description)
	{
		let estate_followup = await this.getModel("estate_followup", { where: { id } });
		if (user_id)
			estate_followup.user_id = user_id;
		if (register_time)
			estate_followup.register_time = register_time;
		if (register_date)
			estate_followup.register_date = register_date;
		if (reminder_time)
			estate_followup.reminder_time = reminder_time;
		if (reminder_date)
			estate_followup.reminder_date = reminder_date;
		if (description)
			estate_followup.description = description;

		return await estate_followup.save();
	}

	async deleteEstateFollowup(id)
	{
		return await this.deleteModel("estate_followup", { where: { id } });
	}
	//#endregion

	//#region Estate Reaction
	async favoriteEstate(estate_id, user_id, favorite)
	{
		if (!favorite)
		{
			await this.database.models.estate_favorite.destroy({
				where: { user_id, estate_id },
			});
			return {};
		}
		let estate_favorite = await this.getModel("estate_favorite", { where: { user_id, estate_id } }, null, true);
		if (!estate_favorite)
			return await this.createModel("estate_favorite", { user_id, estate_id });
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

	//#region Setting
	async getSettingByKey(key)
	{
		return await this.getModel("setting", { key });
	}

	async addOrUpdateSetting(key, value, user_id)
	{
		let setting = await this.getModel("setting", { key }, null, true);
		if (setting)
		{
			setting.value = value;
			return await setting.save();
		}
		return await this.createModel("setting", { user_id, key, value });
	}
	//#endregion

	//#region SMS
	async addSms(user_id, text, numbers)
	{
		let setting = await this.getModel("setting", { key }, null, true);
		if (setting)
		{
			setting.value = value;
			return await setting.save();
		}
		return await this.createModel("setting", { user_id, key, value });
	}
	//#endregion

	//#region Customer
	async addCustomer(user_id, customer_stage_id, name, phone_number, address)
	{
		let values = { user_id, customer_stage_id, name, phone_number, address };
		return await this.createModel("customer", values);
	}

	async getCustomers(user_id)
	{
		let user = await this.getUser("id", user_id);
		if (!user.admin)
			return await this.database.models.customer.findAll({ where: { user_id } });
		return await this.database.models.customer.findAll();
	}

	async updateCustomer(id, user_id, customer_stage_id, name, phone_number, address)
	{
		let customer = await this.getModel("customer", { where: { id } });
		if (user_id)
			customer.user_id = user_id;
		if (customer_stage_id)
			customer.customer_stage_id = customer_stage_id;
		if (name)
			customer.name = name;
		if (phone_number)
			customer.phone_number = phone_number;
		if (address)
			customer.address = address;

		return await customer.save();
	}

	async deleteCustomer(id)
	{
		let customer = await this.getModel("customer", { where: { id } }, null);
		await this.database.models.customer.destroy({ where: { id } });
		return customer;
	}

	async getCustomerStages()
	{
		return await this.database.models.customer_stage.findAll({
			attributes: ["id", "name"]
		});
	}

	async getCustomerStage(name)
	{
		return await this.getModel("customer_stage", { where: { name } }, null, true);
	}

	async addCustomerStage(name)
	{
		return await this.createModel("customer_stage", { name });
	}

	async addCustomerFollowup(user_id, customer_id, customer_stage_id, followup_user_id, time, date, reminder_time, reminder_date, description)
	{
		let values = {
			user_id,
			customer_id,
			customer_stage_id,
			followup_user_id,
			time,
			date,
			reminder_time,
			reminder_date,
			description
		};
		return await this.createModel("customer_followup", values);
	}
	//#endregion

	//#region Request
	async getAdvertisingRequests()
	{
		return await this.database.models.advertising_request.findAll();
	}

	async addAdvertisingRequests(user_id, name, phone_number, call_number, type, description)
	{
		let values = { user_id, name, phone_number, call_number, type, description };
		return await this.createModel("advertising_request", values);
	}

	async getSupportRequests()
	{
		return await this.database.models.support_request.findAll();
	}

	async addSupportRequests(user_id, name, phone_number, call_number, title, description)
	{
		let values = { user_id, name, phone_number, call_number, title, description };
		return await this.createModel("support_request", values);
	}
	//#endregion

	//#region Meeting
	async getMeetings(user_id)
	{
		let user = await this.getUser("id", user_id);
		if (!user.admin)
			return await this.database.models.meeting.findAll({ where: { user_id } });
		return await this.database.models.meeting.findAll();
	}

	async addMeeting(user_id, estate_id, customer_id, title, description, address, time, date, send_sms)
	{
		let values = { user_id, estate_id, customer_id, title, description, address, time, date, send_sms }
		return await this.createModel("meeting", values);
	}

	async deleteMeeting(id)
	{
		return await this.deleteModel("meeting", { where: { id } });
	}

	async updateMeeting(id, title, description, address, time, date, send_sms)
	{
		let meeting = await this.getModel("meeting", { where: { id } });
		if (title)
			meeting.title = title;
		if (description)
			meeting.description = description;
		if (address)
			meeting.address = address;
		if (time)
			meeting.time = time;
		if (date)
			meeting.date = date;
		if (send_sms == true || send_sms == false)
			meeting.send_sms = send_sms;

		return await meeting.save();
	}
	//#endregion
};

const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const error_operation = require("./util/error_operation");
const PAGE = 1;
const PAGE_SIZE = 30;

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
		const CustomerStage = require("./model/CustomerStage");
		const CustomerFollowup = require("./model/CustomerFollowup");
		const Estate = require("./model/Estate");
		const EstateBookmark = require("./model/EstateBookmark");
		const EstateFavorite = require("./model/EstateFavorite");
		const EstateFollowup = require("./model/EstateFollowup");
		const EstateImage = require("./model/EstateImage");
		const EstateScore = require("./model/EstateScore");
		const EstateType = require("./model/EstateType");
		const Message = require("./model/Message");
		const City = require("./model/City");
		const Province = require("./model/Province");
		const Setting = require("./model/Setting");
		const SupportRequest = require("./model/SupportRequest");

		// Tables
		const user = User(this.database, Sequelize.DataTypes);
		const user_role = UserRole(this.database, Sequelize.DataTypes);
		const advertising_request = AdvertisingRequest(this.database, Sequelize.DataTypes);
		const contact_us = ContactUs(this.database, Sequelize.DataTypes);
		const customer = Customer(this.database, Sequelize.DataTypes);
		const customer_stage = CustomerStage(this.database, Sequelize.DataTypes);
		const customer_followup = CustomerFollowup(this.database, Sequelize.DataTypes);
		const estate = Estate(this.database, Sequelize.DataTypes);
		const estate_bookmark = EstateBookmark(this.database, Sequelize.DataTypes);
		const estate_favorite = EstateFavorite(this.database, Sequelize.DataTypes);
		const estate_followup = EstateFollowup(this.database, Sequelize.DataTypes);
		const estate_image = EstateImage(this.database, Sequelize.DataTypes);
		const estate_score = EstateScore(this.database, Sequelize.DataTypes);
		const estate_type = EstateType(this.database, Sequelize.DataTypes);
		const message = Message(this.database, Sequelize.DataTypes);
		const city = City(this.database, Sequelize.DataTypes);
		const province = Province(this.database, Sequelize.DataTypes);
		const setting = Setting(this.database, Sequelize.DataTypes);
		const support_request = SupportRequest(this.database, Sequelize.DataTypes);

		// ForeignKeys
		user.belongsTo(user_role, {
			foreignKey: { name: "user_role_id", allowNull: false },
		});
		advertising_request.belongsTo(user, {
			foreignKey: { name: "user_id", allowNull: false },
		});
		contact_us.belongsTo(estate, {
			foreignKey: { name: "estate_id", allowNull: true },
		});
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
			foreignKey: { name: "responsible_user_id", allowNull: false },
		});
		estate.hasMany(contact_us);
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
		estate_followup.belongsTo(user, {
			foreignKey: { name: "user_id", allowNull: false },
		});
		estate_followup.belongsTo(estate, {
			foreignKey: { name: "estate_id", allowNull: false },
		});
		estate_followup.belongsTo(customer, {
			foreignKey: { name: "customer_id", allowNull: false },
		});
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
		message.belongsTo(user, {
			foreignKey: { name: "sender_id", allowNull: false },
		});
		message.belongsTo(user, {
			foreignKey: { name: "receiver_id", allowNull: false },
		});
		user.hasMany(message);
		support_request.belongsTo(user, {
			foreignKey: { name: "user_id", allowNull: false },
		});

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

	async startTrx(handler)
	{
		let transaction = await this.database.transaction();
		try
		{
			let result = await handler(transaction);
			await transaction.commit();
			return result;
		}
		catch (error)
		{
			await transaction.rollback();
			throw error;
		}
	}

	async startOrResumeTrx(handler, trx)
	{
		if (trx)
			return await handler(trx);
		else
			return this.startTrx(handler);
	}

	async getModel(model, options, trx, user_id, noErrorOnEmpty)
	{
		if (!options)
			options = {};
		options.transaction = trx;
		let value = await this.database.models[model].findOne(options);
		if (!value && !noErrorOnEmpty)
			error_operation.throwError(404, "Could not found " + model);
		if (user_id && value.user_id != user_id)
			error_operation.throwError(403, "The user is not allowed!");
		return value;
	}

	async createModel(model, values, trx)
	{
		return await this.database.models[model].create(values, { transaction: trx });
	}

	async deleteModel(model, options, trx)
	{
		let value = await this.getModel(model, options, trx);
		await value.destroy({ transaction: trx });
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
	async countEstates(trx)
	{
		let all_estates = await this.database.models.estate.count({
			where: { verified: true },
			transaction: trx
		});
		let sell_estates = await this.database.models.estate.count({
			where: {
				verified: true,
				sold: true,
				sale_method: "sell"
			},
			transaction: trx
		});
		let pawn_estates = await this.database.models.estate.count({
			where: {
				verified: true,
				sold: true,
				sale_method: "pawn"
			},
			transaction: trx
		});
		let rent_estates = await this.database.models.estate.count({
			where: {
				verified: true,
				sold: true,
				sale_method: "rent"
			},
			transaction: trx
		});

		return { all_estates, sell_estates, pawn_estates, rent_estates };
	}

	async countAllUsers(trx)
	{
		return await this.database.models.user.count({ where: { admin: false }, transaction: trx });
	}
	//#endregion

	//#region User
	async getUser(column, value, exclude, trx)
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
		return await this.getModel("user", options, trx, null, true);
	}

	async registerUser(user_role_id, admin, email, password, name, phone_number, image)
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
		let user = await this.createModel("user", values, trx);
		return {
			id: user.id,
			user_role_id: user.user_role_id,
			name: user.name,
			email: user.email,
			phone_number: user.phone_number
		};
	}

	async updateUser(id, fields, trx)
	{
		let values = {};
		Object.keys(fields).forEach((key) =>
		{
			if (fields[key]) values[key] = fields[key];
		});
		return await this.database.models.user.update(values, { where: { id }, transaction: trx });
	}

	async getConsultants(role, trx)
	{
		let options = {
			include: {
				model: this.database.models.user_role,
				as: "user_role",
				where: { position: { [Op.not]: process.env.consumer_role_position } }
			},
			transaction: trx
		};
		if (role)
		{
			// todo filter
			if (role == "searcher")
				options.include.where = { position: process.env.searcher_role_position };
			else if (role == "attracter")
				options.include.where = { position: process.env.attracter_role_position };
			else if (role == "admin")
				options.include.where = { position: process.env.admin_role_position };
		}
		return await this.database.models.user.findAll(options);
	}
	//#endregion

	//#region Admin
	async getUserPosition(id, trx)
	{
		let user = await this.getModel("user", {
			where: { id },
			include: {
				model: this.database.models.user_role,
				as: "user_role",
				required: true
			},
		}, trx);
		return user.user_role.position;
	}

	async getUsers(user_role_name, trx)
	{
		return await this.database.models.user.findAll({
			include: {
				model: this.database.models.user_role,
				as: "user_role",
				where: { name: { [Op.like]: '%' + user_role_name.trim() + '%' } }
			},
			transaction: trx
		});
	}

	async getUserRole(name, trx)
	{
		return await this.getModel("user_role", {
			where: { name: { [Op.like]: '%' + name.trim() + '%' } }
		}, trx);
	}

	async transferEstate(id, receiver_id, trx)
	{
		let estate = await this.getModel("estate", {
			where: {
				id,
				verified: true,
				active: true
			}
		}, trx);
		estate.user_id = receiver_id;
		return await estate.save({ transaction: trx });
	}

	async verifyEstate(id, user_id, trx)
	{
		let estate = await this.getModel("estate", { where: { id } }, trx);
		estate.verified = true;
		if (user_id)
			estate.user_id = user_id
		return await estate.save({ transaction: trx });
	}
	//#endregion

	//#region Province/City
	async getProvinces(trx)
	{
		return await this.database.models.province.findAll({ transaction: trx });
	}

	async getCities(province_id, trx)
	{
		return await this.database.models.city.findAll({ where: { province_id }, transaction: trx });
	}
	//#endregion

	//#region Estate
	setEstateOptions(current_user_id)
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
		if (current_user_id)
		{
			// favorite
			options.attributes.include.push([
				Sequelize.literal(`EXISTS (
						SELECT * FROM estate_favorite
						WHERE estate_favorite.estate_id = estate.id
						AND estate_favorite.user_id = ${current_user_id})`),
				"has_favorite"
			]);
			// score
			options.attributes.include.push([
				Sequelize.literal(`(
						SELECT score FROM estate_score
						WHERE estate_score.estate_id = estate.id
						AND estate_score.user_id = ${current_user_id})`),
				"has_score"
			]);
			// bookmark
			options.attributes.include.push([
				Sequelize.literal(`EXISTS (
						SELECT * FROM estate_bookmark
						WHERE estate_bookmark.estate_id = estate.id
						AND estate_bookmark.user_id = ${current_user_id})`),
				"has_bookmark"
			]);
		}
		return options;
	}

	whereEstates(estate_type_id, sale_method, city_id, total_min_price, total_max_price, meter_min_price, meter_max_price, pawn_min_price, pawn_max_price, rent_min_price, rent_max_price, where)
	{
		if (!where) where = {};
		if (estate_type_id) where.estate_type_id = parseInt(estate_type_id);
		if (sale_method) where.sale_method = sale_method;
		if (city_id) where.city_id = parseInt(city_id);
		if (total_min_price) where.total_price = { [Op.gte]: parseInt(total_min_price) };
		if (total_max_price) where.total_price = { [Op.lte]: parseInt(total_max_price) };
		if (meter_min_price) where.meter_price = { [Op.gte]: parseInt(meter_min_price) };
		if (meter_max_price) where.meter_price = { [Op.lte]: parseInt(meter_max_price) };
		if (pawn_min_price) where.pawn_price = { [Op.gte]: parseInt(pawn_min_price) };
		if (pawn_max_price) where.pawn_price = { [Op.lte]: parseInt(pawn_max_price) };
		if (rent_min_price) where.rent_price = { [Op.gte]: parseInt(rent_min_price) };
		if (rent_max_price) where.rent_price = { [Op.lte]: parseInt(rent_max_price) };
		return where;
	}

	async getEstate(id, current_user_id, trx)
	{
		let options = this.setEstateOptions(current_user_id);
		options.where.id = id;
		let estate = await this.getModel("estate", options, trx);
		return estate;
	}

	async getEstates(user_id, page, page_size, estate_type_id, sale_method, city_id, total_min_price, total_max_price, meter_min_price, meter_max_price, pawn_min_price, pawn_max_price, rent_min_price, rent_max_price, current_user_id, trx)
	{
		let options = this.setEstateOptions(current_user_id);
		options.where = this.whereEstates(
			estate_type_id,
			sale_method,
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
		options.transaction = trx;
		return this.database.models.estate.findAll(options);
	}

	async getEstateTypes(trx)
	{
		return this.database.models.estate_type.findAll({ transaction: trx });
	}

	async getRecentEstates(limit, current_user_id, trx)
	{
		let options = this.setEstateOptions(current_user_id);
		options.limit = limit;
		options.transaction = trx;
		return await this.database.models.estate.findAll(options);
	}

	async getFavoriteEstateCities(limit, trx)
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
			limit,
			transaction: trx
		}
		let estates = await this.database.models.estate.findAll(options);
		estates.sort((a, b) => b.id - a.id);
		// estates = estates.map(estate => estate.dataValues.city_name);
		return estates;
	}

	async addEstate(values, images, trx)
	{
		return await this.startOrResumeTrx(async (trx) =>
		{
			// create estate
			let estate = await this.createModel("estate", values, trx);

			// add estate images
			if (images)
			{
				for (let i = 0;i < images.length;i++)
				{
					await this.createModel("estate_image", {
						estate_id: estate.id,
						image: images[i],
					}, trx);

				}
			}
			return estate;
		}, trx);
	}

	async updateEstate(id, sale_fields, estate_fields, images, trx)
	{
		return await this.startOrResumeTrx(async (trx) =>
		{
			// update estate
			let estate = await this.getModel("estate", { where: { id } }, trx);
			Object.keys(estate_fields).forEach((column) =>
			{
				estate[column] = estate_fields[column];
			});

			// check if sale_method updated
			if (estate.sale_method != sale_fields.sale_method)
			{
				estate.sale_method = sale_fields.sale_method;
				if (sale_fields.sale_method == "rent")
				{
					estate.total_price = null;
					estate.meter_price = null;
					estate.pawn_price = sale_fields.pawn_price;
					estate.rent_price = sale_fields.rent_price;
				}
				else if (sale_fields.sale_method == "pawn")
				{
					estate.total_price = null;
					estate.meter_price = null;
					estate.pawn_price = sale_fields.pawn_price;
					estate.rent_price = null;
				}
				else if (sale_fields.sale_method == "sell")
				{
					estate.total_price = sale_fields.total_price;
					estate.meter_price = sale_fields.meter_price;
					estate.pawn_price = null;
					estate.rent_price = null;
				}
			}
			estate = await estate.save({ transaction: trx });

			// replace all estate's images
			await this.database.models.estate_image.destroy({ where: { estate_id: id }, transaction: trx });
			images.forEach(async (image) =>
			{
				await this.createModel("estate_image", { estate_id: id, image }, trx);
			});

			return estate;
		}, trx);
	}

	async activeEstate(id, active, trx)
	{
		return await this.database.models.estate.update({ active }, { where: { id }, transaction: trx });
	}

	async soldEstate(id, sold, trx)
	{
		return await this.database.models.estate.update({ sold }, { where: { id }, transaction: trx });
	}

	async deleteEstate(id, trx)
	{
		return await this.deleteModel("estate", { where: { id } }, trx);
	}

	// estate followup
	async getAllEstateFollowups(user_id, trx)
	{
		// todo check current time and date for expired followups
		let where = {};
		if (user_id)
			where.user_id = user_id;
		return await this.database.models.estate_followup.findAll({ where, transaction: trx });
	}

	async getEstateFollowup(id, trx)
	{
		// todo check current time and date for expired followups
		return await this.getModel("estate_followup", { where: { id } }, trx);
	}

	async addEstateFollowup(user_id, estate_id, customer_id, time, date, reminder_time, reminder_date, description, trx)
	{
		return await this.createModel("estate_followup", {
			user_id,
			estate_id,
			customer_id,
			time,
			date,
			reminder_time,
			reminder_date,
			description,
		}, trx);
	}

	async updateEstateFollowup(id, estate_id, customer_id, time, date, reminder_time, reminder_date, description, trx)
	{
		let estate_followup = await this.getEstateFollowup(id);
		estate_followup.estate_id = estate_id;
		estate_followup.customer_id = customer_id;
		estate_followup.time = time;
		estate_followup.date = date;
		estate_followup.reminder_time = reminder_time;
		estate_followup.reminder_date = reminder_date;
		estate_followup.description = description;
		return await estate_followup.save({ transaction: trx });
	}

	async deleteEstateFollowup(id, trx)
	{
		return await this.deleteModel("estate_followup", { where: { id } }, trx);
	}
	//#endregion

	//#region Estate Reaction
	async switchFavoriteEstate(estate_id, user_id, favorite, trx)
	{
		if (!favorite)
		{
			await this.database.models.estate_favorite.destroy({
				where: { user_id, estate_id },
				transaction: trx
			});
			return {};
		}
		let estate_favorite = await this.getModel("estate_favorite", { where: { user_id, estate_id } }, trx, null, true);
		if (!estate_favorite)
			return await this.createModel("estate_favorite", { user_id, estate_id }, trx);
	}

	async switchBookmarkEstate(estate_id, user_id, bookmark, trx)
	{
		if (!bookmark)
		{
			await this.database.models.estate_bookmark.destroy({
				where: { user_id, estate_id },
				transaction: trx
			});
			return {};
		}
		let estate_bookmark = await this.getModel("estate_bookmark", { where: { user_id, estate_id } }, trx, null, true);
		if (!estate_bookmark)
			return await this.createModel("estate_bookmark", { user_id, estate_id }, trx);
	}

	async getUserBookmarkEstates(user_id, trx)
	{
		return await this.database.models.estate_bookmark.findAll({
			where: { user_id },
			include: {
				model: this.database.models.estate,
				as: "estate",
				required: true
			},
			transaction: trx
		});
	}
	//#endregion

	//#region Message
	async getMessages(allOrNotSeen, receiver_id, trx)
	{
		if (allOrNotSeen)
		{
			return await this.database.models.message.findAll({
				where: { receiver_id },
				include: {
					model: this.database.models.user,
					as: "sender",
				},
				transaction: trx
			});
		}
		return await this.database.models.message.findAll({
			where: { receiver_id, seen: false },
			include: {
				model: this.database.models.user,
				as: "sender",
			},
			transaction: trx
		});
	}

	async sendMessage(sender_id, receiver_id, title, text, trx)
	{
		return await this.createModel("message", {
			sender_id,
			receiver_id,
			title,
			text,
			seen: false,
		}, trx);
	}

	async seenMessage(id, receiver_id, trx)
	{
		return await this.database.models.message.update(
			{ seen: true },
			{ where: { id, receiver_id }, transaction: trx }
		);
	}
	//#endregion

	//#region ContactUs
	async addContactUs(name, email, phone_number, title, text, estate_id, trx)
	{
		return await this.createModel("contact_us", { name, email, phone_number, title, text, estate_id }, trx);
	}

	async getContactUses(limit, estate_id, trx)
	{
		let options = { transaction: trx };
		if (estate_id) options.where.estate_id = estate_id;
		if (limit) options.where.limit = limit;
		return await this.database.models.contact_us.findAll(options);
	}
	//#endregion

	//#region Customer
	async getAllCustomerStages(trx)
	{
		return await this.database.models.customer_stage.findAll({ transaction: trx });
	}

	async getAllCustomers(user_id, trx)
	{
		let where = {};
		if (user_id)
			where.user_id = user_id;
		return await this.database.models.customer.findAll({
			where,
			transaction: trx
		});
	}

	async addCustomerStage(name, trx)
	{
		return await this.createModel("customer_stage", { name }, trx);
	}

	async getCustomer(id, trx)
	{
		return await this.getModel("customer", { where: { id } }, trx);
	}

	async addCustomer(user_id, customer_stage_id, name, family, phone_number, address, trx)
	{
		return await this.createModel("customer", {
			user_id, customer_stage_id, name, family, phone_number, address
		}, trx);
	}

	async deleteCustomer(id, user_id, trx)
	{
		let where = { id };
		if (user_id)
			where.user_id = user_id;
		return await this.deleteModel("customer", { where }, trx);
	}

	async updateCustomer(id, customer_stage_id, name, family, phone_number, address, user_id, trx)
	{
		let where = { id };
		if (user_id)
			where.user_id = user_id
		let customer = await this.getModel("customer", { where }, trx);
		customer.customer_stage_id = customer_stage_id;
		customer.name = name;
		customer.family = family;
		customer.phone_number = phone_number;
		customer.address = address;
		return await customer.save({ transaction: trx });
	}

	// customer followup
	async getAllCustomerFollowups(user_id, customer_id, trx)
	{
		// todo check current time and date for expired followups
		let where = {};
		if (user_id)
			where.responsible_user_id = user_id;
		if (customer_id)
			where.customer_id = customer_id;
		return await this.database.models.customer_followup.findAll({ where, transaction: trx });
	}

	async addCustomerFollowup(user_id, customer_id, customer_stage_id, responsible_user_id, time, date, reminder_time, reminder_date, description, trx)
	{
		return await this.createModel("customer_followup", {
			user_id,
			customer_id,
			customer_stage_id,
			responsible_user_id,
			time,
			date,
			reminder_time,
			reminder_date,
			description
		}, trx);
	}

	async getCustomerFollowup(id, trx)
	{
		return await this.getModel("customer_followup", { where: { id } }, trx);
	}

	async updateCustomerFollowup(id, customer_stage_id, responsible_user_id, time, date, reminder_time, reminder_date, description, trx)
	{
		let customer_followup = await this.getCustomerFollowup(id, trx);
		customer_followup.customer_stage_id = customer_stage_id;
		customer_followup.responsible_user_id = responsible_user_id;
		customer_followup.time = time;
		customer_followup.date = date;
		customer_followup.reminder_time = reminder_time;
		customer_followup.reminder_date = reminder_date;
		customer_followup.description = description;
		return await customer_followup.save({ transaction: trx });
	}

	async deleteCustomerFollowup(id, trx)
	{
		return await this.deleteModel("customer_followup", { where: { id } }, trx);
	}
	//#endregion

	//#region Request
	async getAllSupportRequests()
	{
		return await this.database.models.support_request.findAll({});
	}

	async addSupportRequest(user_id, name, phone_number, call_number, title, description, trx)
	{
		let values = { user_id, name, phone_number, call_number, title, description };
		return await this.createModel("support_request", values, trx);
	}

	async getAllAdvertisingRequests()
	{
		return await this.database.models.advertising_request.findAll({});
	}

	async addAdvertisingRequest(user_id, name, phone_number, call_number, ad_type, description, trx)
	{
		let values = { user_id, name, phone_number, call_number, ad_type, description };
		return await this.createModel("advertising_request", values, trx);
	}
	//#endregion

	//#region Setting
	async getAllSettings()
	{
		let settings = await this.database.models.setting.findAll();
		settings.forEach(setting =>
		{
			setting.value = JSON.parse(setting.value);
		});
		return settings;
	}

	async updateMetaTagsAndLogoSettings(logo_url, keywords, title_meta_tags, description_meta_tags, trx)
	{
		let logo = await this.database.models.setting.findOne({ where: { key: "logo" } });
		logo.value = logo_url;
		await logo.save({ transaction: trx });
		let meta_tags = await this.database.models.setting.findOne({ where: { key: "meta_tags" } });
		meta_tags.value = {
			keywords,
			title: title_meta_tags,
			description: description_meta_tags
		};
		await meta_tags.save({ transaction: trx });
		return { logo_url, meta_tags };
	}

	async updateContactSetting(call_number, phone_number, email, address, trx)
	{
		let contact = await this.database.models.setting.findOne({ where: { key: "contact" } });
		contact.value = {
			call_number,
			phone_number,
			email,
			address
		};
		return await contact.save({ transaction: trx });
	}
	//#endregion
};

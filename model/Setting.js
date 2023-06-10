const Base = require("./Base");

module.exports = (sequelize, DataTypes) =>
{
	return Base(sequelize, DataTypes, "setting", {
		id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, },
		key: { type: DataTypes.STRING, allowNull: false },
		value: { type: DataTypes.JSON, allowNull: false },
	});
};


// 1. logo      - url

// 2. meta_tags - title
//              - description
//              - keywords

// 3. contact   - call number
//              - phone number
//              - email
//              - address

// 4. site    - main_page      - first_title
//                             - second_title
//                             - description

// 			  - services  	   - service1, description
// 			              	   - service2, description
// 			              	   - service3, description
// 			              	   - service4, description
//                             - ,.....

// 			  - why_choose_us  - title1, description
// 			                   - title2, description
// 			                   - title3, description

// 			  - performance    - title1, description
// 			                   - title2, description
// 			                   - title3, description

// 			  - about_us       - description

// -------------------------------------------------------

// "site": {
// 	"main_page": {
// 		"first_title": "",
// 		"second_title": "",
// 		"description": ""
// 	},
// 	"services": [
// 		{ "title": "", "description": "" },
// 		{ "title": "", "description": "" },
// 		{ "title": "", "description": "" }
// 	],
// 	"why_choose_us": [
// 		{ "title": "", "description": "" },
// 		{ "title": "", "description": "" },
// 		{ "title": "", "description": "" }
// 	],
// 	"performances": [
// 		{ "title": "", "description": "" },
// 		{ "title": "", "description": "" },
// 		{ "title": "", "description": "" }
// 	],
// 	"about_us": ""
// };
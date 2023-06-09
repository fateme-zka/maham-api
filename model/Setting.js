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

// 2. meta tags - title
//              - description
//              - keywords

// 3. contact   - call number
//              - phone number
//              - email
//              - address

// 4. site      - main page first title
//              - main page second title
//              - description

// 5. services  - service1, description
//              - service2, description
//              - service3, description
//              - service4, description ,.....

// 6. why choose us?  - title1, description
//                    - title2, description
//                    - title3, description

// 7. performance - title1, description
//                - title2, description
//                - title3, description

// 8. about us  - description
const Joi = require("joi");

const query_schema = Joi.object({
  sale_method: Joi.number().allow(""),
  estate_type_id: Joi.number().allow(""),
  meter: Joi.number().allow(""),
  room_count: Joi.number().allow(""),
  province_id: Joi.number().allow(""),
  city_id: Joi.number().allow(""),
  total_min_price: Joi.number().allow(""),
  total_max_price: Joi.number().allow(""),
  meter_min_price: Joi.number().allow(""),
  meter_max_price: Joi.number().allow(""),
  pawn_min_price: Joi.number().allow(""),
  pawn_max_price: Joi.number().allow(""),
  rent_min_price: Joi.number().allow(""),
  rent_max_price: Joi.number().allow(""),
});

const handler = async function (req, res) {
  let {
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
  } = req.query;
  
  
  return await req.context.getEstates(
    null,
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
  );
};

module.exports = { handler, query_schema, auth: false };

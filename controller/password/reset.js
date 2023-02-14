const Bcrypt = require('bcrypt');
const Joi = require("joi");

const body_schema = Joi.object({
    pass_cur: Joi.string().required(),
    pass_new: Joi.string().min(6).required(),
    pass_rep: Joi.any().equal(Joi.ref('pass_new')).required()
        .messages({ 'any.only': '"Confirm password" does not match.' })
});

const handler = async (req) => {
    let {
        pass_cur,
        pass_new,
    } = req.body;

    let user = req.user;
    // check current password
    pass_cur = await Bcrypt.hash(pass_cur, process.env.bcrypt_salt);
    if (user.password !== pass_cur)
        req.throw(403, 'Invalid password.');

    // update password
    user.password = await Bcrypt.hash(pass_new, process.env.bcrypt_salt);
    await user.save();
    return null;
};

module.exports = { handler, body_schema, auth: true }
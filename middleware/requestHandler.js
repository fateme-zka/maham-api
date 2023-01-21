const Winston = require("../config/winston");
const Joi = require("joi");
const Context = require("../Context");
const error_operation = require("../util/error_operation");
const { token_parser } = require("../util/token_parser");

module.exports = (controller) => async (req, res) => {
  req.context = new Context();
  let result = {};
  let meta = {
    method: req.method,
    url: req.originalUrl,
    header: req.headers,
    body: req.body,
    start_time: new Date(),
    code: 200,
    message: "Success",
  };

  req.throw = error_operation.throwError;

  try {
    // check for validation
    if (controller.body_schema) {
      const validation = await Joi.compile(controller.body_schema)
        .prefs({ errors: { label: "key" } })
        .validate(req.body);
      if (validation.error) {
        let message = validation.error.details
          .map((details) => details.message)
          .join(", ");
        req.throw(400, message);
      }
    }
    if (controller.query_schema) {
      const validation = await Joi.compile(controller.query_schema)
        .prefs({ errors: { label: "key" } })
        .validate(req.query);
      if (validation.error) {
        let message = validation.error.details
          .map((details) => details.message)
          .join(", ");
        req.throw(400, message);
      }
    }

    // user
    req.getUser = async () => {
      req.user = await req.context.getUser("id", req.session.user_id);
      return req.user;
    };

    // check for auth
    if (controller.auth) {
      req.session = await token_parser(req, process.env.jwt_key);
      req.user = await req.getUser();
      // auth consultant
      if (controller.auth_consultant)
        if (req.user.role_id == process.env.customer_id)
          req.throw(401, "Customers have no access!");
      // auth admin
      if (controller.auth_admin) {
        if (!req.user.admin) req.throw(401, "Admin user is required.");
      }
    }

    // call controller
    if (controller.handler) result = await controller.handler(req, res);
    if (result == null) result = "Success";
  } catch (error) {
    if (error.code === undefined) {
      error.code = 500;
      //   email_operation.sendError(error.stack);
    }
    meta.code = error.code;
    meta.message = error.message;
    meta.error = error;
    if (error.code) result = meta.message;
    else {
      result = "Sorry, internl server error.";
    }
  }
  meta.end_time = new Date();
  meta.duration = meta.end_time - meta.start_time;
  Winston.info(meta);
  return res.status(meta.code).send(result);
};

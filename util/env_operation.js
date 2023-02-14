const error_operation = require("./error_operation");
function getOrError(name) {
    if (process.env[name] != undefined)
        return process.env[name];
    error_operation.throwError(404, `Environment variable '${name}' not found.`);
}

module.exports = {
    getOrError
};
const winston = require('winston');

let options = {
    console: {
        level: 'error',
        handleExceptions: true,
        json: true,
        colorize: true,
    },
    file: {
        level: 'info',
        json: true,
    }
};

let logger = new winston.createLogger({
    format: winston.format.combine(
        winston.format.json(),
        winston.format.timestamp(),
        winston.format.prettyPrint()
    ),
    transports: [
        new winston.transports.Console(options.console),
        new winston.transports.Console(options.file),
        new winston.transports.File({ filename: './log/info.log', level: 'info' }),
        new winston.transports.File({ filename: './log/error.log', level: 'error' }),
    ],
    exitOnError: false
});

logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    },
};

module.exports = logger;

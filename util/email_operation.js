const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var env_operation = require('./env_operation');
let maham_email_host = env_operation.getOrError('maham_email_host');
let maham_email_username = env_operation.getOrError('maham_email_username');
let maham_email_password = env_operation.getOrError('maham_email_password');
let maham_email_error_title = env_operation.getOrError('maham_email_error_title');
let maham_email_error_recipients = env_operation.getOrError('maham_email_error_recipients');

function sendExeption(error, meta, callback)
{
    let title = error.message;
    let message = title;
    if (meta)
        message += "\r\n" + JSON.stringify(meta);
    message += "\r\n" + error.stack;
    sendError(title, message, callback);
}

function sendError(title, message, callback)
{
    if (!title)
        title = '';
    let toks = maham_email_error_recipients.split(',');
    for (let i = 0; i < toks.length; i++)
    {
        const email = toks[i];
        send(
            email,
            maham_email_error_title + " - " + title,
            message, undefined, callback
        );
    }
}

function send(to, subject, text, html, callback) {
    if (!maham_email_username)
        return;
    if (!maham_email_password)
        return;
    let transform = {}
    if (maham_email_host === 'gmail')
        transform = smtpTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: maham_email_username,
                pass: maham_email_password
            }
        });
    else
        transform = {
            host: maham_email_host,
            port: 465,
            secure: true,
            auth: {
                user: maham_email_username,
                pass: maham_email_password
            }
        };

    let transporter = nodemailer.createTransport(transform);

    let mailOptions = {
        from: maham_email_username,
        to,
        subject,
        text
    };
    if (html)
        mailOptions.html = html;

    transporter.sendMail(mailOptions, function (error, info) {
        if (callback)
            callback(error, info);
        else {
            if (error) {
                console.log(error);
            }
        }
    });
}

module.exports = {
	sendExeption,
    sendError,
    send,
};
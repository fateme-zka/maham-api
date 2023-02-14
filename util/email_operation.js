const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var env_operation = require('./env_operation');
let namira_email_host = env_operation.getOrError('namira_email_host');
let namira_email_username = env_operation.getOrError('namira_email_username');
let namira_email_password = env_operation.getOrError('namira_email_password');
let namira_email_error_title = env_operation.getOrError('namira_email_error_title');
let namira_email_error_recipients = env_operation.getOrError('namira_email_error_recipients');

function sendError(message, callback, title) {
    if (!title)
        title = '';
    let toks = namira_email_error_recipients.split(',');
    for (let i = 0; i < toks.length; i++) {
        const email = toks[i];
        send(
            email,
            namira_email_error_title + " - " + title,
            message, undefined, callback
        );
    }
}

function send(to, subject, text, html, callback) {
    if (!namira_email_username)
        return;
    if (!namira_email_password)
        return;
    let transform = {}
    if (namira_email_host === 'gmail')
        transform = smtpTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: namira_email_username,
                pass: namira_email_password
            }
        });
    else
        transform = {
            host: namira_email_host,
            port: 465,
            secure: true,
            auth: {
                user: namira_email_username,
                pass: namira_email_password
            }
        };

    let transporter = nodemailer.createTransport(transform);

    let mailOptions = {
        from: namira_email_username,
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
    send,
    sendError
};
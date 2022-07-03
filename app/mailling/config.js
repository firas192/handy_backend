const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
    username: 'api',
	key: process.env.MAILGUN_KEY,
})

module.exports.sendVerifyEmail = (email, body) => {
    return mg.messages.create(process.env.MAILGUN_DOMAIN, {
        from: `Handy <postman@${process.env.MAILGUN_DOMAIN}>`,
        to: [email],
        subject: `Please verify your ${process.env.APP_NAME} account`,
        html: body
    })
}